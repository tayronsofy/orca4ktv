'use client'

import React, { useState } from 'react';

const GermanyFAQ: React.FC = () => {
  const [openIndex, setIndex] = useState<number | null>(0);

  const germanyFaqData = [
    {
      question: "Kann ich jedes Bundesliga-Spiel inklusive Topspiel-Samstag in 4K HDR sehen?",
      answer: "Ja. Jedes Bundesliga-Spiel der Saison 2025–26 und 2026–27 (Freitagabend, Samstag-Konferenz, Topspiel um 18:30 Uhr, Sonntag) sowie die komplette 2. Bundesliga, der gesamte DFB-Pokal bis zum Finale Ende Mai 2026 in Berlin, alle UEFA Champions League K.o.-Spiele, Europa League und Conference League sind live in 4K HDR enthalten – kein separates Sport-Paket, keine Zusatzgebühr."
    },
    {
      question: "Sind die Fußball-WM 2026, Olympia Mailand-Cortina und die F1 mit Audi-Einstieg dabei?",
      answer: "Ja. Die Fußball-WM 2026 in den USA, Kanada und Mexiko mit der DFB-Elf läuft live in 4K HDR. Die Olympischen Winterspiele Mailand-Cortina (6.–22. Februar 2026) – Biathlon, Skispringen, Eishockey, Curling, alle Medaillenentscheidungen – sind ebenfalls vollständig enthalten. Die Formel-1-Saison 2026 mit Audi als deutschem Werksteam und kompletten neuen Reglements zeigen wir bei jedem Grand Prix live."
    },
    {
      question: "Sind ARD, ZDF, RTL, ProSieben, Sat.1 und Vox enthalten?",
      answer: "Ja, vollständig nach Postleitzahl. Das Erste, ZDF, alle ARD-Regionalsender (BR, NDR, WDR, MDR, SWR, HR, RBB, SR), Arte, 3sat, Phoenix, KiKa, RTL, RTL2, RTL Plus, Vox, ProSieben, ProSieben Maxx, Sat.1, Sat.1 Gold, Kabel Eins, Sport1 und Eurosport sind alle dabei. Inklusive Tagesschau, ZDFheute, n-tv, Welt und allen Mediathek-Inhalten."
    },
    {
      question: "Drosseln Vodafone, Telekom, 1&1 oder PYUR meine IPTV-Streams?",
      answer: "Unsere Streams nutzen TLS 1.3 mit AES-256-Verschlüsselung (NIST FIPS 197), wodurch Traffic-Shaping für ISPs unzuverlässig wird. Solltest du dennoch Drosselung sehen – häufig in Spitzenzeiten auf stark ausgelasteten deutschen Anschlüssen – ist IPTV mit VPN in jedem Tarif vollständig unterstützt, ohne Geschwindigkeitslimit. Die meisten deutschen Haushalte erleben gar keine Drosselung."
    },
    {
      question: "Welche Streaming-Geräte funktionieren – Firestick 4K Max, Apple TV 4K, Smart TV?",
      answer: "Alle. Firestick 4K Max, Amazon Fire TV Cube, Apple TV 4K (3. Generation), Android TV 14 Boxen (Nvidia Shield, Onn 4K Pro, Chromecast mit Google TV), Samsung Tizen, LG webOS, MAG-Box, sowie iOS / iPadOS / Android-Smartphones und -Tablets, Windows / macOS / Linux PCs und jeder HTML5-Browser. Gleiche Senderbibliothek und EPG auf jedem Bildschirm via TiviMate, IPTV Smarters Pro oder OTT Navigator."
    },
    {
      question: "Wie viele gleichzeitige Streams kann mein Haushalt nutzen?",
      answer: "Tarife bieten bis zu 4 gleichzeitige Verbindungen – damit können der Wohnzimmer-TV, das Tablet im Kinderzimmer und ein Smartphone in der Küche unterschiedliche Sender gleichzeitig zeigen. Perfekt für ein Bundesliga-Wochenende mit dem Topspiel im Wohnzimmer und der Konferenz auf dem Tablet. Der 1-Monats-Tarif startet mit 1 Verbindung; der 12-Monats-Tarif enthält standardmäßig bis zu 4 Verbindungen ohne Aufpreis."
    },
    {
      question: "Gibt es einen kostenlosen Test – und einen Vertrag oder Kündigungsgebühren?",
      answer: "Kostenloser IPTV-Test ohne Kreditkarte, sofortige Aktivierung, voller Zugang zur 22.000-Sender-Bibliothek, volles 4K HDR. Teste, bevor du zahlst. Tarife laufen monatlich oder als vergünstigte Quartals-, 6- oder 12-Monats-Pakete. Keine automatische Vertragsverlängerung, keine versteckten Gebühren, keine Kündigungsstrafe. Jederzeit kündbar."
    },
    {
      question: "Wie schnell erhalte ich meine Zugangsdaten nach der Bestellung?",
      answer: "IPTV Sofortstart: Vom Checkout bis zum ersten Live-Sender vergehen typischerweise unter 5 Minuten. Zugangsdaten (M3U-URL + Xtream-Codes) werden automatisch per E-Mail verschickt, sobald die Zahlung eingeht. Die Einrichtung mit jedem kompatiblen Player dauert weitere 60 Sekunden – siehe die Schritt-für-Schritt-Einrichtungsanleitung für dein Gerät."
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
    <section id="faq" className="py-12 bg-[#001f3f] relative overflow-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">
            IPTV Deutschland <span className="text-yellow-400">FAQ</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-700 to-yellow-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 font-medium">Klare Antworten für deutsche Cord-Cutter und Bundesliga-Fans.</p>
        </div>

        <div className="space-y-4">
          {germanyFaqData.map((item, index) => (
            <div
              key={index}
              className={`group rounded-2xl border transition-all duration-300 ${openIndex === index
                ? 'bg-[#002952] border-yellow-500/50 shadow-[0_0_30px_rgba(234,179,8,0.1)]'
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

        {/* Support CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#001a3a] to-[#001f3f] border border-yellow-500/20 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Brauchst du Hilfe beim Einrichten?</h3>
          <p className="text-gray-400 mb-6">Unser deutschsprachiges Support-Team ist rund um die Uhr für dich da.</p>
          <a
            href="mailto:support@orca4ktv.com"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#001a36] font-black rounded-full uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
          >
            <i className="fas fa-envelope text-red-700"></i> Kontakt
          </a>
        </div>
      </div>
    </section>
  );
};

export default GermanyFAQ;
