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

const COUNTRIES = [
  'Afghanistan','Albania','Algeria','Andorra','Angola','Argentina','Armenia','Australia',
  'Austria','Azerbaijan','Bahrain','Bangladesh','Belarus','Belgium','Bolivia','Bosnia and Herzegovina',
  'Brazil','Bulgaria','Cambodia','Cameroon','Canada','Chile','China','Colombia','Costa Rica',
  'Croatia','Cuba','Cyprus','Czech Republic','Denmark','Dominican Republic','Ecuador','Egypt',
  'El Salvador','Estonia','Ethiopia','Finland','France','Georgia','Germany','Ghana','Greece',
  'Guatemala','Honduras','Hong Kong','Hungary','India','Indonesia','Iran','Iraq','Ireland',
  'Israel','Italy','Ivory Coast','Jamaica','Japan','Jordan','Kazakhstan','Kenya','Kuwait',
  'Latvia','Lebanon','Libya','Lithuania','Luxembourg','Malaysia','Malta','Mexico','Moldova',
  'Morocco','Mozambique','Myanmar','Nepal','Netherlands','New Zealand','Nigeria','North Macedonia',
  'Norway','Oman','Pakistan','Palestine','Panama','Paraguay','Peru','Philippines','Poland',
  'Portugal','Qatar','Romania','Russia','Saudi Arabia','Senegal','Serbia','Singapore',
  'Slovakia','Slovenia','Somalia','South Africa','South Korea','Spain','Sri Lanka','Sudan',
  'Sweden','Switzerland','Syria','Taiwan','Tanzania','Thailand','Tunisia','Turkey','Uganda',
  'Ukraine','United Arab Emirates','United Kingdom','United States','Uruguay','Uzbekistan',
  'Venezuela','Vietnam','Yemen','Zimbabwe','Other',
]

type AuthStep = 'email' | 'password' | 'otp-sent' | 'done'

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
  // Auth flow state
  const [authStep, setAuthStep] = useState<AuthStep>('email')
  const [fullName, setFullName] = useState('')
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  const amount = prices[connections - 1]

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setUserEmail(user.email || '')
        setAuthStep('done')
      }
    })
  }, [])

  // Handle registration form: sign up new users, or sign in existing ones
  const handleEmailContinue = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)

    const supabase = createClient()

    const { data, error: signUpError } = await supabase.auth.signUp({
      email: emailInput.trim().toLowerCase(),
      password: passwordInput,
      options: { data: { full_name: fullName.trim() } },
    })

    if (!signUpError && data.user && data.session) {
      // New user — registered and logged in with their chosen password
      if (fullName.trim()) {
        await supabase.from('profiles').update({ full_name: fullName.trim() }).eq('id', data.user.id)
      }
      setUserEmail(data.user.email || emailInput)
      setAuthStep('done')
      setAuthLoading(false)
      return
    }

    if (!signUpError && data.user && !data.session) {
      setAuthStep('otp-sent')
      setAuthLoading(false)
      return
    }

    // Email already registered — try signing in with the password they entered
    const isAlreadyRegistered =
      signUpError?.message?.toLowerCase().includes('already registered') ||
      signUpError?.message?.toLowerCase().includes('already been registered') ||
      signUpError?.status === 400

    if (isAlreadyRegistered) {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: emailInput.trim().toLowerCase(),
        password: passwordInput,
      })
      if (!signInError && signInData.user) {
        setUserEmail(signInData.user.email || emailInput)
        setAuthStep('done')
        setAuthLoading(false)
        return
      }
      // Wrong password — show the dedicated password step
      setAuthStep('password')
      setPasswordInput('')
      setAuthError('This email already has an account. Please enter your password below.')
      setAuthLoading(false)
      return
    }

    setAuthError(signUpError?.message || 'Something went wrong. Please try again.')
    setAuthLoading(false)
  }

  // Handle password step: sign in with email + password
  const handlePasswordSignIn = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    setAuthError('')
    setAuthLoading(true)

    const supabase = createClient()
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: emailInput.trim().toLowerCase(),
      password: passwordInput,
    })

    if (!signInError && data.user) {
      setUserEmail(data.user.email || emailInput)
      setAuthStep('done')
      setAuthLoading(false)
      return
    }

    setAuthError(signInError?.message || 'Incorrect password. Please try again.')
    setAuthLoading(false)
  }

  // Send magic link as fallback for forgotten password
  const handleSendMagicLink = async () => {
    setAuthError('')
    setAuthLoading(true)
    const supabase = createClient()
    const { error: otpError } = await supabase.auth.signInWithOtp({
      email: emailInput.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(`/order?plan=${planSlug}&connections=${connections}`)}`,
      },
    })
    if (otpError) {
      setAuthError(otpError.message)
      setAuthLoading(false)
      return
    }
    setAuthStep('otp-sent')
    setAuthLoading(false)
  }

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
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

      setLoading(false)
      router.push('/dashboard?ordered=1')
    } catch (err) {
      console.error('Order submit error:', err)
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div style={{ paddingTop: '120px' }} className="min-h-screen bg-[#001f3f] px-4 pb-16">
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
            <div className="bg-[#002952] rounded-2xl p-6 border border-white/5 mb-6">
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
                        : 'bg-[#001f3f] text-gray-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {p.shortName}
                    {p.badge && <span className="ml-1 text-[10px] text-green-400">★</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Connections */}
            <div className="bg-[#002952] rounded-2xl p-6 border border-white/5 mb-6">
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
                        : 'bg-[#001f3f] text-gray-400 hover:text-white border border-white/5'
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
            <div className="bg-[#002952] rounded-2xl p-6 border border-white/5">

              {/* Auth section */}
              {authStep === 'done' ? (
                <div className="mb-5 bg-[#001f3f] rounded-xl px-4 py-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">Logged in as</p>
                    <p className="text-white text-sm font-medium">{userEmail}</p>
                  </div>
                  <button
                    type="button"
                    onClick={async () => {
                      const supabase = createClient()
                      await supabase.auth.signOut()
                      setUserEmail('')
                      setFullName('')
                      setEmailInput('')
                      setPasswordInput('')
                      setAuthStep('email')
                    }}
                    className="text-xs text-gray-500 hover:text-gray-300"
                  >
                    Logout
                  </button>
                </div>
              ) : authStep === 'email' ? (
                <form onSubmit={handleEmailContinue} className="mb-5 space-y-3">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Full name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="John Smith"
                      className="w-full bg-[#001f3f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Email address</label>
                    <input
                      type="email"
                      required
                      value={emailInput}
                      onChange={e => setEmailInput(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full bg-[#001f3f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Password</label>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={passwordInput}
                      onChange={e => setPasswordInput(e.target.value)}
                      placeholder="Min. 6 characters"
                      className="w-full bg-[#001f3f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  {authError && (
                    <p className="text-sm text-red-400">{authError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                  >
                    {authLoading ? 'Please wait…' : 'Continue to Order'}
                  </button>
                  <p className="text-xs text-gray-600 text-center">Already have an account? Enter your email &amp; password to sign in.</p>
                </form>
              ) : authStep === 'password' ? (
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => { setAuthStep('email'); setPasswordInput(''); setAuthError('') }}
                      className="text-gray-500 hover:text-gray-300"
                    >
                      <i className="fas fa-arrow-left text-xs"></i>
                    </button>
                    <p className="text-sm text-gray-300">Welcome back, <span className="text-white font-medium">{emailInput}</span></p>
                  </div>
                  <form onSubmit={handlePasswordSignIn} className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-400 mb-2">Password</label>
                      <input
                        type="password"
                        required
                        autoFocus
                        value={passwordInput}
                        onChange={e => setPasswordInput(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full bg-[#001f3f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                      />
                    </div>
                    {authError && (
                      <p className="text-sm text-red-400">{authError}</p>
                    )}
                    <button
                      type="submit"
                      disabled={authLoading}
                      className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-colors disabled:opacity-50"
                    >
                      {authLoading ? 'Signing in…' : 'Sign In'}
                    </button>
                    <button
                      type="button"
                      onClick={handleSendMagicLink}
                      disabled={authLoading}
                      className="w-full text-sm text-gray-500 hover:text-gray-300 transition-colors disabled:opacity-50"
                    >
                      Forgot password? Send me a login link
                    </button>
                  </form>
                </div>
              ) : authStep === 'otp-sent' ? (
                <div className="mb-5 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-4 text-sm">
                  <p className="text-blue-300 font-semibold mb-1">Check your inbox</p>
                  <p className="text-gray-400">We sent a login link to <span className="text-white">{emailInput}</span>. Click the link to continue.</p>
                </div>
              ) : null}

              {/* Order form — only shown when logged in */}
              {authStep === 'done' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Phone number <span className="text-gray-600">(optional)</span></label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+1 555 000 0000"
                      className="w-full bg-[#001f3f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Country <span className="text-gray-600">(optional)</span></label>
                    <select
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                      className="w-full bg-[#001f3f] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select your country</option>
                      {COUNTRIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 text-lg mt-2"
                  >
                    {loading ? 'Placing order…' : `Place Order — $${amount}`}
                  </button>

                  <p className="text-xs text-gray-600 text-center">
                    No payment now. We&apos;ll send you the payment link within 1 hour.
                  </p>
                </form>
              )}

              {/* Show a hint when waiting for OTP */}
              {authStep === 'otp-sent' && (
                <p className="text-xs text-gray-600 text-center mt-4">
                  After clicking the email link, you&apos;ll be returned here to complete your order.
                </p>
              )}

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
