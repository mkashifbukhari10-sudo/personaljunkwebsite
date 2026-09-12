'use client';

import Link from 'next/link';
import { useId, useState } from 'react';
import { c, mono } from '@/lib/theme';

/**
 * Accessible FAQ accordion: each question is a <button aria-expanded> inside an
 * <h3>; every answer is always in the DOM and only visually collapsed.
 * `items`: [{ q, a, more?: { href, label } }]. Shared by the homepage FAQ and
 * service landing pages.
 */
export default function FaqAccordion({ items, initialOpen = 0 }) {
  const [open, setOpen] = useState(initialOpen);
  const baseId = useId();

  return (
    <div style={{ borderTop: '1px solid rgba(16,23,38,0.18)' }}>
      {items.map((f, i) => {
        const on = i === open;
        const btnId = baseId + '-q-' + i;
        const panelId = baseId + '-a-' + i;
        return (
          <div
            key={f.q}
            style={{ borderBottom: '1px solid rgba(16,23,38,0.18)', background: on ? c.card : 'transparent', padding: on ? '0 14px' : 0, transition: 'background 0.2s ease' }}
          >
            <h3 className="jk-h">
              <button
                type="button"
                id={btnId}
                className="jk-plain-btn"
                aria-expanded={on}
                aria-controls={panelId}
                onClick={() => setOpen(on ? -1 : i)}
                style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 20, padding: 'clamp(18px, 2.2vw, 26px) 0' }}
              >
                <span style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(14px, 2vw, 26px)' }}>
                  <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', color: on ? c.bronzeDeep : c.dim, flex: 'none', transition: 'color 0.2s ease' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={{ fontSize: 'clamp(17px, 2vw, 24px)', fontWeight: 700, letterSpacing: '-0.015em' }}>{f.q}</span>
                </span>
                <span aria-hidden="true" style={{ fontFamily: mono, fontSize: 18, color: c.bronzeDeep, flex: 'none' }}>{on ? '−' : '+'}</span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              aria-hidden={!on}
              style={{ overflow: 'hidden', transition: 'max-height 0.3s ease, opacity 0.25s ease', maxHeight: on ? 260 : 0, opacity: on ? 1 : 0 }}
            >
              <p style={{ margin: 0, paddingBottom: f.more ? 12 : 'clamp(18px, 2.2vw, 26px)', fontSize: 16, lineHeight: 1.62, color: c.body, maxWidth: '62ch', textWrap: 'pretty' }}>{f.a}</p>
              {f.more ? (
                <Link
                  href={f.more.href}
                  tabIndex={on ? 0 : -1}
                  style={{ display: 'inline-block', marginBottom: 'clamp(18px, 2.2vw, 26px)', fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.bronzeDeep, borderBottom: '1px solid ' + c.bronze, paddingBottom: 4 }}
                >
                  {f.more.label} &#8594;
                </Link>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}
