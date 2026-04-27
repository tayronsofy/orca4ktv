'use client'

import { useRouter } from 'next/navigation'


import React from 'react';
import SEO from './SEO';

interface TermsOfServicePageProps {
  onBackToHome?: () => void;
}

const TermsOfServicePage: React.FC<TermsOfServicePageProps> = ({ onBackToHome }) => {
  const router = useRouter()
  const handleBack = onBackToHome || (() => router.push('/'))
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 bg-gradient-to-br from-[#00050d] via-[#001a36] to-[#00050d] px-4 overflow-hidden">
      <SEO
        title="Terms and Conditions - ORCA 4K TV"
        description="Review our Terms and Conditions regarding your use of ORCA 4K TV services, subscription policies, and usage guidelines."
        keywords="terms of service, iptv terms, smart 4k conditions, usage policy"
      />
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00E5FF]/10 blur-[150px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow-reverse"></div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        <div className="inline-block px-5 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#00E5FF] text-[10px] font-black uppercase tracking-[0.3em] animate-fade-in">
          <span className="mr-2 inline-block w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse"></span>
          Legal & Compliance
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[0.9] tracking-tighter text-white drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
          Terms And <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#00E5FF] bg-[length:200%_auto] animate-shimmer">Conditions</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-12 font-medium max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
          Last updated: June 2025
        </p>
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto mt-16 space-y-8 px-4 md:px-0 text-gray-300 text-lg">
        <div className="bg-[#001f3f]/60 border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-md space-y-6">
          <p>
            ORCA 4K TV provides an online video streaming service which allows clients to browse distinctive offerings of live and on-demand programs. Consequently, by accessing or using any of the ORCA 4K TV services, you acknowledge and consent to these terms:
          </p>

          <h2 className="text-2xl font-bold text-white">Changes to the Terms and Conditions</h2>
          <p>
            We may, at any time, and at our sole discretion, adjust these Terms and Conditions of Use, including our Privacy Policy, with or without notice to the Client. Any such alteration will be effective instantly upon open posting. Your continued use of our Service and this Site following any such alteration constitutes your acknowledgment of these adjusted Terms.
          </p>

          <h2 className="text-2xl font-bold text-white">Minimum age requirement</h2>
          <p>
            In order to become a member and utilize the ORCA 4K TV services, you must be 18 years old or older.
          </p>

          <h2 className="text-2xl font-bold text-white">Usage and service terms</h2>
          <p>
            You may not either directly or through the use of any device, software, internet site, web-based service, or other means, re-stream, distribute, broadcast or transmit the content.
          </p>

          <h2 className="text-2xl font-bold text-white">Third party purchases</h2>
          <p>
            Your transactions and other dealings with third-party vendors that are found on or through the service, including “click to purchase”, and other comparable programs, are solely between you and such dealer.
          </p>

          <h2 className="text-2xl font-bold text-white">Quality of streams</h2>
          <p>
            A perfect viewing experience relies upon your network access and device capabilities. The elements will be based on your location, internet capacity, the quantity of devices connected to the same network, the content you have chosen, and the configuration of the device you are using. Subsequently, ORCA 4K TV can’t make any guarantees about the content in these regards. Please note sharing a subscription will result in permanent suspension or device ban.
          </p>

          <h2 className="text-2xl font-bold text-white">Used balance</h2>
          <p>
            Please note that all the subscriptions made and credits used are final and non-refundable under any circumstances.
          </p>

          <h2 className="text-2xl font-bold text-white">Unsupported regions</h2>
          <p>
            Our services are unavailable in the following countries: √ Iran
          </p>

          <h2 className="text-2xl font-bold text-white">Accuracy of information</h2>
          <p>
            All the data you submit to our database must be accurate and updated. Please keep your passwords safe. You won’t need to uncover it to any ORCA 4K TV agents. You are responsible for all utilization of your account.
          </p>

          <h2 className="text-2xl font-bold text-white">Compatibility</h2>
          <p>
            In order to access the services, you must use devices that meet the system and compatibility prerequisites that we establish in our Help center.
          </p>

          <h2 className="text-2xl font-bold text-white">Internet service and data usage</h2>
          <p>
            You are in charge of any expenses related to your network access used to get to our services.
          </p>

          <h2 className="text-2xl font-bold text-white">Sharing a subscription</h2>
          <p>
            Sharing a subscription is not permitted. You can only have one active stream open at any given time. However, by purchasing extra connections, you can watch on multiple devices at the same time.
          </p>

          <h2 className="text-2xl font-bold text-white">Purchase details</h2>
          <p>
            In order to make a purchase, you will need to follow the ordering procedures described via the service. Pricing details for products and the procedures for payment and delivery are displayed via the service, and are subject to change without notice.
          </p>

          <h2 className="text-2xl font-bold text-white">Suspension and downtime</h2>
          <p>
            In extension of our rights to end or suspend your access delineated above, you acknowledge that: your access and usage of the services might be suspended for the length of any sudden or unscheduled downtime or unavailability of any portion or all of the services for any reason. All correspondences and notice to be made or offered in understanding with this Agreement ought to be in the English language. We maintain all authority to instantly end or limit your use of the services or access to content at any time, without notice or liability, if ORCA 4K TV determines in its sole discretion that you have breached these Terms, disregarded any law, rule, or regulation. The ORCA 4K TV logo, and other ORCA 4K TV marks, graphics, scripts, are trademarks of ORCA 4K TV. None of the ORCA 4K TV trademarks may be copied, downloaded, or otherwise exploited.
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-16">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#003580] to-[#00E5FF] text-white font-black rounded-full uppercase text-sm tracking-[0.2em] hover:scale-105 transition-all shadow-xl"
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

export default TermsOfServicePage;
