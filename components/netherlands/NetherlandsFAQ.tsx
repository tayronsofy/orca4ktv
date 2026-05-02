'use client'

import React, { useState } from 'react';

const NetherlandsFAQ: React.FC = () => {
  const [openIndex, setIndex] = useState<number | null>(0);

  const netherlandsFaqData = [
    {
      question: "Kan ik elke topvoetbal-wedstrijd inclusief de zaterdagavondtopper in 4K HDR kijken?",
      answer: "Ja. Elke Nederlandse topvoetbal-wedstrijd van het seizoen 2025–26 en 2026–27 (vrijdagavond, zaterdag, zondag-topper, maandagavond), de complete tweede divisie, het gehele nationale bekertoernooi tot aan de finale eind april 2026 in De Kuip, alle top Europese clubvoetbal-knockouts en aanvullende Europese clubcompetities zijn live in 4K HDR inbegrepen — geen apart sportpakket, geen toeslag."
    },
    {
      question: "Zijn het zomerse internationale voetbaltoernooi 2026, de Olympische Winterspelen 2026 en de open-wheel motorsport met de Nederlandse topcoureur erbij?",
      answer: "Ja. Het zomerse internationale voetbaltoernooi 2026 in de VS, Canada en Mexico met het Nederlands elftal wordt live in 4K HDR uitgezonden. De Olympische Winterspelen 2026 (6–22 februari 2026) — schaatsen, snowboard, ijshockey, curling, alle medaillebeslissingen met TeamNL — zijn ook volledig opgenomen. Het open-wheel motorsport-seizoen 2026 met geheel nieuwe reglementen waarin de Nederlandse topcoureur zijn vijfde wereldtitel najaagt, zenden wij elke race live uit."
    },
    {
      question: "Zijn alle belangrijke Nederlandse free-to-air zenders inbegrepen?",
      answer: "Ja, volledig. Alle belangrijke Nederlandse publieke en commerciële free-to-air zenders, hun thematische zusterkanalen en de regionale omroepen, plus de Nederlandse premium sportlaag zijn allemaal aanwezig. Inclusief alle belangrijke Nederlandse nieuwszenders en alle catch-up-content via een catch-up streaming-equivalent."
    },
    {
      question: "Beperken Ziggo, KPN, T-Mobile of Odido mijn IPTV-streams?",
      answer: "Onze streams gebruiken TLS 1.3 met AES-256-versleuteling (NIST FIPS 197), waardoor traffic-shaping voor ISP's onbetrouwbaar wordt. Mocht je toch beperking ervaren — vooral in de spits op zwaarbelaste Nederlandse aansluitingen — dan is IPTV met VPN in elk abonnement volledig ondersteund, zonder snelheidslimiet. De meeste Nederlandse huishoudens ervaren helemaal geen beperking."
    },
    {
      question: "Welke streaming-apparaten werken — Firestick 4K Max, Apple TV 4K, Smart TV?",
      answer: "Alle. Firestick 4K Max, Amazon Fire TV Cube, Apple TV 4K (3e generatie), Android TV 14-boxen (Nvidia Shield, Onn 4K Pro, Chromecast met Google TV), Samsung Tizen, LG webOS, MAG-box, plus iOS / iPadOS / Android-smartphones en -tablets, Windows / macOS / Linux pc's en elke HTML5-browser. Dezelfde Nederlandse zenderbibliotheek en EPG op elk scherm via TiviMate, IPTV Smarters Pro of OTT Navigator."
    },
    {
      question: "Hoeveel gelijktijdige streams kan mijn huishouden gebruiken?",
      answer: "Abonnementen bieden tot 4 gelijktijdige verbindingen — daarmee kunnen de huiskamer-tv, de tablet in de kinderkamer en een smartphone in de keuken tegelijkertijd verschillende zenders tonen. Perfect voor een topvoetbal-weekend met de topper in de huiskamer en het sportoverzicht op de tablet. Het 1-maand-abonnement start met 1 verbinding; het 12-maanden-abonnement bevat standaard tot 4 verbindingen zonder meerprijs."
    },
    {
      question: "Is er een gratis proefperiode — en een contract of opzegkosten?",
      answer: "Gratis IPTV-proefperiode zonder creditcard, directe activering, volledige toegang tot de bibliotheek van 22.000 zenders, volledige 4K HDR. Test voordat je betaalt. Abonnementen zijn maandelijks of als voordelige kwartaal-, half-jaar- of 12-maanden-pakketten. Geen automatische verlenging, geen verborgen kosten, geen opzegboete. Altijd opzegbaar."
    },
    {
      question: "Hoe snel ontvang ik mijn inloggegevens na bestelling?",
      answer: "IPTV directe start: van afrekenen tot de eerste live zender duurt doorgaans minder dan 5 minuten. Inloggegevens (M3U-URL + Xtream-codes) worden automatisch per e-mail verzonden zodra de betaling binnenkomt. De installatie met elke compatibele speler duurt nog eens 60 seconden — bekijk de stap-voor-stap installatiegids voor jouw apparaat."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": netherlandsFaqData.map(item => ({
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

      <div className="absolute top-0 right-0 w-96 h-96 bg-[#21468B]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">
            IPTV Nederland <span className="text-[#21468B]">FAQ</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#AE1C28] to-[#21468B] mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 font-medium">Duidelijke antwoorden voor Nederlandse cord-cutters en live-sport-fans.</p>
        </div>

        <div className="space-y-4">
          {netherlandsFaqData.map((item, index) => (
            <div
              key={index}
              className={`group rounded-2xl border transition-all duration-300 ${openIndex === index
                ? 'bg-[#002952] border-[#21468B]/50 shadow-[0_0_30px_rgba(33,70,139,0.1)]'
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
                  <i className={`fas fa-chevron-down ${openIndex === index ? 'text-[#21468B]' : 'text-gray-500'}`}></i>
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

        {/* Support CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#001a3a] to-[#001f3f] border border-[#21468B]/20 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Hulp nodig bij het instellen?</h3>
          <p className="text-gray-400 mb-6">Ons Nederlandstalige supportteam staat dag en nacht voor je klaar.</p>
          <a
            href="mailto:support@orca4ktv.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#001a36] font-black rounded-full uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
          >
            <i className="fas fa-envelope text-[#AE1C28]"></i> Contact
          </a>
        </div>
      </div>
    </section>
  );
};

export default NetherlandsFAQ;
