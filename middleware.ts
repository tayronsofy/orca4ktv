import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Edge runtime: SHA-256 via Web Crypto (node:crypto is unavailable here).
async function sha256Hex(input: string): Promise<string> {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input))
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // ── Admin routes (cookie = SHA-256 hex of ADMIN_SECRET) ─────
  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('admin_token')?.value
    const secret = process.env.ADMIN_SECRET
    const authed = !!token && !!secret && token === (await sha256Hex(secret))

    // /admin is the login page — bounce straight to the dashboard when already authed
    if (pathname === '/admin') {
      return authed
        ? NextResponse.redirect(new URL('/admin/dashboard', request.url))
        : NextResponse.next()
    }

    if (!authed) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }

    return NextResponse.next()
  }

  // ── Dashboard routes (Supabase Auth) ────────────────────────
  if (pathname.startsWith('/dashboard')) {
    let response = NextResponse.next({ request })

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('next', pathname)
      return NextResponse.redirect(loginUrl)
    }

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'],
}
