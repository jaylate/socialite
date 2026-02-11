import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  env: {
    baseUrl: process.env.SOCIALITE_BASE_URL,
  },
};

export default nextConfig;
