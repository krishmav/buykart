import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      _id?: string | null
      isAdmin?: boolean
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    _id?: string
    isAdmin?: boolean
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: {
      _id?: string
      email?: string | null
      name?: string | null
      isAdmin?: boolean
    }
  }
}
