// Classify an M3U entry into live / movie / series / unknown, and detect a
// country tag. The Xtream Codes spec encodes type in the URL path
// (/live/, /movie/, /series/), but plenty of providers (including the
// flat-format ones) only hint at type via group-title or filename.

import type { M3UEntry } from './m3u-parser'

export type StreamType = 'live' | 'movie' | 'series' | 'unknown'

const VIDEO_EXT = /\.(mp4|mkv|avi|m4v|mov|webm|flv)(\?|$)/i
const SERIES_EPISODE = /\bs\d{1,2}\s?e\d{1,3}\b/i

export function classify(entry: M3UEntry): StreamType {
  let path = ''
  try {
    path = new URL(entry.url).pathname.toLowerCase()
  } catch {
    // unparseable URL — fall back to text-only heuristics
  }
  const group = (entry.group ?? '').toLowerCase()
  const name = (entry.name ?? '').toLowerCase()

  // URL path is the most reliable signal — Xtream Codes / Stalker conventions
  if (path.includes('/series/')) return 'series'
  if (path.includes('/movie/') || path.includes('/vod/')) return 'movie'
  if (path.includes('/live/')) return 'live'

  // File extension on the URL — VOD files end in mp4/mkv etc, live streams in .ts or no ext
  if (VIDEO_EXT.test(path)) {
    return SERIES_EPISODE.test(name) ? 'series' : 'movie'
  }

  // Episode marker in name (S01E02 etc.) almost always means series
  if (SERIES_EPISODE.test(name)) return 'series'

  // Group title heuristics (case-insensitive). Order matters: series before movie
  // because "movies & series" is a common combined group.
  if (/\b(series|tv ?shows?|seasons?)\b/.test(group)) return 'series'
  if (/\b(movies?|films?|cinema|vod)\b/.test(group)) return 'movie'

  // 24/7 loops are usually movie/series re-runs but presented as live channels
  // — count them as live since that's how they play
  return 'live'
}

// ---------- Country detection ----------

// ISO-2 country codes ORCA cares about plus a few common ones we want named.
// Not exhaustive — anything we can't identify falls into "Other / Unknown".
const COUNTRY_NAMES: Record<string, string> = {
  US: 'United States',
  USA: 'United States',
  UK: 'United Kingdom',
  GB: 'United Kingdom',
  CA: 'Canada',
  DE: 'Germany',
  GE: 'Germany', // some providers misuse GE for Germany
  NL: 'Netherlands',
  FR: 'France',
  ES: 'Spain',
  IT: 'Italy',
  PT: 'Portugal',
  BR: 'Brazil',
  MX: 'Mexico',
  AR: 'Argentina',
  TR: 'Turkey',
  SA: 'Saudi Arabia',
  AE: 'UAE',
  EG: 'Egypt',
  MA: 'Morocco',
  DZ: 'Algeria',
  TN: 'Tunisia',
  GR: 'Greece',
  RO: 'Romania',
  PL: 'Poland',
  RU: 'Russia',
  UA: 'Ukraine',
  IN: 'India',
  PK: 'Pakistan',
  BD: 'Bangladesh',
  CN: 'China',
  JP: 'Japan',
  KR: 'South Korea',
  TH: 'Thailand',
  ID: 'Indonesia',
  PH: 'Philippines',
  AU: 'Australia',
  NZ: 'New Zealand',
  ZA: 'South Africa',
  NG: 'Nigeria',
  KE: 'Kenya',
  IE: 'Ireland',
  SE: 'Sweden',
  NO: 'Norway',
  DK: 'Denmark',
  FI: 'Finland',
  BE: 'Belgium',
  CH: 'Switzerland',
  AT: 'Austria',
  CZ: 'Czechia',
  HU: 'Hungary',
  IL: 'Israel',
  IR: 'Iran',
  IQ: 'Iraq',
  AF: 'Afghanistan',
  AL: 'Albania',
  HR: 'Croatia',
  RS: 'Serbia',
  BG: 'Bulgaria',
  EX: 'EX-YU',
  EXYU: 'EX-YU',
}

// Long-name lookup — checked when we don't see a clean ISO prefix.
const COUNTRY_NAME_PATTERNS: Array<[RegExp, string]> = [
  [/\bunited\s?states\b|\busa?\b|\bamerican\b/i, 'United States'],
  [/\bunited\s?kingdom\b|\bbritish\b|\bbritain\b/i, 'United Kingdom'],
  [/\bcanad(?:a|ian)\b/i, 'Canada'],
  [/\bgerman(?:y|an)\b|\bdeutsch\w*/i, 'Germany'],
  [/\bnetherlands\b|\bdutch\b|\bholland\b/i, 'Netherlands'],
  [/\bfrench?\b|\bfrance\b/i, 'France'],
  [/\bspanish\b|\bespan\w*|\bspain\b/i, 'Spain'],
  [/\bitalian\b|\bitalia\b|\bitaly\b/i, 'Italy'],
  [/\bportuguese\b|\bportugal\b/i, 'Portugal'],
  [/\bbrazil\w*|\bbr[ae]zilian\b/i, 'Brazil'],
  [/\bmexic\w*/i, 'Mexico'],
  [/\barabic\b|\bsaudi\b|\bemirates\b|\barab\b/i, 'Arabic / MENA'],
  [/\bturk\w*/i, 'Turkey'],
  [/\bgreek\b|\bgreece\b/i, 'Greece'],
  [/\bromania\w*/i, 'Romania'],
  [/\bpolish\b|\bpoland\b/i, 'Poland'],
  [/\bindi(?:a|an)\b|\bhindi\b/i, 'India'],
  [/\bchin(?:a|ese)\b/i, 'China'],
  [/\bjapan\w*/i, 'Japan'],
  [/\bkorean?\b/i, 'South Korea'],
  [/\baustral\w*/i, 'Australia'],
  [/\bafric\w*/i, 'Africa'],
  [/\blatin\b|\blatino\b/i, 'Latin America'],
]

function normalizeCountryCode(cc: string): string | undefined {
  const up = cc.toUpperCase()
  if (COUNTRY_NAMES[up]) return up
  return undefined
}

export interface CountryDetection {
  code: string // canonical ID (ISO-2 where known, else free-text label)
  name: string
}

export function detectCountry(entry: M3UEntry): CountryDetection | undefined {
  // 1. tvg-id with country suffix: "bbcone.uk" -> UK
  if (entry.tvgId) {
    const dot = entry.tvgId.lastIndexOf('.')
    if (dot > 0) {
      const cc = normalizeCountryCode(entry.tvgId.slice(dot + 1))
      if (cc) return { code: cc, name: COUNTRY_NAMES[cc] }
    }
  }

  // 2. Group-title prefix: "US | Sports", "UK: Movies", "DE - Sport", "[FR] News"
  const group = entry.group ?? ''
  const prefixMatch = group.match(/^[\s\[\(]*([A-Za-z]{2,3})\s*[\|\-:\.\]\)\>]/)
  if (prefixMatch) {
    const cc = normalizeCountryCode(prefixMatch[1])
    if (cc) return { code: cc, name: COUNTRY_NAMES[cc] }
  }

  // 3. Channel name prefix (same shape, often used for live channels):
  //    "US| ESPN HD", "UK: Sky Sports"
  const namePrefix = (entry.name ?? '').match(/^[\s\[\(]*([A-Za-z]{2,3})\s*[\|\-:\.\]\)\>]/)
  if (namePrefix) {
    const cc = normalizeCountryCode(namePrefix[1])
    if (cc) return { code: cc, name: COUNTRY_NAMES[cc] }
  }

  // 4. Long-name fallback — country word anywhere in group/name
  const haystack = `${group} ${entry.name ?? ''}`
  for (const [re, label] of COUNTRY_NAME_PATTERNS) {
    if (re.test(haystack)) {
      const cc = normalizeCountryCode(label.replace(/\s.*/, '').slice(0, 2)) ?? label.toUpperCase()
      return { code: cc, name: label }
    }
  }

  return undefined
}

// ---------- Aggregate analysis ----------

export interface PlaylistAnalysis {
  totalEntries: number
  byType: Record<StreamType, number>
  topCategories: Array<{ name: string; count: number }>
  topCountries: Array<{ code: string; name: string; count: number }>
}

export function analyze(entries: M3UEntry[], topN = 15): PlaylistAnalysis {
  const byType: Record<StreamType, number> = { live: 0, movie: 0, series: 0, unknown: 0 }
  const categoryCounts = new Map<string, number>()
  const countryCounts = new Map<string, { name: string; count: number }>()

  for (const e of entries) {
    byType[classify(e)]++

    const group = (e.group ?? '').trim()
    if (group) {
      categoryCounts.set(group, (categoryCounts.get(group) ?? 0) + 1)
    }

    const cd = detectCountry(e)
    if (cd) {
      const existing = countryCounts.get(cd.code)
      if (existing) existing.count += 1
      else countryCounts.set(cd.code, { name: cd.name, count: 1 })
    }
  }

  const topCategories = [...categoryCounts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN)

  const topCountries = [...countryCounts.entries()]
    .map(([code, v]) => ({ code, name: v.name, count: v.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, topN)

  return {
    totalEntries: entries.length,
    byType,
    topCategories,
    topCountries,
  }
}
