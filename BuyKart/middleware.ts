export { default } from 'next-auth/middleware'

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
