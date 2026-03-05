import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn-images-1.medium.com', 'medium.com'],
  },
};

export default nextConfig;
