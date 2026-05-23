"use client"
import { useState } from "react"
import { useCartStore } from "@/lib/store/cartStore"
import { ShoppingCart, Plus, Minus } from "lucide-react"
import toast from "react-hot-toast"
import type { Product } from "@/lib/models/ProductModel"

export default function AddToCart({ product }: { product: Product }) {
  const [qty, setQty] = useState(1)
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = () => {
    addItem({
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      qty,
      countInStock: product.countInStock,
    })
    toast.success(`${product.name} added to cart!`)
  }

  if (product.countInStock === 0) {
    return (
      <button disabled className="btn-primary w-full opacity-50 cursor-not-allowed">
        Out of Stock
      </button>
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">Quantity:</span>
        <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="px-4 py-2 font-semibold text-sm">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(product.countInStock, q + 1))}
            className="px-3 py-2 hover:bg-gray-100 transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      <button onClick={handleAdd} className="btn-primary w-full flex items-center justify-center gap-2">
        <ShoppingCart size={18} />
        Add to Cart
      </button>
    </div>
  )
}
