import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

function checkAdminAuth(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value
  const expected = process.env.ADMIN_SECRET
  return !!(token && expected && token === expected)
}

// Duration map: plan slug → months
const PLAN_MONTHS: Record<string, number> = {
  '1-month':   1,
  '3-months':  3,
  '6-months':  6,
  '12-months': 12,
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await request.json()
  const { iptv_username, iptv_password, m3u_url, portal_url, mac_addresses } = body

  if (!iptv_username || !iptv_password || !m3u_url) {
    return NextResponse.json({ error: 'Username, password and M3U URL are required' }, { status: 400 })
  }

  const admin = createAdminClient()

  // Get the order for user_id and plan_slug
  const { data: order, error: orderErr } = await admin
    .from('orders')
    .select('user_id, plan_slug, connections')
    .eq('id', id)
    .single()

  if (orderErr || !order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  const startDate = new Date()
  const months = PLAN_MONTHS[order.plan_slug] || 1
  const endDate = new Date(startDate)
  endDate.setMonth(endDate.getMonth() + months)

  // Check if subscription already exists for this order
  const { data: existing } = await admin
    .from('subscriptions')
    .select('id')
    .eq('order_id', id)
    .single()

  if (existing) {
    // Update existing
    const { error } = await admin
      .from('subscriptions')
      .update({
        iptv_username,
        iptv_password,
        m3u_url,
        portal_url: portal_url || null,
        mac_addresses: mac_addresses?.length ? mac_addresses : null,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        status: 'active',
      })
      .eq('id', existing.id)

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  } else {
    // Insert new
    const { error } = await admin
      .from('subscriptions')
      .insert({
        user_id: order.user_id,
        order_id: id,
        iptv_username,
        iptv_password,
        m3u_url,
        portal_url: portal_url || null,
        mac_addresses: mac_addresses?.length ? mac_addresses : null,
        connections: order.connections,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        status: 'active',
      })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Mark order as active
  await admin.from('orders').update({ status: 'active' }).eq('id', id)

  return NextResponse.json({
    success: true,
    end_date: endDate.toISOString().split('T')[0],
  })
}
