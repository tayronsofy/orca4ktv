import { createClient } from '@supabase/supabase-js'

// Service-role client - bypasses RLS. NEVER expose to browser.
// Use only in API routes and server actions.
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
