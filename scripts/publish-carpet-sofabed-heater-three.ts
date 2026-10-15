import fs from 'node:fs';
import path from 'node:path';
import { getPayload } from 'payload';
import './_script-env';
import config from '../payload.config';
import { articleToLexical } from './article-markdown.mjs';
import { countArticleWords, MIN_ARTICLE_WORDS } from '../lib/content/article-word-count.js';

const apply = process.argv.includes('--apply');

// Every image reuses an existing, inspected Media document (image.md §3), so nothing is uploaded.
// `cover` and `body` are Media seed keys (or a stored filename); `bodyKey` is the image key in the article Markdown.
const specs = [
  {
    slug: 'carpet-disposal-dubai',
    title: 'Old Carpet or Rug to Clear? Roll It, Check It, Then Book the Route',
    excerpt: 'A loose rug can be rolled and collected; a fitted carpet has to be lifted first. Check who owns it, its condition and whether the roll fits your lift before booking.',
    service: 'furniture-removal',
    cover: 'article-before-the-crew-arrives-dubai-cover',
    bodyKey: 'article-storage-room-clearance-dubai-cover',
    body: 'article-storage-room-clearance-dubai-cover',
    seoTitle: 'Carpet Disposal Dubai: Rugs, Fitted Carpet and Underlay Removal',
    seoDescription: 'How to dispose of an old carpet or rug in Dubai: roll and tie it, handle fitted carpet, underlay and gripper strips, and check the lift route before collection.'
  },
  {
    slug: 'sofa-bed-removal-dubai',
    title: 'Sofa Bed Removal in Dubai: Secure the Mechanism Before It Moves',
    excerpt: 'A sofa bed hides a heavy folding frame. Identify the type, strap the mechanism shut, check inside for lost items and measure it closed before asking for collection.',
    service: 'sofa-removal',
    cover: 'article-old-sofa-before-new-delivery-dubai-cover',
    bodyKey: 'sofa-route-measurement',
    body: 'article-sofa-wont-fit-through-door-dubai-body',
    seoTitle: 'Sofa Bed Removal Dubai: Pull-Out, Click-Clack and Corner Units',
    seoDescription: 'How to remove a sofa bed in Dubai: secure the pull-out mechanism, decide on the mattress, measure it closed, choose a route and plan lift or stair access.'
  },
  {
    slug: 'water-heater-removal-dubai',
    title: 'Taking Out an Old Water Heater: Ownership, Draining and Collection',
    excerpt: 'Confirm the heater is yours to remove, have a qualified technician disconnect and drain it, then book collection with photos of the unit and the route out.',
    service: 'appliance-disposal',
    cover: 'laundry-room-cover-final.webp',
    bodyKey: 'service-lift-protection',
    body: 'article-service-lift-booking-dubai-body',
    seoTitle: 'Water Heater Removal Dubai: Disconnection, Draining and Disposal',
    seoDescription: 'How to remove an old water heater in Dubai: check landlord ownership, arrange disconnection and draining, plan the route out and choose a disposal route.'
  }
];

// Contextual inbound links from published articles in the same service clusters.
const inbound = [
  { slug: 'storage-room-clearance-dubai', bodyKey: 'article-storage-room-clearance-dubai-body', seedKey: 'article-storage-room-clearance-dubai-body', maxDelta: 70 },
  { slug: 'sofa-wont-fit-through-door-dubai', bodyKey: 'sofa-route-measurement', seedKey: 'article-sofa-wont-fit-through-door-dubai-body', maxDelta: 70 },
  { slug: 'washing-machine-removal-dubai', bodyKey: null, seedKey: null, maxDelta: 70 }
];

console.log('Connecting to CMS…');
const payload = await getPayload({ config });
console.log('CMS connection ready');
const api: any = payload;
const link = (url: string) => ({ linkType: 'custom', url, newTab: url.startsWith('https://') });

const { docs: authors } = await api.find({ collection: 'authors', where: { name: { equals: 'Junk Services Dubai Team' } }, limit: 1, depth: 0, overrideAccess: true });
if (!authors[0]) throw new Error('Required author is missing');

const { docs: services } = await api.find({ collection: 'services', pagination: false, depth: 0, overrideAccess: true });
const serviceId = new Map(services.map((doc: any) => [doc.slug, doc.id]));

const { docs: existing } = await api.find({ collection: 'posts', where: { slug: { in: specs.map(s => s.slug) } }, pagination: false, depth: 0, overrideAccess: true, draft: true });
if (existing.length) throw new Error('Target slugs already exist: ' + existing.map((p: any) => p.slug).join(', '));

const mediaIds = new Map<string, any>();
for (const seedKey of new Set(specs.flatMap(s => [s.cover, s.body]))) {
  // Media 73 predates seed keys, so it is matched by its stored filename instead.
  const where = seedKey.endsWith('.webp') ? { filename: { equals: seedKey } } : { seedKey: { equals: seedKey } };
  const { docs } = await api.find({ collection: 'media', where, limit: 1, depth: 0, overrideAccess: true });
  if (!docs[0]) throw new Error(`Missing reused media ${seedKey}`);
  mediaIds.set(seedKey, docs[0].id);
  console.log(`Reusing media ${seedKey} -> id ${docs[0].id}`);
}

for (const spec of specs) {
  const markdown = fs.readFileSync(path.resolve('docs/content-system/articles', spec.slug + '.md'), 'utf8');
  const content = articleToLexical(markdown, link, (key: string) => {
    if (key !== spec.bodyKey) throw new Error(`${spec.slug}: unexpected image ${key}`);
    return mediaIds.get(spec.body);
  });
  const words = countArticleWords(content);
  if (words < MIN_ARTICLE_WORDS) throw new Error(`${spec.slug}: ${words} < ${MIN_ARTICLE_WORDS}`);
  if (spec.excerpt.length > 200) throw new Error(`${spec.slug}: excerpt exceeds 200 characters`);
  if (content.root.children.filter((n: any) => n.type === 'heading').length < 6) throw new Error(`${spec.slug}: heading structure too thin`);
  console.log(`${apply ? 'PUBLISH' : 'READY'} ${spec.slug}: ${words} body words`);
  if (!apply) continue;
  const service = serviceId.get(spec.service);
  if (!service) throw new Error(`Missing service ${spec.service}`);
  await api.create({
    collection: 'posts', draft: false, overrideAccess: true, data: {
      slug: spec.slug, title: spec.title, excerpt: spec.excerpt, coverImage: mediaIds.get(spec.cover), content,
      author: authors[0].id, relatedServices: [service], relatedAreas: [], _status: 'published',
      seo: {
        title: spec.seoTitle, description: spec.seoDescription, canonical: `https://www.junkservicesdubai.com/blog/${spec.slug}`, noIndex: false,
        ogImage: mediaIds.get(spec.cover), ogTitle: spec.title, ogDescription: spec.excerpt
      }
    }
  });
}

for (const sync of inbound) {
  const { docs: posts } = await api.find({ collection: 'posts', where: { slug: { equals: sync.slug } }, limit: 1, depth: 0, overrideAccess: true, draft: true });
  if (!posts[0]) throw new Error(`Missing inbound post ${sync.slug}`);
  const media = sync.seedKey ? (await api.find({ collection: 'media', where: { seedKey: { equals: sync.seedKey } }, limit: 1, depth: 0, overrideAccess: true })).docs : [];
  if (sync.seedKey && !media[0]) throw new Error(`Missing inbound media ${sync.seedKey}`);
  const markdown = fs.readFileSync(path.resolve('docs/content-system/articles', sync.slug + '.md'), 'utf8');
  const content = articleToLexical(markdown, link, (key: string) => {
    if (key !== sync.bodyKey) throw new Error(`${sync.slug}: unexpected image ${key}`);
    return media[0].id;
  });
  const before = countArticleWords(posts[0].content);
  const after = countArticleWords(content);
  if (after < before || after - before > sync.maxDelta) throw new Error(`${sync.slug}: stored article diverges (${before} → ${after})`);
  console.log(`${apply ? 'SYNC' : 'READY'} ${sync.slug}: ${before} → ${after}`);
  if (apply) await api.update({ collection: 'posts', id: posts[0].id, data: { content }, draft: false, overrideAccess: true });
}

console.log(apply ? 'Published 3 new articles and synced 3 inbound posts successfully!' : 'Dry run complete and verified.');
await payload.destroy();
