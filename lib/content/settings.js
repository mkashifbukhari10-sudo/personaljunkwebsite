/**
 * Content access layer — site settings and navigation (plan.md Phase 8).
 *
 * These two globals are the one place where code fallbacks survived the Phase 9
 * migration: any field left empty falls back to lib/site.js, so an unfilled
 * setting can never blank the header, the footer or the business schema.
 *
 * The facts that can only come from the business — street address, geographic
 * coordinates, opening hours, social profiles — have NO fallback on purpose:
 * they are omitted from structured data until someone fills them in.
 */
import { site, contact, navLinks } from '@/lib/site';
import { siteImages as imageSlots } from '@/lib/images';
import { TAGS, cached, findGlobal } from './payload';
import { toImageProps } from './media';

/** The footer's own link column. Replaced when Navigation.footerColumns is filled in. */
const codeFooterColumns = [
  {
    title: 'Explore',
    links: [
      { href: '/how-it-works', label: 'How it works' },
      { href: '/blog', label: 'Blog' },
      { href: '/about', label: 'About Junkit' },
      { href: '/contact', label: 'Book a pickup' }
    ]
  }
];

const text = (value, fallback) => (typeof value === 'string' && value.trim() ? value.trim() : fallback);

/** Digits-only E.164 form, e.g. "+971 56 725 6386" -> "+971567256386". */
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
  return rows.map((r) => text(r.url, '')).filter(Boolean);
}

const loadSettings = cached(
  async () => findGlobal('site-settings'),
  ['content', 'settings'],
  [TAGS.settings]
);

/**
 * Resolved business identity. `address`, `geo`, `openingHours` and `sameAs`
 * are null/empty until the CMS supplies them — callers must check.
 */
export async function getSiteSettings() {
  const doc = (await loadSettings()) || {};
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
    sameAs: mapSameAs(doc.sameAs),
    googleSiteVerification: text(doc.googleSiteVerification, '')
  };
}

const loadNavigation = cached(
  async () => findGlobal('navigation'),
  ['content', 'navigation'],
  [TAGS.settings]
);

/**
 * The fixed photo slots on the homepage and About page (plan.md Phase 10).
 * Keys are the ones lib/images.js documents; each one resolves to an image
 * descriptor or null, so components/Media.jsx draws the placeholder for any
 * slot an editor has not filled.
 */
export async function getSiteImages() {
  const doc = (await loadSettings()) || {};
  const uploaded = doc.siteImages || {};
  const slots = {};
  for (const key of Object.keys(imageSlots)) slots[key] = toImageProps(uploaded[key]) || imageSlots[key];
  return slots;
}

/** Header links and the footer's extra link columns, with the code lists as fallback. */
export async function getNavigation() {
  const doc = (await loadNavigation()) || {};
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
