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
import { getServices, getServiceBySlug, getRelatedServices } from '@/lib/content/services';
import { getAreasBySlugs } from '@/lib/content/areas';
import { pageMetadata, ogImageUrl } from '@/lib/seo';
import { serviceSchema, faqPageSchema } from '@/lib/schema';

// Known slugs are prerendered by generateStaticParams; unknown ones render on
// demand and call notFound(), so they still 404. This must stay `true` for CMS
// content: with `false`, a path revalidated by a Payload hook (plan.md Phase 8)
// is no longer in the build-time params list and Next serves a 404 instead of
// regenerating it.
export const dynamicParams = true;

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const svc = await getServiceBySlug(slug);
  if (!svc) return {};
  const path = serviceHref(svc.slug);
  // The service's own SEO group supplies title and description, plus the CMS
  // overrides (canonical, noIndex, og*) when the service comes from Payload.
  return pageMetadata({
    seo: svc.seo,
    path,
    og: {
      images: [{ url: ogImageUrl('service', svc.slug), width: 1200, height: 630, alt: svc.name + ' in Dubai — Junkit' }]
    }
  });
}

const darkLink = { color: '#fff', borderBottom: '1px solid ' + c.bronze };
const bodyLink = { color: c.bronzeDeep, borderBottom: '1px solid ' + c.bronze };
const listLink = { display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16, padding: '14px 0', borderBottom: '1px solid ' + c.line, color: c.ink, fontSize: 16, fontWeight: 600 };

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const svc = await getServiceBySlug(slug);
  // An old slug still has a redirect behind it; only a genuinely unknown one 404s.
  if (!svc) await redirectOrNotFound(serviceHref(slug));

  const [related, areas] = await Promise.all([getRelatedServices(svc.slug), getAreasBySlugs(svc.popularAreas)]);
  const facts = [
    ['Typical', svc.typical],
    ['Crew', svc.crew],
    ['On site', svc.time]
  ];
  const schemas = [serviceSchema(svc)];
  if (svc.faqs.length >= 2) schemas.push(faqPageSchema(svc.faqs));

  return (
    <>
      <section style={{ background: c.ink, color: '#fff', padding: 'clamp(44px, 6vw, 92px) clamp(16px, 3vw, 44px)' }}>
        <div style={shell}>
          <Breadcrumbs items={[{ href: '/services', label: 'Services' }, { href: serviceHref(svc.slug), label: svc.name }]} />
          <h1 style={{ ...eyebrow(c.bronze), margin: 0, fontWeight: 400 }}>{svc.h1}</h1>
          <p style={{ margin: '18px 0 0', fontSize: 'clamp(40px, 6.4vw, 104px)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase', maxWidth: '12ch' }}>{svc.name}</p>
          <p style={{ margin: '26px 0 0', maxWidth: '58ch', fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6, color: c.onDark, textWrap: 'pretty' }}>
            <InlineText text={svc.intro} linkStyle={darkLink} />
          </p>
        </div>
      </section>

      {svc.body.map((section, i) => (
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
        <div style={{ ...shell, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(28px, 4vw, 64px)', alignItems: 'start' }}>
          <div>
            <div style={eyebrow(c.bronze)}>Service {svc.num}</div>
            <h2 style={{ ...h2, marginTop: 16 }}>Typical job</h2>
            <div style={{ marginTop: 'clamp(28px, 4vw, 44px)', display: 'grid', borderTop: '1px solid rgba(255,255,255,0.14)' }}>
              {facts.map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '88px 1fr', gap: 14, padding: '16px 0', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
                  <span style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>{k}</span>
                  <span style={{ fontSize: 17, lineHeight: 1.5, color: k === 'On site' ? c.sage : 'rgba(255,255,255,0.88)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <Media image={svc.image} label={'photo \u2014 ' + svc.name} height="clamp(260px, 30vw, 420px)" style={{ border: '1px solid rgba(255,255,255,0.14)' }} />
        </div>
      </Reveal>

      {svc.faqs.length > 0 ? (
        <Reveal style={{ background: c.mist, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            <div style={eyebrow(c.muted)}>Questions</div>
            <h2 style={{ ...h2, margin: '16px 0 clamp(28px, 4vw, 48px)' }}>{svc.name} questions</h2>
            <FaqAccordion items={svc.faqs} />
          </div>
        </Reveal>
      ) : null}

      <Reveal style={{ background: c.card, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)', borderTop: '1px solid ' + c.lineSoft }}>
        <div style={{ ...shell, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(28px, 4vw, 64px)' }}>
          <nav aria-label="Related services">
            <div style={eyebrow(c.muted)}>Related services</div>
            <h2 className="jk-h" style={{ marginTop: 16, fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase' }}>Also worth a look</h2>
            <div style={{ marginTop: 20, display: 'grid', borderTop: '1px solid ' + c.line }}>
              {related.map((r) => (
                <Link key={r.slug} href={serviceHref(r.slug)} className="jk-indent" style={listLink}>
                  <span>{r.name}</span>
                  <span style={{ fontFamily: mono, fontSize: 14, color: c.bronzeDeep }}>&#8594;</span>
                </Link>
              ))}
              <Link href="/services" style={{ display: 'inline-block', marginTop: 18, fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.ink, borderBottom: '2px solid ' + c.bronze, paddingBottom: 6, justifySelf: 'start' }}>
                All services &#8594;
              </Link>
            </div>
          </nav>

          <nav aria-label="Popular areas">
            <div style={eyebrow(c.muted)}>Popular areas</div>
            <h2 className="jk-h" style={{ marginTop: 16, fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase' }}>Where we do this most</h2>
            <div style={{ marginTop: 20, display: 'grid', borderTop: '1px solid ' + c.line }}>
              {areas.map((a) => (
                <Link key={a.slug} href={areaHref(a.slug)} className="jk-indent" style={listLink}>
                  <span>{a.name}</span>
                  <span style={{ fontFamily: mono, fontSize: 12, color: c.body, textAlign: 'right', fontWeight: 400 }}>{a.note}</span>
                </Link>
              ))}
              <Link href="/areas" style={{ display: 'inline-block', marginTop: 18, fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.ink, borderBottom: '2px solid ' + c.bronze, paddingBottom: 6, justifySelf: 'start' }}>
                All areas &#8594;
              </Link>
            </div>
          </nav>
        </div>
      </Reveal>

      <CtaBand title={<>{svc.cta[0]}<br />{svc.cta[1]}</>} secondary="book" />
      <JsonLd data={schemas} />
    </>
  );
}
