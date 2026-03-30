'use client'

import React, { Suspense, lazy } from 'react'

const LiveTicker = lazy(() => import('@/components/LiveTicker'))
const MovieShowcase = lazy(() => import('@/components/MovieShowcase'))
const Devices = lazy(() => import('@/components/Devices'))
const VideoBanner = lazy(() => import('@/components/VideoBanner'))
const USAReviews = lazy(() => import('@/components/usa/USAReviews'))
const TelegramWidget = lazy(() => import('@/components/TelegramWidget'))
const USAVideoSection = lazy(() => import('@/components/usa/USAVideoSection'))
const USAPricing = lazy(() => import('@/components/usa/USAPricing'))
const USAFeatures = lazy(() => import('@/components/usa/USAFeatures'))
const USAFAQ = lazy(() => import('@/components/usa/USAFAQ'))

const Loader = () => (
  <div className="w-full h-32 flex items-center justify-center bg-[#1f2326]">
    <div className="w-6 h-6 border-2 border-blue-600 rounded-full animate-spin border-t-transparent" />
  </div>
)

const scrollToPricing = () => {
  const el = document.getElementById('pricing')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  else window.location.href = '/#pricing'
}

const USAHomePage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div className="h-10" />}>
        <LiveTicker />
        <USAVideoSection onScrollToPricing={scrollToPricing} />
        <MovieShowcase />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <div id="pricing"><USAPricing /></div>
        <USAFeatures />
        <Devices />
      </Suspense>
      <Suspense fallback={<div />}>
        <VideoBanner />
        <div id="reviews"><USAReviews /></div>
        <div id="faq"><USAFAQ /></div>
        <TelegramWidget />
      </Suspense>
    </>
  )
}

export default USAHomePage
