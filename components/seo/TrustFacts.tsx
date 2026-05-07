// Reusable trust / authority block. Uses only real, defensible signals - no fake certs.
// Reused on home, /about, and /iptv-shop to reinforce E-E-A-T across the site.

import Link from 'next/link'

interface Fact {
  label: string
  value: string
  caption: string
}

const FACTS: Fact[] = [
  { value: '22,000+', label: 'Live channels', caption: 'Premium IPTV channels in HD and 4K' },
  { value: '4,774+', label: 'Verified reviews', caption: 'Aggregate rating 4.9 / 5 across regions' },
  { value: '99.9%', label: 'Uptime', caption: 'Anti Freeze CDN with buffer-free streaming' },
  { value: 'AES-256', label: 'Encryption', caption: 'NIST FIPS 197 - secure IPTV access' },
  { value: '24/7', label: 'Customer support', caption: 'IPTV customer support, < 5 min response' },
  { value: '< 5 min', label: 'Setup time', caption: 'Rapid setup with instant activation' },
]

export default function TrustFacts({ className = '' }: { className?: string }) {
  return (
    <section
      aria-label="Trust facts about ORCA 4K TV IPTV subscription"
      className={`bg-[#001a36] border-y border-[#00E5FF]/15 py-14 px-4 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-center text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em] mb-2">
          Why ORCA 4K TV
        </h2>
        <p className="text-center text-2xl md:text-3xl font-black text-white mb-10 max-w-3xl mx-auto leading-tight">
          The premium IPTV subscription engineered for buffer-free streaming and secure access
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {FACTS.map((f) => (
            <div
              key={f.label}
              className="bg-[#001f3f] border border-white/5 rounded-xl px-5 py-6 text-center"
            >
              <div className="text-3xl md:text-4xl font-black text-[#00E5FF] mb-2 tracking-tight">
                {f.value}
              </div>
              <div className="text-white font-bold text-sm uppercase tracking-wider mb-1">
                {f.label}
              </div>
              <div className="text-gray-400 text-xs leading-relaxed">{f.caption}</div>
            </div>
          ))}
        </div>
        <p className="text-center text-gray-500 text-xs mt-8 max-w-2xl mx-auto leading-relaxed">
          Backed by{' '}
          <Link href="/security" className="text-[#00E5FF] hover:underline">
            AES-256 encryption (NIST FIPS 197)
          </Link>
          , the proprietary Anti Freeze technology CDN, multi-device compatibility across Smart TV / Firestick / Android / iOS / Apple TV / MAG, and full{' '}
          <Link href="/glossary" className="text-[#00E5FF] hover:underline">
            IPTV glossary
          </Link>{' '}
          documenting every feature.
        </p>
      </div>
    </section>
  )
}
