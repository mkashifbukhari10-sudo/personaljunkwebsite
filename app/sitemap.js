import { absoluteUrl } from '@/lib/site';
import { serviceHref, areaHref, postHref, blogPageHref } from '@/lib/hrefs';
import { getServices } from '@/lib/content/services';
import { getAreas } from '@/lib/content/areas';
import { getAllPosts, POSTS_PER_PAGE } from '@/lib/content/posts';

/**
 * The crawl surface: every indexable published page, and nothing else
 * (plan.md Phase 14).
 *
 * Built from Payload, so it follows the CMS without a code change:
 * - anything with `seo.noIndex` is left out, because it carries `noindex` and
 *   listing it would ask Google to crawl a page we have told it to drop;
 * - drafts never appear (the content layer only returns published documents);
 * - `/blog` is listed only once a post exists, since an empty index is
 *   `noindex` itself;
 * - `lastModified` is the document's real `updatedAt`, not the build time.
 *
 * Re-rendered hourly. `revalidatePath('/sitemap.xml')` from a Payload hook does
 * not reliably refresh a statically generated metadata route, so this is what
 * actually keeps the file current between deploys.
 */
export const revalidate = 3600;

/**
 * A single sitemap holds 50,000 URLs; Next's `generateSitemaps()` split is
 * worth adding somewhere north of ~5,000. At 30-odd URLs plus one per post,
 * that is thousands of posts away.
 */
const ROUTES = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/services', changeFrequency: 'monthly', priority: 0.9 },
  { path: '/areas', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/how-it-works', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/about', changeFrequency: 'yearly', priority: 0.5 },
  { path: '/contact', changeFrequency: 'yearly', priority: 0.8 }
];

const indexable = (doc) => !(doc.seo && doc.seo.noIndex);

/** Payload timestamps are ISO strings; fall back to the build time. */
const modified = (value, fallback) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date : fallback;
};

/** The newest `updatedAt` in a set — the right `lastmod` for a listing page. */
const newest = (docs, fallback) =>
  docs.reduce((latest, doc) => {
    const date = modified(doc.updatedAt, null);
    return date && date > latest ? date : latest;
  }, fallback);

export default async function sitemap() {
  const now = new Date();
  const [services, areas, posts] = await Promise.all([getServices(), getAreas(), getAllPosts()]);

  const liveServices = services.filter(indexable);
  const liveAreas = areas.filter(indexable);
  const livePosts = posts.filter(indexable);

  const statics = ROUTES.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: r.path === '/services' ? newest(liveServices, now) : r.path === '/areas' ? newest(liveAreas, now) : now,
    changeFrequency: r.changeFrequency,
    priority: r.priority
  }));

  const serviceUrls = liveServices.map((s) => ({
    url: absoluteUrl(serviceHref(s.slug)),
    lastModified: modified(s.updatedAt, now),
    changeFrequency: 'monthly',
    priority: 0.8
  }));

  const areaUrls = liveAreas.map((a) => ({
    url: absoluteUrl(areaHref(a.slug)),
    lastModified: modified(a.updatedAt, now),
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  // The blog index and its pagination only exist as crawlable pages once
  // something is published; before that /blog is noindex.
  const blogUrls = [];
  if (livePosts.length) {
    const lastPost = newest(livePosts, now);
    const totalPages = Math.ceil(livePosts.length / POSTS_PER_PAGE);
    for (let page = 1; page <= totalPages; page++) {
      blogUrls.push({
        url: absoluteUrl(blogPageHref(page)),
        lastModified: lastPost,
        changeFrequency: 'weekly',
        priority: page === 1 ? 0.7 : 0.4
      });
    }
  }

  const postUrls = livePosts.map((p) => ({
    url: absoluteUrl(postHref(p.slug)),
    lastModified: modified(p.updatedAt || p.publishedAt, now),
    changeFrequency: 'yearly',
    priority: 0.6
  }));

  return [...statics, ...serviceUrls, ...areaUrls, ...blogUrls, ...postUrls];
}
