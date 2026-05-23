"use client"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useCartStore } from "@/lib/store/cartStore"
import { useEffect, useState } from "react"
import { ShoppingCart, User, LogOut, Package } from "lucide-react"

export default function Header() {
  const { data: session } = useSession()
  const items = useCartStore((s) => s.items)
  const [mounted, setMounted] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => setMounted(true), [])

  const cartCount = mounted ? items.reduce((a, i) => a + i.qty, 0) : 0

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-indigo-600 tracking-tight">
            ShopNext
          </Link>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-1.5 text-gray-700 hover:text-indigo-600 transition-colors p-2"
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-indigo-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
              <span className="hidden sm:inline text-sm font-medium">Cart</span>
            </Link>

            {/* Auth */}
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors p-2"
                >
                  <User size={20} />
                  <span className="hidden sm:inline max-w-[120px] truncate">
                    {session.user?.name}
                  </span>
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-50">
                    <Link
                      href="/orders"
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuOpen(false)}
                    >
                      <Package size={16} />
                      My Orders
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={() => { signOut({ callbackUrl: "/" }); setMenuOpen(false) }}
                      className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                href="/signin"
                className="btn-primary text-sm py-2 px-4"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
