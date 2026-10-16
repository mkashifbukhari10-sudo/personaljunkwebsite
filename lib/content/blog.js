/**
 * Content access layer — the blog index page's own copy (H1, intro, empty
 * state, SEO). The source is content/blog.js.
 */
import { site } from '@/lib/site';
import { blog } from '@/content/blog';

const text = (value, fallback) => (typeof value === 'string' && value.trim() ? value.trim() : fallback);

export async function getBlogIndex() {
  const seo = blog.seo || {};
  return {
    h1: text(blog.h1, 'Blog'),
    intro: text(blog.intro, ''),
    emptyState: text(blog.emptyState, ''),
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
