'use client'

import { useState } from 'react'

interface ShareButtonsProps {
  url: string
  title: string
}

export default function ShareButtons({ url, title }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedText = encodeURIComponent(`${title} — stream 22,000+ channels in 4K`)

  const shareLinks = [
    {
      name: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: 'fab fa-facebook-f',
      bg: 'bg-[#1877F2] hover:bg-[#166fe5]',
    },
    {
      name: 'X / Twitter',
      href: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      icon: 'fab fa-x-twitter',
      bg: 'bg-black hover:bg-neutral-800 border border-white/10',
    },
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      icon: 'fab fa-whatsapp',
      bg: 'bg-[#25D366] hover:bg-[#1ebe5d]',
    },
    {
      name: 'Reddit',
      href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodeURIComponent(title)}`,
      icon: 'fab fa-reddit-alien',
      bg: 'bg-[#FF4500] hover:bg-[#e03d00]',
    },
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback for older browsers
      const el = document.createElement('textarea')
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-gray-500 text-xs uppercase tracking-widest mr-1">Share:</span>

      {shareLinks.map(link => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${link.name}`}
          title={`Share on ${link.name}`}
          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm transition-all hover:scale-110 ${link.bg}`}
        >
          <i className={link.icon} />
        </a>
      ))}

      {/* Copy Link */}
      <button
        onClick={handleCopy}
        aria-label="Copy link"
        title="Copy link"
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm bg-white/10 hover:bg-white/20 border border-white/10 transition-all hover:scale-110"
      >
        <i className={copied ? 'fas fa-check text-green-400' : 'fas fa-link'} />
      </button>

      {copied && (
        <span className="text-green-400 text-xs font-medium animate-pulse">Copied!</span>
      )}
    </div>
  )
}
