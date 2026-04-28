import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}))
  const { token, password, fullName, phone } = body

  if (!token || typeof token !== 'string' || token.length < 32) {
    return NextResponse.json({ error: 'invalid_token' }, { status: 400 })
  }
  if (!password || typeof password !== 'string' || password.length < 8) {
    return NextResponse.json({ error: 'invalid_password' }, { status: 400 })
  }
  if (!fullName || typeof fullName !== 'string' || !fullName.trim()) {
    return NextResponse.json({ error: 'invalid_name' }, { status: 400 })
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

  // Server-side: create the auth user with email pre-confirmed.
  // The signup_token (delivered only to this email) IS the email-ownership proof,
  // so Supabase's confirmation step is redundant for trial activation.
  const { data: created, error: createErr } = await admin.auth.admin.createUser({
    email: trial.email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: fullName.trim(),
      phone: phone?.trim() || null,
    },
  })

  if (createErr || !created?.user) {
    const msg = createErr?.message?.toLowerCase() || ''
    if (msg.includes('already') || msg.includes('exists') || msg.includes('registered')) {
      return NextResponse.json({ error: 'email_exists' }, { status: 409 })
    }
    console.error('Trial register createUser error:', createErr)
    return NextResponse.json({ error: 'create_failed' }, { status: 500 })
  }

  const userId = created.user.id

  // The handle_new_user() trigger creates the profiles row; patch phone since
  // the trigger only carries full_name from raw_user_meta_data.
  await admin
    .from('profiles')
    .update({ phone: phone?.trim() || null, full_name: fullName.trim() })
    .eq('id', userId)

  // Link the trial and burn the token (one-shot)
  await admin
    .from('trials')
    .update({ auth_user_id: userId, signup_token: null })
    .eq('id', trial.id)

  return NextResponse.json({ success: true, user_id: userId })
}
