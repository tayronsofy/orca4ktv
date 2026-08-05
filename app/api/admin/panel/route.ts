import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin/auth'
import { isPanelConfigured, getResellerInfo, getPackages } from '@/lib/iptv-panel'

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  if (!isPanelConfigured()) {
    return NextResponse.json({
      configured: false,
      requiredEnv: ['IPTV_PANEL_URL', 'IPTV_API_KEY', 'IPTV_SERVER_URL (optional)'],
    })
  }

  try {
    const [reseller, packages] = await Promise.allSettled([getResellerInfo(), getPackages()])
    if (reseller.status === 'rejected' && packages.status === 'rejected') {
      return NextResponse.json(
        { error: 'panel_error', detail: String(reseller.reason?.message || reseller.reason) },
        { status: 502 }
      )
    }
    return NextResponse.json({
      configured: true,
      reseller: reseller.status === 'fulfilled' ? reseller.value : null,
      resellerError: reseller.status === 'rejected' ? String(reseller.reason?.message || reseller.reason) : null,
      packages: packages.status === 'fulfilled' ? packages.value : [],
      packagesError: packages.status === 'rejected' ? String(packages.reason?.message || packages.reason) : null,
      defaultPackage: '35647',
    })
  } catch (err) {
    return NextResponse.json(
      { error: 'panel_error', detail: err instanceof Error ? err.message : String(err) },
      { status: 502 }
    )
  }
}
