// Xtream Codes <-> M3U URL helpers. All pure functions, run client-side.

export interface XtreamCreds {
  host: string // e.g. "panel.example.com" or "panel.example.com:8080"
  username: string
  password: string
  protocol?: 'http' | 'https'
}

export interface XtreamUrls {
  m3u: string
  m3uPlus: string
  epg: string
  playerApi: string
}

const ALLOWED_PROTOCOLS = new Set(['http', 'https'])

function normalizeHost(input: string): string {
  let h = input.trim()
  // strip any scheme the user pasted
  h = h.replace(/^https?:\/\//i, '')
  // strip trailing slash
  h = h.replace(/\/$/, '')
  if (!h) throw new Error('Host is required')
  return h
}

export function buildXtreamUrls(creds: XtreamCreds): XtreamUrls {
  const host = normalizeHost(creds.host)
  const protocol = creds.protocol ?? 'http'
  if (!ALLOWED_PROTOCOLS.has(protocol)) {
    throw new Error('Protocol must be http or https')
  }
  const u = encodeURIComponent(creds.username.trim())
  const p = encodeURIComponent(creds.password.trim())
  if (!u || !p) throw new Error('Username and password are required')

  const base = `${protocol}://${host}`
  return {
    m3u: `${base}/get.php?username=${u}&password=${p}&type=m3u&output=ts`,
    m3uPlus: `${base}/get.php?username=${u}&password=${p}&type=m3u_plus&output=ts`,
    epg: `${base}/xmltv.php?username=${u}&password=${p}`,
    playerApi: `${base}/player_api.php?username=${u}&password=${p}`,
  }
}

// Parse an existing M3U / get.php / player_api / xmltv URL back into credentials.
// Returns null if the URL doesn't look like an Xtream Codes URL.
export function parseXtreamUrl(input: string): XtreamCreds | null {
  let url: URL
  try {
    url = new URL(input.trim())
  } catch {
    return null
  }
  if (!ALLOWED_PROTOCOLS.has(url.protocol.replace(':', ''))) return null

  const looksLikeXtream =
    url.pathname.endsWith('/get.php') ||
    url.pathname.endsWith('/player_api.php') ||
    url.pathname.endsWith('/xmltv.php')

  if (!looksLikeXtream) return null

  const username = url.searchParams.get('username')
  const password = url.searchParams.get('password')
  if (!username || !password) return null

  return {
    host: url.host, // includes :port if non-default
    username,
    password,
    protocol: url.protocol.replace(':', '') as 'http' | 'https',
  }
}
