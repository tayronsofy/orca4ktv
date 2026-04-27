import type { Metadata } from 'next'
import NetherlandsHero from '@/components/netherlands/NetherlandsHero'
import NetherlandsHomePage from '@/page-components/netherlands/NetherlandsHomePage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Beste IPTV Nederland 2026 — Eredivisie 4K | ORCA 4K TV',
  description: 'Beste IPTV Nederland 2026: elke Eredivisie-aftrap, Champions League, F1 met Max Verstappen in 4K HDR. 22.000+ zenders, NPO, RTL, SBS6. Direct actief.',
  keywords: 'beste iptv nederland 2026, iptv nederland, eredivisie iptv, knvb beker iptv, champions league iptv nederland, formule 1 iptv 2026, max verstappen f1 2026, wk voetbal 2026 iptv, olympische spelen milaan cortina 2026, npo iptv, rtl iptv, sbs6 iptv, ziggo sport alternatief, espn nl alternatief, veronica iptv, iptv abonnement nederland, iptv aanbieder nederland, iptv streamingdienst, premium iptv zenders, 4K streamen, HDR streamen, buffervrij streamen, multi-device, veilig streamen, AES-256 versleuteling, 24/7 klantenservice, EPG gids, catch-up tv, snelle activatie, iptv met vpn, kabel tv alternatief, ziggo alternatief, kpn alternatief, sky netherlands alternatief, viaplay alternatief',
  alternates: {
    canonical: 'https://orca4ktv.com/iptv-netherlands',
    languages: {
      'nl-NL': 'https://orca4ktv.com/iptv-netherlands',
      'de-DE': 'https://orca4ktv.com/iptv-germany',
      'en-US': 'https://orca4ktv.com/iptv-usa',
      'en-GB': 'https://orca4ktv.com/iptv-uk',
      'en-CA': 'https://orca4ktv.com/iptv-canada',
      'x-default': 'https://orca4ktv.com/',
    },
  },
  openGraph: {
    title: 'Beste IPTV Nederland 2026 — Eredivisie 4K | ORCA 4K TV',
    description: 'Eredivisie, Champions League, F1 met Verstappen, WK 2026 in 4K HDR. NPO, RTL, SBS6. 22.000+ zenders. Direct actief.',
    type: 'website',
    url: 'https://orca4ktv.com/iptv-netherlands',
    images: [{ url: 'https://orca4ktv.com/images/netherlands-coverage.jpg', width: 1200, height: 630 }],
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beste IPTV Nederland 2026 — Eredivisie 4K | ORCA 4K TV',
    description: 'Elke Eredivisie-aftrap, KNVB-beker-finale, F1 met Verstappen in 4K HDR. Anti Freeze CDN. Vanaf €/maand.',
  },
}

export default function NetherlandsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/' },
          { name: 'IPTV Nederland', url: 'https://orca4ktv.com/iptv-netherlands' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                "@id": "https://orca4ktv.com/iptv-netherlands#product",
                "name": "Beste IPTV Nederland 2026 — ORCA 4K TV",
                "description": "Premium IPTV-abonnement voor Nederland — 22.000+ live zenders inclusief Eredivisie, KNVB-beker, Champions League, Formule 1 met Max Verstappen, WK voetbal 2026, Olympische Spelen Milaan-Cortina, plus NPO 1, NPO 2, RTL 4, SBS6, Veronica en Ziggo Sport in 4K HDR met HDR10+ en Dolby Vision.",
                "image": "https://orca4ktv.com/images/netherlands-coverage.jpg",
                "brand": { "@type": "Brand", "name": "ORCA 4K TV" },
                "category": "IPTV Streamingdienst",
                "offers": {
                  "@type": "Offer",
                  "url": "https://orca4ktv.com/iptv-shop",
                  "priceCurrency": "EUR",
                  "price": "7.49",
                  "priceValidUntil": "2026-12-31",
                  "availability": "https://schema.org/InStock",
                  "areaServed": { "@type": "Country", "name": "Netherlands" }
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "547",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              },
              {
                "@type": "Service",
                "@id": "https://orca4ktv.com/iptv-netherlands#service",
                "name": "ORCA 4K TV Nederland IPTV-abonnement",
                "serviceType": "IPTV Streaming Service",
                "provider": { "@id": "https://orca4ktv.com/#organization" },
                "areaServed": { "@type": "Country", "name": "Netherlands" },
                "audience": {
                  "@type": "Audience",
                  "audienceType": "Nederlandse cord-cutters, Eredivisie-fans, premium streaming-huishoudens"
                },
                "availableLanguage": ["Dutch", "English"],
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                },
                "description": "Premium IPTV-streamingdienst voor Nederlandse cord-cutters: 22.000+ live zenders, Eredivisie, KNVB-beker, Champions League, Formule 1 met Max Verstappen 2026, WK 2026, Olympische Spelen Milaan-Cortina, plus NPO, RTL, SBS6, Veronica, Ziggo Sport — 4K HDR, AES-256 versleuteld, Anti Freeze CDN met Amsterdam-edge server, multi-device-compatibiliteit (Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, iOS en Android), 24/7 Nederlandstalige klantenservice."
              }
            ]
          })
        }}
      />
      <NetherlandsHero />

      <NetherlandsHomePage seoContent={
      /* SEO Content Block - rendered after the "Available on your favorite devices" section */
      <section className="bg-[#001f3f] py-20 px-4" lang="nl">
        <div className="max-w-4xl mx-auto space-y-7">
          <p className="text-center text-[#21468B] text-xs font-black uppercase tracking-[0.3em]" style={{ color: '#FF8C00' }}>
            Beste IPTV Nederland 2026 · De keuze van cord-cutters
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
            Beste IPTV Nederland 2026 — Eredivisie, Champions League &amp; elke F1-race in 4K HDR
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">ORCA 4K TV</strong> is het beste IPTV Nederland 2026 voor cord-cutters die élke wedstrijd, élke zender en élk scherm willen — zonder een Ziggo- of KPN-pakket van €60+/maand. Bekijk elke <strong className="text-white">Eredivisie-aftrap</strong> live in 4K HDR, elke <strong className="text-white">Champions League-knockout</strong>, de <strong className="text-white">KNVB-beker-finale</strong> in De Kuip, elke <strong className="text-white">Formule 1-race</strong> van het volledig nieuwe 2026-reglement met Max Verstappen, het <strong className="text-white">WK voetbal 2026</strong> in de VS / Canada / Mexico met Oranje, en de <strong className="text-white">Olympische Winterspelen Milaan-Cortina</strong> in februari — 22.000+ live zenders in <strong className="text-white">4K Ultra-HD met HDR10+ en Dolby Vision</strong>. Buffervrij streamen dankzij Anti Freeze CDN met een dedicated Amsterdam-edge server.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            Nederlandse kabel- en sateliet-tv kostte in 2025 gemiddeld <strong className="text-white">meer dan €60 per maand</strong> — nog vóór elke premium sport add-on. ORCA 4K TV levert meer zenders, meer sport en meer on-demand inhoud vanaf{' '}
            <strong className="text-white">€7,49/maand</strong> in het{' '}
            <a href="/iptv-shop/12-months" className="text-orange-400 hover:underline">12-maanden-abonnement</a>. Vervang Ziggo TV, KPN Interactieve TV, T-Mobile Thuis, Canal Digitaal, Viaplay, ESPN, Videoland en NLZIET in één enkel abonnement. Geen monteur, geen schotel, geen contract, geen verborgen kosten.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-orange-500/15">
            Alle Nederlandse zenders, alle grote competities
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Premium-zenders in het ORCA 4K TV Nederland-abonnement:
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Publieke omroep:</strong> NPO 1, NPO 2, NPO 3, NPO Politiek, NPO Nieuws, NPO Zapp, NPO Cultura, NPO Best, regionale omroepen (AT5, RTV Noord-Holland, Omroep Brabant, RTV Utrecht)</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Commercieel:</strong> RTL 4, RTL 5, RTL 7, RTL 8, RTL Z, RTL Crime, SBS6, SBS9, Net5, Veronica, Comedy Central, MTV, TLC, Discovery</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Eredivisie &amp; voetbal:</strong> elke Eredivisie-wedstrijd, Keuken Kampioen Divisie, KNVB-beker, UEFA Champions League, Europa League, Conference League, internationaal voetbal</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Sport:</strong> Ziggo Sport-alternatieven, ESPN NL-kanalen, Eurosport 1 &amp; 2, Sport1, NHL Network, Tennis Channel, NOS Sport, Studio Sport</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Formule 1 &amp; motorsport:</strong> elke F1-Grand Prix van het 2026-tijdperk met Max Verstappen, Formule 2, Formule 3, MotoGP, DTM, Le Mans, WK Rally</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Nieuws &amp; documentaire:</strong> NOS Journaal, RTL Nieuws, AT5, BNR, Discovery, History, National Geographic, Animal Planet, NPO Doc</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Kinderen &amp; familie:</strong> NPO Zapp, Nickelodeon, Disney Channel, Cartoon Network, Boomerang, Kindernet, RTL Telekids</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">100.000+ films &amp; series on-demand</strong> met de nieuwste Hollywood-releases — Marvel, Pixar, Apple TV+, Prime Video en premium-series</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-orange-500/15">
            Anti Freeze CDN — Gebouwd voor de Nederlandse sportkalender
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            De Nederlandse sportkalender van 2026 is de drukste ooit. De <strong className="text-white">Eredivisie 2025–26</strong> wordt in mei beslist. De <strong className="text-white">Olympische Winterspelen Milaan-Cortina</strong> openen op vrijdag 6 februari — schaatsen, snowboard, ijshockey, curling met TeamNL live in 4K HDR. De <strong className="text-white">KNVB-beker-finale</strong> eind april in De Kuip. In juni en juli volgt het <strong className="text-white">FIFA WK voetbal 2026</strong> in de VS, Canada en Mexico met het Nederlands elftal. In maart start het <strong className="text-white">Formule 1-seizoen 2026</strong> met geheel nieuwe reglementen en Max Verstappen die zijn vijfde wereldtitel najaagt. Onze Amsterdam-edge server stuurt elke verbinding in real-time langs spitsuren — Amsterdam, Rotterdam, Den Haag, Utrecht, Eindhoven, Groningen — en levert buffervrije 4K HDR. AES-256 versleuteld (
            <a href="/security" className="text-orange-400 hover:underline">NIST FIPS 197</a>), VPN-vriendelijk, 24/7 Nederlandstalige en Engelstalige klantenservice.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-orange-500/15">
            Op elk streaming-apparaat
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Multi-device-compatibiliteit in elk abonnement: <strong className="text-white">Firestick 4K Max</strong>, <strong className="text-white">Apple TV 4K (3e generatie)</strong>, <strong className="text-white">Android TV 14</strong>, Chromecast met Google TV, Samsung Tizen, LG webOS, MAG-box, iOS, Android, Windows, macOS en elke moderne webbrowser. Tot vier gelijktijdige streams per account. De installatie is snel — de meeste Nederlandse huishoudens kijken binnen vijf minuten na het afrekenen live. Bekijk de <a href="/setup-guide" className="text-orange-400 hover:underline">stap-voor-stap installatiegids</a> voor je apparaat of de <a href="/glossary" className="text-orange-400 hover:underline">IPTV-woordenlijst</a> als termen je nieuw zijn.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-orange-500/15">
            Geen schotel. Geen decoder. Geen contract.
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Geen monteursafspraak, geen satellietschotel, geen decoder-huur, geen minimale looptijd, geen automatische verlenging. Betaal per maand of bespaar tot 62% in het 12-maanden-<a href="/iptv-shop" className="text-orange-400 hover:underline">IPTV-abonnement</a>. Altijd opzegbaar. Probeer eerst gratis — onze{' '}
            <a href="/trial" className="text-orange-400 hover:underline font-bold">gratis IPTV-proefperiode</a> vereist geen creditcard en ontgrendelt direct de volledige bibliotheek van 22.000 zenders met 4K HDR-streaming.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed text-center pt-6">
            Sluit je aan bij meer dan 540 geverifieerde Nederlandse abonnees van Amsterdam tot Eindhoven die al zijn overgestapt naar het beste IPTV Nederland 2026.{' '}
            <a href="/trial" className="text-orange-400 hover:underline font-bold">Gratis testen</a>
            {' · '}
            <a href="/iptv-shop" className="text-orange-400 hover:underline font-bold">Abonnementen bekijken</a>
          </p>
        </div>
      </section>
      } />
    </>
  )
}
