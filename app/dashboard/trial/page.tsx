import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import RevealCredential from '@/components/dashboard/RevealCredential'

export const metadata = {
  title: 'My Free Trial - ORCA 4K TV',
}

type Trial = {
  id: string
  name: string
  email: string
  status: string
  iptv_username: string | null
  iptv_password: string | null
  m3u_url: string | null
  portal_url: string | null
  duration_hours: number | null
  expires_at: string | null
  sent_at: string | null
}

export default async function TrialPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?next=/dashboard/trial')

  const admin = createAdminClient()

  // Look up trial by linked auth_user_id first; fall back to email match for
  // trials sent before account linking was wired up.
  let trial: Trial | null = null

  const { data: linkedTrial } = await admin
    .from('trials')
    .select('id, name, email, status, iptv_username, iptv_password, m3u_url, portal_url, duration_hours, expires_at, sent_at')
    .eq('auth_user_id', user.id)
    .order('sent_at', { ascending: false, nullsFirst: false })
    .limit(1)
    .maybeSingle()

  if (linkedTrial) {
    trial = linkedTrial as Trial
  } else if (user.email) {
    const { data: emailTrial } = await admin
      .from('trials')
      .select('id, name, email, status, iptv_username, iptv_password, m3u_url, portal_url, duration_hours, expires_at, sent_at')
      .ilike('email', user.email)
      .eq('status', 'sent')
      .order('sent_at', { ascending: false, nullsFirst: false })
      .limit(1)
      .maybeSingle()
    if (emailTrial) trial = emailTrial as Trial
  }

  if (!trial || !trial.iptv_username) {
    return (
      <div>
        <h1 className="text-2xl font-black text-white mb-6">My Free Trial</h1>
        <div className="bg-[#002952] rounded-2xl p-8 border border-white/5 text-center">
          <i className="fas fa-bolt text-4xl text-gray-600 mb-4"></i>
          <p className="text-gray-300 font-semibold mb-2">No active trial yet</p>
          <p className="text-gray-400 text-sm mb-6">Request a free trial from the homepage and we&apos;ll email you an activation link.</p>
          <Link href="/#trial" className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
            Request Free Trial
          </Link>
        </div>
      </div>
    )
  }

  const now = Date.now()
  const expiresAt = trial.expires_at ? new Date(trial.expires_at).getTime() : null
  const expired = !!(expiresAt && expiresAt < now)
  const hoursLeft = expiresAt ? Math.max(0, Math.floor((expiresAt - now) / 3600000)) : null
  const minutesLeft = expiresAt ? Math.max(0, Math.floor(((expiresAt - now) % 3600000) / 60000)) : null

  const expiryFormatted = trial.expires_at
    ? new Date(trial.expires_at).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZoneName: 'short',
      })
    : '-'

  return (
    <div>
      <h1 className="text-2xl font-black text-white mb-6">My Free Trial</h1>

      {/* Status bar */}
      <div className="bg-[#002952] rounded-2xl p-6 border border-white/5 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">Orca 4K TV - {trial.duration_hours ?? '-'}-hour trial</p>
            {expired ? (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-gray-500/20 text-gray-400 border-gray-500/30">
                Expired
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-green-500/20 text-green-400 border-green-500/30">
                Active
              </span>
            )}
          </div>
          <div className="text-right">
            <p className="text-gray-300 text-sm font-semibold">Expires {expiryFormatted}</p>
            {!expired && hoursLeft !== null && minutesLeft !== null && (
              <p className="text-purple-300 text-xs mt-1">
                {hoursLeft}h {minutesLeft}m remaining
              </p>
            )}
          </div>
        </div>
      </div>

      {expired ? (
        <div className="bg-gray-500/10 border border-gray-500/20 rounded-2xl p-6 text-gray-300 mb-6">
          <i className="fas fa-clock mr-2"></i>
          Your trial has ended. Upgrade for full access to all channels and 4K content.
          <div className="mt-4">
            <Link href="/#pricing" className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm">
              See plans
            </Link>
          </div>
        </div>
      ) : (
        <div className="bg-[#002952] rounded-2xl p-6 border border-white/5 mb-6">
          <h2 className="text-white font-bold mb-5 flex items-center gap-2">
            <i className="fas fa-key text-purple-400"></i> Login Details
          </h2>
          <div className="space-y-4">
            {trial.iptv_username && (
              <RevealCredential label="Username" value={trial.iptv_username} />
            )}
            {trial.iptv_password && (
              <RevealCredential label="Password" value={trial.iptv_password} secret />
            )}
            <RevealCredential label="Host URL" value="http://line.trxdnscloud.ru" isUrl />
            {trial.m3u_url && (
              <RevealCredential label="M3U URL" value={trial.m3u_url} isUrl />
            )}
            <RevealCredential label="Host URL (Backup 1)" value="http://line.smartcloudtv.com" isUrl />
            <RevealCredential label="Host URL (Backup 2)" value="http://vpn.smartcloudtv.com" isUrl />
            <RevealCredential label="Host URL (Backup 3)" value="http://es.smartcloudtv.com" isUrl />
            <RevealCredential label="Host URL (Backup 4)" value="http://gr.smartcloudtv.com" isUrl />
            <RevealCredential label="Host URL (Backup 5)" value="http://it.smartcloudtv.com" isUrl />
            {trial.portal_url && (
              <RevealCredential label="Portal URL" value={trial.portal_url} isUrl />
            )}
          </div>
        </div>
      )}

      {/* CTAs */}
      <div className="bg-[#002952] rounded-2xl p-6 border border-white/5 mb-6">
        <h2 className="text-white font-bold mb-2">Get set up in minutes</h2>
        <p className="text-gray-400 text-sm mb-4">Step-by-step video tutorials for every device - Firestick, Apple TV, Android, smart TVs, MAG and more.</p>
        <Link
          href="/setup-guide"
          className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-5 py-2.5 rounded-xl hover:opacity-90 transition-opacity text-sm"
        >
          Open setup guide
        </Link>
      </div>

      {!expired && (
        <div className="bg-[#002952] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold mb-2">Liking it so far?</h2>
          <p className="text-gray-400 text-sm mb-4">Upgrade to a full subscription for permanent access, more connections, and priority support.</p>
          <Link
            href="/#pricing"
            className="inline-block bg-white/5 hover:bg-white/10 text-purple-300 font-bold px-5 py-2.5 rounded-xl transition-colors text-sm border border-purple-500/30"
          >
            See plans →
          </Link>
        </div>
      )}
    </div>
  )
}
