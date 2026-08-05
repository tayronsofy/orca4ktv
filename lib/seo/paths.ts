/** Normalize a redirect path: lowercase, leading slash, no trailing slash. */
export function normalizePath(raw: string): string {
  let p = raw.trim().toLowerCase()
  if (!p.startsWith('/')) p = `/${p}`
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  return p
}
