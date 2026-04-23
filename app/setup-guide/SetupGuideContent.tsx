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
                    frameBorder="0"
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
        <section>
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

      </div>
    </div>
  )
}
