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
    slug: 'municipality-vs-paid-junk-removal-dubai', title: 'Free Municipality Collection or a Paid Crew? A Straight Comparison',
    excerpt: 'Dubai Municipality’s bulky-waste service is free for eligible addresses. A paid crew fits when you need carrying, a fixed date or a mixed load cleared.',
    service: 'junk-removal',
    cover: 'article-dubai-municipality-bulky-waste-cover',
    body: { key: 'provider-quote-comparison', seedKey: 'article-choosing-junk-removal-dubai-body' },
    seoTitle: 'Junk Removal vs Municipality Collection in Dubai',
    seoDescription: 'Compare Dubai Municipality’s free bulky-waste collection with a paid junk removal crew on eligibility, carrying, timing, accepted items and cost.',
    ogTitle: 'Free Municipality Collection or a Paid Crew?',
    ogDescription: 'Match your address, route out, deadline and load to the route that finishes the job.'
  },
  {
    slug: 'free-junk-removal-dubai-truth', title: '“Free Junk Removal” in Dubai: What’s Genuinely Free and What Isn’t',
    excerpt: 'Dubai Municipality’s bulky-waste service is genuinely free for eligible household items. Donations and private free offers carry conditions worth checking first.',
    service: 'junk-removal',
    cover: 'article-before-the-crew-arrives-dubai-cover',
    body: { key: 'old-furniture-route-options', seedKey: 'article-dispose-old-furniture-dubai-body' },
    seoTitle: 'Free Junk Removal in Dubai: What’s Genuinely Free',
    seoDescription: 'Understand Dubai Municipality’s free bulky-waste service, donation and private free offers, their conditions and when paid removal fits better.',
    ogTitle: 'What’s Genuinely Free for Junk Removal in Dubai',
    ogDescription: 'Check the conditions behind every free route before relying on it.'
  },
  {
    slug: 'illegal-dumping-fines-dubai', title: 'Fines for Dumping Furniture in Dubai: What the Law Says',
    excerpt: 'Dubai’s waste law bans leaving waste in public places and caps fines at AED 500,000, doubled for a repeat. Keep bulky items inside until a lawful collection.',
    service: 'junk-removal',
    cover: 'article-gated-community-clearance-dubai-cover',
    body: { key: 'municipality-bulky-waste-process', seedKey: 'article-dubai-municipality-bulky-waste-body' },
    seoTitle: 'Fines for Dumping Furniture in Dubai: The Law',
    seoDescription: 'What Law No. 18 of 2024 says about dumping waste in Dubai public places, how fines are set and the lawful routes for old furniture.',
    ogTitle: 'Dumping Furniture in Dubai: The Legal Position',
    ogDescription: 'Keep bulky items inside until a lawful collection takes them.'
  }
];

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
