import type { Metadata } from 'next'
import UKHero from '@/components/uk/UKHero'
import UKHomePage from '@/page-components/uk/UKHomePage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Best IPTV UK 2026 - Live Sports & UK Networks | ORCA 4K TV',
  description: 'Best IPTV UK 2026: every UK football matchday, top European football, motorsport & Grand Slam tennis in 4K HDR. 22,000+ channels, all UK free-to-air networks.',
  keywords: 'best iptv uk 2026, iptv uk, uk iptv subscription, uk live tv channels iptv hd, iptv uk no buffering, IPTV subscription, IPTV plans, IPTV streaming service, premium IPTV channels, live channels, on-demand movies, 4K streaming, HDR streaming, buffer-free streaming, zero buffering, multi-device compatibility, IPTV multi-device, smart EPG guide, electronic program guide, catch up feature, IPTV catch up TV, instant activation, secure streaming, AES-256 encryption, 24/7 customer support, IPTV with VPN, satellite TV alternative UK, cord cutting uk',
  alternates: {
    canonical: 'https://orca4ktv.com/iptv-uk',
    languages: {
      'en-US': 'https://orca4ktv.com/iptv-usa',
      'en-GB': 'https://orca4ktv.com/iptv-uk',
      'en-CA': 'https://orca4ktv.com/iptv-canada',
      'x-default': 'https://orca4ktv.com/',
    },
  },
  openGraph: {
    title: 'Best IPTV UK 2026 - Live Sports & UK Networks | ORCA 4K TV',
    description: 'Best IPTV UK 2026: every UK football matchday, top European football, motorsport & Grand Slam tennis in 4K HDR. 22,000+ channels, all UK free-to-air networks.',
    type: 'website',
    url: 'https://orca4ktv.com/iptv-uk',
    images: [{ url: 'https://orca4ktv.com/images/uk-coverage.jpg', width: 1200, height: 630 }],
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best IPTV UK 2026 - Live Sports & UK Networks | ORCA 4K TV',
    description: 'UK football, top European football midweek, motorsport, Grand Slam tennis in 4K HDR. Anti Freeze CDN. AES-256 encrypted. £/mo plans.',
  },
}

export default function UKPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/iptv' },
          { name: 'IPTV UK', url: 'https://orca4ktv.com/iptv-uk' },
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
                "@id": "https://orca4ktv.com/iptv-uk#product",
                "mainEntityOfPage": { "@type": "WebPage", "@id": "https://orca4ktv.com/iptv-uk" },
                "name": "Best IPTV UK 2026 - ORCA 4K TV",
                "description": "Premium IPTV subscription for the United Kingdom - 22,000+ live channels covering UK football, top European football midweek, premium UK sports tier, all major UK free-to-air networks, motorsport, Grand Slam tennis, cricket and rugby - in 4K HDR with HDR10+ and Dolby Vision.",
                "image": "https://orca4ktv.com/images/uk-coverage.jpg",
                "brand": { "@type": "Brand", "name": "ORCA 4K TV" },
                "category": "IPTV Streaming Service",
                "offers": {
                  "@type": "Offer",
                  "url": "https://orca4ktv.com/iptv-shop",
                  "priceCurrency": "GBP",
                  "price": "6.50",
                  "priceValidUntil": "2026-12-31",
                  "availability": "https://schema.org/InStock",
                  "areaServed": { "@type": "Country", "name": "United Kingdom" }
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "986",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              },
              {
                "@type": "Service",
                "@id": "https://orca4ktv.com/iptv-uk#service",
                "name": "ORCA 4K TV UK IPTV Subscription",
                "serviceType": "IPTV Streaming Service",
                "provider": { "@id": "https://orca4ktv.com/#organization" },
                "areaServed": { "@type": "Country", "name": "United Kingdom" },
                "audience": {
                  "@type": "Audience",
                  "audienceType": "British cord-cutters, live-sports households, premium streaming households"
                },
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                },
                "description": "Premium IPTV streaming service for UK cord-cutters: 22,000+ live channels, UK football coverage, top European club football midweek, premium UK sports tier, all major UK free-to-air networks, motorsport, Grand Slam tennis, rugby and cricket, 4K HDR streaming, AES-256 encryption, Anti Freeze CDN with a London edge POP, multi-device compatibility across Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, iOS and Android, with 24/7 customer support."
              }
            ]
          })
        }}
      />
      <UKHero />

      <UKHomePage seoContent={
      /* SEO Content Block - rendered after the "Available on your favorite devices" section */
      <section className="bg-[#001f3f] py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-7">
          <p className="text-center text-blue-400 text-xs font-black uppercase tracking-[0.3em]">
            Best IPTV UK 2026 · The Cord-Cutter&apos;s Pick
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
            Best IPTV UK 2026 - Stream UK Football, Live Sports &amp; Every UK Network in 4K HDR
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">ORCA 4K TV</strong> is the best IPTV UK 2026 for cord-cutters who want every match, every channel, every screen - without the £85+ satellite-TV bill. Watch every <strong className="text-white">3pm Saturday kick-off</strong> live in 4K HDR, every UK top-flight football fixture, every top European club football knockout night, the Northern hemisphere international rugby championship in February, every round of the new 2026-era open-wheel motorsport season, the summer Grand Slam tennis fortnight, the Open golf championship, the home cricket Test series, top-flight UK rugby - 22,000+ live channels in <strong className="text-white">4K Ultra-HD with HDR10+ and Dolby Vision</strong>. Buffer-free streaming powered by our Anti Freeze CDN with a dedicated London edge server.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            UK satellite-TV packages averaged <strong className="text-white">£85+/month</strong> in 2025 once you bundled premium UK football, premium sports, films, and a HD box rental. ORCA 4K TV ships more channels, more sports, more on-demand titles for{' '}
            <strong className="text-white">£6.50/month</strong> on the{' '}
            <a href="/iptv-shop/12-months" className="text-blue-400 hover:underline">12-month plan</a>. Cord-cut Virgin Media, BT TV, NOW, fubo and the entire satellite-box era in one move. No installer visit, no aerial dish, no contract trap.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-blue-500/15">
            Every UK Network, Every Major League
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Premium British IPTV channels included on every ORCA 4K TV UK subscription:
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">UK terrestrial:</strong> all major UK free-to-air networks and their HD/+1 variants, plus regional affiliates by postcode (free-to-air)</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">UK football:</strong> every UK top-flight match including 3pm Saturdays, top European club football knockouts, second-tier and lower-league fixtures, domestic cup competitions and Scottish top-flight</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Rugby:</strong> Northern hemisphere international championship 2026, top-flight UK rugby, World Rugby internationals, the touring international squad of 2026, top-tier UK rugby league</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Cricket:</strong> the short-format city tournament, top-tier T20 domestic competition, Test cricket, the home England-Australia series, international tournaments</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Motorsport:</strong> every round of the new 2026-era open-wheel championship, premier motorcycle racing, all-electric single-seater racing, top-tier UK touring cars, endurance racing</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Tennis &amp; golf:</strong> all four Grand Slam tennis tournaments, the early-summer London grass-court warm-up, ATP / WTA tour stops, the Open golf championship, all four golf majors, biennial transatlantic team golf</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Boxing &amp; MMA:</strong> headline UK fight nights, world title bouts, MMA pay-per-view fights at no extra cost</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">100,000+ on-demand films &amp; series</strong> with same-week Hollywood releases - major studio blockbusters and premium streaming-platform-style originals</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-blue-500/15">
            Anti Freeze CDN - Built for the British Sports Calendar
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            The 2026 UK sports calendar is the most demanding broadcast year in history:{' '}
            the <strong className="text-white">Northern hemisphere international rugby championship</strong> kicks off Friday 6 February, the UK football title race intensifies through May,{' '}
            the <strong className="text-white">summer Grand Slam tennis fortnight</strong> runs late June through mid-July,{' '}
            the <strong className="text-white">Open golf championship</strong> arrives mid-July, the <strong className="text-white">new-rules 2026 open-wheel motorsport season</strong> opens in March, and the{' '}
            <strong className="text-white">summer 2026 international football tournament</strong> follows in June with England in the running. Our Anti Freeze CDN routes around peak match-day congestion in real time - Manchester to Cardiff, Glasgow to Plymouth - so every kick-off, every set point, every breakaway lands buffer-free in 4K HDR. AES-256 encrypted (
            <a href="/security" className="text-blue-400 hover:underline">NIST FIPS 197</a>), VPN traffic welcomed, 24/7 IPTV customer support with average first reply under 5 minutes.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-blue-500/15">
            Watch on Every British Streaming Device
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Multi-device IPTV compatibility on every plan: <strong className="text-white">Firestick 4K Max</strong>,{' '}
            <strong className="text-white">Apple TV 4K (3rd gen)</strong>,{' '}
            <strong className="text-white">Android TV 14</strong>, Chromecast with Google TV, Samsung Tizen, LG webOS, MAG box, iOS, Android, Windows, macOS, and any modern web browser. Up to four simultaneous streams per account. Setup is rapid - most UK households are watching live channels within five minutes of checkout. See the <a href="/setup-guide" className="text-blue-400 hover:underline">step-by-step setup guide</a> for your device, or check the <a href="/glossary" className="text-blue-400 hover:underline">IPTV glossary</a> if any terms are new.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-blue-500/15">
            No Aerial. No Dish. No Contract.
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            No installer visit, no satellite dish, no equipment lease, no early-termination fee, no auto-renewal trap. Pay month-to-month or save up to 62% on the 12-month <a href="/iptv-shop" className="text-blue-400 hover:underline">IPTV subscription plan</a>. Cancel any time. Test it free first - our{' '}
            <a href="/trial" className="text-blue-400 hover:underline font-bold">free IPTV trial</a> requires no credit card and unlocks instant activation with the full 22,000-channel library and 4K HDR streaming.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed text-center pt-6">
            Join over 980 verified British subscribers who have already switched to the best IPTV UK 2026.{' '}
            <a href="/trial" className="text-blue-400 hover:underline font-bold">Start your free trial</a>
            {' · '}
            <a href="/iptv-shop" className="text-blue-400 hover:underline font-bold">View IPTV plans</a>
          </p>
        </div>
      </section>
      } />
    </>
  )
}
