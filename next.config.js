/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true, optimizePackageImports: ['three'] },
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] }
};

module.exports = nextConfig;
