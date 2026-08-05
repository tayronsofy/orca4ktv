import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin/auth'
import { generateStructured, stripAiTells, AiError } from '@/lib/ai/gemini'
import { buildArticlePrompt, ARTICLE_SCHEMA, ARTICLE_TYPES, type ArticleType } from '@/lib/ai/blog-prompts'
import { getPublishedPosts, getPost, createPost, type BlogPost } from '@/lib/posts'

export const maxDuration = 300

interface ArticleOutput {
  title: string
  slug: string
  excerpt: string
  category: string
  seo_keywords: string
  focus_keyword: string
  meta_title: string
  meta_description: string
  read_time: string
  content_html: string
}

function sanitizeSlug(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const body = await request.json()
  const subject = String(body?.subject || '').trim()
  const type = String(body?.type || '') as ArticleType

  if (!subject || !ARTICLE_TYPES[type]) {
    return NextResponse.json({ error: 'bad_request', detail: 'subject and a valid type are required' }, { status: 400 })
  }

  try {
    const internalPosts = (await getPublishedPosts()).map(p => ({ slug: p.slug, title: p.title }))

    const prompt = buildArticlePrompt({
      subject,
      type,
      focusKeyword: body?.focusKeyword?.trim() || undefined,
      category: body?.category?.trim() || undefined,
      internalPosts,
    })

    const article = await generateStructured<ArticleOutput>({
      prompt,
      schema: ARTICLE_SCHEMA as unknown as Record<string, unknown>,
      timeoutMs: 240_000,
      temperature: 0.8,
    })

    if (!article.title || !article.content_html) {
      return NextResponse.json({ error: 'ai_bad_response', detail: 'Missing title or content' }, { status: 502 })
    }

    // Post-process: strip stray AI-tell dashes, sanitize slug, suffix if taken
    let slug = sanitizeSlug(article.slug || article.title)
    if (!slug) slug = `post-${Date.now()}`
    if (await getPost(slug)) slug = `${slug}-${Math.floor(Date.now() / 1000) % 100000}`

    const post: BlogPost = {
      id: '',
      slug,
      title: stripAiTells(article.title).slice(0, 90),
      excerpt: stripAiTells(article.excerpt || ''),
      content: stripAiTells(article.content_html),
      contentFormat: 'html',
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      readTime: article.read_time || '8 min read',
      author: 'Orca 4K TV Editorial Team',
      authorRole: 'Streaming Experts',
      imageUrl: '',
      category: article.category || 'Guides',
      seoKeywords: article.seo_keywords || '',
      status: 'draft', // never auto-publish
      metaTitle: stripAiTells(article.meta_title || ''),
      metaDescription: stripAiTells(article.meta_description || ''),
      focusKeyword: article.focus_keyword || body?.focusKeyword || '',
      schemaType: type === 'news' ? 'NewsArticle' : 'BlogPosting',
    }

    await createPost(post)

    return NextResponse.json({ success: true, slug })
  } catch (err) {
    if (err instanceof AiError) {
      return NextResponse.json({ error: err.code, detail: err.message }, { status: err.status })
    }
    return NextResponse.json(
      { error: 'ai_request_failed', detail: err instanceof Error ? err.message : String(err) },
      { status: 502 }
    )
  }
}
