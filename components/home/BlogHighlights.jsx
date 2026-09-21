import Link from 'next/link';
import PostCard from '@/components/blog/PostCard';
import Reveal from '@/components/Reveal';
import { c, shell, pad, eyebrow, h2 } from '@/lib/theme';

export default function BlogHighlights({ posts = [] }) {
  if (!posts.length) return null;

  return (
    <section style={{ background: c.panel, padding: pad }} aria-labelledby="home-blog-title">
      <div style={shell}>
        <Reveal>
          <div className="jk-blog-highlights-heading">
            <div style={{ maxWidth: '720px' }}>
              <div style={eyebrow(c.bronzeDeep)}>From the blog</div>
              <h2 id="home-blog-title" style={{ ...h2, marginTop: '10px' }}>
                Practical guides for a smoother clear-out
              </h2>
              <p style={{ color: c.muted, fontSize: 'clamp(16px, 1.5vw, 19px)', lineHeight: 1.6, margin: '12px 0 0', maxWidth: '620px' }}>
                Clear advice on junk removal, recycling, pricing, and preparing your space before collection day.
              </p>
            </div>
            <Link className="jk-text-link" href="/blog" style={{ color: c.green, fontWeight: 800 }}>
              View all articles <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        <div className="jk-blog-highlights-grid">
          {posts.slice(0, 3).map((post, index) => (
            <Reveal delay={index * 60} key={post.id || post.slug}>
              <PostCard post={post} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
