import { NextRequest, NextResponse } from 'next/server'
import { requireAdmin } from '@/lib/admin/auth'
import { generateStructured, stripAiTells, AiError, BRAND_FACTS } from '@/lib/ai/gemini'
import { BLOCK_TEMPLATES } from '@/lib/ai/blog-prompts'

export const maxDuration = 90

const TASKS = ['fix-score', 'keywords', 'improve', 'faqs', 'image-alts'] as const
type Task = (typeof TASKS)[number]

export async function POST(request: NextRequest) {
  const denied = requireAdmin(request)
  if (denied) return denied

  const body = await request.json()
  const task = String(body?.task || '') as Task
  if (!TASKS.includes(task)) {
    return NextResponse.json({ error: 'bad_request', detail: 'invalid task' }, { status: 400 })
  }

  const context = `
${BRAND_FACTS}

CURRENT PAGE DATA:
- Title: ${body?.title || '(empty)'}
- Meta description: ${body?.description || '(empty)'}
- Slug: ${body?.slug || '(empty)'}
- Focus keyword: ${body?.focusKeyword || '(none set)'}
- Failing SEO checks: ${(body?.failingChecks || []).join('; ') || '(none)'}

RULES: no em dashes or en dashes anywhere; natural, human tone; contractions allowed.
`.trim()

  const contentSnippet = String(body?.contentHtml || '').slice(0, 30000)

  try {
    if (task === 'fix-score') {
      const out = await generateStructured<{ metaTitle: string; metaDescription: string }>({
        prompt: `${context}\n\nTASK: Rewrite the meta title (30-60 chars) and meta description (120-160 chars) to fix the failing checks. The focus keyword phrase must appear verbatim in both.\n\nReturn JSON {metaTitle, metaDescription}.`,
        schema: {
          type: 'object',
          properties: { metaTitle: { type: 'string' }, metaDescription: { type: 'string' } },
          required: ['metaTitle', 'metaDescription'],
        },
        timeoutMs: 60_000,
      })
      return NextResponse.json({
        metaTitle: stripAiTells(out.metaTitle),
        metaDescription: stripAiTells(out.metaDescription),
      })
    }

    if (task === 'keywords') {
      const out = await generateStructured<{ keywords: { keyword: string; intent: string; rationale: string }[] }>({
        prompt: `${context}\n\nCONTENT (excerpt): ${contentSnippet.slice(0, 4000)}\n\nTASK: Suggest 6 ranked focus-keyword candidates for this page. For each give the search intent (informational | commercial | transactional | navigational) and a one-sentence rationale.\n\nReturn JSON {keywords: [{keyword, intent, rationale}]}.`,
        schema: {
          type: 'object',
          properties: {
            keywords: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  keyword: { type: 'string' },
                  intent: { type: 'string' },
                  rationale: { type: 'string' },
                },
                required: ['keyword', 'intent', 'rationale'],
              },
            },
          },
          required: ['keywords'],
        },
        timeoutMs: 60_000,
      })
      return NextResponse.json({ keywords: (out.keywords || []).slice(0, 6) })
    }

    if (task === 'improve') {
      const out = await generateStructured<{ tips: string[] }>({
        prompt: `${context}\n\nCONTENT: ${contentSnippet}\n\nTASK: Give exactly 5 concrete, page-specific improvement tips: missing subtopics to add, H2s to insert, internal link placements, sections to expand. Each tip is one actionable sentence referencing actual content on the page.\n\nReturn JSON {tips: [5 strings]}.`,
        schema: {
          type: 'object',
          properties: { tips: { type: 'array', items: { type: 'string' } } },
          required: ['tips'],
        },
        timeoutMs: 60_000,
      })
      return NextResponse.json({ tips: (out.tips || []).slice(0, 5).map(stripAiTells) })
    }

    if (task === 'faqs') {
      const out = await generateStructured<{ faqs: { q: string; a: string }[] }>({
        prompt: `${context}\n\nCONTENT (excerpt): ${contentSnippet.slice(0, 8000)}\n\nTASK: Write 5 FAQ question/answer pairs for this page (answers 30-60 words, plain text, no HTML). They feed FAQPage schema, so make questions match real search queries.\n\nReturn JSON {faqs: [{q, a}]}.`,
        schema: {
          type: 'object',
          properties: {
            faqs: {
              type: 'array',
              items: {
                type: 'object',
                properties: { q: { type: 'string' }, a: { type: 'string' } },
                required: ['q', 'a'],
              },
            },
          },
          required: ['faqs'],
        },
        timeoutMs: 60_000,
      })
      const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      const faqsHtml = (out.faqs || [])
        .slice(0, 5)
        .map(f => {
          const q = stripAiTells(f.q)
          const a = stripAiTells(f.a)
          return `<div data-faq-block="" question="${esc(q)}" answer="${esc(a)}" style="background:#001a36;border:1px solid rgba(255,255,255,0.08);border-radius:.75rem;overflow:hidden;margin-bottom:.75rem"><div data-faq-toggle="" style="padding:1rem 1.25rem;cursor:pointer;font-weight:700;color:#fff;display:flex;justify-content:space-between;align-items:center;gap:1rem"><span>${esc(q)}</span><span data-faq-icon="" style="color:#ef4444;font-size:1.4rem;flex-shrink:0;line-height:1">+</span></div><div data-faq-body="" style="display:none;padding:0 1.25rem 1.25rem;color:#9ca3af;line-height:1.75"><p style="color:#9ca3af;margin:0">${esc(a)}</p></div></div>`
        })
        .join('')
      return NextResponse.json({ faqsHtml })
    }

    // image-alts
    const imgs = Array.from(contentSnippet.matchAll(/<img[^>]*>/gi)).map(m => m[0])
    const missing = imgs.filter(t => !/alt\s*=\s*["'][^"']+["']/i.test(t))
    if (missing.length === 0) return NextResponse.json({ contentHtml: body?.contentHtml || '' })

    const srcs = missing
      .map(t => t.match(/src\s*=\s*["']([^"']+)["']/i)?.[1])
      .filter(Boolean) as string[]

    const out = await generateStructured<{ alts: { src: string; alt: string }[] }>({
      prompt: `${context}\n\nTASK: Write alt text (max 110 characters each) for these images on the page. Include the focus keyword in AT MOST one alt. Describe what the image most likely shows given the page topic.\n\nImage srcs:\n${srcs.map(s => `- ${s}`).join('\n')}\n\nReturn JSON {alts: [{src, alt}]}.`,
      schema: {
        type: 'object',
        properties: {
          alts: {
            type: 'array',
            items: {
              type: 'object',
              properties: { src: { type: 'string' }, alt: { type: 'string' } },
              required: ['src', 'alt'],
            },
          },
        },
        required: ['alts'],
      },
      timeoutMs: 60_000,
    })

    let html = String(body?.contentHtml || '')
    for (const { src, alt } of out.alts || []) {
      const cleanAlt = stripAiTells(alt).slice(0, 110).replace(/"/g, '&quot;')
      html = html.replace(new RegExp(`(<img[^>]*src\\s*=\\s*["']${src.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'])((?![^>]*alt=)[^>]*>)`, 'i'), `$1 alt="${cleanAlt}"$2`)
    }
    return NextResponse.json({ contentHtml: html })
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
