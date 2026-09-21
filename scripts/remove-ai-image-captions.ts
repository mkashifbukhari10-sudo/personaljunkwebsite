import { getPayload } from 'payload';
import './_script-env';
import config from '../payload.config';

const apply = process.argv.includes('--apply');
const payload = await getPayload({ config });
const result = await payload.find({
  collection: 'media',
  where: { caption: { contains: 'AI-generated' } },
  pagination: false,
  depth: 0,
  overrideAccess: true
});

for (const media of result.docs) {
  console.log(`${apply ? 'REMOVE' : 'FOUND'} ${media.filename || media.id}: ${media.caption}`);
  if (apply) {
    await payload.update({
      collection: 'media',
      id: media.id,
      data: { caption: null },
      overrideAccess: true
    });
  }
}

console.log(`${apply ? 'Removed' : 'Found'} ${result.docs.length} AI-generated image caption(s).`);
await payload.destroy();
