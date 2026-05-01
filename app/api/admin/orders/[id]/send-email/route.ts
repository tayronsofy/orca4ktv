import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendPaymentLink, sendCredentialsReady } from '@/lib/resend'

function checkAdminAuth(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value
  const expected = process.env.ADMIN_SECRET
  return !!(token && expected && token === expected)
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const { type } = await request.json()

  if (!['payment-link', 'credentials'].includes(type)) {
    return NextResponse.json({ error: 'Invalid email type' }, { status: 400 })
  }

  const admin = createAdminClient()

  // Fetch all data needed
  const { data: order } = await admin
    .from('orders')
    .select('*, profiles(*), invoices(*), subscriptions(*)')
    .eq('id', id)
    .single()

  if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  const profile = (order as any).profiles
  const invoice = (order as any).invoices?.[0]
  const subscription = (order as any).subscriptions?.[0]

  if (!profile?.email) return NextResponse.json({ error: 'Customer email not found' }, { status: 400 })

  if (type === 'payment-link') {
    if (!invoice?.payment_link) {
      return NextResponse.json({ error: 'No payment link set on invoice. Save it first.' }, { status: 400 })
    }

    await sendPaymentLink({
      to: profile.email,
      customerName: profile.full_name || 'Valued Customer',
      orderNumber: invoice.invoice_number,
      planName: order.plan_name,
      amount: `$${Number(order.amount).toFixed(2)}`,
      paymentLink: invoice.payment_link,
    })
  }

  if (type === 'credentials') {
    if (!subscription?.id) {
      return NextResponse.json({ error: 'No subscription created for this order yet.' }, { status: 400 })
    }

    const { data: credRows } = await admin
      .from('subscription_credentials')
      .select('slot, iptv_username, iptv_password, m3u_url, portal_url, host_url_backups')
      .eq('subscription_id', subscription.id)
      .order('slot', { ascending: true })

    const credentials = (credRows || [])
      .filter(c => c.iptv_username && c.iptv_password && c.m3u_url)
      .map(c => ({
        slot: c.slot,
        username: c.iptv_username as string,
        password: c.iptv_password as string,
        m3uUrl: c.m3u_url as string,
        portalUrl: c.portal_url || undefined,
        hostUrlBackups: (c.host_url_backups as string[] | null) || undefined,
      }))

    if (credentials.length === 0) {
      return NextResponse.json({ error: 'No credentials saved for this order yet.' }, { status: 400 })
    }

    await sendCredentialsReady({
      to: profile.email,
      customerName: profile.full_name || 'Valued Customer',
      planName: order.plan_name,
      endDate: subscription.end_date
        ? new Date(subscription.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'N/A',
      credentials,
    })
  }

  return NextResponse.json({ success: true })
}
