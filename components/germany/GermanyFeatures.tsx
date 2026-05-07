'use client'

import React from 'react';

const GERMANY_FEATURES = [
  {
    title: 'Bundesweite Abdeckung mit Frankfurt-Edge-Server',
    description: 'Ein dedizierter Frankfurt-Edge-Server hält die Latenz unter 25 ms - egal ob du den Spitzenfußball-Topspiel-Samstag in Berlin schaust, einen europäischen Klubfußball-Abend in München oder die Winterspiele-Highlights in Hamburg. Anti Freeze CDN lenkt Spitzenlast in Echtzeit um, sodass jeder Anstoß, jede Boxen-Stopp-Entscheidung und jeder Goldmedaillen-Moment pufferungsfrei in 4K HDR ankommt.',
    imageUrl: '/images/germany-coverage.jpg',
    altText: 'Zwei deutsche Fußball-Fans auf dem Sofa beim Live-Streaming eines 4K-HDR-Spitzenfußball-Spiels auf einem Smart TV - pufferungsfreies IPTV Deutschland Streaming auf ORCA 4K TV.',
    reverse: false
  },
  {
    title: 'Intelligenter Programmführer für den deutschen Sportkalender',
    description: 'Der ORCA 4K TV Programmführer kennt deine Woche - Spitzenfußball-Wochenende, top europäischer Klubfußball dienstags und mittwochs, Motorsport-Sonntage, Pokal-Mittwoch, Winterspiele-Highlights. Live-Ticker, Sender-Sprünge, 7-Tage-Catch-Up-TV und KI-gestützte Suche („Was läuft jetzt?") für alle wichtigen deutschen Free-TV- und Sportsender.',
    imageUrl: '/images/germany-epg.jpg',
    altText: 'Erwachsener mit Fernbedienung sieht den Smart-TV-Programmführer auf einem 4K-Smart-TV - ORCA 4K TV Deutschland IPTV-Abonnement mit elektronischem Programmführer und 7-Tage-Catch-Up-TV.',
    reverse: true
  },
  {
    title: 'Auf jedem deutschen Streaming-Gerät - ein Abo',
    description: 'Multi-Device-Kompatibilität in jedem Tarif: Firestick 4K Max, Apple TV 4K (3. Gen), Android TV 14, Chromecast mit Google TV, Samsung Tizen, LG webOS, MAG-Box, iOS, Android, Windows, macOS und jeder Webbrowser. Bis zu vier gleichzeitige Streams. Identische deutsche Senderbibliothek und EPG auf jedem Bildschirm - TiviMate, IPTV Smarters Pro und OTT Navigator werden unterstützt.',
    imageUrl: '/images/germany-multi-device.jpg',
    altText: 'Couchtisch mit Firestick 4K Max Fernbedienung, Apple TV 4K Box, Roku-Player, Smartphone und Tablet in einem deutschen Wohnzimmer - Multi-Device-IPTV-Kompatibilität auf ORCA 4K TV Deutschland.',
    reverse: false
  }
];

const GermanyFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#001f3f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <p className="text-yellow-400 text-xs font-black uppercase tracking-[0.3em] mb-3">
            Gebaut für deutsche Cord-Cutter
          </p>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-white leading-tight">
            Warum ORCA 4K TV das beste IPTV Deutschland 2026 ist
          </h2>
          <p className="text-gray-400 text-base md:text-lg leading-relaxed mt-4">
            Pufferungsfreies 4K-HDR-Streaming, jeder deutsche Sender, jede Liga - Anti Freeze CDN mit Frankfurt-Edge-Server, AES-256-verschlüsselt, Multi-Device-IPTV ready.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-red-700 to-yellow-500 mx-auto mt-6"></div>
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#002952] p-2 border border-red-700/20">
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
