import { Suspense, lazy } from 'react'

export const metadata = {
  title: 'IPTV Setup Guide 2026 — How to Install IPTV on Any Device | SMART 4K',
  description: 'Complete IPTV setup guide for Firestick, Android, Apple TV, Smart TV, MAG & PC. Step-by-step video tutorials for TiviMate, IPTV Smarters, Smart IPTV & more. AI troubleshooter included.',
  keywords: 'IPTV setup guide, how to install IPTV, IPTV Firestick setup, TiviMate IPTV setup, IPTV Smarters setup, M3U playlist setup, Xtream Codes setup, IPTV Android setup, IPTV Smart TV setup, EPG URL IPTV',
  openGraph: {
    title: 'IPTV Setup Guide 2026 — Install IPTV on Any Device',
    description: 'Step-by-step video tutorials for Firestick, Android, Apple, Smart TV & PC — plus an AI assistant to troubleshoot any issue.',
    url: 'https://smart4k.io/setup-guide',
  },
  alternates: {
    canonical: 'https://smart4k.io/setup-guide',
  },
}

const SetupGuideContent = lazy(() => import('./SetupGuideContent'))

export default function SetupGuidePage() {
  return (
    <Suspense fallback={null}>
      <SetupGuideContent />
    </Suspense>
  )
}
