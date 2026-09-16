/**
 * Update only the phone / WhatsApp fields of the site-settings global to the
 * values in lib/site.js. Leaves every other CMS field untouched.
 *
 *   npx payload run scripts/update-contact.ts            show current values
 *   npx payload run scripts/update-contact.ts -- --write apply the change
 */
import fs from 'node:fs';
import { getPayload } from 'payload';
import './_script-env';
import config from '../payload.config';
import { contact } from '../lib/site.js';

const loadEnvFile = (process as any).loadEnvFile;
if (!process.env.DATABASE_URI && typeof loadEnvFile === 'function' && fs.existsSync('.env')) {
  loadEnvFile.call(process, '.env');
}

const WRITE = process.argv.includes('--write');

const api = await getPayload({ config });
const before = (await api.findGlobal({ slug: 'site-settings', overrideAccess: true })) as any;
console.log('Current:  phone =', before.phone, '| whatsapp =', before.whatsapp);
console.log('Target:   phone =', contact.phone, '| whatsapp =', contact.whatsapp);

if (WRITE) {
  await api.updateGlobal({
    slug: 'site-settings',
    data: { phone: contact.phone, whatsapp: contact.whatsapp },
    overrideAccess: true
  });
  const after = (await api.findGlobal({ slug: 'site-settings', overrideAccess: true })) as any;
  console.log('Updated:  phone =', after.phone, '| whatsapp =', after.whatsapp);
} else {
  console.log('Dry run — pass --write to apply.');
}
process.exit(0);
