import fs from 'node:fs';
import path from 'node:path';
import { getPayload } from 'payload';
import './_script-env';
import config from '../payload.config';
import { articleToLexical } from './article-markdown.mjs';
import { countArticleWords, MIN_ARTICLE_WORDS } from '../lib/content/article-word-count.js';

const apply = process.argv.includes('--apply');
const specs = [
  {
    slug: 'it-equipment-disposal-dubai',
    title: 'Old Office IT Equipment Disposal in Dubai: Practical and Responsible Steps',
    excerpt: 'A practical guide to clearing office computers, servers and electronics in Dubai: separate data-bearing drives, arrange building permissions and coordinate e-waste collection.',
    service: 'commercial-junk-removal',
    cover: 'it-equipment-disposal-cover.webp',
    body: 'it-equipment-sorting-workflow.webp',
    bodyKey: 'it-equipment-sorting-workflow',
    coverAlt: 'Neatly grouped decommissioned office computers, monitors and server equipment staged along a clear hallway in a modern Dubai commercial office.',
    bodyAlt: 'An isometric diagram separating office IT equipment into data-cleared hardware, recyclable components, and isolated battery and power units beside a loading bay route.',
    seoTitle: 'IT Equipment Disposal Dubai: Office Computers & E-Waste Guide',
    seoDescription: 'How to dispose of office IT equipment in Dubai: data-security boundaries, separating electronics, arranging building loading bay access and compliant e-waste removal.'
  },
  {
    slug: 'weekend-junk-removal-dubai',
    title: 'Weekend Junk Removal in Dubai: Booking, Building Access and Timing',
    excerpt: 'Planning a Saturday or Sunday junk collection in Dubai? How weekend security approvals, service lift hours, noise rules and crew scheduling actually work across towers and villas.',
    service: 'same-day-junk-removal',
    cover: 'weekend-junk-removal-cover.webp',
    body: 'weekend-access-schedule-plan.webp',
    bodyKey: 'weekend-access-schedule-plan',
    coverAlt: 'A residential Dubai apartment corridor and open doorway with household items staged neatly for a scheduled weekend clearance.',
    bodyAlt: 'A weekend clearance planning diagram showing Saturday and Sunday security office hours, service lift booking windows, and loading bay access checkpoints.',
    seoTitle: 'Weekend Junk Removal Dubai: Saturday & Sunday Collection Guide',
    seoDescription: 'How weekend junk removal in Dubai works: book Saturday or Sunday slots, secure building security approval, manage service lift hours and clear your home without delays.'
  },
  {
    slug: 'landlord-inspection-clearance-dubai',
    title: 'Landlord Inspection Clearance in Dubai: Passing Handover Without Deductions',
    excerpt: 'Pass your Dubai landlord move-out inspection without deposit cuts: clear hidden items, remove tenant alterations, coordinate key handover and document the final walkthrough.',
    service: 'house-clearance',
    cover: 'landlord-inspection-clearance-cover.webp',
    body: 'inspection-handover-checklist-plan.webp',
    bodyKey: 'inspection-handover-checklist-plan',
    coverAlt: 'A spotless, completely cleared Dubai rental apartment living room prepared for the final landlord handover walkthrough and key return.',
    bodyAlt: 'A side-by-side comparison diagram showing a fully cleared property passing inspection without deductions versus common overlooked spots like balcony storage and curtain fixtures.',
    seoTitle: 'Landlord Inspection Clearance Dubai: Move-Out Handover Guide',
    seoDescription: 'How to pass your Dubai landlord move-out inspection: what must be removed, avoiding deposit deductions, documentation tips and scheduling same-day clearance before handover.'
  }
];

const inbound = [
  { slug: 'office-furniture-removal-dubai', bodyKey: 'office-furniture-sorting', seedKey: 'article-office-furniture-removal-dubai-body' },
  { slug: 'service-lift-booking-dubai', bodyKey: 'service-lift-protection', seedKey: 'article-service-lift-booking-dubai-body' },
  { slug: 'deposit-deductions-left-furniture-dubai', bodyKey: 'handover-inspection-comparison', seedKey: 'article-deposit-deductions-left-furniture-dubai-body' }
];

console.log('Connecting to CMS…');
const payload = await getPayload({ config });
console.log('CMS connection ready');
const api: any = payload;
const link = (url: string) => ({ linkType: 'custom', url, newTab: url.startsWith('https://') });
const imageDir = path.resolve('public/images/articles');

const { docs: authors } = await api.find({ collection: 'authors', where: { name: { equals: 'Junk Services Dubai Team' } }, limit: 1, depth: 0, overrideAccess: true });
if (!authors[0]) throw new Error('Required author is missing');

const { docs: services } = await api.find({ collection: 'services', pagination: false, depth: 0, overrideAccess: true });
const serviceId = new Map(services.map((doc: any) => [doc.slug, doc.id]));

const { docs: existing } = await api.find({ collection: 'posts', where: { slug: { in: specs.map(s => s.slug) } }, pagination: false, depth: 0, overrideAccess: true, draft: true });
if (existing.length) throw new Error('Target slugs already exist: ' + existing.map((p: any) => p.slug).join(', '));

const mediaIds = new Map<string, any>();
if (apply) {
  for (const spec of specs) {
    for (const [file, alt, role] of [[spec.cover, spec.coverAlt, 'cover'], [spec.body, spec.bodyAlt, 'body']] as const) {
      const seedKey = `article-${spec.slug}-${role}`;
      const { docs } = await api.find({ collection: 'media', where: { seedKey: { equals: seedKey } }, limit: 1, depth: 0, overrideAccess: true });
      const media = docs[0] || await api.create({ collection: 'media', data: { alt, seedKey }, filePath: path.join(imageDir, file), overrideAccess: true });
      mediaIds.set(file, media.id);
    }
  }
}

for (const spec of specs) {
  const markdown = fs.readFileSync(path.resolve('docs/content-system/articles', spec.slug + '.md'), 'utf8');
  const content = articleToLexical(markdown, link, (key: string) => {
    if (key !== spec.bodyKey) throw new Error(`${spec.slug}: unexpected image ${key}`);
    return apply ? mediaIds.get(spec.body) : 1;
  });
  const words = countArticleWords(content);
  if (words < MIN_ARTICLE_WORDS) throw new Error(`${spec.slug}: ${words} < ${MIN_ARTICLE_WORDS}`);
  if (spec.excerpt.length > 200) throw new Error(`${spec.slug}: excerpt exceeds 200 characters`);
  if (content.root.children.filter((n: any) => n.type === 'heading').length < 6) throw new Error(`${spec.slug}: heading structure too thin`);
  console.log(`${apply ? 'PUBLISH' : 'READY'} ${spec.slug}: ${words} body words`);
  if (!apply) continue;
  const service = serviceId.get(spec.service);
  if (!service) throw new Error(`Missing service ${spec.service}`);
  await api.create({ collection: 'posts', draft: false, overrideAccess: true, data: {
    slug: spec.slug, title: spec.title, excerpt: spec.excerpt, coverImage: mediaIds.get(spec.cover), content,
    author: authors[0].id, relatedServices: [service], relatedAreas: [], _status: 'published',
    seo: { title: spec.seoTitle, description: spec.seoDescription, canonical: `https://www.junkservicesdubai.com/blog/${spec.slug}`, noIndex: false,
      ogImage: mediaIds.get(spec.cover), ogTitle: spec.title, ogDescription: spec.excerpt }
  }});
}

for (const sync of inbound) {
  const { docs: posts } = await api.find({ collection: 'posts', where: { slug: { equals: sync.slug } }, limit: 1, depth: 0, overrideAccess: true, draft: true });
  if (!posts[0]) throw new Error(`Missing inbound post ${sync.slug}`);
  const { docs: media } = await api.find({ collection: 'media', where: { seedKey: { equals: sync.seedKey } }, limit: 1, depth: 0, overrideAccess: true });
  if (!media[0]) throw new Error(`Missing inbound media ${sync.seedKey}`);
  const markdown = fs.readFileSync(path.resolve('docs/content-system/articles', sync.slug + '.md'), 'utf8');
  const content = articleToLexical(markdown, link, (key: string) => {
    if (key !== sync.bodyKey) throw new Error(`${sync.slug}: unexpected image ${key}`);
    return media[0].id;
  });
  const before = countArticleWords(posts[0].content);
  const after = countArticleWords(content);
  if (after < before || after - before > 70) throw new Error(`${sync.slug}: stored article diverges (${before} → ${after})`);
  console.log(`${apply ? 'SYNC' : 'READY'} ${sync.slug}: ${before} → ${after}`);
  if (apply) await api.update({ collection: 'posts', id: posts[0].id, data: { content }, draft: false, overrideAccess: true });
}

console.log(apply ? 'Published 3 new articles and synced 3 inbound posts successfully!' : 'Dry run complete and verified.');
await payload.destroy();
