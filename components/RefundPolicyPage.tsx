'use client'

import { useRouter } from 'next/navigation'


import React from 'react';
import SEO from './SEO';

interface RefundPolicyPageProps {
  onBackToHome?: () => void;
}

const RefundPolicyPage: React.FC<RefundPolicyPageProps> = ({ onBackToHome }) => {
  const router = useRouter()
  const handleBack = onBackToHome || (() => router.push('/'))
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 bg-gradient-to-br from-[#020204] via-[#1a1d20] to-[#020204] px-4 overflow-hidden">
      <SEO
        title="Refund Policy - SMART 4K"
        description="Understand our refund policy. We offer trials to ensure satisfaction before purchase. Learn about our 7-day refund window."
        keywords="refund policy, money back guarantee, iptv refund, subscription cancellation"
      />
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#a855f7]/10 blur-[150px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow-reverse"></div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        <div className="inline-block px-5 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#a855f7] text-[10px] font-black uppercase tracking-[0.3em] animate-fade-in">
          <span className="mr-2 inline-block w-2 h-2 bg-[#a855f7] rounded-full animate-pulse"></span>
          Legal & Compliance
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-white drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
          Refund <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-white to-[#a855f7] bg-[length:200%_auto] animate-shimmer">Policy</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-12 font-medium max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
          Last updated: June 2025
        </p>
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto mt-16 space-y-8 px-4 md:px-0 text-gray-300 text-lg">
        <div className="bg-[#1f2326]/60 border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-md">
          <p className="mb-4">
            By purchasing Services through this site, you are agreeing to these terms and entering into a contract with us.
          </p>
          <p className="mb-4 text-red-400 font-bold">
            We do NOT offer refunds on Digital Products/Services once activated and delivered. That is why you can ask us for a trial before you make a purchase.
          </p>
          <p className="mb-4">
            If you consider your situation to be a special circumstance then please fill the refund request and we shall consider your individual request. In the event that we do issue a refund, your access to the Service(s) will be revoked.
          </p>
          <p className="mb-4 text-sm text-gray-400">
            <strong>Note:</strong> We will refund completely only purchases which have been done in less than 7-days. All other refund requests (if the purchase was made more than 7 days before the refund request) will be returned partially according to the used period of the subscription. Our support team will contact users in all refund cases.
          </p>
          <p className="mb-4 text-sm text-gray-400">
            <strong>Note:</strong> Trials & accounts which has been used for more than a half of the account’s duration are not valid for refunding.
          </p>
          <p className="mb-4 text-sm text-gray-400">
            <strong>Note:</strong> Refund usually takes 5~7 working days to take place and it’s not in our hand to reduce this period. Our payment processors will take care of refund requests. We will refund any users immediately after seeing the request and checking user information.
          </p>
        </div>

        {/* Contact Us Button */}
        <div className="text-center mt-12">
          <a
            href="mailto:contact@smart4k.io"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#6d28d9] to-[#a855f7] text-white font-black rounded-full uppercase text-sm tracking-[0.2em] hover:scale-105 transition-all shadow-xl"
          >
            <i className="fas fa-envelope"></i> Contact Us
          </a>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#2c3034] text-white font-black rounded-full uppercase text-sm tracking-[0.2em] hover:bg-white/10 transition-all shadow-xl"
          >
            <i className="fas fa-arrow-left"></i> Back to Home
          </button>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 15s ease-in-out infinite;
        }

        .animate-pulse-slow-reverse {
          animation: pulse-slow 18s ease-in-out infinite reverse;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .animate-shimmer {
          animation: shimmer 6s linear infinite;
        }

        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </section>
  );
};

export default RefundPolicyPage;
