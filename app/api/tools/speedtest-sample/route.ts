import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const DEFAULT_SIZE_MB = 10
const MIN_SIZE_MB = 1
const MAX_SIZE_MB = 25
const CHUNK_SIZE = 64 * 1024 // 64 KB

// Pre-built fixed chunk of pseudo-random bytes (avoids re-allocating per request).
// Compresses poorly so HTTP-level gzip won't skew the measurement.
function makeChunk(): Uint8Array {
  const buf = new Uint8Array(CHUNK_SIZE)
  for (let i = 0; i < buf.length; i++) {
    buf[i] = (Math.random() * 256) | 0
  }
  return buf
}
const CHUNK = makeChunk()

export async function GET(request: NextRequest) {
  const url = new URL(request.url)
  const requested = Number(url.searchParams.get('size_mb') ?? DEFAULT_SIZE_MB)
  const sizeMb = Math.min(MAX_SIZE_MB, Math.max(MIN_SIZE_MB, Number.isFinite(requested) ? requested : DEFAULT_SIZE_MB))
  const totalBytes = sizeMb * 1024 * 1024
  const chunkCount = Math.ceil(totalBytes / CHUNK.length)
  let sent = 0

  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      if (sent >= totalBytes) {
        controller.close()
        return
      }
      const remaining = totalBytes - sent
      const piece = remaining >= CHUNK.length ? CHUNK : CHUNK.slice(0, remaining)
      controller.enqueue(piece)
      sent += piece.length
    },
    cancel() {
      sent = totalBytes // stops the loop
    },
  })

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': String(totalBytes),
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
      'X-Sample-Chunks': String(chunkCount),
    },
  })
}
