import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import CouponPopup from '@/components/CouponPopup'

const inter = Inter({ subsets: ['latin'], display: 'optional' })

export const metadata: Metadata = {
  metadataBase: new URL('https://orca4ktv.com'),
  title: {
    default: 'ORCA 4K TV | Premium IPTV Subscription in 4K HDR',
    template: '%s - ORCA 4K TV',
  },
  description: 'Premium IPTV subscription with 22,000+ channels in 4K HDR, on-demand movies, multi-device. Firestick, Smart TV, Apple TV, Android. No contract.',
  icons: {
    icon: [
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/favicon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '192x192', type: 'image/png' }],
    shortcut: '/favicon-32.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Preconnect hints */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="https://flagcdn.com" />

        {/* FontAwesome - non-blocking preload, promoted to stylesheet via inline script */}
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          as="style"
          crossOrigin="anonymous"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.querySelector('link[rel="preload"][href*="font-awesome"]');if(l){l.rel='stylesheet';}})();`,
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            crossOrigin="anonymous"
          />
        </noscript>

        {/* Organization Schema - entity foundation for AI engines + Google Knowledge Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://orca4ktv.com/#organization",
              "name": "ORCA 4K TV IPTV",
              "alternateName": "Orca 4K TV",
              "url": "https://orca4ktv.com/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://orca4ktv.com/logo.png?v=6",
                "width": 1263,
                "height": 399
              },
              "image": "https://orca4ktv.com/logo.png",
              "description": "Premium IPTV streaming service offering 22,000+ live channels, on-demand movies, 4K HDR streaming, AES-256 encrypted secure streaming, smart EPG guide, catch up TV, and 24/7 customer support across Smart TV, Firestick, Android, iOS, Apple TV and MAG devices.",
              "slogan": "Your Universe of Limitless Entertainment",
              "foundingDate": "2026",
              "areaServed": [
                { "@type": "Country", "name": "United States" },
                { "@type": "Country", "name": "United Kingdom" },
                { "@type": "Country", "name": "Canada" },
                { "@type": "Country", "name": "Germany" },
                { "@type": "Country", "name": "Netherlands" },
                "Worldwide"
              ],
              "knowsAbout": [
                "IPTV subscription",
                "4K streaming",
                "HDR streaming",
                "live TV streaming",
                "on-demand movies",
                "premium IPTV channels",
                "secure IPTV access",
                "AES-256 encryption",
                "electronic program guide",
                "catch up TV",
                "multi-device compatibility",
                "buffer-free streaming",
                "Anti Freeze technology"
              ],
              "audience": {
                "@type": "Audience",
                "audienceType": "Cord-cutters, sports fans, premium streaming households"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+447426440524",
                "contactType": "Customer Support",
                "email": "support@orca4ktv.com",
                "availableLanguage": ["English", "German", "Dutch"],
                "hoursAvailable": {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
                  "opens": "00:00",
                  "closes": "23:59"
                }
              }
            })
          }}
        />

        {/* WebSite Schema - controls Google site name + enables sitelinks search box */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://orca4ktv.com/#website",
              "name": "ORCA 4K TV IPTV",
              "alternateName": "Orca 4K TV",
              "url": "https://orca4ktv.com/",
              "description": "Premium IPTV streaming service - 22,000+ live channels, 4K HDR streaming, secure AES-256 access, multi-device compatibility, 24/7 customer support.",
              "publisher": { "@id": "https://orca4ktv.com/#organization" },
              "inLanguage": ["en", "de", "nl"],
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://orca4ktv.com/blog?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            })
          }}
        />
      </head>
      <body className="bg-[#001f3f] text-white overflow-x-hidden">
        <Header />
        <main>{children}</main>
        <Footer />
        <CouponPopup />
      </body>
    </html>
  )
}
