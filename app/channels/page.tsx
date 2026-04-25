import type { Metadata } from 'next'
import ChannelsPage from '@/page-components/ChannelsPage'

export const metadata: Metadata = {
  title: 'Premium Channel List – Smart 4K IPTV',
  description: 'Browse our extensive library of premium live TV channels from the USA, UK, Canada, France and 150+ countries. Full HD & 4K quality with reliable streaming.',
  keywords: 'iptv channel list, live tv channels, usa iptv channels, uk iptv list, sports channels iptv, 4k iptv channels',
  alternates: { canonical: 'https://smart4k.io/channels' },
  openGraph: {
    title: 'Premium Channel List – Smart 4K IPTV',
    description: 'Browse premium live TV channels from 150+ countries. Full HD & 4K quality with reliable streaming.',
    url: 'https://smart4k.io/channels',
    images: [{ url: 'https://smart4k.io/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function ChannelsListPage() {
  return <ChannelsPage />
}
