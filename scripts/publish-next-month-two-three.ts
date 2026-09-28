import fs from 'node:fs';
import path from 'node:path';
import { getPayload } from 'payload';
import './_script-env';
import config from '../payload.config';
import { articleToLexical } from './article-markdown.mjs';
import { countArticleWords, MIN_ARTICLE_WORDS } from '../lib/content/article-word-count.js';

const apply = process.argv.includes('--apply');
const payload = await getPayload({ config });
const api: any = payload;

const specs = [
  {
    slug: 'office-strip-out-dubai', title: 'Office Strip-Out in Dubai: Clear a Floor Without Disruption',
    excerpt: 'Define the end condition, phase the floor and coordinate building access before an office strip-out. A controlled scope protects operations and handover plans.',
    service: 'commercial-junk-removal', cover: 'office-stripout-cover.webp',
    coverAlt: 'A bright office floor with furniture and loose fixtures organised beside a clear central route.',
    body: 'office-stripout-phasing-plan.webp', bodyAlt: 'A top-down office plan with three organised work zones and clear routes to a protected service lift and loading point.',
    seoTitle: 'Office Strip-Out Dubai: Planning and Access Guide',
    seoDescription: 'Plan an office strip-out in Dubai with a defined scope, phased work zones, building access, service-lift coordination and documented close-out.',
    ogTitle: 'Plan an Office Strip-Out Without Disruption',
    ogDescription: 'Define the scope, phase the floor and coordinate the building before work begins.'
  },
  {
    slug: 'warehouse-clearance-dubai', title: 'Warehouse Clear-Outs: Plan Around Stock and Access',
    excerpt: 'Separate live stock from removals, protect warehouse operations and plan staging, traffic and loading access before a large-scale clear-out begins.',
    service: 'commercial-junk-removal', cover: 'warehouse-clearance-cover.webp',
    coverAlt: 'An organised warehouse with retained stock, a separate clearance zone and an unobstructed route to the loading shutter.',
    body: 'warehouse-clearance-zone-plan.webp', bodyAlt: 'A top-down warehouse plan showing protected stock, an organised clearance staging zone and a broad route to the loading door.',
    seoTitle: 'Warehouse Clearance Dubai: Stock and Access Plan',
    seoDescription: 'Plan a Dubai warehouse clearance around live stock, staging zones, traffic controls, loading access, vehicle capacity and documented close-out.',
    ogTitle: 'Warehouse Clear-Outs: Protect Stock and Access',
    ogDescription: 'Separate ownership, release controlled zones and keep the loading route operational.'
  },
  {
    slug: 'gated-community-clearance-dubai', title: 'Gated Communities: Access, Permits and Timing for a Clearance',
    excerpt: 'Confirm the community’s current entry process, approved gate, vehicle restrictions and villa route before arranging a household clearance.',
    service: 'villa-clearance', cover: 'gated-community-clearance-cover.webp',
    coverAlt: 'A modern villa with an open gate, clear driveway and grouped household items inside the property boundary.',
    body: 'gated-community-access-plan.webp', bodyAlt: 'A top-down villa and community access plan showing a clear route from grouped household items through the gate to a collection vehicle.',
    seoTitle: 'Gated Community Clearance Dubai: Access Guide',
    seoDescription: 'Plan a gated-community clearance in Dubai with current entry approval, correct gate details, vehicle access, villa routes and realistic timing.',
    ogTitle: 'Plan Access for a Gated-Community Clearance',
    ogDescription: 'Confirm entry, vehicle and property-route details before the crew is dispatched.'
  }
];

const { docs: authors } = await api.find({ collection: 'authors', where: { name: { equals: 'Junk Services Dubai Team' } }, limit: 1, depth: 0, overrideAccess: true });
if (!authors[0]) throw new Error('Required author is missing');
const { docs: services } = await api.find({ collection: 'services', pagination: false, depth: 0, overrideAccess: true });
const serviceId = new Map(services.map((doc: any) => [doc.slug, doc.id]));
const { docs: existing } = await api.find({ collection: 'posts', where: { slug: { in: specs.map((s) => s.slug) } }, pagination: false, depth: 0, overrideAccess: true, draft: true });
if (existing.length) throw new Error('Stop: target slugs already exist: ' + existing.map((p: any) => p.slug).join(', '));

const imageDir = path.resolve('docs/content-system/generated-images');
const mediaIds = new Map<string, any>();
if (apply) {
  for (const spec of specs) {
    for (const [filename, alt, role] of [[spec.cover, spec.coverAlt, 'cover'], [spec.body, spec.bodyAlt, 'body']] as const) {
      const seedKey = `article-${spec.slug}-${role}`;
      const { docs } = await api.find({ collection: 'media', where: { seedKey: { equals: seedKey } }, limit: 1, depth: 0, overrideAccess: true });
      const media = docs[0] || await api.create({ collection: 'media', data: { alt, seedKey }, filePath: path.join(imageDir, filename), overrideAccess: true });
      mediaIds.set(filename, media.id);
    }
  }
}

const resolveLink = (url: string) => ({ linkType: 'custom', url, newTab: url.startsWith('https://') });
for (const spec of specs) {
  const markdown = fs.readFileSync(path.join('docs/content-system/articles', spec.slug + '.md'), 'utf8');
  const previewIds = new Map([[spec.body, 1]]);
  const content = articleToLexical(markdown, resolveLink, (key) => {
    const id = (apply ? mediaIds : previewIds).get(key + '.webp');
    if (!id) throw new Error(`${spec.slug}: unresolved body image ${key}`);
    return id;
  });
  const words = countArticleWords(content);
  if (words < MIN_ARTICLE_WORDS) throw new Error(`${spec.slug}: ${words} words is below ${MIN_ARTICLE_WORDS}`);
  const headings = content.root.children.filter((node: any) => node.type === 'heading');
  if (headings.length < 6) throw new Error(`${spec.slug}: insufficient heading structure`);
  console.log(`${apply ? 'PUBLISH' : 'READY'} ${spec.slug}: ${words} body words`);
  if (!apply) continue;
  const service = serviceId.get(spec.service);
  if (!service) throw new Error('Missing service: ' + spec.service);
  await api.create({
    collection: 'posts', draft: false, overrideAccess: true,
    data: {
      slug: spec.slug, title: spec.title, excerpt: spec.excerpt,
      coverImage: mediaIds.get(spec.cover), content, author: authors[0].id,
      relatedServices: [service], relatedAreas: [], _status: 'published',
      seo: { title: spec.seoTitle, description: spec.seoDescription, canonical: `https://www.junkservicesdubai.com/blog/${spec.slug}`, noIndex: false, ogImage: mediaIds.get(spec.cover), ogTitle: spec.ogTitle, ogDescription: spec.ogDescription }
    }
  });
}
console.log(apply ? 'Published three articles and uploaded six images.' : 'Dry run only.');
await payload.destroy();
