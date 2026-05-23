import dbConnect from "@/lib/dbConnect"
import ProductModel from "@/lib/models/ProductModel"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    await dbConnect()
    const products = await ProductModel.find({}).lean()
    return NextResponse.json(products)
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 500 })
  }
}
