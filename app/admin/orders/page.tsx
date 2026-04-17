'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const STATUS_OPTIONS = ['all', 'pending_payment', 'paid', 'active', 'expired', 'cancelled']

const statusStyle: Record<string, string> = {
  pending_payment: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  paid:            'bg-blue-500/20 text-blue-400 border-blue-500/30',
  active:          'bg-green-500/20 text-green-400 border-green-500/30',
  expired:         'bg-gray-500/20 text-gray-400 border-gray-500/30',
  cancelled:       'bg-red-500/20 text-red-400 border-red-500/30',
}

const statusLabel: Record<string, string> = {
  pending_payment: 'Pending',
  paid:            'Paid',
  active:          'Active',
  expired:         'Expired',
  cancelled:       'Cancelled',
}

interface Order {
  id: string
  plan_name: string
  connections: number
  amount: number
  status: string
  created_at: string
  profiles: { full_name: string; email: string }
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [status, setStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [searchInput, setSearchInput] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchOrders = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page), status })
    if (search) params.set('search', search)

    const res = await fetch(`/api/admin/orders?${params}`)
    const data = await res.json()
    setOrders(data.orders || [])
    setTotal(data.total || 0)
    setLoading(false)
  }, [page, status, search])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setSearch(searchInput)
    setPage(1)
  }

  const totalPages = Math.ceil(total / 50)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Orders</h1>
          <p className="text-gray-400 text-sm mt-1">{total} total orders</p>
        </div>
        <Link href="/admin/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Back to dashboard
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Search by email…"
            className="bg-[#2c3034] border border-white/10 rounded-xl px-4 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 w-64"
          />
          <button type="submit" className="bg-purple-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-purple-500 transition-colors">
            Search
          </button>
          {search && (
            <button type="button" onClick={() => { setSearch(''); setSearchInput(''); setPage(1) }} className="text-gray-400 hover:text-white text-sm px-2">
              Clear
            </button>
          )}
        </form>

        <div className="flex gap-2 flex-wrap">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => { setStatus(s); setPage(1) }}
              className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${
                status === s ? 'bg-purple-600 text-white' : 'bg-[#2c3034] text-gray-400 hover:text-white border border-white/5'
              }`}
            >
              {s === 'all' ? 'All' : statusLabel[s]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#2c3034] rounded-2xl border border-white/5 overflow-hidden">
        <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-3 border-b border-white/5 text-xs text-gray-500 uppercase tracking-widest">
          <span className="col-span-2">Customer</span>
          <span>Plan</span>
          <span>Amount</span>
          <span>Status</span>
          <span>Date</span>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-gray-500">Loading…</div>
        ) : orders.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">No orders found</div>
        ) : (
          orders.map(order => (
            <Link
              key={order.id}
              href={`/admin/orders/${order.id}`}
              className="grid grid-cols-1 md:grid-cols-6 gap-2 md:gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="md:col-span-2">
                <p className="text-white text-sm font-medium">{order.profiles?.full_name || '—'}</p>
                <p className="text-gray-500 text-xs">{order.profiles?.email || '—'}</p>
              </div>
              <div>
                <p className="text-gray-300 text-sm">{order.plan_name}</p>
                <p className="text-gray-600 text-xs">{order.connections} connection{order.connections > 1 ? 's' : ''}</p>
              </div>
              <span className="text-white font-bold text-sm">${order.amount}</span>
              <span className={`inline-flex items-center self-start px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusStyle[order.status] || statusStyle.cancelled}`}>
                {statusLabel[order.status] || order.status}
              </span>
              <span className="text-gray-500 text-xs">
                {new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </Link>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="bg-[#2c3034] text-gray-400 px-4 py-2 rounded-xl text-sm hover:text-white disabled:opacity-30 transition-colors"
          >
            ← Previous
          </button>
          <span className="text-gray-400 text-sm">Page {page} of {totalPages}</span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="bg-[#2c3034] text-gray-400 px-4 py-2 rounded-xl text-sm hover:text-white disabled:opacity-30 transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  )
}
