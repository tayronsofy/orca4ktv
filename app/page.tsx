import type { Metadata } from 'next'
import { Suspense } from 'react'
import Hero from '@/components/Hero'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Best Premium IPTV Service 2026 - 4K Sports & Movies',
  description: 'Stream 22,000+ live TV channels, 4K movies & global sports on any device. #1 IPTV service for Firestick, Android & iOS. Start your free trial today.',
  keywords: 'buy iptv, iptv free trial, best iptv 2026, 4k iptv subscription, premium iptv, buffer-free streaming, live sports iptv',
  alternates: { canonical: 'https://smart4k.io/' },
  openGraph: {
    title: 'Best Premium IPTV Service 2026 - 4K Sports & Movies',
    description: 'Get instant access to 22,000+ live TV channels, 4K movies, and global sports. Start your free trial.',
    url: 'https://smart4k.io/',
    images: [{ url: 'https://smart4k.io/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                "name": "SMART 4K Premium IPTV Subscription",
                "description": "Get instant access to 22,000+ live TV channels, 4K movies, and global sports.",
                "image": "https://smart4k.io/og-image.jpg",
                "brand": { "@type": "Brand", "name": "SMART 4K" },
                "offers": {
                  "@type": "Offer",
                  "url": "https://smart4k.io/#pricing",
                  "priceCurrency": "USD",
                  "price": "14.99",
                  "availability": "https://schema.org/InStock"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "2854",
                  "bestRating": "5"
                }
              }
            ]
          })
        }}
      />
      <Hero />

      {/* SEO Content Block - server rendered for crawlers */}
      <section className="bg-[#1f2326] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            The Best IPTV Service in 2026 — 4K Sports, Movies &amp; Live TV
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            SMART 4K is a premium IPTV subscription service giving you instant access to over 22,000 live TV channels,
            thousands of on-demand movies, and every major live sports event — all in stunning 4K Ultra-HD quality.
            Whether you follow the Premier League, NBA, UFC, NFL, or Formula 1, our platform delivers buffer-free
            streams directly to your device, 24 hours a day, 7 days a week.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Unlike traditional cable or satellite TV, SMART 4K requires no contracts, no hardware installations,
            and no hidden fees. Simply subscribe, receive your login credentials instantly, and start watching
            on any device — including Amazon Firestick, Android TV boxes, Apple TV, Smart TVs, smartphones,
            tablets, and computers. Our service is fully compatible with popular IPTV players like IPTV Smarters,
            TiviMate, and GSE Smart IPTV.
          </p>
          <h3 className="text-2xl font-black text-white pt-4">
            Why Choose SMART 4K for Your IPTV Subscription?
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            With a 99.9% uptime guarantee, our servers are built for reliability. Our content library spans
            international channels from the USA, UK, Canada, Europe, the Middle East, and beyond. Enjoy
            exclusive sports packages, PPV events, news channels, kids programming, and a massive VOD library
            with the latest movies and TV series — all included in one affordable monthly plan starting at just $21.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Our dedicated 24/7 customer support team is always available to help you get set up and resolve
            any issues within minutes. Join over 10,000 satisfied subscribers who have already made the switch
            to the best IPTV service available in 2026.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="h-10" />}>
        <HomePageClient />
      </Suspense>
    </>
  )
}
