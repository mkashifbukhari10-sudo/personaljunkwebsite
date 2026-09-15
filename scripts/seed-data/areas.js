/**
 * Seed data — the twelve original coverage areas as they were written before
 * the Payload migration (plan.md Phase 9); areas-expansion.js adds eighteen more. Read ONLY by scripts/seed.ts; the site
 * reads areas from Payload through lib/content/areas.js.
 *
 * `map` is the marker position on the /areas grid; `home` is the position and
 * order on the homepage grid for the 9 featured areas.
 *
 * Content source: area-pages-content.md (approved). Items marked
 * NEEDS BUSINESS INPUT there are deliberately absent. Paragraphs may contain
 * [label](href) links rendered by components/InlineText.jsx.
 */

export const areas = [
  {
    slug: 'dubai-marina',
    num: '01',
    name: 'Dubai Marina',
    note: 'Tower pickups with service-lift booking handled.',
    map: { x: 13, y: 60 },
    home: { x: 14, y: 62, order: 2 },
    seo: {
      title: 'Junk Removal in Dubai Marina — Tower Pickups, Lift Booked',
      description: 'Junk, sofa and furniture removal from Dubai Marina towers with the service-lift booking handled for you. Fixed price from a photo, crews on daily routes.'
    },
    h1: 'Junk removal in Dubai Marina with the service lift booked for you',
    intro: 'Marina pickups are tower pickups: a high floor, a lobby with rules, and a service lift that has to be booked before a sofa can leave. Send a photo of what needs to go and your building, and we handle the lift booking and the timing so the crew arrives with permission to work.',
    body: [
      {
        heading: 'Getting bulky items out of a Marina tower',
        paragraphs: [
          'Most Marina jobs are single pieces or a room’s worth coming down from an upper floor. Where the tower requires a service-lift booking we arrange it; the crew protects the lift interior and corridor floors on the way out and leaves the lobby swept.',
          'Building move-out rules and NOC requirements are asked for before the day — the detail is under [residential junk removal](/services/residential-junk-removal). The Marina is almost entirely high-rise, so this applies to nearly every pickup here.'
        ]
      },
      {
        heading: 'What we pick up most in the Marina',
        paragraphs: [
          '[Sofas and corner units](/services/sofa-removal) that will not fit the lift, beds and wardrobes from apartment move-outs, and [full apartment clearances](/services/house-clearance) before handover. Each is quoted from your photo as a fixed price covering labour, loading and disposal.'
        ]
      },
      {
        heading: 'Timing around the building',
        paragraphs: [
          'Tell us the tower’s allowed hours for bulky moves and the time you need the space clear by. Crews run daily routes across the city; for [same-day](/services/same-day-junk-removal), message in the morning and we will tell you straight away whether a Marina slot is possible that afternoon.'
        ]
      }
    ],
    faqs: [
      { q: 'Do you book the service lift with my Marina building?', a: 'Where the tower requires it, yes. Give us the building and floor and we arrange the booking for the pickup slot.' },
      { q: 'Can you take a sofa from a high floor in the Marina?', a: 'Yes. Large sofas are split or partly dismantled if they will not fit the lift.' },
      { q: 'Do I need to tell my building you are coming?', a: 'Tell us the building’s rules and any NOC requirement; we work inside them so reception expects the crew.' }
    ],
    popularServices: ['residential-junk-removal', 'sofa-removal', 'furniture-removal', 'house-clearance', 'same-day-junk-removal'],
    nearbyAreas: ['jvc', 'palm-jumeirah', 'jlt', 'jbr'],
    cta: ['Send the photo and the tower name.', 'We will book the lift.'],
    image: null
  },
  {
    slug: 'palm-jumeirah',
    num: '02',
    name: 'Palm Jumeirah',
    note: 'Villas and apartments, gate access arranged.',
    map: { x: 9, y: 28 },
    home: { x: 10, y: 26, order: 1 },
    seo: {
      title: 'Junk Removal on Palm Jumeirah — Villas and Apartments, Gate Access Arranged',
      description: 'Villa clearances, garden waste and apartment pickups across Palm Jumeirah with gate and community access arranged in advance. Fixed price from photos.'
    },
    h1: 'Junk removal on Palm Jumeirah with gate access arranged',
    intro: 'The Palm has two kinds of pickup: villas on the fronds with gardens, storage and gate security, and apartment buildings on the trunk with lobbies and lifts. Tell us which you are in and we arrange the access before the crew sets off.',
    body: [
      {
        heading: 'Frond villas: gate access and garden',
        paragraphs: [
          'For villas we arrange gate access with the community in advance and plan the crew’s arrival around it. [Garden waste](/services/garden-waste-removal), storage rooms and [full villa clearances](/services/villa-clearance) are the usual jobs; a full villa runs with a larger crew and can be scheduled over more than one day.'
        ]
      },
      {
        heading: 'Trunk apartments: lifts and lobbies',
        paragraphs: [
          'Apartment pickups follow tower rules: service-lift booking where required, floors and lift interiors protected, lobby left swept. Tell us the building and floor with your photo — see [residential junk removal](/services/residential-junk-removal) for what we handle with the building.'
        ]
      },
      {
        heading: 'Quoting a Palm pickup',
        paragraphs: [
          'One [fixed price from your photos](/how-it-works), covering labour, loading and disposal. Send a photo of each space for a villa, or the item and the doorway for an apartment.'
        ]
      }
    ],
    faqs: [
      { q: 'Do you arrange access through Palm Jumeirah security?', a: 'Yes. Tell us the community and villa or building and we arrange gate access before the day.' },
      { q: 'Can you clear a whole frond villa including the garden?', a: 'Yes. Garden, storage, maid room and majlis are included when you send photos of them.' }
    ],
    popularServices: ['villa-clearance', 'garden-waste-removal', 'residential-junk-removal'],
    nearbyAreas: ['dubai-marina', 'jumeirah', 'jbr'],
    cta: ['Tell us frond or trunk.', 'We will arrange the access.'],
    image: null
  },
  {
    slug: 'downtown-dubai',
    num: '03',
    name: 'Downtown Dubai',
    note: 'High-rise clear-outs and same-day slots.',
    map: { x: 45, y: 58 },
    home: { x: 45, y: 60, order: 4 },
    seo: {
      title: 'Junk Removal in Downtown Dubai — High-Rise Clear-Outs, Same-Day Slots',
      description: 'High-rise apartment clear-outs, sofa and furniture removal in Downtown Dubai, with same-day slots where crews are on route. Fixed price from a photo.'
    },
    h1: 'Junk removal in Downtown Dubai with same-day slots',
    intro: 'Downtown is where same-day requests come from most: a handover this evening, a delivery arriving this afternoon, a landlord inspection tomorrow. Message in the morning with a photo and your building and we check which crew on route can reach you today.',
    body: [
      {
        heading: 'Same-day in a high-rise district',
        paragraphs: [
          '[Same-day](/services/same-day-junk-removal) depends on slots and where the crews are; Downtown is on daily routes, so morning messages often get an afternoon window. If today is not possible we say so immediately and offer the next slot.'
        ]
      },
      {
        heading: 'High-rise clear-outs',
        paragraphs: [
          '[Full apartment clearances](/services/house-clearance) before handover, [sofas](/services/sofa-removal) that need dismantling to clear the lift, beds and wardrobes from move-outs. Service-lift bookings are handled where the tower requires them, and building rules are asked for in advance.',
          'Downtown buildings are almost all high-rise, so lift logistics apply to every job.'
        ]
      },
      {
        heading: 'What to send for a fast yes',
        paragraphs: [
          'A wide photo of the room, a close-up of the largest item, your floor, whether there is a service lift, and the time the space must be clear by. With those we can confirm the slot without a call-back — the [full list](/how-it-works) is short.'
        ]
      }
    ],
    faqs: [
      { q: 'Can you clear my Downtown apartment today?', a: 'Message before midday with a photo and your building; if a crew on route has the slot we confirm the afternoon window immediately.' },
      { q: 'Does my building’s service-lift rule slow things down?', a: 'Tell us the building’s rules when you message; we arrange the lift booking as part of the same-day plan.' }
    ],
    popularServices: ['same-day-junk-removal', 'house-clearance', 'sofa-removal', 'furniture-removal'],
    nearbyAreas: ['business-bay', 'jumeirah', 'dubai-creek-harbour'],
    cta: ['Send the photo this morning.', 'We will tell you if today works.'],
    image: null
  },
  {
    slug: 'business-bay',
    num: '04',
    name: 'Business Bay',
    note: 'Office furniture and commercial loads.',
    map: { x: 53, y: 36 },
    home: { x: 55, y: 34, order: 5 },
    seo: {
      title: 'Junk Removal in Business Bay — Office Furniture and Commercial Loads',
      description: 'Office strip-outs, commercial loads and building waste cleared from Business Bay towers, out of hours where needed. Fixed price from photos of the space.'
    },
    h1: 'Office and commercial junk removal in Business Bay',
    intro: 'Business Bay pickups are mostly commercial: an office floor being vacated, workstations and partitions coming out, packaging and site waste from a fit-out. We quote the load from photos, work out of hours where trading or staff would be disrupted, and take IT equipment with the rest as e-waste.',
    body: [
      {
        heading: 'Office furniture and strip-outs',
        paragraphs: [
          'Desks are dismantled on site, partitions and cabinets carried out, and the load goes through the building’s loading bay or goods lift. Tell us the hours the building allows and we schedule inside them — see [commercial junk removal](/services/commercial-junk-removal).'
        ]
      },
      {
        heading: 'Commercial and building waste',
        paragraphs: [
          'Fit-out debris, packaging and recurring office waste can be a one-off [waste load](/services/waste-removal) or a [scheduled pickup](/services/garbage-removal). Loads are sorted by material at our yard; metal and e-waste go to licensed handlers.'
        ]
      },
      {
        heading: 'Residential in Business Bay',
        paragraphs: [
          'The district mixes apartments with offices. Apartment pickups here follow the same tower rules as elsewhere: service-lift booking handled, floors protected, building rules asked for in advance — see [residential junk removal](/services/residential-junk-removal).'
        ]
      }
    ],
    faqs: [
      { q: 'Can you clear our Business Bay office outside working hours?', a: 'Yes. Out-of-hours strip-outs are the normal way office jobs run.' },
      { q: 'Do you set up recurring waste pickups for offices?', a: 'Yes. Tell us the volume and how often it builds up.' },
      { q: 'Do you use the building’s loading bay?', a: 'Tell us how the building handles deliveries and moves; we work with the loading bay or goods lift the building specifies.' }
    ],
    popularServices: ['commercial-junk-removal', 'waste-removal', 'garbage-removal'],
    nearbyAreas: ['downtown-dubai', 'al-barsha', 'al-quoz'],
    cta: ['Send photos of the floor', 'and the hours we can have it.'],
    image: null
  },
  {
    slug: 'jvc',
    num: '05',
    name: 'JVC',
    note: 'Frequent routes, small and full loads.',
    map: { x: 34, y: 76 },
    home: { x: 30, y: 78, order: 6 },
    seo: {
      title: 'Junk Removal in JVC — Small Loads to Full Clear-Outs',
      description: 'Junk, sofa and same-day pickups in Jumeirah Village Circle, from a single item to a full apartment. Frequent routes, fixed price from a photo.'
    },
    h1: 'Junk removal in JVC, from one item to a full load',
    intro: 'JVC is on our routes often, which makes it a good area for the everyday pickup: a single sofa, a few boxes and a broken chair, or a whole apartment before a move. Send a photo and we quote the load, small or full, as a fixed price.',
    body: [
      {
        heading: 'Small loads are welcome',
        paragraphs: [
          'A single item is a normal [junk removal](/services/junk-removal) booking here — a two-person crew usually clears one piece in under an hour. You do not need to wait until there is a truckload.'
        ]
      },
      {
        heading: 'Full loads and move-outs',
        paragraphs: [
          'Apartment and townhouse clear-outs are quoted from photos of each room, with a crew sized to the volume — see [house clearance](/services/house-clearance).',
          'JVC mixes mid-rise apartment buildings with townhouses, so tell us which you are in: lift booking for buildings, parking and access for townhouses.'
        ]
      },
      {
        heading: 'Same-day where the route allows',
        paragraphs: [
          'Because crews pass through JVC frequently, morning messages can often be cleared the [same afternoon](/services/same-day-junk-removal) where a slot is free. Ask and we tell you straight away.'
        ]
      }
    ],
    faqs: [
      { q: 'Will you come to JVC for just one item?', a: 'Yes. Single items are a standard job.' },
      { q: 'Can you clear a JVC townhouse as well as an apartment?', a: 'Yes. Tell us which so we plan access and crew size.' }
    ],
    popularServices: ['junk-removal', 'sofa-removal', 'same-day-junk-removal'],
    nearbyAreas: ['dubai-marina', 'al-barsha', 'sports-city', 'discovery-gardens'],
    cta: ['Send a photo of the pile,', 'big or small.'],
    image: null
  },
  {
    slug: 'jumeirah',
    num: '06',
    name: 'Jumeirah',
    note: 'Villa clearances and garden waste.',
    map: { x: 31, y: 42 },
    home: { x: 33, y: 40, order: 3 },
    seo: {
      title: 'Junk Removal in Jumeirah — Villa Clearances and Garden Waste',
      description: 'Villa clearances, garden waste and furniture removal across Jumeirah’s villa streets. Larger crews for full properties, open truck for garden loads, fixed price from photos.'
    },
    h1: 'Villa clearance and garden waste removal in Jumeirah',
    intro: 'Jumeirah jobs are villa jobs: a garden cut back and piled by the gate, a storage room emptied before a renovation, or a whole villa cleared before handover. We size the crew to the property and quote the whole job from your photos.',
    body: [
      {
        heading: 'Garden waste from Jumeirah villas',
        paragraphs: [
          'Branches, trimmings, soil bags, pots and tired outdoor furniture loaded onto an open truck from the garden or side access, usually two crew and a couple of hours — see [garden waste removal](/services/garden-waste-removal).'
        ]
      },
      {
        heading: 'Full villa clearances',
        paragraphs: [
          'Garden, storage, maid room and majlis included; four or more crew, multiple loads, scheduled over one or two days — see [villa clearance](/services/villa-clearance). Furniture that is still usable is [sorted at our yard](/about#disposal) and passed on.'
        ]
      },
      {
        heading: 'Renovations and partial clear-outs',
        paragraphs: [
          'Many Jumeirah villas are older properties being renovated. Fit-out debris and old fittings are cleared as a [waste load](/services/waste-removal), one-off or repeat pickups while the work continues.'
        ]
      }
    ],
    faqs: [
      { q: 'Do you take garden waste on its own in Jumeirah?', a: 'Yes. Garden loads are a standard two-crew job with an open truck.' },
      { q: 'How long does a full Jumeirah villa clearance take?', a: 'Usually one to two days depending on volume; the plan comes with the quote.' }
    ],
    popularServices: ['villa-clearance', 'garden-waste-removal', 'waste-removal'],
    nearbyAreas: ['palm-jumeirah', 'downtown-dubai', 'bur-dubai'],
    cta: ['Photograph the garden and each room.', 'We will quote the whole villa.'],
    image: null
  },
  {
    slug: 'arabian-ranches',
    num: '07',
    name: 'Arabian Ranches',
    note: 'Large villa crews, garden and storage.',
    map: { x: 72, y: 60 },
    home: { x: 74, y: 50, order: 8 },
    seo: {
      title: 'Junk Removal in Arabian Ranches — Large Villa Crews, Garden and Storage',
      description: 'Full villa clearances in Arabian Ranches with crews of four or more, garden and storage included, gate access arranged with the community. Fixed price from photos.'
    },
    h1: 'Villa clearance in Arabian Ranches with a crew sized to the house',
    intro: 'Ranches villas are big, and so are the clear-outs: years of storage, a garden that needs emptying, furniture from every bedroom. We send a larger crew, plan the loads over one or two days if needed, and arrange gate access with the community before the first truck arrives.',
    body: [
      {
        heading: 'Crew size for a Ranches villa',
        paragraphs: [
          'Four or more crew and multiple truckloads are normal for a [villa clearance](/services/villa-clearance). Send photos of every space — including garden, storage and garage — so the quote covers the whole property and the day plan is right first time.'
        ]
      },
      {
        heading: 'Gated community access',
        paragraphs: [
          'Arabian Ranches is a gated community with contractor rules. Tell us your villa and we arrange access and follow the community’s timings.'
        ]
      },
      {
        heading: 'Garden and storage',
        paragraphs: [
          '[Garden waste](/services/garden-waste-removal) goes on the open truck; storage-room contents are sorted with the main load at our yard so usable items are passed on rather than dumped. Individual pieces of [furniture](/services/furniture-removal) are dismantled where needed.'
        ]
      }
    ],
    faqs: [
      { q: 'Can you get a crew and truck through the Arabian Ranches gate?', a: 'Yes. We arrange access with the community when you book.' },
      { q: 'Do you clear the garden as part of the villa?', a: 'Yes. It is included when you send a photo of it.' }
    ],
    popularServices: ['villa-clearance', 'garden-waste-removal', 'furniture-removal'],
    nearbyAreas: ['dubai-hills', 'damac-hills', 'motor-city'],
    cta: ['Photograph every room and the garden.', 'We will plan the days.'],
    image: null
  },
  {
    slug: 'dubai-hills',
    num: '08',
    name: 'Dubai Hills',
    note: 'Move-outs and handover clearances.',
    map: { x: 63, y: 72 },
    home: { x: 66, y: 72, order: 7 },
    seo: {
      title: 'Junk Removal in Dubai Hills — Move-Outs and Handover Clearances',
      description: 'Move-out and handover clearances in Dubai Hills for apartments, townhouses and villas, planned back from your handover date. Fixed price from photos.'
    },
    h1: 'Move-out and handover clearances in Dubai Hills',
    intro: 'Dubai Hills pickups tend to have a date on them: a handover, a lease end, a new tenant arriving. We plan the clearance back from that date, confirm the inventory with you before loading, and leave the property swept for inspection.',
    body: [
      {
        heading: 'Working back from the handover date',
        paragraphs: [
          'Tell us the time the property must be clear by and the building’s or community’s move-out rules; we schedule the crew inside them — see [house clearance](/services/house-clearance).',
          'Dubai Hills has apartments, townhouses and villas, so access ranges from lift bookings to gate arrangements — say which you are in.'
        ]
      },
      {
        heading: 'Furniture and full clearances',
        paragraphs: [
          '[Beds, wardrobes and sofas](/services/furniture-removal) from move-outs, or a full apartment or townhouse cleared in one visit. A named crew lead confirms the inventory before anything moves.'
        ]
      },
      {
        heading: 'Left ready for inspection',
        paragraphs: [
          'Floors and lifts are protected during the carry and the rooms are swept before the crew leaves. Deep cleaning is not part of the service. Building permissions are handled as described under [residential junk removal](/services/residential-junk-removal).'
        ]
      }
    ],
    faqs: [
      { q: 'Can you clear a Dubai Hills apartment before the landlord inspection?', a: 'Yes. Give us the inspection time and we plan the slot backwards from it.' },
      { q: 'Do you handle the community’s move-out rules?', a: 'Tell us what the building or community requires and we schedule inside it.' }
    ],
    popularServices: ['house-clearance', 'residential-junk-removal', 'furniture-removal'],
    nearbyAreas: ['arabian-ranches', 'al-barsha'],
    cta: ['Send a photo of each room', 'and your handover date.'],
    image: null
  },
  {
    slug: 'mirdif',
    num: '09',
    name: 'Mirdif',
    note: 'Household junk and appliance disposal.',
    map: { x: 80, y: 24 },
    home: { x: 82, y: 22, order: 9 },
    seo: {
      title: 'Junk Removal in Mirdif — Household Junk and Appliance Disposal',
      description: 'Household junk, old appliances and bulky items collected from Mirdif homes and passed to licensed handlers. Fixed price from a photo, 7 days a week.'
    },
    h1: 'Household junk removal and appliance disposal in Mirdif',
    intro: 'Mirdif jobs are the everyday kind: a fridge that died, a garage full of things nobody uses, a mattress and two chairs after a room change. Send a photo of the pile or the appliance and a two-person crew clears it in one visit.',
    body: [
      {
        heading: 'Household junk from Mirdif homes',
        paragraphs: [
          'Bulky items, boxes and [general junk](/services/junk-removal) from villas, townhouses and low-rise apartments. Loaded from where it sits; nothing needs to be at the door first.'
        ]
      },
      {
        heading: 'Old appliances',
        paragraphs: [
          'Fridges, washers, ovens, AC units and TVs are strapped and trolleyed out and routed to licensed handlers as metal and e-waste, usually 30 to 60 minutes on site — see [appliance disposal](/services/appliance-disposal).'
        ]
      },
      {
        heading: 'Sorted, not dumped',
        paragraphs: [
          'Every Mirdif load goes to [our yard](/about#disposal), where usable items are passed on and metal, wood and e-waste are separated for licensed handlers.'
        ]
      }
    ],
    faqs: [
      { q: 'Can you take a single fridge from a Mirdif villa?', a: 'Yes. Single appliances are a normal two-crew job.' },
      { q: 'Do you pick up on weekends in Mirdif?', a: 'Pickups run seven days a week; send a photo and we confirm the next slot.' }
    ],
    popularServices: ['junk-removal', 'appliance-disposal', 'furniture-removal'],
    nearbyAreas: ['deira', 'dubai-silicon-oasis', 'al-warqa', 'al-nahda'],
    cta: ['Photograph the appliance or the pile.', 'We will confirm the slot.'],
    image: null
  },
  {
    slug: 'al-barsha',
    num: '10',
    name: 'Al Barsha',
    note: 'Apartments, offices and shop clear-outs.',
    map: { x: 44, y: 26 },
    seo: {
      title: 'Junk Removal in Al Barsha — Apartments, Offices and Shop Clear-Outs',
      description: 'Apartment pickups, office clearances and shop fit-out clear-outs across Al Barsha. Crew sized to the load, out of hours for businesses, fixed price from photos.'
    },
    h1: 'Junk removal in Al Barsha for apartments, offices and shops',
    intro: 'Al Barsha mixes everything: apartment buildings, office blocks and retail units side by side. One day it is a sofa from a third-floor flat, the next a shop being stripped before a new tenant. We quote each as a load from photos and work around the premises’ hours.',
    body: [
      {
        heading: 'Apartment pickups',
        paragraphs: [
          'Sofas, furniture and [appliance disposal](/services/appliance-disposal) from Al Barsha apartments, with the service-lift booking handled where the building requires it.'
        ]
      },
      {
        heading: 'Shop and office clear-outs',
        paragraphs: [
          'Old shopfittings, counters, stock and packaging cleared out of hours so trading is not disrupted; office furniture dismantled and carried out — see [commercial junk removal](/services/commercial-junk-removal). [Recurring waste pickups](/services/garbage-removal) are available for premises that fill up regularly.'
        ]
      },
      {
        heading: 'Renovation waste',
        paragraphs: [
          'Mixed loads from a shop refit or apartment renovation are loaded loose and sorted by material at our yard — see [waste removal](/services/waste-removal).'
        ]
      }
    ],
    faqs: [
      { q: 'Can you clear a shop in Al Barsha overnight?', a: 'Yes. Out-of-hours clear-outs are the usual arrangement for retail.' },
      { q: 'Do you take fit-out debris as well as furniture?', a: 'Yes. Mixed loads are quoted from a photo and sorted on our side.' }
    ],
    popularServices: ['commercial-junk-removal', 'garbage-removal', 'waste-removal', 'appliance-disposal'],
    nearbyAreas: ['jvc', 'business-bay', 'dubai-hills', 'al-quoz'],
    cta: ['Send photos of the space', 'and the hours we can have it.'],
    image: null
  },
  {
    slug: 'deira',
    num: '11',
    name: 'Deira',
    note: 'Commercial waste and recurring pickups.',
    map: { x: 88, y: 46 },
    seo: {
      title: 'Junk Removal in Deira — Commercial Waste and Recurring Pickups',
      description: 'Commercial waste, packaging and stock clear-outs collected from Deira shops, warehouses and offices on a recurring schedule or one-off. Fixed price from photos.'
    },
    h1: 'Commercial junk removal and recurring pickups in Deira',
    intro: 'Deira is a trading district, and its waste is commercial: packaging that builds up weekly, stock that needs clearing, a warehouse corner that has not moved in years. We set recurring pickups for premises that fill up on a rhythm, and quote one-off loads from photos.',
    body: [
      {
        heading: 'Recurring commercial pickups',
        paragraphs: [
          'For shops, warehouses and offices that produce waste continuously, a [scheduled pickup](/services/garbage-removal) replaces ad-hoc messages. Tell us the volume and how often it builds up and we propose a schedule.'
        ]
      },
      {
        heading: 'One-off loads',
        paragraphs: [
          'Stock clear-outs, old shopfittings, mixed waste from a refit. Loaded by crew from where it sits, [sorted by material at our yard](/services/waste-removal).'
        ]
      },
      {
        heading: 'Working around trading hours',
        paragraphs: [
          'Out-of-hours collection where daytime access would block the shopfront or loading area — the standard arrangement for [commercial jobs](/services/commercial-junk-removal).'
        ]
      }
    ],
    faqs: [
      { q: 'Can you collect from our Deira shop every week?', a: 'Yes. Recurring schedules are available — tell us the volume and frequency you need.' },
      { q: 'Do you clear warehouse stock and packaging?', a: 'Yes. It is quoted as a load from photos.' }
    ],
    popularServices: ['commercial-junk-removal', 'garbage-removal', 'waste-removal'],
    nearbyAreas: ['mirdif', 'bur-dubai', 'karama', 'al-nahda'],
    cta: ['Tell us how much and how often.', 'We will propose a schedule.'],
    image: null
  },
  {
    slug: 'dubai-silicon-oasis',
    num: '12',
    name: 'Dubai Silicon Oasis',
    note: 'Offices, e-waste and bulky items.',
    map: { x: 86, y: 70 },
    seo: {
      title: 'Junk Removal in Dubai Silicon Oasis — Offices, E-Waste and Bulky Items',
      description: 'Office clearances, IT and e-waste disposal and bulky-item pickups across Dubai Silicon Oasis, with electronics routed to licensed handlers. Fixed price from photos.'
    },
    h1: 'Office clearance and e-waste removal in Dubai Silicon Oasis',
    intro: 'Silicon Oasis jobs lean towards offices and electronics: a floor of workstations, cabinets of old IT equipment, monitors and printers nobody wants to carry. We dismantle and load the furniture, and route the electronics to licensed handlers as e-waste rather than general waste.',
    body: [
      {
        heading: 'IT and e-waste from offices',
        paragraphs: [
          'Computers, monitors, printers and appliances travel with the load and are separated at our yard for licensed e-waste handlers — see [appliance disposal](/services/appliance-disposal).'
        ]
      },
      {
        heading: 'Office clear-outs',
        paragraphs: [
          'Workstations dismantled on site, partitions carried out, done out of hours where staff would be disrupted; recurring pickups for premises that fill regularly — see [commercial junk removal](/services/commercial-junk-removal).'
        ]
      },
      {
        heading: 'Bulky items from DSO apartments',
        paragraphs: [
          'Residents in the district’s apartment buildings get the standard [junk removal](/services/junk-removal) pickup: sofas, furniture and bulky items carried out with lifts and floors protected.'
        ]
      }
    ],
    faqs: [
      { q: 'Do you dispose of office computers responsibly?', a: 'Yes. IT equipment goes to licensed handlers as e-waste, not to general landfill.' },
      { q: 'Can you clear both the office furniture and the electronics in one visit?', a: 'Yes. They are loaded together and sorted at our yard.' }
    ],
    popularServices: ['commercial-junk-removal', 'appliance-disposal', 'junk-removal'],
    nearbyAreas: ['mirdif', 'international-city'],
    cta: ['Send photos of the office', 'and what needs to go.'],
    image: null
  }
];
