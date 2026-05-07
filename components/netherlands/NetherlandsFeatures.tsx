'use client'

import React from 'react';

const NETHERLANDS_FEATURES = [
  {
    title: 'Landelijke dekking met Amsterdam-edge server',
    description: 'Een dedicated Amsterdam-edge server houdt de latentie onder 25 ms - of je nu de topvoetbal-topper kijkt in Amsterdam, een top Europese clubvoetbal-avond in Rotterdam of de Olympische Winterspelen-hoogtepunten in Eindhoven. Anti Freeze CDN herleidt piekverkeer in real-time, zodat elke aftrap, elke pitstop en elke gouden medaille buffervrij in 4K HDR aankomt.',
    imageUrl: '/images/netherlands-coverage.jpg',
    altText: 'Twee Nederlandse voetbalfans op de bank kijken een topvoetbal-wedstrijd in 4K HDR live op een Smart TV - buffervrij IPTV Nederland streamen via ORCA 4K TV.',
    reverse: false
  },
  {
    title: 'Slimme programmagids voor de Nederlandse sportkalender',
    description: 'De ORCA 4K TV-programmagids kent jouw week - topvoetbal-weekend, top Europees clubvoetbal op dinsdag en woensdag, motorsport-zondagen, nationale beker-avonden en Olympische hoogtepunten. Live ticker, snelle zenderwissels, 7-dagen catch-up tv en AI-gestuurd zoeken ("Wat is er nu te zien?") voor alle belangrijke Nederlandse free-to-air en sportzenders.',
    imageUrl: '/images/netherlands-epg.jpg',
    altText: 'Volwassene met afstandsbediening kijkt naar de Smart TV-programmagids op een 4K Smart TV - ORCA 4K TV Nederland IPTV-abonnement met elektronische programmagids en 7-dagen catch-up tv.',
    reverse: true
  },
  {
    title: 'Op elk Nederlands streaming-apparaat - één abonnement',
    description: 'Multi-device-compatibiliteit in elk abonnement: Firestick 4K Max, Amazon Fire TV Cube, Apple TV 4K (3e generatie), Android TV 14-boxen (Nvidia Shield, Onn 4K Pro, Chromecast met Google TV), Samsung Tizen, LG webOS, MAG-box, iOS, iPadOS, Android, Windows, macOS en elke webbrowser. Tot vier gelijktijdige streams. Identieke Nederlandse zenderbibliotheek en EPG op elk scherm - TiviMate, IPTV Smarters Pro en OTT Navigator worden ondersteund.',
    imageUrl: '/images/netherlands-multi-device.jpg',
    altText: 'Salontafel met Firestick 4K Max afstandsbediening, Apple TV 4K-box, Roku-speler, smartphone en tablet in een Nederlandse woonkamer - multi-device IPTV-compatibiliteit op ORCA 4K TV Nederland.',
    reverse: false
  }
];

const NetherlandsFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#001f3f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-orange-400 text-xs font-black uppercase tracking-[0.3em] mb-3">
            Gebouwd voor Nederlandse cord-cutters
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white leading-tight">
            Waarom ORCA 4K TV het beste IPTV Nederland 2026 is
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mt-4">
            Buffervrij 4K HDR-streamen, elke Nederlandse zender, elke competitie - Anti Freeze CDN met Amsterdam-edge server, AES-256 versleuteld, multi-device IPTV ready.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#AE1C28] to-[#21468B] mx-auto mt-6"></div>
        </div>

        <div className="space-y-32">
          {NETHERLANDS_FEATURES.map((feature, idx) => (
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#002952] p-2 border border-[#AE1C28]/20">
                  <img
                    src={feature.imageUrl}
                    alt={feature.altText || feature.title}
                    loading="lazy"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#AE1C28]/10 via-transparent to-[#21468B]/10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NetherlandsFeatures;
