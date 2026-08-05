import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { normalizePath } from '@/lib/seo/paths'

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const admin = createAdminClient()
  const { data, error } = await admin.from('seo_redirects').select('*').order('created_at', { ascending: false })
  if (error) return NextResponse.json({ error: 'query_failed', detail: error.message }, { status: 500 })
  return NextResponse.json({ redirects: data || [] })
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const body = await request.json()
  const fromPath = normalizePath(String(body?.from_path || ''))
  const statusCode = Number(body?.status_code) || 301
  const toPath = statusCode === 410 ? null : normalizePath(String(body?.to_path || ''))

  if (!fromPath || fromPath === '/') {
    return NextResponse.json({ error: 'bad_request', detail: 'Source path is required and cannot be /' }, { status: 400 })
  }
  if (![301, 302, 410].includes(statusCode)) {
    return NextResponse.json({ error: 'bad_request', detail: 'status_code must be 301, 302 or 410' }, { status: 400 })
  }
  if (statusCode !== 410 && !toPath) {
    return NextResponse.json({ error: 'missing_fields', detail: 'Destination is required for 301/302' }, { status: 400 })
  }
  // Loop guards
  if (toPath && toPath === fromPath) {
    return NextResponse.json({ error: 'bad_request', detail: 'Source and destination are the same' }, { status: 400 })
  }

  const admin = createAdminClient()
  if (toPath) {
    const { data: loop } = await admin
      .from('seo_redirects')
      .select('id')
      .eq('from_path', toPath)
      .eq('enabled', true)
      .limit(1)
    if (loop && loop.length > 0) {
      return NextResponse.json(
        { error: 'bad_request', detail: 'Destination is itself an enabled redirect source (would loop/chain)' },
        { status: 400 }
      )
    }
  }

  const { data, error } = await admin
    .from('seo_redirects')
    .insert({
      from_path: fromPath,
      to_path: toPath,
      status_code: statusCode,
      enabled: body?.enabled !== false,
      note: body?.note?.trim() || null,
    })
    .select('*')
    .single()

  if (error) {
    if (error.message.includes('duplicate') || error.code === '23505') {
      return NextResponse.json({ error: 'bad_request', detail: 'A redirect for this source already exists' }, { status: 409 })
    }
    return NextResponse.json({ error: 'insert_failed', detail: error.message }, { status: 500 })
  }
  return NextResponse.json({ redirect: data }, { status: 201 })
}
