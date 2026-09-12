import Link from 'next/link';
import { c, mono } from '@/lib/theme';
import { blogPageHref } from '@/lib/hrefs';

/**
 * Blog pagination (plan.md Phase 12).
 *
 * Every control is a real `<a href>` so a crawler can follow it and the pages
 * work without JavaScript. The current page is a `<span aria-current="page">`
 * rather than a link to itself.
 */
export default function Pagination({ page, totalPages }) {
  if (totalPages <= 1) return null;

  const numbers = pageNumbers(page, totalPages);
  const base = {
    fontFamily: mono,
    fontSize: 12,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    padding: '12px 16px',
    border: '1px solid ' + c.line,
    minWidth: 46,
    textAlign: 'center'
  };

  return (
    <nav aria-label="Pagination" style={{ marginTop: 'clamp(36px, 5vw, 64px)' }}>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
        <li>
          {page > 1 ? (
            <Link href={blogPageHref(page - 1)} rel="prev" className="jk-tint" style={{ ...base, color: c.ink, display: 'block' }}>
              &#8592; Newer
            </Link>
          ) : (
            <span style={{ ...base, color: c.muted, display: 'block', opacity: 0.5 }}>&#8592; Newer</span>
          )}
        </li>

        {numbers.map((n, i) =>
          n === null ? (
            <li key={'gap-' + i} aria-hidden="true" style={{ ...base, border: 'none', color: c.muted, minWidth: 0, padding: '12px 4px' }}>
              &hellip;
            </li>
          ) : n === page ? (
            <li key={n}>
              <span aria-current="page" style={{ ...base, background: c.ink, color: '#fff', borderColor: c.ink, display: 'block' }}>
                {n}
              </span>
            </li>
          ) : (
            <li key={n}>
              <Link href={blogPageHref(n)} className="jk-tint" style={{ ...base, color: c.ink, display: 'block' }}>
                {n}
              </Link>
            </li>
          )
        )}

        <li>
          {page < totalPages ? (
            <Link href={blogPageHref(page + 1)} rel="next" className="jk-tint" style={{ ...base, color: c.ink, display: 'block' }}>
              Older &#8594;
            </Link>
          ) : (
            <span style={{ ...base, color: c.muted, display: 'block', opacity: 0.5 }}>Older &#8594;</span>
          )}
        </li>
      </ul>
    </nav>
  );
}

/**
 * First page, last page, the current page and its neighbours; `null` marks a
 * gap. Keeps the control a fixed width however many pages there are.
 */
function pageNumbers(page, totalPages) {
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
  const around = [page - 1, page, page + 1].filter((n) => n > 1 && n < totalPages);
  const out = [1, ...around, totalPages];
  const withGaps = [];
  for (let i = 0; i < out.length; i++) {
    if (i > 0 && out[i] - out[i - 1] > 1) withGaps.push(null);
    withGaps.push(out[i]);
  }
  return withGaps;
}
