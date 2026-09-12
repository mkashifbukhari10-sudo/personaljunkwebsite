import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import { c, mono, shell } from '@/lib/theme';
import { navLinks } from '@/lib/site';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false }
};

export default function NotFound() {
  return (
    <>
      <PageHero title="Page not found" lead="That page does not exist or has been moved. Try one of the pages below, or message us on WhatsApp.">
        Nothing here.
      </PageHero>

      <section style={{ background: c.mist, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)' }}>
        <div style={{ ...shell, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: 1 }}>
          {navLinks.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              className="jk-lift-soft"
              style={{ background: c.card, outline: '1px solid ' + c.line, padding: 'clamp(20px, 2.4vw, 30px)', color: c.ink, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}
            >
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', color: c.bronzeDeep }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 'clamp(18px, 2vw, 24px)', fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase', lineHeight: 1.05 }}>{l.label}</span>
              </span>
              <span style={{ fontFamily: mono, fontSize: 14, color: c.bronzeDeep }}>&#8594;</span>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand title={<>Got junk?<br />Let&#8217;s clear it.</>} />
    </>
  );
}
