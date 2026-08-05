import { notFound, redirect, permanentRedirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

/**
 * Root catch-all: only unmatched URLs land here (every real route wins).
 * This is the ONLY place admin-managed seo_redirects execute — live pages
 * never pay for redirect lookups. One hop max; 410 (or no hit) renders 404.
 */

export const dynamic = 'force-dynamic'

async function lookupRedirect(pathname: string) {
  try {
    const anon = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { auth: { persistSession: false } }
    )
    const { data } = await anon
      .from('seo_redirects')
      .select('to_path, status_code')
      .eq('from_path', pathname)
      .eq('enabled', true)
      .maybeSingle()
    return data
  } catch {
    return null
  }
}

export default async function CatchAllPage({ params }: { params: Promise<{ notFound: string[] }> }) {
  const { notFound: segments } = await params
  const pathname = `/${(segments || []).join('/')}`.toLowerCase()

  const hit = await lookupRedirect(pathname)
  if (hit && hit.status_code !== 410 && hit.to_path) {
    if (hit.status_code === 301) permanentRedirect(hit.to_path)
    redirect(hit.to_path)
  }

  notFound()
}
