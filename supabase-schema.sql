-- ============================================================
-- ORCA 4K TV IPTV — Supabase Schema
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)
-- ============================================================

-- 1. PROFILES (linked to auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id          UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name   TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  country     TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 2. ORDERS
CREATE TABLE IF NOT EXISTS orders (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  plan_slug   TEXT NOT NULL,
  plan_name   TEXT NOT NULL,
  connections INT  NOT NULL DEFAULT 1,
  amount      DECIMAL(10,2) NOT NULL,
  status      TEXT NOT NULL DEFAULT 'pending_payment'
                CONSTRAINT orders_status CHECK (
                  status IN ('pending_payment','paid','active','expired','cancelled')
                ),
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 3. INVOICES
CREATE TABLE IF NOT EXISTS invoices (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id        UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  invoice_number  TEXT UNIQUE NOT NULL,
  amount          DECIMAL(10,2) NOT NULL,
  status          TEXT NOT NULL DEFAULT 'pending'
                    CONSTRAINT invoices_status CHECK (
                      status IN ('pending','paid','cancelled')
                    ),
  payment_link    TEXT,
  due_date        DATE,
  paid_at         TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 4. SUBSCRIPTIONS (IPTV credentials)
CREATE TABLE IF NOT EXISTS subscriptions (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id         UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  order_id        UUID REFERENCES orders(id) ON DELETE CASCADE NOT NULL,
  iptv_username   TEXT,
  iptv_password   TEXT,
  m3u_url         TEXT,
  portal_url      TEXT,
  mac_addresses   TEXT[],
  connections     INT NOT NULL DEFAULT 1,
  start_date      DATE,
  end_date        DATE,
  status          TEXT NOT NULL DEFAULT 'pending'
                    CONSTRAINT subscriptions_status CHECK (
                      status IN ('pending','active','expired','suspended','cancelled')
                    ),
  panel_user_id   TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- INDEXES (performance for 2000+ clients)
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_orders_user_id   ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status    ON orders(status);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_order_id ON invoices(order_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id  ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_end_date ON subscriptions(end_date);
CREATE INDEX IF NOT EXISTS idx_profiles_email   ON profiles(email);

-- ============================================================
-- ROW LEVEL SECURITY (customers only see their own data)
-- ============================================================
ALTER TABLE profiles      ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders        ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices      ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Profiles: user can read/update only their own row
DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_select_own" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Orders: user can read their own, insert their own
DROP POLICY IF EXISTS "orders_select_own" ON orders;
DROP POLICY IF EXISTS "orders_insert_own" ON orders;
CREATE POLICY "orders_select_own"   ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "orders_insert_own"   ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Invoices: user can read their own
DROP POLICY IF EXISTS "invoices_select_own" ON invoices;
CREATE POLICY "invoices_select_own" ON invoices FOR SELECT USING (auth.uid() = user_id);

-- Subscriptions: user can read their own
DROP POLICY IF EXISTS "subscriptions_select_own" ON subscriptions;
CREATE POLICY "subscriptions_select_own" ON subscriptions FOR SELECT USING (auth.uid() = user_id);

-- ============================================================
-- AUTO-CREATE PROFILE on signup trigger
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- AUTO-UPDATE updated_at trigger
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE OR REPLACE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
