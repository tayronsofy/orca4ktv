'use client'

import React from 'react'

const features = [
  {
    title: '22,000+ Live Channels',
    description: 'Access sports, news, entertainment and local channels from 150+ countries. Every channel is included in your free trial with zero restrictions.',
    image: '/images/trial-live-channels.jpg',
    alt: 'IPTV live channels grid - 22,000+ channels on Smart TV',
  },
  {
    title: 'True 4K Streaming',
    description: 'Crystal-clear 4K Ultra-HD picture quality on every supported stream. Sports, movies and live events in breathtaking resolution with no buffering.',
    image: '/images/trial-4k-streaming.jpg',
    alt: 'IPTV 4K streaming on Smart TV - buffer-free ultra-HD',
  },
  {
    title: 'Global Sports Coverage',
    description: 'UK football, American football, US pro basketball, MMA pay-per-views, top-tier open-wheel motorsport, top European club football and more - all live, in 4K, on any device. Never miss a match again.',
    image: '/images/trial-sports.jpg',
    alt: 'IPTV sports - UK football, motorsport, basketball live streaming',
  },
  {
    title: 'Movies & VOD Library',
    description: 'Thousands of on-demand movies and series available immediately. New releases and classics - all fully included in your trial.',
    image: '/images/trial-vod.jpg',
    alt: 'IPTV VOD library - thousands of movies and series on demand',
  },
]

const TrialWhatYouGet: React.FC = () => {
  return (
    <section className="py-24 bg-[#001f3f]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
            What&apos;s Included in Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#003580] to-[#00E5FF]">Free Trial</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#003580] to-[#00E5FF] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Your free IPTV trial includes the full ORCA 4K TV experience - no features locked, no restrictions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-[#001530] rounded-3xl border border-white/5 hover:border-[#00E5FF]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden group"
            >
              <div className="overflow-hidden border-b border-white/5">
                <img
                  src={feature.image}
                  alt={feature.alt}
                  loading="lazy"
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-black text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrialWhatYouGet
