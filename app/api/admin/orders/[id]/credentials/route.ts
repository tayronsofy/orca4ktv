import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest as checkAdminAuth } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { PLAN_MONTHS } from '@/lib/iptv-panel'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await request.json()
  const { slot, iptv_username, iptv_password, m3u_url, portal_url, host_url_backups, playlist_url, mac_addresses } = body

  const slotNum = Number(slot)
  if (!Number.isInteger(slotNum) || slotNum < 1 || slotNum > 4) {
    return NextResponse.json({ error: 'slot must be an integer between 1 and 4' }, { status: 400 })
  }
  if (!iptv_username || !iptv_password || !m3u_url) {
    return NextResponse.json({ error: 'Username, password and M3U URL are required' }, { status: 400 })
  }

  const admin = createAdminClient()

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

  // Find or create the parent subscription row (one per order)
  const { data: existingSub } = await admin
    .from('subscriptions')
    .select('id, start_date, end_date')
    .eq('order_id', id)
    .maybeSingle()

  let subscriptionId: string

  if (existingSub) {
    subscriptionId = existingSub.id
    // Keep existing dates if already set; ensure status is active
    await admin
      .from('subscriptions')
      .update({ status: 'active' })
      .eq('id', subscriptionId)
  } else {
    const { data: newSub, error: insertErr } = await admin
      .from('subscriptions')
      .insert({
        user_id: order.user_id,
        order_id: id,
        connections: order.connections,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        status: 'active',
      })
      .select('id')
      .single()

    if (insertErr || !newSub) {
      return NextResponse.json({ error: insertErr?.message || 'Failed to create subscription' }, { status: 500 })
    }
    subscriptionId = newSub.id
  }

  // Filter & cap host_url_backups at 3 entries
  const cleanBackups = Array.isArray(host_url_backups)
    ? host_url_backups
        .map((s: unknown) => (typeof s === 'string' ? s.trim() : ''))
        .filter((s: string) => s.length > 0)
        .slice(0, 3)
    : []

  // Upsert the credential into the requested slot
  const { error: credErr } = await admin
    .from('subscription_credentials')
    .upsert(
      {
        subscription_id: subscriptionId,
        slot: slotNum,
        iptv_username,
        iptv_password,
        m3u_url,
        portal_url: portal_url || null,
        host_url_backups: cleanBackups.length ? cleanBackups : null,
        playlist_url: (typeof playlist_url === 'string' && playlist_url.trim()) ? playlist_url.trim() : null,
        mac_addresses: mac_addresses?.length ? mac_addresses : null,
      },
      { onConflict: 'subscription_id,slot' }
    )

  if (credErr) {
    return NextResponse.json({ error: credErr.message }, { status: 500 })
  }

  // Mark order as active
  await admin.from('orders').update({ status: 'active' }).eq('id', id)

  // Read final end_date for confirmation
  const { data: finalSub } = await admin
    .from('subscriptions')
    .select('end_date')
    .eq('id', subscriptionId)
    .single()

  return NextResponse.json({
    success: true,
    end_date: finalSub?.end_date ?? endDate.toISOString().split('T')[0],
  })
}
