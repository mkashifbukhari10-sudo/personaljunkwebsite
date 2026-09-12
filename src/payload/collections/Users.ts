import type { CollectionConfig } from 'payload';

/** Admin users. Auth-enabled; no public access. Roles/access rules are added in plan.md Phase 8. */
export const Users: CollectionConfig = {
  slug: 'users',
  admin: { useAsTitle: 'email' },
  auth: true,
  fields: []
};
