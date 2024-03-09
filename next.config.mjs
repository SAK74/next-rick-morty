/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: new URL(process.env.API_URL).host,
      },
    ],
  },
};

export default nextConfig;
