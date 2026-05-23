"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import Link from "next/link"
import { Package, ChevronRight } from "lucide-react"

export default function OrdersPage() {
  const { status } = useSession({ required: true })
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/orders")
        .then((r) => r.json())
        .then((d) => { setOrders(Array.isArray(d) ? d : []); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [status])

  if (status === "loading" || loading)
    return <div className="text-center py-20 text-gray-500">Loading orders...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-20">
          <Package size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
          <p className="text-gray-500 mb-6">Start shopping to see your orders here.</p>
          <Link href="/" className="btn-primary inline-block">Browse Products</Link>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => {
            const date = new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric", month: "short", day: "numeric"
            })
            return (
              <Link
                key={order._id}
                href={"/order/" + order._id}
                className="card p-5 flex items-center gap-4 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Package size={20} className="text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{date} · {order.items.length} item{order.items.length !== 1 ? "s" : ""}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-bold text-gray-900">${order.totalPrice.toFixed(2)}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full mt-1 inline-block ${
                    order.isDelivered ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>
                </div>
                <ChevronRight size={18} className="text-gray-400" />
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
