import { absoluteUrl, site } from '@/lib/site';
import { postHref } from '@/lib/hrefs';
import { getAllPosts } from '@/lib/content/posts';
import { getBlogIndex } from '@/lib/content/blog';

/**
 * RSS 2.0 feed of published posts (plan.md Phase 14, approved as optional).
 *
 * Excerpts only, not full bodies: the feed is for discovery, and a full-text
 * feed invites scrapers to republish the article in full. Anything marked
 * `noIndex` is left out, for the same reason it is left out of the sitemap.
 *
 * Refreshed on the same hourly cycle as the sitemap.
 */
export const revalidate = 3600;

const ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' };
const escapeXml = (value) => String(value ?? '').replace(/[&<>"']/g, (ch) => ESCAPES[ch]);

/** RFC 822, which is what RSS wants. */
const rfc822 = (value) => {
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toUTCString() : new Date().toUTCString();
};

export async function GET() {
  const [index, posts] = await Promise.all([getBlogIndex(), getAllPosts()]);
  const live = posts.filter((p) => !(p.seo && p.seo.noIndex));
  const self = absoluteUrl('/feed.xml');

  const items = live
    .map((post) => {
      const url = absoluteUrl(postHref(post.slug));
      return [
        '    <item>',
        '      <title>' + escapeXml(post.title) + '</title>',
        '      <link>' + escapeXml(url) + '</link>',
        '      <guid isPermaLink="true">' + escapeXml(url) + '</guid>',
        '      <description>' + escapeXml(post.excerpt) + '</description>',
        '      <pubDate>' + rfc822(post.publishedAt) + '</pubDate>',
        post.author ? '      <dc:creator>' + escapeXml(post.author.name) + '</dc:creator>' : '',
        '    </item>'
      ]
        .filter(Boolean)
        .join('\n');
    })
    .join('\n');

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    '  <channel>',
    '    <title>' + escapeXml(index.seo.title) + '</title>',
    '    <link>' + escapeXml(absoluteUrl('/blog')) + '</link>',
    '    <description>' + escapeXml(index.seo.description) + '</description>',
    '    <language>' + escapeXml(site.language) + '</language>',
    '    <lastBuildDate>' + rfc822(live[0] && live[0].publishedAt) + '</lastBuildDate>',
    '    <atom:link href="' + escapeXml(self) + '" rel="self" type="application/rss+xml"/>',
    items,
    '  </channel>',
    '</rss>'
  ]
    .filter((line) => line !== '')
    .join('\n');

  return new Response(xml, {
    headers: {
      'content-type': 'application/rss+xml; charset=utf-8',
      'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400'
    }
  });
}
