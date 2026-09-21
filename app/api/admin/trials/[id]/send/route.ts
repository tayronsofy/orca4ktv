import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendTrialCredentials } from '@/lib/email'
import { createTrialM3U, PanelError } from '@/lib/iptv-panel'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://orca4ktv.com'
const STREAM_HOST = process.env.IPTV_SERVER_URL || 'http://line.trxdnscloud.ru'

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const { id } = await params
  const body = await request.json()
  const { duration_hours, mode, iptv_username, iptv_password, m3u_url, portal_url, account_id } = body

  if (!['panel', 'pool', 'manual'].includes(mode)) {
    return NextResponse.json({ error: 'validation', message: 'Invalid mode.' }, { status: 400 })
  }

  // Panel mode is fixed at 12h (set by the panel for demo accounts); others clamp to 1-72h
  const requested = Number(duration_hours)
  const effectiveDuration =
    mode === 'panel' ? 12 : Math.min(72, Math.max(1, Number.isFinite(requested) ? Math.round(requested) : 24))

  const admin = createAdminClient()

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
  let poolAccountId: string | null = null

  if (mode === 'panel') {
    try {
      const created = await createTrialM3U(`Trial: ${trial.name} <${trial.email}>`)
      creds = {
        iptv_username: created.username,
        iptv_password: created.password,
        m3u_url: `${STREAM_HOST}/get.php?username=${created.username}&password=${created.password}&type=m3u_plus&output=ts`,
      }
    } catch (err) {
      console.error('Panel create trial error:', err)
      const detail = err instanceof PanelError ? err.panelMessage : err instanceof Error ? err.message : String(err)
      let message = `IPTV panel refused the trial: "${detail}".`
      if (/credit|ticket/i.test(detail)) {
        message += ' Demo trials consume Demo Tickets (not credits) - top up demo tickets in ActivationPanel, or send this trial via Pool or Manual.'
      } else if (!(err instanceof PanelError)) {
        message += ' Check the panel connection (IPTV_PANEL_URL / IPTV_API_KEY) and try again.'
      }
      return NextResponse.json({ error: 'panel_error', message, detail }, { status: 502 })
    }
  } else if (mode === 'pool') {
    // Assign the requested pool account, or fall back to the oldest available one
    let accountQuery = admin.from('trial_accounts').select('*').eq('status', 'available')
    if (account_id) accountQuery = accountQuery.eq('id', account_id)
    const { data: accounts } = await accountQuery.order('created_at', { ascending: true }).limit(1)
    const account = accounts?.[0]
    if (!account) {
      return NextResponse.json({ error: 'pool_empty', message: 'No available accounts in the pool.' }, { status: 409 })
    }
    poolAccountId = account.id
    creds = {
      iptv_username: account.iptv_username,
      iptv_password: account.iptv_password,
      m3u_url: account.m3u_url,
      portal_url: account.portal_url || undefined,
    }
  } else {
    if (!iptv_username?.trim() || !iptv_password?.trim() || !m3u_url?.trim()) {
      return NextResponse.json({ error: 'validation', message: 'IPTV username, password, and M3U URL are required.' }, { status: 400 })
    }
    creds = {
      iptv_username: iptv_username.trim(),
      iptv_password: iptv_password.trim(),
      m3u_url: m3u_url.trim(),
      portal_url: portal_url?.trim() || undefined,
    }
  }

  // ── Token + activation URL ───────────────────────────────────────────────────

  const signupToken = crypto.randomUUID()
  const activationUrl = `${SITE_URL}/auth/register?trial=${signupToken}&next=${encodeURIComponent('/dashboard/trial')}`

  // ── Email FIRST: if the send fails, nothing is mutated and the trial stays
  //    pending (retryable). The customer can't click the link before the row is
  //    written below - the write happens milliseconds after a successful send.

  const emailResult = await sendTrialCredentials({
    to: trial.email,
    name: trial.name,
    activation_url: activationUrl,
    expires_at,
    duration_hours: effectiveDuration,
  })

  if (!emailResult.ok) {
    return NextResponse.json(
      { error: 'email_failed', message: 'Failed to send email. Nothing was changed - please try again.', detail: emailResult.error },
      { status: 502 }
    )
  }

  // ── Persist the trial, then consume the pool account ────────────────────────

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
    console.error('Trial update error (email already sent!):', updateError)
    return NextResponse.json(
      { error: 'db_error', message: 'Email was sent but the trial could not be marked as sent. Retry to keep records consistent.' },
      { status: 500 }
    )
  }

  if (mode === 'pool' && poolAccountId) {
    await admin
      .from('trial_accounts')
      .update({ status: 'in_use', assigned_trial_id: id })
      .eq('id', poolAccountId)
  }

  return NextResponse.json({ success: true, expires_at, credentials: creds, skipped: emailResult.skipped })
}
