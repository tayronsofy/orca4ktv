import type { Metadata } from 'next'
import FreeTrialForm from '@/components/FreeTrialForm'

export const metadata: Metadata = {
  title: 'Free IPTV Trial - Test SMART 4K for Free',
  description: 'Start your free IPTV trial today. Test 22,000+ live channels and 4K quality with no commitment. Instant activation.',
  keywords: 'free iptv trial, iptv test, free iptv subscription, try iptv free',
  alternates: { canonical: 'https://smart4k.io/trial' },
}

export default function TrialPage() {
  return <FreeTrialForm />
}
