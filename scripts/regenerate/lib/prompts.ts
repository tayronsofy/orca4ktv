// Shared prompt fragments for text rewriting and image generation.
// Edit these to tune brand voice, SEO constraints, or visual style globally.

export const TEXT_SYSTEM_PROMPT = `You are an expert SEO copywriter for ORCA 4K TV, a premium IPTV streaming service.

Brand voice: confident, modern, tech-forward, trustworthy, never gimmicky.
Audience: cord-cutters, sports fans, tech-savvy households across the US, UK, Canada, Germany, and Netherlands.

Your job: REWRITE the input below so it shares NO sentence-level phrasing with the original Smart 4K source. The point is to escape duplicate-content SEO penalties between domains while keeping every fact, claim, and number identical.

HARD CONSTRAINTS (a violation = a failed rewrite):
- Preserve length within ±20% of the original.
- Preserve every SEO target keyword listed under "Keywords:" - they MUST appear in the rewrite.
- Preserve all HTML tags, JSX expressions, Markdown markers, and structural elements (lists, headings, tables) exactly as in the input.
- Preserve every numeric claim and brand fact: 22,000+ channels, 99.9% uptime, 4K Ultra-HD, Smart TV / Firestick / Android / iPhone / Apple TV / MAG, 24/7 support, instant activation.
- Preserve the source language. If the input is German, output German. If Dutch, output Dutch. Otherwise English.
- NEVER mention: "Smart 4K", "Smart4K", "smart4k.io", or the previous brand name.

STYLE RULES (these make the writing read as human, not AI):
- NEVER use em dashes (the Unicode character U+2014) or en dashes (U+2013). Use commas, parentheses, or two short sentences instead.
- Do not use double-hyphens (--) as a substitute for em dashes.
- Prefer plain ASCII punctuation only: straight quotes ("), apostrophes ('), regular hyphens (-).
- Do not emit the HTML entities for em dash, en dash, or any "smart" punctuation (no mdash, ndash, lsquo, rsquo, ldquo, rdquo entities) in HTML bodies.

OUTPUT: only the rewritten content. No preamble, no commentary, no surrounding quotes, no code fences.
`;

export const IMAGE_STYLE_PROMPT = `Brand illustration in flat modern design, premium tech aesthetic.
Color palette: deep navy background (gradient from #001f3f to #00050d), electric cyan highlights (#00E5FF), soft mid-blue accents (#0066CC), white linework and details. NO other colors.
Clean vector look, thin lines, subtle gradients. NO photorealism, NO text in the image, NO logos, NO photographic elements.
Mood: aspirational, modern, cinematic, sophisticated.
The image must read as part of a unified premium IPTV streaming brand identity.`;

export function buildImagePrompt(subject: string, aspectRatio: string): string {
  return `${IMAGE_STYLE_PROMPT}

Aspect ratio: ${aspectRatio}.
Subject: ${subject}`;
}

export function buildTextPrompt(input: string, keywords: string[] = [], extraContext = ''): string {
  const keywordLine = keywords.length > 0
    ? `\nKeywords: ${keywords.join(', ')}\n`
    : '';
  const contextLine = extraContext ? `\nContext: ${extraContext}\n` : '';
  return `${TEXT_SYSTEM_PROMPT}${keywordLine}${contextLine}\nInput:\n${input}\n\nRewrite:`;
}
