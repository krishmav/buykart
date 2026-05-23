"use client"
import { useCartStore } from "@/lib/store/cartStore"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useState } from "react"
import Link from "next/link"
import toast from "react-hot-toast"
import { CheckCircle } from "lucide-react"

export default function PlaceOrderPage() {
  const { items, shippingAddress, clearCart } = useCartStore()
  const { status } = useSession({ required: true })
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  if (status === "loading") return <div className="text-center py-20 text-gray-500">Loading...</div>

  if (!shippingAddress) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-4">No shipping address found.</p>
        <Link href="/shipping" className="btn-primary inline-block">Add Shipping Address</Link>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-600 mb-4">Your cart is empty.</p>
        <Link href="/" className="btn-primary inline-block">Browse Products</Link>
      </div>
    )
  }

  const subtotal = items.reduce((a, i) => a + i.price * i.qty, 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal + shipping

  const handlePlaceOrder = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items,
          shippingAddress,
          paymentMethod: "Cash on Delivery",
          itemsPrice: subtotal,
          shippingPrice: shipping,
          totalPrice: total,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message)
      clearCart()
      toast.success("Order placed successfully!")
      router.push("/order/" + data._id)
    } catch (err: any) {
      toast.error(err.message || "Failed to place order")
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-4">
      {/* Steps */}
      <div className="flex items-center justify-center gap-2 mb-8 text-sm">
        <span className="flex items-center gap-1.5 text-gray-400"><span className="w-6 h-6 rounded-full bg-gray-200 text-xs flex items-center justify-center font-bold text-gray-500">✓</span>Cart</span>
        <div className="w-8 h-px bg-gray-300" />
        <span className="flex items-center gap-1.5 text-gray-400"><span className="w-6 h-6 rounded-full bg-gray-200 text-xs flex items-center justify-center font-bold text-gray-500">✓</span>Shipping</span>
        <div className="w-8 h-px bg-gray-300" />
        <span className="flex items-center gap-1.5 text-indigo-600 font-semibold"><span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">3</span>Confirm</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {/* Shipping */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900">Shipping Address</h2>
              <Link href="/shipping" className="text-indigo-600 text-sm hover:underline">Edit</Link>
            </div>
            <div className="text-sm text-gray-600 space-y-0.5">
              <p className="font-medium text-gray-800">{shippingAddress.fullName}</p>
              <p>{shippingAddress.address}</p>
              <p>{shippingAddress.city}, {shippingAddress.postalCode}</p>
              <p>{shippingAddress.country}</p>
            </div>
          </div>

          {/* Payment */}
          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-2">Payment Method</h2>
            <p className="text-sm text-gray-600">💵 Cash on Delivery</p>
          </div>

          {/* Items */}
          <div className="card p-5">
            <h2 className="font-bold text-gray-900 mb-4">Order Items</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.slug} className="flex items-center gap-3">
                  <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                  </div>
                  <p className="font-semibold text-gray-900">${(item.price * item.qty).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="card p-5 h-fit space-y-3">
          <h2 className="font-bold text-lg text-gray-900">Order Total</h2>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Items</span><span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600">
            <span>Shipping</span>
            <span>{shipping === 0 ? <span className="text-green-600">Free</span> : "$" + shipping.toFixed(2)}</span>
          </div>
          <hr />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span><span>${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center gap-2"
          >
            <CheckCircle size={18} />
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  )
}
