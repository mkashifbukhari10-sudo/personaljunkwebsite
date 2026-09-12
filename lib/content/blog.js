/**
 * Content access layer — the blog index copy (plan.md Phase 12).
 *
 * The `Blog` global holds only the framing around the post list. Nothing here
 * has invented copy as a fallback: if a field is empty the page uses a literal
 * label ("Blog"), which is a name rather than marketing, and the index is
 * `noIndex` until a post exists anyway.
 */
import { site } from '@/lib/site';
import { TAGS, cached, findGlobal } from './payload';

const text = (value, fallback) => (typeof value === 'string' && value.trim() ? value.trim() : fallback);

const loadBlog = cached(async () => findGlobal('blog'), ['content', 'blog'], [TAGS.posts]);

export async function getBlogIndex() {
  const doc = (await loadBlog()) || {};
  const seo = doc.seo || {};
  return {
    h1: text(doc.h1, 'Blog'),
    intro: text(doc.intro, ''),
    emptyState: text(doc.emptyState, ''),
    seo: {
      title: text(seo.title, 'Blog'),
      description: text(seo.description, site.shortDescription),
      canonical: text(seo.canonical, ''),
      noIndex: Boolean(seo.noIndex),
      ogTitle: text(seo.ogTitle, ''),
      ogDescription: text(seo.ogDescription, '')
    }
  };
}
