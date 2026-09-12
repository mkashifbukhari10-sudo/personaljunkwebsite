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
 * - Headings never skip more than one level on the way down; a stray h4 after
 *   an h2 is left alone (that is valid), but h1 becomes h2.
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
      return (
        <Tag key={key} style={styles[tag] || styles.h2}>
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
        <Tag key={key} style={styles.list}>
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
export default function RichText({ value, styles = {} }) {
  const root = value && value.root;
  if (!root || !Array.isArray(root.children) || !root.children.length) return null;
  return <>{root.children.map((child, i) => renderNode(child, i, styles))}</>;
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
