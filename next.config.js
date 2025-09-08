/** @type {import('next').NextConfig} */
const nextConfig = {
  // Basic reliable configuration
  swcMinify: true,
  
  // Skip type checking for faster development
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
  
  // Skip ESLint for faster development
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig
