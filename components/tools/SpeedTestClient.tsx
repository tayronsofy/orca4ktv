'use client'

import { useState } from 'react'

type Phase = 'idle' | 'running' | 'done' | 'error'

interface SpeedResult {
  mbps: number
  bytes: number
  durationMs: number
  recommendation: Recommendation
}

interface Recommendation {
  label: string
  detail: string
  tone: 'good' | 'warn' | 'bad'
}

const SAMPLE_SIZE_MB = 10

function recommendFor(mbps: number): Recommendation {
  if (mbps >= 30) {
    return {
      label: 'Ready for 4K HDR',
      detail: 'Comfortably handles a single 4K HDR stream (≈ 25 Mbps) with headroom for buffering and other devices on the same network.',
      tone: 'good',
    }
  }
  if (mbps >= 15) {
    return {
      label: 'Ready for Full-HD (1080p)',
      detail: 'Solid for a single 1080p IPTV stream (≈ 8-10 Mbps). 4K may work but expect occasional buffering during peak hours.',
      tone: 'good',
    }
  }
  if (mbps >= 6) {
    return {
      label: 'OK for HD (720p)',
      detail: 'You can stream HD reliably. Stick to one 1080p stream at a time and avoid 4K to keep playback smooth.',
      tone: 'warn',
    }
  }
  if (mbps >= 3) {
    return {
      label: 'SD only',
      detail: 'Bandwidth is enough for SD streaming. HD content is likely to buffer. Consider closing other apps using the network.',
      tone: 'warn',
    }
  }
  return {
    label: 'Too slow for IPTV',
    detail: 'Below 3 Mbps you will see frequent buffering even on SD streams. Restart your router, switch to wired Ethernet, or upgrade your plan.',
    tone: 'bad',
  }
}

export default function SpeedTestClient() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<SpeedResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  async function run() {
    setPhase('running')
    setProgress(0)
    setResult(null)
    setError(null)

    const url = `/api/tools/speedtest-sample?size_mb=${SAMPLE_SIZE_MB}&t=${Date.now()}`
    const start = performance.now()

    try {
      const res = await fetch(url, { cache: 'no-store' })
      if (!res.ok || !res.body) throw new Error(`Unexpected response: ${res.status}`)
      const total = SAMPLE_SIZE_MB * 1024 * 1024
      const reader = res.body.getReader()
      let received = 0

      while (true) {
        const { value, done } = await reader.read()
        if (done) break
        received += value.byteLength
        setProgress(Math.min(99, Math.round((received / total) * 100)))
      }

      const durationMs = performance.now() - start
      const bits = received * 8
      const mbps = bits / 1_000_000 / (durationMs / 1000)
      setProgress(100)
      setResult({
        mbps: Math.round(mbps * 10) / 10,
        bytes: received,
        durationMs: Math.round(durationMs),
        recommendation: recommendFor(mbps),
      })
      setPhase('done')
    } catch (e) {
      setError((e as Error).message || 'The speed test could not complete.')
      setPhase('error')
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 items-center mb-2">
        <button
          type="button"
          onClick={run}
          disabled={phase === 'running'}
          className="inline-flex items-center justify-center gap-2 bg-[#003580] hover:bg-[#003566] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest text-sm px-7 py-3 rounded-full transition-all shadow-lg shadow-[#00E5FF]/20"
        >
          {phase === 'running' ? (
            <>
              <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
              Running…
            </>
          ) : (
            <>
              <i className="fa-solid fa-gauge-high" aria-hidden="true" />
              {phase === 'done' ? 'Run again' : 'Start speed test'}
            </>
          )}
        </button>
        <span className="text-xs text-gray-500">
          Downloads {SAMPLE_SIZE_MB} MB from this server. No tracking.
        </span>
      </div>

      {phase === 'running' && (
        <div className="mt-6">
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-[#00E5FF] transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-sm text-gray-400 mt-2">{progress}%</p>
        </div>
      )}

      {phase === 'error' && error && (
        <div className="mt-6 rounded-lg border border-rose-400/30 bg-rose-500/10 p-4 text-rose-200">
          <p className="font-bold mb-1">
            <i className="fa-solid fa-triangle-exclamation mr-2" aria-hidden="true" />
            Speed test failed
          </p>
          <p className="text-sm">{error}</p>
        </div>
      )}

      {phase === 'done' && result && (
        <div className="mt-8">
          <div className="rounded-2xl border border-[#00E5FF]/30 bg-[#00E5FF]/5 p-8 text-center">
            <p className="text-xs uppercase tracking-widest text-[#00E5FF] font-bold">Download speed</p>
            <p className="text-5xl md:text-7xl font-black mt-3 mb-2 text-white tabular-nums">
              {result.mbps.toFixed(1)}
              <span className="text-2xl md:text-3xl text-gray-400 ml-2 font-bold">Mbps</span>
            </p>
            <p className="text-sm text-gray-400">
              {SAMPLE_SIZE_MB} MB downloaded in {(result.durationMs / 1000).toFixed(2)} s
            </p>
          </div>

          <div
            className={`mt-5 rounded-2xl border p-6 ${
              result.recommendation.tone === 'good'
                ? 'border-emerald-400/30 bg-emerald-500/5'
                : result.recommendation.tone === 'warn'
                ? 'border-amber-400/30 bg-amber-500/5'
                : 'border-rose-400/30 bg-rose-500/5'
            }`}
          >
            <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">Recommendation</p>
            <h3 className="text-xl font-black text-white mb-2">{result.recommendation.label}</h3>
            <p className="text-gray-300 leading-relaxed">{result.recommendation.detail}</p>
          </div>

          <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm">
            <RefRow label="SD streaming" need="≥ 3 Mbps" pass={result.mbps >= 3} />
            <RefRow label="HD 720p" need="≥ 6 Mbps" pass={result.mbps >= 6} />
            <RefRow label="Full-HD 1080p" need="≥ 10 Mbps" pass={result.mbps >= 10} />
            <RefRow label="4K HDR" need="≥ 25 Mbps" pass={result.mbps >= 25} />
          </div>
        </div>
      )}
    </div>
  )
}

function RefRow({ label, need, pass }: { label: string; need: string; pass: boolean }) {
  return (
    <div className={`flex items-center justify-between rounded-lg border px-4 py-3 ${pass ? 'border-emerald-400/30 bg-emerald-500/5' : 'border-white/10 bg-white/5'}`}>
      <span className="text-white font-bold">{label}</span>
      <span className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${pass ? 'text-emerald-300' : 'text-gray-400'}`}>
        <i className={`fa-solid ${pass ? 'fa-circle-check' : 'fa-circle-xmark'}`} aria-hidden="true" />
        {need}
      </span>
    </div>
  )
}
