// Runs after `next build`: writes a WebP of every raster image in public/ at
// each width next/image can request, into out/_img/ (see lib/image-loader.ts).
import { readdir, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import nextConfig from "../next.config.js";

const { imageSizes, deviceSizes } = nextConfig.images;
const widths = [...imageSizes, ...deviceSizes];
const PUBLIC = "public";
const OUT = path.join("out", "_img");
const RESIZED = /\.(png|jpe?g|avif|webp)$/i;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (RESIZED.test(entry.name)) yield full;
  }
}

let count = 0;
for await (const file of walk(PUBLIC)) {
  const rel = path.relative(PUBLIC, file);
  await mkdir(path.join(OUT, path.dirname(rel)), { recursive: true });
  await Promise.all(
    widths.map((w) =>
      sharp(file)
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: 75 })
        .toFile(path.join(OUT, `${rel}-${w}.webp`))
    )
  );
  count++;
}
console.log(`optimize-images: ${count} images x ${widths.length} widths -> ${OUT}`);
