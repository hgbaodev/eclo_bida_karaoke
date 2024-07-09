const createNextIntlPlugin = require('next-intl/plugin');

// Initialize next-intl plugin
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['avatars.githubusercontent.com', 'via.placeholder.com'],
  },
};

// Merge the Next.js configuration with the next-intl plugin
module.exports = withNextIntl(nextConfig);
