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
    "slug": "1-month",
    "name": "1-Month IPTV Plan",
    "shortName": "1 Month",
    "tagline": "Our commitment-free monthly IPTV plan - cancel anytime.",
    "description": "Unlock premium IPTV for one month. Get instant access to 22,000+ channels, live sports, and 4K movies-all with no contract required.",
    "badge": null,
    "months": 1,
    "basePrice": 21,
    "monthlyEquivalent": 21,
    "savings": null,
    "deviceTiers": [
      {
        "devices": 1,
        "label": "1 Connection",
        "price": 21,
        "monthlyEquivalent": 21,
        "savings": null,
        "checkoutLink": "/order?plan=1-month&connections=1"
      },
      {
        "devices": 2,
        "label": "2 Connections",
        "price": 36,
        "monthlyEquivalent": 36,
        "savings": null,
        "checkoutLink": "/order?plan=1-month&connections=2"
      },
      {
        "devices": 3,
        "label": "3 Connections",
        "price": 49,
        "monthlyEquivalent": 49,
        "savings": null,
        "checkoutLink": "/order?plan=1-month&connections=3"
      },
      {
        "devices": 4,
        "label": "4 Connections",
        "price": 64,
        "monthlyEquivalent": 64,
        "savings": null,
        "checkoutLink": "/order?plan=1-month&connections=4"
      }
    ],
    "features": [
      "22,000+ live streaming channels",
      "Streams in 4K Ultra-HD & HD",
      "On-Demand Entertainment - Films & TV Shows",
      "Our Zero-Buffer Streaming Engine",
      "Comprehensive EPG TV Guide",
      "TV Rewind - Look back up to 7 days",
      "99.9% Reliable Server Uptime",
      "Stream on Firestick, Android, Smart TV, iOS",
      "Support available 24/7",
      "Service Activates Immediately",
      "Complete Control - Stop at Will",
      "Global Coverage: USA, UK, Canada, and Beyond"
    ],
    "highlights": [
      "Immediate activation - start streaming now",
      "Experience the complete package with no commitment",
      "Cancel on your terms, without penalty"
    ],
    "metaTitle": "Monthly IPTV Plan - Orca 4K TV Subscription",
    "metaDescription": "Best IPTV 1 month plan 2026 - only $21. Flexible monthly IPTV with 4K HDR movies & sports on Smart TV, Firestick, Apple TV, mobile. No contract.",
    "keywords": "iptv 1 month subscription, monthly iptv plan, iptv subscription monthly, best iptv monthly plan 2026, iptv monthly",
    "faq": [
      {
        "q": "What are the contents of the iptv 1 month subscription?",
        "a": "Your **iptv 1 month subscription** delivers complete access to our service, often called the **best iptv monthly plan 2026**. This **monthly iptv plan** includes 22,000+ live channels, a full VOD library, EPG, catch-up, and 4K sports. With this **iptv subscription monthly**, all features are unlocked-no extra fees for your **iptv monthly** service."
      },
      {
        "q": "Am I committed beyond a single month?",
        "a": "Yes. This plan deactivates automatically at the 30-day mark. No auto-renewal or cancellation process is involved. You have the freedom to purchase a new plan if you decide to continue with our service."
      },
      {
        "q": "How many simultaneous streams are included with the monthly plan?",
        "a": "Customize your plan with one to four connections for simultaneous viewing. Choose the right amount for your home's needs. Each stream can be active on an individual device at the same time."
      },
      {
        "q": "What is the delivery time for my IPTV login?",
        "a": "Upon successful payment confirmation, your activation occurs instantly. Expect an email containing your login credentials to arrive in just a few minutes."
      },
      {
        "q": "What hardware is supported by this subscription?",
        "a": "Our platform is compatible with an extensive range of hardware, including Amazon Firestick, Apple TV, MAG boxes, and Android TV. You can also stream on Smart TVs (Samsung, LG) or any iOS/Android device using players like TiviMate or GSE Smart IPTV."
      },
      {
        "q": "Do you offer a trial before I subscribe?",
        "a": "Absolutely. You can evaluate our stream quality with a complimentary trial before purchasing a plan. Navigate to our free trial page to activate your no-cost access."
      }
    ],
    "reviews": [
      {
        "name": "James T.",
        "location": "Houston, USA",
        "rating": 5,
        "text": "I came for a trial and never left. The picture is flawless; I went a full month without any buffering at all."
      },
      {
        "name": "Sophie M.",
        "location": "London, UK",
        "rating": 5,
        "text": "Subscribed for the top-tier UK football. The 4K quality is flawless on every match. I'm definitely renewing."
      },
      {
        "name": "Carlos R.",
        "location": "Toronto, Canada",
        "rating": 4,
        "text": "Impressive for the cost. I was streaming on my Firestick in under 5 minutes. Definitely worth a try."
      }
    ],
    "ratingValue": 4.8,
    "reviewCount": 1243
  },
  {
    "slug": "3-months",
    "name": "3-Month IPTV Plan",
    "shortName": "3 Months",
    "tagline": "Your premium quarterly IPTV plan, now 30% off.",
    "description": "Access 4K streaming for a full quarter at the equivalent of just $15 per month. This is the ideal `iptv subscription deal` for viewers who value flexibility and savings, offering our `best iptv quarterly 2026` value. This `3 month iptv subscription` is our most popular `iptv quarterly plan` for `iptv 3 months` of service.",
    "badge": "SAVE 30%",
    "months": 3,
    "basePrice": 45,
    "monthlyEquivalent": 15,
    "savings": "Save 30%",
    "deviceTiers": [
      {
        "devices": 1,
        "label": "1 Connection",
        "price": 45,
        "monthlyEquivalent": 15,
        "savings": "Save 30%",
        "checkoutLink": "/order?plan=3-months&connections=1"
      },
      {
        "devices": 2,
        "label": "2 Connections",
        "price": 72,
        "monthlyEquivalent": 24,
        "savings": "Save 30%",
        "checkoutLink": "/order?plan=3-months&connections=2"
      },
      {
        "devices": 3,
        "label": "3 Connections",
        "price": 99,
        "monthlyEquivalent": 33,
        "savings": "Save 28%",
        "checkoutLink": "/order?plan=3-months&connections=3"
      },
      {
        "devices": 4,
        "label": "4 Connections",
        "price": 125,
        "monthlyEquivalent": 41.66,
        "savings": "Save 28%",
        "checkoutLink": "/order?plan=3-months&connections=4"
      }
    ],
    "features": [
      "22,000+ channels streaming live",
      "Ultra-HD 4K & HD Video Quality",
      "Vast On-Demand Selection - Films & TV Shows",
      "Engineered for Seamless Streaming",
      "Comprehensive TV Guide (EPG)",
      "Rewind Up to 7 Days with TV Catch-Up",
      "Assured 99.9% Availability",
      "Supports Firestick, Android, Smart TV, iOS",
      "24/7 dedicated assistance",
      "Immediate Access - Zero Wait Time",
      "Freedom From Contracts",
      "Worldwide Programming - USA, UK, Canada & More"
    ],
    "highlights": [
      "Save 30% over the monthly rate, just $15/mo",
      "Your iptv quarterly plan for bufferless 4K",
      "Ideal for seasonal commitments or quarterly payments"
    ],
    "metaTitle": "IPTV Quarterly Plan - 30% Off | Orca 4K TV",
    "metaDescription": "Best IPTV 3 months plan 2026 - $45 ($15/mo, save 30%). 22,000+ channels in 4K HDR, sports, movies. Smart TV, Firestick, Apple TV.",
    "keywords": "3 month iptv subscription, iptv quarterly plan, iptv 3 months, best iptv quarterly 2026, iptv subscription deal",
    "faq": [
      {
        "q": "What is the per-month cost of the quarterly plan?",
        "a": "Our iptv quarterly plan is a $45 iptv subscription deal for 3 month iptv subscription access. You pay $15/mo, a 30% savings from the $21 plan, making it the best iptv quarterly 2026 value for iptv 3 months."
      },
      {
        "q": "No, your **3 month iptv subscription** is a one-time purchase and will not automatically renew. This **iptv quarterly plan** puts you in complete control of your billing. We will notify you via email before your access for **iptv 3 months** concludes, giving you the option to manually extend your service. This flexibility makes it the **best iptv quarterly 2026** for viewers who value control. We designed this **iptv subscription deal** to be transparent and free of hidden commitments.",
        "a": "Absolutely not. Your service lasts for precisely 90 days and expires automatically. Renewal is entirely up to you, and we will never bill you without your direct approval."
      },
      {
        "q": "What are my options for a longer term?",
        "a": "Absolutely. You can move to a 6-month or 12-month subscription at any point to unlock greater savings. Simply contact our support team, and they will apply your remaining prorated credit to the new plan."
      },
      {
        "q": "How do I get technical support during my 3 month iptv subscription?",
        "a": "Assistance is available around the clock through live chat and email. Most technical problems are addressed in minutes, and we guarantee 99.9% uptime for exceptional service stability during your subscription."
      },
      {
        "q": "Yes, our content library is in a constant state of evolution. Your **3 month iptv subscription** grants you access to a continuously expanding selection of on-demand movies and shows. The channel lineup is also refreshed automatically to maintain a premium experience throughout your **iptv 3 months** of service. This dedication to fresh programming makes our **iptv quarterly plan** a superior value and what we consider the **best iptv quarterly 2026** will offer. All updates are seamlessly integrated and are a core part of your **iptv subscription deal**.",
        "a": "Absolutely. We consistently expand our library with new movies, series, and channels. Your subscription ensures you always have access to the most current programming and live sporting events."
      }
    ],
    "reviews": [
      {
        "name": "Marcus L.",
        "location": "Manchester, UK",
        "rating": 5,
        "text": "I'm two months in, and the 4K quality for every top European club football match is stunning. This iptv quarterly plan is absolutely worth the price."
      },
      {
        "name": "Aisha N.",
        "location": "Chicago, USA",
        "rating": 5,
        "text": "With everyone in our house streaming different shows on various devices, this plan handles it all for us. A single subscription keeps the entire family covered."
      },
      {
        "name": "Luc D.",
        "location": "Brussels, Belgium",
        "rating": 5,
        "text": "My French, Belgian, and international programming was ready instantly. What a fantastic deal."
      }
    ],
    "ratingValue": 4.9,
    "reviewCount": 2104
  },
  {
    "slug": "6-months",
    "name": "6-Month IPTV Plan",
    "shortName": "6 Months",
    "tagline": "45% Off - Six Months of Uninterrupted Entertainment",
    "description": "Get 4K streaming for an effective $11.50/month with this **iptv half year plan**. This **6 month iptv subscription** is a leading **iptv subscription deal** and a contender for the **best iptv plan 2026**, offering the perfect balance to cover two full sports seasons.",
    "badge": "SAVE 45%",
    "months": 6,
    "basePrice": 69,
    "monthlyEquivalent": 11.5,
    "savings": "Save 45%",
    "deviceTiers": [
      {
        "devices": 1,
        "label": "1 Connection",
        "price": 69,
        "monthlyEquivalent": 11.5,
        "savings": "Save 45%",
        "checkoutLink": "/order?plan=6-months&connections=1"
      },
      {
        "devices": 2,
        "label": "2 Connections",
        "price": 110,
        "monthlyEquivalent": 18.33,
        "savings": "Save 47%",
        "checkoutLink": "/order?plan=6-months&connections=2"
      },
      {
        "devices": 3,
        "label": "3 Connections",
        "price": 150,
        "monthlyEquivalent": 25,
        "savings": "Save 46%",
        "checkoutLink": "/order?plan=6-months&connections=3"
      },
      {
        "devices": 4,
        "label": "4 Connections",
        "price": 190,
        "monthlyEquivalent": 31.66,
        "savings": "Save 45%",
        "checkoutLink": "/order?plan=6-months&connections=4"
      }
    ],
    "features": [
      "22,000+ channels streaming live",
      "Native 4K Ultra-HD & HD Streams",
      "Vast On-Demand Selection - Films & TV Series",
      "Zero-Lag Streaming Architecture",
      "Comprehensive Electronic Programme Guide",
      "TV Catch-Up - Access the Last 7 Days",
      "Assured 99.9% Uptime",
      "Compatible with Firestick, Android, Smart TV, iOS",
      "Always-on expert assistance",
      "Immediate Service Activation",
      "Service without long-term obligation",
      "Worldwide Programming - USA, UK, Canada & Beyond"
    ],
    "highlights": [
      "$11.50/month - a 45% reduction from the monthly cost",
      "From football season straight into basketball",
      "The perfect mix of affordability and freedom"
    ],
    "metaTitle": "IPTV Half Year Plan - 45% Off Subscription | ORCA 4K TV",
    "metaDescription": "Best IPTV 6 months plan 2026 - $69 ($11.50/mo, save 45%). 22,000+ channels in 4K HDR, sports, movies. Smart TV, Firestick, Apple TV.",
    "keywords": "6 month iptv subscription, iptv half year plan, iptv 6 months, best iptv plan 2026, iptv subscription deal",
    "faq": [
      {
        "q": "What's the monthly cost for iptv 6 months?",
        "a": "Our iptv half year plan is available for a single payment of $69. This premier iptv subscription deal averages out to $11.50 per month for a full iptv 6 months-a 45% discount from the month-to-month price. This 6 month iptv subscription is considered the best iptv plan 2026 for overall value."
      },
      {
        "q": "Does the **6 month iptv subscription** cover an entire sports season? Considering this **iptv subscription deal**, is the **iptv half year plan** of **iptv 6 months** the **best iptv plan 2026** for comprehensive sports coverage?",
        "a": "Yes. Our iptv half year plan is the best iptv plan 2026 for sports. This iptv subscription deal gives iptv 6 months of American football, top-tier UK football, US pro basketball, top-tier Italian football, top European club football, and more. The 6 month iptv subscription includes 4K streams where available."
      },
      {
        "q": "Which sports channels are available?",
        "a": "Gain access to thousands of sports broadcasters, including the premium UK sports broadcaster, premium UK sports broadcaster, major US sports broadcaster, Middle Eastern sports network, premium sports streaming, and major European sports network. With major US sports broadcaster, premium UK sports broadcaster, and hundreds of regional networks, no major live event is missed."
      },
      {
        "q": "Is service disconnected immediately if a renewal is late?",
        "a": "After 180 days, your service is automatically paused, but your account remains live. Renew at any time for instant reactivation without incurring data loss or late fees."
      },
      {
        "q": "Without a doubt. Our iptv half year plan is designed for households, providing access to over 22,000 channels to satisfy every taste. This iptv subscription deal is incredibly popular with families. For those seeking the best iptv plan 2026, this 6 month iptv subscription delivers exceptional value. The entertainment options during these iptv 6 months are virtually limitless.",
        "a": "Yes. You can select 2, 3, or 4 simultaneous streams to accommodate everyone in your home. Each stream operates independently on any of your supported devices."
      }
    ],
    "reviews": [
      {
        "name": "David K.",
        "location": "Los Angeles, USA",
        "rating": 5,
        "text": "I'm 4 months into using my **iptv half year plan**. The 4K quality for the US pro basketball season was incredible-so much better than my old cable service. This is the best viewing experience I've had."
      },
      {
        "name": "Elena P.",
        "location": "Amsterdam, Netherlands",
        "rating": 5,
        "text": "My Spanish, English, and Dutch channels are streaming without issue after a 3-minute setup on my Smart TV. This **6 month iptv subscription** is the **best iptv plan 2026**. A fantastic **iptv subscription deal** for any **iptv half year plan** or for **iptv 6 months**."
      },
      {
        "name": "Ryan O.",
        "location": "Dublin, Ireland",
        "rating": 5,
        "text": "I followed all the action from the the international rugby tournament, top European club football, and top-tier UK football. The stream integrity was perfect, with no interruptions. You won't find a better IPTV service."
      }
    ],
    "ratingValue": 4.9,
    "reviewCount": 1876
  },
  {
    "slug": "12-months",
    "name": "12-Month IPTV Plan",
    "shortName": "12 Months",
    "tagline": "Our top annual plan: unlock 62% savings for the best IPTV value.",
    "description": "For the best iptv value 2026, choose our iptv annual plan. This iptv yearly subscription delivers iptv 12 months of 4K streaming, 22,000+ channels, unlimited VOD, and live sports for just $7.92/month. It's the best iptv annual plan 2026.",
    "badge": "BEST VALUE",
    "months": 12,
    "basePrice": 95,
    "monthlyEquivalent": 7.92,
    "savings": "Save 62%",
    "deviceTiers": [
      {
        "devices": 1,
        "label": "1 Connection",
        "price": 95,
        "monthlyEquivalent": 7.92,
        "savings": "Save 62%",
        "checkoutLink": "/order?plan=12-months&connections=1"
      },
      {
        "devices": 2,
        "label": "2 Connections",
        "price": 152,
        "monthlyEquivalent": 12.66,
        "savings": "Save 63%",
        "checkoutLink": "/order?plan=12-months&connections=2"
      },
      {
        "devices": 3,
        "label": "3 Connections",
        "price": 210,
        "monthlyEquivalent": 17.5,
        "savings": "Save 62%",
        "checkoutLink": "/order?plan=12-months&connections=3"
      },
      {
        "devices": 4,
        "label": "4 Connections",
        "price": 260,
        "monthlyEquivalent": 21.66,
        "savings": "Save 63%",
        "checkoutLink": "/order?plan=12-months&connections=4"
      }
    ],
    "features": [
      "Stream 22,000+ live channels",
      "Native 4K Ultra-HD & HD Support",
      "Expansive VOD Catalog - Films & Television",
      "Zero-Buffering Playback Engine",
      "Integrated Electronic Program Guide",
      "Catch-Up Feature - Rewind the Past 7 Days",
      "Exceptional 99.9% service reliability",
      "Compatible with Firestick, Android, Smart TV, iOS",
      "Dedicated 24/7 expert assistance",
      "Your Service Activates Instantly",
      "All-inclusive price with no added costs",
      "Access USA, UK, Canada & Global Channels"
    ],
    "highlights": [
      "$7.92/month - 2026's most affordable rate for IPTV",
      "Your annual commitment unlocks $157 in savings",
      "12 months of total access: all sports, all seasons"
    ],
    "metaTitle": "Best IPTV Value 2026: IPTV Annual Plan | ORCA 4K TV",
    "metaDescription": "Best IPTV 12 months plan 2026 - $95 ($7.92/mo, save 62%). 22,000+ channels in 4K HDR, 100,000+ movies. The best IPTV value of 2026.",
    "keywords": "best iptv annual plan 2026, iptv 12 months, iptv yearly subscription, iptv annual plan, best iptv value 2026",
    "faq": [
      {
        "q": "Why does the yearly subscription provide superior value?",
        "a": "Our `iptv yearly subscription` offers the `best iptv value 2026`. At $95, this `iptv 12 months` plan is just $7.92/month, a $157 savings over monthly payments. This `iptv annual plan` is our `best iptv annual plan 2026`, providing our lowest rate with unrestricted, all-feature access."
      },
      {
        "q": "What sports programming is included for the full year?",
        "a": "Your full-year plan provides continuous access to the entire top-tier UK football season, top-tier Spanish football, top-tier Italian football, top-tier German football, top European club football, and secondary European club football. It also includes the complete American football regular season and playoffs, US pro basketball, US pro baseball, North American pro hockey, MMA pay-per-views, top-tier open-wheel motorsport, boxing, tennis Grand Slams, cricket, rugby, and many others, with 4K resolution on available broadcasts."
      },
      {
        "q": "Is the IPTV yearly subscription billed all at once?",
        "a": "Absolutely. For $95, you receive 365 days of access on a single connection. This is a one-time charge with no hidden fees, recurring payments, or unapproved auto-renewals."
      },
      {
        "q": "Is my 12-month subscription shareable with other members of my household?",
        "a": "Absolutely. Your plan can be configured for 2, 3, or 4 concurrent streams at checkout. This allows different members of your household to watch separate programs on their own devices, all at once under a single subscription."
      },
      {
        "q": "What are the next steps if my device isn't compatible?",
        "a": "Our 24/7 support specialists will guide your installation on any platform, including Firestick, Smart TV, Android box, iOS, MAG, or PC. With their step-by-step assistance, the entire process is typically finished in less than 5 minutes."
      },
      {
        "q": "What is your refund policy?",
        "a": "Before purchasing, take advantage of our free trial to experience the service quality. We suggest using this time to confirm flawless compatibility with your network and hardware. Our policy on refunds contains all further details."
      }
    ],
    "reviews": [
      {
        "name": "Michael B.",
        "location": "New York, USA",
        "rating": 5,
        "text": "This iptv 12 months plan is the best iptv value 2026. For $95, my iptv yearly subscription gave me every American football, US pro basketball, and MMA pay-per-views event in 4K. It's the best iptv annual plan 2026. My iptv annual plan means no more cable."
      },
      {
        "name": "Priya S.",
        "location": "Birmingham, UK",
        "rating": 5,
        "text": "The 4-connection plan is perfect for our family. He watches sports, I watch Bollywood, and the kids have their cartoons, all streaming together without any buffering."
      },
      {
        "name": "Pierre L.",
        "location": "Paris, France",
        "rating": 5,
        "text": "My French channels, including Middle Eastern sports network and the Canal+ alternative, all function perfectly. At $7.92/month, it's the best deal I've found for 2026."
      }
    ],
    "ratingValue": 4.9,
    "reviewCount": 2847
  }
];

export function getPlanBySlug(slug: string): ShopPlan | undefined {
  return SHOP_PLANS.find((p) => p.slug === slug);
}

