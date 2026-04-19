'use client'

import useSWR from 'swr'
import { motion } from 'framer-motion'
import type { Fixture } from '@/lib/sports-api'

interface Props {
  fixtureId: number
  initial: { home: number | null; away: number | null; elapsed: number | null; status: string }
  homeTeam: string
  awayTeam: string
}

const fetcher = (url: string) => fetch(url).then(r => r.json())

export default function LiveScoreWidget({ fixtureId, initial, homeTeam, awayTeam }: Props) {
  const { data } = useSWR<Fixture>(
    `/api/live-score/${fixtureId}`,
    fetcher,
    { refreshInterval: 60_000, fallbackData: undefined }
  )

  const homeScore = data?.homeScore ?? initial.home ?? 0
  const awayScore = data?.awayScore ?? initial.away ?? 0
  const elapsed   = data?.elapsed  ?? initial.elapsed
  const status    = data?.status   ?? initial.status

  const period = status === 'HT' ? 'Half Time'
    : status === 'ET' ? 'Extra Time'
    : elapsed           ? `${elapsed}'`
    : 'Live'

  return (
    <div className="flex flex-col items-center gap-4">

      {/* LIVE badge */}
      <div className="flex items-center gap-2">
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-[#ff1744]"
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
        />
        <span className="text-[#ff1744] font-black text-sm tracking-widest uppercase">
          Live · {period}
        </span>
      </div>

      {/* Score */}
      <div className="flex items-center gap-4 md:gap-8">
        <TeamScore name={homeTeam} score={homeScore} align="right" />

        <div className="flex flex-col items-center">
          <span className="text-5xl md:text-7xl font-black text-white tabular-nums leading-none">
            {homeScore} <span className="text-gray-600">–</span> {awayScore}
          </span>
        </div>

        <TeamScore name={awayTeam} score={awayScore} align="left" />
      </div>

      <p className="text-xs text-gray-600">
        Updates every 60 seconds
      </p>
    </div>
  )
}

function TeamScore({ name, score, align }: { name: string; score: number; align: 'left' | 'right' }) {
  return (
    <div className={`hidden md:flex flex-col items-${align === 'right' ? 'end' : 'start'} gap-1`}>
      <span className="text-gray-400 text-sm font-medium max-w-[120px] text-right leading-tight">
        {name}
      </span>
    </div>
  )
}
