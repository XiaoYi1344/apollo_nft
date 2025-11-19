import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

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
        hostname: process.env.NEXT_PUBLIC_API
          ? process.env.NEXT_PUBLIC_API.replace(/^https?:\/\//, '')
          : '',
        port: '', // để trống, ngrok mặc định là 443
        pathname: '/**', // cho phép tất cả đường dẫn
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'ngrok-skip-browser-warning', value: 'true' },
        ],
      },
    ];
  },
};

export default nextConfig;
