'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Reveal from '@/components/Reveal';
import Media from '@/components/Media';
import { c, mono, shell, eyebrow } from '@/lib/theme';
import { clutterBlocks } from '@/lib/data';
import { hasImage } from '@/lib/images';

const SIZES = '(min-width: 1360px) 1320px, 100vw';
const tag = { position: 'absolute', top: 18, padding: '6px 10px', fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase' };

/**
 * Draggable before/after reveal. `before`/`after` are the Site settings >
 * Images slots (the same room, cluttered then cleared); when both are set the
 * slider wipes between the two photos, otherwise it falls back to the block
 * illustration so the section never renders empty.
 */
export default function ClutterClear({ before = null, after = null }) {
  const photos = hasImage(before) && hasImage(after);
  const [pct, setPct] = useState(42);
  const dragging = useRef(false);
  const boxRef = useRef(null);

  const setFromEvent = useCallback((clientX) => {
    const el = boxRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = Math.min(96, Math.max(4, ((clientX - r.left) / r.width) * 100));
    setPct(Math.round(next * 10) / 10);
  }, []);

  useEffect(() => {
    const move = (e) => dragging.current && setFromEvent(e.clientX);
    const up = () => { dragging.current = false; };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
  }, [setFromEvent]);

  const isGone = (b) => pct <= b.left + b.width * 0.5;
  const remaining = clutterBlocks.filter((b) => !isGone(b)).length;

  return (
    <Reveal style={{ background: c.card, padding: 'clamp(56px, 8vw, 120px) clamp(16px, 3vw, 44px)' }}>
      <div style={shell}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={eyebrow(c.bronzeDeep)}>Clutter &#8594; clear</div>
            <h2 style={{ margin: '16px 0 0', fontSize: 'clamp(38px, 6.4vw, 84px)', lineHeight: 0.9, fontWeight: 900, letterSpacing: '-0.045em', textTransform: 'uppercase' }}>
              More space.
              <br />
              Less stress.
            </h2>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.muted }}>Items left in the room</div>
            <div style={{ marginTop: 6, fontSize: 'clamp(40px, 5vw, 68px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1, color: remaining === 0 ? c.sageDeep : c.ink }}>
              {String(remaining).padStart(2, '0')}
            </div>
          </div>
        </div>

        <div
          ref={boxRef}
          onPointerDown={(e) => { dragging.current = true; setFromEvent(e.clientX); }}
          style={{ marginTop: 'clamp(24px, 3vw, 40px)', position: 'relative', height: 'clamp(320px, 42vw, 540px)', overflow: 'hidden', background: c.block, border: '1px solid ' + c.line, cursor: 'ew-resize', touchAction: 'none', userSelect: 'none' }}
        >
          {photos ? (
            <Media image={before} height="100%" sizes={SIZES} style={{ position: 'absolute', inset: 0 }} />
          ) : (
            <>
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, rgba(16,23,38,0.05) 0 12px, transparent 12px 24px)' }} />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: '18%', height: 1, background: 'rgba(16,23,38,0.2)' }} />
            </>
          )}

          {!photos && clutterBlocks.map((b) => (
            <div
              key={b.label}
              className={b.width < 13 ? 'jk-clutter-sm' : undefined}
              style={{
                position: 'absolute',
                left: b.left + '%',
                bottom: '18%',
                width: b.width + '%',
                height: b.height + '%',
                background: b.shade,
                border: '1px solid rgba(16,23,38,0.18)',
                display: 'flex',
                alignItems: 'flex-end',
                padding: 8,
                overflow: 'hidden'
              }}
            >
              <span style={{ fontFamily: mono, fontSize: 9, letterSpacing: '0.14em', color: c.body }}>{b.label}</span>
            </div>
          ))}

          <div style={{ ...tag, left: 20, color: photos ? '#fff' : c.body, background: photos ? 'rgba(16,23,38,0.62)' : 'transparent' }}>Before &mdash; villa living room</div>

          <div style={{ position: 'absolute', inset: 0, background: '#F9FAFB', clipPath: 'inset(0 0 0 ' + pct + '%)' }}>
            {photos ? (
              <Media image={after} height="100%" sizes={SIZES} style={{ position: 'absolute', inset: 0 }} />
            ) : (
              <>
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(16,23,38,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(16,23,38,0.035) 1px, transparent 1px)', backgroundSize: '56px 56px' }} />
                <div style={{ position: 'absolute', left: 0, right: 0, bottom: '18%', height: 1, background: 'rgba(16,23,38,0.18)' }} />
              </>
            )}
            <div style={{ ...tag, right: 20, color: photos ? '#fff' : c.ink, background: photos ? 'rgba(16,23,38,0.62)' : 'transparent' }}>
              <span style={{ color: c.sage }}>&#10003;</span> After &mdash; cleared &amp; swept
            </div>
            <div style={{ position: 'absolute', right: 'clamp(20px, 4vw, 56px)', bottom: '22%', textAlign: 'right', padding: photos ? '14px 18px' : 0, background: photos ? 'rgba(249,250,251,0.86)' : 'transparent' }}>
              <div style={{ fontSize: 'clamp(28px, 4.4vw, 62px)', fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase', lineHeight: 0.9, color: c.ink }}>Cleared</div>
              <div style={{ marginTop: 8, fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.muted }}>Same day &middot; nothing left behind</div>
            </div>
          </div>

          <div style={{ position: 'absolute', top: 0, bottom: 0, width: 2, background: c.bronze, left: pct + '%' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 52, height: 52, background: c.bronze, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.ink, fontFamily: mono, fontSize: 15, fontWeight: 600 }}>&#8596;</div>
          </div>
        </div>

        <div style={{ marginTop: 18, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: 10 }}>
          {clutterBlocks.map((b) => {
            const gone = isGone(b);
            return (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: gone ? c.ink : c.mist, outline: '1px solid ' + (gone ? c.ink : c.line), transition: 'background 0.25s ease' }}>
                <span style={{ fontFamily: mono, fontSize: 12, color: gone ? c.sage : 'rgba(16,23,38,0.25)', transition: 'color 0.25s ease' }}>&#10003;</span>
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: gone ? 'rgba(255,255,255,0.85)' : c.body, textDecoration: gone ? 'line-through' : 'none' }}>{b.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Reveal>
  );
}
