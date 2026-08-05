'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminShell from '@/components/admin/AdminShell'
import { cardCls, inputCls, labelCls, primaryBtnCls } from '@/components/admin/ui'

const TYPES = [
  { value: 'how-to', label: 'How-To Guide', icon: 'fa-list-ol', desc: 'Step-by-step tutorial with 7+ numbered steps', words: '2000-2500 words' },
  { value: 'listicle', label: 'Listicle', icon: 'fa-list', desc: '"7 best ways to…" numbered list article', words: '1500-2200 words' },
  { value: 'comparison', label: 'Comparison', icon: 'fa-scale-balanced', desc: 'X vs Y breakdown with pros/cons and a verdict', words: '1800-2400 words' },
  { value: 'review', label: 'Review', icon: 'fa-star-half-stroke', desc: 'In-depth single product/service review', words: '1800-2400 words' },
  { value: 'roundup', label: 'Roundup', icon: 'fa-layer-group', desc: 'Curated collection with mini-reviews', words: '1800-2500 words' },
  { value: 'news', label: 'News', icon: 'fa-bolt', desc: 'Timely announcement, lede-first, no pros/cons', words: '800-1500 words' },
]

const CATEGORIES = ['', 'Tutorials', 'Guides', 'News', 'Reviews', 'Tips & Tricks', 'Sports', 'Setup']

type StepState = 'pending' | 'running' | 'done' | 'error' | 'skipped'

export default function WriteClient() {
  const router = useRouter()
  const [subject, setSubject] = useState('')
  const [type, setType] = useState('how-to')
  const [focusKeyword, setFocusKeyword] = useState('')
  const [category, setCategory] = useState('')
  const [genImage, setGenImage] = useState(true)
  const [running, setRunning] = useState(false)
  const [error, setError] = useState('')
  const [steps, setSteps] = useState<{ label: string; state: StepState }[]>([])

  const setStep = (i: number, state: StepState) =>
    setSteps(prev => prev.map((s, idx) => (idx === i ? { ...s, state } : s)))

  async function handleGenerate() {
    if (!subject.trim()) { setError('Describe what the article should cover.'); return }
    setError('')
    setRunning(true)
    const plan = [
      { label: 'Write article with AI (this can take a few minutes)', state: 'pending' as StepState },
      { label: genImage ? 'Generate header image' : 'Header image (skipped)', state: genImage ? ('pending' as StepState) : ('skipped' as StepState) },
      { label: 'Open draft in the editor', state: 'pending' as StepState },
    ]
    setSteps(plan)

    try {
      // Step 1: article
      setStep(0, 'running')
      const res = await fetch('/api/admin/blog/ai-write', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: subject.trim(),
          type,
          focusKeyword: focusKeyword.trim() || undefined,
          category: category || undefined,
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStep(0, 'error')
        setError(data.detail || data.error || 'Article generation failed')
        setRunning(false)
        return
      }
      setStep(0, 'done')
      const slug = data.slug as string

      // Step 2: image (failure is non-fatal)
      if (genImage) {
        setStep(1, 'running')
        try {
          const imgRes = await fetch('/api/admin/blog/ai-image', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: subject.trim(), slug }),
          })
          setStep(1, imgRes.ok ? 'done' : 'error')
        } catch {
          setStep(1, 'error')
        }
      }

      // Step 3: open editor
      setStep(2, 'running')
      router.push(`/admin/edit/${slug}`)
    } catch {
      setError('Network error. Please try again.')
      setRunning(false)
    }
  }

  return (
    <AdminShell title="Write with AI">
      <div className="max-w-3xl space-y-6">
        <div className={cardCls}>
          <label className={labelCls}>What should the article cover?</label>
          <textarea
            value={subject}
            onChange={e => setSubject(e.target.value)}
            rows={3}
            placeholder="e.g. How to set up IPTV on a Firestick 4K Max in 2026, including VPN setup and buffering fixes"
            className={`${inputCls} resize-none`}
          />
        </div>

        <div>
          <label className={labelCls}>Article type</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {TYPES.map(t => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                disabled={running}
                className={`text-left p-4 rounded-2xl border transition-all ${
                  type === t.value
                    ? 'border-amber-500 bg-amber-500/10'
                    : 'border-white/10 bg-[#002952] hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <i className={`fas ${t.icon} ${type === t.value ? 'text-amber-400' : 'text-gray-500'}`}></i>
                  <span className="text-white text-sm font-bold">{t.label}</span>
                </div>
                <p className="text-gray-400 text-xs leading-relaxed">{t.desc}</p>
                <p className="text-gray-600 text-[10px] mt-1 uppercase tracking-wide">{t.words}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelCls}>Focus keyword <span className="text-gray-600 normal-case">(optional)</span></label>
            <input
              type="text"
              value={focusKeyword}
              onChange={e => setFocusKeyword(e.target.value)}
              placeholder="AI picks one if left blank"
              className={inputCls}
              disabled={running}
            />
          </div>
          <div>
            <label className={labelCls}>Category <span className="text-gray-600 normal-case">(optional)</span></label>
            <select value={category} onChange={e => setCategory(e.target.value)} className={inputCls} disabled={running}>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{c || 'AI picks the best fit'}</option>
              ))}
            </select>
          </div>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input type="checkbox" checked={genImage} onChange={e => setGenImage(e.target.checked)} disabled={running} className="accent-amber-500 w-4 h-4" />
          <span className="text-sm text-gray-300">Generate a 16:9 header image with AI</span>
        </label>

        {error && (
          <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{error}</p>
        )}

        {steps.length > 0 && (
          <div className={cardCls}>
            <ul className="space-y-2">
              {steps.map((s, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                  {s.state === 'running' ? (
                    <i className="fas fa-circle-notch fa-spin text-amber-400 w-4"></i>
                  ) : s.state === 'done' ? (
                    <i className="fas fa-check text-green-400 w-4"></i>
                  ) : s.state === 'error' ? (
                    <i className="fas fa-xmark text-red-400 w-4"></i>
                  ) : s.state === 'skipped' ? (
                    <i className="fas fa-minus text-gray-600 w-4"></i>
                  ) : (
                    <i className="far fa-circle text-gray-600 w-4"></i>
                  )}
                  <span className={s.state === 'pending' || s.state === 'skipped' ? 'text-gray-500' : 'text-gray-200'}>
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button onClick={handleGenerate} disabled={running} className={`${primaryBtnCls} w-full py-3.5`}>
          {running ? 'Generating…' : 'Generate draft'}
        </button>
        <p className="text-xs text-gray-600 text-center">
          Nothing auto-publishes. The article is created as a draft and opened in the editor for your review.
        </p>
      </div>
    </AdminShell>
  )
}
