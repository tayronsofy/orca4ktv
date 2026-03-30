import type { Metadata } from 'next'
import UKHomePage from '@/page-components/uk/UKHomePage'

export const metadata: Metadata = {
  title: 'Best IPTV UK 2026 - Premier League, Sky Sports Alternative',
  description: 'The Best IPTV UK 2026 provider. The ultimate Sky Sports IPTV alternative. Watch UK TV Channels (BBC, ITV, Channel 4) and TNT Sports IPTV UK with zero buffering.',
  keywords: 'best iptv uk 2026, sky sports iptv alternative, premier league iptv no buffering, uk tv channels iptv hd, tnt sports iptv uk',
  alternates: {
    canonical: 'https://smart4k.io/iptv-uk',
    languages: {
      'en-US': 'https://smart4k.io/iptv-usa',
      'en-GB': 'https://smart4k.io/iptv-uk',
      'en-CA': 'https://smart4k.io/iptv-canada',
      'x-default': 'https://smart4k.io/',
    },
  },
  openGraph: {
    title: 'Best IPTV UK 2026 - Premier League & Sky Sports Alternative',
    description: 'Watch Premier League, BBC, ITV, Channel 4 and all UK channels with zero buffering.',
    url: 'https://smart4k.io/iptv-uk',
    images: [{ url: 'https://smart4k.io/images/uk-coverage.jpg', width: 1200, height: 630 }],
  },
}

export default function UKPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Best IPTV UK 2026",
            "description": "The Best IPTV UK 2026 provider. The ultimate Sky Sports IPTV alternative.",
            "brand": { "@type": "Organization", "name": "SMART 4K" },
            "offers": {
              "@type": "Offer",
              "url": "https://smart4k.io/iptv-uk",
              "priceCurrency": "GBP",
              "price": "12.00",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "986",
              "bestRating": "5"
            }
          })
        }}
      />
      <UKHomePage />
    </>
  )
}
