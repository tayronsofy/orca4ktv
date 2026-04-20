'use client'

import { useState } from 'react'
import MatchCard from './MatchCard'
import type { Fixture } from '@/lib/sports-api'

interface Props {
  live: Fixture[]
  upcoming: Fixture[]
  results: Fixture[]
}

type Tab = 'all' | 'live' | 'upcoming' | 'results'

export default function MatchListClient({ live, upcoming, results }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('all')

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: 'all',      label: 'All',      count: live.length + upcoming.length + results.length },
    { id: 'live',     label: 'Live',     count: live.length },
    { id: 'upcoming', label: 'Upcoming', count: upcoming.length },
    { id: 'results',  label: 'Results',  count: results.length },
  ]

  const showLive     = activeTab === 'all' || activeTab === 'live'
  const showUpcoming = activeTab === 'all' || activeTab === 'upcoming'
  const showResults  = activeTab === 'all' || activeTab === 'results'

  const isEmpty = live.length === 0 && upcoming.length === 0 && results.length === 0

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-white text-black'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
            }`}
          >
            {tab.id === 'live' && live.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            )}
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-black/10 text-black' : 'bg-white/5 text-gray-500'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Live section */}
      {showLive && live.length > 0 && (
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-xs font-black text-red-400 uppercase tracking-widest mb-4">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            Live Now
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {live.map(m => <MatchCard key={m.slug} match={m} state="live" />)}
          </div>
        </section>
      )}

      {/* Upcoming section */}
      {showUpcoming && upcoming.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-black text-[#a855f7] uppercase tracking-widest mb-4">
            Upcoming
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcoming.map(m => <MatchCard key={m.slug} match={m} state="pre" />)}
          </div>
        </section>
      )}

      {/* Results section */}
      {showResults && results.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xs font-black text-gray-500 uppercase tracking-widest mb-4">
            Recent Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(m => <MatchCard key={m.slug} match={m} state="post" />)}
          </div>
        </section>
      )}

      {/* Empty state */}
      {isEmpty && (
        <div className="text-center py-24 text-gray-600">
          <p className="text-5xl mb-4">⚽</p>
          <p className="font-bold text-white mb-2">No matches available right now</p>
          <p className="text-sm text-gray-500">Check back soon for upcoming fixtures.</p>
        </div>
      )}
    </div>
  )
}
