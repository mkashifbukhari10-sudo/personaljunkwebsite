'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { c, mono, contact } from '@/lib/theme';
import { navLinks } from '@/lib/site';

/**
 * Sticky site header. Breakpoints are handled in globals.css (.jk-nav-*) so the
 * server HTML matches the first client paint; only the mobile menu toggle is state.
 *
 * `links` comes from the Navigation global via the root layout (plan.md Phase 8)
 * and falls back to `navLinks` in lib/site.js while the global is empty.
 */
export default function Nav({ links = navLinks }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const isCurrent = (href) => (href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/'));

  const bar = {
    display: 'block',
    width: 20,
    height: 2,
    background: '#fff',
    transition: 'transform 0.25s cubic-bezier(0.2,0.7,0.2,1), opacity 0.2s ease'
  };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 150,
        background: c.ink,
        color: '#fff',
        borderBottom: '1px solid rgba(255,255,255,0.12)'
      }}
    >
      <nav
        aria-label="Primary"
        style={{
          padding: '0 clamp(12px, 3vw, 44px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'clamp(10px, 2vw, 20px)',
          minHeight: 72
        }}
      >
        <Link href="/" aria-label="Junkit Dubai home" style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#fff', padding: '16px 0' }}>
          <span style={{ width: 14, height: 14, background: c.bronze, display: 'block' }} />
          <span style={{ fontSize: 21, fontWeight: 800, letterSpacing: '-0.02em' }}>JUNKIT</span>
          <span
            className="jk-nav-badge"
            style={{
              fontFamily: mono,
              fontSize: 10,
              letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.5)',
              paddingLeft: 8,
              borderLeft: '1px solid rgba(255,255,255,0.18)'
            }}
          >
            DUBAI
          </span>
        </Link>

        <div
          className="jk-nav-links"
          style={{
            alignItems: 'center',
            gap: 'clamp(14px, 2vw, 30px)',
            fontFamily: mono,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase'
          }}
        >
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="jk-nav-link" aria-current={isCurrent(l.href) ? 'page' : undefined} style={{ color: isCurrent(l.href) ? '#fff' : 'rgba(255,255,255,0.72)', padding: '6px 0', borderBottom: isCurrent(l.href) ? '2px solid ' + c.bronze : '2px solid transparent' }}>
              {l.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'stretch', gap: 10, padding: '12px 0' }}>
          <a
            href={contact.tel}
            className="jk-btn-ghost jk-nav-call"
            style={{
              alignItems: 'center',
              border: '1px solid rgba(255,255,255,0.28)',
              color: '#fff',
              padding: '12px 18px',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}
          >
            Call Now
          </a>

          <a
            href={contact.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="jk-btn-primary jk-nav-wa"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: c.bronze,
              color: c.ink,
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap'
            }}
          >
            WhatsApp <span style={{ fontFamily: mono }}>&#8594;</span>
          </a>

          <button
            type="button"
            className="jk-nav-burger"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="jk-mobile-menu"
            onClick={() => setOpen((v) => !v)}
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              width: 48,
              height: 48,
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.28)',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <span style={{ ...bar, transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ ...bar, opacity: open ? 0 : 1 }} />
            <span style={{ ...bar, transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      <div
        id="jk-mobile-menu"
        className="jk-nav-panel"
        aria-hidden={!open}
        inert={!open}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: '100%',
          background: c.ink,
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          overflow: 'hidden',
          zIndex: 60,
          maxHeight: open ? 520 : 0,
          opacity: open ? 1 : 0,
          transition: 'max-height 0.35s cubic-bezier(0.2,0.7,0.2,1), opacity 0.25s ease'
        }}
      >
        <div style={{ display: 'grid', padding: '8px clamp(16px, 3vw, 44px) 20px' }}>
          {links.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              aria-current={isCurrent(l.href) ? 'page' : undefined}
              className="jk-foot-link"
              style={{
                color: '#fff',
                padding: '16px 0',
                borderBottom: i === links.length - 1 ? 'none' : '1px solid rgba(255,255,255,0.12)',
                fontSize: 17,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              {l.label}
              <span style={{ fontFamily: mono, fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>&#8594;</span>
            </Link>
          ))}
          <a
            href={contact.tel}
            className="jk-btn-ghost"
            style={{
              marginTop: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              padding: 16,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase'
            }}
          >
            Call {contact.phone}
          </a>
          <div
            style={{
              marginTop: 14,
              fontFamily: mono,
              fontSize: 10,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.4)',
              textAlign: 'center'
            }}
          >
            Pickups 7 days a week
          </div>
        </div>
      </div>
    </header>
  );
}
