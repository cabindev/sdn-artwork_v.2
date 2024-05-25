/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'https://healthypublicspaces.com/',
        port: '',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'sdn-workspaces.vercel.app',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
  experimental: {
    runtime: 'edge',
  },
};

export default nextConfig;
