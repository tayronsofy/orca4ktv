'use client'

import React, { useEffect, useState } from 'react';

const resellersHero = '/images/resellers-hero.png';

const ResellersPage: React.FC = () => {
    const [openFaq, setOpenFaq] = useState<number | null>(0);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const SHARED_FEATURES = [
        "White-label IPTV reseller panel with full admin control",
        "Credit-based provisioning — instant M3U + Xtream codes",
        "Sub-reseller hierarchy with tiered pricing rights",
        "22,000+ live channels & 100,000+ on-demand titles",
        "Anti Freeze CDN — 4K HDR streaming for your clients",
        "Geo-restriction & per-region channel customization",
        "24/7 priority dealer support — separate queue from end-users",
        "Flexible 1–24 month subscription durations",
        "Comprehensive onboarding & dealer training included"
    ];

    const plans = [
        {
            credits: "120 Credits",
            price: "$400.00",
            perCredit: "$3.33 / credit",
            margin: "Resell at $15/mo · 78% margin",
            features: SHARED_FEATURES
        },
        {
            credits: "240 Credits",
            price: "$700.00",
            perCredit: "$2.92 / credit",
            margin: "Resell at $15/mo · 81% margin",
            isBestValue: true,
            features: SHARED_FEATURES
        },
        {
            credits: "500 Credits",
            price: "$1,050.00",
            perCredit: "$2.10 / credit",
            margin: "Resell at $15/mo · 86% margin",
            features: SHARED_FEATURES
        }
    ];

    const valueProps = [
        {
            icon: 'fa-percentage',
            title: 'Industry-leading margins',
            body: 'Bulk credits average $2.10–$3.33 per month per subscriber. Resell at $15–$20/month and keep 78–86% margin on every customer.'
        },
        {
            icon: 'fa-tv',
            title: '22,000+ channels & 100,000+ VOD',
            body: 'Top-tier UK, Spanish, Italian, German and Dutch football, American football, US pro basketball, North American pro hockey, US pro baseball, top-tier open-wheel motorsport, the 2026 Winter Games — every league your clients want, in 4K HDR.'
        },
        {
            icon: 'fa-shield-halved',
            title: 'Anti Freeze CDN — sticky clients',
            body: 'Buffer-free streaming on Anti Freeze CDN means fewer churn-causing freezes. Sticky clients = recurring revenue you keep collecting.'
        },
        {
            icon: 'fa-sitemap',
            title: 'White-label dealer panel',
            body: 'Sub-reseller hierarchy, geo-restriction controls, bulk credit operations, custom subscription durations — full B2B IPTV distribution toolset.'
        },
        {
            icon: 'fa-bolt',
            title: 'Instant credit-based activation',
            body: 'Spend 1 credit → M3U URL + Xtream codes auto-issued in under 60 seconds. Zero waiting, zero ticketing, zero manual provisioning.'
        },
        {
            icon: 'fa-headset',
            title: '24/7 priority dealer support',
            body: 'Resellers route to a separate priority queue. Telegram, email, panel chat — bilingual English support team responds within minutes.'
        }
    ];

    const howItWorks = [
        { step: '01', title: 'Choose your reseller package', body: 'Pick 120, 240, or 500 credits based on your market size. Pay once via Telegram — no recurring contract.' },
        { step: '02', title: 'Get reseller-panel access in <5 min', body: 'Login + bulk credit balance dropped into your white-label IPTV dealer panel. Full admin oversight from minute one.' },
        { step: '03', title: 'Create customers or sub-resellers', body: 'Spend 1 credit per 1-month single-connection account, more for longer durations or multi-connection plans. Set custom expiry, devices, geo restrictions.' },
        { step: '04', title: 'Deliver M3U / Xtream credentials', body: 'System auto-issues credentials. Email them to your client, paste them into TiviMate / IPTV Smarters / OTT Navigator — they stream in 4K HDR within 60 seconds.' }
    ];

    const faqs = [
        {
            q: "What is the ORCA 4K TV IPTV Reseller Program?",
            a: "The ORCA 4K TV Reseller Program is a wholesale, white-label IPTV partnership for dealers, distributors, and B2B operators. You purchase bulk credits (each credit ≈ 1 month of single-connection IPTV service), then provision subscriptions for your own clients through our dedicated reseller panel. You set retail pricing, you keep 78–86% margins, and we run the infrastructure (22,000+ channels, Anti Freeze CDN, AES-256, 24/7 dealer support)."
        },
        {
            q: "How does credit-based provisioning work?",
            a: "Each credit unlocks 1 month of single-connection IPTV service. Longer durations and multi-connection plans cost proportional credits — for example, a 12-month / 2-device subscription costs roughly 24 credits. Spend credits inside your reseller panel and the system auto-issues an M3U URL plus Xtream codes (username, password, host) within 60 seconds. No ticketing, no manual approval, no waiting."
        },
        {
            q: "Can I create sub-resellers and set tiered pricing for them?",
            a: "Yes. The ORCA 4K TV reseller panel supports a full sub-reseller hierarchy. You allocate a portion of your credit balance to each sub-reseller, set their per-credit retail price, and they manage their own customer base — while you collect the wholesale margin on every credit they spend. Useful for regional distributors, multi-language teams, or partner networks."
        },
        {
            q: "What technical setup is required to start reselling?",
            a: "None on your end. The reseller panel is a hosted web app — log in from any browser. Customers receive M3U URLs and Xtream codes that work with every major IPTV player: TiviMate, IPTV Smarters Pro, OTT Navigator, Smart IPTV, Perfect Player, plus native Firestick, Apple TV, Android TV, Smart TV, iOS, and Android apps. No servers to provision, no streaming infrastructure to maintain."
        },
        {
            q: "How fast is customer activation after I create an account?",
            a: "Under 60 seconds. The moment you spend a credit, the panel issues credentials, your customer logs into their player, and they're streaming live in 4K HDR. Average end-to-end onboarding from a customer paying you to them watching their first channel is under 5 minutes."
        },
        {
            q: "Do you support white-labeling — can my clients see my brand?",
            a: "Yes. M3U URLs and Xtream credentials are anonymous from the customer's perspective — they never see ORCA 4K TV branding in their player. You email credentials under your own brand, your own support email, and your own pricing. The IPTV reseller panel itself is for your eyes only; customers never see it."
        },
        {
            q: "Are there sales quotas, contracts, or recurring fees?",
            a: "None. You buy credits when you need them — no monthly commitment, no minimum sales, no contract, no recurring panel fee. Restock credits in any package size whenever your balance runs low. Cancel by simply not restocking — your existing customers continue streaming until their credits expire."
        },
        {
            q: "What payment methods are accepted for restocking credits?",
            a: "Credit / debit card, PayPal, Apple Pay, Google Pay, USDT (TRC-20 / ERC-20) and other major cryptocurrencies, and bank wire for large enterprise restocks. Restocks are processed within minutes during business hours, within 4 hours otherwise."
        }
    ];

    const testimonials = [
        {
            text: "Switched my Berlin reseller business to ORCA 4K TV in early 2026 — now running 80+ active subscribers on the German top-tier football and top European club football tier. Margins jumped from 55% to 81% on the 240-credit package. Anti Freeze CDN is the real differentiator: my churn dropped by half because clients stopped complaining about buffering.",
            partner: "Andre M. — IPTV reseller · Berlin"
        },
        {
            text: "Operating a sub-reseller network across Manchester for UK football, motorsport and premium UK sports clients. Sub-reseller hierarchy lets me onboard new partners in 5 minutes. Credit-based provisioning means zero waiting — I create accounts on-demand and customers stream in 4K HDR within 60 seconds. The 24/7 dealer queue is the cleanest support I've used.",
            partner: "Sam W. — IPTV reseller · Manchester"
        },
        {
            text: "Boutique IPTV reseller out of Lisbon, mostly multilingual Dutch and Portuguese top-tier football clients. The white-label panel is straightforward — even my non-technical clients are streaming under my brand within 60 seconds. Bulk credits at $2.10 each on the 500-credit tier means I can resell at €15/month for 86% margin. Best IPTV reseller program I've found in 2026.",
            partner: "Lucia P. — IPTV reseller · Lisbon"
        }
    ];

    return (
        <div style={{ paddingTop: '180px' }} className="min-h-screen bg-[#001f3f]">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 md:py-24">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="animate-fade-in-up">
                            <div className="inline-block px-5 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#00E5FF] text-[10px] font-black uppercase tracking-[0.3em]">
                                <span className="mr-2 inline-block w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse"></span>
                                ORCA 4K TV Reseller Program · 2026 · Worldwide
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                                Launch Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-[#00E5FF]">IPTV Reseller</span> <br />
                                Business in 2026
                            </h1>
                            <p className="text-xl text-gray-300 font-medium mb-8 max-w-2xl leading-relaxed">
                                Become a profitable IPTV reseller with the industry's leading white-label dealer panel. Credit-based provisioning, instant M3U + Xtream codes activation, sub-reseller hierarchy, 22,000+ live channels in 4K HDR, multi-device delivery, and 24/7 priority dealer support — all under your own brand.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a
                                    href="#pricing"
                                    className="inline-flex items-center justify-center gap-2 bg-[#00E5FF] text-[#001f3f] font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white transition-all shadow-xl shadow-[#00E5FF]/20"
                                >
                                    <i className="fas fa-tags"></i> View Reseller Packages
                                </a>
                                <a
                                    href="https://t.me/Orca4ktv"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-black uppercase tracking-wider px-8 py-4 rounded-full hover:bg-white/10 transition-all"
                                >
                                    <i className="fab fa-telegram"></i> Talk to Partnerships
                                </a>
                            </div>
                        </div>
                        <div className="relative animate-fade-in group flex justify-center md:justify-end mb-12 lg:mb-0">
                            <div className="relative w-full max-w-lg">
                                <div className="absolute inset-0 bg-purple-600/20 rounded-3xl blur-[40px] group-hover:bg-purple-600/30 transition-all duration-500"></div>
                                <img
                                    src={resellersHero}
                                    alt="IPTV reseller working at a modern desk on the ORCA 4K TV white-label dealer panel — credit-based provisioning, instant activation, 22,000+ channels in 4K HDR — photo-realistic professional B2B IPTV reseller business scene."
                                    width={1536}
                                    height={1024}
                                    loading="eager"
                                    className="relative w-full rounded-3xl shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why ORCA 4K TV — Reseller Value Props */}
            <section className="py-20 bg-[#001530]">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <p className="text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em] mb-3">Built for IPTV Resellers</p>
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            Why ORCA 4K TV is the best IPTV reseller program in 2026
                        </h2>
                        <p className="text-gray-400 text-lg mt-4 leading-relaxed">
                            Highest margins, deepest channel library, white-label dealer panel — built for serious IPTV resellers, dealers, and B2B distributors.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                        {valueProps.map((vp, i) => (
                            <div key={i} className="bg-[#002952] rounded-2xl p-8 border border-white/5 hover:border-[#00E5FF]/30 transition-all duration-300 hover:-translate-y-1">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600/20 to-[#00E5FF]/20 flex items-center justify-center mb-5">
                                    <i className={`fas ${vp.icon} text-[#00E5FF] text-xl`}></i>
                                </div>
                                <h3 className="text-xl font-black text-white mb-3 leading-tight">{vp.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{vp.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <p className="text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em] mb-3">How it works</p>
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            From signup to first paying customer in under an hour
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {howItWorks.map((step, i) => (
                            <div key={i} className="relative bg-[#002952] rounded-2xl p-8 border border-white/5">
                                <div className="absolute -top-5 left-8 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-[#00E5FF] flex items-center justify-center text-white font-black text-sm shadow-lg shadow-[#00E5FF]/30">
                                    {step.step}
                                </div>
                                <h3 className="text-lg font-black text-white mb-3 mt-4 leading-tight">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed text-sm">{step.body}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="py-20 relative bg-[#001530]">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center mb-16">
                        <p className="text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em] mb-3">Reseller Packages</p>
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            IPTV Reseller <span className="text-[#00E5FF]">Credit Packages</span>
                        </h2>
                        <p className="text-gray-400 text-lg mt-4 leading-relaxed">
                            Pay once for bulk credits. Resell at $15–$20/month per subscriber. Keep 78–86% margins. No contracts, no minimums, restock anytime.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <div key={index} className={`bg-[#002952] rounded-3xl p-1 relative group hover:-translate-y-2 transition-transform duration-300 ${plan.isBestValue ? 'scale-105 z-10 shadow-2xl shadow-green-500/20 ring-2 ring-[#00C853]' : ''}`}>
                                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="bg-[#001f3f] h-full rounded-[20px] p-8 relative overflow-hidden border border-white/5 group-hover:border-purple-500/30">
                                    {plan.isBestValue && (
                                        <div className="absolute top-0 right-0">
                                            <div
                                                style={{ backgroundColor: '#00C853' }}
                                                className="text-white text-[10px] font-black uppercase tracking-widest py-1.5 px-4 rounded-bl-2xl shadow-lg flex items-center gap-1"
                                            >
                                                <i className="fas fa-check text-[10px]"></i> BEST SELL
                                            </div>
                                        </div>
                                    )}
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-bold text-white mb-2">{plan.credits}</h3>
                                        <div className="text-4xl font-black text-[#00E5FF]">{plan.price}</div>
                                        <div className="text-gray-500 text-xs font-mono mt-2">{plan.perCredit}</div>
                                        <div className="text-green-400 text-xs font-bold mt-1">{plan.margin}</div>
                                    </div>

                                    <ul className="space-y-3 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                                                <i className="fas fa-check-circle text-green-400 mt-1"></i>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href="https://t.me/Orca4ktv"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center bg-white text-black font-black uppercase py-4 rounded-xl hover:bg-[#00E5FF] hover:text-white transition-all shadow-lg"
                                    >
                                        Become an IPTV Reseller
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reseller FAQ */}
            <section className="py-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="text-center mb-16">
                        <p className="text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em] mb-3">Reseller FAQ</p>
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            IPTV Reseller Program — frequently asked questions
                        </h2>
                    </div>
                    <div className="space-y-4">
                        {faqs.map((item, index) => (
                            <div
                                key={index}
                                className={`group rounded-2xl border transition-all duration-300 ${openFaq === index
                                    ? 'bg-[#002952] border-[#00E5FF]/50 shadow-[0_0_30px_rgba(0,229,255,0.1)]'
                                    : 'bg-[#002952]/40 border-white/5 hover:border-white/10'
                                    }`}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                                >
                                    <span className={`text-lg font-bold transition-colors ${openFaq === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                                        {item.q}
                                    </span>
                                    <span className={`flex-shrink-0 ml-4 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`}>
                                        <i className={`fas fa-chevron-down ${openFaq === index ? 'text-[#00E5FF]' : 'text-gray-500'}`}></i>
                                    </span>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="p-6 pt-0 text-gray-400 leading-relaxed font-medium text-base border-t border-white/5 mt-2">
                                        {item.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reseller Testimonials */}
            <section className="py-20 bg-[#001530]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em] mb-3">Verified Partners</p>
                        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                            What ORCA 4K TV IPTV resellers say in 2026
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {testimonials.map((review, i) => (
                            <div key={i} className="bg-[#002952] p-8 rounded-3xl border border-white/5 hover:border-[#00E5FF]/30 transition-all duration-300 hover:-translate-y-1">
                                <div className="flex gap-1 mb-6">
                                    {[...Array(5)].map((_, s) => (
                                        <i key={s} className="fas fa-star text-yellow-500 text-sm"></i>
                                    ))}
                                </div>
                                <blockquote className="text-gray-300 text-base font-medium mb-8 leading-relaxed">
                                    &ldquo;{review.text}&rdquo;
                                </blockquote>
                                <div className="border-t border-white/5 pt-6">
                                    <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-wider mb-1">
                                        <i className="fas fa-check-circle"></i> Verified ORCA 4K TV Partner
                                    </div>
                                    <div className="text-gray-400 text-sm font-mono">{review.partner}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content Block */}
            <section className="bg-[#001f3f] py-20 px-4">
                <div className="max-w-4xl mx-auto space-y-7">
                    <p className="text-center text-[#00E5FF] text-xs font-black uppercase tracking-[0.3em]">
                        Best IPTV Reseller Program 2026
                    </p>

                    <h2 className="text-3xl md:text-5xl font-black text-white text-center leading-tight">
                        Why ORCA 4K TV is the best IPTV reseller program in 2026
                    </h2>

                    <p className="text-gray-300 text-lg leading-relaxed">
                        <strong className="text-white">ORCA 4K TV</strong> is the best IPTV reseller program in 2026 for dealers, distributors, and B2B operators who want highest margins, deepest channel coverage, and the lowest churn in the industry. The cord-cutting market is bigger than ever — 60+ million households across the US, UK, Canada, Germany, and the Netherlands have already canceled cable in favor of IPTV, and 2026 is the year resellers who move first capture the bulk of that recurring revenue. Whether you're a solo IPTV reseller running 50 clients out of a single chat group, or a B2B distributor operating a multi-tier sub-reseller hierarchy across multiple regions, the ORCA 4K TV reseller panel scales with you.
                    </p>

                    <p className="text-gray-300 text-lg leading-relaxed">
                        What makes ORCA 4K TV different from every other IPTV reseller program: <strong className="text-white">Anti Freeze CDN</strong> with regional edge servers, <strong className="text-white">22,000+ live channels</strong> covering top-tier football across the UK, Spain, Italy, Germany and the Netherlands, American football, US pro basketball, US pro baseball, North American pro hockey, top European club football midweek, the 2026 Winter Games, the 2026 international football tournament, and top-tier open-wheel motorsport, plus <strong className="text-white">100,000+ on-demand titles</strong> from Hollywood, premium streaming-platform-equivalent originals, and major premium series. Your clients get true 4K HDR with HDR10+ and Dolby Vision on every device — Firestick 4K Max, Apple TV 4K (3rd gen), Android TV 14, Samsung Tizen, LG webOS, MAG-box, iOS, iPadOS, Android, Windows, macOS, and any modern web browser. The ORCA 4K TV white-label IPTV dealer panel provisions M3U URLs and Xtream codes (TLS 1.3 / AES-256, NIST FIPS 197) instantly via credit-based provisioning, with full sub-reseller hierarchy, geo-restriction controls, bulk credit operations, and flexible 1–24 month subscription durations.
                    </p>

                    <p className="text-gray-300 text-lg leading-relaxed">
                        The credit economics make this the most profitable IPTV reseller program in 2026. On the 500-credit package at <strong className="text-white">$1,050</strong>, your effective wholesale cost is <strong className="text-white">$2.10 per month per single-connection subscriber</strong>. Resell at $15/month and you keep <strong className="text-white">$12.90 — 86% margin</strong>. On the 240-credit package at <strong className="text-white">$700</strong>, you're at $2.92/credit; resell at $15 and keep 81% margin. Even the entry 120-credit package at $400 ($3.33/credit) returns 78% margin at retail $15/month. Every credit issued provisions an instant M3U URL plus Xtream codes — your customer goes from paying you to streaming their first 4K HDR channel in under 60 seconds. The IPTV reseller panel handles all the infrastructure: server provisioning, channel sourcing, CDN routing, encryption, and 24/7 monitoring. You focus on customer acquisition and retention.
                    </p>

                    <p className="text-gray-300 text-lg leading-relaxed">
                        We back every ORCA 4K TV IPTV reseller with comprehensive onboarding, a dedicated 24/7 dealer support queue (separate from end-user support, so partners always route to a senior engineer), and multilingual support across English. Whether you serve <a href="/iptv-usa" className="text-[#00E5FF] hover:underline">US households</a>, <a href="/iptv-uk" className="text-[#00E5FF] hover:underline">UK live-sports fans</a>, <a href="/iptv-canada" className="text-[#00E5FF] hover:underline">Canadian hockey viewers</a>, <a href="/iptv-germany" className="text-[#00E5FF] hover:underline">German live-sports audiences</a>, or <a href="/iptv-netherlands" className="text-[#00E5FF] hover:underline">Dutch live-sports clients</a>, your reseller panel ships them buffer-free 4K HDR streaming on day one. Need product specs to share with your clients? See our <a href="/iptv-shop" className="text-[#00E5FF] hover:underline">IPTV plans</a>, the <a href="/iptv-shop/12-months" className="text-[#00E5FF] hover:underline">12-month subscription</a>, our <a href="/security" className="text-[#00E5FF] hover:underline">security &amp; encryption details</a>, the <a href="/setup-guide" className="text-[#00E5FF] hover:underline">device setup guide</a>, the <a href="/glossary" className="text-[#00E5FF] hover:underline">IPTV glossary</a>, or the <a href="/trial" className="text-[#00E5FF] hover:underline">free trial</a> page so prospective customers can test before they commit.
                    </p>

                    <p className="text-gray-300 text-lg leading-relaxed text-center pt-6">
                        Ready to launch your IPTV reseller business in 2026? <a href="https://t.me/Orca4ktv" target="_blank" rel="noopener noreferrer" className="text-[#00E5FF] hover:underline font-bold">Talk to ORCA 4K TV partnerships on Telegram</a> · <a href="#pricing" className="text-[#00E5FF] hover:underline font-bold">View Reseller Packages</a>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default ResellersPage;
