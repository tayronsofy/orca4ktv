import type { Metadata } from 'next'
import NetherlandsHero from '@/components/netherlands/NetherlandsHero'
import NetherlandsHomePage from '@/page-components/netherlands/NetherlandsHomePage'

export const metadata: Metadata = {
  title: 'IPTV Nederland 2026 – Eredivisie & Kabel TV Alternatief',
  description: 'Beste IPTV Nederland 2026. Ziggo & KPN alternatief met Eredivisie, NPO, RTL, Formule 1 & meer. Buffervrij in 4K op Firestick, Android & Apple TV.',
  keywords: 'beste iptv nederland 2026, eredivisie iptv, ziggo alternatief iptv, kpn alternatief iptv, npo rtl iptv nederland, iptv aanbieder nederland, iptv nederlands 4k',
  alternates: {
    canonical: 'https://smart4k.io/iptv-netherlands',
    languages: {
      'nl-NL': 'https://smart4k.io/iptv-netherlands',
      'de-DE': 'https://smart4k.io/iptv-germany',
      'en-US': 'https://smart4k.io/iptv-usa',
      'en-GB': 'https://smart4k.io/iptv-uk',
      'en-CA': 'https://smart4k.io/iptv-canada',
      'x-default': 'https://smart4k.io/',
    },
  },
  openGraph: {
    title: 'IPTV Nederland 2026 – Eredivisie & Kabel TV Alternatief',
    description: 'Bekijk 22.000+ live zenders, Eredivisie, NPO, RTL en meer. Buffervrij 4K streamen.',
    type: 'website',
    url: 'https://smart4k.io/iptv-netherlands',
    images: [{ url: 'https://smart4k.io/og-image.jpg', width: 1200, height: 630 }],
    locale: 'nl_NL',
  },
}

export default function NetherlandsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": "Beste IPTV Nederland 2026",
            "description": "De beste IPTV Nederland 2026. Ziggo & KPN alternatief met Eredivisie, NPO, RTL en Formule 1 in 4K.",
            "image": "https://smart4k.io/og-image.jpg",
            "brand": { "@type": "Brand", "name": "SMART 4K" },
            "offers": {
              "@type": "Offer",
              "url": "https://smart4k.io/iptv-netherlands",
              "priceCurrency": "EUR",
              "price": "14.99",
              "availability": "https://schema.org/InStock"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "547",
              "bestRating": "5"
            }
          })
        }}
      />
      <NetherlandsHero />

      {/* SEO Content Block - server rendered for crawlers */}
      <section className="bg-[#1f2326] py-16 px-4" lang="nl">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-white">
            Beste IPTV Nederland 2026 — Eredivisie, NPO, RTL &amp; meer
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            SMART 4K is de beste IPTV-aanbieder voor Nederland in 2026. Krijg direct toegang tot meer dan 22.000 Nederlandse TV-zenders –
            waaronder alle publieke omroepen zoals NPO 1, NPO 2, NPO 3 en de populairste commerciële zenders RTL 4, RTL 5, SBS6, Veronica
            en Ziggo Sport. Als het ultieme alternatief voor Ziggo en KPN leveren we alle Eredivisie-wedstrijden, KNVB-beker, Champions League,
            Formule 1 met Max Verstappen en meer – buffervrij in HD en 4K, direct op jouw apparaat.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Op zoek naar een betaalbaar Eredivisie IPTV-abonnement zonder duur Ziggo-pakket? SMART 4K zendt elke Eredivisie-wedstrijd,
            elke speelronde, in HD en 4K-kwaliteit. Onze dienst werkt naadloos op Amazon Firestick, Apple TV, Android TV-boxen, Smart TV's
            en alle mobiele apparaten – geen satellietschotel, geen kabelaansluiting vereist.
          </p>
          <h3 className="text-2xl font-black text-white pt-4">
            Nederlandse Zenders, Sport &amp; On-Demand — alles in één abonnement
          </h3>
          <p className="text-gray-400 text-lg leading-relaxed">
            Elk SMART 4K-abonnement bevat toegang tot Nederlandse lokale zenders in HD, Ziggo Sport-alternatieven, ESPN NL-kanalen
            en honderden regionale zenders. Kijk live nieuws op NPO 1, RTL Nieuws en AT5. Geniet van duizenden on-demand films
            en series. Onze Eredivisie IPTV-pakketten starten vanaf slechts $21/maand –
            geen contracten, geen verplichtingen, altijd opzegbaar.
          </p>
          <p className="text-gray-400 text-lg leading-relaxed">
            Duizenden Nederlandse abonnees hebben hun Ziggo- of KPN-abonnement al ingeruild voor SMART 4K. Ons supportteam staat
            24/7 voor je klaar en zorgt ervoor dat je binnen enkele minuten na aanmelding kunt streamen. Start vandaag nog je
            gratis IPTV-proefperiode en ontdek wat het beste IPTV Nederland 2026 te bieden heeft.
          </p>
        </div>
      </section>

      <NetherlandsHomePage />
    </>
  )
}
