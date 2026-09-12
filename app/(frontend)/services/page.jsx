import Link from 'next/link';
import PageHero from '@/components/PageHero';
import CtaBand from '@/components/CtaBand';
import Reveal from '@/components/Reveal';
import ServiceGrid from '@/components/services/ServiceGrid';
import { c, mono, shell, eyebrow, h2 } from '@/lib/theme';
import { pageMetadata } from '@/lib/seo';
import { getServices } from '@/lib/content/services';
import JsonLd from '@/components/JsonLd';
import { collectionPageSchema } from '@/lib/schema';
import { serviceHref } from '@/lib/hrefs';

const TAKES = [
  ['Properties', ['Apartments', 'Villas', 'Homes', 'Offices', 'Commercial spaces']],
  ['Furniture', ['Sofas', 'Beds', 'Mattresses', 'Wardrobes', 'Dining sets']],
  ['Appliances', ['Fridges & freezers', 'Washers & dryers', 'Ovens & cookers', 'AC units', 'TVs & e-waste']],
  ['Waste', ['General junk', 'Bulky items', 'Garden waste', 'Household garbage', 'Office clear-outs']]
];

const inlineLink = { color: '#fff', borderBottom: '1px solid ' + c.bronze };
const moreLink = { display: 'inline-block', fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.ink, borderBottom: '2px solid ' + c.bronze, paddingBottom: 6 };

export const metadata = pageMetadata({
  title: 'Junk Removal Services in Dubai',
  description:
    'Twelve services, one crew: junk removal, garbage and waste removal, furniture and sofa removal, appliance disposal, garden waste, house and villa clearance and same-day pickup across Dubai.',
  path: '/services'
});

export default async function ServicesPage() {
  const services = (await getServices()).map((s) => ({ slug: s.slug, num: s.num, name: s.name, blurb: s.blurb }));
  const collection = collectionPageSchema({ path: '/services', name: metadata.title, description: metadata.description, items: services.map((s) => ({ name: s.name, href: serviceHref(s.slug) })) });
  return (
    <>
      <PageHero
        title="Junk removal services in Dubai"
        crumbs={[{ href: '/services', label: 'Services' }]}
        lead={
          <>
            Twelve services, one crew and one number. Apartments, villas, offices and commercial spaces{' '}
            <Link href="/areas" style={inlineLink}>across the city</Link>.
          </>
        }
      >
        You point.
        <br />
        We lift.
        <br />
        <span style={{ color: c.bronze }}>It&#8217;s gone.</span>
      </PageHero>

      <Reveal style={{ background: c.mist, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)' }}>
        <ServiceGrid services={services} />
      </Reveal>

      <Reveal style={{ background: c.card, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)', borderTop: '1px solid ' + c.lineSoft }}>
        <div style={shell}>
          <div style={eyebrow(c.muted)}>What we take</div>
          <h2 style={{ ...h2, margin: '16px 0 clamp(28px, 4vw, 48px)', maxWidth: '22ch' }}>If it fits in the truck, it goes in the truck.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: 'clamp(24px, 3vw, 48px)' }}>
            {TAKES.map(([title, items]) => (
              <div key={title}>
                <h3 className="jk-h" style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: c.bronzeDeep, paddingBottom: 12, borderBottom: '2px solid ' + c.ink }}>{title}</h3>
                <ul className="jk-list" style={{ marginTop: 14, display: 'grid', gap: 10, fontSize: 15, color: c.body }}>
                  {items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'clamp(28px, 4vw, 44px)', padding: '20px 22px', background: '#fff', borderLeft: '3px solid ' + c.sage, fontSize: 15, color: c.body, maxWidth: '70ch', lineHeight: 1.6 }}>
            We cannot accept hazardous chemicals, paint solvents, gas cylinders or medical waste. Ask us and we will point you to a licensed handler.
          </div>
          <div style={{ marginTop: 'clamp(24px, 3vw, 36px)', display: 'flex', gap: 'clamp(20px, 3vw, 40px)', flexWrap: 'wrap' }}>
            <Link href="/how-it-works" style={moreLink}>How a pickup works &#8594;</Link>
            <Link href="/contact" style={moreLink}>Book a pickup &#8594;</Link>
          </div>
        </div>
      </Reveal>

      <CtaBand title={<>Send the photo.<br />We&#8217;ll handle the rest.</>} />
      <JsonLd data={collection} />
    </>
  );
}
