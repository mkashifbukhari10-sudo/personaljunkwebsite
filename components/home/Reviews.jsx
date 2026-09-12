'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';
import { c, mono } from '@/lib/theme';

/**
 * `items` comes from the server page and holds only reviews marked `verified`
 * in the CMS (plan.md Phase 9 deleted the placeholder set, so there is nothing
 * to filter any more). With no verified reviews the section is omitted
 * entirely rather than showing stub text.
 */
export default function Reviews({ items = [] }) {
  const [i, setI] = useState(0);
  const reviews = items;
  if (reviews.length === 0) return null;
  const r = reviews[i];

  return (
    <Reveal id="reviews" style={{ background: c.ink, color: '#fff', padding: 'clamp(56px, 8vw, 116px) clamp(16px, 3vw, 44px)', borderTop: '1px solid rgba(255,255,255,0.12)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap', fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
          <h2 className="jk-h">Customer reviews</h2>
          <span>{String(i + 1).padStart(2, '0')} / {String(reviews.length).padStart(2, '0')}</span>
        </div>

        <div style={{ marginTop: 18, display: 'flex', gap: 6 }}>
          {reviews.map((_, n) => (
            <button
              key={n}
              type="button"
              aria-label={'Review ' + (n + 1)}
              aria-pressed={n === i}
              onClick={() => setI(n)}
              style={{ width: n === i ? 44 : 18, height: 4, border: 'none', padding: 0, background: n === i ? c.bronze : 'rgba(255,255,255,0.28)', cursor: 'pointer', transition: 'width 0.3s cubic-bezier(0.2,0.7,0.2,1), background 0.3s ease' }}
            />
          ))}
        </div>

        <blockquote style={{ margin: 'clamp(22px, 3vw, 36px) 0 0', display: 'grid', gridTemplateColumns: 'auto minmax(0, 1fr)', gap: 'clamp(14px, 2vw, 28px)', alignItems: 'start' }}>
          <span aria-hidden="true" style={{ fontSize: 'clamp(52px, 7vw, 104px)', lineHeight: 0.7, fontWeight: 900, color: c.bronze }}>&#8220;</span>
          <span style={{ fontSize: 'clamp(24px, 4vw, 54px)', lineHeight: 1.08, fontWeight: 800, letterSpacing: '-0.035em', textWrap: 'pretty', minHeight: '3.2em', display: 'block' }}>{r.quote}</span>
        </blockquote>

        <div style={{ marginTop: 'clamp(24px, 3vw, 40px)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap', paddingTop: 22, borderTop: '1px solid rgba(255,255,255,0.16)' }}>
          <div>
            <div style={{ fontSize: 17, fontWeight: 700 }}>{r.name}</div>
            <div style={{ marginTop: 6, fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{r.meta}</div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="button" aria-label="Previous review" onClick={() => setI((i + reviews.length - 1) % reviews.length)} className="jk-tint-dark" style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.28)', color: '#fff', width: 54, height: 54, fontSize: 18, cursor: 'pointer', fontFamily: mono }}>&#8592;</button>
            <button type="button" aria-label="Next review" onClick={() => setI((i + 1) % reviews.length)} className="jk-btn-primary" style={{ background: c.bronze, border: '1px solid ' + c.bronze, color: c.ink, width: 54, height: 54, fontSize: 18, cursor: 'pointer', fontFamily: mono }}>&#8594;</button>
          </div>
        </div>

      </div>
    </Reveal>
  );
}
