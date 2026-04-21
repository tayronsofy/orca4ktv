import { NextRequest, NextResponse } from 'next/server'
import { getPanelBouquets } from '@/lib/iptv-panel'

function checkAdminAuth(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value
  const expected = process.env.ADMIN_SECRET
  return !!(token && expected && token === expected)
}

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  try {
    const bouquets = await getPanelBouquets()
    return NextResponse.json({ bouquets })
  } catch (err) {
    console.error('Bouquet fetch error:', err)
    return NextResponse.json({ error: 'Failed to fetch packages from panel' }, { status: 500 })
  }
}
