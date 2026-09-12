/**
 * Content access layer — blog posts (plan.md Phase 11).
 *
 * Same rules as the other modules: pages read only through here and client
 * components get data as props. Only published posts are returned; Draft Mode
 * preview arrives with the blog UI in Phase 13.
 *
 * `content` is the raw Lexical document — render it with
 * `lib/content/richtext.jsx`, never by hand.
 */
import { TAGS, cached, findAll, findOne } from './payload';
import { mapPost, mapPostCard } from './map';

/** Posts per page on /blog. The paginated routes derive their count from this. */
export const POSTS_PER_PAGE = 9;

const loadPosts = cached(
  async () => {
    const docs = await findAll('posts', { publishedOnly: true, optional: true, sort: '-publishedAt' });
    return docs.map(mapPost);
  },
  ['content', 'posts'],
  [TAGS.posts]
);

/** Every published post, newest first. */
export async function getAllPosts() {
  return loadPosts();
}

export async function getPostSlugs() {
  return (await getAllPosts()).map((p) => p.slug);
}

export async function getPostBySlug(slug) {
  return (await getAllPosts()).find((p) => p.slug === slug) || null;
}

/**
 * The working copy of a post, published or not — only for Draft Mode preview
 * (plan.md Phase 13). Deliberately uncached and never used by a static page:
 * a draft must not leak into the published list or the build.
 */
export async function getDraftPostBySlug(slug) {
  const doc = await findOne('posts', { slug: { equals: slug } }, { draft: true, depth: 2 });
  return doc ? mapPost(doc) : null;
}

/**
 * One page of posts, as listing cards (no body — keeps the page's RSC payload
 * small). `page` is 1-based.
 */
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
 * first, then the most recent, never the post itself.
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
    .sort((a, b) => b.score - a.score) // stable sort keeps the newest first within a score
    .slice(0, limit)
    .map(({ post: p }) => mapPostCard(p));
}
