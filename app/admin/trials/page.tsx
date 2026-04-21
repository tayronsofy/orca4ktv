'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

const STATUS_OPTIONS = ['all', 'pending', 'sent', 'expired', 'rejected']

const statusStyle: Record<string, string> = {
  pending:  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  sent:     'bg-green-500/20 text-green-400 border-green-500/30',
  expired:  'bg-gray-500/20 text-gray-400 border-gray-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
}

const statusLabel: Record<string, string> = {
  pending:  'Pending',
  sent:     'Sent',
  expired:  'Expired',
  rejected: 'Rejected',
}

interface Trial {
  id: string
  name: string
  email: string
  device: string
  country: string
  message: string | null
  status: string
  display_status: string
  duration_hours: number | null
  sent_at: string | null
  expires_at: string | null
  created_at: string
}

interface ModalState {
  iptv_username: string
  iptv_password: string
  m3u_url: string
  portal_url: string
  duration_hours: number
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export default function AdminTrialsPage() {
  const [trials, setTrials] = useState<Trial[]>([])
  const [total, setTotal] = useState(0)
  const [statusFilter, setStatusFilter] = useState('all')
  const [loading, setLoading] = useState(true)

  // Modal
  const [selectedTrial, setSelectedTrial] = useState<Trial | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [sending, setSending] = useState(false)
  const [modalError, setModalError] = useState('')
  const [form, setForm] = useState<ModalState>({
    iptv_username: '',
    iptv_password: '',
    m3u_url: '',
    portal_url: '',
    duration_hours: 24,
  })

  const fetchTrials = useCallback(async () => {
    setLoading(true)
    const params = new URLSearchParams({ status: statusFilter })
    const res = await fetch(`/api/admin/trials?${params}`)
    const data = await res.json()
    const list: Trial[] = data.trials || []
    setTrials(list)
    setTotal(list.length)
    setLoading(false)
  }, [statusFilter])

  useEffect(() => { fetchTrials() }, [fetchTrials])

  function openModal(trial: Trial) {
    setSelectedTrial(trial)
    setForm({ iptv_username: '', iptv_password: '', m3u_url: '', portal_url: '', duration_hours: 24 })
    setModalError('')
    setModalOpen(true)
  }

  function closeModal() {
    setModalOpen(false)
    setSelectedTrial(null)
    setModalError('')
  }

  async function handleSend() {
    if (!selectedTrial) return
    setSending(true)
    setModalError('')
    try {
      const res = await fetch(`/api/admin/trials/${selectedTrial.id}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (res.ok) {
        // Update row in local state
        setTrials(prev => prev.map(t =>
          t.id === selectedTrial.id
            ? { ...t, status: 'sent', display_status: 'sent', sent_at: new Date().toISOString(), expires_at: data.expires_at }
            : t
        ))
        closeModal()
      } else {
        setModalError(data.message || 'Failed to send trial. Please try again.')
      }
    } catch {
      setModalError('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const pendingCount = trials.filter(t => t.status === 'pending').length

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">
            Trials
            {pendingCount > 0 && (
              <span className="ml-3 text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded-full">
                {pendingCount} pending
              </span>
            )}
          </h1>
          <p className="text-gray-400 text-sm mt-1">{total} total requests</p>
        </div>
        <Link href="/admin/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Back to dashboard
        </Link>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-6">
        {STATUS_OPTIONS.map(s => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${
              statusFilter === s ? 'bg-purple-600 text-white' : 'bg-[#2c3034] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            {s === 'all' ? 'All' : statusLabel[s]}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#2c3034] rounded-2xl border border-white/5 overflow-hidden">
        <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-3 border-b border-white/5 text-xs text-gray-500 uppercase tracking-widest">
          <span className="col-span-2">Name / Email</span>
          <span>Country</span>
          <span>Device</span>
          <span>Requested</span>
          <span>Action</span>
        </div>

        {loading ? (
          <div className="px-6 py-12 text-center text-gray-500">Loading trials…</div>
        ) : trials.length === 0 ? (
          <div className="px-6 py-12 text-center text-gray-500">
            No {statusFilter !== 'all' ? statusLabel[statusFilter]?.toLowerCase() : ''} trial requests.
          </div>
        ) : (
          trials.map(trial => (
            <div
              key={trial.id}
              className="grid md:grid-cols-6 gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors items-center"
            >
              <div className="md:col-span-2">
                <p className="text-white font-semibold text-sm">{trial.name}</p>
                <p className="text-purple-400 text-xs">{trial.email}</p>
                {trial.message && (
                  <p className="text-gray-500 text-xs mt-1 truncate max-w-[200px]" title={trial.message}>
                    {trial.message}
                  </p>
                )}
              </div>

              <div className="text-gray-300 text-sm">{trial.country}</div>
              <div className="text-gray-300 text-sm">{trial.device}</div>
              <div className="text-gray-500 text-xs">{timeAgo(trial.created_at)}</div>

              <div className="flex items-center gap-2">
                {trial.display_status === 'pending' ? (
                  <button
                    onClick={() => openModal(trial)}
                    className="bg-gradient-to-r from-[#6d28d9] to-[#a855f7] text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
                  >
                    Send Trial ▶
                  </button>
                ) : (
                  <span className={`text-xs font-bold px-2 py-1 rounded-full border ${statusStyle[trial.display_status] || statusStyle.expired}`}>
                    {statusLabel[trial.display_status] || trial.display_status}
                    {trial.sent_at && trial.display_status === 'sent' && (
                      <span className="ml-1 font-normal opacity-70">{timeAgo(trial.sent_at)}</span>
                    )}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Send Trial Modal */}
      {modalOpen && selectedTrial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1f2326] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-white font-black text-lg">Send Trial</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-white text-xl leading-none">&times;</button>
            </div>

            <div className="px-6 py-5 space-y-5">
              {/* Request context */}
              <div className="bg-[#2c3034] rounded-xl p-4 text-sm space-y-1">
                <p className="text-white font-semibold">{selectedTrial.name}</p>
                <p className="text-purple-400">{selectedTrial.email}</p>
                <p className="text-gray-400">{selectedTrial.device} &middot; {selectedTrial.country}</p>
                {selectedTrial.message && (
                  <p className="text-gray-500 text-xs pt-1 border-t border-white/5 mt-2">{selectedTrial.message}</p>
                )}
              </div>

              {/* Credential inputs */}
              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1 uppercase tracking-wide">IPTV Username *</label>
                <input
                  type="text"
                  value={form.iptv_username}
                  onChange={e => setForm(f => ({ ...f, iptv_username: e.target.value }))}
                  className="w-full bg-[#2c3034] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-purple-500"
                  placeholder="trial_username"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1 uppercase tracking-wide">IPTV Password *</label>
                <input
                  type="text"
                  value={form.iptv_password}
                  onChange={e => setForm(f => ({ ...f, iptv_password: e.target.value }))}
                  className="w-full bg-[#2c3034] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-purple-500"
                  placeholder="trial_password"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1 uppercase tracking-wide">M3U URL *</label>
                <input
                  type="text"
                  value={form.m3u_url}
                  onChange={e => setForm(f => ({ ...f, m3u_url: e.target.value }))}
                  className="w-full bg-[#2c3034] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-purple-500"
                  placeholder="http://server.example.com:8080/get.php?username=…"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-1 uppercase tracking-wide">Portal URL <span className="text-gray-600 normal-case">(optional)</span></label>
                <input
                  type="text"
                  value={form.portal_url}
                  onChange={e => setForm(f => ({ ...f, portal_url: e.target.value }))}
                  className="w-full bg-[#2c3034] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-purple-500"
                  placeholder="http://server.example.com:8080"
                />
              </div>

              {/* Duration */}
              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wide">Trial Duration</label>
                <div className="flex gap-3">
                  {[24, 48, 72].map(h => (
                    <label key={h} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="duration"
                        value={h}
                        checked={form.duration_hours === h}
                        onChange={() => setForm(f => ({ ...f, duration_hours: h }))}
                        className="accent-purple-500"
                      />
                      <span className="text-gray-300 text-sm">{h}h</span>
                    </label>
                  ))}
                </div>
              </div>

              {modalError && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{modalError}</p>
              )}
            </div>

            <div className="px-6 py-4 border-t border-white/10 flex gap-3 justify-end">
              <button
                onClick={closeModal}
                disabled={sending}
                className="text-gray-400 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl border border-white/10 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={sending || !form.iptv_username || !form.iptv_password || !form.m3u_url}
                className="bg-gradient-to-r from-[#6d28d9] to-[#a855f7] text-white text-sm font-black px-6 py-2 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {sending ? 'Sending…' : 'Send Trial Email'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
