'use client'

import React from 'react'
import type { SeoAnalysis } from '@/lib/seo/analyzer'

const RING_COLORS = { good: '#4ade80', ok: '#fbbf24', poor: '#f87171' }

export default function SeoScorePanel({ analysis }: { analysis: SeoAnalysis }) {
  const { score, grade, checks } = analysis
  const color = RING_COLORS[grade]
  const circumference = 2 * Math.PI * 26

  return (
    <div className="bg-[#001f3f] border border-white/10 rounded-2xl p-5">
      <div className="flex items-center gap-4 mb-4">
        <svg width="64" height="64" viewBox="0 0 64 64" className="shrink-0 -rotate-90">
          <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <circle
            cx="32" cy="32" r="26" fill="none"
            stroke={color} strokeWidth="6" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - score / 100)}
          />
        </svg>
        <div>
          <p className="text-2xl font-black text-white leading-none">{score}<span className="text-sm text-gray-500">/100</span></p>
          <p className="text-xs font-bold uppercase tracking-wider mt-1" style={{ color }}>
            {grade === 'good' ? 'Good' : grade === 'ok' ? 'Needs work' : 'Poor'}
          </p>
        </div>
      </div>

      <ul className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
        {checks.map(c => (
          <li key={c.id} className="flex items-start gap-2 text-xs">
            <span className={`mt-0.5 ${c.pass ? 'text-green-400' : 'text-red-400'}`}>
              {c.pass ? '✓' : '✕'}
            </span>
            <span className={c.pass ? 'text-gray-400' : 'text-gray-200'}>
              {c.label}
              {c.detail && <span className="text-gray-600"> — {c.detail}</span>}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
