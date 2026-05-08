import { NextRequest, NextResponse } from 'next/server'
import { parseM3U, type M3UEntry } from '@/lib/tools/m3u-parser'
import { checkAndRecord } from '@/lib/tools/rate-limit'
import {
  fetchPlaylistFromUrl,
  FriendlyError,
  PLAYLIST_SIZE_CAP,
} from '@/lib/tools/fetch-playlist'

// Helper endpoint for the M3U editor: fetch a playlist server-side (CORS),
// parse it, and return the raw entries so the browser can render the editor
// table without needing to host the playlist file itself.

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 90

const RATE_LIMIT = { max: 10, windowMs: 60 * 60 * 1000 } // editor sees more legitimate use than the analyzer

interface FetchRequestBody {
  url: string
}

export interface FetchResponse {
  ok: true
  entries: M3UEntry[]
  truncated: boolean
  truncatedReason?: 'entry-cap' | 'size-cap'
  bytesRead: number
  rateLimit: { remaining: number }
}

export async function POST(request: NextRequest) {
  const rl = await checkAndRecord('m3u-fetch', request, RATE_LIMIT)
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'rate_limited', retryAfterSec: rl.retryAfterSec, message: 'Too many fetches. Try again in an hour.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
    )
  }

  let body: FetchRequestBody
  try {
    body = (await request.json()) as FetchRequestBody
  } catch {
    return NextResponse.json({ error: 'bad_request', message: 'Invalid JSON body.' }, { status: 400 })
  }

  if (!body.url) {
    return NextResponse.json({ error: 'bad_request', message: 'URL is required.' }, { status: 400 })
  }

  let fetched
  try {
    fetched = await fetchPlaylistFromUrl(body.url)
  } catch (err) {
    const e = err as Error
    const status = err instanceof FriendlyError ? err.httpStatus : 400
    const msg = err instanceof FriendlyError ? e.message : e.message || 'Could not load playlist.'
    return NextResponse.json({ error: 'fetch_failed', message: msg }, { status })
  }

  if (fetched.bytesRead > PLAYLIST_SIZE_CAP) {
    // Should never happen — fetch helper enforces — but defend anyway.
    return NextResponse.json({ error: 'too_large', message: 'Playlist exceeded the size cap.' }, { status: 413 })
  }

  const parsed = parseM3U(fetched.text)
  if (parsed.entries.length === 0) {
    return NextResponse.json(
      { error: 'parse_failed', message: 'No streams found in this playlist.', warnings: parsed.warnings },
      { status: 400 },
    )
  }

  const response: FetchResponse = {
    ok: true,
    entries: parsed.entries,
    truncated: fetched.truncated,
    truncatedReason: fetched.truncatedReason,
    bytesRead: fetched.bytesRead,
    rateLimit: { remaining: rl.remaining },
  }
  return NextResponse.json(response)
}
