import { Product } from '@/lib/models/ProductModel'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Rating } from './Rating'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="card bg-base-200 shadow-md mb-4 border border-base-300">
      <figure className="relative">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={300}
            className="object-cover h-56 w-full"
          />
        </Link>
        <span className="absolute top-2 left-2 badge badge-primary text-xs">
          {product.category}
        </span>
      </figure>
      <div className="card-body p-4">
        <Link href={`/product/${product.slug}`}>
          <h2 className="card-title text-base font-semibold hover:underline">
            {product.name}
          </h2>
        </Link>
        <p className="text-sm text-gray-500 mb-1">{product.brand}</p>
        <Rating value={product.rating} caption={`(${product.numReviews} reviews)`} />
        <div className="card-actions flex items-center justify-between mt-2">
          <span className="text-xl font-bold">${product.price}</span>
          <Link
            href={`/product/${product.slug}`}
            className="btn btn-sm btn-outline btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}
