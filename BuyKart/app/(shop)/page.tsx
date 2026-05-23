import dbConnect from "@/lib/dbConnect"
import ProductModel from "@/lib/models/ProductModel"
import type { Product } from "@/lib/models/ProductModel"
import ProductCard from "@/components/ProductCard"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  let products: Product[] = []
  let error = ""

  try {
    await dbConnect()
    products = (await ProductModel.find({}).lean()) as unknown as Product[]
  } catch {
    error = "Failed to load products. Please seed the database first."
  }

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-8 sm:p-12 mb-10 text-white text-center">
        <h1 className="text-3xl sm:text-5xl font-bold mb-3">Welcome to ShopNext</h1>
        <p className="text-indigo-100 text-lg mb-6">Discover the latest fashion & accessories</p>
        <a href="#products" className="inline-block bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-indigo-50 transition-colors">
          Shop Now
        </a>
      </div>

      {/* Products */}
      <div id="products">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
          <span className="text-sm text-gray-500">{products.length} items</span>
        </div>

        {error && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
            <p className="text-amber-800 font-medium mb-3">{error}</p>
            <Link href="/api/products/seed" className="btn-primary inline-block text-sm">
              Seed Database
            </Link>
          </div>
        )}

        {products.length === 0 && !error && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg mb-4">No products found.</p>
            <Link href="/api/products/seed" className="btn-primary inline-block text-sm">
              Seed Database
            </Link>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
