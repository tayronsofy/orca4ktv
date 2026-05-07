import type { Metadata } from 'next'
import ToolLayout from '@/components/tools/ToolLayout'
import M3UCheckerClient from '@/components/tools/M3UCheckerClient'

export const metadata: Metadata = {
  title: 'M3U Playlist Checker - Test if your IPTV streams are alive | ORCA 4K TV',
  description:
    'Free M3U checker: paste your IPTV M3U URL or upload an .m3u file and see which channels are working, slow, or dead. No signup, no playlist storage.',
  keywords:
    'm3u checker, iptv playlist checker, m3u tester, check m3u online, iptv stream tester, m3u url checker, iptv playlist tester, dead channel checker, iptv link tester',
  alternates: { canonical: 'https://orca4ktv.com/iptv-tools/m3u-checker' },
  openGraph: {
    title: 'Free M3U Playlist Checker | ORCA 4K TV',
    description:
      'Test which channels in your IPTV M3U playlist are working - fast, free, and no signup. Probes a random sample of streams and shows you the dead ones.',
    url: 'https://orca4ktv.com/iptv-tools/m3u-checker',
    siteName: 'ORCA 4K TV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M3U Playlist Checker - Free',
    description: 'Spot dead channels in your IPTV M3U playlist before they ruin movie night.',
  },
}

const HOW_TO = [
  {
    name: 'Paste your M3U URL or upload the playlist file',
    text: 'Most IPTV providers give you a get.php URL. You can also paste the contents of an .m3u / .m3u8 file. Files are read in your browser before being checked.',
  },
  {
    name: 'We probe up to 50 random streams',
    text: 'A small sample is enough to tell you if the playlist is healthy overall. Each stream gets a short HEAD or partial GET request with a 4-second timeout.',
  },
  {
    name: 'Review the results',
    text: 'Each stream is labelled Working, Slow, or Dead. Filter the table to see only the dead channels and decide whether to ask your provider for a fix.',
  },
]

const FAQ = [
  {
    question: 'Is this M3U checker really free?',
    answer:
      'Yes. There is no signup, no email gate, and no payment. We rate-limit checks per IP to keep the service usable for everyone, but it is otherwise unrestricted.',
  },
  {
    question: 'Does it check every channel in my playlist?',
    answer:
      'No - it samples up to 50 random streams. That is enough to tell you whether the playlist is broadly working without hammering your provider with thousands of requests, which could itself trip rate limits.',
  },
  {
    question: 'Why does a stream show as Working but still buffer in my player?',
    answer:
      'A "working" status only confirms the stream URL is reachable from our servers. Real playback also depends on your bandwidth, your player, and CDN routing in your region. Run our IPTV Speed Test to rule out a connection problem.',
  },
  {
    question: 'Will this get my IPTV subscription banned?',
    answer:
      'It is unlikely. The checker uses normal HEAD/GET requests, the same kind your player makes when opening a channel. We probe up to 50 streams per check and rate-limit each visitor, so usage stays modest.',
  },
  {
    question: 'Do you store my M3U URL or credentials?',
    answer:
      'No. Your URL is fetched once on the server to read the playlist, then discarded. We only persist a hashed IP address (with a server-side salt) for rate limiting - never the URL or your credentials.',
  },
  {
    question: 'My whole playlist shows as dead. What now?',
    answer:
      'Try opening the M3U URL directly in your browser - if it 404s or asks for a login, your subscription has expired or the host has changed. Contact your provider, or start a free trial with ORCA 4K TV for a stable replacement.',
  },
]

export default function M3UCheckerPage() {
  return (
    <ToolLayout
      slug="m3u-checker"
      category="Free IPTV tool"
      description={
        <>
          Paste any M3U URL or upload an .m3u file and we will probe a random sample of your channels to tell you which are working, which are slow, and which are dead. No account, no signup, no storage of your playlist.
        </>
      }
      howToSteps={HOW_TO}
      faq={FAQ}
    >
      <M3UCheckerClient />
    </ToolLayout>
  )
}
