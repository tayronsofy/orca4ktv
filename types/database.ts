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
