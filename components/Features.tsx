'use client'


import React from 'react';
import { FEATURES } from '../constants';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#001f3f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em] mb-3">
            Built for 2026
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white leading-tight">
            Powerful Features That Make ORCA 4K TV the Best IPTV of 2026
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mt-4">
            Multi-device compatibility, AI-powered content discovery, and 4K HDR streaming with HDR10+ &amp; Dolby Vision — engineered around the Anti Freeze CDN so every match, movie, and live event lands buffer-free.
          </p>
          <div className="w-20 h-1 bg-[#00E5FF] mx-auto mt-6"></div>
        </div>

        <div className="space-y-32">
          {FEATURES.map((feature, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row items-center gap-12 ${feature.reverse ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-3xl font-bold mb-6 text-white leading-tight">
                  {feature.title}
                </h3>
                <p className="text-xl text-gray-400 leading-relaxed max-w-lg mx-auto md:mx-0">
                  {feature.description}
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#002952] p-2 border border-white/5">
                   <img
                    src={feature.imageUrl}
                    alt={feature.imageAlt ?? feature.title}
                    className="w-full h-auto rounded-xl object-cover"
                    width={640}
                    height={400}
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00E5FF]/10 to-transparent"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
