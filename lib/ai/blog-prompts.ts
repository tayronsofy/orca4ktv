import 'server-only'
import { BRAND_FACTS } from './gemini'

/**
 * Prompt builders for the AI article writer. The block templates below MUST
 * match the serialized output of components/admin/extensions/* exactly —
 * generation and editing round-trip these shapes (attributes carry the data
 * the Tiptap node views read back).
 */

export type ArticleType = 'how-to' | 'listicle' | 'comparison' | 'review' | 'roundup' | 'news'

export const ARTICLE_TYPES: Record<
  ArticleType,
  { label: string; description: string; words: string; structure: string }
> = {
  'how-to': {
    label: 'How-To Guide',
    description: 'Step-by-step tutorial that walks the reader through a task',
    words: '2000-2500 words',
    structure:
      'Intro (the problem, who this is for), what you need, an ORDERED LIST (<ol>) with AT LEAST 7 numbered steps each with its own <h3>, troubleshooting section, FAQ section with 3-4 faq blocks, closing paragraph with a cta box.',
  },
  listicle: {
    label: 'Listicle',
    description: 'Numbered list article ("7 best ways to…")',
    words: '1500-2200 words',
    structure:
      'Intro, one <h2> per list item (numbered in the heading), each item 120-200 words with concrete details, a feature list block summarizing picks, FAQ section with 3 faq blocks, closing with a cta button.',
  },
  comparison: {
    label: 'Comparison',
    description: 'X vs Y breakdown with a verdict',
    words: '1800-2400 words',
    structure:
      'Intro framing the choice, side-by-side criteria sections (<h2> per criterion), one pros/cons block per contender, a verdict section, FAQ with 3 faq blocks, cta box.',
  },
  review: {
    label: 'Review',
    description: 'In-depth single product/service review',
    words: '1800-2400 words',
    structure:
      'Intro with the one-line verdict, key specs feature list block, experience sections (<h2>: setup, performance, content, support), one pros/cons block, who it is for, FAQ with 3 faq blocks, cta box.',
  },
  roundup: {
    label: 'Roundup',
    description: 'Curated collection with mini-reviews',
    words: '1800-2500 words',
    structure:
      'Intro with selection criteria, one <h2> per pick with a 150-250 word mini-review, a callout with the top pick, comparison feature list, FAQ with 3 faq blocks, cta button.',
  },
  news: {
    label: 'News',
    description: 'Timely announcement or industry development',
    words: '800-1500 words',
    structure:
      'Lede paragraph with the key fact, context sections (<h2>), what it means for viewers, NO pros/cons block, optional 2 faq blocks, short closing. No summary ending.',
  },
}

/** Exact custom-block templates (must match components/admin/extensions/* serialization). */
export const BLOCK_TEMPLATES = `
CUSTOM BLOCKS - use these EXACT structures (attributes AND children must both be present):

1. Callout (tip | warning | info):
<div data-callout="tip" variant="tip" title="Pro Tip" body="BODY TEXT" style="background:rgba(34,197,94,.08);border-left:4px solid #22c55e;border-radius:.5rem;padding:1rem 1.25rem;margin:1.25rem 0"><p style="color:#86efac;font-weight:700;margin:0 0 .25rem">💡 Pro Tip</p><p style="color:#d1d5db;margin:0">BODY TEXT</p></div>

2. Feature list (checkmarks; items attribute = newline-separated):
<ul data-feature-list="" items="Item one&#10;Item two&#10;Item three" style="list-style:none;padding:0;margin:1.25rem 0"><li style="color:#d1d5db;padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:.75rem"><span style="color:#22c55e;font-weight:900;flex-shrink:0">✓</span>Item one</li><li style="color:#d1d5db;padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:.75rem"><span style="color:#22c55e;font-weight:900;flex-shrink:0">✓</span>Item two</li><li style="color:#d1d5db;padding:.5rem 0;border-bottom:1px solid rgba(255,255,255,.05);display:flex;align-items:center;gap:.75rem"><span style="color:#22c55e;font-weight:900;flex-shrink:0">✓</span>Item three</li></ul>

3. Pros/Cons (pros and cons attributes = newline-separated):
<div data-pros-cons="" pros="Pro one&#10;Pro two" cons="Con one&#10;Con two" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin:1.5rem 0"><div style="background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:.75rem;padding:1.25rem"><h4 style="color:#22c55e;font-weight:800;margin:0 0 .75rem">✅ Pros</h4><ul style="color:#d1d5db;padding-left:1.25rem;margin:0"><li style="color:#d1d5db;margin-bottom:.35rem">Pro one</li><li style="color:#d1d5db;margin-bottom:.35rem">Pro two</li></ul></div><div style="background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);border-radius:.75rem;padding:1.25rem"><h4 style="color:#ef4444;font-weight:800;margin:0 0 .75rem">❌ Cons</h4><ul style="color:#d1d5db;padding-left:1.25rem;margin:0"><li style="color:#d1d5db;margin-bottom:.35rem">Con one</li><li style="color:#d1d5db;margin-bottom:.35rem">Con two</li></ul></div></div>

4. FAQ toggle (question/answer attributes; one block per Q&A):
<div data-faq-block="" question="QUESTION?" answer="ANSWER." style="background:#001a36;border:1px solid rgba(255,255,255,0.08);border-radius:.75rem;overflow:hidden;margin-bottom:.75rem"><div data-faq-toggle="" style="padding:1rem 1.25rem;cursor:pointer;font-weight:700;color:#fff;display:flex;justify-content:space-between;align-items:center;gap:1rem"><span>QUESTION?</span><span data-faq-icon="" style="color:#ef4444;font-size:1.4rem;flex-shrink:0;line-height:1">+</span></div><div data-faq-body="" style="display:none;padding:0 1.25rem 1.25rem;color:#9ca3af;line-height:1.75"><p style="color:#9ca3af;margin:0">ANSWER.</p></div></div>

5. CTA box:
<div data-cta-box="" headline="HEADLINE" subtext="SUBTEXT" buttonText="Start Free Trial" buttonUrl="https://orca4ktv.com/trial" style="background:linear-gradient(135deg,#001a36,#000a1c);border:1px solid rgba(239,68,68,.3);border-radius:1rem;padding:2rem;text-align:center;margin:1.5rem 0"><h3 style="color:#fff;font-size:1.5rem;font-weight:900;margin:0 0 .75rem">HEADLINE</h3><p style="color:#9ca3af;margin:0 0 1.25rem">SUBTEXT</p><a href="https://orca4ktv.com/trial" style="display:inline-block;background:#dc2626;color:#fff;font-weight:800;font-size:.875rem;padding:.75rem 1.75rem;border-radius:.75rem;text-decoration:none;letter-spacing:.05em;text-transform:uppercase">Start Free Trial</a></div>

6. CTA button:
<p data-cta-btn="" text="BUTTON LABEL" url="https://orca4ktv.com/trial" variant="red" style="margin:1rem 0"><a href="https://orca4ktv.com/trial" style="display:inline-block;font-weight:800;font-size:.875rem;padding:.75rem 1.75rem;border-radius:.75rem;text-decoration:none;letter-spacing:.05em;text-transform:uppercase;background:#dc2626;color:#fff">BUTTON LABEL</a></p>
`.trim()

export const WRITING_RULES = `
STRICT WRITING RULES:
- ONLY these HTML elements: <h2> <h3> <p> <ul> <ol> <li> <strong> <em> <a> plus the exact custom block templates above. NO <h1>, NO <img>, NO <table>, NO <br>.
- Output content_html as a SINGLE LINE of HTML (no literal newlines inside the JSON string except the &#10; entities inside block attributes).
- ZERO em dashes and ZERO en dashes anywhere. Use commas, periods, or the word "and" instead. This is non-negotiable.
- BANNED words/phrases (never use): delve, moreover, furthermore, in conclusion, seamless, seamlessly, robust, leverage, utilize, elevate, unlock, game-changer, cutting-edge, top-notch, "in today's digital world", "when it comes to", "that being said", "not only", "but also", "look no further", "dive in", "landscape", "realm", "testament".
- Use contractions (you'll, it's, don't) and second person ("you"). Vary sentence length: some short. Some longer ones that carry detail. Never end the article with a summary paragraph that restarts "In summary" or similar.
- 2-3 real external links to authoritative non-competitor sites (Wikipedia, device manufacturer docs, speedtest.net, official league sites). Use real URLs only.
- 2-3 internal links chosen from the provided list of published posts, linked naturally in body text as <a href="/blog/SLUG">anchor text</a>.
- Keyword density for the focus keyword at most 1.5% of total words.
- The exact focus keyword phrase must appear VERBATIM in the excerpt, meta_title, and meta_description.
- E-E-A-T: include concrete specifics (device names, settings paths, realistic numbers from the brand facts), first-hand phrasing ("we tested", "in our setup"), and honest caveats.
`.trim()

export function buildArticlePrompt(opts: {
  subject: string
  type: ArticleType
  focusKeyword?: string
  category?: string
  internalPosts: { slug: string; title: string }[]
}): string {
  const typeCfg = ARTICLE_TYPES[opts.type]
  const internalList = opts.internalPosts
    .slice(0, 30)
    .map(p => `- /blog/${p.slug} ("${p.title}")`)
    .join('\n')

  return `You are the senior content writer for ORCA 4K TV. Write a ${typeCfg.label} blog article.

${BRAND_FACTS}

SUBJECT: ${opts.subject}
ARTICLE TYPE: ${typeCfg.label} (${typeCfg.description})
TARGET LENGTH: ${typeCfg.words}
${opts.focusKeyword ? `FOCUS KEYWORD: "${opts.focusKeyword}" (use the exact phrase verbatim in excerpt, meta_title, meta_description; density in body <= 1.5%)` : 'FOCUS KEYWORD: choose the best one for the subject and return it as focus_keyword.'}
${opts.category ? `CATEGORY: ${opts.category}` : 'CATEGORY: pick the best fit from: Tutorials, Guides, News, Reviews, Tips & Tricks, Sports, Setup.'}

REQUIRED STRUCTURE: ${typeCfg.structure}

${BLOCK_TEMPLATES}

${WRITING_RULES}

PUBLISHED POSTS for internal links (pick 2-3 relevant ones):
${internalList || '(none available - skip internal links)'}

Return JSON with:
- title: <= 55 characters, compelling, no clickbait colons overload
- slug: lowercase-hyphenated, from the title
- excerpt: 120-130 characters, contains the exact focus keyword
- category: one of the allowed categories
- seo_keywords: comma-separated, 6-10 keywords
- focus_keyword: the exact focus keyword phrase
- meta_title: 30-60 chars, contains the exact focus keyword
- meta_description: 120-160 chars, contains the exact focus keyword
- read_time: like "8 min read" (estimate from length)
- content_html: the full article body as single-line HTML following every rule above`
}

export const ARTICLE_SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    slug: { type: 'string' },
    excerpt: { type: 'string' },
    category: { type: 'string' },
    seo_keywords: { type: 'string' },
    focus_keyword: { type: 'string' },
    meta_title: { type: 'string' },
    meta_description: { type: 'string' },
    read_time: { type: 'string' },
    content_html: { type: 'string' },
  },
  required: [
    'title', 'slug', 'excerpt', 'category', 'seo_keywords',
    'focus_keyword', 'meta_title', 'meta_description', 'read_time', 'content_html',
  ],
} as const

export function buildImagePrompt(title: string): string {
  return `Editorial blog header image for an article titled "${title}" on a premium IPTV streaming service website. Dark navy blue (#001f3f) cinematic scene with subtle cyan (#00E5FF) accent lighting, a modern living room or abstract streaming/technology composition, sleek 4K TV screen glow, no text, no words, no letters, no logos, no people's faces. Moody, high-end, photorealistic with soft depth of field. 16:9 wide composition.`
}
