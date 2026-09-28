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
  { slug: 'office-strip-out-dubai', bodyKey: 'office-stripout-phasing-plan' },
  { slug: 'warehouse-clearance-dubai', bodyKey: 'warehouse-clearance-zone-plan' },
  { slug: 'villa-handover-clearance-dubai', bodyKey: 'villa-clearance-groups' }
];

const resolveLink = (url: string) => ({ linkType: 'custom', url, newTab: url.startsWith('https://') });
for (const spec of specs) {
  const { docs: posts } = await api.find({ collection: 'posts', where: { slug: { equals: spec.slug } }, limit: 1, depth: 0, overrideAccess: true, draft: true });
  if (!posts[0]) throw new Error(`Missing post: ${spec.slug}`);
  const seedKey = `article-${spec.slug}-body`;
  const { docs: media } = await api.find({ collection: 'media', where: { seedKey: { equals: seedKey } }, limit: 1, depth: 0, overrideAccess: true });
  if (!media[0]) throw new Error(`Missing body media: ${seedKey}`);
  const markdown = fs.readFileSync(path.join('docs/content-system/articles', spec.slug + '.md'), 'utf8');
  const content = articleToLexical(markdown, resolveLink, (key) => {
    if (key !== spec.bodyKey) throw new Error(`${spec.slug}: unresolved body image ${key}`);
    return media[0].id;
  });
  const words = countArticleWords(content);
  if (words < MIN_ARTICLE_WORDS) throw new Error(`${spec.slug}: ${words} words is below ${MIN_ARTICLE_WORDS}`);
  console.log(`${apply ? 'SYNC' : 'READY'} ${spec.slug}: ${words} body words`);
  if (apply) await api.update({ collection: 'posts', id: posts[0].id, data: { content }, draft: false, overrideAccess: true });
}
console.log(apply ? 'Synced three article bodies.' : 'Dry run only.');
await payload.destroy();
