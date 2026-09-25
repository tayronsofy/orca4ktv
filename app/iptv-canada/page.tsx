import type { Metadata } from 'next'
import { buildPageMetadata, codeDefaultsFrom } from '@/lib/seo/metadata'
import CanadaHero from '@/components/canada/CanadaHero'
import CanadaHomePage from '@/page-components/canada/CanadaHomePage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

const codeMetadata: Metadata = {
  title: 'Best IPTV Canada 2026 - Hockey, Live Sports & CA Networks | ORCA 4K TV',
  description: 'Best IPTV Canada 2026: every pro hockey playoff, Canadian football & the 2026 Winter Games in 4K HDR. 22,000+ channels, all CA networks. Bilingual EN/FR.',
  keywords: 'best iptv canada 2026, iptv canada, canadian iptv subscription, hockey iptv canada, canadian football iptv, french canadian iptv channels, IPTV subscription, IPTV plans, IPTV streaming service, premium IPTV channels, live channels, on-demand movies, 4K streaming, HDR streaming, buffer-free streaming, multi-device compatibility, smart EPG guide, instant activation, secure streaming, AES-256 encryption, 24/7 customer support, IPTV with VPN, cord cutting canada 2026',
  alternates: {
    canonical: 'https://orca4ktv.com/iptv-canada',
    languages: {
      'en-US': 'https://orca4ktv.com/iptv-usa',
      'en-GB': 'https://orca4ktv.com/iptv-uk',
      'en-CA': 'https://orca4ktv.com/iptv-canada',
      'fr-CA': 'https://orca4ktv.com/iptv-canada',
      'sv-SE': 'https://orca4ktv.com/iptv-sweden',
      'x-default': 'https://orca4ktv.com/',
    },
  },
  openGraph: {
    title: 'Best IPTV Canada 2026 - Hockey, Live Sports & CA Networks | ORCA 4K TV',
    description: 'Every hockey playoff, the 2026 Winter Games, summer international football. All major Canadian free-to-air and sports networks - bilingual EN/FR coverage in 4K HDR.',
    type: 'website',
    url: 'https://orca4ktv.com/iptv-canada',
    images: [{ url: 'https://orca4ktv.com/images/canada-coverage.jpg', width: 1200, height: 630 }],
    locale: 'en_CA',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best IPTV Canada 2026 - Hockey, Live Sports & CA Networks | ORCA 4K TV',
    description: 'Every hockey playoff, 2026 Winter Games, summer international football. Bilingual EN/FR. From $/mo in CAD.',
  },
}

// SEO overrides from /admin/seo — null DB fields fall back to codeMetadata
export async function generateMetadata(): Promise<Metadata> {
  const base = await buildPageMetadata('iptv-canada', codeDefaultsFrom(codeMetadata))
  return { ...codeMetadata, ...base }
}

export default function CanadaPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/iptv' },
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
                "mainEntityOfPage": { "@type": "WebPage", "@id": "https://orca4ktv.com/iptv-canada" },
                "name": "Best IPTV Canada 2026 - ORCA 4K TV",
                "description": "Premium IPTV subscription for Canada - 22,000+ live channels covering every North American pro hockey game, Canadian football, the 2026 Winter Games, summer international football matches in Toronto and Vancouver, plus all major Canadian English and French free-to-air networks and premium sports tier - bilingual EN/FR coverage in 4K HDR with HDR10+ and Dolby Vision.",
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
                "description": "Premium IPTV streaming service for Canadian cord-cutters: 22,000+ live channels, every North American pro hockey game, Canadian football, the 2026 Winter Games, summer international football matches at Toronto and Vancouver, plus all major Canadian English and French free-to-air networks and premium sports tier - bilingual EN/FR. 4K HDR, AES-256 encrypted, Anti Freeze CDN with Toronto and Vancouver edge servers, multi-device compatibility across Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, iOS and Android, with 24/7 customer support."
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
            Best IPTV Canada 2026 - Stream Every Hockey Game, the Winter Games &amp; International Football in 4K HDR
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">ORCA 4K TV</strong> is the best IPTV Canada 2026 for cord-cutters who want every game, every channel, every screen - without the $130+ Rogers, Bell or Shaw cable bill. Watch every <strong className="text-white">North American pro hockey playoff shift</strong> in 4K HDR, the entire <strong className="text-white">2026 Winter Games</strong> (February 6-22), every match the Toronto and Vancouver host venues stage during the <strong className="text-white">summer 2026 international football tournament</strong> in June and July, every Canadian football Friday, every home US pro baseball game from Toronto, every home US pro basketball night from Toronto - 22,000+ live channels in <strong className="text-white">4K Ultra-HD with HDR10+ and Dolby Vision</strong>. Buffer-free streaming powered by our Anti Freeze CDN with dedicated edge servers in Toronto and Vancouver.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            Canadian cable averaged <strong className="text-white">$130+/month</strong> in 2025 - and that was before adding any premium sports tier. ORCA 4K TV ships every league, every regional sports network, every Canadian terrestrial channel for{' '}
            <strong className="text-white">$10.99/month CAD</strong> on the{' '}
            <a href="/iptv-shop/12-months" className="text-red-400 hover:underline">12-month plan</a>. Cord-cut Rogers Ignite, Bell Fibe, Shaw Direct, Telus Optik and the entire satellite-box era. Bilingual support in English and French - perfect for Quebec viewers who want both Saturday-night hockey broadcasts and the French-language equivalent.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-red-500/15">
            Every Canadian Network, Every Major League
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Premium Canadian IPTV channels included on every ORCA 4K TV Canada subscription:
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">English Canadian:</strong> all major English-language Canadian free-to-air networks plus 24-hour news, lifestyle and documentary channels</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">French Canadian / Québécois:</strong> all major French-language Canadian free-to-air networks plus 24-hour Québécois news and lifestyle channels</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">Hockey:</strong> every regular-season North American pro hockey game, the late-season hockey playoffs, Saturday-night hockey broadcasts, the spring international hockey championship, the World Junior Championship, minor league</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">Sports networks:</strong> all major Canadian English and French sports networks and their regional variants</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">Other major leagues:</strong> the entire Canadian football season, home US pro baseball games from Toronto, home US pro basketball games from Toronto, every American football Sunday including the playoffs and the championship game in February</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">International events:</strong> the 2026 Winter Games, summer 2026 international football tournament (Toronto + Vancouver host venues), Commonwealth Games qualifying</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">Curling, motorsport &amp; tennis:</strong> the national and provincial curling championships, Winter Games curling, every round of the open-wheel motorsport season, the Canadian summer hard-court tennis Masters, all four Grand Slam tennis tournaments</span></li>
            <li className="flex gap-3"><span className="text-red-400 font-black mt-0.5">▸</span><span><strong className="text-white">100,000+ on-demand films &amp; series</strong> with same-day Hollywood releases, major studio blockbusters and premium streaming-platform-style originals</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-red-500/15">
            Anti Freeze CDN - Built for the Canadian Sports Calendar
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            The 2026 Canadian sports calendar is the most demanding broadcast year in history. The <strong className="text-white">North American pro hockey playoffs</strong> run April through mid-June. The <strong className="text-white">2026 Winter Games</strong> open Friday 6 February with hockey, curling, snowboard, biathlon and figure skating - every event live. The <strong className="text-white">summer 2026 international football tournament</strong> arrives in June with Toronto and Vancouver hosting matches alongside the United States and Mexico. Add the spring international hockey championship in May, the Canadian football season from June, the US pro baseball season opener with home games from Toronto, the home US pro basketball season - and you have a CDN that runs hard from January to December. Our Toronto and Vancouver edge servers route around peak traffic in real time so every subscriber from Halifax to Victoria gets buffer-free 4K HDR. AES-256 encrypted (
            <a href="/security" className="text-red-400 hover:underline">NIST FIPS 197</a>), VPN traffic welcomed, 24/7 IPTV customer support in English and French.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-red-500/15">
            Watch on Every Canadian Streaming Device
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Multi-device IPTV compatibility on every plan: <strong className="text-white">Firestick 4K Max</strong>, <strong className="text-white">Apple TV 4K (3rd gen)</strong>, <strong className="text-white">Android TV 14</strong>, Chromecast with Google TV, Samsung Tizen, LG webOS, MAG box, iOS, Android, Windows, macOS, and any modern web browser. Up to four simultaneous streams per account. Setup is rapid - most Canadian households are watching live channels within five minutes of checkout. See the <a href="/setup-guide" className="text-red-400 hover:underline">step-by-step setup guide</a> for your device, or check the <a href="/glossary" className="text-red-400 hover:underline">IPTV glossary</a> if any terms are new.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-red-500/15">
            No Cable Box. No Contracts. Bilingual Support.
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            No installer visit, no satellite dish, no equipment lease, no early-termination fee, no auto-renewal trap. Pay month-to-month or save up to 62% on the 12-month <a href="/iptv-shop" className="text-red-400 hover:underline">IPTV subscription plan</a>. Cancel any time. Test it free first - our{' '}
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
