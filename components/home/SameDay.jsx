import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { c, mono, contact, shell, eyebrow } from '@/lib/theme';

const STEPS = [
  { num: 'STEP 01', title: 'Send a photo', body: 'Wide shot of the room, close-up of the biggest item.' },
  { num: 'STEP 02', title: 'Get a quote', body: 'Fixed price on WhatsApp, usually within minutes.' },
  { num: 'STEP 03', title: 'We arrive', body: 'Crew, tools and protection, at the slot you chose.' },
  { num: 'STEP 04', title: 'Junk gone', body: 'Loaded, swept and sorted for responsible disposal.', done: true }
];

export default function SameDay() {
  return (
    <Reveal style={{ background: c.ink, color: '#fff', padding: 'clamp(56px, 8vw, 116px) clamp(16px, 3vw, 44px)' }}>
      <div style={shell}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: 'clamp(28px, 4vw, 64px)', alignItems: 'end' }}>
          <div>
            <div style={eyebrow(c.bronze)}>Same-day pickup</div>
            <h2 style={{ margin: '16px 0 0', fontSize: 'clamp(44px, 8vw, 104px)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.045em', textTransform: 'uppercase' }}>
              Need it gone
              <br />
              <span style={{ color: c.bronze }}>today?</span>
            </h2>
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6, maxWidth: '44ch', color: c.onDark, textWrap: 'pretty' }}>
              Move-out deadline, new sofa arriving, landlord inspection. Tell us the time you need the space clear by and we will work back from it.
            </p>
            <div style={{ marginTop: 28, display: 'flex', gap: 'clamp(16px, 2vw, 28px)', alignItems: 'center', flexWrap: 'wrap' }}>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="jk-btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: c.bronze, color: c.ink, padding: '20px 28px', fontSize: 14, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                WhatsApp for fast quote <span style={{ fontFamily: mono }}>&#8594;</span>
              </a>
              <Link href="/how-it-works" style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.bronze, borderBottom: '1px solid ' + c.bronze, paddingBottom: 5 }}>
                See all five steps &#8594;
              </Link>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'clamp(40px, 6vw, 76px)' }}>
          <div className="jk-motion" aria-hidden="true" style={{ height: 8, backgroundImage: 'repeating-linear-gradient(90deg, rgba(199,154,82,0.9) 0 22px, transparent 22px 44px)', backgroundSize: '44px 2px', backgroundPosition: '0 3px', backgroundRepeat: 'repeat-x', animation: 'routeMove 1.6s linear infinite' }} />
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {STEPS.map((s) => (
              <div key={s.num} className="jk-tint-dark" style={{ flex: '1 1 200px', padding: '26px clamp(18px, 2vw, 28px)', outline: '1px solid rgba(255,255,255,0.12)' }}>
                <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', color: s.done ? c.sage : c.bronze }}>{s.num}</div>
                <h3 className="jk-h" style={{ marginTop: 14, fontSize: 'clamp(22px, 2.4vw, 32px)', fontWeight: 800, letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 1, color: s.done ? c.sage : '#fff' }}>{s.title}</h3>
                <p style={{ margin: '10px 0 0', fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.55 }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
