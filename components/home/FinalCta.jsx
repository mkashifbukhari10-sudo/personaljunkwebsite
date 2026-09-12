import { c, mono, contact } from '@/lib/theme';

export default function FinalCta() {
  return (
    <section style={{ background: c.ink }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))' }}>
        <div style={{ background: c.ink, color: '#fff', padding: 'clamp(48px, 7vw, 104px) clamp(16px, 3vw, 44px)' }}>
          <div style={{ maxWidth: 620, marginLeft: 'auto', marginRight: 'clamp(0px, 3vw, 40px)' }}>
            <h2 style={{ margin: 0, fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.045em', textTransform: 'uppercase' }}>
              Got junk?
              <br />
              <span style={{ color: c.bronze }}>Let&#8217;s clear it.</span>
            </h2>
            <p style={{ margin: '26px 0 0', fontSize: 17, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)', maxWidth: '40ch' }}>
              Send the photo. We will send the price, the slot and the crew. Everything else is our job.
            </p>
          </div>
        </div>

        <div style={{ background: c.bronze, padding: 'clamp(48px, 7vw, 104px) clamp(16px, 3vw, 44px)', display: 'grid', alignContent: 'center' }}>
          <div style={{ maxWidth: 620 }}>
            <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="jk-btn-invert" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, background: c.ink, color: '#fff', padding: 'clamp(24px, 3vw, 34px) clamp(22px, 3vw, 32px)', fontSize: 'clamp(18px, 2.2vw, 28px)', fontWeight: 800, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
              WhatsApp us <span style={{ fontFamily: mono, fontSize: 20 }}>&#8594;</span>
            </a>
            <a href={contact.tel} className="jk-btn-outline" style={{ marginTop: 14, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20, border: '2px solid ' + c.ink, color: c.ink, padding: 'clamp(24px, 3vw, 34px) clamp(22px, 3vw, 32px)', fontSize: 'clamp(18px, 2.2vw, 28px)', fontWeight: 800, letterSpacing: '-0.01em', textTransform: 'uppercase' }}>
              Call now <span style={{ fontFamily: mono, fontSize: 20 }}>&#8594;</span>
            </a>
            <div style={{ marginTop: 20, fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(16,23,38,0.82)' }}>
              {contact.phone} &middot; 7 days a week
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
