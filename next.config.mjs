import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
      },
    ],
  },
};
console.log(process.env.NODE_ENV);

const pwaConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // Add buildExcludes for App Router
  buildExcludes: [
    /middleware-manifest\.json$/,
    /_middleware\.js$/,
    /middleware-runtime\.js$/,
  ],
});

export default pwaConfig(nextConfig);
