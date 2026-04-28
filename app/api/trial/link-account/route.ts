import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  const { token } = await request.json().catch(() => ({}))
  if (!token || typeof token !== 'string' || token.length < 32) {
    return NextResponse.json({ error: 'invalid_token' }, { status: 400 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const admin = createAdminClient()

  const { data: trial } = await admin
    .from('trials')
    .select('id, email')
    .eq('signup_token', token)
    .maybeSingle()

  if (!trial) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  if (trial.email.toLowerCase() !== (user.email || '').toLowerCase()) {
    return NextResponse.json({ error: 'email_mismatch' }, { status: 403 })
  }

  await admin
    .from('trials')
    .update({ auth_user_id: user.id, signup_token: null })
    .eq('id', trial.id)

  return NextResponse.json({ success: true })
}
