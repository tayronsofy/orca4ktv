'use client'

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { generateSetupGuide } from '../services/geminiService';

const SetupWizard: React.FC = () => {
  const pathname = usePathname();
  if (pathname?.startsWith('/dashboard')) return null;
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'setup' | 'fix' | null>(null);
  const [step, setStep] = useState(0);
  const [device, setDevice] = useState('');
  const [guide, setGuide] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleModeSelect = (selectedMode: 'setup' | 'fix') => {
    setMode(selectedMode);
    setStep(1);
  };

  const handleDeviceSelect = (selectedDevice: string) => {
    setDevice(selectedDevice);
    setStep(2);
  };

  const handleFinalSelection = async (selection: string) => {
    setLoading(true);
    setStep(3);
    const result = await generateSetupGuide(device, selection, mode || 'setup');
    setGuide(result);
    setLoading(false);
  };

  const resetWizard = () => {
    setIsOpen(false);
    setStep(0);
    setMode(null);
    setGuide(null);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-2xl font-bold flex items-center hover:scale-105 transition-all border border-white/20 px-4 py-3 gap-2 md:px-6 md:py-4 md:gap-3"
      >
        <span className="text-xl md:text-2xl">🛠️</span>
        <div className="text-left leading-tight">
          <div className="text-xs uppercase opacity-80">Need Help?</div>
          <div className="hidden md:block">Setup &amp; Support</div>
        </div>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-[#001a36] w-full max-w-sm md:max-w-lg rounded-2xl border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden relative">

        <div className="bg-[#000d20] p-4 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
              <i className="fas fa-robot"></i>
            </div>
            <div>
              <h3 className="font-bold text-white">AI Support Concierge</h3>
              <p className="text-xs text-gray-400">Instant Setup & Troubleshooting</p>
            </div>
          </div>
          <button onClick={resetWizard} className="text-gray-400 hover:text-white">✕</button>
        </div>

        <div className="p-8 min-h-[300px] flex flex-col justify-center">

          {step === 0 && (
            <div className="animate-fade-in space-y-4">
              <p className="text-xl text-white font-medium mb-4">Hello! How can I help you today?</p>
              <button onClick={() => handleModeSelect('setup')} className="w-full p-6 bg-purple-600/10 border border-purple-500/50 hover:bg-purple-600 hover:text-white rounded-xl text-left transition-all group flex items-center gap-4">
                <span className="text-3xl">🚀</span>
                <div>
                  <div className="font-bold text-white">Install New Device</div>
                  <div className="text-sm text-gray-400 group-hover:text-purple-100">Get a setup guide for TV, Phone, or PC</div>
                </div>
              </button>
              <button onClick={() => handleModeSelect('fix')} className="w-full p-6 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl text-left transition-all group flex items-center gap-4">
                <span className="text-3xl">🔧</span>
                <div>
                  <div className="font-bold text-white">Troubleshoot Issue</div>
                  <div className="text-sm text-gray-400">Fix buffering, login errors, etc.</div>
                </div>
              </button>
            </div>
          )}

          {step === 1 && (
            <div className="animate-fade-in">
              <p className="text-xl text-white font-medium mb-6">Select your device:</p>
              <div className="grid grid-cols-2 gap-3">
                {['Samsung/LG TV', 'Firestick / Android', 'Roku Device', 'iPhone / iPad', 'Windows / Mac'].map((item) => (
                  <button key={item} onClick={() => handleDeviceSelect(item)} className="p-4 bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500 rounded-xl text-left transition-all text-sm font-medium text-gray-200 hover:text-white">
                    {item}
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(0)} className="mt-4 text-xs text-gray-500 hover:text-gray-300">← Back</button>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fade-in">
              <p className="text-xl text-white font-medium mb-2">
                {mode === 'setup' ? "Which app do you prefer?" : "What issue are you facing?"}
              </p>
              <p className="text-gray-400 mb-6 text-sm">
                {mode === 'setup' ? "I can recommend the best one for you." : "Select the error to get a quick fix."}
              </p>

              <div className="space-y-3">
                {/* SETUP APPS */}
                {mode === 'setup' && (
                  <>
                    <button onClick={() => handleFinalSelection('Recommend Best App')} className="w-full p-4 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-bold text-left shadow-lg">✨ Recommend Best App</button>
                    <button onClick={() => handleFinalSelection('IPORCA 4K TVs')} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 text-left">IPORCA 4K TVs Pro</button>
                    <button onClick={() => handleFinalSelection('TiviMate')} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 text-left">TiviMate (Best for Firestick)</button>
                    {/* NEW BUTTONS ADDED HERE */}
                    <button onClick={() => handleFinalSelection('IBO Player')} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 text-left">IBO Player (Best for Smart TV)</button>
                    <button onClick={() => handleFinalSelection('XCIPTV')} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 text-left">XCIPTV Player (Modern)</button>
                  </>
                )}

                {/* TROUBLESHOOTING ISSUES */}
                {mode === 'fix' && (
                  <>
                    <button onClick={() => handleFinalSelection('Buffering or Freezing')} className="w-full p-4 bg-red-500/10 border border-red-500/50 hover:bg-red-500 hover:text-white rounded-xl text-gray-200 text-left transition-all">⚠️ Buffering / Lagging</button>
                    <button onClick={() => handleFinalSelection('Login Failed Error')} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 text-left">🚫 Login Failed</button>
                    <button onClick={() => handleFinalSelection('Black Screen No Audio')} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 text-left">📺 Black Screen</button>
                    <button onClick={() => handleFinalSelection('Playlist Empty')} className="w-full p-4 bg-white/5 hover:bg-white/10 rounded-xl text-gray-300 text-left">📂 Playlist Empty</button>
                  </>
                )}
              </div>
              <button onClick={() => setStep(1)} className="mt-4 text-xs text-gray-500 hover:text-gray-300">← Back</button>
            </div>
          )}

          {step === 3 && (
            <div className="text-center">
              {loading ? (
                <div className="animate-pulse py-10">
                  <div className="text-4xl mb-4">🤖</div>
                  <h4 className="text-white font-bold text-lg">AI is thinking...</h4>
                  <p className="text-gray-400 text-sm">Analyzing {device}...</p>
                </div>
              ) : (
                <div className="animate-fade-in">
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-5 mb-6 text-left max-h-[60vh] overflow-y-auto custom-scrollbar">
                    <p className="text-gray-200 whitespace-pre-line leading-relaxed text-sm">{guide}</p>
                  </div>
                  <button onClick={resetWizard} className="w-full py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-all">Close & Done</button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default SetupWizard;