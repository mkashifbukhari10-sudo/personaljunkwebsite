/**
 * Payload media document -> the image descriptor the frontend uses
 * (plan.md Phase 10).
 *
 * `components/Media.jsx` has taken `{ src, alt, width, height, caption? }`
 * since Phase 5 and does not change here: it hands the original to
 * `next/image`, which builds the `srcset` from it through the Next image
 * optimizer (the Blob host is allow-listed in next.config.mjs).
 *
 * Payload's own generated sizes are not used for that `srcset` — they exist
 * for the admin and, in the case of `og`, for the social-card routes, which
 * need one fixed 1200x630 frame rather than a responsive set.
 */

/** The size name whose crop matches the social card frame. */
const OG_SIZE = 'og';

function sizeOf(doc, name) {
  const size = doc && doc.sizes && doc.sizes[name];
  if (!size || !size.url || !size.width || !size.height) return null;
  return { src: size.url, width: size.width, height: size.height };
}

/**
 * `{ src, alt, width, height, caption? }`, or null when the document is
 * missing or has not finished uploading. A relationship read at depth 0 is a
 * bare id, which is not enough to render — that also returns null.
 */
export function toImageProps(doc) {
  if (!doc || typeof doc !== 'object') return null;
  if (!doc.url || !doc.width || !doc.height) return null;
  const image = { src: doc.url, alt: doc.alt || '', width: doc.width, height: doc.height };
  if (doc.caption) image.caption = doc.caption;
  return image;
}

/**
 * The 1200x630 crop for a social card, falling back to the original when the
 * size has not been generated (an image uploaded before the size existed, or
 * one smaller than the frame).
 */
export function toOgImageProps(doc) {
  const original = toImageProps(doc);
  if (!original) return null;
  const og = sizeOf(doc, OG_SIZE);
  return og ? { ...original, ...og } : original;
}
