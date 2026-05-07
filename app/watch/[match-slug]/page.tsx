import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Trophy } from 'lucide-react'
import matchesData from '@/data/matches.json'
import type { Fixture } from '@/lib/sports-api'
import {
  getMatchState, buildEventSchema, buildVideoObjectSchema,
  generateMetaTitle, generateMetaDescription, formatKickoff,
} from '@/lib/match-utils'
import MatchHero from '@/components/match/MatchHero'
import TrustChecklist from '@/components/match/TrustChecklist'
import FloatingCTA from '@/components/match/FloatingCTA'

// ─── Static generation ────────────────────────────────────────────────────────

export async function generateStaticParams() {
  const matches = matchesData.matches as Fixture[]
  return matches.map(m => ({ 'match-slug': m.slug }))
}

// Revalidate every hour so scores + state stay fresh without full rebuild
export const revalidate = 3600

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ 'match-slug': string }>
}): Promise<Metadata> {
  const { 'match-slug': slug } = await params
  const match = (matchesData.matches as Fixture[]).find(m => m.slug === slug)
  if (!match) return {}

  const title = generateMetaTitle(match)
  const description = generateMetaDescription(match)
  const ogImage = `/watch/${slug}/opengraph-image`

  return {
    title,
    description,
    keywords: match.tags?.join(', ') ?? '',
    alternates: { canonical: `https://orca4ktv.com/watch/${slug}` },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://orca4ktv.com/watch/${slug}`,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function MatchPage({
  params,
}: {
  params: Promise<{ 'match-slug': string }>
}) {
  const { 'match-slug': slug } = await params
  const match = (matchesData.matches as Fixture[]).find(m => m.slug === slug)
  if (!match) notFound()

  const state = getMatchState(match.kickoff, match.status)

  const schema = [
    buildEventSchema(match),
    buildVideoObjectSchema(match),
  ]

  return (
    <>
      {/* ── JSON-LD schemas ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="min-h-screen bg-[#000a1c]" style={{ paddingTop: '80px' }}>

        {/* ── State-aware hero ── */}
        <MatchHero match={match} state={state} />

        {/* ── Match details strip ── */}
        <section className="border-y border-white/6 bg-[#111]">
          <div className="max-w-4xl mx-auto px-4 py-5 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-600" />
              <span>{formatKickoff(match.kickoff, { month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short' })}</span>
            </div>
            {match.venue && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-600" />
                <span>{match.venue}, {match.city}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-gray-600" />
              <span>{match.league} - {match.round}</span>
            </div>
          </div>
        </section>

        {/* ── H1 + SEO description ── */}
        <section className="max-w-4xl mx-auto px-4 py-12">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
            Watch {match.homeTeam} vs {match.awayTeam} Live in 4K
          </h1>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
            {match.description ?? generateMetaDescription(match)}
          </p>
        </section>

        {/* ── Trust checklist ── */}
        <TrustChecklist />

        {/* ── Floating / desktop CTA ── */}
        <FloatingCTA matchSlug={slug} state={state} />

        {/* ── Related matches (same league, different slug) ── */}
        <RelatedMatches current={match} all={matchesData.matches as Fixture[]} />

        {/* ── Footer padding ── */}
        <div className="h-8" />
      </div>
    </>
  )
}

// ─── Related matches ──────────────────────────────────────────────────────────

function RelatedMatches({ current, all }: { current: Fixture; all: Fixture[] }) {
  const related = all
    .filter(m =>
      m.slug !== current.slug &&
      m.leagueId === current.leagueId &&
      getMatchState(m.kickoff, m.status) === 'pre'
    )
    .slice(0, 4)

  if (!related.length) return null

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h2 className="text-lg font-black text-white mb-5">
        More {current.league} Fixtures
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {related.map(m => (
          <Link
            key={m.slug}
            href={`/watch/${m.slug}`}
            className="flex items-center justify-between gap-4 bg-[#111] border border-white/6 hover:border-white/15 rounded-xl px-5 py-4 transition-colors group"
          >
            <div className="flex items-center gap-3 min-w-0">
              {m.homeLogo && <Image src={m.homeLogo} alt={m.homeTeam} className="w-7 h-7 object-contain flex-shrink-0" width={28} height={28} />}
              <span className="text-white text-sm font-bold truncate">{m.homeTeam}</span>
              <span className="text-gray-600 text-xs font-bold">vs</span>
              <span className="text-white text-sm font-bold truncate">{m.awayTeam}</span>
              {m.awayLogo && <Image src={m.awayLogo} alt={m.awayTeam} className="w-7 h-7 object-contain flex-shrink-0" width={28} height={28} />}
            </div>
            <span className="text-gray-600 text-xs whitespace-nowrap group-hover:text-gray-400 transition-colors">
              {new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(new Date(m.kickoff))}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
