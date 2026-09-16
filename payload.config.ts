import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildConfig } from 'payload';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';
import sharp from 'sharp';
import { Users } from './src/payload/collections/Users';
import { Media } from './src/payload/collections/Media';
import { Services } from './src/payload/collections/Services';
import { Areas } from './src/payload/collections/Areas';
import { Faqs } from './src/payload/collections/Faqs';
import { Reviews } from './src/payload/collections/Reviews';
import { Posts } from './src/payload/collections/Posts';
import { Authors } from './src/payload/collections/Authors';
import { Redirects } from './src/payload/collections/Redirects';
import { Leads } from './src/payload/collections/Leads';
import { SiteSettings } from './src/payload/globals/SiteSettings';
import { Navigation } from './src/payload/globals/Navigation';
import { Blog } from './src/payload/globals/Blog';

const dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Payload CMS configuration (plan.md Phases 7-10).
 *
 * The frontend never imports this directly: it reads through lib/content/*,
 * which loads Payload lazily and is the only source of page content since the
 * Phase 9 migration.
 *
 * Required env: PAYLOAD_SECRET, DATABASE_URI (Postgres). See .env.example.
 * Uploads go to Vercel Blob when BLOB_READ_WRITE_TOKEN is set, and to the
 * local media/ directory otherwise (fine for development, wrong for a
 * serverless deploy, whose filesystem does not survive the request).
 */
// Node tries IPv6 and IPv4 in turn when connecting ("happy eyeballs") and
// gives each attempt 250 ms by default. On a slow path to the database that
// is short enough for both to fail as `AggregateError: ETIMEDOUT` mid-build
// or mid-script. Ten seconds costs nothing when the first attempt succeeds.
if (typeof net.setDefaultAutoSelectFamilyAttemptTimeout === 'function') {
  net.setDefaultAutoSelectFamilyAttemptTimeout(10_000);
}

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname }
  },
  collections: [Services, Areas, Posts, Authors, Faqs, Reviews, Redirects, Media, Leads, Users],
  globals: [SiteSettings, Navigation, Blog],
  editor: lexicalEditor(),
  plugins: [
    vercelBlobStorage({
      collections: {
        // `disablePayloadAccessControl` stores the Blob URL on the document
        // instead of Payload's own /api/media/file/<name> route. That route is
        // a serverless function that streams the file back out of Blob, which
        // is a pointless hop here: Media is `access: { read: () => true }`, so
        // there is no access control for it to enforce. Direct URLs are served
        // by the CDN, and the Blob host is already allow-listed in
        // next.config.mjs (remotePatterns) and in the CSP.
        //
        // It applies to documents written afterwards, so existing rows keep
        // their old URL until they are re-uploaded:
        //   npm run seed:images -- --reupload
        media: { disablePayloadAccessControl: true }
      },
      // The adapter disables itself without a token and falls back to local storage.
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Keep the field schema identical with and without the token, so a
      // database created locally matches the one created on Vercel.
      alwaysInsertFields: true
    })
  ],
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URI || '' },
    // Drizzle's dev schema push blocks on an interactive prompt when it finds a
    // diff, which hangs any non-TTY run (the seed scripts, CI) on "Pulling
    // schema from database..." before the script's own code executes. The
    // scripts opt out via scripts/_script-env.ts; `next dev` is unaffected and
    // still pushes schema changes as before.
    ...(process.env.PAYLOAD_DISABLE_SCHEMA_PUSH === 'true' ? { push: false } : {})
  }),
  sharp,
  // REST API only; GraphQL is not used by the frontend.
  graphQL: { disable: true }
});
