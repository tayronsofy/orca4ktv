import type { Metadata } from 'next'
import USAHomePage from '@/page-components/usa/USAHomePage'

export const metadata: Metadata = {
  title: 'Best IPTV USA 2026 - USA Local Channels, NFL & Sports',
  description: 'The Best IPTV USA 2026 for Cord Cutters. Watch USA Local Channels, NFL Sunday Ticket IPTV alternative, and American Sports IPTV HD. Servers in New York, Los Angeles, and Chicago.',
  keywords: 'best iptv usa 2026, usa local channels iptv, nfl sunday ticket iptv alternative, american sports iptv hd, iptv service for firestick usa',
  alternates: {
    canonical: 'https://smart4k.io/iptv-usa',
    languages: {
      'en-US': 'https://smart4k.io/iptv-usa',
      'en-GB': 'https://smart4k.io/iptv-uk',
      'en-CA': 'https://smart4k.io/iptv-canada',
      'x-default': 'https://smart4k.io/',
    },
  },
  openGraph: {
    title: 'Best IPTV USA 2026 - USA Local Channels, NFL & Sports',
    description: 'Watch 22,000+ USA live channels, NFL, NBA, and local networks. Buffer-free 4K streaming.',
    url: 'https://smart4k.io/iptv-usa',
    images: [{ url: 'https://smart4k.io/images/usa-coverage.jpg', width: 1200, height: 630 }],
  },
}

export default function USAPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Best IPTV USA 2026",
            "description": "The Best IPTV USA 2026 for Cord Cutters. Watch USA Local Channels, NFL, and American Sports IPTV HD.",
            "brand": { "@type": "Organization", "name": "SMART 4K" },
            "offers": {
              "@type": "Offer",
              "url": "https://smart4k.io/iptv-usa",
              "priceCurrency": "USD",
              "price": "14.99",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "1284",
              "bestRating": "5"
            }
          })
        }}
      />
      <USAHomePage />
    </>
  )
}
