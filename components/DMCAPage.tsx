'use client'

import { useRouter } from 'next/navigation'


import React from 'react';
import SEO from './SEO';

interface DMCAPageProps {
  onBackToHome?: () => void;
}

const DMCAPage: React.FC<DMCAPageProps> = ({ onBackToHome }) => {
  const router = useRouter()
  const handleBack = onBackToHome || (() => router.push('/'))
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-24 bg-gradient-to-br from-[#00050d] via-[#001a36] to-[#00050d] px-4 overflow-hidden">
      <SEO
        title="DMCA & Copyright Policy - ORCA 4K TV"
        description="Our commitment to respecting intellectual property rights. Read our DMCA policy and how to submit a copyright notice."
        keywords="dmca policy, copyright compliance, iptv legal, copyright notice"
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
          DMCA & <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#00E5FF] bg-[length:200%_auto] animate-shimmer">Copyright Policy</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 mb-12 font-medium max-w-3xl mx-auto drop-shadow-lg leading-relaxed">
          Last updated: June 2025
        </p>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 space-y-12 px-4 md:px-0 text-gray-300 text-lg">
        <p>
          At <strong>ORCA 4K TV (<a href="https://orca4ktv.com" className="text-[#00E5FF] hover:underline">https://orca4ktv.com</a>)</strong>, we are fully committed to respecting and upholding the rights of copyright holders and to complying with applicable intellectual property laws — including the United States Digital Millennium Copyright Act (DMCA) and equivalent regulations in other jurisdictions.
        </p>
        <p>
          We recognize the serious implications of copyright infringement within the IPTV and streaming industry and take all related reports and allegations very seriously.
        </p>

        {/* Section: No Hosting or Broadcasting Policy */}
        <div className="bg-[#001f3f]/60 border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-md">
          <h2 className="text-3xl font-black text-white mb-6">1. No Hosting or Broadcasting Policy</h2>
          <p className="mb-4">
            ORCA 4K TV is not a content host, broadcaster, or streaming service provider. We do not:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-400">
            <li>Host, store, or stream any copyrighted content on our servers;</li>
            <li>Operate or control any IPTV infrastructure;</li>
            <li>Transmit or distribute live or on-demand content.</li>
          </ul>
          <p>
            Our platform functions strictly as a reseller and informational portal, connecting users with IPTV subscriptions offered by independent third-party providers.
            All logos, trademarks, and media content mentioned or displayed on this website are the sole property of their respective owners.
          </p>
        </div>

        {/* Section: Educational and Commercial Nature */}
        <div className="bg-[#001f3f]/60 border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-md">
          <h2 className="text-3xl font-black text-white mb-6">2. Educational and Commercial Nature</h2>
          <p className="mb-4">
            All information on SMART4K.io is provided strictly for:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-400">
            <li><strong>🧠 Educational purposes</strong> (installation guides, device compatibility, technical setup);</li>
            <li><strong>🔍 General knowledge</strong> (user tutorials, performance tips, speed tests);</li>
            <li><strong>💼 Commercial transparency</strong> (pricing comparisons, reseller information).</li>
          </ul>
          <p>
            None of the content hosted on this website implies ownership, control, or distribution rights over copyrighted material. We do not advertise or promote direct access to copyrighted channels, streams, or programs.
          </p>
        </div>

        {/* Section: Third-Party Responsibility */}
        <div className="bg-[#001f3f]/60 border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-md">
          <h2 className="text-3xl font-black text-white mb-6">3. Third-Party Responsibility</h2>
          <p className="mb-4">
            Any IPTV services referenced or promoted through this website are operated and hosted by independent third-party providers.
          </p>
          <p className="mb-4">
            As resellers, ORCA 4K TV does not control, manage, or monitor the content broadcasted by these third parties and is not legally responsible for their streaming activities.
          </p>
          <p>
            Users are solely responsible for ensuring that their use of IPTV services complies with local laws and regulations.
          </p>
          <p>
            If a copyright holder has concerns about specific content being streamed by an upstream provider, they should contact the original provider directly to request removal or action.
          </p>
        </div>

        {/* Section: Notification of Claimed Infringement (DMCA Notices) */}
        <div className="bg-[#001f3f]/60 border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-md">
          <h2 className="text-3xl font-black text-white mb-6">4. Notification of Claimed Infringement (DMCA Notices)</h2>
          <p className="mb-4">
            If you are a copyright owner (or an authorized representative) and believe that any material accessible via iptvsmart.io infringes your rights, please send a formal DMCA notice containing the following information:
          </p>
          <ul className="list-disc list-inside space-y-2 mb-4 pl-4 text-gray-400">
            <li>Your full legal name and organization (if applicable);</li>
            <li>Contact details (valid email and phone number);</li>
            <li>Identification of the copyrighted work claimed to be infringed;</li>
            <li>The specific URL(s) of the allegedly infringing material;</li>
            <li>A good-faith statement that the reported use is not authorized by the copyright owner, its agent, or the law;</li>
            <li>A statement made under penalty of perjury that the information provided is accurate;</li>
            <li>Your physical or electronic signature.</li>
          </ul>
          <p className="mb-4">
            DMCA notices may be submitted to:
          </p>
          <p className="font-bold text-white">
            📧 Email: <a href="mailto:support@orca4ktv.com" className="text-[#00E5FF] hover:underline">support@orca4ktv.com</a>
          </p>
          <p className="mt-4">
            All valid notices will be reviewed promptly, and infringing content (if confirmed) will be removed or disabled in accordance with the DMCA.
          </p>
        </div>

        {/* Section: Counter-Notification Rights */}
        <div className="bg-[#001f3f]/60 border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-md">
          <h2 className="text-3xl font-black text-white mb-6">5. Counter-Notification Rights</h2>
          <p>
            If you believe that your content was removed or disabled in error, you may submit a counter-notification under the DMCA.
            Once a valid counter-notice is received, ORCA 4K TV may restore the content after 10–14 business days, unless the original complainant initiates legal action within that period.
          </p>
        </div>

        {/* Section: Jurisdiction and Legal Framework */}
        <div className="bg-[#001f3f]/60 border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-md">
          <h2 className="text-3xl font-black text-white mb-6">6. Jurisdiction and Legal Framework</h2>
          <p>
            This DMCA Policy is governed by the laws of the United States and applicable international copyright treaties.
          </p>
          <p>
            ORCA 4K TV reserves the right to cooperate with legitimate legal authorities and copyright holders in verified cases of infringement, while also reserving the right to challenge false or abusive DMCA claims filed in bad faith.
          </p>
        </div>

        {/* Section: Limitation of Liability */}
        <div className="bg-[#001f3f]/60 border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-md">
          <h2 className="text-3xl font-black text-white mb-6">7. Limitation of Liability</h2>
          <p>
            ORCA 4K TV shall not be held liable for any damages, legal claims, or third-party disputes related to the IPTV services advertised, reviewed, or discussed on this website.
          </p>
          <p>
            All users are responsible for understanding and complying with the laws of their jurisdiction before accessing or purchasing IPTV services.
          </p>
          <p className="mt-4">
            By using iptvsmart.io, you acknowledge and agree to this policy.
            For any questions or clarifications, please contact us at <a href="mailto:support@orca4ktv.com" className="text-[#00E5FF] hover:underline">support@orca4ktv.com</a>.
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

export default DMCAPage;
