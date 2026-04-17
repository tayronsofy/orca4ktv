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
    if (!subscription?.iptv_username) {
      return NextResponse.json({ error: 'No credentials saved for this order yet.' }, { status: 400 })
    }

    await sendCredentialsReady({
      to: profile.email,
      customerName: profile.full_name || 'Valued Customer',
      planName: order.plan_name,
      endDate: subscription.end_date
        ? new Date(subscription.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'N/A',
      username: subscription.iptv_username,
      password: subscription.iptv_password,
      m3uUrl: subscription.m3u_url,
      portalUrl: subscription.portal_url,
    })
  }

  return NextResponse.json({ success: true })
}
