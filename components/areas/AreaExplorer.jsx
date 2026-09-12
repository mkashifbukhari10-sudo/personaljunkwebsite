'use client';

import Link from 'next/link';
import { createContext, useContext, useState } from 'react';
import { c, mono } from '@/lib/theme';
import { areaHref } from '@/lib/hrefs';

/**
 * The map markers and the area cards share one hover index, so they are split
 * into a provider plus two small consumers. Data (`areas`, `featured`) comes
 * from the server page via the content layer; client components never import it.
 */
const HotContext = createContext([-1, () => {}]);

export function AreaHoverProvider({ children }) {
  const state = useState(-1);
  return <HotContext.Provider value={state}>{children}</HotContext.Provider>;
}

export function AreaMarkers({ featured }) {
  const [hot] = useContext(HotContext);

  // The first 9 canonical areas are the featured ones, so the card index maps straight onto the marker index.
  return featured.map((a, i) => {
    const on = i === hot;
    const flip = a.map.x > 58;
    return (
      <div key={a.slug} style={{ position: 'absolute', left: a.map.x + '%', top: a.map.y + '%', width: 10, height: 10, zIndex: on ? 2 : 1 }}>
        <span style={{ position: 'absolute', left: 0, top: 0, width: 10, height: 10, borderRadius: '50%', background: on ? '#fff' : c.bronze }} />
        <span className="jk-motion" style={{ position: 'absolute', left: 0, top: 0, width: 10, height: 10, borderRadius: '50%', border: '2px solid ' + c.bronze, animation: 'pulseRing 2.8s ease-out ' + i * 0.3 + 's infinite' }} />
        <span style={{ position: 'absolute', top: -4, left: flip ? 'auto' : 18, right: flip ? 18 : 'auto', whiteSpace: 'nowrap', fontFamily: mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: on ? '#fff' : 'rgba(255,255,255,0.8)' }}>{a.name}</span>
      </div>
    );
  });
}

export function AreaGrid({ areas }) {
  const [, setHot] = useContext(HotContext);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {areas.map((a, i) => (
        <article
          key={a.slug}
          id={a.slug}
          onMouseEnter={() => setHot(i)}
          onMouseLeave={() => setHot(-1)}
          className="jk-lift-soft jk-anchor"
          style={{ flex: '1 1 260px', background: c.card, outline: '1px solid ' + c.line, padding: 'clamp(20px, 2.4vw, 30px)' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
            <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', color: c.bronzeDeep }}>{a.num}</span>
            <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.sageDeep }}>&#9679; Covered</span>
          </div>
          <h2 className="jk-h" style={{ marginTop: 22, fontSize: 'clamp(19px, 2vw, 26px)', fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase', lineHeight: 1.05 }}>
            <Link href={areaHref(a.slug)} onFocus={() => setHot(i)} onBlur={() => setHot(-1)} style={{ color: 'inherit' }}>{a.name}</Link>
          </h2>
          <p style={{ margin: '10px 0 0', fontSize: 14, color: c.body, lineHeight: 1.55 }}>{a.note}</p>
        </article>
      ))}
    </div>
  );
}
