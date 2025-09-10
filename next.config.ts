import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Enable experimental features for better Netlify compatibility
  experimental: {
    serverComponentsExternalPackages: ['nodemailer'],
  },
};

export default nextConfig;
