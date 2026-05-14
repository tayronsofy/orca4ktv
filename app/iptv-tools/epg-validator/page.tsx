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
      learnMore={
        <>
          <div className="rounded-2xl bg-[#0a2547] border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-4">What an EPG is and why yours might be broken</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              The EPG (Electronic Program Guide) is the schedule grid that lets you see what is on every channel right now and several days ahead. It is delivered as an XML file in the XMLTV format - a flat list of <code>&lt;channel&gt;</code> entries (one per channel, each with a unique <code>id</code>) followed by <code>&lt;programme&gt;</code> entries (one per scheduled show, referencing a channel id and a start / stop time). Your IPTV player downloads the XMLTV file, matches each <code>&lt;channel id&gt;</code> against the <code>tvg-id</code> attribute on entries in your M3U playlist, and shows the matching programmes under that channel.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The whole system depends on those IDs lining up exactly. If your playlist channel says <code>tvg-id=&quot;skysports1.uk&quot;</code> and your EPG says <code>id=&quot;Sky.Sports.1.UK&quot;</code>, the player has no way to connect them - and you get a beautifully formatted but completely empty guide. That is the single most common cause of &quot;the EPG is not loading&quot; complaints.
            </p>
          </div>

          <div className="rounded-2xl bg-[#0a2547] border border-white/10 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-black mb-4">Common XMLTV problems this validator catches</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong className="text-white">Stale guides.</strong> If the latest <code>&lt;programme&gt;</code> entry ends before today, the EPG has not been refreshed and your player will show empty schedules from now onwards. The date-range badge tells you immediately whether the file is current or stuck several days in the past.
            </p>
            <p className="text-gray-300 leading-relaxed mb-3">
              <strong className="text-white">Sparse channel coverage.</strong> A subscription with 5,000 live channels but an EPG that lists only 200 channels means most of your guide will be empty regardless of ID matching. Compare the channel-count number here against your playlist channel count from the M3U Checker.
            </p>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">Encoding or parser errors.</strong> Some providers serve malformed XML (unescaped ampersands, broken UTF-8) or a gzipped file with the wrong content-type. The validator surfaces these as parse errors so you can ask your provider to fix the source instead of fighting your player&apos;s settings.
            </p>
          </div>
        </>
      }
    >
      <EpgValidatorClient />
    </ToolLayout>
  )
}
