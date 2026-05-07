'use client'

import React from 'react';

// OPTIMIZATION: Kept the external URLs, but we will lazy load them aggressively.
const FEATURED_MOVIES = [
  { id: 1, src: '/images/IMG_8189-1-1.webp' },
  { id: 2, src: '/images/IMG_8180-1.webp' },
  { id: 3, src: '/images/IMG_8182-1.webp' },
  { id: 4, src: '/images/IMG_8186-1.webp' },
  { id: 5, src: '/images/IMG_8189-2.webp' },
  { id: 6, src: '/images/IMG_8183-1.webp' },
  { id: 7, src: '/images/IMG_8193-1.webp' },
  { id: 8, src: '/images/IMG_8184-1.webp' },
  { id: 9, src: '/images/IMG_8178-1.webp' },
  { id: 10, src: '/images/IMG_8185-1.webp' },
  { id: 11, src: '/images/IMG_8187-1.webp' },
  { id: 12, src: '/images/IMG_8181-1.webp' },
  { id: 13, src: '/images/IMG_8188-1.webp' },
  { id: 14, src: '/images/IMG_8190-1.webp' },
  { id: 15, src: '/images/IMG_8192-1.webp' },
];

const MovieShowcase: React.FC = () => {
  return (
    <section className="bg-black py-24 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#00E5FF]/5 blur-[150px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 text-center mb-16 relative z-10">
        <div className="inline-block px-5 py-2 mb-8 rounded-full bg-white/5 border border-white/10 text-[#00E5FF] text-[10px] font-black uppercase tracking-[0.4em]">
          Premium Library
        </div>
        <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase text-white leading-none">
          WORLD CLASS <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] to-white">CINEMA</span>
        </h2>
        <p className="text-gray-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed font-medium opacity-70">
          Discover thousands of titles in pure 4K. Updated every hour.
        </p>
      </div>

      {/* Cinematic Movie Carousel Container */}
      <div className="relative group">
        {/* Side Shadow Overlays for Depth */}
        <div className="absolute inset-y-0 left-0 w-16 md:w-64 bg-gradient-to-r from-black via-black/90 to-transparent z-20 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-16 md:w-64 bg-gradient-to-l from-black via-black/90 to-transparent z-20 pointer-events-none"></div>

        {/* Carousel Rail */}
        <div className="relative flex overflow-x-hidden border-y border-white/5 bg-white/[0.01]">
          <div className="animate-marquee-movies flex items-center whitespace-nowrap py-12 will-change-transform">
            {/* Duplicating the array for seamless loop */}
            {[...FEATURED_MOVIES, ...FEATURED_MOVIES, ...FEATURED_MOVIES].map((movie, idx) => (
              <div
                key={`${movie.id}-${idx}`}
                className="flex-shrink-0 mx-3"
              >
                {/* 🚀 CLS FIX: The Wrapper enforces the Aspect Ratio (2/3) before image loads */}
                <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] aspect-[2/3] relative group/item cursor-pointer rounded-lg overflow-hidden shadow-2xl transition-all duration-700 hover:z-30 hover:scale-105 border border-white/5 hover:border-[#00E5FF]/50 bg-gray-900">
                  <img
                    src={movie.src}
                    alt={`Featured on-demand movie #${movie.id} - 4K HDR streaming on ORCA 4K TV IPTV subscription`}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/item:scale-110"
                    loading="lazy"      // Only load when near viewport
                    decoding="async"    // Decode off main thread to prevent UI freeze
                    width="280"         // Explicit width hint
                    height="420"        // Explicit height hint
                  />

                  {/* Clean Mirror Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover/item:opacity-0 transition-opacity duration-500"></div>

                  {/* Subtle Hover Glow */}
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover/item:ring-[#00E5FF]/50 transition-all"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee-movies {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.33%, 0, 0); }
        }
        
        .animate-marquee-movies {
          animation: marquee-movies 80s linear infinite;
          will-change: transform; /* Hint for GPU acceleration */
        }

        .group:hover .animate-marquee-movies {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default MovieShowcase;