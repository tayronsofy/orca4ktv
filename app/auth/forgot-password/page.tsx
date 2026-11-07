'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function ForgotPasswordForm() {
  const searchParams = useSearchParams()
  const [email, setEmail] = useState(searchParams.get('email') || '')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [sentTo, setSentTo] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.status === 429) {
        setError('Too many requests. Please wait 15 minutes and try again.')
      } else if (res.status === 400) {
        setError('Please enter a valid email address.')
      } else if (!res.ok) {
        setError('Something went wrong. Please try again.')
      } else {
        setSentTo(email.trim())
      }
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ paddingTop: '140px' }} className="min-h-screen bg-[#001f3f] flex items-start justify-center px-4 pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/logo.png?v=6" alt="Orca 4K TV" className="h-14 w-auto mx-auto mb-6" width={1432} height={704} loading="lazy" />
          </Link>
          <h1 className="text-2xl font-black text-white">Forgot your password?</h1>
          <p className="text-gray-400 mt-2 text-sm">Enter the email you used for your account or free trial.</p>
        </div>

        <div className="bg-[#002952] rounded-2xl p-8 border border-white/5">
          {sentTo ? (
            <div className="space-y-4 text-sm">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-4 text-green-300">
                <p className="font-bold text-green-200 mb-1">Check your inbox</p>
                If there&apos;s an account for <strong className="text-white">{sentTo}</strong>, we&apos;ve sent a link to choose a new password. It works for 1 hour.
              </div>
              <p className="text-gray-400">
                Nothing after a few minutes? Check your spam folder, or make sure you typed the same email you used for your trial.
              </p>
              <button
                type="button"
                onClick={() => setSentTo(null)}
                className="text-purple-400 hover:text-purple-300 font-semibold"
              >
                Try a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Email address</label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-[#001f3f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black py-3.5 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm text-gray-500">
            Remembered it?{' '}
            <Link href="/auth/login" className="text-purple-400 hover:text-purple-300 font-semibold">Back to sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <ForgotPasswordForm />
    </Suspense>
  )
}
