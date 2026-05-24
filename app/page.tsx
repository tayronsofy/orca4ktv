import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import HomePageClient from './HomePageClient'
import { getPublishedPosts } from '@/lib/posts'
import TrustFacts from '@/components/seo/TrustFacts'

export const metadata: Metadata = {
  title: 'ORCA 4K TV IPTV - 22,000+ Live Channels in 4K HDR',
  description: 'Premium IPTV: 22,000+ live channels, 100,000+ movies in 4K HDR. Anti Freeze CDN, AES-256, multi-device. Firestick, Smart TV, Apple TV. From $7.92/mo.',
  keywords: 'IPTV subscription, IPTV plans, IPTV service provider, IPTV streaming service, IPTV subscription plans, 4K IPTV subscription, HD IPTV service, 4K streaming, HDR streaming, live channels, on-demand movies, premium IPTV channels, premium channels, live TV streaming, buffer-free streaming, zero buffering, Anti Freeze technology, multi-device compatibility, IPTV multi-device, IPTV device compatibility, smart EPG guide, electronic program guide, catch up feature, IPTV catch up TV, instant activation, IPTV instant start, rapid setup, fast IPTV setup, secure streaming, AES-256 encryption, secure IPTV access, encrypted IPTV streaming, VPN allowed, IPTV with VPN, 24/7 customer support, IPTV customer support',
  alternates: { canonical: 'https://orca4ktv.com/' },
  openGraph: {
    title: 'ORCA 4K TV IPTV - 22,000+ Live Channels in 4K HDR',
    description: 'Premium IPTV streaming with 22,000+ live channels in 4K HDR, on-demand movies, AES-256 encrypted, multi-device, instant activation. From $7.92/mo.',
    type: 'website',
    url: 'https://orca4ktv.com/',
    images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ORCA 4K TV IPTV - 22,000+ Live Channels in 4K HDR',
    description: 'Premium IPTV in 4K HDR: 22,000+ channels, AES-256 encrypted, multi-device, instant activation. From $7.92/mo.',
    images: ['https://orca4ktv.com/og-image.jpg'],
  },
}

export default function HomePage() {
  const latestPosts = getPublishedPosts().slice(0, 6)

  const belowDevices = (
    <>
      <TrustFacts />

      {/* SEO Content Block - server rendered for crawlers */}
      <section className="bg-[#001f3f] py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-7 text-left md:text-left">
          <p className="text-center text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em]">
            The #1 IPTV Subscription for 2026
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
            The Best IPTV Service of 2026 - Built for the Biggest Year in Live Sports
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">ORCA 4K TV</strong> is the next-generation <strong className="text-white">IPTV streaming service</strong> engineered for 2026 - the biggest year in live sports streaming since the platform began. Watch every major international football tournament live in 4K Ultra-HD with HDR10+ and Dolby Vision, the championship game in February, every top European club football knockout, every UK football weekend, every US pro basketball playoff quarter - across <strong className="text-white">22,000+ live channels</strong>, <strong className="text-white">100,000+ on-demand movies</strong>, and an AI-powered smart EPG guide that actually understands what you want.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            Powered by our proprietary <strong className="text-white">Anti Freeze technology</strong> CDN, every stream lands buffer-free even during peak match-day traffic. Encrypted end-to-end with <strong className="text-white">AES-256</strong> (<Link href="/security" className="text-[#00E5FF] hover:underline">NIST FIPS 197</Link>), VPN-friendly, and ready on Firestick 4K Max, Apple TV 4K (3rd gen), Android TV 14, Samsung Tizen, LG webOS, MAG, iOS and Android - full <Link href="/iptv-shop" className="text-[#00E5FF] hover:underline">multi-device compatibility</Link> on every IPTV subscription plan we ship.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-[#00E5FF]/15">
            What Makes ORCA 4K TV the Best IPTV Provider in 2026
          </h3>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">22,000+ live channels</strong> - premium IPTV channels from USA, UK, Canada, Germany, Netherlands, MENA, LATAM, and Asia</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">4K HDR streaming</strong> with HDR10+ and Dolby Vision on supported channels</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">Anti Freeze CDN</strong> with edge POPs auto-routed for zero buffering</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">AI-powered IPTV concierge</strong> - ask in plain English, get the channel</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">Smart EPG guide</strong> with 7-day catch up TV and recommendations</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">AES-256 encrypted</strong> secure IPTV access - VPN allowed, no throttling</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">Instant activation</strong> - IPTV instant start in under 5 minutes</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">24/7 customer support</strong> - average first reply under 5 minutes</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-[#00E5FF]/15">
            From Cable to Cord-Cutter - Why 2026 Is the Year to Switch
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Cable subscriptions averaged <strong className="text-white">$120+ per month</strong> in 2025 with rigid contracts and a 200-channel cap. ORCA 4K TV starts at <strong className="text-white">$7.92/month</strong> on the <Link href="/iptv-shop/12-months" className="text-[#00E5FF] hover:underline">12-month plan</Link> - over 100× the channel count, 4K HDR streaming on tap, and zero install fees. Whether you're a Firestick 4K Max household, a Smart TV family, or a multi-device IPTV power user with up to 4 simultaneous connections, you get the same complete library on every screen.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            Want to test it first? Start with our <Link href="/trial" className="text-[#00E5FF] hover:underline font-bold">free IPTV trial</Link> - no credit card, instant activation, full 4K HDR access. Browse the <Link href="/channels" className="text-[#00E5FF] hover:underline">premium IPTV channel list</Link>, read up on <Link href="/security" className="text-[#00E5FF] hover:underline">our AES-256 encryption</Link>, or check the <Link href="/glossary" className="text-[#00E5FF] hover:underline">IPTV glossary</Link> if any terminology is new. Setup takes under 5 minutes - see the <Link href="/setup-guide" className="text-[#00E5FF] hover:underline">step-by-step rapid setup guide</Link> for your device.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-[#00E5FF]/15">
            Live Sports Streaming in 2026 - Every Major Event, Every League
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            ORCA 4K TV is purpose-built for live sports streaming. Coverage spans the biggest <strong className="text-white">international football tournament of summer 2026</strong> across US, Canada and Mexico host cities, the <strong className="text-white">championship game in February</strong>, top European club football midweeks, every domestic top-flight football league across the UK, Germany, Italy, Spain and the Netherlands, plus American football, US pro basketball, North American pro hockey, US pro baseball, MMA pay-per-views, top-tier open-wheel motorsport, premier motorcycle racing, Grand Slam tennis, major golf tournaments, US college sports, and the <strong className="text-white">2026 Winter Games</strong>. Live in 4K HDR where the upstream feed supplies it, otherwise crisp Full-HD across multi-device - see <Link href="/live-matches" className="text-[#00E5FF] hover:underline">today's live matches</Link> for what's on right now.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            Region-specific coverage tunes the channel mix for your audience: dedicated landings for <Link href="/iptv-usa" className="text-[#00E5FF] hover:underline">IPTV USA</Link> (American football, US pro basketball, US pro baseball, all major US free-to-air and sports networks), <Link href="/iptv-uk" className="text-[#00E5FF] hover:underline">IPTV UK</Link> (UK football, premium UK sports tier, all major UK free-to-air networks), <Link href="/iptv-canada" className="text-[#00E5FF] hover:underline">IPTV Canada</Link> (North American pro hockey, all major Canadian sports and free-to-air networks), <Link href="/iptv-germany" className="text-[#00E5FF] hover:underline">IPTV Deutschland</Link> (top-tier German football, premium German sports tier, all major German free-to-air networks) and <Link href="/iptv-netherlands" className="text-[#00E5FF] hover:underline">IPTV Nederland</Link> (top-tier Dutch football, premium Dutch sports tier, all major Dutch free-to-air networks).
          </p>

          <p className="text-gray-300 text-lg leading-relaxed text-center pt-6">
            Join thousands of subscribers across 5 countries who have already replaced cable with the best IPTV streaming service of 2026.{' '}
            <Link href="/trial" className="text-[#00E5FF] hover:underline font-bold">Start your free trial</Link>
            {' · '}
            <Link href="/iptv-shop" className="text-[#00E5FF] hover:underline font-bold">View IPTV subscription plans</Link>
          </p>
        </div>
      </section>

      {/* Latest IPTV Guides - server rendered so Google crawls internal links */}
      <section className="bg-[#000d20] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            Latest IPTV Guides &amp; Streaming Tips
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestPosts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="block bg-[#001f3f] rounded-xl p-6 hover:bg-[#2a2f33] transition-colors"
              >
                <span className="text-xs text-[#00df82] font-semibold uppercase tracking-wide">{post.category}</span>
                <h3 className="text-white font-bold mt-2 mb-3 leading-snug">{post.title}</h3>
                <p className="text-gray-400 text-sm">{post.date} · {post.readTime}</p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/blog" className="text-[#00df82] font-semibold hover:underline">
              View all guides →
            </Link>
          </div>
        </div>
      </section>
    </>
  )

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Product",
                "name": "ORCA 4K TV Premium IPTV Subscription",
                "description": "Get instant access to 22,000+ live TV channels, 4K movies, and global sports.",
                "image": "https://orca4ktv.com/og-image.jpg",
                "brand": { "@type": "Brand", "name": "ORCA 4K TV" },
                "category": "Best IPTV · Smart TV · Watch TV online",
                "offers": {
                  "@type": "Offer",
                  "url": "https://orca4ktv.com/#pricing",
                  "priceCurrency": "USD",
                  "price": "14.99",
                  "availability": "https://schema.org/InStock"
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "502",
                  "bestRating": "5",
                  "worstRating": "1"
                },
                "review": [
                  {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "James R." },
                    "datePublished": "2026-03-15",
                    "reviewBody": "Best IPTV service I've used. Absolutely zero buffering during the European football finals night, even in 4K. Setup took less than 5 minutes on my Firestick.",
                    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
                  },
                  {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Sarah M." },
                    "datePublished": "2026-02-28",
                    "reviewBody": "Switched from another provider and the difference is night and day. 22,000+ channels, crystal clear picture, and their support team actually responds.",
                    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
                  },
                  {
                    "@type": "Review",
                    "author": { "@type": "Person", "name": "Mike T." },
                    "datePublished": "2026-04-01",
                    "reviewBody": "Great service overall. The 4K sports streams are incredible. Would love more South American football coverage but everything else is perfect.",
                    "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5" }
                  }
                ]
              }
            ]
          })
        }}
      />
      <Hero />

      <Suspense fallback={<div className="h-10" />}>
        <HomePageClient belowDevices={belowDevices} />
      </Suspense>
    </>
  )
}
