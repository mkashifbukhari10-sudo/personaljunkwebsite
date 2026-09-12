/**
 * Content access layer — the shared FAQ pool (plan.md Phase 8, migrated in 9).
 *
 * Site-wide questions (no service and no area relationship) render on the
 * homepage and feed its FAQPage structured data. Per-page question lists stay
 * on the Service and Area documents themselves.
 */
import { TAGS, cached, findAll } from './payload';
import { mapFaq } from './map';

const loadFaqs = cached(
  async () => {
    const docs = await findAll('faqs');
    return docs.map((doc) => ({ ...mapFaq(doc), service: doc.service || null, area: doc.area || null }));
  },
  ['content', 'faqs'],
  [TAGS.faqs]
);

/** Every FAQ in the pool, in editor order. */
export async function getFaqs() {
  return loadFaqs();
}

/** Site-wide questions only — the homepage list. */
export async function getSiteFaqs() {
  const all = await loadFaqs();
  return all.filter((f) => !f.service && !f.area).map(({ service, area, ...faq }) => faq);
}
