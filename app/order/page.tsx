'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { SHOP_PLANS, getPlanBySlug } from '@/data/shopPlans'

const CONNECTIONS_PRICES: Record<string, number[]> = {
  '1-month':   [21, 36, 49, 62],
  '3-months':  [45, 75, 105, 129],
  '6-months':  [69, 115, 159, 199],
  '12-months': [95, 159, 220, 279],
}

function OrderForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const planSlug = searchParams.get('plan') || '3-months'
  const initConnections = parseInt(searchParams.get('connections') || '1')

  const plan = getPlanBySlug(planSlug) || SHOP_PLANS[1]
  const prices = CONNECTIONS_PRICES[plan.slug] || CONNECTIONS_PRICES['3-months']

  const [connections, setConnections] = useState(Math.min(Math.max(initConnections, 1), 4))
  const [phone, setPhone] = useState('')
  const [country, setCountry] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const amount = prices[connections - 1]

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setUserEmail(user.email || '')
    })
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      router.push(`/auth/register?next=${encodeURIComponent(`/order?plan=${planSlug}&connections=${connections}`)}`)
      return
    }

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ planSlug: plan.slug, planName: plan.name, connections, amount, phone, country }),
    })

    if (!res.ok) {
      const data = await res.json()
      setError(data.error || 'Something went wrong. Please try again.')
      setLoading(false)
      return
    }

    router.push('/dashboard?ordered=1')
  }

  return (
    <div style={{ paddingTop: '120px' }} className="min-h-screen bg-[#1f2326] px-4 pb-16">
      <div className="max-w-4xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-8">
          <Link href="/iptv-shop" className="hover:text-gray-300">Shop</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-300">Place Order</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plan Summary */}
          <div>
            <h1 className="text-2xl font-black text-white mb-6">Order Summary</h1>

            {/* Plan selector */}
            <div className="bg-[#2c3034] rounded-2xl p-6 border border-white/5 mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Select Plan</p>
              <div className="grid grid-cols-2 gap-2">
                {SHOP_PLANS.map(p => (
                  <button
                    key={p.slug}
                    type="button"
                    onClick={() => router.replace(`/order?plan=${p.slug}&connections=${connections}`)}
                    className={`py-2 px-3 rounded-xl text-sm font-bold transition-all ${
                      p.slug === plan.slug
                        ? 'bg-purple-600 text-white'
                        : 'bg-[#1f2326] text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {p.shortName}
                    {p.badge && <span className="ml-1 text-[10px] text-green-400">★</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Connections */}
            <div className="bg-[#2c3034] rounded-2xl p-6 border border-white/5 mb-6">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">Connections (simultaneous devices)</p>
              <div className="grid grid-cols-4 gap-2">
                {[1, 2, 3, 4].map(n => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setConnections(n)}
                    className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                      n === connections
                        ? 'bg-purple-600 text-white'
                        : 'bg-[#1f2326] text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Price card */}
            <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl p-6 border border-purple-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-300">{plan.name}</span>
                <span className="text-gray-300">{connections} connection{connections > 1 ? 's' : ''}</span>
              </div>
              {plan.savings && (
                <div className="text-xs text-green-400 mb-3">Save {plan.savings}</div>
              )}
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black text-white">${amount}</span>
                <span className="text-gray-400 text-sm mb-1">one-time</span>
              </div>
              <ul className="mt-4 space-y-1">
                {['22,000+ live channels', '4K & HD quality', 'Buffer-free streaming', 'Instant activation after payment'].map(f => (
                  <li key={f} className="text-sm text-gray-400 flex items-center gap-2">
                    <i className="fas fa-check text-green-400 text-xs"></i> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Billing Form */}
          <div>
            <h2 className="text-2xl font-black text-white mb-6">Your Details</h2>
            <div className="bg-[#2c3034] rounded-2xl p-6 border border-white/5">
              {userEmail ? (
                <div className="mb-5 bg-[#1f2326] rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Logged in as</p>
                    <p className="text-white text-sm font-medium">{userEmail}</p>
                  </div>
                  <form action="/api/auth/logout" method="POST">
                    <button type="submit" className="text-xs text-gray-500 hover:text-gray-300">Logout</button>
                  </form>
                </div>
              ) : (
                <div className="mb-5 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 text-sm text-blue-300">
                  <Link href={`/auth/login?next=${encodeURIComponent(`/order?plan=${planSlug}&connections=${connections}`)}`} className="font-semibold underline">Sign in</Link>
                  {' '}or{' '}
                  <Link href={`/auth/register?next=${encodeURIComponent(`/order?plan=${planSlug}&connections=${connections}`)}`} className="font-semibold underline">create an account</Link>
                  {' '}to place your order.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Phone number <span className="text-gray-600">(optional)</span></label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="+1 555 000 0000"
                    className="w-full bg-[#1f2326] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Country <span className="text-gray-600">(optional)</span></label>
                  <input
                    type="text"
                    value={country}
                    onChange={e => setCountry(e.target.value)}
                    placeholder="United States"
                    className="w-full bg-[#1f2326] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !userEmail}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-lg mt-2"
                >
                  {loading ? 'Placing order…' : `Place Order — $${amount}`}
                </button>

                <p className="text-xs text-gray-600 text-center">
                  No payment now. We&apos;ll send you the payment link within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function OrderPage() {
  return (
    <Suspense>
      <OrderForm />
    </Suspense>
  )
}
