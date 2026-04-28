// Server-side coupon validation. Imports the Supabase admin client to bypass RLS
// (the `coupons` and `coupon_redemptions` tables have no public RLS policies).

import { createAdminClient } from '@/lib/supabase/admin'
import { applyDiscountPercent, getPlanPrice } from '@/lib/pricing'

export type CouponInvalidReason =
  | 'invalid_code'
  | 'expired'
  | 'inactive'
  | 'exhausted'
  | 'not_for_this_plan'
  | 'already_used'
  | 'not_eligible'
  | 'invalid_plan'
  | 'invalid_connections'

export interface CouponValidResult {
  valid: true
  code: string
  discountPercent: number
  originalAmount: number
  discountAmount: number
  finalAmount: number
}

export interface CouponInvalidResult {
  valid: false
  reason: CouponInvalidReason
}

export type CouponResult = CouponValidResult | CouponInvalidResult

/**
 * Validate a coupon code for a given user + plan + connections.
 * Returns the computed amounts if valid, or an explicit reason if not.
 *
 * @param userId  authenticated user UUID. Pass `null` for unauthenticated lookup
 *                (returns valid: true if the coupon exists & is generally usable,
 *                without per-user redemption check).
 */
export async function validateCoupon(opts: {
  code: string
  planSlug: string
  connections: number
  userId: string | null
}): Promise<CouponResult> {
  const code = opts.code?.trim().toUpperCase()
  if (!code) return { valid: false, reason: 'invalid_code' }

  const originalAmount = getPlanPrice(opts.planSlug, opts.connections)
  if (originalAmount == null) {
    return { valid: false, reason: 'invalid_plan' }
  }

  const admin = createAdminClient()

  const { data: coupon, error } = await admin
    .from('coupons')
    .select('code, discount_percent, active, valid_until, uses_remaining, applies_to_plans, new_customers_only')
    .eq('code', code)
    .maybeSingle()

  if (error || !coupon) return { valid: false, reason: 'invalid_code' }
  if (!coupon.active) return { valid: false, reason: 'inactive' }
  if (coupon.valid_until && new Date(coupon.valid_until) < new Date()) {
    return { valid: false, reason: 'expired' }
  }
  if (coupon.uses_remaining != null && coupon.uses_remaining <= 0) {
    return { valid: false, reason: 'exhausted' }
  }
  if (coupon.applies_to_plans && Array.isArray(coupon.applies_to_plans) && coupon.applies_to_plans.length > 0) {
    if (!coupon.applies_to_plans.includes(opts.planSlug)) {
      return { valid: false, reason: 'not_for_this_plan' }
    }
  }

  // Per-user eligibility checks — only when a user is logged in
  if (opts.userId) {
    // Already redeemed this exact code?
    const { count: redemptionCount } = await admin
      .from('coupon_redemptions')
      .select('id', { count: 'exact', head: true })
      .eq('coupon_code', code)
      .eq('user_id', opts.userId)

    if ((redemptionCount ?? 0) > 0) {
      return { valid: false, reason: 'already_used' }
    }

    // "New customers only" → the user must have no paid/active orders
    if (coupon.new_customers_only) {
      const { count: priorOrderCount } = await admin
        .from('orders')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', opts.userId)
        .in('status', ['paid', 'active'])

      if ((priorOrderCount ?? 0) > 0) {
        return { valid: false, reason: 'not_eligible' }
      }
    }
  }

  const { discountAmount, finalAmount } = applyDiscountPercent(originalAmount, coupon.discount_percent)

  return {
    valid: true,
    code: coupon.code,
    discountPercent: coupon.discount_percent,
    originalAmount,
    discountAmount,
    finalAmount,
  }
}
