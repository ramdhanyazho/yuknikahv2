// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // Ganti my-store-id sesuai ID Blob store di dashboard
      { protocol: 'https', hostname: 'my-store-id.public.blob.vercel-storage.com', pathname: '/**' },
    ],
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
