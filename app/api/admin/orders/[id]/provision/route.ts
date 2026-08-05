import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { createSubscriptionM3U, isPanelConfigured, PLAN_MONTHS } from '@/lib/iptv-panel'

/**
 * Auto-provision: create one panel line per ordered connection and upsert
 * subscription_credentials. Partial failure returns 502 with createdSlots so
 * the admin can see what succeeded before the failure.
 */
export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(request)
  if (denied) return denied

  if (!isPanelConfigured()) {
    return NextResponse.json(
      { error: 'panel_not_configured', detail: 'Set IPTV_PANEL_URL and IPTV_API_KEY.' },
      { status: 400 }
    )
  }

  const { id } = await params
  const admin = createAdminClient()

  const { data: order } = await admin
    .from('orders')
    .select('*, profiles(full_name, email), subscriptions(*)')
    .eq('id', id)
    .single()

  if (!order) return NextResponse.json({ error: 'not_found' }, { status: 404 })

  const profile = (order as any).profiles
  const connections = Math.min(4, Math.max(1, Number(order.connections) || 1))

  // Find-or-create the subscription (end date = start + plan months)
  let subscription = (order as any).subscriptions?.[0]
  if (!subscription) {
    const months = PLAN_MONTHS[order.plan_slug] ?? 1
    const start = new Date()
    const end = new Date(start)
    end.setMonth(end.getMonth() + months)
    const { data: created, error: subError } = await admin
      .from('subscriptions')
      .insert({
        user_id: order.user_id,
        order_id: order.id,
        connections,
        start_date: start.toISOString(),
        end_date: end.toISOString(),
        status: 'active',
      })
      .select('*')
      .single()
    if (subError || !created) {
      return NextResponse.json({ error: 'insert_failed', detail: subError?.message }, { status: 500 })
    }
    subscription = created
  }

  const createdSlots: number[] = []

  for (let slot = 1; slot <= connections; slot++) {
    try {
      const line = await createSubscriptionM3U({
        planSlug: order.plan_slug,
        connections,
        note: `Order ${order.id} slot ${slot} - ${profile?.email || ''}`,
      })

      const { error: upsertError } = await admin
        .from('subscription_credentials')
        .upsert(
          {
            subscription_id: subscription.id,
            slot,
            iptv_username: line.username,
            iptv_password: line.password,
            m3u_url: line.m3uUrl,
          },
          { onConflict: 'subscription_id,slot' }
        )
      if (upsertError) throw new Error(`DB upsert failed for slot ${slot}: ${upsertError.message}`)

      createdSlots.push(slot)
    } catch (err) {
      return NextResponse.json(
        {
          error: 'panel_error',
          detail: `Slot ${slot} failed: ${err instanceof Error ? err.message : String(err)}`,
          createdSlots,
        },
        { status: 502 }
      )
    }
  }

  await admin.from('orders').update({ status: 'active' }).eq('id', id)

  return NextResponse.json({ success: true, createdSlots, end_date: subscription.end_date })
}
