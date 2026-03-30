import type { Metadata } from 'next'
import AboutUsPage from '@/components/AboutUsPage'

export const metadata: Metadata = {
  title: 'About Us - SMART 4K IPTV',
  description: 'Learn about SMART 4K, the premium IPTV provider trusted by thousands of customers worldwide. Our mission, team, and service commitment.',
  alternates: { canonical: 'https://smart4k.io/about' },
}

export default function About() {
  return <AboutUsPage />
}
