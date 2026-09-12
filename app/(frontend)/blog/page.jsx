import BlogIndex from '@/components/blog/BlogIndex';
import { pageMetadata } from '@/lib/seo';
import { getBlogIndex } from '@/lib/content/blog';
import { getPosts } from '@/lib/content/posts';

/**
 * The blog index, page 1 (plan.md Phase 12). Pages 2+ live at
 * /blog/page/[n] and share the same component.
 */
export async function generateMetadata() {
  const [index, { totalPosts }] = await Promise.all([getBlogIndex(), getPosts({ page: 1 })]);
  return pageMetadata({
    path: '/blog',
    // An index with nothing on it is kept out of search results until the
    // first post is published.
    seo: { ...index.seo, noIndex: index.seo.noIndex || totalPosts === 0 }
  });
}

export default async function BlogPage() {
  return <BlogIndex page={1} />;
}
