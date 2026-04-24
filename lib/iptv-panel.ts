/**
 * ActivationPanel API helper
 * Docs: https://activationpanel.net/api/panel_api.html
 * All requests are GET with api_key query param.
 */

function getPanelBase(): string {
  const base = process.env.IPTV_PANEL_URL
  const apiKey = process.env.IPTV_API_KEY
  if (!base || !apiKey) throw new Error('IPTV_PANEL_URL and IPTV_API_KEY env vars are required')
  return base
}

const STREAMING_SERVER = 'http://line.trxdnscloud.ru'

function panelUrl(params: Record<string, string>): string {
  const base = getPanelBase()
  const apiKey = process.env.IPTV_API_KEY!
  const qs = new URLSearchParams({ ...params, api_key: apiKey })
  return `${base}/api/api.php?${qs.toString()}`
}

/**
 * Rewrite the M3U URL returned by the panel so its host is always the
 * streaming server (IPTV_SERVER_URL). The panel API lives on a different
 * host (backup.activationpanel.ru) that is not the streaming endpoint.
 */
function fixM3uUrl(rawUrl: string): string {
  const serverBase = STREAMING_SERVER
  try {
    const parsed = new URL(rawUrl)

    // Host is empty — e.g. http:///get.php?...
    if (!parsed.host) {
      return `${serverBase}${parsed.pathname}${parsed.search}`
    }

    // Host looks like a PHP filename — e.g. http://get.php?...
    if (/\.php$/i.test(parsed.host)) {
      return `${serverBase}/${parsed.host}${parsed.search}`
    }

    // Valid URL — replace host with the streaming server
    return `${serverBase}${parsed.pathname}${parsed.search}`
  } catch {
    const pathPart = rawUrl.replace(/^https?:\/\/[^/]*/, '')
    return `${serverBase}${pathPart}`
  }
}

export interface CreatedTrialAccount {
  username: string
  password: string
  m3uUrl: string
  userId: string
}

export interface SubscriptionAccountOptions {
  planSlug: string
  connections: number
  note?: string
}

export const PLAN_MONTHS: Record<string, number> = {
  '1-month': 1, '3-months': 3, '6-months': 6, '12-months': 12,
}

/**
 * Create a full paid M3U account on the panel.
 * sub = duration in months: 1, 3, 6, or 12 (maps directly from plan slug).
 * The panel does not support exp_date or max_connections via API.
 */
export async function createSubscriptionM3U(opts: SubscriptionAccountOptions): Promise<CreatedTrialAccount> {
  const sub = PLAN_MONTHS[opts.planSlug] ?? 1 // 1 | 3 | 6 | 12

  const params: Record<string, string> = {
    action: 'new',
    type: 'm3u',
    sub: String(sub),
    pack: '35647',
  }
  if (opts.note) params.note = opts.note

  const url = panelUrl(params)
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Panel create subscription failed: ${res.status}`)

  const data = await res.json()

  if (data.status === 'false' || data.status === false) {
    throw new Error(data.message || 'Panel rejected the subscription creation request')
  }

  let username = data.username || ''
  let password = data.password || ''
  let m3uUrl = ''

  if (data.url) {
    m3uUrl = fixM3uUrl(data.url)
    if (!username || !password) {
      try {
        const parsed = new URL(m3uUrl)
        username = parsed.searchParams.get('username') || username
        password = parsed.searchParams.get('password') || password
      } catch { /* ignore */ }
    }
  }

  if (!username || !password) {
    throw new Error('Could not get credentials from panel response')
  }

  if (!m3uUrl) {
    m3uUrl = `${STREAMING_SERVER}/get.php?username=${username}&password=${password}&type=m3u_plus&output=ts`
  }

  return {
    username,
    password,
    m3uUrl,
    userId: String(data.user_id || ''),
  }
}

/**
 * Create a demo/trial M3U account on the panel.
 * sub=99 = demo mode (12h trial, set by the panel).
 * Uses pack=all since no custom bouquets are configured.
 */
export async function createTrialM3U(note?: string): Promise<CreatedTrialAccount> {
  const params: Record<string, string> = {
    action: 'new',
    type: 'm3u',
    sub: '99',     // 99 = demo/trial (12h, fixed by panel)
    pack: '35647',   // give access to all packages
  }
  if (note) params.note = note

  const url = panelUrl(params)
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Panel create trial failed: ${res.status}`)

  const data = await res.json()

  if (data.status === 'false' || data.status === false) {
    throw new Error(data.message || 'Panel rejected the trial creation request')
  }

  // Support both formats: data.url or data.username+data.password
  let username = data.username || ''
  let password = data.password || ''
  let m3uUrl = ''

  if (data.url) {
    m3uUrl = fixM3uUrl(data.url)
    // Also parse username/password from URL if not returned separately
    if (!username || !password) {
      try {
        const parsed = new URL(m3uUrl)
        username = parsed.searchParams.get('username') || username
        password = parsed.searchParams.get('password') || password
      } catch { /* ignore */ }
    }
  }

  if (!username || !password) {
    throw new Error('Could not get credentials from panel response')
  }

  // Build clean M3U URL if not already set
  if (!m3uUrl) {
    m3uUrl = `${STREAMING_SERVER}/get.php?username=${username}&password=${password}&type=m3u_plus&output=ts`
  }

  return {
    username,
    password,
    m3uUrl,
    userId: String(data.user_id || ''),
  }
}
