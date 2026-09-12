import Reveal from '@/components/Reveal';
import FaqAccordion from '@/components/FaqAccordion';
import { c, eyebrow, h2 } from '@/lib/theme';
import { getSiteFaqs } from '@/lib/content/faqs';

/**
 * Homepage FAQ section. Questions come from the shared FAQ pool (the entries
 * with no service or area), falling back to lib/data.js while the CMS is
 * empty. The accordion itself is the shared FaqAccordion client component.
 */
export default async function Faq() {
  const faqs = await getSiteFaqs();
  return (
    <Reveal id="faq" style={{ background: c.mist, padding: 'clamp(56px, 8vw, 120px) clamp(16px, 3vw, 44px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={eyebrow(c.muted)}>Questions</div>
        <h2 style={{ ...h2, margin: '16px 0 clamp(28px, 4vw, 48px)' }}>Straight answers.</h2>
        <FaqAccordion items={faqs} />
      </div>
    </Reveal>
  );
}
