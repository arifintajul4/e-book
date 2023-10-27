/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose',
    serverComponentsExternalPackages: ['mongoose'],
  },
  reactStrictMode: true,
  images: {
    domains: ['books.google.com'],
  },
};

module.exports = nextConfig;
