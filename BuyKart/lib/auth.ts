import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import dbConnect from './dbConnect'
import UserModel from './models/UserModel'

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        await dbConnect()
        if (!credentials) return null
        const user = await UserModel.findOne({ email: credentials.email })
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return {
            id: user._id.toString(),
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
          }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: '/signin',
    newUser: '/register',
    error: '/signin',
  },
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.user = {
          _id: (user as any)._id,
          email: user.email,
          name: user.name,
          isAdmin: (user as any).isAdmin,
        }
      }
      if (trigger === 'update' && session) {
        token.user = {
          ...(token.user as any),
          email: session.user.email,
          name: session.user.name,
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user as any
      }
      return session
    },
  },
}
