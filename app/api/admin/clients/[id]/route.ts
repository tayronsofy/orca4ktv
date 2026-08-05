import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest as checkAdminAuth } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await params
  const admin = createAdminClient()

  const { data: profile, error } = await admin
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !profile) return NextResponse.json({ error: 'Client not found' }, { status: 404 })

  const { data: orders } = await admin
    .from('orders')
    .select('*, invoices(*), subscriptions(*)')
    .eq('user_id', id)
    .order('created_at', { ascending: false })

  return NextResponse.json({ profile, orders: orders || [] })
}
