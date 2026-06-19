'use client'

import React, { Suspense, lazy } from 'react'

const LiveTicker = lazy(() => import('@/components/LiveTicker'))
const MovieShowcase = lazy(() => import('@/components/MovieShowcase'))
const Devices = lazy(() => import('@/components/Devices'))
const VideoBanner = lazy(() => import('@/components/VideoBanner'))
const NetherlandsReviews = lazy(() => import('@/components/netherlands/NetherlandsReviews'))
const TelegramWidget = lazy(() => import('@/components/TelegramWidget'))
const NetherlandsVideoSection = lazy(() => import('@/components/netherlands/NetherlandsVideoSection'))
const NetherlandsPricing = lazy(() => import('@/components/netherlands/NetherlandsPricing'))
const NetherlandsFeatures = lazy(() => import('@/components/netherlands/NetherlandsFeatures'))
const NetherlandsFAQ = lazy(() => import('@/components/netherlands/NetherlandsFAQ'))

const Loader = () => (
  <div className="w-full h-32 flex items-center justify-center bg-[#001f3f]">
    <div className="w-6 h-6 border-2 border-[#AE1C28] rounded-full animate-spin border-t-transparent" />
  </div>
)

const scrollToPricing = () => {
  const el = document.getElementById('pricing')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  else window.location.href = '/iptv#pricing'
}

interface NetherlandsHomePageProps {
  seoContent?: React.ReactNode
}

const NetherlandsHomePage: React.FC<NetherlandsHomePageProps> = ({ seoContent }) => {
  return (
    <>
      <Suspense fallback={<div className="h-10" />}>
        <LiveTicker />
        <NetherlandsVideoSection onScrollToPricing={scrollToPricing} />
        <MovieShowcase />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <div id="pricing"><NetherlandsPricing /></div>
        <NetherlandsFeatures />
        <Devices />
        {seoContent}
      </Suspense>
      <Suspense fallback={<div />}>
        <VideoBanner />
        <div id="reviews"><NetherlandsReviews /></div>
        <div id="faq"><NetherlandsFAQ /></div>
        <TelegramWidget />
      </Suspense>
    </>
  )
}

export default NetherlandsHomePage
