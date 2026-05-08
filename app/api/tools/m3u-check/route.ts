import { NextRequest, NextResponse } from 'next/server'
import { parseM3U } from '@/lib/tools/m3u-parser'
import { analyze, type PlaylistAnalysis } from '@/lib/tools/m3u-classify'
import { assertSafeUrl } from '@/lib/tools/ssrf-guard'
import { checkAndRecord } from '@/lib/tools/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 90

const PLAYLIST_FETCH_TIMEOUT_MS = 60_000
const PLAYLIST_SIZE_CAP = 30 * 1024 * 1024 // 30 MB
const PLAYLIST_EARLY_EXIT_ENTRIES = 100_000 // big enough for accurate breakdown
const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 } // 5 / hour

class FriendlyError extends Error {
  constructor(message: string, public httpStatus = 400) {
    super(message)
  }
}

interface CheckRequestBody {
  mode: 'url' | 'paste'
  url?: string
  content?: string
}

interface FetchResult {
  text: string
  bytesRead: number
  truncated: boolean
  truncatedReason?: 'entry-cap' | 'size-cap'
}

async function fetchPlaylistFromUrl(url: string): Promise<FetchResult> {
  const safety = await assertSafeUrl(url)
  if (!safety.ok) throw new FriendlyError(safety.reason ?? 'URL not allowed.')
  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), PLAYLIST_FETCH_TIMEOUT_MS)
  try {
    let res: Response
    try {
      res = await fetch(safety.url!.toString(), {
        method: 'GET',
        signal: ac.signal,
        headers: {
          'User-Agent': 'VLC/3.0.20 LibVLC/3.0.20',
          Accept: '*/*',
        },
        redirect: 'follow',
      })
    } catch (err) {
      const e = err as Error
      if (e.name === 'AbortError') {
        throw new FriendlyError(
          `The playlist server did not respond within ${PLAYLIST_FETCH_TIMEOUT_MS / 1000} seconds. The server may be overloaded or your subscription URL has expired.`,
        )
      }
      throw new FriendlyError(`Could not connect to the playlist host: ${e.message || 'unknown network error'}.`)
    }

    if (!res.ok) {
      throw new FriendlyError(
        res.status === 401 || res.status === 403
          ? 'The playlist host returned an authentication error. Check that your username and password are correct and your subscription is active.'
          : `The playlist host returned HTTP ${res.status}. Your subscription may have expired or the server is having issues.`,
      )
    }

    const ct = res.headers.get('content-type') ?? ''
    if (ct.includes('text/html')) {
      throw new FriendlyError(
        'The playlist host returned an HTML page, not a playlist. Your subscription URL may have expired or be incorrect.',
      )
    }

    const reader = res.body?.getReader()
    if (!reader) throw new FriendlyError('The playlist host returned an empty response.')

    const decoder = new TextDecoder('utf-8')
    let bytesRead = 0
    let text = ''
    let entryCount = 0
    let truncated = false
    let truncatedReason: 'entry-cap' | 'size-cap' | undefined

    while (true) {
      let chunk: ReadableStreamReadResult<Uint8Array>
      try {
        chunk = await reader.read()
      } catch (err) {
        const e = err as Error
        if (text.length > 256 && entryCount > 0) break // salvage partial data
        if (e.name === 'AbortError') {
          throw new FriendlyError(
            `Your playlist host is too slow (no response in ${PLAYLIST_FETCH_TIMEOUT_MS / 1000} seconds). For huge playlists with hundreds of thousands of channels, use the Paste tab and upload a smaller .m3u file.`,
          )
        }
        throw new FriendlyError(`Lost connection while downloading the playlist: ${e.message || 'unknown error'}.`)
      }
      const { value, done } = chunk
      if (done) break

      bytesRead += value.byteLength
      text += decoder.decode(value, { stream: true })

      const newEntries = (text.match(/#EXTINF/g) ?? []).length
      if (newEntries > entryCount) entryCount = newEntries

      if (entryCount >= PLAYLIST_EARLY_EXIT_ENTRIES) {
        await reader.cancel().catch(() => {})
        truncated = true
        truncatedReason = 'entry-cap'
        break
      }
      if (bytesRead > PLAYLIST_SIZE_CAP) {
        await reader.cancel().catch(() => {})
        if (entryCount === 0) {
          throw new FriendlyError(
            `Playlist too large (over ${PLAYLIST_SIZE_CAP / 1024 / 1024} MB) and no channels parsed. Use the Paste tab to upload a trimmed file.`,
          )
        }
        truncated = true
        truncatedReason = 'size-cap'
        break
      }
    }
    text += decoder.decode()
    return { text, bytesRead, truncated, truncatedReason }
  } finally {
    clearTimeout(timer)
  }
}

export interface CheckResponse {
  ok: true
  analysis: PlaylistAnalysis
  // True when we stopped reading early. The analysis is then a sample of the
  // start of the playlist and may not represent the full distribution.
  partial: boolean
  partialReason?: 'entry-cap' | 'size-cap'
  bytesRead: number
  rateLimit: { remaining: number }
}

export async function POST(request: NextRequest) {
  const rl = await checkAndRecord('m3u-check', request, RATE_LIMIT)
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'rate_limited', retryAfterSec: rl.retryAfterSec, message: 'Too many checks. Try again in an hour.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
    )
  }

  let body: CheckRequestBody
  try {
    body = (await request.json()) as CheckRequestBody
  } catch {
    return NextResponse.json({ error: 'bad_request', message: 'Invalid JSON body.' }, { status: 400 })
  }

  let fetched: FetchResult
  try {
    if (body.mode === 'url') {
      if (!body.url) return NextResponse.json({ error: 'bad_request', message: 'URL is required.' }, { status: 400 })
      fetched = await fetchPlaylistFromUrl(body.url)
    } else {
      if (!body.content) return NextResponse.json({ error: 'bad_request', message: 'Playlist content is required.' }, { status: 400 })
      if (body.content.length > PLAYLIST_SIZE_CAP) {
        return NextResponse.json(
          { error: 'bad_request', message: `Playlist too large (limit ${PLAYLIST_SIZE_CAP / 1024 / 1024} MB).` },
          { status: 413 },
        )
      }
      fetched = { text: body.content, bytesRead: body.content.length, truncated: false }
    }
  } catch (err) {
    const e = err as Error
    const status = err instanceof FriendlyError ? err.httpStatus : 400
    const msg = err instanceof FriendlyError
      ? e.message
      : e.name === 'AbortError'
      ? 'The playlist server did not respond in time.'
      : e.message || 'Could not load playlist.'
    return NextResponse.json({ error: 'fetch_failed', message: msg }, { status })
  }

  const parsed = parseM3U(fetched.text)
  if (parsed.entries.length === 0) {
    return NextResponse.json(
      { error: 'parse_failed', message: 'No streams found in this playlist.', warnings: parsed.warnings },
      { status: 400 },
    )
  }

  const analysis = analyze(parsed.entries)

  const response: CheckResponse = {
    ok: true,
    analysis,
    partial: fetched.truncated,
    partialReason: fetched.truncatedReason,
    bytesRead: fetched.bytesRead,
    rateLimit: { remaining: rl.remaining },
  }

  return NextResponse.json(response)
}
