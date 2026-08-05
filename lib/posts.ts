import { createClient } from '@supabase/supabase-js'
import { createAdminClient } from '@/lib/supabase/admin'

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  contentFormat: 'markdown' | 'html'
  date: string
  readTime: string
  author: string
  authorRole: string
  imageUrl: string
  category: string
  seoKeywords: string
  status: 'published' | 'draft'
  summary?: string
  faqs?: { q: string; a: string }[]
  dateModified?: string
  imageAlt?: string
  // per-post SEO overrides
  metaTitle?: string
  metaDescription?: string
  canonicalUrl?: string
  ogImageUrl?: string
  noindex?: boolean
  focusKeyword?: string
  schemaType?: string
}

// Cookie-free anon client for public reads — required so static/cached pages
// never touch cookies; RLS restricts anon SELECT to published posts only.
const anon = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
)

type PostRow = Record<string, unknown>

function rowToPost(row: PostRow): BlogPost {
  return {
    id: String(row.id ?? ''),
    slug: String(row.slug ?? ''),
    title: String(row.title ?? ''),
    excerpt: String(row.excerpt ?? ''),
    content: String(row.content ?? ''),
    contentFormat: (row.content_format as 'markdown' | 'html') || 'html',
    date: String(row.date ?? ''),
    readTime: String(row.read_time ?? ''),
    author: String(row.author ?? ''),
    authorRole: String(row.author_role ?? ''),
    imageUrl: String(row.image_url ?? ''),
    category: String(row.category ?? ''),
    seoKeywords: String(row.seo_keywords ?? ''),
    status: (row.status as 'published' | 'draft') || 'draft',
    summary: (row.summary as string) || undefined,
    faqs: (row.faqs as { q: string; a: string }[]) || undefined,
    dateModified: (row.date_modified as string) || undefined,
    imageAlt: (row.image_alt as string) || undefined,
    metaTitle: (row.meta_title as string) || undefined,
    metaDescription: (row.meta_description as string) || undefined,
    canonicalUrl: (row.canonical_url as string) || undefined,
    ogImageUrl: (row.og_image_url as string) || undefined,
    noindex: (row.noindex as boolean) || false,
    focusKeyword: (row.focus_keyword as string) || undefined,
    schemaType: (row.schema_type as string) || undefined,
  }
}

function postToRow(post: Partial<BlogPost>): PostRow {
  const row: PostRow = {}
  if (post.slug !== undefined) row.slug = post.slug
  if (post.title !== undefined) row.title = post.title
  if (post.excerpt !== undefined) row.excerpt = post.excerpt
  if (post.content !== undefined) row.content = post.content
  if (post.contentFormat !== undefined) row.content_format = post.contentFormat
  if (post.date !== undefined) row.date = post.date
  if (post.readTime !== undefined) row.read_time = post.readTime
  if (post.author !== undefined) row.author = post.author
  if (post.authorRole !== undefined) row.author_role = post.authorRole
  if (post.imageUrl !== undefined) row.image_url = post.imageUrl
  if (post.category !== undefined) row.category = post.category
  if (post.seoKeywords !== undefined) row.seo_keywords = post.seoKeywords
  if (post.status !== undefined) row.status = post.status
  if (post.summary !== undefined) row.summary = post.summary
  if (post.faqs !== undefined) row.faqs = post.faqs
  if (post.dateModified !== undefined) row.date_modified = post.dateModified
  if (post.imageAlt !== undefined) row.image_alt = post.imageAlt
  if (post.metaTitle !== undefined) row.meta_title = post.metaTitle
  if (post.metaDescription !== undefined) row.meta_description = post.metaDescription
  if (post.canonicalUrl !== undefined) row.canonical_url = post.canonicalUrl
  if (post.ogImageUrl !== undefined) row.og_image_url = post.ogImageUrl
  if (post.noindex !== undefined) row.noindex = post.noindex
  if (post.focusKeyword !== undefined) row.focus_keyword = post.focusKeyword
  if (post.schemaType !== undefined) row.schema_type = post.schemaType
  return row
}

const ORDER = { column: 'sort_order', opts: { ascending: true } } as const

/** All posts including drafts — ADMIN use only (service role). */
export async function getPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await createAdminClient()
      .from('posts')
      .select('*')
      .order(ORDER.column, ORDER.opts)
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data || []).map(rowToPost)
  } catch (err) {
    console.error('getPosts failed:', err)
    return []
  }
}

/** Published posts — safe for public pages (anon client, RLS-filtered). */
export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const { data, error } = await anon
      .from('posts')
      .select('*')
      .eq('status', 'published')
      .order(ORDER.column, ORDER.opts)
      .order('created_at', { ascending: false })
    if (error) throw error
    return (data || []).map(rowToPost)
  } catch (err) {
    console.error('getPublishedPosts failed:', err)
    return []
  }
}

/** Single post by slug, drafts included — used by admin edit + public page (which 404s drafts itself). */
export async function getPost(slug: string): Promise<BlogPost | undefined> {
  try {
    const { data, error } = await createAdminClient()
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .maybeSingle()
    if (error) throw error
    return data ? rowToPost(data) : undefined
  } catch (err) {
    console.error('getPost failed:', err)
    return undefined
  }
}

export async function createPost(post: BlogPost): Promise<void> {
  const row = postToRow(post)
  // put the new post first (matches the old unshift behavior)
  row.sort_order = -Date.now()
  const { error } = await createAdminClient().from('posts').insert(row)
  if (error) throw error
}

export async function updatePost(slug: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
  const { data, error } = await createAdminClient()
    .from('posts')
    .update(postToRow(updates))
    .eq('slug', slug)
    .select('*')
    .maybeSingle()
  if (error) throw error
  return data ? rowToPost(data) : null
}

export async function deletePost(slug: string): Promise<boolean> {
  const { data, error } = await createAdminClient()
    .from('posts')
    .delete()
    .eq('slug', slug)
    .select('slug')
  if (error) throw error
  return (data || []).length > 0
}
