'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DELAY_MS = 8000

interface PopupOffer {
  code: string
  /** Show this offer until this instant; null = no end. */
  endsAt: string | null
  badge: string
  title: React.ReactNode
  body: string
  cta: string
  href: string
  accent: 'gold' | 'cyan'
}

/**
 * Offers in priority order: the first one that hasn't ended is shown.
 * BLACKFRIDAY26 matches the coupon's valid_until in Supabase, so the popup
 * reverts to WELCOME15 by itself when the sale ends.
 */
const OFFERS: PopupOffer[] = [
  {
    code: 'BLACKFRIDAY26',
    endsAt: '2026-12-01T07:59:59Z', // Mon 30 Nov 2026, 23:59 US Pacific
    badge: 'Black Friday',
    title: <>15% off every plan<br /><span className="text-[#f2c14e]">+ up to 3 months free</span></>,
    body: 'Pay for 12 months, get 15. Works for new and returning customers. Ends Monday 30 November.',
    cta: 'Claim the deal →',
    href: '/order?plan=12-months&connections=1&coupon=BLACKFRIDAY26',
    accent: 'gold',
  },
  {
    code: 'WELCOME15',
    endsAt: null,
    badge: 'New Customer Offer',
    title: <>Get <span className="text-[#00E5FF]">15% OFF</span><br />Your First Plan</>,
    body: '22,000+ live channels in 4K HDR - UK football, American football, 2026 open-wheel motorsport, every match. Use the code below at checkout.',
    cta: 'View Plans →',
    href: '/iptv-shop?coupon=WELCOME15',
    accent: 'cyan',
  },
]

/** Pages where the popup must never cover the form: sign-in, sign-up, password reset. */
const HIDDEN_PREFIXES = ['/auth']

function currentOffer(): PopupOffer | null {
  const now = Date.now()
  return OFFERS.find(o => !o.endsAt || now < Date.parse(o.endsAt)) ?? null
}

export default function CouponPopup() {
  const pathname = usePathname() || '/'
  const hiddenHere = HIDDEN_PREFIXES.some(p => pathname === p || pathname.startsWith(`${p}/`))

  const [offer, setOffer] = useState<PopupOffer | null>(null)
  const [show, setShow] = useState(false)
  const [copied, setCopied] = useState(false)

  // One "seen" flag per code, so people who dismissed WELCOME15 still see a new campaign once.
  const storageKey = offer ? `orca4ktv_coupon_popup_seen_${offer.code}` : ''

  useEffect(() => {
    if (typeof window === 'undefined' || hiddenHere) return
    const o = currentOffer()
    if (!o) return
    try {
      if (localStorage.getItem(`orca4ktv_coupon_popup_seen_${o.code}`)) return
    } catch {
      // storage blocked: still show once per page load
    }
    setOffer(o)
    const t = setTimeout(() => setShow(true), DELAY_MS)
    return () => clearTimeout(t)
  }, [hiddenHere])

  const dismiss = () => {
    try {
      if (storageKey) localStorage.setItem(storageKey, '1')
    } catch {
      // ignore
    }
    setShow(false)
  }

  const copy = async () => {
    if (!offer) return
    try {
      await navigator.clipboard.writeText(offer.code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked - silently no-op
    }
  }

  if (!show || !offer || hiddenHere) return null

  const gold = offer.accent === 'gold'
  const accentText = gold ? 'text-[#f2c14e]' : 'text-[#00E5FF]'
  const accentBorder = gold ? 'border-[#f2c14e]/40' : 'border-[#00E5FF]/30'
  const accentBg = gold ? 'bg-[#f2c14e]' : 'bg-[#00E5FF]'
  const accentShadow = gold ? 'shadow-[#f2c14e]/20' : 'shadow-[#00E5FF]/20'
  const panelBg = gold ? 'from-[#14120c] to-[#0b0d12]' : 'from-[#001f3f] to-[#002952]'
  const btnText = gold ? 'text-[#140e02]' : 'text-[#001f3f]'

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="coupon-popup-title"
    >
      <div
        className={`relative bg-gradient-to-br ${panelBg} rounded-3xl p-8 max-w-md w-full border ${accentBorder} shadow-2xl ${accentShadow}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          aria-label="Close popup"
        >
          <i className="fas fa-times text-sm"></i>
        </button>

        <div className="text-center">
          <div className={`inline-block px-4 py-1.5 rounded-full bg-white/5 border ${accentBorder} ${accentText} text-xs font-black uppercase tracking-[0.2em] mb-5`}>
            {offer.badge}
          </div>

          <h2 id="coupon-popup-title" className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
            {offer.title}
          </h2>

          <p className="text-gray-400 mb-6 leading-relaxed">{offer.body}</p>

          <div className={`bg-black/40 border-2 border-dashed ${accentBorder} rounded-2xl p-4 mb-6`}>
            <div className="text-gray-500 text-xs uppercase tracking-widest mb-2">Coupon Code</div>
            <div className="flex items-center justify-center gap-3">
              <code className={`text-2xl md:text-3xl font-black ${accentText} tracking-wider`}>{offer.code}</code>
              <button
                onClick={copy}
                className={`px-3 py-1.5 rounded-lg ${accentBg} ${btnText} text-xs font-black uppercase hover:bg-white transition-colors`}
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <Link
            href={offer.href}
            onClick={dismiss}
            className={`block w-full ${accentBg} ${btnText} font-black uppercase tracking-wider py-4 rounded-full hover:bg-white transition-colors shadow-xl ${accentShadow}`}
          >
            {offer.cta}
          </Link>

          <button
            onClick={dismiss}
            className="mt-3 text-gray-500 text-xs hover:text-gray-300 transition-colors"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  )
}
