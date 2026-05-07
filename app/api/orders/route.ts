import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendOrderConfirmation, sendAdminNewOrderAlert } from '@/lib/resend'
import { getPlanPrice, getPlanName, isValidPlanSlug, isValidConnections } from '@/lib/pricing'
import { validateCoupon } from '@/lib/coupons'

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

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { planSlug, connections: rawConnections, couponCode, phone, country } = body ?? {}
  const connections = Number(rawConnections)

  if (!isValidPlanSlug(planSlug)) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }
  if (!isValidConnections(connections)) {
    return NextResponse.json({ error: 'Invalid connections (must be 1-4)' }, { status: 400 })
  }

  // Server-side amount calculation - never trust client-sent prices.
  const originalAmount = getPlanPrice(planSlug, connections)!
  const planName = getPlanName(planSlug)!

  let discountAmount = 0
  let finalAmount = originalAmount
  let appliedCouponCode: string | null = null

  if (couponCode) {
    const couponResult = await validateCoupon({
      code: String(couponCode),
      planSlug,
      connections,
      userId: user.id,
    })
    if (couponResult.valid === false) {
      return NextResponse.json(
        { error: 'Invalid coupon', reason: couponResult.reason },
        { status: 400 }
      )
    }
    discountAmount = couponResult.discountAmount
    finalAmount = couponResult.finalAmount
    appliedCouponCode = couponResult.code
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

  // Create order with server-computed amounts
  const { data: order, error: orderError } = await admin
    .from('orders')
    .insert({
      user_id: user.id,
      plan_slug: planSlug,
      plan_name: planName,
      connections,
      amount: finalAmount,
      original_amount: originalAmount,
      discount_amount: discountAmount,
      coupon_code: appliedCouponCode,
      status: 'pending_payment',
      customer_ip: ip,
    })
    .select()
    .single()

  if (orderError || !order) {
    console.error('Order insert error:', orderError)
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
  }

  // Record coupon redemption (best-effort; if it fails the order still stands)
  if (appliedCouponCode) {
    const { error: redemptionError } = await admin
      .from('coupon_redemptions')
      .insert({
        coupon_code: appliedCouponCode,
        user_id: user.id,
        order_id: order.id,
        discount_amount: discountAmount,
      })
    if (redemptionError) {
      console.error('Coupon redemption insert error:', redemptionError)
    }

    // Decrement uses_remaining if the coupon has a finite count
    await admin.rpc('decrement_coupon_uses', { p_code: appliedCouponCode }).then(
      () => {},
      // RPC may not exist - fall back to a manual decrement
      async () => {
        const { data: c } = await admin.from('coupons').select('uses_remaining').eq('code', appliedCouponCode!).single()
        if (c?.uses_remaining != null) {
          await admin.from('coupons').update({ uses_remaining: c.uses_remaining - 1 }).eq('code', appliedCouponCode!)
        }
      }
    )
  }

  // Create invoice
  const invoiceNumber = generateInvoiceNumber()
  const { error: invoiceError } = await admin
    .from('invoices')
    .insert({
      order_id: order.id,
      user_id: user.id,
      invoice_number: invoiceNumber,
      amount: finalAmount,
      status: 'pending',
    })

  if (invoiceError) {
    console.error('Invoice insert error:', invoiceError)
  }

  // Send confirmation email to customer (non-blocking)
  if (profile?.email) {
    sendOrderConfirmation({
      to: profile.email,
      customerName: profile.full_name || 'Valued Customer',
      orderNumber: invoiceNumber,
      planName,
      connections,
      amount: `$${finalAmount.toFixed(2)}`,
    }).catch(console.error)
  }

  // Notify admin of new order (non-blocking)
  sendAdminNewOrderAlert({
    customerEmail: profile?.email || user.email || '',
    customerName: profile?.full_name || 'New Customer',
    orderNumber: invoiceNumber,
    planName,
    connections,
    amount: finalAmount.toFixed(2),
    orderId: order.id,
  }).catch(console.error)

  return NextResponse.json(
    {
      orderId: order.id,
      invoiceNumber,
      amount: finalAmount,
      originalAmount,
      discountAmount,
      couponCode: appliedCouponCode,
    },
    { status: 201 }
  )
}
