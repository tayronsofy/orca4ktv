import { NextResponse } from 'next/server'
import matchesData from '@/data/matches.json'
import { getPublishedPosts } from '@/lib/posts'

const KEY = '30ae5a89de2541f78502a0111a939c1e'
const HOST = 'orca4ktv.com'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`

// Static pages to always submit
const STATIC_URLS = [
  '/',
  '/iptv-usa',
  '/iptv-uk',
  '/iptv-canada',
  '/iptv-germany',
  '/iptv-netherlands',
  '/channels',
  '/live-matches',
  '/iptv-shop',
  '/blog',
  '/about',
  '/trial',
  '/resellers',
  '/privacy',
  '/terms',
  '/dmca',
  '/refund-policy',
].map(path => `https://${HOST}${path}`)

// Blog post pages
const BLOG_URLS = getPublishedPosts().map(
  p => `https://${HOST}/blog/${p.slug}`
)

// Match pages
const MATCH_URLS = matchesData.matches.map(
  m => `https://${HOST}/watch/${m.slug}`
)

const ALL_URLS = [...STATIC_URLS, ...BLOG_URLS, ...MATCH_URLS]

// IndexNow supports max 10,000 URLs per request
const BATCH_SIZE = 500

export async function POST() {
  try {
    const batches: string[][] = []
    for (let i = 0; i < ALL_URLS.length; i += BATCH_SIZE) {
      batches.push(ALL_URLS.slice(i, i + BATCH_SIZE))
    }

    const results = await Promise.all(
      batches.map(urlList =>
        fetch('https://api.indexnow.org/indexnow', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
          body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
        }).then(r => ({ status: r.status, ok: r.ok }))
      )
    )

    const allOk = results.every(r => r.ok || r.status === 202)
    return NextResponse.json({
      success: allOk,
      urlsSubmitted: ALL_URLS.length,
      batches: results,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}

// GET — submit on demand from browser or cron
export async function GET() {
  return POST()
}
