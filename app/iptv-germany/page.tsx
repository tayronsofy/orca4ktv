import type { Metadata } from 'next'
import GermanyHero from '@/components/germany/GermanyHero'
import GermanyHomePage from '@/page-components/germany/GermanyHomePage'

export const metadata: Metadata = {
  title: 'Bestes IPTV Deutschland 2026 – Bundesliga, ARD, ZDF & Sky Alternative',
  description: 'Bestes IPTV Deutschland 2026. Sky Sport Alternative mit Bundesliga, ARD, ZDF, RTL & Formel 1. Pufferungsfrei in 4K auf Firestick, Android & Apple TV.',
  keywords: 'bestes iptv deutschland 2026, bundesliga iptv, sky sport alternative deutschland, ard zdf iptv, iptv anbieter deutschland, iptv deutsch 4k',
  alternates: {
    canonical: 'https://smart4k.io/iptv-germany',
    languages: {
      'de-DE': 'https://smart4k.io/iptv-germany',
      'en-US': 'https://smart4k.io/iptv-usa',
      'en-GB': 'https://smart4k.io/iptv-uk',
      'en-CA': 'https://smart4k.io/iptv-canada',
      'x-default': 'https://smart4k.io/',
    },
  },
  openGraph: {
    title: 'Bestes IPTV Deutschland 2026 – Bundesliga & Sky Alternative',
    description: 'Schau über 22.000 Live-Sender, Bundesliga, ARD, ZDF und mehr. Pufferungsfreies 4K-Streaming.',
    type: 'website',
    url: 'https://smart4k.io/iptv-germany',
    images: [{ url: 'https://smart4k.io/og-image.jpg', width: 1200, height: 630 }],
    locale: 'de_DE',
  },
}

export default function GermanyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Bestes IPTV Deutschland 2026",
            "description": "Das beste IPTV Deutschland 2026. Sky Sport Alternative mit Bundesliga, ARD, ZDF und Formel 1 in 4K.",
            "image": "https://smart4k.io/og-image.jpg",
            "brand": { "@type": "Brand", "name": "SMART 4K" },
            "offers": {
              "@type": "Offer",
              "url": "https://smart4k.io/iptv-germany",
              "priceCurrency": "EUR",
              "price": "14.99",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "612",
              "bestRating": "5"
            }
          })
        }}
      />
      <GermanyHero />

      {/* SEO Content Block - server rendered for crawlers */}
      <section className="bg-[#1f2326] py-16 px-4" lang="de">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Bestes IPTV Deutschland 2026 — Bundesliga, ARD, ZDF &amp; mehr
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            SMART 4K ist der beste IPTV-Anbieter für Deutschland im Jahr 2026. Erhalte sofortigen Zugang zu über 22.000 deutschen TV-Sendern –
            darunter alle wichtigen öffentlich-rechtlichen Sender wie ARD, ZDF, Arte und 3sat sowie die meistgenutzten Privatsender RTL, ProSieben,
            Sat.1, VOX und kabel eins. Als ultimative Sky Sport Alternative liefern wir alle Bundesliga-Spiele, DFB-Pokal, Champions League,
            Formel 1, Tennis und mehr – pufferungsfrei in HD und 4K, direkt auf dein Gerät.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Suchst du eine günstige Bundesliga IPTV Lösung ohne teures Sky-Abo? SMART 4K überträgt jedes Bundesliga-Spiel, jeden Spieltag,
            in HD und 4K-Qualität. Unser Dienst funktioniert nahtlos auf Amazon Firestick, Apple TV, Android TV-Boxen, Smart TVs und
            allen Mobilgeräten – keine Satellitenschüssel, kein Kabelanschluss erforderlich.
          </p>
          <h3 className="text-2xl font-black text-white pt-4">
            Deutsche Sender, Sport &amp; On-Demand – alles in einem Plan
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Jedes SMART 4K-Abonnement enthält Zugang zu deutschen Lokalsendern in HD, Sport1, DAZN-Kanälen, Sky Sport-Alternativen
            sowie Hunderten regionaler Sender. Schaue live Nachrichten auf ARD, ZDF, n-tv und Welt. Genieße tausende On-Demand-Filme
            und Serien mit denselben Tagesneuerscheinungen. Unsere Bundesliga IPTV-Pakete starten ab nur 21 $/Monat –
            keine Verträge, keine Verpflichtungen, jederzeit kündbar.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Tausende deutsche Abonnenten haben ihr Kabel-Abo bereits durch SMART 4K ersetzt. Unser Support-Team steht rund um die Uhr
            zur Verfügung und stellt sicher, dass du innerhalb von Minuten nach der Anmeldung streamst. Starte noch heute deinen
            kostenlosen IPTV-Test und erlebe das beste IPTV Deutschland 2026 zu bieten hat.
          </p>
        </div>
      </section>

      <GermanyHomePage />
    </>
  )
}
