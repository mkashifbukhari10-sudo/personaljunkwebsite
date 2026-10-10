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
    slug: 'storage-room-clearance-dubai',
    title: 'Storage Room Clearance in Dubai: Sort It, Quote It, Empty It',
    excerpt: 'Empty a packed apartment store without losing what matters: decide what stays, separate special materials, photograph the load and book the tower route.',
    service: 'house-clearance',
    cover: 'storage-room-clearance-dubai-cover.png',
    body: 'storage-room-clearance-dubai-body.png',
    bodyKey: 'article-storage-room-clearance-dubai-body',
    coverAlt: 'Shelves, boxes, a rolled rug and a worn table in a sunlit storage room.',
    bodyAlt: 'Four sorting zones for belongings from a storage room',
    seoTitle: 'Storage Room Clearance in Dubai: Apartment Store Clear-Out Guide',
    seoDescription: 'How to clear an apartment storage room in Dubai: sort keep from collection, handle special materials, photograph for quotes, and manage tower service lift access.'
  },
  {
    slug: 'garage-clearance-dubai',
    title: 'Garage Clearance in Dubai: Sort Mixed Contents Before Collection',
    excerpt: 'Plan a villa garage clear-out around what stays, heavy and awkward items, chemicals that need another route, and access for loading.',
    service: 'villa-clearance',
    cover: 'garage-clearance-dubai-cover.png',
    body: 'garage-clearance-dubai-body.png',
    bodyKey: 'article-garage-clearance-dubai-body',
    coverAlt: 'Bicycles, shelves, cartons and worn chairs gathered in a sunlit garage.',
    bodyAlt: 'Separate groups of garage belongings and materials needing special handling',
    seoTitle: 'Garage Clearance Dubai: Villa Garage Clear-Out & Sorting Guide',
    seoDescription: 'How to clear a villa garage in Dubai: sort mixed items, identify restricted chemicals, manage heavy and awkward loads, and coordinate gated community access.'
  },
  {
    slug: 'garden-furniture-disposal-dubai',
    title: 'Garden Furniture Disposal in Dubai: What to Keep Separate',
    excerpt: 'Assess an old outdoor set, separate furniture from garden trimmings and heavy pots, then plan a collection that fits the property and deadline.',
    service: 'garden-waste-removal',
    cover: 'garden-furniture-disposal-dubai-cover.png',
    body: 'garden-furniture-disposal-dubai-body.png',
    bodyKey: 'article-garden-furniture-disposal-dubai-body',
    coverAlt: 'Weathered outdoor chairs and a table beside stacked cushions and empty pots on a patio.',
    bodyAlt: 'Outdoor furniture, branches, pots and cushions kept in separate groups',
    seoTitle: 'Garden Furniture Disposal Dubai: Outdoor Furniture Removal Guide',
    seoDescription: 'How to dispose of old garden furniture in Dubai: decide whether to pass it on, separate furniture from green waste, and coordinate collection across villas and towers.'
  }
];

const inbound = [
  { slug: 'decluttering-small-dubai-apartment', bodyKey: 'crew-arrival-route-plan', seedKey: 'article-before-the-crew-arrives-dubai-body' },
  { slug: 'how-long-villa-clearance-dubai', bodyKey: 'gated-community-access-plan', seedKey: 'article-gated-community-clearance-dubai-body' },
  { slug: 'garden-waste-bins-dubai', bodyKey: 'villa-clearance-groups', seedKey: 'article-villa-handover-clearance-dubai-body' }
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
for (const spec of specs) {
  for (const [file, alt, role] of [[spec.cover, spec.coverAlt, 'cover'], [spec.body, spec.bodyAlt, 'body']] as const) {
    const seedKey = `article-${spec.slug}-${role}`;
    const { docs } = await api.find({ collection: 'media', where: { seedKey: { equals: seedKey } }, limit: 1, depth: 0, overrideAccess: true });
    if (docs[0]) {
      mediaIds.set(file, docs[0].id);
      console.log(`Found existing media ${seedKey} -> id ${docs[0].id}`);
    } else if (apply) {
      console.log(`Uploading media ${seedKey} from ${file}…`);
      const media = await api.create({ collection: 'media', data: { alt, seedKey }, filePath: path.join(imageDir, file), overrideAccess: true });
      mediaIds.set(file, media.id);
      console.log(`Uploaded media ${seedKey} -> id ${media.id}`);
    } else {
      mediaIds.set(file, 999999);
      console.log(`[DRY-RUN] Would upload media ${seedKey} from ${file}`);
    }
  }
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

console.log(apply ? 'Published 3 new articles and synced 3 inbound posts successfully!' : 'Dry run complete and verified.');
await payload.destroy();
