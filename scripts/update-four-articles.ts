/** One-off, guarded update of the four existing published articles. Dry-run by default. */
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import env from '@next/env';
import { getPayload } from 'payload';
import { articleToLexical } from './article-markdown.mjs';
import { countArticleWords, MIN_ARTICLE_WORDS } from '../lib/content/article-word-count.js';

env.loadEnvConfig(process.cwd());
process.env.PAYLOAD_DISABLE_SCHEMA_PUSH = 'true';
const { default: config } = await import('../payload.config');
const payload = await getPayload({ config });
const slugs = ['end-of-tenancy-clearance-dubai', 'junk-gone-today-dubai', 'palm-frond-disposal-dubai', 'washing-machine-removal-dubai'];
const apply = process.argv.includes('--apply');
const backupDir = path.resolve('.article-backups');
fs.mkdirSync(backupDir, { recursive: true });
const { docs: posts } = await payload.find({ collection: 'posts', pagination: false, depth: 0, overrideAccess: true });
assert.deepEqual(posts.map((p) => p.slug).sort(), [...slugs].sort(), 'Stop if the post inventory has changed');
const { docs: services } = await payload.find({ collection: 'services', pagination: false, depth: 0, overrideAccess: true });
const references: Record<string, { relationTo: string; value: number }> = {};
for (const p of posts) references['/blog/' + p.slug] = { relationTo: 'posts', value: p.id };
for (const s of services) references['/services/' + s.slug] = { relationTo: 'services', value: s.id };
const allowedPaths = new Set(['/contact', '/how-it-works', '/services', '/areas']);
const resolveLink = (url: string) => {
  if (references[url]) return { linkType: 'internal', doc: references[url], newTab: false };
  assert.ok(allowedPaths.has(url) || url.startsWith('https://'), 'Unknown link: ' + url);
  return { linkType: 'custom', url, newTab: url.startsWith('https://') };
};
const revisions = slugs.map((slug) => {
  const original = posts.find((p) => p.slug === slug)!;
  assert.equal(original._status, 'published', slug + ': do not change publication status');
  assert.ok(original.coverImage, slug + ': preserve an existing cover');
  assert.ok(!original.content.root.children.some((n: any) => n.type === 'upload'), slug + ': stop rather than discard an existing body image');
  const content = articleToLexical(fs.readFileSync(path.join('docs/content-system/articles', slug + '.md'), 'utf8'), resolveLink);
  const words = countArticleWords(content);
  assert.ok(words >= MIN_ARTICLE_WORDS, slug + ': below minimum');
  let previousLevel = 1;
  for (const node of content.root.children) if (node.type === 'heading') {
    const level = Number((node as any).tag.slice(1));
    assert.ok(level <= previousLevel + 1, slug + ': heading skips a level');
    previousLevel = level;
  }
  return { slug, original, content, words };
});
fs.writeFileSync(path.join(backupDir, 'proposed.json'), JSON.stringify(revisions.map(({ slug, content, words }) => ({ slug, content, words })), null, 2));
if (apply) {
  fs.writeFileSync(path.join(backupDir, 'before-' + new Date().toISOString().replace(/[:.]/g, '-') + '.json'), JSON.stringify(posts, null, 2), { flag: 'wx' });
}
for (const { slug, original, content, words } of revisions) {
  if (apply) {
    const current = await payload.findByID({ collection: 'posts', id: original.id, depth: 0, overrideAccess: true });
    assert.equal(current.updatedAt, original.updatedAt, slug + ': changed during review; stop');
    const updated = await payload.update({ collection: 'posts', id: original.id, depth: 0, overrideAccess: true, draft: false, data: { content, _status: 'published' } });
    for (const key of ['slug', 'title', 'excerpt', 'coverImage', 'author', 'publishedAt', 'seo', 'relatedServices', 'relatedAreas'] as const) assert.deepEqual(updated[key], original[key], slug + ': preserve ' + key);
    assert.equal(countArticleWords(updated.content), words);
  }
  console.log(`${apply ? 'UPDATED' : 'READY'} ${slug}: ${words} body words`);
}
console.log(apply ? 'Four existing published articles updated; backups saved locally.' : 'Dry run only; no CMS content changed.');
await payload.destroy();
