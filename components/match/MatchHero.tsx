'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Zap, Bell, Play, RotateCcw } from 'lucide-react'
import CountdownTimer from './CountdownTimer'
import LiveScoreWidget from './LiveScoreWidget'
import type { Fixture } from '@/lib/sports-api'
import type { MatchState } from '@/lib/match-utils'

interface Props {
  match: Fixture
  state: MatchState
}

export default function MatchHero({ match, state }: Props) {
  const tgBot = process.env.NEXT_PUBLIC_TELEGRAM_BOT_USERNAME ?? 'Orca4ktv'

  return (
    <section className="relative overflow-hidden bg-[#000a1c] pt-10 pb-14 px-4">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#00e676]/5 rounded-full blur-[120px]" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[300px] bg-[#00b4ff]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto">
        {/* League badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5">
            {match.leagueLogo && (
              <Image src={match.leagueLogo} alt={match.league} className="w-4 h-4 object-contain" width={16} height={16} />
            )}
            <span className="text-gray-400 text-xs font-semibold tracking-wide">{match.league}</span>
            <span className="text-gray-600">·</span>
            <span className="text-gray-500 text-xs">{match.round}</span>
          </div>
        </div>

        {/* Team logos + names */}
        <div className="flex items-center justify-center gap-4 md:gap-10 mb-10">
          <TeamBlock name={match.homeTeam} logo={match.homeLogo} />

          <div className="flex flex-col items-center gap-1">
            <span className="text-gray-600 font-black text-xl md:text-3xl">VS</span>
            {state === 'live' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 bg-[#ff1744]/15 border border-[#ff1744]/40 rounded-full px-3 py-1"
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-[#ff1744]"
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
                <span className="text-[#ff1744] text-xs font-black tracking-widest">LIVE</span>
              </motion.div>
            )}
          </div>

          <TeamBlock name={match.awayTeam} logo={match.awayLogo} />
        </div>

        {/* State-aware centre section */}
        <motion.div
          key={state}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-8"
        >
          {state === 'pre' && (
            <>
              <CountdownTimer kickoff={match.kickoff} />
              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
                <Link
                  href="/order?plan=1-month&connections=1"
                  className="flex-1 flex items-center justify-center gap-2 bg-[#00e676] hover:bg-[#00c962] text-black font-black py-3.5 rounded-xl transition-colors text-sm"
                >
                  <Zap className="w-4 h-4" />
                  Get Match Pass
                </Link>
                <a
                  href={`https://t.me/${tgBot}?start=match_${match.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/8 hover:bg-white/12 border border-white/10 text-white font-bold py-3.5 rounded-xl transition-colors text-sm"
                >
                  <Bell className="w-4 h-4" />
                  Remind Me on Telegram
                </a>
              </div>
            </>
          )}

          {state === 'live' && (
            <>
              <LiveScoreWidget
                fixtureId={match.fixtureId}
                initial={{
                  home:    match.homeScore,
                  away:    match.awayScore,
                  elapsed: match.elapsed,
                  status:  match.status,
                }}
                homeTeam={match.homeTeam}
                awayTeam={match.awayTeam}
              />
              <Link
                href="/order?plan=1-month&connections=1"
                className="flex items-center gap-2 bg-[#00e676] hover:bg-[#00c962] text-black font-black px-10 py-4 rounded-2xl text-base transition-colors"
              >
                <Play className="w-5 h-5 fill-black" />
                Watch in 4K Now
              </Link>
            </>
          )}

          {state === 'post' && (
            <>
              <div className="text-center">
                <p className="text-gray-400 text-lg mb-2">Full time</p>
                <div className="text-5xl font-black text-white tabular-nums">
                  {match.homeScore ?? '?'} - {match.awayScore ?? '?'}
                </div>
                <p className="text-gray-500 text-sm mt-2">
                  {match.homeTeam} vs {match.awayTeam}
                </p>
              </div>
              <Link
                href="/order?plan=1-month&connections=1"
                className="flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-bold px-10 py-4 rounded-2xl text-base transition-colors"
              >
                <RotateCcw className="w-5 h-5" />
                Watch Full Replay
              </Link>
            </>
          )}
        </motion.div>
      </div>
    </section>
  )
}

function TeamBlock({ name, logo }: { name: string; logo: string }) {
  return (
    <div className="flex flex-col items-center gap-3 w-28 md:w-40">
      {logo ? (
        <Image
          src={logo}
          alt={name}
          className="w-14 h-14 md:w-20 md:h-20 object-contain drop-shadow-lg"
          width={80}
          height={80}
          priority
        />
      ) : (
        <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-2xl font-black text-gray-600">
          {name[0]}
        </div>
      )}
      <span className="text-white font-bold text-sm md:text-base text-center leading-tight">{name}</span>
    </div>
  )
}
