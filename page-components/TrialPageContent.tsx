'use client'

import React, { Suspense, lazy } from 'react'
import FreeTrialForm from '@/components/FreeTrialForm'

const TrialTrustBar = lazy(() => import('@/components/trial/TrialTrustBar'))
const TrialWhatYouGet = lazy(() => import('@/components/trial/TrialWhatYouGet'))
const TrialHowItWorks = lazy(() => import('@/components/trial/TrialHowItWorks'))
const TrialCompatibleDevices = lazy(() => import('@/components/trial/TrialCompatibleDevices'))
const TrialFAQ = lazy(() => import('@/components/trial/TrialFAQ'))
const TrialReviews = lazy(() => import('@/components/trial/TrialReviews'))
const TrialBottomCTA = lazy(() => import('@/components/trial/TrialBottomCTA'))

const Loader = () => (
  <div className="w-full h-32 flex items-center justify-center bg-[#001f3f]">
    <div className="w-6 h-6 border-2 border-[#00E5FF] rounded-full animate-spin border-t-transparent" />
  </div>
)

const scrollToForm = () => {
  const el = document.getElementById('trial-form')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const TrialPageContent: React.FC = () => {
  return (
    <>
      {/* Hero + Form - above the fold, NOT lazy loaded */}
      <section
        id="trial-form"
        className="relative py-20 px-4 bg-gradient-to-br from-[#00050d] via-[#001a36] to-[#00050d] overflow-hidden"
      >
        {/* Background glows */}
        <div className="hidden md:block absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00E5FF]/10 blur-[150px] rounded-full pointer-events-none animate-pulse-slow" />
        <div className="hidden md:block absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#003580]/10 blur-[150px] rounded-full pointer-events-none animate-pulse-slow-reverse" />

        <div className="relative z-10 max-w-4xl mx-auto text-center mb-8">
          {/* Badge */}
          <div className="inline-block px-5 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#00E5FF] text-[10px] font-black uppercase tracking-[0.3em] animate-fade-in">
            <span className="mr-2 inline-block w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse"></span>
            No Credit Card Required
          </div>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black mb-6 leading-[0.9] tracking-tighter text-white drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
            FREE IPTV<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00E5FF] to-[#003580] bg-[length:200%_auto] animate-shimmer">
              TRIAL 2026
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
            Test 22,000+ live channels, 4K sports &amp; VOD - completely free.
            No credit card. No commitment. Credentials delivered in minutes.
          </p>

          {/* Benefit pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
            {[
              { icon: 'fas fa-credit-card', label: 'No Credit Card' },
              { icon: 'fas fa-bolt', label: 'Instant Access' },
              { icon: 'fas fa-times-circle', label: 'Cancel Anytime' },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-sm font-bold"
              >
                <i className={`${icon} text-[#00E5FF] text-xs`} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Form - rendered directly, no lazy wrapper */}
        <FreeTrialForm />

        <style>{`
          .animate-pulse-slow { animation: pulse-slow 15s ease-in-out infinite; }
          .animate-pulse-slow-reverse { animation: pulse-slow 18s ease-in-out infinite reverse; }
          @keyframes pulse-slow { 0%, 100% { transform: scale(1); opacity: 0.1; } 50% { transform: scale(1.2); opacity: 0.2; } }
          @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
          .animate-shimmer { animation: shimmer 6s linear infinite; }
          .animate-fade-in { animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `}</style>
      </section>

      {/* SEO content block - appears after hero, crawlable via SSR pre-rendering */}
      <section className="bg-[#001f3f] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Free IPTV Trial 2026 - Test 22,000+ Live Channels With No Credit Card
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            ORCA 4K TV offers the best free IPTV trial in 2026. Submit your request and receive full access to 22,000+ live channels -
            including premium 4K sports, global news, movies, and an on-demand VOD library - within minutes. No credit card, no contract,
            no risk. The trial works on every major device: Amazon Firestick, Android TV, Samsung Smart TV, Apple TV, Roku, iPhone, iPad, and PC.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Looking for a free IPTV test before you commit? ORCA 4K TV is rated the #1 IPTV service for reliability and 4K quality.
            Our free trial gives you the same full-service experience as a paid subscription - buffer-free streaming, EPG guide,
            VOD library, and 24/7 live support. Test channels from USA, UK, Canada, Netherlands, Germany, and 150+ countries.
          </p>
          <h3 className="text-2xl font-black text-white pt-4">
            IPTV Free Trial - Instant Access, Zero Commitment
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            To start your IPTV free trial: fill in the form on this page with your name, email, and device type. Our team will send your
            login credentials immediately. After the trial ends, there is no automatic billing - you choose whether to continue with
            plans starting from just $21/month. Join thousands of subscribers already streaming in 4K today.
          </p>
        </div>
      </section>

      <Suspense fallback={<Loader />}>
        <TrialTrustBar />
        <TrialWhatYouGet />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <TrialHowItWorks />
        <TrialCompatibleDevices />
      </Suspense>
      <Suspense fallback={<div />}>
        <div id="trial-faq"><TrialFAQ /></div>
        <div id="trial-reviews"><TrialReviews /></div>
        <TrialBottomCTA onScrollToForm={scrollToForm} />
      </Suspense>
    </>
  )
}

export default TrialPageContent
