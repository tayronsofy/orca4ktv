import { NextRequest, NextResponse } from 'next/server'
import { randomBytes } from 'crypto'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendTrialCredentials } from '@/lib/resend'
import { createTrialM3U } from '@/lib/iptv-panel'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://orca4ktv.com'

function checkAdminAuth(request: NextRequest): boolean {
  const token = request.cookies.get('admin_token')?.value
  const expected = process.env.ADMIN_SECRET
  return !!(token && expected && token === expected)
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!checkAdminAuth(request)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await request.json()
  const { duration_hours, mode, iptv_username, iptv_password, m3u_url, portal_url, account_id } = body

  // Panel mode is fixed at 12h (set by the panel for demo accounts)
  const effectiveDuration = mode === 'panel' ? 12 : Number(duration_hours)
  if (mode !== 'panel' && ![24, 48, 72].includes(effectiveDuration)) {
    return NextResponse.json({ error: 'validation', message: 'Duration must be 24, 48, or 72 hours.' }, { status: 400 })
  }
  if (!['panel', 'pool', 'manual'].includes(mode)) {
    return NextResponse.json({ error: 'validation', message: 'Invalid mode.' }, { status: 400 })
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

  const expires_at = new Date(Date.now() + effectiveDuration * 3600 * 1000).toISOString()

  // ── Resolve credentials based on mode ────────────────────────────────────────

  let creds: { iptv_username: string; iptv_password: string; m3u_url: string; portal_url?: string }

  if (mode === 'panel') {
    try {
      const created = await createTrialM3U(`Trial: ${trial.name} <${trial.email}>`)
      creds = {
        iptv_username: created.username,
        iptv_password: created.password,
        m3u_url: `http://line.trxdnscloud.ru/get.php?username=${created.username}&password=${created.password}&type=m3u_plus&output=ts`,
      }
    } catch (err) {
      console.error('Panel create trial error:', err)
      return NextResponse.json(
        { error: 'panel_error', message: 'Failed to create trial on IPTV panel. Check your panel connection and try again.' },
        { status: 502 }
      )
    }
  } else if (mode === 'pool' || mode === 'manual') {
    if (!iptv_username?.trim() || !iptv_password?.trim() || !m3u_url?.trim()) {
      return NextResponse.json({ error: 'validation', message: 'IPTV username, password, and M3U URL are required.' }, { status: 400 })
    }
    creds = {
      iptv_username: iptv_username.trim(),
      iptv_password: iptv_password.trim(),
      m3u_url: m3u_url.trim(),
      portal_url: portal_url?.trim() || undefined,
    }
  } else {
    return NextResponse.json({ error: 'validation', message: 'Invalid mode.' }, { status: 400 })
  }

  // ── Generate signup token + activation URL ───────────────────────────────────

  const signupToken = randomBytes(32).toString('hex')
  const activationUrl = `${SITE_URL}/auth/register?trial=${signupToken}&next=${encodeURIComponent('/dashboard/trial')}`

  // ── Persist creds + token first (so /dashboard/trial can read them after signup)

  const { error: updateError } = await admin
    .from('trials')
    .update({
      status: 'sent',
      iptv_username: creds.iptv_username,
      iptv_password: creds.iptv_password,
      m3u_url: creds.m3u_url,
      portal_url: creds.portal_url || null,
      duration_hours: effectiveDuration,
      sent_at: new Date().toISOString(),
      expires_at,
      signup_token: signupToken,
    })
    .eq('id', id)

  if (updateError) {
    console.error('Trial update error:', updateError)
    return NextResponse.json(
      { error: 'db_error', message: 'Failed to save trial. Please try again.' },
      { status: 500 }
    )
  }

  // ── Send activation email (no creds in body) ────────────────────────────────

  try {
    await sendTrialCredentials({
      to: trial.email,
      name: trial.name,
      activation_url: activationUrl,
      expires_at,
      duration_hours: effectiveDuration,
    })
  } catch (err) {
    console.error('Trial email send error:', err)
    return NextResponse.json(
      { error: 'email_failed', message: 'Failed to send email. Please try again.' },
      { status: 500 }
    )
  }

  // Mark pool account as in_use if applicable
  if (mode === 'pool' && account_id) {
    await admin
      .from('trial_accounts')
      .update({ status: 'in_use', assigned_trial_id: id })
      .eq('id', account_id)
  }

  return NextResponse.json({ success: true, expires_at, credentials: creds })
}
