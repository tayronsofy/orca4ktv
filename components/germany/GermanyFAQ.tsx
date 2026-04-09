'use client'

import React, { useState } from 'react';

const GermanyFAQ: React.FC = () => {
  const [openIndex, setIndex] = useState<number | null>(0);

  const germanyFaqData = [
    {
      question: "Sind deutsche Lokalsender enthalten?",
      answer: "Ja, neben unserer umfangreichen globalen Bibliothek umfasst dein Abonnement alle wichtigen deutschen Lokalsender und Premium-Sportkanäle – darunter ARD, ZDF, RTL, ProSieben, Sat.1, VOX und viele mehr. Du verpasst keine lokalen Nachrichten oder Spiele deines Lieblingsvereins."
    },
    {
      question: "Drosselt mein Internetanbieter diesen Dienst in Deutschland?",
      answer: "Wir nutzen fortschrittliche Routing-Technologie und sichere Verbindungsoptimierungen, die es deutschen ISPs erschweren, deinen Streaming-Traffic zu drosseln. Du erhältst die volle Bandbreite, die du bezahlst, für ein perfektes 4K-Bild."
    },
    {
      question: "Kann ich meinen Account mit der Familie teilen?",
      answer: "Du kannst so viele Geräte gleichzeitig verbinden, wie dein Plan erlaubt. Ob der Fernseher im Wohnzimmer oder das Tablet im Kinderzimmer – solange du im Rahmen deines Plans bleibst, kann dein Haushalt gleichzeitig schauen."
    },
    {
      question: "Welche Hardware benötige ich zum Starten?",
      answer: "Praktisch jedes moderne Gerät funktioniert. Lade einfach eine kompatible Streaming-App auf deinen Amazon Firestick, Apple TV, Android TV-Box oder Smart TV herunter. Keine proprietären Kabelboxen oder Satellitenschüsseln erforderlich."
    },
    {
      question: "Gibt es einen Vertrag oder Kündigungsgebühren?",
      answer: "Wir bieten vollständige Flexibilität auf Monatsbasis oder zu vergünstigten Prepaid-Laufzeiten. Es gibt keine automatischen Abbuchungen, keine versteckten Gebühren und keine Kündigungsstrafen. Du behältst die vollständige Kontrolle über deine Zahlungen."
    },
    {
      question: "Wie schnell erhalte ich meine Zugangsdaten?",
      answer: "Sobald der Checkout abgeschlossen ist, richtet unser automatisches System deinen Account sofort ein. Prüfe deinen Posteingang (und Spam-Ordner) auf die sofortigen Einrichtungsanweisungen – du kannst innerhalb von Minuten anfangen zu streamen."
    },
    {
      question: "Was passiert, wenn ich während eines Spiels Pufferprobleme habe?",
      answer: "Unser auf Deutschland ausgerichtetes Liefernetzwerk hält eine Verfügbarkeit von 99,9 % aufrecht. Gelegentliche Internet-Routing-Aussetzer können jedoch vorkommen. Unser Support-Team ist rund um die Uhr über das Helpdesk erreichbar, um deine Verbindungsrouten sofort zu optimieren."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": germanyFaqData.map(item => ({
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

      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">
            IPTV Deutschland <span className="text-yellow-400">FAQ</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-700 to-yellow-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 font-medium">Klare Antworten für deutsche IPTV-Nutzer.</p>
        </div>

        <div className="space-y-4">
          {germanyFaqData.map((item, index) => (
            <div
              key={index}
              className={`group rounded-2xl border transition-all duration-300 ${openIndex === index
                ? 'bg-[#2c3034] border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.1)]'
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

        {/* Support CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#1e102f] to-[#0c162b] border border-yellow-500/20 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Brauchst du Hilfe beim Einrichten?</h3>
          <p className="text-gray-400 mb-6">Unser deutschsprachiges Support-Team ist rund um die Uhr für dich da.</p>
          <a
            href="mailto:contact@smart4k.io"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#1a1d20] font-black rounded-full uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
          >
            <i className="fas fa-envelope text-red-700"></i> Kontakt
          </a>
        </div>
      </div>
    </section>
  );
};

export default GermanyFAQ;
