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
  "accepted-versus-excluded-guide": {
    src: BLOB + 'accepted-versus-excluded-guide.webp',
    width: 1526,
    height: 1024,
    alt: "A clean architectural comparison diagram showing generic line-art items of accepted household furniture and appliances on the left against excluded hazardous chemicals and gas cylinders on the right."
  },
  "article-garage-clearance-dubai-body": {
    src: BLOB + 'garage-clearance-dubai-body.png',
    width: 1672,
    height: 940,
    alt: "Separate groups of garage belongings and materials needing special handling"
  },
  "article-garden-furniture-disposal-dubai-body": {
    src: BLOB + 'garden-furniture-disposal-dubai-body.png',
    width: 1672,
    height: 941,
    alt: "Outdoor furniture, branches, pots and cushions kept in separate groups"
  },
  "article-storage-room-clearance-dubai-body": {
    src: BLOB + 'storage-room-clearance-dubai-body.png',
    width: 1672,
    height: 941,
    alt: "Four sorting zones for belongings from a storage room"
  },
  "article-storage-room-clearance-dubai-cover": {
    src: BLOB + 'storage-room-clearance-dubai-cover.png',
    og: BLOB + 'storage-room-clearance-dubai-cover-1200x630.png',
    width: 1672,
    height: 941,
    alt: "Shelves, boxes, a rolled rug and a worn table in a sunlit storage room."
  },
  "before-crew-arrives-cover": {
    src: BLOB + 'before-crew-arrives-cover.webp',
    og: BLOB + 'before-crew-arrives-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "Boxes, an old chair, a small appliance and a rolled rug grouped beside a clear path to an open apartment door."
  },
  "bulky-item-tower-cover": {
    src: BLOB + 'bulky-item-tower-cover.webp',
    og: BLOB + 'bulky-item-tower-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A large wrapped cabinet on a trolley beside an open padded service lift in an apartment tower corridor."
  },
  "choosing-provider-cover": {
    src: BLOB + 'choosing-provider-cover.webp',
    og: BLOB + 'choosing-provider-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "Three blank provider folders and a checklist beside a photographed household load and generic removal vehicles."
  },
  "cost-factors-breakdown": {
    src: BLOB + 'cost-factors-breakdown.webp',
    width: 1526,
    height: 1024,
    alt: "A clean architectural infographic diagram illustrating the key variables of a clearance quote including vehicle volume, access distance, elevator availability, furniture dismantling, crew labor, and municipal disposal."
  },
  "crew-arrival-route-plan": {
    src: BLOB + 'crew-arrival-route-plan.webp',
    width: 1536,
    height: 1024,
    alt: "A top-down apartment plan with removal items grouped away from a clear route through open doors to the lift."
  },
  "cut-palm-fronds-on-the-ground": {
    src: BLOB + 'cut-palm-fronds-on-the-ground.webp',
    og: BLOB + 'cut-palm-fronds-on-the-ground-1200x630.webp',
    width: 2400,
    height: 1350,
    alt: "A dense pile of cut palm fronds, green fading to yellow at the cut ends."
  },
  "deposit-deductions-cover": {
    src: BLOB + 'deposit-deductions-cover.webp',
    og: BLOB + 'deposit-deductions-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A bright, vacant modern Dubai apartment living room during a move-out handover inspection with an inspection clipboard on a counter in the foreground."
  },
  "empty-room-before-handover": {
    src: BLOB + 'empty-room-before-handover.webp',
    og: BLOB + 'empty-room-before-handover-1200x630.webp',
    width: 2400,
    height: 1350,
    alt: "An empty room with a wooden floor and tall windows, cleared except for a small bracket left on the wall."
  },
  "estate-clearance-cover": {
    src: BLOB + 'estate-clearance-cover.webp',
    og: BLOB + 'estate-clearance-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A calm villa living room with household possessions organised in separate boxes beside a blank inventory notebook."
  },
  "estate-clearance-sorting-plan": {
    src: BLOB + 'estate-clearance-sorting-plan.webp',
    width: 1536,
    height: 1024,
    alt: "A top-down home plan with possessions organised into separate decision groups, a secure document box and a clear exit route."
  },
  "flatpack-condition-comparison": {
    src: BLOB + 'flatpack-condition-comparison.webp',
    width: 1536,
    height: 1024,
    alt: "An intact cabinet, reusable flat-pack panels and damaged swollen panels arranged in separate condition groups with organised hardware."
  },
  "flatpack-furniture-cover": {
    src: BLOB + 'flatpack-furniture-cover.webp',
    og: BLOB + 'flatpack-furniture-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "Flat-pack wardrobe panels and hardware arranged safely on a bedroom floor beside an intact cabinet and clear doorway."
  },
  "fridge-disposal-cover": {
    src: BLOB + 'fridge-disposal-cover.webp',
    og: BLOB + 'fridge-disposal-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "An empty refrigerator prepared for collection beside a clear kitchen doorway in a Dubai apartment."
  },
  "fridge-removal-route-plan": {
    src: BLOB + 'fridge-removal-route-plan.webp',
    width: 1536,
    height: 1024,
    alt: "A top-down apartment plan showing an empty refrigerator following a protected route through measured doorways to a service lift."
  },
  "garage-clearance-dubai-cover": {
    src: BLOB + 'garage-clearance-dubai-cover.png',
    og: BLOB + 'garage-clearance-dubai-cover-1200x630.png',
    width: 1672,
    height: 941,
    alt: "Bicycles, shelves, cartons and worn chairs gathered in a sunlit garage."
  },
  "garden-furniture-disposal-dubai-cover": {
    src: BLOB + 'garden-furniture-disposal-dubai-cover.png',
    og: BLOB + 'garden-furniture-disposal-dubai-cover-1200x630.png',
    width: 1672,
    height: 941,
    alt: "Weathered outdoor chairs and a table beside stacked cushions and empty pots on a patio."
  },
  "gated-community-access-plan": {
    src: BLOB + 'gated-community-access-plan.webp',
    width: 1536,
    height: 1024,
    alt: "A top-down villa and community access plan showing a clear route from grouped household items through the gate to a collection vehicle."
  },
  "gated-community-clearance-cover": {
    src: BLOB + 'gated-community-clearance-cover.webp',
    og: BLOB + 'gated-community-clearance-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A modern villa with an open gate, clear driveway and grouped household items inside the property boundary."
  },
  "handover-inspection-comparison": {
    src: BLOB + 'handover-inspection-comparison.webp',
    width: 1536,
    height: 1024,
    alt: "A side-by-side comparison diagram showing a fully cleared apartment achieving a full deposit refund versus an apartment with abandoned furniture incurring landlord contractor deductions and dispute delays."
  },
  "inspection-handover-checklist-plan": {
    src: BLOB + 'inspection-handover-checklist-plan.webp',
    width: 1536,
    height: 1024,
    alt: "A side-by-side comparison diagram showing a fully cleared property passing inspection without deductions versus common overlooked spots like balcony storage and curtain fixtures."
  },
  "it-equipment-disposal-cover": {
    src: BLOB + 'it-equipment-disposal-cover.webp',
    og: BLOB + 'it-equipment-disposal-cover-1200x630.webp',
    width: 1672,
    height: 941,
    alt: "Neatly grouped decommissioned office computers, monitors and server equipment staged along a clear hallway in a modern Dubai commercial office."
  },
  "it-equipment-sorting-workflow": {
    src: BLOB + 'it-equipment-sorting-workflow.webp',
    width: 1536,
    height: 1024,
    alt: "An isometric diagram separating office IT equipment into data-cleared hardware, recyclable components, and isolated battery and power units beside a loading bay route."
  },
  "junk-removal-cost-cover": {
    src: BLOB + 'junk-removal-cost-cover.webp',
    og: BLOB + 'junk-removal-cost-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A bright, elegant Dubai apartment living room counter with an inventory clipboard and smartphone resting in the foreground with neatly grouped furniture in the background."
  },
  "landlord-inspection-clearance-cover": {
    src: BLOB + 'landlord-inspection-clearance-cover.webp',
    og: BLOB + 'landlord-inspection-clearance-cover-1200x630.webp',
    width: 1672,
    height: 941,
    alt: "A spotless, completely cleared Dubai rental apartment living room prepared for the final landlord handover walkthrough and key return."
  },
  "laundry-room-cover": {
    src: BLOB + 'laundry-room-cover-final.webp',
    og: BLOB + 'laundry-room-cover-final-1200x630.webp',
    width: 2400,
    height: 1350,
    alt: "A washer and dryer side by side in a plain utility room, with a sink beside them and hose connections on the wall behind."
  },
  "leaving-dubai-checklist-cover": {
    src: BLOB + 'leaving-dubai-checklist-cover.webp',
    og: BLOB + 'leaving-dubai-checklist-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "An organized moving scene inside a bright Dubai apartment with a checklist notebook on a counter in the foreground and neatly stacked moving boxes in the background."
  },
  "leaving-dubai-timeline-plan": {
    src: BLOB + 'leaving-dubai-timeline-plan.webp',
    width: 1536,
    height: 1024,
    alt: "A horizontal process timeline diagram illustrating the four-week clearance countdown for leaving Dubai, showing sorting, utility disconnection and NOC, junk removal, and handover inspection."
  },
  "mattress-disposal-cover": {
    src: BLOB + 'mattress-disposal-cover.webp',
    og: BLOB + 'mattress-disposal-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A used mattress standing upright beside an open bedroom doorway in a bright apartment."
  },
  "mattress-route-preparation": {
    src: BLOB + 'mattress-route-preparation.webp',
    width: 1536,
    height: 1024,
    alt: "A covered mattress beside a measured doorway and a clear apartment corridor."
  },
  "municipality-bulky-waste-cover": {
    src: BLOB + 'municipality-bulky-waste-cover.webp',
    og: BLOB + 'municipality-bulky-waste-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "Household furniture, an appliance and electronics grouped safely inside a villa driveway with a clear vehicle approach."
  },
  "municipality-bulky-waste-process": {
    src: BLOB + 'municipality-bulky-waste-process.webp',
    width: 1536,
    height: 1024,
    alt: "A four-stage top-down preparation sequence showing household bulky items inside a property and a scheduled collection route."
  },
  "noc-clearance-process": {
    src: BLOB + 'noc-clearance-process.webp',
    width: 1536,
    height: 1024,
    alt: "A clean top-down architectural process diagram showing four sequential steps for moving out of an apartment building: Landlord Clearance, Building Move-Out Permit (NOC), Service Lift Reservation, and Loading Bay Access."
  },
  "noc-moving-furniture-cover": {
    src: BLOB + 'noc-moving-furniture-cover.webp',
    og: BLOB + 'noc-moving-furniture-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A modern Dubai apartment building reception desk with a move-out clearance checklist on a clipboard in the foreground and a clear corridor leading to service lifts."
  },
  "office-furniture-cover": {
    src: BLOB + 'office-furniture-cover.webp',
    og: BLOB + 'office-furniture-cover-1200x630.webp',
    width: 1672,
    height: 941,
    alt: "Groups of unbranded desks, task chairs and cabinets in a bright generic office floor with a clear corridor."
  },
  "office-furniture-sorting": {
    src: BLOB + 'office-furniture-sorting.webp',
    width: 1536,
    height: 1024,
    alt: "An isometric office plan separating reusable furniture, metal and wood components, and damaged items beside a clear lift route."
  },
  "office-stripout-cover": {
    src: BLOB + 'office-stripout-cover.webp',
    og: BLOB + 'office-stripout-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A bright office floor with furniture and loose fixtures organised beside a clear central route."
  },
  "office-stripout-phasing-plan": {
    src: BLOB + 'office-stripout-phasing-plan.webp',
    width: 1536,
    height: 1024,
    alt: "A top-down office plan with three organised work zones and clear routes to a protected service lift and loading point."
  },
  "old-furniture-disposal-cover": {
    src: BLOB + 'old-furniture-disposal-cover.webp',
    og: BLOB + 'old-furniture-disposal-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A sofa, chair, cabinet and dismantled shelving grouped safely beside a clear apartment doorway."
  },
  "old-furniture-route-options": {
    src: BLOB + 'old-furniture-route-options.webp',
    width: 1536,
    height: 1024,
    alt: "An old armchair at the centre of four equal visual routes representing reuse, recipient collection, official bulky-waste service and paid collection."
  },
  "old-sofa-delivery-cover": {
    src: BLOB + 'old-sofa-delivery-cover.webp',
    og: BLOB + 'old-sofa-delivery-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "An old beige sofa prepared for removal beside an open apartment doorway and a cleared living-room space."
  },
  "pickup-truck-loaded-with-waste-final": {
    src: BLOB + 'pickup-truck-loaded-with-waste-final.webp',
    og: BLOB + 'pickup-truck-loaded-with-waste-final-1200x630.webp',
    width: 2400,
    height: 1350,
    alt: "A white pickup truck at a kerb, its open bed piled high with tied black rubbish bags."
  },
  "provider-quote-comparison": {
    src: BLOB + 'provider-quote-comparison.webp',
    width: 1536,
    height: 1024,
    alt: "Three equally weighted quote sheets beside a photo inventory and route sketch with matching service icons."
  },
  "renovation-waste-cover": {
    src: BLOB + 'renovation-waste-cover.webp',
    og: BLOB + 'renovation-waste-cover-1200x630.webp',
    width: 1672,
    height: 941,
    alt: "Contained bags of tile debris and stacked offcuts beside a protected route in a generic apartment renovation."
  },
  "renovation-waste-sorting": {
    src: BLOB + 'renovation-waste-sorting.webp',
    width: 1536,
    height: 1024,
    alt: "An isometric apartment plan separating bagged rubble, wood and metal offcuts, and isolated paint and gas containers."
  },
  "service-lift-cover": {
    src: BLOB + 'service-lift-cover.webp',
    og: BLOB + 'service-lift-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "An open padded goods lift in a modern building with an empty flatbed trolley outside."
  },
  "service-lift-protection": {
    src: BLOB + 'service-lift-protection.webp',
    width: 1536,
    height: 1024,
    alt: "A goods lift interior protected with blue wall pads and an empty trolley."
  },
  "skip-direct-load-comparison": {
    src: BLOB + 'skip-direct-load-comparison.webp',
    width: 1536,
    height: 1024,
    alt: "A split top-down property plan comparing repeated loading into a skip with direct loading into a collection vehicle."
  },
  "skip-hire-comparison-cover": {
    src: BLOB + 'skip-hire-comparison-cover.webp',
    og: BLOB + 'skip-hire-comparison-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "An empty skip beside a driveway, separated from a grouped sofa, shelving, mattress, rug and bags ready for collection."
  },
  "sofa-delivery-route": {
    src: BLOB + 'sofa-delivery-route.webp',
    width: 1536,
    height: 1024,
    alt: "A top-down apartment plan showing a sofa route through a measured doorway and corridor to a lift."
  },
  "sofa-doorway-cover": {
    src: BLOB + 'sofa-doorway-cover.webp',
    og: BLOB + 'sofa-doorway-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A large beige corner sofa positioned across a narrow apartment doorway."
  },
  "sofa-route-measurement": {
    src: BLOB + 'sofa-route-measurement.webp',
    width: 1536,
    height: 1024,
    alt: "A top-down illustration of a sofa and doorway route with measuring tapes and turning arrows."
  },
  "tower-route-measurement": {
    src: BLOB + 'tower-route-measurement.webp',
    width: 1536,
    height: 1024,
    alt: "A top-down apartment route with a cabinet, doorways, corridor turns and lift opening marked by measuring tapes."
  },
  "truck-load-capacity-guide": {
    src: BLOB + 'truck-load-capacity-guide.webp',
    width: 1536,
    height: 857,
    alt: "An architectural isometric cutaway diagram of a standard 3-ton clearance truck showing modular volume sections packed with household furniture, appliances, and stacked cartons."
  },
  "truck-load-cover": {
    src: BLOB + 'truck-load-cover.webp',
    og: BLOB + 'truck-load-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A contemporary editorial photograph of a pristine, unbranded white commercial 3-ton covered box truck parked in a clean paved driveway of a modern Dubai residential villa."
  },
  "tv-disposal-cover": {
    src: BLOB + 'tv-disposal-cover.webp',
    og: BLOB + 'tv-disposal-cover-1200x630.webp',
    width: 1672,
    height: 941,
    alt: "An older flat-screen television on a console in a bright, generic apartment living room."
  },
  "tv-disposal-routes": {
    src: BLOB + 'tv-disposal-routes.webp',
    width: 1536,
    height: 1024,
    alt: "An illustration comparing a working TV for reuse, a broken TV for e-waste collection, and a damaged screen protected for handling."
  },
  "villa-clearance-groups": {
    src: BLOB + 'villa-clearance-groups.webp',
    og: BLOB + 'villa-clearance-groups-1200x630.webp',
    width: 1536,
    height: 1024,
    alt: "Household items grouped beside a clear route through a villa to an open patio."
  },
  "villa-handover-cover": {
    src: BLOB + 'villa-handover-cover.webp',
    og: BLOB + 'villa-handover-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A mostly empty villa living room with a small group of household items ready to be removed."
  },
  "wardrobe-dismantling-plan": {
    src: BLOB + 'wardrobe-dismantling-plan.webp',
    width: 1536,
    height: 1024,
    alt: "Wardrobe doors, shelves, rails, panels and hardware arranged in organised groups on a clean floor."
  },
  "wardrobe-removal-cover": {
    src: BLOB + 'wardrobe-removal-cover.webp',
    og: BLOB + 'wardrobe-removal-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A large wooden wardrobe protected with padded corners and wrap beside a clear bedroom doorway."
  },
  "warehouse-clearance-cover": {
    src: BLOB + 'warehouse-clearance-cover.webp',
    og: BLOB + 'warehouse-clearance-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "An organised warehouse with retained stock, a separate clearance zone and an unobstructed route to the loading shutter."
  },
  "warehouse-clearance-zone-plan": {
    src: BLOB + 'warehouse-clearance-zone-plan.webp',
    width: 1536,
    height: 1024,
    alt: "A top-down warehouse plan showing protected stock, an organised clearance staging zone and a broad route to the loading door."
  },
  "weekend-access-schedule-plan": {
    src: BLOB + 'weekend-access-schedule-plan.webp',
    width: 1536,
    height: 1024,
    alt: "A weekend clearance planning diagram showing Saturday and Sunday security office hours, service lift booking windows, and loading bay access checkpoints."
  },
  "weekend-junk-removal-cover": {
    src: BLOB + 'weekend-junk-removal-cover.webp',
    og: BLOB + 'weekend-junk-removal-cover-1200x630.webp',
    width: 1672,
    height: 941,
    alt: "A residential Dubai apartment corridor and open doorway with household items staged neatly for a scheduled weekend clearance."
  },
  "what-we-take-cover": {
    src: BLOB + 'what-we-take-cover.webp',
    og: BLOB + 'what-we-take-cover-1200x630.webp',
    width: 1920,
    height: 1080,
    alt: "A bright, modern Dubai apartment living room with an organized collection of a fabric sofa, stacked moving boxes, and an appliance staged safely beside an open interior doorway."
  }
};

/** Newest first. */
export const filePosts = [
  {
    slug: "shipping-cartons-filling-a-flat-dubai",
    title: "Shipping cartons filling a flat after deliveries",
    excerpt: "Separate boxes that still hold something you are keeping, then book the empty ones with the other junk once they block the rooms you use.",
    publishedAt: "2026-10-31T05:00:05.000Z",
    cover: "before-crew-arrives-cover",
    services: ["junk-removal"],
    seoTitle: "Shipping cartons filling a flat",
    seoDescription: "Name each delivery pile, keep packed goods separate, and book the empty cartons with the other junk.",
    ogTitle: "Delivery cartons filling a lived-in flat",
    ogDescription: "Keep full boxes separate and book the empty ones with the junk."
  },
  {
    slug: "walk-up-stairs-no-lift-dubai",
    title: "Walk-up stairs when there is no service lift",
    excerpt: "Photograph the landings and turns, name the floor, and send the building's answer on the goods lift with the load.",
    publishedAt: "2026-10-31T05:00:00.000Z",
    cover: "weekend-junk-removal-cover",
    services: ["junk-removal"],
    areas: ["al-barsha"],
    seoTitle: "Walk-up stairs with no service lift",
    seoDescription: "Photograph each landing and turn, then book a stair carry where the building has no service lift.",
    ogTitle: "No service lift: plan the stair carry",
    ogDescription: "Show the landings, the turns and the largest piece before you book."
  },
  {
    slug: "bbq-grill-disposal-dubai",
    title: "BBQ grill disposal in Dubai: separate the fuel",
    excerpt: "Identify the grill, detach and retain every gas cylinder, empty cold ash and grease, release fixed connections, and measure the patio-to-vehicle route.",
    publishedAt: "2026-10-30T05:00:05.000Z",
    cover: "garden-furniture-disposal-dubai-cover",
    services: ["garden-waste-removal"],
    seoTitle: "BBQ grill disposal Dubai: separate the fuel",
    seoDescription: "Prepare a BBQ grill, smoker or patio heater for disposal: detach gas cylinders, empty residue, release fixed work and measure the route.",
    ogTitle: "BBQ grill disposal: separate every fuel source",
    ogDescription: "Detach the cylinder, empty the grill and prove the route before collection."
  },
  {
    slug: "trampoline-removal-dubai",
    title: "Trampoline removal in Dubai: fixings and route",
    excerpt: "Photograph the complete structure, confirm permission, identify every anchor, and measure the largest rigid section before on-site dismantling begins.",
    publishedAt: "2026-10-30T05:00:00.000Z",
    cover: "garden-furniture-disposal-dubai-cover",
    services: ["garden-waste-removal"],
    seoTitle: "Trampoline removal Dubai: fixings and route",
    seoDescription: "Prepare a trampoline or outdoor play set for removal: confirm ownership, show anchors, plan dismantling and measure the garden-to-vehicle route.",
    ogTitle: "Trampoline removal: show every fixing",
    ogDescription: "Confirm permission, photograph anchors and measure the route before dismantling."
  },
  {
    slug: "clear-apartment-before-selling-dubai",
    title: "Clear apartment before selling in Dubai: set the date",
    excerpt: "Mark what leaves, what stays and what is on hold, then book building access so collection finishes before the apartment has to be ready.",
    publishedAt: "2026-10-29T05:00:05.000Z",
    cover: "empty-room-before-handover",
    services: ["house-clearance"],
    seoTitle: "Clear apartment before selling in Dubai",
    seoDescription: "Mark what leaves and what stays, then book building access before the apartment must be ready.",
    ogTitle: "Clear an apartment before selling in Dubai",
    ogDescription: "Set the date, mark the inventory and book access before viewings."
  },
  {
    slug: "media-wall-unit-removal-dubai",
    title: "Media wall unit removal in Dubai: check the fixings",
    excerpt: "Name the console or wall unit, separate the television and cables, confirm who owns a wall fixing, and measure the largest rigid section before you ask for collection.",
    publishedAt: "2026-10-29T05:00:00.000Z",
    cover: "tv-disposal-cover",
    services: ["furniture-removal"],
    seoTitle: "Media wall unit removal Dubai: fixings guide",
    seoDescription: "Separate a loose TV console from a wall-fixed unit, then measure the largest section.",
    ogTitle: "Media wall unit removal: check the fixings",
    ogDescription: "Name the unit, separate the screen and measure the largest rigid section."
  },
  {
    slug: "bicycle-removal-dubai",
    title: "Bicycle removal in Dubai: locks, size and route",
    excerpt: "Count each bike, open the lock or show that it is still shut, and measure the handlebars against the door, lift or gate.",
    publishedAt: "2026-10-28T05:00:05.000Z",
    cover: "garage-clearance-dubai-cover",
    services: ["junk-removal"],
    seoTitle: "Bicycle removal Dubai: locks, size and route",
    seoDescription: "List each bicycle, deal with the lock, ask about a motor battery, and measure the handlebars.",
    ogTitle: "Bicycle removal in Dubai: locks and the route",
    ogDescription: "Name each bike, deal with the lock and measure the handlebars."
  },
  {
    slug: "cooker-hood-removal-dubai",
    title: "Cooker hood removal in Dubai: release it safely",
    excerpt: "Photograph the canopy or cupboard unit, confirm who owns it, and separate the cable and duct from the oven before you book collection.",
    publishedAt: "2026-10-28T05:00:00.000Z",
    cover: "fridge-disposal-cover",
    services: ["appliance-disposal"],
    seoTitle: "Cooker hood removal Dubai: release it safely",
    seoDescription: "Identify the hood, isolate a simple plug, leave building ducts alone, and measure the canopy.",
    ogTitle: "Cooker hood removal: release it before collection",
    ogDescription: "Name the hood, separate power and duct, and measure the canopy."
  },
  {
    slug: "downsizing-clearance-dubai",
    title: "Downsizing in Dubai: Clear for a Smaller Home Without Guesswork",
    excerpt: "Measure the smaller home first, inventory every possession, separate moving and removal lists, and work backwards from the final property deadline.",
    publishedAt: "2026-10-27T05:00:10.000Z",
    cover: "leaving-dubai-checklist-cover",
    services: ["house-clearance"],
    seoTitle: "Downsizing in Dubai: Smaller-Home Clearance Plan",
    seoDescription: "Plan a Dubai downsizing clearance: measure the new home, decide what moves, confirm recipient transfers, separate movers from removal and control access.",
    ogTitle: "Downsizing in Dubai: Plan for the Home You Will Have",
    ogDescription: "Measure capacity, separate every destination and clear only the final approved load."
  },
  {
    slug: "decluttering-service-or-junk-removal-dubai",
    title: "Decluttering Service or Junk Removal? Choose the Right Help",
    excerpt: "An organiser helps you decide what stays; a junk removal crew takes away the final outgoing load. Use the right service at the right stage.",
    publishedAt: "2026-10-27T05:00:05.000Z",
    cover: "estate-clearance-cover",
    services: ["junk-removal"],
    seoTitle: "Decluttering Service vs Junk Removal in Dubai",
    seoDescription: "Compare a Dubai decluttering service with junk removal: who helps make decisions, who carries the outgoing load, and when you need both in sequence.",
    ogTitle: "Decluttering Service or Junk Removal?",
    ogDescription: "Choose decision support first and physical removal after the outgoing load is final."
  },
  {
    slug: "treadmill-removal-dubai",
    title: "Treadmill Removal in Dubai: Prepare the Machine and the Route",
    excerpt: "Identify the treadmill, secure the deck and loose parts, measure its largest rigid section, and prove the complete route to the collection vehicle.",
    publishedAt: "2026-10-27T05:00:00.000Z",
    cover: "old-furniture-disposal-cover",
    services: ["junk-removal"],
    seoTitle: "Treadmill Removal Dubai: Machine and Route Guide",
    seoDescription: "Prepare a household treadmill for removal in Dubai: identify the model, secure loose parts, measure the rigid frame and check doors, lifts and loading access.",
    ogTitle: "Treadmill Removal: Prepare the Machine and Route",
    ogDescription: "Identify the exact machine and measure every restriction before it moves."
  },
  {
    slug: "downsizing-clearance-dubai",
    title: "Downsizing in Dubai: Clear for a Smaller Home Without Guesswork",
    excerpt: "Measure the smaller home first, inventory every possession, separate moving and removal lists, and work backwards from the final property deadline.",
    publishedAt: "2026-10-27T05:00:10.000Z",
    cover: "leaving-dubai-checklist-cover",
    services: ["house-clearance"],
    seoTitle: "Downsizing in Dubai: Smaller-Home Clearance Plan",
    seoDescription: "Plan a Dubai downsizing clearance: measure the new home, decide what moves, confirm recipient transfers, separate movers from removal and control access.",
    ogTitle: "Downsizing in Dubai: Plan for the Home You Will Have",
    ogDescription: "Measure capacity, separate every destination and clear only the final approved load."
  },
  {
    slug: "decluttering-service-or-junk-removal-dubai",
    title: "Decluttering Service or Junk Removal? Choose the Right Help",
    excerpt: "An organiser helps you decide what stays; a junk removal crew takes away the final outgoing load. Use the right service at the right stage.",
    publishedAt: "2026-10-27T05:00:05.000Z",
    cover: "estate-clearance-cover",
    services: ["junk-removal"],
    seoTitle: "Decluttering Service vs Junk Removal in Dubai",
    seoDescription: "Compare a Dubai decluttering service with junk removal: who helps make decisions, who carries the outgoing load, and when you need both in sequence.",
    ogTitle: "Decluttering Service or Junk Removal?",
    ogDescription: "Choose decision support first and physical removal after the outgoing load is final."
  },
  {
    slug: "treadmill-removal-dubai",
    title: "Treadmill Removal in Dubai: Prepare the Machine and the Route",
    excerpt: "Identify the treadmill, secure the deck and loose parts, measure its largest rigid section, and prove the complete route to the collection vehicle.",
    publishedAt: "2026-10-27T05:00:00.000Z",
    cover: "old-furniture-disposal-cover",
    services: ["junk-removal"],
    seoTitle: "Treadmill Removal Dubai: Machine and Route Guide",
    seoDescription: "Prepare a household treadmill for removal in Dubai: identify the model, secure loose parts, measure the rigid frame and check doors, lifts and loading access.",
    ogTitle: "Treadmill Removal: Prepare the Machine and Route",
    ogDescription: "Identify the exact machine and measure every restriction before it moves."
  },
  {
    slug: "old-appliance-removal-dubai",
    title: "Old Appliance Removal: Release Every Unit Before Collection",
    excerpt: "List every appliance, confirm ownership, assign disconnection, empty and drain each unit, then coordinate one clear route with replacement deliveries.",
    publishedAt: "2026-10-25T05:00:10.000Z",
    cover: "fridge-disposal-cover",
    services: [
      "appliance-disposal"
    ],
    seoTitle: "Old Appliance Removal Dubai: Multi-Appliance Plan",
    seoDescription: "Plan old-appliance removal in Dubai: confirm ownership, assign safe disconnection, empty and drain every unit, measure routes and coordinate delivery."
  },
  {
    slug: "next-day-junk-removal-dubai",
    title: "Next-Day Junk Removal: Use Tonight to Make Tomorrow Work",
    excerpt: "Confirm the date and deadline, freeze the load, secure building access, prepare awkward items, and give collection a clear window before tomorrow arrives.",
    publishedAt: "2026-10-25T05:00:05.000Z",
    cover: "before-crew-arrives-cover",
    services: [
      "same-day-junk-removal"
    ],
    seoTitle: "Next-Day Junk Removal Dubai: Overnight Checklist",
    seoDescription: "Prepare next-day junk removal in Dubai: confirm availability, freeze the load, secure access, ready appliances and protect the handover deadline."
  },
  {
    slug: "bulky-item-pickup-dubai",
    title: "Bulky-Item Pickup: Show the Object and the Whole Route",
    excerpt: "Name every large item, show its condition, measure the largest rigid part, photograph each route restriction, and confirm the building loading window.",
    publishedAt: "2026-10-25T05:00:00.000Z",
    cover: "old-furniture-disposal-cover",
    services: [
      "junk-removal"
    ],
    seoTitle: "Bulky Item Pickup Dubai: Photo and Route Checklist",
    seoDescription: "Prepare a bulky-item pickup in Dubai with a complete inventory, useful photos, dimensions, route checks, building approval and loading access."
  },
  {
    slug: "office-waste-collection-dubai",
    title: "Office Waste Collection: Define the One-Off Load First",
    excerpt: "Separate a one-off office clearance from routine waste, freeze assets and data decisions, sort the finished load, and confirm the building route before collection.",
    publishedAt: "2026-10-24T05:00:10.000Z",
    cover: "office-furniture-cover",
    services: [
      "commercial-junk-removal"
    ],
    seoTitle: "Office Waste Collection Dubai: Plan a One-Off Load",
    seoDescription: "Plan one-off office waste collection in Dubai: define the load, freeze assets, isolate records and IT, sort materials and confirm building access."
  },
  {
    slug: "apartment-furniture-removal-dubai",
    title: "Apartment Furniture Removal: Build One Lift-Ready Plan",
    excerpt: "Inventory every outgoing piece, settle ownership, dismantle only where needed, measure the largest component, and reserve one clear building route.",
    publishedAt: "2026-10-24T05:00:05.000Z",
    cover: "bulky-item-tower-cover",
    services: [
      "residential-junk-removal"
    ],
    seoTitle: "Apartment Furniture Removal Dubai: Lift-Ready Plan",
    seoDescription: "Plan apartment furniture removal in Dubai: inventory every piece, confirm ownership, measure the largest component and reserve the lift and loading route."
  },
  {
    slug: "l-shaped-sofa-removal-dubai",
    title: "L-Shaped Sofa Removal: Map Every Section and Turn",
    excerpt: "Identify every sofa module, find the intended connections, measure the largest rigid section, and test it against every doorway, turn, lift and loading point.",
    publishedAt: "2026-10-24T05:00:00.000Z",
    cover: "sofa-doorway-cover",
    services: [
      "sofa-removal"
    ],
    seoTitle: "L-Shaped Sofa Removal Dubai: Section and Route Plan",
    seoDescription: "Prepare an L-shaped sofa for removal in Dubai: identify modules and connections, measure the largest section and test every turn, lift and doorway."
  },
  {
    slug: "retail-fit-out-waste-removal-dubai",
    title: "Retail Fit-Out Waste Removal: Release, Sort and Stage Every Load",
    excerpt: "Freeze assets and stock, release fixed items through the right trades, separate each material group, and schedule collection around confirmed building access.",
    publishedAt: "2026-10-23T05:00:10.000Z",
    cover: "office-stripout-cover",
    services: [
      "commercial-junk-removal"
    ],
    seoTitle: "Retail Fit-Out Waste Removal Dubai: Project Plan",
    seoDescription: "Plan retail fit-out waste removal in Dubai: control assets, release fixed items, sort materials, confirm access and sign off every collection phase."
  },
  {
    slug: "bedroom-furniture-removal-dubai",
    title: "Bedroom Furniture Removal: Inventory the Whole Room First",
    excerpt: "Settle ownership, empty every storage space, list the bed and mattress separately, protect mirrors, and measure the largest component against the full route.",
    publishedAt: "2026-10-23T05:00:05.000Z",
    cover: "wardrobe-removal-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "Bedroom Furniture Removal Dubai: Room-by-Room Plan",
    seoDescription: "Prepare bedroom furniture for removal in Dubai: confirm ownership, empty storage, separate beds and mattresses, protect glass and measure the route."
  },
  {
    slug: "villa-garden-waste-removal-dubai",
    title: "Villa Garden Waste Removal: Map Every Zone and Material",
    excerpt: "Finish the garden work, inventory every outdoor zone, separate cuttings from soil and furniture, count the load, and trace each route to the vehicle.",
    publishedAt: "2026-10-23T05:00:00.000Z",
    cover: "garden-furniture-disposal-dubai-cover",
    services: [
      "garden-waste-removal"
    ],
    seoTitle: "Villa Garden Waste Removal Dubai: Map the Full Load",
    seoDescription: "Plan villa garden waste removal in Dubai: map every zone, separate green waste, soil and furniture, count the load and confirm the vehicle route."
  },
  {
    slug: "property-clearance-dubai",
    title: "Property Clearance: Confirm Authority Before Anything Leaves",
    excerpt: "Confirm who can approve the work, inspect and photograph the contents, hold uncertain items, arrange access and quote the whole property before the crew arrives.",
    publishedAt: "2026-10-22T05:00:10.000Z",
    cover: "empty-room-before-handover",
    services: [
      "house-clearance"
    ],
    seoTitle: "Property Clearance Dubai: Authority and Access Plan",
    seoDescription: "Plan a Dubai property clearance for an owner, agent or landlord: confirm authority, record contents, protect uncertain items, arrange access and quote the full scope."
  },
  {
    slug: "office-desk-removal-dubai",
    title: "Office Desk Removal: Clear Drawers, Cables and Ownership First",
    excerpt: "Inventory every desk, empty drawers and lockers, separate screens and cables, check fixed or modular parts, and measure the route before removal.",
    publishedAt: "2026-10-22T05:00:05.000Z",
    cover: "office-stripout-cover",
    services: [
      "commercial-junk-removal"
    ],
    seoTitle: "Office Desk Removal Dubai: Prepare Every Workstation",
    seoDescription: "Prepare office desks for removal in Dubai: inventory workstations, clear drawers, separate IT and cables, check fixed units and plan the building route."
  },
  {
    slug: "hedge-trimming-waste-removal-dubai",
    title: "Hedge Trimming Waste Removal: Separate Stems, Leaves and Sharp Cuttings",
    excerpt: "Separate cutting from collection, split soft leaves from woody and thorny stems, count the finished bags and bundles, and show the full route to the vehicle.",
    publishedAt: "2026-10-22T05:00:00.000Z",
    cover: "cut-palm-fronds-on-the-ground",
    services: [
      "garden-waste-removal"
    ],
    seoTitle: "Hedge Trimming Waste Removal Dubai: Prepare the Load",
    seoDescription: "Prepare hedge trimmings for collection in Dubai: separate stems from leaves, control sharp cuttings, count the finished load and plan the route."
  },
  {
    slug: "school-office-clearance-dubai",
    title: "School Office Clearance: Freeze Assets Before the Closure Window",
    excerpt: "Approve the unwanted inventory, isolate records and IT, protect school access, and clear each office against a controlled asset list during the confirmed window.",
    publishedAt: "2026-10-21T05:00:10.000Z",
    cover: "office-furniture-cover",
    services: [
      "commercial-junk-removal"
    ],
    seoTitle: "School Office Clearance Dubai: Asset and Access Plan",
    seoDescription: "Plan a Dubai school-office clearance by controlling assets, records, IT, fixed items, site access and room-by-room sign-off during a closure window."
  },
  {
    slug: "studio-apartment-clearance-dubai",
    title: "Studio Apartment Clearance: Make Every Item Decision First",
    excerpt: "Protect personal and landlord property, inventory the whole studio, prepare large items and appliances, and reserve one clear route through the building.",
    publishedAt: "2026-10-21T05:00:05.000Z",
    cover: "before-crew-arrives-cover",
    services: [
      "house-clearance"
    ],
    seoTitle: "Studio Apartment Clearance Dubai: A One-Room Plan",
    seoDescription: "Plan a Dubai studio-apartment clearance with ownership checks, a complete inventory, appliance preparation, building access and handover sequencing."
  },
  {
    slug: "grass-clippings-disposal-dubai",
    title: "Grass Clippings Disposal: Count the Finished Bags, Not the Lawn",
    excerpt: "Separate mowing from collection, disclose wet clippings, keep soil and chemicals out, and quote the finished bags with the full garden-to-vehicle route.",
    publishedAt: "2026-10-21T05:00:00.000Z",
    cover: "cut-palm-fronds-on-the-ground",
    services: [
      "garden-waste-removal"
    ],
    seoTitle: "Grass Clippings Disposal Dubai: Prepare the Load",
    seoDescription: "Prepare grass clippings for collection in Dubai: count the finished bags, disclose moisture, separate mixed materials and show the route to the vehicle."
  },
  {
    slug: "office-relocation-junk-removal-dubai",
    title: "Office Relocation Junk Removal: Keep the Move and Clearance Separate",
    excerpt: "Approve the unwanted load separately from relocation stock, protect data and leased assets, and schedule removal around movers, technicians and building access.",
    publishedAt: "2026-10-20T05:00:10.000Z",
    cover: "office-furniture-cover",
    services: [
      "commercial-junk-removal"
    ],
    seoTitle: "Office Relocation Junk Removal Dubai: Clearance Plan",
    seoDescription: "Plan junk removal during a Dubai office relocation by separating move stock, assets, data, furniture and specialist items before the handover window."
  },
  {
    slug: "villa-storage-clearance-dubai",
    title: "Villa Storage Clearance: Inventory Every Store Before Loading",
    excerpt: "Map every storage zone, settle ownership, isolate personal and specialist items, and clear the villa in a sequence that keeps retained belongings protected.",
    publishedAt: "2026-10-20T05:00:05.000Z",
    cover: "article-storage-room-clearance-dubai-cover",
    services: [
      "villa-clearance"
    ],
    seoTitle: "Villa Storage Clearance Dubai: A Zone-by-Zone Plan",
    seoDescription: "Plan a Dubai villa storage clearance by mapping every store, confirming ownership, sorting specialist materials and controlling the route zone by zone."
  },
  {
    slug: "tree-branch-removal-dubai",
    title: "Tree Branch Removal: Quote the Cut Load, Not the Tree",
    excerpt: "Separate cutting from collection, measure the longest pieces, keep soil and chemicals apart, and confirm the complete route from the garden to the vehicle.",
    publishedAt: "2026-10-20T05:00:00.000Z",
    cover: "cut-palm-fronds-on-the-ground",
    services: [
      "garden-waste-removal"
    ],
    seoTitle: "Tree Branch Removal Dubai: Prepare the Cut Load",
    seoDescription: "Prepare cut branches for removal in Dubai: separate tree work from collection, describe the finished load, control sharp pieces and plan the route."
  },
  {
    slug: "restaurant-equipment-removal-dubai",
    title: "Restaurant Equipment Removal: Disconnect, Empty and Plan the Loading Route",
    excerpt: "Settle ownership, food and utility responsibilities before equipment moves, then inventory every appliance and align technical disconnection with the loading window.",
    publishedAt: "2026-10-19T05:00:10.000Z",
    cover: "office-stripout-cover",
    services: [
      "commercial-junk-removal"
    ],
    seoTitle: "Restaurant Equipment Removal Dubai: A Clearance Plan",
    seoDescription: "Plan restaurant equipment removal in Dubai: verify ownership, empty stock and liquids, arrange safe disconnection, measure the route and coordinate loading."
  },
  {
    slug: "majlis-clearance-dubai",
    title: "Majlis Clearance: Protect Personal Items and Plan Every Large Piece",
    excerpt: "Confirm ownership, protect significant belongings, inventory seating, rugs, tables and electronics, and measure the complete route before the majlis is cleared.",
    publishedAt: "2026-10-19T05:00:05.000Z",
    cover: "villa-handover-cover",
    services: [
      "villa-clearance"
    ],
    seoTitle: "Majlis Clearance Dubai: Inventory, Ownership and Access",
    seoDescription: "Plan a Dubai majlis clearance by confirming ownership, protecting personal items, inventorying seating and rugs, and measuring the route for large pieces."
  },
  {
    slug: "landscaping-waste-removal-dubai",
    title: "Landscaping Waste Removal: Sort the Finished Load Before Collection",
    excerpt: "Separate cut greenery, branches, soil, pots, hardware and chemicals, then count the finished groups and confirm how they travel from the garden to the vehicle.",
    publishedAt: "2026-10-19T05:00:00.000Z",
    cover: "garden-furniture-disposal-dubai-cover",
    services: [
      "garden-waste-removal"
    ],
    seoTitle: "Landscaping Waste Removal Dubai: Sort and Plan the Load",
    seoDescription: "Plan landscaping waste removal in Dubai by separating branches, greenery, soil, pots and hardware, controlling access and describing the finished load."
  },
  {
    slug: "shop-clearance-dubai",
    title: "Closing or Refitting a Shop? Plan the Clearance by Asset and Access",
    excerpt: "Separate stock, landlord fixtures, business assets, electronics and approved disposal before the last trading day, then align the work with the building's access window.",
    publishedAt: "2026-10-18T05:00:10.000Z",
    updatedAt: "2026-10-19T05:00:20.000Z",
    cover: "office-stripout-cover",
    services: [
      "commercial-junk-removal"
    ],
    seoTitle: "Shop Clearance Dubai: Stock, Fixtures and Access Plan",
    seoDescription: "Plan a Dubai shop clearance by separating stock, assets, data-bearing equipment and fixed fit-out, then confirming mall access, loading and handover timing."
  },
  {
    slug: "maids-room-clearance-dubai",
    title: "Clearing a Maid's Room: Consent, Ownership and a Complete Inventory",
    excerpt: "Protect personal belongings first, confirm what belongs to the occupant or property, inventory furniture and appliances, and include the room in the wider clearance plan.",
    publishedAt: "2026-10-18T05:00:05.000Z",
    cover: "villa-handover-cover",
    services: [
      "villa-clearance"
    ],
    seoTitle: "Maid's Room Clearance Dubai: Ownership and Inventory Guide",
    seoDescription: "Plan a maid's-room clearance in Dubai with consent, ownership checks, a complete inventory, furniture and appliance preparation, access and handover timing."
  },
  {
    slug: "furniture-dismantling-dubai",
    title: "Should You Dismantle Furniture Before Collection?",
    excerpt: "Inspect the construction, measure the largest parts and agree who dismantles before removing screws. Disposal and reuse need different preparation.",
    publishedAt: "2026-10-18T05:00:00.000Z",
    cover: "flatpack-furniture-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "Furniture Dismantling Dubai: What to Check Before Collection",
    seoDescription: "When to dismantle furniture before collection in Dubai: check ownership, construction, damage, route dimensions, loose parts and the provider's scope."
  },
  {
    slug: "dishwasher-removal-dubai",
    title: "Dishwasher Removal: Disconnect, Drain and Protect the Kitchen",
    excerpt: "Identify every connection before the machine moves. Isolate the power and water, control retained drain water, release cabinet fixings and plan the route out.",
    publishedAt: "2026-10-17T05:00:10.000Z",
    cover: "laundry-room-cover",
    services: [
      "appliance-disposal"
    ],
    seoTitle: "Dishwasher Removal Dubai: Disconnect, Drain and Collect",
    seoDescription: "How to remove an old dishwasher in Dubai: confirm ownership, arrange safe disconnection, manage retained water, release cabinet fixings and book collection."
  },
  {
    slug: "oven-removal-dubai",
    title: "Old Oven to Remove? Separate Disconnection From Collection",
    excerpt: "Built-in, freestanding, electric and gas ovens need different preparation. Confirm ownership, arrange the right disconnection and show the route before collection.",
    publishedAt: "2026-10-17T05:00:05.000Z",
    cover: "before-crew-arrives-cover",
    services: [
      "appliance-disposal"
    ],
    seoTitle: "Oven Removal Dubai: Built-In, Electric and Gas Cookers",
    seoDescription: "How to remove an old oven in Dubai: identify built-in, electric or gas connections, arrange safe disconnection, clear the route and choose collection."
  },
  {
    slug: "freezer-disposal-dubai",
    title: "Freezer Disposal: Empty, Defrost, Dry, Then Collect",
    excerpt: "Plan the food first, allow time for all the ice to melt, contain the water and show the collector whether the freezer is upright, chest or built in.",
    publishedAt: "2026-10-17T05:00:00.000Z",
    cover: "fridge-disposal-cover",
    services: [
      "appliance-disposal"
    ],
    seoTitle: "Freezer Disposal Dubai: Empty, Defrost, Then Collect",
    seoDescription: "How to dispose of a freezer in Dubai: plan the food, defrost and dry it, check water connections, measure the route and choose a collection option."
  },
  {
    slug: "armchair-removal-dubai",
    title: "Wingback, Recliner or Swivel? Getting an Old Armchair Out",
    excerpt: "An armchair's arms, back and any recliner mechanism decide how it leaves. Close and unplug it, measure its widest point and choose a route before you book a collection.",
    publishedAt: "2026-10-16T05:00:10.000Z",
    cover: "before-crew-arrives-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "Armchair Removal Dubai: Recliners and Wingbacks",
    seoDescription: "How to remove an old armchair in Dubai: close and unplug recliners, measure the widest point, check reuse realistically and choose a collection route."
  },
  {
    slug: "dining-table-removal-dubai",
    title: "Glass, Stone or Wood? How a Dining Table Leaves the Apartment",
    excerpt: "The top decides the job: wood can be unbolted, glass lifts off a frame and stone needs careful support. Count the chairs, measure the longest piece and pick a route.",
    publishedAt: "2026-10-16T05:00:05.000Z",
    cover: "old-furniture-disposal-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "Dining Table Removal Dubai: Glass, Marble, Wood",
    seoDescription: "How to remove an old dining table in Dubai: handle glass and stone tops, extension leaves and chairs, measure the route and choose a collection route."
  },
  {
    slug: "dryer-disposal-dubai",
    title: "Getting Rid of a Tumble Dryer: Unplug, Empty, Unstack, Collect",
    excerpt: "Check the dryer is yours to remove, empty any water, deal with the vent hose or stacking kit, then send photos of the machine and the route out of the laundry space.",
    publishedAt: "2026-10-16T05:00:00.000Z",
    cover: "laundry-room-cover",
    services: [
      "appliance-disposal"
    ],
    seoTitle: "Dryer Disposal Dubai: Vented, Condenser and Stacked Dryers",
    seoDescription: "How to dispose of an old tumble dryer in Dubai: check ownership, empty the water tank, handle vent hoses and stacked units, and choose a collection route."
  },
  {
    slug: "water-heater-removal-dubai",
    title: "Taking Out an Old Water Heater: Ownership, Draining and Collection",
    excerpt: "Confirm the heater is yours to remove, have a qualified technician disconnect and drain it, then book collection with photos of the unit and the route out.",
    publishedAt: "2026-10-15T19:36:05.444Z",
    updatedAt: "2026-10-15T19:36:05.447Z",
    cover: "laundry-room-cover",
    services: [
      "appliance-disposal"
    ],
    seoTitle: "Water Heater Removal Dubai: Drain, Then Collect",
    seoDescription: "How to remove an old water heater in Dubai: check landlord ownership, arrange disconnection and draining, plan the route out and choose a disposal route."
  },
  {
    slug: "sofa-bed-removal-dubai",
    title: "Sofa Bed Removal in Dubai: Secure the Mechanism Before It Moves",
    excerpt: "A sofa bed hides a heavy folding frame. Identify the type, strap the mechanism shut, check inside for lost items and measure it closed before asking for collection.",
    publishedAt: "2026-10-15T19:36:01.628Z",
    updatedAt: "2026-10-15T19:36:01.631Z",
    cover: "old-sofa-delivery-cover",
    services: [
      "sofa-removal"
    ],
    seoTitle: "Sofa Bed Removal Dubai: Secure the Mechanism",
    seoDescription: "How to remove a sofa bed in Dubai: secure the pull-out mechanism, decide on the mattress, measure it closed, choose a route and plan lift or stair access."
  },
  {
    slug: "carpet-disposal-dubai",
    title: "Old Carpet or Rug to Clear? Roll It, Check It, Then Book the Route",
    excerpt: "A loose rug can be rolled and collected; a fitted carpet has to be lifted first. Check who owns it, its condition and whether the roll fits your lift before booking.",
    publishedAt: "2026-10-15T19:35:57.275Z",
    updatedAt: "2026-10-15T19:35:57.296Z",
    cover: "before-crew-arrives-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "Carpet Disposal Dubai: Rugs, Fitted Carpet, Underlay",
    seoDescription: "How to dispose of an old carpet or rug in Dubai: roll and tie it, handle fitted carpet, underlay and gripper strips, and check the lift route before collection."
  },
  {
    slug: "broken-furniture-disposal-dubai",
    title: "Broken Furniture in Dubai: When It Can't Be Reused, Plan the Removal",
    excerpt: "Snapped frames, swollen board and cracked glass rule out reuse. Make the piece safe, keep it indoors, describe the damage honestly and book a route that can carry it.",
    publishedAt: "2026-10-13T20:56:22.563Z",
    updatedAt: "2026-10-13T20:56:22.568Z",
    cover: "old-furniture-disposal-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "Broken Furniture Disposal Dubai: Safe Handling and Removal",
    seoDescription: "How to dispose of broken furniture in Dubai: when damage rules out reuse, making unsafe pieces safe, keeping it away from the bins, and what to send for a quote."
  },
  {
    slug: "townhouse-clearance-dubai",
    title: "Townhouse Clearance: Start at the Top Floor, Plan Around the Stairs",
    excerpt: "Clear a townhouse from the top floor down: measure the stair turns, find space to stage items, separate special materials and send photos of every level.",
    publishedAt: "2026-10-13T20:56:19.165Z",
    updatedAt: "2026-10-13T20:56:19.170Z",
    cover: "gated-community-clearance-cover",
    services: [
      "villa-clearance"
    ],
    seoTitle: "Townhouse Clearance Dubai: Plan Floor by Floor",
    seoDescription: "How to clear a Dubai townhouse: work top-down, measure the staircase, stage items without blocking neighbours, and choose house or villa clearance scope."
  },
  {
    slug: "bed-frame-disposal-dubai",
    title: "Old Bed Frame to Get Rid Of? Strip It Down or Take It Whole",
    excerpt: "A bed frame usually leaves in parts: rails, slats, headboard and fixings. Identify the type, check it against the doorway and choose a route before the new bed arrives.",
    publishedAt: "2026-10-13T20:56:15.798Z",
    updatedAt: "2026-10-13T20:56:15.803Z",
    cover: "flatpack-furniture-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "Bed Frame Disposal Dubai: Divans and Storage Beds",
    seoDescription: "How to get rid of an old bed frame in Dubai: identify divans, storage and metal frames, measure the route, choose a disposal route and plan tower or villa access."
  },
  {
    slug: "packing-material-disposal-dubai",
    title: "Packing Material After a Move: Sort It Before You Book a Pickup",
    excerpt: "Flattened, dry cartons can follow your building's recycling route; foam, film, wet cardboard and crates need separating, and a full room of boxes is a collection job.",
    publishedAt: "2026-10-12T20:56:12.425Z",
    updatedAt: "2026-10-31T05:00:00.000Z",
    cover: "leaving-dubai-checklist-cover",
    services: [
      "junk-removal"
    ],
    seoTitle: "Packing Material Disposal Dubai: Moving Boxes and Cardboard",
    seoDescription: "How to dispose of packing material after a move in Dubai: sort cardboard, foam and crates, use the building route, and book cardboard removal for large piles."
  },
  {
    slug: "childrens-room-clearance-dubai",
    title: "Clearing a Child's Room in Dubai: Keepsakes First, Furniture Second",
    excerpt: "Sort keepsakes and devices before anything goes, check cots and bunk beds before offering them on, then photograph the whole room and route for one accurate collection quote.",
    publishedAt: "2026-10-12T20:56:08.577Z",
    updatedAt: "2026-10-12T20:56:08.582Z",
    cover: "estate-clearance-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "Children's Room Clearance Dubai: Cots, Bunk Beds and Toys",
    seoDescription: "How to clear a child's room in Dubai: separate keepsakes, judge cots and bunks for reuse, sort toys and batteries safely, and plan the tower or villa route."
  },
  {
    slug: "balcony-clearance-dubai",
    title: "Balcony Clearance in Dubai: What Leaves, What Stays, How It Gets Out",
    excerpt: "Sort furniture, pots, packaging and hazardous items into separate groups, check what belongs to the property, and plan the indoor and building route before booking a pickup.",
    publishedAt: "2026-10-12T20:56:05.047Z",
    updatedAt: "2026-10-12T20:56:05.052Z",
    cover: "garden-furniture-disposal-dubai-cover",
    services: [
      "residential-junk-removal"
    ],
    seoTitle: "Balcony Clearance Dubai: What Leaves, What Stays",
    seoDescription: "How to clear a balcony in Dubai: sort outdoor furniture, pots and packaging, keep gas cylinders and chemicals separate, and plan lift access before collection."
  },
  {
    slug: "garden-furniture-disposal-dubai",
    title: "Garden Furniture Disposal in Dubai: What to Keep Separate",
    excerpt: "Assess an old outdoor set, separate furniture from garden trimmings and heavy pots, then plan a collection that fits the property and deadline.",
    publishedAt: "2026-10-10T16:40:18.080Z",
    updatedAt: "2026-10-19T05:00:20.000Z",
    cover: "garden-furniture-disposal-dubai-cover",
    services: [
      "garden-waste-removal"
    ],
    seoTitle: "Garden Furniture Disposal Dubai: What to Separate",
    seoDescription: "How to dispose of old garden furniture in Dubai: decide whether to pass it on, separate furniture from green waste, and coordinate collection across villas and towers."
  },
  {
    slug: "garage-clearance-dubai",
    title: "Garage Clearance in Dubai: Sort Mixed Contents Before Collection",
    excerpt: "Plan a villa garage clear-out around what stays, heavy and awkward items, chemicals that need another route, and access for loading.",
    publishedAt: "2026-10-10T16:40:11.931Z",
    updatedAt: "2026-10-14T20:56:48.884Z",
    cover: "garage-clearance-dubai-cover",
    services: [
      "villa-clearance"
    ],
    seoTitle: "Garage Clearance Dubai: Sort Before Collection",
    seoDescription: "How to clear a villa garage in Dubai: sort mixed items, identify restricted chemicals, manage heavy and awkward loads, and coordinate gated community access."
  },
  {
    slug: "storage-room-clearance-dubai",
    title: "Storage Room Clearance in Dubai: Sort It, Quote It, Empty It",
    excerpt: "Empty a packed apartment store without losing what matters: decide what stays, separate special materials, photograph the load and book the tower route.",
    publishedAt: "2026-10-10T16:40:06.193Z",
    updatedAt: "2026-10-15T19:36:11.358Z",
    cover: "article-storage-room-clearance-dubai-cover",
    services: [
      "house-clearance"
    ],
    seoTitle: "Storage Room Clearance Dubai: Sort, Quote, Empty",
    seoDescription: "How to clear an apartment storage room in Dubai: sort keep from collection, handle special materials, photograph for quotes, and manage tower service lift access."
  },
  {
    slug: "pre-ramadan-clear-out-dubai",
    title: "Clearing Out the Home Before Ramadan: Make Room Before the Month Begins",
    excerpt: "Finish the heavy clearing in the weeks before Ramadan: ready the majlis, guest room and kitchen, pass on what others can use, and have bulky items collected with days to spare.",
    publishedAt: "2026-10-09T13:18:48.447Z",
    updatedAt: "2026-10-09T13:18:48.449Z",
    cover: "villa-handover-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "Ramadan Home Clear-Out in Dubai: What to Do Before the Month",
    seoDescription: "A pre-Ramadan home clear-out for Dubai households: a four-week timeline, making room for guests, passing on usable furniture and booking bulky collections in time.",
    ogTitle: "Clearing Out the Home Before Ramadan",
    ogDescription: "A timeline for readying hosting spaces and clearing bulky items before the month begins."
  },
  {
    slug: "seasonal-clear-out-dubai",
    title: "A Seasonal Clear-Out in Dubai: Set the Collection Date, Then Sort",
    excerpt: "A spring-cleaning clear-out finishes when it has a fixed end. Book the collection day first, sort each space into clear groups, and have everything leave in one visit.",
    publishedAt: "2026-10-09T13:18:43.762Z",
    updatedAt: "2026-10-14T20:56:32.889Z",
    cover: "estate-clearance-cover",
    services: [
      "junk-removal"
    ],
    seoTitle: "Seasonal Clear-Out in Dubai: Set the Date First",
    seoDescription: "Plan a spring-cleaning clearance in Dubai: pick the moment, set the collection date, sort storage rooms, garages and wardrobes, and separate items that need another route.",
    ogTitle: "A Seasonal Clear-Out That Actually Finishes",
    ogDescription: "Set the collection date first, then work backwards through every space."
  },
  {
    slug: "decluttering-small-dubai-apartment",
    title: "Decluttering a Small Dubai Apartment: Start With What Takes Up Floor Space",
    excerpt: "In a small flat, a few unused pieces of furniture cost more room than every drawer combined. Clear them first, set up four exits for everything else, then work room by room.",
    publishedAt: "2026-10-09T13:18:38.008Z",
    updatedAt: "2026-10-10T16:40:25.607Z",
    cover: "what-we-take-cover",
    services: [
      "residential-junk-removal"
    ],
    seoTitle: "Decluttering Tips for a Small Dubai Apartment",
    seoDescription: "Practical decluttering tips for a small Dubai apartment: what to clear first, four exits for every item, room-by-room steps and how bulky pieces leave the tower.",
    ogTitle: "Decluttering a Small Dubai Apartment",
    ogDescription: "Clear the big unused pieces first, then give every item an exit."
  },
  {
    slug: "landlord-inspection-clearance-dubai",
    title: "Landlord Inspection Clearance in Dubai: Passing Handover Without Deductions",
    excerpt: "Pass your Dubai landlord move-out inspection without deposit cuts: clear hidden items, remove tenant alterations, coordinate key handover and document the final walkthrough.",
    publishedAt: "2026-10-07T20:19:10.995Z",
    updatedAt: "2026-10-07T20:19:11.002Z",
    cover: "landlord-inspection-clearance-cover",
    services: [
      "house-clearance"
    ],
    seoTitle: "Landlord Inspection Clearance Dubai: Move-Out Handover Guide",
    seoDescription: "How to pass your Dubai landlord move-out inspection: what must be removed, avoiding deposit deductions, documentation tips and scheduling same-day clearance before handover."
  },
  {
    slug: "weekend-junk-removal-dubai",
    title: "Weekend Junk Removal in Dubai: Booking, Building Access and Timing",
    excerpt: "Planning a Saturday or Sunday junk collection in Dubai? How weekend security approvals, service lift hours, noise rules and crew scheduling actually work across towers and villas.",
    publishedAt: "2026-10-07T20:19:06.615Z",
    updatedAt: "2026-10-07T20:19:06.620Z",
    cover: "weekend-junk-removal-cover",
    services: [
      "same-day-junk-removal"
    ],
    seoTitle: "Weekend Junk Removal Dubai: Saturday & Sunday",
    seoDescription: "How weekend junk removal in Dubai works: book Saturday or Sunday slots, secure building security approval, manage service lift hours and clear your home without delays."
  },
  {
    slug: "it-equipment-disposal-dubai",
    title: "Old Office IT Equipment Disposal in Dubai: Practical and Responsible Steps",
    excerpt: "A practical guide to clearing office computers, servers and electronics in Dubai: separate data-bearing drives, arrange building permissions and coordinate e-waste collection.",
    publishedAt: "2026-10-07T20:19:01.760Z",
    updatedAt: "2026-10-07T20:19:01.795Z",
    cover: "it-equipment-disposal-cover",
    services: [
      "commercial-junk-removal"
    ],
    seoTitle: "IT Equipment Disposal Dubai: Computers & E-Waste",
    seoDescription: "How to dispose of office IT equipment in Dubai: data-security boundaries, separating electronics, arranging building loading bay access and compliant e-waste removal."
  },
  {
    slug: "renovation-waste-removal-dubai",
    title: "Renovation Waste in Dubai: Clearing As You Go",
    excerpt: "Plan renovation debris collection around your project: separate rubble and offcuts, isolate excluded materials, protect the building route and schedule pickups.",
    publishedAt: "2026-10-07T13:28:03.166Z",
    updatedAt: "2026-10-07T13:28:03.171Z",
    cover: "renovation-waste-cover",
    services: [
      "waste-removal"
    ],
    seoTitle: "Renovation Waste Removal Dubai: Plan Each Load",
    seoDescription: "How to arrange renovation waste removal in Dubai: describe the debris, separate exclusions, plan lift access and collect at useful project stages."
  },
  {
    slug: "office-furniture-removal-dubai",
    title: "What Happens to Old Office Furniture in Dubai",
    excerpt: "Plan office furniture removal by inventory, condition, reuse potential and building access. Keep confidential material and IT devices in their own workstream.",
    publishedAt: "2026-10-07T13:27:59.603Z",
    updatedAt: "2026-10-07T20:19:17.722Z",
    cover: "office-furniture-cover",
    services: [
      "commercial-junk-removal"
    ],
    seoTitle: "Office Furniture Removal Dubai: Sorting and Access",
    seoDescription: "A practical office furniture clearance plan for Dubai: inventory desks and chairs, separate reusable items, book building access and isolate IT."
  },
  {
    slug: "tv-disposal-dubai",
    title: "Old TV Disposal in Dubai: Where Screens Actually Go",
    excerpt: "A practical route for working and broken TVs in Dubai: test for reuse, protect the screen, arrange building access and choose an electronics collection option.",
    publishedAt: "2026-10-07T13:27:55.739Z",
    updatedAt: "2026-10-07T13:27:55.761Z",
    cover: "tv-disposal-cover",
    services: [
      "appliance-disposal"
    ],
    seoTitle: "TV Disposal in Dubai: Reuse, E-Waste and Collection",
    seoDescription: "How to dispose of a TV in Dubai: reuse a working screen, use designated electronics routes for broken sets, and plan safe building pickup."
  },
  {
    slug: "garden-waste-bins-dubai",
    title: "Garden Waste in Dubai: What the Bins Won't Take",
    excerpt: "Community bins in Dubai are not designed for garden waste. Learn why branches, fronds, soil and heavy pots are rejected, and how to arrange proper collection for your landscaping waste.",
    publishedAt: "2026-10-06T16:45:44.245Z",
    updatedAt: "2026-10-10T16:40:45.517Z",
    cover: "cut-palm-fronds-on-the-ground",
    services: [
      "garden-waste-removal"
    ],
    seoTitle: "Garden Waste in Dubai: What Bins Will Not Take",
    seoDescription: "Why Dubai residential bins reject garden waste: restrictions on branches, palm fronds, soil, and pots, municipal rules, and how to arrange legal green waste collection.",
    ogDescription: "Why community bins reject garden and landscaping waste, and how to dispose of green waste legally in Dubai."
  },
  {
    slug: "what-happens-to-your-junk-dubai",
    title: "What Actually Happens to Your Junk After We Take It",
    excerpt: "Follow the journey of cleared junk in Dubai: sorting for reuse, materials recovery for metals and cardboard, licensed e-waste handling and legal disposal at municipal facilities.",
    publishedAt: "2026-10-06T16:45:39.268Z",
    updatedAt: "2026-10-06T16:45:39.271Z",
    cover: "what-we-take-cover",
    services: [
      "junk-removal"
    ],
    seoTitle: "Where Does Junk Go After Removal in Dubai? The Full Journey",
    seoDescription: "What happens to junk after collection in Dubai: sorting for reuse, scrap metal and cardboard recycling, e-waste handling, and legal municipal transfer stations.",
    ogDescription: "The real journey of collected junk in Dubai from on-site segregation to licensed recycling and municipal transfer."
  },
  {
    slug: "donate-furniture-dubai",
    title: "Where to Donate Furniture in Dubai: What Can Be Passed On",
    excerpt: "Donating furniture in Dubai works when items are clean, sturdy and collected on time. Learn what organisations need, when collection is offered and what to do if donation is not an option.",
    publishedAt: "2026-10-06T16:45:33.617Z",
    updatedAt: "2026-10-06T16:45:33.627Z",
    cover: "old-furniture-disposal-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "Donate Furniture in Dubai: What Can Be Passed On",
    seoDescription: "How to donate furniture in Dubai: what charities and recipients accept, why damaged pieces are rejected, collection logistics and removal options.",
    ogDescription: "What recipients accept, how collection works and what to do when donation is not an option."
  },
  {
    slug: "soil-sand-pots-disposal-dubai",
    title: "Soil, Sand and Pots: The Garden Waste People Forget to Plan For",
    excerpt: "Bagged soil and empty pots go with a normal garden load. Loose soil, sand and full planters are heavy, so photograph them first and the right crew and truck can be confirmed.",
    publishedAt: "2026-10-05T15:11:08.451Z",
    updatedAt: "2026-10-06T16:46:00.538Z",
    cover: "villa-clearance-groups",
    services: [
      "garden-waste-removal"
    ],
    seoTitle: "Soil Removal in Dubai: Sand, Soil Bags and Plant Pots",
    seoDescription: "How to get soil, sand and plant pots removed in Dubai: bagged versus loose material, full planters, balcony and villa gardens, and what to photograph for a quote.",
    ogTitle: "Soil, Sand and Pots: Plan the Heavy Garden Waste",
    ogDescription: "Bag what you can, empty what you can, and show the real volume before booking."
  },
  {
    slug: "how-long-villa-clearance-dubai",
    title: "How Long Does a Villa Clearance Actually Take?",
    excerpt: "A full villa clearance is planned as half a day to two days, with four or more crew and several loads. Volume, carry route, garden material and preparation decide which.",
    publishedAt: "2026-10-05T15:11:03.483Z",
    updatedAt: "2026-10-10T16:40:34.733Z",
    cover: "truck-load-cover",
    services: [
      "villa-clearance"
    ],
    seoTitle: "How Long Does a Villa Clearance Take in Dubai?",
    seoDescription: "How long a Dubai villa clearance takes: the half-day to two-day range, what moves a job between them, and how to plan backwards from a handover date.",
    ogDescription: "What decides whether your villa clears in one day or two, and how to keep the plan on time."
  },
  {
    slug: "out-of-hours-clearance-dubai",
    title: "Why Offices Book Clearances for Nights and Weekends",
    excerpt: "An evening or weekend clearance keeps lifts, corridors and loading bays free of staff and visitors. It works when the building approves the window and the load is ready.",
    publishedAt: "2026-10-05T15:10:57.880Z",
    updatedAt: "2026-10-05T15:10:57.895Z",
    cover: "office-stripout-cover",
    services: [
      "commercial-junk-removal"
    ],
    seoTitle: "Out of Hours Clearance in Dubai: Nights and Weekends",
    seoDescription: "When an out-of-hours office, shop or warehouse clearance makes sense in Dubai, what the building must approve, and how to prepare so the window is spent loading.",
    ogDescription: "Agree the window with the building, prepare the floor and keep the route clear."
  },
  {
    slug: "junk-removal-cost-dubai",
    title: "What Junk Removal Costs in Dubai: Pricing Factors and How Quotes Work",
    excerpt: "Understand what determines junk removal costs in Dubai: volume, access, lift availability, dismantling, and municipal fees. Learn how transparent photo quotes eliminate surprise charges.",
    publishedAt: "2026-10-04T07:43:33.264Z",
    updatedAt: "2026-10-04T07:43:33.265Z",
    cover: "junk-removal-cost-cover",
    services: [
      "junk-removal"
    ],
    seoTitle: "Junk Removal Cost Dubai: What Changes the Quote",
    seoDescription: "What drives junk removal costs in Dubai: truck volume, access, floor level, dismantling, and municipal disposal fees. How fixed upfront photo quotes work.",
    ogTitle: "What Junk Removal Actually Costs in Dubai",
    ogDescription: "Learn the verified variables that determine junk removal costs in Dubai and how transparent upfront photo quoting works."
  },
  {
    slug: "how-much-fits-in-one-load-dubai",
    title: "How Much Fits in One Load? Estimating Junk Removal Truck Space in Dubai",
    excerpt: "Wondering how much fits in a Dubai junk removal truck? Learn how standard 3-ton trucks are loaded, volume fractions from single items to full loads, and how to estimate your space.",
    publishedAt: "2026-10-04T07:43:29.851Z",
    updatedAt: "2026-10-04T07:43:29.852Z",
    cover: "truck-load-cover",
    services: [
      "junk-removal"
    ],
    seoTitle: "How Much Fits in One Junk Load in Dubai",
    seoDescription: "How much junk fits in a standard Dubai removal truck: 3-ton capacity, volume fractions, apartment vs villa loads, and how professional packing maximizes space.",
    ogTitle: "How Much Actually Fits in One Load?",
    ogDescription: "Understand 3-ton truck volume fractions, packing methods, and how to estimate your clearance load in Dubai."
  },
  {
    slug: "what-we-take-dubai",
    title: "What We Take, What We Don’t, and Why: Dubai Junk Removal Acceptance Guide",
    excerpt: "Understand what Dubai junk removal crews can take, what hazardous items are strictly excluded by law, and how mixed household and commercial loads are handled.",
    publishedAt: "2026-10-04T07:43:25.274Z",
    updatedAt: "2026-10-04T07:43:25.284Z",
    cover: "what-we-take-cover",
    services: [
      "junk-removal"
    ],
    seoTitle: "What We Take in Dubai: Accepted Items & Exclusions",
    seoDescription: "Clear guide to what Dubai junk removal companies take: furniture, white goods, electronics, garden waste, plus strictly excluded hazardous materials.",
    ogTitle: "What We Take, What We Don’t, and Why",
    ogDescription: "Check what Dubai junk removal crews take, what hazardous materials are excluded, and how mixed loads are handled."
  },
  {
    slug: "leaving-dubai-clearance-checklist",
    title: "Leaving Dubai: The Clearance Part of the Checklist",
    excerpt: "Relocating from Dubai? Clearance delays and leftover furniture risk security deposits. Here is a practical four-week clearance timeline working back from your handover day.",
    publishedAt: "2026-10-03T17:30:28.684Z",
    updatedAt: "2026-10-03T17:30:28.688Z",
    cover: "leaving-dubai-checklist-cover",
    services: [
      "house-clearance"
    ],
    seoTitle: "Moving Out of Dubai Checklist: The Clearance Timeline",
    seoDescription: "The clearance countdown for moving out of Dubai: sorting belongings, booking building NOCs, DEWA final disconnection, furniture removal, and handover inspection.",
    ogDescription: "Plan your clearance before moving out of Dubai: 4-week timeline, building NOCs, DEWA disconnection, and passing final tenancy inspection."
  },
  {
    slug: "deposit-deductions-left-furniture-dubai",
    title: "Can a Landlord Deduct Your Deposit for Furniture You Left Behind?",
    excerpt: "Leaving furniture behind in a rented Dubai home allows landlords to deduct removal costs from your deposit. Learn what Dubai tenancy law says and how to protect your money.",
    publishedAt: "2026-10-03T17:30:25.173Z",
    updatedAt: "2026-10-07T20:19:28.651Z",
    cover: "deposit-deductions-cover",
    services: [
      "house-clearance"
    ],
    seoTitle: "Can Landlord Deduct Deposit for Left Furniture Dubai?",
    seoDescription: "What Dubai tenancy law says about furniture left behind: security deposit deductions, Article 21 handover obligations, contractor costs, and how to clear your home cleanly.",
    ogTitle: "Can a Landlord Deduct Deposit for Furniture Left Behind?",
    ogDescription: "Understand landlord deposit deductions under Dubai tenancy law, contractor disposal charges, and how to hand over a spotless property."
  },
  {
    slug: "noc-moving-furniture-dubai",
    title: "Do You Need an NOC to Move Furniture Out in Dubai?",
    excerpt: "Dubai towers and communities require a move-out permit or NOC before furniture leaves. Here is what building management checks, who applies, and how to avoid gate delays.",
    publishedAt: "2026-10-03T17:30:20.648Z",
    updatedAt: "2026-10-03T17:30:20.660Z",
    cover: "noc-moving-furniture-cover",
    services: [
      "residential-junk-removal"
    ],
    seoTitle: "Do You Need an NOC to Move Furniture in Dubai?",
    seoDescription: "Dubai building NOC and move-out permit rules explained: what building management requires, documents needed, elevator bookings, and how clearance crews operate.",
    ogDescription: "How Dubai building move-out permits and NOCs work, what security checks at the loading bay, and how to clear furniture without delays."
  },
  {
    slug: "old-ac-unit-disposal-dubai",
    title: "Getting Rid of an Old AC Unit in Dubai",
    excerpt: "An old air conditioner holds refrigerant gas. Have a qualified technician disconnect it first, then send the unit through an appliance disposal route.",
    publishedAt: "2026-10-02T13:23:39.932Z",
    updatedAt: "2026-10-02T13:23:39.935Z",
    cover: "fridge-disposal-cover",
    services: [
      "appliance-disposal"
    ],
    seoTitle: "AC Unit Removal in Dubai: Disconnect, Then Dispose",
    seoDescription: "How to remove an old AC unit in Dubai: why refrigerant needs a qualified technician, which disposal routes fit, and how to get the unit out safely.",
    ogDescription: "Deal with the refrigerant first, then plan the route out and the disposal."
  },
  {
    slug: "what-dubai-bins-wont-take",
    title: "What You Can’t Put in a Dubai Bin",
    excerpt: "Dubai bins take general waste and clean recyclables. Furniture, electronics, batteries, chemicals and gas cylinders each have their own Municipality route.",
    publishedAt: "2026-10-02T13:23:35.067Z",
    updatedAt: "2026-10-06T16:45:55.091Z",
    cover: "pickup-truck-loaded-with-waste-final",
    services: [
      "junk-removal"
    ],
    seoTitle: "What You Can’t Throw in Dubai Bins",
    seoDescription: "Dubai Municipality’s Waste Segregation Guide explained: the three-bin system, non-recyclable items and the routes for furniture, e-waste and hazardous items.",
    ogTitle: "What Dubai Bins Won’t Take, and Where It Goes",
    ogDescription: "Sort each item into the right route before it leaves your home."
  },
  {
    slug: "e-waste-disposal-dubai",
    title: "E-Waste Disposal in Dubai: The Rules and the Routes",
    excerpt: "Electronics, batteries and lamps don’t go in Dubai’s household bins. Use a Smart Sustainability Oasis, an approved e-waste company or bulky-waste collection.",
    publishedAt: "2026-10-02T13:23:29.587Z",
    updatedAt: "2026-10-07T13:28:08.305Z",
    cover: "municipality-bulky-waste-cover",
    services: [
      "appliance-disposal"
    ],
    seoTitle: "E-Waste Disposal in Dubai: Rules and Routes",
    seoDescription: "Where Dubai Municipality sends e-waste, batteries and lamps: Smart Sustainability Oasis drop-off, approved e-waste companies and bulky-waste collection.",
    ogTitle: "E-Waste Disposal in Dubai: The Official Routes",
    ogDescription: "Wipe your data, sort the load and match each item to the right route."
  },
  {
    slug: "illegal-dumping-fines-dubai",
    title: "Fines for Dumping Furniture in Dubai: What the Law Says",
    excerpt: "Dubai’s waste law bans leaving waste in public places and caps fines at AED 500,000, doubled for a repeat. Keep bulky items inside until a lawful collection.",
    publishedAt: "2026-10-01T09:56:21.879Z",
    updatedAt: "2026-10-01T09:56:21.884Z",
    cover: "gated-community-clearance-cover",
    services: [
      "junk-removal"
    ],
    seoTitle: "Fines for Dumping Furniture in Dubai: The Law",
    seoDescription: "What Law No. 18 of 2024 says about dumping waste in Dubai public places, how fines are set and the lawful routes for old furniture.",
    ogTitle: "Dumping Furniture in Dubai: The Legal Position",
    ogDescription: "Keep bulky items inside until a lawful collection takes them."
  },
  {
    slug: "free-junk-removal-dubai-truth",
    title: "“Free Junk Removal” in Dubai: What’s Genuinely Free and What Isn’t",
    excerpt: "Dubai Municipality’s bulky-waste service is genuinely free for eligible household items. Donations and private free offers carry conditions worth checking first.",
    publishedAt: "2026-10-01T09:56:17.356Z",
    updatedAt: "2026-10-01T09:58:01.702Z",
    cover: "before-crew-arrives-cover",
    services: [
      "junk-removal"
    ],
    seoTitle: "Free Junk Removal in Dubai: What’s Genuinely Free",
    seoDescription: "Understand Dubai Municipality’s free bulky-waste service, donation and private free offers, their conditions and when paid removal fits better.",
    ogTitle: "What’s Genuinely Free for Junk Removal in Dubai",
    ogDescription: "Check the conditions behind every free route before relying on it."
  },
  {
    slug: "municipality-vs-paid-junk-removal-dubai",
    title: "Free Municipality Collection or a Paid Crew? A Straight Comparison",
    excerpt: "Dubai Municipality’s bulky-waste service is free for eligible addresses. A paid crew fits when you need carrying, a fixed date or a mixed load cleared.",
    publishedAt: "2026-10-01T09:56:11.928Z",
    updatedAt: "2026-10-01T09:56:11.939Z",
    cover: "municipality-bulky-waste-cover",
    services: [
      "junk-removal"
    ],
    seoTitle: "Junk Removal vs Municipality Collection in Dubai",
    seoDescription: "Compare Dubai Municipality’s free bulky-waste collection with a paid junk removal crew on eligibility, carrying, timing, accepted items and cost.",
    ogTitle: "Free Municipality Collection or a Paid Crew?",
    ogDescription: "Match your address, route out, deadline and load to the route that finishes the job."
  },
  {
    slug: "dubai-municipality-bulky-waste",
    title: "How Dubai Municipality Bulky Waste Collection Works",
    excerpt: "Check current address eligibility, list every item and follow the official staging instructions before using Dubai Municipality’s bulky-waste service.",
    publishedAt: "2026-09-30T08:54:29.970Z",
    updatedAt: "2026-10-29T16:00:00.000Z",
    cover: "municipality-bulky-waste-cover",
    services: [
      "junk-removal"
    ],
    seoTitle: "Bulky Waste Collection: Municipality Guide",
    seoDescription: "Bulky waste collection by Dubai Municipality: eligibility, the official application, accepted household items and how to prepare them.",
    ogTitle: "Use Dubai Municipality Bulky-Waste Collection",
    ogDescription: "Verify the address, list the load and follow the current official collection instructions."
  },
  {
    slug: "dispose-fridge-dubai",
    title: "How to Dispose of a Fridge in Dubai",
    excerpt: "Choose an eligible official or paid appliance route, then prepare the refrigerator, connections, doors and complete building path before collection.",
    publishedAt: "2026-09-30T08:54:23.440Z",
    updatedAt: "2026-09-30T08:54:23.444Z",
    cover: "fridge-disposal-cover",
    services: [
      "appliance-disposal"
    ],
    seoTitle: "How to Dispose of a Fridge in Dubai",
    seoDescription: "Plan fridge disposal in Dubai using the official bulky-waste route or paid collection, with checks for preparation, connections, lifts and access.",
    ogTitle: "Prepare a Refrigerator for Collection in Dubai",
    ogDescription: "Verify the route, empty the appliance and plan every doorway before it moves."
  },
  {
    slug: "dispose-old-furniture-dubai",
    title: "How to Dispose of Old Furniture in Dubai",
    excerpt: "Compare repair, confirmed reuse, Dubai Municipality’s eligible bulky-waste service and paid collection before moving old furniture outside.",
    publishedAt: "2026-09-30T08:54:17.344Z",
    updatedAt: "2026-10-14T20:56:54.314Z",
    cover: "old-furniture-disposal-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "How to Dispose of Old Furniture in Dubai",
    seoDescription: "Compare repair, reuse, Dubai Municipality bulky-waste eligibility and paid collection, then prepare furniture and property access safely.",
    ogTitle: "Four Routes for Old Furniture in Dubai",
    ogDescription: "Match condition, address, access and timing to the right disposal route."
  },
  {
    slug: "choosing-junk-removal-dubai",
    title: "How to Choose a Junk Removal Company in Dubai",
    excerpt: "Compare the same complete job across providers: item list, access, labour, vehicle, exclusions, timing and the process for changes.",
    publishedAt: "2026-09-29T09:44:14.043Z",
    updatedAt: "2026-09-29T09:44:14.051Z",
    cover: "choosing-provider-cover",
    services: [
      "junk-removal"
    ],
    seoTitle: "How to Choose a Junk Removal Company in Dubai",
    seoDescription: "Compare junk removal companies in Dubai using one item list and clear checks for identity, access, labour, vehicle capacity, exclusions and timing.",
    ogTitle: "Choose a Junk Removal Company with Clear Evidence",
    ogDescription: "Compare equal scopes and resolve assumptions before the collection vehicle arrives."
  },
  {
    slug: "flatpack-furniture-disposal-dubai",
    title: "Flat-Pack Furniture: Will It Survive Another Move?",
    excerpt: "Inspect panels, joints and hardware before moving flat-pack furniture. Condition and access determine whether it should stay intact, be dismantled or removed.",
    publishedAt: "2026-09-29T09:44:10.209Z",
    updatedAt: "2026-09-29T09:44:10.213Z",
    cover: "flatpack-furniture-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "Flat-Pack Furniture Disposal Dubai: Move or Remove?",
    seoDescription: "Assess flat-pack furniture before disposal or moving in Dubai, including panel condition, joints, hardware, dismantling, storage and access.",
    ogTitle: "Will Flat-Pack Furniture Survive Another Move?",
    ogDescription: "Inspect the panels, joints, hardware and route before deciding how the item should leave."
  },
  {
    slug: "estate-clearance-dubai",
    title: "Clearing a Home After a Bereavement: A Respectful Plan",
    excerpt: "Protect documents and personal items, confirm decision authority and sort the home into clear groups before arranging a respectful estate clearance.",
    publishedAt: "2026-09-29T09:44:06.023Z",
    updatedAt: "2026-09-29T09:44:06.048Z",
    cover: "estate-clearance-cover",
    services: [
      "villa-clearance"
    ],
    seoTitle: "Estate Clearance Dubai: A Respectful Home Plan",
    seoDescription: "Plan an estate clearance in Dubai with clear authority, protected documents, family decision groups, a complete inventory and careful collection.",
    ogTitle: "A Respectful Plan for Clearing a Home",
    ogDescription: "Protect important items, organise decisions and arrange removal only after the scope is clear."
  },
  {
    slug: "gated-community-clearance-dubai",
    title: "Gated Communities: Access, Permits and Timing for a Clearance",
    excerpt: "Confirm the community’s current entry process, approved gate, vehicle restrictions and villa route before arranging a household clearance.",
    publishedAt: "2026-09-28T07:07:45.762Z",
    updatedAt: "2026-09-28T07:07:45.764Z",
    cover: "gated-community-clearance-cover",
    services: [
      "villa-clearance"
    ],
    seoTitle: "Gated Community Clearance Dubai: Access Guide",
    seoDescription: "Plan a gated-community clearance in Dubai with current entry approval, correct gate details, vehicle access, villa routes and realistic timing.",
    ogTitle: "Plan Access for a Gated-Community Clearance",
    ogDescription: "Confirm entry, vehicle and property-route details before the crew is dispatched."
  },
  {
    slug: "warehouse-clearance-dubai",
    title: "Warehouse Clear-Outs: Plan Around Stock and Access",
    excerpt: "Separate live stock from removals, protect warehouse operations and plan staging, traffic and loading access before a large-scale clear-out begins.",
    publishedAt: "2026-09-28T07:07:41.938Z",
    updatedAt: "2026-09-28T07:09:42.600Z",
    cover: "warehouse-clearance-cover",
    services: [
      "commercial-junk-removal"
    ],
    seoTitle: "Warehouse Clearance Dubai: Stock and Access Plan",
    seoDescription: "Plan a Dubai warehouse clearance around live stock, staging zones, traffic controls, loading access, vehicle capacity and documented close-out.",
    ogTitle: "Warehouse Clear-Outs: Protect Stock and Access",
    ogDescription: "Separate ownership, release controlled zones and keep the loading route operational."
  },
  {
    slug: "office-strip-out-dubai",
    title: "Office Strip-Out in Dubai: Clear a Floor Without Disruption",
    excerpt: "Define the end condition, phase the floor and coordinate building access before an office strip-out. A controlled scope protects operations and handover plans.",
    publishedAt: "2026-09-28T07:07:37.588Z",
    updatedAt: "2026-10-07T13:28:13.881Z",
    cover: "office-stripout-cover",
    services: [
      "commercial-junk-removal"
    ],
    seoTitle: "Office Strip-Out Dubai: Planning and Access Guide",
    seoDescription: "Plan an office strip-out in Dubai with a defined scope, phased work zones, building access, service-lift coordination and documented close-out.",
    ogTitle: "Plan an Office Strip-Out Without Disruption",
    ogDescription: "Define the scope, phase the floor and coordinate the building before work begins."
  },
  {
    slug: "skip-hire-vs-junk-removal-dubai",
    title: "Skip Hire or Junk Removal? Choose the Right Setup",
    excerpt: "Compare the full job: material, duration, placement, loading labour, building rules and final cost. Choose the setup that fits the actual project.",
    publishedAt: "2026-09-23T06:12:20.800Z",
    updatedAt: "2026-10-07T13:28:19.469Z",
    cover: "skip-hire-comparison-cover",
    services: [
      "waste-removal"
    ],
    seoTitle: "Skip Hire Alternative Dubai: Compare Junk Removal",
    seoDescription: "Compare skip hire and direct junk removal in Dubai by material, project duration, placement, labour, access, building rules and complete cost.",
    ogTitle: "Skip Hire or Direct Junk Removal?",
    ogDescription: "Compare space, labour, timing and material before choosing a waste-removal setup."
  },
  {
    slug: "before-the-crew-arrives-dubai",
    title: "Before the Junk Removal Crew Arrives: A Practical Checklist",
    excerpt: "Prepare the item list, decisions, access and clear route before collection. This practical checklist helps the crew begin safely and without delay.",
    publishedAt: "2026-09-23T06:12:17.045Z",
    updatedAt: "2026-09-23T06:12:17.047Z",
    cover: "before-crew-arrives-cover",
    services: [
      "junk-removal"
    ],
    seoTitle: "Before Junk Removal Arrives: Dubai Checklist",
    seoDescription: "Prepare for a Dubai junk removal crew with a practical checklist for item decisions, quotes, building access, parking, routes and collection day.",
    ogTitle: "Before the Junk Removal Crew Arrives",
    ogDescription: "Confirm the load, building access and route so collection can begin without delay."
  },
  {
    slug: "wardrobe-removal-dubai",
    title: "Wardrobe Removal in Dubai: Dismantle or Move It Whole?",
    excerpt: "A wardrobe may move whole, in designed sections or as controlled disposal panels. Check its construction, mirrors, route and lift access before collection.",
    publishedAt: "2026-09-23T06:12:12.925Z",
    updatedAt: "2026-09-23T06:12:12.932Z",
    cover: "wardrobe-removal-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "Wardrobe Removal Dubai: Dismantling and Access Guide",
    seoDescription: "Plan wardrobe removal in Dubai with checks for construction, mirrors, dismantling, doorways, service lifts, building access and safe collection.",
    ogTitle: "Wardrobe Removal: Dismantle or Move It Whole?",
    ogDescription: "Check the wardrobe, route, mirrors and access before deciding how it should leave."
  },
  {
    slug: "old-sofa-before-new-delivery-dubai",
    title: "Remove the Old Sofa Before the New One Arrives",
    excerpt: "Separate removal and delivery into a controlled sequence. Confirm the retailer’s scope, clear the route and leave time to clean before the replacement arrives.",
    publishedAt: "2026-09-22T06:09:56.808Z",
    updatedAt: "2026-09-22T06:09:56.811Z",
    cover: "old-sofa-delivery-cover",
    services: [
      "sofa-removal"
    ],
    seoTitle: "Remove an Old Sofa Before New Delivery in Dubai",
    seoDescription: "Plan old-sofa removal before a new delivery in Dubai, including retailer terms, measurements, lift bookings, timing, dismantling and room preparation.",
    ogTitle: "Old Sofa Out Before the New Delivery",
    ogDescription: "Use separate windows for removal, cleaning and delivery so the route stays clear."
  },
  {
    slug: "bulky-items-tower-dubai",
    title: "Getting Bulky Items Out of a Dubai Tower",
    excerpt: "The item, doorway, corridor, service lift and loading bay must work as one route. Measure every restriction and confirm building access before pickup.",
    publishedAt: "2026-09-22T06:09:53.226Z",
    updatedAt: "2026-09-22T06:09:53.229Z",
    cover: "bulky-item-tower-cover",
    services: [
      "residential-junk-removal"
    ],
    seoTitle: "Getting Bulky Items Out of a Dubai Tower",
    seoDescription: "A practical Dubai tower checklist for measuring bulky items, booking the service lift, protecting the route and planning loading-bay access.",
    ogTitle: "Bulky Item in a Tower? Measure the Entire Route",
    ogDescription: "Plan the room, doors, turns, lift and loading bay before the item starts moving."
  },
  {
    slug: "mattress-disposal-dubai",
    title: "Mattress Disposal in Dubai: Plan the Whole Route",
    excerpt: "A mattress needs more than a pickup time. Check reuse, size, wrapping, doorways, lift access and the complete bed set before collection day.",
    publishedAt: "2026-09-22T06:09:49.387Z",
    updatedAt: "2026-10-14T20:56:43.448Z",
    cover: "mattress-disposal-cover",
    services: [
      "furniture-removal"
    ],
    seoTitle: "Mattress Disposal Dubai: Access and Collection Guide",
    seoDescription: "Plan mattress disposal in Dubai with practical checks for reuse, wrapping, doorways, lift booking, bed frames and replacement delivery timing.",
    ogTitle: "Mattress Disposal: Plan the Route Before Pickup",
    ogDescription: "Measure the mattress, clear the route and confirm building access before collection."
  },
  {
    slug: "villa-handover-clearance-dubai",
    title: "Villa Handover: What Has to Be Gone Before Inspection",
    excerpt: "A villa handover needs more than an empty living room. Build a full inventory, settle ownership, clear every storage area and leave time for cleaning and repairs.",
    publishedAt: "2026-09-21T14:14:56.345Z",
    updatedAt: "2026-10-19T05:00:20.000Z",
    cover: "villa-handover-cover",
    services: [
      "villa-clearance"
    ],
    seoTitle: "Villa Handover Clearance Dubai: Room-by-Room Guide",
    seoDescription: "Plan a Dubai villa handover clearance room by room, including ownership checks, appliances, garden waste, access, cleaning and the final inspection.",
    ogTitle: "Villa Handover Clearance: What Must Be Gone",
    ogDescription: "A practical room-by-room plan for clearing a villa before inspection and key return.",
  },
  {
    slug: "service-lift-booking-dubai",
    title: "Service Lift Booking in Dubai Buildings: How It Actually Works",
    excerpt: "The building controls the service lift, while the removal provider plans around the approved window. Here is what to confirm before fixing a collection time.",
    publishedAt: "2026-09-21T14:14:52.347Z",
    updatedAt: "2026-10-31T05:00:00.000Z",
    cover: "service-lift-cover",
    services: [
      "residential-junk-removal"
    ],
    seoTitle: "Service Lift Booking for Junk Removal in Dubai Buildings",
    seoDescription: "How to confirm a service-lift window, building documents, protection rules, loading access and removal timing in a Dubai tower.",
    ogTitle: "How Service Lift Booking Works for Junk Removal",
    ogDescription: "Match building approval, lift access and the collection booking before removal day.",
  },
  {
    slug: "sofa-wont-fit-through-door-dubai",
    title: "Your Sofa Won't Fit Through the Door. Here's What Actually Happens Next",
    excerpt: "A sofa that stops at the doorway needs a route assessment, not more force. Learn what to measure, when sections or feet may come off, and what to send before booking.",
    publishedAt: "2026-09-21T14:14:47.979Z",
    updatedAt: "2026-10-15T19:36:17.371Z",
    cover: "sofa-doorway-cover",
    services: [
      "sofa-removal"
    ],
    seoTitle: "Sofa Won't Fit Through the Door in Dubai? What Happens Next",
    seoDescription: "What to measure when a sofa will not fit through a doorway, how sectional parts and access routes affect removal, and what to send before booking.",
    ogTitle: "Sofa Won't Fit? Plan the Route Before Removal",
    ogDescription: "A practical Dubai guide to sofa dimensions, doorways, turns, lift access and dismantling decisions.",
  },
  {
    slug: "washing-machine-removal-dubai",
    title: "Washing Machine Removal in Dubai: What the Crew Needs to Know First",
    excerpt: "A washing machine is denser than it looks and usually sits in the tightest room in the flat. Here’s what decides the job, and the one thing worth confirming before you book.",
    publishedAt: "2026-09-20T17:19:32.057Z",
    updatedAt: "2026-10-15T19:36:23.181Z",
    cover: "laundry-room-cover",
    services: [
      "appliance-disposal",
      "residential-junk-removal",
      "house-clearance"
    ],
    seoTitle: "Washing Machine Removal in Dubai: What to Check First",
    seoDescription: "Why the room matters more than the machine, the one thing to confirm before booking, and how upper floors without a lift change the job.",
    ogTitle: "Washing Machine Removal in Dubai: What to Check",
    ogDescription: "The room is usually the constraint, not the machine. What decides the job, and the one thing worth confirming before you book.",
  },
  {
    slug: "palm-frond-disposal-dubai",
    title: "What to Do With Palm Fronds in Dubai",
    excerpt: "Fronds are heavy, sharp and awkward to bag, and they pile up fast after a trim. Here’s who does the cutting, who does the removal, and what a garden collection actually takes.",
    publishedAt: "2026-09-20T17:19:32.044Z",
    updatedAt: "2026-09-21T09:08:22.668Z",
    cover: "cut-palm-fronds-on-the-ground",
    services: [
      "garden-waste-removal",
      "villa-clearance",
      "furniture-removal"
    ],
    seoTitle: "Palm Fronds in Dubai: Who Cuts Them, Who Takes Them Away",
    seoDescription: "Cutting and removal are two different jobs. What goes in a green-waste load, how a garden collection runs, and what to send for a fixed quote.",
    ogTitle: "Palm Fronds in Dubai: Who Cuts, Who Clears",
    ogDescription: "A landscaper cuts; a collection takes it away. What goes in a green-waste load and how the pickup actually runs.",
  },
  {
    slug: "junk-gone-today-dubai",
    title: "Need It Gone Today? What’s Actually Possible in Dubai, and By When",
    excerpt: "Same-day depends on whether a crew is already near you with room left on the route. Here’s what decides it, what to send, and what happens when today isn’t possible.",
    publishedAt: "2026-09-20T17:19:32.030Z",
    updatedAt: "2026-10-14T20:56:37.822Z",
    cover: "pickup-truck-loaded-with-waste-final",
    services: [
      "same-day-junk-removal",
      "residential-junk-removal",
      "house-clearance"
    ],
    seoTitle: "Need Junk Gone Today in Dubai? What’s Actually Possible",
    seoDescription: "Same-day depends on routing, not speed. What decides whether today works, what to send for a straight answer, and what happens when it cannot be today.",
    ogTitle: "Need It Gone Today? What’s Actually Possible in Dubai",
    ogDescription: "Same-day is a routing question. What decides it, what to send, and the honest answer when today is not possible.",
  },
  {
    slug: "end-of-tenancy-clearance-dubai",
    title: "End of Tenancy in Dubai: What Has to Be Gone Before Handover",
    excerpt: "Handover day has a fixed time attached, and \"empty\" usually means more than furniture. Here’s what typically has to go, and how to work backwards from the inspection.",
    publishedAt: "2026-09-20T17:19:32.017Z",
    updatedAt: "2026-09-21T09:10:45.185Z",
    cover: "empty-room-before-handover",
    services: [
      "house-clearance",
      "villa-clearance",
      "appliance-disposal"
    ],
    seoTitle: "End of Tenancy Clearance in Dubai: What Has to Be Gone",
    seoDescription: "What has to be cleared before a Dubai handover, what a clearance does and does not cover, and how to work backwards from the inspection time.",
    ogTitle: "End of Tenancy in Dubai: What Has to Be Gone",
    ogDescription: "Handover has a fixed time attached. What typically has to go, what a clearance does not cover, and how to plan backwards from the inspection.",
  }
];
