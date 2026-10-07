import fs from 'node:fs';
import path from 'node:path';
import { getPayload } from 'payload';
import './_script-env';
import config from '../payload.config';
import { articleToLexical } from './article-markdown.mjs';
import { countArticleWords, MIN_ARTICLE_WORDS } from '../lib/content/article-word-count.js';

const apply = process.argv.includes('--apply');
const specs = [
  {
    slug: 'tv-disposal-dubai', title: 'Old TV Disposal in Dubai: Where Screens Actually Go',
    excerpt: 'A practical route for working and broken TVs in Dubai: test for reuse, protect the screen, arrange building access and choose an electronics collection option.',
    service: 'appliance-disposal', cover: 'tv-disposal-cover.webp', body: 'tv-disposal-routes.webp', bodyKey: 'tv-disposal-routes',
    coverAlt: 'An older flat-screen television on a console in a bright, generic apartment living room.',
    bodyAlt: 'An illustration comparing a working TV for reuse, a broken TV for e-waste collection, and a damaged screen protected for handling.',
    seoTitle: 'TV Disposal in Dubai: Reuse, E-Waste and Collection',
    seoDescription: 'How to dispose of a TV in Dubai: reuse a working screen, use designated electronics routes for broken sets, and plan safe building pickup.'
  },
  {
    slug: 'office-furniture-removal-dubai', title: 'What Happens to Old Office Furniture in Dubai',
    excerpt: 'Plan office furniture removal by inventory, condition, reuse potential and building access. Keep confidential material and IT devices in their own workstream.',
    service: 'commercial-junk-removal', cover: 'office-furniture-cover.webp', body: 'office-furniture-sorting.webp', bodyKey: 'office-furniture-sorting',
    coverAlt: 'Groups of unbranded desks, task chairs and cabinets in a bright generic office floor with a clear corridor.',
    bodyAlt: 'An isometric office plan separating reusable furniture, metal and wood components, and damaged items beside a clear lift route.',
    seoTitle: 'Office Furniture Removal Dubai: Sorting and Access',
    seoDescription: 'A practical office furniture clearance plan for Dubai: inventory desks and chairs, separate reusable items, book building access and isolate IT.'
  },
  {
    slug: 'renovation-waste-removal-dubai', title: 'Renovation Waste in Dubai: Clearing As You Go',
    excerpt: 'Plan renovation debris collection around your project: separate rubble and offcuts, isolate excluded materials, protect the building route and schedule pickups.',
    service: 'waste-removal', cover: 'renovation-waste-cover.webp', body: 'renovation-waste-sorting.webp', bodyKey: 'renovation-waste-sorting',
    coverAlt: 'Contained bags of tile debris and stacked offcuts beside a protected route in a generic apartment renovation.',
    bodyAlt: 'An isometric apartment plan separating bagged rubble, wood and metal offcuts, and isolated paint and gas containers.',
    seoTitle: 'Renovation Waste Removal Dubai: Plan Each Load',
    seoDescription: 'How to arrange renovation waste removal in Dubai: describe the debris, separate exclusions, plan lift access and collect at useful project stages.'
  }
];
const inbound = [
  { slug: 'e-waste-disposal-dubai', bodyKey: 'estate-clearance-sorting-plan', seedKey: 'article-estate-clearance-dubai-body' },
  { slug: 'office-strip-out-dubai', bodyKey: 'office-stripout-phasing-plan', seedKey: 'article-office-strip-out-dubai-body' },
  { slug: 'skip-hire-vs-junk-removal-dubai', bodyKey: 'skip-direct-load-comparison', seedKey: 'article-skip-hire-vs-junk-removal-dubai-body' }
];
console.log('Connecting to CMS…');
const payload = await getPayload({ config });
console.log('CMS connection ready');
const api: any = payload;
const link = (url: string) => ({ linkType: 'custom', url, newTab: url.startsWith('https://') });
const imageDir = path.resolve('public/images/articles');
const { docs: authors } = await api.find({ collection: 'authors', where: { name: { equals: 'Junk Services Dubai Team' } }, limit: 1, depth: 0, overrideAccess: true });
if (!authors[0]) throw new Error('Required author is missing');
const { docs: services } = await api.find({ collection: 'services', pagination: false, depth: 0, overrideAccess: true });
const serviceId = new Map(services.map((doc: any) => [doc.slug, doc.id]));
const { docs: existing } = await api.find({ collection: 'posts', where: { slug: { in: specs.map(s => s.slug) } }, pagination: false, depth: 0, overrideAccess: true, draft: true });
if (existing.length) throw new Error('Target slugs already exist: ' + existing.map((p: any) => p.slug).join(', '));
const mediaIds = new Map<string, any>();
if (apply) {
  for (const spec of specs) {
    for (const [file, alt, role] of [[spec.cover, spec.coverAlt, 'cover'], [spec.body, spec.bodyAlt, 'body']] as const) {
      const seedKey = `article-${spec.slug}-${role}`;
      const { docs } = await api.find({ collection: 'media', where: { seedKey: { equals: seedKey } }, limit: 1, depth: 0, overrideAccess: true });
      const media = docs[0] || await api.create({ collection: 'media', data: { alt, seedKey }, filePath: path.join(imageDir, file), overrideAccess: true });
      mediaIds.set(file, media.id);
    }
  }
}
for (const spec of specs) {
  const markdown = fs.readFileSync(path.resolve('docs/content-system/articles', spec.slug + '.md'), 'utf8');
  const content = articleToLexical(markdown, link, (key: string) => {
    if (key !== spec.bodyKey) throw new Error(`${spec.slug}: unexpected image ${key}`);
    return apply ? mediaIds.get(spec.body) : 1;
  });
  const words = countArticleWords(content);
  if (words < MIN_ARTICLE_WORDS) throw new Error(`${spec.slug}: ${words} < ${MIN_ARTICLE_WORDS}`);
  if (spec.excerpt.length > 200) throw new Error(`${spec.slug}: excerpt exceeds 200 characters`);
  if (content.root.children.filter((n: any) => n.type === 'heading').length < 6) throw new Error(`${spec.slug}: heading structure too thin`);
  console.log(`${apply ? 'PUBLISH' : 'READY'} ${spec.slug}: ${words} body words`);
  if (!apply) continue;
  const service = serviceId.get(spec.service);
  if (!service) throw new Error(`Missing service ${spec.service}`);
  await api.create({ collection: 'posts', draft: false, overrideAccess: true, data: {
    slug: spec.slug, title: spec.title, excerpt: spec.excerpt, coverImage: mediaIds.get(spec.cover), content,
    author: authors[0].id, relatedServices: [service], relatedAreas: [], _status: 'published',
    seo: { title: spec.seoTitle, description: spec.seoDescription, canonical: `https://www.junkservicesdubai.com/blog/${spec.slug}`, noIndex: false,
      ogImage: mediaIds.get(spec.cover), ogTitle: spec.title, ogDescription: spec.excerpt }
  }});
}
for (const sync of inbound) {
  const { docs: posts } = await api.find({ collection: 'posts', where: { slug: { equals: sync.slug } }, limit: 1, depth: 0, overrideAccess: true, draft: true });
  if (!posts[0]) throw new Error(`Missing inbound post ${sync.slug}`);
  const { docs: media } = await api.find({ collection: 'media', where: { seedKey: { equals: sync.seedKey } }, limit: 1, depth: 0, overrideAccess: true });
  if (!media[0]) throw new Error(`Missing inbound media ${sync.seedKey}`);
  const markdown = fs.readFileSync(path.resolve('docs/content-system/articles', sync.slug + '.md'), 'utf8');
  const content = articleToLexical(markdown, link, (key: string) => {
    if (key !== sync.bodyKey) throw new Error(`${sync.slug}: unexpected image ${key}`);
    return media[0].id;
  });
  const before = countArticleWords(posts[0].content);
  const after = countArticleWords(content);
  if (after < before || after - before > 70) throw new Error(`${sync.slug}: stored article diverges (${before} → ${after})`);
  console.log(`${apply ? 'SYNC' : 'READY'} ${sync.slug}: ${before} → ${after}`);
  if (apply) await api.update({ collection: 'posts', id: posts[0].id, data: { content }, draft: false, overrideAccess: true });
}
await payload.destroy();
