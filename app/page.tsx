import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import Hero from '@/components/Hero'
import HomePageClient from './HomePageClient'
import { getPublishedPosts } from '@/lib/posts'
import TrustFacts from '@/components/seo/TrustFacts'

export const metadata: Metadata = {
  title: 'ORCA 4K TV - Premium 4K IPTV Streaming Service',
  description: 'ORCA 4K TV is a premium 4K IPTV streaming brand: 22,000+ live channels, 100,000+ movies, Anti Freeze CDN and AES-256 security across USA, UK, Canada, Germany & Netherlands. Explore plans, regions, tools and a free trial.',
  keywords: 'ORCA 4K TV, IPTV streaming service, premium IPTV, 4K IPTV, IPTV brand, live TV streaming, IPTV USA, IPTV UK, IPTV Canada, IPTV Germany, IPTV Netherlands, IPTV tools, IPTV free trial, Anti Freeze CDN, AES-256 IPTV, multi-device IPTV, cord cutting',
  alternates: { canonical: 'https://orca4ktv.com/' },
  openGraph: {
    title: 'ORCA 4K TV - Premium 4K IPTV Streaming Service',
    description: 'The ORCA 4K TV brand home: 22,000+ live channels in 4K HDR, 100,000+ movies, Anti Freeze CDN, AES-256 security, and dedicated coverage across 5 countries. Explore plans, tools and a free trial.',
    type: 'website',
    url: 'https://orca4ktv.com/',
    images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ORCA 4K TV - Premium 4K IPTV Streaming Service',
    description: 'The ORCA 4K TV brand home: 22,000+ live channels in 4K HDR, Anti Freeze CDN, AES-256 security, coverage across 5 countries. Explore plans, tools and a free trial.',
    images: ['https://orca4ktv.com/og-image.jpg'],
  },
}

export default function HomePage() {
  const latestPosts = getPublishedPosts().slice(0, 6)

  const belowDevices = (
    <>
      <TrustFacts />

      {/* SEO Content Block - brand/overview narrative, server rendered for crawlers */}
      <section className="bg-[#001f3f] py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-7 text-left md:text-left">
          <p className="text-center text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em]">
            Welcome to ORCA 4K TV
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
            The Home of ORCA 4K TV - Premium 4K IPTV, Built for Every Screen
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">ORCA 4K TV</strong> is a premium <strong className="text-white">4K IPTV streaming brand</strong> trusted by thousands of households across five countries. This is our home base - the starting point for everything we offer: <strong className="text-white">22,000+ live channels</strong>, <strong className="text-white">100,000+ on-demand movies and series</strong>, region-tuned sports coverage, and an AI-powered concierge that finds exactly what you want to watch. Looking for pricing? Head straight to our <Link href="/iptv" className="text-[#00E5FF] hover:underline font-bold">IPTV subscription plans</Link>. Want to try before you buy? Start a <Link href="/trial" className="text-[#00E5FF] hover:underline font-bold">free trial</Link> in minutes.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed">
            Everything we build sits on the same foundation: our proprietary <strong className="text-white">Anti Freeze CDN</strong> for buffer-free playback even on peak match nights, end-to-end <strong className="text-white">AES-256 encryption</strong> (<Link href="/security" className="text-[#00E5FF] hover:underline">NIST FIPS 197</Link>), and true multi-device support on Firestick, Apple TV, Android TV, Samsung Tizen, LG webOS, MAG, iOS and Android. It is the same complete library on every screen in your home.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-[#00E5FF]/15">
            Explore the ORCA 4K TV Ecosystem
          </h3>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><Link href="/iptv" className="text-white font-bold hover:underline">Subscription plans</Link> - compare tiers and pricing from $7.92/mo</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><Link href="/trial" className="text-white font-bold hover:underline">Free IPTV trial</Link> - no credit card, instant activation</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><Link href="/channels" className="text-white font-bold hover:underline">Channel list</Link> - browse the full 22,000+ premium lineup</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><Link href="/live-matches" className="text-white font-bold hover:underline">Live matches</Link> - see what sport is on right now</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><Link href="/iptv-tools" className="text-white font-bold hover:underline">Free IPTV tools</Link> - M3U checker, EPG validator, speed test & more</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><Link href="/setup-guide" className="text-white font-bold hover:underline">Setup guides</Link> - up and running in under 5 minutes</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><Link href="/security" className="text-white font-bold hover:underline">Security & privacy</Link> - how AES-256 protects your stream</span></li>
            <li className="flex gap-3"><span className="text-[#00E5FF] font-black mt-0.5">▸</span><span><Link href="/blog" className="text-white font-bold hover:underline">Guides & blog</Link> - streaming tips, how-tos and news</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-[#00E5FF]/15">
            One Brand, Five Countries - Coverage Tuned to Where You Live
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            ORCA 4K TV runs dedicated, region-tuned experiences so the channel mix and sports coverage match your audience. Choose your country to see the lineup built for you: <Link href="/iptv-usa" className="text-[#00E5FF] hover:underline">IPTV USA</Link>, <Link href="/iptv-uk" className="text-[#00E5FF] hover:underline">IPTV UK</Link>, <Link href="/iptv-canada" className="text-[#00E5FF] hover:underline">IPTV Canada</Link>, <Link href="/iptv-germany" className="text-[#00E5FF] hover:underline">IPTV Deutschland</Link> and <Link href="/iptv-netherlands" className="text-[#00E5FF] hover:underline">IPTV Nederland</Link>. Each landing tunes the free-to-air networks, premium sports tiers and local leagues for that market, while every plan still unlocks the full global library.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-[#00E5FF]/15">
            Why Households Choose the ORCA 4K TV Brand
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Cable averaged <strong className="text-white">$120+ per month</strong> in 2025 for a rigid 200-channel package. ORCA 4K TV replaces that with 100× the channel count, 4K HDR on tap, no install fees and no contracts - all backed by <strong className="text-white">24/7 support</strong> with an average first reply under five minutes and a <Link href="/refund-policy" className="text-[#00E5FF] hover:underline">money-back guarantee</Link>. New to IPTV? Our <Link href="/glossary" className="text-[#00E5FF] hover:underline">glossary</Link> explains the terminology, and our <Link href="/about" className="text-[#00E5FF] hover:underline">about page</Link> tells the story behind the brand.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed text-center pt-6">
            Ready to get started with the best IPTV streaming brand of 2026?{' '}
            <Link href="/trial" className="text-[#00E5FF] hover:underline font-bold">Start your free trial</Link>
            {' · '}
            <Link href="/iptv" className="text-[#00E5FF] hover:underline font-bold">View subscription plans</Link>
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
      <Hero />

      <Suspense fallback={<div className="h-10" />}>
        <HomePageClient belowDevices={belowDevices} />
      </Suspense>
    </>
  )
}
