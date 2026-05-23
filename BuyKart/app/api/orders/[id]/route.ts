import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'

export const dynamic = 'force-dynamic'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }
  await dbConnect()
  const order = await OrderModel.findById(params.id)
  return Response.json(order)
}
