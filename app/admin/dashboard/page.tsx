import Link from 'next/link'
import AdminShell from '@/components/admin/AdminShell'

export const dynamic = 'force-dynamic'

const SECTIONS = [
  {
    href: '/admin/orders',
    icon: 'fa-receipt',
    title: 'Orders',
    desc: 'Manage orders, invoices, payment links and IPTV credentials.',
  },
  {
    href: '/admin/clients',
    icon: 'fa-users',
    title: 'Clients',
    desc: 'Browse customer profiles, subscriptions and order history.',
  },
  {
    href: '/admin/trials',
    icon: 'fa-stopwatch',
    title: 'Trials',
    desc: 'Review trial requests, send access and manage the account pool.',
  },
  {
    href: '/admin/blog',
    icon: 'fa-newspaper',
    title: 'Blog',
    desc: 'Write, edit and publish posts - by hand or with the AI writer.',
  },
  {
    href: '/admin/panel',
    icon: 'fa-server',
    title: 'Panel',
    desc: 'IPTV reseller panel status, credits and package list.',
  },
  {
    href: '/admin/seo',
    icon: 'fa-magnifying-glass-chart',
    title: 'SEO',
    desc: 'Page metadata overrides, site settings and redirects.',
  },
  {
    href: '/admin/settings',
    icon: 'fa-gear',
    title: 'Settings',
    desc: 'SMTP email configuration and sender identity.',
  },
]

export default function AdminDashboardPage() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {SECTIONS.map(s => (
          <Link
            key={s.href}
            href={s.href}
            className="group bg-[#002952] border border-white/5 rounded-2xl p-6 hover:border-amber-500/30 transition-colors"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center mb-4">
              <i className={`fas ${s.icon} text-[#1a1200]`}></i>
            </div>
            <h2 className="text-lg font-black text-white mb-1 group-hover:text-amber-300 transition-colors">
              {s.title}
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
          </Link>
        ))}
      </div>
    </AdminShell>
  )
}
