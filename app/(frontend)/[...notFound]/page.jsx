import { redirectOrNotFound } from '@/lib/content/redirects';

/**
 * Catch-all for URLs no other route matches. With two root layouts
 * (frontend + Payload admin) Next cannot use a global not-found page, so this
 * route sends every unmatched path to app/(frontend)/not-found.jsx with a 404
 * status. Rendered on demand; never linked or indexed.
 *
 * Before answering 404 it checks the Redirects collection (plan.md Phase 14).
 * Doing the lookup here rather than in middleware means it runs on the Node
 * runtime with the Payload Local API, costs nothing on normal traffic, and
 * cannot shadow a live page — a real route would have matched first.
 */
export default async function NotFoundCatchAll({ params }) {
  const { notFound: segments } = await params;
  const path = '/' + (Array.isArray(segments) ? segments.join('/') : '');

  await redirectOrNotFound(path);
}
