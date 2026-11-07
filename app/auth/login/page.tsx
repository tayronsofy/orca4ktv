'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/dashboard'
  const message = searchParams.get('message')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<React.ReactNode>('')
  const [loading, setLoading] = useState(false)

  const forgotHref = `/auth/forgot-password${email.trim() ? `?email=${encodeURIComponent(email.trim())}` : ''}`

  // Banners for messages other pages redirect here with
  const notices: Record<string, { tone: 'info' | 'warn'; text: React.ReactNode }> = {
    'existing-account': {
      tone: 'info',
      text: <>You already have an account with this email, so your trial is ready on your dashboard. Sign in below, or <Link href={forgotHref} className="underline font-semibold">reset your password</Link> if you don&apos;t remember it.</>,
    },
    'check-email': {
      tone: 'info',
      text: 'Check your inbox to confirm your email, then sign in here.',
    },
    'password-updated': {
      tone: 'info',
      text: 'Your password was changed. Sign in with the new one.',
    },
  }
  const notice = message ? notices[message] : undefined

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      const msg = error.message.toLowerCase()
      if (msg.includes('invalid login credentials')) {
        setError(<>That email and password don&apos;t match. <Link href={forgotHref} className="underline font-semibold text-red-300">Forgot your password?</Link></>)
      } else if (msg.includes('email not confirmed')) {
        setError(<>Your email isn&apos;t confirmed yet. <Link href={forgotHref} className="underline font-semibold text-red-300">Reset your password</Link> to confirm it and sign in.</>)
      } else {
        setError(error.message)
      }
      setLoading(false)
      return
    }

    router.push(next)
    router.refresh()
  }

  return (
    <div style={{ paddingTop: '140px' }} className="min-h-screen bg-[#001f3f] flex items-start justify-center px-4 pb-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/logo.png?v=6" alt="Orca 4K TV - best IPTV subscription with 22,000+ live channels in 4K HDR" className="h-14 w-auto mx-auto mb-6" width={1432} height={704} loading="lazy" />
          </Link>
          <h1 className="text-2xl font-black text-white">Welcome back</h1>
          <p className="text-gray-400 mt-2 text-sm">Sign in to your ORCA 4K TV account</p>
        </div>

        <div className="bg-[#002952] rounded-2xl p-8 border border-white/5">
          {notice && (
            <div className={`mb-6 rounded-xl px-4 py-3 text-sm border ${notice.tone === 'warn' ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-200' : 'bg-purple-500/10 border-purple-500/30 text-purple-200'}`}>
              {notice.text}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email address</label>
              <input
                id="email"
                autoComplete="email"
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-[#001f3f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="password" className="block text-sm text-gray-400">Password</label>
                <Link href={forgotHref} className="text-sm text-purple-400 hover:text-purple-300 font-semibold">
                  Forgot password?
                </Link>
              </div>
              <input
                id="password"
                autoComplete="current-password"
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
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
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            Don&apos;t have an account?{' '}
            <Link href={`/auth/register${next !== '/dashboard' ? `?next=${encodeURIComponent(next)}` : ''}`} className="text-purple-400 hover:text-purple-300 font-semibold">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
