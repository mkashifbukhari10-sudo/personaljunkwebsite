'use client';

import Link from 'next/link';
import { useState } from 'react';
import Reveal from '@/components/Reveal';
import { c, mono, shell, eyebrow, h2 } from '@/lib/theme';
import { areaHref } from '@/lib/hrefs';

/**
 * Homepage coverage grid. Area tiles link to their landing pages. `areas`
 * (homepage-ordered) comes from the server page via the content layer.
 * Small-screen label hiding is done in CSS (.jk-map-label) rather than
 * window-width state so there is no hydration shift.
 */
export default function DubaiMap({ areas }) {
  const [hot, setHot] = useState(-1);

  return (
    <Reveal id="areas" style={{ background: c.ink, color: '#fff', padding: 'clamp(56px, 8vw, 120px) clamp(16px, 3vw, 44px)' }}>
      <div style={{ ...shell, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(28px, 4vw, 64px)' }}>
        <div>
          <div style={eyebrow(c.bronze)}>Service area</div>
          <h2 style={{ ...h2, marginTop: 16 }}>
            Dubai-wide.
            <br />
            Marina to Mirdif.
          </h2>
          <p style={{ margin: '22px 0 0', fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', maxWidth: '40ch' }}>
            Crews run daily routes across the city. Hover a community to find it on the grid, or send your location and we will confirm the next slot.
          </p>

          <div style={{ marginTop: 30, display: 'flex', flexWrap: 'wrap', gap: 1 }} onMouseLeave={() => setHot(-1)}>
            {areas.map((a, i) => {
              const on = i === hot;
              return (
                <Link
                  key={a.slug}
                  href={areaHref(a.slug)}
                  onMouseEnter={() => setHot(i)}
                  onFocus={() => setHot(i)}
                  onBlur={() => setHot(-1)}
                  style={{
                    flex: '1 1 150px',
                    background: on ? c.bronze : c.ink,
                    outline: '1px solid ' + (on ? c.bronze : 'rgba(255,255,255,0.14)'),
                    padding: '14px 12px',
                    fontFamily: mono,
                    fontSize: 11,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: on ? c.ink : 'rgba(255,255,255,0.8)',
                    transition: 'background 0.2s ease, color 0.2s ease'
                  }}
                >
                  {a.name}
                </Link>
              );
            })}
          </div>

          <Link href="/areas" style={{ display: 'inline-block', marginTop: 24, fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.bronze, borderBottom: '1px solid ' + c.bronze, paddingBottom: 5 }}>
            See all coverage &#8594;
          </Link>
        </div>

        <div aria-hidden="true" style={{ position: 'relative', minHeight: 'clamp(320px, 40vw, 520px)', border: '1px solid rgba(255,255,255,0.16)', backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '44px 44px', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: '-8%', top: '62%', width: '130%', height: 2, background: 'rgba(255,255,255,0.16)', transform: 'rotate(-14deg)' }} />
          <div style={{ position: 'absolute', left: '-8%', top: '30%', width: '130%', height: 1, background: 'rgba(255,255,255,0.1)', transform: 'rotate(-14deg)' }} />
          <div style={{ position: 'absolute', left: '22%', top: '-10%', width: 1, height: '120%', background: 'rgba(255,255,255,0.1)', transform: 'rotate(12deg)' }} />
          <div style={{ position: 'absolute', left: '62%', top: '-10%', width: 1, height: '120%', background: 'rgba(255,255,255,0.1)', transform: 'rotate(12deg)' }} />

          {areas.map((a, i) => {
            const on = i === hot;
            const flip = a.home.x > 58;
            return (
              <div key={a.slug} style={{ position: 'absolute', left: a.home.x + '%', top: a.home.y + '%', width: 10, height: 10, zIndex: on ? 2 : 1 }}>
                <span style={{ position: 'absolute', left: 0, top: 0, width: 10, height: 10, borderRadius: '50%', background: on ? '#fff' : c.bronze, transform: on ? 'scale(1.5)' : 'none', transition: 'transform 0.2s ease, background 0.2s ease' }} />
                <span className="jk-motion" style={{ position: 'absolute', left: 0, top: 0, width: 10, height: 10, borderRadius: '50%', border: '2px solid ' + c.bronze, animation: 'pulseRing 2.8s ease-out ' + i * 0.3 + 's infinite' }} />
                <span
                  className={'jk-map-label' + (on ? ' is-on' : '')}
                  style={{
                    position: 'absolute',
                    top: -4,
                    left: flip ? 'auto' : 18,
                    right: flip ? 18 : 'auto',
                    textAlign: flip ? 'right' : 'left',
                    whiteSpace: 'nowrap',
                    fontFamily: mono,
                    fontSize: 10,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: on ? '#fff' : 'rgba(255,255,255,0.75)'
                  }}
                >
                  {a.name}
                </span>
              </div>
            );
          })}

          <div style={{ position: 'absolute', left: 16, bottom: 14, fontFamily: mono, fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>
            Illustrative city grid &middot; not to scale
          </div>
        </div>
      </div>
    </Reveal>
  );
}
