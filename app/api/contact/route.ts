import { NextRequest, NextResponse } from 'next/server'
import { sendAdminNewContactAlert } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'validation', message: 'Name, email, subject, and message are required.' },
        { status: 400 }
      )
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'validation', message: 'Please enter a valid email address.' },
        { status: 400 }
      )
    }

    // Send the contact email alert to admin
    const res = await sendAdminNewContactAlert({
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    })
    if (!res.ok) {
      return NextResponse.json({ error: 'email_failed' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Contact submission error:', err)
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}
