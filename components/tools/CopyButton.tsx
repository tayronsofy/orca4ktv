'use client'

import { useState } from 'react'

interface Props {
  value: string
  label?: string
  className?: string
}

export default function CopyButton({ value, label = 'Copy', className = '' }: Props) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // clipboard blocked - silently fail; user can select the text
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider bg-white/10 hover:bg-white/15 border border-white/15 text-white transition-all ${className}`}
    >
      <i className={`fa-solid ${copied ? 'fa-check' : 'fa-copy'}`} aria-hidden="true" />
      {copied ? 'Copied' : label}
    </button>
  )
}
