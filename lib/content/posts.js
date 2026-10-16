/**
 * Content access layer — blog posts.
 *
 * Every post is a repository post: a Markdown body in
 * docs/content-system/articles/{slug}.md plus an entry in content/file-posts.js
 * (see lib/content/file-posts.js). Pages read posts only through here.
 *
 * `content` is the Lexical document built from the Markdown — render it with
 * `lib/content/richtext.jsx`, never by hand.
 */
import { mapPostCard } from './map';
import { getFilePosts, getFilePostBySlug } from './file-posts';

/** Posts per page on /blog. The paginated routes derive their count from this. */
export const POSTS_PER_PAGE = 9;

const byNewest = (a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0);

/** Every published post, newest first, without bodies (`content` is null). */
export async function getAllPosts() {
  return getFilePosts().sort(byNewest);
}

export async function getPostSlugs() {
  return (await getAllPosts()).map((p) => p.slug);
}

/** One post with its body, or null. */
export async function getPostBySlug(slug) {
  return getFilePostBySlug(slug);
}

export async function getPosts({ page = 1, perPage = POSTS_PER_PAGE } = {}) {
  const all = await getAllPosts();
  const totalPages = Math.max(1, Math.ceil(all.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  return {
    posts: all.slice(start, start + perPage).map(mapPostCard),
    page: current,
    perPage,
    totalPages,
    totalPosts: all.length
  };
}

/**
 * Posts to read next, as cards: those sharing a service or area with this one
 * only, newest first within a relevance score, never the post itself.
 */
export async function getRelatedPosts(slug, limit = 3) {
  const all = await getAllPosts();
  const post = all.find((p) => p.slug === slug);
  if (!post) return [];

  const services = new Set(post.relatedServices);
  const areas = new Set(post.relatedAreas);
  const overlap = (other) =>
    other.relatedServices.filter((s) => services.has(s)).length + other.relatedAreas.filter((a) => areas.has(a)).length;

  return all
    .filter((p) => p.slug !== slug)
    .map((p) => ({ post: p, score: overlap(p) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score) // stable sort keeps the newest first within a score
    .slice(0, limit)
    .map(({ post: p }) => mapPostCard(p));
}
