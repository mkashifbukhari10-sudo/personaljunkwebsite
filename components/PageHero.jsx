import Breadcrumbs from '@/components/Breadcrumbs';
import { c, shell, eyebrow } from '@/lib/theme';

/**
 * Dark page hero. `title` is the descriptive H1 (styled as the eyebrow label);
 * `children` is the large display slogan, rendered as supporting text.
 */
export default function PageHero({ title, crumbs, children, lead, tight = false }) {
  return (
    <section style={{ background: c.ink, color: '#fff', padding: tight ? 'clamp(44px, 6vw, 84px) clamp(16px, 3vw, 44px)' : 'clamp(44px, 6vw, 92px) clamp(16px, 3vw, 44px)' }}>
      <div style={shell}>
        {crumbs ? <Breadcrumbs items={crumbs} /> : null}
        <h1 style={{ ...eyebrow(c.bronze), margin: 0, fontWeight: 400 }}>{title}</h1>
        <p style={{ margin: '18px 0 0', fontSize: 'clamp(40px, 6.4vw, 104px)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>{children}</p>
        {lead ? (
          <p style={{ margin: '26px 0 0', maxWidth: '52ch', fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6, color: c.onDark, textWrap: 'pretty' }}>{lead}</p>
        ) : null}
      </div>
    </section>
  );
}
