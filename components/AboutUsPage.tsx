'use client'

import { useRouter } from 'next/navigation'


import React from 'react';
import SEO from './SEO';

interface AboutUsPageProps {
  onBackToHome?: () => void;
}

const AboutUsPage: React.FC<AboutUsPageProps> = ({ onBackToHome }) => {
  const router = useRouter()
  const handleBack = onBackToHome || (() => router.push('/'))
  // --- IMAGE SOURCES ---
  // Replaced base64 placeholders with direct URLs as requested.

  const missionImageUrl = "/images/smart4k-not-harder-scaled.png";
  const contentQualityImageUrl = "/images/iptv-quality-scaled.png";
  // --- END OF IMAGE SOURCES ---


  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 bg-gradient-to-br from-[#020204] via-[#1a1d20] to-[#020204] px-4 overflow-hidden">
      <SEO
        title="About Us - SMART 4K - Our Vision & Mission"
        description="Learn about SMART 4K's mission to revolutionize global TV streaming with 4K quality, anti-freeze technology, and 24/7 support."
        keywords="about smart 4k, ip tv provider, streaming vision, best iptv team"
      />
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#a855f7]/10 blur-[150px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow-reverse"></div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        <div className="inline-block px-5 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#a855f7] text-[10px] font-black uppercase tracking-[0.3em] animate-fade-in">
          <span className="mr-2 inline-block w-2 h-2 bg-[#a855f7] rounded-full animate-pulse"></span>
          Our Story & Vision
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-white drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
          ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-white to-[#a855f7] bg-[length:200%_auto] animate-shimmer">SMART 4K</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-12 font-medium max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
          SMART 4K was founded with a singular ambition: redefining your home entertainment experience. We are dedicated to delivering borderless access to premium television networks, powered by industry-leading stability and visual excellence.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 space-y-20 px-4 md:px-0">
        {/* Section 1: Our Mission */}
        <div className="flex flex-col md:flex-row items-center gap-12 bg-[#1f2326]/60 border border-white/5 rounded-3xl p-8 md:p-12 shadow-xl backdrop-blur-md">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-black text-white mb-4">Our Core Philosophy: Elevate Your Viewing Standard</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We exist to dismantle geographical broadcasting restrictions and bring the world's most sought-after media directly to your living room. Whether it's international sports, breaking news, or blockbuster films, our network ensures every pixel is pushed in resplendent 4K definition.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={missionImageUrl}
              alt="Our Mission"
              className="w-full max-w-md rounded-2xl shadow-lg border border-white/10"
            />
          </div>
        </div>

        {/* Section 2: What We Offer */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-12 bg-[#1f2326]/60 border border-white/5 rounded-3xl p-8 md:p-12 shadow-xl backdrop-blur-md">
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl font-black text-white mb-4">Elite Programming Selection & Performance</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Beyond simply offering channels, SMART 4K curates an elite digital library. We guarantee flawless transmission backed by our proprietary anti-freeze protocols and a robust 99.9% uptime SLA, making buffering a relic of the past on any device.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src={contentQualityImageUrl}
              alt="Content & Quality"
              className="w-full max-w-md rounded-2xl shadow-lg border border-white/10"
            />
          </div>
        </div>

        {/* Section 3: Why Choose Us */}
        <div className="text-center py-12 px-8 bg-[#1f2326]/60 border border-white/5 rounded-3xl shadow-xl backdrop-blur-md">
          <h2 className="text-3xl font-black text-white mb-6">The SMART 4K Advantage</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
            <div className="flex flex-col items-center">
              <i className="fas fa-globe-americas text-5xl text-[#a855f7] mb-4"></i>
              <h3 className="text-xl font-bold text-white mb-2">Global Coverage</h3>
              <p className="text-gray-400">Tap into an expansive grid of global networks without limitations.</p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-shield-alt text-5xl text-blue-400 mb-4"></i>
              <h3 className="text-xl font-bold text-white mb-2">Reliable Service</h3>
              <p className="text-gray-400">Experience rock-solid connectivity thanks to our enterprise-grade server architecture.</p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fas fa-robot text-5xl text-red-500 mb-4"></i>
              <h3 className="text-xl font-bold text-white mb-2">Smart Technology</h3>
              <p className="text-gray-400">Leverage intelligent search algorithms and automated configuration for instant access.</p>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-16">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#6d28d9] to-[#a855f7] text-white font-black rounded-full uppercase text-sm tracking-[0.2em] hover:scale-105 transition-all shadow-xl"
          >
            <i className="fas fa-arrow-left"></i> Back to Home
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }

        .animate-pulse-slow-reverse {
          animation: pulse-slow 18s ease-in-out infinite reverse;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-shimmer {
          animation: shimmer 6s linear infinite;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default AboutUsPage;