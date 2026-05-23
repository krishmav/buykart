/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14.1+ renamed this from experimental.serverComponentsExternalPackages
  // This MUST be at the top level — if it stays under experimental, mongoose and
  // bcryptjs get bundled into the Edge middleware runtime, which has no Node.js
  // module support, causing "Middleware Invocation Failed" (500) on every request.
  serverExternalPackages: ['mongoose', 'bcryptjs'],
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
