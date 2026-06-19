import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'IPTV Security 2026 - AES-256, TLS 1.3, VPN | ORCA 4K TV',
  description:
    'How ORCA 4K TV protects your IPTV subscription: AES-256 encryption (NIST FIPS 197), TLS 1.3, VPN allowed, Anti Freeze CDN, 24/7 customer support.',
  keywords:
    'secure IPTV access, AES-256 encryption, encrypted IPTV streaming, secure streaming, IPTV with VPN, VPN allowed, Anti Freeze technology, buffer-free streaming, zero buffering, TLS 1.3, FIPS 197, IPTV security, premium IPTV channels, multi-device compatibility, 24/7 customer support, IPTV customer support',
  alternates: { canonical: 'https://orca4ktv.com/security' },
  openGraph: {
    title: 'IPTV Security 2026 - AES-256, TLS 1.3, VPN | ORCA 4K TV',
    description:
      'AES-256 encryption (FIPS-197), TLS 1.3, VPN allowed, Anti Freeze CDN - every ORCA 4K TV subscription.',
    url: 'https://orca4ktv.com/security',
    siteName: 'ORCA 4K TV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPTV Security 2026 - AES-256, TLS 1.3, VPN | ORCA 4K TV',
    description: 'How ORCA 4K TV secures every IPTV subscription with AES-256 and TLS 1.3.',
  },
}

export default function SecurityPage() {
  const lastReviewed = new Date().toISOString().split('T')[0]

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/iptv' },
          { name: 'Security & Encryption', url: 'https://orca4ktv.com/security' },
        ]}
      />

      {/* Service schema - explicit signal that this page describes a security-bearing service */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            '@id': 'https://orca4ktv.com/security#service',
            name: 'ORCA 4K TV - Encrypted IPTV Streaming',
            serviceType: 'Encrypted IPTV Streaming',
            provider: { '@id': 'https://orca4ktv.com/#organization' },
            areaServed: 'Worldwide',
            description:
              'Premium IPTV streaming service secured end-to-end with AES-256 encryption (NIST FIPS 197) over TLS 1.3, with VPN allowed, Anti Freeze CDN routing, and 24/7 customer support.',
            hoursAvailable: {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
              opens: '00:00',
              closes: '23:59',
            },
            audience: {
              '@type': 'Audience',
              audienceType: 'Privacy-conscious IPTV customers, VPN users, multi-device households',
            },
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
              <li className="text-white">Security & Encryption</li>
            </ol>
          </nav>

          <header className="mb-12">
            <p className="text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em] mb-3">
              Trust & Privacy
            </p>
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-[0.95] tracking-tight">
              Security & Encryption
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
              Every ORCA 4K TV IPTV subscription is protected end-to-end with AES-256 encryption,
              TLS 1.3 transport, and signed credentials. VPN traffic is welcomed, customer data
              stays private, and our Anti Freeze CDN delivers buffer-free streaming without
              compromising security.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last reviewed: {lastReviewed} · Maintained by the ORCA 4K TV Editorial Team
            </p>
          </header>

          {/* Encryption */}
          <section className="mb-12 border-l-2 border-[#00E5FF]/30 pl-6">
            <h2 className="text-2xl md:text-3xl font-black mb-4">AES-256 Encryption (NIST FIPS 197)</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              We apply <strong>AES-256 encryption</strong> across every connection - the same
              symmetric cipher specified by{' '}
              <a
                href="https://csrc.nist.gov/publications/detail/fips/197/final"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5FF] hover:underline"
              >
                NIST FIPS 197
              </a>{' '}
              and used by banks, governments, and enterprise VPNs. AES-256 means a 256-bit
              symmetric key, computationally infeasible to break with current technology.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Combined with TLS 1.3 transport, this delivers <strong>encrypted IPTV streaming</strong>{' '}
              from the edge CDN to your device. Channel URLs, EPG metadata, and player handshakes
              are all wrapped in the same envelope.
            </p>
          </section>

          {/* Secure IPTV access */}
          <section className="mb-12 border-l-2 border-[#00E5FF]/30 pl-6">
            <h2 className="text-2xl md:text-3xl font-black mb-4">Secure IPTV Access</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Every customer receives a unique, signed M3U URL plus Xtream Codes credentials at
              activation. URLs are tied to your account - if a credential leaks, regenerating it
              from the dashboard immediately invalidates the previous one. This is what we mean
              by <strong>secure IPTV access</strong>: there is no shared, replayable link that
              third parties can use against your subscription.
            </p>
            <p className="text-gray-300 leading-relaxed">
              We never store playback content on third-party servers, and we do not sell or share
              customer data. See our{' '}
              <Link href="/privacy" className="text-[#00E5FF] hover:underline">
                Privacy Policy
              </Link>{' '}
              for the full data-handling commitments.
            </p>
          </section>

          {/* VPN allowed */}
          <section className="mb-12 border-l-2 border-[#00E5FF]/30 pl-6">
            <h2 className="text-2xl md:text-3xl font-black mb-4">IPTV with VPN - VPN Allowed</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              ORCA 4K TV explicitly supports <strong>IPTV with VPN</strong>. Many customers use a
              VPN to avoid ISP-side throttling on streaming traffic, to protect their browsing on
              public Wi-Fi, or for principled privacy reasons. Our policy is simple:
              <strong> VPN allowed</strong>, no throttling, no penalty, and customer support
              handles VPN-related setup like any other connection.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Recommended providers (NordVPN, ProtonVPN, Surfshark, Mullvad) work cleanly with our
              CDN. If you see degraded performance through a specific VPN node, switch to a closer
              region - that's almost always the fix.
            </p>
          </section>

          {/* Anti Freeze technology */}
          <section className="mb-12 border-l-2 border-[#00E5FF]/30 pl-6">
            <h2 className="text-2xl md:text-3xl font-black mb-4">Anti Freeze Technology</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Our proprietary <strong>Anti Freeze technology</strong> picks the lowest-latency CDN
              edge for each connection in real time and reroutes around regional congestion during
              high-load events - major international football tournaments, top European club football finals, the championship game in February.
              This is the engine behind our <strong>buffer-free streaming</strong> and{' '}
              <strong>zero buffering</strong> claims for customers on a 25 Mbps+ connection.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Anti Freeze runs continuously underneath every plan tier - there is no premium
              upcharge. If you need higher bandwidth headroom, the <Link href="/iptv-shop" className="text-[#00E5FF] hover:underline">12-month plan</Link>{' '}
              ships with up to 4 simultaneous connections so each device gets dedicated capacity.
            </p>
          </section>

          {/* 24/7 support */}
          <section className="mb-12 border-l-2 border-[#00E5FF]/30 pl-6">
            <h2 className="text-2xl md:text-3xl font-black mb-4">24/7 Customer Support</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Security questions don't keep business hours. ORCA 4K TV ships{' '}
              <strong>24/7 customer support</strong> via Telegram and email - average first
              response under five minutes. The same <strong>IPTV customer support</strong> team
              handles billing, technical, encryption, VPN, and setup queries.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Reach support at{' '}
              <a href="mailto:support@orca4ktv.com" className="text-[#00E5FF] hover:underline">
                support@orca4ktv.com
              </a>
              .
            </p>
          </section>

          {/* CTA */}
          <div className="mt-16 p-8 rounded-2xl bg-[#002952] border border-[#00E5FF]/20">
            <h2 className="text-2xl font-black mb-3">Try It With a Free Trial</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              See AES-256 encryption, secure IPTV access, and Anti Freeze CDN in action without
              committing - no credit card, instant activation, full IPTV subscription experience.
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
