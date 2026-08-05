import type { NextConfig } from 'next'

const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/_next/static/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*.:ext(png|jpg|jpeg|gif|webp|svg|ico|woff|woff2)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=604800, stale-while-revalidate=86400' }],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.orca4ktv.com' }],
        destination: 'https://orca4ktv.com/:path*',
        permanent: true,
      },
      // Legacy blog slug redirects — old slugs contained third-party trademarks
      { source: '/blog/stream-bundesliga-live-iptv-4k-no-blackouts',     destination: '/blog/stream-german-football-live-iptv-4k',                  permanent: true },
      { source: '/blog/stream-serie-a-live-iptv-4k-no-blackouts',        destination: '/blog/stream-italian-football-live-iptv-4k',                 permanent: true },
      { source: '/blog/stream-la-liga-live-iptv-4k-no-blackouts',        destination: '/blog/stream-spanish-football-live-iptv-4k',                 permanent: true },
      { source: '/blog/stream-premier-league-live-iptv-4k-no-blackouts', destination: '/blog/stream-uk-football-live-iptv-4k',                      permanent: true },
      { source: '/blog/stream-nhl-hockey-live-iptv-no-blackouts',        destination: '/blog/stream-pro-hockey-live-iptv-4k',                       permanent: true },
      { source: '/blog/stream-mlb-baseball-live-iptv-no-blackouts',      destination: '/blog/stream-pro-baseball-live-iptv',                        permanent: true },
      { source: '/blog/stream-nba-basketball-live-iptv-no-blackouts',    destination: '/blog/stream-pro-basketball-live-iptv-4k',                   permanent: true },
      { source: '/blog/stream-nfl-football-live-iptv-no-blackouts',      destination: '/blog/stream-american-football-live-iptv',                   permanent: true },
      { source: '/blog/how-to-watch-fifa-world-cup-2026',                destination: '/blog/how-to-stream-summer-2026-football-tournament',        permanent: true },
      { source: '/blog/how-to-watch-world-cup-2026',                     destination: '/blog/summer-2026-football-tournament-streaming-guide',      permanent: true },
    ]
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'flagcdn.com' },
      { protocol: 'https', hostname: 'orca4ktv.com' },
      { protocol: 'https', hostname: 'img.sofascore.com' },
      { protocol: 'https', hostname: 'ciwzqofczjlsfkiylpti.supabase.co' },
    ],
  },
}

export default nextConfig
