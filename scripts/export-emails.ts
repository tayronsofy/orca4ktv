/**
 * Export every email address held by the site to CSV.
 *
 *   npx tsx scripts/export-emails.ts
 *
 * Writes three files into ./exports (gitignored — this is customer PII):
 *   customers.csv   - registered accounts (profiles table)
 *   trials.csv      - free-trial requests (trials table)
 *   all-emails.csv  - deduplicated master list with source + name
 *
 * Requires NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in .env.local.
 */
import fs from 'fs'
import path from 'path'
import { config } from 'dotenv'
import { createClient } from '@supabase/supabase-js'

config({ path: path.join(process.cwd(), '.env.local') })

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(url, key)
const OUT_DIR = path.join(process.cwd(), 'exports')
const PAGE = 1000 // PostgREST caps a single response at 1000 rows

/** Escape a value for CSV (quotes, commas, newlines). */
function cell(v: unknown): string {
  if (v === null || v === undefined) return ''
  const s = String(v)
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s
}

function toCsv(headers: string[], rows: Record<string, unknown>[]): string {
  const lines = [headers.join(',')]
  for (const row of rows) lines.push(headers.map(h => cell(row[h])).join(','))
  return lines.join('\n') + '\n'
}

/** Fetch every row of a table, paging past the 1000-row cap. */
async function fetchAll(table: string, columns: string): Promise<Record<string, unknown>[]> {
  const all: Record<string, unknown>[] = []
  for (let from = 0; ; from += PAGE) {
    const { data, error } = await supabase
      .from(table)
      .select(columns)
      .order('created_at', { ascending: false })
      .range(from, from + PAGE - 1)
    if (error) throw new Error(`${table}: ${error.message}`)
    const batch = (data || []) as unknown as Record<string, unknown>[]
    all.push(...batch)
    if (batch.length < PAGE) break
  }
  return all
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true })

  // ── Registered customers ───────────────────────────────────
  const profiles = await fetchAll('profiles', 'email, full_name, phone, country, created_at')
  fs.writeFileSync(
    path.join(OUT_DIR, 'customers.csv'),
    toCsv(['email', 'full_name', 'phone', 'country', 'created_at'], profiles)
  )
  console.log(`customers.csv   ${profiles.length} rows`)

  // ── Trial requests ─────────────────────────────────────────
  const trials = await fetchAll('trials', 'email, name, device, country, status, created_at')
  fs.writeFileSync(
    path.join(OUT_DIR, 'trials.csv'),
    toCsv(['email', 'name', 'device', 'country', 'status', 'created_at'], trials)
  )
  console.log(`trials.csv      ${trials.length} rows`)

  // ── Deduplicated master list ───────────────────────────────
  // Customers win over trials when the same address appears in both.
  const master = new Map<string, Record<string, unknown>>()

  for (const t of trials) {
    const email = String(t.email || '').trim().toLowerCase()
    if (!email || !email.includes('@')) continue
    master.set(email, {
      email,
      name: t.name || '',
      source: 'trial',
      country: t.country || '',
      created_at: t.created_at || '',
    })
  }
  for (const p of profiles) {
    const email = String(p.email || '').trim().toLowerCase()
    if (!email || !email.includes('@')) continue
    const existing = master.get(email)
    master.set(email, {
      email,
      name: p.full_name || existing?.name || '',
      source: existing ? 'customer+trial' : 'customer',
      country: p.country || existing?.country || '',
      created_at: p.created_at || '',
    })
  }

  const all = [...master.values()]
  fs.writeFileSync(
    path.join(OUT_DIR, 'all-emails.csv'),
    toCsv(['email', 'name', 'source', 'country', 'created_at'], all)
  )

  const counts = all.reduce<Record<string, number>>((acc, r) => {
    const s = String(r.source)
    acc[s] = (acc[s] || 0) + 1
    return acc
  }, {})
  console.log(`all-emails.csv  ${all.length} unique addresses`, counts)
  console.log(`\nWritten to ${OUT_DIR}`)
}

main().catch(err => {
  console.error('Export failed:', err.message)
  process.exit(1)
})
