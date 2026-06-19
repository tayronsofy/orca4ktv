import type { Metadata } from 'next'
import HomePage from '../page'

export const metadata: Metadata = {
  title: 'ORCA 4K TV IPTV - 22,000+ Live Channels in 4K HDR',
  description: 'Premium IPTV: 22,000+ live channels, 100,000+ movies in 4K HDR. Anti Freeze CDN, AES-256, multi-device. Firestick, Smart TV, Apple TV. From $7.92/mo.',
  keywords: 'IPTV subscription, IPTV plans, IPTV service provider, IPTV streaming service, IPTV subscription plans, 4K IPTV subscription, HD IPTV service, 4K streaming, HDR streaming, live channels, on-demand movies, premium IPTV channels, premium channels, live TV streaming, buffer-free streaming, zero buffering, Anti Freeze technology, multi-device compatibility, IPTV multi-device, IPTV device compatibility, smart EPG guide, electronic program guide, catch up feature, IPTV catch up TV, instant activation, IPTV instant start, rapid setup, fast IPTV setup, secure streaming, AES-256 encryption, secure IPTV access, encrypted IPTV streaming, VPN allowed, IPTV with VPN, 24/7 customer support, IPTV customer support',
  alternates: { canonical: 'https://orca4ktv.com/iptv' },
  openGraph: {
    title: 'ORCA 4K TV IPTV - 22,000+ Live Channels in 4K HDR',
    description: 'Premium IPTV streaming with 22,000+ live channels in 4K HDR, on-demand movies, AES-256 encrypted, multi-device, instant activation. From $7.92/mo.',
    type: 'website',
    url: 'https://orca4ktv.com/iptv',
    images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ORCA 4K TV IPTV - 22,000+ Live Channels in 4K HDR',
    description: 'Premium IPTV in 4K HDR: 22,000+ channels, AES-256 encrypted, multi-device, instant activation. From $7.92/mo.',
    images: ['https://orca4ktv.com/og-image.jpg'],
  },
}

export default HomePage
