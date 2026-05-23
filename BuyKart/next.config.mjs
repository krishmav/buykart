/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // allow local /public images (default) + any future remote sources
    remotePatterns: [],
  },
  // Vercel sets VERCEL_URL; expose it so NextAuth v5 can auto-detect the URL
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'),
  },
}

export default nextConfig
