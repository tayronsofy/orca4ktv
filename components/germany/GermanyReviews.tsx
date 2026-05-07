'use client'

import React from 'react';

const reviewsRaw = [
  {
    text: "Jedes Spitzenfußball-Topspiel und alle europäischen Klubfußball-Abende in 4K HDR auf meinem Apple TV 4K - kein Ruckeln, selbst beim entscheidenden Spieltag im Mai. Mein Kabelvertrag gekündigt und über 50 € pro Monat gespart.",
    device: "Apple TV 4K - Berlin",
  },
  {
    text: "In unter 5 Minuten mit TiviMate auf dem Firestick 4K Max eingerichtet. Motorsport-Sonntage, Pokal-Mittwoch, Winterspiele-Highlights - alles gestochen scharf. Der EPG ist klarer als alles, was ich vorher hatte.",
    device: "Firestick 4K Max - München",
  },
  {
    text: "Nach der x-ten Preiserhöhung gewechselt. Gleicher Spitzenfußball, gleiche öffentlich-rechtlichen Mediatheken, plus 100+ internationale Sender. Streamt einwandfrei in 4K HDR auf meinem LG OLED.",
    device: "LG webOS + iPhone - Hamburg",
  },
];

const GermanyReviews: React.FC = () => {
  return (
    <section className="py-20 bg-[#001530] relative overflow-hidden" id="reviews">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-700/10 rounded-full blur-[120px] translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
            IPTV Deutschland - <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-yellow-400">Nutzerbewertungen</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-700 to-yellow-500 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Verifizierte deutsche Cord-Cutter von Berlin bis München - pufferungsfreies 4K HDR, jedes Spitzenfußball-Spiel, jeder Open-Wheel-Motorsport-Grand-Prix, jeder Winterspiele-Moment, ein einziges IPTV-Abonnement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsRaw.map((review, i) => (
            <div
              key={i}
              className="bg-[#001f3f] p-8 rounded-3xl border border-white/5 hover:border-yellow-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
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
