'use client'

import React, { Suspense, lazy } from 'react'

const LiveTicker = lazy(() => import('@/components/LiveTicker'))
const MovieShowcase = lazy(() => import('@/components/MovieShowcase'))
const Devices = lazy(() => import('@/components/Devices'))
const VideoBanner = lazy(() => import('@/components/VideoBanner'))
const GermanyReviews = lazy(() => import('@/components/germany/GermanyReviews'))
const TelegramWidget = lazy(() => import('@/components/TelegramWidget'))
const GermanyVideoSection = lazy(() => import('@/components/germany/GermanyVideoSection'))
const GermanyPricing = lazy(() => import('@/components/germany/GermanyPricing'))
const GermanyFeatures = lazy(() => import('@/components/germany/GermanyFeatures'))
const GermanyFAQ = lazy(() => import('@/components/germany/GermanyFAQ'))

const Loader = () => (
  <div className="w-full h-32 flex items-center justify-center bg-[#1f2326]">
    <div className="w-6 h-6 border-2 border-red-700 rounded-full animate-spin border-t-transparent" />
  </div>
)

const scrollToPricing = () => {
  const el = document.getElementById('pricing')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  else window.location.href = '/#pricing'
}

const GermanyHomePage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div className="h-10" />}>
        <LiveTicker />
        <GermanyVideoSection onScrollToPricing={scrollToPricing} />
        <MovieShowcase />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <div id="pricing"><GermanyPricing /></div>
        <GermanyFeatures />
        <Devices />
      </Suspense>
      <Suspense fallback={<div />}>
        <VideoBanner />
        <div id="reviews"><GermanyReviews /></div>
        <div id="faq"><GermanyFAQ /></div>
        <TelegramWidget />
      </Suspense>
    </>
  )
}

export default GermanyHomePage
