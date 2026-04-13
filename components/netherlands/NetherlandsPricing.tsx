'use client'

import React, { useState } from 'react';
import BrevoIframeForm from '../BrevoIframeForm';

const NetherlandsPricing = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<{ title: string, price: string, formUrl?: string } | null>(null);
  const [activeDeviceCount, setActiveDeviceCount] = useState<1 | 2 | 3 | 4>(1);

  const NETHERLANDS_FEATURES = [
    "Dedicated Nederland-snelheidservers",
    "Alle Nederlandse lokale en nationale zenders",
    "Onbeperkt live sport",
    "Echte 4K-resolutie",
    "ISP-throttle bescherming",
    "24/7 Support in het Nederlands",
    "Directe automatische activering"
  ];

  const FORM_URL_1_MONTH = "https://d35d7546.sibforms.com/serve/MUIFABcNLakD2jacljgYIn-UHpEDCBU9I4dN99xxru3Nm07fPF03m78cMOb3k2TxRtcigsmQcCUYA1V5Hlhr-d0hrpIZZgfLZWFEcD6q4eaO01Bq-BM1XqAkEn2TekeNfJxYNCU5ZDbNL2JvQ2hCmUeYSx9UOFgTXGPp9T5qBuVX3B_T38zvuzrNtO9RsTRmW4iv2ejj38ehXioqVg==";
  const FORM_URL_3_MONTHS = "https://d35d7546.sibforms.com/serve/MUIFAMXZZFHDwnyb4XovuO8KUGGSnWcKb5hePtUjwH0O3e-70PsTe9KVCeWDelU19xV3hihADB58A28-n5pkq1mbokxtb5BwoMzr-vgwPrEfcsIOGneNpDzkPOgHDLnQmB7yIuhwtQYJ788MKW61POssTfjYgaxI3Woq5COLJojKlmvgLGwuZ5MUGvsaCIJrWrw8hb9Ti14WcAk8og==";
  const FORM_URL_6_MONTHS = "https://d35d7546.sibforms.com/serve/MUIFAPJ5oYfHb_clFomq6IUo_-MLWqQGskTqZfVYzZ5Lm4FfWB2SYIGET0Q3_nlHkyis0iMhy6ky7cBxBpVjA2fGO13U6F6QesjC9kDTiRKGZNg7JhKWbgBLH3HrvTwF49i3MtVFHu0g3K2PH47CEaaTemf4mBHa-hBryn9XFHhir8BO0jrUnpLNl2U3oTB7sUTpTE7313ZPJ_7HwA==";
  const FORM_URL_12_MONTHS = "https://d35d7546.sibforms.com/serve/MUIFAIANFN2KrjvAxgS_Flhzcf5GTMCHf6-ObTpp4dKoQqG2UHUIWyqOFcDZ-iq13NycNL55d1xq1--lLi0SCqCFVSzBx3VWPGxOAp9nIRmv9tc_pHqbbnl96OSj9zWoWONtJgwov_z3yq_bTFVMy9sJWWBvFu5OQkhak15osp4MKEMnroMdPoABU-v2Ur8-kGF3hMcKIsLdeZ4XEA==";

  const PRICING_TIERS = {
    1: [
      { title: "1 Maand", price: 21.00, duration: "maand", savings: null, isPopular: false, link: "https://checkout.smart4k.io/checkout/?add-to-cart=20", formUrl: FORM_URL_1_MONTH },
      { title: "3 Maanden", price: 45.00, duration: "kwartaal", savings: "30% besparen", isPopular: false, link: "https://checkout.smart4k.io/checkout/?add-to-cart=46", formUrl: FORM_URL_3_MONTHS },
      { title: "6 Maanden", price: 69.00, duration: "halfjaar", savings: "45% besparen", isPopular: false, link: "https://checkout.smart4k.io/checkout/?add-to-cart=52", formUrl: FORM_URL_6_MONTHS },
      { title: "12 Maanden", price: 95.00, duration: "jaar", savings: "62% besparen", isPopular: true, link: "https://checkout.smart4k.io/checkout/?add-to-cart=53", formUrl: FORM_URL_12_MONTHS },
    ],
    2: [
      { title: "1 Maand", price: 36.00, duration: "maand", savings: null, isPopular: false, link: "https://checkout.smart4k.io/checkout/?add-to-cart=54" },
      { title: "3 Maanden", price: 72.00, duration: "kwartaal", savings: "30% besparen", isPopular: false, link: "https://checkout.smart4k.io/checkout/?add-to-cart=55" },
      { title: "6 Maanden", price: 110.00, duration: "halfjaar", savings: "47% besparen", isPopular: false, link: "https://checkout.smart4k.io/checkout/?add-to-cart=56" },
      { title: "12 Maanden", price: 152.00, duration: "jaar", savings: "63% besparen", isPopular: true, link: "https://checkout.smart4k.io/checkout/?add-to-cart=57" },
    ],
    3: [
      { title: "1 Maand", price: 49.00, duration: "maand", savings: null, isPopular: false, link: "https://checkout.smart4k.io/checkout/?add-to-cart=58" },
      { title: "3 Maanden", price: 99.00, duration: "kwartaal", savings: "28% besparen", isPopular: false, link: "https://checkout.smart4k.io/checkout/?add-to-cart=59" },
      { title: "6 Maanden", price: 150.00, duration: "halfjaar", savings: "46% besparen", isPopular: false, link: "https://checkout.smart4k.io/checkout/?add-to-cart=60" },
      { title: "12 Maanden", price: 210.00, duration: "jaar", savings: "62% besparen", isPopular: true, link: "https://checkout.smart4k.io/checkout/?add-to-cart=61" },
    ],
    4: [
      { title: "1 Maand", price: 64.00, duration: "maand", savings: null, isPopular: false, link: "https://checkout.smart4k.io/checkout/?add-to-cart=62" },
      { title: "3 Maanden", price: 125.00, duration: "kwartaal", savings: "28% besparen", isPopular: false, link: "https://checkout.smart4k.io/checkout/?add-to-cart=63" },
      { title: "6 Maanden", price: 190.00, duration: "halfjaar", savings: "45% besparen", isPopular: false, link: "https://checkout.smart4k.io/checkout/?add-to-cart=64" },
      { title: "12 Maanden", price: 260.00, duration: "jaar", savings: "63% besparen", isPopular: true, link: "https://checkout.smart4k.io/checkout/?add-to-cart=65" },
    ],
  };

  const currentPlans = PRICING_TIERS[activeDeviceCount];

  return (
    <section className="relative py-20 bg-[#1f2326] overflow-hidden" id="pricing">
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#AE1C28]/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#21468B]/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            IPTV Nederland Prijzen. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AE1C28] to-[#21468B]">Altijd opzegbaar.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Start nu met streamen via de beste IPTV-dienst in Nederland. Wereldwijd afrekenen in USD/EUR.
          </p>

          <div className="inline-flex flex-wrap items-center justify-center bg-[#15171a] p-2 rounded-full border border-[#AE1C28]/30 shadow-xl shadow-[#AE1C28]/10">
            {[1, 2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => setActiveDeviceCount(count as 1 | 2 | 3 | 4)}
                className={`
                  px-6 py-2 rounded-full text-sm font-bold transition-all duration-300
                  ${activeDeviceCount === count
                    ? 'bg-gradient-to-r from-[#AE1C28] to-[#21468B] text-white shadow-lg shadow-[#AE1C28]/30 scale-105'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {count} {count === 1 ? 'Scherm' : 'Schermen'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {currentPlans.map((plan, idx) => (
            <div
              key={idx}
              onMouseEnter={() => setHoveredIndex(idx)}
              onMouseLeave={() => setHoveredIndex(null)}
              className={`
                relative group rounded-3xl p-1 transition-all duration-300
                ${plan.isPopular ? 'scale-105 z-20 shadow-[0_0_50px_rgba(174,28,40,0.3)]' : 'hover:scale-105 z-10'}
              `}
            >
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b from-[#AE1C28]/30 to-[#21468B]/10 opacity-50 ${plan.isPopular ? 'from-[#AE1C28] to-[#21468B] opacity-100' : ''}`} />

              <div className="relative h-full bg-[#15171a] rounded-[22px] p-6 flex flex-col border border-[#AE1C28]/20 overflow-hidden">
                {plan.isPopular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-l from-[#AE1C28] to-[#21468B] text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                      NEDERLAND'S KEUZE
                    </div>
                  </div>
                )}

                {plan.savings && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#21468B]/20 text-blue-300 border border-[#21468B]/30 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                      {plan.savings}
                    </span>
                  </div>
                )}

                <div className="mt-4 mb-6">
                  <h3 className="text-gray-200 font-bold text-lg mb-1">{plan.title} Pass</h3>
                  <div className="text-gray-500 text-xs uppercase tracking-widest font-medium mb-3">{activeDeviceCount} {activeDeviceCount === 1 ? 'Stream' : 'Streams'}</div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-500">$</span>
                    <span className="text-5xl font-black text-white tracking-tighter">{plan.price.toFixed(2)}</span>
                    <span className="text-gray-500 font-medium text-sm">/ {plan.duration}</span>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                <ul className="space-y-4 mb-8 flex-grow">
                  {NETHERLANDS_FEATURES.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className={`mt-0.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center ${plan.isPopular ? 'bg-[#21468B]/20 text-blue-400' : 'bg-white/10 text-gray-400'}`}>
                        <i className="fas fa-check text-[10px]"></i>
                      </div>
                      <span className="opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.link}
                  target="_self"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-xl flex items-center justify-center bg-gradient-to-r from-[#AE1C28] to-[#21468B] text-white hover:shadow-lg hover:shadow-[#AE1C28]/40 hover:scale-105"
                >
                  {plan.isPopular ? 'Nederland-aanbieding pakken' : 'Pass kiezen'}
                </a>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-600">
                  <i className="fas fa-shield-alt"></i>
                  <span>Veilige betaling</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BrevoIframeForm
        planName={selectedPlan?.title}
        price={selectedPlan?.price}
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        formUrl={(selectedPlan as any)?.formUrl}
      />
    </section>
  );
};

export default NetherlandsPricing;
