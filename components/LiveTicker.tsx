'use client'


import React, { useEffect, useState } from 'react';
import { generateLiveTicker } from '../services/geminiService';

const LiveTicker: React.FC = () => {
  const [events, setEvents] = useState<string[]>([
    "📡 CONNECTING TO LIVE SATELLITE FEED...",
    "⚡ UPDATING REAL-TIME MATCH SCHEDULES...",
    "🛰️ LINKING TO GLOBAL SPORTS NETWORK...",
    "🔍 SCANNING 20,000+ PREMIUM CHANNELS..."
  ]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const startTime = Date.now();
      
      try {
        const data = await generateLiveTicker();
        const elapsed = Date.now() - startTime;
        if (elapsed < 1500) {
          await new Promise(resolve => setTimeout(resolve, 1500 - elapsed));
        }

        // Duplicate for seamless scroll
        setEvents([...data, ...data, ...data]); 
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch live events", error);
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className={`w-full bg-gradient-to-r from-[#000a1c] via-red-950/10 to-[#000a1c] border-y border-white/5 text-white overflow-hidden relative z-40 h-16 md:h-20 flex items-center transition-opacity duration-700 ${isLoading ? 'opacity-90' : 'opacity-100'}`}>
      
      {/* Premium LIVE Label with Skewed Dynamic Shape */}
      <div className={`absolute left-0 top-0 bottom-0 px-10 md:px-14 z-50 flex items-center transition-all duration-500 shadow-[30px_0_50px_rgba(0,0,0,0.9)] -skew-x-[15deg] -ml-4 ${isLoading ? 'bg-orange-600 animate-pulse' : 'bg-red-600'}`}>
        <div className="flex flex-col items-start leading-none skew-x-[15deg]">
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] mb-1.5 opacity-90 text-white/90">System Alert</span>
          <span className="text-sm md:text-xl font-black italic tracking-tighter uppercase whitespace-nowrap">
            {isLoading ? 'SYNCING DATA...' : "LIVE NOW: DON'T MISS OUT"}
          </span>
        </div>
      </div>

      {/* The Ticker Track */}
      <div className="animate-ticker flex whitespace-nowrap pl-56 md:pl-80">
        {events.map((event, index) => (
          <div key={index} className="flex items-center mx-8 md:mx-12">
             <span className={`font-black uppercase tracking-widest text-sm md:text-base flex items-center gap-4 transition-all duration-500 ${isLoading ? 'text-orange-400 italic opacity-50' : 'text-gray-100'}`}>
               <span className={`${isLoading ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]' : 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)]'} w-2.5 h-2.5 rounded-full animate-pulse`}></span>
               {event}
             </span>
             {/* Divider */}
             <div className="ml-12 md:ml-16 h-5 w-[1px] bg-white/10"></div>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 50s linear infinite;
        }
        .animate-ticker:hover {
          animation-play-state: paused;
        }
        
        .animate-ticker {
          will-change: transform;
        }
      `}</style>
    </div>
  );
};

export default LiveTicker;
