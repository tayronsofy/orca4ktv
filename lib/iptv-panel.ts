/**
 * ActivationPanel API helper
 * Docs: https://activationpanel.net/api/panel_api.html
 * All requests are GET with api_key query param.
 */

/** True when the panel env vars are set — never throws. */
export function isPanelConfigured(): boolean {
  return !!(process.env.IPTV_PANEL_URL && process.env.IPTV_API_KEY)
}

function getPanelBase(): string {
  const base = process.env.IPTV_PANEL_URL
  const apiKey = process.env.IPTV_API_KEY
  if (!base || !apiKey) throw new Error('IPTV_PANEL_URL and IPTV_API_KEY env vars are required')
  return base
}

const STREAMING_SERVER = process.env.IPTV_SERVER_URL || 'http://line.trxdnscloud.ru'

function panelUrl(params: Record<string, string>): string {
  const base = getPanelBase()
  const apiKey = process.env.IPTV_API_KEY!
  const qs = new URLSearchParams({ ...params, api_key: apiKey })
  return `${base}/api/api.php?${qs.toString()}`
}

/** Error raised when the panel answers with a failure. `panelMessage` is the panel's own text. */
export class PanelError extends Error {
  panelMessage: string
  constructor(panelMessage: string) {
    super(`Panel: ${panelMessage}`)
    this.name = 'PanelError'
    this.panelMessage = panelMessage
  }
}

/**
 * GET the panel and normalise its two failure shapes:
 *   { status: "false", message: "Not enough credits" }
 *   { status: "error", result: "No Subscription time selected." }
 * Any HTTP or JSON problem is also surfaced with the panel's text when available.
 */
async function panelRequest(params: Record<string, string>): Promise<any> {
  const res = await fetch(panelUrl(params), { cache: 'no-store' })
  const text = await res.text()
  let data: any
  try {
    data = JSON.parse(text)
  } catch {
    throw new PanelError(`HTTP ${res.status}, non-JSON response: ${text.slice(0, 200)}`)
  }
  if (!res.ok) throw new PanelError(data?.message || data?.result || `HTTP ${res.status}`)
  if (data && !Array.isArray(data)) {
    const status = String(data.status ?? '').toLowerCase()
    if (status === 'false' || status === 'error') {
      throw new PanelError(String(data.message || data.result || 'request rejected'))
    }
  }
  return data
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

    // Host is empty - e.g. http:///get.php?...
    if (!parsed.host) {
      return `${serverBase}${parsed.pathname}${parsed.search}`
    }

    // Host looks like a PHP filename - e.g. http://get.php?...
    if (/\.php$/i.test(parsed.host)) {
      return `${serverBase}/${parsed.host}${parsed.search}`
    }

    // Valid URL - replace host with the streaming server
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

  const data = await panelRequest(params)

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
 * sub=99 = demo mode (12h trial, set by the panel). Consumes one Demo Ticket,
 * NOT credits - the panel answers "Not enough credits" when no tickets are left.
 * pack=35647 is the "all" bouquet.
 */
export async function createTrialM3U(note?: string): Promise<CreatedTrialAccount> {
  const params: Record<string, string> = {
    action: 'new',
    type: 'm3u',
    sub: '99',     // 99 = demo/trial (12h, fixed by panel, uses 1 Demo Ticket)
    pack: '35647', // "all" bouquet
  }
  if (note) params.note = note

  const data = await panelRequest(params)

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

export interface ResellerInfo {
  username: string
  credits: string
  raw: Record<string, unknown>
}

export interface PanelPackage {
  id: string
  name: string
}

/**
 * Reseller account info (credits/username) via action=reseller_info.
 * Note: the panel does not expose the Demo Ticket balance through the API.
 */
export async function getResellerInfo(): Promise<ResellerInfo> {
  const data = await panelRequest({ action: 'reseller_info' })
  const src = (data.data && typeof data.data === 'object' ? data.data : data) as Record<string, unknown>
  return {
    username: String(src.username ?? src.user ?? src.name ?? ''),
    credits: String(src.credits ?? src.credit ?? src.balance ?? '?'),
    raw: src,
  }
}

/** Bouquet list via action=bouquet. The panel returns a bare JSON array. */
export async function getPackages(): Promise<PanelPackage[]> {
  const data = await panelRequest({ action: 'bouquet' })
  const list = Array.isArray(data) ? data : (data.packages ?? data.data ?? [])
  if (!Array.isArray(list)) return []
  return list
    .map((p: Record<string, unknown>) => ({
      id: String(p.id ?? p.package_id ?? p.pack_id ?? ''),
      name: String(p.name ?? p.package_name ?? p.title ?? ''),
    }))
    .filter((p: PanelPackage) => p.id)
}
