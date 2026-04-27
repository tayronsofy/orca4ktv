import type { Metadata } from 'next'
import AboutUsPage from '@/components/AboutUsPage'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'About ORCA 4K TV — Premium IPTV Service Provider',
  description: 'ORCA 4K TV is a premium IPTV service provider and IPTV streaming service trusted worldwide. Secure streaming with AES-256 encryption, multi-device compatibility, and 24/7 customer support.',
  keywords: 'IPTV service provider, IPTV streaming service, IPTV subscription, premium IPTV channels, secure streaming, AES-256 encryption, secure IPTV access, encrypted IPTV streaming, multi-device compatibility, 24/7 customer support, IPTV customer support, Anti Freeze technology, buffer-free streaming',
  alternates: { canonical: 'https://orca4ktv.com/about' },
  openGraph: {
    title: 'About ORCA 4K TV — Premium IPTV Service Provider',
    description: 'Premium IPTV streaming service: secure streaming with AES-256 encryption, multi-device compatibility, 24/7 customer support, Anti Freeze CDN.',
    type: 'website',
    url: 'https://orca4ktv.com/about',
    images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About ORCA 4K TV — Premium IPTV Service Provider',
    description: 'Secure streaming, AES-256 encryption, multi-device compatibility, 24/7 customer support.',
  },
}

export default function About() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/' },
          { name: 'About', url: 'https://orca4ktv.com/about' },
        ]}
      />
      <AboutUsPage />
    </>
  )
}
