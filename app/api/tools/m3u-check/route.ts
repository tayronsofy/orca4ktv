import { NextRequest, NextResponse } from 'next/server'
import pLimit from 'p-limit'
import { parseM3U } from '@/lib/tools/m3u-parser'
import { assertSafeUrl } from '@/lib/tools/ssrf-guard'
import { checkAndRecord } from '@/lib/tools/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const PLAYLIST_FETCH_TIMEOUT_MS = 12_000
const PLAYLIST_SIZE_CAP = 10 * 1024 * 1024 // 10 MB
const STREAM_PROBE_TIMEOUT_MS = 4_000
const STREAM_PROBE_BYTES = 64 * 1024
const SLOW_THRESHOLD_MS = 2_500
const MAX_STREAMS_TO_CHECK = 50
const PARALLELISM = 10
const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 } // 5 / hour

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
  if (!safety.ok) throw new Error(safety.reason ?? 'URL not allowed.')
  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), PLAYLIST_FETCH_TIMEOUT_MS)
  try {
    const res = await fetch(safety.url!.toString(), {
      method: 'GET',
      signal: ac.signal,
      headers: { 'User-Agent': 'orca4ktv-m3u-checker/1.0', Accept: '*/*' },
      redirect: 'follow',
    })
    if (!res.ok) throw new Error(`Playlist server returned HTTP ${res.status}.`)
    const reader = res.body?.getReader()
    if (!reader) throw new Error('Empty playlist response.')

    const decoder = new TextDecoder('utf-8')
    let received = 0
    let text = ''
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      received += value.byteLength
      if (received > PLAYLIST_SIZE_CAP) {
        await reader.cancel()
        throw new Error('Playlist too large (limit 10 MB).')
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
    const msg = (err as Error).message || 'Could not load playlist.'
    return NextResponse.json({ error: 'fetch_failed', message: msg }, { status: 400 })
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
