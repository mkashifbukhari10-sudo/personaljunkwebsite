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
    slug: 'mattress-disposal-dubai', title: 'Mattress Disposal in Dubai: Plan the Whole Route',
    excerpt: 'A mattress needs more than a pickup time. Check reuse, size, wrapping, doorways, lift access and the complete bed set before collection day.',
    service: 'furniture-removal', cover: 'mattress-disposal-cover.webp',
    coverAlt: 'A used mattress standing upright beside an open bedroom doorway in a bright apartment.',
    body: 'mattress-route-preparation.webp', bodyAlt: 'A covered mattress beside a measured doorway and a clear apartment corridor.',
    seoTitle: 'Mattress Disposal Dubai: Access and Collection Guide',
    seoDescription: 'Plan mattress disposal in Dubai with practical checks for reuse, wrapping, doorways, lift booking, bed frames and replacement delivery timing.',
    ogTitle: 'Mattress Disposal: Plan the Route Before Pickup',
    ogDescription: 'Measure the mattress, clear the route and confirm building access before collection.'
  },
  {
    slug: 'bulky-items-tower-dubai', title: 'Getting Bulky Items Out of a Dubai Tower',
    excerpt: 'The item, doorway, corridor, service lift and loading bay must work as one route. Measure every restriction and confirm building access before pickup.',
    service: 'residential-junk-removal', cover: 'bulky-item-tower-cover.webp',
    coverAlt: 'A large wrapped cabinet on a trolley beside an open padded service lift in an apartment tower corridor.',
    body: 'tower-route-measurement.webp', bodyAlt: 'A top-down apartment route with a cabinet, doorways, corridor turns and lift opening marked by measuring tapes.',
    seoTitle: 'Getting Bulky Items Out of a Dubai Tower',
    seoDescription: 'A practical Dubai tower checklist for measuring bulky items, booking the service lift, protecting the route and planning loading-bay access.',
    ogTitle: 'Bulky Item in a Tower? Measure the Entire Route',
    ogDescription: 'Plan the room, doors, turns, lift and loading bay before the item starts moving.'
  },
  {
    slug: 'old-sofa-before-new-delivery-dubai', title: 'Remove the Old Sofa Before the New One Arrives',
    excerpt: 'Separate removal and delivery into a controlled sequence. Confirm the retailer’s scope, clear the route and leave time to clean before the replacement arrives.',
    service: 'sofa-removal', cover: 'old-sofa-delivery-cover.webp',
    coverAlt: 'An old beige sofa prepared for removal beside an open apartment doorway and a cleared living-room space.',
    body: 'sofa-delivery-route.webp', bodyAlt: 'A top-down apartment plan showing a sofa route through a measured doorway and corridor to a lift.',
    seoTitle: 'Remove an Old Sofa Before New Delivery in Dubai',
    seoDescription: 'Plan old-sofa removal before a new delivery in Dubai, including retailer terms, measurements, lift bookings, timing, dismantling and room preparation.',
    ogTitle: 'Old Sofa Out Before the New Delivery',
    ogDescription: 'Use separate windows for removal, cleaning and delivery so the route stays clear.'
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
