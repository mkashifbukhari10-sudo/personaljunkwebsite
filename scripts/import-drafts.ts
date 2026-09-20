/**
 * One-off: import the drafted blog articles into Payload as **drafts**.
 *
 *   npx payload run scripts/import-drafts.ts
 *
 * Creates (or reuses) the editorial author record, then creates one Post per
 * article with `_status: 'draft'`. Drafts are never returned by
 * lib/content/posts.js (`publishedOnly: true`) and are not in
 * `generateStaticParams`, so nothing here reaches the public site until an
 * editor publishes it in /admin.
 *
 * Re-running is safe: a post whose slug already exists is skipped, not
 * duplicated.
 *
 * The body is authored as a small markdown subset and converted to the Lexical
 * shape `lib/content/richtext.jsx` renders: paragraph, h2, unordered list,
 * bold, italic and links. Internal links to /services/... and /areas/... are
 * written as Payload relationships so they survive a slug change; everything
 * else becomes a custom URL link.
 */
import { getPayload } from 'payload';
import './_script-env';
import config from '../payload.config';
import { pathToFileURL } from 'node:url';

type AnyDoc = Record<string, any>;

const AUTHOR_NAME = 'Junk Services Dubai Team';

/** Lexical text format bitmask. */
const BOLD = 1;
const ITALIC = 2;

const textNode = (text: string, format = 0) => ({
  type: 'text',
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
  version: 1
});

const para = (children: AnyDoc[]) => ({
  type: 'paragraph',
  children,
  direction: 'ltr' as const,
  format: '' as const,
  indent: 0,
  version: 1,
  textFormat: 0
});

/**
 * Inline markdown -> Lexical children. Handles `**bold**`, `*italic*` and
 * `[label](/path)`, which is everything the drafts use.
 */
function inline(src: string, linkFor: (href: string) => AnyDoc | null): AnyDoc[] {
  const out: AnyDoc[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src))) {
    if (m.index > last) out.push(textNode(src.slice(last, m.index)));
    if (m[1] !== undefined) {
      const fields = linkFor(m[2]);
      if (fields) {
        out.push({
          type: 'link',
          children: [textNode(m[1])],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 3,
          fields
        });
      } else {
        out.push(textNode(m[1]));
      }
    } else if (m[3] !== undefined) {
      out.push(textNode(m[3], BOLD));
    } else if (m[4] !== undefined) {
      out.push(textNode(m[4], ITALIC));
    }
    last = re.lastIndex;
  }
  if (last < src.length) out.push(textNode(src.slice(last)));
  return out.length ? out : [textNode(src)];
}

/** Block markdown -> the Lexical root children. */
function toLexical(body: string, linkFor: (href: string) => AnyDoc | null) {
  const children: AnyDoc[] = [];
  const blocks = body.split(/\n\n+/);

  for (const raw of blocks) {
    const block = raw.trim();
    if (!block) continue;

    if (block.startsWith('## ')) {
      children.push({
        type: 'heading',
        tag: 'h2',
        children: inline(block.slice(3).trim(), linkFor),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1
      });
      continue;
    }

    if (block.startsWith('- ')) {
      const items = block
        .split('\n')
        .map((l) => l.replace(/^-\s+/, '').trim())
        .filter(Boolean);
      children.push({
        type: 'list',
        listType: 'bullet',
        tag: 'ul',
        start: 1,
        children: items.map((item, i) => ({
          type: 'listitem',
          value: i + 1,
          checked: undefined,
          children: inline(item, linkFor),
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1
        })),
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1
      });
      continue;
    }

    children.push(para(inline(block.replace(/\n/g, ' '), linkFor)));
  }

  return { root: { type: 'root', children, direction: 'ltr', format: '', indent: 0, version: 1 } };
}

const ARTICLES_FILE = process.env.ARTICLES_FILE;
if (!ARTICLES_FILE) {
  console.error("Set ARTICLES_FILE to the absolute path of the articles data module.");
  process.exit(1);
}
const { articles } = (await import(pathToFileURL(ARTICLES_FILE).href)) as { articles: AnyDoc[] };
const SEO_FILE = process.env.SEO_FILE;
const seoMod: AnyDoc = SEO_FILE ? await import(pathToFileURL(SEO_FILE).href) : { seo: {}, SITE: '' };
const seoBySlug: AnyDoc = seoMod.seo || {};
const SITE: string = seoMod.SITE || '';

const run = async () => {
  const payload = await getPayload({ config });

  // Author: the business editorial identity. Reused if it already exists.
  const existingAuthor = await payload.find({
    collection: 'authors',
    where: { name: { equals: AUTHOR_NAME } },
    limit: 1,
    overrideAccess: true
  });
  const author =
    existingAuthor.docs[0] ||
    (await payload.create({
      collection: 'authors',
      data: { name: AUTHOR_NAME },
      overrideAccess: true
    } as Parameters<typeof payload.create>[0]));
  console.log((existingAuthor.docs.length ? 'Author reused:  ' : 'Author created: ') + AUTHOR_NAME);

  // Slug -> id for the collections an internal link can point at.
  const idBySlug: Record<string, Record<string, string | number>> = { services: {}, areas: {}, posts: {} };
  for (const collection of ['services', 'areas'] as const) {
    const { docs } = await payload.find({ collection, limit: 200, depth: 0, overrideAccess: true });
    for (const d of docs as AnyDoc[]) idBySlug[collection][d.slug] = d.id;
  }

  const linkFor = (href: string): AnyDoc | null => {
    const m = href.match(/^\/(services|areas|blog)\/([a-z0-9-]+)$/);
    if (m) {
      const relationTo = m[1] === 'blog' ? 'posts' : m[1];
      const id = idBySlug[relationTo][m[2]];
      if (id !== undefined) {
        return { linkType: 'internal', doc: { relationTo, value: id }, newTab: false };
      }
      console.warn('  ! unresolved internal link, kept as URL: ' + href);
    }
    return { linkType: 'custom', url: href, newTab: false };
  };

  let created = 0;
  let skipped = 0;

  for (const a of articles as AnyDoc[]) {
    const existing = await payload.find({
      collection: 'posts',
      where: { slug: { equals: a.slug } },
      limit: 1,
      draft: true,
      overrideAccess: true
    });
    const s = seoBySlug[a.slug] || {};
    const seoData = {
      title: s.title || a.seoTitle || '',
      description: s.description || '',
      canonical: SITE ? SITE + '/blog/' + a.slug : '',
      noIndex: false,
      ogTitle: s.ogTitle || '',
      ogDescription: s.ogDescription || ''
    };

    const relatedServices = a.services
      .map((s: string) => idBySlug.services[s])
      .filter((v: unknown) => v !== undefined);
    const relatedAreas = (a.areas || [])
      .map((s: string) => idBySlug.areas[s])
      .filter((v: unknown) => v !== undefined);

    if (existing.docs.length) {
      await payload.update({
        collection: 'posts',
        id: (existing.docs[0] as AnyDoc).id,
        draft: true,
        overrideAccess: true,
        data: {
          _status: 'draft',
          title: a.title,
          excerpt: a.excerpt,
          content: toLexical(a.body, linkFor),
          author: author.id,
          relatedServices,
          relatedAreas,
          seo: seoData
        } as AnyDoc
      });
      console.log('  update #' + a.id + '  ' + a.slug);
      skipped++;
      continue;
    }

    await payload.create({
      collection: 'posts',
      draft: true,
      overrideAccess: true,
      data: {
        _status: 'draft',
        title: a.title,
        slug: a.slug,
        excerpt: a.excerpt,
        content: toLexical(a.body, linkFor),
        author: author.id,
        relatedServices,
        relatedAreas,
        seo: seoData
      } as AnyDoc
    });

    console.log(
      '  create #' + a.id + '  ' + a.slug + '  (' + relatedServices.length + ' services, ' + relatedAreas.length + ' areas)'
    );
    created++;
  }

  console.log('\nDrafts created: ' + created + ', skipped: ' + skipped);
  console.log('Cover images are still required before any of these can be published.');
};

await run();
process.exit(0);
