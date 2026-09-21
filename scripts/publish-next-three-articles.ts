import fs from 'node:fs';
import path from 'node:path';
import { getPayload } from 'payload';
import config from '../payload.config';
import { articleToLexical } from './article-markdown.mjs';
import { countArticleWords, MIN_ARTICLE_WORDS } from '../lib/content/article-word-count.js';

process.env.PAYLOAD_DISABLE_SCHEMA_PUSH = 'true';
const apply = process.argv.includes('--apply');
const payload = await getPayload({ config });
const api: any = payload;

const specs = [
  {
    slug: 'sofa-wont-fit-through-door-dubai',
    title: "Your Sofa Won't Fit Through the Door. Here's What Actually Happens Next",
    excerpt: "A sofa that stops at the doorway needs a route assessment, not more force. Learn what to measure, when sections or feet may come off, and what to send before booking.",
    service: 'sofa-removal',
    cover: 'sofa-doorway-cover.webp',
    coverAlt: 'A large beige corner sofa positioned across a narrow apartment doorway.',
    body: 'sofa-route-measurement.webp',
    bodyAlt: 'A top-down illustration of a sofa and doorway route with measuring tapes and turning arrows.',
    seoTitle: "Sofa Won't Fit Through the Door in Dubai? What Happens Next",
    seoDescription: 'What to measure when a sofa will not fit through a doorway, how sectional parts and access routes affect removal, and what to send before booking.',
    ogTitle: "Sofa Won't Fit? Plan the Route Before Removal",
    ogDescription: 'A practical Dubai guide to sofa dimensions, doorways, turns, lift access and dismantling decisions.'
  },
  {
    slug: 'service-lift-booking-dubai',
    title: 'Service Lift Booking in Dubai Buildings: How It Actually Works',
    excerpt: 'The building controls the service lift, while the removal provider plans around the approved window. Here is what to confirm before fixing a collection time.',
    service: 'residential-junk-removal',
    cover: 'service-lift-cover.webp',
    coverAlt: 'An open padded goods lift in a modern building with an empty flatbed trolley outside.',
    body: 'service-lift-protection.webp',
    bodyAlt: 'A goods lift interior protected with blue wall pads and an empty trolley.',
    seoTitle: 'Service Lift Booking for Junk Removal in Dubai Buildings',
    seoDescription: 'How to confirm a service-lift window, building documents, protection rules, loading access and removal timing in a Dubai tower.',
    ogTitle: 'How Service Lift Booking Works for Junk Removal',
    ogDescription: 'Match building approval, lift access and the collection booking before removal day.'
  },
  {
    slug: 'villa-handover-clearance-dubai',
    title: 'Villa Handover: What Has to Be Gone Before Inspection',
    excerpt: 'A villa handover needs more than an empty living room. Build a full inventory, settle ownership, clear every storage area and leave time for cleaning and repairs.',
    service: 'villa-clearance',
    cover: 'villa-handover-cover.webp',
    coverAlt: 'A mostly empty villa living room with a small group of household items ready to be removed.',
    body: 'villa-clearance-groups.webp',
    bodyAlt: 'Household items grouped beside a clear route through a villa to an open patio.',
    seoTitle: 'Villa Handover Clearance Dubai: Room-by-Room Guide',
    seoDescription: 'Plan a Dubai villa handover clearance room by room, including ownership checks, appliances, garden waste, access, cleaning and the final inspection.',
    ogTitle: 'Villa Handover Clearance: What Must Be Gone',
    ogDescription: 'A practical room-by-room plan for clearing a villa before inspection and key return.'
  }
];

const { docs: authors } = await api.find({ collection: 'authors', where: { name: { equals: 'Junk Services Dubai Team' } }, limit: 1, depth: 0, overrideAccess: true });
if (!authors[0]) throw new Error('Required author is missing');
const { docs: services } = await api.find({ collection: 'services', pagination: false, depth: 0, overrideAccess: true });
const serviceId = new Map(services.map((doc: any) => [doc.slug, doc.id]));
const { docs: existing } = await api.find({ collection: 'posts', where: { slug: { in: specs.map((s) => s.slug) } }, pagination: false, depth: 0, overrideAccess: true, draft: true });
if (existing.length) throw new Error('Stop: one or more target slugs already exist: ' + existing.map((p: any) => p.slug).join(', '));

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
      seo: {
        title: spec.seoTitle, description: spec.seoDescription,
        canonical: `https://junkservicesdubai.com/blog/${spec.slug}`, noIndex: false,
        ogImage: mediaIds.get(spec.cover), ogTitle: spec.ogTitle, ogDescription: spec.ogDescription
      }
    }
  });
}
console.log(apply ? 'Published three articles and uploaded six generated images.' : 'Dry run only.');
await payload.destroy();
