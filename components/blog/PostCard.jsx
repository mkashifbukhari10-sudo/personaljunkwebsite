import Link from 'next/link';
import Media from '@/components/Media';
import { c, mono } from '@/lib/theme';
import { postHref } from '@/lib/hrefs';

/**
 * One post on the blog index (plan.md Phase 12). A server component: the whole
 * card is static, and the only interactive part is the heading link, so there
 * is no reason to ship JavaScript for it.
 *
 * `post` is the card shape from `mapPostCard` — no body, which keeps the
 * listing page's RSC payload small.
 */
export default function PostCard({ post, priority = false }) {
  const href = postHref(post.slug);
  const date = post.publishedAt ? new Date(post.publishedAt) : null;

  return (
    <article
      style={{
        outline: '1px solid ' + c.line,
        background: c.mist,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%'
      }}
    >
      <Media
        image={post.coverImage}
        label={'photo — ' + post.title}
        height="clamp(170px, 18vw, 220px)"
        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        priority={priority}
      />

      <div style={{ padding: 'clamp(20px, 2.4vw, 30px)', display: 'flex', flexDirection: 'column', gap: 12, flex: 1 }}>
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
            fontFamily: mono,
            fontSize: 10,
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: c.muted
          }}
        >
          {date ? <time dateTime={date.toISOString()}>{formatDate(date)}</time> : null}
          {post.readingTime ? <span>{post.readingTime} min read</span> : null}
        </div>

        <h2
          className="jk-h"
          style={{ margin: 0, fontSize: 'clamp(19px, 2vw, 25px)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1.12 }}
        >
          <Link href={href} className="jk-indent" style={{ color: c.ink }}>
            {post.title}
          </Link>
        </h2>

        <p style={{ margin: 0, fontSize: 15, lineHeight: 1.58, color: c.body, textWrap: 'pretty' }}>{post.excerpt}</p>

        {post.author ? (
          <div style={{ marginTop: 'auto', paddingTop: 10, fontSize: 13, color: c.muted }}>
            {post.author.name}
            {post.author.role ? ' · ' + post.author.role : ''}
          </div>
        ) : null}
      </div>
    </article>
  );
}

/** "12 September 2026" — unambiguous, and matches the en-AE copy elsewhere. */
function formatDate(date) {
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date);
}
