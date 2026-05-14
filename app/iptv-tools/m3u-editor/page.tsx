import type { Metadata } from 'next'
import ToolLayout from '@/components/tools/ToolLayout'
import M3UEditorClient from '@/components/tools/M3UEditorClient'

export const metadata: Metadata = {
  title: 'M3U Editor & Sorter Online - Clean Up Your IPTV Playlist | ORCA 4K TV',
  description:
    'Free online M3U editor: open any IPTV playlist, sort by country or category, filter to live channels, movies, or series, delete the channels you do not need, rename groups, and re-export a clean .m3u file.',
  keywords:
    'm3u editor online, sort m3u playlist, iptv playlist editor, m3u sorter, edit m3u file, delete iptv channels, rename m3u group, m3u cleaner, organize iptv playlist',
  alternates: { canonical: 'https://orca4ktv.com/iptv-tools/m3u-editor' },
  openGraph: {
    title: 'Free M3U Editor & Sorter | ORCA 4K TV',
    description:
      'A privacy-first browser editor for IPTV playlists: sort, filter, rename, and trim any M3U file in seconds. No signup, no upload to our servers in paste mode.',
    url: 'https://orca4ktv.com/iptv-tools/m3u-editor',
    siteName: 'ORCA 4K TV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free M3U Editor & Sorter',
    description: 'Clean up your IPTV playlist in your browser - sort, filter, rename, export.',
  },
}

const HOW_TO = [
  {
    name: 'Load your M3U playlist',
    text: 'Paste the contents of an .m3u file, drop the file in, or paste the URL from your IPTV provider. Paste and upload modes run entirely in your browser - your file is never sent to our servers.',
  },
  {
    name: 'Reorder or remove countries',
    text: 'The editor groups every channel by detected country. Move a country up or down to change where its channels appear in the playlist, or remove a whole country with one click.',
  },
  {
    name: 'Export the cleaned playlist',
    text: 'Click Export .m3u to download the rebuilt playlist with the new country order. Import the file into TiviMate, IPTV Smarters, OTT Navigator, VLC, or any other M3U-compatible player.',
  },
]

const FAQ = [
  {
    question: 'Is my playlist sent to your servers?',
    answer:
      'In paste and upload modes, no - the entire editor runs in your browser. The only time your data touches our server is when you choose URL mode, which fetches the playlist server-side because browsers cannot fetch IPTV URLs directly (CORS). Even then we never store the contents.',
  },
  {
    question: 'Why country only? I want to remove individual channels too.',
    answer:
      'We deliberately kept the editor focused on countries because that is the most common cleanup task: most IPTV users want their primary country at the top and unwanted regions removed. For per-channel edits, run the M3U Analyzer first to see what is in your playlist, then ask your provider for a region-filtered URL.',
  },
  {
    question: 'Where does the country come from?',
    answer:
      'We detect the country in this order: tvg-id suffix (e.g. bbcone.uk -> UK), group-title prefix (e.g. "US | Sports"), channel-name prefix (e.g. "DE: Sport1"), and finally any country word found in the group or name. Channels with no detectable country are placed in a "No country detected" bucket at the bottom.',
  },
  {
    question: 'How does reordering change my IPTV player?',
    answer:
      'Almost every IPTV player respects the order of channels in the M3U file. If you move USA to the top of the editor and re-export, USA channels will appear first when you open the playlist in TiviMate, IPTV Smarters, OTT Navigator, or VLC.',
  },
  {
    question: 'My playlist has a million channels. Why does the editor refuse to open it?',
    answer:
      'Even at the country level, a million-row playlist is unusual and risks freezing your browser. The editor caps imports at 200,000 channels. For huge VOD-laden Xtream playlists, run the M3U Analyzer first to see what is in there, then ask your provider for a slimmer URL.',
  },
  {
    question: 'Are the original M3U attributes preserved on export?',
    answer:
      'Yes. tvg-id, tvg-name, tvg-logo, group-title and the original stream URL are all written back into the exported .m3u file unchanged. Only the order of entries changes (and any country you removed is omitted entirely).',
  },
]

export default function M3UEditorPage() {
  return (
    <ToolLayout
      slug="m3u-editor"
      category="Free IPTV tool"
      description={
        <>
          Open any M3U playlist and reorder or remove channels by country in one click. Move your home region to the top, drop entire countries you do not watch, then download the rebuilt .m3u file. Paste and upload modes run entirely in your browser - your playlist never touches our servers.
        </>
      }
      howToSteps={HOW_TO}
      faq={FAQ}
      learnMore={
        <>
          <div className="rounded-2xl bg-[#0a2547] border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-4">Why people edit their IPTV playlist</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Most subscriptions ship with channels from every country the provider sources content from - often 30+ regions in a single M3U file. If you only watch English-language sports, the 4,000 Turkish, Brazilian, and Indian channels you will never open are still loaded by your IPTV player every time it starts. They make searches slower, the channel grid harder to navigate, and category browsing cluttered.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The editor lets you trim the playlist down to the regions you actually use, then export a clean .m3u file you can re-import into TiviMate, IPTV Smarters, OTT Navigator, VLC, or any other compliant player. Your home country at the top, the regions you occasionally watch in the middle, and everything else removed entirely - that is usually all the cleanup most users need.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0a2547] border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-4">Reorder vs remove - which to use</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong className="text-white">Reorder</strong> when you want to keep a region accessible but not have it dominate the channel list. Move your primary country (e.g. USA) to the top so it appears first in your player&apos;s grid, push secondary regions (UK, Canada) below it, and demote regions you only occasionally browse to the bottom. The channels are still all there - the order just makes the player feel custom-built for you.
            </p>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">Remove</strong> when you genuinely never watch a region and the noise outweighs any benefit. Removing 5,000 channels you never open speeds up channel changes, EPG refresh, and search across the board. The export only writes the kept regions, so your IPTV player loads a leaner playlist and feels noticeably faster on slower devices like Firestick or older Smart TVs. The original playlist URL is unchanged - this is purely a local cleanup.
            </p>
          </div>
        </>
      }
    >
      <M3UEditorClient />
    </ToolLayout>
  )
}
