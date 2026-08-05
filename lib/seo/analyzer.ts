/**
 * Pure, dependency-free SEO analyzer shared by the blog editor and the
 * /admin/seo pages editor. No imports from app code — safe on client + server.
 */

export interface AnalyzeInput {
  title: string
  description: string
  slug?: string
  focusKeyword?: string
  contentHtml?: string
  hasCoverImage?: boolean
}

export interface SeoCheck {
  id: string
  label: string
  weight: number
  pass: boolean
  detail?: string
}

export interface SeoAnalysis {
  score: number // 0-100
  grade: 'good' | 'ok' | 'poor'
  checks: SeoCheck[]
}

const STOPWORDS = new Set([
  'a', 'an', 'the', 'and', 'or', 'but', 'of', 'in', 'on', 'at', 'to', 'for',
  'with', 'by', 'from', 'is', 'are', 'was', 'were', 'be', 'been', 'it', 'its',
  'this', 'that', 'these', 'those', 'as', 'your', 'you', 'we', 'our', 'us',
  'how', 'what', 'why', 'when', 'best', 'top',
])

function significantWords(phrase: string): string[] {
  return phrase
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, ' ')
    .split(/[\s-]+/)
    .filter(w => w.length > 1 && !STOPWORDS.has(w))
}

/**
 * Search-engine-like keyword match: exact contiguous phrase OR all significant
 * words present. Returns { pass, missing } where missing lists absent words.
 */
function keywordMatch(text: string, keyword: string): { pass: boolean; missing: string[] } {
  const haystack = text.toLowerCase()
  const needle = keyword.toLowerCase().trim()
  if (!needle) return { pass: false, missing: [] }
  if (haystack.includes(needle)) return { pass: true, missing: [] }
  const words = significantWords(needle)
  if (words.length === 0) return { pass: false, missing: [] }
  const missing = words.filter(w => !haystack.includes(w))
  return { pass: missing.length === 0, missing }
}

function stripHtml(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function countExactPhrase(text: string, phrase: string): number {
  const t = text.toLowerCase()
  const p = phrase.toLowerCase().trim()
  if (!p) return 0
  let count = 0
  let idx = t.indexOf(p)
  while (idx !== -1) {
    count++
    idx = t.indexOf(p, idx + p.length)
  }
  return count
}

export function analyzeSeo(input: AnalyzeInput): SeoAnalysis {
  const { title, description, slug, focusKeyword, contentHtml, hasCoverImage } = input
  const checks: SeoCheck[] = []
  const hasContent = typeof contentHtml === 'string' && contentHtml.trim().length > 0
  const text = hasContent ? stripHtml(contentHtml!) : ''
  const words = hasContent ? text.split(/\s+/).filter(Boolean) : []
  const kw = focusKeyword?.trim() || ''

  // ── Title & description ────────────────────────────────────
  checks.push({
    id: 'title_length',
    label: 'Title is 30-60 characters',
    weight: 10,
    pass: title.length >= 30 && title.length <= 60,
    detail: `${title.length} chars`,
  })
  checks.push({
    id: 'description_length',
    label: 'Description is 120-160 characters',
    weight: 10,
    pass: description.length >= 120 && description.length <= 160,
    detail: `${description.length} chars`,
  })

  // ── Keyword placement ──────────────────────────────────────
  if (kw) {
    const inTitle = keywordMatch(title, kw)
    checks.push({
      id: 'kw_title',
      label: 'Focus keyword in title',
      weight: 10,
      pass: inTitle.pass,
      detail: inTitle.missing.length ? `missing: ${inTitle.missing.join(', ')}` : undefined,
    })
    const inDesc = keywordMatch(description, kw)
    checks.push({
      id: 'kw_description',
      label: 'Focus keyword in description',
      weight: 8,
      pass: inDesc.pass,
      detail: inDesc.missing.length ? `missing: ${inDesc.missing.join(', ')}` : undefined,
    })
    if (slug !== undefined) {
      const inSlug = keywordMatch(slug.replace(/-/g, ' '), kw)
      checks.push({
        id: 'kw_slug',
        label: 'Focus keyword in slug',
        weight: 6,
        pass: inSlug.pass,
        detail: inSlug.missing.length ? `missing: ${inSlug.missing.join(', ')}` : undefined,
      })
    }
    if (hasContent) {
      const firstPara = text.slice(0, 600)
      const inFirst = keywordMatch(firstPara, kw)
      checks.push({
        id: 'kw_first_paragraph',
        label: 'Focus keyword in the first paragraph',
        weight: 6,
        pass: inFirst.pass,
        detail: inFirst.missing.length ? `missing: ${inFirst.missing.join(', ')}` : undefined,
      })
      const inContent = keywordMatch(text, kw)
      checks.push({
        id: 'kw_content',
        label: 'Focus keyword in content',
        weight: 6,
        pass: inContent.pass,
        detail: inContent.missing.length ? `missing: ${inContent.missing.join(', ')}` : undefined,
      })
      const phraseCount = countExactPhrase(text, kw)
      const density = words.length > 0 ? (phraseCount * significantWords(kw).length * 100) / words.length : 0
      checks.push({
        id: 'kw_density',
        label: 'Keyword density 0.5-2.5%',
        weight: 5,
        pass: density >= 0.5 && density <= 2.5,
        detail: `${density.toFixed(2)}% (${phraseCount}× exact phrase)`,
      })
    }
  }

  // ── Content checks (skipped when no content: marketing pages) ─
  if (hasContent) {
    checks.push({
      id: 'word_count',
      label: 'At least 600 words',
      weight: 10,
      pass: words.length >= 600,
      detail: `${words.length} words`,
    })

    const h1Count = (contentHtml!.match(/<h1[\s>]/gi) || []).length
    checks.push({
      id: 'single_h1',
      label: 'No extra H1 in the body',
      weight: 6,
      pass: h1Count === 0,
      detail: h1Count > 0 ? `${h1Count} H1 tag(s) in content` : undefined,
    })

    // Heading order without jumps (h2 -> h3 -> h4, never skipping down levels)
    const headingLevels = Array.from(contentHtml!.matchAll(/<h([1-6])[\s>]/gi)).map(m => Number(m[1]))
    let orderOk = true
    for (let i = 1; i < headingLevels.length; i++) {
      if (headingLevels[i] > headingLevels[i - 1] + 1) { orderOk = false; break }
    }
    checks.push({
      id: 'heading_order',
      label: 'Heading levels descend without jumps',
      weight: 5,
      pass: orderOk,
    })

    // Image alt coverage — a cover image outside the content counts when the body has no images
    const imgs = Array.from(contentHtml!.matchAll(/<img[^>]*>/gi)).map(m => m[0])
    if (imgs.length === 0) {
      checks.push({
        id: 'image_alt',
        label: 'Images have alt text',
        weight: 5,
        pass: !!hasCoverImage,
        detail: hasCoverImage ? 'cover image counts' : 'no images at all',
      })
    } else {
      const missingAlt = imgs.filter(tag => !/alt\s*=\s*"[^"]+"/i.test(tag) && !/alt\s*=\s*'[^']+'/i.test(tag))
      checks.push({
        id: 'image_alt',
        label: 'Images have alt text',
        weight: 5,
        pass: missingAlt.length === 0,
        detail: missingAlt.length ? `${missingAlt.length}/${imgs.length} missing alt` : `${imgs.length} image(s) ok`,
      })
    }

    const links = Array.from(contentHtml!.matchAll(/<a[^>]+href\s*=\s*["']([^"']+)["']/gi)).map(m => m[1])
    const internal = links.filter(h => h.startsWith('/') || h.includes('orca4ktv.com'))
    const external = links.filter(h => /^https?:\/\//.test(h) && !h.includes('orca4ktv.com'))
    checks.push({
      id: 'internal_links',
      label: 'At least 1 internal link',
      weight: 5,
      pass: internal.length >= 1,
      detail: `${internal.length} internal`,
    })
    checks.push({
      id: 'external_links',
      label: 'At least 1 external link',
      weight: 4,
      pass: external.length >= 1,
      detail: `${external.length} external`,
    })
  }

  // ── Score (weights renormalized over the checks that ran) ───
  const totalWeight = checks.reduce((sum, c) => sum + c.weight, 0)
  const earned = checks.reduce((sum, c) => sum + (c.pass ? c.weight : 0), 0)
  const score = totalWeight > 0 ? Math.round((earned / totalWeight) * 100) : 0
  const grade: SeoAnalysis['grade'] = score >= 80 ? 'good' : score >= 50 ? 'ok' : 'poor'

  return { score, grade, checks }
}
