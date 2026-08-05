import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin/auth'
import { sendTestEmail, getEmailConfig } from '@/lib/email'

/** POST: send a test email; surfaces the raw SMTP error string on failure. */
export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const body = await request.json().catch(() => ({}))
  const config = await getEmailConfig()
  const to = String(body?.to || '').trim() || config.adminEmail || config.fromEmail

  if (!to) {
    return NextResponse.json({ error: 'missing_fields', detail: 'No recipient (set an admin email first)' }, { status: 400 })
  }

  const result = await sendTestEmail(to)
  if (result.skipped) {
    return NextResponse.json(
      { error: 'email_failed', detail: 'No SMTP credentials configured (send was skipped)' },
      { status: 502 }
    )
  }
  if (!result.ok) {
    // raw SMTP error string, e.g. "535 5.7.8 Error: authentication failed"
    return NextResponse.json({ error: 'email_failed', detail: result.error }, { status: 502 })
  }
  return NextResponse.json({ success: true, to, id: result.id })
}
