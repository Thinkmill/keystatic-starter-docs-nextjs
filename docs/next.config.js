const withPreconstruct = require("@preconstruct/next");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
};

module.exports = withPreconstruct(nextConfig);
