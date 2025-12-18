/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    return [
      // Redirect non-www to www (if needed, adjust based on your preference)
      // Note: This is typically handled at the hosting/CDN level, but included here as fallback
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'caesarisidrovaay.online',
          },
        ],
        destination: 'https://www.caesarisidrovaay.online/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
