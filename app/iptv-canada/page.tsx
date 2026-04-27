import type { Metadata } from 'next'
import CanadaHero from '@/components/canada/CanadaHero'
import CanadaHomePage from '@/page-components/canada/CanadaHomePage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Best IPTV Canada 2026 — NHL, TSN, CBC | ORCA 4K TV',
  description: 'Best IPTV Canada 2026: every NHL Stanley Cup match, CFL, MLB, 2026 Olympics in 4K HDR. 22,000+ channels, CBC, CTV, TSN, Sportsnet. Bilingual EN/FR.',
  keywords: 'best iptv canada 2026, iptv canada, nhl iptv canada, stanley cup playoffs iptv, cfl iptv canada, tsn iptv canada, sportsnet iptv canada, cbc iptv, ctv iptv, global tv iptv canada, citytv iptv, french canadian iptv channels, rds iptv quebec, tva sports iptv, radio-canada iptv, milano cortina 2026 olympics canada, fifa world cup 2026 toronto vancouver, raptors iptv toronto, blue jays iptv, IPTV subscription, IPTV plans, IPTV streaming service, premium IPTV channels, live channels, on-demand movies, 4K streaming, HDR streaming, buffer-free streaming, multi-device compatibility, smart EPG guide, instant activation, secure streaming, AES-256 encryption, 24/7 customer support, IPTV with VPN, cord cutting canada 2026',
  alternates: {
    canonical: 'https://orca4ktv.com/iptv-canada',
    languages: {
      'en-US': 'https://orca4ktv.com/iptv-usa',
      'en-GB': 'https://orca4ktv.com/iptv-uk',
      'en-CA': 'https://orca4ktv.com/iptv-canada',
      'fr-CA': 'https://orca4ktv.com/iptv-canada',
      'x-default': 'https://orca4ktv.com/',
    },
  },
  openGraph: {
    title: 'Best IPTV Canada 2026 — NHL, TSN, CBC | ORCA 4K TV',
    description: 'Every Stanley Cup match, 2026 Olympics, World Cup. CBC, CTV, TSN, Sportsnet — bilingual EN/FR coverage in 4K HDR.',
    type: 'website',
    url: 'https://orca4ktv.com/iptv-canada',
    images: [{ url: 'https://orca4ktv.com/images/canada-coverage.jpg', width: 1200, height: 630 }],
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best IPTV Canada 2026 — NHL, TSN, CBC | ORCA 4K TV',
    description: 'Every Stanley Cup, 2026 Olympic final, World Cup match. Bilingual EN/FR. From $/mo in CAD.',
  },
}

export default function CanadaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/' },
          { name: 'IPTV Canada', url: 'https://orca4ktv.com/iptv-canada' },
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
                "@id": "https://orca4ktv.com/iptv-canada#product",
                "name": "Best IPTV Canada 2026 — ORCA 4K TV",
                "description": "Premium IPTV subscription for Canada — 22,000+ live channels including every NHL game, CFL season, the 2026 Milano-Cortina Winter Olympics, FIFA World Cup 2026 matches in Toronto and Vancouver, plus CBC, CTV, Global, Citytv, TSN, Sportsnet, RDS, TVA Sports — bilingual EN/FR coverage in 4K HDR with HDR10+ and Dolby Vision.",
                "image": "https://orca4ktv.com/images/canada-coverage.jpg",
                "brand": { "@type": "Brand", "name": "ORCA 4K TV" },
                "category": "IPTV Streaming Service",
                "offers": {
                  "@type": "Offer",
                  "url": "https://orca4ktv.com/iptv-shop",
                  "priceCurrency": "CAD",
                  "price": "10.99",
                  "priceValidUntil": "2026-12-31",
                  "availability": "https://schema.org/InStock",
                  "areaServed": { "@type": "Country", "name": "Canada" }
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "843",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              },
              {
                "@type": "Service",
                "@id": "https://orca4ktv.com/iptv-canada#service",
                "name": "ORCA 4K TV Canada IPTV Subscription",
                "serviceType": "IPTV Streaming Service",
                "provider": { "@id": "https://orca4ktv.com/#organization" },
                "areaServed": { "@type": "Country", "name": "Canada" },
                "audience": {
                  "@type": "Audience",
                  "audienceType": "Canadian cord-cutters, hockey fans, premium streaming households, French-Canadian viewers"
                },
                "availableLanguage": ["English", "French"],
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                },
                "description": "Premium IPTV streaming service for Canadian cord-cutters: 22,000+ live channels, every NHL game, CFL season, 2026 Olympics, FIFA World Cup matches at Toronto and Vancouver, plus CBC, CTV, Global, Citytv, TSN, Sportsnet, RDS, TVA Sports — bilingual EN/FR. 4K HDR, AES-256 encrypted, Anti Freeze CDN with Toronto and Vancouver edge servers, multi-device compatibility across Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, iOS and Android, with 24/7 customer support."
              }
            ]
          })
        }}
      />
      <CanadaHero />

      <CanadaHomePage seoContent={
      /* SEO Content Block - rendered after the "Available on your favorite devices" section */
      <section className="bg-[#001f3f] py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-7">
          <p className="text-center text-red-400 text-xs font-black uppercase tracking-[0.3em]">
            Best IPTV Canada 2026 · The Cord-Cutter&apos;s Pick
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
            Best IPTV Canada 2026 — Stream Every NHL Game, the Olympics &amp; World Cup in 4K HDR
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">ORCA 4K TV</strong> is the best IPTV Canada 2026 for cord-cutters who want every game, every channel, every screen — without the $130+ Rogers, Bell or Shaw cable bill. Watch every <strong className="text-white">Stanley Cup playoff shift</strong> in 4K HDR, the entire <strong className="text-white">Milano-Cortina 2026 Winter Olympics</strong> (February 6–22), every match the Toronto BMO Field and Vancouver BC Place host during the <strong className="text-white">FIFA World Cup 2026</strong> in June and July, every CFL Friday, every Blue Jays home game at Rogers Centre, every Raptors night at Scotiabank Arena — 22,000+ live channels in <strong className="text-white">4K Ultra-HD with HDR10+ and Dolby Vision</strong>. Buffer-free streaming powered by our Anti Freeze CDN with dedicated edge servers in Toronto and Vancouver.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            Canadian cable averaged <strong className="text-white">$130+/month</strong> in 2025 — and that was before adding TSN+, Sportsnet+ or any premium sports tier. ORCA 4K TV ships every league, every regional sports network, every Canadian terrestrial channel for{' '}
            <strong className="text-white">$10.99/month CAD</strong> on the{' '}
            <a href="/iptv-shop/12-months" className="text-red-400 hover:underline">12-month plan</a>. Cord-cut Rogers Ignite, Bell Fibe, Shaw Direct, Telus Optik and the entire satellite-box era. Bilingual support in English and French — perfect for Quebec viewers who want both <em>Hockey Night in Canada</em> and <em>La Soirée du hockey</em>.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-red-500/15">
            Every Canadian Network, Every Major League
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Premium Canadian IPTV channels included on every ORCA 4K TV Canada subscription:
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">English Canadian:</strong> CBC, CTV, CTV 2, Global TV, Citytv, CP24, CBC News Network, CTV News Channel, Global News, Discovery Canada, History Canada, Food Network Canada, HGTV Canada</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">French Canadian / Québécois:</strong> Radio-Canada (ICI Télé), TVA, Noovo (V Télé), Télé-Québec, ICI RDI, LCN, Canal Vie, Casa, Z Télé, MAX</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">NHL &amp; hockey:</strong> every regular-season game, Stanley Cup playoffs, Hockey Night in Canada, IIHF World Hockey Championship 2026, World Junior Championship, AHL minor league</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">Sports networks:</strong> TSN, TSN2, TSN3, TSN4, TSN5, Sportsnet, Sportsnet One, Sportsnet 360, Sportsnet World, Sportsnet East/West/Pacific, RDS, RDS2, TVA Sports</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">CFL, MLB, NBA, NFL:</strong> entire CFL season, Toronto Blue Jays, Toronto Raptors, every NFL Sunday including the playoffs and Super Bowl LX</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">Olympics &amp; international:</strong> 2026 Milano-Cortina Winter Olympics, FIFA World Cup 2026 (Toronto + Vancouver host cities), Commonwealth Games qualifying</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">Curling, F1 &amp; tennis:</strong> the Brier, Tournament of Hearts, Olympic curling, every F1 grand prix, Canadian Open / Rogers Cup, US Open, Wimbledon, Australian Open</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">100,000+ on-demand films &amp; series</strong> with same-day Hollywood releases, Marvel, Pixar, Apple TV+, Crave-style premium catalogue</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-red-500/15">
            Anti Freeze CDN — Built for the Canadian Sports Calendar
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            The 2026 Canadian sports calendar is the most demanding broadcast year in history. <strong className="text-white">Stanley Cup playoffs</strong> run April through mid-June. The <strong className="text-white">Milano-Cortina 2026 Winter Olympics</strong> open Friday 6 February with hockey, curling, snowboard, biathlon and figure skating — every event live. The <strong className="text-white">FIFA World Cup 2026</strong> arrives in June with Toronto BMO Field and Vancouver BC Place hosting matches alongside the United States and Mexico. Add the IIHF Worlds in May, the CFL season from June, MLB Opening Day with Toronto Blue Jays at home, the Raptors NBA season — and you have a CDN that runs hard from January to December. Our Toronto and Vancouver edge servers route around peak traffic in real time so every subscriber from Halifax to Victoria gets buffer-free 4K HDR. AES-256 encrypted (
            <a href="/security" className="text-red-400 hover:underline">NIST FIPS 197</a>), VPN traffic welcomed, 24/7 IPTV customer support in English and French.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-red-500/15">
            Watch on Every Canadian Streaming Device
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Multi-device IPTV compatibility on every plan: <strong className="text-white">Firestick 4K Max</strong>, <strong className="text-white">Apple TV 4K (3rd gen)</strong>, <strong className="text-white">Android TV 14</strong>, Chromecast with Google TV, Samsung Tizen, LG webOS, MAG box, iOS, Android, Windows, macOS, and any modern web browser. Up to four simultaneous streams per account. Setup is rapid — most Canadian households are watching live channels within five minutes of checkout. See the <a href="/setup-guide" className="text-red-400 hover:underline">step-by-step setup guide</a> for your device, or check the <a href="/glossary" className="text-red-400 hover:underline">IPTV glossary</a> if any terms are new.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-red-500/15">
            No Cable Box. No Contracts. Bilingual Support.
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            No installer visit, no satellite dish, no equipment lease, no early-termination fee, no auto-renewal trap. Pay month-to-month or save up to 62% on the 12-month <a href="/iptv-shop" className="text-red-400 hover:underline">IPTV subscription plan</a>. Cancel any time. Test it free first — our{' '}
            <a href="/trial" className="text-red-400 hover:underline font-bold">free IPTV trial</a> requires no credit card and unlocks instant activation with the full 22,000-channel library and 4K HDR streaming. <em>Service à la clientèle 24/7 en français et en anglais.</em>
          </p>

          <p className="text-gray-300 text-lg leading-relaxed text-center pt-6">
            Join over 840 verified Canadian subscribers from Vancouver to Halifax who have already replaced cable with the best IPTV Canada 2026.{' '}
            <a href="/trial" className="text-red-400 hover:underline font-bold">Start your free trial</a>
            {' · '}
            <a href="/iptv-shop" className="text-red-400 hover:underline font-bold">View IPTV plans</a>
          </p>
        </div>
      </section>
      } />
    </>
  )
}
