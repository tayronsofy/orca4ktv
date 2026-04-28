import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { validateCoupon } from '@/lib/coupons'

export async function POST(request: NextRequest) {
  let body: any
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ valid: false, reason: 'invalid_code' }, { status: 400 })
  }

  const { code, planSlug, connections } = body ?? {}
  if (!code || !planSlug || !connections) {
    return NextResponse.json({ valid: false, reason: 'invalid_code' }, { status: 400 })
  }

  // Optional: validate against the logged-in user's eligibility.
  // If unauthenticated, coupon is checked for general validity only (no per-user redemption check).
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const result = await validateCoupon({
    code: String(code),
    planSlug: String(planSlug),
    connections: Number(connections),
    userId: user?.id ?? null,
  })

  return NextResponse.json(result, { status: result.valid ? 200 : 200 })
}
