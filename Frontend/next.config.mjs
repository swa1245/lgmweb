// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// export default nextConfig;




/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
