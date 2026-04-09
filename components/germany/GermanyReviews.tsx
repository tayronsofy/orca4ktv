'use client'

import React from 'react';

const reviewsRaw = [
  {
    text: "Die Bundesliga-Streams laufen absolut flüssig und die 4K-Qualität sieht fantastisch aus. Die Einrichtung dauerte nur 5 Minuten.",
    device: "Android TV – Berlin",
  },
  {
    text: "Toller Support, der schnell antwortet. Ich hatte ein kleines App-Problem und sie haben es sofort gelöst. Sehr empfehlenswert!",
    device: "Firestick – München",
  },
  {
    text: "Riesige VOD-Bibliothek und der EPG hat alle deutschen Sender. Funktioniert perfekt auf meinem Smartphone und Smart TV.",
    device: "iOS + Samsung TV – Hamburg",
  },
];

const GermanyReviews: React.FC = () => {
  return (
    <section className="py-20 bg-[#15171a] relative overflow-hidden" id="reviews">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-700/10 rounded-full blur-[120px] translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
            IPTV Deutschland – <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">Nutzerbewertungen</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-700 to-yellow-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Deutsche Nutzer wählen uns wegen Stabilität, Premium-Sportkanälen und schnellem Support bei der Einrichtung.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsRaw.map((review, i) => (
            <div
              key={i}
              className="bg-[#1f2326] p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, starIndex) => (
                  <i key={starIndex} className="fas fa-star text-yellow-500 text-sm"></i>
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="text-gray-300 text-lg font-medium mb-8 leading-relaxed">
                „{review.text}"
              </blockquote>

              <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <i className="fas fa-check-circle"></i> Verifizierter Kunde
                  </div>
                  <div className="text-gray-500 text-sm font-mono">
                    Nutzer: <span className="text-gray-400">{review.device}</span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-red-700 transition-all">
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

export default GermanyReviews;
