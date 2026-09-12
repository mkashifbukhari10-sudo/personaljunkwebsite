/**
 * Content access layer — redirects (plan.md Phase 14).
 *
 * Looked up by the catch-all route for paths that match no real page, so a
 * redirect added in the admin works on the next request without a rebuild.
 * Cached and tagged, so the lookup costs one query per deploy rather than one
 * per 404.
 */
import { TAGS, cached, findAll } from './payload';

const loadRedirects = cached(
  async () => {
    const docs = await findAll('redirects', { optional: true, depth: 0 });
    return docs
      .filter((d) => d.from && d.to)
      .map((d) => ({ from: normalisePath(d.from), to: String(d.to).trim(), permanent: d.type !== '302' }));
  },
  ['content', 'redirects'],
  [TAGS.redirects]
);

/**
 * Trailing slashes and case are not meaningful in our URLs, and the site is
 * `trailingSlash: false`, so both forms of an old link resolve to one entry.
 */
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
