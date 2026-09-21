import { getPayload } from 'payload';
import './_script-env';
import config from '../payload.config';
import { pathToFileURL } from 'node:url';
type A = Record<string, any>;
const SP = 'C:/Users/mkash/AppData/Local/Temp/claude/D--Projects-Personal-Junk-website/0a69c395-6447-44ab-aebd-6e98033e0608/scratchpad/';
const { articles } = (await import(pathToFileURL(SP + 'articles.mjs').href)) as A;
const { seo, SITE } = (await import(pathToFileURL(SP + 'seo.mjs').href)) as A;
const p = await getPayload({ config });

// Covers already uploaded to Media, by the alt text they were given.
const COVER: A = {
  'end-of-tenancy-clearance-dubai': 'An empty room with a wooden floor and tall windows, cleared except for a small bracket left on the wall.',
  'palm-frond-disposal-dubai': 'A dense pile of cut palm fronds, green fading to yellow at the cut ends.',
  'junk-gone-today-dubai': 'A white pickup truck at a kerb, its open bed piled high with tied black rubbish bags.',
  'washing-machine-removal-dubai': 'A washer and dryer side by side in a plain utility room, with a sink beside them and hose connections on the wall behind.'
};
const mediaId: A = {};
for (const [slug, alt] of Object.entries(COVER) as [string, string][]) {
  const m = await p.find({ collection: 'media', where: { alt: { equals: alt } }, limit: 1, overrideAccess: true });
  if (m.docs.length) mediaId[slug] = (m.docs[0] as A).id;
}

const author = (await p.find({ collection: 'authors', limit: 1, overrideAccess: true })).docs[0] as A;
const svc = await p.find({ collection: 'services', limit: 200, depth: 0, overrideAccess: true });
const sid: A = {};
for (const d of svc.docs as A[]) sid[d.slug] = d.id;

// Minimal Lexical builder (same subset as import-drafts.ts).
const T = (t: string, f = 0) => ({ type: 'text', detail: 0, format: f, mode: 'normal', style: '', text: t, version: 1 });
const P = (ch: A[]) => ({ type: 'paragraph', children: ch, direction: 'ltr', format: '', indent: 0, version: 1, textFormat: 0 });
const linkFor = (h: string) => {
  const m = h.match(/^\/(services|areas)\/([a-z0-9-]+)$/);
  if (m && m[1] === 'services' && sid[m[2]]) return { linkType: 'internal', doc: { relationTo: 'services', value: sid[m[2]] }, newTab: false };
  return { linkType: 'custom', url: h, newTab: false };
};
function inline(s: string): A[] {
  const out: A[] = []; const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0, m: RegExpExecArray | null;
  while ((m = re.exec(s))) {
    if (m.index > last) out.push(T(s.slice(last, m.index)));
    if (m[1] !== undefined) out.push({ type: 'link', children: [T(m[1])], direction: 'ltr', format: '', indent: 0, version: 3, fields: linkFor(m[2]) });
    else if (m[3] !== undefined) out.push(T(m[3], 1));
    else if (m[4] !== undefined) out.push(T(m[4], 2));
    last = re.lastIndex;
  }
  if (last < s.length) out.push(T(s.slice(last)));
  return out.length ? out : [T(s)];
}
function lex(body: string) {
  const ch: A[] = [];
  for (const raw of body.split(/\n\n+/)) {
    const b = raw.trim(); if (!b) continue;
    if (b.startsWith('## ')) { ch.push({ type: 'heading', tag: 'h2', children: inline(b.slice(3).trim()), direction: 'ltr', format: '', indent: 0, version: 1 }); continue; }
    if (b.startsWith('- ')) {
      const items = b.split('\n').map((l) => l.replace(/^-\s+/, '').trim()).filter(Boolean);
      ch.push({ type: 'list', listType: 'bullet', tag: 'ul', start: 1, direction: 'ltr', format: '', indent: 0, version: 1,
        children: items.map((it, i) => ({ type: 'listitem', value: i + 1, children: inline(it), direction: 'ltr', format: '', indent: 0, version: 1 })) });
      continue;
    }
    ch.push(P(inline(b.replace(/\n/g, ' '))));
  }
  return { root: { type: 'root', children: ch, direction: 'ltr', format: '', indent: 0, version: 1 } };
}

let made = 0, fixed = 0;
for (const a of articles as A[]) {
  const s = seo[a.slug] || {};
  const seoData = { title: s.title || '', description: s.description || '', canonical: SITE + '/blog/' + a.slug, noIndex: false, ogTitle: s.ogTitle || '', ogDescription: s.ogDescription || '' } as A;
  if (mediaId[a.slug]) seoData.ogImage = mediaId[a.slug];
  const data: A = {
    _status: 'draft', title: a.title, slug: a.slug, excerpt: a.excerpt, content: lex(a.body),
    author: author.id, relatedServices: a.services.map((x: string) => sid[x]).filter(Boolean), relatedAreas: [], seo: seoData
  };
  if (mediaId[a.slug]) data.coverImage = mediaId[a.slug];
  const found = await p.find({ collection: 'posts', where: { slug: { equals: a.slug } }, limit: 1, depth: 0, draft: true, overrideAccess: true });
  if (found.docs.length) { await p.update({ collection: 'posts', id: (found.docs[0] as A).id, overrideAccess: true, data }); console.log('  fixed   ' + a.slug); fixed++; }
  else { await p.create({ collection: 'posts', overrideAccess: true, draft: true, data }); console.log('  created ' + a.slug); made++; }
}
const fin = await p.find({ collection: 'posts', limit: 100, depth: 0, draft: true, overrideAccess: true });
const pub = await p.find({ collection: 'posts', where: { _status: { equals: 'published' } }, limit: 100, overrideAccess: true });
console.log('RESULT posts=' + fin.docs.length + ' published=' + pub.totalDocs + ' created=' + made + ' fixed=' + fixed);
for (const d of fin.docs as A[]) console.log('   ' + String(d._status).padEnd(10) + d.slug + (d.coverImage ? ' [cover]' : ''));
process.exit(0);
