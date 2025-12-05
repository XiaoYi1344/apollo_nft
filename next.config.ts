import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  // output: 'export',

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gateway.pinata.cloud',
      },
      {
        protocol: 'https',
        hostname: 'ipfs.io',
      },
      {
        protocol: 'https',
        hostname: 'cloudflare-ipfs.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // thêm Cloudinary
        pathname: '/dr6cnnvma/image/upload/**', // match tất cả ảnh upload
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_API
          ? process.env.NEXT_PUBLIC_API.replace(/^https?:\/\//, '')
          : '',
        port: '',
        pathname: '/**',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [{ key: 'ngrok-skip-browser-warning', value: 'true' }],
      },
    ];
  },
};

export default nextConfig;
