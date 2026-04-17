import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

function checkAdminAuth(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value
  const expected = process.env.ADMIN_SECRET
  return !!(token && expected && token === expected)
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const admin = createAdminClient()

  const { data, error } = await admin
    .from('orders')
    .select('*, profiles(*), invoices(*), subscriptions(*)')
    .eq('id', id)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Order not found' }, { status: 404 })

  return NextResponse.json(data)
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await request.json()
  const admin = createAdminClient()

  // Allowed order fields to update
  const orderFields: Record<string, unknown> = {}
  if (body.status) orderFields.status = body.status
  if (body.notes !== undefined) orderFields.notes = body.notes

  if (Object.keys(orderFields).length > 0) {
    const { error } = await admin.from('orders').update(orderFields).eq('id', id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  }

  // Update invoice if payment_link or status provided
  if (body.payment_link !== undefined || body.invoice_status) {
    const invoiceFields: Record<string, unknown> = {}
    if (body.payment_link !== undefined) invoiceFields.payment_link = body.payment_link
    if (body.invoice_status) {
      invoiceFields.status = body.invoice_status
      if (body.invoice_status === 'paid') invoiceFields.paid_at = new Date().toISOString()
    }
    await admin.from('invoices').update(invoiceFields).eq('order_id', id)
  }

  return NextResponse.json({ success: true })
}
