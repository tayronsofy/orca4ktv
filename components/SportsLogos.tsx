'use client'

import React from 'react';
import { Trophy, Dumbbell, Target, Crosshair, Zap, Flame, Star, Shield, Activity } from 'lucide-react';

const MAJOR_SPORTS = [
  { name: 'Global Soccer', icon: Trophy },
  { name: 'Pro Basketball', icon: Activity },
  { name: 'MMA Fighting', icon: Dumbbell },
  { name: 'Am. Football', icon: Shield },
  { name: 'Baseball', icon: Target },
  { name: 'Ice Hockey', icon: Crosshair },
  { name: 'Motorsports', icon: Zap },
  { name: 'World Tennis', icon: Star },
  { name: 'Pro Boxing', icon: Flame },
];

const SportsLogos: React.FC = () => {
  return (
    <section className="bg-black py-20 border-b border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 text-center mb-12">
        <p className="text-[#a855f7] text-[10px] font-black uppercase tracking-[0.4em] mb-4 opacity-70">
          World Class Sports Coverage
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
          Global Sports. <span className="text-[#a855f7]">Big Screen.</span>
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden group">
        {/* Shadow overlays for smooth fade-out edges */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        {/* 🚀 GPU Accelerated Marquee */}
        <div className="animate-marquee-sports flex items-center whitespace-nowrap will-change-transform">
          {/* Triple the array for a seamless loop */}
          {[...MAJOR_SPORTS, ...MAJOR_SPORTS, ...MAJOR_SPORTS].map((sport, idx) => {
            const Icon = sport.icon;
            return (
              <div
                key={`${sport.name}-${idx}`}
                className="group/item mx-8 md:mx-16 flex flex-col items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
              >
                {/* CLS FIX: Fixed height wrapper preserves space */}
                <div className="h-16 md:h-24 flex items-center justify-center text-white/50 group-hover/item:text-white transition-colors duration-500">
                  <Icon size={48} className="transition-transform duration-500 group-hover/item:scale-110 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                </div>

                {/* Text fades in only when hovering THIS item */}
                <span className="mt-4 text-[9px] font-bold uppercase tracking-widest text-gray-500 group-hover/item:text-[#a855f7] opacity-0 group-hover/item:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/item:translate-y-0">
                  {sport.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes marquee-sports {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.33%, 0, 0); }
        }
        .animate-marquee-sports {
          animation: marquee-sports 50s linear infinite;
        }
        /* Pause animation on hover for better user experience */
        .group:hover .animate-marquee-sports {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default SportsLogos;