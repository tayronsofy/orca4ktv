'use client'

import React, { useState, useEffect } from 'react';
import { searchAI } from '../services/geminiService'; // Ensure this path is correct

// OPTIMIZATION: Use WebP images and add explicit aspect ratios to prevent jumping
const FLOATING_LOGOS = [];

const Hero: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // OPTIMIZATION: Throttled scroll listener
    const handleScroll = () => {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setAiResponse(null);
    try {
      const result = await searchAI(query);
      setAiResponse(result);
    } catch (error) {
      setAiResponse("The AI concierge is currently offline, rest assured we offer thousands of premium 4K networks!");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#020204] py-20">

      {/* --- Optimized Cinematic Background --- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          willChange: 'transform' // 🚀 GPU Acceleration
        }}
      >
        {/* Galaxy Layers (Hardware Accelerated) */}
        <div className="space-layer space-layer-1 will-change-transform"></div>
        <div className="space-layer space-layer-2 will-change-transform"></div>
        <div className="space-layer space-layer-3 will-change-transform"></div>

        {/* Nebula Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#a855f7]/10 blur-[150px] rounded-full animate-pulse-slow will-change-transform"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow-reverse will-change-transform"></div>

        {/* Floating Channel Logos (With Anti-CLS Wrappers) */}
        {FLOATING_LOGOS.map((logo, idx) => (
          <div
            key={idx}
            className={`absolute ${logo.top} ${logo.left} ${logo.width} opacity-30 filter blur-[0.5px] animate-space-float z-0`}
            style={{
              animationDelay: logo.delay,
              willChange: 'transform'
            }}
          >
            {/* 🚀 CLS FIX: Aspect Ratio Wrapper */}
            <div className="relative aspect-square w-full">
              <img
                src={logo.src}
                // 🚀 SEO FIX: Smart Keyword Combination
                // Instead of repeating "SMART 4K", we describe the specific content availability.
                alt={`Stream ${logo.name} in 4K on SMART 4K IPTV`}

                loading="lazy"
                className="w-full h-full object-contain grayscale brightness-125 contrast-125"
                onError={(e) => (e.currentTarget.style.display = 'none')}
              />
            </div>
          </div>
        ))}

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#1f2326]"></div>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-4xl w-full px-4">
        <div className="inline-block px-5 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#a855f7] text-[10px] font-black uppercase tracking-[0.3em] animate-fade-in">
          <span className="mr-2 inline-block w-2 h-2 bg-[#a855f7] rounded-full animate-pulse"></span>
          Your Universe of Limitless Entertainment
        </div>

        {/* 🚀 SEO UPGRADE: Keyword-Rich H1 Tag */}
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-4 leading-[0.9] tracking-tighter text-white drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
          SMART 4K<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-white to-[#a855f7] bg-[length:200%_auto] animate-shimmer">
            PREMIUM 4K IPTV
          </span>
        </h1>

        {/* 🚀 SEO UPGRADE: Descriptive H2 Tag */}
        <h2 className="text-xl md:text-2xl text-gray-300 mb-8 font-bold max-w-2xl mx-auto drop-shadow-lg">
          Instantly Access Over 22,000 Premium Channels & Global Live Sports
        </h2>

        <p className="text-lg md:text-xl text-gray-400 mb-12 font-medium max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
          Unlock the next generation of television. Enjoy top-tier cinematic releases, exclusive live sporting events, and continuous 4K streaming driven by advanced AI technology.
        </p>

        {/* AI Search Bar Area */}
        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="relative group transition-all duration-500 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6d28d9] to-[#a855f7] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Discover your network (e.g., 'Is Sky Sports available?')"
              className="relative w-full bg-black/40 border border-white/10 backdrop-blur-3xl rounded-full px-10 py-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#a855f7]/50 transition-all text-lg shadow-2xl"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-3 top-3 bottom-3 bg-[#6d28d9] hover:bg-[#a855f7] text-white px-4 md:px-8 rounded-full transition-all flex items-center gap-3 font-black uppercase text-xs tracking-widest disabled:opacity-50 shadow-xl active:scale-95 z-10"
            >
              {isSearching ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-sparkles"></i>}
              <span className="inline">ASK US</span>
            </button>
          </form>

          {aiResponse && (
            <div className="mt-8 p-6 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 text-left animate-fade-in shadow-2xl mb-8">
              <div className="flex items-center gap-2 text-[10px] font-black text-[#a855f7] uppercase mb-3 tracking-[0.2em]">
                <i className="fas fa-robot"></i> IPTV Concierge
              </div>
              <p className="text-gray-200 leading-relaxed font-semibold italic">{aiResponse}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* --- Performance Optimized CSS --- */
        .will-change-transform {
          will-change: transform;
        }

        .space-layer {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-repeat: repeat;
          will-change: transform;
        }

        .space-layer-1 {
          background-image: radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1.5px 1.5px at 100px 150px, #fff, rgba(0,0,0,0));
          background-size: 200px 200px;
          animation: move-space 120s linear infinite;
          opacity: 0.5;
        }

        .space-layer-2 {
          background-image: radial-gradient(1px 1px at 15px 15px, #fff, rgba(0,0,0,0)),
                            radial-gradient(1px 1px at 80px 10px, #fff, rgba(0,0,0,0));
          background-size: 150px 150px;
          animation: move-space 80s linear infinite;
          opacity: 0.3;
        }

        .space-layer-3 {
          background-image: radial-gradient(2px 2px at 50px 50px, #fff, rgba(0,0,0,0));
          background-size: 300px 300px;
          animation: move-space 40s linear infinite;
          opacity: 0.2;
        }

        @keyframes move-space {
          from { transform: translate(0, 0) scale(1); }
          to { transform: translate(10%, 10%) scale(1.1); }
        }

        @keyframes space-float {
          0% { transform: translate(0, 0) rotate(0deg) scale(1); }
          33% { transform: translate(15px, -25px) rotate(3deg) scale(1.05); }
          66% { transform: translate(-10px, 15px) rotate(-2deg) scale(0.95); }
          100% { transform: translate(0, 0) rotate(0deg) scale(1); }
        }

        .animate-space-float {
          animation: space-float 20s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }

        .animate-pulse-slow-reverse {
          animation: pulse-slow 18s ease-in-out infinite reverse;
        }

        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-shimmer {
          animation: shimmer 6s linear infinite;
        }

        .animate-fade-in {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;