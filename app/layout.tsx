import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTopButton from '@/components/ScrollToTopButton'
import SetupWizard from '@/components/SetupWizard'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://smart4k.io'),
  title: {
    default: 'SMART 4K | Premium 4K IPTV Service',
    template: '%s | SMART 4K',
  },
  description: 'Premium IPTV service with 22,000+ live TV channels, 4K sports, and on-demand content. Compatible with Firestick, Android TV, Apple TV, and all devices.',
  icons: {
    icon: '/favicon.ico',
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
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          crossOrigin="anonymous"
        />
        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "SMART 4K",
              "url": "https://smart4k.io/",
              "logo": "https://smart4k.io/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+447426440524",
                "contactType": "Customer Support",
                "email": "support@smart4k.io"
              }
            })
          }}
        />
      </head>
      <body className="bg-[#1f2326] text-white overflow-x-hidden">
        <Header />
        <main>{children}</main>
        <Footer />
        <SetupWizard />
        <ScrollToTopButton />
      </body>
    </html>
  )
}
