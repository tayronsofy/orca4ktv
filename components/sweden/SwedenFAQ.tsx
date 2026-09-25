'use client'

import React, { useState } from 'react';

const SwedenFAQ: React.FC = () => {
  const [openIndex, setIndex] = useState<number | null>(0);

  const swedenFaqData = [
    {
      question: "Kan jag se all svensk elitfotboll och hela hockeyslutspelet i 4K HDR?",
      answer: "Ja. Varje omgång i den svenska högstaligan i fotboll, superettan, cupen och hela elithockeysäsongen inklusive slutspelet ingår. Även europeisk klubbfotboll mitt i veckan och de internationella turneringarna med landslaget. Inget separat sportpaket och ingen extra avgift per match."
    },
    {
      question: "Ingår vintersporten, alltså skidskytte, längdskidor och vinterspelen 2026?",
      answer: "Ja. Skidskytte- och längdvärldscupen sänds live under hela vintern, och vinterspelen i februari 2026 ingår i sin helhet med alla medaljlopp. Sommarens stora internationella fotbollsturnering 2026 i Nordamerika sänds också live i 4K HDR."
    },
    {
      question: "Vilka svenska kanaler finns med?",
      answer: "Alla viktiga svenska public service-kanaler med regionala nyheter, de stora kommersiella fria kanalerna och deras systerkanaler, barnkanalerna, nyhetskanalerna samt sportkanalerna och sportpaketen. Kanallistan är sorterad så att de svenska kanalerna ligger först."
    },
    {
      question: "Stryper Telia, Telenor, Tele2 eller Bahnhof min IPTV-trafik?",
      answer: "Våra strömmar går över TLS 1.3 med AES-256-kryptering, vilket gör det svårt för en operatör att identifiera och strypa just IPTV-trafik. De flesta svenska hushåll märker ingenting alls. Om du ändå ser hack på kvällstid fungerar tjänsten med VPN på alla abonnemang utan hastighetsbegränsning."
    },
    {
      question: "Vilka enheter fungerar? Firestick, Apple TV, Samsung, LG?",
      answer: "Alla vanliga. Firestick 4K Max och Fire TV Cube, Apple TV 4K, Android TV-boxar som Nvidia Shield och Chromecast med Google TV, Samsung Tizen, LG webOS, MAG-box, iPhone och iPad, Android-mobiler och -tablets, Windows, Mac, Linux och alla moderna webbläsare. Samma kanallista och tv-guide överallt via TiviMate, IPTV Smarters Pro eller OTT Navigator."
    },
    {
      question: "Hur många kan titta samtidigt i hushållet?",
      answer: "Du väljer 1 till 4 samtidiga streams när du beställer. Med fyra kan tv:n i vardagsrummet visa fotbollen, tabletten i barnrummet en film och mobilen i köket nyheterna, alla samtidigt. Priserna för varje antal enheter visas i prislistan ovan."
    },
    {
      question: "Finns det en gratis provperiod, och vad gäller för bindningstid?",
      answer: "Ja, du kan testa gratis utan kort. Du får tillgång till hela kanalbiblioteket i full 4K HDR direkt. Abonnemangen löper en månad, ett kvartal, ett halvår eller ett år och förnyas inte automatiskt. Ingen bindningstid, ingen uppsägningsavgift."
    },
    {
      question: "Betalar jag i svenska kronor?",
      answer: "Priserna på den här sidan visas i kronor så att du ser vad det kostar. Själva betalningen görs i USD, så beloppet på kontoutdraget kan skilja sig med några kronor beroende på bankens växelkurs och eventuell valutaavgift. Inloggningsuppgifterna skickas per e-post inom några minuter efter betalningen."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "inLanguage": "sv-SE",
    "mainEntity": swedenFaqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-12 bg-[#001f3f] relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">
            IPTV Sverige <span className="text-yellow-400">frågor och svar</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-yellow-400 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 font-medium">Raka svar på det folk brukar undra innan de byter.</p>
        </div>

        <div className="space-y-4">
          {swedenFaqData.map((item, index) => (
            <div
              key={index}
              className={`group rounded-2xl border transition-all duration-300 ${openIndex === index
                ? 'bg-[#002952] border-yellow-400/50 shadow-[0_0_30px_rgba(254,204,2,0.1)]'
                : 'bg-[#002952]/40 border-white/5 hover:border-white/10'
                }`}
            >
              <button
                onClick={() => setIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                  {item.question}
                </span>
                <span className={`flex-shrink-0 ml-4 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <i className={`fas fa-chevron-down ${openIndex === index ? 'text-yellow-400' : 'text-gray-500'}`}></i>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed font-medium text-base border-t border-white/5 mt-2">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#001a3a] to-[#001f3f] border border-yellow-400/20 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Behöver du hjälp att komma igång?</h3>
          <p className="text-gray-400 mb-6">Supporten svarar dygnet runt, på svenska eller engelska.</p>
          <a
            href="mailto:support@orca4ktv.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#001a36] font-black rounded-full uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
          >
            <i className="fas fa-envelope text-blue-600"></i> Kontakta oss
          </a>
        </div>
      </div>
    </section>
  );
};

export default SwedenFAQ;
