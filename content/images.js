/**
 * Site photography: the files in Vercel Blob that the service pages, area
 * pages and homepage use, with the alt text and attribution each was
 * published with. Mapped by what each photo shows, not by its original file
 * name (two supplied files were named for the wrong slot).
 *
 * Area photos are Creative Commons photography from Wikimedia Commons; the
 * caption is the attribution the licence requires and is shown on the image
 * (licence, author and source page per file in public/images/areas/CREDITS.md).
 */
const BLOB = 'https://suagnha802rru2gc.public.blob.vercel-storage.com/';

const photo = (file, width, height, alt, caption) => ({ src: BLOB + file, width, height, alt, ...(caption ? { caption } : {}) });

export const photos = {
  crewSofa: photo('uniformed-crew-loading-a-sofa-1.jpg', 2400, 1792, 'Two uniformed Junk Services Dubai crew carrying a wrapped sofa out of a glass-fronted Dubai building towards their truck'),
  crewTruck: photo('crew-and-truck-on-site-3.jpg', 2400, 1792, 'Five crew in hi-vis vests and hard hats talking beside a flatbed truck on a sandy site, with the Dubai skyline behind'),
  apartment: photo('apartment-clearance-1.jpg', 2400, 1792, 'Boxes, a rolled rug, an armchair and a lamp gathered for collection in a high-rise apartment overlooking the Burj Khalifa'),
  villa: photo('villa-clearance-1.jpg', 2400, 1792, 'Three crew in hi-vis vests packing labelled clearance boxes onto a trolley in the marble hall of a Dubai villa'),
  officeStripOut: photo('crew-at-work-1.jpg', 2400, 1340, 'A high-rise office floor being stripped out, with stacked partitions, desks and office chairs waiting for removal'),
  crewStreet: photo('office-strip-out-1.jpg', 2048, 2048, 'Two crew in hi-vis vests checking a job on a handheld device beside their pickup truck on a Dubai street'),
  before: photo('before-1.jpg', 2400, 1792, 'A double-height villa living room cluttered with open boxes, covered furniture, cables and packing paper before a junk removal'),
  after: photo('after-1.jpg', 2400, 1792, 'The same double-height villa living room empty, with clean marble floors after the clearance'),
  garbageBins: photo('garbage-waste-removal-1.png', 1448, 1086, 'Two crew in green uniforms tipping wheelie bins of bagged household waste into a refuse truck, with the Burj Khalifa in the distance'),
  wasteTruck: photo('garbage-waste-removal-1.jpg', 2400, 1792, 'Crew in hi-vis vests wheeling green and blue bins to a waste collection truck outside office towers in Dubai'),
  furniture: photo('sofa-and-furtnure-removal-1.png', 1448, 1086, 'Two crew in navy uniforms carrying a grey fabric sofa out of a living room towards an open truck'),
  appliance: photo('appliance-disposal-1.png', 1448, 1086, 'Two crew in green uniforms moving an old fridge on a trolley up a truck ramp, with a cooker, dishwasher and microwave waiting beside them'),
  garden: photo('garden-waste-removal-1.jpg', 2400, 1792, 'A worker in a hi-vis vest bundling cut palm fronds and bougainvillea trimmings in a villa driveway while a truck is loaded at the gate'),
  houseVilla: photo('house-villa-clearance-1.jpg', 2400, 1792, 'Crew loading a wrapped sofa, boxes, a mattress and a rolled carpet into a box truck outside a Dubai villa'),
  residential: photo('residential-junk-remova-1.jpg', 2400, 1792, 'A wrapped sofa and armchair with labelled boxes ready for removal in a bright villa room with garden views'),
  towerFlat: photo('apartment-clearance-3.jpg', 2400, 1792, 'A crew member in a hi-vis vest taping up labelled boxes beside stacked chairs in a high-rise apartment at sunset'),
  areaDubaiMarina: photo('dubai-marina-1.jpg', 2048, 1339, 'Yachts moored in Dubai Marina with the residential towers behind them in late-afternoon light', 'Photo: Francisco Anzola, CC BY 3.0, via Wikimedia Commons'),
  areaPalmJumeirah: photo('palm-jumeirah-1.jpg', 2400, 1299, 'Aerial view of Palm Jumeirah with Atlantis The Palm in the foreground and the fronds of villas behind', 'Photo: giggel, CC BY 3.0, via Wikimedia Commons'),
  areaDowntownDubai: photo('downtown-dubai-1.jpg', 1558, 1179, 'Downtown Dubai skyline with the Burj Khalifa, seen from a helicopter', 'Photo: Tim.Reckmann, CC BY-SA 3.0, via Wikimedia Commons'),
  areaBusinessBay: photo('business-bay-1.jpg', 2400, 1537, 'Business Bay towers along the Dubai Water Canal at dusk', 'Photo: Iwona Rege, CC BY-SA 4.0, via Wikimedia Commons'),
  areaJumeirah: photo('jumeirah-1.jpg', 2400, 1715, 'Fishing boats moored at Jumeirah fishing harbour at sunset', 'Photo: Phil6007, CC BY-SA 4.0, via Wikimedia Commons'),
  areaArabianRanches: photo('arabian-ranches-1.jpg', 2400, 1800, 'Fairways and palm trees on the Arabian Ranches golf course', 'Photo: JSPhotography2016, CC BY-SA 4.0, via Wikimedia Commons'),
  areaDubaiHills: photo('dubai-hills-1.jpg', 2048, 1536, 'Lakeside fairway with the Dubai skyline behind, in the Emirates Hills golf community next to Dubai Hills', 'Photo: Sev6nWiki, CC BY-SA 4.0, via Wikimedia Commons'),
  areaMirdif: photo('mirdif-1.jpg', 2400, 1589, 'Aerial view of the low-rise villa streets of Mirdif from a plane on approach to Dubai airport', 'Photo: Subhashish Panigrahi, CC BY-SA 4.0, via Wikimedia Commons'),
  areaAlBarsha: photo('al-barsha-1.jpg', 2400, 1800, 'Mall of the Emirates and the Ski Dubai slope with the villas of Al Barsha stretching behind', 'Photo: giggel, CC BY 3.0, via Wikimedia Commons'),
  areaDeira: photo('deira-1.jpg', 2400, 1800, 'Traditional dhows moored on Dubai Creek in Deira, with the old souk district behind', 'Photo: Francisco Anzola, CC BY 2.0, via Wikimedia Commons'),
  areaDubaiSiliconOasis: photo('dubai-silicon-oasis-1.jpg', 2400, 1793, 'Mid-rise apartment blocks and palm trees in Dubai Academic City, beside Dubai Silicon Oasis', 'Photo: Mahmoud Farrag, CC BY 3.0, via Wikimedia Commons'),
  areaJlt: photo('jlt-1.jpg', 2400, 1800, 'Jumeirah Lake Towers park with the cluster towers rising behind it', 'Photo: Guilhem Vellut, CC BY 2.0, via Wikimedia Commons'),
  areaJbr: photo('jbr-1.jpg', 2400, 1600, 'The Jumeirah Beach Residence towers seen from the beach', 'Photo: pe-sa, CC BY 3.0, via Wikimedia Commons'),
  areaAlQuoz: photo('al-quoz-1.jpg', 2400, 1800, 'Warehouse units converted to galleries along Alserkal Avenue in Al Quoz', 'Photo: Fuzheado, CC0, via Wikimedia Commons'),
  areaMotorCity: photo('motor-city-1.jpg', 1920, 1079, 'Night aerial view of the Motor City community around the Dubai Autodrome', 'Photo: أمين علوان, CC BY-SA 4.0, via Wikimedia Commons'),
  areaSportsCity: photo('sports-city-1.jpg', 2400, 1599, 'Inside the Dubai International Stadium in Dubai Sports City', 'Photo: Dave Morton, Public domain, via Wikimedia Commons'),
  areaDip: photo('dip-1.jpg', 2400, 1800, 'Low-rise apartment blocks and trees in Green Community, Dubai Investment Park', 'Photo: Syed Ali, CC BY 2.0, via Wikimedia Commons'),
  areaDiscoveryGardens: photo('discovery-gardens-1.jpg', 1228, 835, 'Aerial view of the low-rise apartment clusters of Discovery Gardens', 'Photo: Imre Solt, CC BY-SA 3.0, via Wikimedia Commons'),
  areaInternationalCity: photo('international-city-1.jpg', 2400, 1347, 'Inside Dragon Mart, the shopping centre beside International City', 'Photo: Shahzad Ali, CC BY-SA 3.0, via Wikimedia Commons'),
  areaAlNahda: photo('al-nahda-1.jpg', 2400, 1800, 'Mid-rise apartment buildings along Amman Street in Al Nahda', 'Photo: Bin Al Stroker, CC BY 3.0, via Wikimedia Commons'),
  areaBurDubai: photo('bur-dubai-1.jpg', 2400, 1800, 'The covered arcade of the Grand Souq in Bur Dubai', 'Photo: Jpbowen, CC BY-SA 4.0, via Wikimedia Commons'),
  areaKarama: photo('karama-1.jpg', 2400, 1800, 'Low-rise apartment blocks and palm trees on a Karama street', 'Photo: Vicharam, CC BY-SA 4.0, via Wikimedia Commons'),
  areaDubaiCreekHarbour: photo('dubai-creek-harbour-1.jpg', 2400, 1350, 'The Dubai Creek Harbour sign on the waterfront with the Downtown skyline behind', 'Photo: Essam2K6, CC BY-SA 4.0, via Wikimedia Commons'),
  areaAlWarqa: photo('al-warqa-1.jpg', 2400, 1800, 'A villa street in Al Warqa 2', 'Photo: Bin Al Stroker, CC BY 3.0, via Wikimedia Commons'),
  areaTheSprings: photo('the-springs-1.jpg', 1280, 853, 'Aerial view of the villas and lakes of The Meadows in Emirates Living', 'Photo: Earthwitness, CC BY 3.0, via Wikimedia Commons')
};

/** Homepage and About page slots (keys of lib/images.js siteImages). */
export const siteSlots = {
  crewLoadingSofa: 'crewSofa',
  crewOnSite: 'crewTruck',
  clearanceApartments: 'apartment',
  clearanceVillas: 'villa',
  clearanceOffices: 'officeStripOut',
  clearanceCommercial: 'crewStreet',
  beforeRoom: 'before',
  afterRoom: 'after'
};

/** Service page photo by service slug. */
export const serviceSlots = {
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
  'commercial-junk-removal': 'officeStripOut',
  'same-day-junk-removal': 'crewStreet'
};

/** Area page photo by area slug. Four areas reuse site photos. */
export const areaSlots = {
  'dubai-marina': 'areaDubaiMarina',
  'palm-jumeirah': 'areaPalmJumeirah',
  'downtown-dubai': 'areaDowntownDubai',
  'business-bay': 'areaBusinessBay',
  jumeirah: 'areaJumeirah',
  'arabian-ranches': 'areaArabianRanches',
  'dubai-hills': 'areaDubaiHills',
  mirdif: 'areaMirdif',
  'al-barsha': 'areaAlBarsha',
  deira: 'areaDeira',
  'dubai-silicon-oasis': 'areaDubaiSiliconOasis',
  jvc: 'towerFlat',
  jlt: 'areaJlt',
  jbr: 'areaJbr',
  'al-quoz': 'areaAlQuoz',
  'motor-city': 'areaMotorCity',
  'sports-city': 'areaSportsCity',
  dip: 'areaDip',
  'discovery-gardens': 'areaDiscoveryGardens',
  'international-city': 'areaInternationalCity',
  'al-nahda': 'areaAlNahda',
  'bur-dubai': 'areaBurDubai',
  karama: 'areaKarama',
  'dubai-creek-harbour': 'areaDubaiCreekHarbour',
  'al-warqa': 'areaAlWarqa',
  'the-springs': 'areaTheSprings',
  'al-furjan': 'after',
  'damac-hills': 'houseVilla',
  'jumeirah-golf-estates': 'garden',
  'town-square': 'residential'
};
