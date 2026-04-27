import type { Metadata } from 'next'
import UKHero from '@/components/uk/UKHero'
import UKHomePage from '@/page-components/uk/UKHomePage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Best IPTV UK 2026 — Premier League, BBC, ITV in 4K HDR | ORCA 4K TV',
  description: 'Premium IPTV subscription for the UK: Premier League, BBC, ITV, Channel 4, Channel 5, Six Nations Rugby, F1, Wimbledon, cricket — every UK channel in 4K HDR with HDR10+ and Dolby Vision. Anti Freeze CDN, AES-256 encryption, multi-device, instant activation, 24/7 support.',
  keywords: 'best iptv uk 2026, premier league iptv, premier league iptv no buffering, uk tv channels iptv hd, champions league iptv uk, six nations rugby iptv, F1 iptv uk 2026, wimbledon iptv 2026, the open championship iptv, cricket iptv uk, IPTV subscription, IPTV plans, IPTV streaming service, premium IPTV channels, live channels, on-demand movies, 4K streaming, HDR streaming, buffer-free streaming, zero buffering, multi-device compatibility, IPTV multi-device, smart EPG guide, electronic program guide, catch up feature, IPTV catch up TV, instant activation, secure streaming, AES-256 encryption, 24/7 customer support, IPTV with VPN, BBC iPlayer alternative, ITVX alternative, Channel 4 alternative, satellite TV alternative UK',
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
    title: 'Best IPTV UK 2026 — Premier League, BBC, ITV in 4K HDR',
    description: 'Premier League, BBC, ITV, Channel 4, Six Nations Rugby, F1, Wimbledon — every UK channel in 4K HDR. Anti Freeze CDN, multi-device, instant activation.',
    type: 'website',
    url: 'https://orca4ktv.com/iptv-uk',
    images: [{ url: 'https://orca4ktv.com/images/uk-coverage.jpg', width: 1200, height: 630 }],
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best IPTV UK 2026 — Premier League, BBC, ITV in 4K HDR',
    description: 'Every UK channel in 4K HDR with HDR10+ and Dolby Vision. Anti Freeze CDN. AES-256 encrypted. £/mo plans.',
  },
}

export default function UKPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/' },
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
                "name": "Best IPTV UK 2026 — ORCA 4K TV",
                "description": "Premium IPTV subscription for the United Kingdom — 22,000+ live channels including Premier League, BBC, ITV, Channel 4, Channel 5, Six Nations Rugby, F1, Wimbledon, cricket and more, in 4K HDR with HDR10+ and Dolby Vision.",
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
                  "audienceType": "British cord-cutters, Premier League fans, premium streaming households"
                },
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                },
                "description": "Premium IPTV streaming service for UK cord-cutters: 22,000+ live channels, Premier League, BBC, ITV, Channel 4, Channel 5, Six Nations Rugby, F1, Wimbledon, cricket, 4K HDR streaming, AES-256 encryption, Anti Freeze CDN with a London edge POP, multi-device compatibility across Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, iOS and Android, with 24/7 customer support."
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
            Best IPTV UK 2026 — Stream the Premier League, BBC, ITV &amp; Every Match in 4K HDR
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">ORCA 4K TV</strong> is the best IPTV UK 2026 for cord-cutters who want every match, every channel, every screen — without the £85+ satellite-TV bill. Watch every <strong className="text-white">3pm Saturday kick-off</strong> live in 4K HDR, every <strong className="text-white">Premier League title-race fixture</strong>, every <strong className="text-white">Champions League knockout</strong>, the <strong className="text-white">Six Nations 2026</strong> in February, every F1 grand prix of the new 2026 regulations, <strong className="text-white">Wimbledon</strong>, <strong className="text-white">The Open Championship</strong>, the Ashes, county cricket, Premiership Rugby, British boxing — 22,000+ live channels in <strong className="text-white">4K Ultra-HD with HDR10+ and Dolby Vision</strong>. Buffer-free streaming powered by our Anti Freeze CDN with a dedicated London edge server.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            UK satellite-TV packages averaged <strong className="text-white">£85+/month</strong> in 2025 once you bundled Premier League, premium sports, films, and a HD box rental. ORCA 4K TV ships more channels, more sports, more on-demand titles for{' '}
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
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">UK terrestrial:</strong> BBC One, BBC Two, ITV1, ITV2, ITV3, ITV4, Channel 4, Channel 5, E4, More4, Film4, Dave, Quest, BBC Three, BBC Four, BBC News, Sky News (free-to-air)</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Premier League &amp; football:</strong> every Premier League match including 3pm Saturdays, Champions League knockouts, Europa League, EFL Cup, FA Cup, Scottish Premiership</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Rugby:</strong> Six Nations 2026, Premiership Rugby, World Rugby, the British &amp; Irish Lions tour, Rugby League Super League</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Cricket:</strong> The Hundred, T20 Blast, Test cricket, the Ashes, ICC tournaments</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">F1 &amp; motorsport:</strong> every F1 grand prix of the 2026 era, MotoGP, Formula E, British Touring Cars, Le Mans</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Tennis &amp; golf:</strong> Wimbledon 2026, Queen&apos;s, ATP / WTA tours, The Open Championship, US Open, PGA, Ryder Cup</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">Boxing &amp; MMA:</strong> headline UK fight nights, world title bouts, UFC pay-per-view fights at no extra cost</span></li>
            <li className="flex gap-3"><span className="text-blue-400 font-black mt-0.5">▸</span><span><strong className="text-white">100,000+ on-demand films &amp; series</strong> with same-week Hollywood releases — every Marvel, Pixar, Apple TV+, Prime Video and HBO Original</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-blue-500/15">
            Anti Freeze CDN — Built for the British Sports Calendar
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            The 2026 UK sports calendar is the most demanding broadcast year in history:{' '}
            <strong className="text-white">Six Nations 2026</strong> kicks off Friday 6 February, the Premier League title race intensifies through May,{' '}
            <strong className="text-white">Wimbledon 2026</strong> runs late June through mid-July,{' '}
            <strong className="text-white">The Open Championship 2026</strong> arrives mid-July, the new-rules <strong className="text-white">F1 2026 season</strong> opens in March, and the{' '}
            <strong className="text-white">FIFA World Cup 2026</strong> follows in June with England in the running. Our Anti Freeze CDN routes around peak match-day congestion in real time — Manchester to Cardiff, Glasgow to Plymouth — so every kick-off, every set point, every breakaway lands buffer-free in 4K HDR. AES-256 encrypted (
            <a href="/security" className="text-blue-400 hover:underline">NIST FIPS 197</a>), VPN traffic welcomed, 24/7 IPTV customer support with average first reply under 5 minutes.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-blue-500/15">
            Watch on Every British Streaming Device
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Multi-device IPTV compatibility on every plan: <strong className="text-white">Firestick 4K Max</strong>,{' '}
            <strong className="text-white">Apple TV 4K (3rd gen)</strong>,{' '}
            <strong className="text-white">Android TV 14</strong>, Chromecast with Google TV, Samsung Tizen, LG webOS, MAG box, iOS, Android, Windows, macOS, and any modern web browser. Up to four simultaneous streams per account. Setup is rapid — most UK households are watching live channels within five minutes of checkout. See the <a href="/setup-guide" className="text-blue-400 hover:underline">step-by-step setup guide</a> for your device, or check the <a href="/glossary" className="text-blue-400 hover:underline">IPTV glossary</a> if any terms are new.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-blue-500/15">
            No Aerial. No Dish. No Contract.
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            No installer visit, no satellite dish, no equipment lease, no early-termination fee, no auto-renewal trap. Pay month-to-month or save up to 62% on the 12-month <a href="/iptv-shop" className="text-blue-400 hover:underline">IPTV subscription plan</a>. Cancel any time. Test it free first — our{' '}
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
