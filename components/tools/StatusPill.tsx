import type { ReactNode } from 'react'

export type Status = 'working' | 'slow' | 'dead' | 'pending'

interface Props {
  status: Status
  children?: ReactNode
}

const STYLES: Record<Status, { bg: string; text: string; border: string; label: string }> = {
  working: { bg: 'bg-emerald-500/15', text: 'text-emerald-300', border: 'border-emerald-400/40', label: 'Working' },
  slow: { bg: 'bg-amber-500/15', text: 'text-amber-300', border: 'border-amber-400/40', label: 'Slow' },
  dead: { bg: 'bg-rose-500/15', text: 'text-rose-300', border: 'border-rose-400/40', label: 'Dead' },
  pending: { bg: 'bg-white/5', text: 'text-gray-300', border: 'border-white/15', label: 'Checking…' },
}

export default function StatusPill({ status, children }: Props) {
  const s = STYLES[status]
  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold border ${s.bg} ${s.text} ${s.border}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.text.replace('text-', 'bg-')}`} />
      {children ?? s.label}
    </span>
  )
}
