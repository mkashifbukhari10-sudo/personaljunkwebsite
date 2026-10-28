/**
 * Customer reviews for the homepage carousel.
 *
 * The only source is the business config in lib/content/settings.js. The list
 * stays empty until real reviews are added there. Nothing on the site invents
 * a quote, a name or a rating.
 */
import { getSiteSettings } from './settings';

export async function getReviews() {
  const settings = await getSiteSettings();
  return settings.reviews.map((review) => ({
    quote: review.body,
    name: review.author,
    meta: review.date || 'Google review',
    rating: review.rating
  }));
}
