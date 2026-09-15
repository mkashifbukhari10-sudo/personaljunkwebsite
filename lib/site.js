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

export const contact = {
  phone: '+92 336 709 1357',
  phoneE164: '+923367091357',
  tel: 'tel:+923367091357',
  whatsapp: 'https://wa.me/923367091357'
};

export const site = {
  name: 'Junkit',
  fullName: 'Junkit Dubai',
  url: siteUrl,
  locale: 'en_AE',
  language: 'en',
  tagline: 'You point. We lift. It’s gone.',
  defaultTitle: 'Junkit Dubai — Junk Removal, Furniture Pickup & Villa Clearance',
  titleTemplate: '%s | Junkit Dubai',
  description:
    'Same-day junk removal across Dubai. Send a photo on WhatsApp, get a fixed price, and a uniformed crew clears furniture, appliances, garden waste or a whole villa.',
  shortDescription: 'Junk removal, furniture pickup and full property clearance across Dubai.',
  foundingYear: '2020',
  city: 'Dubai',
  countryCode: 'AE'
};

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path = '/') {
  return siteUrl + (path.startsWith('/') ? path : '/' + path);
}

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
