'use client'

import React from 'react';
import Script from 'next/script';

interface VideoSectionProps {
  onScrollToPricing: () => void;
}

// Optimization: Define static data outside component to reduce re-renders
const FEATURES = [
  "22,500+ Live Channels",
  "Crystal Clear 4K Quality",
  "Instant Activation"
];

const VideoSection: React.FC<VideoSectionProps> = ({ onScrollToPricing }) => {
  return (
    <section className="relative min-h-[700px] bg-gradient-to-r from-[#001737] via-[#000d1f] to-black py-24 overflow-hidden">
      <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* Left Content Column */}
        <div className="flex-1 text-center lg:text-left z-10">
          <h2 className="text-2xl md:text-4xl font-black mb-6 text-white leading-tight uppercase tracking-tight drop-shadow-lg">
            EXPERIENCE THE NEXT EVOLUTION OF TV.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-white">
              Global Access. Infinite Entertainment.
            </span>
          </h2>

          <p className="text-gray-300 text-lg md:text-xl font-medium mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Unlock the world with premium access to USA, Canada, Europe, and beyond. Dive into a massive 4K library of obsession-worthy series, blockbusters, and reality TV.
          </p>

          {/* Optimized Feature List (Reduced Code Size) */}
          <div className="flex flex-col gap-4 mb-10">
            {FEATURES.map((feature, index) => (
              <div key={index} className="flex items-center justify-center lg:justify-start gap-3 text-white font-bold text-lg">
                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-[10px] shadow-lg shadow-red-600/20">
                  <i className="fas fa-check"></i>
                </div>
                {feature}
              </div>
            ))}
          </div>

          <div className="text-2xl md:text-3xl font-black text-white mb-10 tracking-tight uppercase">
            START STREAMING TODAY - FROM JUST $21/MO.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              type="button"
              onClick={onScrollToPricing}
              className="bg-red-600 hover:bg-red-700 text-white px-12 py-4 rounded-lg font-black uppercase text-sm tracking-[0.2em] shadow-lg shadow-red-600/30 transition-all transform hover:scale-105 active:scale-95 w-full sm:w-auto text-center"
              aria-label="Get Started with Pricing"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Right TV UI Column */}
        <div className="flex-1 w-full max-w-3xl relative">
          {/* GPU Layer Promotion: will-change-transform helps mobile GPU handle this heavy element 
            Aspect Ratio: Prevents CLS (Layout Shift)
          */}
          <div className="aspect-video bg-[#000a1c] rounded-xl overflow-hidden border-[12px] border-[#222] shadow-[0_0_100px_rgba(168,85,247,0.25)] relative group will-change-transform">

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

            {/* Subtle Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>

            {/* TV Shine Effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          </div>

          {/* Background glow effects (Optimized opacity for mobile performance) */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-purple-600/15 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;