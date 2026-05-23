import ShoppingCart from './ShoppingCart'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping Cart',
}

export default function CartPage() {
  return <ShoppingCart />
}
