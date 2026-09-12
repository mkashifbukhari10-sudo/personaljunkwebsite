import type { Field } from 'payload';

/**
 * Shared content fields for the two landing-page collections (Services,
 * Areas). Names and shapes are exactly the ones the frontend already reads
 * (see lib/services.js / lib/areas.js), so the mapper in lib/content/map.js is
 * a straight rename-free translation.
 *
 * Paragraphs stay plain text, not Lexical: the frontend renders inline links
 * with `[label](/path)` through components/InlineText.jsx, and changing that
 * contract is out of scope for this phase. Rich text arrives with the blog in
 * plan.md Phase 11.
 */
const linkHint = 'Plain text. Inline links use [label](/path).';

export const bodyField: Field = {
  name: 'body',
  type: 'array',
  labels: { singular: 'Section', plural: 'Sections' },
  minRows: 1,
  admin: { description: 'The <h2> sections of the page, in order.' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    {
      name: 'paragraphs',
      type: 'array',
      minRows: 1,
      labels: { singular: 'Paragraph', plural: 'Paragraphs' },
      fields: [{ name: 'text', type: 'textarea', required: true, admin: { description: linkHint } }]
    }
  ]
};

export const faqsField: Field = {
  name: 'faqs',
  type: 'array',
  labels: { singular: 'Question', plural: 'Questions' },
  admin: { description: 'Page-specific questions. Two or more are needed before FAQPage structured data is emitted.' },
  fields: [
    { name: 'q', type: 'text', required: true, label: 'Question' },
    { name: 'a', type: 'textarea', required: true, label: 'Answer' }
  ]
};

export const ctaField: Field = {
  name: 'cta',
  type: 'group',
  label: 'Closing call to action',
  admin: { description: 'The two display lines of the band at the bottom of the page.' },
  fields: [
    { name: 'line1', type: 'text', required: true },
    { name: 'line2', type: 'text', required: true }
  ]
};

export const introField: Field = {
  name: 'intro',
  type: 'textarea',
  required: true,
  admin: { description: 'The paragraph under the display heading. ' + linkHint }
};

export const imageField: Field = {
  name: 'image',
  type: 'upload',
  relationTo: 'media',
  admin: { description: 'Photo for this page and its social card. Optional \u2014 a placeholder is drawn when empty.' }
};
