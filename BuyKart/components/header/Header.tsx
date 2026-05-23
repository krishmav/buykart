import Link from 'next/link'
import React from 'react'
import Menu from './Menu'
import { SearchBox } from './SearchBox'
import Image from 'next/image'

const Header = () => {
  return (
    <header className="sticky top-0 z-50">
      <nav>
        <div className="navbar justify-between bg-base-300 px-4 py-2 border-b border-base-200">
          <div className="flex items-center gap-2">
            <label htmlFor="my-drawer" className="btn btn-square btn-ghost btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-5 h-5 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
            <Link href="/" className="flex items-center gap-1 font-bold text-xl tracking-tight">
              <span className="text-primary">Buy</span>
              <span>Kart</span>
              <span className="ml-1 text-xs bg-primary text-white rounded px-1 py-0.5 font-normal">
                store
              </span>
            </Link>
          </div>

          <Menu />
        </div>
        <div className="bg-base-300 block md:hidden text-center pb-3 px-4">
          <SearchBox />
        </div>
      </nav>
    </header>
  )
}

export default Header
