'use client'

import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface Props {
  kickoff: string   // ISO-8601
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calc(kickoff: string): TimeLeft {
  const diff = Math.max(0, new Date(kickoff).getTime() - Date.now())
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
  }
}

function pad(n: number) { return String(n).padStart(2, '0') }

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white font-black text-2xl md:text-3xl tabular-nums">
        {pad(value)}
      </div>
      <span className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">{label}</span>
    </div>
  )
}

export default function CountdownTimer({ kickoff }: Props) {
  const [time, setTime] = useState<TimeLeft>(calc(kickoff))

  useEffect(() => {
    const id = setInterval(() => setTime(calc(kickoff)), 1000)
    return () => clearInterval(id)
  }, [kickoff])

  const isImminent =
    time.days === 0 && time.hours === 0 && time.minutes < 30

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center gap-2 text-gray-400 text-sm">
        <Clock className="w-4 h-4" />
        <span>Kicks off in</span>
      </div>

      <div className="flex gap-3">
        {time.days > 0 && <Unit value={time.days}    label="days"    />}
        <Unit value={time.hours}   label="hours"   />
        <Unit value={time.minutes} label="min"     />
        <Unit value={time.seconds} label="sec"     />
      </div>

      {isImminent && (
        <p className="text-[#00e676] text-sm font-bold animate-pulse">
          Starting very soon - get your stream ready!
        </p>
      )}
    </div>
  )
}
