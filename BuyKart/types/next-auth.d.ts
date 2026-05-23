import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      _id?: string
      isAdmin?: boolean
    } & DefaultSession["user"]
  }
  interface User {
    _id?: string
    isAdmin?: boolean
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user?: {
      _id?: string
      name?: string | null
      email?: string | null
      isAdmin?: boolean
    }
  }
}
