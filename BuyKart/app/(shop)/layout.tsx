import Header from "@/components/Header"

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          <p className="font-semibold text-gray-700 mb-1">ShopNext</p>
          <p>© 2024 ShopNext — All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
