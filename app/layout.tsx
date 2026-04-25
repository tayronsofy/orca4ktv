import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'], display: 'optional' })

export const metadata: Metadata = {
  metadataBase: new URL('https://smart4k.io'),
  title: {
    default: 'SMART 4K IPTV | Premium 4K IPTV Service',
    template: '%s - SMART 4K IPTV',
  },
  description: 'The #1 IPTV subscription 2026. Stream 22,000+ channels, 4K sports & movies buffer-free on Firestick, Smart TV & mobile. No contract, cancel anytime.',
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

        {/* FontAwesome — non-blocking preload */}
        <link
          rel="preload"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          as="style"
          crossOrigin="anonymous"
          // @ts-ignore
          onLoad="this.rel='stylesheet'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            crossOrigin="anonymous"
          />
        </noscript>

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SMART 4K IPTV",
              "url": "https://smart4k.io/",
              "logo": {
                "@type": "ImageObject",
                "url": "https://smart4k.io/logo.png?v=2",
                "width": 1263,
                "height": 399
              },
              "image": "https://smart4k.io/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+447426440524",
                "contactType": "Customer Support",
                "email": "support@smart4k.io"
              }
            })
          }}
        />

        {/* WebSite Schema — controls Google site name in search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "SMART 4K IPTV",
              "url": "https://smart4k.io/"
            })
          }}
        />
      </head>
      <body className="bg-[#1f2326] text-white overflow-x-hidden">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
