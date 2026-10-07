import type { NextConfig } from 'next'

const legacyPages: Array<[string, string]> = [
  ['/index.html', '/'],
  ['/about.html', '/about'],
  ['/services.html', '/services'],
  ['/contact.html', '/contact'],
]

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.css': {
        loaders: ['@tailwindcss/turbopack'],
        as: '*.css',
      },
    },
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return legacyPages.map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }))
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ]
  },
}

export default nextConfig
