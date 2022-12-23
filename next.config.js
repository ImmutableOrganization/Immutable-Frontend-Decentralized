/** @type {import('next').NextConfig} */
const shouldAnalyzeBundles = process.env.ANALYZE === true ? true : false;

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: '/',
  trailingSlash: true,
};
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: shouldAnalyzeBundles,
});

module.exports = withBundleAnalyzer(nextConfig);
