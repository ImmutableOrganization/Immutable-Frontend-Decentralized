/** @type {import('next').NextConfig} */
const shouldAnalyzeBundles = process.env.ANALYZE === true;

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: './',
  trailingSlash: true,
}
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);


