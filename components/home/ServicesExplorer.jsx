'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import Reveal from '@/components/Reveal';
import Media from '@/components/Media';
import { c, mono, contact, shell, eyebrow } from '@/lib/theme';
import { groupHref } from '@/lib/hrefs';

/**
 * Homepage service explorer. Each row is a real button (keyboard-operable,
 * aria-expanded) and every blurb is in the DOM; only the detail card is
 * swapped for the active group. `groups` comes from the server page via the
 * content layer (client components never import it directly).
 */
export default function ServicesExplorer({ groups }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const svc = groups[active];

  return (
    <Reveal id="services" style={{ background: c.mist, padding: 'clamp(56px, 8vw, 120px) clamp(16px, 3vw, 44px)' }}>
      <div style={shell}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', paddingBottom: 'clamp(28px, 4vw, 52px)', borderBottom: '1px solid ' + c.line }}>
          <div>
            <div style={eyebrow(c.muted)}>The removal system</div>
            <h2 style={{ margin: '16px 0 0', fontSize: 'clamp(38px, 6vw, 78px)', lineHeight: 0.92, fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>
              One crew.
              <br />
              Everything out.
            </h2>
          </div>
          <Link href="/services" style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.ink, borderBottom: '2px solid ' + c.bronze, paddingBottom: 6 }}>
            All services &#8594;
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))', gap: 'clamp(24px, 4vw, 56px)', marginTop: 'clamp(24px, 3vw, 40px)' }}>
          <div>
            {groups.map((s, i) => {
              const on = i === active;
              const panelId = baseId + '-panel-' + i;
              return (
                <div
                  key={s.num}
                  onMouseEnter={() => setActive(i)}
                  style={{ padding: 'clamp(14px, 1.8vw, 22px) 0', borderBottom: '1px solid ' + c.line, background: on ? c.card : 'transparent', transition: 'background 0.2s ease' }}
                >
                  <h3 className="jk-h">
                    <button
                      type="button"
                      className="jk-plain-btn"
                      aria-expanded={on}
                      aria-controls={panelId}
                      onClick={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      style={{ width: '100%', display: 'flex', alignItems: 'baseline', gap: 'clamp(14px, 2vw, 26px)' }}
                    >
                      <span style={{ fontFamily: mono, fontSize: 12, letterSpacing: '0.12em', color: on ? c.bronzeDeep : c.dim, flex: 'none', width: 'clamp(30px, 4vw, 48px)' }}>{s.num}</span>
                      <span style={{ fontSize: 'clamp(21px, 2.9vw, 38px)', fontWeight: 800, letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1, color: on ? c.ink : c.muted, transition: 'color 0.2s ease' }}>{s.name}</span>
                      <span aria-hidden="true" style={{ fontFamily: mono, fontSize: 14, color: c.bronzeDeep, opacity: on ? 1 : 0, transform: on ? 'none' : 'translateX(-6px)', transition: 'opacity 0.2s ease, transform 0.2s ease' }}>&#8594;</span>
                    </button>
                  </h3>
                  <div id={panelId} aria-hidden={!on} style={{ overflow: 'hidden', transition: 'max-height 0.32s ease, opacity 0.25s ease', maxHeight: on ? 170 : 0, opacity: on ? 1 : 0, paddingTop: on ? 12 : 0 }}>
                    <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: c.body, maxWidth: '52ch', paddingLeft: 'clamp(46px, 6vw, 74px)', textWrap: 'pretty' }}>{s.blurb}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div>
            <div style={{ position: 'sticky', top: 108, background: c.ink, color: '#fff', border: '1px solid ' + c.line }}>
              <Media image={svc.image} label={'photo \u2014 ' + svc.name} height="clamp(200px, 24vw, 300px)" align="center" style={{ borderBottom: '1px solid rgba(255,255,255,0.14)' }} />
              <div style={{ padding: 'clamp(22px, 3vw, 32px)' }}>
                <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.bronze }}>Service {svc.num}</div>
                <div style={{ marginTop: 12, fontSize: 'clamp(23px, 2.6vw, 33px)', fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase', lineHeight: 1.02 }}>
                  <Link href={groupHref(svc)} style={{ color: '#fff' }}>{svc.name}</Link>
                </div>
                <div style={{ marginTop: 22, display: 'grid', borderTop: '1px solid rgba(255,255,255,0.14)' }}>
                  {[['Typical', svc.typical, '#fff'], ['Crew', svc.crew, '#fff'], ['On site', svc.time, c.sage]].map(([k, v, colour], i) => (
                    <div key={k} style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: 14, padding: '12px 0', borderBottom: i === 2 ? 'none' : '1px solid rgba(255,255,255,0.14)' }}>
                      <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)' }}>{k}</span>
                      <span style={{ fontSize: 14, color: colour === '#fff' ? 'rgba(255,255,255,0.85)' : colour, lineHeight: 1.5 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="jk-btn-primary" style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: c.bronze, color: c.ink, padding: '18px 22px', fontSize: 13, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Book this pickup <span style={{ fontFamily: mono }}>&#8594;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
