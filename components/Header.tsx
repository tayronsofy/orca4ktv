'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })
    return () => subscription.unsubscribe()
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // inert on drawer when closed — removes focusable children from tab order + a11y tree
  useEffect(() => {
    const el = drawerRef.current
    if (!el) return
    if (!mobileOpen) {
      el.setAttribute('inert', '')
    } else {
      el.removeAttribute('inert')
    }
  }, [mobileOpen])

  const navLinks = [
    { href: '/#pricing', label: 'Pricing' },
    { href: '/iptv-shop', label: 'Shop' },
    { href: '/channels', label: 'Channels' },
    { href: '/live-matches', label: 'Live' },
    { href: '/blog', label: 'Blog' },
    { href: '/resellers', label: 'Reseller' },
  ]

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between ${
          scrolled || mobileOpen ? 'bg-[#1f2326] shadow-xl border-b border-gray-800' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="hover:opacity-80 transition-opacity flex items-center shrink-0"
          aria-label="Smart 4K Home"
        >
          <Image src="/logo.png?v=2" alt="SMART 4K IPTV" width={1263} height={399} className="h-10 md:h-12 w-auto" priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-300 uppercase tracking-widest">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="hover:text-white transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-3 md:gap-6 shrink-0">
          {/* Region Flags */}
          <div className="flex items-center gap-2 border-r border-gray-700 pr-3 md:pr-6">
            <Link href="/iptv-usa" title="USA IPTV" className={`transition-transform hover:scale-110 block ${pathname === '/iptv-usa' ? 'ring-2 ring-purple-500 rounded-sm scale-110' : 'opacity-60 hover:opacity-100'}`}>
              <img src="https://flagcdn.com/w40/us.png" alt="USA" width={24} height={16} loading="lazy" className="w-5 h-[14px] md:w-6 md:h-4 object-cover rounded-[2px] shadow-sm" />
            </Link>
            <Link href="/iptv-uk" title="UK IPTV" className={`transition-transform hover:scale-110 block ${pathname === '/iptv-uk' ? 'ring-2 ring-purple-500 rounded-sm scale-110' : 'opacity-60 hover:opacity-100'}`}>
              <img src="https://flagcdn.com/w40/gb.png" alt="UK" width={24} height={16} loading="lazy" className="w-5 h-[14px] md:w-6 md:h-4 object-cover rounded-[2px] shadow-sm" />
            </Link>
            <Link href="/iptv-canada" title="Canada IPTV" className={`transition-transform hover:scale-110 block ${pathname === '/iptv-canada' ? 'ring-2 ring-purple-500 rounded-sm scale-110' : 'opacity-60 hover:opacity-100'}`}>
              <img src="https://flagcdn.com/w40/ca.png" alt="Canada" width={24} height={16} loading="lazy" className="w-5 h-[14px] md:w-6 md:h-4 object-cover rounded-[2px] shadow-sm" />
            </Link>
            <Link href="/iptv-germany" title="Germany IPTV" className={`transition-transform hover:scale-110 block ${pathname === '/iptv-germany' ? 'ring-2 ring-purple-500 rounded-sm scale-110' : 'opacity-60 hover:opacity-100'}`}>
              <img src="https://flagcdn.com/w40/de.png" alt="Germany" width={24} height={16} loading="lazy" className="w-5 h-[14px] md:w-6 md:h-4 object-cover rounded-[2px] shadow-sm" />
            </Link>
            <Link href="/iptv-netherlands" title="Netherlands IPTV" className={`transition-transform hover:scale-110 block ${pathname === '/iptv-netherlands' ? 'ring-2 ring-purple-500 rounded-sm scale-110' : 'opacity-60 hover:opacity-100'}`}>
              <img src="https://flagcdn.com/w40/nl.png" alt="Netherlands" width={24} height={16} loading="lazy" className="w-5 h-[14px] md:w-6 md:h-4 object-cover rounded-[2px] shadow-sm" />
            </Link>
          </div>

          {/* My Account / Login - desktop only */}
          {isLoggedIn ? (
            <Link
              href="/dashboard"
              className="hidden md:inline-flex items-center gap-2 text-gray-300 hover:text-white text-sm font-bold transition-colors"
            >
              <i className="fas fa-user-circle text-purple-400"></i> My Account
            </Link>
          ) : (
            <Link
              href="/auth/login"
              className="hidden md:inline-flex items-center gap-2 text-gray-300 hover:text-white text-sm font-bold transition-colors"
            >
              <i className="fas fa-sign-in-alt text-purple-400"></i> Login
            </Link>
          )}

          {/* Free Trial - desktop only */}
          <Link
            href="/trial"
            className="hidden md:inline-flex bg-[#6d28d9] text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-tighter hover:bg-[#5b21b6] transition-all transform hover:scale-105 shadow-lg shadow-[#a855f7]/20 whitespace-nowrap"
          >
            Free Trial
          </Link>

          {/* Free Trial — mobile only, visible in top bar */}
          <Link
            href="/trial"
            className="md:hidden bg-[#6d28d9] text-white px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-tight hover:bg-[#5b21b6] transition-all whitespace-nowrap"
          >
            Free Trial
          </Link>

          {/* Hamburger - mobile only */}
          <button
            onClick={() => setMobileOpen(prev => !prev)}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[2px] bg-white rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        ref={drawerRef}
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-[#1a1d20] border-l border-white/10 shadow-2xl transition-transform duration-300 flex flex-col ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
            <Image src="/logo.png?v=2" alt="SMART 4K IPTV" width={1263} height={399} className="h-9 w-auto" />
            <button
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-all"
              aria-label="Close menu"
            >
              <i className="fas fa-times text-gray-400 text-sm"></i>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col px-6 py-6 gap-1 flex-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 font-bold uppercase tracking-widest text-sm hover:text-white hover:bg-white/5 transition-all"
              >
                {link.label}
              </Link>
            ))}

            <div className="border-t border-white/10 mt-4 pt-4 px-0">
              <Link
                href="/trial"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#6d28d9] to-[#a855f7] text-white py-3 rounded-xl font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all shadow-lg shadow-[#a855f7]/20 mb-4"
              >
                <i className="fas fa-play text-xs"></i>
                Free Trial
              </Link>
            </div>

            <div className="border-t border-white/10 pt-6">
              <p className="text-xs text-gray-400 uppercase tracking-widest mb-3 px-4">Regions</p>
              <div className="flex flex-col gap-1">
                <Link href="/iptv-usa" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 font-bold text-sm hover:text-white hover:bg-white/5 transition-all">
                  <img src="https://flagcdn.com/w40/us.png" alt="USA" width={24} height={16} loading="lazy" className="w-6 h-4 object-cover rounded-[2px]" />
                  IPTV USA
                </Link>
                <Link href="/iptv-uk" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 font-bold text-sm hover:text-white hover:bg-white/5 transition-all">
                  <img src="https://flagcdn.com/w40/gb.png" alt="UK" width={24} height={16} loading="lazy" className="w-6 h-4 object-cover rounded-[2px]" />
                  IPTV UK
                </Link>
                <Link href="/iptv-canada" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 font-bold text-sm hover:text-white hover:bg-white/5 transition-all">
                  <img src="https://flagcdn.com/w40/ca.png" alt="Canada" width={24} height={16} loading="lazy" className="w-6 h-4 object-cover rounded-[2px]" />
                  IPTV Canada
                </Link>
                <Link href="/iptv-germany" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 font-bold text-sm hover:text-white hover:bg-white/5 transition-all">
                  <img src="https://flagcdn.com/w40/de.png" alt="Germany" width={24} height={16} loading="lazy" className="w-6 h-4 object-cover rounded-[2px]" />
                  IPTV Deutschland
                </Link>
                <Link href="/iptv-netherlands" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 font-bold text-sm hover:text-white hover:bg-white/5 transition-all">
                  <img src="https://flagcdn.com/w40/nl.png" alt="Netherlands" width={24} height={16} loading="lazy" className="w-6 h-4 object-cover rounded-[2px]" />
                  IPTV Nederland
                </Link>
              </div>
            </div>
          </nav>

          {/* CTA */}
          <div className="px-6 py-6 border-t border-white/10 space-y-3">
            {isLoggedIn ? (
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 w-full bg-white/10 text-white py-3 rounded-full font-bold text-sm hover:bg-white/15 transition-all border border-white/10"
              >
                <i className="fas fa-user-circle text-purple-400"></i>
                My Account
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="flex items-center justify-center gap-2 w-full bg-white/10 text-white py-3 rounded-full font-bold text-sm hover:bg-white/15 transition-all border border-white/10"
              >
                <i className="fas fa-sign-in-alt text-purple-400"></i>
                Login
              </Link>
            )}
            <Link
              href="/trial"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#6d28d9] to-[#a855f7] text-white py-4 rounded-full font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all shadow-lg shadow-[#a855f7]/20"
            >
              <i className="fas fa-play text-xs"></i>
              Free Trial
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
