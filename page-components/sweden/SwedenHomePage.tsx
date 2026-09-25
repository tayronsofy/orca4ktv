'use client'

import React, { Suspense, lazy } from 'react'

const LiveTicker = lazy(() => import('@/components/LiveTicker'))
const MovieShowcase = lazy(() => import('@/components/MovieShowcase'))
const Devices = lazy(() => import('@/components/Devices'))
const VideoBanner = lazy(() => import('@/components/VideoBanner'))
const SwedenReviews = lazy(() => import('@/components/sweden/SwedenReviews'))
const TelegramWidget = lazy(() => import('@/components/TelegramWidget'))
const SwedenVideoSection = lazy(() => import('@/components/sweden/SwedenVideoSection'))
const SwedenPricing = lazy(() => import('@/components/sweden/SwedenPricing'))
const SwedenFeatures = lazy(() => import('@/components/sweden/SwedenFeatures'))
const SwedenFAQ = lazy(() => import('@/components/sweden/SwedenFAQ'))

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

interface SwedenHomePageProps {
  seoContent?: React.ReactNode
}

const SwedenHomePage: React.FC<SwedenHomePageProps> = ({ seoContent }) => {
  return (
    <>
      <Suspense fallback={<div className="h-10" />}>
        <LiveTicker />
        <SwedenVideoSection onScrollToPricing={scrollToPricing} />
        <MovieShowcase />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <div id="pricing"><SwedenPricing /></div>
        <SwedenFeatures />
        <Devices />
        {seoContent}
      </Suspense>
      <Suspense fallback={<div />}>
        <VideoBanner />
        <div id="reviews"><SwedenReviews /></div>
        <div id="faq"><SwedenFAQ /></div>
        <TelegramWidget />
      </Suspense>
    </>
  )
}

export default SwedenHomePage
