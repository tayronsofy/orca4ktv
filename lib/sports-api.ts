const BASE = 'https://api-football-v1.p.rapidapi.com/v3'

function apiHeaders() {
  return {
    'x-rapidapi-host': 'api-football-v1.p.rapidapi.com',
    'x-rapidapi-key': process.env.RAPIDAPI_KEY ?? '',
  }
}

// ─── Types ──────────────────────────────────────────────────────────────────

export interface Fixture {
  fixtureId: number
  slug: string
  homeTeam: string
  awayTeam: string
  homeLogo: string
  awayLogo: string
  homeScore: number | null
  awayScore: number | null
  kickoff: string          // ISO-8601
  league: string
  leagueId: number
  leagueLogo: string
  venue: string
  city: string
  round: string
  status: string           // NS | 1H | HT | 2H | FT | AET | PEN | CANC …
  elapsed: number | null
  description?: string
  tags?: string[]
}

export type MatchState = 'pre' | 'live' | 'post'

// API-Football status codes
const LIVE_STATUSES  = new Set(['1H','HT','2H','ET','BT','P','SUSP','INT','LIVE'])
const POST_STATUSES  = new Set(['FT','AET','PEN','ABD','AWD','WO','CANC'])

export function getMatchState(status: string): MatchState {
  if (LIVE_STATUSES.has(status))  return 'live'
  if (POST_STATUSES.has(status))  return 'post'
  return 'pre'
}

// ─── Slug ───────────────────────────────────────────────────────────────────

export function generateSlug(home: string, away: string, isoDate: string): string {
  const slugify = (s: string) =>
    s.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')  // strip accents
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  const date = isoDate.split('T')[0]
  return `${slugify(home)}-vs-${slugify(away)}-live-4k-stream-${date}`
}

// ─── API helpers ─────────────────────────────────────────────────────────────

async function apiFetch(path: string) {
  const res = await fetch(`${BASE}${path}`, {
    headers: apiHeaders(),
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`API-Football ${res.status}: ${path}`)
  return res.json()
}

function mapFixture(raw: Record<string, any>): Fixture {
  return {
    fixtureId:   raw.fixture.id,
    slug:        generateSlug(raw.teams.home.name, raw.teams.away.name, raw.fixture.date),
    homeTeam:    raw.teams.home.name,
    awayTeam:    raw.teams.away.name,
    homeLogo:    raw.teams.home.logo,
    awayLogo:    raw.teams.away.logo,
    homeScore:   raw.goals.home,
    awayScore:   raw.goals.away,
    kickoff:     raw.fixture.date,
    league:      raw.league.name,
    leagueId:    raw.league.id,
    leagueLogo:  raw.league.logo,
    venue:       raw.fixture.venue?.name ?? '',
    city:        raw.fixture.venue?.city ?? '',
    round:       raw.league.round,
    status:      raw.fixture.status.short,
    elapsed:     raw.fixture.status.elapsed,
  }
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Fetch all fixtures for the next `days` days.
 * Covers: World Cup 2026 (1), Champions League (2), World Cup Qualifiers (848).
 */
export async function fetchUpcomingFixtures(days = 30): Promise<Fixture[]> {
  const from = new Date().toISOString().split('T')[0]
  const to   = new Date(Date.now() + days * 86_400_000).toISOString().split('T')[0]
  const leagues = [
    { id: 1,   season: 2026 },   // FIFA World Cup 2026
    { id: 2,   season: 2024 },   // UEFA Champions League 2024/25
    { id: 848, season: 2025 },   // World Cup Qualifiers
  ]

  const all: Fixture[] = []
  for (const { id, season } of leagues) {
    try {
      const { response } = await apiFetch(
        `/fixtures?league=${id}&season=${season}&from=${from}&to=${to}&timezone=UTC`
      )
      for (const item of response ?? []) all.push(mapFixture(item))
    } catch (err) {
      console.warn(`Skipped league ${id}:`, err)
    }
  }

  return all.sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime())
}

/** Fetch current live score for a single fixture. */
export async function fetchLiveScore(fixtureId: number): Promise<Fixture | null> {
  const { response } = await apiFetch(`/fixtures?id=${fixtureId}`)
  if (!response?.length) return null
  return mapFixture(response[0])
}
