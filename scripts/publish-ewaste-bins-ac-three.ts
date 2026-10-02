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
    slug: 'e-waste-disposal-dubai', title: 'E-Waste Disposal in Dubai: The Rules and the Routes',
    excerpt: 'Electronics, batteries and lamps don’t go in Dubai’s household bins. Use a Smart Sustainability Oasis, an approved e-waste company or bulky-waste collection.',
    service: 'appliance-disposal',
    cover: 'article-dubai-municipality-bulky-waste-cover',
    body: { key: 'estate-clearance-sorting-plan', seedKey: 'article-estate-clearance-dubai-body' },
    seoTitle: 'E-Waste Disposal in Dubai: Rules and Routes',
    seoDescription: 'Where Dubai Municipality sends e-waste, batteries and lamps: Smart Sustainability Oasis drop-off, approved e-waste companies and bulky-waste collection.',
    ogTitle: 'E-Waste Disposal in Dubai: The Official Routes',
    ogDescription: 'Wipe your data, sort the load and match each item to the right route.'
  },
  {
    slug: 'what-dubai-bins-wont-take', title: 'What You Can’t Put in a Dubai Bin',
    excerpt: 'Dubai bins take general waste and clean recyclables. Furniture, electronics, batteries, chemicals and gas cylinders each have their own Municipality route.',
    service: 'junk-removal',
    cover: 'unsplash-pickup-truck-loaded-with-waste',
    body: { key: 'municipality-bulky-waste-process', seedKey: 'article-dubai-municipality-bulky-waste-body' },
    seoTitle: 'What You Can’t Throw in Dubai Bins',
    seoDescription: 'Dubai Municipality’s Waste Segregation Guide explained: the three-bin system, non-recyclable items and the routes for furniture, e-waste and hazardous items.',
    ogTitle: 'What Dubai Bins Won’t Take, and Where It Goes',
    ogDescription: 'Sort each item into the right route before it leaves your home.'
  },
  {
    slug: 'old-ac-unit-disposal-dubai', title: 'Getting Rid of an Old AC Unit in Dubai',
    excerpt: 'An old air conditioner holds refrigerant gas. Have a qualified technician disconnect it first, then send the unit through an appliance disposal route.',
    service: 'appliance-disposal',
    cover: 'article-dispose-fridge-dubai-cover',
    body: { key: 'service-lift-protection', seedKey: 'article-service-lift-booking-dubai-body' },
    seoTitle: 'AC Unit Removal in Dubai: Disconnect, Then Dispose',
    seoDescription: 'How to remove an old AC unit in Dubai: why refrigerant needs a qualified technician, which disposal routes fit, and how to get the unit out safely.',
    ogTitle: 'Getting Rid of an Old AC Unit in Dubai',
    ogDescription: 'Deal with the refrigerant first, then plan the route out and the disposal.'
  }
];

const byFilename: Record<string, string> = { 'unsplash-pickup-truck-loaded-with-waste': 'pickup-truck-loaded-with-waste-final.webp' };
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
for (const spec of specs) {
  const coverId = await findMedia(spec.cover);
  const bodyId = await findMedia(spec.body.seedKey);
  const markdown = fs.readFileSync(path.join('docs/content-system/articles', spec.slug + '.md'), 'utf8');
  const content = articleToLexical(markdown, resolveLink, (key) => {
    if (key !== spec.body.key) throw new Error(`${spec.slug}: unresolved body image ${key}`);
    return bodyId;
  });
  const words = countArticleWords(content);
  if (words < MIN_ARTICLE_WORDS) throw new Error(`${spec.slug}: ${words} words is below ${MIN_ARTICLE_WORDS}`);
  const headings = content.root.children.filter((node: any) => node.type === 'heading');
  if (headings.length < 6) throw new Error(`${spec.slug}: insufficient heading structure`);
  console.log(`${apply ? 'PUBLISH' : 'READY'} ${spec.slug}: ${words} body words, cover media ${coverId}, body media ${bodyId}`);
  if (!apply) continue;
  const service = serviceId.get(spec.service);
  if (!service) throw new Error('Missing service: ' + spec.service);
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
console.log(apply ? 'Published three articles reusing six existing media documents.' : 'Dry run only.');
await payload.destroy();
