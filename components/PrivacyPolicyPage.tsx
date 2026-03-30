'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'


import React from 'react';
import SEO from './SEO';

interface PrivacyPolicyPageProps {
  onBackToHome?: () => void;
   // Added to link to Terms & Conditions from this page
}

const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBackToHome }) => {
  const router = useRouter()
  const handleBack = onBackToHome || (() => router.push('/'))
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 bg-gradient-to-br from-[#020204] via-[#1a1d20] to-[#020204] px-4 overflow-hidden">
      <SEO
        title="Privacy Policy - SMART 4K"
        description="Read our Privacy Policy to understand how we collect, use, and protect your personal information at SMART 4K."
        keywords="privacy policy, data protection, gdpr, user privacy"
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
          Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] via-white to-[#a855f7] bg-[length:200%_auto] animate-shimmer">Policy</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-12 font-medium max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
          Last updated: June 2025
        </p>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 space-y-12 px-4 md:px-0 text-gray-300 text-lg">
        <div className="bg-[#1f2326]/60 border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-md space-y-6">
          <p>
            At <strong>SMART 4K</strong>, accessible from <a href="https://smart4k.io" className="text-[#a855f7] hover:underline">smart4k.io</a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by SMART 4K and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
          </p>
          <p>
            This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in IpTv. This policy is not applicable to any information collected offline or via channels other than this website.
          </p>

          <h2 className="text-3xl font-black text-white mb-6">Consent</h2>
          <p>
            By using our website, you hereby consent to our Privacy Policy and agree to its terms. For our Terms and Conditions, please visit the <a href="/terms" className="text-[#a855f7] hover:underline">Terms &amp; Conditions</a> page.
          </p>

          <h2 className="text-3xl font-black text-white mb-6">Information we collect</h2>
          <p>
            The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
          </p>
          <p>
            If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
          </p>
          <p>
            When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
          </p>

          <h2 className="text-3xl font-black text-white mb-6">How we use your information</h2>
          <p>We use the information we collect in various ways, including to:</p>
          <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-400">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className="text-3xl font-black text-white mb-6">Log Files</h2>
          <p>
            SMART 4K follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services’ analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users’ movement on the website, and gathering demographic information.
          </p>

          <h2 className="text-3xl font-black text-white mb-6">Cookies and Web Beacons</h2>
          <p>
            Like any other website, SMART 4K uses ‘cookies’. These cookies are used to store information including visitors’ preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users’ experience by customizing our web page content based on visitors’ browser type and/or other information.
          </p>
          <p>
            For more general information on cookies, please read <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="text-[#a855f7] hover:underline">“What Are Cookies”</a>.
          </p>

          <h2 className="text-3xl font-black text-white mb-6">Advertising Partners Privacy Policies</h2>
          <p>
            You may consult this list to find the Privacy Policy for each of the advertising partners of SMART 4K.
          </p>
          <p>
            Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on IpTv, which are sent directly to users’ browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.
          </p>
          <p>
            Note that SMART 4K has no access to or control over these cookies that are used by third-party advertisers.
          </p>

          <h2 className="text-3xl font-black text-white mb-6">Third Party Privacy Policies</h2>
          <p>
            SMART 4K's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
          <p>
            You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers’ respective websites.
          </p>

          <h2 className="text-3xl font-black text-white mb-6">CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p>Under the CCPA, among other rights, California consumers have the right to:</p>
          <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-400">
            <li>Request that a business that collects a consumer’s personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer’s personal data, not sell the consumer’s personal data.</li>
          </ul>
          <p>
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
          </p>

          <h2 className="text-3xl font-black text-white mb-6">GDPR Data Protection Rights</h2>
          <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
          <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-400">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</li>
            <li><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
          </ul>
          <p>
            If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.
          </p>

          <h2 className="text-3xl font-black text-white mb-6">Children’s Information</h2>
          <p>
            Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
          </p>
          <p>
            SMART 4K does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
          </p>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-16">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#6d28d9] to-[#a855f7] text-white font-black rounded-full uppercase text-sm tracking-[0.2em] hover:scale-105 transition-all shadow-xl"
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

export default PrivacyPolicyPage;
