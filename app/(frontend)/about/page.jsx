import Link from 'next/link';
import CtaBand from '@/components/CtaBand';
import Media from '@/components/Media';
import { getSiteImages } from '@/lib/content/settings';
import Reveal from '@/components/Reveal';
import Breadcrumbs from '@/components/Breadcrumbs';
import { c, mono, shell, eyebrow, h2 } from '@/lib/theme';
import { disposalStages } from '@/lib/data';
import { pageMetadata } from '@/lib/seo';
import { serviceHref } from '@/lib/hrefs';
import JsonLd from '@/components/JsonLd';
import { webPageSchema } from '@/lib/schema';

const POINTS = [
  { text: 'Fast response on WhatsApp, seven days a week', href: '/contact' },
  { text: 'Upfront pricing quoted from your photo', href: '/how-it-works' },
  { text: 'Dubai-wide coverage with daily routes', href: '/areas' },
  { text: 'Responsible disposal through licensed handlers' }
];

export const metadata = pageMetadata({
  title: 'About Us — Junk Removal in Dubai Since 2020',
  description: 'Junkit has been running junk removal and property clearance pickups in Dubai since 2020. Uniformed crews, upfront pricing and responsible disposal.',
  path: '/about'
});

export default async function AboutPage() {
  const images = await getSiteImages();
  return (
    <>
      <section style={{ background: c.ink, color: '#fff', padding: 'clamp(44px, 6vw, 92px) clamp(16px, 3vw, 44px)' }}>
        <div style={shell}>
          <Breadcrumbs items={[{ href: '/about', label: 'About' }]} />
          <h1 style={{ ...eyebrow(c.bronze), margin: 0, fontWeight: 400 }}>About Junkit, junk removal in Dubai since 2020</h1>
          <p style={{ margin: '18px 0 0', fontSize: 'clamp(38px, 6vw, 96px)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase', maxWidth: '20ch' }}>
            We handle the heavy lifting. You get your space back.
          </p>
          <div style={{ marginTop: 'clamp(32px, 4vw, 56px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: 'clamp(24px, 3vw, 56px)' }}>
            <p style={{ margin: 0, fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.62, color: c.onDark, textWrap: 'pretty' }}>
              Junkit has been running pickups in Dubai since 2020. We started with single sofas and mattresses and now clear{' '}
              <Link href={serviceHref('villa-clearance')} style={{ color: '#fff', borderBottom: '1px solid ' + c.bronze }}>whole villas</Link> and office floors, with the same rule on every job: one message from you, everything else from us.
            </p>
            <p style={{ margin: 0, fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.62, color: c.onDark, textWrap: 'pretty' }}>
              Most of our work comes from move-outs, handovers and renovations, where the deadline is not negotiable. That is why we{' '}
              <Link href="/how-it-works" style={{ color: '#fff', borderBottom: '1px solid ' + c.bronze }}>quote from a photo</Link>, confirm a slot the same conversation, and arrive with enough crew to finish in one visit.
            </p>
          </div>
        </div>
      </section>

      <Reveal style={{ background: c.mist, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)' }}>
        <div style={{ ...shell, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(28px, 4vw, 64px)', alignItems: 'center' }}>
          <div>
            <div style={eyebrow(c.muted)}>The crew</div>
            <h2 style={{ ...h2, marginTop: 16 }}>Uniformed, briefed, insured on site.</h2>
            <p style={{ margin: '22px 0 0', fontSize: 17, lineHeight: 1.6, color: c.body, maxWidth: '48ch', textWrap: 'pretty' }}>
              Every job has a named crew lead who confirms the inventory with you before anything is loaded. Lift interiors and floors are protected, oversized items are dismantled, and the site is swept before we leave.
            </p>
            <ul className="jk-list" style={{ marginTop: 30, display: 'grid', borderTop: '1px solid ' + c.line }}>
              {POINTS.map((p, i) => (
                <li key={p.text} className="jk-indent" style={{ padding: '16px 0', borderBottom: i === POINTS.length - 1 ? 'none' : '1px solid ' + c.line, display: 'flex', gap: 16, alignItems: 'baseline' }}>
                  <span style={{ fontFamily: mono, fontSize: 10, color: c.bronzeDeep }}>{String(i + 1).padStart(2, '0')}</span>
                  {p.href ? (
                    <Link href={p.href} style={{ fontSize: 16, fontWeight: 600, color: c.ink }}>{p.text}</Link>
                  ) : (
                    <span style={{ fontSize: 16, fontWeight: 600 }}>{p.text}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <Media image={images.crewOnSite} label="photo &mdash; crew and truck on site" dark={false} height="clamp(300px, 38vw, 470px)" style={{ background: c.block, border: '1px solid ' + c.line }} />
        </div>
      </Reveal>

      <Reveal id="disposal" style={{ background: c.card, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)', borderTop: '1px solid ' + c.lineSoft }}>
        <div style={shell}>
          <div style={eyebrow(c.sageDeep)}>Responsible disposal</div>
          <h2 style={{ ...h2, margin: '16px 0 clamp(28px, 4vw, 48px)', maxWidth: '22ch' }}>Removing junk is easy. Handling it responsibly matters.</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {disposalStages.map((s) => (
              <div key={s.num} className={s.dark ? undefined : 'jk-lift-soft'} style={{ flex: '1 1 180px', background: s.dark ? c.ink : '#fff', color: s.dark ? '#fff' : c.ink, padding: 'clamp(20px, 2.6vw, 32px)' }}>
                <span style={{ width: 10, height: 10, background: c.sage, display: 'block' }} />
                <h3 className="jk-h" style={{ marginTop: 16, fontSize: 'clamp(17px, 1.8vw, 22px)', fontWeight: 800, textTransform: 'uppercase', color: s.dark ? c.sage : c.ink }}>{s.title}</h3>
                <p style={{ margin: '8px 0 0', fontSize: 14, color: s.dark ? 'rgba(255,255,255,0.6)' : c.body, lineHeight: 1.55 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <CtaBand title={<>Got junk?<br />Let&#8217;s clear it.</>} />
      <JsonLd data={webPageSchema('AboutPage', { path: '/about', name: metadata.title, description: metadata.description })} />
    </>
  );
}
