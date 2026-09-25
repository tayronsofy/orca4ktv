import type { Metadata } from 'next'
import { buildPageMetadata, codeDefaultsFrom } from '@/lib/seo/metadata'
import TrialPageContent from '@/page-components/TrialPageContent'

const codeMetadata: Metadata = {
  title: 'Free IPTV Trial 2026 - Instant Activation | ORCA 4K TV',
  description: 'Free IPTV trial with instant activation. Test ORCA 4K TV - 22,000+ channels in 4K HDR, smart EPG, multi-device. No credit card. Stream in 5 minutes.',
  keywords: 'free iptv trial, iptv test, iptv free trial 2026, IPTV instant start, instant activation, rapid setup, fast IPTV setup, IPTV subscription plans, IPTV subscription, multi-device compatibility, IPTV multi-device, buffer-free streaming, zero buffering, premium IPTV channels, 4K streaming, HDR streaming',
  alternates: { canonical: 'https://orca4ktv.com/trial' },
  openGraph: {
    title: 'Free IPTV Trial 2026 - Instant Activation | ORCA 4K TV',
    description: 'Test ORCA 4K TV - 22,000+ channels in 4K HDR, smart EPG, multi-device. No credit card. Stream in 5 minutes.',
    type: 'website',
    url: 'https://orca4ktv.com/trial',
    images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free IPTV Trial 2026 - Instant Activation | ORCA 4K TV',
    description: 'No credit card. 22,000+ channels in 4K HDR. Smart EPG, multi-device.',
    images: ['https://orca4ktv.com/og-image.jpg'],
  },
}

// SEO overrides from /admin/seo — null DB fields fall back to codeMetadata
export async function generateMetadata(): Promise<Metadata> {
  const base = await buildPageMetadata('trial', codeDefaultsFrom(codeMetadata))
  return { ...codeMetadata, ...base }
}

export default function TrialPage() {
  return (
    <>
      {/* FAQPage JSON-LD - server-rendered for Google rich results */}
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
                  "text": "The free IPTV trial gives you full access to ORCA 4K TV's complete service - 22,000+ live channels, 4K sports, movies, VOD library, and EPG guide. No features are locked or restricted during the trial period."
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
                  "text": "No. The ORCA 4K TV free trial requires no credit card, no payment details, and no commitment. Simply submit the request form with your name, email, and device - that's all."
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
                  "text": "After your free trial ends, your access will pause. There is no automatic charge - you decide if and when to subscribe. Plans start from $21/month with no contract or auto-renewal."
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
            "name": "ORCA 4K TV Free IPTV Trial",
            "description": "Free IPTV trial providing access to 22,000+ live channels, 4K quality, global sports, and VOD library with no credit card required.",
            "provider": {
              "@type": "Organization",
              "name": "ORCA 4K TV",
              "url": "https://orca4ktv.com/"
            },
            "serviceType": "IPTV Streaming Service",
            "url": "https://orca4ktv.com/trial",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD",
              "availability": "https://schema.org/InStock",
              "url": "https://orca4ktv.com/trial",
              "description": "Free IPTV trial - no credit card required"
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
