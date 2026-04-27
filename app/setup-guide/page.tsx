import { Suspense, lazy } from 'react'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata = {
  title: {
    absolute: 'IPTV Setup Guide 2026 — Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV · 5-Minute Install | ORCA 4K TV',
  },
  description:
    'Complete IPTV setup guide for 2026. Install IPTV on Firestick 4K Max, Apple TV 4K, Android TV 14, Samsung Tizen, LG webOS, MAG-box, Formuler, iOS, iPadOS, Android, Windows, macOS in under 5 minutes. M3U URL & Xtream codes setup for TiviMate, IPTV Smarters Pro, OTT Navigator, GSE Smart IPTV, Smart IPTV. EPG / catch-up TV configuration, AI troubleshooter, VPN allowed, AES-256 encrypted, Anti Freeze CDN, instant activation.',
  keywords:
    'iptv setup guide 2026, how to install iptv, iptv installation tutorial, iptv firestick 4k max setup, iptv apple tv 4k setup, iptv android tv 14 setup, iptv smart tv samsung lg setup, iptv mag box setup, iptv formuler setup, iptv ios iphone ipad setup, iptv android setup, iptv windows mac setup, tivimate iptv setup, iptv smarters pro setup, ott navigator iptv setup, gse smart iptv setup, smart iptv setup, m3u playlist setup, m3u url setup, xtream codes setup, iptv epg setup, electronic program guide setup, 7-day catch-up tv setup, iptv buffering fix, iptv black screen fix, iptv login failed fix, iptv credentials, iptv with vpn, vpn allowed iptv, iptv anti freeze cdn, iptv aes-256 encryption, multi-device iptv, instant activation iptv, rapid iptv setup, fast iptv setup, 5-minute iptv setup, iptv troubleshooting, iptv setup ai assistant',
  openGraph: {
    title: 'IPTV Setup Guide 2026 — Firestick 4K Max, Apple TV 4K, Smart TV in 5 Minutes',
    description:
      'Step-by-step IPTV setup for Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, MAG, iOS, Android. M3U + Xtream codes, EPG, 7-day catch-up. AI troubleshooter included.',
    url: 'https://orca4ktv.com/setup-guide',
    type: 'website' as const,
    images: [{ url: 'https://orca4ktv.com/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
  },
  alternates: {
    canonical: 'https://orca4ktv.com/setup-guide',
    languages: {
      'en-US': 'https://orca4ktv.com/setup-guide',
      'x-default': 'https://orca4ktv.com/setup-guide',
    },
  },
  twitter: {
    card: 'summary_large_image' as const,
    title: 'IPTV Setup Guide 2026 — 5-Minute Install',
    description:
      'IPTV setup for Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, MAG, iOS, Android. M3U URL + Xtream codes + EPG. AI troubleshooter.',
  },
}

const SetupGuideContent = lazy(() => import('./SetupGuideContent'))

export default function SetupGuidePage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/' },
          { name: 'IPTV Setup Guide', url: 'https://orca4ktv.com/setup-guide' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebPage',
                '@id': 'https://orca4ktv.com/setup-guide#webpage',
                url: 'https://orca4ktv.com/setup-guide',
                name: 'IPTV Setup Guide 2026 — Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV',
                description:
                  'Complete 5-minute IPTV setup guide for 2026. Install IPTV on Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, MAG-box, iOS, Android, Windows, macOS via TiviMate, IPTV Smarters Pro, OTT Navigator. M3U URL + Xtream codes + EPG configuration with AI troubleshooter.',
                isPartOf: { '@id': 'https://orca4ktv.com/#website' },
                inLanguage: 'en-US',
              },
              {
                '@type': 'Service',
                '@id': 'https://orca4ktv.com/setup-guide#service',
                name: 'ORCA 4K TV — IPTV Installation & Activation Service',
                serviceType: 'IPTV Setup, Installation & 24/7 Customer Support',
                provider: { '@id': 'https://orca4ktv.com/#organization' },
                areaServed: { '@type': 'Place', name: 'Worldwide' },
                audience: {
                  '@type': 'Audience',
                  audienceType: 'New IPTV subscribers, cord-cutters, multi-device households',
                },
                availableLanguage: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Dutch', 'Arabic'],
                hoursAvailable: {
                  '@type': 'OpeningHoursSpecification',
                  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                  opens: '00:00',
                  closes: '23:59',
                },
                description:
                  'Step-by-step IPTV setup, instant activation, and 24/7 customer support for ORCA 4K TV subscribers. Compatible with Firestick 4K Max, Amazon Fire TV Cube, Apple TV 4K (3rd gen), Android TV 14, Nvidia Shield, Onn 4K Pro, Chromecast with Google TV, Samsung Tizen, LG webOS, MAG-box, Formuler, iOS, iPadOS, Android, Windows, macOS, Linux, and any HTML5 browser. M3U URL + Xtream codes + EPG configuration via TiviMate, IPTV Smarters Pro, OTT Navigator, GSE Smart IPTV, Smart IPTV, Perfect Player.',
              },
              {
                '@type': 'HowTo',
                '@id': 'https://orca4ktv.com/setup-guide#howto',
                name: 'How to Set Up ORCA 4K TV IPTV in Under 5 Minutes (Rapid Setup, Instant Activation)',
                description:
                  'Step-by-step rapid setup for the ORCA 4K TV IPTV subscription on Firestick 4K Max, Apple TV 4K, Android TV 14, Smart TV, MAG-box, iOS, and Android. Fast IPTV setup with instant activation, M3U + Xtream codes, EPG and 7-day catch-up TV across full multi-device compatibility.',
                inLanguage: 'en',
                totalTime: 'PT5M',
                estimatedCost: { '@type': 'MonetaryAmount', currency: 'USD', value: '0' },
                tool: [
                  { '@type': 'HowToTool', name: 'TiviMate' },
                  { '@type': 'HowToTool', name: 'IPTV Smarters Pro' },
                  { '@type': 'HowToTool', name: 'OTT Navigator' },
                  { '@type': 'HowToTool', name: 'GSE Smart IPTV' },
                  { '@type': 'HowToTool', name: 'Smart IPTV (siptv.app)' },
                  { '@type': 'HowToTool', name: 'Perfect Player' },
                ],
                supply: [
                  { '@type': 'HowToSupply', name: 'M3U URL or Xtream Codes credentials from your ORCA 4K TV order email' },
                  { '@type': 'HowToSupply', name: 'EPG URL from your ORCA 4K TV dashboard for the smart Electronic Programme Guide' },
                  { '@type': 'HowToSupply', name: 'Internet connection of 25 Mbps or higher (recommended for 4K HDR streaming)' },
                  { '@type': 'HowToSupply', name: 'Compatible device: Firestick 4K Max / Apple TV 4K / Android TV 14 / Samsung Tizen / LG webOS / MAG / Formuler / iOS / Android / PC' },
                ],
                step: [
                  {
                    '@type': 'HowToStep',
                    position: 1,
                    name: 'Receive your IPTV credentials (instant activation)',
                    text: 'After checkout, ORCA 4K TV emails your unique M3U URL, EPG URL, and Xtream Codes (server URL, username, password) within minutes — IPTV instant start, no waiting, AES-256 encrypted.',
                    url: 'https://orca4ktv.com/setup-guide#credentials',
                  },
                  {
                    '@type': 'HowToStep',
                    position: 2,
                    name: 'Install your IPTV player',
                    text: 'Pick the right IPTV player for your device: TiviMate or IPTV Smarters Pro for Firestick 4K Max, Android TV 14, and Smart TV; OTT Navigator for power users; GSE Smart IPTV for iOS / iPadOS; Smart IPTV (siptv.app) for Samsung Tizen and LG webOS. All ship rapid-setup defaults that work with our service.',
                    url: 'https://orca4ktv.com/setup-guide#install',
                  },
                  {
                    '@type': 'HowToStep',
                    position: 3,
                    name: 'Add your M3U playlist or Xtream codes',
                    text: 'Open the player, choose Add Playlist, and paste your M3U URL — or enter your Xtream Codes (server URL, username, password) separately. The smart EPG guide and 7-day catch-up TV populate automatically once the playlist syncs.',
                    url: 'https://orca4ktv.com/setup-guide#playlist',
                  },
                  {
                    '@type': 'HowToStep',
                    position: 4,
                    name: 'Start streaming in 4K HDR',
                    text: 'Pick any of the 22,000+ live channels or 100,000+ on-demand titles and play. Buffer-free streaming kicks in via Anti Freeze CDN on a 25 Mbps+ connection. VPN allowed throughout — IPTV with VPN is fully supported on every plan.',
                    url: 'https://orca4ktv.com/setup-guide#start',
                  },
                ],
              },
            ],
          }),
        }}
      />
      <Suspense fallback={null}>
        <SetupGuideContent />
      </Suspense>
    </>
  )
}
