'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import { cardCls, inputCls } from '@/components/admin/ui'

interface PanelData {
  configured: boolean
  requiredEnv?: string[]
  reseller?: { username: string; credits: string } | null
  resellerError?: string | null
  packages?: { id: string; name: string }[]
  packagesError?: string | null
  defaultPackage?: string
  error?: string
  detail?: string
}

export default function PanelClient() {
  const [data, setData] = useState<PanelData | null>(null)
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('')
  const [copied, setCopied] = useState('')

  useEffect(() => {
    fetch('/api/admin/panel')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => { setData({ configured: true, error: 'panel_error', detail: 'Network error' }); setLoading(false) })
  }, [])

  const copyId = (id: string) => {
    navigator.clipboard.writeText(id)
    setCopied(id)
    setTimeout(() => setCopied(''), 1500)
  }

  const filteredPackages = (data?.packages || []).filter(
    p => !filter || p.name.toLowerCase().includes(filter.toLowerCase()) || p.id.includes(filter)
  )

  return (
    <AdminShell title="Panel Diagnostics">
      {loading ? (
        <div className="text-gray-400">Checking panel connection…</div>
      ) : !data ? null : !data.configured ? (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6">
          <h2 className="text-yellow-300 font-bold mb-2"><i className="fas fa-triangle-exclamation mr-2"></i>Panel not configured</h2>
          <p className="text-gray-300 text-sm mb-3">Set these environment variables to enable auto-provisioning:</p>
          <ul className="text-sm text-yellow-200 font-mono space-y-1">
            {(data.requiredEnv || []).map(v => <li key={v}>· {v}</li>)}
          </ul>
        </div>
      ) : data.error ? (
        <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6">
          <h2 className="text-red-300 font-bold mb-2"><i className="fas fa-circle-xmark mr-2"></i>Panel API error</h2>
          <p className="text-gray-300 text-sm font-mono">{data.detail || data.error}</p>
        </div>
      ) : (
        <>
          {/* Stat cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            <div className={cardCls}>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Credits</p>
              <p className="text-3xl font-black text-amber-400">{data.reseller?.credits ?? '?'}</p>
              {data.resellerError && <p className="text-xs text-red-400 mt-2">{data.resellerError}</p>}
            </div>
            <div className={cardCls}>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Reseller</p>
              <p className="text-xl font-bold text-white truncate">{data.reseller?.username || '-'}</p>
            </div>
            <div className={cardCls}>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Packages</p>
              <p className="text-3xl font-black text-white">{data.packages?.length ?? 0}</p>
              <p className="text-xs text-gray-500 mt-1">default: <span className="font-mono text-amber-300">{data.defaultPackage}</span></p>
            </div>
          </div>

          {/* Packages */}
          <div className={cardCls}>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h2 className="text-white font-bold">Package list</h2>
              <input
                type="text"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                placeholder="Filter packages…"
                className={`${inputCls} w-64`}
              />
            </div>
            {data.packagesError ? (
              <p className="text-sm text-red-400">{data.packagesError}</p>
            ) : filteredPackages.length === 0 ? (
              <p className="text-sm text-gray-500">No packages {filter ? 'match the filter' : 'returned by the panel'}.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wider text-gray-500 border-b border-white/5">
                      <th className="py-2 pr-4">ID</th>
                      <th className="py-2">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPackages.map(p => (
                      <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                        <td className="py-2 pr-4">
                          <button
                            onClick={() => copyId(p.id)}
                            title="Copy ID"
                            className="font-mono text-amber-300 hover:text-amber-200"
                          >
                            {p.id} {copied === p.id ? '✓' : <i className="far fa-copy text-xs opacity-50"></i>}
                          </button>
                        </td>
                        <td className="py-2 text-gray-300">{p.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </AdminShell>
  )
}
