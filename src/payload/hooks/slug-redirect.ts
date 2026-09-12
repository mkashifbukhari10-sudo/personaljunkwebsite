import type { CollectionAfterChangeHook } from 'payload';

/**
 * Records a 301 whenever a published page's slug changes (plan.md Phase 14).
 *
 * Until this phase the slug field simply refused the change, because the old
 * URL was live and indexed with nowhere to send it. Now there is somewhere:
 * the change is allowed and the old path is redirected to the new one.
 *
 * Two details keep the redirect table honest:
 * - **No chains.** If anything already pointed at the old path, it is
 *   re-pointed at the new one, so a crawler never follows two hops.
 * - **No loops.** A redirect whose `from` equals the new path is removed —
 *   that happens when a slug is changed and then changed back.
 */
export const recordSlugChange =
  (pathFor: (slug: string) => string): CollectionAfterChangeHook =>
  async ({ doc, previousDoc, req }) => {
    const before = previousDoc?.slug;
    const after = doc?.slug;
    if (!before || !after || before === after) return doc;

    // Only a published page has a URL worth preserving.
    const wasPublished = previousDoc?._status ? previousDoc._status === 'published' : true;
    if (!wasPublished) return doc;

    const from = pathFor(before);
    const to = pathFor(after);
    const payload = req.payload;

    try {
      // The new path must not redirect anywhere (it did if the slug was
      // changed and then changed back).
      const loops = await payload.find({
        collection: 'redirects',
        where: { from: { equals: to } },
        depth: 0,
        pagination: false,
        overrideAccess: true,
        req
      });
      for (const loop of loops.docs) {
        await payload.delete({ collection: 'redirects', id: loop.id, overrideAccess: true, req });
      }

      // Anything already aimed at the old path now aims at the new one.
      const chained = await payload.find({
        collection: 'redirects',
        where: { to: { equals: from } },
        depth: 0,
        pagination: false,
        overrideAccess: true,
        req
      });
      for (const link of chained.docs) {
        await payload.update({ collection: 'redirects', id: link.id, data: { to }, overrideAccess: true, req });
      }

      const data = { from, to, type: '301' as const, note: 'Created automatically when the slug changed.' };
      const existing = await payload.find({
        collection: 'redirects',
        where: { from: { equals: from } },
        depth: 0,
        limit: 1,
        pagination: false,
        overrideAccess: true,
        req
      });

      if (existing.docs.length) {
        await payload.update({ collection: 'redirects', id: existing.docs[0].id, data, overrideAccess: true, req });
      } else {
        await payload.create({ collection: 'redirects', data, overrideAccess: true, req });
      }
    } catch (err) {
      // A failed redirect must not fail the editor's save; the page is already
      // written by this point. Log loudly so it can be added by hand.
      console.error(
        '[redirects] could not record ' + from + ' -> ' + to + ': ' + (err instanceof Error ? err.message : String(err))
      );
    }

    return doc;
  };
