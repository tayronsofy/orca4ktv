import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/dashboard'
  const trialToken = searchParams.get('trial')

  if (code) {
    const supabase = await createClient()
    await supabase.auth.exchangeCodeForSession(code)

    // If completing a trial activation, link the trial to the new auth user
    if (trialToken && trialToken.length >= 32) {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const admin = createAdminClient()
        const { data: trial } = await admin
          .from('trials')
          .select('id, email')
          .eq('signup_token', trialToken)
          .maybeSingle()

        if (trial && trial.email.toLowerCase() === (user.email || '').toLowerCase()) {
          await admin
            .from('trials')
            .update({ auth_user_id: user.id, signup_token: null })
            .eq('id', trial.id)
        }
      }
    }
  }

  return NextResponse.redirect(`${origin}${next}`)
}
