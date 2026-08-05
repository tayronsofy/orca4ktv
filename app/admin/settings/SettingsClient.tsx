'use client'

import { useState, useEffect } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import FlashBanner, { type Flash } from '@/components/admin/FlashBanner'
import { cardCls, inputCls, labelCls, primaryBtnCls, secondaryBtnCls } from '@/components/admin/ui'

export default function SettingsClient() {
  const [flash, setFlash] = useState<Flash | null>(null)
  const [loading, setLoading] = useState(true)
  const [state, setState] = useState<'idle' | 'saving' | 'testing'>('idle')
  const [hasPassword, setHasPassword] = useState(false)
  const [testResult, setTestResult] = useState('')

  const [form, setForm] = useState({
    host: 'smtp.hostinger.com',
    port: '465',
    secure: true,
    smtp_user: '',
    smtp_pass: '',
    from_name: 'Orca 4K TV',
    from_email: '',
    reply_to: '',
    admin_email: '',
  })

  useEffect(() => {
    fetch('/api/admin/settings/smtp')
      .then(r => r.json())
      .then(data => {
        const s = data.settings || {}
        setForm(f => ({
          ...f,
          host: s.host || 'smtp.hostinger.com',
          port: String(s.port || 465),
          secure: s.secure !== false,
          smtp_user: s.smtp_user || '',
          smtp_pass: '',
          from_name: s.from_name || 'Orca 4K TV',
          from_email: s.from_email || '',
          reply_to: s.reply_to || '',
          admin_email: s.admin_email || '',
        }))
        setHasPassword(!!s.has_password)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function save(): Promise<boolean> {
    const res = await fetch('/api/admin/settings/smtp', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, port: Number(form.port) }),
    })
    const data = await res.json()
    if (!res.ok) {
      setFlash({ kind: 'error', text: `Save failed: ${data.detail || data.error}` })
      return false
    }
    if (form.smtp_pass) setHasPassword(true)
    setForm(f => ({ ...f, smtp_pass: '' }))
    return true
  }

  async function handleSave() {
    setState('saving')
    setTestResult('')
    if (await save()) setFlash({ kind: 'success', text: 'SMTP settings saved' })
    setState('idle')
  }

  async function handleSaveAndTest() {
    setState('testing')
    setTestResult('')
    if (!(await save())) { setState('idle'); return }
    const res = await fetch('/api/admin/settings/smtp/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    const data = await res.json()
    if (res.ok) {
      setFlash({ kind: 'success', text: `Test email sent to ${data.to}` })
      setTestResult(`✓ Sent to ${data.to} — check the inbox (and spam folder).`)
    } else {
      setFlash({ kind: 'error', text: 'Test email failed' })
      setTestResult(`✕ SMTP error: ${data.detail || data.error}`)
    }
    setState('idle')
  }

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  return (
    <AdminShell title="Settings">
      <FlashBanner flash={flash} onDismiss={() => setFlash(null)} />

      {loading ? (
        <div className="text-gray-400">Loading…</div>
      ) : (
        <div className="max-w-2xl space-y-6">
          {/* SMTP card */}
          <div className={`${cardCls} space-y-4`}>
            <h2 className="text-white font-bold flex items-center gap-2">
              <i className="fas fa-envelope text-amber-400"></i> SMTP Server
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_120px_110px] gap-4">
              <div>
                <label className={labelCls}>Host</label>
                <input type="text" value={form.host} onChange={e => set('host', e.target.value)} className={inputCls} placeholder="smtp.hostinger.com" />
              </div>
              <div>
                <label className={labelCls}>Port</label>
                <input type="number" value={form.port} onChange={e => set('port', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>SSL</label>
                <button
                  onClick={() => set('secure', !form.secure)}
                  className={`w-full py-2.5 rounded-xl text-sm font-bold border transition-colors ${
                    form.secure ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-white/5 border-white/10 text-gray-400'
                  }`}
                >
                  {form.secure ? 'SSL on' : 'SSL off'}
                </button>
              </div>
            </div>
            <div>
              <label className={labelCls}>Username (mailbox)</label>
              <input type="text" value={form.smtp_user} onChange={e => set('smtp_user', e.target.value)} className={inputCls} placeholder="support@orca4ktv.com" />
            </div>
            <div>
              <label className={labelCls}>Password</label>
              <input
                type="password"
                value={form.smtp_pass}
                onChange={e => set('smtp_pass', e.target.value)}
                className={inputCls}
                placeholder={hasPassword ? '••••••••  (unchanged — type to replace)' : 'Hostinger mailbox password'}
              />
              <p className="text-xs text-gray-600 mt-1.5">
                If the mailbox has 2FA enabled, use an app password instead of the account password.
              </p>
            </div>
          </div>

          {/* Sender card */}
          <div className={`${cardCls} space-y-4`}>
            <h2 className="text-white font-bold flex items-center gap-2">
              <i className="fas fa-id-card text-amber-400"></i> Sender Identity
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>From name</label>
                <input type="text" value={form.from_name} onChange={e => set('from_name', e.target.value)} className={inputCls} placeholder="Orca 4K TV" />
              </div>
              <div>
                <label className={labelCls}>From email</label>
                <input type="text" value={form.from_email} onChange={e => set('from_email', e.target.value)} className={inputCls} placeholder="support@orca4ktv.com" />
                <p className="text-xs text-gray-600 mt-1">Must match the mailbox (or a verified alias) or Hostinger rejects the send.</p>
              </div>
              <div>
                <label className={labelCls}>Reply-to</label>
                <input type="text" value={form.reply_to} onChange={e => set('reply_to', e.target.value)} className={inputCls} placeholder="support@orca4ktv.com" />
              </div>
              <div>
                <label className={labelCls}>Admin notification email</label>
                <input type="text" value={form.admin_email} onChange={e => set('admin_email', e.target.value)} className={inputCls} placeholder="where order/trial alerts go" />
              </div>
            </div>
          </div>

          {testResult && (
            <p className={`text-sm rounded-xl px-4 py-3 border font-mono ${
              testResult.startsWith('✓')
                ? 'text-green-300 bg-green-500/10 border-green-500/30'
                : 'text-red-300 bg-red-500/10 border-red-500/30'
            }`}>
              {testResult}
            </p>
          )}

          <div className="flex gap-3">
            <button onClick={handleSave} disabled={state !== 'idle'} className={secondaryBtnCls}>
              {state === 'saving' ? 'Saving…' : 'Save'}
            </button>
            <button onClick={handleSaveAndTest} disabled={state !== 'idle'} className={primaryBtnCls}>
              {state === 'testing' ? 'Sending test…' : 'Save & send test email'}
            </button>
          </div>
        </div>
      )}
    </AdminShell>
  )
}
