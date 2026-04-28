import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  if (!token || token.length < 32) {
    return NextResponse.json({ error: 'invalid_token' }, { status: 400 })
  }

  const admin = createAdminClient()
  const { data: trial } = await admin
    .from('trials')
    .select('email, name, expires_at, duration_hours')
    .eq('signup_token', token)
    .maybeSingle()

  if (!trial) {
    return NextResponse.json({ error: 'not_found' }, { status: 404 })
  }

  return NextResponse.json({
    email: trial.email,
    name: trial.name,
    expires_at: trial.expires_at,
    duration_hours: trial.duration_hours,
  })
}
