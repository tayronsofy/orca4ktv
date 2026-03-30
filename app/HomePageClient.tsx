'use client'

import { Suspense, lazy } from 'react'

const LiveTicker = lazy(() => import('@/components/LiveTicker'))
const VideoSection = lazy(() => import('@/components/VideoSection'))
const MovieShowcase = lazy(() => import('@/components/MovieShowcase'))
const Pricing = lazy(() => import('@/components/Pricing'))
const Features = lazy(() => import('@/components/Features'))
const Devices = lazy(() => import('@/components/Devices'))
const VideoBanner = lazy(() => import('@/components/VideoBanner'))
const Reviews = lazy(() => import('@/components/Reviews'))
const FAQ = lazy(() => import('@/components/FAQ'))
const TelegramWidget = lazy(() => import('@/components/TelegramWidget'))

const Loader = () => (
  <div className="w-full h-32 flex items-center justify-center bg-[#1f2326]">
    <div className="w-6 h-6 border-2 border-purple-600 rounded-full animate-spin border-t-transparent" />
  </div>
)

const scrollToPricing = () => {
  const el = document.getElementById('pricing')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function HomePageClient() {
  return (
    <>
      <Suspense fallback={<div className="h-10" />}>
        <LiveTicker />
        <VideoSection onScrollToPricing={scrollToPricing} />
        <MovieShowcase />
      </Suspense>

      <Suspense fallback={<Loader />}>
        <div id="pricing"><Pricing /></div>
        <Features />
        <Devices />
      </Suspense>

      <Suspense fallback={<div />}>
        <VideoBanner />
        <div id="reviews"><Reviews /></div>
        <div id="faq"><FAQ /></div>
        <TelegramWidget />
      </Suspense>
    </>
  )
}
