'use client'

import React, { useState } from 'react';

const USAFAQ: React.FC = () => {
  const [openIndex, setIndex] = useState<number | null>(0);

  const usaFaqData = [
    {
      question: "Is ORCA 4K TV a real NFL Sunday Ticket alternative for 2026?",
      answer: "Yes. Every NFL regular-season game (early window, late window, Sunday Night Football, Monday Night Football, Thursday Night Football), every playoff round, the Pro Bowl, and Super Bowl LX at Levi's Stadium on February 8, 2026 are all included. NFL Network, NFL RedZone, ESPN, FOX, CBS and NBC Sunday broadcasts all stream live in 4K HDR — no separate Sunday Ticket subscription, no DirecTV satellite required."
    },
    {
      question: "Does the subscription include NBA League Pass, MLB Extra Innings, and NHL Center Ice content?",
      answer: "Yes. NBA TV, ESPN, TNT, ABC, NBA League Pass-equivalent out-of-market coverage, MLB Network, MLB.tv-equivalent regional access, NHL Network and NHL Center Ice-equivalent matchups across all 32 NHL teams. Stanley Cup, World Series, NBA Finals, March Madness — every major American sports event in 4K HDR with the smart EPG guide showing live scores."
    },
    {
      question: "Are USA local channels (ABC, CBS, NBC, FOX) included by ZIP code?",
      answer: "Yes. ABC, CBS, NBC, FOX, PBS, The CW and local news affiliates are pulled by your ZIP code so you get the right regional broadcast — Bay Area NBC for 49ers fans, Dallas FOX for Cowboys fans, NYC ABC for Yankees broadcasts. Full HD on every local affiliate, 4K where the local station provides it."
    },
    {
      question: "Will Comcast Xfinity, Spectrum, Cox or AT&T Fiber throttle my IPTV streams?",
      answer: "Our streams use TLS 1.3 with AES-256 encryption (NIST FIPS 197) which makes traffic shaping unreliable for ISPs to apply. If you do see throttling — common during peak hours on heavily-oversubscribed networks — IPTV with VPN is fully supported on every plan with no speed cap from our side. Most US households see no throttling at all."
    },
    {
      question: "Which streaming devices work — Firestick 4K Max, Roku Ultra, Apple TV 4K?",
      answer: "All of them. Firestick 4K Max, Roku Ultra, Roku Streaming Stick 4K+, Apple TV 4K (3rd generation), Android TV 14 boxes (Nvidia Shield, Onn 4K Pro, Chromecast with Google TV), Samsung Tizen, LG webOS, MAG 524, plus iOS / iPadOS / Android phones and tablets, Windows / macOS / Linux PCs, and any HTML5 browser. Same channel library, same smart EPG on every screen."
    },
    {
      question: "How many simultaneous streams can my household run?",
      answer: "Plans ship with up to 4 simultaneous connections so the living room TV, the kid's tablet, and a phone in the car can all run different channels at the same time. The 1-month plan starts at 1 connection; the 12-month plan ships with up to 4 by default, no extra fee."
    },
    {
      question: "Is there a 30-day money-back guarantee?",
      answer: "We offer something better — a free IPTV trial with no credit card required, instant activation, full 22,000-channel access, full 4K HDR. Try the service before you pay a cent. If you've already subscribed and the service is not what we promised, contact 24/7 customer support and we will work it out — no contract, no auto-renewal, you're never locked in."
    },
    {
      question: "How fast do I get my login credentials after I sign up?",
      answer: "Average IPTV instant start time is under 5 minutes from checkout to first live channel. Credentials (M3U URL + Xtream Codes) are emailed automatically the moment payment clears. Setup with TiviMate, IPTV Smarters Pro, or any compatible player takes another 60 seconds — see the step-by-step setup guide for your device."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": usaFaqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-12 bg-[#001f3f] relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">
            IPTV USA <span className="text-blue-500">FAQ</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 font-medium">Straight answers for American cord-cutters and sports fans.</p>
        </div>

        <div className="space-y-4">
          {usaFaqData.map((item, index) => (
            <div
              key={index}
              className={`group rounded-2xl border transition-all duration-300 ${openIndex === index
                  ? 'bg-[#002952] border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.1)]'
                  : 'bg-[#002952]/40 border-white/5 hover:border-white/10'
                }`}
            >
              <button
                onClick={() => setIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                  {item.question}
                </span>
                <span className={`flex-shrink-0 ml-4 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <i className={`fas fa-chevron-down ${openIndex === index ? 'text-blue-500' : 'text-gray-500'}`}></i>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed font-medium text-base border-t border-white/5 mt-2">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#001a3a] to-[#001f3f] border border-blue-500/20 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Need US-Based Setup Help?</h3>
          <p className="text-gray-400 mb-6">Our North American technical specialists are ready around the clock.</p>
          <a
            href="mailto:support@orca4ktv.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#001a36] font-black rounded-full uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
          >
            <i className="fas fa-flag-usa text-red-600"></i> Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default USAFAQ;
