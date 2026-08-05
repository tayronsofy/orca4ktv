import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { requireAdmin } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const admin = createAdminClient()
  const { data, error } = await admin.from('seo_settings').select('*').eq('id', 1).maybeSingle()
  if (error) return NextResponse.json({ error: 'query_failed', detail: error.message }, { status: 500 })
  return NextResponse.json({ settings: data || { id: 1 } })
}

const WHITELIST = [
  'title_template', 'default_og_image', 'social_same_as',
  'google_verification', 'bing_verification',
  'robots_extra_lines', 'sitemap_exclusions', 'default_blog_schema_type',
] as const

export async function PUT(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const body = await request.json()
  const row: Record<string, unknown> = { id: 1 }
  for (const field of WHITELIST) {
    if (field in (body || {})) {
      const v = body[field]
      row[field] = typeof v === 'string' ? (v.trim() || null) : v ?? null
    }
  }

  const admin = createAdminClient()
  const { error } = await admin.from('seo_settings').upsert(row, { onConflict: 'id' })
  if (error) return NextResponse.json({ error: 'update_failed', detail: error.message }, { status: 500 })

  revalidateTag('seo')
  return NextResponse.json({ success: true })
}
