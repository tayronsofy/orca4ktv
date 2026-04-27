'use client'

import { useState } from 'react'

interface Props {
  label: string
  value: string
  secret?: boolean
  isUrl?: boolean
}

export default function RevealCredential({ label, value, secret = false, isUrl = false }: Props) {
  const [revealed, setRevealed] = useState(!secret)
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const display = secret && !revealed ? '••••••••••••' : value

  return (
    <div className="bg-[#001f3f] rounded-xl px-4 py-3 border border-white/5">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500 uppercase tracking-widest">{label}</span>
        <div className="flex items-center gap-2">
          {secret && (
            <button
              onClick={() => setRevealed(v => !v)}
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
            >
              <i className={`fas ${revealed ? 'fa-eye-slash' : 'fa-eye'} mr-1`}></i>
              {revealed ? 'Hide' : 'Reveal'}
            </button>
          )}
          <button
            onClick={handleCopy}
            className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
          >
            <i className={`fas ${copied ? 'fa-check' : 'fa-copy'} mr-1`}></i>
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
      <p className={`text-white font-mono text-sm break-all ${!revealed && secret ? 'tracking-widest' : ''}`}>
        {isUrl && revealed ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 underline break-all">
            {value}
          </a>
        ) : display}
      </p>
    </div>
  )
}
