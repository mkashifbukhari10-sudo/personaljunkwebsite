import fs from 'node:fs';
import path from 'node:path';
import { getPayload } from 'payload';
import './_script-env';
import config from '../payload.config';
import { articleToLexical } from './article-markdown.mjs';
import { countArticleWords, MIN_ARTICLE_WORDS } from '../lib/content/article-word-count.js';

const apply = process.argv.includes('--apply');

// Every image reuses an existing, inspected Media document (image.md §3), so nothing is uploaded.
// `cover` and `body` are Media seed keys; `bodyKey` is the image key written in the article Markdown.
const specs = [
  {
    slug: 'balcony-clearance-dubai',
    title: 'Balcony Clearance in Dubai: What Leaves, What Stays, How It Gets Out',
    excerpt: 'Sort furniture, pots, packaging and hazardous items into separate groups, check what belongs to the property, and plan the indoor and building route before booking a pickup.',
    service: 'residential-junk-removal',
    cover: 'article-garden-furniture-disposal-dubai-cover',
    bodyKey: 'accepted-versus-excluded-guide',
    body: 'article-what-we-take-dubai-body',
    seoTitle: 'Balcony Clearance Dubai: Sorting, Hazards and Building Access',
    seoDescription: 'How to clear a balcony in Dubai: sort outdoor furniture, pots and packaging, keep gas cylinders and chemicals separate, and plan lift access before collection.'
  },
  {
    slug: 'childrens-room-clearance-dubai',
    title: "Clearing a Child's Room in Dubai: Keepsakes First, Furniture Second",
    excerpt: 'Sort keepsakes and devices before anything goes, check cots and bunk beds before offering them on, then photograph the whole room and route for one accurate collection quote.',
    service: 'furniture-removal',
    cover: 'article-estate-clearance-dubai-cover',
    bodyKey: 'estate-clearance-sorting-plan',
    body: 'article-estate-clearance-dubai-body',
    seoTitle: "Children's Room Clearance Dubai: Cots, Bunk Beds and Toys",
    seoDescription: "How to clear a child's room in Dubai: separate keepsakes, judge cots and bunks for reuse, sort toys and batteries safely, and plan the tower or villa route."
  },
  {
    slug: 'packing-material-disposal-dubai',
    title: 'Packing Material After a Move: Sort It Before You Book a Pickup',
    excerpt: "Flattened, dry cartons can follow your building's recycling route; foam, film, wet cardboard and crates need separating, and a full room of boxes is a collection job.",
    service: 'junk-removal',
    cover: 'article-leaving-dubai-clearance-checklist-cover',
    bodyKey: 'truck-load-capacity-guide',
    body: 'article-how-much-fits-in-one-load-dubai-body',
    seoTitle: 'Packing Material Disposal Dubai: Moving Boxes and Cardboard',
    seoDescription: 'How to dispose of packing material after a move in Dubai: sort cardboard, foam and crates, use the building route, and book cardboard removal for large piles.'
  },
  {
    slug: 'bed-frame-disposal-dubai',
    title: 'Old Bed Frame to Get Rid Of? Strip It Down or Take It Whole',
    excerpt: 'A bed frame usually leaves in parts: rails, slats, headboard and fixings. Identify the type, check it against the doorway and choose a route before the new bed arrives.',
    service: 'furniture-removal',
    cover: 'article-flatpack-furniture-disposal-dubai-cover',
    bodyKey: 'mattress-route-preparation',
    body: 'article-mattress-disposal-dubai-body',
    seoTitle: 'Bed Frame Disposal Dubai: Divans, Storage Beds and Headboards',
    seoDescription: 'How to get rid of an old bed frame in Dubai: identify divans, storage and metal frames, measure the route, choose a disposal route and plan tower or villa access.'
  },
  {
    slug: 'townhouse-clearance-dubai',
    title: 'Townhouse Clearance: Start at the Top Floor, Plan Around the Stairs',
    excerpt: 'Clear a townhouse from the top floor down: measure the stair turns, find space to stage items, separate special materials and send photos of every level.',
    service: 'villa-clearance',
    cover: 'article-gated-community-clearance-dubai-cover',
    bodyKey: 'villa-clearance-groups',
    body: 'article-villa-handover-clearance-dubai-body',
    seoTitle: 'Townhouse Clearance Dubai: Stairs, Staging and Floor-by-Floor Plan',
    seoDescription: 'How to clear a Dubai townhouse: work top-down, measure the staircase, stage items without blocking neighbours, and choose house or villa clearance scope.'
  },
  {
    slug: 'broken-furniture-disposal-dubai',
    title: "Broken Furniture in Dubai: When It Can't Be Reused, Plan the Removal",
    excerpt: 'Snapped frames, swollen board and cracked glass rule out reuse. Make the piece safe, keep it indoors, describe the damage honestly and book a route that can carry it.',
    service: 'furniture-removal',
    cover: 'article-dispose-old-furniture-dubai-cover',
    bodyKey: 'flatpack-condition-comparison',
    body: 'article-flatpack-furniture-disposal-dubai-body',
    seoTitle: 'Broken Furniture Disposal Dubai: Safe Handling and Removal',
    seoDescription: 'How to dispose of broken furniture in Dubai: when damage rules out reuse, making unsafe pieces safe, keeping it away from the bins, and what to send for a quote.'
  }
];

// Contextual inbound links. junk-gone-today also carries the owner's 2026-10-13 cardboard
// section, which links to the packing guide and had not yet reached the CMS.
const inbound = [
  { slug: 'garden-furniture-disposal-dubai', bodyKey: 'article-garden-furniture-disposal-dubai-body', seedKey: 'article-garden-furniture-disposal-dubai-body', maxDelta: 70 },
  { slug: 'seasonal-clear-out-dubai', bodyKey: 'estate-clearance-sorting-plan', seedKey: 'article-estate-clearance-dubai-body', maxDelta: 70 },
  { slug: 'junk-gone-today-dubai', bodyKey: null, seedKey: null, maxDelta: 200 },
  { slug: 'mattress-disposal-dubai', bodyKey: 'mattress-route-preparation', seedKey: 'article-mattress-disposal-dubai-body', maxDelta: 70 },
  { slug: 'garage-clearance-dubai', bodyKey: 'article-garage-clearance-dubai-body', seedKey: 'article-garage-clearance-dubai-body', maxDelta: 70 },
  { slug: 'dispose-old-furniture-dubai', bodyKey: 'old-furniture-route-options', seedKey: 'article-dispose-old-furniture-dubai-body', maxDelta: 70 }
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
  const { docs } = await api.find({ collection: 'media', where: { seedKey: { equals: seedKey } }, limit: 1, depth: 0, overrideAccess: true });
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

console.log(apply ? 'Published 6 new articles and synced 6 inbound posts successfully!' : 'Dry run complete and verified.');
await payload.destroy();
