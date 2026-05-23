import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'

// This file is intentionally minimal — no mongoose, no bcrypt.
// It is ONLY used by middleware which runs on the Edge runtime.
// The full auth (with DB access) lives in lib/auth.ts.
const edgeConfig = {
  trustHost: true,
  // next-auth v5 prefers AUTH_SECRET; fall back to NEXTAUTH_SECRET for compatibility
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
  providers: [],
  callbacks: {
    authorized({ request, auth }: any) {
      const protectedPaths = [
        /\/shipping/,
        /\/payment/,
        /\/place-order/,
        /\/profile/,
        /\/order\/(.*)/,
        /\/admin/,
      ]
      const { pathname } = request.nextUrl
      if (protectedPaths.some((p) => p.test(pathname))) return !!auth
      return true
    },
  },
} satisfies NextAuthConfig

export const { auth } = NextAuth(edgeConfig)
