/**
 * Content access layer — areas. Same rules as lib/content/services.js: pages
 * read only through here, client components get data as props, and Payload is
 * the only source since the plan.md Phase 9 migration (the pre-migration text
 * lives in scripts/seed-data/areas.js, used only to bootstrap a database).
 */
import { getServices } from './services';
import { TAGS, cached, findAll } from './payload';
import { mapArea } from './map';

const loadAreas = cached(
  async () => {
    const docs = await findAll('areas', { publishedOnly: true });
    return docs.map(mapArea);
  },
  ['content', 'areas'],
  [TAGS.areas]
);

export async function getAreas() {
  return loadAreas();
}

export async function getAreaSlugs() {
  return (await getAreas()).map((a) => a.slug);
}

/** The areas shown on the homepage map and in the footer, in canonical order. */
export async function getFeaturedAreas() {
  return (await getAreas()).filter((a) => a.home);
}

/** The same areas in homepage-grid order (drives marker stagger and tile order). */
export async function getHomeMapAreas() {
  return [...(await getFeaturedAreas())].sort((a, b) => a.home.order - b.home.order);
}

export async function getAreaBySlug(slug) {
  return (await getAreas()).find((a) => a.slug === slug) || null;
}

/** Resolve a list of slugs to area records, preserving order and dropping unknowns. */
export async function getAreasBySlugs(slugs) {
  const all = await getAreas();
  return slugs.map((s) => all.find((a) => a.slug === s)).filter(Boolean);
}

/** Nearby areas for a slug, resolved to records in the order listed on the area. */
export async function getNearbyAreas(slug) {
  const area = await getAreaBySlug(slug);
  return area ? getAreasBySlugs(area.nearbyAreas) : [];
}

/** Services listed as popular for an area, resolved to records. */
export async function getPopularServicesForArea(slug) {
  const area = await getAreaBySlug(slug);
  if (!area) return [];
  const services = await getServices();
  return area.popularServices.map((s) => services.find((x) => x.slug === s)).filter(Boolean);
}
