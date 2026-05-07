import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export const metadata = {
  title: 'My Invoices - ORCA 4K TV IPTV',
}

const statusMap: Record<string, { label: string; color: string }> = {
  pending:   { label: 'Pending',   color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  paid:      { label: 'Paid',      color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  cancelled: { label: 'Cancelled', color: 'bg-red-500/20 text-red-400 border-red-500/30' },
}

export default async function InvoicesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: invoices } = await supabase
    .from('invoices')
    .select('*, orders(plan_name, plan_slug)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="text-2xl font-black text-white mb-6">Invoices</h1>

      {!invoices || invoices.length === 0 ? (
        <div className="bg-[#002952] rounded-2xl p-8 border border-white/5 text-center">
          <i className="fas fa-file-invoice text-4xl text-gray-600 mb-4"></i>
          <p className="text-gray-400">No invoices yet.</p>
        </div>
      ) : (
        <div className="bg-[#002952] rounded-2xl border border-white/5 overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-3 border-b border-white/5 text-xs text-gray-500 uppercase tracking-widest">
            <span>Invoice</span>
            <span>Plan</span>
            <span>Date</span>
            <span>Amount</span>
            <span>Status</span>
          </div>

          {/* Rows */}
          {invoices.map((inv) => {
            const s = statusMap[inv.status] || statusMap.pending
            return (
              <div key={inv.id} className="grid grid-cols-1 md:grid-cols-5 gap-2 md:gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                <span className="text-gray-300 font-mono text-sm">{inv.invoice_number}</span>
                <span className="text-gray-400 text-sm">{(inv as any).orders?.plan_name || '-'}</span>
                <span className="text-gray-500 text-sm">
                  {new Date(inv.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
                <span className="text-white font-bold">${inv.amount}</span>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${s.color}`}>
                    {s.label}
                  </span>
                  {inv.payment_link && inv.status === 'pending' && (
                    <a
                      href={inv.payment_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-green-500 transition-colors whitespace-nowrap"
                    >
                      <i className="fas fa-credit-card mr-1"></i> Pay Now
                    </a>
                  )}
                  {inv.paid_at && (
                    <span className="text-gray-600 text-xs">
                      {new Date(inv.paid_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
