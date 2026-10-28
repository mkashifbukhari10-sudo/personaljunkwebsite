/**
 * Content access layer — site settings, navigation and site photography.
 *
 * Business facts come from lib/site.js. The facts that can only come from the
 * business — street address, geographic coordinates, opening hours, social
 * profiles, a Search Console token — are deliberately empty and stay out of
 * structured data until real values are added to `business` below.
 */
import { site, contact, navLinks } from '@/lib/site';
import { siteImages as imageSlots } from '@/lib/images';
import { photos, siteSlots } from '@/content/images';

/**
 * Real business facts only. Every value below is intentionally empty.
 *
 * Do not invent a street address, map pin, price range, Google rating, review
 * count, trade licence or testimonial. Empty values are omitted from JSON-LD
 * and the trust-signal block stays hidden until the owner fills them in.
 *
 * address: { streetAddress, addressLocality, addressRegion, postalCode, addressCountry }
 * geo: { latitude, longitude }
 * openingHours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '08:00', closes: '20:00' }]
 * sameAs: ['https://www.instagram.com/…', 'https://www.facebook.com/…']
 * googleBusinessProfile: 'https://maps.google.com/…'  // also added to sameAs
 * tradeLicence: ''  // Dubai trade licence number, exactly as issued
 * priceRange: ''    // schema.org priceRange, e.g. '$$' — leave blank
 * rating: null      // { value: 4.8, count: 120, best: 5 } from the real Google listing only
 * reviews: []       // { author, body, date, rating } — real reviews only, never written for the site
 */
const business = {
  address: null,
  geo: null,
  openingHours: [],
  sameAs: [],
  googleBusinessProfile: '',
  googleSiteVerification: '',
  tradeLicence: '',
  priceRange: '',
  rating: null,
  reviews: []
};

const codeFooterColumns = [
  {
    title: 'Explore',
    links: [
      { href: '/how-it-works', label: 'How it works' },
      { href: '/blog', label: 'Blog' },
      { href: '/about', label: 'About us' },
      { href: '/contact', label: 'Book a pickup' }
    ]
  }
];

const text = (value, fallback) => (typeof value === 'string' && value.trim() ? value.trim() : fallback);

/** Digits-only E.164 form, e.g. "+971 55 103 1255" -> "+971551031255". */
function toE164(phone) {
  const digits = String(phone).replace(/[^\d]/g, '');
  return digits ? '+' + digits : '';
}

function mapAddress(address) {
  // A postal address is only published when it has a street line; a locality
  // on its own is already covered by `city`.
  if (!address || !text(address.streetAddress, '')) return null;
  const out = { streetAddress: address.streetAddress.trim() };
  for (const key of ['addressLocality', 'addressRegion', 'postalCode', 'addressCountry']) {
    const value = text(address[key], '');
    if (value) out[key] = value;
  }
  return out;
}

function mapGeo(geo) {
  if (!geo || typeof geo.latitude !== 'number' || typeof geo.longitude !== 'number') return null;
  return { latitude: geo.latitude, longitude: geo.longitude };
}

function mapOpeningHours(rows) {
  if (!Array.isArray(rows)) return [];
  return rows
    .filter((r) => Array.isArray(r.days) && r.days.length && r.opens && r.closes)
    .map((r) => ({ days: r.days, opens: r.opens, closes: r.closes }));
}

function mapSameAs(rows) {
  if (!Array.isArray(rows)) return [];
  return rows.map((r) => text(typeof r === 'string' ? r : r.url, '')).filter(Boolean);
}

function mapRating(rating) {
  if (!rating || typeof rating.value !== 'number' || typeof rating.count !== 'number') return null;
  if (!(rating.value > 0) || !(rating.count > 0)) return null;
  return { value: rating.value, count: rating.count, best: typeof rating.best === 'number' ? rating.best : 5 };
}

function mapReviews(rows) {
  if (!Array.isArray(rows)) return [];
  return rows
    .filter((review) => review && text(review.author, '') && text(review.body, ''))
    .map((review) => ({
      author: review.author.trim(),
      body: review.body.trim(),
      date: text(review.date, ''),
      rating: typeof review.rating === 'number' ? review.rating : null
    }));
}

/**
 * Resolved business identity. `address`, `geo`, `openingHours` and `sameAs`
 * are null/empty until the CMS supplies them — callers must check.
 */
export async function getSiteSettings() {
  const doc = { ...business, defaultSeo: {} };
  const phone = text(doc.phone, contact.phone);
  return {
    siteName: text(doc.siteName, site.fullName),
    tagline: text(doc.tagline, site.tagline),
    description: text(doc.defaultSeo && doc.defaultSeo.description, site.description),
    foundingYear: text(doc.foundingYear, site.foundingYear),
    city: site.city,
    countryCode: site.countryCode,
    language: site.language,
    phone,
    phoneE164: toE164(phone),
    whatsapp: text(doc.whatsapp, contact.whatsapp),
    address: mapAddress(doc.address),
    geo: mapGeo(doc.geo),
    openingHours: mapOpeningHours(doc.openingHours),
    sameAs: [...new Set([...mapSameAs(doc.sameAs), text(doc.googleBusinessProfile, '')].filter(Boolean))],
    googleBusinessProfile: text(doc.googleBusinessProfile, ''),
    googleSiteVerification: text(doc.googleSiteVerification, ''),
    tradeLicence: text(doc.tradeLicence, ''),
    priceRange: text(doc.priceRange, ''),
    rating: mapRating(doc.rating),
    reviews: mapReviews(doc.reviews)
  };
}

/**
 * The fixed photo slots on the homepage and About page (plan.md Phase 10).
 * Keys are the ones lib/images.js documents; each one resolves to an image
 * descriptor or null, so components/Media.jsx draws the placeholder for any
 * slot an editor has not filled.
 */
export async function getSiteImages() {
  const slots = {};
  for (const key of Object.keys(imageSlots)) slots[key] = photos[siteSlots[key]] || imageSlots[key];
  return slots;
}

/** Header links and the footer's extra link columns, with the code lists as fallback. */
export async function getNavigation() {
  const doc = {};
  const primary = Array.isArray(doc.primary) && doc.primary.length
    ? doc.primary.filter((l) => l.href && l.label).map((l) => ({ href: l.href, label: l.label }))
    : navLinks;
  const columns = Array.isArray(doc.footerColumns) && doc.footerColumns.length
    ? doc.footerColumns.map((col) => ({
        title: col.title,
        links: (col.links || []).filter((l) => l.href && l.label).map((l) => ({ href: l.href, label: l.label }))
      }))
    : codeFooterColumns;
  return { primary: primary.length ? primary : navLinks, footerColumns: columns };
}
