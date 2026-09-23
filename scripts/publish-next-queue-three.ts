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
    slug: 'wardrobe-removal-dubai', title: 'Wardrobe Removal in Dubai: Dismantle or Move It Whole?',
    excerpt: 'A wardrobe may move whole, in designed sections or as controlled disposal panels. Check its construction, mirrors, route and lift access before collection.',
    service: 'furniture-removal', cover: 'wardrobe-removal-cover.webp',
    coverAlt: 'A large wooden wardrobe protected with padded corners and wrap beside a clear bedroom doorway.',
    body: 'wardrobe-dismantling-plan.webp', bodyAlt: 'Wardrobe doors, shelves, rails, panels and hardware arranged in organised groups on a clean floor.',
    seoTitle: 'Wardrobe Removal Dubai: Dismantling and Access Guide',
    seoDescription: 'Plan wardrobe removal in Dubai with checks for construction, mirrors, dismantling, doorways, service lifts, building access and safe collection.',
    ogTitle: 'Wardrobe Removal: Dismantle or Move It Whole?',
    ogDescription: 'Check the wardrobe, route, mirrors and access before deciding how it should leave.'
  },
  {
    slug: 'before-the-crew-arrives-dubai', title: 'Before the Junk Removal Crew Arrives: A Practical Checklist',
    excerpt: 'Prepare the item list, decisions, access and clear route before collection. This practical checklist helps the crew begin safely and without delay.',
    service: 'junk-removal', cover: 'before-crew-arrives-cover.webp',
    coverAlt: 'Boxes, an old chair, a small appliance and a rolled rug grouped beside a clear path to an open apartment door.',
    body: 'crew-arrival-route-plan.webp', bodyAlt: 'A top-down apartment plan with removal items grouped away from a clear route through open doors to the lift.',
    seoTitle: 'Before Junk Removal Arrives: Dubai Checklist',
    seoDescription: 'Prepare for a Dubai junk removal crew with a practical checklist for item decisions, quotes, building access, parking, routes and collection day.',
    ogTitle: 'Before the Junk Removal Crew Arrives',
    ogDescription: 'Confirm the load, building access and route so collection can begin without delay.'
  },
  {
    slug: 'skip-hire-vs-junk-removal-dubai', title: 'Skip Hire or Junk Removal? Choose the Right Setup',
    excerpt: 'Compare the full job: material, duration, placement, loading labour, building rules and final cost. Choose the setup that fits the actual project.',
    service: 'waste-removal', cover: 'skip-hire-comparison-cover.webp',
    coverAlt: 'An empty skip beside a driveway, separated from a grouped sofa, shelving, mattress, rug and bags ready for collection.',
    body: 'skip-direct-load-comparison.webp', bodyAlt: 'A split top-down property plan comparing repeated loading into a skip with direct loading into a collection vehicle.',
    seoTitle: 'Skip Hire Alternative Dubai: Compare Junk Removal',
    seoDescription: 'Compare skip hire and direct junk removal in Dubai by material, project duration, placement, labour, access, building rules and complete cost.',
    ogTitle: 'Skip Hire or Direct Junk Removal?',
    ogDescription: 'Compare space, labour, timing and material before choosing a waste-removal setup.'
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
