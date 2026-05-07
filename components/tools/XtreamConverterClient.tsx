'use client'

import { useState } from 'react'
import { buildXtreamUrls, parseXtreamUrl, type XtreamCreds } from '@/lib/tools/xtream'
import CopyButton from './CopyButton'

type Mode = 'creds-to-urls' | 'url-to-creds'

export default function XtreamConverterClient() {
  const [mode, setMode] = useState<Mode>('creds-to-urls')

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setMode('creds-to-urls')}
          className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
            mode === 'creds-to-urls' ? 'bg-[#00E5FF] text-[#001f3f]' : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          Xtream → M3U / EPG
        </button>
        <button
          type="button"
          onClick={() => setMode('url-to-creds')}
          className={`px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-wider transition-all ${
            mode === 'url-to-creds' ? 'bg-[#00E5FF] text-[#001f3f]' : 'bg-white/5 text-gray-300 hover:bg-white/10'
          }`}
        >
          M3U URL → Xtream
        </button>
      </div>

      {mode === 'creds-to-urls' ? <CredsToUrls /> : <UrlToCreds />}
    </div>
  )
}

function CredsToUrls() {
  const [host, setHost] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [protocol, setProtocol] = useState<'http' | 'https'>('http')
  const [error, setError] = useState<string | null>(null)
  const [urls, setUrls] = useState<ReturnType<typeof buildXtreamUrls> | null>(null)

  function generate() {
    setError(null)
    setUrls(null)
    try {
      const out = buildXtreamUrls({ host, username, password, protocol })
      setUrls(out)
    } catch (e) {
      setError((e as Error).message || 'Could not generate URLs.')
    }
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4">
        <Field label="Host (with port)" hint="e.g. line.example.com:8080">
          <input
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="line.example.com:8080"
            className="w-full bg-[#001a36] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]/60 font-mono text-sm"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </Field>
        <Field label="Protocol">
          <select
            value={protocol}
            onChange={(e) => setProtocol(e.target.value as 'http' | 'https')}
            className="w-full bg-[#001a36] border border-white/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF]/60"
          >
            <option value="http">HTTP</option>
            <option value="https">HTTPS</option>
          </select>
        </Field>
        <Field label="Username">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-[#001a36] border border-white/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF]/60 font-mono text-sm"
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
          />
        </Field>
        <Field label="Password">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="w-full bg-[#001a36] border border-white/15 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF]/60 font-mono text-sm"
            autoComplete="off"
            spellCheck={false}
          />
        </Field>
      </div>

      <button
        type="button"
        onClick={generate}
        className="mt-5 inline-flex items-center justify-center gap-2 bg-[#003580] hover:bg-[#003566] text-white font-black uppercase tracking-widest text-sm px-7 py-3 rounded-full transition-all shadow-lg shadow-[#00E5FF]/20"
      >
        <i className="fa-solid fa-bolt" aria-hidden="true" />
        Generate URLs
      </button>

      {error && (
        <p className="text-sm text-rose-300 mt-4">
          <i className="fa-solid fa-triangle-exclamation mr-2" aria-hidden="true" />
          {error}
        </p>
      )}

      {urls && (
        <div className="mt-8 space-y-4">
          <UrlBlock label="M3U Plus URL (recommended)" url={urls.m3uPlus} />
          <UrlBlock label="Plain M3U URL" url={urls.m3u} />
          <UrlBlock label="EPG (XMLTV) URL" url={urls.epg} />
          <UrlBlock label="Player API URL" url={urls.playerApi} />
          <p className="text-xs text-gray-500 leading-relaxed">
            Everything happens in your browser — these URLs are generated locally and never sent to our servers.
          </p>
        </div>
      )}
    </div>
  )
}

function UrlToCreds() {
  const [input, setInput] = useState('')
  const [creds, setCreds] = useState<XtreamCreds | null>(null)
  const [error, setError] = useState<string | null>(null)

  function extract() {
    setError(null)
    setCreds(null)
    const out = parseXtreamUrl(input)
    if (!out) {
      setError('That does not look like an Xtream Codes URL (expecting get.php, player_api.php or xmltv.php with username + password).')
      return
    }
    setCreds(out)
  }

  return (
    <div>
      <Field label="Paste your get.php / player_api.php / xmltv.php URL">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="http://line.example.com:8080/get.php?username=...&password=...&type=m3u_plus&output=ts"
          rows={3}
          className="w-full bg-[#001a36] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00E5FF]/60 font-mono text-xs"
          spellCheck={false}
        />
      </Field>

      <button
        type="button"
        onClick={extract}
        className="mt-5 inline-flex items-center justify-center gap-2 bg-[#003580] hover:bg-[#003566] text-white font-black uppercase tracking-widest text-sm px-7 py-3 rounded-full transition-all shadow-lg shadow-[#00E5FF]/20"
      >
        <i className="fa-solid fa-key" aria-hidden="true" />
        Extract credentials
      </button>

      {error && (
        <p className="text-sm text-rose-300 mt-4">
          <i className="fa-solid fa-triangle-exclamation mr-2" aria-hidden="true" />
          {error}
        </p>
      )}

      {creds && (
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <UrlBlock label="Host" url={creds.host} />
          <UrlBlock label="Protocol" url={creds.protocol ?? 'http'} />
          <UrlBlock label="Username" url={creds.username} />
          <UrlBlock label="Password" url={creds.password} />
        </div>
      )}
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-gray-300 block mb-1.5">{label}</span>
      {children}
      {hint && <span className="text-xs text-gray-500 block mt-1">{hint}</span>}
    </label>
  )
}

function UrlBlock({ label, url }: { label: string; url: string }) {
  return (
    <div className="rounded-xl bg-[#001a36] border border-white/10 p-4">
      <div className="flex items-center justify-between mb-2 gap-3">
        <span className="text-xs uppercase tracking-widest font-bold text-gray-400">{label}</span>
        <CopyButton value={url} />
      </div>
      <p className="font-mono text-xs text-[#00E5FF] break-all">{url}</p>
    </div>
  )
}
