import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cryptus-2025.vercel.app'],
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://*.telegram.org https://t.me"

          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          }
        ],
      },
    ]
  },

};

export default nextConfig;
