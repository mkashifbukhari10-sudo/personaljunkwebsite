import Link from 'next/link';
import { c, mono, contact, shell } from '@/lib/theme';

export default function CtaBand({ title, secondary = 'call' }) {
  return (
    <section style={{ background: c.bronze, color: c.ink, padding: 'clamp(44px, 6vw, 84px) clamp(16px, 3vw, 44px)' }}>
      <div style={{ ...shell, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 'clamp(24px, 3vw, 48px)', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: 'clamp(34px, 5vw, 66px)', lineHeight: 0.9, fontWeight: 900, letterSpacing: '-0.04em', textTransform: 'uppercase' }}>{title}</h2>
        <div style={{ display: 'grid', gap: 12 }}>
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="jk-btn-invert" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: c.ink, color: '#fff', padding: '22px 26px', fontSize: 15, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            WhatsApp us <span style={{ fontFamily: mono }}>&#8594;</span>
          </a>
          {secondary === 'call' ? (
            <a href={contact.tel} className="jk-btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '2px solid ' + c.ink, color: c.ink, padding: '22px 26px', fontSize: 15, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Call {contact.phone} <span style={{ fontFamily: mono }}>&#8594;</span>
            </a>
          ) : (
            <Link href="/contact" className="jk-btn-outline" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '2px solid ' + c.ink, color: c.ink, padding: '22px 26px', fontSize: 15, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Book a pickup <span style={{ fontFamily: mono }}>&#8594;</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
