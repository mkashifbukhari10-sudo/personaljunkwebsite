/**
 * Blog posts published from the repository instead of the CMS.
 *
 * Each entry in `content/file-posts.js` pairs with a Markdown body in
 * `docs/content-system/articles/{slug}.md`. Publishing one means adding the
 * entry and the file and deploying: nothing is written to the database, so a
 * database outage cannot block a new article. The posts come out in the same
 * shape as CMS posts (`mapPost`), so every page, feed, sitemap and social image
 * treats them identically.
 */
import fs from 'node:fs';
import path from 'node:path';
import { articleToLexical } from '@/scripts/article-markdown.mjs';
import { filePosts, fileImages } from '@/content/file-posts';
import { mapPost } from './map';

const ARTICLES_DIR = path.join(process.cwd(), 'docs', 'content-system', 'articles');
const AUTHOR = { slug: 'junk-services-dubai-team', name: 'Junk Services Dubai Team' };
const SITE_URL = 'https://www.junkservicesdubai.com';

/** An image from `fileImages`, shaped like a Payload media document. */
function mediaDoc(key) {
  const image = fileImages[key];
  if (!image) throw new Error('[file-posts] unknown image "' + key + '"');
  const doc = { url: image.src, alt: image.alt, width: image.width, height: image.height };
  if (image.og) doc.sizes = { og: { url: image.og, width: 1200, height: 630 } };
  return doc;
}

const link = (url) => ({ linkType: 'custom', url, newTab: url.startsWith('https://') });

/** Same rule as the Posts collection's reading-time hook: 200 words a minute. */
function readingTime(node) {
  if (!node || typeof node !== 'object') return 0;
  if (typeof node.text === 'string') {
    const trimmed = node.text.trim();
    return trimmed ? trimmed.split(/\s+/).length : 0;
  }
  const children = node.root ? [node.root] : node.children;
  return Array.isArray(children) ? children.reduce((total, child) => total + readingTime(child), 0) : 0;
}

function toPost(entry, { withContent }) {
  const markdown = fs.readFileSync(path.join(ARTICLES_DIR, entry.slug + '.md'), 'utf8');
  const content = articleToLexical(markdown, link, mediaDoc);
  const cover = mediaDoc(entry.cover);
  const post = mapPost({
    slug: entry.slug,
    title: entry.title,
    excerpt: entry.excerpt,
    coverImage: cover,
    content,
    author: AUTHOR,
    publishedAt: entry.publishedAt,
    updatedAt: entry.updatedAt || entry.publishedAt,
    readingTime: Math.max(1, Math.ceil(readingTime(content) / 200)),
    relatedServices: entry.services.map((slug) => ({ slug })),
    relatedAreas: (entry.areas || []).map((slug) => ({ slug })),
    seo: {
      title: entry.seoTitle,
      description: entry.seoDescription,
      canonical: SITE_URL + '/blog/' + entry.slug,
      ogImage: cover,
      ogTitle: entry.title,
      ogDescription: entry.excerpt
    }
  });
  if (!withContent) post.content = null;
  return post;
}

/** Every file post, without bodies, for listings. */
export function getFilePosts() {
  return filePosts.map((entry) => toPost(entry, { withContent: false }));
}

/** One file post with its body, or null when the slug is not a file post. */
export function getFilePostBySlug(slug) {
  const entry = filePosts.find((p) => p.slug === slug);
  return entry ? toPost(entry, { withContent: true }) : null;
}
