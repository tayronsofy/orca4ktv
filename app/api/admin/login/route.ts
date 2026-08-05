import { NextResponse } from 'next/server'
import { ADMIN_COOKIE, constantTimeCompare, hashSecret, jsonError } from '@/lib/admin/auth'

export async function POST(request: Request) {
  let password = ''
  try {
    const body = await request.json()
    password = typeof body?.password === 'string' ? body.password : ''
  } catch {
    return jsonError('bad_request', 400)
  }

  const adminPassword = process.env.ADMIN_PASSWORD
  const adminSecret = process.env.ADMIN_SECRET

  if (!adminPassword || !adminSecret) {
    return jsonError('panel_not_configured', 500, 'ADMIN_PASSWORD / ADMIN_SECRET missing')
  }

  if (!constantTimeCompare(password, adminPassword)) {
    return jsonError('unauthorized', 401)
  }

  const response = NextResponse.json({ success: true })
  response.cookies.set(ADMIN_COOKIE, hashSecret(adminSecret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24, // 24 hours
    path: '/',
  })
  return response
}
