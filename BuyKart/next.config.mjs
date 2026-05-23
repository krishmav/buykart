/** @type {import('next').NextConfig} */
const nextConfig = {
  // Correct key for Next.js 14 — keeps mongoose/bcrypt out of Edge bundles
  experimental: {
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
