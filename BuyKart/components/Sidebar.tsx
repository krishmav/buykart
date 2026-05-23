'use client'

import useLayoutService from '@/lib/hooks/useLayout'
import Link from 'next/link'
import useSWR from 'swr'

const Sidebar = () => {
  const { toggleDrawer } = useLayoutService()
  const { data: categories, error } = useSWR('/api/products/categories')

  if (error) return <p className="p-4 text-error">{error.message}</p>
  if (!categories) return <p className="p-4">Loading...</p>

  return (
    <ul className="menu p-4 w-72 min-h-full bg-base-200 text-base-content">
      <li className="mb-2">
        <h2 className="text-lg font-semibold menu-title">Browse Categories</h2>
      </li>
      {categories.map((category: string) => (
        <li key={category}>
          <Link
            href={`/search?category=${category}`}
            onClick={toggleDrawer}
            className="rounded-md"
          >
            {category}
          </Link>
        </li>
      ))}
      <div className="divider"></div>
      <li>
        <Link href="/search" onClick={toggleDrawer}>
          All Products
        </Link>
      </li>
    </ul>
  )
}

export default Sidebar
