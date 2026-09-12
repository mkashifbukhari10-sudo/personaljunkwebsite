'use client';

import Link from 'next/link';
import { useState } from 'react';
import { c, mono, shell } from '@/lib/theme';
import { serviceHref } from '@/lib/hrefs';

/**
 * Hover-highlight grid of all services; each card links to its landing page and
 * keeps its `id` so legacy /services#slug URLs still land. Receives `services`
 * from the server page (client components never import the content layer).
 */
export default function ServiceGrid({ services }) {
  const [hot, setHot] = useState(-1);

  return (
    <div style={{ ...shell, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 1 }}>
      {services.map((s, i) => {
        const on = i === hot;
        return (
          <article
            key={s.slug}
            id={s.slug}
            className="jk-anchor"
            onMouseEnter={() => setHot(i)}
            onMouseLeave={() => setHot(-1)}
            style={{ outline: '1px solid ' + c.line, padding: 'clamp(22px, 2.6vw, 34px)', background: on ? c.ink : c.mist, color: on ? '#fff' : c.ink, transition: 'background 0.2s ease, color 0.2s ease', minHeight: 'clamp(200px, 20vw, 260px)', display: 'flex', flexDirection: 'column' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', color: on ? c.bronze : c.bronzeDeep }}>{s.num}</span>
              <span aria-hidden="true" style={{ fontFamily: mono, fontSize: 16, color: on ? c.bronze : 'rgba(16,23,38,0.25)', transform: on ? 'translateX(4px)' : 'none', transition: 'transform 0.2s ease, color 0.2s ease' }}>&#8594;</span>
            </div>
            <h2 className="jk-h" style={{ marginTop: 'clamp(28px, 4vw, 56px)', fontSize: 'clamp(21px, 2.3vw, 30px)', fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase', lineHeight: 1.02 }}>
              <Link href={serviceHref(s.slug)} onFocus={() => setHot(i)} onBlur={() => setHot(-1)} style={{ color: 'inherit' }}>{s.name}</Link>
            </h2>
            <p style={{ margin: '12px 0 0', fontSize: 15, lineHeight: 1.58, color: on ? 'rgba(255,255,255,0.62)' : c.body, maxWidth: '40ch', textWrap: 'pretty' }}>{s.blurb}</p>
          </article>
        );
      })}
    </div>
  );
}
