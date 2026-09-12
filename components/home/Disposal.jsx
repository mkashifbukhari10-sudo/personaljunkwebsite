import Link from 'next/link';
import Reveal from '@/components/Reveal';
import { c, mono, shell, eyebrow, h2 } from '@/lib/theme';

/** Short responsible-disposal summary; the full five-stage breakdown lives on /about#disposal. */
export default function Disposal() {
  return (
    <Reveal style={{ background: c.card, padding: 'clamp(56px, 8vw, 120px) clamp(16px, 3vw, 44px)', borderTop: '1px solid ' + c.lineSoft }}>
      <div style={shell}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <div style={eyebrow(c.sageDeep)}>Responsible disposal</div>
            <h2 style={{ ...h2, marginTop: 16, maxWidth: '20ch' }}>Removing junk is easy.</h2>
          </div>
          <div style={{ maxWidth: '34ch' }}>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: c.body }}>
              Loads are sorted before they reach a landfill. Usable furniture is passed on, metal and e-waste go to licensed handlers, and the rest is disposed of through approved Dubai facilities.
            </p>
            <Link href="/about#disposal" style={{ display: 'inline-block', marginTop: 16, fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.ink, borderBottom: '2px solid ' + c.bronze, paddingBottom: 6 }}>
              How we handle every load &#8594;
            </Link>
          </div>
        </div>

      </div>
    </Reveal>
  );
}
