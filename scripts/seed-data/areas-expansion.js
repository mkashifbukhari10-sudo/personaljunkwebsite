/**
 * Seed data — the eighteen coverage areas added on 2026-09-15 to take the
 * area pages from twelve to thirty (plan.md Phase 4 pattern). Same shape as
 * areas.js; read ONLY by scripts/seed.ts, which concatenates the two lists.
 *
 * None of these is featured on the homepage (`home: null`), so the `map`
 * position only matters if one is promoted later. Copy follows the rules of
 * area-pages-content.md: one angle per area, no invented prices, counts or
 * building rules — access details are stated as things we ask for.
 */

export const areasExpansion = [
  {
    slug: 'jlt',
    num: '13',
    name: 'JLT',
    note: 'Cluster towers, offices and apartments in one visit.',
    map: { x: 16, y: 50 },
    home: null,
    seo: {
      title: 'Junk Removal in JLT — Cluster Towers, Offices and Apartments',
      description: 'Junk, furniture and office clear-outs across the JLT clusters. Tell us the cluster letter and tower; we arrange the service lift and quote a fixed price from your photo.'
    },
    h1: 'Junk removal in JLT, tower by tower across the clusters',
    intro: 'Jumeirah Lake Towers is laid out in lettered clusters of three towers, and many of them mix offices and apartments in the same building. Give us the cluster letter, the tower and the floor with your photo, and the crew arrives at the right loading bay with the lift arranged.',
    body: [
      {
        heading: 'Finding the right tower and loading bay',
        paragraphs: [
          'Every JLT cluster has its own access road and parking entrance, so the cluster letter matters more than the street. We ask for it up front, along with the tower’s rules for bulky moves, and route the truck to that cluster’s bay rather than circling the lakes looking for it.',
          'Service-lift booking, NOC forms and reception notice are handled the same way as any [residential tower pickup](/services/residential-junk-removal): tell us what the building needs and we work inside it.'
        ]
      },
      {
        heading: 'Offices and homes in the same building',
        paragraphs: [
          'Because so many JLT towers are mixed use, one visit can cover an office floor and an apartment in the same lift run. [Office furniture and IT waste](/services/commercial-junk-removal) go out after hours if the building asks; sofas, beds and [apartment clear-outs](/services/house-clearance) run in the daytime slot the tower allows.'
        ]
      },
      {
        heading: 'Small pieces, quoted the same way',
        paragraphs: [
          'A single desk, a broken office chair or one mattress is a normal JLT job. Photograph it, tell us the cluster, and you get a fixed price that covers the lift, the carry-down and the disposal — no minimum load.'
        ]
      }
    ],
    faqs: [
      { q: 'Which JLT cluster details do you need before a pickup?', a: 'The cluster letter, the tower name and the floor. With those we find the right loading bay and ask the building about lift booking before the day.' },
      { q: 'Can you clear an office and an apartment in JLT on the same visit?', a: 'Yes, if they are in the same tower or a nearby cluster. Send photos of both and we quote them as one job.' },
      { q: 'Do JLT offices have to be cleared outside working hours?', a: 'Only if the building requires it. Tell us the tower’s rules and we schedule the crew inside them.' }
    ],
    popularServices: ['residential-junk-removal', 'commercial-junk-removal', 'furniture-removal', 'sofa-removal'],
    nearbyAreas: ['dubai-marina', 'jbr', 'the-springs'],
    cta: ['Send the photo, the cluster letter', 'and the tower name.'],
    image: null
  },
  {
    slug: 'jbr',
    num: '14',
    name: 'JBR',
    note: 'Beachfront towers, holiday-let turnovers handled.',
    map: { x: 8, y: 66 },
    home: null,
    seo: {
      title: 'Junk Removal in JBR — Beachfront Towers and Furnished Apartments',
      description: 'Sofa, furniture and apartment clear-outs from Jumeirah Beach Residence towers, including furnished holiday lets between guests. Fixed price from a photo, lift booked.'
    },
    h1: 'Junk removal in JBR, from beachfront towers and furnished apartments',
    intro: 'Jumeirah Beach Residence is a row of tall residential towers behind The Walk, and a large share of its apartments are furnished lets that turn over often. Whether it is one tired sofa or a whole apartment refit, send a photo and the tower name and we will handle the rest.',
    body: [
      {
        heading: 'Furnished apartments between guests',
        paragraphs: [
          'Holiday-let owners and managers in JBR usually need old furniture out on a fixed day, before the next check-in. Send us the changeover date with the photos and we book the slot to it, so the [sofa](/services/sofa-removal), beds or [full contents](/services/house-clearance) are gone before the cleaners arrive.'
        ]
      },
      {
        heading: 'Access behind The Walk',
        paragraphs: [
          'The towers are reached from the service roads behind the promenade rather than from the beach side. We ask the building for the loading-bay position and the service-lift rules in advance, and the crew keeps the carry-out inside the tower’s allowed hours.',
          'Reception notice and any NOC the tower requires are arranged the same way as every [tower pickup](/services/residential-junk-removal).'
        ]
      },
      {
        heading: 'What leaves a JBR apartment most',
        paragraphs: [
          'Sofas and corner units, mattresses, wardrobes and the occasional balcony set. Everything is quoted as a fixed price from your photo, and we take the packaging from replacement furniture on the same visit if you ask.'
        ]
      }
    ],
    faqs: [
      { q: 'Can you clear a JBR holiday apartment between guests?', a: 'Yes. Give us the check-out and check-in dates and we book the pickup for the gap.' },
      { q: 'Where does the truck park at a JBR tower?', a: 'At the tower’s loading bay on the service road behind The Walk. We confirm the position with the building before the day.' },
      { q: 'Do you take the boxes from new furniture too?', a: 'Yes. Mention it with your photo and the packaging goes out with the old pieces.' }
    ],
    popularServices: ['sofa-removal', 'furniture-removal', 'house-clearance', 'residential-junk-removal'],
    nearbyAreas: ['dubai-marina', 'jlt', 'palm-jumeirah'],
    cta: ['Send the photo and the tower.', 'We will book the changeover slot.'],
    image: null
  },
  {
    slug: 'al-quoz',
    num: '15',
    name: 'Al Quoz',
    note: 'Warehouses, workshops and bulk loads.',
    map: { x: 50, y: 22 },
    home: null,
    seo: {
      title: 'Junk Removal in Al Quoz — Warehouse and Workshop Clear-Outs',
      description: 'Warehouse clear-outs, workshop waste and bulk loads collected from Al Quoz industrial areas. Loading-dock pickups, multiple truckloads, fixed price from photos.'
    },
    h1: 'Warehouse and workshop clear-outs in Al Quoz',
    intro: 'Al Quoz is Dubai’s working district: warehouses, workshops, showrooms and the studios that have moved into them. Loads here are bigger and heavier than a home pickup, so we plan crews and trucks from your photos rather than sending a standard van.',
    body: [
      {
        heading: 'Loading-dock pickups',
        paragraphs: [
          'Most Al Quoz units have a shutter or dock the truck can back up to, which makes the job faster than any tower. Send photos of the stock, racking or debris and tell us whether there is a forklift on site; we size the crew and the number of loads from that and give you one price for the lot.'
        ]
      },
      {
        heading: 'What comes out of Al Quoz units',
        paragraphs: [
          'Dead stock and packaging, broken racking, old workshop machinery, showroom furniture and [fit-out debris](/services/waste-removal) from unit refits. Metal and wood are separated from general waste so as much as possible goes for recycling rather than landfill.',
          'Studios and galleries in the district get the same treatment: [commercial clear-outs](/services/commercial-junk-removal) quoted by the load, not by the hour.'
        ]
      },
      {
        heading: 'Multiple loads and repeat visits',
        paragraphs: [
          'A full warehouse clearance can take more than one truck. We tell you the number of loads and the days before we start, and we can put a unit on a [recurring pickup](/services/garbage-removal) if it produces waste every week.'
        ]
      }
    ],
    faqs: [
      { q: 'Can you clear a whole warehouse in Al Quoz?', a: 'Yes. Send photos of each bay and we plan the loads, the crew size and the days, then quote it as one job.' },
      { q: 'Do you take old racking and machinery?', a: 'Yes. Racking is dismantled on site and metal goes for recycling. Tell us the weight of any machinery so we bring the right equipment.' },
      { q: 'Can we book a weekly waste pickup for our unit?', a: 'Yes. Tell us how much waste the unit produces and we propose a schedule.' }
    ],
    popularServices: ['commercial-junk-removal', 'waste-removal', 'garbage-removal', 'appliance-disposal'],
    nearbyAreas: ['al-barsha', 'business-bay', 'jumeirah'],
    cta: ['Send photos of the unit.', 'We will size the crew and the loads.'],
    image: null
  },
  {
    slug: 'motor-city',
    num: '16',
    name: 'Motor City',
    note: 'Townhouse move-outs and garages cleared.',
    map: { x: 58, y: 80 },
    home: null,
    seo: {
      title: 'Junk Removal in Motor City — Townhouses, Apartments and Garages',
      description: 'Junk and furniture removal from Motor City townhouses and apartments, including garages and storage rooms full of years of clutter. Fixed price from a photo.'
    },
    h1: 'Junk removal in Motor City, townhouses and apartments included',
    intro: 'Motor City mixes low-rise apartment blocks with townhouses and villas in the Green Community, and most homes here have a garage or a storage room that has quietly filled up. We clear the house, the garage or both, priced from your photos.',
    body: [
      {
        heading: 'Garages and storage rooms',
        paragraphs: [
          'The typical Motor City job is not one sofa; it is a garage of old bikes, boxes, broken furniture and the previous tenant’s leftovers. Photograph it from the door and we quote the whole space as a [single junk load](/services/junk-removal), then sort it on the truck so the metal and cardboard are recycled.'
        ]
      },
      {
        heading: 'Townhouse and apartment move-outs',
        paragraphs: [
          'Townhouses come with stairs and narrow landings, so wardrobes and beds are dismantled before they come down. Apartment blocks in Motor City are low-rise with lifts; we check the building’s rules for bulky moves and time the [move-out clearance](/services/house-clearance) to your handover.',
          'Community security is told which house or block we are visiting so the truck is expected at the gate.'
        ]
      },
      {
        heading: 'Garden and outdoor pieces',
        paragraphs: [
          'Townhouse gardens produce trimmings, old planters and weathered outdoor sets. They can go on the same truck as the indoor load; see [garden waste removal](/services/garden-waste-removal) for what we take.'
        ]
      }
    ],
    faqs: [
      { q: 'Will you clear just the garage in Motor City?', a: 'Yes. A garage on its own is a common job. Photograph it from the doorway and we quote it as one load.' },
      { q: 'Do you dismantle furniture for townhouse stairs?', a: 'Yes. Beds, wardrobes and large tables are taken apart inside and carried down in pieces.' },
      { q: 'Does the truck get through Motor City security?', a: 'Yes. We give security the house or block number and the visit time so the crew is expected.' }
    ],
    popularServices: ['junk-removal', 'house-clearance', 'furniture-removal', 'garden-waste-removal'],
    nearbyAreas: ['sports-city', 'damac-hills', 'arabian-ranches'],
    cta: ['Photograph the garage or the rooms.', 'We will quote the lot.'],
    image: null
  },
  {
    slug: 'sports-city',
    num: '17',
    name: 'Dubai Sports City',
    note: 'Apartment furniture and gym equipment out.',
    map: { x: 52, y: 84 },
    home: null,
    seo: {
      title: 'Junk Removal in Dubai Sports City — Apartments, Villas and Gym Kit',
      description: 'Furniture, junk and gym equipment removal from Dubai Sports City apartments and Victory Heights villas. Heavy items handled, fixed price from a photo.'
    },
    h1: 'Junk removal in Dubai Sports City, heavy items included',
    intro: 'Sports City is mostly mid-rise apartment towers around the stadiums, with the Victory Heights villas alongside. We collect the usual sofas and beds, and the heavy pieces this area produces more than most: treadmills, weight benches and home-gym racks.',
    body: [
      {
        heading: 'Treadmills, benches and racks',
        paragraphs: [
          'Gym equipment is heavy, awkward and often bolted together. The crew brings straps and a trolley, dismantles what can be dismantled, and protects the lift and corridor on the way out. Metal frames go for recycling. Send a photo of the machine and its brand if you know it, and we price it as a [bulky-item pickup](/services/junk-removal).'
        ]
      },
      {
        heading: 'Apartment towers around the stadiums',
        paragraphs: [
          'Sports City towers have service lifts and loading areas, and most ask for a booking before a bulky move. We arrange it as part of any [apartment pickup](/services/residential-junk-removal) and keep the crew inside the building’s hours.'
        ]
      },
      {
        heading: 'Victory Heights villas',
        paragraphs: [
          'The villas around the golf course need larger crews and community access. [Villa clearances](/services/villa-clearance) here are planned from photos of each room and the garden, with security told which street we are visiting.'
        ]
      }
    ],
    faqs: [
      { q: 'Can you remove a treadmill from a Sports City apartment?', a: 'Yes. Send a photo and the floor; the crew brings the equipment to move it and dismantles it where needed.' },
      { q: 'Do you cover the Victory Heights villas?', a: 'Yes. Villas are quoted from photos of every room and the garden, and we arrange access with the community.' },
      { q: 'Is there a charge for heavy items?', a: 'The fixed price you get from the photo already accounts for weight and crew size. There are no add-ons on the day.' }
    ],
    popularServices: ['junk-removal', 'furniture-removal', 'residential-junk-removal', 'villa-clearance'],
    nearbyAreas: ['motor-city', 'jvc', 'jumeirah-golf-estates'],
    cta: ['Send a photo of the heavy piece.', 'We will bring the right crew.'],
    image: null
  },
  {
    slug: 'dip',
    num: '18',
    name: 'Dubai Investment Park',
    note: 'Warehouses, staff housing and Green Community villas.',
    map: { x: 40, y: 92 },
    home: null,
    seo: {
      title: 'Junk Removal in Dubai Investment Park — Warehouses and Villas',
      description: 'Commercial waste, warehouse clear-outs and villa junk removal across Dubai Investment Park, from the industrial zones to Green Community. Fixed price from photos.'
    },
    h1: 'Junk removal across Dubai Investment Park, industrial and residential',
    intro: 'DIP is two places at once: industrial and warehouse zones on one side, and Green Community villas and apartment blocks on the other. We serve both, with trucks sized to the job rather than one standard van.',
    body: [
      {
        heading: 'Warehouse and factory units',
        paragraphs: [
          'Industrial units in DIP produce packaging, pallets, dead stock and [fit-out waste](/services/waste-removal) in volumes a household never sees. We collect by the truckload from your dock, separate recyclables, and can set a [recurring schedule](/services/garbage-removal) for units that fill up every week.'
        ]
      },
      {
        heading: 'Staff accommodation and offices',
        paragraphs: [
          'Bulk furniture replacement in staff housing and office blocks — beds, lockers, desks — is a planned job. Send photos of a typical room and the count, and we quote the whole building as one [commercial clearance](/services/commercial-junk-removal) with the loads and days set out in advance.'
        ]
      },
      {
        heading: 'Green Community homes',
        paragraphs: [
          'The villas and apartments of Green Community get the residential service: single items, move-outs and [full villa clearances](/services/villa-clearance), with community security told when the truck is coming.'
        ]
      }
    ],
    faqs: [
      { q: 'Do you serve both the industrial and residential parts of DIP?', a: 'Yes. Tell us which zone and we send the right size of crew and truck.' },
      { q: 'Can you clear bulk furniture from staff accommodation?', a: 'Yes. Send a photo of a typical room and the number of rooms; we plan the loads and quote the building as one job.' },
      { q: 'Do you take pallets and packaging from warehouses?', a: 'Yes. Cardboard, wood and plastic are separated on the truck for recycling.' }
    ],
    popularServices: ['commercial-junk-removal', 'waste-removal', 'garbage-removal', 'villa-clearance'],
    nearbyAreas: ['discovery-gardens', 'al-furjan', 'jvc'],
    cta: ['Tell us the zone and send photos.', 'We will size the truck.'],
    image: null
  },
  {
    slug: 'discovery-gardens',
    num: '19',
    name: 'Discovery Gardens',
    note: 'Low-rise blocks, small loads on a frequent route.',
    map: { x: 22, y: 88 },
    home: null,
    seo: {
      title: 'Junk Removal in Discovery Gardens — Small Loads, Frequent Route',
      description: 'Sofa, mattress and single-item pickups from Discovery Gardens apartment blocks, with a crew passing most days. Fixed price from a photo, small loads welcome.'
    },
    h1: 'Junk removal in Discovery Gardens, small loads on a regular route',
    intro: 'Discovery Gardens is rows of low-rise apartment blocks with shared parking between them, and most pickups here are one or two pieces from a studio or one-bedroom. A crew passes the area most days, so a single mattress is as easy to book as a full clear-out.',
    body: [
      {
        heading: 'One piece is a normal job here',
        paragraphs: [
          'A mattress, a sofa that came with the flat, a washing machine that stopped: photograph it and you get a fixed price for that item alone. Because the blocks sit close together, the crew often combines several Discovery Gardens pickups on one pass, which is why [small loads](/services/junk-removal) are cheap to collect here.'
        ]
      },
      {
        heading: 'Low-rise buildings and stair carry-downs',
        paragraphs: [
          'The blocks are a few storeys high with modest lifts. Where a piece does not fit, the crew carries it down the stairs and protects the walls on the way; a [sofa](/services/sofa-removal) that will not turn the landing is split first. Tell us the building number and the crew parks in the right bay.'
        ]
      },
      {
        heading: 'Move-outs and appliances',
        paragraphs: [
          'Full studio and one-bedroom [clear-outs](/services/house-clearance) are done in one visit, and old [fridges and washers](/services/appliance-disposal) go to licensed handlers rather than the bin area.'
        ]
      }
    ],
    faqs: [
      { q: 'Will you collect a single mattress from Discovery Gardens?', a: 'Yes. Single items are the most common job here. Send a photo and the building number for a fixed price.' },
      { q: 'What if the sofa does not fit the lift in my block?', a: 'The crew carries it down the stairs, splitting it first if it will not turn the landing.' },
      { q: 'How soon can you come to Discovery Gardens?', a: 'A crew passes most days. Message in the morning and we tell you whether a same-day slot is possible.' }
    ],
    popularServices: ['junk-removal', 'sofa-removal', 'appliance-disposal', 'house-clearance'],
    nearbyAreas: ['al-furjan', 'dip', 'jvc'],
    cta: ['Send a photo of the piece', 'and the building number.'],
    image: null
  },
  {
    slug: 'international-city',
    num: '20',
    name: 'International City',
    note: 'Studio clear-outs and appliances across the clusters.',
    map: { x: 82, y: 84 },
    home: null,
    seo: {
      title: 'Junk Removal in International City — Studios, Clusters and Appliances',
      description: 'Junk, furniture and appliance removal from International City clusters. Studio and one-bedroom clear-outs, old fridges and cookers, fixed price from a photo.'
    },
    h1: 'Junk removal in International City, cluster by cluster',
    intro: 'International City is a grid of named clusters — China, England, Persia and the rest — of walk-up and low-rise blocks with small apartments and fast tenant turnover. Give us the cluster, the building and a photo, and we quote the pickup as a fixed price.',
    body: [
      {
        heading: 'Which cluster, which building',
        paragraphs: [
          'The clusters look alike from the road, so we ask for the cluster name and the building code before the day and route the crew straight to it. Parking is shared between blocks; the crew keeps the truck clear of neighbours’ bays and works quickly.'
        ]
      },
      {
        heading: 'Studio and one-bedroom turnovers',
        paragraphs: [
          'Landlords and agents here often need a studio emptied between tenants. Old beds, a fridge, a cooker and whatever was left behind go in one visit as a [small clearance](/services/house-clearance), and the flat is left swept for the next viewing.',
          'Old [appliances](/services/appliance-disposal) are the second most common request; they go to licensed handlers rather than being left beside the bins.'
        ]
      },
      {
        heading: 'Shops in the cluster ground floors',
        paragraphs: [
          'Ground-floor shops and restaurants get [commercial pickups](/services/commercial-junk-removal) for old fittings, kitchen equipment and stock, timed around trading hours.'
        ]
      }
    ],
    faqs: [
      { q: 'Which details do you need for an International City pickup?', a: 'The cluster name, the building code and a photo of what needs to go. With those we quote and route the crew directly.' },
      { q: 'Can you empty a studio between tenants?', a: 'Yes. Send photos of the room and the kitchen and we clear everything in one visit, appliances included.' },
      { q: 'Do you take old cookers and fridges?', a: 'Yes. Appliances are disconnected, carried out and passed to licensed handlers.' }
    ],
    popularServices: ['junk-removal', 'appliance-disposal', 'house-clearance', 'commercial-junk-removal'],
    nearbyAreas: ['dubai-silicon-oasis', 'al-warqa', 'mirdif'],
    cta: ['Send the photo, the cluster', 'and the building code.'],
    image: null
  },
  {
    slug: 'al-nahda',
    num: '21',
    name: 'Al Nahda',
    note: 'Family apartments, weekend slots, appliances.',
    map: { x: 92, y: 30 },
    home: null,
    seo: {
      title: 'Junk Removal in Al Nahda — Family Apartments and Weekend Pickups',
      description: 'Furniture, junk and appliance removal from Al Nahda apartment buildings, with weekend slots for working families. Fixed price from a photo, building rules followed.'
    },
    h1: 'Junk removal in Al Nahda with weekend slots for families',
    intro: 'Al Nahda is dense family housing: mid-rise apartment buildings on busy streets close to the Sharjah border, where most people are at work on weekdays. We keep weekend and evening slots for the area so a clear-out fits around the household, not the other way round.',
    body: [
      {
        heading: 'Weekend and evening pickups',
        paragraphs: [
          'Tell us when someone will be home and we book the crew to it. Most Al Nahda jobs are booked for a weekend morning, and the crew confirms the arrival window the day before so you are not waiting in.'
        ]
      },
      {
        heading: 'Family-sized loads',
        paragraphs: [
          'Bunk beds, wardrobes, a dining set, a sofa and the balcony clutter usually go together when a family moves. Photograph each room and we quote the whole [apartment clearance](/services/house-clearance) as one price, [dismantling furniture](/services/furniture-removal) in the flat so it fits the lift.',
          'Building rules on lift use and moving hours vary from one block to the next; we ask the watchman or management before the day.'
        ]
      },
      {
        heading: 'Old appliances and e-waste',
        paragraphs: [
          'Fridges, washing machines, ovens, televisions and window AC units are collected as [appliance disposal](/services/appliance-disposal) and passed to licensed handlers, either on their own or with the rest of the load.'
        ]
      }
    ],
    faqs: [
      { q: 'Do you do weekend pickups in Al Nahda?', a: 'Yes. Weekend mornings are the most booked slots here. Tell us when someone will be home.' },
      { q: 'Can you take a window AC unit?', a: 'Yes. AC units, fridges and other appliances are collected and passed to licensed handlers.' },
      { q: 'Do you need to speak to my building before coming?', a: 'We ask the watchman or management about lift use and moving hours so the crew is expected and works inside the rules.' }
    ],
    popularServices: ['furniture-removal', 'house-clearance', 'appliance-disposal', 'junk-removal'],
    nearbyAreas: ['deira', 'mirdif', 'al-warqa'],
    cta: ['Photograph the rooms', 'and tell us the weekend you prefer.'],
    image: null
  },
  {
    slug: 'bur-dubai',
    num: '22',
    name: 'Bur Dubai',
    note: 'Older buildings, narrow streets, shop clearances.',
    map: { x: 78, y: 40 },
    home: null,
    seo: {
      title: 'Junk Removal in Bur Dubai — Older Buildings and Shop Clearances',
      description: 'Junk, furniture and shop clear-outs in Bur Dubai, where older buildings, small lifts and one-way streets need a crew that plans the carry-out. Fixed price from a photo.'
    },
    h1: 'Junk removal in Bur Dubai, planned around older buildings',
    intro: 'Bur Dubai is the old city: apartment buildings from decades ago, small lifts or none, and streets around Meena Bazaar and Al Fahidi where a truck cannot always stop outside the door. We plan the carry-out from your photos so the crew arrives knowing how the piece is coming down.',
    body: [
      {
        heading: 'Small lifts and stair carry-downs',
        paragraphs: [
          'Many Bur Dubai buildings have a passenger lift too small for a sofa and no service lift at all. The crew dismantles what it can in the flat and carries the rest down by hand, protecting the stairwell; it is slower than a tower with a booked lift, and the fixed price from your photo already reflects that.'
        ]
      },
      {
        heading: 'Parking and the short carry',
        paragraphs: [
          'Where the truck cannot stop at the door, it waits at the nearest legal spot and the crew makes a short carry. Tell us the building name and the closest landmark and we work out the stop in advance rather than on the day.',
          'The same applies to [shop and restaurant clearances](/services/commercial-junk-removal) around the souks, which are usually done before or after trading hours.'
        ]
      },
      {
        heading: 'Household and shop loads',
        paragraphs: [
          'Old beds and wardrobes, [sofas](/services/sofa-removal), shop shelving, signage and stock. Everything is quoted from photos as one price and sorted on the truck so wood and metal are recycled.'
        ]
      }
    ],
    faqs: [
      { q: 'My Bur Dubai building has no service lift. Can you still collect?', a: 'Yes. The crew dismantles what it can and carries the rest down the stairs. The price from your photo already covers that.' },
      { q: 'What if the truck cannot park outside?', a: 'It waits at the nearest legal stop and the crew carries the pieces to it. Give us the building name and a landmark and we plan it before the day.' },
      { q: 'Can you clear a shop near Meena Bazaar outside trading hours?', a: 'Yes. Early morning and after closing are the usual slots for shops in Bur Dubai.' }
    ],
    popularServices: ['furniture-removal', 'sofa-removal', 'commercial-junk-removal', 'junk-removal'],
    nearbyAreas: ['karama', 'deira', 'jumeirah'],
    cta: ['Send the photo, the building', 'and the nearest landmark.'],
    image: null
  },
  {
    slug: 'karama',
    num: '23',
    name: 'Karama',
    note: 'Walk-up blocks and shop stock cleared by hand.',
    map: { x: 72, y: 46 },
    home: null,
    seo: {
      title: 'Junk Removal in Karama — Walk-Up Buildings and Shop Stock',
      description: 'Furniture and junk removal from Karama apartments and shops, including buildings without lifts. Crews carry down by hand, fixed price from a photo, no surprises on the day.'
    },
    h1: 'Junk removal in Karama, including buildings without a lift',
    intro: 'Karama’s low-rise blocks and shopping streets are among the busiest in the city, and a good number of the older buildings have no lift at all. We quote from your photo with the stairs already priced in, so the crew turns up ready to carry.',
    body: [
      {
        heading: 'No lift, no problem',
        paragraphs: [
          'Tell us the floor when you send the photo. Beds and wardrobes are taken apart in the flat, mattresses and [sofas](/services/sofa-removal) are strapped and carried down by two crew, and the stairwell walls are protected on the way. It takes longer than a lift building, which the fixed price already accounts for.'
        ]
      },
      {
        heading: 'Shops and their back rooms',
        paragraphs: [
          'Karama’s shops turn over stock and fittings constantly. Old shelving, counters, mannequins, signage and dead stock are collected as a [commercial clear-out](/services/commercial-junk-removal), usually before opening or after closing so the shopfront is not blocked during trade.'
        ]
      },
      {
        heading: 'Small apartments, quick visits',
        paragraphs: [
          'Most Karama homes are one and two-bedroom flats, so a [full clear-out](/services/house-clearance) is normally a single visit. Old [appliances](/services/appliance-disposal) go with the load to licensed handlers.'
        ]
      }
    ],
    faqs: [
      { q: 'Do you charge extra for buildings without a lift in Karama?', a: 'The floor is part of the photo quote, so the fixed price already includes the stair carry. Nothing is added on the day.' },
      { q: 'Can you clear my Karama shop before it opens?', a: 'Yes. Early morning and after closing are the usual slots so the shopfront stays clear during trading.' },
      { q: 'How long does a Karama flat clearance take?', a: 'Most one and two-bedroom flats are done in a single visit, stairs included.' }
    ],
    popularServices: ['furniture-removal', 'sofa-removal', 'commercial-junk-removal', 'house-clearance'],
    nearbyAreas: ['bur-dubai', 'deira'],
    cta: ['Send the photo and the floor.', 'We will bring the carrying crew.'],
    image: null
  },
  {
    slug: 'al-furjan',
    num: '24',
    name: 'Al Furjan',
    note: 'New handovers, move-in packaging, villa clear-outs.',
    map: { x: 28, y: 84 },
    home: null,
    seo: {
      title: 'Junk Removal in Al Furjan — Handovers, Move-Ins and Villa Clear-Outs',
      description: 'Junk, furniture and packaging removal from Al Furjan villas, townhouses and new apartment buildings. Move-in cardboard, old furniture and garden waste, fixed price from a photo.'
    },
    h1: 'Junk removal in Al Furjan, from move-in boxes to villa clear-outs',
    intro: 'Al Furjan is a young community of villas, townhouses and apartment buildings still being handed over, so a lot of what we collect here is the other end of moving in: flattened boxes, packing foam, the furniture that did not survive the move and the old set the new one replaced.',
    body: [
      {
        heading: 'After the move-in',
        paragraphs: [
          'A week after moving in, most Al Furjan homes have a garage or balcony full of cardboard and foam that the community bins will not take. We collect it as a single [junk load](/services/junk-removal) with any furniture you are replacing, and the cardboard goes for recycling.'
        ]
      },
      {
        heading: 'Villas and townhouses',
        paragraphs: [
          'Full [villa clearances](/services/villa-clearance) and townhouse move-outs are quoted from photos of each room and the garden. Community security is told which street and house we are visiting, and the crew works inside the community’s hours for bulky moves.',
          'Gardens here are new and often being replanted; trimmings, old turf and planters go as [garden waste](/services/garden-waste-removal) on the same truck.'
        ]
      },
      {
        heading: 'Apartment buildings',
        paragraphs: [
          'The newer apartment blocks along the main roads have service lifts and loading areas; we arrange the booking as part of any [apartment pickup](/services/residential-junk-removal).'
        ]
      }
    ],
    faqs: [
      { q: 'Do you take move-in cardboard and packing foam in Al Furjan?', a: 'Yes. Photograph the pile and we collect it as one load, with any furniture you are replacing.' },
      { q: 'Can you clear a whole Al Furjan villa before handover?', a: 'Yes. Send photos of every room and the garden and we quote the whole house, with the days planned to your handover date.' },
      { q: 'Does the community need notice before the truck comes?', a: 'We tell security the house or building and the visit time so the crew is expected at the gate.' }
    ],
    popularServices: ['junk-removal', 'villa-clearance', 'garden-waste-removal', 'residential-junk-removal'],
    nearbyAreas: ['discovery-gardens', 'dip', 'jvc'],
    cta: ['Photograph the boxes or the rooms.', 'We will quote the whole load.'],
    image: null
  },
  {
    slug: 'damac-hills',
    num: '25',
    name: 'DAMAC Hills',
    note: 'Golf-community villas and apartment towers.',
    map: { x: 66, y: 86 },
    home: null,
    seo: {
      title: 'Junk Removal in DAMAC Hills — Villas, Townhouses and Apartments',
      description: 'Villa clearances, furniture removal and junk pickups across DAMAC Hills, with community security arranged and crews sized to the house. Fixed price from photos.'
    },
    h1: 'Junk removal in DAMAC Hills for villas, townhouses and apartments',
    intro: 'DAMAC Hills wraps villas and townhouses around a golf course, with apartment towers along its edge. Every visit goes through community security, so we ask for the cluster and house number with your photo and make sure the truck is expected before it sets off.',
    body: [
      {
        heading: 'Through the gate with the right details',
        paragraphs: [
          'DAMAC Hills is split into named clusters, each with its own entrance. We give security the cluster, the house number and the crew’s arrival window so there is no wait at the barrier, and the crew keeps to the community’s hours for bulky work.'
        ]
      },
      {
        heading: 'Villas around the golf course',
        paragraphs: [
          'A [villa clearance](/services/villa-clearance) here is planned from photos of every room, the garage and the garden. Larger villas take a bigger crew and more than one load; we tell you the plan before the first day. Outdoor sets, planters and trimmings go as [garden waste](/services/garden-waste-removal) on the same truck.',
          'Townhouse move-outs are usually one visit, with beds and wardrobes dismantled for the stairs.'
        ]
      },
      {
        heading: 'Apartment towers on the edge',
        paragraphs: [
          'The towers along the community’s boundary have service lifts and loading bays; we book them as part of any [apartment pickup](/services/residential-junk-removal), from a single [sofa](/services/sofa-removal) to a full flat.'
        ]
      }
    ],
    faqs: [
      { q: 'What does DAMAC Hills security need before you arrive?', a: 'The cluster, the house or tower, and the arrival window. We pass them on when we book the job.' },
      { q: 'How is a large DAMAC Hills villa quoted?', a: 'From photos of every room, the garage and the garden. We tell you the crew size, the number of loads and the days before we start.' },
      { q: 'Do you cover the apartment towers as well as the villas?', a: 'Yes. Tower pickups include the service-lift booking; villas and townhouses are planned around community hours.' }
    ],
    popularServices: ['villa-clearance', 'furniture-removal', 'garden-waste-removal', 'residential-junk-removal'],
    nearbyAreas: ['arabian-ranches', 'motor-city', 'town-square'],
    cta: ['Send photos, the cluster', 'and the house number.'],
    image: null
  },
  {
    slug: 'jumeirah-golf-estates',
    num: '26',
    name: 'Jumeirah Golf Estates',
    note: 'Large villas, outdoor furniture and garden loads.',
    map: { x: 44, y: 90 },
    home: null,
    seo: {
      title: 'Junk Removal in Jumeirah Golf Estates — Large Villas and Gardens',
      description: 'Villa clearances, outdoor furniture and garden waste removal in Jumeirah Golf Estates. Crews sized to large houses, community access arranged, fixed price from photos.'
    },
    h1: 'Villa clearances and garden loads in Jumeirah Golf Estates',
    intro: 'Jumeirah Golf Estates is large villas on large plots along two golf courses, which means bigger rooms, bigger gardens and more outdoor furniture than almost anywhere else we cover. We plan crews and trucks from your photos so a whole house is cleared in the days we promise.',
    body: [
      {
        heading: 'Crews sized to the house',
        paragraphs: [
          'A JGE villa can hold several rooms of furniture, a garage of storage and a garden’s worth of outdoor pieces. Photograph each space and we set the crew size and the number of loads before the first day, then quote the whole [villa clearance](/services/villa-clearance) as one price.'
        ]
      },
      {
        heading: 'Outdoor furniture and garden waste',
        paragraphs: [
          'Weathered loungers, pergola sets, planters, palm trimmings and cleared beds go on the same truck as the indoor load; see [garden waste removal](/services/garden-waste-removal). Metal frames and timber are separated for recycling rather than dumped.'
        ]
      },
      {
        heading: 'Community access and quiet hours',
        paragraphs: [
          'Security is given the community, the street and the house number in advance, and the crew keeps to the community’s hours for bulky work so neighbours are not disturbed. Partial jobs — one room, [a set of furniture](/services/furniture-removal) — are handled the same way at a smaller scale.'
        ]
      }
    ],
    faqs: [
      { q: 'How many days does a Jumeirah Golf Estates villa take?', a: 'It depends on the house. We plan the crew and loads from your photos and tell you the number of days before we start.' },
      { q: 'Do you take garden furniture and pergola sets?', a: 'Yes. Outdoor furniture and garden waste go on the same truck as the indoor load.' },
      { q: 'Will the crew respect the community’s quiet hours?', a: 'Yes. We ask for the community’s hours for bulky work and schedule inside them.' }
    ],
    popularServices: ['villa-clearance', 'garden-waste-removal', 'furniture-removal', 'junk-removal'],
    nearbyAreas: ['sports-city', 'damac-hills', 'motor-city'],
    cta: ['Photograph every room and the garden.', 'We will plan the crew.'],
    image: null
  },
  {
    slug: 'the-springs',
    num: '27',
    name: 'The Springs & Meadows',
    note: 'Townhouse move-outs and garden trimmings.',
    map: { x: 24, y: 70 },
    home: null,
    seo: {
      title: 'Junk Removal in The Springs and The Meadows — Townhouses and Gardens',
      description: 'Townhouse and villa move-outs, furniture removal and garden waste pickups across The Springs, The Meadows and the rest of Emirates Living. Fixed price from a photo.'
    },
    h1: 'Junk removal in The Springs and The Meadows, townhouses and gardens',
    intro: 'The Springs and The Meadows are established townhouse and villa communities in Emirates Living, with mature gardens and families who have been in the same house for years. We clear the accumulated storage, the outgrown furniture and the garden trimmings, quoted from your photos.',
    body: [
      {
        heading: 'Years of storage in one visit',
        paragraphs: [
          'Long-tenancy homes build up a lot: garden sheds, garages and under-stair cupboards full of things nobody has looked at since the move-in. Photograph each space from the doorway and we clear it as one [junk load](/services/junk-removal), sorting recyclables on the truck.'
        ]
      },
      {
        heading: 'Townhouse and villa move-outs',
        paragraphs: [
          'Springs townhouses have stairs and narrow landings, so beds and wardrobes are dismantled inside. Meadows villas are larger and take a bigger crew. Either way a [move-out clearance](/services/house-clearance) is planned to your handover date, and community security is told when the truck is coming.'
        ]
      },
      {
        heading: 'Mature gardens',
        paragraphs: [
          'Gardens here have grown for two decades. Palm and hedge trimmings, old turf, cracked pots and tired outdoor sets are collected as [garden waste](/services/garden-waste-removal), on their own or with a house clearance.'
        ]
      }
    ],
    faqs: [
      { q: 'Do you cover all of Emirates Living, not just The Springs?', a: 'Yes. The Springs, The Meadows, The Lakes and the surrounding communities are on the same route.' },
      { q: 'Can you clear a garden shed and garage on their own?', a: 'Yes. Photograph each from the doorway and we quote them as one load.' },
      { q: 'How do you get furniture down Springs townhouse stairs?', a: 'Beds, wardrobes and large tables are dismantled inside and carried down in pieces, with the walls protected.' }
    ],
    popularServices: ['junk-removal', 'house-clearance', 'garden-waste-removal', 'furniture-removal'],
    nearbyAreas: ['jlt', 'dubai-marina', 'jvc'],
    cta: ['Photograph the shed, garage or rooms.', 'We will quote the lot.'],
    image: null
  },
  {
    slug: 'dubai-creek-harbour',
    num: '28',
    name: 'Dubai Creek Harbour',
    note: 'New towers, handover packaging, lift booked.',
    map: { x: 70, y: 30 },
    home: null,
    seo: {
      title: 'Junk Removal in Dubai Creek Harbour — New Towers and Handovers',
      description: 'Junk, packaging and furniture removal from Dubai Creek Harbour towers, from post-handover cardboard to full apartment clear-outs. Service lift booked, fixed price from a photo.'
    },
    h1: 'Junk removal in Dubai Creek Harbour, from handover boxes to full clear-outs',
    intro: 'Dubai Creek Harbour is new towers being handed over and furnished for the first time, so much of what we collect is the packaging from a whole apartment of new furniture, plus the pieces that turned out not to fit. Send a photo and the tower; we book the service lift and take it all in one visit.',
    body: [
      {
        heading: 'The first month after handover',
        paragraphs: [
          'A newly furnished apartment produces a mountain of cardboard, foam and pallets that the tower’s bin room is not built for. We collect it as a single [junk load](/services/junk-removal), flatten and recycle the cardboard, and take any [furniture](/services/furniture-removal) you are sending back or replacing on the same trip.'
        ]
      },
      {
        heading: 'Service lifts and loading bays',
        paragraphs: [
          'Creek Harbour towers are managed to a high standard and expect a service-lift booking and a loading-bay slot for anything bulky. We arrange both as part of every [tower pickup](/services/residential-junk-removal) and keep the crew inside the tower’s permitted hours.',
          'Where the building requires a NOC or a deposit form, tell us and we complete it before the day.'
        ]
      },
      {
        heading: 'Full apartment clear-outs',
        paragraphs: [
          'Tenants leaving at the end of a lease get the same service in reverse: a [full clearance](/services/house-clearance) planned to the handover date, with the apartment left swept for inspection.'
        ]
      }
    ],
    faqs: [
      { q: 'Do you collect cardboard and packaging from a newly furnished apartment?', a: 'Yes. Photograph the pile and we collect it as one load, with any furniture going back or being replaced.' },
      { q: 'Does my Creek Harbour tower need a lift booking?', a: 'Almost certainly. We arrange the service lift and loading-bay slot with the building before the day.' },
      { q: 'Can you clear a whole apartment before I hand back the keys?', a: 'Yes. Send photos of each room and your handover date and we plan the visit to it.' }
    ],
    popularServices: ['junk-removal', 'residential-junk-removal', 'furniture-removal', 'house-clearance'],
    nearbyAreas: ['downtown-dubai', 'business-bay', 'deira'],
    cta: ['Send the photo and the tower.', 'We will book the lift.'],
    image: null
  },
  {
    slug: 'al-warqa',
    num: '29',
    name: 'Al Warqa',
    note: 'Family villas, big household loads, appliances.',
    map: { x: 90, y: 60 },
    home: null,
    seo: {
      title: 'Junk Removal in Al Warqa — Family Villas and Household Clear-Outs',
      description: 'Household junk, furniture and appliance removal from Al Warqa villas and apartment buildings. Big family loads, garden waste and old appliances, fixed price from photos.'
    },
    h1: 'Household junk removal in Al Warqa for family villas',
    intro: 'Al Warqa is family villas on wide streets, with apartment buildings along the main roads. Villas here hold large households and large amounts of furniture, and the majlis, the storage room and the garden all tend to need clearing at once. We quote the whole lot from your photos.',
    body: [
      {
        heading: 'Whole-house loads',
        paragraphs: [
          'When an Al Warqa family moves or renovates, the load is big: majlis seating, several bedrooms of furniture, kitchen appliances and a storage room. We plan the crew and the number of trucks from your photos and quote it as one [villa clearance](/services/villa-clearance), with the days agreed before we start.'
        ]
      },
      {
        heading: 'Appliances and e-waste',
        paragraphs: [
          'Old fridges, freezers, washers, ovens and split AC units come out as [appliance disposal](/services/appliance-disposal) and go to licensed handlers. They can be collected alone or with the rest of the house.'
        ]
      },
      {
        heading: 'Gardens and outdoor areas',
        paragraphs: [
          'Al Warqa villas often have a real garden and a shaded outdoor area. Trimmings, old outdoor seating and planters are taken as [garden waste](/services/garden-waste-removal), and renovation debris from the house goes as [waste removal](/services/waste-removal) on a separate truck if the volume calls for it.'
        ]
      }
    ],
    faqs: [
      { q: 'Can you clear a large Al Warqa villa in one go?', a: 'Usually over one or two days. We plan the crew and trucks from your photos and agree the days before we start.' },
      { q: 'Do you take majlis seating?', a: 'Yes. Majlis sets are carried out as furniture and quoted with the rest of the load.' },
      { q: 'Can you collect a freezer on its own?', a: 'Yes. Single appliances are a normal job and go to licensed handlers.' }
    ],
    popularServices: ['villa-clearance', 'appliance-disposal', 'garden-waste-removal', 'furniture-removal'],
    nearbyAreas: ['mirdif', 'international-city', 'al-nahda'],
    cta: ['Photograph each room and the garden.', 'We will plan the trucks.'],
    image: null
  },
  {
    slug: 'town-square',
    num: '30',
    name: 'Town Square',
    note: 'Route days for townhouses and apartments.',
    map: { x: 76, y: 92 },
    home: null,
    seo: {
      title: 'Junk Removal in Town Square — Townhouses and Apartments on Route Days',
      description: 'Junk, furniture and sofa removal from Town Square townhouses and apartment buildings, with set route days so small loads stay affordable. Fixed price from a photo.'
    },
    h1: 'Junk removal in Town Square on scheduled route days',
    intro: 'Town Square is a large community of townhouses and low-rise apartment buildings a fair drive from the centre, so we run it on route days rather than one-off trips. That keeps a single sofa affordable to collect and gives you a known day to plan around.',
    body: [
      {
        heading: 'How route days work',
        paragraphs: [
          'A crew covers Town Square on set days, collecting several pickups on one pass. Send your photo and we give you the next route day and an arrival window; if you need it sooner, we tell you honestly whether a [same-day slot](/services/same-day-junk-removal) is possible or not.'
        ]
      },
      {
        heading: 'Townhouses and apartments',
        paragraphs: [
          'Townhouse move-outs are one visit, with beds and wardrobes dismantled for the stairs. The apartment buildings around the park are low-rise with lifts; we check the building’s rules and time the [apartment pickup](/services/residential-junk-removal) to them.',
          'Community security is given the building or house and the crew’s window so the truck is expected.'
        ]
      },
      {
        heading: 'Sofas, beds and the rest',
        paragraphs: [
          '[Sofas](/services/sofa-removal) and beds from the standard townhouse layouts, outgrown children’s furniture, balcony sets and the odd appliance. Each is quoted from your photo as a fixed price that covers the drive.'
        ]
      }
    ],
    faqs: [
      { q: 'When is the next route day for Town Square?', a: 'Send your photo and we reply with the next route day and an arrival window.' },
      { q: 'Will you collect a single sofa from Town Square?', a: 'Yes. Route days are what make single items affordable this far out.' },
      { q: 'Can I get a same-day pickup in Town Square?', a: 'Sometimes, if a crew is already heading that way. Message in the morning and we tell you straight away.' }
    ],
    popularServices: ['sofa-removal', 'junk-removal', 'residential-junk-removal', 'same-day-junk-removal'],
    nearbyAreas: ['damac-hills', 'arabian-ranches', 'motor-city'],
    cta: ['Send the photo.', 'We will give you the next route day.'],
    image: null
  }
];
