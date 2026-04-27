import type { Metadata } from 'next'
import TermsOfServicePage from '@/components/TermsOfServicePage'

export const metadata: Metadata = {
  title: 'Terms of Service - ORCA 4K TV',
  description: 'ORCA 4K TV terms of service and usage agreement.',
  alternates: { canonical: 'https://orca4ktv.com/terms' },
  robots: { index: false },
}

export default function Terms() {
  return <TermsOfServicePage />
}
