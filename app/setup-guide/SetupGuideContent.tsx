'use client'

import { useState } from 'react'
import Link from 'next/link'
import { generateSetupGuide } from '@/services/geminiService'

const VIDEOS = [
  { id: 'bfvl2d', title: 'General Overview',          tags: ['all'] },
  { id: '8vj1ve', title: 'Firestick & Android App',   tags: ['firestick', 'android'] },
  { id: 'jqeose', title: 'Apple Devices',             tags: ['apple'] },
  { id: '8htto1', title: 'Smarters Pro (Firestick)',  tags: ['firestick', 'smarters'] },
  { id: '0q9xy7', title: 'TiviMate',                  tags: ['firestick', 'tivimate'] },
  { id: 'cisceu', title: 'Formuler / My TV Online',   tags: ['formuler'] },
  { id: 'qyithd', title: 'AVOV TVOnline',             tags: ['avov', 'mag'] },
  { id: 'ddfc0y', title: 'Dreamlink DreamOnline',     tags: ['dreamlink', 'mag'] },
  { id: 'ohzvro', title: 'BuzzTV',                    tags: ['buzztv'] },
  { id: 'quh8g8', title: 'Kodi Media Player',         tags: ['kodi', 'pc'] },
  { id: 'tunuhv', title: 'NVIDIA Shield',             tags: ['nvidia', 'android'] },
  { id: 'vhn3xa', title: 'Smart-STB',                 tags: ['smartstb'] },
]

const FILTERS = [
  { label: 'All',         tag: 'all' },
  { label: 'Firestick',   tag: 'firestick' },
  { label: 'Android',     tag: 'android' },
  { label: 'Apple',       tag: 'apple' },
  { label: 'MAG / AVOV',  tag: 'mag' },
  { label: 'PC / Kodi',   tag: 'pc' },
  { label: 'Other',       tag: 'other' },
]

const OTHER_TAGS = ['buzztv', 'formuler', 'smartstb', 'nvidia', 'dreamlink', 'tivimate', 'smarters', 'avov']

const FAQ_ITEMS = [
  {
    q: 'How do I set up IPTV on a Firestick?',
    a: 'To set up IPTV on a Firestick, first enable "Apps from Unknown Sources" in your Firestick settings. Then install the Downloader app from the Amazon store and use it to sideload TiviMate or IPTV Smarters Pro. Open the app, select "Add Playlist", choose "Xtream Codes" or "M3U URL", and enter your username, password, and server URL (host) from your Smart 4K dashboard. Watch our Firestick tutorial video above for full step-by-step instructions.',
  },
  {
    q: 'What is the best IPTV app for Android?',
    a: 'TiviMate is widely considered the best IPTV app for Android and Firestick — it offers a polished TV-guide interface, multi-stream support, catch-up, and recording. IPTV Smarters Pro is another excellent choice, especially for beginners, as it supports both Xtream Codes and M3U playlists. GSE IPTV and XCIPTV are also popular options. All of these work perfectly with your Smart 4K subscription.',
  },
  {
    q: 'How do I add an M3U playlist to TiviMate?',
    a: 'Open TiviMate and tap "Add Playlist". Select "M3U playlist" and paste your M3U URL from your Smart 4K dashboard. TiviMate will automatically import all channels. For the EPG (TV guide), go to Settings → EPG Sources and add your EPG URL — also available in your dashboard. Refresh the EPG to populate the programme guide. You can then organise channels into favourites and groups.',
  },
  {
    q: 'What are Xtream Codes and how do I use them?',
    a: 'Xtream Codes is an IPTV login method that uses three pieces of information: a Server URL (host), a Username, and a Password. Instead of a long M3U link, you enter these three values separately in your app. Most apps like TiviMate, IPTV Smarters, Smart IPTV, and IBO Player support Xtream Codes. Your host, username, and password are provided in your Smart 4K credentials email and dashboard.',
  },
  {
    q: 'What internet speed do I need for 4K IPTV streaming?',
    a: 'For smooth 4K UHD IPTV streaming, we recommend a minimum of 25 Mbps download speed. For HD channels, 10 Mbps is sufficient. If multiple people are streaming simultaneously on separate devices, multiply accordingly. A stable wired (ethernet) connection is always preferable to Wi-Fi for the best experience. Avoid peak-hour congestion on shared connections.',
  },
  {
    q: 'How do I add an EPG (TV guide) URL to my IPTV app?',
    a: 'The EPG (Electronic Programme Guide) URL is listed on your credentials page in the Smart 4K dashboard. In TiviMate, go to Settings → EPG Sources → Add Source and paste the URL. In IPTV Smarters, it is entered during the playlist setup under "EPG URL". In Smart IPTV, paste it in the EPG URL field on the web portal at siptv.app. After saving, force-refresh the EPG to load the programme schedule.',
  },
  {
    q: 'Can I use my IPTV subscription on multiple devices at the same time?',
    a: 'Yes — the number of simultaneous streams depends on the plan you chose. A 1-connection plan allows streaming on one device at a time. A 2-connection plan allows two devices simultaneously, and so on up to 4 connections. You can install the app on as many devices as you like and use them interchangeably, as long as the number of concurrent streams does not exceed your plan limit.',
  },
  {
    q: 'How do I set up IPTV on a Samsung or LG Smart TV?',
    a: 'On Samsung Smart TVs, install Smart IPTV (SIPTV) from the Samsung App Store, then register your TV\'s MAC address at siptv.app and upload your M3U URL or Xtream Codes there. On LG TVs, use the SmartIPTV app from the LG Content Store in the same way. Formuler devices running Android also work natively. Alternatively, cast from an Android phone or use a Firestick plugged into your TV\'s HDMI port.',
  },
  {
    q: 'Why are my IPTV channels not loading or showing a black screen?',
    a: 'A black screen or channels failing to load is usually caused by one of three things: incorrect credentials (double-check your username and password for extra spaces or wrong case), an expired subscription (check your dashboard status), or a temporary server issue. Try deleting and re-adding your playlist. Make sure your M3U URL contains &output=ts at the end for best compatibility. If the issue persists, contact our support team.',
  },
  {
    q: 'How do I update or refresh my IPTV channel list?',
    a: 'In TiviMate, go to Playlists → select your playlist → Update. In IPTV Smarters, pull down to refresh or go to Settings and re-sync. In Smart IPTV, re-upload your M3U URL at siptv.app. If you have recently renewed or upgraded your subscription, your credentials remain the same — simply refresh the playlist to get any newly added channels.',
  },
]

const QUICK_FIXES = [
  {
    title: 'Buffering / Lagging',
    icon: 'fas fa-wifi',
    color: 'text-red-400',
    body: 'Lower the stream quality in your app settings. In your M3U URL, make sure it ends with &output=ts (not m3u8). Restart your app and router. If using Wi-Fi, try connecting via ethernet cable.',
  },
  {
    title: 'Login Failed',
    icon: 'fas fa-lock',
    color: 'text-yellow-400',
    body: 'Check your username and password from your dashboard — they are case-sensitive. Make sure there are no extra spaces. If copying, type them manually instead.',
  },
  {
    title: 'EPG (Guide) Not Loading',
    icon: 'fas fa-calendar-alt',
    color: 'text-blue-400',
    body: 'Go to your dashboard → Credentials page and copy the EPG URL. In your app, look for "EPG URL" or "XMLTV URL" and paste it there. Then force-refresh or re-sync the guide.',
  },
  {
    title: 'Channels Not Loading',
    icon: 'fas fa-tv',
    color: 'text-purple-400',
    body: 'Delete and re-add your playlist using the M3U URL from your dashboard. Check your subscription status is "Active" in the dashboard. If expired, renew your plan from the shop.',
  },
]

type WizardMode = 'setup' | 'fix'

export default function SetupGuideContent() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [openFix, setOpenFix] = useState<number | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  // AI Wizard state
  const [wizardStep, setWizardStep] = useState(0)
  const [wizardMode, setWizardMode] = useState<WizardMode | null>(null)
  const [wizardDevice, setWizardDevice] = useState('')
  const [wizardGuide, setWizardGuide] = useState<string | null>(null)
  const [wizardLoading, setWizardLoading] = useState(false)

  const filteredVideos = activeFilter === 'all'
    ? VIDEOS
    : activeFilter === 'other'
    ? VIDEOS.filter(v => v.tags.some(t => OTHER_TAGS.includes(t)) && !v.tags.includes('all'))
    : VIDEOS.filter(v => v.tags.includes(activeFilter))

  const handleModeSelect = (mode: WizardMode) => {
    setWizardMode(mode)
    setWizardStep(1)
  }

  const handleDeviceSelect = (device: string) => {
    setWizardDevice(device)
    setWizardStep(2)
  }

  const handleFinalSelection = async (selection: string) => {
    setWizardLoading(true)
    setWizardStep(3)
    const result = await generateSetupGuide(wizardDevice, selection, wizardMode || 'setup')
    setWizardGuide(result)
    setWizardLoading(false)
  }

  const resetWizard = () => {
    setWizardStep(0)
    setWizardMode(null)
    setWizardDevice('')
    setWizardGuide(null)
    setWizardLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#1f2326]">
      {/* Hero */}
      <div className="relative bg-gradient-to-b from-[#020204] via-[#1a1d20] to-[#1f2326] overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#a855f7]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-10 right-1/4 w-80 h-80 bg-[#6d28d9]/10 rounded-full blur-[150px] pointer-events-none" />
        <div style={{ paddingTop: '120px' }} className="relative max-w-5xl mx-auto px-4 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-1.5 text-purple-300 text-xs font-semibold uppercase tracking-widest mb-6">
            <i className="fas fa-robot"></i> AI-Powered Support
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
            IPTV Setup Guide
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Video tutorials for every device + AI troubleshooter. Get streaming in minutes.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* SEO intro + How it works */}
        <section className="mb-20 pt-10">
          <div className="max-w-3xl mx-auto text-center mb-14">
            <p className="text-gray-400 leading-relaxed text-base">
              Whether you&apos;re installing IPTV on a <strong className="text-white">Firestick</strong>, <strong className="text-white">Android box</strong>, <strong className="text-white">iPhone</strong>, <strong className="text-white">Samsung or LG Smart TV</strong>, <strong className="text-white">MAG box</strong>, or <strong className="text-white">PC</strong> — this guide has everything you need. Our step-by-step video tutorials cover every major app: <strong className="text-white">TiviMate</strong>, <strong className="text-white">IPTV Smarters Pro</strong>, <strong className="text-white">Smart IPTV</strong>, <strong className="text-white">Formuler</strong>, <strong className="text-white">Kodi</strong>, and more. Use the AI assistant below for a personalised setup guide or to fix any issue instantly.
            </p>
          </div>

          <h2 className="text-2xl font-black text-white text-center mb-10">
            How to Set Up IPTV in <span className="text-purple-400">4 Easy Steps</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              {
                step: '01',
                icon: 'fas fa-key',
                title: 'Get Your Credentials',
                desc: 'After subscribing, your username, password, M3U URL and EPG URL are sent by email and available in your dashboard.',
              },
              {
                step: '02',
                icon: 'fas fa-mobile-alt',
                title: 'Choose Your Device & App',
                desc: 'Pick your device (Firestick, Smart TV, Android, Apple, etc.) and install a compatible IPTV app such as TiviMate or IPTV Smarters.',
              },
              {
                step: '03',
                icon: 'fas fa-play-circle',
                title: 'Follow the Tutorial',
                desc: 'Watch the matching video tutorial below or let our AI generate step-by-step instructions tailored to your exact device and app.',
              },
              {
                step: '04',
                icon: 'fas fa-check-circle',
                title: 'Enter Details & Stream',
                desc: 'Enter your Xtream Codes or M3U URL into the app. Add your EPG URL for a full TV guide. You\'re ready — enjoy 22,000+ channels in 4K.',
              },
            ].map(s => (
              <div key={s.step} className="bg-[#2c3034] rounded-2xl p-6 border border-white/5 relative">
                <span className="absolute top-4 right-5 text-4xl font-black text-white/5">{s.step}</span>
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 flex items-center justify-center mb-4">
                  <i className={`${s.icon} text-purple-400`}></i>
                </div>
                <h3 className="text-white font-bold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Video Tutorials */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <i className="fas fa-play-circle text-purple-400 text-xl"></i>
            <h2 className="text-2xl font-black text-white">Video Tutorials</h2>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-2 mb-8">
            {FILTERS.map(f => (
              <button
                key={f.tag}
                onClick={() => setActiveFilter(f.tag)}
                className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                  activeFilter === f.tag
                    ? 'bg-purple-600 text-white border-purple-500'
                    : 'bg-[#2c3034] text-gray-400 border-white/5 hover:text-white hover:border-purple-500/30'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Video grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVideos.map(video => (
              <div key={video.id} className="bg-[#2c3034] rounded-2xl overflow-hidden border border-white/5">
                <div className="aspect-video w-full">
                  <iframe
                    src={`https://streamable.com/e/${video.id}`}
                    className="w-full h-full"
                    style={{ border: 'none' }}
                    allowFullScreen
                    allow="autoplay; fullscreen"
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-white font-semibold text-sm">{video.title}</p>
                </div>
              </div>
            ))}
          </div>

          {filteredVideos.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <i className="fas fa-video-slash text-3xl mb-3 block"></i>
              No videos for this filter yet.
            </div>
          )}
        </section>

        {/* AI Setup Wizard */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <i className="fas fa-robot text-purple-400 text-xl"></i>
            <h2 className="text-2xl font-black text-white">AI Setup Assistant</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Wizard card */}
            <div className="bg-[#2c3034] rounded-2xl border border-white/5 overflow-hidden">
              <div className="bg-[#1f2326] px-5 py-4 border-b border-white/5 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <i className="fas fa-robot text-purple-400 text-sm"></i>
                </div>
                <div>
                  <p className="text-white font-bold text-sm">AI Support</p>
                  <p className="text-gray-500 text-xs">Instant setup & troubleshooting</p>
                </div>
                {wizardStep > 0 && (
                  <button
                    onClick={resetWizard}
                    className="ml-auto text-xs text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    ← Start over
                  </button>
                )}
              </div>

              <div className="p-6 min-h-[280px] flex flex-col justify-center">

                {wizardStep === 0 && (
                  <div className="space-y-3">
                    <p className="text-white font-semibold mb-4">How can I help you today?</p>
                    <button
                      onClick={() => handleModeSelect('setup')}
                      className="w-full p-5 bg-purple-600/10 border border-purple-500/40 hover:bg-purple-600 hover:border-purple-500 rounded-xl text-left transition-all group flex items-center gap-4"
                    >
                      <span className="text-2xl">🚀</span>
                      <div>
                        <div className="font-bold text-white">Install on a New Device</div>
                        <div className="text-sm text-gray-400 group-hover:text-purple-100">Get step-by-step setup instructions</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleModeSelect('fix')}
                      className="w-full p-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-left transition-all group flex items-center gap-4"
                    >
                      <span className="text-2xl">🔧</span>
                      <div>
                        <div className="font-bold text-white">Fix an Issue</div>
                        <div className="text-sm text-gray-400">Buffering, login errors, black screen</div>
                      </div>
                    </button>
                  </div>
                )}

                {wizardStep === 1 && (
                  <div>
                    <p className="text-white font-semibold mb-5">Select your device:</p>
                    <div className="grid grid-cols-2 gap-3">
                      {['Samsung / LG TV', 'Firestick / Android', 'iPhone / iPad', 'Windows / Mac'].map(d => (
                        <button
                          key={d}
                          onClick={() => handleDeviceSelect(d)}
                          className="p-4 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500 rounded-xl text-sm font-medium text-gray-200 hover:text-white transition-all text-left"
                        >
                          {d}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {wizardStep === 2 && wizardMode === 'setup' && (
                  <div>
                    <p className="text-white font-semibold mb-1">Which app would you like?</p>
                    <p className="text-gray-400 text-sm mb-5">I&apos;ll give you exact steps for your device.</p>
                    <div className="space-y-2">
                      <button onClick={() => handleFinalSelection('Best App')} className="w-full p-4 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-bold text-left transition-colors">
                        ✨ Recommend the best app for me
                      </button>
                      {['TiviMate', 'IPTV Smarters Pro', 'Smart IPTV', 'IBO Player', 'GSE IPTV'].map(app => (
                        <button key={app} onClick={() => handleFinalSelection(app)} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 hover:text-white text-left transition-colors text-sm">
                          {app}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {wizardStep === 2 && wizardMode === 'fix' && (
                  <div>
                    <p className="text-white font-semibold mb-5">What&apos;s the issue?</p>
                    <div className="space-y-2">
                      {[
                        { label: '⚠️ Buffering / Lagging', value: 'Buffering or Freezing' },
                        { label: '🚫 Login Failed',         value: 'Login Failed Error' },
                        { label: '📺 Black Screen',         value: 'Black Screen No Audio' },
                        { label: '📂 Playlist Empty',       value: 'Playlist Empty' },
                        { label: '📡 EPG Not Loading',      value: 'EPG Not Loading' },
                      ].map(issue => (
                        <button key={issue.value} onClick={() => handleFinalSelection(issue.value)} className="w-full p-4 bg-white/5 hover:bg-red-500/10 border border-white/5 hover:border-red-500/30 rounded-xl text-gray-200 hover:text-white text-left transition-all text-sm">
                          {issue.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {wizardStep === 3 && (
                  <div>
                    {wizardLoading ? (
                      <div className="text-center py-8">
                        <div className="text-4xl mb-4 animate-bounce">🤖</div>
                        <p className="text-white font-bold">AI is generating your guide…</p>
                        <p className="text-gray-400 text-sm mt-1">Analyzing {wizardDevice}…</p>
                      </div>
                    ) : (
                      <div>
                        <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4 mb-4 max-h-72 overflow-y-auto">
                          <p className="text-gray-200 whitespace-pre-line leading-relaxed text-sm">{wizardGuide}</p>
                        </div>
                        <button
                          onClick={resetWizard}
                          className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors text-sm"
                        >
                          Ask another question
                        </button>
                      </div>
                    )}
                  </div>
                )}

              </div>
            </div>

            {/* Right side info */}
            <div className="space-y-5">
              <div className="bg-[#2c3034] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <i className="fas fa-bolt text-yellow-400"></i>
                  <h3 className="text-white font-bold">Instant AI Help</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Our AI assistant knows every app, every device, and every common issue. Select your device and get a personalized guide in seconds — no waiting, no support tickets.
                </p>
              </div>
              <div className="bg-[#2c3034] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <i className="fas fa-key text-purple-400"></i>
                  <h3 className="text-white font-bold">Need Your Credentials?</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Your username, password, M3U URL and EPG URL are all available in your dashboard.
                </p>
                <Link
                  href="/dashboard/subscription"
                  className="inline-flex items-center gap-2 text-sm text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                >
                  View my credentials <i className="fas fa-arrow-right text-xs"></i>
                </Link>
              </div>
              <div className="bg-[#2c3034] rounded-2xl p-6 border border-white/5">
                <div className="flex items-center gap-3 mb-3">
                  <i className="fas fa-headset text-blue-400"></i>
                  <h3 className="text-white font-bold">Still Need Help?</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">
                  Our support team is available 24/7. Reply to any of our emails or contact us directly.
                </p>
                <a
                  href="mailto:support@smart4k.io"
                  className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  <i className="fas fa-envelope text-xs"></i> support@smart4k.io
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Fixes */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-6">
            <i className="fas fa-wrench text-purple-400 text-xl"></i>
            <h2 className="text-2xl font-black text-white">Quick Fixes</h2>
          </div>

          <div className="space-y-3">
            {QUICK_FIXES.map((fix, i) => (
              <div key={i} className="bg-[#2c3034] rounded-2xl border border-white/5 overflow-hidden">
                <button
                  onClick={() => setOpenFix(openFix === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <i className={`${fix.icon} ${fix.color}`}></i>
                    <span className="text-white font-semibold">{fix.title}</span>
                  </div>
                  <i className={`fas fa-chevron-down text-gray-500 text-sm transition-transform duration-200 ${openFix === i ? 'rotate-180' : ''}`}></i>
                </button>
                {openFix === i && (
                  <div className="px-6 pb-5">
                    <p className="text-gray-400 text-sm leading-relaxed">{fix.body}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQ_ITEMS.map(f => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            }) }}
          />

          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white mb-3">
              IPTV Setup <span className="text-purple-400">FAQ</span>
            </h2>
            <p className="text-gray-400">Common questions about installing and configuring IPTV.</p>
          </div>

          <div className="space-y-3 max-w-4xl mx-auto">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-200 ${openFaq === i ? 'bg-[#2c3034] border-purple-500/40' : 'bg-[#2c3034]/60 border-white/5 hover:border-white/10'}`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                >
                  <span className={`font-bold transition-colors ${openFaq === i ? 'text-white' : 'text-gray-300'}`}>{item.q}</span>
                  <i className={`fas fa-chevron-down flex-shrink-0 ml-4 text-sm transition-transform duration-200 ${openFaq === i ? 'rotate-180 text-purple-400' : 'text-gray-500'}`}></i>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 border-t border-white/5 pt-3">
                    <p className="text-gray-400 leading-relaxed text-sm">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
