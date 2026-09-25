import type { Metadata } from 'next'
import { buildPageMetadata, codeDefaultsFrom } from '@/lib/seo/metadata'
import { Suspense } from 'react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import HomePageClient from '../HomePageClient'
import { getPublishedPosts } from '@/lib/posts'
import TrustFacts from '@/components/seo/TrustFacts'

const codeMetadata: Metadata = {
  title: 'IPTV Subscription Plans - 22,000+ Channels From $7.92/mo | ORCA 4K TV',
  description: 'Buy an ORCA 4K TV IPTV subscription: 1, 3, 6 or 12-month plans from $7.92/mo. 22,000+ live channels, 100,000+ movies in 4K HDR, up to 4 connections, instant activation and a money-back guarantee.',
  keywords: 'IPTV subscription, IPTV plans, buy IPTV, IPTV subscription plans, IPTV pricing, 4K IPTV subscription, IPTV 12 month plan, cheap IPTV subscription, IPTV connections, IPTV instant activation, IPTV money back guarantee, best IPTV service, premium IPTV channels, IPTV multi-device, IPTV Firestick, IPTV Smart TV',
  alternates: { canonical: 'https://orca4ktv.com/iptv' },
  openGraph: {
    title: 'IPTV Subscription Plans - 22,000+ Channels From $7.92/mo | ORCA 4K TV',
    description: 'ORCA 4K TV IPTV subscription plans: 1, 3, 6 or 12 months from $7.92/mo. 22,000+ live channels, 4K HDR, up to 4 connections, instant activation, money-back guarantee.',
    type: 'website',
    url: 'https://orca4ktv.com/iptv',
    images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPTV Subscription Plans From $7.92/mo | ORCA 4K TV',
    description: 'ORCA 4K TV IPTV plans: 1, 3, 6 or 12 months from $7.92/mo. 22,000+ channels in 4K HDR, up to 4 connections, instant activation, money-back guarantee.',
    images: ['https://orca4ktv.com/og-image.jpg'],
  },
}

// SEO overrides from /admin/seo — null DB fields fall back to codeMetadata
export async function generateMetadata(): Promise<Metadata> {
  const base = await buildPageMetadata('iptv', codeDefaultsFrom(codeMetadata))
  return { ...codeMetadata, ...base }
}

export const revalidate = 300

export default async function IptvPlansPage() {
  const latestPosts = (await getPublishedPosts()).slice(0, 6)

  const belowDevices = (
    <>
      <TrustFacts />

      {/* SEO Content Block - plans/pricing/subscription narrative, server rendered for crawlers */}
      <section className="bg-[#001f3f] py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-7 text-left md:text-left">
          <p className="text-center text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em]">
            IPTV Subscription Plans · 2026
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
            IPTV Subscription Plans - Pick a Length, Pay Once, Stream Everything
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            Every <strong className="text-white">ORCA 4K TV IPTV subscription</strong> unlocks the same complete library - <strong className="text-white">22,000+ live channels</strong> and <strong className="text-white">100,000+ movies and series</strong> in 4K HDR - so the only choice you make is how long you want to subscribe. Prices start at <strong className="text-white">$7.92/month</strong> on the <Link href="/iptv-shop/12-months" className="text-[#00E5FF] hover:underline font-bold">12-month plan</Link>, the best value tier, with shorter 1, 3 and 6-month options available. Compare them all on the <Link href="/iptv-shop" className="text-[#00E5FF] hover:underline font-bold">plans & pricing page</Link>.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-[#00E5FF]/15">
            Choose Your Subscription Length
          </h3>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><Link href="/iptv-shop/1-month" className="text-white font-bold hover:underline">1-Month plan</Link> - try the full service month to month</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><Link href="/iptv-shop/3-months" className="text-white font-bold hover:underline">3-Month plan</Link> - a full season of live sports covered</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><Link href="/iptv-shop/6-months" className="text-white font-bold hover:underline">6-Month plan</Link> - half-year value with a lower monthly rate</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><Link href="/iptv-shop/12-months" className="text-white font-bold hover:underline">12-Month plan</Link> - our best price at $7.92/mo</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-[#00E5FF]/15">
            What Every Plan Includes
          </h3>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">22,000+ live channels</strong> and 100,000+ on-demand titles</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">4K HDR streaming</strong> with HDR10+ and Dolby Vision on supported feeds</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">Up to 4 simultaneous connections</strong> for the whole household</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">Anti Freeze CDN</strong> for buffer-free playback on match nights</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">Full multi-device support</strong> - Firestick, Apple TV, Android, Smart TV, MAG</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">AES-256 encrypted</strong> access - VPN allowed, no throttling</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">Instant activation</strong> - live in under 5 minutes after checkout</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><strong className="text-white">24/7 support</strong> and a money-back guarantee</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-[#00E5FF]/15">
            How Your Subscription Activates
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Checkout takes under a minute. As soon as payment clears we provision your line and email your login instantly - no waiting, no manual approval. Load your credentials into your favourite player (see the <Link href="/setup-guide" className="text-[#00E5FF] hover:underline">device setup guides</Link>) and you are streaming in under five minutes. Not sure yet? Spin up a <Link href="/trial" className="text-[#00E5FF] hover:underline font-bold">free trial</Link> first, browse the full <Link href="/channels" className="text-[#00E5FF] hover:underline">channel list</Link>, or check <Link href="/iptv-shop" className="text-[#00E5FF] hover:underline">device compatibility</Link> before you buy. Every purchase is covered by our <Link href="/refund-policy" className="text-[#00E5FF] hover:underline">money-back guarantee</Link>.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            Prefer to buy in bulk or for a business? Our <Link href="/resellers" className="text-[#00E5FF] hover:underline">reseller program</Link> offers wholesale credits and a management panel. Every plan and every reseller line runs on the same infrastructure, encrypted end-to-end with <Link href="/security" className="text-[#00E5FF] hover:underline">AES-256</Link>.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed text-center pt-6">
            Ready to subscribe?{' '}
            <Link href="/iptv-shop" className="text-[#00E5FF] hover:underline font-bold">Compare all plans</Link>
            {' · '}
            <Link href="/trial" className="text-[#00E5FF] hover:underline font-bold">Start a free trial</Link>
          </p>
        </div>
      </section>

      {/* Latest IPTV Guides - server rendered so Google crawls internal links */}
      <section className="bg-[#000d20] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            IPTV Setup &amp; Subscription Guides
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
                  "url": "https://orca4ktv.com/iptv#pricing",
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
      <Hero
        eyebrow="IPTV Subscription Plans · 2026"
        titleTop="IPTV SUBSCRIPTION"
        titleBottom="PLANS & PRICING"
        subtitle="22,000+ Live Channels in 4K HDR From $7.92/mo - Up to 4 Connections, Instant Activation"
        description="Choose a 1, 3, 6 or 12-month ORCA 4K TV subscription and unlock the full library the moment you check out. Every plan includes 22,000+ live channels, 100,000+ movies, Anti Freeze CDN, AES-256 security and a money-back guarantee. Instant activation, no contracts, cancel anytime."
      />

      <Suspense fallback={<div className="h-10" />}>
        <HomePageClient belowDevices={belowDevices} />
      </Suspense>
    </>
  )
}
