import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { unstable_cache } from 'next/cache'
import type { SeoMeta, SeoSettings } from '@/types/database'

/**
 * Public-side SEO override resolution.
 *
 * MUST stay cookie-free: reads use a plain anon supabase-js client wrapped in
 * unstable_cache with the 'seo' tag. Admin saves call revalidateTag('seo') so
 * edits go live on the next request while pages stay static. Every read is
 * try/catch → null so the site builds and renders even without the tables.
 */

const anon = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  { auth: { persistSession: false } }
)

export const getSeoMeta = unstable_cache(
  async (pageKey: string): Promise<SeoMeta | null> => {
    try {
      const { data } = await anon.from('seo_meta').select('*').eq('page_key', pageKey).maybeSingle()
      return (data as SeoMeta) || null
    } catch {
      return null
    }
  },
  ['seo-meta'],
  { tags: ['seo'] }
)

export const getSeoSettings = unstable_cache(
  async (): Promise<SeoSettings | null> => {
    try {
      const { data } = await anon.from('seo_settings').select('*').eq('id', 1).maybeSingle()
      return (data as SeoSettings) || null
    } catch {
      return null
    }
  },
  ['seo-settings'],
  { tags: ['seo'] }
)

export interface CodeDefaults {
  title: string
  description: string
  keywords?: string
  canonical?: string
  ogImage?: string
}

/**
 * Build the full Next.js Metadata for a marketing page:
 * every null DB column falls back to the hardcoded value in code.
 * Emits COMPLETE openGraph/twitter objects (Next merges metadata shallowly).
 * Canonical is omitted entirely when noindexed.
 */
export async function buildPageMetadata(pageKey: string, defaults: CodeDefaults): Promise<Metadata> {
  const [meta, settings] = await Promise.all([getSeoMeta(pageKey), getSeoSettings()])

  const rawTitle = meta?.meta_title || defaults.title
  const title = settings?.title_template && meta?.meta_title
    ? settings.title_template.replace('%s', meta.meta_title)
    : rawTitle
  const description = meta?.meta_description || defaults.description
  const canonical = meta?.canonical_url || defaults.canonical
  const noindex = meta?.noindex === true
  const nofollow = meta?.nofollow === true

  const ogTitle = meta?.og_title || title
  const ogDescription = meta?.og_description || description
  const ogImage = meta?.og_image_url || defaults.ogImage || settings?.default_og_image || 'https://orca4ktv.com/og-image.jpg'
  const twitterTitle = meta?.twitter_title || ogTitle
  const twitterDescription = meta?.twitter_description || ogDescription
  const twitterImage = meta?.twitter_image_url || ogImage

  const result: Metadata = {
    title,
    description,
    ...(defaults.keywords ? { keywords: defaults.keywords } : {}),
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      type: 'website',
      ...(canonical && !noindex ? { url: canonical } : {}),
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: twitterTitle,
      description: twitterDescription,
      images: [twitterImage],
    },
  }

  if (noindex || nofollow) {
    result.robots = { index: !noindex, follow: !nofollow }
  }
  // canonical/alternates omitted entirely when noindexed
  if (canonical && !noindex) {
    result.alternates = { canonical }
  }

  const verification: Record<string, string> = {}
  if (settings?.google_verification) verification.google = settings.google_verification
  if (settings?.bing_verification) verification['msvalidate.01'] = settings.bing_verification
  if (Object.keys(verification).length) {
    result.verification = {
      google: verification.google,
      other: verification['msvalidate.01'] ? { 'msvalidate.01': verification['msvalidate.01'] } : undefined,
    }
  }

  return result
}
