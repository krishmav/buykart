/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14.1+ renamed experimental.serverComponentsExternalPackages to this.
  // MUST be top-level — keeps mongoose/bcryptjs out of the Edge middleware bundle.
  serverExternalPackages: ['mongoose', 'bcryptjs'],
  images: {
    remotePatterns: [],
  },
}

export default nextConfig
