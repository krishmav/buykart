/* eslint-disable @next/next/no-img-element */
import ProductCard from './ProductCard'
import data from '@/lib/data'
import productService from '@/lib/services/productService'
import { convertDocToObj } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || 'BuyKart',
  description:
    process.env.NEXT_PUBLIC_APP_DESC ||
    'Your everyday online shopping store',
}

export default async function Home() {
  const featuredProducts = await productService.getFeatured()
  const latestProducts = await productService.getLatest()
  return (
    <>
      {/* Hero banner / carousel */}
      <div className="w-full carousel rounded-box mt-4">
        {featuredProducts.map((product, index) => (
          <div
            key={product._id}
            id={`slide-${index}`}
            className="carousel-item relative w-full"
          >
            <div
              className="absolute flex justify-between transform
               -translate-y-1/2 left-5 right-5 top-1/2"
            >
              <a
                href={`#slide-${
                  index === 0 ? featuredProducts.length - 1 : index - 1
                }`}
                className="btn btn-circle btn-sm opacity-75"
              >
                ❮
              </a>
              <a
                href={`#slide-${
                  index === featuredProducts.length - 1 ? 0 : index + 1
                }`}
                className="btn btn-circle btn-sm opacity-75"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Category shortcuts */}
      <div className="flex gap-3 mt-6 mb-4 flex-wrap">
        {['Hoodies', 'Joggers', 'All'].map((cat) => (
          <Link
            key={cat}
            href={cat === 'All' ? '/search' : `/search?category=${cat}`}
            className="btn btn-outline btn-sm"
          >
            {cat}
          </Link>
        ))}
      </div>

      {/* Products section */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-semibold">New Arrivals</h2>
        <Link href="/search" className="text-sm link link-primary">
          View all →
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts.map((product) => (
          <ProductCard key={product.slug} product={convertDocToObj(product)} />
        ))}
      </div>
    </>
  )
}
