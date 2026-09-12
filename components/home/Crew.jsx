import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Media from '@/components/Media';
import { getSiteImages } from '@/lib/content/settings';
import { c, mono, shell, eyebrow, h2 } from '@/lib/theme';

const POINTS = [
  'Uniformed staff, named crew lead on site',
  'Heavy lifting, dismantling and stair carries included',
  'Floor and lift protection as standard',
  'Site swept before we leave'
];

export default async function Crew() {
  const images = await getSiteImages();
  return (
    <Reveal style={{ background: c.mist, padding: 'clamp(56px, 8vw, 120px) clamp(16px, 3vw, 44px)' }}>
      <div style={{ ...shell, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(28px, 4vw, 64px)', alignItems: 'start' }}>
        <div>
          <Media image={images.crewLoadingSofa} label="photo &mdash; uniformed crew loading a sofa" dark={false} height="clamp(280px, 34vw, 440px)" style={{ background: c.block, border: '1px solid ' + c.line }} />
          <div style={{ marginTop: 14, background: c.ink, color: '#fff', padding: '20px 22px', display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, alignItems: 'center' }}>
            <div>
              <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>Before arrival you get</div>
              <div style={{ marginTop: 8, fontSize: 17, fontWeight: 700 }}>Crew lead name, arrival window, fixed price</div>
            </div>
            <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: c.sage, whiteSpace: 'nowrap' }}>&#9679; Confirmed</span>
          </div>
        </div>

        <div>
          <div style={eyebrow(c.muted)}>The crew</div>
          <h2 style={{ ...h2, marginTop: 16 }}>Trained to carry. Careful with your property.</h2>
          <p style={{ margin: '24px 0 0', fontSize: 17, lineHeight: 1.6, color: c.body, maxWidth: '48ch', textWrap: 'pretty' }}>
            Uniformed, equipped and briefed before arrival. We protect lift interiors and floors, dismantle what will not fit through the door, and take every piece away in one visit.
          </p>
          <ul className="jk-list" style={{ marginTop: 30, display: 'grid', borderTop: '1px solid ' + c.line }}>
            {POINTS.map((p, i) => (
              <li key={p} className="jk-indent" style={{ padding: '16px 0', borderBottom: i === POINTS.length - 1 ? 'none' : '1px solid ' + c.line, display: 'flex', gap: 16, alignItems: 'baseline' }}>
                <span style={{ fontFamily: mono, fontSize: 10, color: c.bronzeDeep }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 16, fontWeight: 600 }}>{p}</span>
              </li>
            ))}
          </ul>
          <Link href="/about" style={{ display: 'inline-block', marginTop: 28, fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.ink, borderBottom: '2px solid ' + c.bronze, paddingBottom: 6 }}>
            More about the crew &#8594;
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
