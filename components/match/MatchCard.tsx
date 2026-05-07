import Image from 'next/image'
import Link from 'next/link'
import type { Fixture } from '@/lib/sports-api'
import type { MatchState } from '@/lib/match-utils'
import { formatKickoff } from '@/lib/match-utils'

interface Props {
  match: Fixture
  state: MatchState
}

export default function MatchCard({ match, state }: Props) {
  return (
    <Link
      href={`/watch/${match.slug}`}
      className="block bg-[#111] border border-white/10 rounded-2xl p-5 hover:border-white/20 hover:bg-[#001530] transition-all group"
    >
      {/* League row */}
      <div className="flex items-center gap-2 mb-5 min-w-0">
        {state === 'live' && (
          <span className="flex items-center gap-1.5 text-[10px] font-black text-red-400 uppercase tracking-widest flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
            Live
          </span>
        )}
        {match.leagueLogo && (
          <Image
            src={match.leagueLogo}
            alt={match.league}
            width={16}
            height={16}
            className="w-4 h-4 object-contain flex-shrink-0"
          />
        )}
        <span className="text-gray-500 text-xs font-semibold truncate">{match.league}</span>
        <span className="text-gray-700 text-xs flex-shrink-0">·</span>
        <span className="text-gray-600 text-xs flex-shrink-0 truncate">{match.round}</span>
      </div>

      {/* Teams + score/time */}
      <div className="flex items-center justify-between gap-2">
        {/* Home team */}
        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          {match.homeLogo ? (
            <Image
              src={match.homeLogo}
              alt={match.homeTeam}
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-sm">
              {match.homeTeam[0]}
            </div>
          )}
          <span className="text-white text-xs font-bold text-center leading-tight line-clamp-2">{match.homeTeam}</span>
        </div>

        {/* Center: score or kickoff */}
        <div className="flex flex-col items-center gap-1 flex-shrink-0 min-w-[56px]">
          {state === 'live' && (
            <>
              <span className="text-2xl font-black text-white tabular-nums">
                {match.homeScore ?? 0} - {match.awayScore ?? 0}
              </span>
              <span className="text-[10px] text-red-400 font-bold">{match.elapsed}&apos;</span>
            </>
          )}
          {state === 'post' && (
            <>
              <span className="text-2xl font-black text-white tabular-nums">
                {match.homeScore ?? '?'} - {match.awayScore ?? '?'}
              </span>
              <span className="text-[10px] text-gray-500 font-bold uppercase">FT</span>
            </>
          )}
          {state === 'pre' && (
            <>
              <span className="text-lg font-black text-gray-600">vs</span>
              <span className="text-[10px] text-gray-500 text-center leading-tight">
                {formatKickoff(match.kickoff, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </>
          )}
        </div>

        {/* Away team */}
        <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
          {match.awayLogo ? (
            <Image
              src={match.awayLogo}
              alt={match.awayTeam}
              width={48}
              height={48}
              className="w-10 h-10 md:w-12 md:h-12 object-contain"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-black text-sm">
              {match.awayTeam[0]}
            </div>
          )}
          <span className="text-white text-xs font-bold text-center leading-tight line-clamp-2">{match.awayTeam}</span>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-5 text-center">
        {state === 'live' && (
          <span className="inline-flex items-center gap-1.5 bg-[#00e676] text-black text-xs font-black px-4 py-2 rounded-full group-hover:bg-[#00c962] transition-colors">
            Watch in 4K →
          </span>
        )}
        {state === 'pre' && (
          <span className="inline-flex items-center gap-1.5 bg-[#003580]/20 border border-[#003580]/40 text-[#00E5FF] text-xs font-black px-4 py-2 rounded-full group-hover:bg-[#003580]/30 transition-colors">
            Get Match Pass →
          </span>
        )}
        {state === 'post' && (
          <span className="inline-flex items-center gap-1.5 bg-white/5 border border-white/10 text-gray-400 text-xs font-black px-4 py-2 rounded-full group-hover:bg-white/10 transition-colors">
            Watch Replay →
          </span>
        )}
      </div>
    </Link>
  )
}
