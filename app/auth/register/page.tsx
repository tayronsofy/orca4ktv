'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function RegisterForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/dashboard'
  const trialToken = searchParams.get('trial')

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [trialContext, setTrialContext] = useState<{ valid: boolean; loading: boolean }>({
    valid: false,
    loading: !!trialToken,
  })

  useEffect(() => {
    if (!trialToken) return
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(`/api/trial/by-token?token=${encodeURIComponent(trialToken)}`)
        if (!res.ok) {
          if (!cancelled) setTrialContext({ valid: false, loading: false })
          return
        }
        const data = await res.json()
        if (cancelled) return
        setEmail(data.email || '')
        setFullName(data.name || '')
        setTrialContext({ valid: true, loading: false })
      } catch {
        if (!cancelled) setTrialContext({ valid: false, loading: false })
      }
    })()
    return () => {
      cancelled = true
    }
  }, [trialToken])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()

    // Trial activation flow: server creates the user with email_confirm=true
    // (signup_token already proves email ownership), then we sign in client-side.
    if (trialToken && trialContext.valid) {
      try {
        const res = await fetch('/api/trial/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: trialToken, password, fullName, phone }),
        })
        if (res.status === 409) {
          router.push(`/auth/login?message=existing-account&next=${encodeURIComponent(next)}`)
          return
        }
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          setError(data?.error === 'invalid_password' ? 'Password must be at least 8 characters.' : 'Could not activate your trial. Please try again or contact support.')
          setLoading(false)
          return
        }
        const { error: signInErr } = await supabase.auth.signInWithPassword({ email, password })
        if (signInErr) {
          setError(signInErr.message)
          setLoading(false)
          return
        }
        router.push(next)
        router.refresh()
        return
      } catch {
        setError('Network error. Please try again.')
        setLoading(false)
        return
      }
    }

    // Standard paid-shop signup flow - keep email confirmation as a baseline.
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName, phone },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Update phone in profile (trigger creates the row, we just patch phone)
    const { data: { session } } = await supabase.auth.getSession()
    if (session) {
      await supabase.from('profiles').update({ phone, full_name: fullName }).eq('id', session.user.id)
      router.push(next)
      router.refresh()
    } else {
      // Email confirmation required - redirect to a waiting page
      router.push('/auth/login?message=check-email')
    }
  }

  return (
    <div style={{ paddingTop: '140px' }} className="min-h-screen bg-[#001f3f] flex items-start justify-center px-4 pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/logo.png?v=6" alt="Orca 4K TV - best IPTV subscription with 22,000+ live channels in 4K HDR" className="h-14 w-auto mx-auto mb-6" width={1432} height={704} loading="lazy" />
          </Link>
          <h1 className="text-2xl font-black text-white">
            {trialContext.valid ? 'Activate your trial' : 'Create your account'}
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            {trialContext.valid ? 'One quick step to unlock your access details' : 'Start your ORCA 4K TV IPTV subscription'}
          </p>
        </div>

        <div className="bg-[#002952] rounded-2xl p-8 border border-white/5">
          {trialContext.valid && (
            <div className="mb-6 bg-purple-500/10 border border-purple-500/30 rounded-xl px-4 py-3 text-purple-200 text-sm">
              <i className="fas fa-bolt mr-2"></i>
              Activating your Orca 4K TV trial - your access details will appear on your dashboard right after sign-up.
            </div>
          )}
          {trialToken && !trialContext.valid && !trialContext.loading && (
            <div className="mb-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3 text-yellow-200 text-sm">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              This activation link is invalid or already used. You can still create an account below.
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                readOnly={trialContext.valid}
                className={`w-full bg-[#001f3f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors ${trialContext.valid ? 'opacity-70 cursor-not-allowed' : ''}`}
              />
              {trialContext.valid && (
                <p className="mt-1.5 text-xs text-gray-500">Email is locked to match your trial request.</p>
              )}
            </div>
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
              <label className="block text-sm text-gray-400 mb-2">Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-[#001f3f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {loading ? 'Creating account…' : 'Create Account'}
            </button>
          </form>

          <p className="mt-4 text-xs text-gray-600 text-center">
            By creating an account you agree to our{' '}
            <Link href="/terms" className="text-gray-500 hover:text-gray-400">Terms of Service</Link>
            {' '}and{' '}
            <Link href="/privacy" className="text-gray-500 hover:text-gray-400">Privacy Policy</Link>.
          </p>

          <div className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <Link href={`/auth/login${next !== '/dashboard' ? `?next=${encodeURIComponent(next)}` : ''}`} className="text-purple-400 hover:text-purple-300 font-semibold">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function RegisterPage() {
  return (
    <Suspense>
      <RegisterForm />
    </Suspense>
  )
}
