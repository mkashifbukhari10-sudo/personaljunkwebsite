/**
 * Content access layer — services.
 *
 * The ONLY module pages/server components should import service content from.
 * Since the plan.md Phase 9 migration the source is Payload; there is no code
 * copy of the services any more (the pre-migration text lives in
 * scripts/seed-data/services.js and is only used to bootstrap a database).
 *
 * Client components must not import this module (it pulls in Payload); pass
 * data down as props from a server component instead. URL helpers live in
 * lib/hrefs.js and are safe to import anywhere.
 */
import { serviceGroups } from '@/lib/data';
import { TAGS, cached, findAll } from './payload';
import { mapService } from './map';

const loadServices = cached(
  async () => {
    const docs = await findAll('services', { publishedOnly: true });
    return docs.map(mapService);
  },
  ['content', 'services'],
  [TAGS.services]
);

export async function getServices() {
  return loadServices();
}

export async function getServiceSlugs() {
  return (await getServices()).map((s) => s.slug);
}

export async function getServiceBySlug(slug) {
  return (await getServices()).find((s) => s.slug === slug) || null;
}

/**
 * The seven homepage explorer groups. The groups themselves are code-owned
 * presentation data in lib/data.js (order, blurb, image slot); the CMS owns
 * which service sits in which group, through the `group` select on Services.
 * A group that no service claims keeps the membership listed in code.
 *
 * The group's explorer photo is the first member service's image, so there is
 * no separate slot to fill: setting a service photo in /admin also illustrates
 * its group (plan.md Phase 10).
 */
export async function getServiceGroups() {
  const all = await getServices();
  return serviceGroups.map((group) => {
    const members = all.filter((s) => s.group === group.key);
    const services = members.length ? members.map((s) => s.slug) : group.services;
    const lead = all.find((s) => s.slug === services[0]);
    return { ...group, services, image: group.image || (lead && lead.image) || null };
  });
}

/** Related services for a slug, resolved to full records in the order listed on the service. */
export async function getRelatedServices(slug) {
  const all = await getServices();
  const svc = all.find((s) => s.slug === slug);
  if (!svc) return [];
  return svc.relatedServices.map((s) => all.find((x) => x.slug === s)).filter(Boolean);
}
