import { c, mono } from '@/lib/theme';

/**
 * Article table of contents, built from the post body's h2/h3 headings
 * (`extractHeadings` in lib/content/richtext.jsx). There is no CMS field for
 * it — the headings are the single source of truth, so the contents can never
 * drift from the article it describes.
 *
 * Deliberately zero JavaScript:
 * - a `<nav>` of plain anchor links, rendered on the server;
 * - `scroll-behavior: smooth` in globals.css animates the jump;
 * - `.jk-anchor` on each heading supplies the offset for the sticky header;
 * - the narrow variant is a native `<details>`, which is keyboard- and
 *   screen-reader-accessible without a line of client code.
 *
 * Rendered twice per article — `variant="narrow"` in the flow and
 * `variant="wide"` in the sticky aside — with CSS showing exactly one at a
 * time, so the markup matches the first paint at every breakpoint and only one
 * copy is ever visible or focusable.
 *
 * Hidden below three headings, where a contents list costs more than it gives.
 */
const MIN_HEADINGS = 3;

const label = {
  margin: 0,
  fontFamily: mono,
  fontSize: 10,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: c.bronzeDeep
};

function Links({ headings }) {
  return (
    <ol className="jk-list" style={{ display: 'grid', gap: 2, marginTop: 14 }}>
      {headings.map((h) => (
        <li key={h.id} style={h.tag === 'h3' ? { paddingLeft: 14 } : null}>
          <a
            href={'#' + h.id}
            className="jk-toc-link"
            style={{
              display: 'block',
              padding: '7px 0 7px 12px',
              fontSize: h.tag === 'h3' ? 14 : 15,
              lineHeight: 1.4,
              '--toc-color': h.tag === 'h3' ? c.muted : c.body,
              textWrap: 'pretty'
            }}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function TableOfContents({ headings, variant = 'wide' }) {
  if (!headings || headings.length < MIN_HEADINGS) return null;

  if (variant === 'narrow') {
    return (
      <nav aria-label="On this page" className="jk-toc-narrow" style={{ marginBottom: 'clamp(28px, 4vw, 40px)' }}>
        <details style={{ borderTop: '1px solid ' + c.line, borderBottom: '1px solid ' + c.line }}>
          <summary
            className="jk-toc-summary"
            style={{
              padding: '14px 0',
              cursor: 'pointer',
              listStyle: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 12
            }}
          >
            <span style={label}>On this page</span>
            <span aria-hidden="true" className="jk-toc-chev" style={{ fontFamily: mono, fontSize: 14, color: c.bronzeDeep }}>
              +
            </span>
          </summary>
          <div style={{ paddingBottom: 16 }}>
            <Links headings={headings} />
          </div>
        </details>
      </nav>
    );
  }

  return (
    <nav aria-labelledby="toc-heading" className="jk-toc-wide">
      <h2 id="toc-heading" className="jk-h" style={label}>
        On this page
      </h2>
      <Links headings={headings} />
    </nav>
  );
}
