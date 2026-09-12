import { notFound, permanentRedirect } from 'next/navigation';
import BlogIndex from '@/components/blog/BlogIndex';
import { pageMetadata } from '@/lib/seo';
import { blogPageHref } from '@/lib/hrefs';
import { getBlogIndex } from '@/lib/content/blog';
import { getPosts, POSTS_PER_PAGE, getAllPosts } from '@/lib/content/posts';

/**
 * The blog index, pages 2 and up (plan.md Phase 12).
 *
 * Page 1 is /blog, so /blog/page/1 permanently redirects there rather than
 * existing as a duplicate. Out-of-range numbers 404.
 *
 * `dynamicParams` stays true: with it false, a path revalidated by a Payload
 * hook is no longer in the build-time params list and Next serves a 404
 * instead of regenerating it (see the Phase 8 notes).
 */
export const dynamicParams = true;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  // Page 1 is /blog; only 2..n are real routes here.
  return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({ n: String(i + 2) }));
}

/** The page number, or null when the segment is not a plain integer. */
function parsePage(n) {
  return /^[1-9][0-9]*$/.test(n) ? Number(n) : null;
}

export async function generateMetadata({ params }) {
  const { n } = await params;
  const page = parsePage(n);
  if (!page || page === 1) return {};

  const [index, { totalPages, totalPosts }] = await Promise.all([getBlogIndex(), getPosts({ page })]);
  if (page > totalPages) return {};

  return pageMetadata({
    path: blogPageHref(page),
    seo: {
      ...index.seo,
      title: index.seo.title + ' — Page ' + page,
      ogTitle: index.seo.ogTitle ? index.seo.ogTitle + ' — Page ' + page : '',
      noIndex: index.seo.noIndex || totalPosts === 0
    }
  });
}

export default async function BlogPaginatedPage({ params }) {
  const { n } = await params;
  const page = parsePage(n);
  if (!page) notFound();
  if (page === 1) permanentRedirect('/blog');

  const { totalPages, totalPosts } = await getPosts({ page });
  if (!totalPosts || page > totalPages) notFound();

  return <BlogIndex page={page} />;
}
