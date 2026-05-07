'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'orca4ktv_coupon_popup_seen_2026'
const DELAY_MS = 8000
const COUPON_CODE = 'WELCOME15'

export default function CouponPopup() {
  const [show, setShow] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (localStorage.getItem(STORAGE_KEY)) return
    const t = setTimeout(() => setShow(true), DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  const dismiss = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, '1')
    }
    setShow(false)
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(COUPON_CODE)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard blocked - silently no-op
    }
  }

  if (!show) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-black/70 backdrop-blur-sm"
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-labelledby="coupon-popup-title"
    >
      <div
        className="relative bg-gradient-to-br from-[#001f3f] to-[#002952] rounded-3xl p-8 max-w-md w-full border border-[#00E5FF]/30 shadow-2xl shadow-[#00E5FF]/20"
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
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#00E5FF]/10 border border-[#00E5FF]/30 text-[#00E5FF] text-xs font-black uppercase tracking-[0.2em] mb-5">
            New Customer Offer
          </div>

          <h2 id="coupon-popup-title" className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
            Get <span className="text-[#00E5FF]">15% OFF</span>
            <br />Your First Plan
          </h2>

          <p className="text-gray-400 mb-6 leading-relaxed">
            22,000+ live channels in 4K HDR - UK football, American football, 2026 open-wheel motorsport, every match. Use the code below at checkout.
          </p>

          <div className="bg-black/40 border-2 border-dashed border-[#00E5FF]/50 rounded-2xl p-4 mb-6">
            <div className="text-gray-500 text-xs uppercase tracking-widest mb-2">Coupon Code</div>
            <div className="flex items-center justify-center gap-3">
              <code className="text-2xl md:text-3xl font-black text-[#00E5FF] tracking-wider">{COUPON_CODE}</code>
              <button
                onClick={copy}
                className="px-3 py-1.5 rounded-lg bg-[#00E5FF] text-[#001f3f] text-xs font-black uppercase hover:bg-white transition-colors"
              >
                {copied ? '✓ Copied' : 'Copy'}
              </button>
            </div>
          </div>

          <Link
            href={`/iptv-shop?coupon=${COUPON_CODE}`}
            onClick={dismiss}
            className="block w-full bg-[#00E5FF] text-[#001f3f] font-black uppercase tracking-wider py-4 rounded-full hover:bg-white transition-colors shadow-xl shadow-[#00E5FF]/30"
          >
            View Plans →
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
