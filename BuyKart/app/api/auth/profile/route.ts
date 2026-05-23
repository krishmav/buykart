import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'
import bcrypt from 'bcryptjs'

export const dynamic = 'force-dynamic'

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ message: 'Not authenticated' }, { status: 401 })
  }
  const { user } = session
  const { name, email, password } = await req.json()
  await dbConnect()
  try {
    const dbUser = await UserModel.findById((user as any)._id)
    if (!dbUser) {
      return Response.json({ message: 'User not found' }, { status: 404 })
    }
    dbUser.name = name
    dbUser.email = email
    dbUser.password = password ? await bcrypt.hash(password, 5) : dbUser.password
    await dbUser.save()
    return Response.json({ message: 'User has been updated' })
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 })
  }
}
