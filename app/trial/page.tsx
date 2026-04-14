import type { Metadata } from 'next'
import TrialPageContent from '@/page-components/TrialPageContent'

export const metadata: Metadata = {
  title: 'Free IPTV Trial – Test 22,000+ Channels Free',
  description: 'Try SMART 4K free — access 22,000+ live channels, 4K sports, global movies & VOD with no credit card. Get your free IPTV trial credentials in minutes.',
  keywords: 'free iptv trial, iptv test, iptv free trial 2026, best iptv trial 2026, iptv trial no credit card, free iptv test, try iptv free, iptv subscription trial, free iptv 24 hours',
  alternates: { canonical: 'https://smart4k.io/trial' },
  openGraph: {
    title: 'Free IPTV Trial – Test 22,000+ Channels Free',
    description: 'Try SMART 4K free — access 22,000+ live channels, 4K sports, global movies & VOD with no credit card. Get your free IPTV trial credentials in minutes.',
    type: 'website',
    url: 'https://smart4k.io/trial',
    images: [{ url: 'https://smart4k.io/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free IPTV Trial – Test 22,000+ Channels Free',
    description: 'No credit card. Instant access. Test SMART 4K IPTV free with 22,000+ channels & 4K quality.',
    images: ['https://smart4k.io/og-image.jpg'],
  },
}

export default function TrialPage() {
  return (
    <>
      {/* FAQPage JSON-LD — server-rendered for Google rich results */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is included in the free IPTV trial?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The free IPTV trial gives you full access to SMART 4K's complete service — 22,000+ live channels, 4K sports, movies, VOD library, and EPG guide. No features are locked or restricted during the trial period."
                }
              },
              {
                "@type": "Question",
                "name": "How long does the free trial last?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The free trial period gives you enough time to fully test the service across all your devices. Our team will confirm the exact duration when sending your trial credentials via email."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need a credit card for the free trial?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No. The SMART 4K free trial requires no credit card, no payment details, and no commitment. Simply submit the request form with your name, email, and device — that's all."
                }
              },
              {
                "@type": "Question",
                "name": "How quickly will I receive my trial credentials?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Trial credentials are typically sent to your email within a few minutes of submitting the form. During peak times this may take up to a few hours. Check your spam folder if you don't see the email."
                }
              },
              {
                "@type": "Question",
                "name": "Which devices are compatible with the free trial?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The free trial works on all major devices: Amazon Firestick, Android TV boxes, Samsung & LG Smart TVs, Apple TV, iPhone, iPad, Android phones, Roku, Windows PC, and Mac. Simply select your device on the form."
                }
              },
              {
                "@type": "Question",
                "name": "What happens after the trial ends?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "After your free trial ends, your access will pause. There is no automatic charge — you decide if and when to subscribe. Plans start from $21/month with no contract or auto-renewal."
                }
              }
            ]
          })
        }}
      />

      {/* Service JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "SMART 4K Free IPTV Trial",
            "description": "Free IPTV trial providing access to 22,000+ live channels, 4K quality, global sports, and VOD library with no credit card required.",
            "provider": {
              "@type": "Organization",
              "name": "SMART 4K",
              "url": "https://smart4k.io/"
            },
            "serviceType": "IPTV Streaming Service",
            "url": "https://smart4k.io/trial",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": "https://smart4k.io/trial",
              "description": "Free IPTV trial — no credit card required"
            },
            "areaServed": {
              "@type": "Place",
              "name": "Worldwide"
            }
          })
        }}
      />

      <TrialPageContent />
    </>
  )
}
