import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

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

  if (!protectedPaths.some((p) => p.test(pathname))) {
    return NextResponse.next()
  }

  const secret = (process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET)!
  const secureCookie = request.url.startsWith('https://')
  const cookieName = secureCookie
    ? '__Secure-authjs.session-token'
    : 'authjs.session-token'

  const token = await getToken({
    req: request,
    secret,
    cookieName,
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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
