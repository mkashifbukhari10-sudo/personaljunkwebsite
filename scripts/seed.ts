/**
 * Bootstrap an empty Payload database with the content this site launched with
 * (plan.md Phase 9).
 *
 *   npm run seed              create anything that is missing, touch nothing else
 *   npm run seed -- --update  also overwrite existing documents from the seed data
 *
 * The default is create-or-skip, which makes the script safe to re-run: once a
 * database is seeded the CMS is the source of truth, and a plain `npm run seed`
 * will never overwrite an editor's work. `--update` is the deliberate escape
 * hatch for restoring a document to its original text.
 *
 * Source data lives in scripts/seed-data/ — the arrays that used to sit in
 * lib/services.js, lib/areas.js and lib/data.js. The site does not read them.
 *
 * Business facts nobody has supplied (street address, coordinates, opening
 * hours, social profiles, the Search Console token) are deliberately left empty
 * in Site settings; the run ends by listing them.
 */
import fs from 'node:fs';
import { getPayload } from 'payload';
import config from '../payload.config';
import { services as seedServices } from './seed-data/services.js';
import { areas as seedAreas } from './seed-data/areas.js';
import { faqs as seedFaqs } from './seed-data/faqs.js';
import { blog as seedBlog } from './seed-data/blog.js';
import { serviceGroups } from '../lib/data.js';
import { site, contact, navLinks } from '../lib/site.js';

type AnyDoc = Record<string, any>;
type PageCollection = 'services' | 'areas';

// `payload run` does not read .env, so load it here when the variables are not
// already in the environment (Node 20.12+ / 22+).
const loadEnvFile = (process as AnyDoc).loadEnvFile;
if (!process.env.DATABASE_URI && typeof loadEnvFile === 'function' && fs.existsSync('.env')) {
  loadEnvFile.call(process, '.env');
}
if (!process.env.DATABASE_URI) {
  console.error('DATABASE_URI is not set. Add it (and PAYLOAD_SECRET) to .env — see .env.example.');
  process.exit(1);
}

const UPDATE = process.argv.includes('--update');
const services = seedServices as AnyDoc[];
const areas = seedAreas as AnyDoc[];
const faqs = seedFaqs as AnyDoc[];
const groups = serviceGroups as AnyDoc[];

/** ['line one', 'line two'] -> { line1, line2 } */
const cta = (pair: string[]) => ({ line1: pair?.[0] ?? '', line2: pair?.[1] ?? '' });

/** [{ heading, paragraphs: ['text'] }] -> the Payload array shape */
const body = (sections: AnyDoc[]) =>
  sections.map((section) => ({
    heading: section.heading,
    paragraphs: (section.paragraphs as string[]).map((text) => ({ text }))
  }));

const faqList = (list: AnyDoc[] = []) => list.map((f) => ({ q: f.q, a: f.a }));

/** service slug -> the homepage explorer group that lists it (undefined if none does). */
const groupOf = (slug: string) => groups.find((g) => g.services.includes(slug))?.key as string | undefined;

const tally = (results: string[]) => {
  const counts: Record<string, number> = {};
  for (const r of results) counts[r] = (counts[r] || 0) + 1;
  return Object.entries(counts)
    .map(([k, v]) => v + ' ' + k)
    .join(', ');
};

const run = async () => {
  const payload = await getPayload({ config });
  const api = payload as AnyDoc; // the Local API is typed per collection slug; the
  // helpers below are generic over two of them.

  const idBySlug = async (collection: PageCollection) => {
    const { docs } = await api.find({ collection, pagination: false, depth: 0, draft: true, overrideAccess: true });
    return new Map<string, any>((docs as AnyDoc[]).map((d) => [d.slug, d.id]));
  };

  /** Create the document if its slug is new; with --update, overwrite it. */
  const upsert = async (collection: PageCollection, slug: string, data: AnyDoc, existing: Map<string, any>) => {
    const id = existing.get(slug);
    if (!id) {
      const doc = (await api.create({ collection, data: { ...data, slug, _status: 'published' } })) as AnyDoc;
      existing.set(slug, doc.id);
      return 'created';
    }
    if (!UPDATE) return 'skipped';
    await api.update({ collection, id, data: { ...data, _status: 'published' } });
    return 'updated';
  };

  // ------------------------------------------------------------------ areas
  // Areas first: services point at them. Relationships are wired in a second
  // pass, once every document exists and has an id.
  const areaIds = await idBySlug('areas');
  const areaResults: string[] = [];
  for (const area of areas) {
    areaResults.push(
      await upsert(
        'areas',
        area.slug,
        {
          name: area.name,
          num: area.num,
          note: area.note,
          h1: area.h1,
          intro: area.intro,
          body: body(area.body),
          faqs: faqList(area.faqs),
          cta: cta(area.cta),
          map: { x: area.map.x, y: area.map.y },
          home: area.home
            ? { featured: true, x: area.home.x, y: area.home.y, order: area.home.order }
            : { featured: false },
          seo: { title: area.seo.title, description: area.seo.description, noIndex: false }
        },
        areaIds
      )
    );
  }
  console.log('Areas:    ' + tally(areaResults));

  // --------------------------------------------------------------- services
  const serviceIds = await idBySlug('services');
  const serviceResults: string[] = [];
  for (const service of services) {
    const data: AnyDoc = {
      name: service.name,
      num: service.num,
      blurb: service.blurb,
      h1: service.h1,
      intro: service.intro,
      body: body(service.body),
      typical: service.typical,
      crew: service.crew,
      time: service.time,
      faqs: faqList(service.faqs),
      cta: cta(service.cta),
      seo: { title: service.seo.title, description: service.seo.description, noIndex: false }
    };
    const group = groupOf(service.slug);
    if (group) data.group = group;
    if (service.audience) data.audience = service.audience;
    serviceResults.push(await upsert('services', service.slug, data, serviceIds));
  }
  console.log('Services: ' + tally(serviceResults));

  // -------------------------------------------------- relationships (pass 2)
  // Written only when they differ, so a re-run is a genuine no-op.
  const resolve = (slugs: string[] = [], ids: Map<string, any>) => slugs.map((s) => ids.get(s)).filter(Boolean);
  const same = (current: any[] | undefined, next: any[]) => {
    const ours = (current || []).map((v) => (v && typeof v === 'object' ? v.id : v));
    return ours.length === next.length && ours.every((v, i) => String(v) === String(next[i]));
  };

  let linked = 0;
  for (const service of services) {
    const id = serviceIds.get(service.slug);
    if (!id) continue;
    const doc = (await api.findByID({ collection: 'services', id, depth: 0, draft: true, overrideAccess: true })) as AnyDoc;
    const relatedServices = resolve(service.relatedServices, serviceIds);
    const popularAreas = resolve(service.popularAreas, areaIds);
    if (same(doc.relatedServices, relatedServices) && same(doc.popularAreas, popularAreas)) continue;
    await api.update({ collection: 'services', id, data: { relatedServices, popularAreas, _status: 'published' } });
    linked++;
  }
  for (const area of areas) {
    const id = areaIds.get(area.slug);
    if (!id) continue;
    const doc = (await api.findByID({ collection: 'areas', id, depth: 0, draft: true, overrideAccess: true })) as AnyDoc;
    const popularServices = resolve(area.popularServices, serviceIds);
    const nearbyAreas = resolve(area.nearbyAreas, areaIds);
    if (same(doc.popularServices, popularServices) && same(doc.nearbyAreas, nearbyAreas)) continue;
    await api.update({ collection: 'areas', id, data: { popularServices, nearbyAreas, _status: 'published' } });
    linked++;
  }
  console.log('Links:    ' + (linked ? linked + ' documents wired' : 'already correct'));

  // ------------------------------------------------------------------- faqs
  // Keyed by the question text, since FAQs have no slug.
  const existingFaqs = await api.find({ collection: 'faqs', pagination: false, depth: 0, overrideAccess: true });
  const faqIdByQuestion = new Map<string, any>((existingFaqs.docs as AnyDoc[]).map((d) => [d.q, d.id]));
  const faqResults: string[] = [];
  for (const [index, faq] of faqs.entries()) {
    const data: AnyDoc = { q: faq.q, a: faq.a, order: index + 1 };
    if (faq.more) data.more = { href: faq.more.href, label: faq.more.label };
    const id = faqIdByQuestion.get(faq.q);
    if (!id) {
      await api.create({ collection: 'faqs', data });
      faqResults.push('created');
    } else if (UPDATE) {
      await api.update({ collection: 'faqs', id, data });
      faqResults.push('updated');
    } else {
      faqResults.push('skipped');
    }
  }
  console.log('FAQs:     ' + tally(faqResults));

  // ---------------------------------------------------------------- reviews
  // Nothing to seed, on purpose: the placeholder reviews were deleted in
  // Phase 9 and only real, verified reviews may ever be entered.
  console.log('Reviews:  none seeded (enter real reviews in /admin and tick "verified")');

  // ---------------------------------------------------------------- globals
  const settings = (await api.findGlobal({ slug: 'site-settings', overrideAccess: true })) as AnyDoc;
  if (!settings.siteName || UPDATE) {
    await api.updateGlobal({
      slug: 'site-settings',
      data: {
        siteName: site.fullName,
        tagline: site.tagline,
        foundingYear: site.foundingYear,
        phone: contact.phone,
        whatsapp: contact.whatsapp,
        defaultSeo: { title: site.defaultTitle, description: site.description, noIndex: false }
      }
    });
    console.log('Settings: ' + (settings.siteName ? 'updated' : 'created'));
  } else {
    console.log('Settings: skipped (already filled in)');
  }

  const blog = (await api.findGlobal({ slug: 'blog', overrideAccess: true })) as AnyDoc;
  if (!blog.h1 || UPDATE) {
    await api.updateGlobal({ slug: 'blog', data: seedBlog });
    console.log('Blog:     ' + (blog.h1 ? 'updated' : 'created'));
  } else {
    console.log('Blog:     skipped (already filled in)');
  }

  const navigation = (await api.findGlobal({ slug: 'navigation', overrideAccess: true })) as AnyDoc;
  if (!navigation.primary?.length || UPDATE) {
    await api.updateGlobal({
      slug: 'navigation',
      data: {
        primary: (navLinks as AnyDoc[]).map((l) => ({ label: l.label, href: l.href })),
        footerColumns: [
          {
            title: 'Explore',
            links: [
              { label: 'How it works', href: '/how-it-works' },
              { label: 'Blog', href: '/blog' },
              { label: 'About Junkit', href: '/about' },
              { label: 'Book a pickup', href: '/contact' }
            ]
          }
        ]
      }
    });
    console.log('Nav:      ' + (navigation.primary?.length ? 'updated' : 'created'));
  } else {
    console.log('Nav:      skipped (already filled in)');
  }

  // --------------------------------------------------------- what is missing
  const missing: string[] = [];
  if (!settings.address?.streetAddress) missing.push('Site settings > Contact > Address (street line)');
  if (typeof settings.geo?.latitude !== 'number') missing.push('Site settings > Contact > Geo (latitude and longitude)');
  if (!settings.openingHours?.length) missing.push('Site settings > Contact > Opening hours');
  if (!settings.sameAs?.length) missing.push('Site settings > Contact > Social profiles');
  if (!settings.googleSiteVerification) missing.push('Site settings > Verification > Google site verification');
  if (missing.length) {
    console.log('\nStill to fill in by hand (nothing is invented here):');
    for (const m of missing) console.log('  - ' + m);
  }

  console.log('\nDone.' + (UPDATE ? '' : ' Re-run with `-- --update` to overwrite existing documents.'));
  process.exit(0);
};

await run();
