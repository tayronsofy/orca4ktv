'use client'

import React from 'react';
import Script from 'next/script';

interface NetherlandsVideoSectionProps {
  onScrollToPricing: () => void;
}

const NETHERLANDS_FEATURES = [
  "Onbeperkte toegang tot Nederlandse zenders",
  "Dedicated IPTV Nederland Servers",
  "Directe activering"
];

const NetherlandsVideoSection: React.FC<NetherlandsVideoSectionProps> = ({ onScrollToPricing }) => {
  return (
    <section className="relative min-h-[700px] bg-gradient-to-r from-[#001737] via-[#000d1f] to-black py-24 overflow-hidden">
      <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* Left Content Column */}
        <div className="flex-1 text-center lg:text-left z-10 w-full mb-8 lg:mb-0 order-2 lg:order-1">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight uppercase tracking-tight drop-shadow-lg">
            DE BESTE IPTV AANBIEDER IN NEDERLAND.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AE1C28] to-[#21468B]">
              Nederlandse Zenders. Buffervrij.
            </span>
          </h2>

          <p className="text-gray-300 text-lg md:text-xl font-medium mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Ontdek de ultieme IPTV-ervaring in Nederland. Duik in een enorme 4K-bibliotheek met Nederlandse series, live topvoetbal en premium sport, en lokaal nieuws uit heel Nederland.
          </p>

          <div className="flex flex-col gap-4 mb-10 items-center lg:items-start">
            {NETHERLANDS_FEATURES.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-white font-bold text-lg">
                <div className="w-6 h-6 rounded-full bg-[#AE1C28] flex items-center justify-center text-[10px] shadow-lg shadow-[#AE1C28]/20 flex-shrink-0">
                  <i className="fas fa-check"></i>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="text-2xl md:text-3xl font-black text-white mb-10 tracking-tight uppercase">
            START NU MET STREAMEN - VANAF SLECHTS €15/MAAND.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              type="button"
              onClick={onScrollToPricing}
              className="bg-[#AE1C28] hover:bg-[#21468B] text-white px-12 py-4 rounded-lg font-black uppercase text-sm tracking-[0.2em] shadow-lg shadow-[#AE1C28]/30 transition-all transform hover:scale-105 active:scale-95 w-full sm:w-auto text-center"
              aria-label="Nu beginnen"
            >
              Nu beginnen
            </button>
          </div>
        </div>

        {/* Right TV UI Column */}
        <div className="flex-1 w-full max-w-3xl relative order-1 lg:order-2">
          <div className="aspect-video bg-[#000a1c] rounded-xl overflow-hidden border-[12px] border-[#222] shadow-[0_0_100px_rgba(174,28,40,0.25)] relative group will-change-transform">
            {/* Vimeo Embed Video */}
            <iframe
              src="https://player.vimeo.com/video/1203214324?badge=0&autopause=0&player_id=0&app_id=58479"
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              className="w-full h-full absolute top-0 left-0 border-0"
              title="Orca4ktv"
            ></iframe>
            <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          </div>

          {/* Background glow effects - Red/Blue themed */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#AE1C28]/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute -z-10 top-0 right-0 w-[80%] h-[80%] bg-[#21468B]/10 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default NetherlandsVideoSection;
