import type { Metadata } from 'next'
import ResellersPage from '@/page-components/ResellersPage'

export const metadata: Metadata = {
  title: 'IPTV Reseller Program – Partner with Smart 4K IPTV',
  description: 'Partner with SMART 4K as a white-label reseller. Manage your clients with a dedicated panel and earn recurring commissions. Professional IPTV reseller program.',
  keywords: 'iptv reseller, iptv reseller panel, iptv reseller program, iptv white label, iptv partner program',
  alternates: { canonical: 'https://smart4k.io/resellers' },
}

export default function ResellersListPage() {
  return <ResellersPage />
}
