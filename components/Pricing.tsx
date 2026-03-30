'use client'


import React, { useState } from 'react';
import SetupWizard from './SetupWizard';
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
      { title: "1 Month", price: 21.00, duration: "month", monthlyEquivalent: 21.00, savings: null, isPopular: false, link: "https://smart4k.io/billing/store/monthly-plan/1-month-iptv", formUrl: FORM_URL_1_MONTH },
      { title: "3 Months", price: 45.00, duration: "quarter", monthlyEquivalent: 15.00, savings: "Save 30%", isPopular: false, link: "https://smart4k.io/billing/store/monthly-plan/3-months-iptv", formUrl: FORM_URL_3_MONTHS },
      { title: "6 Months", price: 69.00, duration: "half-year", monthlyEquivalent: 11.50, savings: "Save 45%", isPopular: false, link: "https://smart4k.io/billing/store/monthly-plan/6-months-iptv", formUrl: FORM_URL_6_MONTHS },
      { title: "12 Months", price: 95.00, duration: "year", monthlyEquivalent: 7.92, savings: "Save 62%", isPopular: true, link: "https://smart4k.io/billing/store/yearly-plan/1-year-iptv-subscription", formUrl: FORM_URL_12_MONTHS },
    ],
    // Estimated Multi-Device Prices (Based on common scaling factors)
    2: [
      { title: "1 Month", price: 36.00, duration: "month", monthlyEquivalent: 36.00, savings: null, isPopular: false, link: "https://smart4k.io/billing/store/monthly-plan/1-month-iptv", formUrl: "https://d35d7546.sibforms.com/serve/MUIFAPI86OH0WCK0bEBxUZbBaSBqrzXINYlSFkUhIXy91eRPiYVf7NLBPudo0uF4cMALN0QEv8p8sR4eg4XY-YC5AoEVdmIZsXx0-GDBmM7KOf2BcmhKMvllEdJ0tDurnjKodEmzS3GWm_Xyl_hXqfbbUDRBFa7UXb6KenZUOVTUEsuSe4UTNgE_JrlyQuYpvkoasrDAEix7eM6RGA==" },
      { title: "3 Months", price: 72.00, duration: "quarter", monthlyEquivalent: 24.00, savings: "Save 30%", isPopular: false, link: "https://smart4k.io/billing/store/monthly-plan/3-months-iptv", formUrl: "https://d35d7546.sibforms.com/serve/MUIFADEFmXDZ7kre4C6odEnsigZRgwb_3uKIBjtwPWoUwGO2LBo5cWWdmoYwIuZC7TbGlrFpV6E_tAysQYstoW_Ov3yjzGmmyPfb0gZRvJ9pqrt_OkoNwaYpFqWs9sf1RrppSxL1CHz4cHKFLUe7fji9qWA0jLESeQyejnyajb58z-9_1Pf3NwfeK8GrHngz9UP6U6NQ-kuEV6gllQ==" },
      { title: "6 Months", price: 110.00, duration: "half-year", monthlyEquivalent: 18.33, savings: "Save 47%", isPopular: false, link: "https://smart4k.io/billing/store/monthly-plan/6-months-iptv", formUrl: "https://d35d7546.sibforms.com/serve/MUIFAOZpNOuy3oi-rQY7igJkF-RgCTaEdAhbGzVz34nh9cjGITnMVFTUKmJ2C7VDOryLYwiMlveSgyT-L9de28G98fqH4wkPc-WHb0UNTL3nsbnCkx9CFf4tknjANBv8ZcbIraVuiZwhDxVqEKKKn4AGnO9D8l3Yppsk-LwjZcoTAl0hfKQsfGe3iCHXlCqpQM2govNLxVtOuAR01g==" },
      { title: "12 Months", price: 152.00, duration: "year", monthlyEquivalent: 12.66, savings: "Save 63%", isPopular: true, link: "https://smart4k.io/billing/store/yearly-plan/1-year-iptv-subscription", formUrl: "https://d35d7546.sibforms.com/serve/MUIFAKMBi_qfRNHX09SzuFn7fFmoTgbV4EnEsxHkxA41k05XgVRlHQ1kXFnvqFw8idof7zRMZF0J9z3fUgSmyW9ryT_mz-afXo9onwBgA07L2CAVfp0b6kf_5uehVcBRAalA4HT722VtDTTNH-6XiJDbvv2budwyj6jpUNAbi50SAqv156MrHQuyDY-WJZVvlsM_o7tH1bY_Xl-kWg==" },
    ],
    3: [
      { title: "1 Month", price: 49.00, duration: "month", monthlyEquivalent: 49.00, savings: null, isPopular: false, link: "https://smart4k.io/billing/store/monthly-plan/1-month-iptv", formUrl: "https://d35d7546.sibforms.com/serve/MUIFAOpCD9dk_kZ3mN0sywBWVO586caNywE9d1k2AnuNFcYk7-mwQJHVLKe3jiWFH3N1WBhy7_rsagckqkqzqJQ4DOYQDqieCOOr1Bovll_4DzNh-hydHnW3AgKiwISuhy8VpABZQVZIB4vh8FQuf9ClHYdMbfujGqLiEq3pf6EmEXd41hS9DfO7fGR-qsedlq9HD42yj2kFOHv3LQ==" },
      { title: "3 Months", price: 99.00, duration: "quarter", monthlyEquivalent: 33.00, savings: "Save 28%", isPopular: false, link: "https://smart4k.io/billing/store/monthly-plan/3-months-iptv", formUrl: "https://d35d7546.sibforms.com/serve/MUIFABHqmcbUsAS4VbWHduNgOxupCaU3huorBWyhprAj0pJAcbe_0bZt5TjvEXHDnxZCRGQA-2oV7Orlz4pnq8LjGL-ROnaGIjZPbHr2w-3Pp6P2zR5U3bJk_2cdgwUeegvskXwZU0yO1y-y2Mg-C0PBeAgLH8Z8rk7yxlqbV2xNBRRTKNXdCrnLBDM-CDZbDEGEAMUJJT-XbLuDjw==" },
      { title: "6 Months", price: 150.00, duration: "half-year", monthlyEquivalent: 25.00, savings: "Save 46%", isPopular: false, link: "https://smart4k.io/billing/store/monthly-plan/6-months-iptv", formUrl: "https://d35d7546.sibforms.com/serve/MUIFAJEcYuuFpc7P7w_9xDD_klGzraWHAwM5Cv_KTWIX4AT3g9sBscCtLYFUOC-EPYLKaNKzXFGusAitGJGtb6MPUPq9LwoDtvB2B7k5fzLRMraJP6IisyCrH089xEYjVMjysWWg87Yk3kQihiw4pHLrarrZzk9aYf-G_i7s36wIC-ZqG27s2S1boTvWann1UqKuaKA3uEA6lAjVYw==" },
      { title: "12 Months", price: 210.00, duration: "year", monthlyEquivalent: 17.50, savings: "Save 62%", isPopular: true, link: "https://smart4k.io/billing/store/yearly-plan/1-year-iptv-subscription", formUrl: "https://d35d7546.sibforms.com/serve/MUIFADHPeUuhihGkNihweC9atNYr1W8ivj4VdLuO1fgCMtG1ZYPJNaonJAouY7R8XGqVxWtb_xp-5fy_9tzfihZ7xW3dy8BEdDgAk2kULBWAoLWIxnZx1PtcK6bMx4vccR8xymh9Ps7dbtC3crsAKVXyfBWNq2GnveGLMDxuUqJRmv0qJ6mUc255vmqDVo6VCidXli0_9tJ8jRQtHQ==" },
    ],
    4: [
      { title: "1 Month", price: 64.00, duration: "month", monthlyEquivalent: 64.00, savings: null, isPopular: false, link: "https://smart4k.io/billing/store/monthly-plan/1-month-iptv", formUrl: "https://d35d7546.sibforms.com/serve/MUIFAJ7I-0k_lUyKL3gLmctQZTMQx5WYsAIkaO9aSPK8iAvk0Q33siYAS6Z1MUVJqSK13Xourw8rwqO2oxLho5sKzdIax-y3FOHC3NYa2kU4-kndRXC9eITfVy6I03CLZG4QawklcRqA91T35Zu-yJ6cTtjoo09767eTNJ7Yh3HWYGeToQ7z_6I_-Oohxd2x1-vtT031RJqrU6wwyA==" },
      { title: "3 Months", price: 125.00, duration: "quarter", monthlyEquivalent: 41.66, savings: "Save 28%", isPopular: false, link: "https://smart4k.io/billing/store/monthly-plan/3-months-iptv", formUrl: "https://d35d7546.sibforms.com/serve/MUIFAOINCsAxUpFiF_-I_eda1sC0FUPX65AdMDbClZVGy2TjoURZ5B3_Cr5UFYUvi_Waau9OOCqLOsSt_B2lRzs8o7Dn02nzxFrGHkFbB0rMCzk_0HLJrfFIZg8xvBrohVdLyO6coREB7GepGJUxyaqxx374QCQWqZZybi0PupJ1O6edJn1C_zA7h8WF8ye38O4P0lRe195BLaBXkQ==" },
      { title: "6 Months", price: 190.00, duration: "half-year", monthlyEquivalent: 31.66, savings: "Save 45%", isPopular: false, link: "https://smart4k.io/billing/store/monthly-plan/6-months-iptv", formUrl: "https://d35d7546.sibforms.com/serve/MUIFAEP4lAtd-DqBE3-BKSb2cGmxyHIp1FyVsR3WGslwgn6EFMkYp7YbbUJ5Rex9oGDxaDx7te3G0v-gTpMT1qEPUktONB-2PMGPhqDdFSCPue4rEW7lHZD96Lbr1JEFZTNVu_nH5fDdWLHdyaJXxwRknc4eGZQ37llEowhc9aQ6IfI2UgZo7rqza0rrY4VQIo7A0_Iw_sp-VyBXLQ==" },
      { title: "12 Months", price: 260.00, duration: "year", monthlyEquivalent: 21.66, savings: "Save 63%", isPopular: true, link: "https://smart4k.io/billing/store/yearly-plan/1-year-iptv-subscription", formUrl: "https://d35d7546.sibforms.com/serve/MUIFACbU2qJwme6cQynbEY7GA7ULuWh4PCKGjnUexqYWOtIOzsO0v1FtjwbP-dzKP_oWB7twz0OVn9OXgYKD9aoupR56GfkPOONk84gq7bgGxO_aP1W1HMfDd4tcVV4yI8m8UGeSOdWYLZlSbB7MTUN5PdvaRyXPDb3o1JxVIu5PAvEdQhWiOyIeTNElRacgWC39MH4UVdQErfnr1A==" },
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
                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    w-full py-4 rounded-xl font-bold text-sm tracking-wide uppercase transition-all duration-300 shadow-xl flex items-center justify-center
                    bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg hover:shadow-purple-500/40 hover:scale-105
                  `}
                >
                  {plan.isPopular ? 'Get Best Value' : 'Choose Plan'}
                </a>

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
