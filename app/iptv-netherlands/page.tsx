import type { Metadata } from 'next'
import { buildPageMetadata } from '@/lib/seo/metadata'
import NetherlandsHero from '@/components/netherlands/NetherlandsHero'
import NetherlandsHomePage from '@/page-components/netherlands/NetherlandsHomePage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

const codeMetadata: Metadata = {
  title: 'Beste IPTV Nederland 2026 - Live-Sport & NL-Zenders | ORCA 4K TV',
  description: 'Beste IPTV Nederland 2026: Nederlands topvoetbal, top Europees clubvoetbal, motorsport, Olympische Spelen 2026 in 4K HDR. 22.000+ zenders, alle belangrijke Nederlandse free-to-air zenders. Direct actief.',
  keywords: 'beste iptv nederland 2026, iptv nederland, iptv abonnement nederland, iptv aanbieder nederland, iptv streamingdienst, premium iptv zenders, 4K streamen, HDR streamen, buffervrij streamen, multi-device, veilig streamen, AES-256 versleuteling, 24/7 klantenservice, EPG gids, catch-up tv, snelle activatie, iptv met vpn, kabel tv alternatief, sport iptv nederland, voetbal iptv nederland',
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
    title: 'Beste IPTV Nederland 2026 - Live-Sport & NL-Zenders | ORCA 4K TV',
    description: 'Nederlands topvoetbal, top Europees clubvoetbal, motorsport, Olympische Spelen 2026 in 4K HDR. Alle belangrijke Nederlandse free-to-air zenders. 22.000+ zenders. Direct actief.',
    type: 'website',
    url: 'https://orca4ktv.com/iptv-netherlands',
    images: [{ url: 'https://orca4ktv.com/images/netherlands-coverage.jpg', width: 1200, height: 630 }],
    locale: 'nl_NL',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Beste IPTV Nederland 2026 - Live-Sport & NL-Zenders | ORCA 4K TV',
    description: 'Elke topvoetbal-aftrap, bekerfinale, motorsport-race in 4K HDR. Anti Freeze CDN. Vanaf €/maand.',
  },
}

// SEO overrides from /admin/seo — null DB fields fall back to codeMetadata
export async function generateMetadata(): Promise<Metadata> {
  const base = await buildPageMetadata('iptv-netherlands', {
    title: codeMetadata.title as string,
    description: codeMetadata.description as string,
    keywords: codeMetadata.keywords as string | undefined,
    canonical: (codeMetadata.alternates as { canonical?: string } | undefined)?.canonical,
  })
  return { ...codeMetadata, ...base }
}

export default function NetherlandsPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/iptv' },
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
                "mainEntityOfPage": { "@type": "WebPage", "@id": "https://orca4ktv.com/iptv-netherlands" },
                "name": "Beste IPTV Nederland 2026 - ORCA 4K TV",
                "description": "Premium IPTV-abonnement voor Nederland - 22.000+ live zenders met Nederlands topvoetbal, top Europees clubvoetbal, motorsport, het zomerse internationale voetbaltoernooi 2026, de Olympische Winterspelen 2026, plus alle belangrijke Nederlandse publieke en commerciële free-to-air zenders en de premium sportlaag - in 4K HDR met HDR10+ en Dolby Vision.",
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
                  "audienceType": "Nederlandse cord-cutters, live-sport-huishoudens, premium streaming-huishoudens"
                },
                "availableLanguage": ["Dutch", "English"],
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                },
                "description": "Premium IPTV-streamingdienst voor Nederlandse cord-cutters: 22.000+ live zenders, Nederlands topvoetbal, top Europees clubvoetbal, motorsport, zomers internationaal voetbaltoernooi 2026, Olympische Winterspelen 2026, alle belangrijke Nederlandse publieke en commerciële free-to-air zenders en premium sportlaag - 4K HDR, AES-256 versleuteld, Anti Freeze CDN met Amsterdam-edge server, multi-device-compatibiliteit (Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, iOS en Android), 24/7 Nederlandstalige klantenservice."
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
            Beste IPTV Nederland 2026 - Nederlands topvoetbal, live-sport &amp; alle NL-zenders in 4K HDR
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">ORCA 4K TV</strong> is het beste IPTV Nederland 2026 voor cord-cutters die élke wedstrijd, élke zender en élk scherm willen - zonder een kabelpakket van €60+/maand. Bekijk elke <strong className="text-white">topvoetbal-aftrap</strong> live in 4K HDR, elke <strong className="text-white">top Europese clubvoetbal-knockout</strong>, de <strong className="text-white">nationale bekerfinale</strong> in De Kuip, elke <strong className="text-white">open-wheel motorsport-race</strong> van het volledig nieuwe 2026-reglement met de Nederlandse topcoureur, het <strong className="text-white">zomerse internationale voetbaltoernooi 2026</strong> in de VS / Canada / Mexico met Oranje, en de <strong className="text-white">Olympische Winterspelen 2026</strong> in februari - 22.000+ live zenders in <strong className="text-white">4K Ultra-HD met HDR10+ en Dolby Vision</strong>. Buffervrij streamen dankzij Anti Freeze CDN met een dedicated Amsterdam-edge server.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            Nederlandse kabel- en sateliet-tv kostte in 2025 gemiddeld <strong className="text-white">meer dan €60 per maand</strong> - nog vóór elke premium sport add-on. ORCA 4K TV levert meer zenders, meer sport en meer on-demand inhoud vanaf{' '}
            <strong className="text-white">€7,49/maand</strong> in het{' '}
            <a href="/iptv-shop/12-months" className="text-orange-400 hover:underline">12-maanden-abonnement</a>. Vervang je bestaande kabel-, IPTV-, satelliet- of streaming-bundel in één enkel abonnement. Geen monteur, geen schotel, geen contract, geen verborgen kosten.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-orange-500/15">
            Alle Nederlandse zenders, alle grote competities
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Premium-zenders in het ORCA 4K TV Nederland-abonnement:
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Publieke omroep:</strong> alle belangrijke Nederlandse publieke free-to-air zenders en hun nieuws-, cultuur-, jeugd- en thematische zusterkanalen, plus regionale omroepen</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Commercieel:</strong> alle belangrijke Nederlandse commerciële free-to-air zenders en hun thematische zusterkanalen</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Voetbal:</strong> elke topvoetbal-wedstrijd, de tweede divisie, de nationale bekerfinale, top Europese clubcompetities en internationaal clubvoetbal</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Sport:</strong> alle belangrijke Nederlandse sportkanalen en de premium sportlaag</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Motorsport:</strong> elke open-wheel race van het 2026-tijdperk met de Nederlandse topcoureur, de juniorcategorieën, motorraces, langeafstandsraces, het rallykampioenschap</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Nieuws &amp; documentaire:</strong> alle belangrijke Nederlandse nieuwszenders, financiële en internationale nieuwskanalen, documentaire- en wetenschapszenders</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">Kinderen &amp; familie:</strong> publieke en commerciële kinder-free-to-air zenders en familie-thematische kanalen</span></li>
            <li className="flex gap-3"><span className="text-orange-400 font-black mt-0.5">▸</span><span><strong className="text-white">100.000+ films &amp; series on-demand</strong> met de nieuwste Hollywood-releases - grote studio-blockbusters en premium streaming-platform-originelen</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-orange-500/15">
            Anti Freeze CDN - Gebouwd voor de Nederlandse sportkalender
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            De Nederlandse sportkalender van 2026 is de drukste ooit. Het <strong className="text-white">Nederlandse topvoetbal 2025-26</strong> wordt in mei beslist. De <strong className="text-white">Olympische Winterspelen 2026</strong> openen op vrijdag 6 februari - schaatsen, snowboard, ijshockey, curling met TeamNL live in 4K HDR. De <strong className="text-white">nationale bekerfinale</strong> eind april in De Kuip. In juni en juli volgt het <strong className="text-white">zomerse internationale voetbaltoernooi 2026</strong> in de VS, Canada en Mexico met het Nederlands elftal. In maart start het <strong className="text-white">open-wheel motorsport-seizoen 2026</strong> met geheel nieuwe reglementen waarin de Nederlandse topcoureur zijn vijfde wereldtitel najaagt. Onze Amsterdam-edge server stuurt elke verbinding in real-time langs spitsuren - Amsterdam, Rotterdam, Den Haag, Utrecht, Eindhoven, Groningen - en levert buffervrije 4K HDR. AES-256 versleuteld (
            <a href="/security" className="text-orange-400 hover:underline">NIST FIPS 197</a>), VPN-vriendelijk, 24/7 Nederlandstalige en Engelstalige klantenservice.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-orange-500/15">
            Op elk streaming-apparaat
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Multi-device-compatibiliteit in elk abonnement: <strong className="text-white">Firestick 4K Max</strong>, <strong className="text-white">Apple TV 4K (3e generatie)</strong>, <strong className="text-white">Android TV 14</strong>, Chromecast met Google TV, Samsung Tizen, LG webOS, MAG-box, iOS, Android, Windows, macOS en elke moderne webbrowser. Tot vier gelijktijdige streams per account. De installatie is snel - de meeste Nederlandse huishoudens kijken binnen vijf minuten na het afrekenen live. Bekijk de <a href="/setup-guide" className="text-orange-400 hover:underline">stap-voor-stap installatiegids</a> voor je apparaat of de <a href="/glossary" className="text-orange-400 hover:underline">IPTV-woordenlijst</a> als termen je nieuw zijn.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-orange-500/15">
            Geen schotel. Geen decoder. Geen contract.
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Geen monteursafspraak, geen satellietschotel, geen decoder-huur, geen minimale looptijd, geen automatische verlenging. Betaal per maand of bespaar tot 62% in het 12-maanden-<a href="/iptv-shop" className="text-orange-400 hover:underline">IPTV-abonnement</a>. Altijd opzegbaar. Probeer eerst gratis - onze{' '}
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
