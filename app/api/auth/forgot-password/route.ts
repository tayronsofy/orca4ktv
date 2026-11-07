import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendPasswordReset } from '@/lib/email'
import { checkAndRecord } from '@/lib/tools/rate-limit'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://orca4ktv.com').replace(/\/$/, '')
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Password reset request.
 *
 * Generates a Supabase recovery token server-side and emails it through our own
 * SMTP (lib/email) instead of Supabase's built-in mailer, which is heavily
 * rate-limited without custom SMTP. The emailed link carries only the hashed
 * token; /auth/reset-password verifies it when the customer submits a new
 * password, so link scanners that prefetch the URL can't burn the token.
 *
 * Always answers { ok: true } for a well-formed email, whether or not an account
 * exists, so the endpoint can't be used to discover registered addresses.
 */
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : ''

  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'invalid_email' }, { status: 400 })
  }

  const limit = await checkAndRecord('password-reset', request, { max: 5, windowMs: 15 * 60 * 1000 })
  if (!limit.ok) {
    return NextResponse.json(
      { error: 'rate_limited', retryAfterSec: limit.retryAfterSec },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } }
    )
  }

  const admin = createAdminClient()
  const { data, error } = await admin.auth.admin.generateLink({ type: 'recovery', email })

  if (error || !data?.properties?.hashed_token) {
    // Unknown email (or a GoTrue hiccup): same response either way.
    if (error && !/not.?found|no user/i.test(error.message)) {
      console.error('[forgot-password] generateLink failed:', error.message)
    }
    return NextResponse.json({ ok: true })
  }

  const { data: profile } = await admin
    .from('profiles')
    .select('full_name')
    .eq('id', data.user.id)
    .maybeSingle()

  const resetUrl = `${SITE_URL}/auth/reset-password?token_hash=${encodeURIComponent(data.properties.hashed_token)}`
  const result = await sendPasswordReset({
    to: data.user.email || email,
    name: profile?.full_name || (data.user.user_metadata?.full_name as string | undefined),
    resetUrl,
  })
  if (!result.ok) {
    console.error('[forgot-password] email send failed for', email, result.error)
  }

  return NextResponse.json({ ok: true })
}
