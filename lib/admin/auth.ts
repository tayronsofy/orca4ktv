import 'server-only'
import { createHash, timingSafeEqual } from 'node:crypto'
import { NextRequest, NextResponse } from 'next/server'

export const ADMIN_COOKIE = 'admin_token'

/** SHA-256 hex of a string — the admin cookie stores hashSecret(ADMIN_SECRET). */
export function hashSecret(secret: string): string {
  return createHash('sha256').update(secret).digest('hex')
}

/**
 * Constant-time string comparison. Hashes both sides first so lengths
 * always match and no length information leaks.
 */
export function constantTimeCompare(a: string, b: string): boolean {
  const ha = createHash('sha256').update(a).digest()
  const hb = createHash('sha256').update(b).digest()
  return timingSafeEqual(ha, hb)
}

/** Unified admin API error body: { error: snake_case_code, detail? } */
export function jsonError(code: string, status: number, detail?: string) {
  return NextResponse.json(detail ? { error: code, detail } : { error: code }, { status })
}

/** Boolean check for a raw cookie token (legacy call-site shape). */
export function isAdminToken(token: string | undefined): boolean {
  const secret = process.env.ADMIN_SECRET
  if (!token || !secret) return false
  return constantTimeCompare(token, hashSecret(secret))
}

/** Boolean check for a NextRequest (legacy call-site shape). */
export function isAdminRequest(request: NextRequest): boolean {
  return isAdminToken(request.cookies.get(ADMIN_COOKIE)?.value)
}

/**
 * Guard for /api/admin/* route handlers.
 * Returns a 401 response when the request is not authenticated, else null.
 *
 *   const denied = requireAdmin(request)
 *   if (denied) return denied
 */
export function requireAdmin(request: NextRequest): NextResponse | null {
  const token = request.cookies.get(ADMIN_COOKIE)?.value
  const secret = process.env.ADMIN_SECRET
  if (!token || !secret) return jsonError('unauthorized', 401)
  if (!constantTimeCompare(token, hashSecret(secret))) return jsonError('unauthorized', 401)
  return null
}
