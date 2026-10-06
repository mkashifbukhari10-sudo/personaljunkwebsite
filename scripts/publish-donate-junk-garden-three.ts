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
    slug: 'donate-furniture-dubai',
    title: 'Where to Donate Furniture in Dubai: What Can Be Passed On',
    excerpt: 'Donating furniture in Dubai works when items are clean, sturdy and collected on time. Learn what organisations need, when collection is offered and what to do if donation is not an option.',
    service: 'furniture-removal',
    cover: 'article-dispose-old-furniture-dubai-cover',
    body: { key: 'old-furniture-route-options', seedKey: 'article-dispose-old-furniture-dubai-body' },
    seoTitle: 'Where to Donate Furniture in Dubai: Charities and Reuse Options',
    seoDescription: 'How to donate furniture in Dubai: what charities and recipients accept, why damaged pieces are rejected, collection logistics and removal options.',
    ogTitle: 'Where to Donate Furniture in Dubai: What Can Be Passed On',
    ogDescription: 'What recipients accept, how collection works and what to do when donation is not an option.'
  },
  {
    slug: 'what-happens-to-your-junk-dubai',
    title: 'What Actually Happens to Your Junk After We Take It',
    excerpt: 'Follow the journey of cleared junk in Dubai: sorting for reuse, materials recovery for metals and cardboard, licensed e-waste handling and legal disposal at municipal facilities.',
    service: 'junk-removal',
    cover: 'article-what-we-take-dubai-cover',
    body: { key: 'accepted-versus-excluded-guide', seedKey: 'article-what-we-take-dubai-body' },
    seoTitle: 'Where Does Junk Go After Removal in Dubai? The Full Journey',
    seoDescription: 'What happens to junk after collection in Dubai: sorting for reuse, scrap metal and cardboard recycling, e-waste handling, and legal municipal transfer stations.',
    ogTitle: 'What Actually Happens to Your Junk After We Take It',
    ogDescription: 'The real journey of collected junk in Dubai from on-site segregation to licensed recycling and municipal transfer.'
  },
  {
    slug: 'garden-waste-bins-dubai',
    title: "Garden Waste in Dubai: What the Bins Won't Take",
    excerpt: 'Community bins in Dubai are not designed for garden waste. Learn why branches, fronds, soil and heavy pots are rejected, and how to arrange proper collection for your landscaping waste.',
    service: 'garden-waste-removal',
    cover: 'cut-palm-fronds-on-the-ground',
    body: { key: 'villa-clearance-groups', seedKey: 'article-villa-handover-clearance-dubai-body' },
    seoTitle: 'Garden Waste in Dubai Bins: Rules, Limits and Proper Disposal',
    seoDescription: 'Why Dubai residential bins reject garden waste: restrictions on branches, palm fronds, soil, and pots, municipal rules, and how to arrange legal green waste collection.',
    ogTitle: "Garden Waste in Dubai: What the Bins Won't Take",
    ogDescription: 'Why community bins reject garden and landscaping waste, and how to dispose of green waste legally in Dubai.'
  }
];

// Existing articles edited to carry a contextual inbound link to a new article.
const inboundSyncs = [
  { slug: 'dispose-old-furniture-dubai', bodyKey: 'old-furniture-route-options', seedKey: 'article-dispose-old-furniture-dubai-body' },
  { slug: 'what-dubai-bins-wont-take', bodyKey: 'municipality-bulky-waste-process', seedKey: 'article-dubai-municipality-bulky-waste-body' },
  { slug: 'soil-sand-pots-disposal-dubai', bodyKey: 'skip-direct-load-comparison', seedKey: 'article-skip-hire-vs-junk-removal-dubai-body' }
];

const byFilename: Record<string, string> = {
  'cut-palm-fronds-on-the-ground': 'cut-palm-fronds-on-the-ground.webp'
};

const findMedia = async (seedKey: string) => {
  const where = byFilename[seedKey] ? { filename: { equals: byFilename[seedKey] } } : { seedKey: { equals: seedKey } };
  const { docs } = await api.find({ collection: 'media', where, limit: 1, depth: 0, overrideAccess: true });
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
  const bodyId = await findMedia(sync.seedKey);
  const content = toLexical(sync.slug, sync.bodyKey, bodyId);
  const before = countArticleWords(posts[0].content);
  const after = countArticleWords(content);
  if (after - before < 0 || after - before > 50) throw new Error(`${sync.slug}: stored body (${before}) diverges from Markdown (${after})`);
  console.log(`${apply ? 'SYNC' : 'READY'} ${sync.slug}: ${before} → ${after} body words`);
  if (apply) await api.update({ collection: 'posts', id: posts[0].id, data: { content }, draft: false, overrideAccess: true });
}
console.log(apply ? 'Published three articles reusing six existing media documents and synced three inbound links.' : 'Dry run only.');
await payload.destroy();
