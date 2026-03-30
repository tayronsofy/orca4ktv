'use client'


import React from 'react';

const LOGO_ASSETS = [
  { name: 'Netflix', src: '/images/netflix.svg' },
  { name: 'HBO', src: '/images/hbo.svg' },
  { name: 'DAZN', src: '/images/dazn.svg' },
  { name: 'TNT', src: '/images/tnt.svg' },
  { name: 'Paramount+', src: '/images/paramount_plus.svg' },
  { name: 'FOX', src: '/images/fox.svg' },
  { name: '24Kitchen', src: '/images/24kitchen.svg' },
  { name: 'Eurosport', src: '/images/eurosport.svg' },
  { name: 'NLZIET', src: '/images/nlziet.png' },
  { name: 'Peacock', src: '/images/peacock.svg' },
  { name: 'SYFY', src: '/images/syfy.svg' },
  { name: 'Hulu', src: '/images/hulu.svg' },
  { name: 'Sky Sports', src: '/images/sky_sports.svg' },
  { name: 'HBO Max', src: '/images/hbo_max.svg' },
];

const ChannelCarousel: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-black via-[#1a1d20] to-black border-b border-white/5 py-10 overflow-hidden relative">
      {/* Decorative gradients for edge fading */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 mb-2 relative z-10">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a855f7] text-center mb-10 opacity-60">
          Official Media Partners
        </p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee-slow flex items-center whitespace-nowrap">
          {/* Triple the array for a truly seamless loop on all resolutions */}
          {[...LOGO_ASSETS, ...LOGO_ASSETS, ...LOGO_ASSETS].map((logo, idx) => (
            <div
              key={idx}
              className="mx-12 md:mx-16 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-default"
            >
              <img
                src={logo.src}
                alt={logo.name}
                className="h-7 md:h-10 w-auto object-contain max-w-[150px]"
                loading="lazy"
                onError={(e) => {
                  // Fallback to text logo if image fails
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    e.currentTarget.style.display = 'none';
                    const textSpan = document.createElement('span');
                    textSpan.className = "text-xl md:text-2xl font-black tracking-tighter text-white opacity-90 uppercase";
                    textSpan.innerText = logo.name;
                    parent.appendChild(textSpan);
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-slow {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
        .animate-marquee-slow {
          animation: marquee-slow 30s linear infinite;
        }
        .animate-marquee-slow:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ChannelCarousel;
