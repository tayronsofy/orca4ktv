import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest as checkAdminAuth } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await request.json()
  const { label, iptv_username, iptv_password, m3u_url, portal_url, status } = body

  const updates: Record<string, string | null> = {}
  if (label !== undefined) updates.label = label?.trim() || null
  if (iptv_username !== undefined) updates.iptv_username = iptv_username?.trim() || null
  if (iptv_password !== undefined) updates.iptv_password = iptv_password?.trim() || null
  if (m3u_url !== undefined) updates.m3u_url = m3u_url?.trim() || null
  if (portal_url !== undefined) updates.portal_url = portal_url?.trim() || null
  if (status !== undefined) {
    if (!['available', 'in_use', 'disabled'].includes(status)) {
      return NextResponse.json({ error: 'validation', message: 'Invalid status.' }, { status: 400 })
    }
    updates.status = status
    // When marking available again, clear assignment
    if (status === 'available') updates.assigned_trial_id = null
  }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('trial_accounts')
    .update(updates)
    .eq('id', id)
    .select('id, label, iptv_username, iptv_password, m3u_url, portal_url, status, assigned_trial_id, created_at')
    .single()

  if (error) return NextResponse.json({ error: 'server_error' }, { status: 500 })

  return NextResponse.json({ account: data })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { id } = await params
  const admin = createAdminClient()

  const { error } = await admin.from('trial_accounts').delete().eq('id', id)
  if (error) return NextResponse.json({ error: 'server_error' }, { status: 500 })

  return NextResponse.json({ success: true })
}
