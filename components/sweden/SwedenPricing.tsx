'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { PLAN_PRICES, type Connections, type PlanSlug } from '@/lib/pricing';
import { toSek, formatSek } from './sek';

const SWEDEN_FEATURES = [
  "Alla viktiga svenska kanaler plus sportpaketen",
  "Svensk elitfotboll, elithockey, europeisk klubbfotboll, vintersport",
  "22 000+ livekanaler från hela världen",
  "100 000+ filmer och serier on demand",
  "Äkta 4K HDR med HDR10+ och Dolby Vision",
  "Anti Freeze CDN via Stockholm-server",
  "Support dygnet runt · Aktivering direkt"
];

interface Plan {
  slug: PlanSlug
  title: string
  duration: string
  months: number
  isPopular: boolean
}

const PLANS: Plan[] = [
  { slug: '1-month',   title: '1 månad',    duration: 'månad',   months: 1,  isPopular: false },
  { slug: '3-months',  title: '3 månader',  duration: 'kvartal', months: 3,  isPopular: false },
  { slug: '6-months',  title: '6 månader',  duration: 'halvår',  months: 6,  isPopular: false },
  { slug: '12-months', title: '12 månader', duration: 'år',      months: 12, isPopular: true },
];

function savingsLabel(slug: PlanSlug, months: number, connections: Connections): string | null {
  if (months === 1) return null
  const monthly = PLAN_PRICES['1-month'][connections] * months
  const pct = Math.round((1 - PLAN_PRICES[slug][connections] / monthly) * 100)
  return `Spara ${pct} %`
}

const SwedenPricing = () => {
  const [activeDeviceCount, setActiveDeviceCount] = useState<Connections>(1);

  return (
    <section className="relative py-20 bg-[#001f3f] overflow-hidden" id="pricing">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            IPTV Sverige, priser i kronor. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-400">Avsluta när du vill.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Ett abonnemang som täcker alla svenska kanaler och 22 000 internationella kanaler i 4K HDR. Ingen bindningstid, ingen dold avgift.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center bg-[#001530] p-2 rounded-full border border-blue-600/30 shadow-xl shadow-blue-600/10">
            {([1, 2, 3, 4] as Connections[]).map((count) => (
              <button
                key={count}
                onClick={() => setActiveDeviceCount(count)}
                className={`
                  px-6 py-2 rounded-full text-sm font-bold transition-all duration-300
                  ${activeDeviceCount === count
                    ? 'bg-gradient-to-r from-blue-600 to-yellow-400 text-white shadow-lg shadow-blue-600/30 scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {count} {count === 1 ? 'enhet' : 'enheter'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {PLANS.map((plan) => {
            const usd = PLAN_PRICES[plan.slug][activeDeviceCount]
            const sek = toSek(usd)
            const perMonth = Math.round(sek / plan.months)
            const savings = savingsLabel(plan.slug, plan.months, activeDeviceCount)
            return (
            <div
              key={plan.slug}
              className={`
                relative group rounded-3xl p-1 transition-all duration-300
                ${plan.isPopular ? 'scale-105 z-20 shadow-[0_0_50px_rgba(0,106,167,0.35)]' : 'hover:scale-105 z-10'}
              `}
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b from-blue-600/30 to-yellow-400/10 opacity-50 ${plan.isPopular ? 'from-blue-600 to-yellow-400 opacity-100' : ''}`} />

              <div className="relative h-full bg-[#001530] rounded-[22px] p-6 flex flex-col border border-blue-600/20 overflow-hidden">
                {plan.isPopular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-l from-blue-600 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                      MEST VALD I SVERIGE
                    </div>
                  </div>
                )}

                {savings && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-yellow-400/20 text-yellow-300 border border-yellow-400/30 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                      {savings}
                    </span>
                  </div>
                )}

                <div className="mt-4 mb-6">
                  <h3 className="text-gray-200 font-bold text-lg mb-1">{plan.title}</h3>
                  <div className="text-gray-500 text-xs uppercase tracking-widest font-medium mb-3">{activeDeviceCount} {activeDeviceCount === 1 ? 'stream' : 'streams'}</div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white tracking-tighter">{formatSek(sek)}</span>
                    <span className="text-2xl font-bold text-gray-500">kr</span>
                    <span className="text-gray-500 font-medium text-sm">/ {plan.duration}</span>
                  </div>
                  <div className="text-gray-500 text-xs mt-2">
                    {plan.months > 1 ? `Motsvarar ${perMonth} kr/månad · ` : ''}ca {usd} USD
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                <ul className="space-y-4 mb-8 flex-grow">
                  {SWEDEN_FEATURES.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className={`mt-0.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center ${plan.isPopular ? 'bg-yellow-400/20 text-yellow-400' : 'bg-white/10 text-gray-400'}`}>
                        <i className="fas fa-check text-[10px]"></i>
                      </div>
                      <span className="opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/order?plan=${plan.slug}&connections=${activeDeviceCount}`}
                  className="w-full py-4 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-xl flex items-center justify-center bg-gradient-to-r from-blue-600 to-yellow-400 text-white hover:shadow-lg hover:shadow-blue-600/40 hover:scale-105"
                >
                  {plan.isPopular ? 'Välj årsabonnemang' : 'Välj abonnemang'}
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-600">
                  <i className="fas fa-shield-alt"></i>
                  <span>Säker betalning</span>
                </div>
              </div>
            </div>
          )})}
        </div>

        <p className="text-center text-gray-500 text-xs mt-10 max-w-2xl mx-auto">
          Priserna i kronor är en avrundad omräkning från USD. Kortet debiteras beloppet i USD, så det exakta beloppet på kontoutdraget kan skilja sig med några kronor beroende på din banks växelkurs.
        </p>
      </div>
    </section>
  );
};

export default SwedenPricing;
