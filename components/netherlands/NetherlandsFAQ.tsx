'use client'

import React, { useState } from 'react';

const NetherlandsFAQ: React.FC = () => {
  const [openIndex, setIndex] = useState<number | null>(0);

  const netherlandsFaqData = [
    {
      question: "Zijn Nederlandse lokale zenders inbegrepen?",
      answer: "Ja, naast onze uitgebreide wereldwijde bibliotheek bevat je abonnement alle belangrijke Nederlandse lokale en nationale zenders – waaronder NPO 1, NPO 2, NPO 3, RTL 4, RTL 5, SBS6, Veronica en vele regionale zenders. Je mist nooit meer het lokale nieuws of een wedstrijd van je favoriete club."
    },
    {
      question: "Vertraagt mijn internetprovider deze dienst in Nederland?",
      answer: "Wij maken gebruik van geavanceerde routeringstechnologie en beveiligde verbindingsoptimalisaties die het voor Nederlandse providers moeilijk maken om je streamingverkeer te beperken. Je krijgt de volledige bandbreedte waarvoor je betaalt, voor een perfecte 4K-beeldkwaliteit."
    },
    {
      question: "Kan ik mijn account delen met mijn gezin?",
      answer: "Je kunt zoveel apparaten tegelijkertijd verbinden als je abonnement toestaat. Of het nu de televisie in de woonkamer is of de tablet van de kinderen – zolang je binnen de limieten van je abonnement blijft, kan je hele huishouden tegelijkertijd kijken."
    },
    {
      question: "Welke hardware heb ik nodig om te beginnen?",
      answer: "Vrijwel elk modern apparaat werkt. Download gewoon een compatibele streaming-app op je Amazon Firestick, Apple TV, Android TV-box of Smart TV. Geen speciale kabelboxen of satellietschotels vereist."
    },
    {
      question: "Is er een contract of annuleringskosten?",
      answer: "Wij bieden volledige flexibiliteit op maandbasis of via voordelige vooruitbetaalde abonnementen. Er zijn absoluut geen automatische incasso's, verborgen kosten of annuleringsboetes. Jij behoudt de volledige controle over je betalingen."
    },
    {
      question: "Hoe snel ontvang ik mijn inloggegevens?",
      answer: "Zodra het afrekenen is voltooid, wordt je account direct automatisch aangemaakt. Controleer je inbox (en spammap) op de directe installatie-instructies – je kunt binnen enkele minuten beginnen met streamen."
    },
    {
      question: "Wat gebeurt er als ik tijdens een wedstrijd bufferingproblemen heb?",
      answer: "Ons op Nederland gerichte leveringsnetwerk handhaaft een beschikbaarheid van 99,9%. Incidentele internetonderbrekingen kunnen echter voorkomen. Ons supportteam is 24/7 beschikbaar via de helpdesk om je verbindingsroutes onmiddellijk te optimaliseren als je problemen ervaart."
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
    <section id="faq" className="py-12 bg-[#1f2326] relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="absolute top-0 right-0 w-96 h-96 bg-[#21468B]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">
            IPTV Nederland <span className="text-[#21468B]">FAQ</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#AE1C28] to-[#21468B] mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 font-medium">Duidelijke antwoorden voor Nederlandse IPTV-gebruikers.</p>
        </div>

        <div className="space-y-4">
          {netherlandsFaqData.map((item, index) => (
            <div
              key={index}
              className={`group rounded-2xl border transition-all duration-300 ${openIndex === index
                ? 'bg-[#2c3034] border-[#21468B]/50 shadow-[0_0_30px_rgba(33,70,139,0.1)]'
                : 'bg-[#2c3034]/40 border-white/5 hover:border-white/10'
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
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#1e102f] to-[#0c162b] border border-[#21468B]/20 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Hulp nodig bij het instellen?</h3>
          <p className="text-gray-400 mb-6">Ons Nederlandstalige supportteam staat dag en nacht voor je klaar.</p>
          <a
            href="mailto:contact@smart4k.io"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#1a1d20] font-black rounded-full uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
          >
            <i className="fas fa-envelope text-[#AE1C28]"></i> Contact
          </a>
        </div>
      </div>
    </section>
  );
};

export default NetherlandsFAQ;
