import { promises as dns } from 'dns'
import net from 'net'

// Block private + loopback + link-local + reserved IP ranges so user-supplied
// URLs can't be used to probe the internal network from our server.
const BLOCKED_V4 = [
  // [network, mask bits]
  ['0.0.0.0', 8],
  ['10.0.0.0', 8],
  ['100.64.0.0', 10], // CGNAT
  ['127.0.0.0', 8],
  ['169.254.0.0', 16],
  ['172.16.0.0', 12],
  ['192.0.0.0', 24],
  ['192.0.2.0', 24],
  ['192.168.0.0', 16],
  ['198.18.0.0', 15],
  ['198.51.100.0', 24],
  ['203.0.113.0', 24],
  ['224.0.0.0', 4], // multicast
  ['240.0.0.0', 4], // reserved
  ['255.255.255.255', 32],
] as const

function ipv4ToInt(ip: string): number {
  const parts = ip.split('.').map(Number)
  if (parts.length !== 4 || parts.some((p) => Number.isNaN(p))) return -1
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0
}

function inV4Range(ip: string, network: string, bits: number): boolean {
  const ipInt = ipv4ToInt(ip)
  const netInt = ipv4ToInt(network)
  if (ipInt < 0 || netInt < 0) return false
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0
  return (ipInt & mask) === (netInt & mask)
}

function isBlockedV6(ip: string): boolean {
  const lower = ip.toLowerCase()
  // ::1 loopback, fe80::/10 link-local, fc00::/7 unique local, ::ffff:... mapped v4
  if (lower === '::1' || lower === '::') return true
  if (lower.startsWith('fe80:') || lower.startsWith('fc') || lower.startsWith('fd')) return true
  if (lower.startsWith('::ffff:')) {
    const v4 = lower.slice(7)
    return BLOCKED_V4.some(([n, b]) => inV4Range(v4, n, b))
  }
  return false
}

export interface SsrfCheckOptions {
  allowedPorts?: number[]
  allowedSchemes?: string[]
}

const DEFAULT_OPTIONS: Required<SsrfCheckOptions> = {
  // Common IPTV ports — 80/443 standard, 8080/8880 alt-http, 25461 popular Xtream port,
  // 8000/8001/2052/2082/2086/2095 also seen in the wild.
  allowedPorts: [80, 443, 8080, 8880, 8000, 8001, 25461, 2052, 2082, 2086, 2095],
  allowedSchemes: ['http:', 'https:'],
}

export interface SsrfResult {
  ok: boolean
  reason?: string
  url?: URL
  resolvedIp?: string
}

export async function assertSafeUrl(input: string, opts: SsrfCheckOptions = {}): Promise<SsrfResult> {
  const merged = { ...DEFAULT_OPTIONS, ...opts }
  let url: URL
  try {
    url = new URL(input)
  } catch {
    return { ok: false, reason: 'Invalid URL.' }
  }
  if (!merged.allowedSchemes.includes(url.protocol)) {
    return { ok: false, reason: `Only ${merged.allowedSchemes.join(', ')} URLs are allowed.` }
  }

  const port = url.port
    ? Number(url.port)
    : url.protocol === 'https:'
    ? 443
    : 80
  if (!merged.allowedPorts.includes(port)) {
    return { ok: false, reason: `Port ${port} is not allowed.` }
  }

  const host = url.hostname
  // Resolve to IP and check ranges
  let ip: string
  if (net.isIP(host)) {
    ip = host
  } else {
    try {
      const lookup = await dns.lookup(host, { all: false, verbatim: true })
      ip = lookup.address
    } catch {
      return { ok: false, reason: 'Could not resolve host.' }
    }
  }

  if (net.isIPv4(ip)) {
    if (BLOCKED_V4.some(([n, b]) => inV4Range(ip, n, b))) {
      return { ok: false, reason: 'Host resolves to a private/reserved IP.', url, resolvedIp: ip }
    }
  } else if (net.isIPv6(ip)) {
    if (isBlockedV6(ip)) {
      return { ok: false, reason: 'Host resolves to a private/reserved IPv6 range.', url, resolvedIp: ip }
    }
  } else {
    return { ok: false, reason: 'Resolved address is not a valid IP.' }
  }

  return { ok: true, url, resolvedIp: ip }
}
