import { CheckCircle2, Zap, Globe, Shield, Tv2, Clock } from 'lucide-react'

const ITEMS = [
  { icon: Tv2,         label: '4K Ultra-HD',             sub: 'Every match in crystal-clear resolution' },
  { icon: Zap,         label: 'Zero Buffer Technology',   sub: 'Peak servers built for match-day traffic' },
  { icon: Globe,       label: '2026 Fiber Optimized',     sub: 'Infrastructure upgraded for World Cup load' },
  { icon: Shield,      label: 'Stable 99.9% Uptime',      sub: 'No downtime during the big moments' },
  { icon: CheckCircle2,label: 'Works on Any Device',      sub: 'Smart TV, Firestick, iOS, Android, PC' },
  { icon: Clock,       label: 'Instant Activation',       sub: 'Stream within minutes of signing up' },
]

export default function TrustChecklist() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-xl md:text-2xl font-black text-white mb-8">
          Why Orca 4K TV is the Best Way to Watch
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ITEMS.map(({ icon: Icon, label, sub }) => (
            <div
              key={label}
              className="flex items-start gap-4 bg-[#111] border border-white/6 rounded-xl p-5 hover:border-[#00e676]/30 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[#00e676]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-[#00e676]" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">{label}</p>
                <p className="text-gray-500 text-xs mt-0.5 leading-relaxed">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
