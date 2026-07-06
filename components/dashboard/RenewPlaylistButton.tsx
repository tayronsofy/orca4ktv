'use client'

import { useState } from 'react'
import { SHOP_PLANS } from '@/data/shopPlans'

interface Props {
  currentConnections: number
  currentPlanSlug?: string
  username?: string | null
  playlistUrl?: string | null
  slot: number
}

const CONNECTION_OPTIONS = [1, 2, 3, 4]

export default function RenewPlaylistButton({
  currentConnections,
  currentPlanSlug,
  username,
  playlistUrl,
  slot,
}: Props) {
  const [open, setOpen] = useState(false)
  const [connections, setConnections] = useState(
    CONNECTION_OPTIONS.includes(currentConnections) ? currentConnections : 1
  )
  const [selectedPlan, setSelectedPlan] = useState<string | null>(currentPlanSlug ?? null)
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const priceFor = (planSlug: string, devices: number): number | null => {
    const plan = SHOP_PLANS.find(p => p.slug === planSlug)
    const tier = plan?.deviceTiers.find(t => t.devices === devices)
    return tier ? tier.price : null
  }

  const reset = () => {
    setOpen(false)
    setSubmitting(false)
    setDone(false)
    setError(null)
    setConnections(CONNECTION_OPTIONS.includes(currentConnections) ? currentConnections : 1)
    setSelectedPlan(currentPlanSlug ?? null)
  }

  const confirm = async () => {
    if (!selectedPlan) return
    setSubmitting(true)
    setError(null)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planSlug: selectedPlan,
          connections,
          renewal: { username, playlistUrl, slot },
        }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }
      setDone(true)
    } catch {
      setError('Network error. Please try again.')
    }
    setSubmitting(false)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="mt-3 inline-flex items-center gap-2 bg-green-500/15 text-green-400 text-sm font-bold px-5 py-2.5 rounded-xl border border-green-500/30 hover:bg-green-500/25 transition-colors"
      >
        <i className="fas fa-rotate-right"></i> Renew your playlist
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={reset}
        >
          <div
            className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-[#002952] rounded-2xl border border-white/10 p-6 shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={reset}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              aria-label="Close"
            >
              <i className="fas fa-times text-lg"></i>
            </button>

            {done ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                  <i className="fas fa-check text-green-400 text-2xl"></i>
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Renewal request sent</h3>
                <p className="text-gray-400 text-sm mb-6">
                  We&apos;ve received your renewal and will email you a payment link shortly.
                </p>
                <button
                  onClick={reset}
                  className="bg-white/10 text-white text-sm font-bold px-6 py-2.5 rounded-xl hover:bg-white/15 transition-colors"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-white font-black text-xl mb-1">Renew your playlist</h3>
                <p className="text-gray-400 text-sm mb-5">
                  Choose a plan and connections. We&apos;ll send you a payment link to complete the renewal.
                </p>

                {/* Connections selector */}
                <div className="mb-5">
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                    Connections
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {CONNECTION_OPTIONS.map(n => (
                      <button
                        key={n}
                        onClick={() => setConnections(n)}
                        className={`py-2 rounded-xl text-sm font-bold border transition-colors ${
                          connections === n
                            ? 'bg-purple-600 text-white border-purple-500'
                            : 'bg-[#001f3f] text-gray-300 border-white/10 hover:border-white/25'
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Plans */}
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2">
                  Choose a plan
                </label>
                <div className="space-y-2.5 mb-6">
                  {SHOP_PLANS.map(plan => {
                    const price = priceFor(plan.slug, connections)
                    const active = selectedPlan === plan.slug
                    return (
                      <button
                        key={plan.slug}
                        onClick={() => setSelectedPlan(plan.slug)}
                        className={`w-full flex items-center justify-between text-left rounded-xl px-4 py-3 border transition-colors ${
                          active
                            ? 'bg-purple-600/20 border-purple-500'
                            : 'bg-[#001f3f] border-white/10 hover:border-white/25'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-white font-bold text-sm">{plan.name}</span>
                            {plan.badge && (
                              <span className="text-[10px] font-bold text-yellow-400 bg-yellow-500/20 px-2 py-0.5 rounded-full border border-yellow-500/20">
                                {plan.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-gray-500 text-xs">
                            {connections} {connections === 1 ? 'connection' : 'connections'}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-purple-400 font-black text-lg">
                            {price !== null ? `$${price}` : '—'}
                          </span>
                          <div className={`w-4 h-4 ml-auto mt-1 rounded-full border-2 ${
                            active ? 'border-purple-500 bg-purple-500' : 'border-white/25'
                          }`}>
                            {active && <i className="fas fa-check text-white text-[9px] flex items-center justify-center h-full"></i>}
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {error && (
                  <p className="text-red-400 text-sm mb-4">
                    <i className="fas fa-exclamation-circle mr-1"></i> {error}
                  </p>
                )}

                <button
                  onClick={confirm}
                  disabled={!selectedPlan || submitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {submitting ? 'Sending…' : 'Confirm renewal'}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
