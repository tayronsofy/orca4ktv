'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import AdminShell from '@/components/admin/AdminShell'
import { inputCls, primaryBtnCls } from '@/components/admin/ui'

interface Client {
  id: string
  full_name: string
  email: string
  phone: string | null
  country: string | null
  created_at: string
  subscriptions: Array<{ status: string; end_date: string | null }>
}

export default function AdminClientsPage() {
  const [clients, setClients] = useState<Client[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchClients = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (search) params.set('search', search)
    const res = await fetch(`/api/admin/clients?${params}`)
    const data = await res.json()
    setClients(data.clients || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [page, search])

  useEffect(() => { fetchClients() }, [fetchClients])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const totalPages = Math.ceil(total / 50)

  const getSubStatus = (client: Client) => {
    const active = client.subscriptions?.find(s => s.status === 'active')
    if (active) return { label: 'Active', color: 'bg-green-500/20 text-green-400 border-green-500/30', expiry: active.end_date }
    if (client.subscriptions?.length > 0) return { label: 'Inactive', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30', expiry: null }
    return { label: 'No subscription', color: 'bg-white/5 text-gray-600 border-white/5', expiry: null }
  }

  return (
    <AdminShell title={`Clients (${total})`}>
      <form onSubmit={handleSearch} className="flex gap-2 mb-6">
        <input
          type="text"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          placeholder="Search by email or name…"
          className={`${inputCls} w-72`}
        />
        <button type="submit" className={primaryBtnCls}>
          Search
        </button>
        {search && (
          <button type="button" onClick={() => { setSearch(''); setSearchInput(''); setPage(1) }} className="text-gray-400 hover:text-white text-sm px-2">
            Clear
          </button>
        )}
      </form>

      <div className="bg-[#002952] rounded-2xl border border-white/5 overflow-hidden">
        <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 border-b border-white/5 text-xs text-gray-500 uppercase tracking-widest">
          <span className="col-span-2">Client</span>
          <span>Country</span>
          <span>Subscription</span>
          <span>Joined</span>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-gray-500">Loading…</div>
        ) : clients.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">No clients found</div>
        ) : (
          clients.map(client => {
            const sub = getSubStatus(client)
            return (
              <Link
                key={client.id}
                href={`/admin/clients/${client.id}`}
                className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="md:col-span-2">
                  <p className="text-white text-sm font-medium">{client.full_name || '-'}</p>
                  <p className="text-gray-500 text-xs">{client.email}</p>
                  {client.phone && <p className="text-gray-600 text-xs">{client.phone}</p>}
                </div>
                <span className="text-gray-400 text-sm">{client.country || '-'}</span>
                <div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${sub.color}`}>
                    {sub.label}
                  </span>
                  {sub.expiry && (
                    <p className="text-gray-600 text-xs mt-1">
                      Exp. {new Date(sub.expiry).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: '2-digit' })}
                    </p>
                  )}
                </div>
                <span className="text-gray-500 text-xs">
                  {new Date(client.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </Link>
            )
          })
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="bg-[#002952] text-gray-400 px-4 py-2 rounded-xl text-sm hover:text-white disabled:opacity-30 transition-colors">
            ← Previous
          </button>
          <span className="text-gray-400 text-sm">Page {page} of {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="bg-[#002952] text-gray-400 px-4 py-2 rounded-xl text-sm hover:text-white disabled:opacity-30 transition-colors">
            Next →
          </button>
        </div>
      )}
    </AdminShell>
  )
}
