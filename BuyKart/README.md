# BuyKart

A full-stack ecommerce web app built with Next.js 14, TypeScript, Tailwind CSS, and MongoDB.

## Features

- Browse and search products by category
- Add to cart and manage quantities
- User authentication (sign in / register)
- Checkout with PayPal integration
- Order history
- Admin dashboard for managing products/orders
- Dark mode toggle
- Back to top button

## Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS, DaisyUI
- **State Management**: Zustand
- **Auth**: NextAuth v5
- **Database**: MongoDB + Mongoose
- **Payments**: PayPal
- **Font**: Poppins (Google Fonts)

## Getting Started

1. Clone the repo
2. Copy `.env.example` to `.env.local` and fill in your values
3. Run `npm install`
4. Run `npm run dev`
5. Visit `http://localhost:3000/api/products/seed` to seed the database

## Project Structure

```
app/
  (front)/         # Customer-facing pages
    ProductCard.tsx  # Product card component
    page.tsx         # Homepage
    cart/
      ShoppingCart.tsx  # Cart page
components/
  header/          # Navbar components
  BackToTop.tsx    # Scroll to top button
  Sidebar.tsx      # Category sidebar
lib/
  data.ts          # Seed data
  models/          # Mongoose models
  hooks/           # Zustand stores
```
