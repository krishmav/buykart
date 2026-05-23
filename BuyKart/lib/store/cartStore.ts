"use client"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type CartItem = {
  slug: string
  name: string
  image: string
  price: number
  qty: number
  countInStock: number
}

export type ShippingAddress = {
  fullName: string
  address: string
  city: string
  postalCode: string
  country: string
}

type CartStore = {
  items: CartItem[]
  shippingAddress: ShippingAddress | null
  addItem: (item: CartItem) => void
  removeItem: (slug: string) => void
  updateQty: (slug: string, qty: number) => void
  setShippingAddress: (a: ShippingAddress) => void
  clearCart: () => void
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      shippingAddress: null,
      addItem: (item) => {
        const existing = get().items.find((i) => i.slug === item.slug)
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.slug === item.slug
                ? { ...i, qty: Math.min(i.qty + item.qty, i.countInStock) }
                : i
            ),
          })
        } else {
          set({ items: [...get().items, item] })
        }
      },
      removeItem: (slug) =>
        set({ items: get().items.filter((i) => i.slug !== slug) }),
      updateQty: (slug, qty) =>
        set({
          items: get().items.map((i) =>
            i.slug === slug ? { ...i, qty } : i
          ),
        }),
      setShippingAddress: (a) => set({ shippingAddress: a }),
      clearCart: () => set({ items: [] }),
    }),
    { name: "shopnext-cart" }
  )
)
