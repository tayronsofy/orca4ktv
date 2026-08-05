'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import StatusBadge from '@/components/admin/StatusBadge'

interface Profile {
  id: string
  full_name: string
  email: string
  phone: string | null
  country: string | null
  created_at: string
}

interface Order {
  id: string
  plan_name: string
  connections: number
  amount: number
  status: string
  created_at: string
  invoices: Array<{ invoice_number: string; status: string; payment_link: string | null }>
  subscriptions: Array<{ status: string; end_date: string | null; iptv_username: string | null }>
}

export default function ClientDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [profile, setProfile] = useState<Profile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/admin/clients/${id}`)
      .then(r => r.json())
      .then(data => {
        setProfile(data.profile)
        setOrders(data.orders || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  if (loading) return <AdminShell title="Client"><div className="text-gray-400">Loading…</div></AdminShell>
  if (!profile) return <AdminShell title="Client"><div className="text-red-400">Client not found</div></AdminShell>

  const activeSub = orders.flatMap(o => o.subscriptions).find(s => s.status === 'active')

  return (
    <AdminShell
      title={profile.full_name || 'Unknown'}
      actions={
        activeSub ? (
          <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold px-3 py-1 rounded-full">
            Active Subscription
          </span>
        ) : (
          <span className="bg-gray-500/20 text-gray-400 border border-gray-500/20 text-xs font-bold px-3 py-1 rounded-full">
            No active sub
          </span>
        )
      }
    >
      <div className="max-w-5xl">
      <Link href="/admin/clients" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">
        ← Back to clients
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Profile info */}
        <div className="bg-[#002952] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold mb-4">Profile</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Name</dt><dd className="text-white">{profile.full_name || '-'}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Email</dt><dd className="text-blue-400">{profile.email}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Phone</dt><dd className="text-white">{profile.phone || '-'}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Country</dt><dd className="text-white">{profile.country || '-'}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Member since</dt><dd className="text-white">{new Date(profile.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</dd></div>
          </dl>
        </div>

        {/* Active subscription */}
        <div className="bg-[#002952] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold mb-4">Active Subscription</h2>
          {activeSub ? (
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-gray-500">Username</dt><dd className="text-white font-mono">{activeSub.iptv_username || '-'}</dd></div>
              <div className="flex justify-between"><dt className="text-gray-500">Expires</dt><dd className="text-white">{activeSub.end_date ? new Date(activeSub.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '-'}</dd></div>
            </dl>
          ) : (
            <p className="text-gray-500 text-sm">No active subscription.</p>
          )}
        </div>
      </div>

      {/* Orders */}
      <h2 className="text-white font-bold mb-4">Order History ({orders.length})</h2>
      {orders.length === 0 ? (
        <div className="bg-[#002952] rounded-2xl p-6 border border-white/5 text-center text-gray-500 text-sm">
          No orders yet.
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => {
            const invoice = order.invoices?.[0]
            const sub = order.subscriptions?.[0]
            return (
              <div key={order.id} className="bg-[#002952] rounded-2xl p-5 border border-white/5">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="text-white font-bold">{order.plan_name}</p>
                    {invoice && (
                      <p className="text-gray-500 text-xs font-mono">{invoice.invoice_number}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-bold">${order.amount}</span>
                    <StatusBadge status={order.status} />
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="text-xs text-amber-300 hover:text-amber-200 bg-amber-500/10 px-3 py-1 rounded-lg border border-amber-500/20"
                    >
                      Manage →
                    </Link>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-gray-500">
                  <div><span className="text-gray-600">Connections:</span> <span className="text-gray-300">{order.connections}</span></div>
                  <div><span className="text-gray-600">Date:</span> <span className="text-gray-300">{new Date(order.created_at).toLocaleDateString()}</span></div>
                  {sub?.end_date && <div><span className="text-gray-600">Expires:</span> <span className="text-gray-300">{sub.end_date}</span></div>}
                  {invoice?.payment_link && (
                    <a href={invoice.payment_link} target="_blank" rel="noopener noreferrer" className="text-green-400 hover:text-green-300">
                      Payment link ↗
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
      </div>
    </AdminShell>
  )
}
