import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest as checkAdminAuth } from '@/lib/admin/auth'

// Bouquet selection is not used - panel mode always uses pack=all.
// This route is kept for potential future use.
export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  return NextResponse.json({ bouquets: [] })
}
