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
    name: 'Filter and sort',
    text: 'Use the search bar plus the type, group, and country filters to narrow the table. Click any column header to sort ascending or descending.',
  },
  {
    name: 'Trim and rename',
    text: 'Tick the rows you want to remove and click Delete selected. Or use the bulk Rename group button to standardize the group titles for selected channels.',
  },
  {
    name: 'Export the cleaned playlist',
    text: 'Click Export .m3u to download the cleaned playlist. Import the new file into TiviMate, IPTV Smarters, OTT Navigator, VLC, or any other M3U-compatible player.',
  },
]

const FAQ = [
  {
    question: 'Is my playlist sent to your servers?',
    answer:
      'In paste and upload modes, no - the entire editor runs in your browser. The only time your data touches our server is when you choose URL mode, which fetches the playlist server-side because browsers cannot fetch IPTV URLs directly (CORS). Even then we never store the contents.',
  },
  {
    question: 'How do I sort by country or category?',
    answer:
      'Pick a country from the country dropdown or a category from the group dropdown to filter. Click the Country or Group column header to sort the table by that field. Sort order toggles between ascending and descending each time you click.',
  },
  {
    question: 'Can I delete all VOD or all movies in one click?',
    answer:
      'Yes. Click the Movies type filter to show only movie entries, then click Select visible and Delete selected. The same flow works for live channels, series, or any single group / country combination.',
  },
  {
    question: 'How do I rename a group title?',
    answer:
      'Filter to the channels in that group (or any selection of rows you want to retag), tick them, and click Rename group. You will be prompted for the new group title - all selected rows will have their group-title attribute updated, and the new value will be written into the exported .m3u file.',
  },
  {
    question: 'My playlist has 1 million channels. Why does the editor refuse to open it?',
    answer:
      'Browsers cannot render a million-row table without freezing your laptop. The editor caps imports at 200,000 channels. For huge VOD-laden Xtream playlists, run the M3U Analyzer first to see what is in there, then ask your provider for a slimmer "live only" or category-filtered URL.',
  },
  {
    question: 'Where does the live / movie / series classification come from?',
    answer:
      'Each row is classified using the URL path (Xtream Codes uses /live/, /movie/, /series/), the file extension (.mp4 / .mkv = movie), the group title (movies / series / VOD keywords), and episode markers like S01E02 in the channel name. Anything ambiguous defaults to live.',
  },
]

export default function M3UEditorPage() {
  return (
    <ToolLayout
      slug="m3u-editor"
      category="Free IPTV tool"
      description={
        <>
          Open any M3U playlist, sort by country or group, filter live channels from VOD, delete the channels you do not need, rename groups, and download a clean .m3u file. Paste and upload modes run entirely in your browser - your playlist never touches our servers.
        </>
      }
      howToSteps={HOW_TO}
      faq={FAQ}
    >
      <M3UEditorClient />
    </ToolLayout>
  )
}
