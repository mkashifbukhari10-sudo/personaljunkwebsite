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

// Every image reuses an existing generated Media document (image.md: reuse before uploading).
const specs = [
  {
    slug: 'out-of-hours-clearance-dubai', title: 'Why Offices Book Clearances for Nights and Weekends',
    excerpt: 'An evening or weekend clearance keeps lifts, corridors and loading bays free of staff and visitors. It works when the building approves the window and the load is ready.',
    service: 'commercial-junk-removal',
    cover: 'article-office-strip-out-dubai-cover',
    body: { key: 'warehouse-clearance-zone-plan', seedKey: 'article-warehouse-clearance-dubai-body' },
    seoTitle: 'Out of Hours Clearance in Dubai: Nights and Weekends',
    seoDescription: 'When an out-of-hours office, shop or warehouse clearance makes sense in Dubai, what the building must approve, and how to prepare so the window is spent loading.',
    ogTitle: 'Why Offices Book Clearances for Nights and Weekends',
    ogDescription: 'Agree the window with the building, prepare the floor and keep the route clear.'
  },
  {
    slug: 'how-long-villa-clearance-dubai', title: 'How Long Does a Villa Clearance Actually Take?',
    excerpt: 'A full villa clearance is planned as half a day to two days, with four or more crew and several loads. Volume, carry route, garden material and preparation decide which.',
    service: 'villa-clearance',
    cover: 'article-how-much-fits-in-one-load-dubai-cover',
    body: { key: 'gated-community-access-plan', seedKey: 'article-gated-community-clearance-dubai-body' },
    seoTitle: 'How Long Does a Villa Clearance Take in Dubai?',
    seoDescription: 'How long a Dubai villa clearance takes: the half-day to two-day range, what moves a job between them, and how to plan backwards from a handover date.',
    ogTitle: 'How Long Does a Villa Clearance Actually Take?',
    ogDescription: 'What decides whether your villa clears in one day or two, and how to keep the plan on time.'
  },
  {
    slug: 'soil-sand-pots-disposal-dubai', title: 'Soil, Sand and Pots: The Garden Waste People Forget to Plan For',
    excerpt: 'Bagged soil and empty pots go with a normal garden load. Loose soil, sand and full planters are heavy, so photograph them first and the right crew and truck can be confirmed.',
    service: 'garden-waste-removal',
    cover: 'article-villa-handover-clearance-dubai-body',
    body: { key: 'skip-direct-load-comparison', seedKey: 'article-skip-hire-vs-junk-removal-dubai-body' },
    seoTitle: 'Soil Removal in Dubai: Sand, Soil Bags and Plant Pots',
    seoDescription: 'How to get soil, sand and plant pots removed in Dubai: bagged versus loose material, full planters, balcony and villa gardens, and what to photograph for a quote.',
    ogTitle: 'Soil, Sand and Pots: Plan the Heavy Garden Waste',
    ogDescription: 'Bag what you can, empty what you can, and show the real volume before booking.'
  }
];

// Existing articles edited to carry a contextual inbound link to a new article.
const inboundSyncs = [{ slug: 'office-strip-out-dubai', bodyKey: 'office-stripout-phasing-plan' }];

const findMedia = async (seedKey: string) => {
  const { docs } = await api.find({ collection: 'media', where: { seedKey: { equals: seedKey } }, limit: 1, depth: 0, overrideAccess: true });
  if (!docs[0]) throw new Error('Missing existing media: ' + seedKey);
  return docs[0].id;
};

const { docs: authors } = await api.find({ collection: 'authors', where: { name: { equals: 'Junk Services Dubai Team' } }, limit: 1, depth: 0, overrideAccess: true });
if (!authors[0]) throw new Error('Required author is missing');
const { docs: services } = await api.find({ collection: 'services', pagination: false, depth: 0, overrideAccess: true });
const serviceId = new Map(services.map((doc: any) => [doc.slug, doc.id]));
const { docs: existing } = await api.find({ collection: 'posts', where: { slug: { in: specs.map((s) => s.slug) } }, pagination: false, depth: 0, overrideAccess: true, draft: true });
if (existing.length) throw new Error('Stop: target slugs already exist: ' + existing.map((p: any) => p.slug).join(', '));

const resolveLink = (url: string) => ({ linkType: 'custom', url, newTab: url.startsWith('https://') });
const toLexical = (slug: string, bodyKey: string, bodyId: number) => {
  const markdown = fs.readFileSync(path.join('docs/content-system/articles', slug + '.md'), 'utf8');
  return articleToLexical(markdown, resolveLink, (key) => {
    if (key !== bodyKey) throw new Error(`${slug}: unresolved body image ${key}`);
    return bodyId;
  });
};

for (const spec of specs) {
  if (spec.excerpt.length > 200) throw new Error(`${spec.slug}: excerpt is ${spec.excerpt.length} characters`);
  const service = serviceId.get(spec.service);
  if (!service) throw new Error('Missing service: ' + spec.service);
  const coverId = await findMedia(spec.cover);
  const bodyId = await findMedia(spec.body.seedKey);
  const content = toLexical(spec.slug, spec.body.key, bodyId);
  const words = countArticleWords(content);
  if (words < MIN_ARTICLE_WORDS) throw new Error(`${spec.slug}: ${words} words is below ${MIN_ARTICLE_WORDS}`);
  const headings = content.root.children.filter((node: any) => node.type === 'heading');
  if (headings.length < 6) throw new Error(`${spec.slug}: insufficient heading structure`);
  console.log(`${apply ? 'PUBLISH' : 'READY'} ${spec.slug}: ${words} body words, cover media ${coverId}, body media ${bodyId}`);
  if (!apply) continue;
  await api.create({
    collection: 'posts', draft: false, overrideAccess: true,
    data: {
      slug: spec.slug, title: spec.title, excerpt: spec.excerpt,
      coverImage: coverId, content, author: authors[0].id,
      relatedServices: [service], relatedAreas: [], _status: 'published',
      seo: { title: spec.seoTitle, description: spec.seoDescription, canonical: `https://www.junkservicesdubai.com/blog/${spec.slug}`, noIndex: false, ogImage: coverId, ogTitle: spec.ogTitle, ogDescription: spec.ogDescription }
    }
  });
}

for (const sync of inboundSyncs) {
  const { docs: posts } = await api.find({ collection: 'posts', where: { slug: { equals: sync.slug } }, limit: 1, depth: 0, overrideAccess: true, draft: true });
  if (!posts[0]) throw new Error(`Missing post: ${sync.slug}`);
  const bodyId = await findMedia(`article-${sync.slug}-body`);
  const content = toLexical(sync.slug, sync.bodyKey, bodyId);
  const before = countArticleWords(posts[0].content);
  const after = countArticleWords(content);
  // The stored body must match the Markdown apart from the added sentence, or the sync would overwrite CMS edits.
  if (after - before < 0 || after - before > 40) throw new Error(`${sync.slug}: stored body (${before}) diverges from Markdown (${after})`);
  console.log(`${apply ? 'SYNC' : 'READY'} ${sync.slug}: ${before} → ${after} body words`);
  if (apply) await api.update({ collection: 'posts', id: posts[0].id, data: { content }, draft: false, overrideAccess: true });
}
console.log(apply ? 'Published three articles reusing six existing media documents and synced one inbound link.' : 'Dry run only.');
await payload.destroy();
