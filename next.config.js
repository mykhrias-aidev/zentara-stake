/** @type {import('next').NextConfig} */
const nextConfig = {
  // App Router is enabled by default in Next.js 13+
  
  // GitHub Pages configuration
  basePath: process.env.NODE_ENV === 'production' ? '/zentara-stake' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/zentara-stake' : '',
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  
  // Compilation optimizations
  swcMinify: true,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@tanstack/react-query'],
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Production optimizations
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      }
    }
    return config
  },
}

module.exports = nextConfig
