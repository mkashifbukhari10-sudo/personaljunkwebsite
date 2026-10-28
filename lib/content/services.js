/**
 * Content access layer — services.
 *
 * The ONLY module pages/server components should import service content from.
 * The source is the repository: copy in content/services.js, photos in
 * content/images.js and last-modified times in content/page-dates.js. No
 * database is involved, so nothing here can fail at runtime.
 *
 * URL helpers live in lib/hrefs.js and are safe to import anywhere.
 */
import { serviceGroups } from '@/lib/data';
import { services as source } from '@/content/services';
import { extraServices } from '@/content/services-extra';
import { photos, serviceSlots } from '@/content/images';
import { serviceUpdatedAt } from '@/content/page-dates';

/** service slug -> the homepage explorer group that lists it. */
const groupOf = (slug) => serviceGroups.find((g) => g.services.includes(slug))?.key;

const SERVICES = [...source, ...extraServices]
  .map((s) => {
    const service = {
      slug: s.slug,
      num: s.num,
      name: s.name,
      blurb: s.blurb,
      seo: { title: s.seo.title || '', description: s.seo.description || '' },
      h1: s.h1,
      intro: s.intro,
      body: s.body.map((section) => ({ heading: section.heading, paragraphs: section.paragraphs.filter(Boolean) })),
      typical: s.typical,
      crew: s.crew,
      time: s.time,
      faqs: (s.faqs || []).filter((f) => f.q && f.a).map((f) => ({ q: f.q, a: f.a })),
      relatedServices: s.relatedServices || [],
      popularAreas: s.popularAreas || [],
      cta: [(s.cta && s.cta[0]) || '', (s.cta && s.cta[1]) || ''],
      image: photos[serviceSlots[s.slug]] || null,
      updatedAt: serviceUpdatedAt[s.slug] || null
    };
    if (s.audience) service.audience = s.audience;
    const group = groupOf(s.slug);
    if (group) service.group = group;
    return service;
  })
  .sort((a, b) => String(a.num).localeCompare(String(b.num), undefined, { numeric: true }));

export async function getServices() {
  return SERVICES;
}

export async function getServiceSlugs() {
  return SERVICES.map((s) => s.slug);
}

export async function getServiceBySlug(slug) {
  return SERVICES.find((s) => s.slug === slug) || null;
}

/**
 * The homepage explorer groups, with each group's services and photo. The
 * group's photo falls back to its lead service's photo.
 */
export async function getServiceGroups() {
  return serviceGroups.map((group) => {
    const members = SERVICES.filter((s) => s.group === group.key);
    const services = members.length ? members.map((s) => s.slug) : group.services;
    const lead = SERVICES.find((s) => s.slug === services[0]);
    return { ...group, services, image: group.image || (lead && lead.image) || null };
  });
}

/** Full related service objects for a given slug. */
export async function getRelatedServices(slug) {
  const svc = SERVICES.find((s) => s.slug === slug);
  if (!svc) return [];
  return svc.relatedServices.map((s) => SERVICES.find((x) => x.slug === s)).filter(Boolean);
}
