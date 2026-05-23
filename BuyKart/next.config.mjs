/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevents mongoose & bcryptjs from being bundled into the Edge/Client runtime
  serverExternalPackages: ['mongoose', 'bcryptjs'],
  images: {
    remotePatterns: [],
  },
}

export default nextConfig
