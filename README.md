# Orca 4K TV

Next.js 15 site for [orca4ktv.com](https://orca4ktv.com): marketing pages, blog, IPTV tools, live-match pages, customer dashboard (Supabase Auth), and an admin panel at `/admin`.

## Run locally

```bash
npm install
npm run dev
```

Copy the required variables into `.env.local` (Supabase, Flutterwave, IPTV panel, RapidAPI, Gemini, `ADMIN_SECRET`). SMTP is configured from the admin panel under Settings, with `SMTP_*` env vars as a fallback.

## Deploy

```bash
./deploy.sh "what changed"
```

The script typechecks, rebases on `origin/main`, commits, pushes, and watches the GitHub Actions run. Every push to `main` runs [.github/workflows/deploy.yml](.github/workflows/deploy.yml), which SSHes into the VPS, pulls `main`, runs `npm install && npm run build`, and restarts the `orca4ktv` pm2 process. Environment variables live on the server, not in the repo.

A second workflow, [update-matches.yml](.github/workflows/update-matches.yml), refreshes `data/matches.json` daily at 03:00 UTC and commits it, which also triggers a deploy.

## Content scripts

```bash
npm run regen            # regenerate all content
npm run regen:matches    # fixtures only
npx tsx scripts/export-emails.ts   # customer/trial emails to ./exports (gitignored)
```
