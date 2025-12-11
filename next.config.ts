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
      pathname: '/ipfs/**',
    },
    {
      protocol: 'https',
      hostname: 'ipfs.io',
      pathname: '/ipfs/**',
    },
    {
      protocol: 'https',
      hostname: 'cloudflare-ipfs.com',
      pathname: '/ipfs/**',
    },
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '/dr6cnnvma/image/upload/**',
    },
    {
      protocol: 'https',
      hostname: process.env.NEXT_PUBLIC_API
        ? process.env.NEXT_PUBLIC_API.replace(/^https?:\/\//, '')
        : '',
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
