/**
 * The named image slots that are not part of a service or area document:
 * the homepage sections and the About page.
 *
 * Since plan.md Phase 10 these are uploaded in /admin under
 * Site settings > Images, and `lib/content/settings.js` resolves them with
 * `getSiteImages()`. This file stays the canonical list of slot keys, and
 * every value is `null` — the fallback when a slot has not been filled in,
 * which renders the striped Placeholder.
 *
 * Image descriptor shape (what `toImageProps(doc)` returns and
 * `components/Media.jsx` consumes):
 *   { src: 'https://…', alt: 'descriptive text', width: 1600, height: 1067, caption?: '…' }
 *
 * Alt-text policy: describe what is in the photo for someone who cannot see
 * it ("Two Junk Services Dubai crew carrying a grey sofa into a covered truck"); no
 * keyword lists; `alt: ''` only for purely decorative art. Alt text is a
 * required field on every upload, so it can never be missing.
 */
export const siteImages = {
  crewLoadingSofa: null, // homepage "The crew" section
  crewOnSite: null, // About page crew/truck photo
  clearanceApartments: null, // homepage clearance cards
  clearanceVillas: null,
  clearanceOffices: null,
  clearanceCommercial: null,
  beforeRoom: null, // homepage before/after slider, the cluttered room
  afterRoom: null // the same room cleared; both must be set for the slider to use photos
};

/** True when a descriptor is usable by <Media>. */
export function hasImage(image) {
  return Boolean(image && image.src && image.alt !== undefined && image.width && image.height);
}
