import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import OrderModel from '@/lib/models/OrderModel'

export const dynamic = 'force-dynamic'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || !(session.user as any)?.isAdmin) {
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }
  try {
    await dbConnect()
    const order = await OrderModel.findById(params.id)
    if (order) {
      if (!order.isPaid) return Response.json({ message: 'Order is not paid' }, { status: 400 })
      order.isDelivered = true
      order.deliveredAt = Date.now()
      const updatedOrder = await order.save()
      return Response.json(updatedOrder)
    }
    return Response.json({ message: 'Order not found' }, { status: 404 })
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 })
  }
}
