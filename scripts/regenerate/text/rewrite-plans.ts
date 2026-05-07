// Rewrites prose fields in data/shopPlans.ts.
// Strategy: import the data at runtime, rewrite prose via Gemini, regenerate the file
// using JSON.stringify (preserving the TS type-import header from the original file).

import { promises as fs } from 'fs';
import { rewrite } from '../lib/gemini.js';
import { backupFile } from '../lib/backup.js';
import { limit } from '../lib/concurrency.js';
import { isCompleted, markCompleted, markFailed, resetBucket, getStats } from '../lib/manifest.js';
import { PLANS_PATH } from '../lib/paths.js';
import type { CliFlags } from '../lib/cli.js';

const BUCKET = 'plans';

interface ShopReview { name: string; location: string; rating: number; text: string }
interface ShopFAQ { q: string; a: string }
interface ShopPlan {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  badge: string | null;
  months: number;
  basePrice: number;
  monthlyEquivalent: number;
  savings: string | null;
  deviceTiers: any[];
  features: string[];
  highlights: string[];
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  faq: ShopFAQ[];
  reviews: ShopReview[];
  ratingValue: number;
  reviewCount: number;
}

function parseKeywords(keywords?: string): string[] {
  if (!keywords) return [];
  return keywords.split(',').map((k) => k.trim()).filter(Boolean).slice(0, 8);
}

async function rewritePlan(plan: ShopPlan): Promise<ShopPlan> {
  const kw = parseKeywords(plan.keywords);
  const ctx = `This is text from the IPTV plan "${plan.name}" (${plan.months} month${plan.months > 1 ? 's' : ''}, $${plan.basePrice}).`;

  const tagline = await rewrite(plan.tagline, { keywords: kw, extraContext: `${ctx} Field: tagline. ~10 words.`, temperature: 0.85 });
  const description = await rewrite(plan.description, { keywords: kw, extraContext: `${ctx} Field: description. ~40 words.`, temperature: 0.85 });
  const metaTitle = await rewrite(plan.metaTitle, { keywords: kw, extraContext: `${ctx} Field: SEO meta title. Under 60 chars.`, temperature: 0.85 });
  const metaDescription = await rewrite(plan.metaDescription, { keywords: kw, extraContext: `${ctx} Field: SEO meta description. ~150 chars.`, temperature: 0.85 });

  // Each feature line - keep individually short
  const features = await Promise.all(
    plan.features.map((f) =>
      limit(() =>
        rewrite(f, { keywords: kw, extraContext: `${ctx} Field: feature bullet (one line, no period at end).`, temperature: 0.85 })
      )
    )
  );

  const highlights = await Promise.all(
    plan.highlights.map((h) =>
      limit(() =>
        rewrite(h, { keywords: kw, extraContext: `${ctx} Field: highlight bullet (one line, no period at end).`, temperature: 0.85 })
      )
    )
  );

  // FAQ - each Q + A
  const faq = await Promise.all(
    plan.faq.map(async (qa) => ({
      q: await limit(() => rewrite(qa.q, { keywords: kw, extraContext: `${ctx} Field: FAQ question.`, temperature: 0.8 })),
      a: await limit(() => rewrite(qa.a, { keywords: kw, extraContext: `${ctx} Field: FAQ answer (~40 words).`, temperature: 0.8 })),
    }))
  );

  // Reviews - each user testimonial
  const reviews = await Promise.all(
    plan.reviews.map(async (r) => ({
      ...r,
      text: await limit(() => rewrite(r.text, { keywords: kw, extraContext: `${ctx} Field: customer review (~30 words). First-person, casual.`, temperature: 0.9 })),
    }))
  );

  return { ...plan, tagline, description, metaTitle, metaDescription, features, highlights, faq, reviews };
}

/** Extracts everything before `export const SHOP_PLANS` so the TS interface declarations are preserved. */
function extractHeader(source: string): string {
  const marker = 'export const SHOP_PLANS';
  const idx = source.indexOf(marker);
  if (idx === -1) throw new Error(`Could not find "${marker}" in shopPlans.ts`);
  return source.slice(0, idx).trimEnd() + '\n\n';
}

function renderShopPlansFile(header: string, plans: ShopPlan[]): string {
  const json = JSON.stringify(plans, null, 2);
  return `${header}export const SHOP_PLANS: ShopPlan[] = ${json};\n`;
}

export async function runPlansRewrite(flags: CliFlags) {
  // Dynamic import at runtime so we get the typed array
  const mod = await import(PLANS_PATH);
  const plans: ShopPlan[] = mod.SHOP_PLANS;

  if (flags.reset) {
    await resetBucket(BUCKET);
    console.log(`✓ Manifest bucket "${BUCKET}" reset`);
  }

  const stats = await getStats(BUCKET);
  const todo = plans.filter((p) => !stats.completed.includes(p.slug));
  const subset = flags.limit ? todo.slice(0, flags.limit) : todo;

  console.log(
    `Plans: ${plans.length} total, ${stats.completed.length} done, processing ${subset.length} this run.`
  );

  if (subset.length === 0) {
    console.log('Nothing to do.');
    return;
  }

  if (!flags.dryRun) {
    await backupFile(PLANS_PATH);
  }

  const source = await fs.readFile(PLANS_PATH, 'utf-8');
  const header = extractHeader(source);
  const updated: ShopPlan[] = [...plans];

  for (const plan of subset) {
    try {
      console.log(`  → rewriting plan: ${plan.slug}`);
      const newPlan = await rewritePlan(plan);
      const idx = updated.findIndex((p) => p.slug === plan.slug);
      if (idx >= 0) updated[idx] = newPlan;

      if (flags.dryRun) {
        console.log(`    DRY-RUN tagline: ${newPlan.tagline}`);
        console.log(`    DRY-RUN metaTitle: ${newPlan.metaTitle}`);
      } else {
        await fs.writeFile(PLANS_PATH, renderShopPlansFile(header, updated));
        await markCompleted(BUCKET, plan.slug);
      }
    } catch (e: any) {
      console.error(`  ✗ FAILED plan ${plan.slug}: ${e.message}`);
      await markFailed(BUCKET, plan.slug);
    }
  }

  console.log(`\nPlans done.`);
}
