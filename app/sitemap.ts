import type { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://orca4ktv.com'
  const today = new Date().toISOString().split('T')[0]

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,                  priority: 1.0 },
    { url: `${base}/iptv`,              priority: 0.9 },
    { url: `${base}/iptv-usa`,          priority: 0.9 },
    { url: `${base}/iptv-uk`,           priority: 0.9 },
    { url: `${base}/iptv-canada`,       priority: 0.9 },
    { url: `${base}/iptv-germany`,      priority: 0.9 },
    { url: `${base}/iptv-netherlands`,  priority: 0.9 },
    { url: `${base}/trial`,             priority: 0.9 },
    { url: `${base}/iptv-shop`,          priority: 0.9 },
    { url: `${base}/iptv-shop/1-month`,  priority: 0.9 },
    { url: `${base}/iptv-shop/3-months`, priority: 0.9 },
    { url: `${base}/iptv-shop/6-months`, priority: 0.9 },
    { url: `${base}/iptv-shop/12-months`,priority: 0.9 },
    { url: `${base}/channels`,          priority: 0.8 },
    { url: `${base}/setup-guide`,       priority: 0.8 },
    { url: `${base}/iptv-tools`,                       priority: 0.85 },
    { url: `${base}/iptv-tools/m3u-checker`,           priority: 0.8 },
    { url: `${base}/iptv-tools/xtream-converter`,      priority: 0.8 },
    { url: `${base}/iptv-tools/iptv-speed-test`,       priority: 0.8 },
    { url: `${base}/iptv-tools/epg-validator`,         priority: 0.8 },
    { url: `${base}/iptv-tools/m3u-editor`,            priority: 0.8 },
    { url: `${base}/glossary`,          priority: 0.7 },
    { url: `${base}/security`,          priority: 0.7 },
    { url: `${base}/resellers`,         priority: 0.7 },
    { url: `${base}/blog`,              priority: 0.7 },
    { url: `${base}/about`,             priority: 0.5 },
    { url: `${base}/privacy`,           priority: 0.3 },
    { url: `${base}/terms`,             priority: 0.3 },
    { url: `${base}/dmca`,              priority: 0.3 },
    { url: `${base}/refund-policy`,     priority: 0.3 },
  ].map(r => ({ ...r, lastModified: today, changeFrequency: 'weekly' as const }))

  const blogRoutes: MetadataRoute.Sitemap = getPublishedPosts().map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.dateModified || post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}
