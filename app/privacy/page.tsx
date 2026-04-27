import type { Metadata } from 'next'
import PrivacyPolicyPage from '@/components/PrivacyPolicyPage'

export const metadata: Metadata = {
  title: 'Privacy Policy - ORCA 4K TV',
  description: 'ORCA 4K TV privacy policy. How we collect, use, and protect your data.',
  alternates: { canonical: 'https://orca4ktv.com/privacy' },
  robots: { index: false },
}

export default function Privacy() {
  return <PrivacyPolicyPage />
}
