import type { Metadata } from 'next'
import DMCAPage from '@/components/DMCAPage'

export const metadata: Metadata = {
  title: 'DMCA Policy - SMART 4K',
  description: 'SMART 4K DMCA policy and copyright information.',
  alternates: { canonical: 'https://smart4k.io/dmca' },
  robots: { index: false },
}

export default function DMCA() {
  return <DMCAPage />
}
