import { revalidatePath, revalidateTag } from 'next/cache';
import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload';

/**
 * Cache invalidation for the frontend (plan.md Phase 8).
 *
 * lib/content/* wraps every Payload read in `unstable_cache` tagged with the
 * collection name; these hooks drop that tag and re-render the affected
 * routes whenever an editor saves or deletes.
 *
 * Both calls are best-effort: `revalidateTag`/`revalidatePath` throw outside a
 * Next request scope (a seed script using the Local API, for example), which
 * must never fail the write.
 */
type PathsFor = (doc: Record<string, any>) => string[];

function flush(tag: string | string[], paths: string[], extra: string[] = []) {
  const tags = Array.isArray(tag) ? tag : [tag];
  try {
    for (const t of tags) revalidateTag(t);
    for (const path of [...paths, ...extra]) revalidatePath(path);
  } catch (err) {
    console.warn('[payload] revalidation skipped for "' + tags.join(', ') + '":', (err as Error).message);
  }
}

/** Always refreshed: the sitemap lists every service and area URL. */
const ALWAYS = ['/sitemap.xml'];

export const revalidateAfterChange =
  (tag: string | string[], paths: string[] = [], pathsFor?: PathsFor): CollectionAfterChangeHook =>
  ({ doc }) => {
    flush(tag, [...ALWAYS, ...paths], pathsFor ? pathsFor(doc) : []);
    return doc;
  };

export const revalidateAfterDelete =
  (tag: string | string[], paths: string[] = [], pathsFor?: PathsFor): CollectionAfterDeleteHook =>
  ({ doc }) => {
    flush(tag, [...ALWAYS, ...paths], pathsFor ? pathsFor(doc) : []);
    return doc;
  };

export const revalidateGlobalAfterChange =
  (tag: string | string[], paths: string[] = []): GlobalAfterChangeHook =>
  ({ doc }) => {
    flush(tag, [...ALWAYS, ...paths]);
    return doc;
  };
