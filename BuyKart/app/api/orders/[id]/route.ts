import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/dbConnect"
import OrderModel from "@/lib/models/OrderModel"
import UserModel from "@/lib/models/UserModel"

export const dynamic = "force-dynamic"

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email)
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

    await dbConnect()
    const user = await UserModel.findOne({ email: session.user.email })
    const order = await OrderModel.findById(params.id).lean()

    if (!order)
      return NextResponse.json({ message: "Order not found" }, { status: 404 })

    if (order.user.toString() !== user._id.toString())
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })

    return NextResponse.json(order)
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
