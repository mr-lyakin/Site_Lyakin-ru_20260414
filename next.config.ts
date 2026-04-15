import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',  // <-- добавь эту строку
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
