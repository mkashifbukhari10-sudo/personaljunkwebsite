import { site } from './site';

/**
 * Default social image, served at a stable URL by app/og/[key]/route.js.
 * Listed explicitly because a page-level `openGraph` export replaces the
 * layout's object wholesale, which would otherwise drop the image on sub-routes.
 */
export const defaultOgImage = {
  url: '/og/default',
  width: 1200,
  height: 630,
  alt: site.fullName + ' — ' + site.tagline
};

/** Stable URL of a generated social image: ogImageUrl('service', slug) → /og/service-{slug}. */
export function ogImageUrl(kind, slug) {
  return kind && slug ? '/og/' + kind + '-' + slug : defaultOgImage.url;
}

/** RSS discovery, carried by every page (plan.md Phase 14). */
export const feedAlternate = {
  'application/rss+xml': [{ url: '/feed.xml', title: site.fullName + ' \u2014 blog' }]
};

/**
 * Open Graph block for a route. Next.js does not deep-merge `openGraph`
 * between layout and page, so every page that sets it must set the whole
 * object; this keeps siteName/locale/type/images consistent.
 */
export function openGraphFor(path, overrides = {}) {
  return {
    type: 'website',
    siteName: site.fullName,
    locale: site.locale,
    url: path,
    images: [defaultOgImage],
    ...overrides
  };
}

/**
 * Page-level metadata. Omit `title` to fall back to the layout default
 * (used by the homepage). Title/description flow through to OG and Twitter
 * automatically unless overridden in `og`.
 *
 * `seo` is the optional CMS override group (plan.md Phase 8): the resolved
 * `seo` object from a Payload Service/Area document. Anything set on it wins
 * over the explicit arguments; anything empty leaves them untouched, so
 * callers that pass no `seo` behave exactly as before.
 */
export function pageMetadata({ title, description, path, og, seo }) {
  const cms = seo || {};
  const canonical = cms.canonical || path;
  const overrides = { ...og };
  if (cms.ogTitle) overrides.title = cms.ogTitle;
  if (cms.ogDescription) overrides.description = cms.ogDescription;
  if (cms.ogImage) {
    overrides.images = [{ url: cms.ogImage.src, width: cms.ogImage.width, height: cms.ogImage.height, alt: cms.ogImage.alt }];
  }

  const meta = {
    description: cms.description || description,
    // Next does not deep-merge `alternates` between layout and page either, so
    // the feed link has to be repeated on every route that sets a canonical.
    alternates: { canonical, types: feedAlternate },
    openGraph: openGraphFor(canonical, overrides)
  };
  const resolvedTitle = cms.title || title;
  if (resolvedTitle) meta.title = resolvedTitle;
  if (cms.noIndex) {
    meta.robots = { index: false, follow: true, googleBot: { index: false, follow: true } };
  }
  return meta;
}
