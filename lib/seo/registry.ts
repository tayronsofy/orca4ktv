/**
 * Registry of the marketing pages editable in /admin/seo.
 * defaultTitle/defaultDescription are snapshots of the hardcoded values in
 * each page's metadata export — shown as placeholders in the editor and used
 * as fallbacks when no override row exists.
 */

export interface SeoRegistryEntry {
  key: string
  path: string
  label: string
  defaultTitle: string
  defaultDescription: string
}

export const SEO_PAGES: SeoRegistryEntry[] = [
  {
    key: 'home',
    path: '/',
    label: 'Homepage',
    defaultTitle: 'ORCA 4K TV - Premium 4K IPTV Streaming Service',
    defaultDescription:
      'ORCA 4K TV is a premium 4K IPTV streaming brand: 22,000+ live channels, 100,000+ movies, Anti Freeze CDN and AES-256 security across USA, UK, Canada, Germany, Netherlands & Sweden. Explore plans, regions, tools and a free trial.',
  },
  {
    key: 'iptv',
    path: '/iptv',
    label: 'IPTV Plans',
    defaultTitle: 'IPTV Subscription Plans - 22,000+ Channels From $7.92/mo | ORCA 4K TV',
    defaultDescription:
      'Buy an ORCA 4K TV IPTV subscription: 1, 3, 6 or 12-month plans from $7.92/mo. 22,000+ live channels, 100,000+ movies in 4K HDR, up to 4 connections, instant activation and a money-back guarantee.',
  },
  {
    key: 'iptv-usa',
    path: '/iptv-usa',
    label: 'IPTV USA',
    defaultTitle: 'Best IPTV USA 2026 - Live Sports & US Networks | ORCA 4K TV',
    defaultDescription:
      'Best IPTV USA 2026: live US sports + every major free-to-air network in 4K HDR. 22,000+ channels, multi-device, no contract. From $7.92/mo.',
  },
  {
    key: 'iptv-uk',
    path: '/iptv-uk',
    label: 'IPTV UK',
    defaultTitle: 'Best IPTV UK 2026 - Live Sports & UK Networks | ORCA 4K TV',
    defaultDescription:
      'Best IPTV UK 2026: every UK football matchday, top European football, motorsport & Grand Slam tennis in 4K HDR. 22,000+ channels, all UK free-to-air networks.',
  },
  {
    key: 'iptv-canada',
    path: '/iptv-canada',
    label: 'IPTV Canada',
    defaultTitle: 'Best IPTV Canada 2026 - Hockey, Live Sports & CA Networks | ORCA 4K TV',
    defaultDescription:
      'Best IPTV Canada 2026: every pro hockey playoff, Canadian football & the 2026 Winter Games in 4K HDR. 22,000+ channels, all CA networks. Bilingual EN/FR.',
  },
  {
    key: 'iptv-germany',
    path: '/iptv-germany',
    label: 'IPTV Deutschland',
    defaultTitle: 'Bestes IPTV Deutschland 2026 - Live-Sport & DE-Sender | ORCA 4K TV',
    defaultDescription:
      'Bestes IPTV Deutschland 2026: deutscher Spitzenfußball, top europäischer Klubfußball, Motorsport, Olympia 2026 in 4K HDR. 22.000+ Sender, alle wichtigen deutschen Free-TV-Sender. Sofort aktiviert.',
  },
  {
    key: 'iptv-netherlands',
    path: '/iptv-netherlands',
    label: 'IPTV Nederland',
    defaultTitle: 'Beste IPTV Nederland 2026 - Live-Sport & NL-Zenders | ORCA 4K TV',
    defaultDescription:
      'Beste IPTV Nederland 2026: Nederlands topvoetbal, top Europees clubvoetbal, motorsport, Olympische Spelen 2026 in 4K HDR. 22.000+ zenders, alle belangrijke Nederlandse free-to-air zenders. Direct actief.',
  },
  {
    key: 'iptv-sweden',
    path: '/iptv-sweden',
    label: 'IPTV Sverige',
    defaultTitle: 'Bästa IPTV Sverige 2026 - Svensk sport och alla kanaler i 4K | ORCA 4K TV',
    defaultDescription:
      'Bästa IPTV Sverige 2026: svensk elitfotboll, elithockey, skidskytte och vinterspelen 2026 i 4K HDR. 22 000+ kanaler, alla viktiga svenska kanaler. Priser i kronor, ingen bindningstid.',
  },
  {
    key: 'trial',
    path: '/trial',
    label: 'Free Trial',
    defaultTitle: 'Free IPTV Trial 2026 - Instant Activation | ORCA 4K TV',
    defaultDescription:
      'Free IPTV trial with instant activation. Test ORCA 4K TV - 22,000+ channels in 4K HDR, smart EPG, multi-device. No credit card. Stream in 5 minutes.',
  },
]

export function getRegistryEntry(key: string): SeoRegistryEntry | undefined {
  return SEO_PAGES.find(p => p.key === key)
}
