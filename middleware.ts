import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only run middleware logic for /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://uslrcbibqannepcttoqc.supabase.co'
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({
          request,
        })
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        )
      },
    },
  })

  // Get user session from Supabase auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Also check local demo auth cookie for smooth client evaluation if offline or mock admin login
  const hasLocalAdminCookie = request.cookies.get('kuch_admin_session')?.value === 'true'
  const isAuthenticated = !!user || hasLocalAdminCookie

  const isLoginPage = pathname === '/admin/login'

  // If user visits /admin root directly, redirect to /admin/team or /admin/login
  if (pathname === '/admin') {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/team', request.url))
    } else {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  // Protected admin routes: redirect unauthenticated users to /admin/login
  if (!isLoginPage && !isAuthenticated) {
    const loginUrl = new URL('/admin/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  // Already authenticated user visiting /admin/login: redirect to /admin/team
  if (isLoginPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/team', request.url))
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*'],
}
