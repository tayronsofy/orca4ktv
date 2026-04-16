'use client'

import Link from 'next/link'

const Footer: React.FC = () => {
  const scrollToFAQ = () => {
    const el = document.getElementById('faq')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.location.href = '/#faq'
  }

  return (
    <footer className="bg-[#1a1d20] pt-12 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-10">
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Support</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <button onClick={scrollToFAQ} className="hover:text-white transition-colors text-left">
                  FAQ
                </button>
              </li>
              <li><a href="https://iptvrooms.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IPTV Forum</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Legal</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/dmca" className="hover:text-white transition-colors">DMCA</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center md:text-left">
            <Link href="/" className="hover:opacity-80 transition-opacity inline-block" aria-label="Smart 4K Home">
              <img src="/logo.png" alt="SMART 4K IPTV" className="h-12 w-auto" />
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Premium IPTV service with 22,000+ channels in HD &amp; 4K. Trusted by cord-cutters worldwide.
            </p>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <span>Copyright © 2026 SMART 4K Inc. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/iptv-usa" className="hover:text-gray-400 transition-colors">IPTV USA</Link>
            <Link href="/iptv-uk" className="hover:text-gray-400 transition-colors">IPTV UK</Link>
            <Link href="/iptv-canada" className="hover:text-gray-400 transition-colors">IPTV Canada</Link>
            <Link href="/iptv-germany" className="hover:text-gray-400 transition-colors">IPTV Deutschland</Link>
            <Link href="/iptv-netherlands" className="hover:text-gray-400 transition-colors">IPTV Nederland</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
