/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'imgur.com',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'i.imgur.com',
            pathname: '/**',
          },
        ],
      },
};

export default nextConfig;
