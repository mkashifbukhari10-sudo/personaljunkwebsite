import Link from 'next/link';
import { redirectOrNotFound } from '@/lib/content/redirects';
import Breadcrumbs from '@/components/Breadcrumbs';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import JsonLd from '@/components/JsonLd';
import InlineText from '@/components/InlineText';
import FaqAccordion from '@/components/FaqAccordion';
import Media from '@/components/Media';
import { c, mono, shell, eyebrow, h2 } from '@/lib/theme';
import { serviceHref, areaHref } from '@/lib/hrefs';
import { getAreas, getAreaBySlug, getNearbyAreas, getPopularServicesForArea } from '@/lib/content/areas';
import { pageMetadata, ogImageUrl } from '@/lib/seo';
import { areaServiceSchema, faqPageSchema } from '@/lib/schema';

// Known slugs are prerendered by generateStaticParams; unknown ones render on
// demand and call notFound(), so they still 404. This must stay `true` for CMS
// content: with `false`, a path revalidated by a Payload hook (plan.md Phase 8)
// is no longer in the build-time params list and Next serves a 404 instead of
// regenerating it.
export const dynamicParams = true;

export async function generateStaticParams() {
  const areas = await getAreas();
  return areas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const area = await getAreaBySlug(slug);
  if (!area) return {};
  const path = areaHref(area.slug);
  return pageMetadata({
    seo: area.seo,
    path,
    og: {
      images: [{ url: ogImageUrl('area', area.slug), width: 1200, height: 630, alt: 'Junk removal in ' + area.name + ' — Junkit' }]
    }
  });
}

const darkLink = { color: '#fff', borderBottom: '1px solid ' + c.bronze };
const bodyLink = { color: c.bronzeDeep, borderBottom: '1px solid ' + c.bronze };
const listLink = { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, padding: '14px 0', borderBottom: '1px solid ' + c.line, color: c.ink, fontSize: 16, fontWeight: 600 };
const moreLink = { display: 'inline-block', marginTop: 18, fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.ink, borderBottom: '2px solid ' + c.bronze, paddingBottom: 6, justifySelf: 'start' };

export default async function AreaPage({ params }) {
  const { slug } = await params;
  const area = await getAreaBySlug(slug);
  // An old slug still has a redirect behind it; only a genuinely unknown one 404s.
  if (!area) await redirectOrNotFound(areaHref(slug));

  const [popular, nearby] = await Promise.all([getPopularServicesForArea(area.slug), getNearbyAreas(area.slug)]);
  const schemas = [areaServiceSchema(area)];
  if (area.faqs.length >= 2) schemas.push(faqPageSchema(area.faqs));

  return (
    <>
      <section style={{ background: c.ink, color: '#fff', padding: 'clamp(44px, 6vw, 92px) clamp(16px, 3vw, 44px)' }}>
        <div style={shell}>
          <Breadcrumbs items={[{ href: '/areas', label: 'Areas' }, { href: areaHref(area.slug), label: area.name }]} />
          <h1 style={{ ...eyebrow(c.bronze), margin: 0, fontWeight: 400 }}>{area.h1}</h1>
          <p style={{ margin: '18px 0 0', fontSize: 'clamp(40px, 6.4vw, 104px)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase', maxWidth: '12ch' }}>{area.name}</p>
          <p style={{ margin: '26px 0 0', maxWidth: '58ch', fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6, color: c.onDark, textWrap: 'pretty' }}>
            <InlineText text={area.intro} linkStyle={darkLink} />
          </p>
          <div style={{ marginTop: 22, fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.sage }}>&#9679; Covered &middot; {area.note}</div>
        </div>
      </section>

      {area.body.map((section, i) => (
        <Reveal key={section.heading} style={{ background: i % 2 === 0 ? c.mist : c.card, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)', borderTop: i % 2 === 0 ? 'none' : '1px solid ' + c.lineSoft }}>
          <div style={{ ...shell, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(24px, 4vw, 64px)', alignItems: 'start' }}>
            <div>
              <div style={eyebrow(c.muted)}>{String(i + 1).padStart(2, '0')}</div>
              <h2 style={{ ...h2, marginTop: 16, maxWidth: '16ch', fontSize: 'clamp(28px, 4vw, 52px)' }}>{section.heading}</h2>
            </div>
            <div style={{ display: 'grid', gap: 18 }}>
              {section.paragraphs.map((p, j) => (
                <p key={j} style={{ margin: 0, fontSize: 17, lineHeight: 1.62, color: c.body, maxWidth: '58ch', textWrap: 'pretty' }}>
                  <InlineText text={p} linkStyle={bodyLink} />
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      ))}

      <Reveal style={{ background: c.ink, color: '#fff', padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)' }}>
        <div style={shell}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(28px, 4vw, 64px)', alignItems: 'end' }}>
            <div>
              <div style={eyebrow(c.bronze)}>Popular services here</div>
              <h2 style={{ ...h2, marginTop: 16 }}>What we do most in {area.name}</h2>
            </div>
            <Media image={area.image} label={'photo \u2014 ' + area.name} height="clamp(220px, 26vw, 360px)" style={{ border: '1px solid rgba(255,255,255,0.14)' }} />
          </div>
          <div style={{ marginTop: 'clamp(28px, 4vw, 44px)', display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {popular.map((s) => (
              <Link key={s.slug} href={serviceHref(s.slug)} className="jk-tint-dark" style={{ flex: '1 1 260px', outline: '1px solid rgba(255,255,255,0.14)', padding: 'clamp(22px, 2.6vw, 32px)', color: '#fff', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', color: c.bronze }}>{s.num}</span>
                <span style={{ marginTop: 14, fontSize: 'clamp(19px, 2vw, 24px)', fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase', lineHeight: 1.05 }}>{s.name}</span>
                <span style={{ marginTop: 10, fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.6)' }}>{s.blurb}</span>
              </Link>
            ))}
          </div>
          <Link href="/services" style={{ display: 'inline-block', marginTop: 24, fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.bronze, borderBottom: '1px solid ' + c.bronze, paddingBottom: 5 }}>
            All services &#8594;
          </Link>
        </div>
      </Reveal>

      {area.faqs.length > 0 ? (
        <Reveal style={{ background: c.mist, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={eyebrow(c.muted)}>Questions</div>
            <h2 style={{ ...h2, margin: '16px 0 clamp(28px, 4vw, 48px)' }}>{area.name} questions</h2>
            <FaqAccordion items={area.faqs} />
          </div>
        </Reveal>
      ) : null}

      <Reveal style={{ background: c.card, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)', borderTop: '1px solid ' + c.lineSoft }}>
        <div style={{ ...shell, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(28px, 4vw, 64px)' }}>
          <nav aria-label="Nearby areas">
            <div style={eyebrow(c.muted)}>Nearby areas</div>
            <h2 className="jk-h" style={{ marginTop: 16, fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase' }}>Also on the route</h2>
            <div style={{ marginTop: 20, display: 'grid', borderTop: '1px solid ' + c.line }}>
              {nearby.map((a) => (
                <Link key={a.slug} href={areaHref(a.slug)} className="jk-indent" style={listLink}>
                  <span>{a.name}</span>
                  <span style={{ fontFamily: mono, fontSize: 12, color: c.body, textAlign: 'right', fontWeight: 400 }}>{a.note}</span>
                </Link>
              ))}
              <Link href="/areas" style={moreLink}>All areas &#8594;</Link>
            </div>
          </nav>

          <div>
            <div style={eyebrow(c.muted)}>Booking</div>
            <h2 className="jk-h" style={{ marginTop: 16, fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase' }}>Send a photo, get a price</h2>
            <p style={{ margin: '16px 0 0', fontSize: 16, lineHeight: 1.6, color: c.body, maxWidth: '48ch' }}>
              One photo and your {area.name} address are usually enough for a fixed quote covering labour, loading and disposal. <Link href="/how-it-works" style={bodyLink}>See how it works</Link> or <Link href="/contact" style={bodyLink}>book a pickup</Link>.
            </p>
          </div>
        </div>
      </Reveal>

      <CtaBand title={<>{area.cta[0]}<br />{area.cta[1]}</>} secondary="book" />
      <JsonLd data={schemas} />
    </>
  );
}
