import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/api"],
  async rewrites() {
    return [
      {
        source: "/trpc/:path*",
        destination: `${process.env.API_URL ?? "http://localhost:4000"}/trpc/:path*`,
      },
    ];
  },
};

export default nextConfig;
