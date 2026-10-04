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
    slug: 'what-we-take-dubai',
    title: 'What We Take, What We Don’t, and Why: Dubai Junk Removal Acceptance Guide',
    excerpt: 'Understand what Dubai junk removal crews can take, what hazardous items are strictly excluded by law, and how mixed household and commercial loads are handled.',
    service: 'junk-removal',
    cover: 'what-we-take-cover.webp',
    coverAlt: 'A bright, modern Dubai apartment living room with an organized collection of a fabric sofa, stacked moving boxes, and an appliance staged safely beside an open interior doorway.',
    body: 'accepted-versus-excluded-guide.webp',
    bodyAlt: 'A clean architectural comparison diagram showing generic line-art items of accepted household furniture and appliances on the left against excluded hazardous chemicals and gas cylinders on the right.',
    seoTitle: 'What Junk Removal Companies Take in Dubai: Accepted Items & Exclusions',
    seoDescription: 'Clear guide to what Dubai junk removal companies take: furniture, white goods, electronics, garden waste, plus strictly excluded hazardous materials.',
    ogTitle: 'What We Take, What We Don’t, and Why',
    ogDescription: 'Check what Dubai junk removal crews take, what hazardous materials are excluded, and how mixed loads are handled.'
  },
  {
    slug: 'how-much-fits-in-one-load-dubai',
    title: 'How Much Fits in One Load? Estimating Junk Removal Truck Space in Dubai',
    excerpt: 'Wondering how much fits in a Dubai junk removal truck? Learn how standard 3-ton trucks are loaded, volume fractions from single items to full loads, and how to estimate your space.',
    service: 'junk-removal',
    cover: 'truck-load-cover.webp',
    coverAlt: 'A contemporary editorial photograph of a pristine, unbranded white commercial 3-ton covered box truck parked in a clean paved driveway of a modern Dubai residential villa.',
    body: 'truck-load-capacity-guide.webp',
    bodyAlt: 'An architectural isometric cutaway diagram of a standard 3-ton clearance truck showing modular volume sections packed with household furniture, appliances, and stacked cartons.',
    seoTitle: 'How Much Fits in One Junk Removal Truck in Dubai? Capacity Guide',
    seoDescription: 'How much junk fits in a standard Dubai removal truck: 3-ton capacity, volume fractions, apartment vs villa loads, and how professional packing maximizes space.',
    ogTitle: 'How Much Actually Fits in One Load?',
    ogDescription: 'Understand 3-ton truck volume fractions, packing methods, and how to estimate your clearance load in Dubai.'
  },
  {
    slug: 'junk-removal-cost-dubai',
    title: 'What Junk Removal Costs in Dubai: Pricing Factors and How Quotes Work',
    excerpt: 'Understand what determines junk removal costs in Dubai: volume, access, lift availability, dismantling, and municipal fees. Learn how transparent photo quotes eliminate surprise charges.',
    service: 'junk-removal',
    cover: 'junk-removal-cost-cover.webp',
    coverAlt: 'A bright, elegant Dubai apartment living room counter with an inventory clipboard and smartphone resting in the foreground with neatly grouped furniture in the background.',
    body: 'cost-factors-breakdown.webp',
    bodyAlt: 'A clean architectural infographic diagram illustrating the key variables of a clearance quote including vehicle volume, access distance, elevator availability, furniture dismantling, crew labor, and municipal disposal.',
    seoTitle: 'Junk Removal Cost Dubai: Pricing Factors, Quotes & Transparency',
    seoDescription: 'What drives junk removal costs in Dubai: truck volume, access, floor level, dismantling, and municipal disposal fees. How fixed upfront photo quotes work.',
    ogTitle: 'What Junk Removal Actually Costs in Dubai',
    ogDescription: 'Learn the verified variables that determine junk removal costs in Dubai and how transparent upfront photo quoting works.'
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
