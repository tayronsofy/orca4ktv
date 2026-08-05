import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendAdminNewTrialAlert } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, device, country, message } = body

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !device?.trim() || !country?.trim()) {
      return NextResponse.json({ error: 'validation', message: 'Name, email, device, and country are required.' }, { status: 400 })
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'validation', message: 'Please enter a valid email address.' }, { status: 400 })
    }

    const admin = createAdminClient()

    const customerIp =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      null

    const normalizedEmail = email.trim().toLowerCase()
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    let duplicateQuery = admin
      .from('trials')
      .select('id')
      .gte('created_at', sevenDaysAgo)
      .neq('status', 'rejected')

    duplicateQuery = customerIp
      ? duplicateQuery.or(`email.eq.${normalizedEmail},customer_ip.eq.${customerIp}`)
      : duplicateQuery.eq('email', normalizedEmail)

    const { data: existing } = await duplicateQuery.limit(1)
    if (existing && existing.length > 0) {
      return NextResponse.json({ error: 'already_submitted' }, { status: 409 })
    }

    // Insert trial request
    const { data: trial, error: insertError } = await admin
      .from('trials')
      .insert({
        name: name.trim(),
        email: normalizedEmail,
        device: device.trim(),
        country: country.trim(),
        message: message?.trim() || null,
        status: 'pending',
        customer_ip: customerIp,
      })
      .select('id')
      .single()

    if (insertError || !trial) {
      console.error('Trial insert error:', insertError)
      return NextResponse.json({ error: 'server_error' }, { status: 500 })
    }

    // Notify admin (fire-and-forget)
    sendAdminNewTrialAlert({
      name: name.trim(),
      email: email.trim(),
      device: device.trim(),
      country: country.trim(),
      trialId: trial.id,
    }).catch(console.error)

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Trial submission error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
