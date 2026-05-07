import { createHash } from 'crypto'
import type { NextRequest } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export interface RateLimitOptions {
  max: number
  windowMs: number
}

export interface RateLimitResult {
  ok: boolean
  remaining: number
  retryAfterSec: number
}

function clientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') || 'unknown'
}

function ipHash(ip: string): string {
  const salt = process.env.RATE_LIMIT_SALT || 'orca4ktv-tools'
  return createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32)
}

export async function checkAndRecord(
  tool: string,
  req: NextRequest,
  { max, windowMs }: RateLimitOptions,
): Promise<RateLimitResult> {
  const ip = clientIp(req)
  const hash = ipHash(ip)
  const since = new Date(Date.now() - windowMs).toISOString()

  let admin
  try {
    admin = createAdminClient()
  } catch {
    // No service-role key set (local dev) — fail open so the tool stays usable.
    return { ok: true, remaining: max, retryAfterSec: 0 }
  }

  const { count, error: countError } = await admin
    .from('tool_rate_limits')
    .select('*', { count: 'exact', head: true })
    .eq('ip_hash', hash)
    .eq('tool', tool)
    .gte('created_at', since)

  if (countError) {
    // DB error — fail open (don't block legitimate users on infrastructure hiccups)
    return { ok: true, remaining: max, retryAfterSec: 0 }
  }

  const used = count ?? 0
  if (used >= max) {
    return { ok: false, remaining: 0, retryAfterSec: Math.ceil(windowMs / 1000) }
  }

  await admin.from('tool_rate_limits').insert({ ip_hash: hash, tool })

  return { ok: true, remaining: Math.max(0, max - used - 1), retryAfterSec: 0 }
}
