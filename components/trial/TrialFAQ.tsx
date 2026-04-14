'use client'

import React, { useState } from 'react'

const trialFaqData = [
  {
    question: "What is included in the free IPTV trial?",
    answer: "The free IPTV trial gives you full access to SMART 4K's complete service — 22,000+ live channels, 4K sports, movies, VOD library, and EPG guide. No features are locked or restricted during the trial period."
  },
  {
    question: "How long does the free trial last?",
    answer: "The free trial period gives you enough time to fully test the service across all your devices. Our team will confirm the exact duration when sending your trial credentials via email."
  },
  {
    question: "Do I need a credit card for the free trial?",
    answer: "No. The SMART 4K free trial requires no credit card, no payment details, and no commitment. Simply submit the request form with your name, email, and device — that's all."
  },
  {
    question: "How quickly will I receive my trial credentials?",
    answer: "Trial credentials are typically sent to your email within a few minutes of submitting the form. During peak times this may take up to a few hours. Check your spam folder if you don't see the email."
  },
  {
    question: "Which devices are compatible with the free trial?",
    answer: "The free trial works on all major devices: Amazon Firestick, Android TV boxes, Samsung & LG Smart TVs, Apple TV, iPhone, iPad, Android phones, Roku, Windows PC, and Mac. Simply select your device on the form."
  },
  {
    question: "What happens after the trial ends?",
    answer: "After your free trial ends, your access will pause. There is no automatic charge — you decide if and when to subscribe. Plans start from $21/month with no contract or auto-renewal."
  },
]

const TrialFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 bg-[#15171a] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#a855f7]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
            Free Trial <span className="text-[#a855f7]">FAQ</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#6d28d9] to-[#a855f7] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 font-medium">Everything you need to know before starting your free IPTV trial.</p>
        </div>

        <div className="space-y-4">
          {trialFaqData.map((item, index) => (
            <div
              key={index}
              className={`group rounded-2xl border transition-all duration-300 ${
                openIndex === index
                  ? 'bg-[#2c3034] border-[#a855f7]/50 shadow-[0_0_30px_rgba(168,85,247,0.1)]'
                  : 'bg-[#2c3034]/40 border-white/5 hover:border-white/10'
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                  {item.question}
                </span>
                <span className={`flex-shrink-0 ml-4 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <i className={`fas fa-chevron-down ${openIndex === index ? 'text-[#a855f7]' : 'text-gray-500'}`}></i>
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="p-6 pt-0 text-gray-400 leading-relaxed font-medium text-base border-t border-white/5 mt-2">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#2a0e5c] to-[#0d071b] border border-[#4a3482]/30 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-gray-400 mb-6">Our support team is available 24/7 to help you get started with your free trial.</p>
          <a
            href="mailto:contact@smart4k.io"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#1a1d20] font-black rounded-full uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all transform hover:scale-105"
          >
            <i className="fas fa-envelope"></i> Contact Support
          </a>
        </div>
      </div>
    </section>
  )
}

export default TrialFAQ
