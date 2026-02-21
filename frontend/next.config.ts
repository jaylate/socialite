import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  env: {
    baseUrl: process.env.SOCIALITE_BASE_URL,
  },
  async rewrites() {
    return [
      {
        source: '/@:username',
        destination: '/[user]',
      },
    ];
  },
};

export default nextConfig;
