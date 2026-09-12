import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { mono } from '@/lib/theme';
import { absoluteUrl } from '@/lib/site';

/**
 * Breadcrumb trail for sub-pages, rendered inside the dark page hero.
 * `items` excludes Home, which is always prepended. Emits BreadcrumbList JSON-LD.
 */
export default function Breadcrumbs({ items }) {
  const trail = [{ href: '/', label: 'Home' }, ...items];
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.label,
      item: absoluteUrl(t.href)
    }))
  };

  return (
    <>
      <nav aria-label="Breadcrumb" style={{ marginBottom: 18, fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase' }}>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {trail.map((t, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={t.href} style={{ display: 'flex', gap: 10, color: last ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.56)' }}>
                {last ? (
                  <span aria-current="page">{t.label}</span>
                ) : (
                  <>
                    <Link href={t.href} className="jk-nav-link" style={{ color: 'inherit' }}>
                      {t.label}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={schema} />
    </>
  );
}
