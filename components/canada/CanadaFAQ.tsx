'use client'

import React, { useState } from 'react';

const CanadaFAQ: React.FC = () => {
  const [openIndex, setIndex] = useState<number | null>(0);

  const canadaFaqData = [
    {
      question: "Can I watch every NHL game — including Stanley Cup playoffs in 4K HDR?",
      answer: "Yes. Every NHL regular-season game (Hockey Night in Canada, midweek matchups, all 32 teams), the entire Stanley Cup playoffs, IIHF World Hockey Championship 2026, and the World Junior Championship are all included live in 4K HDR where the broadcaster supplies it. TSN, Sportsnet, and the regional Sportsnet East / West / Pacific feeds are all on board — no separate sports add-on, no Center Ice subscription required."
    },
    {
      question: "Is the 2026 Winter Olympics and FIFA World Cup coverage included?",
      answer: "Yes. The Milano-Cortina 2026 Winter Olympics (February 6–22) — every event, every medal final, every Team Canada moment — is live in 4K HDR. The FIFA World Cup 2026 in June and July is also fully included, including the matches Toronto BMO Field and Vancouver BC Place host as part of the United States / Canada / Mexico tri-nation event. CBC and TSN broadcasts both available."
    },
    {
      question: "Are CBC, CTV, Global, Citytv and French-language channels included?",
      answer: "Yes, by postcode. CBC, CTV, CTV 2, Global TV, Citytv, CP24 plus the French-language Radio-Canada (ICI Télé), TVA, Noovo, Télé-Québec, ICI RDI, LCN, RDS, RDS2 and TVA Sports are all included. Hockey Night in Canada and La Soirée du hockey both available — perfect for bilingual Quebec households."
    },
    {
      question: "Will Rogers Ignite, Bell Fibe, Shaw Direct or Telus throttle my IPTV streams?",
      answer: "Our streams use TLS 1.3 with AES-256 encryption (NIST FIPS 197), which makes traffic shaping unreliable for ISPs to apply. If you do see throttling — common during playoff evenings on heavily-oversubscribed Canadian lines — IPTV with VPN is fully supported on every plan with no speed cap from our side. Most Canadian households see no throttling at all."
    },
    {
      question: "Which streaming devices work — Firestick 4K Max, Apple TV 4K, Smart TV?",
      answer: "All of them. Firestick 4K Max, Amazon Fire TV Cube, Apple TV 4K (3rd generation), Android TV 14 boxes (Nvidia Shield, Onn 4K Pro, Chromecast with Google TV), Samsung Tizen, LG webOS, Hisense, MAG box, plus iOS / iPadOS / Android phones and tablets, Windows / macOS / Linux PCs, and any HTML5 browser. Same channel library and bilingual EPG on every screen via TiviMate, IPTV Smarters Pro or OTT Navigator."
    },
    {
      question: "How many simultaneous streams can my household run?",
      answer: "Plans ship with up to 4 simultaneous connections so the living room TV, the kid's tablet, and a phone in the garage can all run different channels at the same time — perfect for a Stanley Cup night with the Habs game in the basement and Hockey Night in the lounge. The 1-month plan starts at 1 connection; the 12-month plan ships with up to 4 by default, no extra fee."
    },
    {
      question: "Is there a free trial — and is the support bilingual?",
      answer: "Free IPTV trial with no credit card required, instant activation, full 22,000-channel access, full 4K HDR. Try the service before paying a cent. 24/7 customer support in both English and French — service à la clientèle bilingue. Plans run month-to-month or as discounted prepaid bundles. No automatic recurring charges, no hidden fees, no early-termination penalty. Cancel any time."
    },
    {
      question: "How fast do I get my login after signup?",
      answer: "IPTV instant start: from checkout to first live channel typically takes under 5 minutes. Credentials (M3U URL + Xtream Codes) are emailed automatically the moment payment clears. Setup with any compatible player takes another 60 seconds — see the step-by-step setup guide for your device."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": canadaFaqData.map(item => ({
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

      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">
            IPTV CANADA <span className="text-red-500">FAQ</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-white mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 font-medium">Straight answers for Canadian cord-cutters and hockey fans, in English and French.</p>
        </div>

        <div className="space-y-4">
          {canadaFaqData.map((item, index) => (
            <div
              key={index}
              className={`group rounded-2xl border transition-all duration-300 ${openIndex === index
                  ? 'bg-[#002952] border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]'
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
                  <i className={`fas fa-chevron-down ${openIndex === index ? 'text-red-500' : 'text-gray-500'}`}></i>
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
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#001a3a] to-[#001f3f] border border-red-500/20 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Need Canada-Based Setup Help?</h3>
          <p className="text-gray-400 mb-6">Our Canadian technical specialists are ready around the clock.</p>
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

export default CanadaFAQ;
