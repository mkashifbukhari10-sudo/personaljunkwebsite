/**
 * Single source of truth for site identity and business facts used by
 * metadata, robots, sitemap and JSON-LD.
 *
 * Only facts that already appear in the site copy live here. Anything not
 * known (street address, geo, opening times, social profiles) is deliberately
 * left out rather than guessed.
 */

const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
const FALLBACK_URL = 'http://localhost:3000';

/**
 * Where absolute URLs point, in order of preference:
 *
 * 1. `NEXT_PUBLIC_SITE_URL` — the real origin, once there is one.
 * 2. Vercel's **stable production domain** (`…vercel.app`). Same on every
 *    deploy, so it is safe to put in a canonical.
 * 3. Vercel's per-deployment URL — different every push, so it is a last
 *    resort that keeps a preview coherent rather than pointing at localhost.
 * 4. localhost, for development.
 *
 * Vercel exposes these automatically; the `NEXT_PUBLIC_` copies exist because
 * this module is also imported by client components, where unprefixed
 * variables are stripped from the bundle.
 */
const vercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV || process.env.VERCEL_ENV;
const vercelProductionHost =
  process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_PROJECT_PRODUCTION_URL;
const vercelDeploymentHost = process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;

const resolvedUrl =
  envUrl ||
  (vercelProductionHost && 'https://' + vercelProductionHost) ||
  (vercelDeploymentHost && 'https://' + vercelDeploymentHost) ||
  FALLBACK_URL;

/**
 * Whether this deployment may be indexed.
 *
 * On Vercel the answer is yes only for a production deployment that has been
 * told its own origin. That keeps two things out of the index that would
 * otherwise compete with the real site once it exists: preview deployments,
 * and a production deployment still living on its `…vercel.app` address.
 * Setting `NEXT_PUBLIC_SITE_URL` is the single switch that turns indexing on.
 *
 * Local builds are unaffected, so nothing about development changes.
 */
export const indexable = vercelEnv ? vercelEnv === 'production' && Boolean(envUrl) : true;

if (!envUrl && vercelEnv && !globalThis.__siteUrlWarned) {
  globalThis.__siteUrlWarned = true;
  console.warn(
    '[site] NEXT_PUBLIC_SITE_URL is not set. Absolute URLs resolve to ' +
      resolvedUrl +
      ' and the deployment is marked noindex. Set it to the canonical origin to go live.'
  );
}

/** Canonical origin, no trailing slash. */
export const siteUrl = resolvedUrl.replace(/\/+$/, '');

/**
 * Origin used for canonicals, the sitemap, Open Graph and JSON-LD.
 *
 * The live site is https://www.junkservicesdubai.com. If the configured origin
 * is the apex host, rewrite it to www so a page cannot canonicalise to the
 * non-www domain. Preview and local origins are left alone (previews are
 * noindex). This does not redirect http to https; that stays a host concern.
 */
export function canonicalOrigin() {
  try {
    const url = new URL(siteUrl);
    if (url.hostname === 'junkservicesdubai.com') {
      url.hostname = 'www.junkservicesdubai.com';
      url.protocol = 'https:';
      return url.origin;
    }
  } catch {
    /* fall through to siteUrl */
  }
  return siteUrl;
}

/**
 * Absolute URL for a site path, or the URL unchanged when `path` is already
 * absolute (blog covers live on the Blob host and must not be prefixed).
 */
export function absoluteUrl(path = '/') {
  if (/^https?:\/\//i.test(path)) return path;
  const origin = canonicalOrigin();
  return origin + (path.startsWith('/') ? path : '/' + path);
}

/**
 * A self-referencing canonical path. Absolute URLs are reduced to their path
 * so metadataBase (the www origin) is what the host resolves to.
 */
export function canonicalPath(value) {
  if (!value) return '/';
  const raw = String(value).trim();
  if (/^https?:\/\//i.test(raw)) {
    try {
      const url = new URL(raw);
      const path = url.pathname.replace(/\/+$/, '') || '/';
      return path + url.search;
    } catch {
      return '/';
    }
  }
  const path = raw.startsWith('/') ? raw : '/' + raw;
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}

export const contact = {
  phone: '+971 55 103 1255',
  phoneE164: '+971551031255',
  tel: 'tel:+971551031255',
  whatsapp: 'https://wa.me/971551031255'
};

export const site = {
  name: 'Junk Services Dubai',
  fullName: 'Junk Services Dubai',
  url: siteUrl,
  locale: 'en_AE',
  language: 'en',
  tagline: 'You point. We lift. It’s gone.',
  // Final <title> strings. The template must not append a brand suffix — several
  // keyword titles already include the brand, and area/blog titles must not.
  defaultTitle: 'Junk Removal Dubai | Pickup From the Room',
  titleTemplate: '%s',
  description:
    'Junk removal across Dubai. Send a photo on WhatsApp, get a fixed price, and a crew clears furniture, appliances, garden waste or a whole villa from the room.',
  shortDescription: 'Junk removal, furniture pickup and full property clearance across Dubai.',
  foundingYear: '2020',
  city: 'Dubai',
  countryCode: 'AE'
};

/** Primary navigation. Shared by the header, mobile menu and 404 page. */
export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/areas', label: 'Areas' },
  { href: '/blog', label: 'Blog' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];
