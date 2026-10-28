/**
 * Fills blog related-links when an editor named fewer than two services or
 * no areas. Explicit relationships stay first. Anchors are keyword phrases.
 */

export const SERVICE_ANCHORS = {
  'junk-removal': 'junk removal in Dubai',
  'garbage-removal': 'garbage removal in Dubai',
  'furniture-removal': 'furniture removal in Dubai',
  'sofa-removal': 'sofa removal in Dubai',
  'appliance-disposal': 'appliance disposal in Dubai',
  'waste-removal': 'waste removal in Dubai',
  'garden-waste-removal': 'garden waste removal in Dubai',
  'house-clearance': 'house clearance in Dubai',
  'villa-clearance': 'villa clearance in Dubai',
  'same-day-junk-removal': 'same-day junk removal in Dubai',
  'residential-junk-removal': 'residential junk removal in Dubai',
  'commercial-junk-removal': 'commercial junk removal in Dubai',
  'rubbish-removal': 'rubbish removal in Dubai',
  'mattress-disposal': 'mattress disposal in Dubai',
  'office-clearance': 'office clearance in Dubai',
  'construction-debris-removal': 'construction debris removal in Dubai',
  'e-waste-disposal': 'e-waste disposal in Dubai',
  'move-out-clearance': 'move-out clearance in Dubai',
  'estate-and-warehouse-clearance': 'estate and warehouse clearance in Dubai'
};

export function serviceAnchor(service) {
  return SERVICE_ANCHORS[service.slug] || service.name;
}

export function areaAnchor(area) {
  return 'junk removal in ' + area.name;
}

const RULES = [
  { test: /mattress/, services: ['mattress-disposal', 'furniture-removal', 'house-clearance'], areas: ['dubai-marina', 'jlt', 'downtown-dubai'] },
  { test: /sofa|armchair|l-shaped|sofa-bed/, services: ['sofa-removal', 'furniture-removal', 'same-day-junk-removal'], areas: ['dubai-marina', 'jbr', 'downtown-dubai'] },
  { test: /bed-frame|bedroom-furniture|wardrobe|dining-table|furniture/, services: ['furniture-removal', 'house-clearance', 'junk-removal'], areas: ['jvc', 'dubai-hills', 'dubai-marina'] },
  { test: /washing-machine|fridge|freezer|oven|dishwasher|dryer|appliance|water-heater|ac-unit|air-condition/, services: ['appliance-disposal', 'e-waste-disposal', 'junk-removal'], areas: ['mirdif', 'al-barsha', 'deira'] },
  { test: /e-waste|it-equipment|tv-disposal|television/, services: ['e-waste-disposal', 'appliance-disposal', 'office-clearance'], areas: ['business-bay', 'dubai-silicon-oasis', 'difc'] },
  { test: /palm|garden|soil|hedge|grass|landscap|tree-branch|frond/, services: ['garden-waste-removal', 'villa-clearance', 'rubbish-removal'], areas: ['arabian-ranches', 'palm-jumeirah', 'the-springs'] },
  { test: /office|desk|school-office|strip-out|out-of-hours/, services: ['office-clearance', 'commercial-junk-removal', 'e-waste-disposal'], areas: ['business-bay', 'difc', 'dubai-silicon-oasis'] },
  { test: /warehouse|estate-clearance|shop-clearance|retail-fit/, services: ['estate-and-warehouse-clearance', 'commercial-junk-removal', 'office-clearance'], areas: ['al-quoz', 'dip', 'dubai-south'] },
  { test: /renovation|fit-out|construction|skip-hire|debris/, services: ['construction-debris-removal', 'waste-removal', 'rubbish-removal'], areas: ['al-quoz', 'business-bay', 'al-barsha'] },
  { test: /rubbish|garbage|bins-wont|what-dubai-bins/, services: ['rubbish-removal', 'garbage-removal', 'junk-removal'], areas: ['deira', 'bur-dubai', 'international-city'] },
  { test: /tenancy|move-out|handover|landlord|leaving-dubai|deposit/, services: ['move-out-clearance', 'house-clearance', 'villa-clearance'], areas: ['dubai-marina', 'jvc', 'dubai-hills'] },
  { test: /villa|majlis|maids-room|gated-community|garage-clearance/, services: ['villa-clearance', 'garden-waste-removal', 'move-out-clearance'], areas: ['arabian-ranches', 'palm-jumeirah', 'emirates-hills'] },
  { test: /same-day|junk-gone-today|weekend-junk|next-day/, services: ['same-day-junk-removal', 'junk-removal', 'furniture-removal'], areas: ['downtown-dubai', 'dubai-marina', 'jlt'] },
  { test: /tower|service-lift|bulky-item|noc-moving/, services: ['residential-junk-removal', 'sofa-removal', 'same-day-junk-removal'], areas: ['dubai-marina', 'jlt', 'downtown-dubai'] },
  { test: /townhouse/, services: ['house-clearance', 'furniture-removal', 'garden-waste-removal'], areas: ['dubai-hills', 'the-springs', 'town-square'] },
  { test: /commercial|restaurant/, services: ['commercial-junk-removal', 'office-clearance', 'waste-removal'], areas: ['business-bay', 'deira', 'al-quoz'] }
];

/**
 * @param {{ slug: string, title?: string, excerpt?: string, relatedServices?: string[], relatedAreas?: string[] }} post
 * @returns {{ services: string[], areas: string[] }}
 */
export function inferRelated(post) {
  const hay = [post.slug, post.title, post.excerpt].filter(Boolean).join(' ').toLowerCase();
  const services = [];
  const areas = [];
  const addServices = (list) => {
    for (const slug of list) {
      if (services.length >= 3) return;
      if (!services.includes(slug)) services.push(slug);
    }
  };
  const addAreas = (list) => {
    for (const slug of list) {
      if (areas.length >= 2) return;
      if (!areas.includes(slug)) areas.push(slug);
    }
  };

  const dedicated = [
    [/mattress/, 'mattress-disposal'],
    [/e-waste|it-equipment|tv-disposal/, 'e-waste-disposal'],
    [/warehouse|estate-clearance/, 'estate-and-warehouse-clearance'],
    [/tenancy|move-out|handover|landlord-inspection/, 'move-out-clearance'],
    [/office-strip|office-desk|office-furniture|school-office|out-of-hours/, 'office-clearance'],
    [/renovation|fit-out-waste|debris/, 'construction-debris-removal'],
    [/what-dubai-bins|rubbish/, 'rubbish-removal']
  ];
  for (const [test, slug] of dedicated) {
    if (test.test(hay)) addServices([slug]);
  }
  addServices(post.relatedServices || []);
  addAreas(post.relatedAreas || []);
  for (const rule of RULES) {
    if (rule.test.test(hay)) {
      addServices(rule.services);
      addAreas(rule.areas);
    }
  }
  if (services.length < 2) addServices(['junk-removal', 'same-day-junk-removal', 'furniture-removal']);
  if (areas.length < 1) addAreas(['dubai-marina', 'business-bay']);
  return { services: services.slice(0, 3), areas: areas.slice(0, 2) };
}
