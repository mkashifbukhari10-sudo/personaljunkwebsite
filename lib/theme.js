export const c = {
  ink: '#101726',
  inkDeep: '#0A0F1A',
  ink2: '#18202F',
  mist: '#EAECEF',
  card: '#F3F5F7',
  panel: '#F7F8FA',
  block: '#DCDFE4',
  bronze: '#C79A52',
  bronzeHi: '#D9AE66',
  bronzeDeep: '#855F1E',
  sage: '#8FCDB4',
  sageDeep: '#2E7F62',
  body: '#4A5260',
  muted: '#5A6070',
  dim: '#8B93A2',
  line: 'rgba(16,23,38,0.16)',
  lineSoft: 'rgba(16,23,38,0.12)',
  onDark: 'rgba(255,255,255,0.68)',
  lineDark: 'rgba(255,255,255,0.14)'
};

export const mono = 'var(--font-mono), "IBM Plex Mono", monospace';

// Contact details live in lib/site.js so metadata and JSON-LD share them.
export { contact } from './site';

export const shell = { maxWidth: 1320, margin: '0 auto' };

export const pad = 'clamp(56px, 8vw, 120px) clamp(16px, 3vw, 44px)';

export const eyebrow = (color) => ({
  fontFamily: mono,
  fontSize: 11,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color
});

export const h2 = {
  margin: 0,
  fontSize: 'clamp(32px, 5vw, 64px)',
  lineHeight: 0.94,
  fontWeight: 900,
  letterSpacing: '-0.04em',
  textTransform: 'uppercase'
};
