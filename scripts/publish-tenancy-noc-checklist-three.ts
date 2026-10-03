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
    slug: 'noc-moving-furniture-dubai',
    title: 'Do You Need an NOC to Move Furniture Out in Dubai?',
    excerpt: 'Dubai towers and communities require a move-out permit or NOC before furniture leaves. Here is what building management checks, who applies, and how to avoid gate delays.',
    service: 'residential-junk-removal',
    cover: 'noc-moving-furniture-cover.webp',
    coverAlt: 'A modern Dubai apartment building reception desk with a move-out clearance checklist on a clipboard in the foreground and a clear corridor leading to service lifts.',
    body: 'noc-clearance-process.webp',
    bodyAlt: 'A clean top-down architectural process diagram showing four sequential steps for moving out of an apartment building: Landlord Clearance, Building Move-Out Permit (NOC), Service Lift Reservation, and Loading Bay Access.',
    seoTitle: 'Do You Need an NOC to Move Furniture in Dubai?',
    seoDescription: 'Dubai building NOC and move-out permit rules explained: what building management requires, documents needed, elevator bookings, and how clearance crews operate.',
    ogTitle: 'Do You Need an NOC to Move Furniture Out in Dubai?',
    ogDescription: 'How Dubai building move-out permits and NOCs work, what security checks at the loading bay, and how to clear furniture without delays.'
  },
  {
    slug: 'deposit-deductions-left-furniture-dubai',
    title: 'Can a Landlord Deduct Your Deposit for Furniture You Left Behind?',
    excerpt: 'Leaving furniture behind in a rented Dubai home allows landlords to deduct removal costs from your deposit. Learn what Dubai tenancy law says and how to protect your money.',
    service: 'house-clearance',
    cover: 'deposit-deductions-cover.webp',
    coverAlt: 'A bright, vacant modern Dubai apartment living room during a move-out handover inspection with an inspection clipboard on a counter in the foreground.',
    body: 'handover-inspection-comparison.webp',
    bodyAlt: 'A side-by-side comparison diagram showing a fully cleared apartment achieving a full deposit refund versus an apartment with abandoned furniture incurring landlord contractor deductions and dispute delays.',
    seoTitle: 'Can Landlord Deduct Deposit for Left Furniture Dubai?',
    seoDescription: 'What Dubai tenancy law says about furniture left behind: security deposit deductions, Article 21 handover obligations, contractor costs, and how to clear your home cleanly.',
    ogTitle: 'Can a Landlord Deduct Deposit for Furniture Left Behind?',
    ogDescription: 'Understand landlord deposit deductions under Dubai tenancy law, contractor disposal charges, and how to hand over a spotless property.'
  },
  {
    slug: 'leaving-dubai-clearance-checklist',
    title: 'Leaving Dubai: The Clearance Part of the Checklist',
    excerpt: 'Relocating from Dubai? Clearance delays and leftover furniture risk security deposits. Here is a practical four-week clearance timeline working back from your handover day.',
    service: 'house-clearance',
    cover: 'leaving-dubai-checklist-cover.webp',
    coverAlt: 'An organized moving scene inside a bright Dubai apartment with a checklist notebook on a counter in the foreground and neatly stacked moving boxes in the background.',
    body: 'leaving-dubai-timeline-plan.webp',
    bodyAlt: 'A horizontal process timeline diagram illustrating the four-week clearance countdown for leaving Dubai, showing sorting, utility disconnection and NOC, junk removal, and handover inspection.',
    seoTitle: 'Moving Out of Dubai Checklist: The Clearance Timeline',
    seoDescription: 'The clearance countdown for moving out of Dubai: sorting belongings, booking building NOCs, DEWA final disconnection, furniture removal, and handover inspection.',
    ogTitle: 'Leaving Dubai: The Clearance Part of the Checklist',
    ogDescription: 'Plan your clearance before moving out of Dubai: 4-week timeline, building NOCs, DEWA disconnection, and passing final tenancy inspection.'
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
