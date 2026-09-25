'use client'

import React from 'react';

const reviewsRaw = [
  {
    text: "Hade tre olika streamingtjänster bara för att få ihop fotbollen och hockeyn. Nu ligger allt i TiviMate på Apple TV:n och bilden i 4K är faktiskt bättre än den jag betalade dubbelt för.",
    device: "Apple TV 4K · Stockholm",
  },
  {
    text: "Skeptisk först, men det tog fem minuter att få igång på Firesticken. Skidskyttet i februari gick utan ett enda hack, och det var mitt riktiga test.",
    device: "Firestick 4K Max · Göteborg",
  },
  {
    text: "Bytte när tv-paketet höjde priset igen. Samma svenska kanaler som förut plus en massa internationella nyhetskanaler jag inte visste att jag ville ha. Supporten svarade inom en timme en söndag.",
    device: "Samsung Tizen + Android · Malmö",
  },
];

const SwedenReviews: React.FC = () => {
  return (
    <section className="py-20 bg-[#001530] relative overflow-hidden" id="reviews">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-[120px] -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] translate-y-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 uppercase tracking-tight">
            IPTV Sverige, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-yellow-400">vad kunderna säger</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-yellow-400 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Verifierade kunder från Stockholm, Göteborg och Malmö om hur det faktiskt fungerar i vardagen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewsRaw.map((review, i) => (
            <div
              key={i}
              className="bg-[#001f3f] p-8 rounded-3xl border border-white/5 hover:border-yellow-400/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, starIndex) => (
                  <i key={starIndex} className="fas fa-star text-yellow-400 text-sm"></i>
                ))}
              </div>

              <blockquote className="text-gray-300 text-lg font-medium mb-8 leading-relaxed">
                "{review.text}"
              </blockquote>

              <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-wider mb-1">
                    <i className="fas fa-check-circle"></i> Verifierad kund
                  </div>
                  <div className="text-gray-500 text-sm font-mono">
                    Enhet: <span className="text-gray-400">{review.device}</span>
                  </div>
                </div>

                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-white group-hover:bg-blue-600 transition-all">
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

export default SwedenReviews;
