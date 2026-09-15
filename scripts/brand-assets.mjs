/**
 * Derive every brand asset from the supplied logo (plan.md Phase 5, "brand
 * icon/OG artwork"):
 *
 *   node scripts/brand-assets.mjs
 *
 * Input:  public/images/Logo.png — the logo as delivered, navy + gold on a
 *         white (not transparent) background.
 * Output: the files listed in lib/brand.js. The white background is knocked
 *         out with a soft edge; the "dark" variants recolour the navy to white
 *         so the logo reads on the site's ink header, footer and social cards;
 *         the icons crop the JS monogram (everything left of the first gap in
 *         the artwork) onto an ink tile.
 *
 * Re-run after replacing Logo.png. Needs sharp, which is already a dependency.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'public/images/Logo.png';
const OUT = 'public/brand';
const INK = { r: 16, g: 23, b: 38 };
fs.mkdirSync(OUT, { recursive: true });

// 1. Knock out the white background with a soft edge, un-premultiplying the
//    fringe so anti-aliased pixels keep their true colour.
const { data, info } = await sharp(SRC).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const light = Buffer.alloc(width * height * 4);
const dark = Buffer.alloc(width * height * 4);
const T = 70;
const FLOOR = 18; // distance-from-white that counts as fully opaque
for (let i = 0; i < width * height; i++) {
  const r = data[i * channels], g = data[i * channels + 1], b = data[i * channels + 2];
  const d = 255 - Math.min(r, g, b);
  // Below FLOOR is background noise (the source is not pure white); above it a soft ramp.
  const a = d <= FLOOR ? 0 : Math.min(1, (d - FLOOR) / (T - FLOOR));
  let fr = r, fg = g, fb = b;
  if (a > 0 && a < 1) {
    fr = Math.max(0, Math.min(255, (r - (1 - a) * 255) / a));
    fg = Math.max(0, Math.min(255, (g - (1 - a) * 255) / a));
    fb = Math.max(0, Math.min(255, (b - (1 - a) * 255) / a));
  }
  const A = Math.round(a * 255);
  light.set([fr, fg, fb, A], i * 4);
  // Dark-background variant: navy pixels become white, gold stays gold.
  const goldness = Math.max(0, Math.min(1, (fr - fb) / 80));
  dark.set([Math.round(255 + (fr - 255) * goldness), Math.round(255 + (fg - 255) * goldness), Math.round(255 + (fb - 255) * goldness), A], i * 4);
}

const raw = (buf) => sharp(buf, { raw: { width, height, channels: 4 } });

// Content bounding box + the gap between the monogram and the wordmark.
const colHas = new Array(width).fill(false), rowHas = new Array(height).fill(false);
for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) if (light[(y * width + x) * 4 + 3] > 8) { colHas[x] = true; rowHas[y] = true; }
const x0 = colHas.indexOf(true), x1 = colHas.lastIndexOf(true), y0 = rowHas.indexOf(true), y1 = rowHas.lastIndexOf(true);
// First run of >= 8 empty columns after the monogram.
let gapStart = -1, gapEnd = -1, run = 0;
for (let x = x0; x <= x1; x++) {
  if (!colHas[x]) { if (run === 0) gapStart = x; run++; }
  else { if (run >= 8) { gapEnd = x; break; } run = 0; }
}
if (gapEnd < 0) throw new Error('no gap between monogram and wordmark found');
console.log({ width, height, bbox: [x0, y0, x1, y1], gap: [gapStart, gapEnd] });

const full = { left: x0, top: y0, width: x1 - x0 + 1, height: y1 - y0 + 1 };
// The monogram's own vertical extent (it is taller than the wordmark).
const markRows = new Array(height).fill(false);
for (let y = 0; y < height; y++) for (let x = x0; x < gapStart; x++) if (light[(y * width + x) * 4 + 3] > 8) { markRows[y] = true; break; }
const my0 = markRows.indexOf(true), my1 = markRows.lastIndexOf(true);
const mark = { left: x0, top: my0, width: gapStart - x0, height: my1 - my0 + 1 };

const save = async (buf, region, file, resize) => {
  let img = raw(buf).extract(region);
  if (resize) img = img.resize(resize);
  const out = path.join(OUT, file);
  await img.png({ compressionLevel: 9, palette: false }).toFile(out);
  const m = await sharp(out).metadata();
  console.log(file, m.width + 'x' + m.height, fs.statSync(out).size + ' B');
};
await save(light, full, 'logo.png', { width: 1600 });
await save(dark, full, 'logo-dark.png', { width: 1600 });
await save(light, mark, 'mark.png', { height: 512 });
await save(dark, mark, 'mark-dark.png', { height: 512 });

// Square icons: ink background, the dark-variant monogram centred at 64% of the tile.
const icon = async (px, file) => {
  const inner = Math.round(px * 0.64);
  const m = await raw(dark).extract(mark).resize({ width: inner, height: inner, fit: 'inside' }).png().toBuffer();
  const meta = await sharp(m).metadata();
  await sharp({ create: { width: px, height: px, channels: 4, background: { ...INK, alpha: 1 } } })
    .composite([{ input: m, left: Math.round((px - meta.width) / 2), top: Math.round((px - meta.height) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(file);
  console.log(file, px + 'x' + px, fs.statSync(file).size + ' B');
};
await icon(256, 'app/(frontend)/icon.png');
await icon(180, 'app/(frontend)/apple-icon.png');
await icon(192, path.join(OUT, 'icon-192.png'));
await icon(512, path.join(OUT, 'icon-512.png'));
