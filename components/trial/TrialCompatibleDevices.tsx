'use client'

import React from 'react'

const devices = [
  { name: 'Firestick', icon: 'fab fa-amazon' },
  { name: 'Android TV', icon: 'fab fa-android' },
  { name: 'Apple TV', icon: 'fab fa-apple' },
  { name: 'Smart TV', icon: 'fas fa-tv' },
  { name: 'Roku', icon: 'fas fa-satellite-dish' },
  { name: 'PC / Mac', icon: 'fas fa-desktop' },
]

const TrialCompatibleDevices: React.FC = () => {
  return (
    <section className="py-24 bg-[#001f3f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
            Compatible <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003580] to-[#00E5FF]">Devices</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#003580] to-[#00E5FF] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            The free trial works on every major device. Select your device in the request form and we&apos;ll include setup instructions in your email.
          </p>
        </div>

        {/* Devices image */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/5 mb-16 max-w-4xl mx-auto">
          <img
            src="/images/trial-devices.jpg"
            alt="IPTV compatible devices – Firestick, Android TV, Apple TV, Smart TV, Roku, PC"
            loading="lazy"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00E5FF]/5 to-transparent pointer-events-none" />
        </div>

        {/* Device grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
          {devices.map(({ name, icon }) => (
            <div
              key={name}
              className="group flex flex-col items-center gap-3 p-4 rounded-2xl bg-[#001530] border border-white/5 hover:border-[#00E5FF]/40 transition-all duration-300 hover:-translate-y-2 cursor-default"
            >
              <i className={`${icon} text-2xl text-gray-400 group-hover:text-[#00E5FF] transition-colors`}></i>
              <span className="text-gray-500 text-xs font-bold uppercase tracking-wider group-hover:text-gray-300 transition-colors text-center leading-tight">{name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrialCompatibleDevices
