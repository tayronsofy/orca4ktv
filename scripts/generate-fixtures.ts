/**
 * generate-fixtures.ts
 * Fetches upcoming fixtures from API-Football and writes them to data/matches.json.
 *
 * Usage:
 *   npx tsx scripts/generate-fixtures.ts
 *
 * Env required:
 *   RAPIDAPI_KEY — your RapidAPI key for API-Football
 */

import { writeFileSync } from 'fs'
import { join } from 'path'
import { fetchUpcomingFixtures } from '../lib/sports-api'
import type { Fixture } from '../lib/sports-api'

// ─── Load .env manually (tsx doesn't auto-load it) ───────────────────────────
import { config } from 'dotenv'
config({ path: join(process.cwd(), '.env.local') })

// ─── Trademark scrub — applied to every league/round string from the API ────
// API returns trademarked league names ("Premier League", "Bundesliga", etc.).
// MarkScan/DAZN crawl for these as DMCA targets, so we substitute generic
// descriptors before the data hits matches.json.

const TRADEMARK_SUBSTITUTIONS: ReadonlyArray<readonly [RegExp, string]> = [
  [/\bUEFA Champions League, Women, Knockout stage\b/gi, "Top European women's club football, Knockout stage"],
  [/\bUEFA Champions League, Women\b/gi, "Top European women's club football"],
  [/\bUEFA Champions League\b/gi, 'Top European club football'],
  [/\bChampions League, Women\b/gi, "Top European women's club football"],
  [/\bChampions League live\b/gi, 'Top European club football live'],
  [/\bChampions League\b/gi, 'Top European club football'],
  [/\bUEFA Europa League\b/gi, 'Secondary European club football'],
  [/\bEuropa League\b/gi, 'Secondary European club football'],
  [/\bUEFA Conference League\b/gi, 'Tertiary European club football'],
  [/\bConference League\b/gi, 'Tertiary European club football'],
  [/\bUEFA\b/gi, 'European football'],
  [/\bFIFA World Cup\b/gi, 'International football tournament'],
  [/\bWorld Cup\b/gi, 'International football tournament'],
  [/\bFIFA\b/gi, 'International football'],
  [/\bPremier League\b/gi, 'UK top-flight football'],
  [/\bBundesliga\b/gi, 'German top-flight football'],
  [/\bSerie A\b/gi, 'Italian top-flight football'],
  [/\bLa Liga\b/gi, 'Spanish top-flight football'],
  [/\bEredivisie\b/gi, 'Dutch top-flight football'],
  [/\bLigue 1\b/gi, 'French top-flight football'],
  [/\bMLS\b/gi, 'US top-flight football'],
]

function scrubTrademarks(s: string): string {
  let out = s
  for (const [pat, repl] of TRADEMARK_SUBSTITUTIONS) {
    out = out.replace(pat, repl)
  }
  return out
}

// ─── Description templates ────────────────────────────────────────────────────

function generateDescription(f: Fixture): string {
  const date = new Intl.DateTimeFormat('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
  }).format(new Date(f.kickoff))

  const venue = f.venue ? ` at ${f.venue}, ${f.city}` : ''

  const openers = [
    `${f.homeTeam} host ${f.awayTeam} in a must-watch ${f.league} ${f.round} clash.`,
    `${f.homeTeam} face off against ${f.awayTeam} in the ${f.round} of the ${f.league}.`,
    `All eyes are on this ${f.league} fixture as ${f.homeTeam} meet ${f.awayTeam}.`,
    `A top-tier ${f.league} encounter — ${f.homeTeam} vs ${f.awayTeam} is live this week.`,
  ]
  const opener = openers[f.fixtureId % openers.length]

  return [
    opener,
    `The match is scheduled for ${date}${venue}.`,
    `Watch ${f.homeTeam} vs ${f.awayTeam} live in 4K Ultra-HD on Orca 4K TV — our servers are optimized for match-day traffic, so you get a buffer-free stream from the first whistle to the last.`,
    `Available on Smart TV, Amazon Firestick, Android, iPhone, and PC. No contracts, instant activation.`,
  ].join(' ')
}

function generateTags(f: Fixture): string[] {
  const tags = [f.league, f.round, f.homeTeam, f.awayTeam, 'live stream', '4K IPTV', 'watch online']
  // Note: f.league is already trademark-scrubbed at fixture-load time, so any
  // category-add-ons here use the scrubbed terms too.
  const lname = f.league.toLowerCase()
  if (lname.includes('international football tournament')) tags.push('summer international football 2026', 'international football live')
  if (lname.includes('top european club football')) tags.push('European club football midweek', 'European club football live')
  return [...new Set(tags)]
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('⚡ Fetching fixtures from AllSportsAPI…')

  const rawFixtures = await fetchUpcomingFixtures(30)
  console.log(`   Found ${rawFixtures.length} fixtures`)

  // Scrub trademarked league/round names from API response BEFORE downstream uses
  const fixtures = rawFixtures.map(f => ({
    ...f,
    league: scrubTrademarks(f.league),
    round: scrubTrademarks(f.round),
  }))

  const enriched = fixtures.map(f => ({
    ...f,
    description: generateDescription(f),
    tags: generateTags(f),
  }))

  const output = {
    matches: enriched,
    generatedAt: new Date().toISOString(),
    count: enriched.length,
  }

  const outPath = join(process.cwd(), 'data', 'matches.json')
  writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf-8')
  console.log(`✅ Written ${enriched.length} fixtures → data/matches.json`)

  // Print a sample slug
  if (enriched.length) {
    console.log(`\n   Sample page: /watch/${enriched[0].slug}`)
  }
}

main().catch(err => {
  console.error('❌ Failed:', err)
  process.exit(1)
})
