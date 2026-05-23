"use client"
import { Suspense } from "react"
import { signIn } from "next-auth/react"
import { useState, FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import toast from "react-hot-toast"
import { LogIn } from "lucide-react"

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    setLoading(true)
    const res = await signIn("credentials", {
      email: fd.get("email"),
      password: fd.get("password"),
      redirect: false,
    })
    setLoading(false)
    if (res?.error) {
      toast.error("Invalid email or password")
    } else {
      toast.success("Welcome back!")
      router.push(callbackUrl)
    }
  }

  return (
    <div className="max-w-md mx-auto py-8">
      <div className="card p-8">
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <LogIn size={22} className="text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
          <p className="text-gray-500 text-sm mt-1">Welcome back to ShopNext</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
            <input name="email" type="email" required placeholder="you@example.com" className="input-field" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
            <input name="password" type="password" required placeholder="••••••••" className="input-field" />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full mt-2">
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p className="text-center text-sm text-gray-600 mt-5">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-indigo-600 hover:underline font-medium">Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 text-gray-500">Loading...</div>}>
      <SignInForm />
    </Suspense>
  )
}