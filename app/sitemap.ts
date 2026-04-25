import type { MetadataRoute } from 'next'
import { getPublishedPosts } from '@/lib/posts'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://smart4k.io'

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`,                  priority: 1.0 },
    { url: `${base}/iptv-usa`,          priority: 0.9 },
    { url: `${base}/iptv-uk`,           priority: 0.9 },
    { url: `${base}/iptv-canada`,       priority: 0.9 },
    { url: `${base}/iptv-germany`,      priority: 0.9 },
    { url: `${base}/iptv-netherlands`,  priority: 0.9 },
    { url: `${base}/trial`,             priority: 0.8 },
    { url: `${base}/iptv-shop`,         priority: 0.8 },
    { url: `${base}/live-matches`,      priority: 0.8 },
    { url: `${base}/channels`,          priority: 0.7 },
    { url: `${base}/resellers`,         priority: 0.7 },
    { url: `${base}/blog`,              priority: 0.7 },
    { url: `${base}/about`,             priority: 0.5 },
    { url: `${base}/privacy`,           priority: 0.3 },
    { url: `${base}/terms`,             priority: 0.3 },
    { url: `${base}/dmca`,              priority: 0.3 },
    { url: `${base}/refund-policy`,     priority: 0.3 },
  ].map(r => ({ ...r, lastModified: '2026-04-23', changeFrequency: 'weekly' as const }))

  const blogRoutes: MetadataRoute.Sitemap = getPublishedPosts().map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}
