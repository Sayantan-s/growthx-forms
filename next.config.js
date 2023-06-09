/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
    removeConsole: process.env.NODE_ENV === 'production',
  },
  swcMinify: true,
  images: {
    domains: ['flagcdn.com'],
  },
};

module.exports = nextConfig;
