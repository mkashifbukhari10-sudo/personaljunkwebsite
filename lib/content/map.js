/**
 * Post record -> the shape the blog pages, feed, sitemap and social images
 * read. lib/content/file-posts.js builds each record from content/file-posts.js
 * and the article's Markdown. Anything left empty maps to an "absent" value
 * (null, [], undefined) rather than to an invented default.
 */

import { toImageProps, toOgImageProps } from './media';

/**
 * Media documents are mapped by lib/content/media.js (plan.md Phase 10);
 * re-exported here so callers have one import for document mapping.
 */
export { toImageProps, toOgImageProps };

/** Related document `{ slug }` -> slug. */
function relSlug(value) {
  if (!value) return null;
  if (typeof value === 'string' || typeof value === 'number') return null; // depth 0: unresolvable here
  return value.slug || null;
}

function relSlugs(value) {
  if (!Array.isArray(value)) return [];
  return value.map(relSlug).filter(Boolean);
}

function mapSeo(seo) {
  const out = {
    title: (seo && seo.title) || '',
    description: (seo && seo.description) || ''
  };
  if (seo && seo.canonical) out.canonical = seo.canonical;
  if (seo && seo.noIndex) out.noIndex = true;
  if (seo && seo.ogTitle) out.ogTitle = seo.ogTitle;
  if (seo && seo.ogDescription) out.ogDescription = seo.ogDescription;
  const og = toOgImageProps(seo && seo.ogImage);
  if (og) out.ogImage = og;
  return out;
}

/** Author document -> byline data, with the profile URLs schema.org wants. */
export function mapAuthor(doc) {
  if (!doc || typeof doc !== 'object' || !doc.name) return null;
  const author = { slug: doc.slug, name: doc.name };
  if (doc.type === 'Person' || doc.type === 'Organization') author.type = doc.type;
  if (doc.role) author.role = doc.role;
  if (doc.bio) author.bio = doc.bio;
  const photo = toImageProps(doc.photo);
  if (photo) author.photo = photo;
  const sameAs = Array.isArray(doc.sameAs) ? doc.sameAs.map((r) => r.url).filter(Boolean) : [];
  if (sameAs.length) author.sameAs = sameAs;
  return author;
}

/**
 * Post document -> the shape the blog pages read. `content` stays the raw
 * Lexical document; render it with lib/content/richtext.jsx.
 */
export function mapPost(doc) {
  return {
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    coverImage: toImageProps(doc.coverImage),
    // The 1200x630 crop, for og:image — the page image is the full-size one.
    coverOgImage: toOgImageProps(doc.coverImage),
    content: doc.content || null,
    author: mapAuthor(doc.author),
    publishedAt: doc.publishedAt || null,
    updatedAt: doc.updatedAt || null,
    readingTime: doc.readingTime || null,
    relatedServices: relSlugs(doc.relatedServices),
    relatedAreas: relSlugs(doc.relatedAreas),
    seo: mapSeo(doc.seo)
  };
}

/**
 * The subset a listing card needs. Keeps the post body out of the RSC payload
 * of /blog and of the "read next" block.
 */
export function mapPostCard(post) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    publishedAt: post.publishedAt,
    readingTime: post.readingTime,
    author: post.author ? { name: post.author.name, role: post.author.role } : null
  };
}
