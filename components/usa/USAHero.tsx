'use client'

import React, { useState, useEffect } from 'react';

const FLOATING_LOGOS: any[] = [];

const USAHero: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
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
      const { searchAI } = await import('../../services/geminiService')
      const result = await searchAI(query);
      setAiResponse(result);
    } catch (error) {
      setAiResponse("Our USA concierge is offline right now — but yes, ORCA 4K TV ships all major US sports and free-to-air networks plus dedicated channels for American football, US pro basketball, US pro baseball and North American pro hockey, with your local affiliates picked up by ZIP code.");
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 overflow-hidden bg-[#00050d] pt-40 md:pt-48 pb-20">
      
      {/* USA Theme Cinematic Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.2}px)`,
          willChange: 'transform'
        }}
      >
        <div className="space-layer space-layer-1 will-change-transform"></div>
        <div className="space-layer space-layer-2 will-change-transform"></div>
        
        {/* USA Glows: Red and Blue */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-red-600/10 blur-[150px] rounded-full animate-pulse-slow will-change-transform"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow-reverse will-change-transform"></div>

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#001f3f]"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full px-4">
        <div className="inline-block px-5 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] animate-fade-in">
          <span className="mr-2 inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          America&apos;s New Cord-Cutter · IPTV USA 2026 🇺🇸
        </div>

        <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-4 leading-[0.9] tracking-tighter text-white drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
          BEST <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-white to-blue-500 bg-[length:200%_auto] animate-shimmer">
            IPTV USA 2026
          </span>
        </h1>

        <h2 className="text-xl md:text-2xl text-gray-300 mb-8 font-bold max-w-2xl mx-auto drop-shadow-lg">
          Every Sunday. Every Walk-Off. Every Buzzer-Beater — In 4K HDR, Without the Cable Bill
        </h2>

        <p className="text-lg md:text-xl text-gray-400 mb-12 font-medium max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
          From the championship game in February to the spring college basketball tournament, the basketball championship finals, the baseball championship series, and every American football Sunday in between — 22,000+ live channels and 100,000+ on-demand titles in native 4K HDR with HDR10+ and Dolby Vision. Anti Freeze CDN with five US edge servers (NYC, LA, Chicago, Dallas, Atlanta) keeps every stream buffer-free. AES-256 encrypted. Live on Firestick 4K Max, Roku Ultra, Apple TV 4K, and every Smart TV — just ask the AI concierge what&apos;s on.
        </p>

        {/* AI Search Bar Area */}
        <div className="max-w-2xl mx-auto mb-16">
          <form onSubmit={handleSearch} className="relative group transition-all duration-500 mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-600 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <input
              type="text"
              aria-label="Search for US channels or content"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask anything: 'Basketball finals tonight?' · 'College football Saturday?' · 'Out-of-market hockey?'"
              className="relative w-full bg-black/40 border border-white/10 backdrop-blur-3xl rounded-full px-10 py-6 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all text-lg shadow-2xl"
            />
            <button
              type="submit"
              disabled={isSearching}
              className="absolute right-3 top-3 bottom-3 bg-blue-600 hover:bg-red-600 text-white px-4 md:px-8 rounded-full transition-all flex items-center gap-3 font-black uppercase text-xs tracking-widest disabled:opacity-50 shadow-xl active:scale-95 z-10"
            >
              {isSearching ? <i className="fas fa-circle-notch fa-spin"></i> : <i className="fas fa-search"></i>}
              <span className="inline">FIND</span>
            </button>
          </form>

          {aiResponse && (
            <div className="mt-8 p-6 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 text-left animate-fade-in shadow-2xl mb-8">
              <div className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase mb-3 tracking-[0.2em]">
                <i className="fas fa-robot"></i> US Concierge
              </div>
              <p className="text-gray-200 leading-relaxed font-semibold italic">{aiResponse}</p>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .will-change-transform { will-change: transform; }
        .space-layer { position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background-repeat: repeat; will-change: transform; }
        .space-layer-1 {
          background-image: radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)), radial-gradient(1.5px 1.5px at 100px 150px, #fff, rgba(0,0,0,0));
          background-size: 200px 200px; animation: move-space 120s linear infinite; opacity: 0.5;
        }
        .space-layer-2 {
          background-image: radial-gradient(1px 1px at 15px 15px, #fff, rgba(0,0,0,0));
          background-size: 150px 150px; animation: move-space 80s linear infinite; opacity: 0.3;
        }
        @keyframes move-space { from { transform: translate(0, 0) scale(1); } to { transform: translate(10%, 10%) scale(1.1); } }
        .animate-pulse-slow { animation: pulse-slow 15s ease-in-out infinite; }
        .animate-pulse-slow-reverse { animation: pulse-slow 18s ease-in-out infinite reverse; }
        @keyframes pulse-slow { 0%, 100% { transform: scale(1); opacity: 0.1; } 50% { transform: scale(1.2); opacity: 0.2; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .animate-shimmer { animation: shimmer 6s linear infinite; }
        .animate-fade-in { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
};

export default USAHero;
