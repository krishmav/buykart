import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import UserModel from '@/lib/models/UserModel'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || !(session.user as any)?.isAdmin) {
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }
  await dbConnect()
  const users = await UserModel.find()
  return Response.json(users)
}
