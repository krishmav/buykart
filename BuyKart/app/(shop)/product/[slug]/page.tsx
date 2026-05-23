import dbConnect from "@/lib/dbConnect"
import ProductModel from "@/lib/models/ProductModel"
import type { Product } from "@/lib/models/ProductModel"
import AddToCart from "@/components/AddToCart"
import { Star, ShieldCheck, Truck } from "lucide-react"
import { notFound } from "next/navigation"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function ProductPage({ params }: { params: { slug: string } }) {
  await dbConnect()
  const product = (await ProductModel.findOne({ slug: params.slug }).lean()) as Product | null
  if (!product) notFound()

  return (
    <div>
      <div className="mb-6">
        <Link href="/" className="text-sm text-indigo-600 hover:underline">← Back to Products</Link>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="card">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-5">
          <div>
            <p className="text-sm text-indigo-600 font-medium uppercase tracking-wide mb-1">{product.category}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-sm text-gray-500">by {product.brand}</p>
          </div>

          <div className="flex items-center gap-2">
            {[1,2,3,4,5].map((s) => (
              <Star
                key={s}
                size={18}
                className={s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}
              />
            ))}
            <span className="text-sm text-gray-600 ml-1">{product.rating} ({product.numReviews} reviews)</span>
          </div>

          <p className="text-3xl font-bold text-gray-900">${product.price.toFixed(2)}</p>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <div className="card p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <span className={product.countInStock > 0 ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
                {product.countInStock > 0 ? `✓ In Stock (${product.countInStock} left)` : "✗ Out of Stock"}
              </span>
            </div>
          </div>

          <AddToCart product={product} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck size={16} className="text-indigo-500" />
              Free shipping over $50
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShieldCheck size={16} className="text-indigo-500" />
              30-day returns
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
