'use client'

import { useState } from 'react'
import M3UInput, { type M3UInputValue } from './M3UInput'

interface AnalysisResponse {
  ok: true
  analysis: {
    totalEntries: number
    byType: { live: number; movie: number; series: number; unknown: number }
    topCategories: Array<{ name: string; count: number }>
    topCountries: Array<{ code: string; name: string; count: number }>
  }
  partial: boolean
  partialReason?: 'entry-cap' | 'size-cap'
  bytesRead: number
}

const fmt = new Intl.NumberFormat('en-US')

export default function M3UCheckerClient() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<AnalysisResponse | null>(null)

  async function run(v: M3UInputValue) {
    setBusy(true)
    setError(null)
    setData(null)
    try {
      const res = await fetch('/api/tools/m3u-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(v),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        setError(json.message || 'Could not analyze this playlist.')
        return
      }
      setData(json as AnalysisResponse)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <M3UInput onSubmit={run} busy={busy} submitLabel="Analyze playlist" />

      {error && (
        <div className="mt-6 rounded-lg border border-rose-400/30 bg-rose-500/10 p-4 text-rose-200">
          <p className="font-bold mb-1">
            <i className="fa-solid fa-triangle-exclamation mr-2" aria-hidden="true" />
            Could not analyze this playlist
          </p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {data && <Report data={data} />}
    </div>
  )
}

function Report({ data }: { data: AnalysisResponse }) {
  const { analysis, partial, partialReason, bytesRead } = data
  const live = analysis.byType.live + analysis.byType.unknown
  const movies = analysis.byType.movie
  const series = analysis.byType.series

  return (
    <div className="mt-8 space-y-8">
      {partial && (
        <div className="rounded-lg border border-amber-400/30 bg-amber-500/10 p-4 text-amber-100/90 text-sm">
          <p className="font-bold mb-1">
            <i className="fa-solid fa-circle-info mr-2" aria-hidden="true" />
            This is a partial analysis
          </p>
          <p className="leading-relaxed">
            Your playlist is too large to read in one shot, so we analyzed the first {fmt.format(analysis.totalEntries)} channels we received
            ({Math.round((bytesRead / 1024 / 1024) * 10) / 10} MB).
            {partialReason === 'entry-cap'
              ? ' Channel breakdown is accurate for the first portion of the playlist; categories at the end may be missing.'
              : ' Use the Paste tab and upload a smaller .m3u file for a complete analysis.'}
          </p>
        </div>
      )}

      <div>
        <h3 className="text-lg font-black uppercase tracking-widest text-gray-400 mb-3">Composition</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Total entries" value={fmt.format(analysis.totalEntries)} accent="white" icon="fa-list" />
          <Stat label="Live channels" value={fmt.format(live)} accent="cyan" icon="fa-tower-broadcast" />
          <Stat label="Movies (VOD)" value={fmt.format(movies)} accent="emerald" icon="fa-film" />
          <Stat label="Series" value={fmt.format(series)} accent="amber" icon="fa-clapperboard" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <RankedList
          title="Top categories"
          subtitle={`${analysis.topCategories.length} groups shown`}
          items={analysis.topCategories.map((c) => ({ key: c.name, label: c.name, count: c.count }))}
          total={analysis.totalEntries}
          emptyMessage="No group-title attributes were found in this playlist."
        />
        <RankedList
          title="Top countries"
          subtitle={`${analysis.topCountries.length} regions detected`}
          items={analysis.topCountries.map((c) => ({ key: c.code, label: c.name, hint: c.code, count: c.count }))}
          total={analysis.totalEntries}
          emptyMessage="No country indicators were found (no tvg-id suffix or country prefix in group titles)."
        />
      </div>

      <div className="rounded-xl bg-emerald-500/5 border border-emerald-400/30 p-5 text-sm text-emerald-100/90">
        <p className="font-bold mb-1">
          <i className="fa-solid fa-circle-check mr-2" aria-hidden="true" />
          Playlist is valid
        </p>
        <p className="leading-relaxed">
          Your M3U downloaded and parsed cleanly. The composition above tells you what your provider is offering.
          We do not ping individual streams from this tool: IPTV servers often block server-to-server connections
          even when streams play fine in your local IPTV player.
        </p>
      </div>
    </div>
  )
}

function Stat({ label, value, accent, icon }: { label: string; value: string; accent: 'white' | 'cyan' | 'emerald' | 'amber'; icon: string }) {
  const accentMap = {
    white: 'text-white',
    cyan: 'text-[#00E5FF]',
    emerald: 'text-emerald-300',
    amber: 'text-amber-300',
  }
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-4">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">{label}</p>
        <i className={`fa-solid ${icon} ${accentMap[accent]} opacity-70`} aria-hidden="true" />
      </div>
      <p className={`text-3xl font-black mt-2 tabular-nums ${accentMap[accent]}`}>{value}</p>
    </div>
  )
}

interface RankedItem {
  key: string
  label: string
  hint?: string
  count: number
}

function RankedList({ title, subtitle, items, total, emptyMessage }: { title: string; subtitle: string; items: RankedItem[]; total: number; emptyMessage: string }) {
  const max = items.length > 0 ? items[0].count : 1
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 p-5">
      <div className="flex items-baseline justify-between mb-4">
        <h3 className="text-lg font-black">{title}</h3>
        <p className="text-xs text-gray-500 uppercase tracking-wider">{subtitle}</p>
      </div>
      {items.length === 0 ? (
        <p className="text-sm text-gray-500 leading-relaxed">{emptyMessage}</p>
      ) : (
        <ul className="space-y-2.5">
          {items.map((item) => {
            const pct = total > 0 ? Math.round((item.count / total) * 1000) / 10 : 0
            const barWidth = max > 0 ? Math.max(2, (item.count / max) * 100) : 0
            return (
              <li key={item.key}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-white truncate pr-3" title={item.label}>
                    {item.label}
                    {item.hint && <span className="ml-2 text-xs text-gray-500 font-mono">{item.hint}</span>}
                  </span>
                  <span className="shrink-0 tabular-nums text-gray-300 font-bold">
                    {fmt.format(item.count)} <span className="text-gray-500 font-normal">({pct}%)</span>
                  </span>
                </div>
                <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
                  <div className="h-full bg-[#00E5FF]/70 rounded-full" style={{ width: `${barWidth}%` }} />
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
