// Widths the image loader may ask for. scripts/optimize-images.mjs makes a
// WebP of every image in public/ at each of these widths after the build.
const imageSizes = [48, 96, 128, 256];
const deviceSizes = [640, 1080, 1920];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export: the site is served as plain files by Cloudflare Workers
  // (see wrangler.jsonc). There is no image server, so images are resized
  // at build time instead.
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    imageSizes,
    deviceSizes,
  },
};

module.exports = nextConfig;
