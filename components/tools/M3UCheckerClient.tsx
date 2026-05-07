'use client'

import { useMemo, useState } from 'react'
import M3UInput, { type M3UInputValue } from './M3UInput'
import StatusPill, { type Status } from './StatusPill'

interface StreamResult {
  name: string
  url: string
  group?: string
  status: Status
  responseMs?: number
  errorReason?: string
}

interface CheckResponse {
  ok: true
  totalStreams: number
  sampled: number
  totals: { working: number; slow: number; dead: number }
  results: StreamResult[]
}

type FilterKey = 'all' | 'working' | 'slow' | 'dead'

export default function M3UCheckerClient() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<CheckResponse | null>(null)
  const [filter, setFilter] = useState<FilterKey>('all')

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
        setError(json.message || 'Could not check this playlist.')
        return
      }
      setData(json as CheckResponse)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  const filteredResults = useMemo(() => {
    if (!data) return []
    if (filter === 'all') return data.results
    return data.results.filter((r) => r.status === filter)
  }, [data, filter])

  return (
    <div>
      <M3UInput onSubmit={run} busy={busy} submitLabel="Check playlist" />

      {error && (
        <div className="mt-6 rounded-lg border border-rose-400/30 bg-rose-500/10 p-4 text-rose-200">
          <p className="font-bold mb-1">
            <i className="fa-solid fa-triangle-exclamation mr-2" aria-hidden="true" />
            Could not run the check
          </p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {data && (
        <div className="mt-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <Stat label="Total streams" value={data.totalStreams.toLocaleString()} accent="white" />
            <Stat label="Sampled" value={data.sampled.toLocaleString()} accent="cyan" />
            <Stat label="Working" value={data.totals.working.toLocaleString()} accent="emerald" />
            <Stat label="Dead" value={data.totals.dead.toLocaleString()} accent="rose" />
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {(['all', 'working', 'slow', 'dead'] as const).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setFilter(k)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  filter === k ? 'bg-[#00E5FF] text-[#001f3f]' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {k} {k !== 'all' && `(${data.totals[k as keyof typeof data.totals]})`}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full text-sm">
              <thead className="bg-white/5 text-gray-400 uppercase text-xs tracking-wider">
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Channel</th>
                  <th className="text-left px-4 py-3 font-bold">Group</th>
                  <th className="text-left px-4 py-3 font-bold">Status</th>
                  <th className="text-right px-4 py-3 font-bold">Response</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-gray-500">
                      No streams in this filter.
                    </td>
                  </tr>
                ) : (
                  filteredResults.map((r, i) => (
                    <tr key={i} className="border-t border-white/5">
                      <td className="px-4 py-3 text-white max-w-xs truncate" title={r.name}>
                        {r.name}
                      </td>
                      <td className="px-4 py-3 text-gray-400 max-w-xs truncate">{r.group ?? '—'}</td>
                      <td className="px-4 py-3">
                        <StatusPill status={r.status} />
                        {r.errorReason && (
                          <span className="ml-2 text-xs text-gray-500">{r.errorReason}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-300">
                        {r.responseMs != null ? `${r.responseMs} ms` : '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500 mt-4 leading-relaxed">
            We probe up to 50 random streams from your playlist with short HEAD/GET requests.
            A “working” result confirms reachability — actual playback quality also depends on
            your player and your internet connection.
          </p>
        </div>
      )}
    </div>
  )
}

function Stat({ label, value, accent }: { label: string; value: string; accent: 'white' | 'cyan' | 'emerald' | 'rose' }) {
  const accentMap = {
    white: 'text-white',
    cyan: 'text-[#00E5FF]',
    emerald: 'text-emerald-300',
    rose: 'text-rose-300',
  }
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-3">
      <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">{label}</p>
      <p className={`text-2xl font-black mt-1 ${accentMap[accent]}`}>{value}</p>
    </div>
  )
}
