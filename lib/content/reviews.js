/**
 * Content access layer — customer reviews.
 *
 * Only genuine, verified reviews may be shown or marked up (plan.md Phase 8).
 * None have been supplied yet, so the list is empty and the homepage hides
 * its reviews section. Add real ones to `reviews` below as
 * { quote, name, meta, source?, rating? }.
 */
const reviews = [];

export async function getReviews() {
  return reviews;
}
