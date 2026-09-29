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
    slug: 'estate-clearance-dubai', title: 'Clearing a Home After a Bereavement: A Respectful Plan',
    excerpt: 'Protect documents and personal items, confirm decision authority and sort the home into clear groups before arranging a respectful estate clearance.',
    service: 'villa-clearance', cover: 'estate-clearance-cover.webp',
    coverAlt: 'A calm villa living room with household possessions organised in separate boxes beside a blank inventory notebook.',
    body: 'estate-clearance-sorting-plan.webp', bodyAlt: 'A top-down home plan with possessions organised into separate decision groups, a secure document box and a clear exit route.',
    seoTitle: 'Estate Clearance Dubai: A Respectful Home Plan',
    seoDescription: 'Plan an estate clearance in Dubai with clear authority, protected documents, family decision groups, a complete inventory and careful collection.',
    ogTitle: 'A Respectful Plan for Clearing a Home',
    ogDescription: 'Protect important items, organise decisions and arrange removal only after the scope is clear.'
  },
  {
    slug: 'flatpack-furniture-disposal-dubai', title: 'Flat-Pack Furniture: Will It Survive Another Move?',
    excerpt: 'Inspect panels, joints and hardware before moving flat-pack furniture. Condition and access determine whether it should stay intact, be dismantled or removed.',
    service: 'furniture-removal', cover: 'flatpack-furniture-cover.webp',
    coverAlt: 'Flat-pack wardrobe panels and hardware arranged safely on a bedroom floor beside an intact cabinet and clear doorway.',
    body: 'flatpack-condition-comparison.webp', bodyAlt: 'An intact cabinet, reusable flat-pack panels and damaged swollen panels arranged in separate condition groups with organised hardware.',
    seoTitle: 'Flat-Pack Furniture Disposal Dubai: Move or Remove?',
    seoDescription: 'Assess flat-pack furniture before disposal or moving in Dubai, including panel condition, joints, hardware, dismantling, storage and access.',
    ogTitle: 'Will Flat-Pack Furniture Survive Another Move?',
    ogDescription: 'Inspect the panels, joints, hardware and route before deciding how the item should leave.'
  },
  {
    slug: 'choosing-junk-removal-dubai', title: 'How to Choose a Junk Removal Company in Dubai',
    excerpt: 'Compare the same complete job across providers: item list, access, labour, vehicle, exclusions, timing and the process for changes.',
    service: 'junk-removal', cover: 'choosing-provider-cover.webp',
    coverAlt: 'Three blank provider folders and a checklist beside a photographed household load and generic removal vehicles.',
    body: 'provider-quote-comparison.webp', bodyAlt: 'Three equally weighted quote sheets beside a photo inventory and route sketch with matching service icons.',
    seoTitle: 'How to Choose a Junk Removal Company in Dubai',
    seoDescription: 'Compare junk removal companies in Dubai using one item list and clear checks for identity, access, labour, vehicle capacity, exclusions and timing.',
    ogTitle: 'Choose a Junk Removal Company with Clear Evidence',
    ogDescription: 'Compare equal scopes and resolve assumptions before the collection vehicle arrives.'
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
