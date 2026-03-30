import type { Metadata } from 'next'
import ResellersPage from '@/page-components/ResellersPage'

export const metadata: Metadata = {
  title: 'IPTV Reseller Program - Start Your IPTV Business',
  description: 'Join the SMART 4K reseller program. Get your own admin panel, manage clients, and earn recurring revenue. Best IPTV reseller credits available.',
  keywords: 'iptv reseller, iptv reseller panel, iptv credits, start iptv business, iptv wholesale',
  alternates: { canonical: 'https://smart4k.io/resellers' },
}

export default function ResellersListPage() {
  return <ResellersPage />
}
