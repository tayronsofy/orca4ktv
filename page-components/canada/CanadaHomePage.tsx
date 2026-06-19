'use client'

import React, { Suspense, lazy } from 'react'

const LiveTicker = lazy(() => import('@/components/LiveTicker'))
const MovieShowcase = lazy(() => import('@/components/MovieShowcase'))
const Devices = lazy(() => import('@/components/Devices'))
const VideoBanner = lazy(() => import('@/components/VideoBanner'))
const CanadaReviews = lazy(() => import('@/components/canada/CanadaReviews'))
const TelegramWidget = lazy(() => import('@/components/TelegramWidget'))
const CanadaVideoSection = lazy(() => import('@/components/canada/CanadaVideoSection'))
const CanadaPricing = lazy(() => import('@/components/canada/CanadaPricing'))
const CanadaFeatures = lazy(() => import('@/components/canada/CanadaFeatures'))
const CanadaFAQ = lazy(() => import('@/components/canada/CanadaFAQ'))

const Loader = () => (
  <div className="w-full h-32 flex items-center justify-center bg-[#001f3f]">
    <div className="w-6 h-6 border-2 border-red-600 rounded-full animate-spin border-t-transparent" />
  </div>
)

const scrollToPricing = () => {
  const el = document.getElementById('pricing')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  else window.location.href = '/iptv#pricing'
}

interface CanadaHomePageProps {
  seoContent?: React.ReactNode
}

const CanadaHomePage: React.FC<CanadaHomePageProps> = ({ seoContent }) => {
  return (
    <>
      <Suspense fallback={<div className="h-10" />}>
        <LiveTicker />
        <CanadaVideoSection onScrollToPricing={scrollToPricing} />
        <MovieShowcase />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <div id="pricing"><CanadaPricing /></div>
        <CanadaFeatures />
        <Devices />
        {seoContent}
      </Suspense>
      <Suspense fallback={<div />}>
        <VideoBanner />
        <div id="reviews"><CanadaReviews /></div>
        <div id="faq"><CanadaFAQ /></div>
        <TelegramWidget />
      </Suspense>
    </>
  )
}

export default CanadaHomePage
