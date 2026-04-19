/**
 * AllSportsAPI2 client (via RapidAPI proxy — allsportsapi2.p.rapidapi.com)
 * Data source: Sofascore-backed API
 *
 * Endpoints used:
 *   GET /api/matches/top/{day}/{month}/{year}  — top matches for a date
 *   GET /api/match/{id}                        — single match details (live score)
 *   GET /api/matches/live                      — all currently live matches
 *
 * Team/league logos are served from Sofascore's public CDN (no auth required):
 *   https://img.sofascore.com/api/v1/team/{id}/image
 *   https://img.sofascore.com/api/v1/unique-tournament/{id}/image
 */

const BASE        = 'https://allsportsapi2.p.rapidapi.com'
const SOFASCORE   = 'https://img.sofascore.com/api/v1'

function apiHeaders() {
  return {
    'x-rapidapi-host': process.env.RAPIDAPI_HOST ?? 'allsportsapi2.p.rapidapi.com',
    'x-rapidapi-key':  process.env.RAPIDAPI_KEY  ?? '',
  }
}

const teamLogoUrl       = (id: number) => `${SOFASCORE}/team/${id}/image`
const tournamentLogoUrl = (id: number) => `${SOFASCORE}/unique-tournament/${id}/image`

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Fixture {
  fixtureId:  number
  slug:       string
  homeTeam:   string
  awayTeam:   string
  homeLogo:   string
  awayLogo:   string
  homeScore:  number | null
  awayScore:  number | null
  kickoff:    string        // ISO-8601
  league:     string
  leagueId:   number
  leagueLogo: string
  venue:      string
  city:       string
  round:      string
  status:     string        // NS | 1H | HT | 2H | ET | P | FT | AET | PEN | CANC | SUSP | LIVE
  elapsed:    number | null
  description?: string
  tags?:      string[]
}

export type MatchState = 'pre' | 'live' | 'post'

// ─── Status normalisation ────────────────────────────────────────────────────
// AllSportsAPI2 status object: { type, description, code }
// type:  "notstarted" | "inprogress" | "finished" | "postponed" | "canceled"
// description examples: "Not started" | "1st half" | "Halftime" | "2nd half"
//                       "Extra time"  | "Penalties" | "Ended"
// code:  0=NS, 6=1H, 31=HT, 8=2H, 100=FT, 110=AET, 120=PEN …

function normaliseStatus(
  type: string,
  description: string,
  code: number,
): { status: string; elapsed: number | null } {
  switch (type) {
    case 'notstarted':
      return { status: 'NS', elapsed: null }

    case 'inprogress': {
      const d = description.toLowerCase()
      if (d.includes('halftime') || d === 'half time' || d === 'ht')
        return { status: 'HT', elapsed: 45 }
      if (d.includes('1st') || d.includes('first half'))
        return { status: '1H', elapsed: null }
      if (d.includes('2nd') || d.includes('second half'))
        return { status: '2H', elapsed: null }
      if (d.includes('extra') || d.includes('overtime') || d.includes('et'))
        return { status: 'ET', elapsed: null }
      if (d.includes('penalt'))
        return { status: 'P',  elapsed: null }
      if (d.includes('suspend') || d.includes('interrupt'))
        return { status: 'SUSP', elapsed: null }
      return { status: 'LIVE', elapsed: null }
    }

    case 'finished':
      if (code === 120) return { status: 'PEN', elapsed: null }
      if (code === 110) return { status: 'AET', elapsed: null }
      return { status: 'FT', elapsed: 90 }

    case 'postponed':
    case 'canceled':
    case 'cancelled':
    case 'abandoned':
      return { status: 'CANC', elapsed: null }

    default:
      return { status: 'NS', elapsed: null }
  }
}

// ─── Slug ────────────────────────────────────────────────────────────────────

export function generateSlug(home: string, away: string, isoDate: string): string {
  const slugify = (s: string) =>
    s.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // strip accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  const date = isoDate.split('T')[0]
  return `${slugify(home)}-vs-${slugify(away)}-live-4k-stream-${date}`
}

// ─── Event mapper ─────────────────────────────────────────────────────────────

function mapEvent(raw: Record<string, any>): Fixture {
  const { status, elapsed } = normaliseStatus(
    raw.status?.type        ?? 'notstarted',
    raw.status?.description ?? '',
    raw.status?.code        ?? 0,
  )

  const kickoff = new Date((raw.startTimestamp ?? 0) * 1000).toISOString()

  const round = raw.roundInfo?.name
    ?? (raw.roundInfo?.round ? `Round ${raw.roundInfo.round}` : '')

  return {
    fixtureId:  raw.id,
    slug:       generateSlug(raw.homeTeam?.name ?? '', raw.awayTeam?.name ?? '', kickoff),
    homeTeam:   raw.homeTeam?.name   ?? '',
    awayTeam:   raw.awayTeam?.name   ?? '',
    homeLogo:   raw.homeTeam?.id ? teamLogoUrl(raw.homeTeam.id)           : '',
    awayLogo:   raw.awayTeam?.id ? teamLogoUrl(raw.awayTeam.id)           : '',
    homeScore:  raw.homeScore?.current ?? null,
    awayScore:  raw.awayScore?.current ?? null,
    kickoff,
    league:     raw.tournament?.name                                       ?? '',
    leagueId:   raw.tournament?.id                                         ?? 0,
    leagueLogo: raw.tournament?.id ? tournamentLogoUrl(raw.tournament.id) : '',
    venue:      raw.venue?.name                                            ?? '',
    city:       raw.venue?.city?.name                                      ?? '',
    round,
    status,
    elapsed,
  }
}

// ─── Tournament filter ────────────────────────────────────────────────────────
// Controls which tournaments are included in the fixture store.

// Top 5 domestic league tournament IDs (exact — avoids matching other
// countries whose leagues share the same name, e.g. many "Premier Leagues").
const DOMESTIC_IDS = new Set([
  1,   // English Premier League
  36,  // LaLiga (Spain)
  42,  // Bundesliga (Germany)
  4,   // Ligue 1 (France)
  33,  // Serie A (Italy)
])

function isTargetTournament(ev: Record<string, any>): boolean {
  const tid  = ev.tournament?.id  ?? 0
  const name = (ev.tournament?.name ?? '').toLowerCase()

  // Top-5 domestic leagues — matched by exact tournament ID
  if (DOMESTIC_IDS.has(tid)) return true

  // UEFA club competitions — must start with "UEFA" to exclude AFC/CAF variants
  // and domestic cup rounds like "Pro League, Conference League Playoffs"
  if (name.startsWith('uefa champions league')) return true
  if (name.startsWith('uefa europa league'))    return true
  if (name.startsWith('uefa conference league')) return true

  // FIFA World Cup (men's) — exclude Women's qualifiers
  if (name.includes('world cup') && !name.includes('women') && !name.includes('qualification'))
    return true

  return false
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Fetch top fixtures for the next `days` days, filtered to target tournaments.
 * Makes one API call per day. Called by scripts/generate-fixtures.ts at build time.
 */
export async function fetchUpcomingFixtures(days = 30): Promise<Fixture[]> {
  const all: Fixture[] = []

  for (let d = 0; d < days; d++) {
    const date  = new Date(Date.now() + d * 86_400_000)
    const day   = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year  = date.getUTCFullYear()

    try {
      const res = await fetch(`${BASE}/api/matches/top/${day}/${month}/${year}`, {
        headers: apiHeaders(),
        next: { revalidate: 300 },
      })
      if (!res.ok) {
        console.warn(`  ${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')} → HTTP ${res.status}`)
        continue
      }
      const json = await res.json()
      let count = 0
      for (const ev of json.events ?? []) {
        if (isTargetTournament(ev)) {
          all.push(mapEvent(ev))
          count++
        }
      }
      if (count) console.log(`  ${year}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')} → ${count} target fixtures`)
    } catch (err) {
      console.warn(`  Skipped ${year}-${month}-${day}:`, err)
    }
  }

  // Deduplicate by fixtureId
  const seen = new Set<number>()
  return all
    .filter(f => { if (seen.has(f.fixtureId)) return false; seen.add(f.fixtureId); return true })
    .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime())
}

/**
 * Fetch the current live score for a single fixture.
 * Called by /api/live-score/[fixtureId] via SWR every 60 s.
 */
export async function fetchLiveScore(fixtureId: number): Promise<Fixture | null> {
  try {
    const res = await fetch(`${BASE}/api/match/${fixtureId}`, {
      headers: apiHeaders(),
      // no-store: always fresh for live scores
      cache: 'no-store',
    })
    if (!res.ok) return null
    const json = await res.json()
    // Response is either { event: {...} } or the event object directly
    const ev = json.event ?? json
    if (!ev?.id) return null
    return mapEvent(ev)
  } catch (err) {
    console.warn(`fetchLiveScore(${fixtureId}):`, err)
    return null
  }
}
