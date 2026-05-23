"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { CheckCircle, Clock, Package, Truck, MapPin } from "lucide-react"

export default function OrderPage({ params }: { params: { id: string } }) {
  const { status } = useSession({ required: true })
  const [order, setOrder] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/orders/" + params.id)
        .then((r) => r.json())
        .then((d) => { setOrder(d); setLoading(false) })
        .catch(() => { setError("Failed to load order"); setLoading(false) })
    }
  }, [status, params.id])

  if (status === "loading" || loading)
    return <div className="text-center py-20 text-gray-500">Loading order...</div>
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>
  if (!order)
    return <div className="text-center py-20 text-gray-500">Order not found.</div>

  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric"
  })

  return (
    <div className="max-w-3xl mx-auto py-4">
      {/* Success Banner */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 flex items-center gap-4 mb-6">
        <CheckCircle size={40} className="text-green-500 flex-shrink-0" />
        <div>
          <h1 className="text-xl font-bold text-green-800">Order Confirmed!</h1>
          <p className="text-green-700 text-sm mt-0.5">
            Order <span className="font-mono font-semibold">#{order._id.slice(-8).toUpperCase()}</span> placed on {date}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Status */}
        <div className="card p-5 grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.isPaid ? "bg-green-100" : "bg-amber-100"}`}>
              {order.isPaid ? <CheckCircle size={20} className="text-green-600" /> : <Clock size={20} className="text-amber-600" />}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Payment</p>
              <p className={`font-semibold text-sm ${order.isPaid ? "text-green-600" : "text-amber-600"}`}>
                {order.isPaid ? "Paid" : "Pending (COD)"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${order.isDelivered ? "bg-green-100" : "bg-blue-100"}`}>
              {order.isDelivered ? <CheckCircle size={20} className="text-green-600" /> : <Truck size={20} className="text-blue-600" />}
            </div>
            <div>
              <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Delivery</p>
              <p className={`font-semibold text-sm ${order.isDelivered ? "text-green-600" : "text-blue-600"}`}>
                {order.isDelivered ? "Delivered" : "In Progress"}
              </p>
            </div>
          </div>
        </div>

        {/* Shipping */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={18} className="text-indigo-600" />
            <h2 className="font-bold text-gray-900">Shipping Address</h2>
          </div>
          <div className="text-sm text-gray-600 space-y-0.5">
            <p className="font-medium text-gray-800">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.address}</p>
            <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        {/* Items */}
        <div className="card p-5">
          <div className="flex items-center gap-2 mb-4">
            <Package size={18} className="text-indigo-600" />
            <h2 className="font-bold text-gray-900">Items Ordered</h2>
          </div>
          <div className="space-y-3">
            {order.items.map((item: any, i: number) => (
              <div key={i} className="flex items-center gap-3">
                <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">{item.name}</p>
                  <p className="text-xs text-gray-500">Qty: {item.qty} × ${item.price.toFixed(2)}</p>
                </div>
                <p className="font-semibold text-gray-900 text-sm">${(item.price * item.qty).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between text-gray-600"><span>Items</span><span>${order.itemsPrice.toFixed(2)}</span></div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{order.shippingPrice === 0 ? <span className="text-green-600">Free</span> : "$" + order.shippingPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base text-gray-900 pt-1">
              <span>Total</span><span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6">
        <Link href="/orders" className="btn-outline flex-1 text-center text-sm">My Orders</Link>
        <Link href="/" className="btn-primary flex-1 text-center text-sm">Continue Shopping</Link>
      </div>
    </div>
  )
}
