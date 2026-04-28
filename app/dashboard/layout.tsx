import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: 'fas fa-home' },
  { href: '/dashboard/trial', label: 'Free Trial', icon: 'fas fa-bolt' },
  { href: '/dashboard/subscription', label: 'Subscription', icon: 'fas fa-satellite-dish' },
  { href: '/dashboard/invoices', label: 'Invoices', icon: 'fas fa-file-invoice' },
  { href: '/dashboard/profile', label: 'Profile', icon: 'fas fa-user' },
]

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, email')
    .eq('id', user.id)
    .single()

  return (
    <div style={{ paddingTop: '80px' }} className="min-h-screen bg-[#001f3f]">
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-80px)] bg-[#001530] border-r border-white/5 px-4 py-8 sticky top-20">
          {/* User info */}
          <div className="mb-8 px-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center text-white font-black text-lg mb-3">
              {(profile?.full_name || user.email || 'U')[0].toUpperCase()}
            </div>
            <p className="text-white font-semibold text-sm truncate">{profile?.full_name || 'My Account'}</p>
            <p className="text-gray-500 text-xs truncate">{user.email}</p>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium"
              >
                <i className={`${item.icon} w-4 text-center`}></i>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Logout */}
          <form action="/api/auth/logout" method="POST" className="mt-4">
            <button
              type="submit"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-gray-500 hover:text-white hover:bg-white/5 transition-all text-sm w-full"
            >
              <i className="fas fa-sign-out-alt w-4 text-center"></i>
              Sign out
            </button>
          </form>
        </aside>

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#001530] border-t border-white/5 z-50 flex">
          {navItems.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="flex-1 flex flex-col items-center py-3 text-gray-500 hover:text-white transition-colors"
            >
              <i className={`${item.icon} text-lg mb-1`}></i>
              <span className="text-[10px]">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 p-6 md:p-10 pb-24 md:pb-10">
          {children}
        </main>
      </div>

      {/* Telegram support button */}
      <a
        href="https://t.me/Orca4ktv"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex items-center gap-2 bg-[#229ED9] hover:bg-[#1a8bbf] text-white font-bold px-4 py-3 rounded-full shadow-xl hover:shadow-[#229ED9]/40 transition-all hover:scale-105"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 13.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/>
        </svg>
        <span className="text-sm">Need Help?</span>
      </a>
    </div>
  )
}
