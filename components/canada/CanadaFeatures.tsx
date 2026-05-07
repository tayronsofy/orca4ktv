'use client'

import React from 'react';

const CANADA_FEATURES = [
  {
    title: 'Coast-to-Coast Coverage with Toronto + Vancouver Edge POPs',
    description: 'Two Canadian edge servers - Toronto and Vancouver - keep latency under 25ms whether you are watching a hockey playoff shift in Halifax, the 2026 Winter Games curling final in Calgary, or a Canadian football Friday night in Winnipeg. Anti Freeze CDN reroutes around peak match-day congestion in real time, so every goal, every gold-medal moment, every home US pro baseball at-bat from Toronto lands buffer-free in 4K HDR.',
    imageUrl: '/images/canada-coverage.jpg',
    altText: 'Two Canadian hockey fans on a navy sofa watching a live 4K HDR North American pro hockey playoff match on a wall-mounted Smart TV - buffer-free IPTV Canada streaming on ORCA 4K TV.',
    reverse: false
  },
  {
    title: 'Bilingual Smart EPG - English + Français',
    description: 'The ORCA 4K TV smart EPG guide knows your week in both official languages - Saturday-night hockey broadcasts in English and French, Canadian football Fridays, the 2026 Winter Games medal table, summer international football match days at the Toronto host venue. Live scores, channel-jump shortcuts, 7-day catch up TV, AI-powered "what is on right now" search across all major Canadian English and French free-to-air networks and the premium Canadian sports tier.',
    imageUrl: '/images/canada-epg.jpg',
    altText: 'Adult holding a TV remote browsing the bilingual Smart EPG channel guide on a 4K Smart TV - ORCA 4K TV Canada IPTV subscription with electronic program guide and 7-day catch up TV.',
    reverse: true
  },
  {
    title: 'Every Canadian Streaming Device, One Subscription',
    description: 'Multi-device IPTV compatibility on every plan: Firestick 4K Max, Apple TV 4K (3rd gen), Android TV 14, Chromecast with Google TV, Samsung Tizen, LG webOS, MAG box, iOS, Android, Windows, macOS, and any modern web browser. Up to four simultaneous streams. Identical Canadian channel library and EPG on every screen - TiviMate, IPTV Smarters Pro and OTT Navigator all supported out of the box.',
    imageUrl: '/images/canada-multi-device.jpg',
    altText: 'Coffee table with Firestick 4K Max remote, Apple TV 4K box, Roku player, smartphone and tablet in a Canadian living room - multi-device IPTV compatibility on ORCA 4K TV Canada subscription.',
    reverse: false
  }
];

const CanadaFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#001f3f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-red-400 text-xs font-black uppercase tracking-[0.3em] mb-3">
            Built for the Canadian Cord-Cutter
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white leading-tight">
            Why ORCA 4K TV Is the Best IPTV Canada 2026
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mt-4">
            Buffer-free 4K HDR streaming, every Canadian broadcaster in English and French, every league - Anti Freeze CDN with Toronto + Vancouver edge servers, AES-256 encrypted, multi-device IPTV ready.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-white mx-auto mt-6"></div>
        </div>

        <div className="space-y-32">
          {CANADA_FEATURES.map((feature, idx) => (
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#002952] p-2 border border-red-500/20">
                   <img 
                    src={feature.imageUrl} 
                    alt={feature.altText || feature.title} 
                    loading="lazy"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-red-600/10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CanadaFeatures;
