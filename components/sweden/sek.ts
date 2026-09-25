/**
 * SEK display prices for the Sweden page.
 * Checkout charges USD; the SEK figures are a rounded conversion shown for
 * Swedish visitors. Rate captured 2026-09-25 (open.er-api.com): 1 USD = 9.92 SEK.
 * Update USD_TO_SEK when the rate drifts more than a few percent.
 */
export const USD_TO_SEK = 9.92

/** Convert a USD list price to SEK, rounded to the nearest 5 kr. */
export function toSek(usd: number): number {
  return Math.round((usd * USD_TO_SEK) / 5) * 5
}

/** 1090 -> "1 090" (Swedish thousands separator is a space). */
export function formatSek(amount: number): string {
  return String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

/** Cheapest monthly equivalent shown in copy: the 12-month, 1-stream plan. */
export const FROM_SEK_PER_MONTH = Math.round(toSek(95) / 12)
