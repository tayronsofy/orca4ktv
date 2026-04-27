import type { Metadata } from 'next'
import DMCAPage from '@/components/DMCAPage'

export const metadata: Metadata = {
  title: 'DMCA Policy - ORCA 4K TV',
  description: 'ORCA 4K TV DMCA policy and copyright information.',
  alternates: { canonical: 'https://orca4ktv.com/dmca' },
  robots: { index: false },
}

export default function DMCA() {
  return <DMCAPage />
}
