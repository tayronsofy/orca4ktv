/**
 * One-time migration: data/posts.json → Supabase `posts` table.
 * Idempotent (upsert on slug) — safe to re-run.
 *
 *   npx tsx scripts/migrate-posts.ts
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local.
 * Run supabase-migration-admin.sql in the Supabase SQL editor first.
 */
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: path.join(process.cwd(), '.env.local') })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, key)

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

async function main() {
  const raw = fs.readFileSync(path.join(process.cwd(), 'data', 'posts.json'), 'utf-8')
  const posts: Record<string, unknown>[] = JSON.parse(raw)
  console.log(`Read ${posts.length} posts from data/posts.json`)

  const rows = posts.map((p, index) => ({
    // keep the JSON id only when it's a real uuid; otherwise let the DB generate
    ...(typeof p.id === 'string' && UUID_RE.test(p.id) ? { id: p.id } : {}),
    slug: p.slug,
    title: p.title ?? '',
    excerpt: p.excerpt ?? '',
    summary: p.summary ?? null,
    content: p.content ?? '',
    content_format: p.contentFormat === 'markdown' ? 'markdown' : 'html',
    category: p.category ?? 'Guides',
    author: p.author ?? '',
    author_role: p.authorRole ?? null,
    date: p.date ?? '',
    date_modified: p.dateModified ?? null,
    read_time: p.readTime ?? '5 min read',
    image_url: p.imageUrl ?? null,
    image_alt: p.imageAlt ?? null,
    seo_keywords: p.seoKeywords ?? null,
    status: p.status === 'draft' ? 'draft' : 'published',
    faqs: p.faqs ?? null,
    sort_order: index, // preserves newest-first array order
  }))

  const { error } = await supabase.from('posts').upsert(rows, { onConflict: 'slug' })
  if (error) {
    console.error('Upsert failed:', error.message)
    process.exit(1)
  }

  const { count } = await supabase.from('posts').select('*', { count: 'exact', head: true })
  console.log(`Done. posts table now holds ${count} rows (expected >= ${posts.length}).`)

  // Spot-check: longest post content survives byte-exact
  const longest = posts.reduce((a, b) =>
    String(a.content || '').length >= String(b.content || '').length ? a : b
  )
  const { data: check } = await supabase
    .from('posts')
    .select('slug, content')
    .eq('slug', longest.slug as string)
    .single()
  const match = check && String(check.content).length === String(longest.content).length
  console.log(
    `Spot-check "${longest.slug}": content length ${String(longest.content).length} -> ${match ? 'OK' : 'MISMATCH!'}`
  )
  if (!match) process.exit(1)
}

main()
