/**
 * Content access layer — redirects (plan.md Phase 14).
 *
 * Looked up by the catch-all route (and unknown blog slugs) for paths that
 * match no real page.
 */

/**
 * Old path -> new path, for retired or renamed URLs. Add entries as
 * { from: '/blog/old-slug', to: '/blog/new-slug', permanent: true }.
 */
const REDIRECTS = [];

const loadRedirects = async () => REDIRECTS.map((d) => ({ ...d, from: normalisePath(d.from), permanent: d.permanent !== false }));

export function normalisePath(path) {
  const clean = String(path || '')
    .trim()
    .split('?')[0]
    .split('#')[0]
    .toLowerCase();
  if (!clean.startsWith('/')) return '/' + clean;
  return clean.length > 1 ? clean.replace(/\/+$/, '') : '/';
}

/** The redirect for a path, or null. */
export async function getRedirect(path) {
  const target = normalisePath(path);
  if (target === '/') return null;
  const all = await loadRedirects();
  return all.find((r) => r.from === target) || null;
}

export async function getRedirects() {
  return loadRedirects();
}

/**
 * What a route should do when it cannot find a document for a path: follow a
 * redirect if one exists, otherwise 404.
 *
 * This has to be called from the `[slug]` routes as well as the catch-all,
 * because Next matches `/blog/[slug]` before `[...notFound]` — so an old slug
 * would 404 inside the post route and never reach the redirect lookup.
 *
 * Only reached for paths with no document behind them, so it costs nothing on
 * normal traffic. Never returns.
 */
export async function redirectOrNotFound(path) {
  const { notFound, permanentRedirect, redirect } = await import('next/navigation');
  const match = await getRedirect(path);
  if (match) {
    if (match.permanent) permanentRedirect(match.to);
    redirect(match.to);
  }
  notFound();
}
