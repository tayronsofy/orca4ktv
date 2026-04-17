import type { Metadata } from 'next'
import Link from 'next/link'
import { SHOP_PLANS } from '@/data/shopPlans'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'IPTV Shop - Buy IPTV Subscription 2026',
  description: 'Buy the best IPTV subscription in 2026. Plans from 1–12 months — 22,000+ channels, 4K sports & movies, buffer-free streaming. Instant activation. No contract.',
  keywords: 'buy iptv subscription, iptv shop, iptv plans 2026, best iptv subscription, iptv pricing, 4k iptv buy, iptv monthly quarterly annual plan',
  alternates: { canonical: 'https://smart4k.io/iptv-shop' },
  openGraph: {
    title: 'IPTV Shop - Buy IPTV Subscription 2026',
    description: 'Buy the best IPTV subscription in 2026. 22,000+ channels, 4K sports & movies from $7.92/mo. Instant activation.',
    type: 'website',
    url: 'https://smart4k.io/iptv-shop',
    images: [{ url: 'https://smart4k.io/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function IPTVShopPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'BreadcrumbList',
                itemListElement: [
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://smart4k.io/' },
                  { '@type': 'ListItem', position: 2, name: 'IPTV Shop', item: 'https://smart4k.io/iptv-shop' },
                ],
              },
              {
                '@type': 'ItemList',
                name: 'SMART 4K IPTV Subscription Plans',
                description: 'Choose from 1, 3, 6 or 12-month premium IPTV subscriptions.',
                numberOfItems: SHOP_PLANS.length,
                itemListElement: SHOP_PLANS.map((plan, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  url: `https://smart4k.io/iptv-shop/${plan.slug}`,
                  name: plan.name,
                })),
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Which IPTV plan should I choose?',
                    acceptedAnswer: { '@type': 'Answer', text: 'If you want to try the service first, start with the 1-month plan. For the best value, the 12-month plan at $7.92/month saves you 62%. The 3-month and 6-month plans offer a great middle ground with 30–45% savings.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'Do all plans include the same channels?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every plan — from 1 month to 12 months — includes the full library of 22,000+ live channels, the complete VOD library, EPG, catch-up TV, and 4K streaming. No features are locked behind higher tiers.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is there a free trial available?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Yes, SMART 4K offers a free trial so you can test stream quality, channel selection, and device compatibility before purchasing any plan.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'How many devices can I use simultaneously?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Each plan is available with 1, 2, 3, or 4 simultaneous connections. Choose the number of connections you need on the individual plan page at checkout.' },
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="relative bg-[#1f2326] pt-32 pb-16 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-gray-300 transition-colors">Home</Link>
            <span>/</span>
            <span className="text-gray-300 font-medium">IPTV Shop</span>
          </nav>

          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-purple-600/20 border border-purple-500/30 text-purple-400 text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
              Official Store
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              IPTV Shop —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Choose Your Plan
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
              Premium 4K IPTV with 22,000+ live channels, unlimited VOD & live sports.
              All plans include every feature — no hidden tiers, no contracts.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 mb-8">
              {['Instant Activation', 'No Contract', '99.9% Uptime', '24/7 Support', '4K Quality'].map(badge => (
                <span key={badge} className="flex items-center gap-1.5">
                  <i className="fas fa-check-circle text-purple-400 text-xs" />
                  {badge}
                </span>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex justify-center">
              <ShareButtons
                url="https://smart4k.io/iptv-shop"
                title="SMART 4K IPTV Shop - Best IPTV Plans 2026"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Plan Cards Grid */}
      <section className="bg-[#1f2326] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {SHOP_PLANS.map((plan) => (
              <article
                key={plan.slug}
                className={`relative flex flex-col rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden ${
                  plan.badge === 'BEST VALUE'
                    ? 'border-purple-500/60 bg-gradient-to-b from-purple-900/20 to-[#2c3034]'
                    : 'border-white/10 bg-[#2c3034] hover:border-purple-500/30'
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs font-black uppercase tracking-widest text-center py-2 px-4">
                    {plan.badge}
                  </div>
                )}

                <div className="p-6 flex flex-col flex-1">
                  {/* Plan Name */}
                  <h2 className="text-xl font-black text-white mb-1">{plan.shortName}</h2>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-5">IPTV Subscription</p>

                  {/* Price */}
                  <div className="mb-2">
                    <div className="flex items-end gap-1">
                      <span className="text-4xl font-black text-white">${plan.basePrice.toFixed(0)}</span>
                      <span className="text-gray-400 text-sm mb-1.5">/{plan.months === 1 ? 'mo' : `${plan.months} mo`}</span>
                    </div>
                    {plan.months > 1 && (
                      <p className="text-purple-400 text-sm font-bold">
                        ${plan.monthlyEquivalent.toFixed(2)}/month
                      </p>
                    )}
                  </div>

                  {/* Savings Pill */}
                  {plan.savings ? (
                    <span className="inline-block bg-green-500/15 border border-green-500/30 text-green-400 text-xs font-black uppercase px-3 py-1 rounded-full mb-5 self-start">
                      {plan.savings}
                    </span>
                  ) : (
                    <span className="inline-block bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold px-3 py-1 rounded-full mb-5 self-start">
                      No Commitment
                    </span>
                  )}

                  {/* Top Features */}
                  <ul className="space-y-2 mb-6 flex-1">
                    {plan.features.slice(0, 6).map(f => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                        <i className="fas fa-check text-purple-400 mt-0.5 flex-shrink-0 text-xs" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {/* Star Rating */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map(star => (
                        <i
                          key={star}
                          className={`fas fa-star text-xs ${star <= Math.round(plan.ratingValue) ? 'text-yellow-400' : 'text-gray-600'}`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400 text-xs">{plan.ratingValue} ({plan.reviewCount.toLocaleString()} reviews)</span>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/iptv-shop/${plan.slug}`}
                    className={`block text-center py-3 px-6 rounded-full font-black text-sm uppercase tracking-widest transition-all duration-200 hover:scale-105 ${
                      plan.badge === 'BEST VALUE'
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/30'
                        : 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    View {plan.shortName} Plan →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Free Trial Banner */}
          <div className="mt-10 text-center p-6 rounded-2xl border border-dashed border-purple-500/30 bg-purple-600/5">
            <p className="text-gray-400 text-sm">
              Not sure yet?{' '}
              <Link href="/trial" className="text-purple-400 font-bold hover:text-purple-300 underline underline-offset-2">
                Start a free trial
              </Link>{' '}
              and test the full service before buying.
            </p>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-[#1a1d20] py-14 px-4 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: 'fa-tv', value: '22,000+', label: 'Live Channels' },
              { icon: 'fa-film', value: '100,000+', label: 'Movies & Series' },
              { icon: 'fa-bolt', value: '99.9%', label: 'Uptime SLA' },
              { icon: 'fa-headset', value: '24/7', label: 'Customer Support' },
            ].map(stat => (
              <div key={stat.label} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 rounded-full bg-purple-600/15 border border-purple-500/20 flex items-center justify-center mb-1">
                  <i className={`fas ${stat.icon} text-purple-400`} />
                </div>
                <span className="text-2xl font-black text-white">{stat.value}</span>
                <span className="text-gray-500 text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="bg-[#1f2326] py-16 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Buy the Best IPTV Subscription in 2026
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              SMART 4K is the leading premium IPTV service in 2026, offering four flexible subscription plans
              to suit every viewer and every budget. Whether you are looking to try IPTV for the first time
              with a no-commitment monthly plan, or lock in the lowest price with an annual subscription,
              every plan gives you access to the exact same world-class content library.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-black text-white mb-3">What Every Plan Includes</h3>
              <p className="text-gray-400 leading-relaxed">
                All SMART 4K IPTV plans include over 22,000 live TV channels spanning entertainment,
                news, sports, and international programming. Every subscriber gets access to our full
                Video on Demand library with over 100,000 movies and TV series, a real-time Electronic
                Programme Guide (EPG), catch-up TV for up to 7 days, and crystal-clear 4K Ultra-HD
                streaming with our proprietary buffer-free technology.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-black text-white mb-3">Compatible With Every Device</h3>
              <p className="text-gray-400 leading-relaxed">
                SMART 4K works on every major device: Amazon Firestick, Android TV boxes, Samsung and LG
                Smart TVs, Apple TV, iOS and Android smartphones, MAG boxes, Formuler boxes, and any
                Windows or Mac computer. Use it with popular IPTV players including TiviMate, IPTV
                Smarters Pro, GSE Smart IPTV, and more — setup takes under 5 minutes.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-black text-white mb-3 text-center">Which Plan Is Right for You?</h3>
            <p className="text-gray-400 leading-relaxed text-center">
              New to IPTV? Start with the <strong className="text-white">1-month plan</strong> at $21
              — no risk, cancel anytime. Want to save money without a long commitment?
              The <strong className="text-white">3-month plan</strong> cuts your cost by 30%.
              For the best balance of price and flexibility, the <strong className="text-white">6-month plan</strong> saves
              you 45%. And for maximum value, the <strong className="text-white">12-month plan</strong> at just
              $7.92/month is the best IPTV deal available in 2026 — saving you over $150 compared to monthly billing.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#1a1d20] py-16 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Which IPTV plan should I choose?',
                a: 'If you want to test first, go with the 1-month plan. For the best value, the 12-month plan at $7.92/month saves you 62%. The 3-month and 6-month plans offer a great middle ground with 30–45% savings and no long-term commitment.',
              },
              {
                q: 'Do all plans include the same channels and features?',
                a: 'Yes. Every plan — 1, 3, 6 or 12 months — includes the full library of 22,000+ live channels, the complete VOD library, EPG, catch-up TV, and 4K streaming. There are no feature tiers — you get everything regardless of which plan you choose.',
              },
              {
                q: 'Is there a free trial before I purchase?',
                a: 'Yes. We offer a free trial so you can verify stream quality, channel selection, and device compatibility before spending a penny. Visit our free trial page to get started.',
              },
              {
                q: 'How many devices can I watch on at the same time?',
                a: 'Every plan is available with 1, 2, 3, or 4 simultaneous connections. You select the number of connections at checkout — perfect for individuals, couples, and families alike.',
              },
              {
                q: 'How quickly do I get access after paying?',
                a: 'Activation is instant. Once your payment is confirmed, your credentials are delivered to your email within minutes. You can be streaming within 5 minutes of purchase.',
              },
              {
                q: 'Do the plans auto-renew?',
                a: 'No. None of our plans auto-renew without your permission. When your subscription period ends, you simply choose whether to renew — there are no surprise charges.',
              },
            ].map((item) => (
              <div key={item.q} className="border border-white/10 rounded-xl bg-[#2c3034] overflow-hidden">
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
    </>
  )
}
