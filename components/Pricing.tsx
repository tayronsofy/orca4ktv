'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import BrevoIframeForm from './BrevoIframeForm';

const Pricing = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<{ title: string, price: string, formUrl?: string } | null>(null);
  const [activeDeviceCount, setActiveDeviceCount] = useState<1 | 2 | 3 | 4>(1);

  // Since features are identical, we define them once here
  const ALL_FEATURES = [
    "Native 4K & Ultra-HD Resolution",
    "Over 22,000 Unrestricted Networks",
    "Massive VOD Library (Movies/Series)",
    "Seamless Buffer-Free Streaming",
    "Guaranteed 99.9% Uptime SLA",
    "Dedicated Round-the-Clock Support",
    "Immediate Automated Setup"
  ];

  // Brevo Form URLs (Keep existing ones for now, can be updated per tier if needed)
  const FORM_URL_1_MONTH = "https://d35d7546.sibforms.com/serve/MUIFABcNLakD2jacljgYIn-UHpEDCBU9I4dN99xxru3Nm07fPF03m78cMOb3k2TxRtcigsmQcCUYA1V5Hlhr-d0hrpIZZgfLZWFEcD6q4eaO01Bq-BM1XqAkEn2TekeNfJxYNCU5ZDbNL2JvQ2hCmUeYSx9UOFgTXGPp9T5qBuVX3B_T38zvuzrNtO9RsTRmW4iv2ejj38ehXioqVg==";
  const FORM_URL_3_MONTHS = "https://d35d7546.sibforms.com/serve/MUIFAMXZZFHDwnyb4XovuO8KUGGSnWcKb5hePtUjwH0O3e-70PsTe9KVCeWDelU19xV3hihADB58A28-n5pkq1mbokxtb5BwoMzr-vgwPrEfcsIOGneNpDzkPOgHDLnQmB7yIuhwtQYJ788MKW61POssTfjYgaxI3Woq5COLJojKlmvgLGwuZ5MUGvsaCIJrWrw8hb9Ti14WcAk8og==";
  const FORM_URL_6_MONTHS = "https://d35d7546.sibforms.com/serve/MUIFAPJ5oYfHb_clFomq6IUo_-MLWqQGskTqZfVYzZ5Lm4FfWB2SYIGET0Q3_nlHkyis0iMhy6ky7cBxBpVjA2fGO13U6F6QesjC9kDTiRKGZNg7JhKWbgBLH3HrvTwF49i3MtVFHu0g3K2PH47CEaaTemf4mBHa-hBryn9XFHhir8BO0jrUnpLNl2U3oTB7sUTpTE7313ZPJ_7HwA==";
  const FORM_URL_12_MONTHS = "https://d35d7546.sibforms.com/serve/MUIFAIANFN2KrjvAxgS_Flhzcf5GTMCHf6-ObTpp4dKoQqG2UHUIWyqOFcDZ-iq13NycNL55d1xq1--lLi0SCqCFVSzBx3VWPGxOAp9nIRmv9tc_pHqbbnl96OSj9zWoWONtJgwov_z3yq_bTFVMy9sJWWBvFu5OQkhak15osp4MKEMnroMdPoABU-v2Ur8-kGF3hMcKIsLdeZ4XEA==";

  // Pricing Data Structure
  const PRICING_TIERS = {
    1: [
      { title: "1 Month",  slug: "1-month",   price: 21.00,  duration: "month",     monthlyEquivalent: 21.00, savings: null,       isPopular: false, formUrl: FORM_URL_1_MONTH },
      { title: "3 Months", slug: "3-months",  price: 45.00,  duration: "quarter",   monthlyEquivalent: 15.00, savings: "Save 30%", isPopular: false, formUrl: FORM_URL_3_MONTHS },
      { title: "6 Months", slug: "6-months",  price: 69.00,  duration: "half-year", monthlyEquivalent: 11.50, savings: "Save 45%", isPopular: false, formUrl: FORM_URL_6_MONTHS },
      { title: "12 Months",slug: "12-months", price: 95.00,  duration: "year",      monthlyEquivalent: 7.92,  savings: "Save 62%", isPopular: true,  formUrl: FORM_URL_12_MONTHS },
    ],
    2: [
      { title: "1 Month",  slug: "1-month",   price: 36.00,  duration: "month",     monthlyEquivalent: 36.00, savings: null,       isPopular: false, formUrl: "" },
      { title: "3 Months", slug: "3-months",  price: 72.00,  duration: "quarter",   monthlyEquivalent: 24.00, savings: "Save 30%", isPopular: false, formUrl: "" },
      { title: "6 Months", slug: "6-months",  price: 110.00, duration: "half-year", monthlyEquivalent: 18.33, savings: "Save 47%", isPopular: false, formUrl: "" },
      { title: "12 Months",slug: "12-months", price: 152.00, duration: "year",      monthlyEquivalent: 12.66, savings: "Save 63%", isPopular: true,  formUrl: "" },
    ],
    3: [
      { title: "1 Month",  slug: "1-month",   price: 49.00,  duration: "month",     monthlyEquivalent: 49.00, savings: null,       isPopular: false, formUrl: "" },
      { title: "3 Months", slug: "3-months",  price: 99.00,  duration: "quarter",   monthlyEquivalent: 33.00, savings: "Save 28%", isPopular: false, formUrl: "" },
      { title: "6 Months", slug: "6-months",  price: 150.00, duration: "half-year", monthlyEquivalent: 25.00, savings: "Save 46%", isPopular: false, formUrl: "" },
      { title: "12 Months",slug: "12-months", price: 210.00, duration: "year",      monthlyEquivalent: 17.50, savings: "Save 62%", isPopular: true,  formUrl: "" },
    ],
    4: [
      { title: "1 Month",  slug: "1-month",   price: 64.00,  duration: "month",     monthlyEquivalent: 64.00, savings: null,       isPopular: false, formUrl: "" },
      { title: "3 Months", slug: "3-months",  price: 125.00, duration: "quarter",   monthlyEquivalent: 41.66, savings: "Save 28%", isPopular: false, formUrl: "" },
      { title: "6 Months", slug: "6-months",  price: 190.00, duration: "half-year", monthlyEquivalent: 31.66, savings: "Save 45%", isPopular: false, formUrl: "" },
      { title: "12 Months",slug: "12-months", price: 260.00, duration: "year",      monthlyEquivalent: 21.66, savings: "Save 63%", isPopular: true,  formUrl: "" },
    ],
  };

  const currentPlans = PRICING_TIERS[activeDeviceCount];

  return (
    <section className="relative py-20 bg-[#1f2326] overflow-hidden" id="pricing">
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Simple Pricing. <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">All Features Included.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Select the number of devices you need. Instant activation on all plans.
          </p>

          {/* DEVICE SWITCHER */}
          <div className="inline-flex flex-wrap items-center justify-center bg-[#15171a] p-2 rounded-full border border-purple-600/50 shadow-xl shadow-purple-500/20">
            {[1, 2, 3, 4].map((count) => (
              <button
                key={count}
                onClick={() => setActiveDeviceCount(count as 1 | 2 | 3 | 4)}
                className={`
                  px-6 py-2 rounded-full text-sm font-bold transition-all duration-300
                  ${activeDeviceCount === count
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/40 scale-105' // Gradient Active State
                    : 'text-gray-400 hover:text-white hover:bg-white/5'}
                `}
              >
                {count} {count === 1 ? 'Device' : 'Devices'}
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
                ${plan.isPopular ? 'scale-105 z-20 shadow-[0_0_50px_rgba(168,85,247,0.3)]' : 'hover:scale-105 z-10'}
              `}
            >
              {/* Gradient Border */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-b from-purple-500/40 to-blue-600/10 opacity-50 ${plan.isPopular ? 'from-purple-500 to-blue-600 opacity-100' : ''}`} />

              <div className="relative h-full bg-[#15171a] rounded-[22px] p-6 flex flex-col border border-purple-500/20 overflow-hidden">

                {/* Popular Ribbon */}
                {plan.isPopular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-l from-purple-600 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl shadow-lg">
                      BEST DEAL
                    </div>
                  </div>
                )}

                {/* Savings Badge */}
                {plan.savings && (
                  <div className="absolute top-4 left-4">
                    <span className="bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                      {plan.savings}
                    </span>
                  </div>
                )}

                {/* Header Section */}
                <div className="mt-4 mb-6">
                  <h3 className="text-gray-200 font-bold text-lg mb-1">{plan.title} Plan</h3>
                  <div className="text-gray-500 text-xs uppercase tracking-widest font-medium mb-3">{activeDeviceCount} {activeDeviceCount === 1 ? 'Device' : 'Devices'}</div>

                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-500">$</span>
                    <span className="text-5xl font-black text-white tracking-tighter">{plan.price.toFixed(2)}</span>
                    <span className="text-gray-500 font-medium text-sm">/{plan.duration === 'month' ? 'mo' : plan.duration}</span>
                  </div>
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

                {/* Unified Features List */}
                <ul className="space-y-4 mb-8 flex-grow">
                  {ALL_FEATURES.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <div className={`mt-0.5 min-w-[18px] h-[18px] rounded-full flex items-center justify-center ${plan.isPopular ? 'bg-purple-500/20 text-purple-400' : 'bg-white/10 text-gray-400'}`}>
                        <i className="fas fa-check text-[10px]"></i>
                      </div>
                      <span className="opacity-90">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Call to Action */}
                <Link
                  href={`/order?plan=${plan.slug}&connections=${activeDeviceCount}`}
                  className={`
                    w-full py-4 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-xl flex items-center justify-center
                    bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/40 hover:scale-105
                  `}
                >
                  {plan.isPopular ? 'Get Best Value' : 'Choose Plan'}
                </Link>

                <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-gray-600">
                  <i className="fas fa-shield-alt"></i>
                  <span>Secure 256-bit SSL</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>


      {/* BREVO IFRAME MODAL */}
      <BrevoIframeForm
        planName={selectedPlan?.title}
        price={selectedPlan?.price}
        isOpen={!!selectedPlan}
        onClose={() => setSelectedPlan(null)}
        formUrl={selectedPlan?.formUrl}
      />
    </section >
  );
};

export default Pricing;
