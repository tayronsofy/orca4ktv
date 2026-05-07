'use client'

import React from 'react'

const reviewsRaw = [
  {
    text: "Got my trial credentials within 2 minutes of submitting the form. 4K streams work perfectly on my Firestick. Signed up for a full year straight away.",
    device: "Firestick 4K Max - United States",
  },
  {
    text: "No credit card needed, no spam emails, just instant access. Top European club football in 4K was flawless. Best free IPTV trial I've ever tested.",
    device: "Samsung Smart TV - United Kingdom",
  },
  {
    text: "Setup took 5 minutes on TiviMate. 22,000 channels is not an exaggeration - I found every local and international channel I watch daily.",
    device: "Android TV Box - Canada",
  },
]

const TrialReviews: React.FC = () => {
  return (
    <section className="py-20 bg-[#001f3f] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#003580]/10 rounded-full blur-[120px] -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[120px] translate-y-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
            IPTV Trial - <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003580] to-[#00E5FF]">What Users Say</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#003580] to-[#00E5FF] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Thousands of users started with a free trial and never looked back.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsRaw.map((review, i) => (
            <div
              key={i}
              className="bg-[#001530] p-8 rounded-3xl border border-white/5 hover:border-[#00E5FF]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, s) => (
                  <i key={s} className="fas fa-star text-yellow-500 text-sm"></i>
                ))}
              </div>

              <blockquote className="text-gray-300 text-lg font-medium mb-8 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <i className="fas fa-check-circle"></i> Verified Trial User
                  </div>
                  <div className="text-gray-500 text-sm font-mono">
                    Device: <span className="text-gray-400">{review.device}</span>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-[#003580] transition-all">
                  <i className="fas fa-user"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrialReviews
