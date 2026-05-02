'use client'

import React from 'react';

const reviewsRaw = [
    {
        text: "Watched every home hockey playoff game in 4K HDR on my Apple TV 4K — zero buffering during overtime, even during the championship final. Dropped my cable plan and saved over $90 a month.",
        device: "Apple TV 4K — Toronto, ON",
    },
    {
        text: "Set up in under 5 minutes with TiviMate on my Firestick 4K Max. Local hockey games on the premium sports tier, Canadian football Fridays, even the 2026 Winter Games curling final — all crystal clear. Bilingual EPG is a killer feature.",
        device: "Firestick 4K Max — Vancouver, BC",
    },
    {
        text: "Switched after the umpteenth price hike. Same French-language sports and free-to-air coverage I had before, plus 100+ extra international channels. Service à la clientèle en français — nickel.",
        device: "LG webOS + iPhone — Montréal, QC",
    },
];

const CanadaReviews: React.FC = () => {
    return (
        <section className="py-20 bg-[#001530] relative overflow-hidden" id="reviews">
            {/* Background Ambience */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px] translate-y-1/2"></div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
                        CANADA IPTV – <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">User Reviews</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full mb-6"></div>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Verified Canadian cord-cutters from Toronto to Vancouver to Montréal — buffer-free 4K HDR, every North American pro hockey game, every Winter Games final, every Canadian English and French free-to-air feed, one bilingual IPTV subscription.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {reviewsRaw.map((review, i) => (
                        <div
                            key={i}
                            className="bg-[#001f3f] p-8 rounded-3xl border border-white/5 hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
                        >
                            {/* Stars */}
                            <div className="flex gap-1 mb-6">
                                {[...Array(5)].map((_, starIndex) => (
                                    <i key={starIndex} className="fas fa-star text-yellow-500 text-sm"></i>
                                ))}
                            </div>

                            {/* Review Text */}
                            <blockquote className="text-gray-300 text-lg font-medium mb-8 leading-relaxed">
                                "{review.text}"
                            </blockquote>

                            <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                                <div>
                                    <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-wider mb-1">
                                        <i className="fas fa-check-circle"></i> Verified Customer
                                    </div>
                                    <div className="text-gray-500 text-sm font-mono">
                                        User: <span className="text-gray-400">{review.device}</span>
                                    </div>
                                </div>

                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-red-600 transition-all">
                                    <i className="fas fa-user"></i>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CanadaReviews;
