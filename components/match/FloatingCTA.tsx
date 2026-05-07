'use client'

import Link from 'next/link'
import { Zap, MessageCircle } from 'lucide-react'

interface Props {
  matchSlug: string
  state: 'pre' | 'live' | 'post'
}

export default function FloatingCTA({ matchSlug, state }: Props) {
  const tgBot = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? 'Orca4ktv'
  const tgLink = `https://t.me/${tgBot}?start=match_${matchSlug}`

  const primaryLabel = state === 'post'
    ? 'Watch Full Replay'
    : state === 'live'
    ? 'Watch Live Now - 4K'
    : 'Get Instant Match Pass'

  return (
    /* Spacer so content isn't hidden behind the fixed bar */
    <>
      <div className="h-24 md:hidden" aria-hidden />

      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        {/* Gradient fade above bar */}
        <div className="h-6 bg-gradient-to-t from-[#000a1c] to-transparent pointer-events-none" />

        <div className="bg-[#000a1c] border-t border-white/8 px-4 py-3 flex gap-3">
          {/* Primary CTA */}
          <Link
            href="/order?plan=1-month&connections=1"
            className="flex-1 flex items-center justify-center gap-2 bg-[#00e676] hover:bg-[#00c962] text-black font-black text-sm rounded-xl py-3 transition-colors"
          >
            <Zap className="w-4 h-4" />
            {primaryLabel}
          </Link>

          {/* Secondary CTA - Telegram free trial */}
          <a
            href={tgLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#229ED9] hover:bg-[#1a8bbf] text-white font-bold text-sm rounded-xl py-3 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Free 2-Hr Trial
          </a>
        </div>
      </div>

      {/* Desktop inline CTA strip */}
      <div className="hidden md:flex max-w-4xl mx-auto px-4 gap-4 py-6">
        <Link
          href="/order?plan=1-month&connections=1"
          className="flex-1 flex items-center justify-center gap-2 bg-[#00e676] hover:bg-[#00c962] text-black font-black text-base rounded-2xl py-4 transition-colors"
        >
          <Zap className="w-5 h-5" />
          {primaryLabel}
        </Link>
        <a
          href={tgLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 bg-[#229ED9] hover:bg-[#1a8bbf] text-white font-bold text-base rounded-2xl py-4 transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
          Start Free 2-Hour Trial on Telegram
        </a>
      </div>
    </>
  )
}
