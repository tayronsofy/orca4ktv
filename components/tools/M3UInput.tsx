'use client'

import { useRef, useState } from 'react'

const FILE_SIZE_CAP = 5 * 1024 * 1024 // 5 MB

export type M3UInputMode = 'url' | 'paste'

export interface M3UInputValue {
  mode: M3UInputMode
  url?: string
  content?: string // pasted/uploaded text
}

interface Props {
  onSubmit: (v: M3UInputValue) => void
  busy?: boolean
  submitLabel?: string
  allowPaste?: boolean // default true
}

export default function M3UInput({ onSubmit, busy = false, submitLabel = 'Run check', allowPaste = true }: Props) {
  const [mode, setMode] = useState<M3UInputMode>('url')
  const [url, setUrl] = useState('')
  const [content, setContent] = useState('')
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    setError(null)
    if (file.size > FILE_SIZE_CAP) {
      setError(`File too large (max ${FILE_SIZE_CAP / 1024 / 1024} MB).`)
      return
    }
    const text = await file.text()
    setContent(text)
    setMode('paste')
  }

  function submit() {
    setError(null)
    if (mode === 'url') {
      if (!url.trim()) {
        setError('Enter an M3U URL or switch to paste mode.')
        return
      }
      try {
        new URL(url)
      } catch {
        setError('That does not look like a valid URL.')
        return
      }
      onSubmit({ mode: 'url', url: url.trim() })
    } else {
      if (!content.trim()) {
        setError('Paste the contents of your M3U playlist.')
        return
      }
      onSubmit({ mode: 'paste', content })
    }
  }

  return (
    <div>
      {allowPaste && (
        <div className="flex gap-2 mb-4">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
              mode === 'url' ? 'bg-[#00E5FF] text-[#001f3f]' : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => setMode('paste')}
            className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
              mode === 'paste' ? 'bg-[#00E5FF] text-[#001f3f]' : 'bg-white/5 text-gray-300 hover:bg-white/10'
            }`}
          >
            Paste / Upload
          </button>
        </div>
      )}

      {mode === 'url' ? (
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-300 block">M3U / M3U8 URL</label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="http://your-iptv-host.com/get.php?username=...&password=..."
            className="w-full bg-[#001a36] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]/60"
            spellCheck={false}
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
          />
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-sm font-bold text-gray-300 flex items-center justify-between">
            <span>Paste your playlist</span>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="text-xs font-bold uppercase tracking-wider text-[#00E5FF] hover:text-white"
            >
              Upload .m3u file
            </button>
          </label>
          <input
            ref={fileRef}
            type="file"
            accept=".m3u,.m3u8,text/plain"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0]
              if (f) handleFile(f)
              e.target.value = ''
            }}
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={`#EXTM3U\n#EXTINF:-1 tvg-id="..." ...,Channel name\nhttp://...`}
            rows={8}
            className="w-full bg-[#001a36] border border-white/15 rounded-lg px-4 py-3 font-mono text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]/60"
            spellCheck={false}
          />
          <p className="text-xs text-gray-500">Files are read in your browser - never uploaded to our servers.</p>
        </div>
      )}

      {error && (
        <p className="text-sm text-rose-300 mt-3">
          <i className="fa-solid fa-triangle-exclamation mr-2" aria-hidden="true" />
          {error}
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={busy}
        className="mt-5 w-full md:w-auto inline-flex items-center justify-center gap-2 bg-[#003580] hover:bg-[#003566] disabled:opacity-60 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest text-sm px-7 py-3 rounded-full transition-all shadow-lg shadow-[#00E5FF]/20"
      >
        {busy ? (
          <>
            <i className="fa-solid fa-spinner fa-spin" aria-hidden="true" />
            Working…
          </>
        ) : (
          <>
            <i className="fa-solid fa-play" aria-hidden="true" />
            {submitLabel}
          </>
        )}
      </button>
    </div>
  )
}
