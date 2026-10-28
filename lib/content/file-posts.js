/**
 * Blog posts, published from the repository.
 *
 * Each entry in `content/file-posts.js` pairs with a Markdown body in
 * `docs/content-system/articles/{slug}.md`. Publishing one means adding the
 * entry and the file and deploying. Posts come out in the shape `mapPost`
 * defines, which every page, feed, sitemap and social image reads.
 */
import fs from 'node:fs';
import path from 'node:path';
import { articleToLexical } from '@/scripts/article-markdown.mjs';
import { filePosts, fileImages } from '@/content/file-posts';
import { mapPost } from './map';

const ARTICLES_DIR = path.join(process.cwd(), 'docs', 'content-system', 'articles');
// The byline is the crew, not a named person. Schema emits Organization for
// this record. Do not invent a Person author.
const AUTHOR = { slug: 'junk-services-dubai-team', name: 'Junk Services Dubai Team', type: 'Organization' };

/** An image from `fileImages`, in the media-record shape `toImageProps` reads. */
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

function toPost(entry) {
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
      canonical: entry.canonical || '',
      noIndex: Boolean(entry.noIndex),
      ogImage: entry.ogImage ? mediaDoc(entry.ogImage) : cover,
      ogTitle: entry.ogTitle || entry.title,
      ogDescription: entry.ogDescription || entry.excerpt
    }
  });
  return post;
}

// Built once per server process: the Markdown only changes with a deployment.
let built = null;
function all() {
  if (!built) built = new Map(filePosts.map((entry) => [entry.slug, toPost(entry)]));
  return built;
}

/** Every post, without bodies, for listings. */
export function getFilePosts() {
  return [...all().values()].map((post) => ({ ...post, content: null }));
}

/** One post with its body, or null when the slug is unknown. */
export function getFilePostBySlug(slug) {
  return all().get(slug) || null;
}
