'use client'

import React from 'react';

interface USAVideoSectionProps {
  onScrollToPricing: () => void;
}

const USA_FEATURES = [
  "Unrestricted USA Channel Access",
  "Dedicated IPTV USA Servers",
  "Instant USD Activation"
];

const USAVideoSection: React.FC<USAVideoSectionProps> = ({ onScrollToPricing }) => {
  return (
    <section className="relative min-h-[700px] bg-gradient-to-r from-[#001737] via-[#000d1f] to-black py-24 overflow-hidden">
      <div className="container mx-auto px-6 h-full flex flex-col lg:flex-row items-center justify-between gap-16">

        {/* Left Content Column */}
        <div className="flex-1 text-center lg:text-left z-10 w-full mb-8 lg:mb-0 order-2 lg:order-1">
          <h2 className="text-3xl md:text-5xl font-black mb-6 text-white leading-tight uppercase tracking-tight drop-shadow-lg">
            THE BEST IPTV USA PROVIDER.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-blue-500">
              American Networks. Buffer-Free.
            </span>
          </h2>

          <p className="text-gray-300 text-lg md:text-xl font-medium mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
            Unlock the ultimate USA IPTV experience. Dive into a massive 4K library of obsession-worthy US series, live NFL & NBA games, and local news broadcasts nationwide.
          </p>

          <div className="flex flex-col gap-4 mb-10 items-center lg:items-start">
            {USA_FEATURES.map((feature, index) => (
              <div key={index} className="flex items-center gap-3 text-white font-bold text-lg">
                <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-[10px] shadow-lg shadow-red-600/20 flex-shrink-0">
                  <i className="fas fa-check"></i>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          <div className="text-2xl md:text-3xl font-black text-white mb-10 tracking-tight uppercase">
            START STREAMING TODAY — FROM JUST $21/MO.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button
              type="button"
              onClick={onScrollToPricing}
              className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-4 rounded-lg font-black uppercase text-sm tracking-[0.2em] shadow-lg shadow-blue-600/30 transition-all transform hover:scale-105 active:scale-95 w-full sm:w-auto text-center"
              aria-label="Get Started with Pricing"
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Right TV UI Column */}
        <div className="flex-1 w-full max-w-3xl relative order-1 lg:order-2">
          <div className="aspect-video bg-[#000a1c] rounded-xl overflow-hidden border-[12px] border-[#222] shadow-[0_0_100px_rgba(59,130,246,0.25)] relative group will-change-transform">
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster="/images/IMG_8189-1-1.webp"
              className="w-full h-full object-cover"
              width="640"
              height="360"
            >
              <source
                src="/images/Dreifaltigkeitsmotiv-Animation-5er-l.webm"
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>

            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
          </div>

          {/* Background glow effects - Blue/Red themed */}
          <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute -z-10 top-0 right-0 w-[80%] h-[80%] bg-red-600/10 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default USAVideoSection;
