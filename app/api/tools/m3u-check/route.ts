import { NextRequest, NextResponse } from 'next/server'
import pLimit from 'p-limit'
import { parseM3U } from '@/lib/tools/m3u-parser'
import { assertSafeUrl } from '@/lib/tools/ssrf-guard'
import { checkAndRecord } from '@/lib/tools/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const PLAYLIST_FETCH_TIMEOUT_MS = 30_000
const PLAYLIST_SIZE_CAP = 10 * 1024 * 1024 // 10 MB
const STREAM_PROBE_TIMEOUT_MS = 4_000
const STREAM_PROBE_BYTES = 64 * 1024
const SLOW_THRESHOLD_MS = 2_500
const MAX_STREAMS_TO_CHECK = 50
const PARALLELISM = 10
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

interface StreamResult {
  name: string
  url: string
  group?: string
  status: 'working' | 'slow' | 'dead'
  responseMs?: number
  errorReason?: string
}

async function fetchPlaylistFromUrl(url: string): Promise<string> {
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
          // Some IPTV servers block non-browser UAs. Mimic VLC, the most common IPTV client.
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
      // DNS failures, connection refused, TLS errors, etc.
      throw new FriendlyError(`Could not connect to the playlist host: ${e.message || 'unknown network error'}.`)
    }

    if (!res.ok) {
      throw new FriendlyError(
        res.status === 401 || res.status === 403
          ? 'The playlist host returned an authentication error. Check that your username and password are correct and your subscription is active.'
          : `The playlist host returned HTTP ${res.status}. Your subscription may have expired or the server is having issues.`,
      )
    }

    // Detect HTML responses (login pages, error pages) before trying to parse as M3U.
    const ct = res.headers.get('content-type') ?? ''
    if (ct.includes('text/html')) {
      throw new FriendlyError(
        'The playlist host returned an HTML page, not a playlist. Your subscription URL may have expired or be incorrect.',
      )
    }

    const reader = res.body?.getReader()
    if (!reader) throw new FriendlyError('The playlist host returned an empty response.')

    const decoder = new TextDecoder('utf-8')
    let received = 0
    let text = ''
    while (true) {
      let chunk: ReadableStreamReadResult<Uint8Array>
      try {
        chunk = await reader.read()
      } catch (err) {
        const e = err as Error
        if (e.name === 'AbortError') {
          throw new FriendlyError(
            `The playlist download stalled after ${PLAYLIST_FETCH_TIMEOUT_MS / 1000} seconds. Try a smaller M3U or use the Paste tab to upload the file directly.`,
          )
        }
        throw new FriendlyError(`Lost connection while downloading the playlist: ${e.message || 'unknown error'}.`)
      }
      const { value, done } = chunk
      if (done) break
      received += value.byteLength
      if (received > PLAYLIST_SIZE_CAP) {
        await reader.cancel()
        throw new FriendlyError(
          `Playlist too large (over ${PLAYLIST_SIZE_CAP / 1024 / 1024} MB). Use the Paste tab to upload a trimmed file.`,
        )
      }
      text += decoder.decode(value, { stream: true })
    }
    text += decoder.decode()
    return text
  } finally {
    clearTimeout(timer)
  }
}

async function probeStream(url: string): Promise<{ status: 'working' | 'slow' | 'dead'; responseMs?: number; errorReason?: string }> {
  // SSRF guard each stream URL too - they come from user-supplied content.
  const safety = await assertSafeUrl(url)
  if (!safety.ok) {
    return { status: 'dead', errorReason: safety.reason ?? 'Blocked URL.' }
  }

  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), STREAM_PROBE_TIMEOUT_MS)
  const start = Date.now()
  try {
    let res: Response
    try {
      res = await fetch(safety.url!.toString(), {
        method: 'HEAD',
        signal: ac.signal,
        headers: { 'User-Agent': 'orca4ktv-m3u-checker/1.0', Accept: '*/*' },
        redirect: 'follow',
      })
    } catch {
      // Some IPTV servers don't support HEAD - fall back to GET with byte range
      res = await fetch(safety.url!.toString(), {
        method: 'GET',
        signal: ac.signal,
        headers: {
          'User-Agent': 'orca4ktv-m3u-checker/1.0',
          Accept: '*/*',
          Range: `bytes=0-${STREAM_PROBE_BYTES - 1}`,
        },
        redirect: 'follow',
      })
    }
    const ms = Date.now() - start
    if (!res.ok && res.status !== 206) {
      return { status: 'dead', responseMs: ms, errorReason: `HTTP ${res.status}` }
    }
    // Try to read up to STREAM_PROBE_BYTES bytes from a GET to confirm a real stream
    if (res.body && res.status !== 206) {
      const reader = res.body.getReader()
      let total = 0
      while (total < STREAM_PROBE_BYTES) {
        const { value, done } = await reader.read()
        if (done) break
        total += value.byteLength
      }
      await reader.cancel().catch(() => {})
    }
    if (ms > SLOW_THRESHOLD_MS) return { status: 'slow', responseMs: ms }
    return { status: 'working', responseMs: ms }
  } catch (err) {
    const e = err as Error
    const reason = e.name === 'AbortError' ? 'Timed out' : e.message || 'Connection failed'
    return { status: 'dead', errorReason: reason }
  } finally {
    clearTimeout(timer)
  }
}

function pickRandomSubset<T>(items: T[], n: number): T[] {
  if (items.length <= n) return [...items]
  const arr = [...items]
  // Fisher-Yates partial shuffle
  for (let i = 0; i < n; i++) {
    const j = i + Math.floor(Math.random() * (arr.length - i))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr.slice(0, n)
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

  let playlistText: string
  try {
    if (body.mode === 'url') {
      if (!body.url) return NextResponse.json({ error: 'bad_request', message: 'URL is required.' }, { status: 400 })
      playlistText = await fetchPlaylistFromUrl(body.url)
    } else {
      if (!body.content) return NextResponse.json({ error: 'bad_request', message: 'Playlist content is required.' }, { status: 400 })
      if (body.content.length > PLAYLIST_SIZE_CAP) {
        return NextResponse.json({ error: 'bad_request', message: 'Playlist too large (limit 10 MB).' }, { status: 413 })
      }
      playlistText = body.content
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

  const parsed = parseM3U(playlistText)
  if (parsed.entries.length === 0) {
    return NextResponse.json(
      { error: 'parse_failed', message: 'No streams found in this playlist.', warnings: parsed.warnings },
      { status: 400 },
    )
  }

  const sample = pickRandomSubset(parsed.entries, MAX_STREAMS_TO_CHECK)
  const limit = pLimit(PARALLELISM)
  const results: StreamResult[] = await Promise.all(
    sample.map((s) =>
      limit(async () => {
        const probe = await probeStream(s.url)
        return {
          name: s.name,
          url: s.url,
          group: s.group,
          status: probe.status,
          responseMs: probe.responseMs,
          errorReason: probe.errorReason,
        }
      }),
    ),
  )

  const totals = {
    working: results.filter((r) => r.status === 'working').length,
    slow: results.filter((r) => r.status === 'slow').length,
    dead: results.filter((r) => r.status === 'dead').length,
  }

  return NextResponse.json({
    ok: true,
    totalStreams: parsed.entries.length,
    sampled: results.length,
    totals,
    results,
    rateLimit: { remaining: rl.remaining },
  })
}
