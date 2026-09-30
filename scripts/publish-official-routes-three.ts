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
    slug: 'dispose-old-furniture-dubai', title: 'How to Dispose of Old Furniture in Dubai',
    excerpt: 'Compare repair, confirmed reuse, Dubai Municipality’s eligible bulky-waste service and paid collection before moving old furniture outside.',
    service: 'furniture-removal', cover: 'old-furniture-disposal-cover.webp',
    coverAlt: 'A sofa, chair, cabinet and dismantled shelving grouped safely beside a clear apartment doorway.',
    body: 'old-furniture-route-options.webp', bodyAlt: 'An old armchair at the centre of four equal visual routes representing reuse, recipient collection, official bulky-waste service and paid collection.',
    seoTitle: 'How to Dispose of Old Furniture in Dubai',
    seoDescription: 'Compare repair, reuse, Dubai Municipality bulky-waste eligibility and paid collection, then prepare furniture and property access safely.',
    ogTitle: 'Four Routes for Old Furniture in Dubai',
    ogDescription: 'Match condition, address, access and timing to the right disposal route.'
  },
  {
    slug: 'dispose-fridge-dubai', title: 'How to Dispose of a Fridge in Dubai',
    excerpt: 'Choose an eligible official or paid appliance route, then prepare the refrigerator, connections, doors and complete building path before collection.',
    service: 'appliance-disposal', cover: 'fridge-disposal-cover.webp',
    coverAlt: 'An empty refrigerator prepared for collection beside a clear kitchen doorway in a Dubai apartment.',
    body: 'fridge-removal-route-plan.webp', bodyAlt: 'A top-down apartment plan showing an empty refrigerator following a protected route through measured doorways to a service lift.',
    seoTitle: 'How to Dispose of a Fridge in Dubai',
    seoDescription: 'Plan fridge disposal in Dubai using the official bulky-waste route or paid collection, with checks for preparation, connections, lifts and access.',
    ogTitle: 'Prepare a Refrigerator for Collection in Dubai',
    ogDescription: 'Verify the route, empty the appliance and plan every doorway before it moves.'
  },
  {
    slug: 'dubai-municipality-bulky-waste', title: 'Dubai Municipality Bulky-Waste Collection: How It Works',
    excerpt: 'Check current address eligibility, list every item and follow the official staging instructions before using Dubai Municipality’s bulky-waste service.',
    service: 'junk-removal', cover: 'municipality-bulky-waste-cover.webp',
    coverAlt: 'Household furniture, an appliance and electronics grouped safely inside a villa driveway with a clear vehicle approach.',
    body: 'municipality-bulky-waste-process.webp', bodyAlt: 'A four-stage top-down preparation sequence showing household bulky items inside a property and a scheduled collection route.',
    seoTitle: 'Dubai Municipality Bulky-Waste Collection Guide',
    seoDescription: 'Check Dubai Municipality bulky-waste eligibility, official application details, accepted household items, access and safe collection preparation.',
    ogTitle: 'Use Dubai Municipality Bulky-Waste Collection',
    ogDescription: 'Verify the address, list the load and follow the current official collection instructions.'
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
