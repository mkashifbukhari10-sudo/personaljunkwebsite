'use client';

import { useState } from 'react';
import { c, mono, shell } from '@/lib/theme';
import { processSteps } from '@/lib/data';

/** Hover-highlight list of the five process steps (all content is always visible). Client-only so the page can stay a server component. */
export default function StepList() {
  const [hot, setHot] = useState(0);

  return (
    <div style={{ ...shell, display: 'grid', gap: 1 }}>
      {processSteps.map((s, i) => {
        const on = i === hot;
        return (
          <div
            key={s.num}
            onMouseEnter={() => setHot(i)}
            style={{ display: 'grid', gridTemplateColumns: 'clamp(60px, 8vw, 120px) minmax(0, 1fr) auto', gap: 'clamp(16px, 3vw, 40px)', alignItems: 'start', padding: 'clamp(24px, 3.2vw, 44px) clamp(20px, 2.6vw, 36px)', outline: '1px solid ' + c.line, background: on ? c.ink : c.card, color: on ? '#fff' : c.ink, transition: 'background 0.25s ease, color 0.25s ease' }}
          >
            <div style={{ fontSize: 'clamp(30px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.9, color: on ? c.bronze : 'rgba(16,23,38,0.28)' }}>{s.num}</div>
            <div>
              <h2 className="jk-h" style={{ fontSize: 'clamp(24px, 3.2vw, 42px)', fontWeight: 800, letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1 }}>{s.title}</h2>
              <p style={{ margin: '12px 0 0', fontSize: 16, lineHeight: 1.6, color: on ? 'rgba(255,255,255,0.65)' : c.body, maxWidth: '54ch', textWrap: 'pretty' }}>{s.body}</p>
            </div>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', whiteSpace: 'nowrap', color: on ? c.sage : c.dim }}>{s.meta}</div>
          </div>
        );
      })}
    </div>
  );
}
