'use client'

import React from 'react'

const stats = [
  { number: '22,000+', label: 'Live Channels', icon: 'fas fa-tv' },
  { number: '4K', label: 'Ultra-HD Quality', icon: 'fas fa-film' },
  { number: '150+', label: 'Countries Covered', icon: 'fas fa-globe' },
  { number: '24/7', label: 'Expert Support', icon: 'fas fa-headset' },
]

const TrialTrustBar: React.FC = () => {
  return (
    <section className="py-14 bg-[#001530]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ number, label, icon }) => (
            <div
              key={label}
              className="bg-[#001f3f] rounded-2xl p-6 border border-white/5 text-center hover:border-[#00E5FF]/30 transition-all duration-300 hover:-translate-y-1"
            >
              <i className={`${icon} text-[#00E5FF] text-2xl mb-3 block`} />
              <div className="text-3xl md:text-4xl font-black text-white mb-1">{number}</div>
              <div className="text-gray-400 text-xs font-bold uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrialTrustBar
