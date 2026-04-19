import { NextResponse } from 'next/server'
import { fetchLiveScore } from '@/lib/sports-api'

export const revalidate = 0 // always fresh

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ fixtureId: string }> }
) {
  const { fixtureId } = await params
  const id = parseInt(fixtureId, 10)
  if (isNaN(id)) return NextResponse.json({ error: 'Invalid fixture ID' }, { status: 400 })

  try {
    const fixture = await fetchLiveScore(id)
    if (!fixture) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(fixture, {
      headers: { 'Cache-Control': 'no-store' },
    })
  } catch (err) {
    console.error('live-score error:', err)
    return NextResponse.json({ error: 'Upstream error' }, { status: 502 })
  }
}
