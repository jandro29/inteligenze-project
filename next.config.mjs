/** @type {import('next').NextConfig} */
const nextConfig = {
 output: 'export',
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },


  experimental: {
    serverComponentsExternalPackages: [],
  },

  experimental: {
    dynamic: 'force-dynamic'
  }

};

export default nextConfig;
