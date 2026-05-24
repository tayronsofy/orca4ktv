import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import RevealCredential from '@/components/dashboard/RevealCredential'

export const metadata = {
  title: 'My Subscription - ORCA 4K TV IPTV',
}

export default async function SubscriptionPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: subscriptions } = await supabase
    .from('subscriptions')
    .select('*, orders(plan_name, plan_slug), subscription_credentials(*)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const active = subscriptions?.find(s => s.status === 'active')
  const all = subscriptions || []

  if (all.length === 0) {
    return (
      <div>
        <h1 className="text-2xl font-black text-white mb-6">My Subscription</h1>
        <div className="bg-[#002952] rounded-2xl p-8 border border-white/5 text-center">
          <i className="fas fa-satellite-dish text-4xl text-gray-600 mb-4"></i>
          <p className="text-gray-400 mb-4">You don&apos;t have an active subscription yet.</p>
          <a href="/iptv-shop" className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity">
            Browse Plans
          </a>
        </div>
      </div>
    )
  }

  const sub = active || all[0]
  const daysLeft = sub.end_date
    ? Math.ceil((new Date(sub.end_date).getTime() - Date.now()) / 86400000)
    : null

  const statusColor = {
    active:    'bg-green-500/20 text-green-400 border-green-500/30',
    pending:   'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    expired:   'bg-gray-500/20 text-gray-400 border-gray-500/30',
    suspended: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    cancelled: 'bg-red-500/20 text-red-400 border-red-500/30',
  }[sub.status] || 'bg-gray-500/20 text-gray-400 border-gray-500/30'

  return (
    <div>
      <h1 className="text-2xl font-black text-white mb-6">My Subscription</h1>

      {/* Status bar */}
      <div className="bg-[#002952] rounded-2xl p-6 border border-white/5 mb-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-gray-400 text-sm mb-1">{(sub as any).orders?.plan_name || 'IPTV Plan'}</p>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColor}`}>
              {sub.status.charAt(0).toUpperCase() + sub.status.slice(1)}
            </span>
          </div>
          <div className="text-right">
            {sub.start_date && (
              <p className="text-gray-500 text-xs">Started {new Date(sub.start_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            )}
            {sub.end_date && (
              <p className="text-gray-300 text-sm font-semibold">
                Expires {new Date(sub.end_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            )}
            {daysLeft !== null && daysLeft <= 14 && daysLeft > 0 && (
              <p className="text-orange-400 text-xs mt-1">{daysLeft} days remaining - consider renewing</p>
            )}
          </div>
        </div>
      </div>

      {/* Credentials - one card per connection slot */}
      {(() => {
          const slotRows: Array<{
            slot: number
            iptv_username: string | null
            iptv_password: string | null
            m3u_url: string | null
            portal_url: string | null
            host_url_backups: string[] | null
          }> = ((sub as any).subscription_credentials || [])
            .slice()
            .sort((a: { slot: number }, b: { slot: number }) => a.slot - b.slot)

          // Legacy fallback: pre-migration single-credential subscriptions
          const credSlots = slotRows.length > 0
            ? slotRows
            : sub.iptv_username
              ? [{ slot: 1, iptv_username: sub.iptv_username, iptv_password: sub.iptv_password, m3u_url: sub.m3u_url, portal_url: sub.portal_url, host_url_backups: null }]
              : []

          if (credSlots.length === 0) {
            return (
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 text-blue-300 mb-6">
                <i className="fas fa-hourglass-half mr-2"></i>
                Your credentials are being prepared. You&apos;ll receive an email once your subscription is activated.
              </div>
            )
          }

          const showSlotLabel = credSlots.length > 1

          return (
            <div className="space-y-6 mb-6">
              {credSlots.map(c => (
                <div key={c.slot} className="bg-[#002952] rounded-2xl p-6 border border-white/5">
                  <h2 className="text-white font-bold mb-5 flex items-center gap-2">
                    <i className="fas fa-key text-purple-400"></i>
                    {showSlotLabel ? `Connection ${c.slot} of ${credSlots.length}` : 'IPTV Credentials'}
                  </h2>
                  <div className="space-y-4">
                    {c.iptv_username && (
                      <RevealCredential label="Username" value={c.iptv_username} />
                    )}
                    {c.iptv_password && (
                      <RevealCredential label="Password" value={c.iptv_password} secret />
                    )}
                    <RevealCredential label="Host URL" value="http://line.trxdnscloud.ru" isUrl />
                    {c.m3u_url && (
                      <RevealCredential label="M3U URL" value={c.m3u_url} isUrl />
                    )}
                    {c.portal_url && (
                      <RevealCredential label="Portal URL" value={c.portal_url} isUrl />
                    )}
                    {(c.host_url_backups || [])
                      .filter(b => b && b.trim())
                      .map((b, i) => (
                        <RevealCredential key={i} label={`Host URL (Backup ${i + 1})`} value={b} isUrl />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )
        })()}

      {/* Device MACs */}
      {sub.mac_addresses && sub.mac_addresses.length > 0 && (
        <div className="bg-[#002952] rounded-2xl p-6 border border-white/5 mb-6">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2">
            <i className="fas fa-tv text-blue-400"></i> Registered Devices
          </h2>
          <div className="space-y-2">
            {sub.mac_addresses.map((mac: string, i: number) => (
              <div key={i} className="flex items-center justify-between bg-[#001f3f] rounded-xl px-4 py-3">
                <span className="text-gray-400 text-sm">Device {i + 1}</span>
                <span className="text-white font-mono text-sm">{mac}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Connections info */}
      <div className="bg-[#002952] rounded-2xl p-6 border border-white/5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-white font-bold">Simultaneous connections</h2>
            <p className="text-gray-400 text-sm mt-1">Stream on up to this many devices at the same time</p>
          </div>
          <span className="text-3xl font-black text-purple-400">{sub.connections}</span>
        </div>
      </div>
    </div>
  )
}
