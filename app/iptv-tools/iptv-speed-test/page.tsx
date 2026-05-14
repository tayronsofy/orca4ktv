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
      learnMore={
        <>
          <div className="rounded-2xl bg-[#0a2547] border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-4">How much speed you actually need for IPTV</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              IPTV bandwidth requirements depend on the resolution and bitrate of the source stream, not just the &quot;quality&quot; label your provider puts on it. As a working baseline: <strong className="text-white">3 Mbps</strong> handles SD, <strong className="text-white">6-8 Mbps</strong> handles 720p HD, <strong className="text-white">10-15 Mbps</strong> handles 1080p Full-HD, and <strong className="text-white">25 Mbps+</strong> is needed for true 4K HDR streams. Sports channels run at the high end of each tier because of the constant motion - a 1080p football match needs closer to 12-15 Mbps where a 1080p talk show is fine on 8.
            </p>
            <p className="text-gray-300 leading-relaxed">
              These numbers are <em>per simultaneous stream</em>. A four-person household watching different channels on four TVs needs roughly four times the per-stream bandwidth, plus headroom for everything else on the network (cloud backups, video calls, smart-home traffic). If your line is right at the minimum, you will see buffering during peak evening hours when local ISP congestion is at its worst.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0a2547] border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-4">What to do if your connection is too slow</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              First, retest on Ethernet. Wi-Fi - especially 2.4 GHz or distance from the router - frequently halves real throughput. If wired speed is also low, the issue is upstream of your home: contact your ISP about plan upgrades, or check whether you are subject to nighttime throttling (some ISPs deprioritize streaming traffic). A wired connection on a modern Wi-Fi 6 router with the streaming device close to the AP is the gold standard for IPTV.
            </p>
            <p className="text-gray-300 leading-relaxed">
              If the line genuinely cannot do 4K, switch to a 1080p or 720p variant of the same channel - most quality IPTV providers carry multiple bitrates of premium channels. Buffering on a fast line usually points elsewhere: a saturated CDN at the provider, a Wi-Fi conflict, an overloaded router, or a player with too small a buffer. Run our M3U Checker to confirm the playlist itself is healthy before blaming the connection.
            </p>
          </div>
        </>
      }
    >
      <SpeedTestClient />
    </ToolLayout>
  )
}
