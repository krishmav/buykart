import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'

export const dynamic = 'force-dynamic'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }
  const user = session.user as any
  await dbConnect()
  const orders = await OrderModel.find({ user: user._id })
  return Response.json(orders)
}
