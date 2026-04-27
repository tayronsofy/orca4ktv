import type { Metadata } from 'next'
import matchesData from '@/data/matches.json'
import { getMatchState } from '@/lib/match-utils'
import MatchListClient from '@/components/match/MatchListClient'
import type { Fixture } from '@/lib/sports-api'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Live Football Matches in 4K HDR — Buffer-Free | ORCA 4K TV',
  description: 'Watch live TV streaming of every major football league in 4K Ultra-HD with HDR streaming, zero buffering, and Anti Freeze technology. Multi-device IPTV streaming service across Smart TV, Firestick, Android, iOS.',
  keywords: 'live football iptv, watch football 4k, iptv sports, football streaming, live sports iptv 2026, live TV streaming, 4K streaming, HDR streaming, buffer-free streaming, zero buffering, Anti Freeze technology, IPTV subscription, IPTV streaming service, premium IPTV channels, multi-device compatibility, IPTV multi-device',
  alternates: { canonical: 'https://orca4ktv.com/live-matches' },
  openGraph: {
    title: 'Live Football Matches in 4K HDR — Buffer-Free',
    description: 'Live TV streaming of every major football league in 4K HDR with zero buffering and Anti Freeze technology.',
    url: 'https://orca4ktv.com/live-matches',
    images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Live Football Matches in 4K HDR — Buffer-Free',
    description: '4K HDR live TV streaming with zero buffering and Anti Freeze technology.',
  },
}

export default function LiveMatchesPage() {
  const matches = matchesData.matches as Fixture[]

  const live = matches.filter(m => getMatchState(m.kickoff, m.status) === 'live')

  const upcoming = matches
    .filter(m => getMatchState(m.kickoff, m.status) === 'pre')
    .sort((a, b) => new Date(a.kickoff).getTime() - new Date(b.kickoff).getTime())

  const results = matches
    .filter(m => getMatchState(m.kickoff, m.status) === 'post')
    .sort((a, b) => new Date(b.kickoff).getTime() - new Date(a.kickoff).getTime())
    .slice(0, 30)

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Live Football Matches in 4K',
    itemListElement: [...live, ...upcoming].map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://orca4ktv.com/watch/${m.slug}`,
    })),
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/' },
          { name: 'Live Matches', url: 'https://orca4ktv.com/live-matches' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="min-h-screen bg-[#000a1c] pt-20">
        {/* Hero banner */}
        <section className="bg-[#000a1c] border-b border-white/5 py-12 px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse inline-block" />
            Live Matches
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white mb-3">
            Live Football in 4K
          </h1>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Stream every match buffer-free. Premier League, Champions League, La Liga & more — on any device.
          </p>
        </section>

        <MatchListClient live={live} upcoming={upcoming} results={results} />
      </div>
    </>
  )
}
