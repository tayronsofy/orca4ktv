'use client'

import React from 'react'

// yellow = pending_payment | pending | draft · amber = paid · green = active | sent | available | published
// gray = expired | disabled · red = cancelled | rejected · orange = suspended | in_use
const COLOR_MAP: Record<string, string> = {
  pending_payment: 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/30',
  pending: 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/30',
  draft: 'bg-yellow-500/10 text-yellow-400 ring-yellow-500/30',
  paid: 'bg-amber-500/10 text-amber-400 ring-amber-500/30',
  active: 'bg-green-500/10 text-green-400 ring-green-500/30',
  sent: 'bg-green-500/10 text-green-400 ring-green-500/30',
  available: 'bg-green-500/10 text-green-400 ring-green-500/30',
  published: 'bg-green-500/10 text-green-400 ring-green-500/30',
  expired: 'bg-gray-500/10 text-gray-400 ring-gray-500/30',
  disabled: 'bg-gray-500/10 text-gray-400 ring-gray-500/30',
  cancelled: 'bg-red-500/10 text-red-400 ring-red-500/30',
  rejected: 'bg-red-500/10 text-red-400 ring-red-500/30',
  suspended: 'bg-orange-500/10 text-orange-400 ring-orange-500/30',
  in_use: 'bg-orange-500/10 text-orange-400 ring-orange-500/30',
}

const FALLBACK = 'bg-gray-500/10 text-gray-400 ring-gray-500/30'

export default function StatusBadge({ status }: { status: string }) {
  const cls = COLOR_MAP[status] || FALLBACK
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wide ring-1 ${cls}`}>
      {status.replace(/_/g, ' ')}
    </span>
  )
}
