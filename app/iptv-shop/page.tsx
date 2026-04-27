import type { Metadata } from 'next'
import Link from 'next/link'
import { SHOP_PLANS } from '@/data/shopPlans'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'IPTV Subscription Plans 2026 — From $7.92/mo | ORCA 4K TV',
  description: 'Premium IPTV plans from $7.92/month. 22,000+ channels in 4K HDR, 100,000+ on-demand, smart EPG, instant activation. No contract. Free trial included.',
  keywords: 'best iptv subscription 2026, iptv subscription plans, iptv plans 2026, buy iptv subscription, iptv shop, 4k iptv subscription, hd iptv service, premium iptv channels, premium iptv subscription, iptv streaming service, iptv service provider, smart EPG guide, electronic program guide, 7-day catch-up tv, iptv catch up, multi-device compatibility, multi-device iptv, iptv firestick 4k max, iptv apple tv 4k, iptv android tv 14, iptv smart tv samsung lg, instant activation, iptv instant start, rapid setup, fast iptv setup, buffer-free streaming, anti freeze cdn, secure streaming, AES-256 encryption, NIST FIPS 197, 24/7 customer support, iptv customer support, vpn allowed, iptv with vpn, no contract iptv, free iptv trial, iptv free trial, hdr10+, dolby vision, m3u url, xtream codes, tivimate compatible, iptv smarters pro, ott navigator, iptv subscription usa uk canada germany netherlands',
  alternates: {
    canonical: 'https://orca4ktv.com/iptv-shop',
    languages: {
      'en-US': 'https://orca4ktv.com/iptv-shop',
      'x-default': 'https://orca4ktv.com/iptv-shop',
    },
  },
  openGraph: {
    title: 'IPTV Subscription Plans 2026 — From $7.92/mo | ORCA 4K TV',
    description: 'IPTV plans from $7.92/mo. 22,000+ channels in 4K HDR, 100,000+ on-demand, smart EPG, multi-device, instant activation. No contract.',
    type: 'website',
    url: 'https://orca4ktv.com/iptv-shop',
    images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Best IPTV Subscription Plans 2026 — From $7.92/mo',
    description: '22,000+ channels in 4K HDR, 100,000+ VOD, smart EPG, multi-device, instant activation. No contract. Free IPTV trial included.',
  },
}

export default function IPTVShopPage() {
  // Compute price boundaries from actual SHOP_PLANS for the AggregateOffer
  const offerPrices = SHOP_PLANS.map((p) => p.basePrice)
  const lowPrice = Math.min(...offerPrices).toFixed(2)
  const highPrice = Math.max(...offerPrices).toFixed(2)

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
                  { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://orca4ktv.com/' },
                  { '@type': 'ListItem', position: 2, name: 'IPTV Shop', item: 'https://orca4ktv.com/iptv-shop' },
                ],
              },
              {
                '@type': 'Service',
                '@id': 'https://orca4ktv.com/iptv-shop#service',
                name: 'ORCA 4K TV Premium IPTV Subscription',
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
                description:
                  '22,000+ live channels in 4K HDR with HDR10+ and Dolby Vision, 100,000+ on-demand movies and series, smart EPG with 7-day catch-up TV, multi-device IPTV (Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, iOS, Android), AES-256 encryption (NIST FIPS 197), Anti Freeze CDN, instant M3U + Xtream codes activation, no contract, free trial. Premier League, NFL, NBA, NHL, MLB, Bundesliga, Eredivisie, F1 2026, Olympics Milano-Cortina, FIFA World Cup 2026.',
              },
              {
                '@type': 'Product',
                '@id': 'https://orca4ktv.com/iptv-shop#product',
                name: 'ORCA 4K TV IPTV Subscription Plans',
                description:
                  '1, 3, 6, and 12-month IPTV subscription plans with 22,000+ live channels in 4K HDR, 100,000+ on-demand titles, smart EPG, 7-day catch-up, multi-device support, instant activation, AES-256 encryption, and 24/7 customer support.',
                image: 'https://orca4ktv.com/og-image.jpg',
                brand: { '@type': 'Brand', name: 'ORCA 4K TV' },
                category: 'IPTV Subscription / Streaming Service',
                offers: {
                  '@type': 'AggregateOffer',
                  priceCurrency: 'USD',
                  lowPrice,
                  highPrice,
                  offerCount: SHOP_PLANS.length,
                  availability: 'https://schema.org/InStock',
                  priceValidUntil: '2026-12-31',
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  reviewCount: '1247',
                  bestRating: '5',
                  worstRating: '1',
                },
              },
              {
                '@type': 'ItemList',
                name: 'ORCA 4K TV IPTV Subscription Plans',
                description: 'Choose from 1, 3, 6 or 12-month premium IPTV subscriptions — every plan includes the same 22,000+ channels.',
                numberOfItems: SHOP_PLANS.length,
                itemListElement: SHOP_PLANS.map((plan, i) => ({
                  '@type': 'ListItem',
                  position: i + 1,
                  url: `https://orca4ktv.com/iptv-shop/${plan.slug}`,
                  name: plan.name,
                })),
              },
              {
                '@type': 'FAQPage',
                mainEntity: [
                  {
                    '@type': 'Question',
                    name: 'Which IPTV subscription plan should I choose in 2026?',
                    acceptedAnswer: { '@type': 'Answer', text: 'For first-time IPTV buyers, the 1-month plan ($21) is the lowest-risk way to test stream quality and channel coverage. For best value, the 12-month plan at $7.92/month saves 62% versus monthly billing. The 3-month plan saves 30% and the 6-month plan saves 45% — both great middle-ground choices with no long-term lock-in.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'Do all IPTV plans include the same 22,000+ channels and 4K HDR streaming?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Yes. Every ORCA 4K TV plan — 1, 3, 6, or 12 months — includes the full library of 22,000+ live channels, 100,000+ on-demand titles, smart EPG, 7-day catch-up TV, and 4K HDR streaming with HDR10+ and Dolby Vision. There are no feature tiers locked behind higher prices.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is there a free IPTV trial before I purchase a subscription?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Yes. ORCA 4K TV offers a free IPTV trial so you can test stream quality, channel selection, EPG accuracy, and device compatibility before paying. The trial unlocks the full 22,000-channel library at full 4K HDR quality, no credit card required.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'How many devices can I stream on simultaneously?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Every IPTV plan is available with 1, 2, 3, or 4 simultaneous connections. Choose the number you need at checkout — 1 connection for solo viewers, 2–4 for couples and families running multiple TVs, tablets, and phones at the same time.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'Which IPTV devices and apps are supported?',
                    acceptedAnswer: { '@type': 'Answer', text: 'All major streaming hardware: Firestick 4K Max, Amazon Fire TV Cube, Apple TV 4K (3rd gen), Android TV 14 boxes (Nvidia Shield, Onn 4K Pro, Chromecast with Google TV), Samsung Tizen, LG webOS, MAG-box, Formuler, plus iOS / iPadOS / Android phones and tablets, Windows / macOS / Linux computers, and any modern HTML5 browser. Compatible with TiviMate, IPTV Smarters Pro, OTT Navigator, GSE Smart IPTV, Smart IPTV, and Perfect Player.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'How fast is IPTV activation after I pay?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Activation is instant. Once your payment is confirmed, the M3U URL and Xtream codes (username, password, host) are auto-issued to your email within minutes. Most customers are streaming live in 4K HDR within 5 minutes of checkout.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'Do IPTV subscription plans auto-renew?',
                    acceptedAnswer: { '@type': 'Answer', text: 'No. ORCA 4K TV subscriptions never auto-renew without your explicit permission. When your subscription period ends, you choose whether to renew — there are no surprise charges, no recurring billing, no cancellation fees.' },
                  },
                  {
                    '@type': 'Question',
                    name: 'Is the IPTV stream encrypted? Does it work with a VPN?',
                    acceptedAnswer: { '@type': 'Answer', text: 'Yes to both. All streams use TLS 1.3 with AES-256 encryption (NIST FIPS 197 certified), so traffic shaping by ISPs is unreliable against ORCA 4K TV. VPNs are fully supported across every plan with no speed throttling — useful when traveling or on heavily congested networks.' },
                  },
                ],
              },
            ],
          }),
        }}
      />

      {/* Hero */}
      <section className="relative bg-[#001f3f] pt-32 pb-16 px-4 overflow-hidden">
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
              Official IPTV Store · 2026
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
              Best IPTV Subscription 2026 —{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                4K HDR · 22,000+ Channels
              </span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8">
              Premium IPTV subscription plans from <strong className="text-white">$7.92/month</strong>. 22,000+ live channels in 4K Ultra-HD with HDR10+ &amp; Dolby Vision, 100,000+ on-demand movies &amp; series, smart EPG with 7-day catch-up TV, every Premier League match, every NFL Sunday, every Bundesliga, every F1 2026 Grand Prix — buffer-free on Anti Freeze CDN.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-400 mb-8">
              {['Instant Activation', 'No Contract', '99.9% Uptime', '24/7 Support', '4K HDR Quality', 'AES-256 Encrypted'].map(badge => (
                <span key={badge} className="flex items-center gap-1.5">
                  <i className="fas fa-check-circle text-purple-400 text-xs" />
                  {badge}
                </span>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex justify-center">
              <ShareButtons
                url="https://orca4ktv.com/iptv-shop"
                title="ORCA 4K TV — Best IPTV Subscription Plans 2026"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Plan Cards Grid */}
      <section className="bg-[#001f3f] py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {SHOP_PLANS.map((plan) => (
              <article
                key={plan.slug}
                className={`relative flex flex-col rounded-2xl border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden ${
                  plan.badge === 'BEST VALUE'
                    ? 'border-purple-500/60 bg-gradient-to-b from-purple-900/20 to-[#002952]'
                    : 'border-white/10 bg-[#002952] hover:border-purple-500/30'
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
                Start a free IPTV trial
              </Link>{' '}
              and test the full 22,000-channel library in 4K HDR before buying — no credit card required.
            </p>
          </div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-[#001a36] py-14 px-4 border-y border-white/5">
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
      <section className="bg-[#001f3f] py-20 px-4">
        <div className="max-w-4xl mx-auto space-y-7">
          <p className="text-center text-purple-400 text-xs font-black uppercase tracking-[0.3em]">
            Best IPTV Subscription 2026 · The Cord-Cutter's Choice
          </p>

          <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
            Buy the Best IPTV Subscription in 2026 — 4K HDR, 22,000+ Channels, From $7.92/month
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            <strong className="text-white">ORCA 4K TV</strong> is the leading premium IPTV subscription service for 2026, delivering buffer-free 4K Ultra-HD streaming on every device for less than the cost of a single cable channel package. Replace Comcast, Spectrum, Verizon Fios, Xfinity, Sky, Virgin Media, BT, Vodafone, Telekom, Ziggo, KPN, Bell, and Rogers in one global IPTV subscription that ships <strong className="text-white">22,000+ live channels</strong>, <strong className="text-white">100,000+ on-demand movies and series</strong>, and a smart Electronic Programme Guide with 7-day catch-up TV — all behind <strong className="text-white">AES-256 encryption</strong> on our proprietary <strong className="text-white">Anti Freeze CDN</strong>. Plans start at $7.92/month on the 12-month tier.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-4 border-t border-purple-500/15">
            What every IPTV plan includes
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Every ORCA 4K TV IPTV subscription — 1 month, 3 months, 6 months, or 12 months — includes the same world-class content library and the same premium features. There are <strong className="text-white">no hidden tiers</strong> and no upsells. Every customer gets:
          </p>

          <ul className="grid md:grid-cols-2 gap-4 text-gray-300 text-base leading-relaxed">
            <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">22,000+ live channels</strong> across entertainment, news, sports, kids, and 30+ international languages</span></li>
            <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">100,000+ on-demand titles</strong> — Hollywood blockbusters, Apple TV+ originals, Prime Video, Netflix-style series</span></li>
            <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">Live sports:</strong> Premier League, NFL, NBA, NHL, MLB, MLS, NCAA, Bundesliga, La Liga, Serie A, Eredivisie, F1 2026, Olympics Milano-Cortina, FIFA World Cup 2026</span></li>
            <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">4K HDR streaming</strong> with HDR10+ and Dolby Vision on every channel that broadcasts in 4K</span></li>
            <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">Smart EPG</strong> with 7-day catch-up TV — never miss a match or episode again</span></li>
            <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">Multi-device IPTV:</strong> 1–4 simultaneous connections per plan — pick at checkout</span></li>
            <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">Anti Freeze CDN:</strong> regional edge servers in the US, UK, Canada, Frankfurt, and Amsterdam keep latency below 25 ms</span></li>
            <li className="flex gap-3"><span className="text-purple-400 font-black mt-0.5">▸</span><span><strong className="text-white">AES-256 encryption</strong> (NIST FIPS 197) on every stream — VPN-friendly, ISP-throttle resistant</span></li>
          </ul>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-purple-500/15">
            Compatible with every IPTV device and player
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            ORCA 4K TV ships M3U URLs and Xtream codes that work on every major streaming hardware and IPTV player: <strong className="text-white">Firestick 4K Max</strong>, Amazon Fire TV Cube, <strong className="text-white">Apple TV 4K (3rd gen)</strong>, <strong className="text-white">Android TV 14</strong> boxes (Nvidia Shield, Onn 4K Pro, Chromecast with Google TV), Samsung Tizen, LG webOS, MAG-box, Formuler, plus iOS / iPadOS / Android phones and tablets, Windows / macOS / Linux computers, and any modern HTML5 browser. The IPTV credentials are auto-compatible with <strong className="text-white">TiviMate</strong>, <strong className="text-white">IPTV Smarters Pro</strong>, <strong className="text-white">OTT Navigator</strong>, GSE Smart IPTV, Smart IPTV, and Perfect Player. Setup takes under 5 minutes — see the <Link href="/setup-guide" className="text-purple-400 hover:underline">step-by-step IPTV setup guide</Link> or the <Link href="/glossary" className="text-purple-400 hover:underline">IPTV glossary</Link> if any term is unfamiliar.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-purple-500/15">
            Which IPTV subscription plan is right for you?
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            New to IPTV? Start with the <strong className="text-white">1-month plan</strong> at $21 — no risk, cancel anytime, full library access. Want to save without a long lock-in? The <strong className="text-white">3-month plan</strong> cuts your monthly cost by 30%. For the best balance of price and flexibility, the <strong className="text-white">6-month plan</strong> saves 45%. And for maximum value, the <strong className="text-white">12-month IPTV plan</strong> at just <strong className="text-white">$7.92/month</strong> is the best IPTV deal in 2026 — saving you over $150 per year compared to monthly billing. Every plan is available in 1, 2, 3, or 4 simultaneous-connection tiers — pick the right number for your household at checkout.
          </p>

          <h3 className="text-2xl md:text-3xl font-black text-white pt-6 border-t border-purple-500/15">
            Free IPTV trial · Instant activation · No contract
          </h3>

          <p className="text-gray-300 text-lg leading-relaxed">
            Test before you buy. Our <Link href="/trial" className="text-purple-400 hover:underline font-bold">free IPTV trial</Link> unlocks the entire 22,000-channel library at full 4K HDR quality — no credit card required, instant activation, full multi-device support. After checkout, M3U URL and Xtream codes (username, password, host) are emailed within minutes. Most customers are streaming live in 4K HDR within 5 minutes of payment. No contracts, no auto-renewal surprises, no cancellation fees, no hidden costs. <Link href="/security" className="text-purple-400 hover:underline">AES-256 encrypted</Link>, VPN-friendly, ISP-throttle resistant, and protected by 24/7 customer support across English, Spanish, French, German, Italian, Portuguese, Dutch, and Arabic.
          </p>

          <p className="text-gray-300 text-lg leading-relaxed text-center pt-6">
            Join 1,200+ verified subscribers worldwide — from <Link href="/iptv-usa" className="text-purple-400 hover:underline">USA</Link>, <Link href="/iptv-uk" className="text-purple-400 hover:underline">UK</Link>, <Link href="/iptv-canada" className="text-purple-400 hover:underline">Canada</Link>, <Link href="/iptv-germany" className="text-purple-400 hover:underline">Germany</Link>, and <Link href="/iptv-netherlands" className="text-purple-400 hover:underline">Netherlands</Link> — who already switched to the best IPTV subscription in 2026.{' '}
            <Link href="/trial" className="text-purple-400 hover:underline font-bold">Start free trial</Link>
            {' · '}
            <a href="#top" className="text-purple-400 hover:underline font-bold">View IPTV plans</a>
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-[#001a36] py-16 px-4 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-white text-center mb-10">
            IPTV Subscription FAQ — 2026
          </h2>
          <div className="space-y-4">
            {[
              {
                q: 'Which IPTV subscription plan should I choose in 2026?',
                a: 'For first-time IPTV buyers, the 1-month plan at $21 is the lowest-risk way to test stream quality and channel coverage. For best value, the 12-month plan at $7.92/month saves 62% versus monthly billing. The 3-month plan saves 30% and the 6-month plan saves 45% — both great middle-ground choices with no long-term lock-in.',
              },
              {
                q: 'Do all IPTV plans include the same 22,000+ channels and 4K HDR streaming?',
                a: 'Yes. Every ORCA 4K TV plan — 1, 3, 6, or 12 months — includes the full library of 22,000+ live channels, 100,000+ on-demand titles, smart EPG, 7-day catch-up TV, and 4K HDR streaming with HDR10+ and Dolby Vision. There are no feature tiers locked behind higher prices.',
              },
              {
                q: 'Is there a free IPTV trial before I purchase a subscription?',
                a: 'Yes. ORCA 4K TV offers a free IPTV trial so you can test stream quality, channel selection, EPG accuracy, and device compatibility before paying. The trial unlocks the full 22,000-channel library at full 4K HDR quality, no credit card required.',
              },
              {
                q: 'How many devices can I stream on simultaneously?',
                a: 'Every IPTV plan is available with 1, 2, 3, or 4 simultaneous connections. Choose the number you need at checkout — 1 connection for solo viewers, 2–4 for couples and families running multiple TVs, tablets, and phones at the same time.',
              },
              {
                q: 'Which IPTV devices and apps are supported?',
                a: 'All major streaming hardware: Firestick 4K Max, Amazon Fire TV Cube, Apple TV 4K (3rd gen), Android TV 14 boxes (Nvidia Shield, Onn 4K Pro, Chromecast with Google TV), Samsung Tizen, LG webOS, MAG-box, Formuler, plus iOS / iPadOS / Android phones and tablets, Windows / macOS / Linux computers, and any modern HTML5 browser. Compatible with TiviMate, IPTV Smarters Pro, OTT Navigator, GSE Smart IPTV, Smart IPTV, and Perfect Player.',
              },
              {
                q: 'How fast is IPTV activation after I pay?',
                a: 'Activation is instant. Once your payment is confirmed, the M3U URL and Xtream codes (username, password, host) are auto-issued to your email within minutes. Most customers are streaming live in 4K HDR within 5 minutes of checkout.',
              },
              {
                q: 'Do IPTV subscription plans auto-renew?',
                a: 'No. ORCA 4K TV subscriptions never auto-renew without your explicit permission. When your subscription period ends, you choose whether to renew — there are no surprise charges, no recurring billing, no cancellation fees.',
              },
              {
                q: 'Is the IPTV stream encrypted? Does it work with a VPN?',
                a: 'Yes to both. All streams use TLS 1.3 with AES-256 encryption (NIST FIPS 197 certified), so traffic shaping by ISPs is unreliable against ORCA 4K TV. VPNs are fully supported across every plan with no speed throttling — useful when traveling or on heavily congested networks.',
              },
            ].map((item) => (
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
    </>
  )
}
