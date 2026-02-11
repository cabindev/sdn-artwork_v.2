/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'sdn-workspaces.sdnthailand.com',
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
};

export default nextConfig;
