'use client'

import { useState, useEffect, useCallback } from 'react'
import AdminShell from '@/components/admin/AdminShell'
import StatusBadge from '@/components/admin/StatusBadge'
import SeoScorePanel from '@/components/admin/SeoScorePanel'
import FlashBanner, { type Flash } from '@/components/admin/FlashBanner'
import { analyzeSeo } from '@/lib/seo/analyzer'
import { cardCls, inputCls, labelCls, primaryBtnCls, secondaryBtnCls, dangerBtnCls } from '@/components/admin/ui'

type Tab = 'pages' | 'settings' | 'redirects'

interface Override {
  page_key: string
  meta_title: string | null
  meta_description: string | null
  canonical_url: string | null
  noindex: boolean | null
  nofollow: boolean | null
  og_title: string | null
  og_description: string | null
  og_image_url: string | null
  twitter_title: string | null
  twitter_description: string | null
  twitter_image_url: string | null
  focus_keyword: string | null
  schema_breadcrumb: boolean | null
  schema_faq: boolean | null
}

interface PageEntry {
  key: string
  path: string
  label: string
  defaultTitle: string
  defaultDescription: string
  override: Override | null
}

interface Redirect {
  id: string
  from_path: string
  to_path: string | null
  status_code: number
  enabled: boolean
  note: string | null
}

const EMPTY_FIELDS: Record<string, string | boolean> = {
  meta_title: '', meta_description: '', canonical_url: '',
  og_title: '', og_description: '', og_image_url: '',
  twitter_title: '', twitter_description: '', twitter_image_url: '',
  focus_keyword: '',
  noindex: false, nofollow: false, schema_breadcrumb: false, schema_faq: false,
}

export default function SeoClient() {
  const [tab, setTab] = useState<Tab>('pages')
  const [flash, setFlash] = useState<Flash | null>(null)

  // Pages
  const [pages, setPages] = useState<PageEntry[]>([])
  const [editing, setEditing] = useState<PageEntry | null>(null)
  const [fields, setFields] = useState<Record<string, string | boolean>>(EMPTY_FIELDS)
  const [fieldTab, setFieldTab] = useState<'general' | 'social' | 'advanced'>('general')
  const [serpMode, setSerpMode] = useState<'desktop' | 'mobile'>('desktop')
  const [saving, setSaving] = useState(false)

  // Settings
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [settingsLoaded, setSettingsLoaded] = useState(false)

  // Redirects
  const [redirects, setRedirects] = useState<Redirect[]>([])
  const [showRedirectForm, setShowRedirectForm] = useState(false)
  const [redirectForm, setRedirectForm] = useState({ from_path: '', to_path: '', status_code: '301', note: '' })

  const fetchPages = useCallback(async () => {
    const res = await fetch('/api/admin/seo/pages')
    const data = await res.json()
    if (res.ok) setPages(data.pages || [])
  }, [])

  const fetchSettings = useCallback(async () => {
    const res = await fetch('/api/admin/seo/settings')
    const data = await res.json()
    if (res.ok) {
      const s = data.settings || {}
      setSettings({
        title_template: s.title_template || '',
        default_og_image: s.default_og_image || '',
        social_same_as: Array.isArray(s.social_same_as) ? s.social_same_as.join('\n') : '',
        google_verification: s.google_verification || '',
        bing_verification: s.bing_verification || '',
        robots_extra_lines: s.robots_extra_lines || '',
        sitemap_exclusions: Array.isArray(s.sitemap_exclusions) ? s.sitemap_exclusions.join('\n') : '',
        default_blog_schema_type: s.default_blog_schema_type || '',
      })
      setSettingsLoaded(true)
    }
  }, [])

  const fetchRedirects = useCallback(async () => {
    const res = await fetch('/api/admin/seo/redirects')
    const data = await res.json()
    if (res.ok) setRedirects(data.redirects || [])
  }, [])

  useEffect(() => { fetchPages(); fetchSettings(); fetchRedirects() }, [fetchPages, fetchSettings, fetchRedirects])

  function openEditor(page: PageEntry) {
    setEditing(page)
    setFieldTab('general')
    const o = page.override
    setFields({
      meta_title: o?.meta_title || '',
      meta_description: o?.meta_description || '',
      canonical_url: o?.canonical_url || '',
      og_title: o?.og_title || '',
      og_description: o?.og_description || '',
      og_image_url: o?.og_image_url || '',
      twitter_title: o?.twitter_title || '',
      twitter_description: o?.twitter_description || '',
      twitter_image_url: o?.twitter_image_url || '',
      focus_keyword: o?.focus_keyword || '',
      noindex: o?.noindex || false,
      nofollow: o?.nofollow || false,
      schema_breadcrumb: o?.schema_breadcrumb || false,
      schema_faq: o?.schema_faq || false,
    })
  }

  async function savePage() {
    if (!editing) return
    setSaving(true)
    const res = await fetch('/api/admin/seo/pages', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ pageKey: editing.key, fields }),
    })
    setSaving(false)
    const data = await res.json()
    if (res.ok) {
      setFlash({ kind: 'success', text: `${editing.label}: saved and live` })
      fetchPages()
    } else {
      setFlash({ kind: 'error', text: `Save failed: ${data.detail || data.error}` })
    }
  }

  async function resetPage() {
    if (!editing) return
    if (!confirm(`Reset ${editing.label} to the hardcoded defaults? This deletes the override.`)) return
    const res = await fetch(`/api/admin/seo/pages?pageKey=${editing.key}`, { method: 'DELETE' })
    if (res.ok) {
      setFlash({ kind: 'success', text: `${editing.label}: reset to defaults` })
      setEditing(null)
      fetchPages()
    }
  }

  async function saveSettings() {
    setSaving(true)
    const res = await fetch('/api/admin/seo/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...settings,
        social_same_as: settings.social_same_as.split('\n').map(s => s.trim()).filter(Boolean),
        sitemap_exclusions: settings.sitemap_exclusions.split('\n').map(s => s.trim()).filter(Boolean),
      }),
    })
    setSaving(false)
    const data = await res.json()
    if (res.ok) setFlash({ kind: 'success', text: 'SEO settings saved' })
    else setFlash({ kind: 'error', text: `Save failed: ${data.detail || data.error}` })
  }

  async function addRedirect() {
    const res = await fetch('/api/admin/seo/redirects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from_path: redirectForm.from_path,
        to_path: redirectForm.to_path,
        status_code: Number(redirectForm.status_code),
        note: redirectForm.note,
      }),
    })
    const data = await res.json()
    if (res.ok) {
      setFlash({ kind: 'success', text: 'Redirect created' })
      setShowRedirectForm(false)
      setRedirectForm({ from_path: '', to_path: '', status_code: '301', note: '' })
      fetchRedirects()
    } else {
      setFlash({ kind: 'error', text: data.detail || data.error })
    }
  }

  async function toggleRedirect(r: Redirect) {
    await fetch(`/api/admin/seo/redirects/${r.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ enabled: !r.enabled }),
    })
    fetchRedirects()
  }

  async function deleteRedirect(r: Redirect) {
    if (!confirm(`Delete redirect ${r.from_path}?`)) return
    await fetch(`/api/admin/seo/redirects/${r.id}`, { method: 'DELETE' })
    fetchRedirects()
  }

  const str = (k: string) => String(fields[k] ?? '')
  const effTitle = str('meta_title') || editing?.defaultTitle || ''
  const effDesc = str('meta_description') || editing?.defaultDescription || ''
  const analysis = editing
    ? analyzeSeo({ title: effTitle, description: effDesc, slug: editing.path, focusKeyword: str('focus_keyword') || undefined })
    : null

  return (
    <AdminShell title="SEO">
      <FlashBanner flash={flash} onDismiss={() => setFlash(null)} />

      {/* Sub-nav */}
      <div className="flex gap-1 mb-6 bg-[#002952] rounded-xl p-1 w-fit">
        {(['pages', 'settings', 'redirects'] as const).map(t => (
          <button
            key={t}
            onClick={() => { setTab(t); setEditing(null) }}
            className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
              tab === t ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-[#1a1200]' : 'text-gray-400 hover:text-white'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ── Pages tab ─────────────────────────────────────────── */}
      {tab === 'pages' && !editing && (
        <div className="bg-[#002952] rounded-2xl border border-white/5 overflow-hidden">
          {pages.map(p => (
            <button
              key={p.key}
              onClick={() => openEditor(p)}
              className="w-full flex items-center justify-between gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors text-left"
            >
              <div className="min-w-0">
                <p className="text-white font-bold text-sm">{p.label}</p>
                <p className="text-gray-500 text-xs font-mono">{p.path}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {p.override ? (
                  <span className="text-[10px] font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                    ● override
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">defaults</span>
                )}
                {p.override?.noindex && <span className="text-[10px] font-bold text-red-400">noindex</span>}
                <span className="text-gray-600">→</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {tab === 'pages' && editing && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <button onClick={() => setEditing(null)} className="text-sm text-gray-400 hover:text-white">
                ← All pages
              </button>
              <p className="text-gray-500 text-xs font-mono">{editing.path}</p>
            </div>

            {/* Field tabs */}
            <div className="flex gap-1 bg-[#002952] rounded-xl p-1 w-fit">
              {(['general', 'social', 'advanced'] as const).map(t => (
                <button key={t} onClick={() => setFieldTab(t)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                    fieldTab === t ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-[#1a1200]' : 'text-gray-400 hover:text-white'
                  }`}>
                  {t}
                </button>
              ))}
            </div>

            <div className={`${cardCls} space-y-4`}>
              {fieldTab === 'general' && (
                <>
                  <div>
                    <label className={labelCls}>Meta title <span className="text-gray-600 normal-case">({effTitle.length}/60)</span></label>
                    <input type="text" value={str('meta_title')} placeholder={editing.defaultTitle}
                      onChange={e => setFields(f => ({ ...f, meta_title: e.target.value }))} className={inputCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Meta description <span className="text-gray-600 normal-case">({effDesc.length}/160)</span></label>
                    <textarea value={str('meta_description')} placeholder={editing.defaultDescription} rows={3}
                      onChange={e => setFields(f => ({ ...f, meta_description: e.target.value }))} className={`${inputCls} resize-none`} />
                  </div>
                  <div>
                    <label className={labelCls}>Focus keyword</label>
                    <input type="text" value={str('focus_keyword')}
                      onChange={e => setFields(f => ({ ...f, focus_keyword: e.target.value }))} className={inputCls} />
                  </div>
                </>
              )}
              {fieldTab === 'social' && (
                <>
                  {(['og_title', 'og_description', 'og_image_url', 'twitter_title', 'twitter_description', 'twitter_image_url'] as const).map(k => (
                    <div key={k}>
                      <label className={labelCls}>{k.replace(/_/g, ' ')}</label>
                      <input type="text" value={str(k)} placeholder="(falls back to general/meta)"
                        onChange={e => setFields(f => ({ ...f, [k]: e.target.value }))} className={inputCls} />
                    </div>
                  ))}
                </>
              )}
              {fieldTab === 'advanced' && (
                <>
                  <div>
                    <label className={labelCls}>Canonical URL</label>
                    <input type="text" value={str('canonical_url')} placeholder="(default canonical)"
                      onChange={e => setFields(f => ({ ...f, canonical_url: e.target.value }))} className={inputCls} />
                  </div>
                  <div className="flex flex-wrap gap-5">
                    {(['noindex', 'nofollow', 'schema_breadcrumb', 'schema_faq'] as const).map(k => (
                      <label key={k} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                        <input type="checkbox" checked={!!fields[k]}
                          onChange={e => setFields(f => ({ ...f, [k]: e.target.checked }))} className="accent-amber-500" />
                        {k.replace(/_/g, ' ')}
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* SERP preview */}
            <div className={cardCls}>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-black text-gray-400 uppercase tracking-wider">Google preview</h3>
                <div className="flex gap-1">
                  {(['desktop', 'mobile'] as const).map(m => (
                    <button key={m} onClick={() => setSerpMode(m)}
                      className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${serpMode === m ? 'bg-white/10 text-white' : 'text-gray-500'}`}>
                      {m}
                    </button>
                  ))}
                </div>
              </div>
              <div className={`bg-white rounded-xl p-4 ${serpMode === 'mobile' ? 'max-w-sm' : ''}`}>
                <p className="text-[#202124] text-xs mb-1 truncate">orca4ktv.com{editing.path}</p>
                <p className="text-[#1a0dab] text-lg leading-snug truncate" style={{ fontFamily: 'arial, sans-serif' }}>
                  {effTitle.slice(0, serpMode === 'mobile' ? 55 : 60)}{effTitle.length > 60 ? '…' : ''}
                </p>
                <p className="text-[#4d5156] text-sm leading-snug" style={{ fontFamily: 'arial, sans-serif' }}>
                  {effDesc.slice(0, 160)}{effDesc.length > 160 ? '…' : ''}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={savePage} disabled={saving} className={primaryBtnCls}>
                {saving ? 'Saving…' : 'Save'}
              </button>
              {editing.override && (
                <button onClick={resetPage} className={dangerBtnCls}>Reset to defaults</button>
              )}
            </div>
          </div>

          {analysis && <div><SeoScorePanel analysis={analysis} /></div>}
        </div>
      )}

      {/* ── Settings tab ──────────────────────────────────────── */}
      {tab === 'settings' && settingsLoaded && (
        <div className="max-w-2xl space-y-5">
          <div className={`${cardCls} space-y-4`}>
            <div>
              <label className={labelCls}>Title template <span className="text-gray-600 normal-case">(%s = page title)</span></label>
              <input type="text" value={settings.title_template} placeholder="%s · ORCA 4K TV"
                onChange={e => setSettings(s => ({ ...s, title_template: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Default OG image URL</label>
              <input type="text" value={settings.default_og_image} placeholder="https://orca4ktv.com/og-image.jpg"
                onChange={e => setSettings(s => ({ ...s, default_og_image: e.target.value }))} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Social profile URLs <span className="text-gray-600 normal-case">(one per line — feeds Organization sameAs)</span></label>
              <textarea value={settings.social_same_as} rows={3}
                onChange={e => setSettings(s => ({ ...s, social_same_as: e.target.value }))} className={`${inputCls} resize-none font-mono text-xs`} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Google verification</label>
                <input type="text" value={settings.google_verification}
                  onChange={e => setSettings(s => ({ ...s, google_verification: e.target.value }))} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Bing verification</label>
                <input type="text" value={settings.bing_verification}
                  onChange={e => setSettings(s => ({ ...s, bing_verification: e.target.value }))} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Extra robots.txt lines</label>
              <textarea value={settings.robots_extra_lines} rows={3} placeholder={'User-agent: SomeBot\nDisallow: /'}
                onChange={e => setSettings(s => ({ ...s, robots_extra_lines: e.target.value }))} className={`${inputCls} resize-none font-mono text-xs`} />
            </div>
            <div>
              <label className={labelCls}>Sitemap exclusions <span className="text-gray-600 normal-case">(one path per line)</span></label>
              <textarea value={settings.sitemap_exclusions} rows={3} placeholder="/some-page"
                onChange={e => setSettings(s => ({ ...s, sitemap_exclusions: e.target.value }))} className={`${inputCls} resize-none font-mono text-xs`} />
            </div>
            <div>
              <label className={labelCls}>Default blog schema type</label>
              <select value={settings.default_blog_schema_type}
                onChange={e => setSettings(s => ({ ...s, default_blog_schema_type: e.target.value }))} className={inputCls}>
                <option value="">Article (default)</option>
                <option value="NewsArticle">NewsArticle</option>
                <option value="BlogPosting">BlogPosting</option>
              </select>
            </div>
          </div>
          <button onClick={saveSettings} disabled={saving} className={primaryBtnCls}>
            {saving ? 'Saving…' : 'Save settings'}
          </button>
        </div>
      )}

      {/* ── Redirects tab ─────────────────────────────────────── */}
      {tab === 'redirects' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-gray-400 text-sm">{redirects.length} redirect{redirects.length !== 1 ? 's' : ''} · consulted only on 404s, zero cost on live pages</p>
            <button onClick={() => setShowRedirectForm(v => !v)} className={primaryBtnCls}>+ Add redirect</button>
          </div>

          {showRedirectForm && (
            <div className={`${cardCls} space-y-4`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Source path *</label>
                  <input type="text" value={redirectForm.from_path} placeholder="/old-page"
                    onChange={e => setRedirectForm(f => ({ ...f, from_path: e.target.value }))} className={`${inputCls} font-mono`} />
                </div>
                <div>
                  <label className={labelCls}>Destination {redirectForm.status_code === '410' ? '(none — gone)' : '*'}</label>
                  <input type="text" value={redirectForm.to_path} placeholder="/new-page" disabled={redirectForm.status_code === '410'}
                    onChange={e => setRedirectForm(f => ({ ...f, to_path: e.target.value }))} className={`${inputCls} font-mono disabled:opacity-40`} />
                </div>
                <div>
                  <label className={labelCls}>Type</label>
                  <select value={redirectForm.status_code}
                    onChange={e => setRedirectForm(f => ({ ...f, status_code: e.target.value }))} className={inputCls}>
                    <option value="301">301 - Permanent</option>
                    <option value="302">302 - Temporary</option>
                    <option value="410">410 - Gone</option>
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Note</label>
                  <input type="text" value={redirectForm.note} placeholder="why this exists"
                    onChange={e => setRedirectForm(f => ({ ...f, note: e.target.value }))} className={inputCls} />
                </div>
              </div>
              <div className="flex gap-3 justify-end">
                <button onClick={() => setShowRedirectForm(false)} className={secondaryBtnCls}>Cancel</button>
                <button onClick={addRedirect} className={primaryBtnCls}>Create</button>
              </div>
            </div>
          )}

          <div className="bg-[#002952] rounded-2xl border border-white/5 overflow-hidden">
            {redirects.length === 0 ? (
              <p className="px-6 py-10 text-center text-gray-500 text-sm">No redirects yet.</p>
            ) : (
              redirects.map(r => (
                <div key={r.id} className="flex flex-wrap items-center gap-3 px-6 py-3.5 border-b border-white/5 last:border-0">
                  <span className="font-mono text-sm text-white">{r.from_path}</span>
                  <span className="text-gray-600">→</span>
                  <span className="font-mono text-sm text-amber-300">{r.status_code === 410 ? '(gone)' : r.to_path}</span>
                  <StatusBadge status={r.enabled ? 'active' : 'disabled'} />
                  <span className="text-xs text-gray-600">{r.status_code}</span>
                  {r.note && <span className="text-xs text-gray-500 italic truncate max-w-[200px]">{r.note}</span>}
                  <div className="ml-auto flex gap-2">
                    <button onClick={() => toggleRedirect(r)} className="text-xs text-gray-400 hover:text-white border border-white/10 px-3 py-1 rounded-lg">
                      {r.enabled ? 'Disable' : 'Enable'}
                    </button>
                    <button onClick={() => deleteRedirect(r)} className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 px-3 py-1 rounded-lg">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </AdminShell>
  )
}
