/**
 * Blog posts published from the repository (see lib/content/file-posts.js).
 *
 * To publish an article: put its body in docs/content-system/articles/{slug}.md,
 * add an entry to `filePosts` below, commit and deploy. No admin or database
 * step. `publishedAt` is an ISO time; use 00:00–23:59 Dubai time (UTC+4) of
 * the intended article date.
 *
 * `fileImages` holds the reusable images, keyed by the name written in the
 * Markdown (`![alt](media:key)`) and in a post's `cover`. Every image is an
 * existing, inspected asset; alt text describes what is visibly there.
 */

const BLOB = 'https://suagnha802rru2gc.public.blob.vercel-storage.com/';

export const fileImages = {
  'before-crew-arrives-cover': {
    src: BLOB + 'before-crew-arrives-cover.webp',
    og: BLOB + 'before-crew-arrives-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: 'Boxes, an old chair, a small appliance and a rolled rug grouped beside a clear path to an open apartment door.'
  },
  'old-furniture-route-options': {
    src: BLOB + 'old-furniture-route-options.webp',
    width: 1536,
    height: 1024,
    alt: 'An old armchair at the centre of four equal visual routes representing reuse, recipient collection, official bulky-waste service and paid collection.'
  },
  'laundry-room-cover': {
    src: BLOB + 'laundry-room-cover-final.webp',
    og: BLOB + 'laundry-room-cover-final-1200x630.webp',
    width: 2400,
    height: 1350,
    alt: 'A washer and dryer side by side in a plain utility room, with a sink beside them and hose connections on the wall behind.'
  },
  'accepted-versus-excluded-guide': {
    src: BLOB + 'accepted-versus-excluded-guide.webp',
    width: 1526,
    height: 1024,
    alt: 'A clean architectural comparison diagram showing generic line-art items of accepted household furniture and appliances on the left against excluded hazardous chemicals and gas cylinders on the right.'
  },
  'old-furniture-disposal-cover': {
    src: BLOB + 'old-furniture-disposal-cover.webp',
    og: BLOB + 'old-furniture-disposal-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: 'A sofa, chair, cabinet and dismantled shelving grouped safely beside a clear apartment doorway.'
  },
  'tower-route-measurement': {
    src: BLOB + 'tower-route-measurement.webp',
    width: 1536,
    height: 1024,
    alt: 'A top-down apartment route with a cabinet, doorways, corridor turns and lift opening marked by measuring tapes.'
  }
};

export const filePosts = [
  {
    slug: 'dryer-disposal-dubai',
    title: 'Getting Rid of a Tumble Dryer: Unplug, Empty, Unstack, Collect',
    excerpt: 'Check the dryer is yours to remove, empty any water, deal with the vent hose or stacking kit, then send photos of the machine and the route out of the laundry space.',
    publishedAt: '2026-10-16T05:00:00.000Z',
    cover: 'laundry-room-cover',
    services: ['appliance-disposal'],
    seoTitle: 'Dryer Disposal Dubai: Vented, Condenser and Stacked Dryers',
    seoDescription: 'How to dispose of an old tumble dryer in Dubai: check ownership, empty the water tank, handle vent hoses and stacked units, and choose a collection route.'
  },
  {
    slug: 'armchair-removal-dubai',
    title: 'Wingback, Recliner or Swivel? Getting an Old Armchair Out',
    excerpt: "An armchair's arms, back and any recliner mechanism decide how it leaves. Close and unplug it, measure its widest point and choose a route before you book a collection.",
    publishedAt: '2026-10-16T05:00:10.000Z',
    cover: 'before-crew-arrives-cover',
    services: ['furniture-removal'],
    seoTitle: 'Armchair Removal Dubai: Recliners, Wingbacks and Accent Chairs',
    seoDescription: 'How to remove an old armchair in Dubai: close and unplug recliners, measure the widest point, check reuse realistically and choose a collection route.'
  },
  {
    slug: 'dining-table-removal-dubai',
    title: 'Glass, Stone or Wood? How a Dining Table Leaves the Apartment',
    excerpt: 'The top decides the job: wood can be unbolted, glass lifts off a frame and stone needs careful support. Count the chairs, measure the longest piece and pick a route.',
    publishedAt: '2026-10-16T05:00:05.000Z',
    cover: 'old-furniture-disposal-cover',
    services: ['furniture-removal'],
    seoTitle: 'Dining Table Removal Dubai: Glass, Marble and Extendable Sets',
    seoDescription: 'How to remove an old dining table in Dubai: handle glass and stone tops, extension leaves and chairs, measure the route and choose a collection route.'
  }
];
