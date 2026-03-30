'use client'

import React from 'react';

const CANADA_FEATURES = [
  {
    title: 'Flawless Nationwide Coverage',
    description: 'The premier IPTV service for Toronto, Vancouver, and Montreal. Enjoy 99.9% uptime during NHL playoffs with our dedicated Canadian servers. Perfect for French Canadian IPTV channels.',
    imageUrl: '/images/canada-coverage.jpg',
    altText: 'Best IPTV Canada 2026 servers in Toronto and Vancouver',
    reverse: false
  },
  {
    title: 'Smart Canadian Guide (EPG)',
    description: 'The best NHL Center Ice IPTV alternative. Navigate TSN and Sportsnet IPTV Canada, along with Canadian Local News IPTV and massive multicultural packages including Indian IPTV Canada and Arabic IPTV Canada.',
    imageUrl: '/images/canada-epg.jpg',
    altText: 'NHL Center Ice IPTV alternative and TSN and Sportsnet IPTV Canada',
    reverse: true
  },
  {
    title: 'Watch on Every Screen',
    description: 'From your living room Smart TV to your Apple or Android smartphone on the go. Experience the Best IPTV Canada 2026 anywhere, streaming all your favorite French Canadian IPTV channels and sports.',
    imageUrl: '/images/canada-multi-device.jpg',
    altText: 'French Canadian IPTV channels and Canadian Local News IPTV streaming',
    reverse: false
  }
];

const CanadaFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-[#1f2326]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4 text-white">Best IPTV CANADA Features</h2>
          <div className="w-20 h-1 bg-red-500 mx-auto"></div>
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
                <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-[#2c3034] p-2 border border-red-500/20">
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
