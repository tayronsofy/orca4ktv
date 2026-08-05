import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest as checkAdminAuth } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('trial_accounts')
    .select('id, label, iptv_username, iptv_password, m3u_url, portal_url, status, assigned_trial_id, created_at')
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ error: 'server_error' }, { status: 500 })

  return NextResponse.json({ accounts: data || [] })
}

export async function POST(request: NextRequest) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const body = await request.json()
  const { label, iptv_username, iptv_password, m3u_url, portal_url } = body

  if (!label?.trim() || !iptv_username?.trim() || !iptv_password?.trim() || !m3u_url?.trim()) {
    return NextResponse.json({ error: 'validation', message: 'Label, username, password, and M3U URL are required.' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('trial_accounts')
    .insert({
      label: label.trim(),
      iptv_username: iptv_username.trim(),
      iptv_password: iptv_password.trim(),
      m3u_url: m3u_url.trim(),
      portal_url: portal_url?.trim() || null,
      status: 'available',
    })
    .select('id, label, iptv_username, iptv_password, m3u_url, portal_url, status, created_at')
    .single()

  if (error) return NextResponse.json({ error: 'server_error' }, { status: 500 })

  return NextResponse.json({ account: data })
}
