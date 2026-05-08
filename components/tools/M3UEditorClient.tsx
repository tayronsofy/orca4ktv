'use client'

import { useMemo, useState } from 'react'
import M3UInput, { type M3UInputValue } from './M3UInput'
import { parseM3U, serializeM3U, type M3UEntry } from '@/lib/tools/m3u-parser'
import { classify, detectCountry, type StreamType } from '@/lib/tools/m3u-classify'

interface EnrichedEntry extends M3UEntry {
  __id: number
  __type: StreamType
  __countryCode?: string
  __countryName?: string
}

const HARD_ENTRY_CAP = 200_000 // browser-side memory ceiling
const TABLE_RENDER_CAP = 1_000 // keep DOM nimble

const fmt = new Intl.NumberFormat('en-US')

function enrich(entries: M3UEntry[]): EnrichedEntry[] {
  return entries.map((e, i) => {
    const cd = detectCountry(e)
    return {
      ...e,
      __id: i,
      __type: classify(e),
      __countryCode: cd?.code,
      __countryName: cd?.name,
    }
  })
}

type SortKey = 'name' | 'group' | 'country' | 'type'
type SortDir = 'asc' | 'desc'

export default function M3UEditorClient() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [entries, setEntries] = useState<EnrichedEntry[] | null>(null)
  const [sourceLabel, setSourceLabel] = useState<string>('')

  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<'all' | StreamType>('all')
  const [groupFilter, setGroupFilter] = useState<string>('all')
  const [countryFilter, setCountryFilter] = useState<string>('all')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [selected, setSelected] = useState<Set<number>>(new Set())

  async function load(v: M3UInputValue) {
    setBusy(true)
    setError(null)
    setEntries(null)
    setSelected(new Set())
    try {
      let text: string
      if (v.mode === 'paste') {
        text = v.content ?? ''
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
        const parsed: M3UEntry[] = json.entries
        if (parsed.length > HARD_ENTRY_CAP) {
          setError(`Playlist has ${fmt.format(parsed.length)} channels - over the editor limit of ${fmt.format(HARD_ENTRY_CAP)}. Trim the file before opening it here.`)
          return
        }
        setEntries(enrich(parsed))
        setSourceLabel(v.url ?? 'URL')
        return
      }

      const parsed = parseM3U(text)
      if (parsed.entries.length === 0) {
        setError('No streams found in this playlist.')
        return
      }
      if (parsed.entries.length > HARD_ENTRY_CAP) {
        setError(`Playlist has ${fmt.format(parsed.entries.length)} channels - over the editor limit of ${fmt.format(HARD_ENTRY_CAP)}. Trim the file before opening it here.`)
        return
      }
      setEntries(enrich(parsed.entries))
    } catch (err) {
      setError((err as Error).message || 'Could not load this playlist.')
    } finally {
      setBusy(false)
    }
  }

  // ---------- Filter + sort pipeline ----------

  const groupOptions = useMemo(() => {
    if (!entries) return []
    const counts = new Map<string, number>()
    for (const e of entries) {
      const g = (e.group ?? '').trim()
      if (g) counts.set(g, (counts.get(g) ?? 0) + 1)
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 30).map(([name, count]) => ({ name, count }))
  }, [entries])

  const countryOptions = useMemo(() => {
    if (!entries) return []
    const counts = new Map<string, { name: string; count: number }>()
    for (const e of entries) {
      if (!e.__countryCode) continue
      const cur = counts.get(e.__countryCode)
      if (cur) cur.count += 1
      else counts.set(e.__countryCode, { name: e.__countryName ?? e.__countryCode, count: 1 })
    }
    return [...counts.entries()].sort((a, b) => b[1].count - a[1].count).slice(0, 30).map(([code, v]) => ({ code, name: v.name, count: v.count }))
  }, [entries])

  const filtered = useMemo(() => {
    if (!entries) return []
    const q = search.trim().toLowerCase()
    return entries.filter((e) => {
      if (typeFilter !== 'all' && e.__type !== typeFilter) return false
      if (groupFilter !== 'all' && (e.group ?? '') !== groupFilter) return false
      if (countryFilter !== 'all' && e.__countryCode !== countryFilter) return false
      if (q) {
        const hay = `${e.name} ${e.group ?? ''} ${e.__countryName ?? ''}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      return true
    })
  }, [entries, search, typeFilter, groupFilter, countryFilter])

  const sorted = useMemo(() => {
    const arr = [...filtered]
    const dir = sortDir === 'asc' ? 1 : -1
    arr.sort((a, b) => {
      const av = sortValue(a, sortKey)
      const bv = sortValue(b, sortKey)
      return av.localeCompare(bv) * dir
    })
    return arr
  }, [filtered, sortKey, sortDir])

  const visible = sorted.slice(0, TABLE_RENDER_CAP)

  // ---------- Actions ----------

  function toggleSelected(id: number) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function selectAllVisible() {
    setSelected(new Set(visible.map((e) => e.__id)))
  }

  function clearSelection() {
    setSelected(new Set())
  }

  function deleteSelected() {
    if (!entries || selected.size === 0) return
    setEntries(entries.filter((e) => !selected.has(e.__id)))
    setSelected(new Set())
  }

  function deleteFiltered() {
    if (!entries || filtered.length === 0) return
    if (filtered.length === entries.length) {
      if (!confirm('This will delete every visible channel - the entire playlist. Continue?')) return
    }
    const filteredIds = new Set(filtered.map((e) => e.__id))
    setEntries(entries.filter((e) => !filteredIds.has(e.__id)))
    setSelected(new Set())
  }

  function renameGroupOfSelected() {
    if (!entries || selected.size === 0) return
    const newName = prompt('Rename the group title for the selected channels to:')
    if (newName === null) return
    const trimmed = newName.trim()
    if (!trimmed) return
    setEntries(entries.map((e) => (selected.has(e.__id) ? { ...e, group: trimmed } : e)))
  }

  function exportFile() {
    if (!entries || entries.length === 0) return
    const stripped: M3UEntry[] = entries.map(({ __id, __type, __countryCode, __countryName, ...rest }) => rest)
    const text = serializeM3U(stripped)
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
    setEntries(null)
    setError(null)
    setSelected(new Set())
    setSearch('')
    setTypeFilter('all')
    setGroupFilter('all')
    setCountryFilter('all')
  }

  function setSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  // ---------- Render ----------

  if (!entries) {
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
          Tip: paste or upload mode never sends your file to our servers - the editor runs entirely in your browser.
          URL mode passes through our server only to bypass the browser CORS restriction.
        </p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <p className="text-xs uppercase tracking-widest text-gray-500 font-bold">Loaded</p>
          <p className="text-white font-bold text-sm truncate max-w-md" title={sourceLabel}>{sourceLabel}</p>
          <p className="text-xs text-gray-400 mt-0.5">{fmt.format(entries.length)} channels</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={exportFile}
            disabled={entries.length === 0}
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

      <div className="rounded-xl bg-white/5 border border-white/10 p-4 space-y-4 mb-4">
        <div className="grid md:grid-cols-3 gap-3">
          <div className="md:col-span-3">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by channel name, group, or country..."
              className="w-full bg-[#001a36] border border-white/15 rounded-lg px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]/60 text-sm"
            />
          </div>

          <select
            value={groupFilter}
            onChange={(e) => setGroupFilter(e.target.value)}
            className="bg-[#001a36] border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00E5FF]/60"
          >
            <option value="all">All groups ({groupOptions.length})</option>
            {groupOptions.map((g) => (
              <option key={g.name} value={g.name}>{g.name} ({fmt.format(g.count)})</option>
            ))}
          </select>

          <select
            value={countryFilter}
            onChange={(e) => setCountryFilter(e.target.value)}
            className="bg-[#001a36] border border-white/15 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-[#00E5FF]/60"
          >
            <option value="all">All countries ({countryOptions.length})</option>
            {countryOptions.map((c) => (
              <option key={c.code} value={c.code}>{c.name} ({fmt.format(c.count)})</option>
            ))}
          </select>

          <div className="flex gap-1.5 items-center">
            {(['all', 'live', 'movie', 'series'] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all flex-1 ${
                  typeFilter === t ? 'bg-[#00E5FF] text-[#001f3f]' : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {t === 'all' ? 'All' : t === 'live' ? 'Live' : t === 'movie' ? 'Movies' : 'Series'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <p className="text-gray-400">
            Showing <strong className="text-white">{fmt.format(visible.length)}</strong>
            {sorted.length !== visible.length && <span> of {fmt.format(sorted.length)}</span>}
            {filtered.length !== entries.length && <span> · filtered from {fmt.format(entries.length)}</span>}
            {selected.size > 0 && <span> · <strong className="text-[#00E5FF]">{fmt.format(selected.size)} selected</strong></span>}
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={selectAllVisible} className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] hover:text-white">
              Select visible
            </button>
            {selected.size > 0 && (
              <>
                <button type="button" onClick={clearSelection} className="text-xs font-bold uppercase tracking-wider text-gray-400 hover:text-white">
                  Clear
                </button>
                <button type="button" onClick={renameGroupOfSelected} className="text-xs font-bold uppercase tracking-wider text-amber-300 hover:text-amber-200">
                  Rename group...
                </button>
                <button type="button" onClick={deleteSelected} className="text-xs font-bold uppercase tracking-wider text-rose-300 hover:text-rose-200">
                  <i className="fa-solid fa-trash mr-1" aria-hidden="true" />
                  Delete {fmt.format(selected.size)}
                </button>
              </>
            )}
            {selected.size === 0 && filtered.length < entries.length && filtered.length > 0 && (
              <button type="button" onClick={deleteFiltered} className="text-xs font-bold uppercase tracking-wider text-rose-300 hover:text-rose-200">
                <i className="fa-solid fa-broom mr-1" aria-hidden="true" />
                Delete {fmt.format(filtered.length)} filtered
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-gray-400 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-3 py-3 w-10">
                <input
                  type="checkbox"
                  checked={visible.length > 0 && visible.every((e) => selected.has(e.__id))}
                  onChange={(e) => (e.target.checked ? selectAllVisible() : clearSelection())}
                  className="accent-[#00E5FF]"
                />
              </th>
              <Th label="Channel" sortKey="name" current={sortKey} dir={sortDir} onClick={setSort} />
              <Th label="Group" sortKey="group" current={sortKey} dir={sortDir} onClick={setSort} />
              <Th label="Country" sortKey="country" current={sortKey} dir={sortDir} onClick={setSort} />
              <Th label="Type" sortKey="type" current={sortKey} dir={sortDir} onClick={setSort} />
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">No channels match your filters.</td>
              </tr>
            ) : (
              visible.map((e) => {
                const checked = selected.has(e.__id)
                return (
                  <tr
                    key={e.__id}
                    className={`border-t border-white/5 cursor-pointer hover:bg-white/5 ${checked ? 'bg-[#00E5FF]/5' : ''}`}
                    onClick={() => toggleSelected(e.__id)}
                  >
                    <td className="px-3 py-2.5">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleSelected(e.__id)}
                        onClick={(ev) => ev.stopPropagation()}
                        className="accent-[#00E5FF]"
                      />
                    </td>
                    <td className="px-3 py-2.5 text-white max-w-xs truncate" title={e.name}>{e.name}</td>
                    <td className="px-3 py-2.5 text-gray-400 max-w-xs truncate" title={e.group ?? ''}>{e.group ?? '—'}</td>
                    <td className="px-3 py-2.5 text-gray-300">
                      {e.__countryCode ? <span><span className="font-mono text-xs text-gray-500 mr-1">{e.__countryCode}</span>{e.__countryName}</span> : '—'}
                    </td>
                    <td className="px-3 py-2.5">
                      <TypePill type={e.__type} />
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {sorted.length > TABLE_RENDER_CAP && (
        <p className="text-xs text-gray-500 mt-3">
          Showing the first {fmt.format(TABLE_RENDER_CAP)} matching rows for performance. Narrow the filters to see the rest.
        </p>
      )}
    </div>
  )
}

function sortValue(e: EnrichedEntry, key: SortKey): string {
  switch (key) {
    case 'name': return (e.name ?? '').toLowerCase()
    case 'group': return (e.group ?? '').toLowerCase()
    case 'country': return (e.__countryName ?? 'zzz').toLowerCase()
    case 'type': return e.__type
  }
}

function Th({ label, sortKey, current, dir, onClick }: { label: string; sortKey: SortKey; current: SortKey; dir: SortDir; onClick: (k: SortKey) => void }) {
  const active = current === sortKey
  return (
    <th className="px-3 py-3 text-left font-bold cursor-pointer select-none hover:text-white" onClick={() => onClick(sortKey)}>
      {label}
      {active && <i className={`fa-solid ${dir === 'asc' ? 'fa-arrow-up' : 'fa-arrow-down'} ml-1.5 text-[#00E5FF]`} aria-hidden="true" />}
    </th>
  )
}

function TypePill({ type }: { type: StreamType }) {
  const map: Record<StreamType, { label: string; cls: string }> = {
    live: { label: 'Live', cls: 'bg-[#00E5FF]/15 text-[#00E5FF] border-[#00E5FF]/40' },
    movie: { label: 'Movie', cls: 'bg-emerald-500/15 text-emerald-300 border-emerald-400/40' },
    series: { label: 'Series', cls: 'bg-amber-500/15 text-amber-300 border-amber-400/40' },
    unknown: { label: 'Unknown', cls: 'bg-white/5 text-gray-400 border-white/15' },
  }
  const s = map[type]
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold border ${s.cls}`}>{s.label}</span>
}
