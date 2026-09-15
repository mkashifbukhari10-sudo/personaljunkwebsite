import fs from 'node:fs/promises';
import path from 'node:path';
import { brand } from '@/lib/brand';

/**
 * Loads an image descriptor's bytes as a data URL so next/og can composite it
 * into a social card. `next/og` cannot fetch a remote URL itself, so every
 * case ends up inline.
 *
 * Three shapes of `src` reach this, and all three are read from disk or the
 * network at build time:
 *
 * - `/images/...`            a file in /public (the code-owned slots)
 * - `/api/media/file/NAME`   Payload serving an upload from local storage,
 *                            which is what development gets without a
 *                            `BLOB_READ_WRITE_TOKEN`; the file is on disk in
 *                            `media/`, so it is read directly rather than
 *                            fetched from a server that may not be running
 * - `https://...`            Payload media on Vercel Blob (plan.md Phase 10)
 *
 * Anything missing, slow or non-image returns null and the caller falls back
 * to the text-only template — a social card is never worth failing a build.
 */

const FETCH_TIMEOUT_MS = 8000;
const MAX_BYTES = 8 * 1024 * 1024;

/** Payload's local file route: /api/<collection>/file/<filename>. */
const PAYLOAD_FILE_ROUTE = /^\/api\/([^/]+)\/file\/([^/?#]+)/;

const mimeFromExtension = (file) => {
  const ext = path.extname(file).slice(1).toLowerCase();
  if (!ext) return 'image/jpeg';
  return ext === 'jpg' ? 'image/jpeg' : 'image/' + ext;
};

const toDataUrl = (mime, buffer) => 'data:' + mime + ';base64,' + Buffer.from(buffer).toString('base64');

async function loadFile(file) {
  const buf = await fs.readFile(file);
  return toDataUrl(mimeFromExtension(file), buf);
}

async function loadRemote(src) {
  const res = await fetch(src, { signal: AbortSignal.timeout(FETCH_TIMEOUT_MS) });
  if (!res.ok) throw new Error('HTTP ' + res.status);
  const type = res.headers.get('content-type') || '';
  if (!type.startsWith('image/')) throw new Error('not an image: ' + type);
  const buf = await res.arrayBuffer();
  if (buf.byteLength > MAX_BYTES) throw new Error('image too large for a social card');
  return toDataUrl(type.split(';')[0], buf);
}

export async function loadOgPhoto(image) {
  const src = image && image.src;
  if (!src) return null;
  try {
    const local = PAYLOAD_FILE_ROUTE.exec(src);
    if (local) {
      // Payload's local storage writes into a directory named after the
      // collection, alongside the project root.
      return await loadFile(path.join(process.cwd(), local[1], decodeURIComponent(local[2])));
    }
    if (src.startsWith('/')) return await loadFile(path.join(process.cwd(), 'public', src));
    if (src.startsWith('https://') || src.startsWith('http://')) return await loadRemote(src);
    return null;
  } catch (err) {
    console.warn('[og] could not load photo ' + src + ': ' + (err && err.message ? err.message : err));
    return null;
  }
}

let logoPromise = null;
/** The dark-background logo as a data URL, read once per build. */
export function loadOgLogo() {
  if (!logoPromise) logoPromise = loadOgPhoto({ src: brand.logoOnDark });
  return logoPromise;
}
