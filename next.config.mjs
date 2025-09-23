/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export', // ← QUITA ESTA LÍNEA
  images: { unoptimized: true },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    serverComponentsExternalPackages: [],
  }
};

export default nextConfig;