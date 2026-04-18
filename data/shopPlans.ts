export interface DeviceTier {
  devices: number
  label: string
  price: number
  monthlyEquivalent: number
  savings: string | null
  checkoutLink: string
}

export interface ShopReview {
  name: string
  location: string
  rating: number
  text: string
}

export interface ShopFAQ {
  q: string
  a: string
}

export interface ShopPlan {
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string
  badge: string | null
  months: number
  basePrice: number
  monthlyEquivalent: number
  savings: string | null
  deviceTiers: DeviceTier[]
  features: string[]
  highlights: string[]
  metaTitle: string
  metaDescription: string
  keywords: string
  faq: ShopFAQ[]
  reviews: ShopReview[]
  ratingValue: number
  reviewCount: number
}

export const SHOP_PLANS: ShopPlan[] = [
  {
    slug: '1-month',
    name: '1-Month IPTV Plan',
    shortName: '1 Month',
    tagline: 'Try SMART 4K Risk-Free — No Long-Term Commitment',
    description: 'The perfect entry point into premium IPTV. Stream 22,000+ live channels, 4K movies, and live sports for a full month — no contract, instant activation.',
    badge: null,
    months: 1,
    basePrice: 21.00,
    monthlyEquivalent: 21.00,
    savings: null,
    deviceTiers: [
      { devices: 1, label: '1 Connection', price: 21.00, monthlyEquivalent: 21.00, savings: null, checkoutLink: '/order?plan=1-month&connections=1' },
      { devices: 2, label: '2 Connections', price: 36.00, monthlyEquivalent: 36.00, savings: null, checkoutLink: '/order?plan=1-month&connections=2' },
      { devices: 3, label: '3 Connections', price: 49.00, monthlyEquivalent: 49.00, savings: null, checkoutLink: '/order?plan=1-month&connections=3' },
      { devices: 4, label: '4 Connections', price: 64.00, monthlyEquivalent: 64.00, savings: null, checkoutLink: '/order?plan=1-month&connections=4' },
    ],
    features: [
      '22,000+ Live TV Channels',
      '4K Ultra-HD & HD Streaming',
      'Massive VOD Library — Movies & Series',
      'Buffer-Free Streaming Technology',
      'Full EPG Electronic Programme Guide',
      'Catch-Up TV — Replay Up to 7 Days',
      '99.9% Uptime Guarantee',
      'Works on Firestick, Android, Smart TV, iOS',
      '24/7 Customer Support',
      'Instant Activation — No Waiting',
      'No Contract — Cancel Anytime',
      'International Channels — USA, UK, Canada & More',
    ],
    highlights: [
      'Instant access — no setup delays',
      'Test the full service before committing',
      'Cancel any time, zero cancellation fees',
    ],
    metaTitle: 'IPTV 1-Month Subscription - $21/mo',
    metaDescription: 'Try SMART 4K IPTV for 1 month — $21 only. Stream 22,000+ live channels, 4K sports & movies buffer-free on Firestick, Smart TV & mobile. No contract.',
    keywords: 'iptv 1 month subscription, monthly iptv plan, try iptv monthly, iptv no contract, cheap iptv monthly 2026, best iptv monthly plan',
    faq: [
      {
        q: 'What is included in the 1-month IPTV plan?',
        a: 'The 1-month plan gives you full access to 22,000+ live TV channels, a massive VOD library of movies and TV series, EPG, catch-up TV, and live sports in 4K quality. Every feature is included — there are no paywalled add-ons.',
      },
      {
        q: 'Can I cancel after one month?',
        a: 'Yes. The 1-month plan expires automatically after 30 days. There is no auto-renewal and no cancellation required — you simply choose whether to renew when your subscription ends.',
      },
      {
        q: 'How many devices can I use with the 1-month plan?',
        a: 'You can choose from 1 to 4 simultaneous connections. Select the option that fits your household. Each connection can be used on a different device at the same time.',
      },
      {
        q: 'How quickly will I receive my IPTV credentials?',
        a: 'Activation is immediate. As soon as your payment is confirmed, you will receive your login credentials by email, typically within a few minutes.',
      },
      {
        q: 'Which devices are compatible with this plan?',
        a: 'SMART 4K works on Amazon Firestick, Android TV boxes, Smart TVs (Samsung, LG), iOS and Android smartphones and tablets, MAG boxes, Apple TV, and any device running an IPTV player such as TiviMate, IPTV Smarters, or GSE Smart IPTV.',
      },
      {
        q: 'Is there a free trial before I buy?',
        a: 'Yes, we offer a free trial so you can experience the quality before committing. Visit our free trial page to get started at no cost.',
      },
    ],
    reviews: [
      { name: 'James T.', location: 'Houston, USA', rating: 5, text: 'Signed up just to test and ended up staying for months. Quality is insane, not a single buffer in 4 weeks.' },
      { name: 'Sophie M.', location: 'London, UK', rating: 5, text: 'Got it for the Premier League. Every match in 4K, zero issues. Will definitely be renewing.' },
      { name: 'Carlos R.', location: 'Toronto, Canada', rating: 4, text: 'Really solid for the price. Setup took less than 5 minutes on my Firestick. Good value to try.' },
    ],
    ratingValue: 4.8,
    reviewCount: 1243,
  },
  {
    slug: '3-months',
    name: '3-Month IPTV Plan',
    shortName: '3 Months',
    tagline: 'Save 30% — Premium IPTV for a Full Quarter',
    description: 'Enjoy three months of uninterrupted 4K IPTV at just $15/month. Perfect for subscribers who want real savings without a long-term commitment.',
    badge: 'SAVE 30%',
    months: 3,
    basePrice: 45.00,
    monthlyEquivalent: 15.00,
    savings: 'Save 30%',
    deviceTiers: [
      { devices: 1, label: '1 Connection', price: 45.00, monthlyEquivalent: 15.00, savings: 'Save 30%', checkoutLink: '/order?plan=3-months&connections=1' },
      { devices: 2, label: '2 Connections', price: 72.00, monthlyEquivalent: 24.00, savings: 'Save 30%', checkoutLink: '/order?plan=3-months&connections=2' },
      { devices: 3, label: '3 Connections', price: 99.00, monthlyEquivalent: 33.00, savings: 'Save 28%', checkoutLink: '/order?plan=3-months&connections=3' },
      { devices: 4, label: '4 Connections', price: 125.00, monthlyEquivalent: 41.66, savings: 'Save 28%', checkoutLink: '/order?plan=3-months&connections=4' },
    ],
    features: [
      '22,000+ Live TV Channels',
      '4K Ultra-HD & HD Streaming',
      'Massive VOD Library — Movies & Series',
      'Buffer-Free Streaming Technology',
      'Full EPG Electronic Programme Guide',
      'Catch-Up TV — Replay Up to 7 Days',
      '99.9% Uptime Guarantee',
      'Works on Firestick, Android, Smart TV, iOS',
      '24/7 Customer Support',
      'Instant Activation — No Waiting',
      'No Long-Term Contract',
      'International Channels — USA, UK, Canada & More',
    ],
    highlights: [
      '$15/month — 30% cheaper than the monthly plan',
      '90 days of uninterrupted 4K streaming',
      'Best option for seasonal or quarterly viewers',
    ],
    metaTitle: '3-Month IPTV Subscription - $45 (Save 30%)',
    metaDescription: 'Get 3 months of SMART 4K IPTV for $45 — just $15/mo. Save 30% vs monthly. 22,000+ channels, 4K sports & buffer-free streaming. Instant activation.',
    keywords: '3 month iptv subscription, iptv quarterly plan, iptv 3 months deal, cheap iptv 3 months 2026, iptv save 30 percent',
    faq: [
      {
        q: 'How much does the 3-month plan cost per month?',
        a: 'The 3-month plan costs $45 total, which works out to just $15 per month — a 30% saving compared to the monthly plan price of $21.',
      },
      {
        q: 'Does the 3-month subscription auto-renew?',
        a: 'No. Your subscription runs for exactly 90 days and then stops. You choose whether to renew manually — we will never charge you without your consent.',
      },
      {
        q: 'Can I upgrade to a longer plan later?',
        a: 'Yes. At any point you can upgrade to the 6-month or 12-month plan for greater savings. Contact our support team and we will apply any remaining credit to your new plan.',
      },
      {
        q: 'What happens if I have a technical issue during my 3 months?',
        a: 'Our 24/7 support team is available by live chat and email. We resolve most issues within minutes. Our 99.9% uptime SLA ensures maximum reliability throughout your subscription.',
      },
      {
        q: 'Is the content library updated during my subscription?',
        a: 'Yes. New channels, movies, and series are added continuously. Your 3-month subscription always reflects the latest content, sports fixtures, and channel additions.',
      },
    ],
    reviews: [
      { name: 'Marcus L.', location: 'Manchester, UK', rating: 5, text: 'Been using it for 2 months now. Every Champions League game in perfect 4K. Worth every penny of the 3-month deal.' },
      { name: 'Aisha N.', location: 'Chicago, USA', rating: 5, text: 'My whole family watches different things on different devices. The 3-month plan covers us all easily.' },
      { name: 'Luc D.', location: 'Brussels, Belgium', rating: 5, text: 'Great value. French, Belgian, and international channels all in one place. Setup was instant.' },
    ],
    ratingValue: 4.9,
    reviewCount: 2104,
  },
  {
    slug: '6-months',
    name: '6-Month IPTV Plan',
    shortName: '6 Months',
    tagline: 'Save 45% — The Smart Choice for Half a Year',
    description: 'Six months of world-class 4K IPTV at just $11.50/month. The ideal balance between savings and flexibility — enjoy two full sports seasons at a fraction of the cost.',
    badge: 'SAVE 45%',
    months: 6,
    basePrice: 69.00,
    monthlyEquivalent: 11.50,
    savings: 'Save 45%',
    deviceTiers: [
      { devices: 1, label: '1 Connection', price: 69.00, monthlyEquivalent: 11.50, savings: 'Save 45%', checkoutLink: '/order?plan=6-months&connections=1' },
      { devices: 2, label: '2 Connections', price: 110.00, monthlyEquivalent: 18.33, savings: 'Save 47%', checkoutLink: '/order?plan=6-months&connections=2' },
      { devices: 3, label: '3 Connections', price: 150.00, monthlyEquivalent: 25.00, savings: 'Save 46%', checkoutLink: '/order?plan=6-months&connections=3' },
      { devices: 4, label: '4 Connections', price: 190.00, monthlyEquivalent: 31.66, savings: 'Save 45%', checkoutLink: '/order?plan=6-months&connections=4' },
    ],
    features: [
      '22,000+ Live TV Channels',
      '4K Ultra-HD & HD Streaming',
      'Massive VOD Library — Movies & Series',
      'Buffer-Free Streaming Technology',
      'Full EPG Electronic Programme Guide',
      'Catch-Up TV — Replay Up to 7 Days',
      '99.9% Uptime Guarantee',
      'Works on Firestick, Android, Smart TV, iOS',
      '24/7 Customer Support',
      'Instant Activation — No Waiting',
      'No Long-Term Contract',
      'International Channels — USA, UK, Canada & More',
    ],
    highlights: [
      '$11.50/month — 45% cheaper than the monthly plan',
      'Cover two full football/basketball seasons',
      'Best balance of savings and flexibility',
    ],
    metaTitle: '6-Month IPTV Subscription - $69 (Save 45%)',
    metaDescription: 'Get 6 months of SMART 4K IPTV for $69 — just $11.50/mo. Save 45% vs monthly. 22,000+ channels, 4K sports, buffer-free. Cancel anytime. Instant access.',
    keywords: '6 month iptv subscription, iptv half year plan, iptv 6 months deal, cheap iptv 6 months 2026, iptv save 45 percent',
    faq: [
      {
        q: 'How much is the 6-month plan per month?',
        a: 'The 6-month plan is $69 total — just $11.50 per month, saving you 45% compared to paying month-by-month.',
      },
      {
        q: 'Can I watch live sports for a full sports season with this plan?',
        a: 'Absolutely. Six months covers full runs of major sports leagues including the NFL, Premier League, NBA, Serie A, Champions League, and many more. All sporting events stream in 4K where available.',
      },
      {
        q: 'What sports channels are included?',
        a: 'We include thousands of sports channels: Sky Sports, BT Sport, ESPN, beIN Sports, DAZN, Eurosport, NBC Sports, TNT Sports, and hundreds of regional sports networks. Every major live event is covered.',
      },
      {
        q: 'Will I lose access if I do not renew immediately?',
        a: 'Your subscription simply pauses after 180 days. Your account remains active and you can renew at any time to restore immediate access. There are no data losses or penalties for late renewal.',
      },
      {
        q: 'Is this plan suitable for a family?',
        a: 'Yes. Choose 2, 3, or 4 simultaneous connections to cover every member of your household. Each connection streams independently on any compatible device.',
      },
    ],
    reviews: [
      { name: 'David K.', location: 'Los Angeles, USA', rating: 5, text: 'Had it for 4 months now. Watched the entire NBA season in 4K. Phenomenal quality — better than any cable package I have ever had.' },
      { name: 'Elena P.', location: 'Amsterdam, Netherlands', rating: 5, text: 'Dutch, English, and Spanish channels all working perfectly. The 6-month price is unbeatable. Setup was 3 minutes on my Smart TV.' },
      { name: 'Ryan O.', location: 'Dublin, Ireland', rating: 5, text: 'Rugby World Cup, Champions League, Premier League — watched everything. Not one stream dropped. This is as good as IPTV gets.' },
    ],
    ratingValue: 4.9,
    reviewCount: 1876,
  },
  {
    slug: '12-months',
    name: '12-Month IPTV Plan',
    shortName: '12 Months',
    tagline: 'Best Value — Save 62% with the Ultimate Annual IPTV Plan',
    description: 'The best IPTV deal of 2026. Get a full year of premium 4K streaming at just $7.92/month — the lowest price in the market. Over 22,000 channels, unlimited VOD, and every live sport included.',
    badge: 'BEST VALUE',
    months: 12,
    basePrice: 95.00,
    monthlyEquivalent: 7.92,
    savings: 'Save 62%',
    deviceTiers: [
      { devices: 1, label: '1 Connection', price: 95.00, monthlyEquivalent: 7.92, savings: 'Save 62%', checkoutLink: '/order?plan=12-months&connections=1' },
      { devices: 2, label: '2 Connections', price: 152.00, monthlyEquivalent: 12.66, savings: 'Save 63%', checkoutLink: '/order?plan=12-months&connections=2' },
      { devices: 3, label: '3 Connections', price: 210.00, monthlyEquivalent: 17.50, savings: 'Save 62%', checkoutLink: '/order?plan=12-months&connections=3' },
      { devices: 4, label: '4 Connections', price: 260.00, monthlyEquivalent: 21.66, savings: 'Save 63%', checkoutLink: '/order?plan=12-months&connections=4' },
    ],
    features: [
      '22,000+ Live TV Channels',
      '4K Ultra-HD & HD Streaming',
      'Massive VOD Library — Movies & Series',
      'Buffer-Free Streaming Technology',
      'Full EPG Electronic Programme Guide',
      'Catch-Up TV — Replay Up to 7 Days',
      '99.9% Uptime Guarantee',
      'Works on Firestick, Android, Smart TV, iOS',
      '24/7 Priority Customer Support',
      'Instant Activation — No Waiting',
      'No Hidden Fees or Extra Charges',
      'International Channels — USA, UK, Canada & More',
    ],
    highlights: [
      '$7.92/month — the lowest IPTV price in 2026',
      'Save $157 compared to paying month-by-month',
      'Full year: every sport, every season, every event',
    ],
    metaTitle: '12-Month IPTV Subscription - $95/year (Save 62%)',
    metaDescription: 'Best IPTV annual plan 2026 — $95 for 12 months, just $7.92/mo. Save 62%. 22,000+ channels, 4K sports & movies buffer-free. #1 IPTV yearly deal. Buy now.',
    keywords: 'best iptv annual plan 2026, cheap iptv 12 months, iptv yearly subscription, iptv 12 month deal, annual iptv subscription, iptv save 62 percent, best iptv value',
    faq: [
      {
        q: 'Why is the 12-month plan the best value?',
        a: 'At $95 for a full year, you pay just $7.92 per month — saving $157 compared to renewing the monthly plan every month. It is the lowest per-month cost we offer and includes every feature without any restrictions.',
      },
      {
        q: 'What sports events are covered over the 12 months?',
        a: 'With a full year, you get coverage of the entire Premier League season, La Liga, Serie A, Bundesliga, Champions League, Europa League, NFL regular season and playoffs, NBA, MLB, NHL, UFC/MMA, Formula 1, boxing, tennis Grand Slams, cricket, rugby, and much more — all in 4K where available.',
      },
      {
        q: 'Is the 12-month plan a one-time payment?',
        a: 'Yes. You make a single payment of $95 (for 1 connection) and your subscription runs for 365 days. No recurring charges, no hidden fees, no auto-renewal without your consent.',
      },
      {
        q: 'Can I share the 12-month plan with my family?',
        a: 'Yes. Choose 2, 3, or 4 simultaneous connections at checkout. Multiple family members can watch different channels on different devices at the same time under one subscription.',
      },
      {
        q: 'What if the service does not work on my device?',
        a: 'Our 24/7 priority support team will help you set up on any device — Firestick, Smart TV, Android box, iOS, MAG, or PC. Setup typically takes under 5 minutes and our team is always available to guide you step by step.',
      },
      {
        q: 'Is there a money-back guarantee?',
        a: 'We offer a free trial so you can verify quality before purchasing. We recommend using the trial to confirm compatibility with your devices and network. Please refer to our refund policy for full details.',
      },
    ],
    reviews: [
      { name: 'Michael B.', location: 'New York, USA', rating: 5, text: 'Best investment I have made in streaming. $95 for a full year is insane value. Watched every NFL game, NBA playoff, and UFC PPV in 4K. Never going back to cable.' },
      { name: 'Priya S.', location: 'Birmingham, UK', rating: 5, text: 'Got the 4-connection plan for my whole family. My husband watches sports, I watch Bollywood, the kids have cartoons — all at the same time, zero buffering.' },
      { name: 'Pierre L.', location: 'Paris, France', rating: 5, text: 'French channels, beIN Sports, Canal+ equivalent — everything works. $7.92 a month is genuinely the best deal I have found anywhere in 2026.' },
    ],
    ratingValue: 4.9,
    reviewCount: 2847,
  },
]

export function getPlanBySlug(slug: string): ShopPlan | undefined {
  return SHOP_PLANS.find(p => p.slug === slug)
}
