import type { Metadata } from 'next'
import ResellersPage from '@/page-components/ResellersPage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'IPTV Reseller Program 2026 — 50%+ Margins | ORCA 4K TV',
  description: 'Become a profitable IPTV reseller with white-label dealer panel, credit-based provisioning, instant activation. 22,000+ channels in 4K HDR. 78–86% margins.',
  keywords: 'iptv reseller, iptv reseller program, iptv reseller panel, become iptv reseller, white label iptv, iptv dealer, iptv dealer panel, iptv credits, iptv credit panel, sub-reseller iptv, iptv distribution, iptv wholesale, iptv b2b, iptv affiliate, iptv reseller api, m3u reseller, xtream codes reseller, iptv business opportunity, profitable iptv reseller, iptv reseller usa, iptv reseller uk, iptv reseller canada, iptv reseller europe, 4K HDR streaming, 22000 channels iptv, iptv reseller margins, iptv reseller training, iptv white-label panel, iptv subscription reseller, instant activation, multi-device iptv, AES-256 encryption, 24/7 priority support, anti freeze cdn, iptv 2026',
  alternates: {
    canonical: 'https://orca4ktv.com/resellers',
    languages: {
      'en-US': 'https://orca4ktv.com/resellers',
      'x-default': 'https://orca4ktv.com/resellers',
    },
  },
  openGraph: {
    title: 'IPTV Reseller Program 2026 — 50%+ Margins | ORCA 4K TV',
    description: 'White-label IPTV dealer panel, credit-based provisioning, 22,000+ channels in 4K HDR, sub-reseller hierarchy. 78–86% margins.',
    type: 'website',
    url: 'https://orca4ktv.com/resellers',
    images: [{ url: 'https://orca4ktv.com/images/resellers-hero.png', width: 1536, height: 1024 }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPTV Reseller Program 2026 — White-Label IPTV Panel',
    description: 'Become a profitable IPTV reseller. White-label dealer panel, credit-based provisioning, 22,000+ channels in 4K HDR, 78–86% margins. From $400.',
  },
}

const resellerFaqs = [
  {
    q: 'What is the ORCA 4K TV IPTV Reseller Program?',
    a: 'The ORCA 4K TV Reseller Program is a wholesale, white-label IPTV partnership for dealers, distributors, and B2B operators. You purchase bulk credits (each credit ≈ 1 month of single-connection IPTV service), then provision subscriptions for your own clients through our dedicated reseller panel. You set retail pricing, you keep 78–86% margins, and we run the infrastructure (22,000+ channels, Anti Freeze CDN, AES-256, 24/7 dealer support).',
  },
  {
    q: 'How does credit-based provisioning work?',
    a: 'Each credit unlocks 1 month of single-connection IPTV service. Longer durations and multi-connection plans cost proportional credits. Spend credits inside your reseller panel and the system auto-issues an M3U URL plus Xtream codes within 60 seconds.',
  },
  {
    q: 'Can I create sub-resellers and set tiered pricing for them?',
    a: 'Yes. The ORCA 4K TV reseller panel supports a full sub-reseller hierarchy. You allocate credits to each sub-reseller, set their per-credit retail price, and they manage their own customer base while you collect the wholesale margin.',
  },
  {
    q: 'What technical setup is required to start reselling?',
    a: 'None on your end. The reseller panel is a hosted web app. Customers receive M3U URLs and Xtream codes that work with TiviMate, IPTV Smarters Pro, OTT Navigator, Smart IPTV, and every major IPTV player on Firestick, Apple TV, Android TV, Smart TV, iOS, and Android.',
  },
  {
    q: 'How fast is customer activation after I create an account?',
    a: 'Under 60 seconds. The moment you spend a credit, the panel issues credentials, your customer logs into their player, and they are streaming live in 4K HDR.',
  },
  {
    q: 'Do you support white-labeling — can my clients see my brand?',
    a: 'Yes. M3U URLs and Xtream credentials are anonymous from the customer perspective — they never see ORCA 4K TV branding in their player. You email credentials under your own brand, your own support email, and your own pricing.',
  },
  {
    q: 'Are there sales quotas, contracts, or recurring fees?',
    a: 'None. You buy credits when you need them — no monthly commitment, no minimum sales, no contract, no recurring panel fee. Restock anytime, cancel by simply not restocking.',
  },
  {
    q: 'What payment methods are accepted for restocking credits?',
    a: 'Credit / debit card, PayPal, Apple Pay, Google Pay, USDT (TRC-20 / ERC-20) and other major cryptocurrencies, and bank wire for large enterprise restocks.',
  },
]

export default function ResellersListPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/' },
          { name: 'IPTV Reseller Program', url: 'https://orca4ktv.com/resellers' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Service',
                '@id': 'https://orca4ktv.com/resellers#service',
                name: 'ORCA 4K TV IPTV Reseller Program',
                serviceType: 'IPTV Reseller / White-Label IPTV Distribution',
                provider: { '@id': 'https://orca4ktv.com/#organization' },
                areaServed: { '@type': 'Place', name: 'Worldwide' },
                audience: {
                  '@type': 'BusinessAudience',
                  audienceType: 'IPTV resellers, IPTV dealers, B2B IPTV distributors, sub-resellers, IPTV affiliate partners',
                },
                availableLanguage: ['English'],
                hoursAvailable: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '00:00',
                  closes: '23:59',
                },
                description:
                  'Wholesale, white-label IPTV reseller program for dealers and B2B distributors. Credit-based provisioning, instant M3U + Xtream codes activation, sub-reseller hierarchy, 22,000+ live channels in 4K HDR, 100,000+ on-demand titles, multi-device delivery (Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, iOS, Android), AES-256 encryption, Anti Freeze CDN, 24/7 priority dealer support. 78–86% margins. From $400 / 120 credits.',
              },
              {
                '@type': 'Product',
                '@id': 'https://orca4ktv.com/resellers#product',
                name: 'ORCA 4K TV IPTV Reseller Credit Packages',
                description:
                  'Bulk credit packages for the ORCA 4K TV white-label IPTV reseller panel. Each credit = 1 month of single-connection IPTV service. Provision M3U URLs and Xtream codes instantly. Resell at $15–$20/month for 78–86% margins.',
                image: 'https://orca4ktv.com/images/resellers-hero.png',
                brand: { '@type': 'Brand', name: 'ORCA 4K TV' },
                category: 'IPTV Reseller / Wholesale IPTV',
                offers: [
                  {
                    '@type': 'Offer',
                    name: '120 Credits — Starter Reseller Package',
                    url: 'https://orca4ktv.com/resellers#pricing',
                    priceCurrency: 'USD',
                    price: '400.00',
                    priceValidUntil: '2026-12-31',
                    availability: 'https://schema.org/InStock',
                    eligibleQuantity: { '@type': 'QuantitativeValue', value: 120, unitText: 'credits' },
                  },
                  {
                    '@type': 'Offer',
                    name: '240 Credits — Best-Sell Reseller Package',
                    url: 'https://orca4ktv.com/resellers#pricing',
                    priceCurrency: 'USD',
                    price: '700.00',
                    priceValidUntil: '2026-12-31',
                    availability: 'https://schema.org/InStock',
                    eligibleQuantity: { '@type': 'QuantitativeValue', value: 240, unitText: 'credits' },
                  },
                  {
                    '@type': 'Offer',
                    name: '500 Credits — Volume Reseller Package',
                    url: 'https://orca4ktv.com/resellers#pricing',
                    priceCurrency: 'USD',
                    price: '1050.00',
                    priceValidUntil: '2026-12-31',
                    availability: 'https://schema.org/InStock',
                    eligibleQuantity: { '@type': 'QuantitativeValue', value: 500, unitText: 'credits' },
                  },
                ],
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  reviewCount: '312',
                  bestRating: '5',
                  worstRating: '1',
                },
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://orca4ktv.com/resellers#faq',
                mainEntity: resellerFaqs.map((f) => ({
                  '@type': 'Question',
                  name: f.q,
                  acceptedAnswer: { '@type': 'Answer', text: f.a },
                })),
              },
            ],
          }),
        }}
      />
      <ResellersPage />
    </>
  )
}
