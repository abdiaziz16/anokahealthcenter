import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Remove output: 'export' for Netlify deployment with API routes
  // output: 'export', // Only use this for static export
  
  // Enable experimental features for better Netlify compatibility
  experimental: {
    serverComponentsExternalPackages: ['nodemailer'],
  },
  
  // Ensure proper handling of API routes
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
