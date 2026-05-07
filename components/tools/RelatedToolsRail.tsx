import Link from 'next/link'
import { getOtherTools } from './tool-catalog'

export default function RelatedToolsRail({ currentSlug }: { currentSlug: string }) {
  const others = getOtherTools(currentSlug)
  return (
    <section className="border-t border-white/10 pt-12">
      <h2 className="text-2xl md:text-3xl font-black mb-6">Other free IPTV tools</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {others.map((t) => (
          <Link
            key={t.slug}
            href={t.href}
            className="group block rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-[#00E5FF]/40 transition-all p-5"
          >
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-11 h-11 rounded-lg bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center text-[#00E5FF]">
                <i className={`fa-solid ${t.icon}`} aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-white group-hover:text-[#00E5FF] transition-colors">
                  {t.title}
                  {t.status === 'soon' && (
                    <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-amber-300/90">
                      Soon
                    </span>
                  )}
                </h3>
                <p className="text-sm text-gray-400 mt-1 leading-relaxed">{t.tagline}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
