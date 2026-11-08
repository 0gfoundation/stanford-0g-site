/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: the site is served as plain files by Cloudflare Workers
  // (see wrangler.jsonc). Images ship as-is, since there is no image server.
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
