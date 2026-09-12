import type { Field, FieldHook } from 'payload';

/** Lower-case, hyphenated, ASCII-only. Matches the slugs already used in the URLs. */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/['\u2018\u2019]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Slug field used by every page-like collection (plan.md Phase 8).
 *
 * - auto-generates from `from` (`name` / `title`) when left empty
 * - normalises whatever an editor types
 * - unique + indexed
 * - **changing a published slug is allowed, and recorded**: since plan.md
 *   Phase 14 the collection's `recordSlugChange` hook writes a 301 from the old
 *   path to the new one, so the live URL keeps working. Before that existed the
 *   only safe answer was to refuse the change.
 */
export const slugField = (from = 'name'): Field => {
  const beforeValidate: FieldHook = ({ data, originalDoc, siblingData, value }) => {
    const source = (data as Record<string, unknown> | undefined)?.[from];
    const next = slugify(String(value || source || '').trim());

    const previous: string | undefined = originalDoc?.slug;
    // Payload runs this hook on cascade updates too — deleting a Media
    // document nulls the uploads that referenced it, which is an update on
    // every affected doc. `originalDoc` is not always populated on that path,
    // so fall back through every source of the current slug before giving up:
    // returning an empty value there would wipe a live URL.
    const current: string | undefined =
      previous ?? (siblingData as Record<string, any> | undefined)?.slug ?? (value as string | undefined);
    return next || current;
  };

  return {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description:
        'The URL segment. Generated from the name if left empty. Changing it on a published page automatically leaves a 301 behind at the old address.'
    },
    hooks: { beforeValidate: [beforeValidate] }
  };
};
