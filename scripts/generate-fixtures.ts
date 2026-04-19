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
    `Watch ${f.homeTeam} vs ${f.awayTeam} live in 4K Ultra-HD on Smart 4K — our servers are optimized for match-day traffic, so you get a buffer-free stream from the first whistle to the last.`,
    `Available on Smart TV, Amazon Firestick, Android, iPhone, and PC. No contracts, instant activation.`,
  ].join(' ')
}

function generateTags(f: Fixture): string[] {
  const tags = [f.league, f.round, f.homeTeam, f.awayTeam, 'live stream', '4K IPTV', 'watch online']
  if (f.league.toLowerCase().includes('world cup')) tags.push('FIFA World Cup 2026', 'World Cup live')
  if (f.league.toLowerCase().includes('champions')) tags.push('UCL', 'Champions League live')
  return [...new Set(tags)]
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('⚡ Fetching fixtures from AllSportsAPI…')

  const fixtures = await fetchUpcomingFixtures(30)
  console.log(`   Found ${fixtures.length} fixtures`)

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
