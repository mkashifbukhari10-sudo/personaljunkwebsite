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
    slug: "decluttering-small-dubai-apartment", title: "Decluttering a Small Dubai Apartment: Start With What Takes Up Floor Space",
    excerpt: "In a small flat, a few unused pieces of furniture cost more room than every drawer combined. Clear them first, set up four exits for everything else, then work room by room.",
    service: "residential-junk-removal",
    cover: "article-what-we-take-dubai-cover",
    body: { key: "crew-arrival-route-plan", seedKey: "article-before-the-crew-arrives-dubai-body" },
    seoTitle: "Decluttering Tips for a Small Dubai Apartment",
    seoDescription: "Practical decluttering tips for a small Dubai apartment: what to clear first, four exits for every item, room-by-room steps and how bulky pieces leave the tower.",
    ogTitle: "Decluttering a Small Dubai Apartment",
    ogDescription: "Clear the big unused pieces first, then give every item an exit."
  },
  {
    slug: "seasonal-clear-out-dubai", title: "A Seasonal Clear-Out in Dubai: Set the Collection Date, Then Sort",
    excerpt: "A spring-cleaning clear-out finishes when it has a fixed end. Book the collection day first, sort each space into clear groups, and have everything leave in one visit.",
    service: "junk-removal",
    cover: "article-estate-clearance-dubai-cover",
    body: { key: "estate-clearance-sorting-plan", seedKey: "article-estate-clearance-dubai-body" },
    seoTitle: "Spring Cleaning Clearance in Dubai: A Seasonal Clear-Out Plan",
    seoDescription: "Plan a spring-cleaning clearance in Dubai: pick the moment, set the collection date, sort storage rooms, garages and wardrobes, and separate items that need another route.",
    ogTitle: "A Seasonal Clear-Out That Actually Finishes",
    ogDescription: "Set the collection date first, then work backwards through every space."
  },
  {
    slug: "pre-ramadan-clear-out-dubai", title: "Clearing Out the Home Before Ramadan: Make Room Before the Month Begins",
    excerpt: "Finish the heavy clearing in the weeks before Ramadan: ready the majlis, guest room and kitchen, pass on what others can use, and have bulky items collected with days to spare.",
    service: "furniture-removal",
    cover: "article-villa-handover-clearance-dubai-cover",
    body: { key: "old-furniture-route-options", seedKey: "article-dispose-old-furniture-dubai-body" },
    seoTitle: "Ramadan Home Clear-Out in Dubai: What to Do Before the Month",
    seoDescription: "A pre-Ramadan home clear-out for Dubai households: a four-week timeline, making room for guests, passing on usable furniture and booking bulky collections in time.",
    ogTitle: "Clearing Out the Home Before Ramadan",
    ogDescription: "A timeline for readying hosting spaces and clearing bulky items before the month begins."
  }
];

// Existing articles edited to carry a contextual inbound link to a new article.
const inboundSyncs: { slug: string; bodyKey: string }[] = [];

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
console.log(apply ? 'Published three articles reusing six existing media documents.' : 'Dry run only.');
await payload.destroy();
