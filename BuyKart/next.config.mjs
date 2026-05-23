/** @type {import("next").NextConfig} */
const nextConfig = {
  serverExternalPackages: ["mongoose", "bcryptjs"],
  images: {
    unoptimized: true,
  },
}
export default nextConfig
