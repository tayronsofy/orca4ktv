import type { Metadata } from 'next'
import CanadaHomePage from '@/page-components/canada/CanadaHomePage'

export const metadata: Metadata = {
  title: 'Best IPTV Canada 2026 - NHL, TSN & Sportsnet Alternative',
  description: 'The Best IPTV Canada 2026. Get the ultimate NHL Center Ice IPTV alternative. Watch TSN and Sportsnet IPTV Canada, Canadian Local News, and French Canadian IPTV channels.',
  keywords: 'best iptv canada 2026, nhl center ice iptv alternative, tsn sportsnet iptv canada, canadian local news iptv, french canadian iptv channels',
  alternates: {
    canonical: 'https://smart4k.io/iptv-canada',
    languages: {
      'en-US': 'https://smart4k.io/iptv-usa',
      'en-GB': 'https://smart4k.io/iptv-uk',
      'en-CA': 'https://smart4k.io/iptv-canada',
      'x-default': 'https://smart4k.io/',
    },
  },
  openGraph: {
    title: 'Best IPTV Canada 2026 - NHL, TSN & Sportsnet Alternative',
    description: 'Watch NHL, TSN, Sportsnet, CBC, and all Canadian channels. Buffer-free 4K streaming.',
    url: 'https://smart4k.io/iptv-canada',
    images: [{ url: 'https://smart4k.io/images/canada-coverage.jpg', width: 1200, height: 630 }],
  },
}

export default function CanadaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Best IPTV Canada 2026",
            "description": "The Best IPTV Canada 2026. NHL Center Ice IPTV alternative. Watch TSN and Sportsnet IPTV Canada.",
            "brand": { "@type": "Organization", "name": "SMART 4K" },
            "offers": {
              "@type": "Offer",
              "url": "https://smart4k.io/iptv-canada",
              "priceCurrency": "CAD",
              "price": "19.99",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "843",
              "bestRating": "5"
            }
          })
        }}
      />
      <CanadaHomePage />
    </>
  )
}
