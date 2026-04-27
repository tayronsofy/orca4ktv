import type { Metadata } from 'next'
import GermanyHero from '@/components/germany/GermanyHero'
import GermanyHomePage from '@/page-components/germany/GermanyHomePage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Bestes IPTV Deutschland 2026 — Bundesliga 4K | ORCA 4K TV',
  description: 'Bestes IPTV Deutschland 2026: jedes Bundesliga-Spiel, DFB-Pokal, Champions League, Formel 1 in 4K HDR. 22.000+ Sender, ARD, ZDF, RTL. Sofort aktiviert.',
  keywords: 'bestes iptv deutschland 2026, iptv deutschland, bundesliga iptv, dfb-pokal iptv, champions league iptv deutschland, formel 1 iptv 2026, audi f1 deutschland, fußball wm 2026 iptv, olympia mailand cortina 2026, ard iptv, zdf iptv, rtl iptv, prosieben iptv, sat 1 iptv, vox iptv, kabel eins iptv, iptv abonnement, iptv anbieter deutschland, iptv streamingdienst, premium iptv sender, 4K Streaming, HDR Streaming, pufferungsfreies Streaming, multi-device, sicheres Streaming, AES-256 Verschlüsselung, 24/7 Kundenservice, EPG Programm, Catch-Up Funktion, sofortige Aktivierung, iptv mit vpn, kabelfernsehen alternative, sky alternative deutschland, dazn alternative bundesliga',
  alternates: {
    canonical: 'https://orca4ktv.com/iptv-germany',
    languages: {
      'de-DE': 'https://orca4ktv.com/iptv-germany',
      'en-US': 'https://orca4ktv.com/iptv-usa',
      'en-GB': 'https://orca4ktv.com/iptv-uk',
      'en-CA': 'https://orca4ktv.com/iptv-canada',
      'x-default': 'https://orca4ktv.com/',
    },
  },
  openGraph: {
    title: 'Bestes IPTV Deutschland 2026 — Bundesliga 4K | ORCA 4K TV',
    description: 'Bundesliga, Champions League, Formel 1, WM 2026, Olympia in 4K HDR. ARD, ZDF, RTL und mehr. 22.000+ Sender. Sofort aktiviert.',
    type: 'website',
    url: 'https://orca4ktv.com/iptv-germany',
    images: [{ url: 'https://orca4ktv.com/images/germany-coverage.jpg', width: 1200, height: 630 }],
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bestes IPTV Deutschland 2026 — Bundesliga 4K | ORCA 4K TV',
    description: 'Jeder Bundesliga-Anstoß, DFB-Pokal-Finale, F1-Runde 2026 in 4K HDR. Anti Freeze CDN. Ab €/Monat.',
  },
}

export default function GermanyPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Startseite', url: 'https://orca4ktv.com/' },
          { name: 'IPTV Deutschland', url: 'https://orca4ktv.com/iptv-germany' },
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
                "@id": "https://orca4ktv.com/iptv-germany#product",
                "name": "Bestes IPTV Deutschland 2026 — ORCA 4K TV",
                "description": "Premium IPTV-Abonnement für Deutschland — 22.000+ Live-Sender inklusive Bundesliga, DFB-Pokal, Champions League, Formel 1, Fußball-WM 2026, Olympia Mailand-Cortina sowie ARD, ZDF, RTL, ProSieben, Sat.1, Vox – in 4K HDR mit HDR10+ und Dolby Vision.",
                "image": "https://orca4ktv.com/images/germany-coverage.jpg",
                "brand": { "@type": "Brand", "name": "ORCA 4K TV" },
                "category": "IPTV Streamingdienst",
                "offers": {
                  "@type": "Offer",
                  "url": "https://orca4ktv.com/iptv-shop",
                  "priceCurrency": "EUR",
                  "price": "7.49",
                  "priceValidUntil": "2026-12-31",
                  "availability": "https://schema.org/InStock",
                  "areaServed": { "@type": "Country", "name": "Germany" }
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "612",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              },
              {
                "@type": "Service",
                "@id": "https://orca4ktv.com/iptv-germany#service",
                "name": "ORCA 4K TV Deutschland IPTV-Abonnement",
                "serviceType": "IPTV Streaming Service",
                "provider": { "@id": "https://orca4ktv.com/#organization" },
                "areaServed": { "@type": "Country", "name": "Germany" },
                "audience": {
                  "@type": "Audience",
                  "audienceType": "Deutsche Cord-Cutter, Bundesliga-Fans, Premium-Streaming-Haushalte"
                },
                "availableLanguage": ["German", "English"],
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                },
                "description": "Premium IPTV-Streamingdienst für deutsche Cord-Cutter: 22.000+ Live-Sender, Bundesliga, DFB-Pokal, Champions League, Formel 1 mit Audi-Einstieg 2026, WM 2026, Olympia, sowie ARD, ZDF, RTL, ProSieben, Sat.1, Vox – 4K HDR, AES-256-verschlüsselt, Anti Freeze CDN mit Frankfurt-Edge-Server, Multi-Device-Kompatibilität (Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, iOS und Android), 24/7 Kundenservice auf Deutsch."
              }
            ]
          })
        }}
      />
      <GermanyHero />

      <GermanyHomePage seoContent={
      /* SEO Content Block - rendered after the "Available on your favorite devices" section */
      <section className="bg-[#001f3f] py-20 px-4" lang="de">
        <div className="max-w-4xl mx-auto space-y-7">
          <p className="text-center text-yellow-400 text-xs font-black uppercase tracking-[0.3em]">
            Bestes IPTV Deutschland 2026 · Die Wahl der Cord-Cutter
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
            Bestes IPTV Deutschland 2026 — Bundesliga, Champions League &amp; jeder F1-Grand-Prix in 4K HDR
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">ORCA 4K TV</strong> ist das beste IPTV Deutschland 2026 für Cord-Cutter, die jedes Spiel, jeden Sender und jeden Bildschirm wollen – ohne den 60+ €/Monat-Vertrag bei Vodafone, Telekom oder PYUR. Schau jeden <strong className="text-white">Bundesliga-Anstoß</strong> live in 4K HDR, jedes <strong className="text-white">Champions-League-K.o.-Spiel</strong>, das <strong className="text-white">DFB-Pokal-Finale</strong> im Mai 2026 in Berlin, jeden <strong className="text-white">Formel-1-Grand-Prix</strong> der neuen 2026-Reglements-Ära mit Audi-Einstieg, die <strong className="text-white">Fußball-WM 2026</strong> in den USA / Kanada / Mexiko mit der DFB-Elf, die <strong className="text-white">Olympischen Winterspiele Mailand-Cortina</strong> im Februar – 22.000+ Live-Sender in <strong className="text-white">4K Ultra-HD mit HDR10+ und Dolby Vision</strong>. Pufferungsfreies Streaming dank Anti Freeze CDN mit dediziertem Frankfurt-Edge-Server.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            Deutsches Kabel- und Satellitenfernsehen kostete 2025 durchschnittlich <strong className="text-white">über 60 € pro Monat</strong> – und das vor jedem Premium-Sport-Add-On. ORCA 4K TV liefert mehr Sender, mehr Sport und mehr On-Demand-Inhalte ab{' '}
            <strong className="text-white">7,49 €/Monat</strong> im{' '}
            <a href="/iptv-shop/12-months" className="text-yellow-400 hover:underline">12-Monats-Tarif</a>. Ersetze Sky, Vodafone Kabel, Telekom MagentaTV, PYUR, Waipu.tv, Zattoo und DAZN in einem einzigen Abonnement. Kein Techniker, keine Schüssel, kein Vertrag, keine versteckten Gebühren.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-yellow-500/15">
            Alle deutschen Sender, alle wichtigen Wettbewerbe
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Premium-Sender im ORCA 4K TV Deutschland-Abonnement enthalten:
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">Öffentlich-rechtlich:</strong> Das Erste, ZDF, ARD-Regionalsender (BR, NDR, WDR, MDR, SWR, HR, RBB, SR), Arte, 3sat, Phoenix, KiKa, ZDFneo, ZDFinfo, One, tagesschau24</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">Privat:</strong> RTL, RTL2, RTL Zwei, RTL Plus, RTL Nitro, Vox, Vox Up, ProSieben, ProSieben Maxx, Sat.1, Sat.1 Gold, Kabel Eins, Kabel Eins Doku, Sixx, Comedy Central, MTV</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">Bundesliga &amp; Fußball:</strong> jedes Bundesliga-Spiel, 2. Bundesliga, DFB-Pokal, UEFA Champions League, Europa League, Conference League, internationaler Fußball</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">Sport:</strong> Sport1, Sport im Ersten, ARD Sportschau, ZDF SPORTextra, Eurosport 1 &amp; 2, DAZN-Inhalte, Spox, NHL Network, Tennis Channel</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">Formel 1 &amp; Motorsport:</strong> jeder F1-Grand-Prix der 2026-Ära mit Audi-Einstieg, Formel 2, Formel 3, MotoGP, DTM, Le Mans, Rallye-WM</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">News &amp; Dokumentation:</strong> n-tv, Welt, Phoenix, Tagesschau, ZDFheute, Discovery Deutschland, History, National Geographic, DMAX, ServusTV, Geo Television</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">Kinder &amp; Familie:</strong> KiKa, Super RTL, Disney Channel, Nickelodeon, Cartoon Network, Toggo Plus, Boomerang, Junior</span></li>
            <li className="flex gap-3"><span className="text-yellow-400 font-black mt-0.5">▸</span><span><strong className="text-white">100.000+ Filme &amp; Serien on-demand</strong> mit aktuellen Hollywood-Releases – Marvel, Pixar, Apple TV+, Prime Video und Premium-Serien</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-yellow-500/15">
            Anti Freeze CDN — Gebaut für den deutschen Sportkalender
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Der deutsche Sportkalender 2026 ist der dichteste in der Geschichte. Die <strong className="text-white">Bundesliga 2025–26</strong> entscheidet sich im Mai. Die <strong className="text-white">Olympischen Winterspiele Mailand-Cortina</strong> öffnen am Freitag, 6. Februar – Biathlon, Skispringen, Eishockey, Curling, Snowboard mit deutschen Top-Athleten live in 4K HDR. Das <strong className="text-white">DFB-Pokal-Finale</strong> Ende Mai im Olympiastadion Berlin. Im Juni und Juli folgt die <strong className="text-white">FIFA-Fußball-WM 2026</strong> in den USA, Kanada und Mexiko mit der deutschen Nationalmannschaft. Im März startet die <strong className="text-white">Formel-1-Saison 2026</strong> mit komplett neuen Reglements und Audi als deutschem Werksteam. Unser Frankfurt-Edge-Server lenkt jede Verbindung in Echtzeit um Stoßzeiten herum – Berlin bis München, Köln bis Hamburg – und liefert pufferungsfreies 4K HDR. AES-256-verschlüsselt (
            <a href="/security" className="text-yellow-400 hover:underline">NIST FIPS 197</a>), VPN-freundlich, 24/7 Kundenservice auf Deutsch und Englisch.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-yellow-500/15">
            Auf jedem Streaming-Gerät
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Multi-Device-Kompatibilität in jedem Tarif: <strong className="text-white">Firestick 4K Max</strong>, <strong className="text-white">Apple TV 4K (3. Generation)</strong>, <strong className="text-white">Android TV 14</strong>, Chromecast mit Google TV, Samsung Tizen, LG webOS, MAG-Box, iOS, Android, Windows, macOS und jeder moderne Webbrowser. Bis zu vier gleichzeitige Streams pro Konto. Die Einrichtung ist schnell – die meisten deutschen Haushalte schauen innerhalb von fünf Minuten nach dem Checkout live. Siehe die <a href="/setup-guide" className="text-yellow-400 hover:underline">Schritt-für-Schritt-Einrichtungsanleitung</a> für dein Gerät oder das <a href="/glossary" className="text-yellow-400 hover:underline">IPTV-Glossar</a>, falls dir Begriffe neu sind.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-yellow-500/15">
            Keine Schüssel. Kein Receiver. Kein Vertrag.
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Kein Techniker-Termin, keine Satellitenschüssel, keine Receiver-Miete, keine Mindestlaufzeit, keine automatische Vertragsverlängerung. Zahle monatlich oder spare bis zu 62 % im 12-Monats-<a href="/iptv-shop" className="text-yellow-400 hover:underline">IPTV-Tarif</a>. Jederzeit kündbar. Erst kostenlos testen – unser{' '}
            <a href="/trial" className="text-yellow-400 hover:underline font-bold">kostenloser IPTV-Test</a> erfordert keine Kreditkarte und schaltet sofort die volle 22.000-Sender-Bibliothek mit 4K-HDR-Streaming frei.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed text-center pt-6">
            Schließ dich über 600 verifizierten deutschen Abonnenten von Berlin bis München an, die bereits zum besten IPTV Deutschland 2026 gewechselt sind.{' '}
            <a href="/trial" className="text-yellow-400 hover:underline font-bold">Kostenlos testen</a>
            {' · '}
            <a href="/iptv-shop" className="text-yellow-400 hover:underline font-bold">Tarife ansehen</a>
          </p>
        </div>
      </section>
      } />
    </>
  )
}
