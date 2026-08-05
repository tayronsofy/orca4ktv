-- ============================================================
-- ADMIN PANEL REBUILD MIGRATION — run in the Supabase SQL editor
-- Idempotent: safe to run multiple times, safe on the live DB
-- where trials/trial_accounts already exist out-of-band.
-- Run this BEFORE deploying the admin rebuild code.
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. TRIALS — full DDL (live DB already has it; guard makes
--    this file self-sufficient on a fresh database too)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL,
  device TEXT,
  country TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','sent','rejected')),
  iptv_username TEXT,
  iptv_password TEXT,
  m3u_url TEXT,
  portal_url TEXT,
  duration_hours INT,
  sent_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE trials
  ADD COLUMN IF NOT EXISTS auth_user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS signup_token TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS customer_ip TEXT;

CREATE INDEX IF NOT EXISTS idx_trials_signup_token ON trials(signup_token);
CREATE INDEX IF NOT EXISTS idx_trials_auth_user_id ON trials(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_trials_customer_ip_created_at ON trials(customer_ip, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_trials_email_created_at ON trials(email, created_at DESC);

ALTER TABLE trials ENABLE ROW LEVEL SECURITY;
-- zero policies: service-role only

-- ─────────────────────────────────────────────────────────────
-- 2. TRIAL ACCOUNTS POOL — full DDL (previously undocumented)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS trial_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL DEFAULT '',
  iptv_username TEXT NOT NULL,
  iptv_password TEXT NOT NULL,
  m3u_url TEXT NOT NULL,
  portal_url TEXT,
  status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available','in_use','disabled')),
  assigned_trial_id UUID REFERENCES trials(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_trial_accounts_status ON trial_accounts(status);

ALTER TABLE trial_accounts ENABLE ROW LEVEL SECURITY;
-- zero policies: service-role only

-- ─────────────────────────────────────────────────────────────
-- 3. POSTS — blog moves from data/posts.json to the database
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  summary TEXT,
  content TEXT NOT NULL DEFAULT '',
  content_format TEXT NOT NULL DEFAULT 'html' CHECK (content_format IN ('markdown','html')),
  category TEXT NOT NULL DEFAULT 'Guides',
  author TEXT NOT NULL DEFAULT '',
  author_role TEXT,
  date TEXT NOT NULL DEFAULT '',           -- display string ("January 5, 2026") — matches existing render code
  date_modified TEXT,
  read_time TEXT NOT NULL DEFAULT '5 min read',
  image_url TEXT,
  image_alt TEXT,
  seo_keywords TEXT,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','published')),
  faqs JSONB,
  sort_order INT NOT NULL DEFAULT 0,       -- preserves posts.json array order (0 = newest)
  -- per-post SEO overrides
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  og_image_url TEXT,
  noindex BOOLEAN NOT NULL DEFAULT false,
  focus_keyword TEXT,
  schema_type TEXT CHECK (schema_type IS NULL OR schema_type IN ('Article','NewsArticle','BlogPosting')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_posts_status ON posts(status);
CREATE INDEX IF NOT EXISTS idx_posts_sort ON posts(sort_order ASC, created_at DESC);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS posts_public_read ON posts;
CREATE POLICY posts_public_read ON posts FOR SELECT USING (status = 'published');
-- writes: service role only (no insert/update/delete policies)

CREATE OR REPLACE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────────────────────────
-- 4. SMTP SETTINGS — singleton, service-role only (stores a password)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS smtp_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  host TEXT,
  port INT DEFAULT 465,
  secure BOOLEAN DEFAULT true,
  smtp_user TEXT,
  smtp_pass TEXT,
  from_name TEXT,
  from_email TEXT,
  reply_to TEXT,
  admin_email TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO smtp_settings (id, host, port, secure, smtp_user, from_name, from_email, reply_to)
VALUES (1, 'smtp.hostinger.com', 465, true, 'support@orca4ktv.com', 'Orca 4K TV', 'support@orca4ktv.com', 'support@orca4ktv.com')
ON CONFLICT (id) DO NOTHING;

ALTER TABLE smtp_settings ENABLE ROW LEVEL SECURITY;
-- ZERO policies: service-role only. Never add a public policy here.

CREATE OR REPLACE TRIGGER smtp_settings_updated_at
  BEFORE UPDATE ON smtp_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────────────────────────
-- 5. SEO TABLES — public SELECT (site renders from them), writes service-role
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS seo_meta (
  page_key TEXT PRIMARY KEY,
  meta_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  noindex BOOLEAN,
  nofollow BOOLEAN,
  og_title TEXT,
  og_description TEXT,
  og_image_url TEXT,
  twitter_title TEXT,
  twitter_description TEXT,
  twitter_image_url TEXT,
  focus_keyword TEXT,
  schema_breadcrumb BOOLEAN,
  schema_faq BOOLEAN,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
-- all nullable: NULL column = fall back to the hardcoded value in code

ALTER TABLE seo_meta ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS seo_meta_public_read ON seo_meta;
CREATE POLICY seo_meta_public_read ON seo_meta FOR SELECT USING (true);

CREATE OR REPLACE TRIGGER seo_meta_updated_at
  BEFORE UPDATE ON seo_meta
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS seo_settings (
  id INT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  title_template TEXT,                     -- e.g. '%s · ORCA 4K TV'
  default_og_image TEXT,
  social_same_as JSONB,                    -- array of profile URLs
  google_verification TEXT,
  bing_verification TEXT,
  robots_extra_lines TEXT,
  sitemap_exclusions JSONB,                -- array of paths
  default_blog_schema_type TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO seo_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

ALTER TABLE seo_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS seo_settings_public_read ON seo_settings;
CREATE POLICY seo_settings_public_read ON seo_settings FOR SELECT USING (true);

CREATE OR REPLACE TRIGGER seo_settings_updated_at
  BEFORE UPDATE ON seo_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE IF NOT EXISTS seo_redirects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_path TEXT NOT NULL UNIQUE,          -- normalized: lowercase, no trailing slash
  to_path TEXT,                            -- NULL when status_code = 410
  status_code INT NOT NULL DEFAULT 301 CHECK (status_code IN (301, 302, 410)),
  enabled BOOLEAN NOT NULL DEFAULT true,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_seo_redirects_enabled ON seo_redirects(enabled) WHERE enabled = true;

ALTER TABLE seo_redirects ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS seo_redirects_public_read ON seo_redirects;
CREATE POLICY seo_redirects_public_read ON seo_redirects FOR SELECT USING (enabled = true);

CREATE OR REPLACE TRIGGER seo_redirects_updated_at
  BEFORE UPDATE ON seo_redirects
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ─────────────────────────────────────────────────────────────
-- 6. STORAGE — public bucket for blog/OG images
-- ─────────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;
-- public bucket => public read URLs; uploads go through the admin
-- upload route using the service role (bypasses storage RLS).
