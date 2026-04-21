import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendTrialCredentials } from '@/lib/resend'

function checkAdminAuth(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value
  const expected = process.env.ADMIN_SECRET
  return !!(token && expected && token === expected)
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await request.json()
  const { iptv_username, iptv_password, m3u_url, portal_url, duration_hours, account_id } = body

  // Validate required fields
  if (!iptv_username?.trim() || !iptv_password?.trim() || !m3u_url?.trim()) {
    return NextResponse.json({ error: 'validation', message: 'IPTV username, password, and M3U URL are required.' }, { status: 400 })
  }
  if (![24, 48, 72].includes(Number(duration_hours))) {
    return NextResponse.json({ error: 'validation', message: 'Duration must be 24, 48, or 72 hours.' }, { status: 400 })
  }

  const admin = createAdminClient()

  // Fetch the trial
  const { data: trial } = await admin
    .from('trials')
    .select('id, name, email, status')
    .eq('id', id)
    .single()

  if (!trial) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  if (trial.status === 'sent') return NextResponse.json({ error: 'already_sent', message: 'This trial has already been sent.' }, { status: 409 })

  const expires_at = new Date(Date.now() + Number(duration_hours) * 3600 * 1000).toISOString()

  // Send email first — only update DB if it succeeds
  try {
    await sendTrialCredentials({
      to: trial.email,
      name: trial.name,
      iptv_username: iptv_username.trim(),
      iptv_password: iptv_password.trim(),
      m3u_url: m3u_url.trim(),
      portal_url: portal_url?.trim() || undefined,
      expires_at,
    })
  } catch (err) {
    console.error('Trial email send error:', err)
    return NextResponse.json(
      { error: 'email_failed', message: 'Failed to send email. Please check credentials and try again.' },
      { status: 500 }
    )
  }

  // Email sent — update trial record
  await admin
    .from('trials')
    .update({
      status: 'sent',
      iptv_username: iptv_username.trim(),
      iptv_password: iptv_password.trim(),
      m3u_url: m3u_url.trim(),
      portal_url: portal_url?.trim() || null,
      duration_hours: Number(duration_hours),
      sent_at: new Date().toISOString(),
      expires_at,
    })
    .eq('id', id)

  // Mark the pool account as in_use (if one was used from the pool)
  if (account_id) {
    await admin
      .from('trial_accounts')
      .update({ status: 'in_use', assigned_trial_id: id })
      .eq('id', account_id)
  }

  return NextResponse.json({ success: true, expires_at })
}
