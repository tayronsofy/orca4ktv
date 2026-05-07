// One-off (rerunnable) sweeper that strips em dashes and related AI-tell
// punctuation from user-facing content. Replacement rules are applied in
// order; the order matters because " — " must be matched before lone "—".
//
// Run with:  npx tsx scripts/cleanup-em-dashes.ts

import { promises as fs } from 'fs'
import * as path from 'path'

interface Rule {
  // Regex form so we can use the global flag for counting + replacement
  pattern: RegExp
  replacement: string
}

const RULES: Rule[] = [
  // Most specific first: em dash with surrounding spaces in prose
  { pattern: / — /g, replacement: ' - ' },
  // Lone em dash (e.g. inside a title with no surrounding spaces)
  { pattern: /—/g, replacement: '-' },
  // En dash (rarer but still an AI tell)
  { pattern: / – /g, replacement: ' - ' },
  { pattern: /–/g, replacement: '-' },
  // HTML entities used in posts.json blog bodies
  { pattern: /&mdash;/g, replacement: '-' },
  { pattern: /&#8212;/g, replacement: '-' },
  { pattern: /&ndash;/g, replacement: '-' },
  { pattern: /&#8211;/g, replacement: '-' },
]

const ROOT = process.cwd()

const INCLUDE_DIRS = [
  'app',
  'components',
  'page-components',
  'data',
  'lib',
  'marketing',
  'legal',
  'scripts/regenerate', // sweep prompts/comments too — keeps the codebase consistent
]

const INCLUDE_EXTS = new Set(['.tsx', '.ts', '.json', '.md', '.html', '.css'])

const EXCLUDE_DIR_NAMES = new Set(['node_modules', '.next', 'dist', '.git', 'build'])
const EXCLUDE_FILE_PATTERNS: RegExp[] = [
  /\.tsbuildinfo$/,
  /\.bak$/,
  /\.backup$/,
  /\.lock$/,
  /package-lock\.json$/,
  // Don't rewrite this script itself — it contains literal em dashes in the rules.
  /scripts\/cleanup-em-dashes\.ts$/,
]

async function* walk(dir: string): AsyncGenerator<string> {
  let entries: import('fs').Dirent[]
  try {
    entries = await fs.readdir(dir, { withFileTypes: true })
  } catch {
    return
  }
  for (const e of entries) {
    if (EXCLUDE_DIR_NAMES.has(e.name)) continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      yield* walk(full)
    } else if (e.isFile()) {
      const rel = path.relative(ROOT, full)
      if (EXCLUDE_FILE_PATTERNS.some((p) => p.test(rel))) continue
      const ext = path.extname(e.name)
      if (!INCLUDE_EXTS.has(ext)) continue
      yield full
    }
  }
}

interface FileChange {
  path: string
  countsByRule: number[]
  total: number
}

async function processFile(filePath: string): Promise<FileChange | null> {
  const original = await fs.readFile(filePath, 'utf8')
  let updated = original
  const countsByRule: number[] = []
  let total = 0

  for (const rule of RULES) {
    const matches = updated.match(rule.pattern)
    const count = matches ? matches.length : 0
    countsByRule.push(count)
    total += count
    if (count > 0) {
      updated = updated.replace(rule.pattern, rule.replacement)
    }
  }

  if (total === 0 || updated === original) return null

  await fs.writeFile(filePath, updated, 'utf8')
  return { path: path.relative(ROOT, filePath), countsByRule, total }
}

async function main() {
  const changes: FileChange[] = []
  for (const dir of INCLUDE_DIRS) {
    const abs = path.resolve(ROOT, dir)
    for await (const file of walk(abs)) {
      const change = await processFile(file)
      if (change) changes.push(change)
    }
  }

  changes.sort((a, b) => b.total - a.total)
  const grandTotal = changes.reduce((sum, c) => sum + c.total, 0)

  console.log(`\nem-dash cleanup: touched ${changes.length} files, ${grandTotal} replacements`)
  console.log('-'.repeat(72))
  for (const c of changes.slice(0, 30)) {
    console.log(`${String(c.total).padStart(5)}  ${c.path}`)
  }
  if (changes.length > 30) {
    console.log(`...and ${changes.length - 30} more files (smaller counts)`)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
