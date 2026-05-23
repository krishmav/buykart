import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import SessionWrapper from "@/components/SessionWrapper"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ShopNext",
  description: "Your everyday online shopping destination",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          {children}
          <Toaster position="top-right" />
        </SessionWrapper>
      </body>
    </html>
  )
}
