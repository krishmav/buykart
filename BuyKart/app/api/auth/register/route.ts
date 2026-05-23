import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import UserModel from "@/lib/models/UserModel"
import bcrypt from "bcryptjs"

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json()
    if (!name || !email || !password)
      return NextResponse.json({ message: "All fields are required" }, { status: 400 })

    await dbConnect()
    const exists = await UserModel.findOne({ email })
    if (exists)
      return NextResponse.json({ message: "Email already registered" }, { status: 400 })

    const hashed = bcrypt.hashSync(password, 10)
    const user = await UserModel.create({ name, email, password: hashed })
    return NextResponse.json(
      { _id: user._id.toString(), name: user.name, email: user.email },
      { status: 201 }
    )
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
