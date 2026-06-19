'use client'

import React, { Suspense, lazy } from 'react'

const LiveTicker = lazy(() => import('@/components/LiveTicker'))
const MovieShowcase = lazy(() => import('@/components/MovieShowcase'))
const Devices = lazy(() => import('@/components/Devices'))
const VideoBanner = lazy(() => import('@/components/VideoBanner'))
const UKReviews = lazy(() => import('@/components/uk/UKReviews'))
const TelegramWidget = lazy(() => import('@/components/TelegramWidget'))
const UKVideoSection = lazy(() => import('@/components/uk/UKVideoSection'))
const UKPricing = lazy(() => import('@/components/uk/UKPricing'))
const UKFeatures = lazy(() => import('@/components/uk/UKFeatures'))
const UKFAQ = lazy(() => import('@/components/uk/UKFAQ'))

const Loader = () => (
  <div className="w-full h-32 flex items-center justify-center bg-[#001f3f]">
    <div className="w-6 h-6 border-2 border-blue-600 rounded-full animate-spin border-t-transparent" />
  </div>
)

const scrollToPricing = () => {
  const el = document.getElementById('pricing')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  else window.location.href = '/iptv#pricing'
}

interface UKHomePageProps {
  seoContent?: React.ReactNode
}

const UKHomePage: React.FC<UKHomePageProps> = ({ seoContent }) => {
  return (
    <>
      <Suspense fallback={<div className="h-10" />}>
        <LiveTicker />
        <UKVideoSection onScrollToPricing={scrollToPricing} />
        <MovieShowcase />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <div id="pricing"><UKPricing /></div>
        <UKFeatures />
        <Devices />
        {seoContent}
      </Suspense>
      <Suspense fallback={<div />}>
        <VideoBanner />
        <div id="reviews"><UKReviews /></div>
        <div id="faq"><UKFAQ /></div>
        <TelegramWidget />
      </Suspense>
    </>
  )
}

export default UKHomePage
