'use client'

import React from 'react';

const UK_FEATURES = [
  {
    title: 'Flawless Nationwide Coverage',
    description: 'Whether you are in London or Edinburgh, our dedicated UK servers ensure your Premier League IPTV no buffering experience is perfect. Enjoy our Anti-freeze technology for Premier League during the biggest matches.',
    imageUrl: '/images/uk-coverage.jpg',
    altText: 'Best IPTV UK 2026 and Sky Sports IPTV alternative',
    reverse: false
  },
  {
    title: 'Smart British Guide (EPG)',
    description: 'Navigate UK TV Channels IPTV HD (BBC, ITV, Channel 4) with our intelligent guide. Watch 3pm kick-offs in the UK and discover what is airing now on TNT Sports IPTV UK.',
    imageUrl: '/images/uk-epg.jpg',
    altText: 'UK TV Channels IPTV HD EPG guide',
    reverse: true
  },
  {
    title: 'Watch on Every Screen',
    description: 'From your living room Smart TV to your Apple or Android smartphone on the go. Follow our easy TiviMate UK setup or Firestick IPTV UK guide to get your Sky Sports IPTV alternative running anywhere.',
    imageUrl: '/images/uk-multi-device.jpg',
    altText: 'TiviMate UK setup and Firestick IPTV UK guide',
    reverse: false
  }
];

const UKFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#1f2326]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 text-white">Best IPTV UK Features</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto"></div>
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#2c3034] p-2 border border-blue-500/20">
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
