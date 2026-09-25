'use client'

import Link from 'next/link'

const Footer: React.FC = () => {
  const scrollToFAQ = () => {
    const el = document.getElementById('faq')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.location.href = '/iptv#faq'
  }

  return (
    <footer className="bg-[#001a36] pt-12 pb-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-10">
          <div>
            <h3 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Company</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Support</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li>
                <button onClick={scrollToFAQ} className="hover:text-white transition-colors text-left">
                  FAQ
                </button>
              </li>
              <li><Link href="/setup-guide" className="hover:text-white transition-colors">Setup Guide</Link></li>
              <li><Link href="/glossary" className="hover:text-white transition-colors">IPTV Glossary</Link></li>
              <li><Link href="/security" className="hover:text-white transition-colors">Security & Encryption</Link></li>
              <li><a href="https://iptvrooms.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">IPTV Forum</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-white mb-6 uppercase text-xs tracking-widest">Legal</h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/dmca" className="hover:text-white transition-colors">DMCA</Link></li>
              <li><Link href="/refund-policy" className="hover:text-white transition-colors">Refund Policy</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-4 text-center md:text-left">
            <Link href="/" className="hover:opacity-80 transition-opacity inline-block" aria-label="Orca 4K TV Home">
              <img src="/logo.png?v=6" alt="Orca 4K TV - best IPTV subscription with 22,000+ live channels in 4K HDR" className="h-16 w-auto" width={1432} height={704} loading="lazy" />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              Premium IPTV service with 22,000+ channels in HD &amp; 4K. Trusted by cord-cutters worldwide.
            </p>
            <div className="flex items-center gap-3 justify-center md:justify-start mt-2">
              <a
                href="https://www.facebook.com/people/Orca-4K-TV/61562824543929/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Orca 4K TV on Facebook"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#1877f2]/20 hover:border-[#1877f2]/40 hover:text-[#1877f2] transition-colors"
              >
                <i className="fab fa-facebook-f text-sm"></i>
              </a>
              <a
                href="https://x.com/orca4ktv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Orca 4K TV on X (Twitter)"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:border-white/30 hover:text-white transition-colors"
              >
                <i className="fab fa-x-twitter text-sm"></i>
              </a>
              <a
                href="https://www.youtube.com/@orca4ktv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to Orca 4K TV on YouTube"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#ff0000]/20 hover:border-[#ff0000]/40 hover:text-[#ff0000] transition-colors"
              >
                <i className="fab fa-youtube text-sm"></i>
              </a>
              <a
                href="https://www.pinterest.com/orca4ktv/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Orca 4K TV on Pinterest"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#e60023]/20 hover:border-[#e60023]/40 hover:text-[#e60023] transition-colors"
              >
                <i className="fab fa-pinterest-p text-sm"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <span>Copyright © 2026 ORCA 4K TV Inc. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/iptv-usa" className="hover:text-gray-400 transition-colors">IPTV USA</Link>
            <Link href="/iptv-uk" className="hover:text-gray-400 transition-colors">IPTV UK</Link>
            <Link href="/iptv-canada" className="hover:text-gray-400 transition-colors">IPTV Canada</Link>
            <Link href="/iptv-germany" className="hover:text-gray-400 transition-colors">IPTV Deutschland</Link>
            <Link href="/iptv-netherlands" className="hover:text-gray-400 transition-colors">IPTV Nederland</Link>
            <Link href="/iptv-sweden" className="hover:text-gray-400 transition-colors">IPTV Sverige</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
