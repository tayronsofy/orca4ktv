import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'IPTV Glossary 2026 — EPG, M3U, Xtream Codes | ORCA 4K TV',
  description:
    'IPTV terms explained: EPG, M3U, Xtream Codes, AES-256, catch-up TV, multi-device, buffer-free streaming. Definitions for the ORCA 4K TV subscription.',
  keywords:
    'IPTV glossary, electronic program guide, smart EPG guide, M3U playlist, Xtream Codes, catch up feature, IPTV catch up TV, AES-256 encryption, multi-device compatibility, IPTV multi-device, IPTV device compatibility, buffer-free streaming, zero buffering, Anti Freeze technology, secure IPTV access, encrypted IPTV streaming, instant activation, IPTV instant start, premium IPTV channels, on-demand movies, 4K streaming, HDR streaming, VPN allowed, IPTV with VPN',
  alternates: { canonical: 'https://orca4ktv.com/glossary' },
  openGraph: {
    title: 'IPTV Glossary 2026 — EPG, M3U, Xtream Codes | ORCA 4K TV',
    description:
      'Authoritative definitions of the IPTV terms our customers ask about — EPG, M3U, Xtream, AES-256, catch up TV, anti-freeze CDN and more.',
    url: 'https://orca4ktv.com/glossary',
    siteName: 'ORCA 4K TV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPTV Glossary 2026 — EPG, M3U, Xtream Codes | ORCA 4K TV',
    description: 'Authoritative IPTV definitions referenced for the ORCA 4K TV subscription.',
  },
}

interface GlossaryEntry {
  term: string
  short?: string
  definition: string
  also?: string[]
}

const GLOSSARY: GlossaryEntry[] = [
  {
    term: 'IPTV (Internet Protocol Television)',
    short: 'IPTV',
    definition:
      'IPTV delivers television over standard internet (IP) networks instead of satellite dish or coaxial cable. Channels and on-demand titles arrive as encrypted media streams that any compatible device can decode. Compared with cable, an IPTV subscription has no installer visit, no fixed regional package, and supports true multi-device viewing — a single account can run on a Smart TV, Firestick, smartphone, and tablet at the same time. ORCA 4K TV is an IPTV streaming service offering 22,000+ premium IPTV channels in HD and 4K.',
    also: ['IPTV streaming service', 'IPTV service provider', 'IPTV subscription'],
  },
  {
    term: 'M3U Playlist',
    definition:
      'An M3U file is a simple text playlist that lists every channel and stream URL in your subscription. Almost every IPTV player (TiviMate, IPTV Smarters Pro, GSE Smart IPTV, Perfect Player) accepts an M3U URL during setup. ORCA 4K TV provides each customer with a unique authenticated M3U URL at activation; updating the URL on a new device migrates your service in seconds.',
  },
  {
    term: 'Xtream Codes API',
    definition:
      'Xtream Codes is a structured API protocol that exposes channels, EPG data, and VOD as separate endpoints rather than a flat playlist. It powers richer player UIs — categories, search, live previews, last-watched. ORCA 4K TV exposes both M3U and Xtream Codes credentials; players that support Xtream (TiviMate, OTT Navigator, IPTV Smarters Pro) get the smart EPG guide and catch up feature out of the box.',
  },
  {
    term: 'EPG / Smart EPG Guide / Electronic Program Guide',
    definition:
      'The electronic program guide (EPG) is the live schedule grid showing what is on every channel now and over the next 7 days. ORCA 4K TV ships a smart EPG guide with accurate now-playing data, episode synopses, and instant filtering by genre, language, or country — usable across Smart TV, Firestick, Android, iOS, and Apple TV.',
    also: ['EPG URL'],
  },
  {
    term: 'Catch Up Feature / IPTV Catch Up TV',
    definition:
      'IPTV catch up TV lets you replay any program that already aired, up to 7 days back, on supported channels. Useful for anyone in a different timezone or who missed a live event. ORCA 4K TV enables the catch up feature on every plan tier — open the smart EPG guide, scroll left, and play.',
  },
  {
    term: 'VOD (Video On Demand)',
    definition:
      "VOD is the on-demand library — movies and series you start whenever you want, similar to a streaming-platform catalogue. ORCA 4K TV's VOD library exceeds 100,000 titles in HD and 4K, refreshed continuously, available across multi-device compatibility. On-demand movies stream alongside live channels under the same IPTV subscription.",
  },
  {
    term: '4K Ultra-HD Streaming',
    definition:
      '4K streaming delivers 3840×2160 resolution — roughly four times the pixel count of Full-HD. A 4K IPTV subscription needs ~25 Mbps of stable bandwidth per stream. ORCA 4K TV serves true native 4K (not upscaled) on supported channels and major sporting events, with HDR streaming enabled where the source provides it.',
  },
  {
    term: 'HDR Streaming',
    definition:
      'HDR (High Dynamic Range) widens the brightness and color range of a video stream so highlights look brighter and shadows hold more detail. ORCA 4K TV supports HDR10 and HLG variants. Combined with 4K resolution, HDR streaming on a compatible TV produces noticeably richer cinematic and sports footage.',
  },
  {
    term: 'Anti-Freeze Technology',
    definition:
      'Anti Freeze technology is the ORCA 4K TV proprietary CDN routing layer that picks the lowest-latency edge in real time and reroutes around regional congestion during high-load events (top European club football finals, the championship game in February, major international football tournament matches). It is what underpins the buffer-free streaming and zero buffering claims for customers on a 25+ Mbps connection.',
  },
  {
    term: 'Multi-Device Compatibility',
    definition:
      'A single ORCA 4K TV IPTV subscription works on Smart TV (Samsung Tizen, LG webOS, Sony, Hisense, Philips), Firestick / Fire TV, Android TV, Apple TV, iOS / iPadOS, Android phones and tablets, MAG box (250 / 322 / 424 / 522 / 524), Windows / macOS / Linux PCs, and any modern web browser. IPTV multi-device support is enabled on every plan, with up to 4 simultaneous connections depending on tier.',
  },
  {
    term: 'AES-256 Encryption',
    definition:
      'AES-256 (Advanced Encryption Standard, 256-bit key) is the symmetric cipher defined in NIST FIPS 197 and used in TLS 1.3 — the same standard banks and government systems rely on. ORCA 4K TV applies AES-256 encryption end-to-end, which is what enables encrypted IPTV streaming and secure IPTV access. Read the full security policy at /security.',
  },
  {
    term: 'Secure IPTV Access / Encrypted IPTV Streaming',
    definition:
      'Secure streaming means the channel URL itself, the EPG metadata, and the player handshake are all wrapped in TLS 1.3 with AES-256. Each customer gets unique, signed credentials so playlists cannot be replayed by an unauthorized third party. Encrypted IPTV streaming is the default on every ORCA 4K TV connection.',
  },
  {
    term: 'Buffer-Free Streaming / Zero Buffering',
    definition:
      'Buffering happens when the player runs out of decoded video and pauses to redownload. Zero buffering is achieved with adequate bandwidth (25 Mbps+ for 4K), a low-latency CDN, and adaptive bitrate. ORCA 4K TV combines all three under Anti-Freeze technology to deliver buffer-free streaming on supported connections, even during peak match-day traffic.',
  },
  {
    term: 'Instant Activation / IPTV Instant Start',
    definition:
      'Instant activation means your IPTV subscription credentials arrive within minutes of payment. ORCA 4K TV automates issuing M3U URLs and Xtream Codes the moment your order clears, so IPTV instant start is the rule, not the exception. From checkout to first live channel typically takes under 5 minutes.',
  },
  {
    term: 'IPTV with VPN / VPN Allowed',
    definition:
      'A VPN encrypts the connection between your device and the internet. ORCA 4K TV explicitly allows IPTV with VPN — connection speed is not throttled, geo-routing keeps working, and customer support handles VPN-related setup the same as any other connection. Many users prefer VPN for ISP-throttling avoidance; the service is fully VPN allowed.',
  },
  {
    term: 'IPTV Reseller',
    definition:
      'A reseller program lets a third party purchase credit packs and resell ORCA 4K TV subscriptions to their own customers under their own brand. ORCA 4K TV provides a white-label panel, training, and 24/7 dealer support across packs of 120, 240, and 500 credits — a full IPTV service provider stack for partners.',
  },
]

export default function GlossaryPage() {
  const lastReviewed = new Date().toISOString().split('T')[0]

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/' },
          { name: 'IPTV Glossary', url: 'https://orca4ktv.com/glossary' },
        ]}
      />

      {/* DefinedTermSet schema — strong AEO signal: each entry is a citable definition */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DefinedTermSet',
            '@id': 'https://orca4ktv.com/glossary#termset',
            name: 'ORCA 4K TV IPTV Glossary',
            description:
              'Authoritative definitions for IPTV streaming terminology referenced across the ORCA 4K TV IPTV subscription.',
            inLanguage: 'en',
            hasDefinedTerm: GLOSSARY.map((g) => ({
              '@type': 'DefinedTerm',
              '@id': `https://orca4ktv.com/glossary#${slugifyTerm(g.term)}`,
              name: g.short ?? g.term,
              alternateName: g.term,
              description: g.definition,
              inDefinedTermSet: 'https://orca4ktv.com/glossary#termset',
            })),
          }),
        }}
      />

      <main className="min-h-screen bg-[#001f3f] text-white">
        <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
          <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:text-[#00E5FF]">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-white">IPTV Glossary</li>
            </ol>
          </nav>

          <header className="mb-12">
            <p className="text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em] mb-3">
              Reference
            </p>
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-[0.95] tracking-tight">
              IPTV Glossary
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
              Authoritative definitions for the IPTV streaming terminology our customers and partners ask about most often. Every term below is referenced directly across the ORCA 4K TV IPTV subscription.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last reviewed: {lastReviewed} · Maintained by the ORCA 4K TV Editorial Team
            </p>
          </header>

          <dl className="space-y-10">
            {GLOSSARY.map((g) => (
              <div
                key={g.term}
                id={slugifyTerm(g.term)}
                className="border-l-2 border-[#00E5FF]/30 pl-6"
              >
                <dt className="text-2xl md:text-3xl font-black text-white mb-3">
                  {g.term}
                </dt>
                <dd className="text-gray-300 leading-relaxed text-base md:text-lg">
                  {g.definition}
                </dd>
                {g.also && g.also.length > 0 && (
                  <p className="text-sm text-gray-500 mt-3">
                    Also referred to as: {g.also.join(', ')}
                  </p>
                )}
              </div>
            ))}
          </dl>

          <div className="mt-16 p-8 rounded-2xl bg-[#002952] border border-[#00E5FF]/20">
            <h2 className="text-2xl font-black mb-3">
              Try ORCA 4K TV with a Free Trial
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience smart EPG guide, catch up feature, AES-256 encryption, and buffer-free streaming firsthand. No credit card, instant activation.
            </p>
            <Link
              href="/trial"
              className="inline-block bg-[#00E5FF] hover:bg-[#22D3EE] text-[#001f3f] font-black px-8 py-4 rounded-full uppercase tracking-wider transition-colors"
            >
              Start Free Trial
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

function slugifyTerm(term: string): string {
  return term
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
