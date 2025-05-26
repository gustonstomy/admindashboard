import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "*.cloudfront.net",
      },
      {
        hostname: "*res.cloudinary.com",
      },

      {
        hostname: "maps.googleapis.com",
      },
    ],
    // domains: ['shaqapp.com', 'd20eugfgs7t808.cloudfront.net'], // Add external image hostname here
  },
};

export default nextConfig;
