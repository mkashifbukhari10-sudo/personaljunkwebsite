import Link from 'next/link';
import { c, mono, contact, shell, eyebrow } from '@/lib/theme';

const TIMELINE = [
  { time: '09:04', title: 'Photo received', body: 'Sofa, mattress, six boxes, 12th floor.' },
  { time: '09:16', title: 'Price confirmed', body: 'Fixed quote, labour and disposal included.' },
  { time: '14:30', title: 'Crew on site', body: 'Service lift booked, floors protected.' },
  { time: '15:40', title: 'Apartment clear', body: 'Swept, load away, nothing left behind.', done: true }
];

export default function Hero() {
  return (
    <section style={{ background: c.ink, color: '#fff', padding: 'clamp(44px, 6.5vw, 100px) clamp(16px, 3vw, 44px) 0', position: 'relative', overflow: 'hidden' }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '88px 88px',
          pointerEvents: 'none'
        }}
      />
      <div
        style={{
          ...shell,
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))',
          gap: 'clamp(32px, 5vw, 72px)',
          alignItems: 'end'
        }}
      >
        <div>
          {/* Descriptive H1 in the eyebrow slot; the display slogan below is supporting text. No entry animation so LCP is not delayed. */}
          <h1 style={{ ...eyebrow(c.bronze), margin: 0, fontWeight: 400, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 8, height: 8, background: c.bronze, display: 'block' }} />
            Same-day junk removal across Dubai
          </h1>

          <p style={{ margin: '22px 0 0', fontSize: 'clamp(40px, 6vw, 132px)', lineHeight: 0.86, fontWeight: 900, letterSpacing: '-0.045em', textTransform: 'uppercase' }}>
            <span style={{ whiteSpace: 'nowrap' }}>Junk out.</span>
            <br />
            <span style={{ color: c.bronze, whiteSpace: 'nowrap' }}>Space back.</span>
          </p>

          <p style={{ margin: '30px 0 0', maxWidth: '46ch', fontSize: 'clamp(16px, 1.4vw, 19px)', lineHeight: 1.6, color: c.onDark, textWrap: 'pretty' }}>
            <Link href="/services" style={{ color: '#fff', borderBottom: '1px solid ' + c.bronze }}>Furniture, appliances, garden waste, whole villas</Link>. Send one photo on WhatsApp, get a price, and a uniformed crew arrives to carry it out. You do not lift a thing.
          </p>

          <div style={{ margin: '36px 0 0', display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="jk-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: 14, background: c.bronze, color: c.ink, padding: '20px 28px', fontSize: 14, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              WhatsApp for a quote <span style={{ fontFamily: mono }}>&#8594;</span>
            </a>
            <a href={contact.tel} className="jk-btn-ghost" style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', padding: '20px 28px', fontSize: 14, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
              Call {contact.phone}
            </a>
          </div>

          <div style={{ margin: '44px 0 0', padding: '20px 0 clamp(40px, 5vw, 72px)', borderTop: '1px solid rgba(255,255,255,0.14)', display: 'flex', gap: 'clamp(20px, 4vw, 56px)', flexWrap: 'wrap', fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)' }}>
            <Link href="/about" className="jk-nav-link" style={{ color: 'inherit' }}>Pickups since 2020</Link>
            <Link href="/how-it-works" className="jk-nav-link" style={{ color: 'inherit' }}>Upfront pricing</Link>
            <span>Heavy lifting included</span>
          </div>
        </div>

        <div style={{ alignSelf: 'end', animation: 'riseIn 0.8s cubic-bezier(0.2,0.7,0.2,1) 0.2s both' }}>
          <div style={{ background: c.ink2, border: '1px solid rgba(255,255,255,0.14)', marginBottom: 'clamp(40px, 5vw, 72px)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.14)', fontFamily: mono, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
              <span>Example pickup &middot; Business Bay</span>
              <span style={{ color: c.sage, whiteSpace: 'nowrap' }}>&#9679; Crew available today</span>
            </div>
            <div style={{ padding: 'clamp(20px, 3vw, 32px)' }}>
              <div style={{ display: 'grid' }}>
                {TIMELINE.map((t, i) => (
                  <div key={t.time} style={{ display: 'grid', gridTemplateColumns: '62px 1fr', gap: 16, padding: '14px 0', borderBottom: i === TIMELINE.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.1)', alignItems: 'baseline' }}>
                    <span style={{ fontFamily: mono, fontSize: 12, color: t.done ? c.sage : c.bronze }}>{t.time}</span>
                    <div>
                      <div style={{ fontSize: 19, fontWeight: 700, letterSpacing: '-0.01em', color: t.done ? c.sage : '#fff' }}>{t.title}</div>
                      <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginTop: 4 }}>{t.body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="jk-motion" aria-hidden="true" style={{ marginTop: 22, height: 10, backgroundImage: 'repeating-linear-gradient(90deg, ' + c.bronze + ' 0 22px, transparent 22px 44px)', backgroundSize: '44px 2px', backgroundPosition: '0 4px', backgroundRepeat: 'repeat-x', animation: 'routeMove 1.6s linear infinite' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
