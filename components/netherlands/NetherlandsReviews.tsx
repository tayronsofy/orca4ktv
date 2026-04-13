'use client'

import React from 'react';

const reviewsRaw = [
  {
    text: "De Eredivisie-streams lopen absoluut vloeiend en de 4K-kwaliteit ziet er fantastisch uit. Installatie duurde maar 5 minuten.",
    device: "Android TV – Amsterdam",
  },
  {
    text: "Geweldige support die snel reageert. Ik had een klein probleem met de app en ze hebben het meteen opgelost. Zeker aanbevelen!",
    device: "Firestick – Rotterdam",
  },
  {
    text: "Enorme VOD-bibliotheek en de EPG heeft alle Nederlandse zenders. Werkt perfect op mijn smartphone en Smart TV.",
    device: "iOS + Samsung TV – Utrecht",
  },
];

const NetherlandsReviews: React.FC = () => {
  return (
    <section className="py-20 bg-[#15171a] relative overflow-hidden" id="reviews">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#21468B]/10 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#AE1C28]/10 rounded-full blur-[120px] translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
            IPTV Nederland – <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#AE1C28] to-[#21468B]">Gebruikersreviews</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#AE1C28] to-[#21468B] mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Nederlandse gebruikers kiezen ons vanwege stabiliteit, premium sportkanalen en snelle hulp bij de installatie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsRaw.map((review, i) => (
            <div
              key={i}
              className="bg-[#1f2326] p-8 rounded-3xl border border-white/5 hover:border-[#21468B]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, starIndex) => (
                  <i key={starIndex} className="fas fa-star text-yellow-500 text-sm"></i>
                ))}
              </div>

              <blockquote className="text-gray-300 text-lg font-medium mb-8 leading-relaxed">
                &ldquo;{review.text}&rdquo;
              </blockquote>

              <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <i className="fas fa-check-circle"></i> Geverifieerde klant
                  </div>
                  <div className="text-gray-500 text-sm font-mono">
                    Gebruiker: <span className="text-gray-400">{review.device}</span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-[#AE1C28] transition-all">
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

export default NetherlandsReviews;
