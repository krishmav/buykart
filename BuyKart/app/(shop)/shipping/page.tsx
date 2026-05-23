"use client"
import { useState, FormEvent } from "react"
import { useCartStore } from "@/lib/store/cartStore"
import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"

export default function ShippingPage() {
  const { shippingAddress, setShippingAddress } = useCartStore()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const fd = new FormData(e.currentTarget)
    setShippingAddress({
      fullName: fd.get("fullName") as string,
      address: fd.get("address") as string,
      city: fd.get("city") as string,
      postalCode: fd.get("postalCode") as string,
      country: fd.get("country") as string,
    })
    router.push("/place-order")
  }

  return (
    <div className="max-w-lg mx-auto py-4">
      {/* Steps */}
      <div className="flex items-center justify-center gap-2 mb-8 text-sm">
        <span className="flex items-center gap-1.5 text-gray-400"><span className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs flex items-center justify-center font-bold">✓</span>Cart</span>
        <div className="w-8 h-px bg-gray-300" />
        <span className="flex items-center gap-1.5 text-indigo-600 font-semibold"><span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs flex items-center justify-center font-bold">2</span>Shipping</span>
        <div className="w-8 h-px bg-gray-300" />
        <span className="flex items-center gap-1.5 text-gray-400"><span className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs flex items-center justify-center font-bold">3</span>Confirm</span>
      </div>

      <div className="card p-8">
        <div className="flex items-center gap-3 mb-6">
          <MapPin size={22} className="text-indigo-600" />
          <h1 className="text-xl font-bold text-gray-900">Shipping Address</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input name="fullName" required defaultValue={shippingAddress?.fullName || ""} placeholder="John Doe" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Address</label>
            <input name="address" required defaultValue={shippingAddress?.address || ""} placeholder="123 Main St" className="input-field" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">City</label>
              <input name="city" required defaultValue={shippingAddress?.city || ""} placeholder="New York" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Postal Code</label>
              <input name="postalCode" required defaultValue={shippingAddress?.postalCode || ""} placeholder="10001" className="input-field" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Country</label>
            <input name="country" required defaultValue={shippingAddress?.country || ""} placeholder="United States" className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
            {loading ? "Saving..." : "Continue to Review"}
          </button>
        </form>
      </div>
    </div>
  )
}
