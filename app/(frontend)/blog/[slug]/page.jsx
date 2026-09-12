import Link from 'next/link';
import { redirectOrNotFound } from '@/lib/content/redirects';
import { draftMode } from 'next/headers';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import Media from '@/components/Media';
import PostBody from '@/components/blog/PostBody';
import PostCard from '@/components/blog/PostCard';
import RelatedLinks from '@/components/blog/RelatedLinks';
import { c, mono, shell, eyebrow, h2 } from '@/lib/theme';
import { postHref } from '@/lib/hrefs';
import { getPostSlugs, getPostBySlug, getDraftPostBySlug, getRelatedPosts } from '@/lib/content/posts';
import { getServices } from '@/lib/content/services';
import { getAreasBySlugs } from '@/lib/content/areas';
import { pageMetadata, ogImageUrl } from '@/lib/seo';
import { blogPostingSchema } from '@/lib/schema';

/**
 * A single blog post (plan.md Phase 13).
 *
 * Published posts are prerendered from `generateStaticParams`. Drafts are
 * never in that list and 404 for the public; an editor previewing from the
 * admin enables Next's Draft Mode (see app/(frontend)/api/preview), which
 * switches this route to a request-time render of the working copy and marks
 * it `noindex`.
 *
 * `dynamicParams` stays true for the Phase 8 reason: with it false, a path
 * revalidated by a Payload hook is no longer in the build-time params list and
 * Next serves a 404 instead of regenerating it.
 */
export const dynamicParams = true;

/** Services to fall back to when a post names no related service or area. */
const FALLBACK_SERVICES = 3;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/** The published post, or the working copy when Draft Mode is on. */
async function loadPost(slug) {
  const { isEnabled } = await draftMode();
  if (isEnabled) {
    const draft = await getDraftPostBySlug(slug);
    if (draft) return { post: draft, isDraft: true };
  }
  const post = await getPostBySlug(slug);
  return { post, isDraft: false };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { post, isDraft } = await loadPost(slug);
  if (!post) return {};

  const path = postHref(post.slug);
  const modified = post.updatedAt || post.publishedAt;

  return pageMetadata({
    path,
    seo: {
      ...post.seo,
      title: post.seo.title || post.title,
      description: post.seo.description || post.excerpt,
      // A preview is a working copy at a live URL: never let it be indexed.
      noIndex: post.seo.noIndex || isDraft
    },
    og: {
      type: 'article',
      ...(post.publishedAt ? { publishedTime: post.publishedAt } : {}),
      ...(modified ? { modifiedTime: modified } : {}),
      ...(post.author ? { authors: [post.author.name] } : {}),
      images: [
        post.coverOgImage
          ? {
              url: post.coverOgImage.src,
              width: post.coverOgImage.width,
              height: post.coverOgImage.height,
              alt: post.coverOgImage.alt
            }
          : { url: ogImageUrl('post', post.slug), width: 1200, height: 630, alt: post.title }
      ]
    }
  });
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const { post, isDraft } = await loadPost(slug);
  // An old slug still has a redirect behind it; only a genuinely unknown one 404s.
  if (!post) await redirectOrNotFound(postHref(slug));

  const [allServices, areas, related] = await Promise.all([
    getServices(),
    getAreasBySlugs(post.relatedAreas),
    getRelatedPosts(post.slug)
  ]);

  // Every post must offer a route back into the money pages. When an editor
  // has named none, show the first few services rather than nothing.
  const named = post.relatedServices.map((s) => allServices.find((x) => x.slug === s)).filter(Boolean);
  const services = named.length || areas.length ? named : allServices.slice(0, FALLBACK_SERVICES);

  const published = post.publishedAt ? new Date(post.publishedAt) : null;
  const updated = post.updatedAt ? new Date(post.updatedAt) : null;
  const showUpdated = published && updated && updated.getTime() - published.getTime() > 24 * 60 * 60 * 1000;

  return (
    <>
      {isDraft ? (
        <div
          style={{
            background: c.bronze,
            color: c.ink,
            padding: '10px clamp(16px, 3vw, 44px)',
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}
        >
          Draft preview &middot; not published &middot; not indexed
        </div>
      ) : null}

      <article>
        <section style={{ background: c.ink, color: '#fff', padding: 'clamp(44px, 6vw, 92px) clamp(16px, 3vw, 44px)' }}>
          <div style={shell}>
            <Breadcrumbs items={[{ href: '/blog', label: 'Blog' }, { href: postHref(post.slug), label: post.title }]} />
            <div style={eyebrow(c.bronze)}>
              {published ? <time dateTime={published.toISOString()}>{formatDate(published)}</time> : 'Draft'}
              {post.readingTime ? ' · ' + post.readingTime + ' min read' : ''}
            </div>
            <h1
              style={{
                margin: '18px 0 0',
                fontSize: 'clamp(32px, 5vw, 68px)',
                lineHeight: 1.02,
                fontWeight: 900,
                letterSpacing: '-0.035em',
                maxWidth: '20ch',
                textWrap: 'balance'
              }}
            >
              {post.title}
            </h1>
            <p style={{ margin: '26px 0 0', maxWidth: '58ch', fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6, color: c.onDark, textWrap: 'pretty' }}>
              {post.excerpt}
            </p>
            {post.author ? (
              <div style={{ marginTop: 26, fontSize: 15, color: 'rgba(255,255,255,0.7)' }}>
                By <span style={{ color: '#fff', fontWeight: 600 }}>{post.author.name}</span>
                {post.author.role ? ' · ' + post.author.role : ''}
                {showUpdated ? (
                  <>
                    {' · updated '}
                    <time dateTime={updated.toISOString()}>{formatDate(updated)}</time>
                  </>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>

        {post.coverImage ? (
          <div style={{ background: c.ink }}>
            <div style={shell}>
              <Media
                image={post.coverImage}
                label={'photo — ' + post.title}
                height="clamp(220px, 34vw, 520px)"
                sizes="(min-width: 1320px) 1320px, 100vw"
                priority
              />
            </div>
          </div>
        ) : null}

        <Reveal style={{ background: c.card, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)' }}>
          <div style={shell}>
            <PostBody content={post.content} />
          </div>
        </Reveal>
      </article>

      <Reveal style={{ background: c.mist, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)', borderTop: '1px solid ' + c.lineSoft }}>
        <div style={shell}>
          <RelatedLinks services={services} areas={areas} />
        </div>
      </Reveal>

      {related.length ? (
        <Reveal style={{ background: c.card, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)', borderTop: '1px solid ' + c.lineSoft }}>
          <div style={shell}>
            <div style={eyebrow(c.muted)}>Keep reading</div>
            <h2 style={{ ...h2, margin: '16px 0 clamp(28px, 4vw, 48px)' }}>More from the crew</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))',
                gap: 'clamp(20px, 2.4vw, 32px)'
              }}
            >
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
            <Link
              href="/blog"
              style={{
                display: 'inline-block',
                marginTop: 'clamp(28px, 3vw, 40px)',
                fontFamily: mono,
                fontSize: 11,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: c.ink,
                borderBottom: '2px solid ' + c.bronze,
                paddingBottom: 6
              }}
            >
              All posts &#8594;
            </Link>
          </div>
        </Reveal>
      ) : null}

      <CtaBand title={<>Something to get rid of?<br />Send a photo.</>} secondary="book" />
      {/* A draft is not a published article, so it gets no BlogPosting markup. */}
      {isDraft ? null : <JsonLd data={blogPostingSchema(post)} />}
    </>
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}
