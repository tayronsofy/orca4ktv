'use client'

import React from 'react';

const GERMANY_FEATURES = [
  {
    title: 'Perfekte Abdeckung in ganz Deutschland',
    description: 'Ob in Berlin, München oder Hamburg – unsere dedizierten deutschen Server garantieren pufferungsfreies Streamen der Bundesliga und aller deutschen Premium-Sender in 4K. Unsere Anti-Freeze-Technologie sorgt auch bei Topmatches für ein fehlerfreies Erlebnis.',
    imageUrl: '/images/german iptv provider.jpeg',
    altText: 'IPTV Germany – Bestes IPTV Deutschland 2026',
    reverse: false
  },
  {
    title: 'Intelligenter Programmführer (EPG)',
    description: 'Navigiere durch alle deutschen Sender wie ARD, ZDF, RTL und ProSieben mit unserem intelligenten Programmführer. Verpasse nie wieder ein Bundesliga-Spiel oder ein DFB-Pokal-Finale – alles übersichtlich im EPG organisiert.',
    imageUrl: '/images/Germany iptv epg.jpeg',
    altText: 'IPTV Germany EPG Programmführer',
    reverse: true
  },
  {
    title: 'Auf jedem Gerät streamen',
    description: 'Vom Smart TV im Wohnzimmer bis zum Smartphone unterwegs. Folge unserer einfachen Einrichtungsanleitung für TiviMate oder Firestick und schaue deine Lieblingssender überall – ganz ohne Satellitenschüssel oder Kabelanschluss.',
    imageUrl: '/images/iptv germany multidevice.jpeg',
    altText: 'IPTV Germany auf allen Geräten',
    reverse: false
  }
];

const GermanyFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#1f2326]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 text-white">Bestes IPTV Deutschland – Funktionen</h2>
          <div className="w-20 h-1 bg-red-700 mx-auto"></div>
        </div>

        <div className="space-y-32">
          {GERMANY_FEATURES.map((feature, idx) => (
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#2c3034] p-2 border border-red-700/20">
                  <img
                    src={feature.imageUrl}
                    alt={feature.altText || feature.title}
                    loading="lazy"
                    className="w-full h-auto rounded-xl object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-red-700/10 via-transparent to-yellow-500/10"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GermanyFeatures;
