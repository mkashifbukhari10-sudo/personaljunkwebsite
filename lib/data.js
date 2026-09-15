/**
 * Code-owned presentation data. Everything editors should be able to change
 * lives in Payload (plan.md Phase 9); what is left here is decorative or
 * structural copy that belongs with the components that draw it.
 */

/**
 * Homepage explorer groups — presentation only, and deliberately not in the
 * CMS (plan.md Phase 8 decision): order, group blurb and the group image slot.
 *
 * `key` matches the `group` select on the Payload Services collection, which
 * is what decides each service's membership. The `services` list below is only
 * used for a group that no service claims.
 * `image` is the homepage explorer photo for the group (null → placeholder).
 */
export const serviceGroups = [
  { key: 'junk-removal', num: '01', name: 'Junk Removal', services: ['junk-removal'], blurb: 'Everything you no longer need, carried out and taken away in one visit.', typical: 'Bulky items, general junk, single pieces or a full load', crew: '2 to 3 crew with a covered truck', image: null, time: '45 minutes to half a day' },
  { key: 'furniture-sofa', num: '02', name: 'Furniture & Sofa Removal', services: ['furniture-removal', 'sofa-removal'], blurb: 'Sofas, beds, mattresses and wardrobes. Dismantled where needed, heavy lifting handled.', typical: 'Sofas, beds, mattresses, wardrobes, dining sets', crew: '2 crew, tools for dismantling', image: null, time: 'Under an hour for most items' },
  { key: 'appliances', num: '03', name: 'Appliance Disposal', services: ['appliance-disposal'], blurb: 'Fridges, washers, ovens and AC units removed and passed to licensed handlers.', typical: 'Fridges, washers, ovens, TVs, AC units, e-waste', crew: '2 crew, straps and trolley', image: null, time: 'Same visit, 30 to 60 minutes' },
  { key: 'garbage-waste', num: '04', name: 'Garbage & Waste Removal', services: ['garbage-removal', 'waste-removal'], blurb: 'Fast collection when waste piles up, for homes, offices and sites.', typical: 'Household bags, office waste, renovation debris', crew: '2 to 4 crew depending on volume', image: null, time: 'Same-day or recurring schedule' },
  { key: 'garden-waste', num: '05', name: 'Garden Waste Removal', services: ['garden-waste-removal'], blurb: 'Branches, trimmings, soil bags and old outdoor furniture cleared quickly.', typical: 'Trimmings, branches, soil, pots, outdoor sets', crew: '2 crew with open truck', image: null, time: 'One to three hours' },
  { key: 'clearance', num: '06', name: 'House & Villa Clearance', services: ['house-clearance', 'villa-clearance'], blurb: 'From one room to an entire property, including storage, majlis and garden.', typical: 'Full properties, move-outs, handovers, storage rooms', crew: '4 or more crew, multiple loads', image: null, time: 'Half a day to two days' },
  { key: 'same-day', num: '07', name: 'Same-Day Pickup', services: ['same-day-junk-removal'], blurb: 'Need it gone today? Message us in the morning and we will try to reach you the same afternoon.', typical: 'Urgent single items or a full apartment', crew: 'Nearest available crew on route', image: null, time: 'Same afternoon where slots allow' }
];


export const processSteps = [
  { num: '01', title: 'Send a photo', body: 'Show us what needs to go. A photo on WhatsApp tells us the volume, the access and the crew size we need to send.', meta: 'Takes 30 seconds' },
  { num: '02', title: 'Get your price', body: 'A clear quote upfront covering labour, loading and disposal fees. Nothing changes on the day unless the load does.', meta: 'Usually within minutes' },
  { num: '03', title: 'Pickup scheduled', body: 'Choose the best available time. We handle building permissions and service-lift bookings where the tower requires them.', meta: 'Same-day slots available' },
  { num: '04', title: 'We clear it', body: 'Our crew dismantles, carries and loads. Floors, lifts and doorframes are protected while we work.', meta: 'Heavy lifting included' },
  { num: '05', title: 'Space restored', body: 'We sweep the area before we leave. Your property is clear and ready to use, sell or hand over.', meta: 'Nothing left behind' }
];

/**
 * The homepage before/after slider. With the two Site settings photos set,
 * `left`/`width` are only the point along the slider at which each item
 * counts as cleared (they follow the layout of the "before" photo); without
 * them the same entries draw the fallback block illustration.
 */
export const clutterBlocks = [
  { label: 'STORAGE BINS', left: 5, width: 14, height: 22, shade: '#C3C9D2' },
  { label: 'PACKING PAPER', left: 22, width: 14, height: 14, shade: '#CDD3DB' },
  { label: 'CABLES', left: 38, width: 8, height: 10, shade: '#B9C0CA' },
  { label: 'COVERED SOFA', left: 48, width: 20, height: 30, shade: '#C9CFD8' },
  { label: 'BOXES', left: 71, width: 12, height: 24, shade: '#BFC6D0' },
  { label: 'ARMCHAIR', left: 86, width: 9, height: 26, shade: '#C6CCD5' }
];

export const disposalStages = [
  { num: '01', title: 'Collect', body: 'Loaded and logged at your address.' },
  { num: '02', title: 'Sort', body: 'Separated by material at our yard.' },
  { num: '03', title: 'Reuse', body: 'Usable items passed on, not dumped.' },
  { num: '04', title: 'Recycle', body: 'Metal, wood and e-waste to licensed handlers.' },
  { num: '05', title: 'Dispose', body: 'Remainder to approved municipal facilities.', dark: true }
];
