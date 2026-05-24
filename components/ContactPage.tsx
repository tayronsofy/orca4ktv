'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const ContactPage: React.FC = () => {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setStatus('error')
      setErrorMessage('Please fill in all fields.')
      return
    }

    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, message }),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setName('')
        setEmail('')
        setSubject('')
        setMessage('')
      } else {
        setStatus('error')
        setErrorMessage(data.message || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMessage('Failed to connect to the server. Please try again later.')
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center py-28 bg-gradient-to-br from-[#00050d] via-[#001a36] to-[#00050d] px-4 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#00E5FF]/10 blur-[150px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse-slow-reverse"></div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        <div className="inline-block px-5 py-2 mb-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-[#00E5FF] text-[10px] font-black uppercase tracking-[0.3em] animate-fade-in">
          <span className="mr-2 inline-block w-2 h-2 bg-[#00E5FF] rounded-full animate-pulse"></span>
          Help &amp; Inquiries
        </div>

        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[0.9] tracking-tighter text-white drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]">
          CONTACT <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00E5FF] via-white to-[#00E5FF] bg-[length:200%_auto] animate-shimmer">SUPPORT</span>
        </h1>

        <p className="text-lg text-gray-400 mb-12 font-medium max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
          Need help setting up your IPTV playlist, want a custom plan reseller quote, or have a pre-sales question? Reach out to our 24/7 technical team below.
        </p>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4 px-4 md:px-0">
        
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-1 space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Telegram Support Card */}
            <div className="bg-[#001f3f]/60 border border-white/5 rounded-3xl p-6 shadow-xl backdrop-blur-md flex items-start gap-4 hover:border-[#00E5FF]/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                <i className="fab fa-telegram-plane text-2xl text-sky-400"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Telegram Helpdesk</h3>
                <p className="text-gray-400 text-sm mb-3">Instant direct chat with our technical setup agents.</p>
                <a
                  href="https://t.me/Orca4ktv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-[#00E5FF] font-bold hover:underline gap-1.5"
                >
                  Ping @Orca4ktv <i className="fas fa-external-link-alt text-[10px]"></i>
                </a>
              </div>
            </div>

            {/* Email Support Card */}
            <div className="bg-[#001f3f]/60 border border-white/5 rounded-3xl p-6 shadow-xl backdrop-blur-md flex items-start gap-4 hover:border-[#00E5FF]/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center shrink-0">
                <i className="fas fa-envelope text-xl text-purple-400"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Email Support</h3>
                <p className="text-gray-400 text-sm mb-3">For billing inquiries, invoices, and complex setup issues.</p>
                <a
                  href="mailto:support@orca4ktv.com"
                  className="text-sm font-semibold text-purple-300 hover:text-white transition-colors break-all"
                >
                  support@orca4ktv.com
                </a>
              </div>
            </div>

            {/* Response Time Guarantee Card */}
            <div className="bg-[#001f3f]/60 border border-white/5 rounded-3xl p-6 shadow-xl backdrop-blur-md flex items-start gap-4 hover:border-[#00E5FF]/20 transition-all duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <i className="fas fa-clock text-xl text-emerald-400"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Response Guarantee</h3>
                <p className="text-gray-400 text-sm">
                  Our system is monitored 24/7/365. Email replies consistently arrive in <strong className="text-white">&lt; 5 minutes</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center justify-center gap-2 w-full py-4 bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10 rounded-2xl font-bold uppercase text-xs tracking-wider transition-all duration-300 mt-6 lg:mt-0"
          >
            <i className="fas fa-arrow-left text-[10px]"></i> Back to Home
          </button>
        </div>

        {/* Contact Form Container */}
        <div className="lg:col-span-2 bg-[#001f3f]/40 border border-white/5 rounded-3xl p-8 md:p-10 shadow-xl backdrop-blur-md">
          {status === 'success' ? (
            <div className="flex flex-col items-center justify-center py-10 space-y-5 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center animate-bounce">
                <i className="fas fa-check text-4xl text-emerald-400"></i>
              </div>
              <h2 className="text-3xl font-black text-white">Message Sent!</h2>
              <p className="text-gray-300 max-w-md leading-relaxed">
                Thank you for contacting us. Your message has been received by our technical support queue. We will reply to your email address within 5 minutes.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="mt-4 px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-bold uppercase tracking-wider text-white transition-all"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={status === 'submitting'}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/40 transition-all shadow-inner"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={status === 'submitting'}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/40 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  placeholder="e.g. Reseller Inquiry, Setup Issue, Billing"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/40 transition-all shadow-inner"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2 block">
                  How can we help you?
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={6}
                  placeholder="Describe your request in detail (include device type or subscription invoice number if relevant)..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === 'submitting'}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/40 transition-all shadow-inner resize-none"
                />
              </div>

              {status === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-center text-sm font-semibold">
                  <i className="fas fa-exclamation-circle mr-2"></i> {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-gradient-to-r from-[#003580] to-[#00E5FF] text-white py-4 rounded-xl font-black uppercase text-sm tracking-[0.2em] hover:scale-[1.01] active:scale-95 disabled:opacity-50 transition-all duration-300 shadow-lg shadow-[#00E5FF]/10 flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === 'submitting' ? (
                  <>
                    <i className="fas fa-spinner animate-spin"></i> Processing...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane text-xs"></i> Send Message
                  </>
                )}
              </button>
            </form>
          )}
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
  )
}

export default ContactPage
