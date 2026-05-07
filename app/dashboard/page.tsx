import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'My Dashboard - ORCA 4K TV IPTV',
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { label: string; color: string }> = {
    active:          { label: 'Active',          color: 'bg-green-500/20 text-green-400 border-green-500/30' },
    pending_payment: { label: 'Awaiting Payment', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
    paid:            { label: 'Paid - Activating', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    expired:         { label: 'Expired',         color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' },
    cancelled:       { label: 'Cancelled',       color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  }
  const s = map[status] || { label: status, color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${s.color}`}>
      {s.label}
    </span>
  )
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ ordered?: string }> }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const params = await searchParams
  const justOrdered = params.ordered === '1'

  const [{ data: profile }, { data: subscription }, { data: latestOrder }] = await Promise.all([
    supabase.from('profiles').select('full_name').eq('id', user.id).single(),
    supabase.from('subscriptions').select('*').eq('user_id', user.id).eq('status', 'active').order('end_date', { ascending: false }).limit(1).single(),
    supabase.from('orders').select('*, invoices(*)').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).single(),
  ])

  const daysLeft = subscription?.end_date
    ? Math.ceil((new Date(subscription.end_date).getTime() - Date.now()) / 86400000)
    : null

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">
          Hello, {profile?.full_name?.split(' ')[0] || 'there'} 👋
        </h1>
        <p className="text-gray-400 mt-1">Welcome to your ORCA 4K TV dashboard</p>
      </div>

      {justOrdered && (
        <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-2xl px-6 py-4 flex items-start gap-3">
          <i className="fas fa-check-circle text-green-400 mt-0.5"></i>
          <div>
            <p className="text-green-300 font-semibold">Order placed successfully!</p>
            <p className="text-green-400/70 text-sm mt-1">We&apos;ll send your payment instructions to your email within 24 hours.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active subscription card */}
        <div className="bg-[#002952] rounded-2xl p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <i className="fas fa-satellite-dish text-purple-400"></i>
            <h2 className="text-white font-bold">Active Subscription</h2>
          </div>

          {subscription ? (
            <>
              <div className="mb-4">
                <StatusBadge status="active" />
                <p className="text-gray-400 text-sm mt-3">
                  Expires <span className="text-white font-semibold">
                    {new Date(subscription.end_date!).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </p>
                {daysLeft !== null && (
                  <p className={`text-sm mt-1 ${daysLeft <= 7 ? 'text-orange-400' : 'text-gray-500'}`}>
                    {daysLeft > 0 ? `${daysLeft} days remaining` : 'Expired'}
                  </p>
                )}
              </div>
              <Link
                href="/dashboard/subscription"
                className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-medium"
              >
                View credentials <i className="fas fa-arrow-right text-xs"></i>
              </Link>
            </>
          ) : (
            <div>
              <p className="text-gray-400 text-sm mb-4">No active subscription yet.</p>
              <Link
                href="/iptv-shop"
                className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:opacity-90 transition-opacity"
              >
                Browse Plans
              </Link>
            </div>
          )}
        </div>

        {/* Latest order / invoice */}
        <div className="bg-[#002952] rounded-2xl p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-4">
            <i className="fas fa-file-invoice text-blue-400"></i>
            <h2 className="text-white font-bold">Latest Order</h2>
          </div>

          {latestOrder ? (
            <>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-gray-400 text-sm">{latestOrder.plan_name}</span>
                <StatusBadge status={latestOrder.status} />
              </div>
              <p className="text-2xl font-black text-white mb-1">${latestOrder.amount}</p>
              <p className="text-gray-500 text-xs mb-4">
                Placed {new Date(latestOrder.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
              </p>
              {latestOrder.status === 'pending_payment' && (() => {
                const paymentLink = (latestOrder as any).invoices?.[0]?.payment_link
                return paymentLink ? (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl px-4 py-3">
                    <p className="text-green-300 text-sm font-semibold mb-2">
                      <i className="fas fa-check-circle mr-2"></i>Your invoice is ready - complete your payment to activate
                    </p>
                    <a
                      href={paymentLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-green-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-green-500 transition-colors"
                    >
                      <i className="fas fa-credit-card mr-2"></i>Pay Now
                    </a>
                  </div>
                ) : (
                  <p className="text-yellow-400/80 text-sm bg-yellow-500/10 rounded-xl px-3 py-2">
                    <i className="fas fa-clock mr-2"></i>
                    Waiting for payment link - we&apos;ll email you shortly.
                  </p>
                )
              })()}
            </>
          ) : (
            <p className="text-gray-400 text-sm">No orders yet.</p>
          )}
        </div>

        {/* Quick links */}
        <div className="md:col-span-2 bg-[#002952] rounded-2xl p-6 border border-white/5">
          <h2 className="text-white font-bold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { href: '/dashboard/subscription', icon: 'fas fa-key', label: 'My Credentials' },
              { href: '/dashboard/invoices', icon: 'fas fa-receipt', label: 'Invoices' },
              { href: '/iptv-shop', icon: 'fas fa-shopping-cart', label: 'Renew / Upgrade' },
              { href: '/setup-guide', icon: 'fas fa-question-circle', label: 'Setup Guide' },
            ].map(l => (
              <Link
                key={l.href}
                href={l.href}
                className="flex flex-col items-center gap-2 bg-[#001f3f] rounded-xl p-4 border border-white/5 hover:border-purple-500/30 hover:bg-white/5 transition-all text-center"
              >
                <i className={`${l.icon} text-xl text-purple-400`}></i>
                <span className="text-sm text-gray-300">{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
