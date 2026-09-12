import type { CollectionBeforeDeleteHook, CollectionConfig } from 'payload';
import { APIError } from 'payload';
import { slugField } from '../fields/slug';
import { revalidateAfterChange, revalidateAfterDelete } from '../hooks/revalidate';

/**
 * Blog post authors (plan.md Phase 11).
 *
 * An author renders as schema.org `Person` inside `BlogPosting.author`; the
 * publisher stays the site's `LocalBusiness`. Nothing is seeded here — real
 * people are not invented — so the collection starts empty and an editor
 * creates their own record before publishing a post.
 *
 * The slug exists so Phase 12/13 can add `/blog/author/[slug]` later without a
 * migration; nothing links to it yet.
 */

/**
 * `author` is required on a post, but Payload will happily delete an author and
 * leave every post that referenced it holding null — including published ones,
 * which then have no byline and no Person in their structured data. Refuse the
 * delete instead and name the posts that have to be reassigned first.
 */
const refuseIfPostsReference: CollectionBeforeDeleteHook = async ({ id, req }) => {
  const { docs } = await req.payload.find({
    collection: 'posts',
    where: { author: { equals: id } },
    depth: 0,
    limit: 5,
    pagination: false,
    overrideAccess: true,
    draft: true,
    req
  });
  if (!docs.length) return;
  const titles = docs.map((d: { title?: string; slug?: string }) => d.title || d.slug).join(', ');
  throw new APIError(
    'This author still has ' +
      docs.length +
      ' post(s) — ' +
      titles +
      '. Reassign them to another author before deleting this one.',
    400
  );
};

export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: { singular: 'Author', plural: 'Authors' },
  access: { read: () => true },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'role', 'updatedAt'],
    description: 'The people who write posts. Used for the byline and for Person structured data.'
  },
  hooks: {
    beforeDelete: [refuseIfPostsReference],
    afterChange: [revalidateAfterChange('posts', ['/blog'])],
    afterDelete: [revalidateAfterDelete('posts', ['/blog'])]
  },
  fields: [
    slugField('name'),
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '60%', description: 'As it should appear in the byline.' } },
        { name: 'role', type: 'text', admin: { width: '40%', description: 'Optional, e.g. "Operations lead".' } }
      ]
    },
    {
      name: 'bio',
      type: 'textarea',
      admin: { description: 'A sentence or two. Shown under the post and used in Person structured data.' }
    },
    { name: 'photo', type: 'upload', relationTo: 'media', admin: { description: 'Optional headshot.' } },
    {
      name: 'sameAs',
      type: 'array',
      label: 'Profiles',
      admin: { description: 'Full URLs of profiles this person actually owns (LinkedIn, etc.).' },
      fields: [{ name: 'url', type: 'text', required: true }]
    }
  ]
};
