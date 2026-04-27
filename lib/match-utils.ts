import type { Fixture } from './sports-api'

export type MatchState = 'pre' | 'live' | 'post'

const LIVE_STATUSES = new Set(['1H','HT','2H','ET','BT','P','SUSP','INT','LIVE'])
const POST_STATUSES = new Set(['FT','AET','PEN','ABD','AWD','WO','CANC'])

export function getMatchState(kickoff: string, status: string): MatchState {
  if (LIVE_STATUSES.has(status)) return 'live'
  if (POST_STATUSES.has(status)) return 'post'
  // Fallback: derive from timestamp if API status is stale
  const now = Date.now()
  const start = new Date(kickoff).getTime()
  if (now < start) return 'pre'
  if (now < start + 2 * 60 * 60 * 1000) return 'live'
  return 'post'
}

export function formatKickoff(kickoff: string, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
    hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
    ...opts,
  }).format(new Date(kickoff))
}

export function generateMetaTitle(match: Fixture): string {
  return `Watch ${match.homeTeam} vs ${match.awayTeam} Live in 4K — ${match.league}`
}

export function generateMetaDescription(match: Fixture): string {
  const date = new Intl.DateTimeFormat('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  }).format(new Date(match.kickoff))
  return `Stream ${match.homeTeam} vs ${match.awayTeam} live on ${date}. ${match.league} — ${match.round}. Watch in 4K Ultra-HD with zero buffering. Instant access on Smart TV, Firestick, iPhone, PC. Orca 4K TV IPTV.`
}

export function generateMatchDescription(match: Fixture): string {
  const date = formatKickoff(match.kickoff)
  const venue = match.venue ? ` at ${match.venue}, ${match.city}` : ''
  return [
    `${match.homeTeam} take on ${match.awayTeam} in what promises to be a thrilling ${match.league} ${match.round} clash.`,
    `The match kicks off on ${date}${venue}.`,
    `Stream every moment live in crystal-clear 4K Ultra-HD — from the opening whistle to the final goal — without a single buffer.`,
    `Orca 4K TV delivers premium IPTV with 22,000+ live channels, optimized servers for peak match-day traffic, and instant activation on any device.`,
  ].join(' ')
}

// ─── JSON-LD schemas ─────────────────────────────────────────────────────────

export function buildEventSchema(match: Fixture) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: `${match.homeTeam} vs ${match.awayTeam}`,
    startDate: match.kickoff,
    sport: 'Football',
    description: generateMetaDescription(match),
    url: `https://orca4ktv.com/watch/${match.slug}`,
    homeTeam: { '@type': 'SportsTeam', name: match.homeTeam },
    awayTeam: { '@type': 'SportsTeam', name: match.awayTeam },
    organizer: { '@type': 'Organization', name: match.league },
    ...(match.venue && {
      location: {
        '@type': 'Place',
        name: match.venue,
        address: { '@type': 'PostalAddress', addressLocality: match.city },
      },
    }),
    offers: {
      '@type': 'Offer',
      name: 'Live Stream — Match Pass',
      price: '2.00',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: `https://orca4ktv.com/watch/${match.slug}`,
    },
  }
}

export function buildVideoObjectSchema(match: Fixture) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: `${match.homeTeam} vs ${match.awayTeam} — Live 4K Stream`,
    description: generateMetaDescription(match),
    thumbnailUrl: `https://orca4ktv.com/watch/${match.slug}/opengraph-image`,
    uploadDate: match.kickoff,
    duration: 'PT2H',
    contentUrl: `https://orca4ktv.com/watch/${match.slug}`,
    publication: {
      '@type': 'BroadcastEvent',
      isLiveBroadcast: true,
      startDate: match.kickoff,
    },
  }
}
