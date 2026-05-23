import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import ProductModel from '@/lib/models/ProductModel'

export const dynamic = 'force-dynamic'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || !(session.user as any)?.isAdmin) {
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }
  await dbConnect()
  const product = await ProductModel.findById(params.id)
  if (!product) return Response.json({ message: 'product not found' }, { status: 404 })
  return Response.json(product)
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || !(session.user as any)?.isAdmin) {
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }
  const { name, slug, price, category, image, brand, countInStock, description } = await req.json()
  try {
    await dbConnect()
    const product = await ProductModel.findById(params.id)
    if (product) {
      product.name = name
      product.slug = slug
      product.price = price
      product.category = category
      product.image = image
      product.brand = brand
      product.countInStock = countInStock
      product.description = description
      const updatedProduct = await product.save()
      return Response.json(updatedProduct)
    }
    return Response.json({ message: 'Product not found' }, { status: 404 })
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session || !(session.user as any)?.isAdmin) {
    return Response.json({ message: 'unauthorized' }, { status: 401 })
  }
  try {
    await dbConnect()
    const product = await ProductModel.findById(params.id)
    if (product) {
      await product.deleteOne()
      return Response.json({ message: 'Product deleted successfully' })
    }
    return Response.json({ message: 'Product not found' }, { status: 404 })
  } catch (err: any) {
    return Response.json({ message: err.message }, { status: 500 })
  }
}
