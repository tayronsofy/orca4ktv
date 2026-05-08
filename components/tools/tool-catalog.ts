// Single source of truth for the IPTV Tools suite. Hub page + sitemap + related-tools
// rails all read from this list, so adding a new tool = one edit here.

export interface ToolCatalogEntry {
  slug: string
  href: string
  title: string
  shortTitle: string
  tagline: string
  description: string
  icon: string // Font Awesome class fragment, e.g. "list-check"
  status: 'live' | 'soon'
}

export const TOOL_CATALOG: ToolCatalogEntry[] = [
  {
    slug: 'm3u-checker',
    href: '/iptv-tools/m3u-checker',
    title: 'M3U Playlist Analyzer',
    shortTitle: 'M3U Analyzer',
    tagline: 'Count live channels, movies, series, categories, and countries.',
    description:
      'Paste any M3U URL or upload a playlist file. We parse it and report how many live channels, movies and series it contains, plus the top categories and countries detected.',
    icon: 'fa-chart-pie',
    status: 'live',
  },
  {
    slug: 'xtream-converter',
    href: '/iptv-tools/xtream-converter',
    title: 'M3U ↔ Xtream Codes Converter',
    shortTitle: 'Xtream Converter',
    tagline: 'Switch between M3U URLs and Xtream Codes credentials.',
    description:
      'Enter a host, username, and password to generate the M3U and EPG (XMLTV) URLs for any Xtream-compatible IPTV player. Or paste a get.php URL to extract the credentials.',
    icon: 'fa-arrow-right-arrow-left',
    status: 'live',
  },
  {
    slug: 'iptv-speed-test',
    href: '/iptv-tools/iptv-speed-test',
    title: 'IPTV Speed Test',
    shortTitle: 'Speed Test',
    tagline: 'Find out the highest IPTV resolution your line can handle.',
    description:
      'A browser-based speed test tuned for IPTV: measures sustained download speed and recommends whether your connection is ready for SD, HD, Full-HD or 4K streaming.',
    icon: 'fa-gauge-high',
    status: 'live',
  },
  {
    slug: 'epg-validator',
    href: '/iptv-tools/epg-validator',
    title: 'EPG / XMLTV URL Validator',
    shortTitle: 'EPG Validator',
    tagline: 'Confirm your EPG URL works before importing it.',
    description:
      'Paste an XMLTV / EPG URL and we will fetch it, validate the XML, count channels and programmes, and show the date range so you can spot a stale or broken guide instantly.',
    icon: 'fa-calendar-check',
    status: 'live',
  },
  {
    slug: 'm3u-editor',
    href: '/iptv-tools/m3u-editor',
    title: 'M3U Editor & Sorter',
    shortTitle: 'M3U Editor',
    tagline: 'Clean up, sort, and re-export your M3U playlist.',
    description:
      'A privacy-first browser editor: open your M3U, sort by country or category, remove channels you do not need, rename groups, then download the cleaned file.',
    icon: 'fa-list-ul',
    status: 'live',
  },
]

export function getTool(slug: string): ToolCatalogEntry | undefined {
  return TOOL_CATALOG.find((t) => t.slug === slug)
}

export function getOtherTools(slug: string, max = 4): ToolCatalogEntry[] {
  return TOOL_CATALOG.filter((t) => t.slug !== slug).slice(0, max)
}
