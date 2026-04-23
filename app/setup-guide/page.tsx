import { Suspense, lazy } from 'react'

export const metadata = {
  title: 'IPTV Setup Guide — SMART 4K',
  description: 'Step-by-step video tutorials and AI-powered troubleshooting for every device — Firestick, Apple, Android, Smart TV, MAG, and more.',
}

const SetupGuideContent = lazy(() => import('./SetupGuideContent'))

export default function SetupGuidePage() {
  return (
    <Suspense fallback={null}>
      <SetupGuideContent />
    </Suspense>
  )
}
