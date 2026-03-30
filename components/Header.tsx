'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-3 md:px-6 py-3 md:py-4 flex items-center justify-between ${
        scrolled ? 'bg-[#1f2326] shadow-xl border-b border-gray-800' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center gap-2 md:gap-12">
        <Link
          href="/"
          className="text-lg md:text-2xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity flex items-center shrink-0"
        >
          SMART <span className="text-[#a855f7]">4K</span>
        </Link>

        <nav className="hidden md:flex items-center gap-x-2 md:gap-8 text-[10px] md:text-sm font-bold text-gray-300 uppercase tracking-widest">
          <Link href="/#pricing" className="hover:text-white transition-colors uppercase" aria-label="View Pricing">
            Pricing
          </Link>
          <Link href="/channels" className="hover:text-white transition-colors uppercase" aria-label="View Channels">
            Channels
          </Link>
          <Link href="/blog" className="hover:text-white transition-colors uppercase" aria-label="View Blog">
            Blog
          </Link>
          <Link href="/resellers" className="hover:text-white transition-colors uppercase" aria-label="View Reseller">
            Reseller
          </Link>
        </nav>
      </div>

      <div className="flex items-center gap-2 md:gap-6 shrink-0">
        {/* Region Flags */}
        <div className="flex items-center gap-2 border-r border-gray-700 pr-2 md:pr-6">
          <Link
            href="/iptv-usa"
            title="USA IPTV"
            className={`transition-transform hover:scale-110 block ${pathname === '/iptv-usa' ? 'ring-2 ring-purple-500 rounded-sm scale-110' : 'opacity-60 hover:opacity-100'}`}
          >
            <img src="https://flagcdn.com/w40/us.png" alt="USA" className="w-5 h-[14px] md:w-6 md:h-4 object-cover rounded-[2px] shadow-sm" />
          </Link>
          <Link
            href="/iptv-uk"
            title="UK IPTV"
            className={`transition-transform hover:scale-110 block ${pathname === '/iptv-uk' ? 'ring-2 ring-purple-500 rounded-sm scale-110' : 'opacity-60 hover:opacity-100'}`}
          >
            <img src="https://flagcdn.com/w40/gb.png" alt="UK" className="w-5 h-[14px] md:w-6 md:h-4 object-cover rounded-[2px] shadow-sm" />
          </Link>
          <Link
            href="/iptv-canada"
            title="Canada IPTV"
            className={`transition-transform hover:scale-110 block ${pathname === '/iptv-canada' ? 'ring-2 ring-purple-500 rounded-sm scale-110' : 'opacity-60 hover:opacity-100'}`}
          >
            <img src="https://flagcdn.com/w40/ca.png" alt="Canada" className="w-5 h-[14px] md:w-6 md:h-4 object-cover rounded-[2px] shadow-sm" />
          </Link>
        </div>

        <Link
          href="/trial"
          className="bg-[#6d28d9] text-white px-3 md:px-6 py-2 rounded-full text-[10px] md:text-sm font-black uppercase tracking-tighter hover:bg-[#5b21b6] transition-all transform hover:scale-105 shadow-lg shadow-[#a855f7]/20 whitespace-nowrap"
        >
          Free Trial
        </Link>
      </div>
    </header>
  )
}

export default Header
