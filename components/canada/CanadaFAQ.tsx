'use client'

import React, { useState } from 'react';

const CanadaFAQ: React.FC = () => {
  const [openIndex, setIndex] = useState<number | null>(0);

  const canadaFaqData = [
    {
      question: "Are Canadian Local Networks Included?",
      answer: "Yes, alongside our vast global library, your subscription includes access to major Canadian geographical locals (CBC, Global TV, Citytv) and premium sports networks (TSN, Sportsnet) across the nation, ensuring you never miss local news or your favorite team."
    },
    {
      question: "Will My ISP Throttle This Service in Canada?",
      answer: "We utilize advanced routing and secure handshakes that make it difficult for ISPs to throttle your streaming traffic. You get the full bandwidth you pay for, resulting in a pristine 4K picture."
    },
    {
      question: "Can I Share My Account With Family?",
      answer: "You are welcome to connect up to the number of devices allotted in your specific plan. Whether it's the living room TV or a tablet upstairs, as long as it's within your plan's stream limit, your household can watch simultaneously."
    },
    {
      question: "What Hardware Do I Need to Start Watching?",
      answer: "Virtually any modern device works. Just download a compatible streaming app on your Amazon Firestick, Apple TV, Android box, or Smart TV. No proprietary cable boxes or satellite dishes are ever required."
    },
    {
      question: "Is There a Contract or Cancellation Fee?",
      answer: "We offer complete flexibility on a month-to-month basis or via discounted prepaid longer terms. There are strictly no automatic recurring charges, hidden fees, or cancellation penalties. You maintain absolute control over your payments."
    },
    {
      question: "How Quickly Do I Get My Login Coordinates?",
      answer: "Once checkout is completed, our automated server provisions your dedicated Canadian slot immediately. Check your inbox (and spam folder) for the instant setup instructions so you can start streaming within minutes."
    },
    {
      question: "What Happens If I Experience Buffering During a Game?",
      answer: "While our Canada-based delivery network maintains 99.9% uptime, occasional internet routing drops can occur. Our Canadian support staff is on standby 24/7 via the helpdesk to optimize your connection routes immediately if you run into any hitches."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": canadaFaqData.map(item => ({
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

      <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">
            IPTV CANADA <span className="text-red-500">FAQ</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-white mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 font-medium">Clear answers for Canadian IPTV viewers.</p>
        </div>

        <div className="space-y-4">
          {canadaFaqData.map((item, index) => (
            <div
              key={index}
              className={`group rounded-2xl border transition-all duration-300 ${openIndex === index
                  ? 'bg-[#2c3034] border-red-500/50 shadow-[0_0_30px_rgba(239,68,68,0.1)]'
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
                  <i className={`fas fa-chevron-down ${openIndex === index ? 'text-red-500' : 'text-gray-500'}`}></i>
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
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#1e102f] to-[#0c162b] border border-red-500/20 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Need Canada-Based Setup Help?</h3>
          <p className="text-gray-400 mb-6">Our Canadian technical specialists are ready around the clock.</p>
          <a
            href="mailto:contact@smart4k.io"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#1a1d20] font-black rounded-full uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all transform hover:scale-105 shadow-xl"
          >
            <i className="fas fa-flag text-red-600"></i> Contact Us
          </a>
        </div>
      </div>
    </section>
  );
};

export default CanadaFAQ;
