import { NextResponse } from 'next/server'
import matchesData from '@/data/matches.json'

const KEY = 'f6dcce60db2349098cb182c8af452cf3'
const HOST = 'smart4k.io'
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

// Match pages
const MATCH_URLS = matchesData.matches.map(
  m => `https://${HOST}/watch/${m.slug}`
)

const ALL_URLS = [...STATIC_URLS, ...MATCH_URLS]

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
