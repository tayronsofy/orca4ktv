import type { Metadata } from 'next'
import { Suspense } from 'react'
import Hero from '@/components/Hero'
import HomePageClient from './HomePageClient'

export const metadata: Metadata = {
  title: 'Best Premium IPTV Service 2026 - 4K Sports & Movies',
  description: 'Get instant access to 22,000+ live TV channels, 4K movies, and global sports (EPL, NBA, UFC). The #1 rated IPTV provider for Firestick, Android & iOS. Start your free trial.',
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
                "brand": { "@type": "Organization", "name": "SMART 4K" },
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
      <Suspense fallback={<div className="h-10" />}>
        <HomePageClient />
      </Suspense>
    </>
  )
}
