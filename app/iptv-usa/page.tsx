import type { Metadata } from 'next'
import USAHero from '@/components/usa/USAHero'
import USAHomePage from '@/page-components/usa/USAHomePage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Best IPTV USA 2026 - Live Sports & US Networks | ORCA 4K TV',
  description: 'Best IPTV USA 2026: live US sports + every major free-to-air network in 4K HDR. 22,000+ channels, multi-device, no contract. From $7.92/mo.',
  keywords: 'best iptv usa 2026, usa local channels iptv, american sports iptv hd, iptv service for firestick usa, IPTV subscription, IPTV plans, IPTV streaming service, premium IPTV channels, live channels, on-demand movies, 4K streaming, HDR streaming, buffer-free streaming, zero buffering, multi-device compatibility, IPTV multi-device, smart EPG guide, instant activation, secure streaming, AES-256 encryption, 24/7 customer support, cord cutting usa',
  alternates: {
    canonical: 'https://orca4ktv.com/iptv-usa',
    languages: {
      'en-US': 'https://orca4ktv.com/iptv-usa',
      'en-GB': 'https://orca4ktv.com/iptv-uk',
      'en-CA': 'https://orca4ktv.com/iptv-canada',
      'x-default': 'https://orca4ktv.com/',
    },
  },
  openGraph: {
    title: 'Best IPTV USA 2026 - USA Local Channels & Live Sports',
    description: 'Watch 22,000+ USA live channels, American football, US pro basketball, and local networks. Buffer-free 4K streaming.',
    type: 'website',
    url: 'https://orca4ktv.com/iptv-usa',
    images: [{ url: 'https://orca4ktv.com/images/usa-coverage.jpg', width: 1200, height: 630 }],
  },
}

export default function USAPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/iptv' },
          { name: 'IPTV USA', url: 'https://orca4ktv.com/iptv-usa' },
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
                "@id": "https://orca4ktv.com/iptv-usa#product",
                "mainEntityOfPage": { "@type": "WebPage", "@id": "https://orca4ktv.com/iptv-usa" },
                "name": "Best IPTV USA 2026 - ORCA 4K TV",
                "description": "Premium IPTV subscription for the United States - 22,000+ live channels covering American football, US pro basketball, US pro baseball, North American pro hockey, all major US sports and free-to-air networks, plus USA local channels by ZIP code, in 4K HDR with HDR10+ and Dolby Vision.",
                "image": "https://orca4ktv.com/images/usa-coverage.jpg",
                "brand": { "@type": "Brand", "name": "ORCA 4K TV" },
                "category": "IPTV Streaming Service",
                "offers": {
                  "@type": "Offer",
                  "url": "https://orca4ktv.com/iptv-shop",
                  "priceCurrency": "USD",
                  "price": "7.92",
                  "priceValidUntil": "2026-12-31",
                  "availability": "https://schema.org/InStock",
                  "areaServed": { "@type": "Country", "name": "United States" }
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "1284",
                  "bestRating": "5",
                  "worstRating": "1"
                }
              },
              {
                "@type": "Service",
                "@id": "https://orca4ktv.com/iptv-usa#service",
                "name": "ORCA 4K TV USA IPTV Subscription",
                "serviceType": "IPTV Streaming Service",
                "provider": { "@id": "https://orca4ktv.com/#organization" },
                "areaServed": { "@type": "Country", "name": "United States" },
                "audience": {
                  "@type": "Audience",
                  "audienceType": "American cord-cutters, live-sports households, premium streaming households"
                },
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                },
                "description": "Premium IPTV streaming service for US cord-cutters: 22,000+ live channels, American football, US pro basketball, US pro baseball, North American pro hockey, USA local affiliates by ZIP, 4K HDR streaming, AES-256 encryption, Anti Freeze CDN with edge servers in NYC, LA, Chicago, Dallas and Atlanta, multi-device compatibility across Firestick 4K Max, Roku Ultra, Apple TV 4K, Android TV 14, Smart TV, iOS and Android, with 24/7 customer support."
              }
            ]
          })
        }}
      />
      <USAHero />

      <USAHomePage seoContent={
      /* SEO Content Block - rendered after the "Available on your favorite devices" section, server rendered for crawlers */
      <section className="bg-[#001f3f] py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-7">
          <p className="text-center text-blue-400 text-xs font-black uppercase tracking-[0.3em]">
            Best IPTV USA 2026 · Cable TV Alternative
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
            Best IPTV USA 2026 - Stream American Football, Basketball, Baseball &amp; USA Local Channels in 4K HDR
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">ORCA 4K TV</strong> is the best IPTV USA 2026 for cord-cutters who want
            every game, every channel, every screen - without the $147/month cable bill. Stream{' '}
            <strong className="text-white">the championship game in February 2026</strong>, every
            week of the American football regular season and playoffs, <strong className="text-white">the spring US college basketball tournament</strong>,
            the US baseball championship series, US basketball championship finals, the North American hockey championship, the late-summer Grand Slam tennis fortnight, the spring golf majors, and 22,000+ live channels
            in <strong className="text-white">4K Ultra-HD with HDR10+ and Dolby Vision</strong>. Buffer-free streaming
            powered by our Anti Freeze CDN with US edge servers in New York, Los Angeles, Chicago, Dallas, and Atlanta.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            The average US cable bill hit <strong className="text-white">$147/month</strong> in 2025. ORCA 4K TV
            delivers more channels, more sports packages, and more on-demand titles for{' '}
            <strong className="text-white">$7.92/month</strong> on the{' '}
            <a href="/iptv-shop/12-months" className="text-blue-400 hover:underline">12-month plan</a>. Every regional sports network, every league,
            one IPTV subscription. Cord-cut Comcast Xfinity, Spectrum, DirecTV, DISH, Hulu Live, YouTube TV, fubo, and
            Sling TV in one move.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-blue-500/15">
            Every Major US Network, Every Major League
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Premium American IPTV channels included on every ORCA 4K TV USA subscription:
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">USA local channels:</strong> all major US free-to-air networks and their HD/regional variants (regional affiliates by ZIP)</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Sports:</strong> all major US sports networks, regional sports networks, dedicated channels for American football, US pro basketball, US pro baseball, North American pro hockey, tennis and golf</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">News:</strong> all major US 24-hour news networks plus financial and international news</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Premium entertainment:</strong> premium movie channels and major basic-cable entertainment networks</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Lifestyle:</strong> documentary, history, food, home and travel networks</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Kids:</strong> premium kids&apos; channels and educational programming</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">100,000+ on-demand movies</strong> with same-day Hollywood releases - major studio blockbusters and premium streaming-platform-style originals</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">7-day catch up TV</strong> on every channel via the smart EPG guide</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-blue-500/15">
            Anti Freeze CDN - Built for the American Sports Calendar
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            The 2026 US sports calendar is the most demanding year in broadcast history:{' '}
            <strong className="text-white">the championship game in February</strong>, the college football playoff, the spring college basketball tournament, the baseball season opener, the basketball championship finals, the hockey championship, the late-summer US Grand Slam tennis fortnight, and the{' '}
            <strong className="text-white">summer 2026 international football tournament</strong> with US host cities Atlanta, Boston, Dallas,
            Houston, Kansas City, Los Angeles, Miami, New York/New Jersey, Philadelphia, San Francisco Bay Area, and
            Seattle. Our Anti Freeze CDN routes around peak-event traffic in real time so every subscriber - Brooklyn
            to Beverly Hills, Boston to Boise - gets the same buffer-free 4K HDR streaming. AES-256 encrypted (
            <a href="/security" className="text-blue-400 hover:underline">NIST FIPS 197</a>), VPN traffic welcomed,
            24/7 IPTV customer support with average first reply under 5 minutes.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-blue-500/15">
            Watch on Every American Streaming Device
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Multi-device IPTV compatibility on every plan: <strong className="text-white">Firestick 4K Max</strong>,{' '}
            <strong className="text-white">Roku Ultra</strong>,{' '}
            <strong className="text-white">Apple TV 4K (3rd gen)</strong>,{' '}
            <strong className="text-white">Android TV 14</strong>, Chromecast with Google TV, Samsung Tizen, LG webOS,
            MAG box, iOS, Android, Windows, macOS, and any modern web browser. Up to four simultaneous streams per
            account. Setup is rapid - most US households are watching live channels within five minutes of checkout.
            See the <a href="/setup-guide" className="text-blue-400 hover:underline">step-by-step setup guide</a> for
            your device, or check the <a href="/glossary" className="text-blue-400 hover:underline">IPTV glossary</a>
            {' '}if any terms are new.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-blue-500/15">
            Zero Cable Box. Zero Contracts. Zero Buffering.
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            No installer visit, no satellite dish, no equipment lease, no early-termination fee, no auto-renewal trap.
            Pay month-to-month or save up to 62% on the 12-month <a href="/iptv-shop" className="text-blue-400 hover:underline">IPTV subscription plan</a>.
            Cancel any time. Test it free first - our{' '}
            <a href="/trial" className="text-blue-400 hover:underline font-bold">free IPTV trial</a> requires no credit
            card and unlocks instant activation with the full 22,000-channel library and 4K HDR streaming.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed text-center pt-6">
            Join over 1,200 verified American subscribers who have already replaced cable with the best IPTV USA
            2026.{' '}
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
