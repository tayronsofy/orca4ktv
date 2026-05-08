import { NextRequest, NextResponse } from 'next/server'
import { gunzipSync } from 'zlib'
import { parseXmlTv, type XmlTvSummary } from '@/lib/tools/xmltv'
import { assertSafeUrl } from '@/lib/tools/ssrf-guard'
import { checkAndRecord } from '@/lib/tools/rate-limit'
import { FriendlyError } from '@/lib/tools/fetch-playlist'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const FETCH_TIMEOUT_MS = 30_000
const SIZE_CAP = 25 * 1024 * 1024 // 25 MB raw download
const DECOMPRESSED_CAP = 100 * 1024 * 1024 // 100 MB after gunzip
const RATE_LIMIT = { max: 10, windowMs: 60 * 60 * 1000 }

const ALLOWED_CONTENT_HINTS = [
  'application/xml',
  'text/xml',
  'application/x-gzip',
  'application/gzip',
  'application/octet-stream', // some EPG hosts mislabel xml as octet-stream
]

interface ValidateRequestBody {
  url: string
}

export interface ValidateResponse {
  ok: true
  summary: XmlTvSummary
  bytesRead: number
  health: 'healthy' | 'sparse' | 'stale'
  rateLimit: { remaining: number }
}

async function fetchXmlTv(url: string): Promise<{ xml: string; bytesRead: number }> {
  const safety = await assertSafeUrl(url)
  if (!safety.ok) throw new FriendlyError(safety.reason ?? 'URL not allowed.')

  const ac = new AbortController()
  const timer = setTimeout(() => ac.abort(), FETCH_TIMEOUT_MS)
  try {
    let res: Response
    try {
      res = await fetch(safety.url!.toString(), {
        method: 'GET',
        signal: ac.signal,
        headers: {
          'User-Agent': 'VLC/3.0.20 LibVLC/3.0.20',
          // Tell the server we're happy with gzip — Node's fetch will auto-decode
          'Accept-Encoding': 'gzip, deflate, br',
          Accept: 'application/xml, text/xml, */*',
        },
        redirect: 'follow',
      })
    } catch (err) {
      const e = err as Error
      if (e.name === 'AbortError') {
        throw new FriendlyError(
          `The EPG server did not respond within ${FETCH_TIMEOUT_MS / 1000} seconds. Try a smaller EPG URL or a different host.`,
        )
      }
      throw new FriendlyError(`Could not connect to the EPG host: ${e.message || 'unknown network error'}.`)
    }

    if (!res.ok) {
      throw new FriendlyError(
        res.status === 401 || res.status === 403
          ? 'The EPG host returned an authentication error. Check that your username and password are correct.'
          : `The EPG host returned HTTP ${res.status}.`,
      )
    }

    const ct = (res.headers.get('content-type') ?? '').toLowerCase()
    if (ct.includes('text/html')) {
      throw new FriendlyError('The EPG host returned an HTML page, not XMLTV. The URL may be wrong or your subscription has expired.')
    }
    if (ct && !ALLOWED_CONTENT_HINTS.some((h) => ct.includes(h))) {
      // Don't hard-fail; XMLTV providers sometimes use weird content types.
      // We'll still try to parse and let the parser reject if it's not XML.
    }

    const reader = res.body?.getReader()
    if (!reader) throw new FriendlyError('The EPG host returned an empty response.')

    // Collect bytes (not text) so we can detect and decompress gzip blobs that
    // some EPG hosts serve as raw .xml.gz downloads without setting
    // Content-Encoding: gzip — fetch's auto-decompress wouldn't kick in there.
    const buffers: Uint8Array[] = []
    let bytesRead = 0

    while (true) {
      let chunk: ReadableStreamReadResult<Uint8Array>
      try {
        chunk = await reader.read()
      } catch (err) {
        const e = err as Error
        if (e.name === 'AbortError') {
          throw new FriendlyError(
            `The EPG download stalled after ${FETCH_TIMEOUT_MS / 1000} seconds. The host is too slow.`,
          )
        }
        throw new FriendlyError(`Lost connection while downloading the EPG: ${e.message || 'unknown error'}.`)
      }
      const { value, done } = chunk
      if (done) break

      bytesRead += value.byteLength
      if (bytesRead > SIZE_CAP) {
        await reader.cancel().catch(() => {})
        throw new FriendlyError(
          `The EPG file is too large (over ${SIZE_CAP / 1024 / 1024} MB). EPG guides should not be that big - your URL may point to the wrong file.`,
        )
      }
      buffers.push(value)
    }

    const raw = Buffer.concat(buffers.map((b) => Buffer.from(b.buffer, b.byteOffset, b.byteLength)))
    let payload: Buffer = raw

    // gzip magic: 1F 8B. Catches both .xml.gz endpoints and hosts that don't
    // declare Content-Encoding properly.
    if (raw.length >= 2 && raw[0] === 0x1f && raw[1] === 0x8b) {
      try {
        payload = gunzipSync(raw, { maxOutputLength: DECOMPRESSED_CAP })
      } catch (err) {
        const e = err as Error
        if (/maxOutputLength/i.test(e.message)) {
          throw new FriendlyError(
            `The decompressed EPG would exceed ${DECOMPRESSED_CAP / 1024 / 1024} MB. The file is too large to validate here.`,
          )
        }
        throw new FriendlyError('Could not decompress the gzipped EPG file. It may be corrupted.')
      }
    }

    const xml = payload.toString('utf8')
    return { xml, bytesRead }
  } finally {
    clearTimeout(timer)
  }
}

function assessHealth(summary: XmlTvSummary): 'healthy' | 'sparse' | 'stale' {
  if (summary.latestStop) {
    const latest = new Date(summary.latestStop).getTime()
    if (!Number.isNaN(latest) && latest < Date.now()) return 'stale'
  }
  if (summary.programmeCount < 100 || summary.channelCount < 5) return 'sparse'

  if (summary.earliestStart && summary.latestStop) {
    const span = new Date(summary.latestStop).getTime() - new Date(summary.earliestStart).getTime()
    if (Number.isFinite(span) && span < 24 * 60 * 60 * 1000) return 'sparse'
  }

  return 'healthy'
}

export async function POST(request: NextRequest) {
  const rl = await checkAndRecord('epg-validate', request, RATE_LIMIT)
  if (!rl.ok) {
    return NextResponse.json(
      { error: 'rate_limited', retryAfterSec: rl.retryAfterSec, message: 'Too many checks. Try again in an hour.' },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfterSec) } },
    )
  }

  let body: ValidateRequestBody
  try {
    body = (await request.json()) as ValidateRequestBody
  } catch {
    return NextResponse.json({ error: 'bad_request', message: 'Invalid JSON body.' }, { status: 400 })
  }

  if (!body.url) {
    return NextResponse.json({ error: 'bad_request', message: 'URL is required.' }, { status: 400 })
  }

  let fetched
  try {
    fetched = await fetchXmlTv(body.url)
  } catch (err) {
    const e = err as Error
    const status = err instanceof FriendlyError ? err.httpStatus : 400
    const msg = err instanceof FriendlyError ? e.message : e.message || 'Could not load the EPG file.'
    return NextResponse.json({ error: 'fetch_failed', message: msg }, { status })
  }

  let summary: XmlTvSummary
  try {
    summary = parseXmlTv({ xml: fetched.xml })
  } catch (err) {
    const e = err as Error
    return NextResponse.json(
      { error: 'parse_failed', message: e.message || 'The file is not a valid XMLTV document.' },
      { status: 400 },
    )
  }

  const response: ValidateResponse = {
    ok: true,
    summary,
    bytesRead: fetched.bytesRead,
    health: assessHealth(summary),
    rateLimit: { remaining: rl.remaining },
  }

  return NextResponse.json(response)
}
