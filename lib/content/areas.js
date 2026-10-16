/**
 * Content access layer — areas. Same rules as lib/content/services.js: pages
 * read only through here, and the source is the repository (content/areas.js,
 * content/areas-expansion.js, photos in content/images.js, last-modified times
 * in content/page-dates.js).
 */
import { getServices } from './services';
import { areas as launchAreas } from '@/content/areas';
import { areasExpansion } from '@/content/areas-expansion';
import { photos, areaSlots } from '@/content/images';
import { areaUpdatedAt } from '@/content/page-dates';

const AREAS = [...launchAreas, ...areasExpansion]
  .map((a) => ({
    slug: a.slug,
    num: a.num,
    name: a.name,
    note: a.note,
    map: { x: (a.map && a.map.x) || 0, y: (a.map && a.map.y) || 0 },
    home: a.home ? { x: a.home.x || 0, y: a.home.y || 0, order: a.home.order || 0 } : null,
    seo: { title: a.seo.title || '', description: a.seo.description || '' },
    h1: a.h1,
    intro: a.intro,
    body: a.body.map((section) => ({ heading: section.heading, paragraphs: section.paragraphs.filter(Boolean) })),
    faqs: (a.faqs || []).filter((f) => f.q && f.a).map((f) => ({ q: f.q, a: f.a })),
    popularServices: a.popularServices || [],
    nearbyAreas: a.nearbyAreas || [],
    cta: [(a.cta && a.cta[0]) || '', (a.cta && a.cta[1]) || ''],
    image: photos[areaSlots[a.slug]] || null,
    updatedAt: areaUpdatedAt[a.slug] || null
  }))
  .sort((a, b) => String(a.num).localeCompare(String(b.num), undefined, { numeric: true }));

export async function getAreas() {
  return AREAS;
}

export async function getAreaSlugs() {
  return AREAS.map((a) => a.slug);
}

/** Areas marked for the homepage map. */
export async function getFeaturedAreas() {
  return AREAS.filter((a) => a.home);
}

/** Homepage map pins in display order. */
export async function getHomeMapAreas() {
  return [...(await getFeaturedAreas())].sort((a, b) => a.home.order - b.home.order);
}

export async function getAreaBySlug(slug) {
  return AREAS.find((a) => a.slug === slug) || null;
}

export async function getAreasBySlugs(slugs) {
  return slugs.map((s) => AREAS.find((a) => a.slug === s)).filter(Boolean);
}

export async function getNearbyAreas(slug) {
  const area = await getAreaBySlug(slug);
  return area ? getAreasBySlugs(area.nearbyAreas) : [];
}

/** Full service objects popular in an area. */
export async function getPopularServicesForArea(slug) {
  const area = await getAreaBySlug(slug);
  if (!area) return [];
  const services = await getServices();
  return area.popularServices.map((s) => services.find((x) => x.slug === s)).filter(Boolean);
}
