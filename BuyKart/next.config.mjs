/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Run middleware on Node.js runtime instead of Edge
    // This fixes "ReferenceError: __dirname is not defined" on Vercel
    serverComponentsExternalPackages: ['mongoose', 'bcryptjs'],
  },
  images: {
    remotePatterns: [],
  },
  env: {
    NEXTAUTH_URL:
      process.env.NEXTAUTH_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000'),
  },
}

export default nextConfig
