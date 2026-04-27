import type { Metadata } from 'next'
import RefundPolicyPage from '@/components/RefundPolicyPage'

export const metadata: Metadata = {
  title: 'Refund Policy - ORCA 4K TV',
  description: 'ORCA 4K TV refund and cancellation policy. No contracts, no hidden fees.',
  alternates: { canonical: 'https://orca4ktv.com/refund-policy' },
  robots: { index: false },
}

export default function RefundPolicy() {
  return <RefundPolicyPage />
}
