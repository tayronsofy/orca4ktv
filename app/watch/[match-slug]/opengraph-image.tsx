import { ImageResponse } from 'next/og'
import matchesData from '@/data/matches.json'
import type { Fixture } from '@/lib/sports-api'

export const runtime = 'edge'
export const alt = 'Orca 4K TV — Live Match Stream'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OgImage({
  params,
}: {
  params: Promise<{ 'match-slug': string }>
}) {
  const { 'match-slug': slug } = await params
  const match = (matchesData.matches as Fixture[]).find(m => m.slug === slug)

  const home = match?.homeTeam ?? 'Home Team'
  const away = match?.awayTeam ?? 'Away Team'
  const league = match?.league ?? 'Live Match'
  const isLive = match?.status && ['1H','HT','2H','ET','BT','P'].includes(match.status)

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%', height: '100%',
          background: 'linear-gradient(135deg, #000a1c 0%, #000a1c 50%, #000a1c 100%)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'sans-serif', position: 'relative',
        }}
      >
        {/* Top accent bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 6,
          background: 'linear-gradient(90deg, #00e676, #00b4ff)',
        }} />

        {/* League pill */}
        <div style={{
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 999, padding: '8px 20px',
          color: '#888', fontSize: 18, fontWeight: 600,
          marginBottom: 36, letterSpacing: '0.05em',
        }}>
          {league}
        </div>

        {/* Match title */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 40, marginBottom: 32,
        }}>
          <span style={{ color: '#fff', fontSize: 64, fontWeight: 900, textAlign: 'right', maxWidth: 380 }}>
            {home}
          </span>
          <span style={{ color: '#333', fontSize: 56, fontWeight: 900 }}>VS</span>
          <span style={{ color: '#fff', fontSize: 64, fontWeight: 900, textAlign: 'left', maxWidth: 380 }}>
            {away}
          </span>
        </div>

        {/* LIVE badge or Stream badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: isLive ? 'rgba(255, 23, 68, 0.15)' : 'rgba(0, 230, 118, 0.12)',
          border: `1px solid ${isLive ? 'rgba(255,23,68,0.5)' : 'rgba(0,230,118,0.4)'}`,
          borderRadius: 999, padding: '10px 28px',
        }}>
          <div style={{
            width: 12, height: 12, borderRadius: '50%',
            background: isLive ? '#ff1744' : '#00e676',
          }} />
          <span style={{
            color: isLive ? '#ff1744' : '#00e676',
            fontSize: 22, fontWeight: 900, letterSpacing: '0.12em',
          }}>
            {isLive ? '● LIVE NOW' : '▶ STREAM IN 4K'}
          </span>
        </div>

        {/* Brand */}
        <div style={{
          position: 'absolute', bottom: 28, right: 36,
          color: '#444', fontSize: 18, fontWeight: 700, letterSpacing: '0.05em',
        }}>
          orca4ktv.com
        </div>

        {/* Bottom accent bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 6,
          background: 'linear-gradient(90deg, #0066CC, #2563eb)',
        }} />
      </div>
    ),
    { ...size }
  )
}
