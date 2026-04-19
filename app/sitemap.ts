import type { MetadataRoute } from 'next'
import matchesData from '@/data/matches.json'
import type { Fixture } from '@/lib/sports-api'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://smart4k.io'
  const now = new Date().toISOString()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,                  priority: 1.0 },
    { url: `${base}/iptv-usa`,          priority: 0.9 },
    { url: `${base}/iptv-uk`,           priority: 0.9 },
    { url: `${base}/iptv-canada`,       priority: 0.9 },
    { url: `${base}/iptv-germany`,      priority: 0.9 },
    { url: `${base}/iptv-netherlands`,  priority: 0.9 },
    { url: `${base}/trial`,             priority: 0.8 },
    { url: `${base}/iptv-shop`,         priority: 0.8 },
    { url: `${base}/channels`,          priority: 0.7 },
    { url: `${base}/resellers`,         priority: 0.7 },
    { url: `${base}/blog`,              priority: 0.6 },
  ].map(r => ({ ...r, lastModified: now, changeFrequency: 'weekly' as const }))

  const matchRoutes: MetadataRoute.Sitemap = (matchesData.matches as Fixture[]).map(m => ({
    url: `${base}/watch/${m.slug}`,
    lastModified: now,
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...matchRoutes]
}
