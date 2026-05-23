"use client"
import { useState, FormEvent } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { UserPlus } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = fd.get("name") as string
    const email = fd.get("email") as string
    const password = fd.get("password") as string
    const confirm = fd.get("confirm") as string

    if (password !== confirm) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()

    if (!res.ok) {
      setLoading(false)
      toast.error(data.message || "Registration failed")
      return
    }

    await signIn("credentials", { email, password, redirect: false })
    toast.success("Account created! Welcome to ShopNext.")
    router.push("/")
    setLoading(false)
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="card p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <UserPlus size={22} className="text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-gray-500 text-sm mt-1">Join ShopNext today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
            <input name="name" type="text" required placeholder="John Doe" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input name="email" type="email" required placeholder="you@example.com" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input name="password" type="password" required placeholder="Min 8 characters" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
            <input name="confirm" type="password" required placeholder="••••••••" className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?{" "}
          <Link href="/signin" className="text-indigo-600 hover:underline font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  )
}
