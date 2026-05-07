import type { Metadata } from 'next'
import ToolLayout from '@/components/tools/ToolLayout'
import SpeedTestClient from '@/components/tools/SpeedTestClient'

export const metadata: Metadata = {
  title: 'IPTV Speed Test - Is your internet fast enough for 4K streaming? | ORCA 4K TV',
  description:
    'Free IPTV speed test tuned for live streaming. Measures sustained download speed and tells you whether your line can handle SD, HD, Full-HD or 4K HDR IPTV.',
  keywords:
    'iptv speed test, internet speed for iptv, internet speed for 4k iptv, iptv bandwidth test, streaming speed test, mbps for 4k streaming, iptv minimum speed',
  alternates: { canonical: 'https://orca4ktv.com/iptv-tools/iptv-speed-test' },
  openGraph: {
    title: 'IPTV Speed Test - Free | ORCA 4K TV',
    description: 'Find out the highest IPTV resolution your connection can handle. Browser-based and free.',
    url: 'https://orca4ktv.com/iptv-tools/iptv-speed-test',
    siteName: 'ORCA 4K TV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPTV Speed Test (free)',
    description: 'Browser-based speed test tuned for IPTV - instantly tells you if your line is ready for 4K.',
  },
}

const HOW_TO = [
  {
    name: 'Click "Start speed test"',
    text: 'We download a 10 MB sample from our server. The download is uncached so the result reflects your actual bandwidth right now.',
  },
  {
    name: 'Watch the meter',
    text: 'The progress bar shows how much of the sample has arrived. Most modern lines finish in under 5 seconds.',
  },
  {
    name: 'Read the recommendation',
    text: 'We compare your speed against the minimum bandwidth needed for SD, HD, Full-HD and 4K IPTV streaming and tell you which tiers will play smoothly.',
  },
]

const FAQ = [
  {
    question: 'How fast does my internet need to be for IPTV?',
    answer:
      'A safe rule of thumb: 3 Mbps for SD, 6 Mbps for 720p HD, 10 Mbps for 1080p Full-HD, and 25 Mbps for 4K HDR. These are per-stream - multiply by the number of TVs running at the same time.',
  },
  {
    question: 'Does this measure upload speed too?',
    answer:
      'No. IPTV is a one-way download protocol, so upload speed has almost no impact on playback. We only measure download - the metric that matters for streaming.',
  },
  {
    question: 'Why is my speed lower than my ISP plan?',
    answer:
      'Wi-Fi distance, congestion on the local network, VPN overhead, server distance, and time of day all affect real-world throughput. For the most accurate IPTV speed test, run it wired (Ethernet) on the same device you stream on.',
  },
  {
    question: 'Will a VPN slow down my IPTV?',
    answer:
      'A VPN typically reduces speed by 10-30% depending on the protocol and the distance to the VPN server. Most ORCA 4K TV customers can run a VPN comfortably, but if you are right on the edge of a 4K-capable speed without one, consider streaming in 1080p when the VPN is on.',
  },
  {
    question: 'I have 4K-capable speed but the channel still buffers - why?',
    answer:
      'Bandwidth is only one piece. Wi-Fi quality, your IPTV provider’s CDN, the channel’s source bitrate and your player buffer settings all matter. Try the M3U Checker to confirm the stream itself is healthy, and run this test on Ethernet to rule out Wi-Fi.',
  },
  {
    question: 'How accurate is this test?',
    answer:
      'It is good for a quick reality check tuned to IPTV needs (~10 MB sample, server-served, no caching). It is not a replacement for a full multi-server speed test, but it is more representative of real IPTV playback than a generic ping test.',
  },
]

export default function IptvSpeedTestPage() {
  return (
    <ToolLayout
      slug="iptv-speed-test"
      category="Free IPTV tool"
      description={
        <>
          Most IPTV buffering is bandwidth, not the playlist. This speed test downloads a fresh 10 MB sample from our server and tells you the highest resolution your line is comfortable with - SD, HD, Full-HD or 4K HDR.
        </>
      }
      howToSteps={HOW_TO}
      faq={FAQ}
    >
      <SpeedTestClient />
    </ToolLayout>
  )
}
