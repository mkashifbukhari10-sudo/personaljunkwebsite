import Reveal from '@/components/Reveal';
import { c, mono, shell } from '@/lib/theme';

const CELLS = [
  { num: '01', title: 'Same-day pickup', body: 'Message before midday and a crew can reach you the same afternoon.' },
  { num: '02', title: 'WhatsApp quote', body: 'One photo is enough for a fixed price. No site visit needed.' },
  { num: '03', title: 'Professional crew', body: 'Uniformed, equipped and briefed before they knock.' },
  { num: '04', title: 'Upfront pricing', body: 'Labour, loading and disposal in the number you are given.' }
];

export default function ActionStrip() {
  return (
    <Reveal style={{ background: c.ink, color: '#fff', borderTop: '2px solid ' + c.bronze }}>
      <div style={{ ...shell, padding: '0 clamp(16px, 3vw, 44px)', display: 'flex', flexWrap: 'wrap' }}>
        {CELLS.map((cell) => (
          <div key={cell.num} className="jk-tint-dark" style={{ flex: '1 1 220px', padding: 'clamp(26px, 3vw, 40px) clamp(20px, 2vw, 32px)', outline: '1px solid rgba(255,255,255,0.12)' }}>
            <div style={{ fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', color: c.bronze }}>{cell.num}</div>
            <h2 className="jk-h" style={{ marginTop: 16, fontSize: 'clamp(20px, 2vw, 27px)', fontWeight: 800, letterSpacing: '-0.025em', textTransform: 'uppercase', lineHeight: 1.02 }}>{cell.title}</h2>
            <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.58)', maxWidth: '26ch' }}>{cell.body}</p>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
