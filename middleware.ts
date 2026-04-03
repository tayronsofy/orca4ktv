import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // /admin itself is the login page — allow through
  if (pathname === '/admin') return NextResponse.next()

  const token = request.cookies.get('admin_token')?.value
  const expectedToken = process.env.ADMIN_SECRET

  if (!token || !expectedToken || token !== expectedToken) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }

  return NextResponse.next()
}

export const config = {
  // Matches /admin/anything but NOT /admin itself
  matcher: ['/admin/:path+'],
}
