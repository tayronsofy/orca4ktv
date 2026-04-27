'use client'

import React from 'react'

const steps = [
  {
    number: '01',
    title: 'Submit Your Request',
    description: 'Fill in your name, email, device type and country in the form above. Takes under 60 seconds — no credit card needed.',
    icon: 'fas fa-paper-plane',
  },
  {
    number: '02',
    title: 'Receive Your Credentials',
    description: 'Your IPTV login details are sent directly to your inbox within minutes. Check your spam folder if you don\'t see it right away.',
    icon: 'fas fa-envelope-open-text',
  },
  {
    number: '03',
    title: 'Start Watching in 4K',
    description: 'Enter your credentials in any IPTV app — TiviMate, IPTV Smarters, or VLC — and start streaming 22,000+ channels in 4K instantly.',
    icon: 'fas fa-play-circle',
  },
]

const TrialHowItWorks: React.FC = () => {
  return (
    <section className="py-24 bg-[#001530]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
            How It <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003580] to-[#00E5FF]">Works</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#003580] to-[#00E5FF] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Get your free IPTV trial up and running in 3 simple steps.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Connector line — desktop only */}
          <div className="hidden md:block absolute top-14 left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-[#003580] to-[#00E5FF] opacity-30 pointer-events-none" />

          {steps.map((step, i) => (
            <div key={i} className="text-center relative z-10">
              <div className="relative inline-flex items-center justify-center w-28 h-28 mb-6">
                <span className="absolute text-7xl font-black text-[#00E5FF]/10 leading-none select-none">{step.number}</span>
                <div className="relative w-16 h-16 rounded-2xl bg-[#001f3f] border border-[#00E5FF]/20 flex items-center justify-center shadow-lg">
                  <i className={`${step.icon} text-[#00E5FF] text-xl`}></i>
                </div>
              </div>
              <h3 className="text-xl font-black text-white mb-3">{step.title}</h3>
              <p className="text-gray-400 leading-relaxed max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrialHowItWorks
