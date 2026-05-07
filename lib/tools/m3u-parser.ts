// Lightweight M3U/M3U8 parser - handles the IPTV variant of the format.
// Each entry has an #EXTINF line (with optional tvg-* attributes and a
// display name after the comma) followed by a URL line. Lines that aren't
// EXTINF / URL / known directives are ignored.

export interface M3UEntry {
  name: string
  url: string
  tvgId?: string
  tvgName?: string
  logo?: string
  group?: string
  country?: string
}

export interface M3UParseResult {
  entries: M3UEntry[]
  totalLines: number
  warnings: string[]
}

const ATTR_RE = /([a-zA-Z0-9_-]+)="([^"]*)"/g

function parseExtinfAttrs(line: string): Record<string, string> {
  const out: Record<string, string> = {}
  let m: RegExpExecArray | null
  while ((m = ATTR_RE.exec(line)) !== null) {
    out[m[1].toLowerCase()] = m[2]
  }
  return out
}

function inferCountry(entry: { tvgId?: string; group?: string }): string | undefined {
  // Common conventions: tvg-id="bbcone.uk" or group-title="UK | Sports"
  if (entry.tvgId) {
    const dot = entry.tvgId.lastIndexOf('.')
    if (dot > 0) {
      const cc = entry.tvgId.slice(dot + 1).toLowerCase()
      if (/^[a-z]{2,3}$/.test(cc)) return cc.toUpperCase()
    }
  }
  if (entry.group) {
    const head = entry.group.split(/[|:\--]/)[0].trim()
    if (head.length >= 2 && head.length <= 30) return head
  }
  return undefined
}

export function parseM3U(content: string): M3UParseResult {
  const lines = content.split(/\r?\n/)
  const entries: M3UEntry[] = []
  const warnings: string[] = []

  let pending: Partial<M3UEntry> | null = null

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i]
    const line = raw.trim()
    if (!line) continue

    if (line.startsWith('#EXTM3U')) continue

    if (line.startsWith('#EXTINF')) {
      const attrs = parseExtinfAttrs(line)
      const commaIdx = line.indexOf(',')
      const displayName = commaIdx >= 0 ? line.slice(commaIdx + 1).trim() : ''
      pending = {
        name: displayName || attrs['tvg-name'] || 'Unnamed',
        tvgId: attrs['tvg-id'] || undefined,
        tvgName: attrs['tvg-name'] || undefined,
        logo: attrs['tvg-logo'] || undefined,
        group: attrs['group-title'] || undefined,
      }
      continue
    }

    if (line.startsWith('#')) continue // skip other directives

    // URL line - must follow an EXTINF
    if (!pending) {
      // tolerate URL-only playlists by emitting a minimal entry
      if (/^https?:\/\//i.test(line)) {
        entries.push({ name: 'Stream ' + (entries.length + 1), url: line })
      }
      continue
    }

    if (!/^https?:\/\//i.test(line)) {
      warnings.push(`Line ${i + 1}: stream URL is not http/https - skipped.`)
      pending = null
      continue
    }

    const built: M3UEntry = {
      name: pending.name!,
      url: line,
      tvgId: pending.tvgId,
      tvgName: pending.tvgName,
      logo: pending.logo,
      group: pending.group,
    }
    built.country = inferCountry(built)
    entries.push(built)
    pending = null
  }

  if (entries.length === 0) {
    warnings.push('No valid streams found. Is this a real M3U playlist?')
  }

  return { entries, totalLines: lines.length, warnings }
}

// Re-export an M3UEntry list back to a valid #EXTM3U file body.
export function serializeM3U(entries: M3UEntry[]): string {
  const out = ['#EXTM3U']
  for (const e of entries) {
    const parts: string[] = ['#EXTINF:-1']
    if (e.tvgId) parts.push(`tvg-id="${e.tvgId}"`)
    if (e.tvgName) parts.push(`tvg-name="${e.tvgName}"`)
    if (e.logo) parts.push(`tvg-logo="${e.logo}"`)
    if (e.group) parts.push(`group-title="${e.group}"`)
    out.push(`${parts.join(' ')},${e.name}`)
    out.push(e.url)
  }
  return out.join('\n') + '\n'
}
