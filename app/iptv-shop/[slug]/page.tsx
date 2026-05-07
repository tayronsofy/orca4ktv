import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { SHOP_PLANS, getPlanBySlug } from '@/data/shopPlans'
import ShareButtons from '@/components/ShareButtons'

export async function generateStaticParams() {
  return SHOP_PLANS.map(plan => ({ slug: plan.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const plan = getPlanBySlug(slug)
  if (!plan) return {}
  return {
    title: plan.metaTitle,
    description: plan.metaDescription,
    keywords: plan.keywords,
    alternates: { canonical: `https://orca4ktv.com/iptv-shop/${plan.slug}` },
    openGraph: {
      title: plan.metaTitle,
      description: plan.metaDescription,
      type: 'website',
      url: `https://orca4ktv.com/iptv-shop/${plan.slug}`,
      images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
    },
  }
}

export default async function PlanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const plan = getPlanBySlug(slug)
  if (!plan) notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orca4ktv.com/' },
          { '@type': 'ListItem', position: 2, name: 'IPTV Shop', item: 'https://orca4ktv.com/iptv-shop' },
          { '@type': 'ListItem', position: 3, name: plan.name, item: `https://orca4ktv.com/iptv-shop/${plan.slug}` },
        ],
      },
      {
        '@type': 'Service',
        '@id': `https://orca4ktv.com/iptv-shop/${plan.slug}#service`,
        name: `${plan.name} - Premium IPTV Subscription`,
        serviceType: 'Premium IPTV Streaming Subscription',
        provider: { '@id': 'https://orca4ktv.com/#organization' },
        areaServed: { '@type': 'Place', name: 'Worldwide' },
        audience: {
          '@type': 'Audience',
          audienceType: 'Cord-cutters, sports fans, premium streaming households, multi-device families',
        },
        availableLanguage: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 'Arabic'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '00:00',
          closes: '23:59',
        },
        description: `${plan.description} 22,000+ live channels in 4K HDR with HDR10+ and Dolby Vision, 100,000+ on-demand titles, smart EPG with 7-day catch-up TV, multi-device IPTV (Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, iOS, Android), AES-256 encryption, Anti Freeze CDN, instant M3U + Xtream codes activation.`,
      },
      {
        '@type': 'Product',
        '@id': `https://orca4ktv.com/iptv-shop/${plan.slug}#product`,
        name: plan.name,
        description: plan.description,
        brand: { '@type': 'Brand', name: 'ORCA 4K TV' },
        image: 'https://orca4ktv.com/og-image.jpg',
        url: `https://orca4ktv.com/iptv-shop/${plan.slug}`,
        category: 'IPTV Subscription / Streaming Service',
        offers: plan.deviceTiers.map(tier => ({
          '@type': 'Offer',
          name: `${plan.name} - ${tier.label}`,
          url: `https://orca4ktv.com${tier.checkoutLink}`,
          priceCurrency: 'USD',
          price: tier.price.toFixed(2),
          priceValidUntil: '2026-12-31',
          availability: 'https://schema.org/InStock',
          seller: { '@type': 'Organization', name: 'ORCA 4K TV' },
          eligibleQuantity: { '@type': 'QuantitativeValue', value: tier.devices, unitText: 'simultaneous connections' },
        })),
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: plan.ratingValue.toString(),
          reviewCount: plan.reviewCount.toString(),
          bestRating: '5',
          worstRating: '1',
        },
        review: plan.reviews.map(r => ({
          '@type': 'Review',
          author: { '@type': 'Person', name: r.name },
          reviewRating: { '@type': 'Rating', ratingValue: r.rating.toString(), bestRating: '5' },
          reviewBody: r.text,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: plan.faq.map(item => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  }

  const COMPATIBLE_DEVICES = [
    { icon: 'fa-fire', name: 'Amazon Firestick' },
    { icon: 'fa-android', name: 'Android TV' },
    { icon: 'fa-tv', name: 'Smart TV' },
    { icon: 'fa-apple', name: 'Apple TV / iOS' },
    { icon: 'fa-mobile-alt', name: 'Android Mobile' },
    { icon: 'fa-desktop', name: 'Windows / Mac' },
    { icon: 'fa-satellite-dish', name: 'MAG Box' },
    { icon: 'fa-gamepad', name: 'Formuler Box' },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="relative bg-[#001f3f] pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[350px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/iptv-shop" className="hover:text-gray-300 transition-colors">IPTV Shop</Link>
            <span>/</span>
            <span className="text-gray-300 font-medium">{plan.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Left: Plan Info */}
            <div className="flex-1">
              {plan.badge && (
                <span className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
                  {plan.badge}
                </span>
              )}
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                {plan.name} - Premium 4K IPTV
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed mb-6">{plan.description}</p>

              {/* Key Highlights */}
              <ul className="space-y-2 mb-8">
                {plan.highlights.map(h => (
                  <li key={h} className="flex items-center gap-3 text-gray-300">
                    <i className="fas fa-check-circle text-purple-400" />
                    <span className="font-medium">{h}</span>
                  </li>
                ))}
              </ul>

              {/* Star Rating */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <i
                      key={star}
                      className={`fas fa-star ${star <= Math.round(plan.ratingValue) ? 'text-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <span className="text-white font-black">{plan.ratingValue}</span>
                <span className="text-gray-400 text-sm">({plan.reviewCount.toLocaleString()} verified reviews)</span>
              </div>

              {/* Share Buttons */}
              <ShareButtons
                url={`https://orca4ktv.com/iptv-shop/${plan.slug}`}
                title={`ORCA 4K TV IPTV - ${plan.name}`}
              />
            </div>

            {/* Right: Price Card */}
            <div className="w-full lg:w-80 bg-[#002952] border border-white/10 rounded-2xl p-8 flex flex-col gap-5 shadow-2xl shadow-black/30">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Starting from</p>
                <div className="flex items-end gap-1.5">
                  <span className="text-5xl font-black text-white">${plan.basePrice.toFixed(0)}</span>
                  <span className="text-gray-400 mb-1.5">/{plan.months === 1 ? 'month' : `${plan.months} months`}</span>
                </div>
                {plan.months > 1 && (
                  <p className="text-purple-400 font-bold mt-1">${plan.monthlyEquivalent.toFixed(2)}/month</p>
                )}
                {plan.savings && (
                  <span className="inline-block bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-black uppercase px-3 py-1 rounded-full mt-2">
                    {plan.savings} vs monthly
                  </span>
                )}
              </div>

              <div className="border-t border-white/10 pt-4 space-y-2">
                <p className="text-xs text-gray-500 uppercase tracking-widest">For 1 connection</p>
                <Link
                  href={plan.deviceTiers[0].checkoutLink}
                  className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black py-4 rounded-xl uppercase tracking-wide transition-all hover:scale-105 shadow-lg shadow-purple-500/30"
                >
                  Buy Now - ${plan.basePrice.toFixed(0)}
                </Link>
                <Link
                  href="/trial"
                  className="block w-full text-center bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-bold py-3 rounded-xl text-sm transition-all"
                >
                  Try Free First
                </Link>
              </div>

              <div className="space-y-2">
                {['Instant Activation', 'No Auto-Renewal', 'No Hidden Fees', '24/7 Support Included'].map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-400">
                    <i className="fas fa-check text-purple-400 text-xs" />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Device Pricing Table */}
      <section className="bg-[#001a36] py-16 px-4 border-y border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-3">
            Choose Your IPTV Connections - 1, 2, 3 or 4 Simultaneous Streams
          </h2>
          <p className="text-gray-400 text-center mb-10">
            Watch on multiple devices simultaneously - one IPTV subscription, multiple screens. Perfect for families and multi-room households.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {plan.deviceTiers.map((tier) => (
              <div
                key={tier.devices}
                className={`relative flex flex-col rounded-2xl border p-6 text-center transition-all ${
                  tier.devices === 1
                    ? 'border-purple-500/50 bg-gradient-to-b from-purple-900/15 to-[#002952]'
                    : 'border-white/10 bg-[#002952]'
                }`}
              >
                <div className="w-12 h-12 rounded-full bg-purple-600/15 border border-purple-500/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-purple-400 font-black text-lg">{tier.devices}</span>
                </div>
                <p className="text-gray-400 text-xs uppercase tracking-widest mb-3">{tier.label}</p>
                <p className="text-3xl font-black text-white mb-1">${tier.price.toFixed(0)}</p>
                {plan.months > 1 && (
                  <p className="text-purple-400 text-sm font-bold mb-2">
                    ${tier.monthlyEquivalent.toFixed(2)}/mo
                  </p>
                )}
                {tier.savings && (
                  <span className="inline-block bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold px-2 py-0.5 rounded-full mb-4">
                    {tier.savings}
                  </span>
                )}
                {!tier.savings && <div className="mb-4" />}
                <Link
                  href={tier.checkoutLink}
                  className="block w-full text-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black py-3 rounded-xl text-sm uppercase tracking-wide transition-all hover:scale-105 mt-auto"
                >
                  Buy Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Features */}
      <section className="bg-[#001f3f] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            Everything Included in the{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {plan.shortName} Plan
            </span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {plan.features.map(feature => (
              <div
                key={feature}
                className="flex items-center gap-3 bg-[#002952] border border-white/5 rounded-xl px-5 py-4"
              >
                <div className="w-8 h-8 rounded-full bg-purple-600/15 flex items-center justify-center flex-shrink-0">
                  <i className="fas fa-check text-purple-400 text-xs" />
                </div>
                <span className="text-gray-200 text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compatible Devices */}
      <section className="bg-[#001a36] py-16 px-4 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-3">
            Compatible with Every IPTV Device - Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV
          </h2>
          <p className="text-gray-400 text-center mb-10">
            Stream on any screen - TV, phone, tablet or computer. Compatible with TiviMate, IPTV Smarters Pro, OTT Navigator. Setup takes under 5 minutes via M3U URL or Xtream codes.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {COMPATIBLE_DEVICES.map(device => (
              <div
                key={device.name}
                className="flex flex-col items-center gap-3 bg-[#002952] border border-white/5 rounded-xl py-6 px-4 text-center hover:border-purple-500/20 transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-purple-600/10 flex items-center justify-center">
                  <i className={`fab ${device.icon} text-purple-400 text-lg`} />
                </div>
                <span className="text-gray-300 text-sm font-medium">{device.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="bg-[#001f3f] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-3">
              What Our Customers Say
            </h2>
            <div className="flex items-center justify-center gap-3">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <i key={star} className="fas fa-star text-yellow-400" />
                ))}
              </div>
              <span className="text-white font-black text-xl">{plan.ratingValue}</span>
              <span className="text-gray-400">out of 5 - {plan.reviewCount.toLocaleString()} verified reviews</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plan.reviews.map((review) => (
              <div
                key={review.name}
                className="bg-[#002952] border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <i
                      key={star}
                      className={`fas fa-star text-sm ${star <= review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed italic">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-auto">
                  <p className="text-white font-bold text-sm">{review.name}</p>
                  <p className="text-gray-500 text-xs">{review.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#001a36] py-16 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            {plan.shortName} Plan - FAQ
          </h2>
          <div className="space-y-4">
            {plan.faq.map((item) => (
              <div key={item.q} className="border border-white/10 rounded-xl bg-[#002952] overflow-hidden">
                <details className="group">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                    <span className="font-bold text-white">{item.q}</span>
                    <i className="fas fa-chevron-down text-purple-400 text-sm transition-transform group-open:rotate-180 flex-shrink-0" />
                  </summary>
                  <div className="px-6 pb-5">
                    <p className="text-gray-400 leading-relaxed">{item.a}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[#001f3f] py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Ready to start streaming the best IPTV subscription in 2026?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Get instant access to 22,000+ live channels in 4K HDR with HDR10+ and Dolby Vision, 100,000+ on-demand movies and series, and every UK top-flight football · American football · US pro basketball · North American pro hockey · US pro baseball · German top-tier football · Dutch top-tier football · 2026 open-wheel motorsport match. Activate your {plan.shortName} plan with M3U URL + Xtream codes in under 5 minutes - buffer-free on Anti Freeze CDN, AES-256 encrypted, multi-device IPTV ready.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={plan.deviceTiers[0].checkoutLink}
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-black py-4 px-10 rounded-full uppercase tracking-wide transition-all hover:scale-105 shadow-xl shadow-purple-500/30 text-lg"
            >
              <i className="fas fa-bolt" />
              Buy {plan.shortName} - ${plan.basePrice.toFixed(0)}
            </Link>
            <Link
              href="/iptv-shop"
              className="inline-flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 font-bold py-4 px-8 rounded-full transition-all text-lg"
            >
              Compare All Plans
            </Link>
          </div>
          <p className="text-gray-500 text-sm mt-6">
            <i className="fas fa-shield-alt text-purple-400 mr-1.5" />
            Instant activation · No auto-renewal · 24/7 support
          </p>
        </div>
      </section>
    </>
  )
}
