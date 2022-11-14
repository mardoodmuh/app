/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://commons.wikimedia.org',
        port: '',
        pathname: '/account123/**',
      },
    ],
  },
}