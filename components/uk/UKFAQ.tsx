'use client'

import React, { useState } from 'react';

const UKFAQ: React.FC = () => {
  const [openIndex, setIndex] = useState<number | null>(0);

  const ukFaqData = [
    {
      question: "Can I watch every UK top-flight football match - including 3pm Saturday kick-offs?",
      answer: "Yes. Every UK top-flight football fixture is covered - the early Saturday windows, the 3pm Saturday kick-offs, late Saturday, Sunday afternoons, the Sunday and Monday evening showpiece games, plus every domestic cup tie. Top European club football knockouts, second-tier and lower-league competitions, and the Scottish top flight all stream in 4K HDR. No regional blackout limitation, no separate sports add-on."
    },
    {
      question: "Does this cover Northern hemisphere international rugby, the summer tennis fortnight, motorsport and cricket?",
      answer: "Yes. The Northern hemisphere international rugby championship (kick-off Friday 6 February 2026), top-flight UK rugby, the touring international squad of 2026, the summer London grass-court Grand Slam tennis fortnight late June through mid-July, the Open golf championship in July, every round of the new 2026-era open-wheel motorsport season, premier motorcycle racing, Test cricket, the home England-Australia Test series, top-tier T20 domestic competition and the short-format city tournament - all included on every plan."
    },
    {
      question: "Are all the UK free-to-air networks included?",
      answer: "Yes. All major UK free-to-air networks and their HD/+1/regional variants are included with regional affiliates picked up by postcode. The smart EPG guide shows live now-playing data for every UK terrestrial channel, plus 7-day catch up TV - a clean catch-up streaming-equivalent replay experience built into the player."
    },
    {
      question: "Will Virgin Media, BT, Sky Broadband or TalkTalk throttle my IPTV streams?",
      answer: "Our streams use TLS 1.3 with AES-256 encryption (NIST FIPS 197), which makes traffic shaping unreliable for ISPs to apply. If you do see throttling - common during peak evening hours on heavily-oversubscribed UK lines - IPTV with VPN is fully supported on every plan with no speed cap from our side. Most UK households see no throttling at all."
    },
    {
      question: "Which streaming devices work - Firestick 4K Max, Apple TV 4K, Smart TV?",
      answer: "All of them. Firestick 4K Max, Amazon Fire TV Cube, Apple TV 4K (3rd generation), Android TV 14 boxes (Nvidia Shield, Google TV, Onn 4K Pro), Samsung Tizen, LG webOS, Panasonic, Hisense VIDAA, MAG box, plus iOS / iPadOS / Android phones and tablets, Windows / macOS / Linux PCs, and any HTML5 browser. Same channel library and EPG on every screen via TiviMate, IPTV Smarters Pro or OTT Navigator."
    },
    {
      question: "How many simultaneous streams can my household run?",
      answer: "Plans ship with up to 4 simultaneous connections so the lounge TV, the kid's tablet upstairs, and a phone in the kitchen can all run different channels at the same time. The 1-month plan starts at 1 connection; the 12-month plan ships with up to 4 by default, no extra fee."
    },
    {
      question: "Is there a free trial - and is there any contract or cancellation fee?",
      answer: "Free IPTV trial with no credit card required, instant activation, full 22,000-channel access, full 4K HDR. Try the service before paying a penny. Plans run month-to-month or as discounted prepaid quarterly / 6-month / 12-month bundles. No automatic recurring charges, no hidden fees, no early-termination penalty. Cancel any time."
    },
    {
      question: "How fast do I get my login after signup?",
      answer: "IPTV instant start: from checkout to first live channel typically takes under 5 minutes. Credentials (M3U URL + Xtream Codes) are emailed automatically the moment payment clears. Setup with any compatible player takes another 60 seconds - see the step-by-step setup guide for your device."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": ukFaqData.map(item => ({
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
            IPTV UK <span className="text-blue-500">FAQ</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 font-medium">Straight answers for British cord-cutters and sports fans.</p>
        </div>

        <div className="space-y-4">
          {ukFaqData.map((item, index) => (
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
          <h3 className="text-xl font-bold text-white mb-2">Need UK-Based Setup Help?</h3>
          <p className="text-gray-400 mb-6">Our British technical specialists are ready around the clock.</p>
          <a
            href="mailto:support@orca4ktv.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#001a36] font-black rounded-full uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
          >
            <i className="fas fa-flag text-red-600"></i> Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default UKFAQ;
