import { Suspense, lazy } from 'react'

export const metadata = {
  title: {
    absolute: 'IPTV Setup Guide | Firestick, Android & Smart TV | SMART 4K',
  },
  description: 'Step-by-step IPTV setup guide for Firestick, Android, Apple, Smart TV & MAG. Video tutorials for TiviMate, IPTV Smarters & more. AI troubleshooter included.',
  keywords: 'IPTV setup guide, how to install IPTV, IPTV Firestick setup, TiviMate IPTV setup, IPTV Smarters setup, M3U playlist setup, Xtream Codes setup, IPTV Android setup, IPTV Smart TV setup, EPG URL IPTV',
  openGraph: {
    title: 'IPTV Setup Guide | Firestick, Android & Smart TV | SMART 4K',
    description: 'Step-by-step IPTV setup guide for Firestick, Android, Apple, Smart TV & MAG. Video tutorials for TiviMate, IPTV Smarters & more. AI troubleshooter included.',
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
