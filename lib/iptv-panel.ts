/**
 * ActivationPanel API helper
 * Docs: https://activationpanel.net/api/panel_api.html
 * All requests are GET with api_key query param.
 */

function panelUrl(params: Record<string, string>): string {
  const base = process.env.IPTV_PANEL_URL
  const apiKey = process.env.IPTV_API_KEY
  if (!base || !apiKey) throw new Error('IPTV_PANEL_URL and IPTV_API_KEY env vars are required')

  const qs = new URLSearchParams({ ...params, api_key: apiKey })
  return `${base}/api/api.php?${qs.toString()}`
}

export interface Bouquet {
  id: string
  name: string
}

export interface CreatedTrialAccount {
  username: string
  password: string
  m3uUrl: string
  userId: string
}

/**
 * Fetch all available bouquets/packages from the panel.
 */
export async function getPanelBouquets(): Promise<Bouquet[]> {
  const url = panelUrl({ action: 'bouquet' })
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Panel bouquet fetch failed: ${res.status}`)

  const data = await res.json()
  // API returns array of { id, name }
  if (!Array.isArray(data)) throw new Error('Unexpected bouquet response format')
  return data as Bouquet[]
}

/**
 * Create a demo/trial M3U account on the panel.
 * sub=99 = demo mode
 * Returns parsed username, password and the full M3U URL.
 */
export async function createTrialM3U(packId: string, note?: string): Promise<CreatedTrialAccount> {
  const params: Record<string, string> = {
    action: 'new',
    type: 'm3u',
    sub: '99',   // 99 = demo/trial
    pack: packId,
  }
  if (note) params.note = note

  const url = panelUrl(params)
  const res = await fetch(url, { cache: 'no-store' })
  if (!res.ok) throw new Error(`Panel create trial failed: ${res.status}`)

  const data = await res.json()

  if (!data.url) throw new Error(data.message || 'Panel did not return an M3U URL')

  // Parse username and password from the returned M3U URL
  // Format: http://server.cc/get.php?username=X&password=Y&type=m3u_plus
  const parsed = new URL(data.url)
  const username = parsed.searchParams.get('username') || ''
  const password = parsed.searchParams.get('password') || ''

  if (!username || !password) throw new Error('Could not parse credentials from panel M3U URL')

  return {
    username,
    password,
    m3uUrl: data.url,
    userId: String(data.user_id || ''),
  }
}
