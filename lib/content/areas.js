/**
 * Content access layer — areas. Same rules as lib/content/services.js: pages
 * read only through here, and the source is the repository (content/areas.js,
 * content/areas-expansion.js, photos in content/images.js, last-modified times
 * in content/page-dates.js).
 */
import { getServices } from './services';
import { getAllPosts } from './posts';
import { areas as launchAreas } from '@/content/areas';
import { areasExpansion } from '@/content/areas-expansion';
import { areasNew } from '@/content/areas-new';
import { areaDepth } from '@/content/areas-depth';
import { areaGuides, areaKind, kindServices } from '@/content/area-links';
import { photos, areaSlots } from '@/content/images';
import { areaUpdatedAt } from '@/content/page-dates';
import { areaPageTitle } from '@/lib/meta-text';

function padServices(slug, list) {
  const kind = areaKind[slug] || 'mixed';
  const extras = kindServices[kind] || kindServices.mixed;
  const out = [...(list || [])];
  for (const service of extras) {
    if (out.length >= 5) break;
    if (!out.includes(service)) out.push(service);
  }
  return out.slice(0, 6);
}

const AREAS = [...launchAreas, ...areasExpansion, ...areasNew]
  .map((a) => {
    const depth = areaDepth[a.slug] || {};
    const body = [...a.body, ...(depth.body || [])].map((section) => ({
      heading: section.heading,
      paragraphs: section.paragraphs.filter(Boolean)
    }));
    const faqs = [...(a.faqs || []), ...(depth.faqs || [])].filter((f) => f.q && f.a).map((f) => ({ q: f.q, a: f.a }));
    return {
      slug: a.slug,
      num: a.num,
      name: a.name,
      note: a.note,
      map: { x: (a.map && a.map.x) || 0, y: (a.map && a.map.y) || 0 },
      home: a.home ? { x: a.home.x || 0, y: a.home.y || 0, order: a.home.order || 0 } : null,
      seo: {
        title: (a.seo && a.seo.title && String(a.seo.title).trim()) || areaPageTitle(a.seoTitleName || a.name),
        description: a.seo.description || ''
      },
      h1: a.h1,
      intro: a.intro,
      body,
      faqs,
      popularServices: padServices(a.slug, a.popularServices),
      guides: (areaGuides[a.slug] || a.guides || []).slice(0, 2),
      nearbyAreas: a.nearbyAreas || [],
      cta: [(a.cta && a.cta[0]) || '', (a.cta && a.cta[1]) || ''],
      image: photos[areaSlots[a.slug]] || null,
      updatedAt: areaUpdatedAt[a.slug] || null
    };
  })
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

/** Two related guides for an area page. Missing slugs are skipped. */
export async function getGuidesForArea(slug) {
  const area = await getAreaBySlug(slug);
  if (!area || !area.guides.length) return [];
  const posts = await getAllPosts();
  return area.guides.map((guide) => posts.find((post) => post.slug === guide)).filter(Boolean);
}

/** Full service objects popular in an area. */
export async function getPopularServicesForArea(slug) {
  const area = await getAreaBySlug(slug);
  if (!area) return [];
  const services = await getServices();
  return area.popularServices.map((s) => services.find((x) => x.slug === s)).filter(Boolean);
}
