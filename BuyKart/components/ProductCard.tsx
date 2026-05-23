import Link from "next/link"
import { Star } from "lucide-react"
import type { Product } from "@/lib/models/ProductModel"

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={"/product/" + product.slug} className="card group hover:shadow-md transition-shadow duration-200">
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4">
        <p className="text-xs text-indigo-600 font-medium uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-1 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-3">
          {[1,2,3,4,5].map((s) => (
            <Star
              key={s}
              size={13}
              className={s <= Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200 fill-gray-200"}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1">({product.numReviews})</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          {product.countInStock === 0 ? (
            <span className="text-xs text-red-500 font-medium">Out of stock</span>
          ) : (
            <span className="text-xs text-green-600 font-medium">In stock</span>
          )}
        </div>
      </div>
    </Link>
  )
}
