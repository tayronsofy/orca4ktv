// Canonical server-side price authority.
// Server-side code MUST use this (not client-sent amounts) to compute order totals.

export type Connections = 1 | 2 | 3 | 4
export type PlanSlug = '1-month' | '3-months' | '6-months' | '12-months'

export const PLAN_PRICES: Record<PlanSlug, Record<Connections, number>> = {
  '1-month':  { 1: 21, 2: 36, 3: 49, 4: 64 },
  '3-months': { 1: 45, 2: 72, 3: 99, 4: 125 },
  '6-months': { 1: 69, 2: 110, 3: 150, 4: 190 },
  '12-months':{ 1: 95, 2: 152, 3: 210, 4: 260 },
}

export const PLAN_NAMES: Record<PlanSlug, string> = {
  '1-month': '1-Month IPTV Plan',
  '3-months': '3-Month IPTV Plan',
  '6-months': '6-Month IPTV Plan',
  '12-months': '12-Month IPTV Plan',
}

export function isValidPlanSlug(slug: string): slug is PlanSlug {
  return slug in PLAN_PRICES
}

export function isValidConnections(n: number): n is Connections {
  return n === 1 || n === 2 || n === 3 || n === 4
}

export function getPlanPrice(planSlug: string, connections: number): number | null {
  if (!isValidPlanSlug(planSlug)) return null
  if (!isValidConnections(connections)) return null
  return PLAN_PRICES[planSlug][connections]
}

export function getPlanName(planSlug: string): string | null {
  if (!isValidPlanSlug(planSlug)) return null
  return PLAN_NAMES[planSlug]
}

export function applyDiscountPercent(amount: number, discountPercent: number): { discountAmount: number; finalAmount: number } {
  const discountAmount = Math.round(amount * (discountPercent / 100) * 100) / 100
  const finalAmount = Math.round((amount - discountAmount) * 100) / 100
  return { discountAmount, finalAmount }
}
