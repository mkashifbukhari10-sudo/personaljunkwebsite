import RichText from '@/lib/content/richtext';
import { c } from '@/lib/theme';

/**
 * The serialized post body (plan.md Phase 13).
 *
 * `lib/content/richtext.jsx` is deliberately theme-free so it can be used from
 * anywhere; this is where the site's type scale is handed to it. Measure is
 * capped at ~68ch because long-form prose is the one place on this site where
 * line length matters more than filling the column.
 */
const styles = {
  paragraph: { margin: '0 0 1.15em', fontSize: 'clamp(17px, 1.5vw, 19px)', lineHeight: 1.68, color: c.body, textWrap: 'pretty' },
  h2: {
    margin: 'clamp(36px, 4vw, 56px) 0 0.5em',
    fontSize: 'clamp(25px, 2.8vw, 34px)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    lineHeight: 1.12,
    color: c.ink,
    textWrap: 'balance'
  },
  h3: {
    margin: 'clamp(28px, 3vw, 40px) 0 0.5em',
    fontSize: 'clamp(20px, 2.1vw, 25px)',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    lineHeight: 1.18,
    color: c.ink
  },
  h4: {
    margin: 'clamp(24px, 2.6vw, 32px) 0 0.5em',
    fontSize: 'clamp(17px, 1.7vw, 20px)',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    color: c.ink
  },
  quote: {
    margin: 'clamp(28px, 3vw, 40px) 0',
    padding: '4px 0 4px clamp(18px, 2vw, 28px)',
    borderLeft: '3px solid ' + c.bronze,
    fontSize: 'clamp(19px, 1.9vw, 23px)',
    lineHeight: 1.45,
    fontWeight: 600,
    letterSpacing: '-0.015em',
    color: c.ink
  },
  list: { margin: '0 0 1.15em', paddingLeft: '1.35em', display: 'grid', gap: 8 },
  listItem: { fontSize: 'clamp(17px, 1.5vw, 19px)', lineHeight: 1.6, color: c.body },
  link: { color: c.bronzeDeep, borderBottom: '1px solid ' + c.bronze },
  rule: { margin: 'clamp(32px, 4vw, 52px) 0', border: 'none', borderTop: '1px solid ' + c.line },
  figure: { margin: 'clamp(28px, 3vw, 44px) 0' }
};

export default function PostBody({ content }) {
  return (
    <div style={{ maxWidth: '68ch' }}>
      <RichText value={content} styles={styles} />
    </div>
  );
}
