import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (!token) {
    const signInUrl = new URL('/signin', req.url)
    signInUrl.searchParams.set('callbackUrl', req.url)
    return NextResponse.redirect(signInUrl)
  }

  // Admin routes require isAdmin flag
  if (
    req.nextUrl.pathname.startsWith('/admin') &&
    !(token.user as any)?.isAdmin
  ) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/shipping',
    '/payment',
    '/place-order',
    '/profile',
    '/order/:path*',
    '/admin/:path*',
  ],
}
