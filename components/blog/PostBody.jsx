import RichText, { headingIds } from '@/lib/content/richtext';
import { c, mono } from '@/lib/theme';

/**
 * The serialized post body (plan.md Phase 13).
 *
 * `lib/content/richtext.jsx` is deliberately theme-free so it can be used from
 * anywhere; this is where the site's type scale is handed to it. Measure is
 * capped at ~68ch because long-form prose is the one place on this site where
 * line length matters more than filling the column.
 *
 * An article whose last section is an FAQ gets that section rendered as native
 * `<details>` disclosures instead of flat headings — see `splitFaq`. That is a
 * presentation convention read from the content itself; there is no FAQ field
 * on the Posts collection and none is required.
 */
const styles = {
  paragraph: { margin: '0 0 1.15em', fontSize: 'clamp(17px, 1.5vw, 19px)', lineHeight: 1.68, color: c.body, textWrap: 'pretty' },
  h2: {
    margin: 'clamp(36px, 4vw, 56px) 0 0.5em',
    fontSize: 'clamp(25px, 2.8vw, 34px)',
    fontWeight: 800,
    letterSpacing: '-0.03em',
    lineHeight: 1.12,
    color: c.ink,
    textWrap: 'balance'
  },
  h3: {
    margin: 'clamp(28px, 3vw, 40px) 0 0.5em',
    fontSize: 'clamp(20px, 2.1vw, 25px)',
    fontWeight: 800,
    letterSpacing: '-0.02em',
    lineHeight: 1.18,
    color: c.ink
  },
  h4: {
    margin: 'clamp(24px, 2.6vw, 32px) 0 0.5em',
    fontSize: 'clamp(17px, 1.7vw, 20px)',
    fontWeight: 700,
    letterSpacing: '-0.01em',
    color: c.ink
  },
  quote: {
    margin: 'clamp(28px, 3vw, 40px) 0',
    padding: '4px 0 4px clamp(18px, 2vw, 28px)',
    borderLeft: '3px solid ' + c.bronze,
    fontSize: 'clamp(19px, 1.9vw, 23px)',
    lineHeight: 1.45,
    fontWeight: 600,
    letterSpacing: '-0.015em',
    color: c.ink
  },
  list: { margin: '0 0 1.15em', paddingLeft: '1.35em', display: 'grid', gap: 8 },
  listItem: { fontSize: 'clamp(17px, 1.5vw, 19px)', lineHeight: 1.6, color: c.body },
  link: { color: c.bronzeDeep, borderBottom: '1px solid ' + c.bronze },
  rule: { margin: 'clamp(32px, 4vw, 52px) 0', border: 'none', borderTop: '1px solid ' + c.line },
  // Body images sit in a framed, outlined figure — the site's sharp-edged card
  // language rather than rounded corners it uses nowhere else.
  figure: { margin: 'clamp(32px, 4vw, 48px) 0' },
  figureClass: 'jk-article-figure'
};

const FAQ_HEADING = /^(faqs?|frequently asked questions|common questions|questions)\b/i;

const plain = (n) =>
  !n || typeof n !== 'object' ? '' : typeof n.text === 'string' ? n.text : (n.children || []).map(plain).join('');

/**
 * Split the document at a trailing FAQ heading.
 *
 * Returns `{ body, faqHeading, faqs }`. An FAQ is recognised only when an h2
 * near the end is titled like one *and* is followed by h3 questions — so a
 * passing mention of "questions" in a heading cannot accidentally restyle the
 * rest of an article. Anything unexpected falls back to normal rendering.
 */
export function splitFaq(value) {
  const kids = value?.root?.children;
  if (!Array.isArray(kids)) return { body: value, faqs: [] };

  const at = kids.findIndex((n) => n?.type === 'heading' && n.tag === 'h2' && FAQ_HEADING.test(plain(n).trim()));
  if (at === -1) return { body: value, faqs: [] };

  const rest = kids.slice(at + 1);
  // Only a trailing, unambiguous sequence of questions and answers is folded.
  // Preserve introductory prose or a later article section through normal rendering.
  if (rest[0]?.type !== 'heading' || rest[0]?.tag !== 'h3' ||
      rest.some((n) => n?.type === 'heading' && n.tag !== 'h3')) return { body: value, faqs: [] };

  const ids = headingIds(value);
  const faqs = [];
  for (const [index, node] of rest.entries()) {
    if (node?.type === 'heading' && node.tag === 'h3') faqs.push({ q: plain(node).trim(), id: ids.get(at + 1 + index)?.id, a: [] });
    else if (faqs.length) faqs[faqs.length - 1].a.push(node);
  }
  if (!faqs.length || faqs.some((f) => !f.q || !f.a.length)) return { body: value, faqs: [] };

  return {
    body: { ...value, root: { ...value.root, children: kids.slice(0, at) } },
    faqHeading: plain(kids[at]).trim(),
    faqId: ids.get(at)?.id,
    faqs
  };
}

export default function PostBody({ content }) {
  const { body, faqHeading, faqId, faqs } = splitFaq(content);

  return (
    <div className="jk-article-content" style={{ maxWidth: '68ch' }}>
      <RichText value={body} styles={styles} />

      {faqs.length ? (
        <section aria-labelledby={faqId} style={{ marginTop: 'clamp(40px, 5vw, 64px)' }}>
          <h2 id={faqId} className="jk-anchor" style={styles.h2}>
            {faqHeading}
          </h2>
          <div style={{ marginTop: 'clamp(16px, 2vw, 24px)' }}>
            {faqs.map((f, i) => (
              <details key={i} className="jk-faq">
                <summary id={f.id} className="jk-anchor">
                  <h3 style={{ margin: 0, fontSize: 'clamp(17px, 1.6vw, 19px)', fontWeight: 700, lineHeight: 1.4, textWrap: 'pretty' }}>
                    {f.q}
                  </h3>
                  <span aria-hidden="true" className="jk-faq-sign" style={{ fontFamily: mono, fontSize: 16, color: c.bronzeDeep }}>
                    +
                  </span>
                </summary>
                <div style={{ paddingBottom: 18 }}>
                  <RichText value={{ root: { type: 'root', children: f.a } }} styles={styles} anchors={false} />
                </div>
              </details>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
