import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // 이미지 최적화
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },

  // 성능 최적화
  compress: true,

  // 개발 환경 최적화
  experimental: {
    optimizePackageImports: ['@tanstack/react-query', 'zustand'],
  },
}

export default nextConfig