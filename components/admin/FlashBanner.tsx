'use client'

import React, { useEffect } from 'react'

export interface Flash {
  kind: 'success' | 'error'
  text: string
}

export default function FlashBanner({
  flash,
  onDismiss,
  autoDismissMs = 4000,
}: {
  flash: Flash | null
  onDismiss: () => void
  autoDismissMs?: number
}) {
  useEffect(() => {
    if (!flash) return
    const t = setTimeout(onDismiss, autoDismissMs)
    return () => clearTimeout(t)
  }, [flash, onDismiss, autoDismissMs])

  if (!flash) return null

  return (
    <div
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-[60] px-5 py-3 rounded-xl text-sm font-semibold shadow-2xl border ${
        flash.kind === 'success'
          ? 'bg-green-500/15 border-green-500/40 text-green-300'
          : 'bg-red-500/15 border-red-500/40 text-red-300'
      }`}
      role="status"
    >
      {flash.text}
    </div>
  )
}
