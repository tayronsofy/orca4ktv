import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'

const ALLOWED_STATUSES = ['pending', 'rejected'] as const

/** PATCH: reject a trial request (or move it back to pending). */
export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const { id } = await params
  const body = await request.json()
  const status = body?.status as string

  if (!ALLOWED_STATUSES.includes(status as (typeof ALLOWED_STATUSES)[number])) {
    return NextResponse.json({ error: 'bad_request', detail: 'status must be pending or rejected' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { data: trial } = await admin.from('trials').select('id, status').eq('id', id).single()
  if (!trial) return NextResponse.json({ error: 'not_found' }, { status: 404 })
  if (trial.status === 'sent') {
    return NextResponse.json({ error: 'bad_request', detail: 'Cannot change a trial that was already sent.' }, { status: 400 })
  }

  const { error } = await admin.from('trials').update({ status }).eq('id', id)
  if (error) return NextResponse.json({ error: 'update_failed', detail: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
