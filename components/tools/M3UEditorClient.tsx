'use client'

import { useState } from 'react'
import M3UInput, { type M3UInputValue } from './M3UInput'
import { parseM3U, serializeM3U, type M3UEntry } from '@/lib/tools/m3u-parser'
import { detectCountry } from '@/lib/tools/m3u-classify'

const HARD_ENTRY_CAP = 200_000 // browser-side memory ceiling
const UNTAGGED_KEY = '__untagged__'
const UNTAGGED_LABEL = 'No country detected'

const fmt = new Intl.NumberFormat('en-US')

interface CountryBucket {
  key: string // ISO-2 code or UNTAGGED_KEY
  name: string
  entries: M3UEntry[]
}

function bucketByCountry(entries: M3UEntry[]): CountryBucket[] {
  const map = new Map<string, CountryBucket>()
  for (const e of entries) {
    const cd = detectCountry(e)
    const key = cd?.code ?? UNTAGGED_KEY
    const name = cd?.name ?? UNTAGGED_LABEL
    let b = map.get(key)
    if (!b) {
      b = { key, name, entries: [] }
      map.set(key, b)
    }
    b.entries.push(e)
  }
  // Sort biggest country first so the user starts with the most-reorderable buckets.
  // Untagged always goes last.
  const list = [...map.values()].sort((a, b) => {
    if (a.key === UNTAGGED_KEY) return 1
    if (b.key === UNTAGGED_KEY) return -1
    return b.entries.length - a.entries.length
  })
  return list
}

export default function M3UEditorClient() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [buckets, setBuckets] = useState<CountryBucket[] | null>(null)
  const [sourceLabel, setSourceLabel] = useState<string>('')

  async function load(v: M3UInputValue) {
    setBusy(true)
    setError(null)
    setBuckets(null)
    try {
      let entries: M3UEntry[]
      if (v.mode === 'paste') {
        const parsed = parseM3U(v.content ?? '')
        if (parsed.entries.length === 0) {
          setError('No streams found in this playlist.')
          return
        }
        if (parsed.entries.length > HARD_ENTRY_CAP) {
          setError(`Playlist has ${fmt.format(parsed.entries.length)} channels - over the editor limit of ${fmt.format(HARD_ENTRY_CAP)}. Trim the file before opening it here.`)
          return
        }
        entries = parsed.entries
        setSourceLabel('Pasted / uploaded file')
      } else {
        const res = await fetch('/api/tools/m3u-fetch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: v.url }),
        })
        const json = await res.json()
        if (!res.ok || !json.ok) {
          setError(json.message || 'Could not fetch this playlist.')
          return
        }
        entries = json.entries as M3UEntry[]
        if (entries.length > HARD_ENTRY_CAP) {
          setError(`Playlist has ${fmt.format(entries.length)} channels - over the editor limit of ${fmt.format(HARD_ENTRY_CAP)}.`)
          return
        }
        setSourceLabel(v.url ?? 'URL')
      }

      setBuckets(bucketByCountry(entries))
    } catch (err) {
      setError((err as Error).message || 'Could not load this playlist.')
    } finally {
      setBusy(false)
    }
  }

  function removeBucket(key: string) {
    if (!buckets) return
    setBuckets(buckets.filter((b) => b.key !== key))
  }

  function moveBucket(key: string, dir: -1 | 1) {
    if (!buckets) return
    const idx = buckets.findIndex((b) => b.key === key)
    if (idx < 0) return
    const target = idx + dir
    if (target < 0 || target >= buckets.length) return
    const next = [...buckets]
    ;[next[idx], next[target]] = [next[target], next[idx]]
    setBuckets(next)
  }

  function moveToTop(key: string) {
    if (!buckets) return
    const idx = buckets.findIndex((b) => b.key === key)
    if (idx <= 0) return
    const next = [...buckets]
    const [b] = next.splice(idx, 1)
    next.unshift(b)
    setBuckets(next)
  }

  function exportFile() {
    if (!buckets || buckets.length === 0) return
    const ordered: M3UEntry[] = buckets.flatMap((b) => b.entries)
    const text = serializeM3U(ordered)
    const blob = new Blob([text], { type: 'audio/x-mpegurl' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'playlist-orca4ktv-cleaned.m3u'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  function reset() {
    setBuckets(null)
    setError(null)
    setSourceLabel('')
  }

  if (!buckets) {
    return (
      <div>
        <M3UInput onSubmit={load} busy={busy} submitLabel="Load playlist" />
        {error && (
          <div className="mt-6 rounded-lg border border-rose-400/30 bg-rose-500/10 p-4 text-rose-200">
            <p className="font-bold mb-1">
              <i className="fa-solid fa-triangle-exclamation mr-2" aria-hidden="true" />
              Could not load this playlist
            </p>
            <p className="text-sm">{error}</p>
          </div>
        )}
        <p className="text-xs text-gray-500 mt-4 leading-relaxed">
          Tip: paste and upload modes never send your file to our servers - the editor runs entirely in your browser.
          URL mode passes through our server only to bypass the browser CORS restriction.
        </p>
      </div>
    )
  }

  const totalChannels = buckets.reduce((sum, b) => sum + b.entries.length, 0)

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Loaded</p>
          <p className="text-white font-bold text-sm truncate max-w-md" title={sourceLabel}>{sourceLabel}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {fmt.format(buckets.length)} {buckets.length === 1 ? 'country' : 'countries'} · {fmt.format(totalChannels)} channels
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportFile}
            disabled={buckets.length === 0}
            className="inline-flex items-center gap-2 bg-[#00E5FF] hover:bg-white text-[#001f3f] disabled:opacity-50 font-black uppercase tracking-widest text-xs px-5 py-2.5 rounded-full transition-all"
          >
            <i className="fa-solid fa-download" aria-hidden="true" />
            Export .m3u
          </button>
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold uppercase tracking-widest text-xs px-4 py-2.5 rounded-full transition-all"
          >
            <i className="fa-solid fa-rotate-left" aria-hidden="true" />
            New playlist
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-4 text-sm text-gray-300">
        <p>
          <i className="fa-solid fa-circle-info text-[#00E5FF] mr-2" aria-hidden="true" />
          Move countries up or down to control the order they appear in your IPTV player. Remove a country to drop all of its channels. Then click <strong className="text-white">Export .m3u</strong> to download the rebuilt playlist.
        </p>
      </div>

      <ul className="space-y-2">
        {buckets.map((b, i) => {
          const isFirst = i === 0
          const isLast = i === buckets.length - 1
          const isUntagged = b.key === UNTAGGED_KEY
          return (
            <li
              key={b.key}
              className={`flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3 ${
                isUntagged
                  ? 'bg-white/[0.02] border-white/5 text-gray-400'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className="shrink-0 w-9 h-9 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] font-black flex items-center justify-center text-sm">
                {i + 1}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-bold text-white truncate flex items-center gap-2">
                  {!isUntagged && <span className="font-mono text-xs text-gray-500">{b.key}</span>}
                  <span className="truncate">{b.name}</span>
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {fmt.format(b.entries.length)} {b.entries.length === 1 ? 'channel' : 'channels'}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <IconButton
                  onClick={() => moveToTop(b.key)}
                  disabled={isFirst}
                  title="Move to top"
                  icon="fa-angles-up"
                />
                <IconButton
                  onClick={() => moveBucket(b.key, -1)}
                  disabled={isFirst}
                  title="Move up"
                  icon="fa-arrow-up"
                />
                <IconButton
                  onClick={() => moveBucket(b.key, 1)}
                  disabled={isLast}
                  title="Move down"
                  icon="fa-arrow-down"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (confirm(`Remove all ${fmt.format(b.entries.length)} channels from ${b.name}?`)) {
                      removeBucket(b.key)
                    }
                  }}
                  title="Remove this country"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-400/30 text-rose-300 transition-all"
                >
                  <i className="fa-solid fa-trash text-sm" aria-hidden="true" />
                </button>
              </div>
            </li>
          )
        })}
      </ul>

      {buckets.length === 0 && (
        <div className="rounded-xl bg-white/5 border border-white/10 p-8 text-center text-gray-400">
          <p className="font-bold mb-2">All countries removed.</p>
          <p className="text-sm">Click <strong className="text-white">New playlist</strong> to start over.</p>
        </div>
      )}
    </div>
  )
}

function IconButton({ onClick, disabled, title, icon }: { onClick: () => void; disabled?: boolean; title: string; icon: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-all"
    >
      <i className={`fa-solid ${icon} text-sm`} aria-hidden="true" />
    </button>
  )
}
