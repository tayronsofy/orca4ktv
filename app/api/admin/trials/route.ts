import { NextRequest, NextResponse } from 'next/server'
import { isAdminRequest as checkAdminAuth } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')

  const admin = createAdminClient()
  const now = new Date().toISOString()

  let query = admin
    .from('trials')
    .select('id, name, email, device, country, message, status, duration_hours, sent_at, expires_at, created_at')
    .order('created_at', { ascending: false })

  if (status && status !== 'all') {
    if (status === 'expired') {
      // expired = sent rows whose expires_at has passed
      query = query.eq('status', 'sent').lt('expires_at', now)
    } else if (status === 'sent') {
      // sent = sent rows whose expires_at has NOT yet passed
      query = query.eq('status', 'sent').gte('expires_at', now)
    } else {
      query = query.eq('status', status)
    }
  }

  const { data, error } = await query

  if (error) {
    console.error('Trials fetch error:', error)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }

  // Attach a computed display_status so the UI doesn't need date math
  const trials = (data || []).map((trial) => ({
    ...trial,
    display_status:
      trial.status === 'sent' && trial.expires_at && trial.expires_at < now
        ? 'expired'
        : trial.status,
  }))

  return NextResponse.json({ trials })
}
