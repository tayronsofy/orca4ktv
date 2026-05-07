import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import { TOOL_CATALOG } from '@/components/tools/tool-catalog'

export const metadata: Metadata = {
  title: 'Free IPTV Tools — M3U Checker, Xtream Converter & Speed Test | ORCA 4K TV',
  description:
    'Free utilities for any IPTV subscription: M3U playlist checker, M3U ↔ Xtream Codes converter, IPTV speed test, EPG / XMLTV validator. No signup, no playlist storage.',
  keywords:
    'free iptv tools, m3u checker, m3u tester, xtream codes generator, m3u to xtream, xtream to m3u, iptv speed test, internet speed for iptv 4k, xmltv validator, epg checker, m3u editor online, sort m3u playlist, iptv playlist checker',
  alternates: { canonical: 'https://orca4ktv.com/iptv-tools' },
  openGraph: {
    title: 'Free IPTV Tools — M3U, Xtream & Speed Test | ORCA 4K TV',
    description:
      'A growing kit of free IPTV utilities — check your M3U playlist, convert between M3U and Xtream Codes, run a speed test tuned for 4K streaming.',
    url: 'https://orca4ktv.com/iptv-tools',
    siteName: 'ORCA 4K TV',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free IPTV Tools by ORCA 4K TV',
    description: 'M3U Checker, Xtream Codes converter, IPTV speed test and more — free and no signup.',
  },
}

const HUB_FAQ = [
  {
    q: 'Are these IPTV tools really free?',
    a: 'Yes. All tools listed here are free, browser-based utilities — no account, no signup, no email required to use them.',
  },
  {
    q: 'Do you store the M3U playlists I check?',
    a: 'No. The M3U Checker fetches a sample of streams server-side to test connectivity, but we never persist your playlist contents or your credentials. Files you upload to the editor are parsed entirely in your browser.',
  },
  {
    q: 'Can I use these tools with any IPTV provider?',
    a: 'Yes. The tools work with any standards-compliant M3U or Xtream Codes IPTV subscription. They are not locked to ORCA 4K TV — we built them as a public service for the IPTV community.',
  },
  {
    q: 'Will running the M3U Checker get me banned by my provider?',
    a: 'It is unlikely. The checker probes a small random sample (up to 50 streams) with short HEAD/GET requests, similar to opening the channels in a player. Heavy abuse could trigger rate limits on your provider — but our tool itself rate-limits each visitor to keep usage reasonable.',
  },
  {
    q: 'Do you offer a 4K IPTV subscription on ORCA 4K TV?',
    a: 'Yes. ORCA 4K TV ships 22,000+ live channels in HD and true 4K HDR with a smart EPG, 7-day catch-up, and an anti-freeze CDN. You can start a free trial or pick a plan from the IPTV Shop.',
  },
  {
    q: 'How do I report a bug or request a new tool?',
    a: 'Email us — every tool page links to the contact form. We add new tools based on what IPTV users actually need.',
  },
]

export default function IptvToolsHubPage() {
  const items = TOOL_CATALOG

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/' },
          { name: 'IPTV Tools', url: 'https://orca4ktv.com/iptv-tools' },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            '@id': 'https://orca4ktv.com/iptv-tools#tools',
            name: 'Free IPTV Tools',
            description: 'A suite of free, browser-based utilities for IPTV users.',
            itemListElement: items.map((t, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `https://orca4ktv.com${t.href}`,
              name: t.title,
            })),
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            '@id': 'https://orca4ktv.com/iptv-tools#faq',
            mainEntity: HUB_FAQ.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      <main className="min-h-screen bg-[#001f3f] text-white">
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-2">
              <li>
                <Link href="/" className="hover:text-[#00E5FF]">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-white">IPTV Tools</li>
            </ol>
          </nav>

          <header className="mb-14 max-w-4xl">
            <p className="text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em] mb-3">Free utilities</p>
            <h1 className="text-4xl md:text-6xl font-black mb-5 leading-[0.95] tracking-tight">
              Free IPTV Tools
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              A growing kit of utilities for anyone running an IPTV subscription. Check whether your M3U playlist is alive, convert between M3U and Xtream Codes, measure if your line is fast enough for 4K streaming — all without an account, all in your browser where it makes sense.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {items.map((t) => {
              const isLive = t.status === 'live'
              const Card = (
                <div
                  className={`h-full rounded-2xl border p-6 transition-all ${
                    isLive
                      ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#00E5FF]/40'
                      : 'bg-white/[0.03] border-white/5 opacity-80'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-12 h-12 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                      <i className={`fa-solid ${t.icon} text-xl`} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h2 className="font-black text-lg leading-tight">
                        {t.title}
                        {!isLive && (
                          <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-amber-300/90 align-middle">
                            Soon
                          </span>
                        )}
                      </h2>
                      <p className="text-[#00E5FF]/80 text-sm font-bold mt-1">{t.tagline}</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-4 leading-relaxed">{t.description}</p>
                  <p className="mt-5 text-sm font-bold uppercase tracking-widest">
                    {isLive ? (
                      <span className="text-[#00E5FF]">
                        Open tool <i className="fa-solid fa-arrow-right ml-1" aria-hidden="true" />
                      </span>
                    ) : (
                      <span className="text-gray-500">Coming soon</span>
                    )}
                  </p>
                </div>
              )
              return isLive ? (
                <Link key={t.slug} href={t.href} className="block">
                  {Card}
                </Link>
              ) : (
                <div key={t.slug}>{Card}</div>
              )
            })}
          </div>

          <section className="rounded-2xl bg-[#0a2547] border border-white/10 p-8 md:p-10 mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-4">Why we built these</h2>
            <p className="text-gray-300 leading-relaxed mb-3">
              Every IPTV user eventually deals with a dead playlist, a wrong EPG URL, or wonders whether their connection can handle a 4K stream. We kept fielding the same questions from customers, so we packaged the answers as free tools that work for any IPTV service — not just ours.
            </p>
            <p className="text-gray-300 leading-relaxed">
              These tools are deliberately scoped: the M3U Checker probes a small sample (no DDoS-as-a-service here), files uploaded to the editor never leave your browser, and we never store your credentials. If you want a playlist that just works without any of this troubleshooting, we also sell one — but the tools above are free regardless.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl md:text-3xl font-black mb-6">Frequently asked questions</h2>
            <dl className="space-y-6">
              {HUB_FAQ.map((f, i) => (
                <div key={i} className="border-l-2 border-[#00E5FF]/30 pl-5">
                  <dt className="text-lg font-bold mb-2">{f.q}</dt>
                  <dd className="text-gray-300 leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="rounded-2xl bg-gradient-to-r from-[#003580] to-[#00457e] border border-[#00E5FF]/20 p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-3">Tired of fixing playlists?</h2>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              ORCA 4K TV gives you a single authenticated M3U URL with a smart EPG, anti-freeze CDN, and 22,000+ channels in HD and 4K HDR.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/trial" className="bg-[#00E5FF] text-[#001f3f] px-7 py-3 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white transition-all">
                Start free trial
              </Link>
              <Link href="/iptv-shop" className="bg-white/10 border border-white/20 text-white px-7 py-3 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white/15 transition-all">
                View plans
              </Link>
            </div>
          </section>
        </section>
      </main>
    </>
  )
}
