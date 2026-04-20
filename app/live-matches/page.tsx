import type { Metadata } from 'next'
import matchesData from '@/data/matches.json'
import { getMatchState } from '@/lib/match-utils'
import MatchListClient from '@/components/match/MatchListClient'
import type { Fixture } from '@/lib/sports-api'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Live Football Matches | Watch in 4K | SMART 4K IPTV',
  description: 'Stream all live football matches in 4K Ultra-HD. Premier League, Champions League, La Liga and more — buffer-free IPTV on any device.',
  alternates: { canonical: 'https://smart4k.io/live-matches' },
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
      url: `https://smart4k.io/watch/${m.slug}`,
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="min-h-screen bg-[#0a0a0a] pt-20">
        {/* Hero banner */}
        <section className="bg-[#080808] border-b border-white/5 py-12 px-4 text-center">
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
