
'use client'

import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqData: FAQItem[] = [
    {
      question: "Which Devices Are Compatible With ORCA 4K TV?",
      answer: "Our infrastructure is engineered for cross-platform versatility. You can reliably stream on Smart TVs, Android boxes, Apple iOS devices, Firesticks, Nvidia Shields, Windows laptops, and dedicated STB boxes like Mag or Formuler. There are virtually zero restrictions on how and where you can tune in."
    },
    {
      question: "Do I Need an Existing Satellite or Cable Provider?",
      answer: "No cable subscription is necessary. All you need is a stable internet connection and a compatible streaming device or app. Once connected, our digital broadcast replaces the need for any traditional satellite dish or restrictive cable packages."
    },
    {
      question: "How Many Simultaneous Streams Do I Get?",
      answer: "Your viewing freedom is determined by the tier you select. We provide flexible packages accommodating anywhere from 1 to 4 simultaneous connections per household, allowing everyone to watch their favorite shows on their own screens simultaneously."
    },
    {
      question: "What Are the Minimum Internet Requirements?",
      answer: "We strongly recommend a broadband connection (Fiber, Cable, or 5G) capable of sustaining at least 25 Mbps download speeds for true 4K streaming. While lower speeds will still function with our HD channels, maintaining a reliable, unthrottled connection ensures the best buffer-free experience."
    },
    {
      question: "What Should I Do If My Stream Freezes?",
      answer: "If you encounter any broadcast irregularities, our technical team is fully staffed 24/7. Simply ping our Telegram support channel or submit a ticket through the contact portal with your invoice details. We consistently monitor our CDN paths to rapidly resolve routing issues or assist with personal hardware setups."
    },
    {
      question: "How Fast Is Account Activation?",
      answer: "Because our provisioning process is fully automated, new subscriptions are generally authenticated and activated immediately upon successful payment verification. During periods of extremely high volume, please allow up to 4 hours for the final credentials to arrive."
    },
    {
      question: "Am I Locked Into an Automatic Renewal Contract?",
      answer: "Absolutely not. We firmly believe in earning your business every single month. All transactions are handled strictly on a prepay basis with zero automatic rebilling or hidden subscription traps. When your current cycle concludes, you choose exactly when to renew."
    }
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
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

      {/* Decorative Blur Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00E5FF]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black text-white mb-4 uppercase tracking-tight">
            Frequently Asked <span className="text-[#00E5FF]">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#003580] to-[#00E5FF] mx-auto rounded-full"></div>
          <p className="mt-6 text-gray-400 font-medium">Everything you need to know about our premium IPTV service.</p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className={`group rounded-2xl border transition-all duration-300 ${openIndex === index
                  ? 'bg-[#002952] border-[#00E5FF]/50 shadow-[0_0_30px_rgba(168,85,247,0.1)]'
                  : 'bg-[#002952]/40 border-white/5 hover:border-white/10'
                }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className={`text-lg font-bold transition-colors ${openIndex === index ? 'text-white' : 'text-gray-300 group-hover:text-white'}`}>
                  {item.question}
                </span>
                <span className={`flex-shrink-0 ml-4 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                  <i className={`fas fa-chevron-down ${openIndex === index ? 'text-[#00E5FF]' : 'text-gray-500'}`}></i>
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-0 text-gray-400 leading-relaxed font-medium text-base border-t border-white/5 mt-2">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Support CTA */}
        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-[#001737] to-[#000d1f] border border-[#002952]/30 text-center">
          <h3 className="text-xl font-bold text-white mb-2">Still have questions?</h3>
          <p className="text-gray-400 mb-6">Our support team is available 24/7 to help you with any technical or billing inquiries.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/setup-guide"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-black rounded-full uppercase text-xs tracking-[0.2em] hover:opacity-90 transition-all transform hover:scale-105"
            >
              <i className="fas fa-play-circle"></i> Setup Guide & Tutorials
            </a>
            <a
              href="mailto:support@orca4ktv.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#001a36] font-black rounded-full uppercase text-xs tracking-[0.2em] hover:bg-gray-200 transition-all transform hover:scale-105"
            >
              <i className="fas fa-envelope"></i> Contact Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
