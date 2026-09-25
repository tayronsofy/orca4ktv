'use client'

import React from 'react';

const SWEDEN_FEATURES = [
  {
    title: 'Stockholm-server för hela landet',
    description: 'Vår edge-server i Stockholm håller fördröjningen låg oavsett om du sitter i Malmö, Göteborg, Umeå eller Luleå. När en hel hockeyarena vill se samma slutspelsmatch samtidigt styr Anti Freeze CDN om trafiken i realtid. Det är skillnaden mellan ett mål du ser och ett mål du hör grannen jubla över.',
    imageUrl: '/images/sweden-coverage.jpg',
    altText: 'Två svenska fotbollsfans i soffan ser en elitfotbollsmatch i 4K HDR på en smart-tv, IPTV Sverige utan buffring hos ORCA 4K TV.',
    reverse: false
  },
  {
    title: 'En tv-guide som förstår den svenska säsongen',
    description: 'Programguiden vet hur en svensk sportvecka ser ut. Fotboll på helgen, hockey tisdag och torsdag, skidskytte och längdskidor på vintermorgnarna, europeisk klubbfotboll mitt i veckan. Sju dagars catch-up så du kan se derbyt dagen efter, och en sökruta där du kan skriva "vad går nu?" på svenska.',
    imageUrl: '/images/sweden-epg.jpg',
    altText: 'Person med fjärrkontroll bläddrar i programguiden på en 4K-tv, ORCA 4K TV IPTV Sverige med EPG och sju dagars catch-up.',
    reverse: true
  },
  {
    title: 'Samma abonnemang på alla dina skärmar',
    description: 'Firestick 4K Max, Apple TV 4K, Android TV, Chromecast med Google TV, Samsung Tizen, LG webOS, MAG-box, iPhone, Android, Windows, Mac och webbläsaren. Upp till fyra samtidiga streams. Samma kanallista och samma tv-guide överallt, och TiviMate, IPTV Smarters Pro och OTT Navigator fungerar direkt.',
    imageUrl: '/images/sweden-multi-device.jpg',
    altText: 'Soffbord med Firestick-fjärrkontroll, Apple TV, mobil och tablet i ett svenskt vardagsrum, IPTV på flera enheter hos ORCA 4K TV Sverige.',
    reverse: false
  }
];

const SwedenFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#001f3f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-yellow-400 text-xs font-black uppercase tracking-[0.3em] mb-3">
            Byggt för svenska hushåll
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white leading-tight">
            Därför väljer svenskar ORCA 4K TV 2026
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mt-4">
            4K HDR utan buffring, alla svenska kanaler och all sport du följer. Krypterat med AES-256 och redo för alla enheter i hemmet.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-yellow-400 mx-auto mt-6"></div>
        </div>

        <div className="space-y-32">
          {SWEDEN_FEATURES.map((feature, idx) => (
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#002952] p-2 border border-blue-600/20">
                  <img
                    src={feature.imageUrl}
                    alt={feature.altText || feature.title}
                    loading="lazy"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 via-transparent to-yellow-400/10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SwedenFeatures;
