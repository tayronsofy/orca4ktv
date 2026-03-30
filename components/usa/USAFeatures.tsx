'use client'

import React from 'react';

const USA_FEATURES = [
  {
    title: 'Flawless Nationwide Coverage',
    description: 'Whether you are in New York, Los Angeles, or Chicago, our dedicated North American servers ensure your IPTV service for Firestick USA never buffers during the big event. The ultimate NFL Sunday Ticket IPTV alternative.',
    imageUrl: '/images/usa-coverage.jpg',
    altText: 'Best IPTV USA 2026 for Cord Cutters in New York and Los Angeles',
    reverse: false
  },
  {
    title: 'Smart American Guide (EPG)',
    description: 'Navigate USA Local Channels IPTV, regional sports networks, and local news broadcasts with our intelligent electronic program guide. Watch ABC, NBC, CBS, and FOX without cable.',
    imageUrl: '/images/usa-epg.jpg',
    altText: 'USA Local Channels IPTV and American Sports IPTV HD EPG',
    reverse: true
  },
  {
    title: 'Watch on Every Screen',
    description: 'Stream ESPN and TNT in 4K from your living room Smart TV to your Apple or Android smartphone on the go. One subscription covers all your favorite devices including the best IPTV service for Firestick USA.',
    imageUrl: '/images/usa-multi-device.jpg',
    altText: 'IPTV service for Firestick USA and Smart TV streaming',
    reverse: false
  }
];

const USAFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#1f2326]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 text-white">Best IPTV USA Features</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto"></div>
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

export default USAFeatures;
