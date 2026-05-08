import { NextRequest, NextResponse } from 'next/server'
import { parseM3U } from '@/lib/tools/m3u-parser'
import { analyze, type PlaylistAnalysis } from '@/lib/tools/m3u-classify'
import { checkAndRecord } from '@/lib/tools/rate-limit'
import {
  fetchPlaylistFromUrl,
  FriendlyError,
  PLAYLIST_SIZE_CAP,
  type FetchPlaylistResult,
} from '@/lib/tools/fetch-playlist'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 90

const RATE_LIMIT = { max: 5, windowMs: 60 * 60 * 1000 } // 5 / hour

interface CheckRequestBody {
  mode: 'url' | 'paste'
  url?: string
  content?: string
}

export interface CheckResponse {
  ok: true
  analysis: PlaylistAnalysis
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

  let fetched: FetchPlaylistResult
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
