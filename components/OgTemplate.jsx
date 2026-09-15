import { c } from '@/lib/theme';
import { brand } from '@/lib/brand';

/**
 * Shared 1200x630 layout for next/og routes. Text-only by default; when
 * `photo` (a data URL from lib/og-image.js) is supplied it becomes a full-bleed
 * background with a dark gradient so the text stays legible.
 * `logo` is the data URL of public/brand/logo-dark.png (see lib/og-image.js
 * `loadOgLogo`); the wordmark is drawn as text if it cannot be read.
 * Satori rules: every element with more than one child must be display:flex.
 */
export default function OgTemplate({ eyebrow, title, line, photo, logo }) {
  return (
    <div style={{ width: '100%', height: '100%', background: c.ink, color: '#fff', display: 'flex', position: 'relative' }}>
      {photo ? <img src={photo} alt="" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : null}
      {photo ? <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(16,23,38,0.55) 0%, rgba(16,23,38,0.92) 100%)' }} /> : null}
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 72 }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {logo ? (
            <img src={logo} alt="" style={{ height: 88, width: Math.round((88 * brand.logoWidth) / brand.logoHeight) }} />
          ) : (
            <div style={{ display: 'flex', fontSize: 52, fontWeight: 800, letterSpacing: -1 }}>Junk Services Dubai</div>
          )}
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
