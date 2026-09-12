import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import InlineText from '@/components/InlineText';
import PostCard from '@/components/blog/PostCard';
import Pagination from '@/components/blog/Pagination';
import { c, shell } from '@/lib/theme';
import { postHref, blogPageHref } from '@/lib/hrefs';
import { getPosts } from '@/lib/content/posts';
import { getBlogIndex } from '@/lib/content/blog';
import { collectionPageSchema } from '@/lib/schema';

/**
 * The blog index, shared by /blog and /blog/page/[n] (plan.md Phase 12) so the
 * two routes cannot drift apart. Only the metadata differs between them, and
 * that is built in each route file.
 *
 * With no published posts the page shows the editor's holding message; the
 * routes mark it `noIndex` in that state so an empty index is never indexed.
 */
export default async function BlogIndex({ page }) {
  const [index, { posts, totalPages, totalPosts }] = await Promise.all([getBlogIndex(), getPosts({ page })]);
  const path = blogPageHref(page);
  const heading = page > 1 ? index.h1 + ' — page ' + page : index.h1;

  const schema = totalPosts
    ? collectionPageSchema({
        path,
        name: page > 1 ? index.seo.title + ' — Page ' + page : index.seo.title,
        description: index.seo.description,
        items: posts.map((p) => ({ name: p.title, href: postHref(p.slug) }))
      })
    : null;

  return (
    <>
      <PageHero
        title={heading}
        crumbs={[{ href: '/blog', label: 'Blog' }]}
        lead={index.intro ? <InlineText text={index.intro} linkStyle={{ color: '#fff', borderBottom: '1px solid ' + c.bronze }} /> : null}
      >
        Junk removal,
        <br />
        explained.
      </PageHero>

      <Reveal style={{ background: c.card, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)' }}>
        <div style={shell}>
          {posts.length ? (
            <>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                  gap: 'clamp(20px, 2.4vw, 32px)'
                }}
              >
                {posts.map((post, i) => (
                  <PostCard key={post.slug} post={post} priority={page === 1 && i === 0} />
                ))}
              </div>
              <Pagination page={page} totalPages={totalPages} />
            </>
          ) : (
            <p style={{ margin: 0, maxWidth: '52ch', fontSize: 'clamp(17px, 1.6vw, 20px)', lineHeight: 1.6, color: c.body, textWrap: 'pretty' }}>
              {index.emptyState ? (
                <InlineText text={index.emptyState} linkStyle={{ color: c.bronzeDeep, borderBottom: '1px solid ' + c.bronze }} />
              ) : (
                'No posts yet.'
              )}
            </p>
          )}
        </div>
      </Reveal>

      <CtaBand title={<>Something to get rid of?<br />Send a photo.</>} secondary="book" />
      {schema ? <JsonLd data={schema} /> : null}
    </>
  );
}
