import { NextRequest, NextResponse } from 'next/server'

function checkAdminAuth(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value
  const expected = process.env.ADMIN_SECRET
  return !!(token && expected && token === expected)
}

// Bouquet selection is not used — panel mode always uses pack=all.
// This route is kept for potential future use.
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  return NextResponse.json({ bouquets: [] })
}
