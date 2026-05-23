import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Routes that require the user to be signed in
const protectedPaths = [
  /^\/shipping/,
  /^\/payment/,
  /^\/place-order/,
  /^\/profile/,
  /^\/order\//,
  /^\/admin/,
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only run auth check on protected paths
  if (!protectedPaths.some((p) => p.test(pathname))) {
    return NextResponse.next()
  }

  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET

  // In next-auth v5, tokens are encrypted by default.
  // cookieName tells getToken which cookie to read on http (dev) vs https (prod).
  const secureCookie = request.url.startsWith('https://')
  const cookieName = secureCookie
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token'

  // getToken uses Web Crypto (jose) only — no Node.js deps, safe on Vercel Edge
  const token = await getToken({
    req: request,
    secret,
    cookieName,
    // next-auth v5 encrypts JWTs by default
    salt: cookieName,
  })

  if (!token) {
    const signInUrl = new URL('/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', request.url)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
