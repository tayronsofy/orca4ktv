import Link from 'next/link'
import type { ReactNode } from 'react'
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd'
import RelatedToolsRail from './RelatedToolsRail'
import HowToJsonLd, { type HowToStep } from './HowToJsonLd'
import FaqJsonLd, { type FaqEntry } from './FaqJsonLd'
import { getTool } from './tool-catalog'

interface Props {
  slug: string
  category: string // tagline pill, e.g. "Free IPTV Tool"
  description: ReactNode // shown under the H1 (overrides catalog description if set)
  children: ReactNode // the interactive client component
  howToSteps?: HowToStep[]
  faq?: FaqEntry[]
  faqId?: string
}

export default function ToolLayout({ slug, category, description, children, howToSteps, faq, faqId }: Props) {
  const tool = getTool(slug)
  if (!tool) {
    throw new Error(`ToolLayout: unknown tool slug "${slug}"`)
  }

  const baseUrl = `https://orca4ktv.com${tool.href}`

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: 'https://orca4ktv.com/' },
          { name: 'IPTV Tools', url: 'https://orca4ktv.com/iptv-tools' },
          { name: tool.shortTitle, url: baseUrl },
        ]}
      />
      {howToSteps && howToSteps.length > 0 && (
        <HowToJsonLd name={tool.title} description={tool.tagline} steps={howToSteps} url={baseUrl} />
      )}
      {faq && faq.length > 0 && <FaqJsonLd entries={faq} id={faqId ?? `${baseUrl}#faq`} />}

      <main className="min-h-screen bg-[#001f3f] text-white">
        <section className="max-w-5xl mx-auto px-6 pt-28 pb-16 md:pt-32 md:pb-24">
          <nav className="text-sm text-gray-400 mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-[#00E5FF]">Home</Link>
                <span className="mx-2">/</span>
              </li>
              <li>
                <Link href="/iptv-tools" className="hover:text-[#00E5FF]">IPTV Tools</Link>
                <span className="mx-2">/</span>
              </li>
              <li className="text-white">{tool.shortTitle}</li>
            </ol>
          </nav>

          <header className="mb-10">
            <p className="text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em] mb-3">{category}</p>
            <h1 className="text-4xl md:text-6xl font-black mb-4 leading-[0.95] tracking-tight">{tool.title}</h1>
            <div className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">{description}</div>
          </header>

          <div className="bg-[#0a2547] border border-white/10 rounded-2xl p-6 md:p-8 mb-10 shadow-2xl">
            {children}
          </div>

          <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 mb-12 text-sm text-amber-100/90">
            <p className="leading-relaxed">
              <strong className="text-amber-200">For legal IPTV services only.</strong>{' '}
              These tools work with any compliant IPTV subscription you own. ORCA 4K TV does not endorse, host, or distribute pirated streams.
            </p>
          </div>

          {howToSteps && howToSteps.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl md:text-3xl font-black mb-6">How it works</h2>
              <ol className="space-y-4">
                {howToSteps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="shrink-0 w-9 h-9 rounded-full bg-[#00E5FF]/15 border border-[#00E5FF]/40 text-[#00E5FF] font-black flex items-center justify-center">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold mb-1">{step.name}</h3>
                      <p className="text-gray-300 leading-relaxed">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {faq && faq.length > 0 && (
            <section className="mb-12" id="faq">
              <h2 className="text-2xl md:text-3xl font-black mb-6">Frequently asked questions</h2>
              <dl className="space-y-6">
                {faq.map((q, i) => (
                  <div key={i} className="border-l-2 border-[#00E5FF]/30 pl-5">
                    <dt className="text-lg font-bold mb-2">{q.question}</dt>
                    <dd className="text-gray-300 leading-relaxed">{q.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          <RelatedToolsRail currentSlug={slug} />

          <section className="mt-12 rounded-2xl bg-gradient-to-r from-[#003580] to-[#00457e] border border-[#00E5FF]/20 p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-black mb-3">Want a playlist that just works?</h2>
            <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
              ORCA 4K TV ships a single authenticated M3U URL with a smart EPG, anti-freeze CDN, and 22,000+ channels in HD and 4K - no broken streams to check.
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
