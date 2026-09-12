import { unstable_cache } from 'next/cache';

/**
 * Payload access for the content layer (plan.md Phases 8-9).
 *
 * Server-only. Never import this (or anything under lib/content/) from a
 * client component — it pulls in the Payload runtime. Client components get
 * their data as props from a server component; URL helpers live in
 * lib/hrefs.js and are safe to import anywhere.
 *
 * Since the Phase 9 migration there is no code copy of the content to fall
 * back to: Payload is the only source. So the failure modes are deliberate and
 * different from each other:
 *
 * - **The CMS cannot be reached** (no `DATABASE_URI`, wrong credentials, server
 *   down) — throw. This is a misconfiguration, and a build or a request that
 *   quietly produced a site with no services would be far worse than one that
 *   fails.
 * - **The CMS is reachable but a collection is empty** — return an empty list
 *   and warn. A fresh database before `npm run seed` is a legitimate state, and
 *   failing the build there would also block access to the admin that has to
 *   fix it.
 *
 * `SiteSettings` and `Navigation` are the exception: fields left empty there
 * still fall back to lib/site.js, so an unfilled setting never blanks the site.
 */

/** Cache tags. Payload's afterChange/afterDelete hooks revalidate these. */
export const TAGS = {
  services: 'services',
  areas: 'areas',
  faqs: 'faqs',
  reviews: 'reviews',
  posts: 'posts',
  redirects: 'redirects',
  settings: 'settings'
};

const MISSING_DB =
  'DATABASE_URI is not set. The site reads all of its content from Payload since the ' +
  'Phase 9 migration, so it cannot render without a database. Set DATABASE_URI and ' +
  'PAYLOAD_SECRET (see .env.example), then run `npm run seed` to populate an empty one.';

const emptyWarned = new Set();
function warnEmpty(collection) {
  if (emptyWarned.has(collection)) return;
  emptyWarned.add(collection);
  console.warn(
    '[content] The "' + collection + '" collection is empty, so nothing will render for it. ' +
      'Run `npm run seed` to populate a fresh database, or add documents in /admin.'
  );
}

let clientPromise = null;

/** The Payload Local API client. Throws if the CMS cannot be reached. */
async function client() {
  if (!process.env.DATABASE_URI) throw new Error('[content] ' + MISSING_DB);
  if (!clientPromise) {
    clientPromise = (async () => {
      const [{ getPayload }, configModule] = await Promise.all([import('payload'), import('@payload-config')]);
      return getPayload({ config: configModule.default });
    })().catch((err) => {
      clientPromise = null; // let the next request retry rather than cache the failure
      throw new Error('[content] Could not connect to Payload: ' + (err && err.message ? err.message : err));
    });
  }
  return clientPromise;
}

/**
 * Every document of a collection, in the collection's default order.
 * Returns `[]` when there are no documents, warning unless `optional: true`
 * (an empty result is the normal state for a filtered or not-yet-used set).
 *
 * For a collection with drafts enabled, pass `publishedOnly: true`: Payload
 * keeps the working draft in the same table, so `draft: false` alone still
 * returns documents that have never been published.
 */
export async function findAll(collection, { publishedOnly = false, optional = false, where, ...options } = {}) {
  const filter = publishedOnly
    ? { and: [{ _status: { equals: 'published' } }, ...(where ? [where] : [])] }
    : where;
  const payload = await client();
  const { docs } = await payload.find({
    collection,
    pagination: false,
    depth: 1,
    draft: false,
    overrideAccess: true,
    ...(filter ? { where: filter } : {}),
    ...options
  });
  if (!docs || !docs.length) {
    if (!optional) warnEmpty(collection);
    return [];
  }
  return docs;
}

/**
 * One document matched by a field, read straight from Payload without the
 * cache. Used for Draft Mode preview (plan.md Phase 13): a draft must never be
 * cached, and must never be mixed into the published lists.
 */
export async function findOne(collection, where, { draft = false, depth = 1 } = {}) {
  const payload = await client();
  const { docs } = await payload.find({
    collection,
    where,
    limit: 1,
    depth,
    draft,
    overrideAccess: true,
    pagination: false
  });
  return docs && docs.length ? docs[0] : null;
}

/** A global's document. Its fields may be empty; callers fall back to lib/site.js. */
export async function findGlobal(slug, options = {}) {
  const payload = await client();
  return payload.findGlobal({ slug, depth: 1, overrideAccess: true, ...options });
}

/** `unstable_cache` with the given tags; Payload's hooks revalidate them on save. */
export function cached(fn, keyParts, tags) {
  return unstable_cache(fn, keyParts, { tags });
}
