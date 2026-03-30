import type { Metadata } from 'next'
import RefundPolicyPage from '@/components/RefundPolicyPage'

export const metadata: Metadata = {
  title: 'Refund Policy - SMART 4K',
  description: 'SMART 4K refund and cancellation policy. No contracts, no hidden fees.',
  alternates: { canonical: 'https://smart4k.io/refund-policy' },
  robots: { index: false },
}

export default function RefundPolicy() {
  return <RefundPolicyPage />
}
