import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Breadcrumbs from '@/components/Breadcrumbs';
import StepList from '@/components/how-it-works/StepList';
import { c, mono, contact, shell, eyebrow, h2 } from '@/lib/theme';
import { pageMetadata } from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import { howToSchema } from '@/lib/schema';
import { processSteps } from '@/lib/data';

const PREP = [
  'One wide photo of the room, plus a close-up of the largest item',
  'Your floor number and whether a service lift is available',
  'Any building rules on move-out timings or NOC paperwork',
  'The time you need the space clear by'
];

const QUICK = [
  ['01', 'Send a photo'],
  ['02', 'Get a quote'],
  ['03', 'We arrive'],
  ['04', 'Junk gone']
];

const moreLink = { display: 'inline-block', fontFamily: mono, fontSize: 11, letterSpacing: '0.16em', textTransform: 'uppercase', color: c.ink, borderBottom: '2px solid ' + c.bronze, paddingBottom: 6 };

export const metadata = pageMetadata({
  title: 'How It Works — Photo, Quote, Pickup',
  description:
    'Send a photo on WhatsApp, get a fixed price upfront, choose a slot and our crew dismantles, carries and clears it. Same-day pickup slots available across Dubai.',
  path: '/how-it-works'
});

export default function HowItWorksPage() {
  return (
    <>
      <section style={{ background: c.ink, color: '#fff', padding: 'clamp(44px, 6vw, 92px) clamp(16px, 3vw, 44px)' }}>
        <div style={shell}>
          <Breadcrumbs items={[{ href: '/how-it-works', label: 'How It Works' }]} />
          <h1 style={{ ...eyebrow(c.bronze), margin: 0, fontWeight: 400 }}>How junk removal with Junk Services Dubai works</h1>
          <p style={{ margin: '18px 0 0', fontSize: 'clamp(40px, 6.4vw, 104px)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.05em', textTransform: 'uppercase' }}>
            Five steps.
            <br />
            <span style={{ color: c.bronze }}>You do one.</span>
          </p>
          <div className="jk-motion" aria-hidden="true" style={{ marginTop: 26, height: 10, maxWidth: 420, backgroundImage: 'repeating-linear-gradient(90deg, ' + c.bronze + ' 0 22px, transparent 22px 44px)', backgroundSize: '44px 2px', backgroundPosition: '0 4px', backgroundRepeat: 'repeat-x', animation: 'routeMove 1.6s linear infinite' }} />
        </div>
      </section>

      <Reveal style={{ background: c.mist, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)' }}>
        <StepList />
      </Reveal>

      <Reveal style={{ background: c.bronze, color: c.ink, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)' }}>
        <div style={shell}>
          <div style={{ fontFamily: mono, fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', opacity: 0.7 }}>Same-day pickup</div>
          <h2 style={{ margin: '16px 0 0', fontSize: 'clamp(40px, 7vw, 96px)', lineHeight: 0.88, fontWeight: 900, letterSpacing: '-0.045em', textTransform: 'uppercase' }}>
            Book today.
            <br />
            Clear today.
          </h2>
          <div style={{ marginTop: 'clamp(32px, 4vw, 56px)', display: 'flex', flexWrap: 'wrap', borderTop: '2px solid ' + c.ink }}>
            {QUICK.map(([num, title], i) => (
              <div key={num} className="jk-tint-light" style={{ flex: '1 1 190px', padding: '26px clamp(18px, 2vw, 28px)', outline: '1px solid rgba(16,23,38,0.2)' }}>
                <div style={{ fontSize: 'clamp(30px, 3.6vw, 46px)', fontWeight: 900, letterSpacing: '-0.04em', color: i === QUICK.length - 1 ? '#fff' : c.ink }}>{num}</div>
                <h3 className="jk-h" style={{ marginTop: 10, fontFamily: mono, fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase' }}>{title}</h3>
              </div>
            ))}
          </div>
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="jk-btn-invert" style={{ marginTop: 'clamp(28px, 4vw, 44px)', display: 'inline-flex', alignItems: 'center', gap: 14, background: c.ink, color: '#fff', padding: '22px 28px', fontSize: 14, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            WhatsApp for fast quote <span style={{ fontFamily: mono }}>&#8594;</span>
          </a>
        </div>
      </Reveal>

      <Reveal style={{ background: c.card, padding: 'clamp(48px, 7vw, 100px) clamp(16px, 3vw, 44px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={eyebrow(c.muted)}>Before we arrive</div>
          <h2 style={{ ...h2, margin: '16px 0 clamp(28px, 4vw, 44px)', maxWidth: '22ch' }}>What helps us move faster.</h2>
          <ul className="jk-list" style={{ display: 'grid', borderTop: '1px solid rgba(16,23,38,0.18)' }}>
            {PREP.map((p, i) => (
              <li key={p} className="jk-indent" style={{ padding: '18px 0', borderBottom: i === PREP.length - 1 ? 'none' : '1px solid rgba(16,23,38,0.18)', display: 'flex', gap: 18, alignItems: 'baseline' }}>
                <span style={{ fontFamily: mono, fontSize: 10, color: c.bronzeDeep }}>{String(i + 1).padStart(2, '0')}</span>
                <span style={{ fontSize: 17, fontWeight: 600 }}>{p}</span>
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 'clamp(24px, 3vw, 36px)', display: 'flex', gap: 'clamp(20px, 3vw, 40px)', flexWrap: 'wrap' }}>
            <Link href="/services" style={moreLink}>What we take &#8594;</Link>
            <Link href="/areas" style={moreLink}>Areas we cover &#8594;</Link>
            <Link href="/contact" style={moreLink}>Book a pickup &#8594;</Link>
          </div>
        </div>
      </Reveal>
      <JsonLd data={howToSchema(processSteps)} />
    </>
  );
}
