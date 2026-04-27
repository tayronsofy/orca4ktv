'use client'

import React from 'react'

interface TrialBottomCTAProps {
  onScrollToForm: () => void
}

const TrialBottomCTA: React.FC<TrialBottomCTAProps> = ({ onScrollToForm }) => {
  return (
    <section className="py-24 px-4 bg-gradient-to-br from-[#000d1f] via-[#001737] to-[#000d1f] border-t border-[#00E5FF]/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00E5FF]/10 blur-[150px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-block px-5 py-2 mb-8 rounded-full bg-white/5 border border-white/10 text-[#00E5FF] text-[10px] font-black uppercase tracking-[0.3em]">
          <span className="mr-2 inline-block w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse"></span>
          Free — No Credit Card Required
        </div>

        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
          Ready to Test the Best<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-[#003580]">IPTV Service Free?</span>
        </h2>

        <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          22,000+ channels. 4K quality. No credit card. Start your free IPTV trial in under 60 seconds.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {['No Credit Card', 'Instant Delivery', 'Cancel Anytime'].map(label => (
            <span key={label} className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-bold">
              <i className="fas fa-check text-[#00E5FF] text-xs"></i>
              {label}
            </span>
          ))}
        </div>

        <button
          onClick={onScrollToForm}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-[#003580] to-[#00E5FF] text-white px-12 py-5 rounded-xl font-black uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-[#00E5FF]/20 text-base"
        >
          <i className="fas fa-play text-sm"></i>
          Get Your Free Trial Now
        </button>

        <p className="text-gray-600 text-xs mt-6">
          No payment required &middot; No auto-renewal &middot; Cancel anytime
        </p>
      </div>
    </section>
  )
}

export default TrialBottomCTA
