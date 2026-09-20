import Link from 'next/link';
import Media from '@/components/Media';
import { toImageProps } from '@/lib/content/media';
import { siteUrl } from '@/lib/site';

/**
 * Lexical document -> semantic JSX (plan.md Phase 11).
 *
 * Deliberately small and explicit rather than generic: the editor in
 * src/payload/collections/Posts.ts enables a fixed, short list of features, so
 * this handles exactly those node types and ignores anything else instead of
 * rendering markup nobody designed.
 *
 * Rules that matter for SEO and accessibility:
 * - **No `<h1>`.** The page owns the only h1 (the post title), so a heading
 *   node is clamped to h2 even if one arrives from an import or an older doc.
 * - Editors retain responsibility for heading order; h1 becomes h2.
 * - Internal links render through `next/link`; external ones get
 *   `target="_blank" rel="noopener noreferrer"`, plus `nofollow` when the
 *   editor ticked it.
 * - Embedded images go through `components/Media.jsx`, so they are `next/image`
 *   with alt text, dimensions and responsive `sizes` like every other image.
 */

// Lexical text format is a bitmask.
const BOLD = 1;
const ITALIC = 1 << 1;
const STRIKETHROUGH = 1 << 2;
const UNDERLINE = 1 << 3;
const CODE = 1 << 4;
const SUBSCRIPT = 1 << 5;
const SUPERSCRIPT = 1 << 6;

/** Headings allowed in the body. Anything else (h1, h5, h6) is clamped to h2. */
const HEADINGS = new Set(['h2', 'h3', 'h4']);

/** Plain text of one node's subtree — used for heading ids and the TOC. */
function nodeText(node) {
  if (!node || typeof node !== 'object') return '';
  if (typeof node.text === 'string') return node.text;
  if (!Array.isArray(node.children)) return '';
  return node.children.map(nodeText).join('');
}

/** "What to send before booking" -> "what-to-send-before-booking". */
function headingSlug(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/['‘’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

/**
 * Stable, unique heading ids for one document, keyed by the heading's index in
 * `root.children`. The renderer and the table of contents both read from this
 * one pass, so the ids in the markup and the ids the TOC links to cannot drift.
 */
export function headingIds(value) {
  const root = value && value.root;
  const out = new Map();
  if (!root || !Array.isArray(root.children)) return out;
  const used = new Set(['toc-heading', 'main', 'main-content']);
  root.children.forEach((node, i) => {
    if (!node || node.type !== 'heading') return;
    const text = nodeText(node).trim();
    if (!text) return;
    const base = headingSlug(text) || 'section';
    let id = base;
    let n = 2;
    while (used.has(id)) id = base + '-' + n++;
    used.add(id);
    out.set(i, { id, text, tag: HEADINGS.has(node.tag) ? node.tag : 'h2' });
  });
  return out;
}

/** The document's h2 and h3 headings, in order, for the table of contents. */
export function extractHeadings(value) {
  return [...headingIds(value).values()].filter((h) => h.tag === 'h2' || h.tag === 'h3');
}

function isExternal(href) {
  if (!href || href.startsWith('/') || href.startsWith('#')) return false;
  try {
    return new URL(href, siteUrl).origin !== new URL(siteUrl).origin;
  } catch {
    return false;
  }
}

/** Payload's internal-link nodes carry the referenced document, not a path. */
function hrefForLink(fields) {
  if (!fields) return null;
  if (fields.linkType === 'internal') {
    const doc = fields.doc;
    const value = doc && doc.value;
    if (!value || typeof value !== 'object' || !value.slug) return null;
    const prefix = { posts: '/blog/', services: '/services/', areas: '/areas/' }[doc.relationTo];
    return prefix ? prefix + value.slug : null;
  }
  return fields.url || null;
}

function renderText(node, key) {
  const format = node.format || 0;
  let el = node.text;
  if (format & CODE) el = <code key={key}>{el}</code>;
  if (format & BOLD) el = <strong key={key}>{el}</strong>;
  if (format & ITALIC) el = <em key={key}>{el}</em>;
  if (format & UNDERLINE) el = <u key={key}>{el}</u>;
  if (format & STRIKETHROUGH) el = <s key={key}>{el}</s>;
  if (format & SUBSCRIPT) el = <sub key={key}>{el}</sub>;
  if (format & SUPERSCRIPT) el = <sup key={key}>{el}</sup>;
  return typeof el === 'string' ? <span key={key}>{el}</span> : el;
}

function renderChildren(node, styles) {
  if (!node || !Array.isArray(node.children)) return null;
  return node.children.map((child, i) => renderNode(child, i, styles));
}

function renderNode(node, key, styles) {
  if (!node || typeof node !== 'object') return null;

  switch (node.type) {
    case 'text':
      return renderText(node, key);

    case 'linebreak':
      return <br key={key} />;

    case 'paragraph': {
      const children = renderChildren(node, styles);
      // Lexical emits an empty paragraph for a blank line; skip it rather than
      // rendering a stray empty <p>.
      if (!children || !children.length) return null;
      return (
        <p key={key} style={styles.paragraph}>
          {children}
        </p>
      );
    }

    case 'heading': {
      const tag = HEADINGS.has(node.tag) ? node.tag : 'h2';
      const Tag = tag;
      // `id` comes from the shared headingIds() pass so it matches the TOC.
      // `jk-anchor` supplies scroll-margin so a linked heading clears the
      // sticky header instead of hiding behind it.
      return (
        <Tag key={key} id={node.__id} className={node.__id ? 'jk-anchor' : undefined} style={styles[tag] || styles.h2}>
          {renderChildren(node, styles)}
        </Tag>
      );
    }

    case 'quote':
      return (
        <blockquote key={key} style={styles.quote}>
          {renderChildren(node, styles)}
        </blockquote>
      );

    case 'list': {
      const Tag = node.listType === 'number' ? 'ol' : 'ul';
      return (
        <Tag key={key} start={Tag === 'ol' && node.start ? node.start : undefined} style={styles.list}>
          {renderChildren(node, styles)}
        </Tag>
      );
    }

    case 'listitem':
      return (
        <li key={key} style={styles.listItem}>
          {renderChildren(node, styles)}
        </li>
      );

    case 'horizontalrule':
      return <hr key={key} style={styles.rule} />;

    case 'link':
    case 'autolink': {
      const href = hrefForLink(node.fields);
      const children = renderChildren(node, styles);
      if (!href) return <span key={key}>{children}</span>;
      if (isExternal(href)) {
        const rel = node.fields && node.fields.nofollow ? 'noopener noreferrer nofollow' : 'noopener noreferrer';
        return (
          <a key={key} href={href} target="_blank" rel={rel} style={styles.link}>
            {children}
          </a>
        );
      }
      return (
        <Link key={key} href={href} style={styles.link}>
          {children}
        </Link>
      );
    }

    case 'upload': {
      const image = toImageProps(node.value);
      if (!image) return null;
      return (
        <Media
          key={key}
          image={image}
          fill={false}
          sizes="(min-width: 768px) 720px, 100vw"
          className={styles.figureClass}
          style={styles.figure}
        />
      );
    }

    default:
      // Unknown node: render whatever is inside it rather than dropping text.
      return renderChildren(node, styles) || null;
  }
}

/**
 * Renders a Payload Lexical value. `styles` lets the calling page supply its
 * own type scale without this module importing the theme (keeps it usable from
 * anywhere). Returns null for an empty document.
 */
export default function RichText({ value, styles = {}, anchors = true }) {
  const root = value && value.root;
  if (!root || !Array.isArray(root.children) || !root.children.length) return null;
  // Attach the shared heading ids without mutating the stored document.
  const ids = anchors ? headingIds(value) : new Map();
  return (
    <>
      {root.children.map((child, i) => {
        const h = ids.get(i);
        return renderNode(h ? { ...child, __id: h.id } : child, i, styles);
      })}
    </>
  );
}

/** Plain text of a Lexical document — for excerpts, word counts and schema. */
export function richTextToPlainText(value) {
  const walk = (node) => {
    if (!node || typeof node !== 'object') return '';
    if (typeof node.text === 'string') return node.text;
    const children = node.root ? [node.root] : node.children;
    if (!Array.isArray(children)) return '';
    return children.map(walk).join(node.type === 'paragraph' || node.type === 'heading' ? '' : ' ');
  };
  return walk(value).replace(/\s+/g, ' ').trim();
}
