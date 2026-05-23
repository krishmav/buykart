import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'
import { paypal } from '@/lib/paypal'

export const dynamic = 'force-dynamic'

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }
  await dbConnect()
  const order = await OrderModel.findById(params.id)
  if (order) {
    try {
      const paypalOrder = await paypal.createOrder(order.totalPrice)
      return Response.json(paypalOrder)
    } catch (err: any) {
      return Response.json({ message: err.message }, { status: 500 })
    }
  }
  return Response.json({ message: 'Order not found' }, { status: 404 })
}
