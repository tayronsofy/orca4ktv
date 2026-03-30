import type { Metadata } from 'next'
import ChannelsPage from '@/page-components/ChannelsPage'

export const metadata: Metadata = {
  title: 'Full IPTV Channel List - 22,000+ Live Channels & VOD',
  description: 'Browse our massive list of 22,000+ live TV channels from USA, UK, Canada, France, and 150+ countries. Full HD & 4K quality with no buffering.',
  keywords: 'iptv channel list, live tv channels, usa iptv channels, uk iptv list, sports channels iptv, 4k iptv channels',
  alternates: { canonical: 'https://smart4k.io/channels' },
  openGraph: {
    title: 'Full IPTV Channel List - 22,000+ Live Channels',
    description: 'Browse 22,000+ live TV channels from 150+ countries.',
    url: 'https://smart4k.io/channels',
    images: [{ url: 'https://smart4k.io/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default function ChannelsListPage() {
  return <ChannelsPage />
}
