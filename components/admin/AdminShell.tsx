'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'fa-gauge-high' },
  { href: '/admin/orders', label: 'Orders', icon: 'fa-receipt' },
  { href: '/admin/clients', label: 'Clients', icon: 'fa-users' },
  { href: '/admin/trials', label: 'Trials', icon: 'fa-stopwatch' },
  { href: '/admin/panel', label: 'Panel', icon: 'fa-server' },
  { href: '/admin/blog', label: 'Blog', icon: 'fa-newspaper' },
  { href: '/admin/seo', label: 'SEO', icon: 'fa-magnifying-glass-chart' },
  { href: '/admin/settings', label: 'Settings', icon: 'fa-gear' },
]

export default function AdminShell({
  title,
  actions,
  children,
}: {
  title: string
  actions?: React.ReactNode
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()

  const isActive = (href: string) =>
    pathname === href || (href !== '/admin/dashboard' && pathname?.startsWith(href))

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-[#000a1c] text-white">
      {/* Sticky top bar */}
      <header className="sticky top-0 z-50 bg-[#000a1c]/95 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-6 min-w-0">
              <Link href="/admin/dashboard" className="shrink-0 flex items-center gap-2">
                <Image src="/logo.png?v=6" alt="Orca 4K TV Admin" width={1432} height={704} className="h-10 w-auto" />
                <span className="hidden lg:inline text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
                  Admin
                </span>
              </Link>

              {/* Desktop nav */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV_ITEMS.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors ${
                      isActive(item.href)
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-[#1a1200]'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="hidden sm:inline text-gray-500 hover:text-white text-sm transition-colors"
                title="View site"
              >
                <i className="fas fa-arrow-up-right-from-square mr-1"></i> Site
              </Link>
              <button
                onClick={logout}
                className="text-gray-500 hover:text-red-400 text-sm font-semibold transition-colors"
              >
                <i className="fas fa-right-from-bracket mr-1"></i> Logout
              </button>
            </div>
          </div>

          {/* Mobile scrollable pill nav */}
          <nav className="md:hidden flex gap-2 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-none">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  isActive(item.href)
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-[#1a1200]'
                    : 'bg-white/5 text-gray-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      {/* Page header + content */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-black">{title}</h1>
          {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
        {children}
      </main>
    </div>
  )
}
