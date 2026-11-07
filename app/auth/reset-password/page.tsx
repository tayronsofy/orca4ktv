'use client'

import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tokenHash = searchParams.get('token_hash')

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [linkExpired, setLinkExpired] = useState(false)
  const [loading, setLoading] = useState(false)
  // The token is single-use: once verified we hold a session, so a retry
  // (e.g. after a too-weak password) only needs updateUser.
  const [verified, setVerified] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    if (password !== confirm) { setError('The two passwords don’t match.'); return }

    setLoading(true)
    const supabase = createClient()

    if (!verified) {
      const { error: verifyErr } = await supabase.auth.verifyOtp({ type: 'recovery', token_hash: tokenHash! })
      if (verifyErr) {
        setLinkExpired(true)
        setLoading(false)
        return
      }
      setVerified(true)
    }

    const { error: updateErr } = await supabase.auth.updateUser({ password })
    if (updateErr) {
      setError(
        /different from the old/i.test(updateErr.message)
          ? 'That’s your current password. Choose a different one, or just sign in with it.'
          : updateErr.message
      )
      setLoading(false)
      return
    }

    router.push('/dashboard')
    router.refresh()
  }

  const missingOrExpired = !tokenHash || linkExpired

  return (
    <div style={{ paddingTop: '140px' }} className="min-h-screen bg-[#001f3f] flex items-start justify-center px-4 pb-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <img src="/logo.png?v=6" alt="Orca 4K TV" className="h-14 w-auto mx-auto mb-6" width={1432} height={704} loading="lazy" />
          </Link>
          <h1 className="text-2xl font-black text-white">Choose a new password</h1>
          <p className="text-gray-400 mt-2 text-sm">You&apos;ll be signed in right after.</p>
        </div>

        <div className="bg-[#002952] rounded-2xl p-8 border border-white/5">
          {missingOrExpired ? (
            <div className="space-y-5 text-sm">
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-4 text-yellow-200">
                {tokenHash
                  ? 'This reset link has expired or was already used. Links work once, for 1 hour.'
                  : 'This page needs the link from your password reset email.'}
              </div>
              <Link
                href="/auth/forgot-password"
                className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black py-3.5 rounded-xl hover:opacity-90 transition-opacity"
              >
                Send me a new link
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="password" className="block text-sm text-gray-400 mb-2">New password</label>
                <input
                  id="password"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full bg-[#001f3f] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label htmlFor="confirm" className="block text-sm text-gray-400 mb-2">Confirm new password</label>
                <input
                  id="confirm"
                  type="password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Type it again"
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
                {loading ? 'Saving…' : 'Save password and sign in'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  )
}
