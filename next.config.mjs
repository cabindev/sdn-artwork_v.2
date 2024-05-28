//next.confix.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['app-info.healthypublicspaces.com'], // เพิ่ม domains นี้ด้วย
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app-info.healthypublicspaces.com',
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

