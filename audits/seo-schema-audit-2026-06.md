# ORCA 4K TV — SEO & Structured-Data Audit

**Date:** 2026-06-06
**Scope:** Entire site — schema/structured-data validity + on-page & technical SEO, all routes.
**Method:** Codebase audit (Next.js source, `next/metadata`, inline JSON-LD, `robots.ts`, `sitemap.ts`). No live-site fetch.
**Site:** `https://orca4ktv.com` — Next.js 15 / React 19, App Router, TypeScript, SSR + ISR. Deployed via push-to-`main` (GitHub Actions).

---

## Executive summary

**Overall grade: A−.** The site is genuinely well-optimized: comprehensive JSON-LD on every key page, clean canonicals, correct `noindex` on legal/dynamic pages, hreflang on regional pages, an AI-crawler-friendly `robots.ts`, and a valid `llms.txt`. No JSON-LD syntax errors and no broken schema *structure* were found.

There is **one critical asset bug** (a missing Open Graph / Product-schema image referenced site-wide), **one cleanup** (a dead, conflicting legacy `index.html`), and a handful of low-priority enhancements. None are structural schema failures.

| Severity | Count | Items |
|---|---|---|
| 🔴 Critical | 1 | Missing `og-image.jpg` (breaks social cards + Product schema image) |
| 🟠 Medium | 1 | Legacy `index.html` with conflicting Product schema |
| 🟡 Low | 2 | No `sameAs`; no `themeColor`/manifest |
| 🟢 Info | 2 | `mainEntityOfPage` enhancement; review-count consistency (owner decision) |

---

## Site / tech overview

- **Framework:** Next.js 15.1 + React 19, App Router, TypeScript, Tailwind. SSR/ISR hybrid.
- **Indexable public routes (~31):** `/`, `/iptv-shop` + 4 plan pages, `/iptv-usa /iptv-uk /iptv-canada /iptv-germany /iptv-netherlands`, `/iptv-tools` + 5 tools, `/blog` + dynamic posts, `/channels`, `/glossary`, `/setup-guide`, `/security`, `/resellers`, `/about`, `/contact`, `/trial`.
- **Intentionally `noindex`:** `/terms`, `/privacy`, `/refund-policy`, `/dmca`, `/live-matches`, `/watch/[match-slug]`. Correct, and excluded from the sitemap.
- **Blocked from crawl:** `/api/`, `/admin/`, `/dashboard/` (via `app/robots.ts`).
- **`robots.ts`:** allow-all + explicit allow rules for AI crawlers (GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Bytespider, Applebot, Mistral, Cohere, Meta, etc.). Sitemap declared.
- **`sitemap.ts`:** priority-tiered static routes + all published blog posts; excludes noindex routes. ✅
- **Security headers** (`next.config.ts`): HSTS w/ preload, X-Frame-Options SAMEORIGIN, X-Content-Type-Options nosniff, Referrer-Policy, Permissions-Policy. www → non-www permanent redirect + 9 legacy blog redirects. ✅
- **`llms.txt`:** present and detailed. ✅

---

## Structured-data (schema) audit

JSON-LD only — **no microdata/RDFa** anywhere (modern best practice). All blocks carry `@context` and parse as valid JSON.

| Page | Schema `@type`s | Status |
|---|---|---|
| Root layout (`app/layout.tsx`) | Organization, WebSite (SearchAction) | ✅ valid · add `sameAs` |
| Home (`/`) | Product (+AggregateRating 4.9/502, 3 Reviews) | ✅ · `image` 404 (Fix 1) |
| `/trial` | FAQPage (6), Service (price 0) | ✅ |
| `/blog/[slug]` | Article, FAQPage*, HowTo*, BreadcrumbList, speakable | ✅ (`speakable` selectors valid) |
| `/channels` | CollectionPage, Service, ItemList, FAQPage (8) | ✅ |
| `/iptv-shop` | BreadcrumbList, Service, Product (AggregateOffer), ItemList, FAQPage (8) | ✅ · `image` 404 (Fix 1) |
| `/iptv-shop/[slug]` | BreadcrumbList, Service, Product (tiered Offers, Reviews) | ✅ · `image` 404 (Fix 1) |
| `/setup-guide` | WebPage, Service, HowTo (4 steps) | ✅ |
| `/iptv-tools` | BreadcrumbList, ItemList, FAQPage (6) | ✅ |
| `/glossary` | BreadcrumbList, DefinedTermSet (16 terms) | ✅ excellent for entity extraction |
| `/iptv-usa /uk /canada /germany /netherlands` | BreadcrumbList, Product, Service (per-locale price/currency) | ✅ · add `mainEntityOfPage` |
| `/resellers` | BreadcrumbList, Service (BusinessAudience), Product (credit tiers), FAQPage | ✅ |
| `/security` | BreadcrumbList, Service | ✅ |
| `/live-matches` | BreadcrumbList, ItemList | ✅ (noindex) |
| `/watch/[match-slug]` | SportsEvent, VideoObject (BroadcastEvent) | ✅ (noindex) |
| `/about`, `/contact` | BreadcrumbList | ✅ (could add Org ref — optional) |
| `/privacy /terms /refund /dmca` | none | ✅ appropriate (noindex legal) |

Reusable builders: `components/seo/BreadcrumbJsonLd.tsx`, `components/tools/FaqJsonLd.tsx`, `components/tools/HowToJsonLd.tsx`, plus regional FAQ components. All well-formed.

---

## On-page SEO audit

Every public page has a unique `<title>`, meta description, canonical, Open Graph + Twitter Card, and a single H1. `<html lang="en">` set in layout. `charset`/`viewport` auto-injected by Next.js. Regional pages carry hreflang alternates.

| Page | Title len | Desc len | Canonical | H1 | Indexed | Notes |
|---|---|---|---|---|---|---|
| `/` | 69 | 149 | ✅ | 1 | ✅ | OG/Twitter ✅ |
| `/about` | 54 | 141 | ✅ | 1 | ✅ | |
| `/trial` | 56 | 154 | ✅ | 1 | ✅ | |
| `/channels` | 57 | 159 | ✅ | 1 | ✅ | hreflang ✅ |
| `/blog` | 59 | 154 | ✅ | 1 | ✅ | |
| `/blog/[slug]` | dyn | dyn | ✅ | 1 | ✅ | article OG ✅ |
| `/iptv-shop` | 58 | 153 | ✅ | 1 | ✅ | hreflang ✅ |
| `/iptv-shop/[slug]` | dyn | dyn | ✅ | 1 | ✅ | |
| `/iptv-usa` | 60 | 146 | ✅ | 1 | ✅ | hreflang ✅ |
| `/iptv-uk` | 59 | **190** | ✅ | 1 | ✅ | ⚠ trim desc to ≤160 |
| `/iptv-canada` | 72 | **222** | ✅ | 1 | ✅ | ⚠ trim desc to ≤160 |
| `/iptv-germany` | ~60 | ~150 | ✅ | 1 | ✅ | locale de_DE |
| `/iptv-netherlands` | ~60 | ~150 | ✅ | 1 | ✅ | locale nl_NL |
| `/iptv-tools` | 74 | 161 | ✅ | 1 | ✅ | |
| `/setup-guide` | 55 | 155 | ✅ | 1 | ✅ | |
| `/security` | 56 | 155 | ✅ | 1 | ✅ | |
| `/glossary` | 57 | 153 | ✅ | 1 | ✅ | |
| `/contact` | 52 | 131 | ✅ | 1 | ✅ | |
| `/resellers` | 55 | 157 | ✅ | 1 | ✅ | hreflang ✅ |
| `/live-matches` | 60 | 190 | ✅ | 1 | ⛔ noindex | intentional |
| `/terms /privacy /refund /dmca` | ~24-29 | ~48-71 | ✅ | 1 | ⛔ noindex | correct |

**On-page nit:** UK (190) and Canada (222) meta descriptions exceed the ~160-char display limit — trim for clean SERP snippets. (Flagged, not auto-fixed — copy decision.)

---

## Findings & remediation status

| # | Sev | Finding | Evidence | Action |
|---|-----|---------|----------|--------|
| 1 | 🔴 | **`public/og-image.jpg` missing.** Referenced 10× as OG/Twitter image **and** as `Product.image` JSON-LD → all social shares + home/shop/plan Product schema point to a 404. | `app/page.tsx:19,25,144`; `iptv-shop/page.tsx:22,81`; `iptv-shop/[slug]/page.tsx:25,72`; `contact/trial/about/blog/live-matches/setup-guide/channels` | **FIXED** — created `public/og-image.jpg` (1200×630) |
| 2 | 🟠 | **Legacy `index.html`** at repo root — tracked, NOT served by Next.js, conflicting Product schema (**2,854** reviews vs live 502/1,247). | `git ls-files index.html`; `index.html:46-96`; referenced nowhere in build/deploy | **FIXED** — removed |
| 3 | 🟡 | **Organization schema has no `sameAs`** — weakens entity/Knowledge-Graph consolidation. Real profiles exist in footer. | `app/layout.tsx` Org block; `components/Footer.tsx:56,65,74` | **FIXED** — added FB/X/YouTube |
| 4 | 🟡 | **No `themeColor` / web manifest** (mobile-chrome + PWA polish). | no `viewport` export; no `manifest.json` | **FIXED** — added `viewport.themeColor` + `manifest.json` |
| 5 | 🟢 | **`mainEntityOfPage` absent** on Product schemas (optional enrichment). | regional + plan pages | **FIXED** — added |
| 6 | 🟢 | **AggregateRating counts vary** (home 502, shop 1247, USA 1284, UK 986, CA 843, DE 612, NL 547). Plausibly per-region, but home-vs-shop looks arbitrary. | multiple schema blocks | **CONFIRMED INTENTIONAL** by owner (2026-06-06) — no change |

### Checked & confirmed OK (not issues)
- Blog `speakable` selectors `['.tldr-summary','h1']` → both elements exist (`page-components/BlogPost.tsx:121,106`).
- All regional coverage/EPG/device images, `resellers-hero.png`, favicons (32/192/512), `apple-touch-icon.png`, `logo.png`, `llms.txt` → present.
- `charset` / `viewport` → auto-injected by Next.js (default correct).
- `noindex` + sitemap exclusion on legal/dynamic pages → intentional and correct.

---

## Recommended (owner) follow-ups — not code bugs
1. ~~Trim `/iptv-uk` (190) and `/iptv-canada` (222) meta descriptions to ≤160 chars.~~ **DONE** (UK → 158, CA → 153).
2. ~~Confirm or standardize the per-page AggregateRating review counts.~~ **Confirmed intentional by owner (2026-06-06)** — left as-is.
3. Replace the auto-derived `og-image.jpg` with a professionally designed 1200×630 branded card when available. *(code already references it — drop-in replacement, no edits needed)*
4. Set `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` in the **production environment** (VPS `.env` / GitHub secret) to activate Search Console verification. Code wiring is already in place (`app/layout.tsx`).

---

## Verification performed
- `npm run build` — see implementation notes.
- `npm run lint` — see implementation notes.
- `grep -rc "og-image.jpg" app/` → 10 refs, now resolving to a real 1200×630 JPEG.
- JSON-LD blocks parse as valid JSON.
- `git status` scoped to ORCA 4K TV only (no smart4k cross-contamination).
