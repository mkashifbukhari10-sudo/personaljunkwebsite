/**
 * URL shapes for content entities. Kept in a dependency-free module so both
 * server and client components can import it (lib/content/* will later import
 * Payload and must never be pulled into a client bundle).
 */

/** Service landing page. */
export function serviceHref(slug) {
  return '/services/' + slug;
}

/** Area landing page. */
export function areaHref(slug) {
  return '/areas/' + slug;
}

/** Blog post. The listing itself is /blog. */
export function postHref(slug) {
  return '/blog/' + slug;
}

/** Blog index, page n. Page 1 is /blog itself, never /blog/page/1. */
export function blogPageHref(n) {
  return n <= 1 ? '/blog' : '/blog/page/' + n;
}

/** Where a homepage service group links: the first canonical service it covers. */
export function groupHref(group) {
  return serviceHref(group.services[0]);
}
