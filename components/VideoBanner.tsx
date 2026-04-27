'use client'


import React from 'react';

const VideoBanner: React.FC = () => {
  return (
    <section className="bg-[#001f3f] py-12">
      <div className="container mx-auto px-6">
        <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(168,85,247,0.15)] border border-white/5 group">

          {/* Real Video Content */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="w-full h-full object-cover"
          >
            <source
              src="/images/vid.webm"
              type="video/webm"
            />
            Your browser does not support the video tag.
          </video>

          {/* Cinematic Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#001f3f]/60 via-transparent to-[#001f3f]/20 pointer-events-none"></div>

          {/* Subtle Branding Overlay */}
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-white/80 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              Ultra HD Streaming
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white tracking-tighter uppercase">
              The Ultimate <span className="text-[#00E5FF]">Cinematic</span> Experience
            </h3>
          </div>

          {/* TV Shine/Glass Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-transparent pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default VideoBanner;
