const plugins = [];

if (process.env.ANALYZE === 'true') {
  const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: true,
  });

  plugins.push(withBundleAnalyzer);
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig);
