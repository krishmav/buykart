import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import dbConnect from "@/lib/dbConnect"
import OrderModel from "@/lib/models/OrderModel"
import UserModel from "@/lib/models/UserModel"

export const dynamic = "force-dynamic"

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email)
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

    await dbConnect()
    const user = await UserModel.findOne({ email: session.user.email })
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 })

    const body = await req.json()
    const order = new OrderModel({ ...body, user: user._id })
    const saved = await order.save()
    return NextResponse.json({ _id: saved._id.toString() }, { status: 201 })
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email)
      return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

    await dbConnect()
    const user = await UserModel.findOne({ email: session.user.email })
    const orders = await OrderModel.find({ user: user._id })
      .sort({ createdAt: -1 })
      .lean()
    return NextResponse.json(orders)
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
