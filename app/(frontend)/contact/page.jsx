import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Breadcrumbs from '@/components/Breadcrumbs';
import QuoteForm from '@/components/contact/QuoteForm';
import { c, mono, contact, shell, eyebrow } from '@/lib/theme';
import { pageMetadata } from '@/lib/seo';
import { getAreas } from '@/lib/content/areas';
import JsonLd from '@/components/JsonLd';
import { webPageSchema } from '@/lib/schema';

const FACTS = [
  { k: 'Hours', v: '7 days a week' },
  { k: 'Response', v: 'Fast, usually minutes' },
  { k: 'Coverage', v: 'Dubai-wide', href: '/areas' },
  { k: 'Pricing', v: 'Upfront, from a photo', href: '/how-it-works' }
];

export const metadata = pageMetadata({
  title: 'Book a Pickup — Get a Quote on WhatsApp',
  description:
    'Send your name, area and a photo of what needs removing. Fixed quote on WhatsApp, usually within minutes, 7 days a week. Or call ' + contact.phone + '.',
  path: '/contact'
});

export default async function ContactPage() {
  const areas = await getAreas();
  return (
    <>
      <section style={{ background: c.ink, color: '#fff', padding: 'clamp(44px, 6vw, 84px) clamp(16px, 3vw, 44px)' }}>
        <div style={shell}>
          <Breadcrumbs items={[{ href: '/contact', label: 'Contact' }]} />
          <h1 style={{ ...eyebrow(c.bronze), margin: 0, fontWeight: 400 }}>Book a junk removal pickup in Dubai</h1>
          <p style={{ margin: '18px 0 0', fontSize: 'clamp(38px, 6.2vw, 96px)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
            Send the photo.
            <br />
            <span style={{ color: c.bronze }}>We&#8217;ll handle the rest.</span>
          </p>
        </div>
      </section>

      <Reveal style={{ background: c.mist, padding: 'clamp(40px, 6vw, 88px) clamp(16px, 3vw, 44px)' }}>
        <div style={{ ...shell, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(28px, 4vw, 64px)', alignItems: 'start' }}>
          <QuoteForm areaNames={areas.map((a) => a.name)} />

          <div style={{ display: 'grid', gap: 14 }}>
            <div style={{ background: c.ink, color: '#fff', padding: 'clamp(24px, 3vw, 40px)' }}>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Fastest route</div>
              <h2 className="jk-h" style={{ marginTop: 14, fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1 }}>WhatsApp with a photo</h2>
              <p style={{ margin: '16px 0 0', fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', maxWidth: '40ch' }}>
                One picture and your area is usually enough for a fixed price. Replies within minutes during working hours.
              </p>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="jk-btn-primary" style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: c.bronze, color: c.ink, padding: '20px 22px', fontSize: 14, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                WhatsApp us <span style={{ fontFamily: mono }}>&#8594;</span>
              </a>
              <a href={contact.tel} className="jk-btn-ghost" style={{ marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '20px 22px', fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Call {contact.phone} <span style={{ fontFamily: mono }}>&#8594;</span>
              </a>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {FACTS.map((f) => (
                <div key={f.k} style={{ flex: '1 1 150px', background: c.panel, outline: '1px solid ' + c.line, padding: 22 }}>
                  <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.bronzeDeep }}>{f.k}</div>
                  {f.href ? (
                    <Link href={f.href} style={{ display: 'inline-block', marginTop: 10, fontSize: 16, fontWeight: 700, color: c.ink, borderBottom: '1px solid ' + c.bronze }}>{f.v}</Link>
                  ) : (
                    <div style={{ marginTop: 10, fontSize: 16, fontWeight: 700 }}>{f.v}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
      <JsonLd data={webPageSchema('ContactPage', { path: '/contact', name: metadata.title, description: metadata.description })} />
    </>
  );
}
