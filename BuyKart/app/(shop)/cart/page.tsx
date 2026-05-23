"use client"
import { useCartStore } from "@/lib/store/cartStore"
import Link from "next/link"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"

export default function CartPage() {
  const { items, removeItem, updateQty } = useCartStore()

  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/" className="btn-primary inline-block">Browse Products</Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.slug} className="card p-4 flex gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 mb-1 truncate">{item.name}</h3>
                <p className="text-indigo-600 font-bold">${item.price.toFixed(2)}</p>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => {
                        if (item.qty <= 1) removeItem(item.slug)
                        else updateQty(item.slug, item.qty - 1)
                      }}
                      className="px-2.5 py-1.5 hover:bg-gray-100"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="px-3 py-1.5 text-sm font-semibold">{item.qty}</span>
                    <button
                      onClick={() => updateQty(item.slug, Math.min(item.countInStock, item.qty + 1))}
                      className="px-2.5 py-1.5 hover:bg-gray-100"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.slug)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="card p-5 h-fit space-y-3">
          <h2 className="font-bold text-lg text-gray-900">Order Summary</h2>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Subtotal ({items.reduce((a, i) => a + i.qty, 0)} items)</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span>{shipping === 0 ? <span className="text-green-600">Free</span> : "$" + shipping.toFixed(2)}</span>
          </div>
          {subtotal < 50 && (
            <p className="text-xs text-gray-400">Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>
          )}
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link href="/shipping" className="btn-primary w-full text-center block mt-2">
            Proceed to Checkout
          </Link>
          <Link href="/" className="btn-outline w-full text-center block text-sm">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
