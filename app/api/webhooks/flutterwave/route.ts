import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { createSubscriptionM3U, CreatedTrialAccount, PLAN_MONTHS } from '@/lib/iptv-panel'
import { sendCredentialsReady } from '@/lib/resend'

export async function POST(request: NextRequest) {
  // 1. Verify webhook signature
  const hash = request.headers.get('verif-hash')
  if (!hash || hash !== process.env.FLW_SECRET_HASH) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const payload = await request.json()

  // 2. Only handle successful charge completions
  console.log('FLW webhook received:', JSON.stringify({ event: payload.event, status: payload.data?.status, tx_ref: payload.data?.tx_ref, amount: payload.data?.amount }))

  if (payload.event !== 'charge.completed') {
    console.log('FLW webhook: ignoring event', payload.event)
    return NextResponse.json({ ok: true })
  }
  if (payload.data?.status !== 'successful') {
    console.log('FLW webhook: ignoring status', payload.data?.status)
    return NextResponse.json({ ok: true })
  }

  const { tx_ref, amount: paidAmount } = payload.data

  const admin = createAdminClient()

  // 3. Find order by tx_ref (= orderId set when opening the Flutterwave modal)
  const { data: order } = await admin
    .from('orders')
    .select('id, user_id, plan_slug, plan_name, connections, amount, status')
    .eq('id', tx_ref)
    .single()

  if (!order) {
    console.error('FLW webhook: order not found for tx_ref', tx_ref)
    return NextResponse.json({ ok: true })
  }

  console.log('FLW webhook: found order', order.id, 'status:', order.status)

  // 4. Idempotency guard — skip if already processed
  if (order.status === 'active') {
    console.log('FLW webhook: order already active, skipping')
    return NextResponse.json({ ok: true })
  }

  // 5. Amount verification (fraud prevention — allow minor floating-point variance)
  if (Number(paidAmount) < Number(order.amount) - 0.01) {
    console.error(`Flutterwave webhook: amount mismatch for order ${order.id}. Expected ${order.amount}, got ${paidAmount}`)
    return NextResponse.json({ error: 'Amount mismatch' }, { status: 400 })
  }

  // 6. Mark invoice paid
  await admin
    .from('invoices')
    .update({ status: 'paid', paid_at: new Date().toISOString() })
    .eq('order_id', order.id)

  // 7. Create IPTV account on panel
  let account: CreatedTrialAccount
  try {
    account = await createSubscriptionM3U({
      planSlug: order.plan_slug,
      connections: order.connections,
      note: `order:${order.id}`,
    })
  } catch (err) {
    console.error('Flutterwave webhook: IPTV panel error for order', order.id, err)
    // Mark as 'paid' so admin can see it and assign manually if needed
    await admin.from('orders').update({ status: 'paid' }).eq('id', order.id)
    // Return 500 → Flutterwave will retry (useful if panel was temporarily down)
    return NextResponse.json({ error: 'Panel error' }, { status: 500 })
  }

  // 8. Calculate subscription dates
  const months = PLAN_MONTHS[order.plan_slug] ?? 1
  const startDate = new Date()
  const endDate = new Date(startDate)
  endDate.setMonth(endDate.getMonth() + months)

  const panelBase = (process.env.IPTV_PANEL_URL || '').replace(/\/$/, '')

  // 9. Upsert subscription record
  const subData = {
    user_id: order.user_id,
    order_id: order.id,
    iptv_username: account.username,
    iptv_password: account.password,
    m3u_url: account.m3uUrl,
    portal_url: panelBase ? `${panelBase}/portal` : null,
    connections: order.connections,
    start_date: startDate.toISOString().split('T')[0],
    end_date: endDate.toISOString().split('T')[0],
    status: 'active',
    panel_user_id: account.userId || null,
  }

  const { data: existing } = await admin
    .from('subscriptions')
    .select('id')
    .eq('order_id', order.id)
    .single()

  if (existing) {
    await admin.from('subscriptions').update(subData).eq('id', existing.id)
  } else {
    await admin.from('subscriptions').insert(subData)
  }

  // 10. Mark order active
  await admin.from('orders').update({ status: 'active' }).eq('id', order.id)

  // 11. Send credentials email (fire-and-forget — don't fail webhook on email error)
  const { data: profile } = await admin
    .from('profiles')
    .select('full_name, email')
    .eq('id', order.user_id)
    .single()

  console.log('FLW webhook: order activated, sending email to', profile?.email)

  if (profile?.email) {
    sendCredentialsReady({
      to: profile.email,
      customerName: profile.full_name || 'Valued Customer',
      planName: order.plan_name,
      endDate: endDate.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric',
      }),
      username: account.username,
      password: account.password,
      m3uUrl: account.m3uUrl,
      portalUrl: panelBase ? `${panelBase}/portal` : undefined,
    }).catch(err => console.error('Flutterwave webhook: email send failed', err))
  }

  return NextResponse.json({ ok: true })
}
