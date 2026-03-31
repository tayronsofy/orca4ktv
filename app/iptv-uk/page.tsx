import type { Metadata } from 'next'
import UKHero from '@/components/uk/UKHero'
import UKHomePage from '@/page-components/uk/UKHomePage'

export const metadata: Metadata = {
  title: 'Best IPTV UK 2026 - Premier League, Sky Sports Alternative',
  description: 'Best IPTV UK 2026. Sky Sports alternative with Premier League, BBC, ITV & Channel 4. Zero buffering in 4K on Firestick, Android & Apple TV.',
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
    type: 'website',
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
      <UKHero />

      {/* SEO Content Block - server rendered for crawlers */}
      <section className="bg-[#1f2326] py-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Best IPTV UK 2026 — Premier League, Sky Sports Alternative &amp; UK TV
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            SMART 4K is the best IPTV UK 2026 provider for British viewers who want more for less. Watch all your
            favourite UK TV channels including BBC One, BBC Two, ITV, Channel 4, Channel 5, and Sky One — all in
            stunning HD and 4K quality. As the ultimate Sky Sports IPTV alternative, we deliver every Premier League
            match, Champions League game, and major sporting event without the expensive Sky subscription.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Never miss a Premier League IPTV no buffering experience again. Our UK-based delivery network ensures
            your streams are fast, stable, and crystal clear throughout the entire 90 minutes. Whether you support
            Manchester United, Arsenal, Liverpool, or Chelsea — every match is available live in HD. We also carry
            TNT Sports IPTV UK for Champions League, Europa League, and domestic cup coverage.
          </p>
          <h3 className="text-2xl font-black text-white pt-4">
            UK TV Channels IPTV HD — Sport, Entertainment &amp; News
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Beyond football, SMART 4K covers Formula 1, cricket, rugby union, boxing, and golf. Enjoy BBC iPlayer-style
            on-demand content, Sky documentaries, and the latest Hollywood releases. Our UK TV channels IPTV HD
            library includes over 22,000 live channels and a massive VOD catalogue — all compatible with your
            Firestick, Android box, Apple TV, Smart TV, or smartphone. Plans start from just £12/month.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Thousands of UK subscribers have already made the switch from Sky, BT Sport, and Virgin Media to SMART 4K.
            Our dedicated support team is available around the clock to get you set up instantly. Start your free
            IPTV trial today and discover why SMART 4K is the number one Sky Sports IPTV alternative in the UK.
          </p>
        </div>
      </section>

      <UKHomePage />
    </>
  )
}
