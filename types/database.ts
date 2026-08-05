export type OrderStatus = 'pending_payment' | 'paid' | 'active' | 'expired' | 'cancelled'
export type InvoiceStatus = 'pending' | 'paid' | 'cancelled'
export type SubscriptionStatus = 'pending' | 'active' | 'expired' | 'suspended' | 'cancelled'

export interface Profile {
  id: string
  full_name: string
  email: string
  phone: string | null
  country: string | null
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  plan_slug: string
  plan_name: string
  connections: number
  amount: number
  status: OrderStatus
  notes: string | null
  created_at: string
  updated_at: string
}

export interface Invoice {
  id: string
  order_id: string
  user_id: string
  invoice_number: string
  amount: number
  status: InvoiceStatus
  payment_link: string | null
  due_date: string | null
  paid_at: string | null
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  order_id: string
  iptv_username: string | null
  iptv_password: string | null
  m3u_url: string | null
  portal_url: string | null
  mac_addresses: string[] | null
  connections: number
  start_date: string | null
  end_date: string | null
  status: SubscriptionStatus
  panel_user_id: string | null
  created_at: string
  updated_at: string
}

// Joined types used in the admin panel
export interface OrderWithProfile extends Order {
  profiles: Profile
}

export interface OrderDetail extends Order {
  profiles: Profile
  invoices: Invoice[]
  subscriptions: Subscription[]
}

export interface ClientDetail extends Profile {
  orders: OrderWithSubscription[]
}

export interface OrderWithSubscription extends Order {
  invoices: Invoice[]
  subscriptions: Subscription[]
}

// ── Admin rebuild tables ─────────────────────────────────────

export interface SmtpSettings {
  id: number
  host: string | null
  port: number | null
  secure: boolean | null
  smtp_user: string | null
  smtp_pass: string | null
  from_name: string | null
  from_email: string | null
  reply_to: string | null
  admin_email: string | null
  updated_at: string
}

export interface SeoMeta {
  page_key: string
  meta_title: string | null
  meta_description: string | null
  canonical_url: string | null
  noindex: boolean | null
  nofollow: boolean | null
  og_title: string | null
  og_description: string | null
  og_image_url: string | null
  twitter_title: string | null
  twitter_description: string | null
  twitter_image_url: string | null
  focus_keyword: string | null
  schema_breadcrumb: boolean | null
  schema_faq: boolean | null
  updated_at: string
}

export interface SeoSettings {
  id: number
  title_template: string | null
  default_og_image: string | null
  social_same_as: string[] | null
  google_verification: string | null
  bing_verification: string | null
  robots_extra_lines: string | null
  sitemap_exclusions: string[] | null
  default_blog_schema_type: string | null
  updated_at: string
}

export interface SeoRedirect {
  id: string
  from_path: string
  to_path: string | null
  status_code: 301 | 302 | 410
  enabled: boolean
  note: string | null
  created_at: string
  updated_at: string
}
