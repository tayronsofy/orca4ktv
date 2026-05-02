'use client'

import React, { useState, useEffect } from 'react';

const Hero: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    const handleScroll = () => {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setAiResponse(null);
    try {
      const { searchAI } = await import('../services/geminiService')
      const result = await searchAI(query);
      setAiResponse(result);
    } catch (error) {
      setAiResponse("The AI concierge is currently offline, rest assured we offer thousands of premium 4K networks!");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#00050d] pt-40 md:pt-48 pb-20">

      {/* --- Aurora Background --- */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          transform: isMobile ? 'none' : `translateY(${scrollY * 0.2}px)`,
          willChange: isMobile ? 'auto' : 'transform',
        }}
      >
        {/* Deep navy base */}
        <div className="absolute inset-0 bg-[#001f3f]"></div>

        {/* Aurora blobs — soft, slow-drifting cyan + blue lights */}
        <div className="aurora aurora-cyan-1 will-change-transform"></div>
        <div className="aurora aurora-blue-1 will-change-transform"></div>
        <div className="aurora aurora-cyan-2 will-change-transform"></div>
        <div className="aurora aurora-blue-2 hidden md:block will-change-transform"></div>

        {/* Soft horizontal shimmer band — adds movement across the middle */}
        <div className="aurora-shimmer hidden md:block"></div>

        {/* Vignette overlay — keeps the H1 + search bar legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#001f3f]/95"></div>
      </div>

      {/* --- Main Content --- */}
      <div className="relative z-10 max-w-4xl w-full px-4">
        <div className="inline-block px-5 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#00E5FF] text-[10px] font-black uppercase tracking-[0.3em] animate-fade-in">
          <span className="mr-2 inline-block w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse"></span>
          The Best IPTV Subscription for 2026 · AI-Powered IPTV
        </div>

        {/* 🚀 SEO UPGRADE: Keyword-Rich H1 Tag */}
        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-4 leading-[0.9] tracking-tighter text-white drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
          ORCA 4K TV<br />
          <span className="hero-gradient-text text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#00E5FF] bg-[length:200%_auto] animate-shimmer">
            PREMIUM 4K IPTV
          </span>
        </h1>

        {/* 🚀 SEO UPGRADE: Descriptive H2 Tag */}
        <h2 className="text-xl md:text-2xl text-gray-300 mb-8 font-bold max-w-2xl mx-auto drop-shadow-lg">
          22,000+ Live Channels, 4K HDR Sports & On-Demand Movies — Buffer-Free, Worldwide
        </h2>

        <p className="text-lg md:text-xl text-gray-400 mb-12 font-medium max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
          Stream the biggest international football tournament of 2026, the championship game in February, top European club football finals and every premium IPTV channel in 4K Ultra-HD with HDR10+ and Dolby Vision support. Powered by Anti Freeze CDN, AES-256 encrypted, multi-device ready, and backed by an AI concierge that finds your show in seconds.
        </p>

        {/* AI Search Bar Area */}
        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="relative group transition-all duration-500 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-[#003580] to-[#00E5FF] rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <input
              type="text"
              aria-label="Search for channels or content"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything: 'Live sports in 4K tonight?' · 'IPTV setup on Firestick?' · 'Best sports tier?'"
              className="relative w-full bg-black/40 border border-white/10 backdrop-blur-3xl rounded-full px-10 py-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 transition-all text-lg shadow-2xl"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-3 top-3 bottom-3 bg-[#003580] hover:bg-[#00E5FF] text-white px-4 md:px-8 rounded-full transition-all flex items-center gap-3 font-black uppercase text-xs tracking-widest disabled:opacity-50 shadow-xl active:scale-95 z-10"
            >
              {isSearching ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-sparkles"></i>}
              <span className="inline">ASK US</span>
            </button>
          </form>

          {aiResponse && (
            <div className="mt-8 p-6 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 text-left animate-fade-in shadow-2xl mb-8">
              <div className="flex items-center gap-2 text-[10px] font-black text-[#00E5FF] uppercase mb-3 tracking-[0.2em]">
                <i className="fas fa-robot"></i> IPTV Concierge
              </div>
              <p className="text-gray-200 leading-relaxed font-semibold italic">{aiResponse}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .will-change-transform { will-change: transform; }

        /* Aurora blobs — soft glowing color clouds */
        .aurora {
          position: absolute;
          border-radius: 50%;
          filter: blur(90px);
          mix-blend-mode: screen;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .aurora {
            filter: blur(60px);
            animation-duration: 40s !important;
          }
        }

        .aurora-cyan-1 {
          top: -15%;
          left: -10%;
          width: 60%;
          height: 60%;
          background: radial-gradient(circle, rgba(0, 229, 255, 0.55), transparent 65%);
          animation: aurora-drift-1 24s ease-in-out infinite;
        }

        .aurora-blue-1 {
          top: 10%;
          right: -15%;
          width: 65%;
          height: 65%;
          background: radial-gradient(circle, rgba(0, 102, 204, 0.55), transparent 65%);
          animation: aurora-drift-2 30s ease-in-out infinite;
        }

        .aurora-cyan-2 {
          bottom: -20%;
          left: 25%;
          width: 55%;
          height: 60%;
          background: radial-gradient(circle, rgba(34, 211, 238, 0.45), transparent 65%);
          animation: aurora-drift-3 28s ease-in-out infinite;
        }

        .aurora-blue-2 {
          top: 35%;
          left: 35%;
          width: 45%;
          height: 50%;
          background: radial-gradient(circle, rgba(0, 53, 128, 0.50), transparent 70%);
          animation: aurora-drift-4 36s ease-in-out infinite;
        }

        /* Horizontal shimmer band — subtle highlight that drifts vertically */
        .aurora-shimmer {
          position: absolute;
          top: 30%;
          left: -10%;
          right: -10%;
          height: 35%;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(0, 229, 255, 0.06) 30%,
            rgba(255, 255, 255, 0.04) 50%,
            rgba(0, 229, 255, 0.06) 70%,
            transparent 100%);
          filter: blur(40px);
          mix-blend-mode: screen;
          animation: shimmer-band 22s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes aurora-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1);     opacity: 0.85; }
          33%      { transform: translate(8%, -4%) scale(1.1); opacity: 1;    }
          66%      { transform: translate(-5%, 6%) scale(0.95); opacity: 0.9; }
        }

        @keyframes aurora-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1);      opacity: 0.75; }
          50%      { transform: translate(-10%, 5%) scale(1.15); opacity: 1; }
        }

        @keyframes aurora-drift-3 {
          0%, 100% { transform: translate(0, 0) scale(1);      opacity: 0.7; }
          40%      { transform: translate(6%, -7%) scale(1.1); opacity: 0.95; }
          70%      { transform: translate(-8%, 4%) scale(0.92); opacity: 0.8; }
        }

        @keyframes aurora-drift-4 {
          0%, 100% { transform: translate(0, 0) scale(1);       opacity: 0.6; }
          50%      { transform: translate(-6%, -8%) scale(1.2); opacity: 0.9; }
        }

        @keyframes shimmer-band {
          0%, 100% { transform: translateY(0)    scale(1);    opacity: 0.7; }
          50%      { transform: translateY(-15%) scale(1.05); opacity: 1;   }
        }

        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-shimmer { animation: shimmer 6s linear infinite; }

        .animate-fade-in {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
