/**
 * Content access layer — site-wide FAQs (the homepage and /how-it-works
 * list). The source is content/faqs.js; service and area pages carry their
 * own FAQs in content/services.js and content/areas.js.
 */
import { faqs } from '@/content/faqs';

const FAQS = faqs
  .filter((f) => f.q && f.a)
  .map((f) => {
    const faq = { q: f.q, a: f.a };
    if (f.more && f.more.href && f.more.label) faq.more = { href: f.more.href, label: f.more.label };
    return faq;
  });

/** Every site-wide FAQ, in display order. */
export async function getFaqs() {
  return FAQS.map((f) => ({ ...f, service: null, area: null }));
}

/** Site-wide FAQs. */
export async function getSiteFaqs() {
  return FAQS;
}
