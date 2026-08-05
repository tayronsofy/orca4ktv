import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { clearEmailConfigCache } from '@/lib/email'

/** GET: settings row WITHOUT the password — has_password flag instead. */
export async function GET(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const admin = createAdminClient()
  const { data, error } = await admin.from('smtp_settings').select('*').eq('id', 1).maybeSingle()
  if (error) return NextResponse.json({ error: 'query_failed', detail: error.message }, { status: 500 })

  const row = data || {}
  const { smtp_pass, ...rest } = row as Record<string, unknown>
  return NextResponse.json({ settings: { ...rest, has_password: !!smtp_pass } })
}

const WHITELIST = ['host', 'port', 'secure', 'smtp_user', 'from_name', 'from_email', 'reply_to', 'admin_email'] as const

/** PUT: whitelist fields; password only updated when a non-empty value is sent. */
export async function PUT(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const body = await request.json()
  const row: Record<string, unknown> = { id: 1 }

  for (const field of WHITELIST) {
    if (field in (body || {})) {
      const v = body[field]
      if (field === 'port') row.port = Number(v) || 465
      else if (field === 'secure') row.secure = !!v
      else row[field] = typeof v === 'string' ? (v.trim() || null) : v ?? null
    }
  }
  // blank password = keep the stored one
  if (typeof body?.smtp_pass === 'string' && body.smtp_pass.trim()) {
    row.smtp_pass = body.smtp_pass.trim()
  }

  const admin = createAdminClient()
  const { error } = await admin.from('smtp_settings').upsert(row, { onConflict: 'id' })
  if (error) return NextResponse.json({ error: 'update_failed', detail: error.message }, { status: 500 })

  clearEmailConfigCache()
  return NextResponse.json({ success: true })
}
