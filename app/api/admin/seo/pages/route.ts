import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'
import { requireAdmin } from '@/lib/admin/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { SEO_PAGES, getRegistryEntry } from '@/lib/seo/registry'

/** GET: registry merged with any override rows. */
export async function GET(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const admin = createAdminClient()
  const { data: rows, error } = await admin.from('seo_meta').select('*')
  if (error) return NextResponse.json({ error: 'query_failed', detail: error.message }, { status: 500 })

  const overrides = new Map((rows || []).map(r => [r.page_key, r]))
  const pages = SEO_PAGES.map(p => ({
    ...p,
    override: overrides.get(p.key) || null,
  }))
  return NextResponse.json({ pages })
}

const WHITELIST = [
  'meta_title', 'meta_description', 'canonical_url', 'noindex', 'nofollow',
  'og_title', 'og_description', 'og_image_url',
  'twitter_title', 'twitter_description', 'twitter_image_url',
  'focus_keyword', 'schema_breadcrumb', 'schema_faq',
] as const

/** PUT: upsert an override row { pageKey, fields } — blank strings become NULL (= fallback). */
export async function PUT(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const body = await request.json()
  const pageKey = String(body?.pageKey || '')
  if (!getRegistryEntry(pageKey)) {
    return NextResponse.json({ error: 'not_found', detail: 'unknown page key' }, { status: 404 })
  }

  const row: Record<string, unknown> = { page_key: pageKey }
  for (const field of WHITELIST) {
    if (field in (body?.fields || {})) {
      const v = body.fields[field]
      row[field] = typeof v === 'string' ? (v.trim() || null) : v ?? null
    }
  }

  const admin = createAdminClient()
  const { error } = await admin.from('seo_meta').upsert(row, { onConflict: 'page_key' })
  if (error) return NextResponse.json({ error: 'update_failed', detail: error.message }, { status: 500 })

  revalidateTag('seo')
  return NextResponse.json({ success: true })
}

/** DELETE: reset to defaults — remove the override row. ?pageKey= */
export async function DELETE(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const pageKey = request.nextUrl.searchParams.get('pageKey') || ''
  if (!getRegistryEntry(pageKey)) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  const admin = createAdminClient()
  const { error } = await admin.from('seo_meta').delete().eq('page_key', pageKey)
  if (error) return NextResponse.json({ error: 'delete_failed', detail: error.message }, { status: 500 })

  revalidateTag('seo')
  return NextResponse.json({ success: true })
}
