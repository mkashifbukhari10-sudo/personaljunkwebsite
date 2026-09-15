import Link from 'next/link';
import Image from 'next/image';
import { c, mono, contact, shell } from '@/lib/theme';
import { brand } from '@/lib/brand';
import { serviceHref, areaHref } from '@/lib/hrefs';
import { getServices } from '@/lib/content/services';
import { getFeaturedAreas } from '@/lib/content/areas';
import { getNavigation } from '@/lib/content/settings';

const label = { fontFamily: mono, fontSize: 10, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.56)', textTransform: 'uppercase' };

export default async function Footer() {
  const [services, featuredAreas, nav] = await Promise.all([getServices(), getFeaturedAreas(), getNavigation()]);
  // The Navigation global's footer columns (plan.md Phase 8); falls back to the
  // site's own link list while the global is empty. Column titles are not shown
  // yet — the links sit in the contact column exactly as before.
  const footerLinks = nav.footerColumns.flatMap((col) => col.links);
  return (
    <>
      <footer style={{ background: c.inkDeep, color: '#fff', padding: 'clamp(48px, 6vw, 90px) clamp(16px, 3vw, 44px) 132px' }}>
        <div
          style={{
            ...shell,
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 'clamp(32px, 4vw, 64px)',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            paddingBottom: 48
          }}
        >
          <div>
            <Link href="/" aria-label="Junk Services Dubai home" style={{ display: 'inline-block' }}>
              <Image src={brand.logoOnDark} alt="Junk Services Dubai" width={brand.logoWidth} height={brand.logoHeight} sizes="170px" style={{ height: 44, width: 'auto', display: 'block' }} />
            </Link>
            <p style={{ margin: '18px 0 0', fontSize: 15, lineHeight: 1.55, color: 'rgba(255,255,255,0.6)', maxWidth: '34ch', textWrap: 'pretty' }}>
              Junk removal, furniture pickup and full property clearance across Dubai. Send a photo, get a price, we clear it.
            </p>
            <div style={{ marginTop: 22, fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', color: c.sage, textTransform: 'uppercase' }}>
              Pickups since 2020
            </div>
          </div>

          <nav aria-label="Services">
            <div style={label}>Services</div>
            <div style={{ marginTop: 18, display: 'grid', gap: 10, fontSize: 14 }}>
              {services.map((s) => (
                <Link key={s.slug} href={serviceHref(s.slug)} className="jk-foot-link" style={{ color: 'rgba(255,255,255,0.78)' }}>
                  {s.name}
                </Link>
              ))}
            </div>
            <Link
              href="/services"
              style={{ display: 'inline-block', marginTop: 16, fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', color: c.bronze, textTransform: 'uppercase' }}
            >
              All services &#8594;
            </Link>
          </nav>

          <nav aria-label="Areas">
            <div style={label}>Areas</div>
            <div style={{ marginTop: 18, display: 'grid', gap: 10, fontSize: 14 }}>
              {featuredAreas.map((a) => (
                <Link key={a.slug} href={areaHref(a.slug)} className="jk-foot-link" style={{ color: 'rgba(255,255,255,0.78)' }}>
                  {a.name}
                </Link>
              ))}
            </div>
            <Link
              href="/areas"
              style={{ display: 'inline-block', marginTop: 16, fontFamily: mono, fontSize: 11, letterSpacing: '0.14em', color: c.bronze, textTransform: 'uppercase' }}
            >
              All areas &#8594;
            </Link>
          </nav>

          <div>
            <div style={label}>Contact</div>
            <div style={{ marginTop: 18, display: 'grid', gap: 14 }}>
              <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="jk-foot-link" style={{ fontSize: 22, fontWeight: 700, color: '#fff', letterSpacing: '-0.01em' }}>
                {contact.phone}
              </a>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>WhatsApp &amp; calls &middot; 7 days a week</span>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="jk-btn-primary" style={{ background: c.bronze, color: c.ink, padding: '12px 18px', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  WhatsApp
                </a>
                <a href={contact.tel} className="jk-btn-ghost" style={{ border: '1px solid rgba(255,255,255,0.28)', color: '#fff', padding: '12px 18px', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  Call
                </a>
              </div>
              <div style={{ display: 'grid', gap: 8, marginTop: 4, fontSize: 14 }}>
                {footerLinks.map((l) => (
                  <Link key={l.href} href={l.href} className="jk-foot-link" style={{ color: 'rgba(255,255,255,0.78)' }}>{l.label}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            ...shell,
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            flexWrap: 'wrap',
            fontFamily: mono,
            fontSize: 10,
            letterSpacing: '0.16em',
            color: 'rgba(255,255,255,0.56)',
            textTransform: 'uppercase'
          }}
        >
          <span>&copy; {new Date().getFullYear()} Junk Services Dubai</span>
          <span>You point. We lift. It&#8217;s gone.</span>
        </div>
      </footer>

      <div
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 200,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          background: c.ink,
          borderTop: '1px solid rgba(255,255,255,0.14)',
          boxShadow: '0 -12px 40px rgba(10,15,26,0.35)'
        }}
      >
        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="jk-btn-primary"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 58, background: c.bronze, color: c.ink, fontSize: 'clamp(10px, 2.9vw, 12px)', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
        >
          WhatsApp Us
        </a>
        <a
          href={contact.tel}
          className="jk-tint-dark"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 58, color: '#fff', fontSize: 'clamp(10px, 2.9vw, 12px)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', borderLeft: '1px solid rgba(255,255,255,0.14)', borderRight: '1px solid rgba(255,255,255,0.14)' }}
        >
          Call Now
        </a>
        <Link
          href="/contact"
          className="jk-tint-dark"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 58, color: '#fff', fontSize: 'clamp(10px, 2.9vw, 12px)', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}
        >
          Book Pickup
        </Link>
      </div>
    </>
  );
}
