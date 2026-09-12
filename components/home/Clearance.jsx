import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Media from '@/components/Media';
import { getSiteImages } from '@/lib/content/settings';
import { c, mono, shell, eyebrow } from '@/lib/theme';
import { serviceHref } from '@/lib/hrefs';

const LADDER = [
  ['Single item or one room', '2 crew \u00b7 under an hour'],
  ['Apartment clearance', '3 crew \u00b7 half day'],
  ['Villa clearance', '4+ crew \u00b7 one to two days'],
  ['Office or commercial strip-out', 'Out of hours available']
];

const CARDS = [
  { label: 'apartment clearance', slot: 'clearanceApartments', title: 'Apartments', body: 'Studio to four bedrooms, tower access included.', href: serviceHref('house-clearance') },
  { label: 'villa clearance', slot: 'clearanceVillas', title: 'Villas', body: 'Whole-property clearances, garden and storage included.', href: serviceHref('villa-clearance') },
  { label: 'office strip-out', slot: 'clearanceOffices', title: 'Offices', body: 'Desks, partitions and IT waste, out of hours if needed.', href: serviceHref('commercial-junk-removal') },
  { label: 'crew at work', slot: 'clearanceCommercial', title: 'Commercial', body: 'Shops, warehouses and site waste on a schedule.', href: serviceHref('commercial-junk-removal') }
];

export default async function Clearance() {
  const images = await getSiteImages();
  return (
    <Reveal style={{ background: c.ink, color: '#fff', padding: 'clamp(56px, 8vw, 120px) clamp(16px, 3vw, 44px)' }}>
      <div style={shell}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(28px, 4vw, 64px)', alignItems: 'end' }}>
          <div>
            <div style={eyebrow(c.bronze)}>Full property clearance</div>
            <h2 style={{ margin: '20px 0 0', fontSize: 'clamp(38px, 7vw, 100px)', lineHeight: 0.86, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
              One item.
              <br />
              One room.
              <br />
              One villa.
              <br />
              <span style={{ color: c.bronze }}>We clear it all.</span>
            </h2>
          </div>

          <ul className="jk-list" style={{ display: 'grid', borderTop: '1px solid rgba(255,255,255,0.16)' }}>
            {LADDER.map(([title, meta], i) => (
              <li key={title} className="jk-indent" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, padding: '18px 0', borderBottom: i === LADDER.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.16)', alignItems: 'baseline' }}>
                <span style={{ fontSize: 17, fontWeight: 700 }}>{title}</span>
                <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: i === LADDER.length - 1 ? c.sage : 'rgba(255,255,255,0.5)', whiteSpace: 'nowrap' }}>{meta}</span>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: 'clamp(36px, 5vw, 64px)', display: 'flex', flexWrap: 'wrap', gap: 'clamp(16px, 2vw, 24px)' }}>
          {CARDS.map((card) => (
            <div key={card.title} className="jk-lift" style={{ flex: '1 1 240px', border: '1px solid rgba(255,255,255,0.16)' }}>
              <Media image={images[card.slot]} label={card.label} height="clamp(150px, 16vw, 210px)" sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" />
              <div style={{ padding: 20, borderTop: '1px solid rgba(255,255,255,0.16)' }}>
                <h3 className="jk-h" style={{ fontSize: 19, fontWeight: 700, textTransform: 'uppercase' }}>
                  <Link href={card.href} style={{ color: '#fff' }}>{card.title}</Link>
                </h3>
                <p style={{ margin: '8px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.58)', lineHeight: 1.55 }}>{card.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
