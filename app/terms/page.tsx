import type { Metadata } from 'next'
import TermsOfServicePage from '@/components/TermsOfServicePage'

export const metadata: Metadata = {
  title: 'Terms of Service - SMART 4K',
  description: 'SMART 4K terms of service and usage agreement.',
  alternates: { canonical: 'https://smart4k.io/terms' },
  robots: { index: false },
}

export default function Terms() {
  return <TermsOfServicePage />
}
