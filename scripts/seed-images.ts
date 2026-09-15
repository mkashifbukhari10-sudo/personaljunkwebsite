/**
 * Upload the photos in public/images/ to the Media collection and attach them
 * to the slots plan.md Phase 5/10 left empty (Site settings > Images, the
 * `image` field on services and areas).
 *
 *   npm run seed:images               upload missing photos, fill empty slots only
 *   npm run seed:images -- --update   also re-point slots that already have a photo
 *   npm run seed:images -- --reupload send every photo's file to storage again,
 *                                     keeping the existing Media documents and ids
 *
 * Media documents are matched by the slugified filename Payload stores
 * (`My Photo (1).JPG` -> `my-photo-1.jpg`), so re-running never uploads a
 * duplicate. A slot already holding an image is left alone unless --update is
 * passed, so an editor's choice in /admin survives a re-run.
 *
 * Storage follows payload.config.ts: with BLOB_READ_WRITE_TOKEN set the files
 * go to Vercel Blob, otherwise to the local (gitignored) media/ directory. A
 * local upload is invisible to a deployed site that shares the database, so
 * once the token exists run `--reupload` to copy the files into Blob: every
 * Media document keeps its id (so nothing is re-linked) and only its file and
 * URL change. Redeploy afterwards; static pages do not notice a script.
 *
 * The mapping below is by photo content, not by filename: two of the supplied
 * files were named for the wrong slot (see the notes on each entry).
 *
 * Payload's revalidation hooks cannot reach Next from a script, so a running
 * dev server keeps serving the old (placeholder) pages until it restarts, and
 * `next build` reuses its persisted data cache: delete `.next/cache/fetch-cache`
 * before the next local build.
 */
import fs from 'node:fs';
import path from 'node:path';
import { getPayload } from 'payload';
import config from '../payload.config';
import { slugify } from '../src/payload/fields/slug';

type AnyDoc = Record<string, any>;

const loadEnvFile = (process as AnyDoc).loadEnvFile;
if (!process.env.DATABASE_URI && typeof loadEnvFile === 'function' && fs.existsSync('.env')) {
  loadEnvFile.call(process, '.env');
}
if (!process.env.DATABASE_URI) {
  console.error('DATABASE_URI is not set. Add it (and PAYLOAD_SECRET) to .env — see .env.example.');
  process.exit(1);
}

const UPDATE = process.argv.includes('--update');
const REUPLOAD = process.argv.includes('--reupload');
const IMAGES_DIR = path.resolve('public/images');

/**
 * One photo: the file under public/images, the alt text it is uploaded with
 * and, for third-party photography, the attribution line stored as its
 * caption (Media.jsx renders it over the image).
 */
interface Photo {
  file: string;
  alt: string;
  caption?: string;
}

const photos = {
  crewSofa: {
    file: 'uniformed crew loading a sofa.jpg',
    alt: 'Two uniformed Junk Services Dubai crew carrying a wrapped sofa out of a glass-fronted Dubai building towards their truck'
  },
  crewTruck: {
    file: 'crew and truck on site (2).jpg',
    alt: 'Five crew in hi-vis vests and hard hats talking beside a flatbed truck on a sandy site, with the Dubai skyline behind'
  },
  apartment: {
    file: 'apartment clearance.jpg',
    alt: 'Boxes, a rolled rug, an armchair and a lamp gathered for collection in a high-rise apartment overlooking the Burj Khalifa'
  },
  villa: {
    file: 'villa clearance.jpg',
    alt: 'Three crew in hi-vis vests packing labelled clearance boxes onto a trolley in the marble hall of a Dubai villa'
  },
  // Named "crew at work" on disk, but the photo is an office floor mid strip-out.
  officeStripOut: {
    file: 'crew at work.jpg',
    alt: 'A high-rise office floor being stripped out, with stacked partitions, desks and office chairs waiting for removal'
  },
  // Named "office strip-out" on disk, but the photo is two crew at a pickup truck on the street.
  crewStreet: {
    file: 'office strip-out.jpg',
    alt: 'Two crew in hi-vis vests checking a job on a handheld device beside their pickup truck on a Dubai street'
  },
  before: {
    file: 'Before.jpg',
    alt: 'A double-height villa living room cluttered with open boxes, covered furniture, cables and packing paper before a junk removal'
  },
  after: {
    file: 'After.jpg',
    alt: 'The same double-height villa living room empty, with clean marble floors after the clearance'
  },
  garbageBins: {
    file: 'Garbage & Waste Removal.png',
    alt: 'Two crew in green uniforms tipping wheelie bins of bagged household waste into a refuse truck, with the Burj Khalifa in the distance'
  },
  wasteTruck: {
    file: 'Garbage & Waste Removal.jpg',
    alt: 'Crew in hi-vis vests wheeling green and blue bins to a waste collection truck outside office towers in Dubai'
  },
  furniture: {
    file: 'sofa and furtnure removal.png',
    alt: 'Two crew in navy uniforms carrying a grey fabric sofa out of a living room towards an open truck'
  },
  appliance: {
    file: 'Appliance Disposal.png',
    alt: 'Two crew in green uniforms moving an old fridge on a trolley up a truck ramp, with a cooker, dishwasher and microwave waiting beside them'
  },
  garden: {
    file: 'Garden Waste Removal.jpg',
    alt: 'A worker in a hi-vis vest bundling cut palm fronds and bougainvillea trimmings in a villa driveway while a truck is loaded at the gate'
  },
  houseVilla: {
    file: 'House & Villa Clearance.jpg',
    alt: 'Crew loading a wrapped sofa, boxes, a mattress and a rolled carpet into a box truck outside a Dubai villa'
  },
  residential: {
    file: 'Residential Junk Remova.jpg',
    alt: 'A wrapped sofa and armchair with labelled boxes ready for removal in a bright villa room with garden views'
  },
  towerFlat: {
    file: 'apartment clearance (2).jpg',
    alt: 'A crew member in a hi-vis vest taping up labelled boxes beside stacked chairs in a high-rise apartment at sunset'
  },
  // Area photos: Creative Commons photography from Wikimedia Commons, chosen
  // on 2026-09-15 (licence, author and source page per file in
  // public/images/areas/CREDITS.md). The caption is the attribution the
  // licences require and is shown on the image.
  areaDubaiMarina: {
    file: 'areas/dubai-marina.jpg',
    alt: "Yachts moored in Dubai Marina with the residential towers behind them in late-afternoon light",
    caption: "Photo: Francisco Anzola, CC BY 3.0, via Wikimedia Commons"
  },
  areaPalmJumeirah: {
    file: 'areas/palm-jumeirah.jpg',
    alt: "Aerial view of Palm Jumeirah with Atlantis The Palm in the foreground and the fronds of villas behind",
    caption: "Photo: giggel, CC BY 3.0, via Wikimedia Commons"
  },
  areaDowntownDubai: {
    file: 'areas/downtown-dubai.jpg',
    alt: "Downtown Dubai skyline with the Burj Khalifa, seen from a helicopter",
    caption: "Photo: Tim.Reckmann, CC BY-SA 3.0, via Wikimedia Commons"
  },
  areaBusinessBay: {
    file: 'areas/business-bay.jpg',
    alt: "Business Bay towers along the Dubai Water Canal at dusk",
    caption: "Photo: Iwona Rege, CC BY-SA 4.0, via Wikimedia Commons"
  },
  areaJumeirah: {
    file: 'areas/jumeirah.jpg',
    alt: "Fishing boats moored at Jumeirah fishing harbour at sunset",
    caption: "Photo: Phil6007, CC BY-SA 4.0, via Wikimedia Commons"
  },
  areaArabianRanches: {
    file: 'areas/arabian-ranches.jpg',
    alt: "Fairways and palm trees on the Arabian Ranches golf course",
    caption: "Photo: JSPhotography2016, CC BY-SA 4.0, via Wikimedia Commons"
  },
  areaDubaiHills: {
    file: 'areas/dubai-hills.jpg',
    alt: "Lakeside fairway with the Dubai skyline behind, in the Emirates Hills golf community next to Dubai Hills",
    caption: "Photo: Sev6nWiki, CC BY-SA 4.0, via Wikimedia Commons"
  },
  areaMirdif: {
    file: 'areas/mirdif.jpg',
    alt: "Aerial view of the low-rise villa streets of Mirdif from a plane on approach to Dubai airport",
    caption: "Photo: Subhashish Panigrahi, CC BY-SA 4.0, via Wikimedia Commons"
  },
  areaAlBarsha: {
    file: 'areas/al-barsha.jpg',
    alt: "Mall of the Emirates and the Ski Dubai slope with the villas of Al Barsha stretching behind",
    caption: "Photo: giggel, CC BY 3.0, via Wikimedia Commons"
  },
  areaDeira: {
    file: 'areas/deira.jpg',
    alt: "Traditional dhows moored on Dubai Creek in Deira, with the old souk district behind",
    caption: "Photo: Francisco Anzola, CC BY 2.0, via Wikimedia Commons"
  },
  areaDubaiSiliconOasis: {
    file: 'areas/dubai-silicon-oasis.jpg',
    alt: "Mid-rise apartment blocks and palm trees in Dubai Academic City, beside Dubai Silicon Oasis",
    caption: "Photo: Mahmoud Farrag, CC BY 3.0, via Wikimedia Commons"
  },
  // The eighteen areas added on 2026-09-15 (fourteen from Commons, four reusing site photos).
  areaJlt: {
    file: 'areas/jlt.jpg',
    alt: "Jumeirah Lake Towers park with the cluster towers rising behind it",
    caption: "Photo: Guilhem Vellut, CC BY 2.0, via Wikimedia Commons"
  },
  areaJbr: {
    file: 'areas/jbr.jpg',
    alt: "The Jumeirah Beach Residence towers seen from the beach",
    caption: "Photo: pe-sa, CC BY 3.0, via Wikimedia Commons"
  },
  areaAlQuoz: {
    file: 'areas/al-quoz.jpg',
    alt: "Warehouse units converted to galleries along Alserkal Avenue in Al Quoz",
    caption: "Photo: Fuzheado, CC0, via Wikimedia Commons"
  },
  areaMotorCity: {
    file: 'areas/motor-city.jpg',
    alt: "Night aerial view of the Motor City community around the Dubai Autodrome",
    caption: "Photo: \u0623\u0645\u064a\u0646 \u0639\u0644\u0648\u0627\u0646, CC BY-SA 4.0, via Wikimedia Commons"
  },
  areaSportsCity: {
    file: 'areas/sports-city.jpg',
    alt: "Inside the Dubai International Stadium in Dubai Sports City",
    caption: "Photo: Dave Morton, Public domain, via Wikimedia Commons"
  },
  areaDip: {
    file: 'areas/dip.jpg',
    alt: "Low-rise apartment blocks and trees in Green Community, Dubai Investment Park",
    caption: "Photo: Syed Ali, CC BY 2.0, via Wikimedia Commons"
  },
  areaDiscoveryGardens: {
    file: 'areas/discovery-gardens.jpg',
    alt: "Aerial view of the low-rise apartment clusters of Discovery Gardens",
    caption: "Photo: Imre Solt, CC BY-SA 3.0, via Wikimedia Commons"
  },
  areaInternationalCity: {
    file: 'areas/international-city.jpg',
    alt: "Inside Dragon Mart, the shopping centre beside International City",
    caption: "Photo: Shahzad Ali, CC BY-SA 3.0, via Wikimedia Commons"
  },
  areaAlNahda: {
    file: 'areas/al-nahda.jpg',
    alt: "Mid-rise apartment buildings along Amman Street in Al Nahda",
    caption: "Photo: Bin Al Stroker, CC BY 3.0, via Wikimedia Commons"
  },
  areaBurDubai: {
    file: 'areas/bur-dubai.jpg',
    alt: "The covered arcade of the Grand Souq in Bur Dubai",
    caption: "Photo: Jpbowen, CC BY-SA 4.0, via Wikimedia Commons"
  },
  areaKarama: {
    file: 'areas/karama.jpg',
    alt: "Low-rise apartment blocks and palm trees on a Karama street",
    caption: "Photo: Vicharam, CC BY-SA 4.0, via Wikimedia Commons"
  },
  areaDubaiCreekHarbour: {
    file: 'areas/dubai-creek-harbour.jpg',
    alt: "The Dubai Creek Harbour sign on the waterfront with the Downtown skyline behind",
    caption: "Photo: Essam2K6, CC BY-SA 4.0, via Wikimedia Commons"
  },
  areaAlWarqa: {
    file: 'areas/al-warqa.jpg',
    alt: "A villa street in Al Warqa 2",
    caption: "Photo: Bin Al Stroker, CC BY 3.0, via Wikimedia Commons"
  },
  areaTheSprings: {
    file: 'areas/the-springs.jpg',
    alt: "Aerial view of the villas and lakes of The Meadows in Emirates Living",
    caption: "Photo: Earthwitness, CC BY 3.0, via Wikimedia Commons"
  }
} satisfies Record<string, Photo>;

type PhotoKey = keyof typeof photos;

// "Same-Day Pickup.jpg" is a photo of a parcel locker, not a junk collection,
// so it is deliberately not uploaded; same-day-junk-removal keeps its
// placeholder until a suitable photo is supplied.

/** Site settings > Images (the keys of lib/images.js siteImages). */
const siteSlots: Record<string, PhotoKey> = {
  crewLoadingSofa: 'crewSofa',
  crewOnSite: 'crewTruck',
  clearanceApartments: 'apartment',
  clearanceVillas: 'villa',
  clearanceOffices: 'officeStripOut',
  clearanceCommercial: 'crewStreet',
  beforeRoom: 'before',
  afterRoom: 'after'
};

/** Services.image by slug. Reusing a photo attaches the same Media document. */
const serviceSlots: Record<string, PhotoKey> = {
  'junk-removal': 'before',
  'garbage-removal': 'garbageBins',
  'furniture-removal': 'furniture',
  'sofa-removal': 'crewSofa',
  'appliance-disposal': 'appliance',
  'waste-removal': 'wasteTruck',
  'garden-waste-removal': 'garden',
  'house-clearance': 'houseVilla',
  'villa-clearance': 'villa',
  'residential-junk-removal': 'residential',
  'commercial-junk-removal': 'officeStripOut'
};

/** Areas.image by slug. */
const areaSlots: Record<string, PhotoKey> = {
  'dubai-marina': 'areaDubaiMarina',
  'palm-jumeirah': 'areaPalmJumeirah',
  'downtown-dubai': 'areaDowntownDubai',
  'business-bay': 'areaBusinessBay',
  'jumeirah': 'areaJumeirah',
  'arabian-ranches': 'areaArabianRanches',
  'dubai-hills': 'areaDubaiHills',
  'mirdif': 'areaMirdif',
  'al-barsha': 'areaAlBarsha',
  'deira': 'areaDeira',
  'dubai-silicon-oasis': 'areaDubaiSiliconOasis',
  // No usable Commons photo of JVC exists; the crew shot in a tower apartment stands in.
  'jvc': 'towerFlat',
  'jlt': 'areaJlt',
  'jbr': 'areaJbr',
  'al-quoz': 'areaAlQuoz',
  'motor-city': 'areaMotorCity',
  'sports-city': 'areaSportsCity',
  'dip': 'areaDip',
  'discovery-gardens': 'areaDiscoveryGardens',
  'international-city': 'areaInternationalCity',
  'al-nahda': 'areaAlNahda',
  'bur-dubai': 'areaBurDubai',
  'karama': 'areaKarama',
  'dubai-creek-harbour': 'areaDubaiCreekHarbour',
  'al-warqa': 'areaAlWarqa',
  'the-springs': 'areaTheSprings',
  // No usable Commons photo of these four; the site's own crew photos stand in.
  'al-furjan': 'after',
  'damac-hills': 'houseVilla',
  'jumeirah-golf-estates': 'garden',
  'town-square': 'residential'
};

/** The filename Payload will store for an upload (mirrors Media's beforeOperation hook, which sees only the basename). */
const storedName = (filePath: string) => {
  const file = path.basename(filePath);
  const dot = file.lastIndexOf('.');
  const stem = dot > 0 ? file.slice(0, dot) : file;
  const ext = dot > 0 ? file.slice(dot + 1).toLowerCase() : '';
  const slug = slugify(stem) || 'image';
  return ext ? slug + '.' + ext : slug;
};

/** A relationship value may be an id or a populated document. */
const relId = (value: unknown) => (value && typeof value === 'object' ? (value as AnyDoc).id : value) ?? null;

const tally = (results: string[]) => {
  const counts: Record<string, number> = {};
  for (const r of results) counts[r] = (counts[r] || 0) + 1;
  return Object.entries(counts)
    .map(([k, v]) => v + ' ' + k)
    .join(', ');
};

const run = async () => {
  const missing = Object.values(photos)
    .map((p) => p.file)
    .filter((file) => !fs.existsSync(path.join(IMAGES_DIR, file)));
  if (missing.length) {
    console.error('Missing in public/images/: ' + missing.join(', '));
    process.exit(1);
  }

  const payload = await getPayload({ config });
  const api = payload as AnyDoc;

  // ------------------------------------------------------------------ media
  const { docs: existingMedia } = await api.find({ collection: 'media', pagination: false, depth: 0, overrideAccess: true });
  const mediaByFilename = new Map<string, AnyDoc>((existingMedia as AnyDoc[]).map((d) => [d.filename, d]));
  const expectedNames = new Set(Object.values(photos).map((p) => storedName(p.file)));

  /**
   * Payload appends "-1", "-2", … when the name it wants is already taken,
   * which happens on every --reupload (the old file is still there when the
   * new name is chosen). So "jlt.jpg" may be stored as "jlt-1.jpg". Accept
   * that, but never let a suffixed match steal another photo's exact name
   * ("apartment-clearance-2.jpg" is its own photo, not a copy of
   * "apartment-clearance.jpg").
   */
  const findMedia = (filename: string) => {
    const exact = mediaByFilename.get(filename);
    if (exact) return exact;
    const dot = filename.lastIndexOf('.');
    const suffixed = new RegExp('^' + filename.slice(0, dot).replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '-\\d+' + filename.slice(dot).replace('.', '\\.') + '$');
    for (const [name, doc] of mediaByFilename) if (suffixed.test(name) && !expectedNames.has(name)) return doc;
    return undefined;
  };

  // Documents are identified by the `seedKey` this script writes; the filename
  // fallback only exists for documents uploaded before that field was added.
  const mediaBySeedKey = new Map<string, AnyDoc>((existingMedia as AnyDoc[]).filter((d) => d.seedKey).map((d) => [d.seedKey, d]));

  const mediaId: Partial<Record<PhotoKey, any>> = {};
  const mediaResults: string[] = [];
  for (const [key, photo] of Object.entries(photos) as [PhotoKey, Photo][]) {
    const found = mediaBySeedKey.get(key) || findMedia(storedName(photo.file));
    if (found) {
      mediaId[key] = found.id;
      const tagged = found.seedKey === key;
      if (REUPLOAD) {
        // Same document, new file: Payload replaces the stored file and sizes
        // through whichever storage adapter is active now.
        await api.update({
          collection: 'media',
          id: found.id,
          data: { alt: photo.alt, caption: photo.caption || null, seedKey: key },
          filePath: path.join(IMAGES_DIR, photo.file),
          overrideAccess: true
        });
        mediaResults.push('re-uploaded');
      } else if (!tagged || (UPDATE && (found.alt !== photo.alt || (found.caption || '') !== (photo.caption || '')))) {
        const data: AnyDoc = { seedKey: key };
        if (UPDATE) Object.assign(data, { alt: photo.alt, caption: photo.caption || null });
        await api.update({ collection: 'media', id: found.id, data, overrideAccess: true });
        mediaResults.push(tagged ? 'alt/caption updated' : 'tagged');
      } else {
        mediaResults.push('existing');
      }
      continue;
    }
    const doc = (await api.create({
      collection: 'media',
      data: { alt: photo.alt, caption: photo.caption, seedKey: key },
      filePath: path.join(IMAGES_DIR, photo.file)
    })) as AnyDoc;
    mediaId[key] = doc.id;
    mediaByFilename.set(doc.filename, doc);
    mediaResults.push('uploaded');
  }
  console.log('Media:    ' + tally(mediaResults));

  // ---------------------------------------------------------- site settings
  const settings = (await api.findGlobal({ slug: 'site-settings', depth: 0, overrideAccess: true })) as AnyDoc;
  const currentSite = settings.siteImages || {};
  const siteImages: AnyDoc = {};
  const siteResults: string[] = [];
  for (const [slot, key] of Object.entries(siteSlots)) {
    const current = relId(currentSite[slot]);
    if (current && !UPDATE) {
      siteResults.push('kept');
      continue;
    }
    if (current === mediaId[key]) {
      siteResults.push('unchanged');
      continue;
    }
    siteImages[slot] = mediaId[key];
    siteResults.push(current ? 'replaced' : 'filled');
  }
  if (Object.keys(siteImages).length) {
    await api.updateGlobal({ slug: 'site-settings', data: { siteImages }, overrideAccess: true });
  }
  console.log('Settings: ' + tally(siteResults));

  // --------------------------------------------------------- services/areas
  const attach = async (collection: 'services' | 'areas', slots: Record<string, PhotoKey>) => {
    const { docs } = await api.find({ collection, pagination: false, depth: 0, draft: true, overrideAccess: true });
    const bySlug = new Map<string, AnyDoc>((docs as AnyDoc[]).map((d) => [d.slug, d]));
    const results: string[] = [];
    for (const [slug, key] of Object.entries(slots)) {
      const doc = bySlug.get(slug);
      if (!doc) {
        results.push('no document');
        console.warn('  ' + collection + '/' + slug + ' does not exist — run `npm run seed` first');
        continue;
      }
      const current = relId(doc.image);
      if (current && !UPDATE) {
        results.push('kept');
        continue;
      }
      if (current === mediaId[key]) {
        results.push('unchanged');
        continue;
      }
      await api.update({ collection, id: doc.id, data: { image: mediaId[key] }, overrideAccess: true });
      results.push(current ? 'replaced' : 'filled');
    }
    return results;
  };

  console.log('Services: ' + tally(await attach('services', serviceSlots)));
  console.log('Areas:    ' + (Object.keys(areaSlots).length ? tally(await attach('areas', areaSlots)) : 'no area photos supplied'));

  const storage = process.env.BLOB_READ_WRITE_TOKEN ? 'Vercel Blob' : 'local media/ (not visible to a deployed site)';
  console.log('Storage:  ' + storage);
  console.log('Still without a photo: same-day-junk-removal.');
};

// `payload run` exits once the module finishes evaluating, so the work must
// be awaited at top level (as seed.ts does).
await run();
process.exit(0);
