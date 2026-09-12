import Link from 'next/link';

/**
 * Renders a plain string that may contain [label](href) links as text + <Link>.
 * Internal hrefs use next/link; anything else is a normal anchor.
 * Kept deliberately tiny — Payload rich text replaces this in Phase 8/11.
 */
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export default function InlineText({ text, linkStyle }) {
  const out = [];
  let last = 0;
  let m;
  while ((m = LINK.exec(text)) !== null) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [, label, href] = m;
    out.push(
      href.startsWith('/') ? (
        <Link key={m.index} href={href} style={linkStyle}>{label}</Link>
      ) : (
        <a key={m.index} href={href} style={linkStyle}>{label}</a>
      )
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}
