'use client'

import React from 'react';

const USA_FEATURES = [
  {
    title: 'Coast-to-Coast Coverage with US Edge Servers',
    description: 'Five North American POPs — New York, Los Angeles, Chicago, Dallas, and Atlanta — keep latency under 30ms whether you are catching the NFL early window in Buffalo or the late game in Seattle. Anti Freeze CDN reroutes around peak Super Bowl LX and March Madness traffic in real time, so every snap, every clutch shot, every walk-off lands buffer-free in 4K HDR.',
    imageUrl: '/images/usa-coverage.jpg',
    altText: 'Two American football fans on a navy sofa watching a live 4K HDR football match on a wall-mounted Smart TV — buffer-free IPTV USA streaming on ORCA 4K TV.',
    reverse: false
  },
  {
    title: 'Smart EPG Built for the American Sports Calendar',
    description: 'The ORCA 4K TV smart EPG guide knows your week — NFL Sundays, NBA back-to-backs, MLB doubleheaders, Stanley Cup playoff nights, college football Saturdays. Live scores, channel-jump shortcuts, 7-day catch up TV, and AI-powered "what is on right now" search across ESPN, NFL Network, NFL RedZone, NBA TV, MLB Network, NHL Network and every regional RSN.',
    imageUrl: '/images/usa-epg.jpg',
    altText: 'Adult holding a TV remote browsing the Smart EPG channel guide on a 4K Smart TV — ORCA 4K TV USA IPTV subscription with electronic program guide and 7-day catch up TV.',
    reverse: true
  },
  {
    title: 'Every American Streaming Device, One Subscription',
    description: 'Multi-device IPTV compatibility on every plan: Firestick 4K Max, Roku Ultra, Apple TV 4K (3rd gen), Android TV 14, Chromecast with Google TV, Samsung Tizen, LG webOS, MAG box, iOS, Android, Windows, macOS, and any modern web browser. Up to four simultaneous streams. Identical channel library and EPG on every screen.',
    imageUrl: '/images/usa-multi-device.jpg',
    altText: 'Coffee table with Firestick 4K Max remote, Apple TV 4K box, Roku Ultra, smartphone and tablet — multi-device IPTV compatibility on ORCA 4K TV USA subscription.',
    reverse: false
  }
];

const USAFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#001f3f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-blue-400 text-xs font-black uppercase tracking-[0.3em] mb-3">
            Built for the American Cord-Cutter
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white leading-tight">
            Why ORCA 4K TV Is the Best IPTV USA 2026
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mt-4">
            Buffer-free 4K HDR streaming, every major US network, every league — Anti Freeze CDN with US edge servers from New York to Los Angeles, AES-256 encrypted, multi-device IPTV ready.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-6"></div>
        </div>

        <div className="space-y-32">
          {USA_FEATURES.map((feature, idx) => (
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#002952] p-2 border border-blue-500/20">
                   <img 
                    src={feature.imageUrl} 
                    alt={feature.altText || feature.title} 
                    loading="lazy"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-red-600/10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default USAFeatures;
