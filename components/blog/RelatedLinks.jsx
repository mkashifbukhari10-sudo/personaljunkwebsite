import Link from 'next/link';
import { c, mono } from '@/lib/theme';
import { serviceHref, areaHref } from '@/lib/hrefs';

/**
 * The "what this is about" block under a post (plan.md Phase 13): links from
 * the post out to the service and area pages it concerns.
 *
 * Shows only editorially selected relationships. Missing relationships are a
 * publishing QA issue, never an excuse to insert unrelated service links.
 */
const listLink = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  gap: 16,
  padding: '14px 0',
  borderBottom: '1px solid ' + c.line,
  color: c.ink,
  fontSize: 16,
  fontWeight: 600
};

const moreLink = {
  display: 'inline-block',
  marginTop: 18,
  fontFamily: mono,
  fontSize: 11,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  color: c.ink,
  borderBottom: '2px solid ' + c.bronze,
  paddingBottom: 6,
  justifySelf: 'start'
};

function Column({ label, heading, items, hrefFor, allHref, allLabel, meta }) {
  if (!items.length) return null;
  return (
    <nav aria-label={label}>
      <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.muted }}>{label}</div>
      <h2
        className="jk-h"
        style={{ marginTop: 16, fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase' }}
      >
        {heading}
      </h2>
      <div style={{ marginTop: 20, display: 'grid', borderTop: '1px solid ' + c.line }}>
        {items.map((item) => (
          <Link key={item.slug} href={hrefFor(item.slug)} className="jk-indent" style={listLink}>
            <span>{item.name}</span>
            {meta ? (
              <span style={{ fontFamily: mono, fontSize: 12, color: c.body, textAlign: 'right', fontWeight: 400 }}>{meta(item)}</span>
            ) : (
              <span style={{ fontFamily: mono, fontSize: 14, color: c.bronzeDeep }}>&#8594;</span>
            )}
          </Link>
        ))}
        <Link href={allHref} style={moreLink}>
          {allLabel} &#8594;
        </Link>
      </div>
    </nav>
  );
}

export default function RelatedLinks({ services = [], areas = [] }) {
  if (!services.length && !areas.length) return null;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        gap: 'clamp(28px, 4vw, 64px)'
      }}
    >
      <Column
        label="Services"
        heading="What this is about"
        items={services}
        hrefFor={serviceHref}
        allHref="/services"
        allLabel="All services"
      />
      <Column
        label="Areas"
        heading="Where we do it"
        items={areas}
        hrefFor={areaHref}
        allHref="/areas"
        allLabel="All areas"
        meta={(a) => a.note}
      />
    </div>
  );
}
