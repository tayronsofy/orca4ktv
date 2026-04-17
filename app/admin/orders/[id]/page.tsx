'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface OrderData {
  id: string
  plan_name: string
  plan_slug: string
  connections: number
  amount: number
  status: string
  notes: string | null
  created_at: string
  profiles: {
    id: string
    full_name: string
    email: string
    phone: string | null
    country: string | null
  }
  invoices: Array<{
    id: string
    invoice_number: string
    amount: number
    status: string
    payment_link: string | null
    paid_at: string | null
  }>
  subscriptions: Array<{
    id: string
    iptv_username: string | null
    iptv_password: string | null
    m3u_url: string | null
    portal_url: string | null
    mac_addresses: string[] | null
    start_date: string | null
    end_date: string | null
    status: string
  }>
}

const statusLabel: Record<string, string> = {
  pending_payment: 'Awaiting Payment',
  paid: 'Paid',
  active: 'Active',
  expired: 'Expired',
  cancelled: 'Cancelled',
}

export default function OrderDetailPage() {
  const params = useParams()
  const id = params.id as string

  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null)

  // Invoice form state
  const [paymentLink, setPaymentLink] = useState('')
  const [invoiceStatus, setInvoiceStatus] = useState('')

  // Credentials form state
  const [creds, setCreds] = useState({
    iptv_username: '',
    iptv_password: '',
    m3u_url: '',
    portal_url: '',
    mac_addresses: '',
  })

  // Notes
  const [notes, setNotes] = useState('')

  useEffect(() => {
    fetch(`/api/admin/orders/${id}`)
      .then(r => r.json())
      .then(data => {
        setOrder(data)
        setPaymentLink(data.invoices?.[0]?.payment_link || '')
        setInvoiceStatus(data.invoices?.[0]?.status || 'pending')
        setNotes(data.notes || '')
        const sub = data.subscriptions?.[0]
        if (sub) {
          setCreds({
            iptv_username: sub.iptv_username || '',
            iptv_password: sub.iptv_password || '',
            m3u_url: sub.m3u_url || '',
            portal_url: sub.portal_url || '',
            mac_addresses: (sub.mac_addresses || []).join('\n'),
          })
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id])

  const notify = (text: string, type: 'success' | 'error' = 'success') => {
    setMsg({ text, type })
    setTimeout(() => setMsg(null), 4000)
  }

  const saveInvoice = async () => {
    setSaving(true)
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payment_link: paymentLink, invoice_status: invoiceStatus }),
    })
    setSaving(false)
    if (res.ok) {
      notify('Invoice updated')
      // Refresh order status if marked paid
      if (invoiceStatus === 'paid') {
        const updated = { ...order!, status: 'paid' }
        setOrder(updated)
      }
    } else {
      notify('Failed to update invoice', 'error')
    }
  }

  const saveCredentials = async () => {
    setSaving(true)
    const macs = creds.mac_addresses
      .split('\n')
      .map(m => m.trim())
      .filter(Boolean)

    const res = await fetch(`/api/admin/orders/${id}/credentials`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...creds, mac_addresses: macs }),
    })
    setSaving(false)
    const data = await res.json()
    if (res.ok) {
      notify(`Credentials saved. Expires ${data.end_date}`)
      // Refresh
      const fresh = await fetch(`/api/admin/orders/${id}`).then(r => r.json())
      setOrder(fresh)
    } else {
      notify(data.error || 'Failed to save credentials', 'error')
    }
  }

  const saveNotes = async () => {
    await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notes }),
    })
    notify('Notes saved')
  }

  const sendEmail = async (type: 'payment-link' | 'credentials') => {
    setSaving(true)
    const res = await fetch(`/api/admin/orders/${id}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    })
    setSaving(false)
    const data = await res.json()
    if (res.ok) notify(`Email sent: ${type === 'payment-link' ? 'payment link' : 'credentials'}`)
    else notify(data.error || 'Failed to send email', 'error')
  }

  const markStatus = async (newStatus: string) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    setOrder(o => o ? { ...o, status: newStatus } : o)
    notify(`Order marked as ${newStatus}`)
  }

  if (loading) return <div className="p-8 text-gray-400">Loading…</div>
  if (!order) return <div className="p-8 text-red-400">Order not found</div>

  const invoice = order.invoices?.[0]
  const sub = order.subscriptions?.[0]

  return (
    <div className="p-6 md:p-8 max-w-5xl">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <Link href="/admin/orders" className="text-sm text-gray-400 hover:text-white mb-2 inline-block">
            ← Back to orders
          </Link>
          <h1 className="text-2xl font-black text-white">Order Detail</h1>
          {invoice && (
            <p className="text-gray-400 text-sm mt-1 font-mono">{invoice.invoice_number}</p>
          )}
        </div>
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold border ${
          order.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
          order.status === 'pending_payment' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
          order.status === 'paid' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
          'bg-gray-500/20 text-gray-400 border-gray-500/30'
        }`}>
          {statusLabel[order.status] || order.status}
        </span>
      </div>

      {/* Toast */}
      {msg && (
        <div className={`mb-6 px-4 py-3 rounded-xl text-sm border ${
          msg.type === 'success' ? 'bg-green-500/10 text-green-400 border-green-500/30' : 'bg-red-500/10 text-red-400 border-red-500/30'
        }`}>
          {msg.type === 'success' ? <i className="fas fa-check mr-2"></i> : <i className="fas fa-exclamation mr-2"></i>}
          {msg.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Customer info */}
        <div className="bg-[#2c3034] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2"><i className="fas fa-user text-purple-400"></i> Customer</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Name</dt><dd className="text-white">{order.profiles?.full_name || '—'}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Email</dt><dd className="text-blue-400">{order.profiles?.email}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Phone</dt><dd className="text-white">{order.profiles?.phone || '—'}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Country</dt><dd className="text-white">{order.profiles?.country || '—'}</dd></div>
          </dl>
          <Link href={`/admin/clients/${order.profiles?.id}`} className="mt-4 inline-block text-xs text-purple-400 hover:text-purple-300">
            View client profile →
          </Link>
        </div>

        {/* Order info */}
        <div className="bg-[#2c3034] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2"><i className="fas fa-shopping-cart text-blue-400"></i> Order Details</h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-gray-500">Plan</dt><dd className="text-white">{order.plan_name}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Connections</dt><dd className="text-white">{order.connections}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Amount</dt><dd className="text-purple-400 font-bold text-lg">${order.amount}</dd></div>
            <div className="flex justify-between"><dt className="text-gray-500">Placed</dt><dd className="text-white">{new Date(order.created_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</dd></div>
          </dl>
          {/* Quick status actions */}
          {order.status === 'pending_payment' && (
            <button onClick={() => markStatus('paid')} className="mt-4 bg-blue-600 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-blue-500 transition-colors w-full">
              Mark as Paid
            </button>
          )}
          {order.status === 'paid' && (
            <button onClick={() => markStatus('active')} className="mt-4 bg-green-600 text-white text-xs font-bold px-3 py-2 rounded-xl hover:bg-green-500 transition-colors w-full">
              Mark as Active
            </button>
          )}
          {!['cancelled', 'expired'].includes(order.status) && (
            <button onClick={() => markStatus('cancelled')} className="mt-2 bg-red-500/20 text-red-400 text-xs font-bold px-3 py-2 rounded-xl hover:bg-red-500/30 transition-colors w-full border border-red-500/20">
              Cancel Order
            </button>
          )}
        </div>

        {/* Invoice / Payment Link */}
        <div className="bg-[#2c3034] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2"><i className="fas fa-file-invoice text-green-400"></i> Invoice & Payment</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Payment Link URL</label>
              <input
                type="url"
                value={paymentLink}
                onChange={e => setPaymentLink(e.target.value)}
                placeholder="https://paypal.me/... or payment URL"
                className="w-full bg-[#1f2326] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">Invoice Status</label>
              <select
                value={invoiceStatus}
                onChange={e => setInvoiceStatus(e.target.value)}
                className="w-full bg-[#1f2326] border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-purple-500"
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button onClick={saveInvoice} disabled={saving} className="flex-1 bg-white/10 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-white/15 transition-colors disabled:opacity-50">
                Save Invoice
              </button>
              <button onClick={() => sendEmail('payment-link')} disabled={saving || !paymentLink} className="flex-1 bg-green-600 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-green-500 transition-colors disabled:opacity-50">
                <i className="fas fa-paper-plane mr-1"></i> Send to Customer
              </button>
            </div>
          </div>
        </div>

        {/* IPTV Credentials */}
        <div className="bg-[#2c3034] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-key text-yellow-400"></i> IPTV Credentials
            {sub?.status === 'active' && (
              <span className="ml-auto text-xs text-green-400 bg-green-500/20 px-2 py-0.5 rounded-full border border-green-500/20">Active</span>
            )}
          </h2>
          {sub?.end_date && (
            <p className="text-xs text-gray-500 mb-3">Expires: <span className="text-gray-300">{sub.end_date}</span></p>
          )}
          <div className="space-y-3">
            {(['iptv_username', 'iptv_password', 'm3u_url', 'portal_url'] as const).map(field => (
              <div key={field}>
                <label className="block text-xs text-gray-500 mb-1.5 capitalize">{field.replace('_', ' ')}</label>
                <input
                  type={field === 'iptv_password' ? 'password' : 'text'}
                  value={creds[field]}
                  onChange={e => setCreds(c => ({ ...c, [field]: e.target.value }))}
                  placeholder={field === 'm3u_url' ? 'http://server.com/get.php?username=...&password=...&type=m3u' : field === 'portal_url' ? 'http://server.com (optional)' : ''}
                  className="w-full bg-[#1f2326] border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-mono placeholder-gray-700 focus:outline-none focus:border-purple-500"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs text-gray-500 mb-1.5">MAC Addresses (one per line, optional)</label>
              <textarea
                value={creds.mac_addresses}
                onChange={e => setCreds(c => ({ ...c, mac_addresses: e.target.value }))}
                placeholder={'00:1A:79:XX:XX:XX\n00:1A:79:YY:YY:YY'}
                rows={3}
                className="w-full bg-[#1f2326] border border-white/10 rounded-xl px-3 py-2 text-white text-sm font-mono placeholder-gray-700 focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>
            <div className="flex gap-2">
              <button onClick={saveCredentials} disabled={saving} className="flex-1 bg-yellow-500/20 text-yellow-400 text-sm font-bold py-2.5 rounded-xl hover:bg-yellow-500/30 transition-colors border border-yellow-500/20 disabled:opacity-50">
                Save Credentials
              </button>
              <button onClick={() => sendEmail('credentials')} disabled={saving || !creds.iptv_username} className="flex-1 bg-purple-600 text-white text-sm font-bold py-2.5 rounded-xl hover:bg-purple-500 transition-colors disabled:opacity-50">
                <i className="fas fa-paper-plane mr-1"></i> Send to Customer
              </button>
            </div>
          </div>
        </div>

        {/* Admin notes */}
        <div className="md:col-span-2 bg-[#2c3034] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2"><i className="fas fa-sticky-note text-gray-400"></i> Admin Notes</h2>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Internal notes about this order…"
            rows={3}
            className="w-full bg-[#1f2326] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-purple-500 resize-none"
          />
          <button onClick={saveNotes} className="mt-3 bg-white/10 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-white/15 transition-colors">
            Save Notes
          </button>
        </div>
      </div>
    </div>
  )
}
