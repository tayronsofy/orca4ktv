// Streaming fetch + early-exit logic shared by /api/tools/m3u-check (analyzer)
// and /api/tools/m3u-fetch (editor). Caps total time, total bytes, and total
// #EXTINF entries to keep huge VOD-laden Xtream playlists from blowing the
// VPS process memory or hitting the function timeout.

import { assertSafeUrl } from './ssrf-guard'

export const PLAYLIST_FETCH_TIMEOUT_MS = 60_000
export const PLAYLIST_SIZE_CAP = 30 * 1024 * 1024 // 30 MB
export const PLAYLIST_EARLY_EXIT_ENTRIES = 100_000

export class FriendlyError extends Error {
  public httpStatus: number
  constructor(message: string, httpStatus = 400) {
    super(message)
    this.httpStatus = httpStatus
  }
}

export interface FetchPlaylistResult {
  text: string
  bytesRead: number
  truncated: boolean
  truncatedReason?: 'entry-cap' | 'size-cap'
}

export async function fetchPlaylistFromUrl(url: string): Promise<FetchPlaylistResult> {
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
        if (text.length > 256 && entryCount > 0) break
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
