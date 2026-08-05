import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { normalizePath } from '@/lib/seo/paths'

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const { id } = await params
  const body = await request.json()
  const updates: Record<string, unknown> = {}

  if ('enabled' in body) updates.enabled = !!body.enabled
  if ('note' in body) updates.note = body.note?.trim() || null
  if ('status_code' in body) {
    const code = Number(body.status_code)
    if (![301, 302, 410].includes(code)) {
      return NextResponse.json({ error: 'bad_request', detail: 'status_code must be 301, 302 or 410' }, { status: 400 })
    }
    updates.status_code = code
    if (code === 410) updates.to_path = null
  }
  if ('to_path' in body && updates.status_code !== 410) {
    updates.to_path = body.to_path ? normalizePath(String(body.to_path)) : null
  }
  if ('from_path' in body) updates.from_path = normalizePath(String(body.from_path))

  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ error: 'nothing_to_update' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { error } = await admin.from('seo_redirects').update(updates).eq('id', id)
  if (error) return NextResponse.json({ error: 'update_failed', detail: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const { id } = await params
  const admin = createAdminClient()
  const { error } = await admin.from('seo_redirects').delete().eq('id', id)
  if (error) return NextResponse.json({ error: 'delete_failed', detail: error.message }, { status: 500 })
  return NextResponse.json({ success: true })
}
