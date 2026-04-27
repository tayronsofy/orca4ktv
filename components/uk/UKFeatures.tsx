'use client'

import React from 'react';

const UK_FEATURES = [
  {
    title: 'London-to-Edinburgh Coverage with a UK Edge POP',
    description: 'A dedicated London edge server keeps latency under 25ms whether you are watching the 3pm Saturday kick-offs from Manchester, the Six Nations from Cardiff, or Wimbledon late-night highlights from Edinburgh. Anti Freeze CDN reroutes around peak Premier League and Champions League match-day congestion in real time, so every goal, every try, every set point lands buffer-free in 4K HDR.',
    imageUrl: '/images/uk-coverage.jpg',
    altText: 'Two British football fans on a navy sofa watching a live 4K HDR Premier League match on a wall-mounted Smart TV — buffer-free IPTV UK streaming on ORCA 4K TV.',
    reverse: false
  },
  {
    title: 'Smart EPG Built for the British Sports Calendar',
    description: 'The ORCA 4K TV smart EPG guide knows your week — Premier League weekends, Champions League midweek, Six Nations Saturdays, F1 Sunday races, Wimbledon late evenings, county cricket weekdays. Live scores, channel-jump shortcuts, 7-day catch up TV across BBC iPlayer-style content, ITVX-style on-demand, and AI-powered "what is on right now" search across every UK broadcaster.',
    imageUrl: '/images/uk-epg.jpg',
    altText: 'Adult holding a TV remote browsing the Smart EPG channel guide on a 4K Smart TV — ORCA 4K TV UK IPTV subscription with electronic program guide and 7-day catch up TV.',
    reverse: true
  },
  {
    title: 'Every British Streaming Device, One Subscription',
    description: 'Multi-device IPTV compatibility on every plan: Firestick 4K Max, Apple TV 4K (3rd gen), Android TV 14, Chromecast with Google TV, Samsung Tizen, LG webOS, MAG box, iOS, Android, Windows, macOS, and any modern web browser. Up to four simultaneous streams. Identical UK channel library and EPG on every screen — TiviMate, IPTV Smarters Pro and OTT Navigator all supported out of the box.',
    imageUrl: '/images/uk-multi-device.jpg',
    altText: 'Coffee table with Firestick 4K Max remote, Apple TV 4K box, Roku player, smartphone and tablet — multi-device IPTV compatibility on ORCA 4K TV UK subscription.',
    reverse: false
  }
];

const UKFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#001f3f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-blue-400 text-xs font-black uppercase tracking-[0.3em] mb-3">
            Built for the British Cord-Cutter
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white leading-tight">
            Why ORCA 4K TV Is the Best IPTV UK 2026
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mt-4">
            Buffer-free 4K HDR streaming, every UK broadcaster, every league — Anti Freeze CDN with a London edge server, AES-256 encrypted, multi-device IPTV ready.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-blue-500 mx-auto mt-6"></div>
        </div>

        <div className="space-y-32">
          {UK_FEATURES.map((feature, idx) => (
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

export default UKFeatures;
