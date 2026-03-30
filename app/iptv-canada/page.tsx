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
      {/* SEO Content Block - server rendered for crawlers */}
      <section className="bg-[#1f2326] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Best IPTV Canada 2026 — NHL, TSN, Sportsnet &amp; Canadian TV
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            SMART 4K is the best IPTV Canada 2026 service for Canadian viewers looking to cut the cord without
            missing a single game. As the ultimate NHL Center Ice IPTV alternative, we broadcast every NHL game
            live — from the Toronto Maple Leafs to the Vancouver Canucks — in stunning HD and 4K quality.
            Watch TSN and Sportsnet IPTV Canada, including every playoff series and Stanley Cup Final.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Beyond hockey, SMART 4K covers the entire Canadian sports calendar. Follow the CFL, NBA Toronto Raptors,
            Blue Jays MLB games, and Canadian Premier League soccer — all live and buffer-free. Our Canadian local
            news IPTV channels include CBC, Global TV, CTV, and Citytv across all major Canadian cities, keeping
            you connected to local news and community programming wherever you are.
          </p>
          <h3 className="text-2xl font-black text-white pt-4">
            French Canadian IPTV Channels &amp; National Sports Networks
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Quebec viewers can enjoy a full selection of French Canadian IPTV channels including TVA, RDS, V Télé,
            and Télé-Québec — all in HD. Our bilingual content library covers entertainment, sports, news, and
            on-demand movies and series for both English and French Canadian audiences. With over 22,000 channels
            and a massive VOD library, every Canadian household is covered. Plans start at just $21/month CAD.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Compatible with Amazon Firestick, Apple TV, Android boxes, Smart TVs, and all smartphones and tablets,
            SMART 4K is the easiest way to replace your Rogers, Bell, or Shaw cable subscription. Our Canadian
            support team is available 24/7 to get you set up within minutes. Start your free IPTV trial and
            experience the best IPTV Canada 2026 has to offer.
          </p>
        </div>
      </section>

      <CanadaHomePage />
    </>
  )
}
