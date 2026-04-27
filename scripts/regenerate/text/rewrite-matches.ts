// Rewrites the description field of every match in data/matches.json.
// All other fields (teams, scores, kickoff, tags, etc.) are preserved verbatim.

import { promises as fs } from 'fs';
import { rewrite } from '../lib/gemini.js';
import { backupFile } from '../lib/backup.js';
import { limit } from '../lib/concurrency.js';
import { isCompleted, markCompleted, markFailed, resetBucket, getStats } from '../lib/manifest.js';
import { MATCHES_PATH } from '../lib/paths.js';
import type { CliFlags } from '../lib/cli.js';

const BUCKET = 'matches';

interface Match {
  fixtureId: number;
  slug: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  round?: string;
  description: string;
  kickoff?: string;
  status?: string;
  [key: string]: any;
}

interface MatchesFile {
  matches: Match[];
  generatedAt?: string;
  count?: number;
}

async function rewriteMatch(match: Match): Promise<Match> {
  const newDesc = await rewrite(match.description, {
    keywords: [match.homeTeam, match.awayTeam, match.league, '4K', 'live stream', 'IPTV'].filter(Boolean),
    extraContext: `This is a single-paragraph description for the match ${match.homeTeam} vs ${match.awayTeam} in the ${match.league}${match.round ? ' (' + match.round + ')' : ''}. Keep ~100 words, preserve all team names, league name, dates, and the call-to-action that the match streams in 4K on Orca 4K TV across Smart TV / Firestick / Android / iPhone / PC.`,
    temperature: 0.85,
  });

  return { ...match, description: newDesc };
}

export async function runMatchesRewrite(flags: CliFlags) {
  const raw = await fs.readFile(MATCHES_PATH, 'utf-8');
  const file: MatchesFile = JSON.parse(raw);
  const matches = file.matches;

  if (flags.reset) {
    await resetBucket(BUCKET);
    console.log(`✓ Manifest bucket "${BUCKET}" reset`);
  }

  const stats = await getStats(BUCKET);
  const todo = matches.filter((m) => !stats.completed.includes(m.fixtureId));
  const subset = flags.limit ? todo.slice(0, flags.limit) : todo;

  console.log(
    `Matches: ${matches.length} total, ${stats.completed.length} already done, ${todo.length} todo, processing ${subset.length} this run.`
  );

  if (subset.length === 0) {
    console.log('Nothing to do.');
    return;
  }

  if (!flags.dryRun) {
    await backupFile(MATCHES_PATH);
  }

  let completedThisRun = 0;
  let failedThisRun = 0;

  await Promise.all(
    subset.map((m) =>
      limit(async () => {
        try {
          const newMatch = await rewriteMatch(m);

          if (flags.dryRun) {
            if (completedThisRun < 2) {
              console.log(`    DRY-RUN sample [${m.slug}]: ${newMatch.description.slice(0, 200)}...`);
            }
          } else {
            // Persist after each completion
            const cur: MatchesFile = JSON.parse(await fs.readFile(MATCHES_PATH, 'utf-8'));
            const idx = cur.matches.findIndex((x) => x.fixtureId === m.fixtureId);
            if (idx >= 0) cur.matches[idx] = newMatch;
            await fs.writeFile(MATCHES_PATH, JSON.stringify(cur, null, 2));
            await markCompleted(BUCKET, m.fixtureId);
          }
          completedThisRun++;
          if (completedThisRun % 10 === 0) {
            console.log(`  → ${completedThisRun}/${subset.length} matches rewritten`);
          }
        } catch (e: any) {
          console.error(`  ✗ FAILED ${m.slug}: ${e.message}`);
          await markFailed(BUCKET, m.fixtureId);
          failedThisRun++;
        }
      })
    )
  );

  console.log(
    `\nMatches done. This run: ${completedThisRun} completed, ${failedThisRun} failed.`
  );
}
