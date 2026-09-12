import { c } from '@/lib/theme';

/**
 * Shared 1200x630 layout for next/og routes. Text-only by default; when
 * `photo` (a data URL from lib/og-image.js) is supplied it becomes a full-bleed
 * background with a dark gradient so the text stays legible.
 * Satori rules: every element with more than one child must be display:flex.
 */
export default function OgTemplate({ eyebrow, title, line, photo }) {
  return (
    <div style={{ width: '100%', height: '100%', background: c.ink, color: '#fff', display: 'flex', position: 'relative' }}>
      {photo ? <img src={photo} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
      {photo ? <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(16,23,38,0.55) 0%, rgba(16,23,38,0.92) 100%)' }} /> : null}
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div style={{ width: 34, height: 34, background: c.bronze }} />
          <div style={{ display: 'flex', fontSize: 52, fontWeight: 800, letterSpacing: -1 }}>JUNKIT</div>
          <div style={{ display: 'flex', fontSize: 22, letterSpacing: 6, color: 'rgba(255,255,255,0.5)', paddingLeft: 22, borderLeft: '2px solid rgba(255,255,255,0.18)' }}>DUBAI</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {eyebrow ? <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: c.bronze, textTransform: 'uppercase' }}>{eyebrow}</div> : null}
          <div style={{ display: 'flex', marginTop: 18, fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4, textTransform: 'uppercase', maxWidth: 1000 }}>{title}</div>
          <div style={{ display: 'flex', marginTop: 32, fontSize: 30, color: 'rgba(255,255,255,0.68)', maxWidth: 1000 }}>{line}</div>
        </div>
      </div>
    </div>
  );
}
