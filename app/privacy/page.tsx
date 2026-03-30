import type { Metadata } from 'next'
import PrivacyPolicyPage from '@/components/PrivacyPolicyPage'

export const metadata: Metadata = {
  title: 'Privacy Policy - SMART 4K',
  description: 'SMART 4K privacy policy. How we collect, use, and protect your data.',
  alternates: { canonical: 'https://smart4k.io/privacy' },
  robots: { index: false },
}

export default function Privacy() {
  return <PrivacyPolicyPage />
}
