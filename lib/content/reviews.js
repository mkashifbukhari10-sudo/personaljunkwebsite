/**
 * Content access layer — customer reviews (plan.md Phase 8, migrated in 9).
 *
 * Only reviews marked `verified` in the CMS are ever returned, and there is no
 * code fallback: the placeholder set was deleted in Phase 9 precisely so that
 * invented testimonials cannot reach the site. Until a real review is entered
 * this returns an empty list and the homepage omits the section.
 */
import { TAGS, cached, findAll } from './payload';
import { mapReview } from './map';

const loadReviews = cached(
  async () => {
    const docs = await findAll('reviews', { optional: true, where: { verified: { equals: true } } });
    return docs.map(mapReview);
  },
  ['content', 'reviews'],
  [TAGS.reviews]
);

export async function getReviews() {
  return loadReviews();
}
