import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendOrderConfirmation } from '@/lib/resend'

function generateInvoiceNumber(): string {
  const now = new Date()
  const yy = now.getFullYear().toString().slice(-2)
  const mm = String(now.getMonth() + 1).padStart(2, '0')
  const rand = Math.floor(Math.random() * 90000 + 10000)
  return `INV-${yy}${mm}-${rand}`
}

export async function POST(request: NextRequest) {
  // Verify Supabase session
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { planSlug, planName, connections, amount, phone, country } = body

  if (!planSlug || !planName || !connections || !amount) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const admin = createAdminClient()

  // Update profile with extra info if provided
  if (phone || country) {
    await admin
      .from('profiles')
      .update({ ...(phone && { phone }), ...(country && { country }) })
      .eq('id', user.id)
  }

  // Get profile for email
  const { data: profile } = await admin
    .from('profiles')
    .select('full_name, email')
    .eq('id', user.id)
    .single()

  // Create order
  const { data: order, error: orderError } = await admin
    .from('orders')
    .insert({
      user_id: user.id,
      plan_slug: planSlug,
      plan_name: planName,
      connections: Number(connections),
      amount: Number(amount),
      status: 'pending_payment',
    })
    .select()
    .single()

  if (orderError || !order) {
    console.error('Order insert error:', orderError)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }

  // Create invoice
  const invoiceNumber = generateInvoiceNumber()
  const { error: invoiceError } = await admin
    .from('invoices')
    .insert({
      order_id: order.id,
      user_id: user.id,
      invoice_number: invoiceNumber,
      amount: Number(amount),
      status: 'pending',
    })

  if (invoiceError) {
    console.error('Invoice insert error:', invoiceError)
  }

  // Send confirmation email (non-blocking)
  if (profile?.email) {
    sendOrderConfirmation({
      to: profile.email,
      customerName: profile.full_name || 'Valued Customer',
      orderNumber: invoiceNumber,
      planName,
      connections: Number(connections),
      amount: `$${Number(amount).toFixed(2)}`,
    }).catch(console.error)
  }

  return NextResponse.json({ orderId: order.id, invoiceNumber }, { status: 201 })
}
