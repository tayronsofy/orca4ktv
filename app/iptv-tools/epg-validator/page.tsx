import type { Metadata } from 'next'
import ToolLayout from '@/components/tools/ToolLayout'
import EpgValidatorClient from '@/components/tools/EpgValidatorClient'

export const metadata: Metadata = {
  title: 'EPG / XMLTV URL Validator - Check Your IPTV Guide Before Importing | ORCA 4K TV',
  description:
    'Free EPG validator: paste your XMLTV URL and we will fetch it, parse it, count channels and programmes, and show the date range so you can spot a stale or broken guide before importing it into TiviMate, IPTV Smarters, or OTT Navigator.',
  keywords:
    'epg validator, xmltv validator, epg checker, xmltv checker, iptv guide checker, epg url tester, tivimate epg, iptv smarters epg, ott navigator epg',
  alternates: { canonical: 'https://orca4ktv.com/iptv-tools/epg-validator' },
  openGraph: {
    title: 'Free EPG / XMLTV URL Validator | ORCA 4K TV',
    description:
      'Validate your IPTV EPG before you import it: count channels and programmes, check the date range, and confirm the guide is fresh.',
    url: 'https://orca4ktv.com/iptv-tools/epg-validator',
    siteName: 'ORCA 4K TV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free EPG / XMLTV URL Validator',
    description: 'Spot a stale or broken IPTV EPG before it ruins your TiviMate setup.',
  },
}

const HOW_TO = [
  {
    name: 'Paste your XMLTV / EPG URL',
    text: 'Most IPTV providers expose the EPG at xmltv.php with the same username and password as your M3U URL. Paste the full URL (including credentials) into the field.',
  },
  {
    name: 'We fetch and parse the file',
    text: 'The XMLTV document is downloaded once on our server, parsed, and discarded. We never store the URL or its contents.',
  },
  {
    name: 'Review the report',
    text: 'You will see total channels, total programmes, the date range covered, and sample entries from both lists. A health badge tells you instantly whether the guide is healthy, sparse, or stale.',
  },
]

const FAQ = [
  {
    question: 'What is an EPG / XMLTV URL?',
    answer:
      'An EPG (Electronic Program Guide) is the schedule grid your IPTV player uses to show what is on every channel now and over the next several days. XMLTV is the standard XML format used to deliver that schedule. Most IPTV subscriptions expose it at a URL ending in xmltv.php.',
  },
  {
    question: 'How do I import an EPG into TiviMate, IPTV Smarters, or OTT Navigator?',
    answer:
      'In TiviMate go to Settings -> EPG -> Add EPG source and paste the URL. In IPTV Smarters Pro, open the playlist settings and add the URL under EPG. In OTT Navigator, go to Settings -> EPG -> Add EPG source. After importing, the player will download the guide and display it under each channel.',
  },
  {
    question: 'Why does my guide show empty in my player even though the EPG validates?',
    answer:
      'The most common cause is a tvg-id mismatch: your M3U channels use one set of IDs and the EPG uses different ones. Ask your provider whether they have a "matched" EPG URL for your specific playlist. Alternatively, the editor in your player may need a manual EPG refresh.',
  },
  {
    question: 'Does the validator handle gzipped EPG files (.xml.gz)?',
    answer:
      'Yes - we send Accept-Encoding: gzip and Node decodes the response automatically. If the URL ends in .xml.gz but the host serves it as raw bytes, the parser will still try and may fail. In that case, ask your provider for the plain .xml URL.',
  },
  {
    question: 'Will running this tool break my IPTV subscription?',
    answer:
      'No. The validator makes a single GET request - the same kind your IPTV player makes when refreshing the guide. We rate-limit each visitor to ten checks per hour, so usage stays modest.',
  },
  {
    question: 'Do you store my EPG URL?',
    answer:
      'No. The URL is fetched once on our server to read the XMLTV, then discarded. We persist only a hashed IP address (with a server-side salt) for rate limiting - never the URL or its contents.',
  },
]

export default function EpgValidatorPage() {
  return (
    <ToolLayout
      slug="epg-validator"
      category="Free IPTV tool"
      description={
        <>
          Paste any XMLTV / EPG URL. We fetch it, validate the XML, count channels and programmes, and show the date range so you can spot a stale or broken guide before you import it into your IPTV player.
        </>
      }
      howToSteps={HOW_TO}
      faq={FAQ}
    >
      <EpgValidatorClient />
    </ToolLayout>
  )
}
