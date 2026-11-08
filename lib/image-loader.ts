// next/image loader for the static export. Points each image at the WebP that
// scripts/optimize-images.mjs generates for that width, e.g.
// /mentors/gil.png at 256px -> /_img/mentors/gil.png-256.webp.
// In `next dev` the build step hasn't run, so the original file is used.

const RESIZED = /\.(png|jpe?g|avif|webp)$/i;

export default function imageLoader({ src, width }: { src: string; width: number }) {
  if (process.env.NODE_ENV === "development" || !src.startsWith("/") || !RESIZED.test(src)) {
    return src;
  }
  return `/_img${src}-${width}.webp`;
}
