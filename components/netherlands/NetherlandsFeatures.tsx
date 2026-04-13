'use client'

import React from 'react';

const NETHERLANDS_FEATURES = [
  {
    title: 'Perfecte dekking door heel Nederland',
    description: 'Of je nu in Amsterdam, Rotterdam of Eindhoven bent – onze dedicated Nederlandse servers garanderen buffervrij streamen van Eredivisie en alle Nederlandse premium zenders in 4K. Onze anti-freeze technologie zorgt ook tijdens topper-wedstrijden voor een feilloze ervaring.',
    imageUrl: '/images/watch iptv Nederland.jpeg',
    altText: 'IPTV Netherlands – Beste IPTV Nederland 2026',
    reverse: false
  },
  {
    title: 'Slimme Programmagids (EPG)',
    description: 'Navigeer door alle Nederlandse zenders zoals NPO 1, NPO 2, RTL 4, SBS6 en Ziggo Sport met onze intelligente programmagids. Mis nooit meer een Eredivisie-wedstrijd of een Formule 1-race met Max Verstappen – alles overzichtelijk georganiseerd in de EPG.',
    imageUrl: '/images/NEDERLAND iptv epg.jpeg',
    altText: 'IPTV Netherlands EPG Programmagids',
    reverse: true
  },
  {
    title: 'Stream op elk apparaat',
    description: 'Van de Smart TV in de woonkamer tot je smartphone onderweg. Volg onze eenvoudige installatiegids voor TiviMate of Firestick en kijk je favoriete zenders overal – helemaal zonder satellietschotel of kabelaansluiting.',
    imageUrl: '/images/Nederland iptv channels.jpeg',
    altText: 'IPTV Netherlands op alle apparaten',
    reverse: false
  }
];

const NetherlandsFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#1f2326]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 text-white">Beste IPTV Nederland – Functies</h2>
          <div className="w-20 h-1 bg-[#AE1C28] mx-auto"></div>
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#2c3034] p-2 border border-[#AE1C28]/20">
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
