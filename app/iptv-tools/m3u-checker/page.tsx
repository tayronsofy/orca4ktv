import type { Metadata } from 'next'
import ToolLayout from '@/components/tools/ToolLayout'
import M3UCheckerClient from '@/components/tools/M3UCheckerClient'

export const metadata: Metadata = {
  title: 'M3U Playlist Analyzer - Channels, Movies, Series, Categories & Countries | ORCA 4K TV',
  description:
    'Free M3U analyzer: paste your IPTV M3U URL or upload a playlist file and instantly see how many live channels, movies, and series your subscription includes, plus the top categories and countries.',
  keywords:
    'm3u checker, m3u analyzer, iptv playlist analyzer, count m3u channels, m3u categories, m3u countries, iptv playlist breakdown, vod movies series count, xtream playlist composition',
  alternates: { canonical: 'https://orca4ktv.com/iptv-tools/m3u-checker' },
  openGraph: {
    title: 'Free M3U Playlist Analyzer | ORCA 4K TV',
    description:
      'See exactly what is in your IPTV playlist: live channels, movies, series, top categories, and countries. Free, no signup, no playlist storage.',
    url: 'https://orca4ktv.com/iptv-tools/m3u-checker',
    siteName: 'ORCA 4K TV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M3U Playlist Analyzer - Free',
    description: 'Count live channels, movies, series, categories and countries in your IPTV M3U playlist.',
  },
}

const HOW_TO = [
  {
    name: 'Paste your M3U URL or upload the playlist file',
    text: 'Most IPTV providers give you a get.php URL. You can also paste the raw contents of an .m3u / .m3u8 file. Uploaded files are read in your browser before being analyzed.',
  },
  {
    name: 'We download and parse the playlist',
    text: 'Your playlist is fetched once, parsed, and classified into live channels, movie VOD, and TV series. Group titles and country tags are extracted at the same time.',
  },
  {
    name: 'Review the breakdown',
    text: 'See live / movie / series counts, the top 15 categories with percentages, and the top 15 countries detected from tvg-id codes and group title prefixes.',
  },
]

const FAQ = [
  {
    question: 'What does this tool actually tell me?',
    answer:
      'It reads your M3U playlist and tells you how many live channels, movies, and series it contains, the top categories (group titles) by size, and the top countries detected. It does not test individual streams - that requires a real IPTV player on your network.',
  },
  {
    question: 'Why do you not ping individual streams anymore?',
    answer:
      'Most IPTV servers block server-to-server requests (they only accept connections from real players in real users\' homes). Pinging from our server returned mostly false negatives, which was misleading. The composition view is far more useful for deciding whether a playlist suits your needs.',
  },
  {
    question: 'How does the tool know what is a movie vs a live channel?',
    answer:
      'Live channels, movies, and TV series are classified using the URL path (Xtream Codes uses /live/, /movie/, /series/), the file extension on the URL, the group title (movie / series / VOD keywords), and episode markers like S01E02 in the channel name.',
  },
  {
    question: 'How are countries detected?',
    answer:
      'We check the tvg-id suffix first (e.g. bbcone.uk -> UK), then the group-title prefix (e.g. "US | Sports"), then the channel-name prefix (e.g. "DE: Sport1"), and finally fall back to country names mentioned anywhere in the group or name.',
  },
  {
    question: 'My playlist has a million channels and I see a "partial analysis" warning. Why?',
    answer:
      'When a playlist would take too long to download in full (some Xtream providers serve 300+ MB playlists with every VOD title as a separate entry), we stop reading after a sample large enough for an accurate breakdown of the early portion. Use the Paste tab to upload a smaller file for a complete count.',
  },
  {
    question: 'Do you store my M3U URL or credentials?',
    answer:
      'No. Your URL is fetched once on our server to read the playlist, then discarded. We persist only a hashed IP address (with a server-side salt) for rate limiting - never the URL, your credentials, or any of the channel data.',
  },
  {
    question: 'My playlist analyzes fine here but channels still buffer in my player. Why?',
    answer:
      'Buffering is almost never a playlist issue - it is bandwidth, Wi-Fi quality, or your provider\'s CDN. Run our IPTV Speed Test to confirm your connection can handle the resolution you are streaming, and try a wired Ethernet connection instead of Wi-Fi.',
  },
]

export default function M3UCheckerPage() {
  return (
    <ToolLayout
      slug="m3u-checker"
      category="Free IPTV tool"
      description={
        <>
          Paste any M3U URL or upload an .m3u file. We instantly count the live channels, movies, and TV series in your playlist, and break down the top categories and countries so you know exactly what your IPTV subscription gives you.
        </>
      }
      howToSteps={HOW_TO}
      faq={FAQ}
      learnMore={
        <>
          <div className="rounded-2xl bg-[#0a2547] border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-4">What an M3U playlist actually contains</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              An M3U file is a plain-text index of every channel and on-demand title your IPTV provider gives you access to. Each entry includes a stream URL, a display name, a logo URL, and metadata tags like <code>group-title</code> (the category) and <code>tvg-id</code> (the EPG identifier). Live TV channels, movies, and TV series all live in the same file - which is why a fresh subscription can come with anywhere from a few hundred to a few hundred thousand entries depending on how the provider structures their catalog.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Most users never open an M3U file directly. Their IPTV player (TiviMate, IPTV Smarters, OTT Navigator, IPTV+) pulls it down on first launch and presents the channels through its own UI. That hides what is actually inside - so when something goes wrong, or when you are deciding between providers, it helps to look at the raw breakdown. That is what this tool does.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0a2547] border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-4">How to read your playlist breakdown</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              The first number to look at is the live-channel count. A subscription advertised as &quot;15,000+ live channels&quot; should land in that range; if the analyzer shows 200 live channels and 14,800 movies, the marketing was misleading. Next look at the country distribution: if you bought a UK-focused playlist and the top three countries are Brazil, Turkey, and India, the catalog is not what you expected.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The category breakdown is the third signal. Healthy playlists have clear groupings (Sports, News, Entertainment, by country). A playlist where 90% of channels live in a single &quot;General&quot; or &quot;Mixed&quot; bucket usually means the provider scraped their catalog from a reseller dump and never organized it - that almost always correlates with worse uptime and broken EPG mappings. If you see that pattern, expect headaches.
            </p>
          </div>
        </>
      }
    >
      <M3UCheckerClient />
    </ToolLayout>
  )
}
