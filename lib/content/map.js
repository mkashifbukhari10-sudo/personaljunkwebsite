/**
 * Payload document -> frontend shape (plan.md Phase 8).
 *
 * The target shapes are exactly the objects the pages consumed before the
 * migration, so no component had to change when the source switched. Anything
 * the CMS leaves empty maps to the same "absent" value as before (null, [],
 * undefined) rather than to an invented default.
 */

import { toImageProps, toOgImageProps } from './media';

/**
 * Media documents are mapped by lib/content/media.js (plan.md Phase 10);
 * re-exported here so callers have one import for document mapping.
 */
export { toImageProps, toOgImageProps };

/** Relationship value -> slug. Reads run at depth 1, so related docs arrive populated. */
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

function mapBody(body) {
  if (!Array.isArray(body)) return [];
  return body.map((section) => ({
    heading: section.heading,
    paragraphs: Array.isArray(section.paragraphs) ? section.paragraphs.map((p) => p.text).filter(Boolean) : []
  }));
}

function mapFaqs(faqs) {
  if (!Array.isArray(faqs)) return [];
  return faqs.map((f) => ({ q: f.q, a: f.a })).filter((f) => f.q && f.a);
}

/** The closing CTA band renders two display lines. */
function mapCta(cta) {
  return [(cta && cta.line1) || '', (cta && cta.line2) || ''];
}

/** Service document -> the shape /services/[slug] and the homepage explorer read. */
export function mapService(doc) {
  const service = {
    slug: doc.slug,
    num: doc.num,
    name: doc.name,
    blurb: doc.blurb,
    seo: mapSeo(doc.seo),
    h1: doc.h1,
    intro: doc.intro,
    body: mapBody(doc.body),
    typical: doc.typical,
    crew: doc.crew,
    time: doc.time,
    faqs: mapFaqs(doc.faqs),
    relatedServices: relSlugs(doc.relatedServices),
    popularAreas: relSlugs(doc.popularAreas),
    cta: mapCta(doc.cta),
    image: toImageProps(doc.image),
    // Used for the sitemap's lastmod.
    updatedAt: doc.updatedAt || null
  };
  if (doc.audience) service.audience = doc.audience;
  if (doc.group) service.group = doc.group;
  return service;
}

/** Area document -> the shape /areas/[slug], /areas and the homepage map read. */
export function mapArea(doc) {
  const home = doc.home || {};
  return {
    slug: doc.slug,
    num: doc.num,
    name: doc.name,
    note: doc.note,
    map: { x: (doc.map && doc.map.x) || 0, y: (doc.map && doc.map.y) || 0 },
    home: home.featured ? { x: home.x || 0, y: home.y || 0, order: home.order || 0 } : null,
    seo: mapSeo(doc.seo),
    h1: doc.h1,
    intro: doc.intro,
    body: mapBody(doc.body),
    faqs: mapFaqs(doc.faqs),
    popularServices: relSlugs(doc.popularServices),
    nearbyAreas: relSlugs(doc.nearbyAreas),
    cta: mapCta(doc.cta),
    image: toImageProps(doc.image),
    // Used for the sitemap's lastmod.
    updatedAt: doc.updatedAt || null
  };
}

/** FAQ document -> the { q, a, more? } shape FaqAccordion renders. */
export function mapFaq(doc) {
  const faq = { q: doc.q, a: doc.a };
  if (doc.more && doc.more.href && doc.more.label) faq.more = { href: doc.more.href, label: doc.more.label };
  return faq;
}

/** Author document -> byline data, with the profile URLs schema.org wants. */
export function mapAuthor(doc) {
  if (!doc || typeof doc !== 'object' || !doc.name) return null;
  const author = { slug: doc.slug, name: doc.name };
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

/** Review document -> the shape components/home/Reviews.jsx renders. */
export function mapReview(doc) {
  const review = { quote: doc.quote, name: doc.name, meta: doc.meta || '' };
  if (doc.rating) review.rating = doc.rating;
  if (doc.source) review.source = doc.source;
  return review;
}
