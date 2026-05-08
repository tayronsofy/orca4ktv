'use client'

import { useState } from 'react'

interface XmlTvSummary {
  channelCount: number
  programmeCount: number
  earliestStart?: string
  latestStop?: string
  sampleChannels: string[]
  samplePrograms: Array<{ channel: string; start: string; stop?: string; title?: string; desc?: string }>
}

interface ValidateResponse {
  ok: true
  summary: XmlTvSummary
  bytesRead: number
  health: 'healthy' | 'sparse' | 'stale'
}

const fmt = new Intl.NumberFormat('en-US')

function formatIso(d?: string): string {
  if (!d) return '—'
  const t = new Date(d)
  if (Number.isNaN(t.getTime())) return d
  return t.toLocaleString(undefined, { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function EpgValidatorClient() {
  const [url, setUrl] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<ValidateResponse | null>(null)

  async function run() {
    setError(null)
    setData(null)
    if (!url.trim()) {
      setError('Enter an EPG / XMLTV URL.')
      return
    }
    try {
      new URL(url)
    } catch {
      setError('That does not look like a valid URL.')
      return
    }

    setBusy(true)
    try {
      const res = await fetch('/api/tools/epg-validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        setError(json.message || 'Could not validate this EPG URL.')
        return
      }
      setData(json as ValidateResponse)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div>
      <label className="block">
        <span className="text-sm font-bold text-gray-300 block mb-1.5">XMLTV / EPG URL</span>
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="http://your-iptv-host.com/xmltv.php?username=...&password=..."
          className="w-full bg-[#001a36] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]/60 font-mono text-sm"
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
      </label>

      <button
        type="button"
        onClick={run}
        disabled={busy}
        className="mt-5 inline-flex items-center justify-center gap-2 bg-[#003580] hover:bg-[#003566] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest text-sm px-7 py-3 rounded-full transition-all shadow-lg shadow-[#00E5FF]/20"
      >
        {busy ? (
          <>
            <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
            Validating...
          </>
        ) : (
          <>
            <i className="fa-solid fa-calendar-check" aria-hidden="true" />
            Validate EPG
          </>
        )}
      </button>

      {error && (
        <div className="mt-6 rounded-lg border border-rose-400/30 bg-rose-500/10 p-4 text-rose-200">
          <p className="font-bold mb-1">
            <i className="fa-solid fa-triangle-exclamation mr-2" aria-hidden="true" />
            EPG validation failed
          </p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {data && <Report data={data} />}
    </div>
  )
}

function Report({ data }: { data: ValidateResponse }) {
  const { summary, health, bytesRead } = data

  return (
    <div className="mt-8 space-y-6">
      <HealthBanner health={health} />

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Stat label="Channels" value={fmt.format(summary.channelCount)} icon="fa-tower-broadcast" accent="cyan" />
        <Stat label="Programmes" value={fmt.format(summary.programmeCount)} icon="fa-calendar-days" accent="emerald" />
        <Stat
          label="Coverage"
          value={summary.earliestStart && summary.latestStop ? formatRange(summary.earliestStart, summary.latestStop) : '—'}
          icon="fa-clock"
          accent="amber"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-xl bg-white/5 border border-white/10 p-5">
          <h3 className="text-lg font-black mb-3">Sample channels</h3>
          {summary.sampleChannels.length === 0 ? (
            <p className="text-sm text-gray-500">No channels declared in this XMLTV file.</p>
          ) : (
            <ul className="space-y-2 text-sm">
              {summary.sampleChannels.map((c, i) => (
                <li key={i} className="text-gray-300 truncate" title={c}>
                  <i className="fa-solid fa-tv text-[#00E5FF]/70 mr-2" aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-xl bg-white/5 border border-white/10 p-5">
          <h3 className="text-lg font-black mb-3">Sample programmes</h3>
          {summary.samplePrograms.length === 0 ? (
            <p className="text-sm text-gray-500">No programme entries found in this XMLTV file.</p>
          ) : (
            <ul className="space-y-2.5 text-sm">
              {summary.samplePrograms.map((p, i) => (
                <li key={i} className="border-l-2 border-[#00E5FF]/30 pl-3">
                  <div className="font-bold text-white truncate" title={p.title}>{p.title || 'Untitled programme'}</div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    <span className="font-mono">{p.channel}</span>
                    <span className="mx-2">·</span>
                    {formatIso(p.start)}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Downloaded {Math.round((bytesRead / 1024) * 10) / 10} KB. EPG content is parsed once and discarded — we do not store the file.
      </p>
    </div>
  )
}

function HealthBanner({ health }: { health: 'healthy' | 'sparse' | 'stale' }) {
  if (health === 'healthy') {
    return (
      <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/5 p-5 text-emerald-100/90">
        <p className="font-bold mb-1">
          <i className="fa-solid fa-circle-check mr-2" aria-hidden="true" />
          EPG looks healthy
        </p>
        <p className="text-sm leading-relaxed">
          Your guide downloaded cleanly, parsed as valid XMLTV, and has enough channels and programmes for normal IPTV use. Import it into TiviMate, IPTV Smarters, or OTT Navigator.
        </p>
      </div>
    )
  }
  if (health === 'sparse') {
    return (
      <div className="rounded-xl border border-amber-400/30 bg-amber-500/5 p-5 text-amber-100/90">
        <p className="font-bold mb-1">
          <i className="fa-solid fa-circle-info mr-2" aria-hidden="true" />
          EPG is sparse
        </p>
        <p className="text-sm leading-relaxed">
          The file parses but has very few channels or programmes, or a date range under 24 hours. Some channels may show no guide data in your IPTV player. Ask your provider for a fuller EPG URL.
        </p>
      </div>
    )
  }
  return (
    <div className="rounded-xl border border-rose-400/30 bg-rose-500/5 p-5 text-rose-100/90">
      <p className="font-bold mb-1">
        <i className="fa-solid fa-triangle-exclamation mr-2" aria-hidden="true" />
        EPG is stale
      </p>
      <p className="text-sm leading-relaxed">
        The latest programme in this guide ended in the past. Either the guide is no longer being updated, or your IPTV provider stopped serving it. Contact them for a fresh EPG URL.
      </p>
    </div>
  )
}

function Stat({ label, value, icon, accent }: { label: string; value: string; icon: string; accent: 'cyan' | 'emerald' | 'amber' }) {
  const accentMap = { cyan: 'text-[#00E5FF]', emerald: 'text-emerald-300', amber: 'text-amber-300' }
  return (
    <div className="rounded-xl bg-white/5 border border-white/10 px-4 py-4">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs text-gray-400 uppercase tracking-wider font-bold">{label}</p>
        <i className={`fa-solid ${icon} ${accentMap[accent]} opacity-70`} aria-hidden="true" />
      </div>
      <p className={`text-2xl md:text-3xl font-black mt-2 tabular-nums ${accentMap[accent]}`}>{value}</p>
    </div>
  )
}

function formatRange(startIso: string, stopIso: string): string {
  const start = new Date(startIso)
  const stop = new Date(stopIso)
  if (Number.isNaN(start.getTime()) || Number.isNaN(stop.getTime())) return '—'
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  return `${start.toLocaleDateString(undefined, opts)} → ${stop.toLocaleDateString(undefined, opts)}`
}
