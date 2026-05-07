import type { Metadata } from 'next'
import ToolLayout from '@/components/tools/ToolLayout'
import XtreamConverterClient from '@/components/tools/XtreamConverterClient'

export const metadata: Metadata = {
  title: 'M3U ↔ Xtream Codes Converter — Generate M3U & EPG URLs | ORCA 4K TV',
  description:
    'Convert Xtream Codes credentials to M3U and EPG (XMLTV) URLs, or extract host, username and password from an existing get.php URL. Free, runs in your browser.',
  keywords:
    'xtream codes generator, xtream to m3u, m3u to xtream, xtream codes converter, get.php url generator, xmltv url generator, iptv epg url, xtream codes login generator',
  alternates: { canonical: 'https://orca4ktv.com/iptv-tools/xtream-converter' },
  openGraph: {
    title: 'M3U ↔ Xtream Codes Converter (free) | ORCA 4K TV',
    description:
      'Switch between Xtream Codes credentials and M3U / EPG URLs in one click. Pure browser-based — your credentials never leave your device.',
    url: 'https://orca4ktv.com/iptv-tools/xtream-converter',
    siteName: 'ORCA 4K TV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free M3U ↔ Xtream Codes Converter',
    description: 'Generate M3U and EPG URLs from your Xtream Codes login, or do the reverse. No signup.',
  },
}

const HOW_TO = [
  {
    name: 'Pick a direction',
    text: 'Use "Xtream → M3U / EPG" if your provider gave you a host, username and password. Use "M3U URL → Xtream" to recover the credentials hidden inside an existing get.php URL.',
  },
  {
    name: 'Fill in the details',
    text: 'Enter your host (with port), username and password — or paste the M3U URL. Everything stays in your browser; the conversion runs locally with no network call.',
  },
  {
    name: 'Copy the result into your IPTV player',
    text: 'TiviMate, IPTV Smarters Pro, OTT Navigator and most modern IPTV players accept either an M3U URL or Xtream credentials. Use the copy buttons to grab each URL.',
  },
]

const FAQ = [
  {
    question: 'What is Xtream Codes?',
    answer:
      'Xtream Codes is a structured API protocol that exposes IPTV channels, EPG data and on-demand content as separate endpoints. Most IPTV players support it because it allows richer features — categories, search, last-watched, full EPG — than a flat M3U playlist.',
  },
  {
    question: 'Is my password safe in this tool?',
    answer:
      'Yes. The conversion runs entirely in your browser using JavaScript. Your host, username and password are never sent to our servers, never logged, and never stored.',
  },
  {
    question: 'Why do I get both an M3U and an M3U Plus URL?',
    answer:
      'M3U Plus (type=m3u_plus) is the modern variant that includes channel logos, group titles and EPG IDs. Plain M3U is a stripped-down version some legacy players still need. Use M3U Plus unless your player has issues with it.',
  },
  {
    question: 'My host has https — does this still work?',
    answer:
      'Yes. Switch the protocol selector to HTTPS. Many IPTV providers run unencrypted HTTP, but a growing number now offer HTTPS endpoints for the player API and M3U download.',
  },
  {
    question: 'I pasted a URL but the converter says it is not Xtream — why?',
    answer:
      'The tool expects an Xtream Codes URL ending in get.php, player_api.php or xmltv.php with username and password query parameters. Bare playlist URLs without those parameters cannot be reversed because the credentials are not embedded.',
  },
  {
    question: 'Does ORCA 4K TV use Xtream Codes?',
    answer:
      'Yes. Every ORCA 4K TV subscription includes both an authenticated M3U URL and Xtream Codes credentials, so you can use any compatible IPTV player on Smart TV, Firestick, Android, iOS or Apple TV.',
  },
]

export default function XtreamConverterPage() {
  return (
    <ToolLayout
      slug="xtream-converter"
      category="Free IPTV tool"
      description={
        <>
          Convert Xtream Codes credentials into the M3U and EPG (XMLTV) URLs every IPTV player understands — or do the reverse and pull the host, username and password out of an existing M3U URL. Runs entirely in your browser.
        </>
      }
      howToSteps={HOW_TO}
      faq={FAQ}
    >
      <XtreamConverterClient />
    </ToolLayout>
  )
}
