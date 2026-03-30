'use client'

import React, { useEffect } from 'react';
const resellersHero = '/images/resellers-hero.png';
import SEO from '../components/SEO';

const ResellersPage: React.FC = () => {

    // SEO
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const SHARED_FEATURES = [
        "Exclusive Admin Control Panel",
        "Comprehensive Dealer Training",
        "Effortless Client Management",
        "Sub-Reseller Creation Rights",
        "Geo-Restriction Customization",
        "Priority Dealer Assistance 24/7",
        "Flawless Infrastructure Stability",
        "Flexible 1-24 Month Subscriptions",
        "Intuitive Dashboard Interface"
    ];

    const plans = [
        {
            credits: "120 Credits",
            price: "$400.00",
            features: SHARED_FEATURES
        },
        {
            credits: "240 Credits",
            price: "$700.00",
            isBestValue: true,
            features: SHARED_FEATURES
        },
        {
            credits: "500 Credits",
            price: "$1,050.00",
            features: SHARED_FEATURES
        }
    ];

    return (
        <div style={{ paddingTop: '180px' }} className="min-h-screen bg-[#1f2326]">
            <SEO
                title="Best IPTV Reseller Program 2026 - High Margin Panel"
                description="Start your own IPTV business with our white-label reseller panel. Best prices, 24/7 support, and instant activation. Become a SMART 4K dealer today."
                keywords="iptv reseller, reseller panel, white label iptv, sell iptv, iptv dealer, best iptv reseller program 2026"
            />
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 md:py-24">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="animate-fade-in-up">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                                Launch Your <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">SMART 4K</span> <br />
                                Broadcasting Empire
                            </h1>
                            <p className="text-xl text-gray-300 font-medium mb-8 max-w-2xl leading-relaxed">
                                Partner with the industry leader. Provision premium, buffer-free entertainment for your clients, family, and network with our robust, white-label dealer platform.
                            </p>
                        </div>
                        <div className="relative animate-fade-in group flex justify-center md:justify-end mb-12 lg:mb-0">
                            {/* Hero Image */}
                            <div className="relative w-full max-w-lg">
                                <div className="absolute inset-0 bg-purple-600/20 rounded-3xl blur-[40px] group-hover:bg-purple-600/30 transition-all duration-500"></div>
                                <img
                                    src={resellersHero}
                                    alt="SMART 4K Reseller Control Panel"
                                    className="relative w-full rounded-3xl shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform duration-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Description Section */}
            <section className="py-12 bg-[#15171a]">
                <div className="container mx-auto px-6">
                    <div className="max-w-5xl mx-auto text-center">
                        <p className="text-gray-200 text-2xl leading-relaxed font-normal">
                            Discover our tailored <strong className="text-white">SMART 4K Wholesale Packages</strong> designed for scalability and maximum profit margins.
                            Deliver an elite viewing experience while maintaining complete administrative oversight.
                            Our centralized portal empowers you to generate subscriptions, establish sub-vendors, and <span className="text-[#a855f7]">build your digital distribution network</span>.
                            Seize the opportunity to dominate the streaming market with unmatched backend reliability.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Section */}
            <section className="py-20 relative">
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-3xl font-black text-center text-white mb-16 uppercase tracking-widest">
                        Reseller <span className="text-[#a855f7]">Packages</span>
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {plans.map((plan, index) => (
                            <div key={index} className={`bg-[#2c3034] rounded-3xl p-1 relative group hover:-translate-y-2 transition-transform duration-300 ${plan.isBestValue ? 'scale-105 z-10 shadow-2xl shadow-green-500/20 ring-2 ring-[#00C853]' : ''}`}>
                                <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="bg-[#1f2326] h-full rounded-[20px] p-8 relative overflow-hidden border border-white/5 group-hover:border-purple-500/30">
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
                                    <div className="text-center mb-8">
                                        <h3 className="text-2xl font-bold text-white mb-2">{plan.credits}</h3>
                                        <div className="text-4xl font-black text-[#a855f7]">{plan.price}</div>
                                    </div>

                                    <ul className="space-y-4 mb-8">
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-gray-400 text-sm">
                                                <i className="fas fa-check-circle text-green-400 mt-1"></i>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <a
                                        href="https://t.me/SMART4K_support"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full text-center bg-white text-black font-black uppercase py-4 rounded-xl hover:bg-[#a855f7] hover:text-white transition-all shadow-lg"
                                    >
                                        Contact Us
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ResellersPage;
