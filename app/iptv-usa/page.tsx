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
      {/* SEO Content Block - server rendered for crawlers */}
      <section className="bg-[#1f2326] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Best IPTV USA 2026 — NFL, NBA, Local Channels &amp; More
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            SMART 4K is the best IPTV service for USA cord cutters in 2026. Get instant access to over 22,000 live
            American TV channels including every major local network — ABC, NBC, CBS, FOX, and PBS — plus premium
            sports coverage for NFL, NBA, MLB, NHL, MMA, and UFC. Our USA-optimized servers in New York, Los Angeles,
            and Chicago deliver buffer-free 4K streaming no matter where you are in the country.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Looking for an NFL Sunday Ticket IPTV alternative? SMART 4K covers every NFL game, every week, in HD and
            4K quality. Watch your favorite American sports IPTV channels without the expensive cable bill. Our service
            works seamlessly on Amazon Firestick, Roku, Apple TV, Android boxes, Smart TVs, and all mobile devices —
            no satellite dish or cable box required.
          </p>
          <h3 className="text-2xl font-black text-white pt-4">
            USA Local Channels, Sports &amp; On-Demand — All in One Plan
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Every SMART 4K subscription includes access to USA local channels IPTV in HD, ESPN, TNT, FS1, FS2,
            beIN Sports, and hundreds of regional sports networks. Watch live news on CNN, Fox News, and MSNBC.
            Enjoy thousands of on-demand movies and TV series with same-day releases. Our American sports IPTV HD
            packages start at just $21/month — no contracts, no commitments, cancel any time.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Join thousands of American subscribers who have already replaced their cable subscription with SMART 4K.
            Our 24/7 US-based support team ensures you are always set up and streaming within minutes of signing up.
            Try our free IPTV trial today and experience the best IPTV USA 2026 has to offer.
          </p>
        </div>
      </section>

      <USAHomePage />
    </>
  )
}
