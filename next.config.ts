import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
      AUTH_TRUST_HOST: "true",
  },
  /* config options here */
};

export default nextConfig;
