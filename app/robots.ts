import type { MetadataRoute } from 'next'
import { getSeoSettings } from '@/lib/seo/metadata'

const BASE_RULES: MetadataRoute.Robots['rules'] = [
  { userAgent: '*', allow: '/', disallow: ['/api/', '/admin/', '/dashboard/'] },
  { userAgent: 'GPTBot', allow: '/' },
  { userAgent: 'OAI-SearchBot', allow: '/' },
  { userAgent: 'ChatGPT-User', allow: '/' },
  { userAgent: 'Google-Extended', allow: '/' },
  { userAgent: 'CCBot', allow: '/' },
  { userAgent: 'Bytespider', allow: '/' },
  { userAgent: 'Amazonbot', allow: '/' },
  { userAgent: 'Applebot', allow: '/' },
  { userAgent: 'Applebot-Extended', allow: '/' },
  { userAgent: 'PerplexityBot', allow: '/' },
  { userAgent: 'Perplexity-User', allow: '/' },
  { userAgent: 'ClaudeBot', allow: '/' },
  { userAgent: 'Claude-Web', allow: '/' },
  { userAgent: 'anthropic-ai', allow: '/' },
  { userAgent: 'cohere-ai', allow: '/' },
  { userAgent: 'YouBot', allow: '/' },
  { userAgent: 'DuckAssistBot', allow: '/' },
  { userAgent: 'MistralAI-User', allow: '/' },
  { userAgent: 'meta-externalagent', allow: '/' },
]

/** Parse admin-entered robots lines (User-agent / Allow / Disallow blocks) into rules. */
function parseExtraRules(raw: string): { userAgent: string; allow?: string[]; disallow?: string[] }[] {
  const rules: { userAgent: string; allow: string[]; disallow: string[] }[] = []
  let current: { userAgent: string; allow: string[]; disallow: string[] } | null = null
  for (const line of raw.split('\n')) {
    const [keyRaw, ...rest] = line.split(':')
    const key = keyRaw?.trim().toLowerCase()
    const value = rest.join(':').trim()
    if (!key || !value) continue
    if (key === 'user-agent') {
      current = { userAgent: value, allow: [], disallow: [] }
      rules.push(current)
    } else if (key === 'allow' && current) {
      current.allow.push(value)
    } else if (key === 'disallow' && current) {
      current.disallow.push(value)
    }
  }
  return rules
    .filter(r => r.allow.length || r.disallow.length)
    .map(r => ({
      userAgent: r.userAgent,
      ...(r.allow.length ? { allow: r.allow } : {}),
      ...(r.disallow.length ? { disallow: r.disallow } : {}),
    }))
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  let extraRules: ReturnType<typeof parseExtraRules> = []
  try {
    const settings = await getSeoSettings()
    if (settings?.robots_extra_lines) {
      extraRules = parseExtraRules(settings.robots_extra_lines)
    }
  } catch {
    // static fallback: base rules only
  }

  return {
    rules: [...(BASE_RULES as { userAgent: string }[]), ...extraRules],
    sitemap: 'https://orca4ktv.com/sitemap.xml',
  }
}
