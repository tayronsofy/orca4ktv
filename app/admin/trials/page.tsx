'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

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

interface TrialAccount {
  id: string
  label: string
  iptv_username: string
  iptv_password: string
  m3u_url: string
  portal_url: string | null
  status: 'available' | 'in_use' | 'disabled'
  assigned_trial_id: string | null
  created_at: string
}

interface Bouquet {
  id: string
  name: string
}

type SendMode = 'panel' | 'pool' | 'manual'

// ─── Helpers ──────────────────────────────────────────────────────────────────

const STATUS_OPTIONS = ['all', 'pending', 'sent', 'expired', 'rejected']

const trialStatusStyle: Record<string, string> = {
  pending:  'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  sent:     'bg-green-500/20 text-green-400 border-green-500/30',
  expired:  'bg-gray-500/20 text-gray-400 border-gray-500/30',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/30',
}

const trialStatusLabel: Record<string, string> = {
  pending: 'Pending', sent: 'Sent', expired: 'Expired', rejected: 'Rejected',
}

const accountStatusStyle: Record<string, string> = {
  available: 'bg-green-500/20 text-green-400 border-green-500/30',
  in_use:    'bg-blue-500/20 text-blue-400 border-blue-500/30',
  disabled:  'bg-gray-500/20 text-gray-400 border-gray-500/30',
}

const accountStatusLabel: Record<string, string> = {
  available: 'Available', in_use: 'In Use', disabled: 'Disabled',
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  return `${Math.floor(hrs / 24)}d ago`
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AdminTrialsPage() {
  const [activeTab, setActiveTab] = useState<'queue' | 'accounts'>('queue')

  // Trials queue state
  const [trials, setTrials] = useState<Trial[]>([])
  const [trialsLoading, setTrialsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')

  // Pool accounts state
  const [accounts, setAccounts] = useState<TrialAccount[]>([])
  const [accountsLoading, setAccountsLoading] = useState(true)

  // Bouquets from IPTV panel
  const [bouquets, setBouquets] = useState<Bouquet[]>([])
  const [bouquetsLoading, setBouquetsLoading] = useState(false)
  const [bouquetsError, setBouquetsError] = useState('')

  // Send modal
  const [selectedTrial, setSelectedTrial] = useState<Trial | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [sendMode, setSendMode] = useState<SendMode>('panel')
  const [selectedPackId, setSelectedPackId] = useState('')
  const [selectedAccountId, setSelectedAccountId] = useState('')
  const [manualForm, setManualForm] = useState({ iptv_username: '', iptv_password: '', m3u_url: '', portal_url: '' })
  const [duration, setDuration] = useState(24)
  const [sending, setSending] = useState(false)
  const [modalError, setModalError] = useState('')

  // Add account form state
  const [showAddAccount, setShowAddAccount] = useState(false)
  const [addForm, setAddForm] = useState({ label: '', iptv_username: '', iptv_password: '', m3u_url: '', portal_url: '' })
  const [addLoading, setAddLoading] = useState(false)
  const [addError, setAddError] = useState('')

  // ─── Fetch data ─────────────────────────────────────────────────────────────

  const fetchTrials = useCallback(async () => {
    setTrialsLoading(true)
    const res = await fetch(`/api/admin/trials?status=${statusFilter}`)
    const data = await res.json()
    setTrials(data.trials || [])
    setTrialsLoading(false)
  }, [statusFilter])

  const fetchAccounts = useCallback(async () => {
    setAccountsLoading(true)
    const res = await fetch('/api/admin/trial-accounts')
    const data = await res.json()
    setAccounts(data.accounts || [])
    setAccountsLoading(false)
  }, [])

  const fetchBouquets = useCallback(async () => {
    setBouquetsLoading(true)
    setBouquetsError('')
    try {
      const res = await fetch('/api/admin/iptv/bouquets')
      const data = await res.json()
      if (res.ok) {
        setBouquets(data.bouquets || [])
        if (data.bouquets?.length > 0) setSelectedPackId(data.bouquets[0].id)
      } else {
        setBouquetsError('Could not load packages from panel.')
      }
    } catch {
      setBouquetsError('Could not reach the panel.')
    } finally {
      setBouquetsLoading(false)
    }
  }, [])

  useEffect(() => { fetchTrials() }, [fetchTrials])
  useEffect(() => { fetchAccounts() }, [fetchAccounts])

  // ─── Send trial modal ────────────────────────────────────────────────────────

  const availableAccounts = accounts.filter(a => a.status === 'available')

  function openModal(trial: Trial) {
    setSelectedTrial(trial)
    setModalError('')
    setSendMode('panel')
    setDuration(24)
    setManualForm({ iptv_username: '', iptv_password: '', m3u_url: '', portal_url: '' })
    setSelectedAccountId(availableAccounts[0]?.id || '')
    setModalOpen(true)
    // Fetch bouquets fresh each time the modal opens
    fetchBouquets()
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

    const body: Record<string, string | number> = { duration_hours: duration, mode: sendMode }

    if (sendMode === 'panel') {
      if (!selectedPackId) { setModalError('Please select a package.'); setSending(false); return }
      body.pack_id = selectedPackId
    } else if (sendMode === 'pool') {
      const acc = accounts.find(a => a.id === selectedAccountId)
      if (!acc) { setModalError('Please select a trial account.'); setSending(false); return }
      body.iptv_username = acc.iptv_username
      body.iptv_password = acc.iptv_password
      body.m3u_url = acc.m3u_url
      body.portal_url = acc.portal_url || ''
      body.account_id = acc.id
    } else {
      body.iptv_username = manualForm.iptv_username
      body.iptv_password = manualForm.iptv_password
      body.m3u_url = manualForm.m3u_url
      body.portal_url = manualForm.portal_url
    }

    try {
      const res = await fetch(`/api/admin/trials/${selectedTrial.id}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (res.ok) {
        setTrials(prev => prev.map(t =>
          t.id === selectedTrial.id
            ? { ...t, status: 'sent', display_status: 'sent', sent_at: new Date().toISOString(), expires_at: data.expires_at }
            : t
        ))
        if (sendMode === 'pool' && selectedAccountId) {
          setAccounts(prev => prev.map(a =>
            a.id === selectedAccountId ? { ...a, status: 'in_use', assigned_trial_id: selectedTrial.id } : a
          ))
        }
        closeModal()
      } else {
        setModalError(data.message || 'Failed to send. Please try again.')
      }
    } catch {
      setModalError('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  // ─── Account management ──────────────────────────────────────────────────────

  async function handleAddAccount(e: React.FormEvent) {
    e.preventDefault()
    setAddLoading(true)
    setAddError('')
    try {
      const res = await fetch('/api/admin/trial-accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm),
      })
      const data = await res.json()
      if (res.ok) {
        setAccounts(prev => [...prev, data.account])
        setAddForm({ label: '', iptv_username: '', iptv_password: '', m3u_url: '', portal_url: '' })
        setShowAddAccount(false)
      } else {
        setAddError(data.message || 'Failed to add account.')
      }
    } catch {
      setAddError('Network error.')
    } finally {
      setAddLoading(false)
    }
  }

  async function handleStatusChange(accountId: string, newStatus: string) {
    const res = await fetch(`/api/admin/trial-accounts/${accountId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    if (res.ok) {
      setAccounts(prev => prev.map(a =>
        a.id === accountId
          ? { ...a, status: newStatus as TrialAccount['status'], assigned_trial_id: newStatus === 'available' ? null : a.assigned_trial_id }
          : a
      ))
    }
  }

  async function handleDeleteAccount(accountId: string) {
    if (!confirm('Delete this trial account?')) return
    const res = await fetch(`/api/admin/trial-accounts/${accountId}`, { method: 'DELETE' })
    if (res.ok) setAccounts(prev => prev.filter(a => a.id !== accountId))
  }

  // ─── Derived ─────────────────────────────────────────────────────────────────

  const pendingCount = trials.filter(t => t.status === 'pending').length
  const availableCount = availableAccounts.length

  const canSend =
    sendMode === 'panel' ? true :
    sendMode === 'pool' ? !!selectedAccountId :
    !!(manualForm.iptv_username && manualForm.iptv_password && manualForm.m3u_url)

  // ─── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-3">
            Trials
            {pendingCount > 0 && (
              <span className="text-xs font-bold bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 px-2 py-1 rounded-full">
                {pendingCount} pending
              </span>
            )}
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            {availableCount} pool account{availableCount !== 1 ? 's' : ''} available
          </p>
        </div>
        <Link href="/admin/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">
          ← Back to dashboard
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-[#2c3034] rounded-xl p-1 w-fit">
        {(['queue', 'accounts'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab ? 'bg-purple-600 text-white' : 'text-gray-400 hover:text-white'}`}
          >
            {tab === 'queue' ? 'Queue' : 'Trial Accounts'}
            {tab === 'accounts' && availableCount > 0 && (
              <span className="ml-2 bg-green-500/30 text-green-400 text-xs px-1.5 py-0.5 rounded-full">{availableCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* ── Queue Tab ─────────────────────────────────────────────────────────── */}
      {activeTab === 'queue' && (
        <>
          <div className="flex gap-2 flex-wrap mb-6">
            {STATUS_OPTIONS.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-xl text-xs font-bold uppercase tracking-wide transition-all ${
                  statusFilter === s ? 'bg-purple-600 text-white' : 'bg-[#2c3034] text-gray-400 hover:text-white border border-white/5'
                }`}
              >
                {s === 'all' ? 'All' : trialStatusLabel[s]}
              </button>
            ))}
          </div>

          <div className="bg-[#2c3034] rounded-2xl border border-white/5 overflow-hidden">
            <div className="hidden md:grid grid-cols-6 gap-4 px-6 py-3 border-b border-white/5 text-xs text-gray-500 uppercase tracking-widest">
              <span className="col-span-2">Name / Email</span>
              <span>Country</span>
              <span>Device</span>
              <span>Requested</span>
              <span>Action</span>
            </div>

            {trialsLoading ? (
              <div className="px-6 py-12 text-center text-gray-500">Loading…</div>
            ) : trials.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500">
                No {statusFilter !== 'all' ? trialStatusLabel[statusFilter]?.toLowerCase() : ''} trial requests.
              </div>
            ) : (
              trials.map(trial => (
                <div key={trial.id}
                  className="grid md:grid-cols-6 gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors items-center"
                >
                  <div className="md:col-span-2">
                    <p className="text-white font-semibold text-sm">{trial.name}</p>
                    <p className="text-purple-400 text-xs">{trial.email}</p>
                    {trial.message && (
                      <p className="text-gray-500 text-xs mt-1 truncate max-w-[200px]" title={trial.message}>{trial.message}</p>
                    )}
                  </div>
                  <div className="text-gray-300 text-sm">{trial.country}</div>
                  <div className="text-gray-300 text-sm">{trial.device}</div>
                  <div className="text-gray-500 text-xs">{timeAgo(trial.created_at)}</div>
                  <div>
                    {trial.display_status === 'pending' ? (
                      <button onClick={() => openModal(trial)}
                        className="bg-gradient-to-r from-[#6d28d9] to-[#a855f7] text-white text-xs font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity whitespace-nowrap"
                      >
                        Send Trial ▶
                      </button>
                    ) : (
                      <span className={`text-xs font-bold px-2 py-1 rounded-full border ${trialStatusStyle[trial.display_status] || trialStatusStyle.expired}`}>
                        {trialStatusLabel[trial.display_status] || trial.display_status}
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
        </>
      )}

      {/* ── Trial Accounts Tab ────────────────────────────────────────────────── */}
      {activeTab === 'accounts' && (
        <>
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-400 text-sm">{accounts.length} account{accounts.length !== 1 ? 's' : ''} in pool</p>
            <button onClick={() => setShowAddAccount(v => !v)}
              className="bg-gradient-to-r from-[#6d28d9] to-[#a855f7] text-white text-sm font-black px-5 py-2 rounded-xl hover:opacity-90 transition-opacity"
            >
              + Add Account
            </button>
          </div>

          {showAddAccount && (
            <form onSubmit={handleAddAccount} className="bg-[#2c3034] border border-purple-500/30 rounded-2xl p-6 mb-6 space-y-4">
              <h3 className="text-white font-black text-sm uppercase tracking-wide">New Trial Account</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">Label *</label>
                  <input required type="text" value={addForm.label} onChange={e => setAddForm(f => ({ ...f, label: e.target.value }))}
                    className="w-full bg-[#1f2326] border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                    placeholder="Trial Account #1" />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">IPTV Username *</label>
                  <input required type="text" value={addForm.iptv_username} onChange={e => setAddForm(f => ({ ...f, iptv_username: e.target.value }))}
                    className="w-full bg-[#1f2326] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-purple-500"
                    placeholder="username" />
                </div>
                <div>
                  <label className="block text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">IPTV Password *</label>
                  <input required type="text" value={addForm.iptv_password} onChange={e => setAddForm(f => ({ ...f, iptv_password: e.target.value }))}
                    className="w-full bg-[#1f2326] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-purple-500"
                    placeholder="password" />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">M3U URL *</label>
                  <input required type="text" value={addForm.m3u_url} onChange={e => setAddForm(f => ({ ...f, m3u_url: e.target.value }))}
                    className="w-full bg-[#1f2326] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-purple-500"
                    placeholder="http://server.example.com:8080/get.php?username=…" />
                </div>
                <div className="col-span-2">
                  <label className="block text-gray-400 text-xs font-semibold mb-1 uppercase tracking-wide">Portal URL <span className="text-gray-600 normal-case">(optional)</span></label>
                  <input type="text" value={addForm.portal_url} onChange={e => setAddForm(f => ({ ...f, portal_url: e.target.value }))}
                    className="w-full bg-[#1f2326] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-purple-500"
                    placeholder="http://server.example.com:8080" />
                </div>
              </div>
              {addError && <p className="text-red-400 text-sm">{addError}</p>}
              <div className="flex gap-3 justify-end">
                <button type="button" onClick={() => setShowAddAccount(false)} className="text-gray-400 hover:text-white text-sm px-4 py-2 border border-white/10 rounded-xl">Cancel</button>
                <button type="submit" disabled={addLoading} className="bg-purple-600 text-white text-sm font-bold px-6 py-2 rounded-xl hover:bg-purple-500 disabled:opacity-50">
                  {addLoading ? 'Saving…' : 'Save Account'}
                </button>
              </div>
            </form>
          )}

          <div className="space-y-3">
            {accountsLoading ? (
              <div className="text-center text-gray-500 py-10">Loading…</div>
            ) : accounts.length === 0 ? (
              <div className="text-center text-gray-500 py-10 bg-[#2c3034] rounded-2xl border border-white/5">
                No trial accounts yet. Add one above.
              </div>
            ) : (
              accounts.map(account => (
                <div key={account.id} className="bg-[#2c3034] rounded-2xl border border-white/5 px-6 py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white font-bold text-sm">{account.label}</span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-full border ${accountStatusStyle[account.status]}`}>
                          {accountStatusLabel[account.status]}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-1 text-xs">
                        <div><span className="text-gray-500">Username: </span><span className="text-gray-300 font-mono">{account.iptv_username}</span></div>
                        <div><span className="text-gray-500">Password: </span><span className="text-gray-300 font-mono">{account.iptv_password}</span></div>
                        <div className="md:col-span-3"><span className="text-gray-500">M3U: </span><span className="text-blue-400 font-mono break-all">{account.m3u_url}</span></div>
                        {account.portal_url && <div className="md:col-span-3"><span className="text-gray-500">Portal: </span><span className="text-blue-400 font-mono">{account.portal_url}</span></div>}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 shrink-0">
                      {account.status === 'in_use' && (
                        <button onClick={() => handleStatusChange(account.id, 'available')} className="text-xs text-green-400 hover:text-green-300 border border-green-500/30 px-3 py-1.5 rounded-lg transition-colors">Mark Available</button>
                      )}
                      {account.status === 'available' && (
                        <button onClick={() => handleStatusChange(account.id, 'disabled')} className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1.5 rounded-lg transition-colors">Disable</button>
                      )}
                      {account.status === 'disabled' && (
                        <button onClick={() => handleStatusChange(account.id, 'available')} className="text-xs text-green-400 hover:text-green-300 border border-green-500/30 px-3 py-1.5 rounded-lg transition-colors">Enable</button>
                      )}
                      <button onClick={() => handleDeleteAccount(account.id)} className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 px-3 py-1.5 rounded-lg transition-colors">Delete</button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* ── Send Trial Modal ──────────────────────────────────────────────────── */}
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

              {/* Mode selector */}
              <div>
                <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wide">Credential Source</label>
                <div className="grid grid-cols-3 gap-2">
                  {([
                    { value: 'panel', label: '⚡ Panel API', desc: 'Auto-create' },
                    { value: 'pool', label: '🗂 Pool', desc: `${availableCount} available` },
                    { value: 'manual', label: '✏️ Manual', desc: 'Paste creds' },
                  ] as const).map(opt => (
                    <button key={opt.value} onClick={() => setSendMode(opt.value)}
                      className={`p-3 rounded-xl border text-left transition-all ${sendMode === opt.value ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 bg-[#2c3034] hover:border-white/20'}`}
                    >
                      <div className="text-white text-xs font-bold">{opt.label}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{opt.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Panel mode: info box */}
              {sendMode === 'panel' && (
                <div className="bg-[#2c3034] rounded-xl px-4 py-3 flex items-start gap-3">
                  <span className="text-2xl leading-none mt-0.5">⚡</span>
                  <div>
                    <p className="text-white text-sm font-semibold">Auto-create via ActivationPanel</p>
                    <p className="text-gray-400 text-xs mt-1">A demo account (all channels) will be created automatically. Trial duration is <strong className="text-white">12 hours</strong>, set by your panel.</p>
                  </div>
                </div>
              )}

              {/* Pool mode: account picker */}
              {sendMode === 'pool' && (
                <div>
                  <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wide">
                    Trial Account <span className="text-gray-600 font-normal normal-case">({availableCount} available)</span>
                  </label>
                  {availableAccounts.length === 0 ? (
                    <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 text-sm text-yellow-300">
                      No available accounts in the pool.{' '}
                      <button onClick={() => { closeModal(); setActiveTab('accounts') }} className="underline">Add one</button> or use Panel API mode.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {availableAccounts.map(acc => (
                        <label key={acc.id} className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selectedAccountId === acc.id ? 'border-purple-500 bg-purple-500/10' : 'border-white/10 bg-[#2c3034] hover:border-white/20'}`}>
                          <input type="radio" name="account" value={acc.id} checked={selectedAccountId === acc.id} onChange={() => setSelectedAccountId(acc.id)} className="mt-0.5 accent-purple-500" />
                          <div className="min-w-0">
                            <p className="text-white text-sm font-semibold">{acc.label}</p>
                            <p className="text-gray-400 text-xs font-mono">{acc.iptv_username} / {acc.iptv_password}</p>
                          </div>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Manual mode */}
              {sendMode === 'manual' && (
                <div className="space-y-3">
                  <input type="text" value={manualForm.iptv_username} onChange={e => setManualForm(f => ({ ...f, iptv_username: e.target.value }))}
                    className="w-full bg-[#2c3034] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-purple-500" placeholder="IPTV Username *" />
                  <input type="text" value={manualForm.iptv_password} onChange={e => setManualForm(f => ({ ...f, iptv_password: e.target.value }))}
                    className="w-full bg-[#2c3034] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-purple-500" placeholder="IPTV Password *" />
                  <input type="text" value={manualForm.m3u_url} onChange={e => setManualForm(f => ({ ...f, m3u_url: e.target.value }))}
                    className="w-full bg-[#2c3034] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-purple-500" placeholder="M3U URL *" />
                  <input type="text" value={manualForm.portal_url} onChange={e => setManualForm(f => ({ ...f, portal_url: e.target.value }))}
                    className="w-full bg-[#2c3034] border border-white/10 rounded-xl px-4 py-3 text-white text-sm font-mono focus:outline-none focus:border-purple-500" placeholder="Portal URL (optional)" />
                </div>
              )}

              {/* Duration — hidden for panel mode (fixed at 12h by panel) */}
              {sendMode !== 'panel' && (
                <div>
                  <label className="block text-gray-300 text-xs font-semibold mb-2 uppercase tracking-wide">Trial Duration</label>
                  <div className="flex gap-3">
                    {[24, 48, 72].map(h => (
                      <label key={h} className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="duration" value={h} checked={duration === h} onChange={() => setDuration(h)} className="accent-purple-500" />
                        <span className="text-gray-300 text-sm">{h}h</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {modalError && (
                <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{modalError}</p>
              )}
            </div>

            <div className="px-6 py-4 border-t border-white/10 flex gap-3 justify-end">
              <button onClick={closeModal} disabled={sending}
                className="text-gray-400 hover:text-white text-sm font-semibold px-4 py-2 rounded-xl border border-white/10 transition-colors disabled:opacity-50">
                Cancel
              </button>
              <button onClick={handleSend} disabled={sending || !canSend}
                className="bg-gradient-to-r from-[#6d28d9] to-[#a855f7] text-white text-sm font-black px-6 py-2 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {sending
                  ? (sendMode === 'panel' ? 'Creating account…' : 'Sending…')
                  : (sendMode === 'panel' ? 'Create & Send Trial' : 'Send Trial Email')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
