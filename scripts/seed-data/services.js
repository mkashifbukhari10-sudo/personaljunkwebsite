/**
 * Seed data — the twelve services as they were written before the Payload
 * migration (plan.md Phase 9). Read ONLY by scripts/seed.ts to bootstrap an
 * empty database; the site itself reads services from Payload through
 * lib/content/services.js and never imports this file.
 *
 * Once a database is seeded, the CMS is the source of truth: `npm run seed`
 * skips documents that already exist unless it is given --update.
 *
 * Content source: service-pages-content.md (approved). Items marked
 * NEEDS BUSINESS INPUT there are deliberately absent here.
 *
 * Inline links inside paragraphs use [label](href) and are rendered by
 * components/InlineText.jsx.
 */

export const services = [
  {
    slug: 'junk-removal',
    num: '01',
    name: 'Junk Removal',
    blurb: 'Everything you no longer need, carried out and taken away in one visit.',
    seo: {
      title: 'Junk Removal in Dubai — One Photo, One Visit',
      description: 'Mixed household junk, bulky items or a full load carried out and taken away in one visit. Send a photo on WhatsApp for a fixed price, crews across Dubai 7 days a week.'
    },
    h1: 'Junk removal in Dubai for anything you no longer need',
    intro: 'If you have a pile of things that do not fit one neat category — a broken chair, boxes from the last move, an old rug, a fan that stopped working — this is the service. You do not need to sort it, bag it or bring it downstairs. [Send a photo, get a price](/how-it-works), and a crew carries it out in one visit.',
    body: [
      {
        heading: 'What counts as junk',
        paragraphs: [
          'Almost anything that no longer earns its space: bulky items, general household junk, boxes, small furniture, broken or outdated things you have stopped using. It does not have to be sorted.',
          'If it is a [sofa](/services/sofa-removal), an [appliance](/services/appliance-disposal) or [garden waste](/services/garden-waste-removal), we still take it, but those have their own pages with more detail. If it is whatever is left after the obvious stuff, it belongs here.'
        ]
      },
      {
        heading: 'A single piece or a full truckload',
        paragraphs: [
          'A junk pickup is usually two to three crew with a covered truck. The same booking covers one awkward item or everything in a storage room.',
          'The photo you send decides the crew size and the time we block out: a small pile is under an hour, a full load can be half a day. Either way the quote is fixed before we arrive. If it is the whole home, a [house clearance](/services/house-clearance) is the better fit.'
        ]
      },
      {
        heading: 'Carried out, not just collected',
        paragraphs: [
          'We do not ask you to leave things at the door or by the bins. The crew comes to where the items are, carries them out, protects floors and lifts on the way, and sweeps the spot before leaving.',
          'Stairs, tower lifts and dismantling are part of the job, not extras.'
        ]
      },
      {
        heading: 'What we cannot take',
        paragraphs: [
          'Hazardous chemicals, paint solvents, gas cylinders and medical waste are not accepted. If your pile includes one of these, tell us and we will point you to a licensed handler for that item and take the rest. The [full list of what we take](/services) is on the services page.'
        ]
      }
    ],
    typical: 'Bulky items, general junk, single pieces or a full load',
    crew: '2 to 3 crew with a covered truck',
    time: '45 minutes to half a day',
    faqs: [
      { q: 'Do I need to sort or bag anything before you arrive?', a: 'No. Leave it where it is. The photo tells us what is coming and the crew handles carrying and loading.' },
      { q: 'Can you take just one item?', a: 'Yes. Single pieces are a normal booking; a two-person crew usually clears one item in under an hour.' },
      { q: 'Is there a limit to how much you take in one visit?', a: 'A full covered truck is one load. If your photo shows more than that, we plan multiple loads or a larger crew and quote for the whole job.' },
      { q: 'What if some of my junk is hazardous?', a: 'We take everything except hazardous chemicals, paint solvents, gas cylinders and medical waste, and we will tell you where those can go.' }
    ],
    relatedServices: ['same-day-junk-removal', 'residential-junk-removal', 'house-clearance', 'furniture-removal'],
    popularAreas: ['jvc', 'mirdif', 'dubai-silicon-oasis'],
    cta: ['Send a photo of the pile.', 'We will send the price.'],
    image: null
  },
  {
    slug: 'garbage-removal',
    num: '02',
    name: 'Garbage Removal',
    blurb: 'Household and office garbage collected fast when it piles up.',
    seo: {
      title: 'Garbage Removal in Dubai — One-Off or Recurring Collection',
      description: 'Household and office garbage collected fast when it piles up. One-off pickups or a recurring schedule, crews sized to the volume, fixed price from a photo.'
    },
    h1: 'Garbage removal in Dubai when the bins are not enough',
    intro: 'Garbage removal is for the bagged and boxed waste that has outgrown the building’s bins: after a party, a clean-out, a renovation, or simply a busy office week. Tell us how much there is and how often it happens, and we send the right size of crew, once or on a schedule.',
    body: [
      {
        heading: 'When garbage removal makes sense',
        paragraphs: [
          'The building’s bins take everyday waste. They do not take forty bags after a clear-out, the boxes from a bulk delivery, or the debris a contractor left behind.',
          'When the pile is bigger than the bin, a crew comes to where the bags are, carries them down and takes them away in one trip.'
        ]
      },
      {
        heading: 'One-off pickup or a recurring schedule',
        paragraphs: [
          'Most garbage jobs are a single visit. If waste builds up regularly — an office that fills its bins every few days, a site that produces debris weekly — we can set a recurring pickup instead of you messaging each time. [Commercial premises](/services/commercial-junk-removal) often run this way.',
          'The crew size follows the volume: two people for a household clear-out, up to four for a heavy office or site load.'
        ]
      },
      {
        heading: 'Homes, offices and sites',
        paragraphs: [
          'Household bags, office waste and renovation debris are the usual loads. For towers we handle the service-lift booking; for offices we can work around your hours. Bags do not need to be carried to the lobby first.',
          'Loose, unbagged material from building work is handled as [waste removal](/services/waste-removal), which is quoted the same way.'
        ]
      },
      {
        heading: 'Garbage we cannot collect',
        paragraphs: [
          'Hazardous chemicals, paint solvents, gas cylinders and medical waste stay out of the truck. If a bag might contain one of these, tell us when you send the photo.'
        ]
      }
    ],
    typical: 'Household bags, office waste, renovation debris',
    crew: '2 to 4 crew depending on volume',
    time: 'Same-day or recurring schedule',
    faqs: [
      { q: 'Can you collect garbage on a regular schedule?', a: 'Yes. Recurring pickups are available for homes, offices and sites; tell us the volume and how often it builds up and we will propose a schedule.' },
      { q: 'Do the bags need to be at the door or downstairs?', a: 'No. The crew collects from where the waste is, including upper floors with a service lift.' },
      { q: 'Is renovation debris counted as garbage?', a: 'Small bagged debris, yes. Loose mixed loads from a fit-out or demolition are handled as waste removal, which is quoted the same way.' },
      { q: 'How do you decide the crew size?', a: 'From your photo. Two crew for a normal household load, up to four for a large office or site pickup.' }
    ],
    relatedServices: ['waste-removal', 'commercial-junk-removal', 'junk-removal'],
    popularAreas: ['deira', 'business-bay', 'al-barsha'],
    cta: ['Send a photo of the pile.', 'Tell us if it will happen again.'],
    image: null
  },
  {
    slug: 'furniture-removal',
    num: '03',
    name: 'Furniture Removal',
    blurb: 'Beds, wardrobes and dining sets dismantled and loaded by hand.',
    seo: {
      title: 'Furniture Removal in Dubai — Dismantled, Carried, Gone',
      description: 'Beds, wardrobes, dining sets and mattresses dismantled where needed and loaded by hand. Two crew, tools included, most items cleared in under an hour.'
    },
    h1: 'Furniture removal in Dubai, dismantling and heavy lifting included',
    intro: 'Furniture is our most common job: beds, wardrobes and dining sets that were assembled in the room and will not leave it in one piece. The crew arrives with tools, takes apart what needs taking apart, carries it down and loads it by hand. Usable pieces are passed on rather than dumped.',
    body: [
      {
        heading: 'Beds, wardrobes and dining sets',
        paragraphs: [
          'These are the pieces we move most. A bed frame and mattress, a wardrobe that was built inside the bedroom, a six-seat dining set, a chest of drawers.',
          'One piece or the contents of a whole room, priced from your photo before we come. If it is every room, see [house clearance](/services/house-clearance).'
        ]
      },
      {
        heading: 'Taken apart where it will not fit',
        paragraphs: [
          'Most large furniture went in flat-packed and has to come out the same way. The crew brings the tools, dismantles on site, and protects doorframes and lift interiors while carrying.',
          'You do not need to unscrew anything or clear a path beyond what is reasonable.'
        ]
      },
      {
        heading: 'Usable furniture is passed on',
        paragraphs: [
          'Loads are [sorted at our yard](/about#disposal) before anything reaches a landfill. Furniture that is still usable is passed on; wood goes to licensed handlers; only what is left goes to approved municipal facilities.',
          'If a piece is in good condition, mention it in your message.'
        ]
      },
      {
        heading: 'Sofas have their own page',
        paragraphs: [
          'Sofas and corner units come with their own access problems, so they are covered separately under [sofa removal](/services/sofa-removal). If your job is mostly a sofa, start there; if it is a sofa plus a bedroom’s worth of furniture, book here and tell us both.'
        ]
      }
    ],
    typical: 'Beds, mattresses, wardrobes, dining sets',
    crew: '2 crew, tools for dismantling',
    time: 'Under an hour for most items',
    faqs: [
      { q: 'Do I have to dismantle the wardrobe or bed myself?', a: 'No. Dismantling is included; the crew brings the tools and takes it apart on site.' },
      { q: 'What happens to furniture that is still in good condition?', a: 'Loads are sorted at our yard and usable pieces are passed on rather than dumped. Tell us in your message if something is still good.' },
      { q: 'Can you take a mattress on its own?', a: 'Yes. Mattresses are a standard single-item job.' },
      { q: 'Will you scratch the floor or the lift?', a: 'Floors, lift interiors and doorframes are protected while the crew carries, and the area is swept before they leave.' }
    ],
    relatedServices: ['sofa-removal', 'house-clearance', 'junk-removal', 'residential-junk-removal'],
    popularAreas: ['dubai-hills', 'downtown-dubai', 'dubai-marina'],
    cta: ['Photograph the piece and the doorway.', 'We will quote and bring the tools.'],
    image: null
  },
  {
    slug: 'sofa-removal',
    num: '04',
    name: 'Sofa Removal',
    blurb: 'Two-seaters to corner units, through tight doors and service lifts.',
    seo: {
      title: 'Sofa Removal in Dubai — Through Tight Doors and Service Lifts',
      description: 'Two-seaters to corner units carried out of apartments and villas, dismantled if the door or lift is too small. Fixed price from a photo, same-day slots where available.'
    },
    h1: 'Sofa removal in Dubai apartments and villas',
    intro: 'The sofa went in when the flat was empty and the doors were off. Now it has to come out past a hallway, a lift and a lobby. That access problem is the whole job. Send a photo of the sofa and [the tightest point on the way out](/how-it-works), and we will tell you how we will get it through.',
    body: [
      {
        heading: 'Getting a sofa out of an apartment',
        paragraphs: [
          'The crew measures the route, books the service lift where the tower requires it, protects the lift interior and doorframes, and carries or dismantles depending on what fits. Stair carries are included where there is no lift.',
          'You send the photo; we plan the route. Building rules and permissions are covered under [residential junk removal](/services/residential-junk-removal).'
        ]
      },
      {
        heading: 'Two-seaters, L-shapes and corner units',
        paragraphs: [
          'A two-seater is usually a straightforward carry. Corner units and L-shapes often have to be split into sections or have legs and backs removed to clear the door.',
          'The crew brings the tools for that and puts nothing back together you did not ask for.'
        ]
      },
      {
        heading: 'Timed around your new sofa',
        paragraphs: [
          'A common reason to book: the new sofa is arriving and the old one is in the way. Tell us the delivery window and we will aim for a slot before it, often the [same afternoon](/services/same-day-junk-removal) if you message in the morning and a crew is on route nearby.'
        ]
      },
      {
        heading: 'Need the rest of the room cleared too?',
        paragraphs: [
          'If the sofa is part of a bigger clear-out, book [furniture removal](/services/furniture-removal) or a [house clearance](/services/house-clearance) instead and mention the sofa; it is quoted as part of the load rather than as a separate visit.'
        ]
      }
    ],
    typical: 'Two-seaters, L-shapes and corner units',
    crew: '2 crew, tools for dismantling',
    time: 'Under an hour for most items',
    faqs: [
      { q: 'My sofa will not fit through the door. Can you still take it?', a: 'Yes. Corner units and large sofas are split or partly dismantled on site so they clear the doorway and lift.' },
      { q: 'Can you remove the old sofa before the new one is delivered?', a: 'Tell us the delivery window when you message. Morning requests can often be cleared the same afternoon where slots allow.' },
      { q: 'Do I need to book the building’s service lift myself?', a: 'No. Where the tower requires a service-lift booking we arrange it; just tell us your floor and building.' },
      { q: 'Is a sofa removal priced per item?', a: 'It is priced from your photo as a fixed quote covering labour, loading and disposal; a single sofa is normally a two-crew job under an hour.' }
    ],
    relatedServices: ['furniture-removal', 'same-day-junk-removal', 'residential-junk-removal'],
    popularAreas: ['dubai-marina', 'downtown-dubai', 'jvc'],
    cta: ['Send two photos:', 'the sofa and the doorway.'],
    image: null
  },
  {
    slug: 'appliance-disposal',
    num: '05',
    name: 'Appliance Disposal',
    blurb: 'Fridges, washers, ovens and AC units passed to licensed handlers.',
    seo: {
      title: 'Appliance Disposal in Dubai — Fridges, Washers, Ovens and AC Units',
      description: 'Old fridges, freezers, washers, dryers, ovens, TVs and AC units collected with straps and trolley and passed to licensed handlers. Same visit, 30 to 60 minutes.'
    },
    h1: 'Appliance disposal in Dubai through licensed handlers',
    intro: 'Appliances are heavy, awkward and should not end up in general landfill. We collect them from the kitchen, laundry or balcony, strap and trolley them out, and route metal and e-waste to licensed handlers. A single appliance is usually a two-person, same-visit job.',
    body: [
      {
        heading: 'Appliances we collect',
        paragraphs: [
          'Fridges and freezers, washers and dryers, ovens and cookers, split and window AC units, TVs and other e-waste. One unit or a kitchen’s worth during a [renovation](/services/waste-removal) or [handover](/services/house-clearance).',
          'Send a photo of each appliance; the model does not matter, the size and the route out do.'
        ]
      },
      {
        heading: 'Strapped, trolleyed, out in one visit',
        paragraphs: [
          'Two crew arrive with straps and a trolley. Fridges are moved upright, floors and lift interiors are protected, and the unit is loaded in the same visit — usually 30 to 60 minutes on site.',
          'If the appliance is on an upper floor without a lift, stair carries are included.'
        ]
      },
      {
        heading: 'Where old appliances go',
        paragraphs: [
          'Nothing is dumped as-is. Loads are [sorted by material at our yard](/about#disposal); metal and e-waste are handed to licensed handlers, and only the non-recoverable remainder goes to approved municipal facilities.'
        ]
      },
      {
        heading: 'Small electronics and e-waste',
        paragraphs: [
          'TVs, monitors and similar electronics travel with the appliances. If your e-waste is from an office, the [commercial page](/services/commercial-junk-removal) covers larger IT clear-outs on a schedule.'
        ]
      }
    ],
    typical: 'Fridges, washers, ovens, TVs, AC units, e-waste',
    crew: '2 crew, straps and trolley',
    time: 'Same visit, 30 to 60 minutes',
    faqs: [
      { q: 'Can you take a fridge from a high floor?', a: 'Yes. The crew uses straps and a trolley, books the service lift where the building requires it, and carries by stairs where there is none.' },
      { q: 'Is an old AC unit e-waste?', a: 'We collect split and window units along with other appliances and route them with metal and e-waste to licensed handlers.' },
      { q: 'Do you collect a single TV?', a: 'Yes. Small electronics are a normal single-item pickup and can be added to any other job.' }
    ],
    relatedServices: ['commercial-junk-removal', 'junk-removal', 'house-clearance'],
    popularAreas: ['mirdif', 'dubai-silicon-oasis', 'al-barsha'],
    cta: ['Photograph the appliance and the door.', 'We will confirm the slot.'],
    image: null
  },
  {
    slug: 'waste-removal',
    num: '06',
    name: 'Waste Removal',
    blurb: 'Mixed loads from renovations, clear-outs and site work.',
    seo: {
      title: 'Waste Removal in Dubai — Renovation, Clear-Out and Site Loads',
      description: 'Mixed loads from renovations, fit-outs, clear-outs and site work loaded by crew and sorted by material at our yard. Fixed price from a photo, one-off or on a schedule.'
    },
    h1: 'Waste removal in Dubai for renovation, clear-out and site loads',
    intro: 'After the contractors leave, what stays behind is rarely one kind of thing: offcuts, broken tiles, packaging, old fittings, bags of everything. Waste removal is for those mixed loads. We load them, take them to our yard, separate by material and send each stream where it should go.',
    body: [
      {
        heading: 'Renovation and fit-out waste',
        paragraphs: [
          'Debris after a kitchen or bathroom refit, offcuts and packaging from a fit-out, old fixtures pulled out before the new ones went in. The crew loads it from where it sits; you do not need to bag or stack it first.',
          'Photos of the pile and the access route give us the crew size. Old appliances in the pile go with the load to [licensed handlers](/services/appliance-disposal).'
        ]
      },
      {
        heading: 'Clear-out loads and site work',
        paragraphs: [
          'Storage rooms, [shop fit-outs being stripped](/services/commercial-junk-removal), small site clean-ups. These are quoted as a load, not per item, and can be a one-off visit or a repeat pickup while the work continues.'
        ]
      },
      {
        heading: 'Sorted by material, not tipped',
        paragraphs: [
          'Every load goes to [our yard](/about#disposal) first. Metal, wood and e-waste are separated for licensed handlers; anything reusable is set aside; the remainder goes to approved municipal facilities.',
          'Mixed loads are welcome precisely because the sorting happens on our side. Bagged everyday refuse is a different job: see [garbage removal](/services/garbage-removal).'
        ]
      },
      {
        heading: 'Materials we do not carry',
        paragraphs: [
          'Hazardous chemicals, paint solvents, gas cylinders and medical waste are not accepted. If a renovation left any of these behind, tell us and we will point you to a licensed handler while we clear everything else.'
        ]
      }
    ],
    typical: 'Renovation debris, fit-out waste, clear-out loads, site waste',
    crew: '2 to 4 crew depending on volume',
    time: 'Same-day or recurring schedule',
    faqs: [
      { q: 'What is the difference between waste removal and garbage removal?', a: 'Garbage is bagged everyday refuse that has piled up. Waste removal is loose, mixed material from renovation, fit-out, clear-out or site work. Both are quoted from a photo.' },
      { q: 'Can you collect while the renovation is still running?', a: 'Yes. Repeat pickups can be scheduled while the work continues rather than waiting for one big load at the end.' },
      { q: 'Does the waste need to be bagged?', a: 'No. Loose loads are fine; sorting happens at our yard.' }
    ],
    relatedServices: ['garbage-removal', 'commercial-junk-removal', 'house-clearance', 'appliance-disposal'],
    popularAreas: ['business-bay', 'deira', 'al-barsha'],
    cta: ['Send a photo of the pile after the work.', 'We will quote the load.'],
    image: null
  },
  {
    slug: 'garden-waste-removal',
    num: '07',
    name: 'Garden Waste Removal',
    blurb: 'Branches, trimmings, soil bags, pots and old outdoor furniture.',
    seo: {
      title: 'Garden Waste Removal in Dubai — Branches, Soil, Pots and Outdoor Sets',
      description: 'Branches, trimmings, soil bags, pots and old outdoor furniture cleared from villas and gardens with an open truck. Two crew, one to three hours.'
    },
    h1: 'Garden waste removal for Dubai villas and outdoor spaces',
    intro: 'Garden waste is bulky, dirty and does not fit the household bins. After a landscaper’s visit, a seasonal cut-back or a balcony refresh, we clear the branches, trimmings and soil bags, and take the cracked pots and faded outdoor set at the same time. Two crew, an open truck, usually a couple of hours.',
    body: [
      {
        heading: 'Green waste we collect',
        paragraphs: [
          'Branches and palm fronds, hedge trimmings, bagged soil and leaves, dead plants, broken pots and planters. Leave it where the gardener left it; the crew loads from the garden, side access or gate, whichever the villa allows.'
        ]
      },
      {
        heading: 'Old outdoor furniture goes too',
        paragraphs: [
          'Rusted loungers, a cracked plastic table, a sun-bleached rattan set. [Outdoor furniture](/services/furniture-removal) is loaded with the green waste in the same visit and [sorted with the rest at our yard](/about#disposal), so usable pieces can be passed on.'
        ]
      },
      {
        heading: 'Open truck, quick turnaround',
        paragraphs: [
          'Garden loads travel in an open truck rather than a covered one, which suits loose branches and soil. Two crew normally clear a villa garden’s worth in one to three hours, and the quote is fixed from your photos before they come.'
        ]
      },
      {
        heading: 'Part of a bigger villa job?',
        paragraphs: [
          'If the garden is one part of a full move-out, book a [villa clearance](/services/villa-clearance) instead: it covers garden, storage, maid room and majlis with a larger crew and can run over more than one day.'
        ]
      }
    ],
    typical: 'Trimmings, branches, soil, pots, outdoor sets',
    crew: '2 crew with open truck',
    time: 'One to three hours',
    faqs: [
      { q: 'Do you take soil and sand?', a: 'Bagged soil is part of a normal garden load. For large loose volumes, send a photo and we will confirm the crew and truck needed.' },
      { q: 'Do you remove the old outdoor set as well as the green waste?', a: 'Yes. Outdoor furniture is loaded in the same visit and sorted with the load.' },
      { q: 'Do you cut or trim plants?', a: 'No. We remove what has already been cut; a landscaper does the cutting.' }
    ],
    relatedServices: ['villa-clearance', 'junk-removal', 'furniture-removal'],
    popularAreas: ['jumeirah', 'arabian-ranches', 'palm-jumeirah'],
    cta: ['Photograph the pile from the gate.', 'We will quote the load.'],
    image: null
  },
  {
    slug: 'house-clearance',
    num: '08',
    name: 'House Clearance',
    blurb: 'Room by room or the whole house, ready for handover.',
    seo: {
      title: 'House Clearance in Dubai — Ready for Handover',
      description: 'Apartments from studio to four bedrooms and family homes cleared room by room or all at once, swept and ready for inspection. Crew sized to the property, fixed price from photos.'
    },
    h1: 'House and apartment clearance in Dubai before you hand over',
    intro: 'Most house clearances have a date attached: the lease ends, the landlord inspects, the buyer takes the keys. We plan backwards from that date, send a crew sized to the property, confirm the inventory with you before loading, and leave the place swept and empty.',
    body: [
      {
        heading: 'Move-outs, handovers and inspections',
        paragraphs: [
          'Tell us the time you need the space clear by and we work back from it. Building rules on move-out timings and NOC paperwork are asked for upfront so the crew is not turned away at the gate.',
          'Tower access and service-lift bookings are handled where required — the detail is under [residential junk removal](/services/residential-junk-removal), and [what to send us](/how-it-works) is on the how-it-works page.'
        ]
      },
      {
        heading: 'Room by room or the whole home at once',
        paragraphs: [
          'A studio to four-bedroom apartment is usually a three-crew, half-day job. If you are still living there, we can clear one room or the storage first and come back for the rest; if it is already empty, one visit takes everything from furniture to the [last bag](/services/garbage-removal).',
          'Kitchens with appliances still in place are cleared in the same visit and routed through [appliance disposal](/services/appliance-disposal).'
        ]
      },
      {
        heading: 'Confirmed before anything is loaded',
        paragraphs: [
          'A named crew lead walks the property with you and confirms the inventory before the first item moves. Anything you want kept stays.',
          'Floors, lifts and doorframes are protected during the carry, and the rooms are swept before the crew leaves.'
        ]
      },
      {
        heading: 'Larger than a house?',
        paragraphs: [
          'Villas with garden, storage, maid room and majlis need a bigger crew and often more than one day. They have their own page: [villa clearance](/services/villa-clearance).'
        ]
      }
    ],
    typical: 'Full properties, move-outs, handovers, storage rooms',
    crew: '3 crew for a typical apartment; more for larger homes',
    time: 'Half a day for a typical apartment',
    faqs: [
      { q: 'Can you clear the apartment while I still live there?', a: 'Yes. We can clear one room or the storage first and return for the rest, or do everything in one visit once you have moved out.' },
      { q: 'How do you make sure you do not take something I want to keep?', a: 'The crew lead confirms the inventory with you before loading. Mark or separate anything staying and it stays.' },
      { q: 'Do you handle the building’s move-out paperwork?', a: 'We ask for the building’s move-out rules and any NOC requirements in advance and handle service-lift bookings where the tower requires them. The NOC itself is issued to you by the building; tell us what they need.' },
      { q: 'Will the place be ready for the landlord inspection?', a: 'The crew sweeps the rooms before leaving so the property is empty and clean of debris. Deep cleaning is not part of the service.' }
    ],
    relatedServices: ['villa-clearance', 'residential-junk-removal', 'furniture-removal', 'appliance-disposal'],
    popularAreas: ['dubai-hills', 'downtown-dubai', 'dubai-marina'],
    cta: ['Send a photo of each room', 'and your handover date.'],
    image: null
  },
  {
    slug: 'villa-clearance',
    num: '09',
    name: 'Villa Clearance',
    blurb: 'Large crews for full villas, including garden, storage and maid room.',
    seo: {
      title: 'Villa Clearance in Dubai — Garden, Storage, Maid Room and Majlis',
      description: 'Full villa clearances with crews of four or more and multiple loads, covering garden, storage, maid room and majlis. Scheduled over one to two days, fixed price from photos.'
    },
    h1: 'Full villa clearance across Dubai, scheduled over one or two days',
    intro: 'A villa is not an apartment with more rooms. It has a garden, a storage room, a maid’s room, a majlis, and years of things in each of them. Clearing it takes a larger crew, more than one truckload, and sometimes more than one day. This page explains how we plan that. For apartments and houses, see [house clearance](/services/house-clearance).',
    body: [
      {
        heading: 'Every part of the villa',
        paragraphs: [
          'Living rooms and bedrooms are the easy part. The clearance also covers the majlis, the maid’s room, the storage room under the stairs, the garage, the [garden](/services/garden-waste-removal) and whatever is on the roof terrace.',
          'Send photos of each space so the quote covers the whole property, not just the furniture you can see from the door.'
        ]
      },
      {
        heading: 'Crew size, loads and days',
        paragraphs: [
          'Villa jobs run with four or more crew and multiple truckloads. Depending on the volume, we schedule one long day or split it over two, and the [quote stays fixed](/how-it-works) unless the load turns out to be different from the photos.'
        ]
      },
      {
        heading: 'Sorting what is still useful',
        paragraphs: [
          'Large clearances produce a lot that is still usable. Loads are [sorted at our yard](/about#disposal): furniture in good condition is passed on, metal, wood and e-waste go to licensed handlers, garden waste and the remainder are handled separately.',
          'Point out anything valuable and the crew lead will confirm it with you before loading.'
        ]
      },
      {
        heading: 'Gate access and community rules',
        paragraphs: [
          'Gated communities have their own rules for contractor access and timings. Tell us the community when you book and we will arrange gate access and plan the crew’s arrival around it.'
        ]
      }
    ],
    typical: 'Full villas, move-outs, handovers, garden and storage',
    crew: '4 or more crew, multiple loads',
    time: 'One to two days depending on volume',
    faqs: [
      { q: 'How many days does a villa clearance take?', a: 'Usually one to two, depending on volume. We tell you the plan with the quote so you know which day each part of the villa is cleared.' },
      { q: 'Do you clear the garden and outbuildings as part of it?', a: 'Yes. Garden, storage, maid room, majlis and garage are all included when you send photos of them.' },
      { q: 'Can you work in a gated community?', a: 'Yes. Tell us the community and we arrange gate access and follow its contractor timings.' },
      { q: 'What happens to the good furniture in a full villa?', a: 'It is separated at our yard and passed on rather than dumped. Flag valuable pieces in advance and the crew lead confirms them with you on site.' }
    ],
    relatedServices: ['house-clearance', 'garden-waste-removal', 'furniture-removal', 'appliance-disposal'],
    popularAreas: ['arabian-ranches', 'jumeirah', 'palm-jumeirah'],
    cta: ['Photograph every space, garden included.', 'We will plan the days.'],
    image: null
  },
  {
    slug: 'same-day-junk-removal',
    num: '10',
    name: 'Same-Day Junk Removal',
    blurb: 'Message in the morning, cleared the same afternoon where slots allow.',
    seo: {
      title: 'Same-Day Junk Removal in Dubai — Message Before Midday',
      description: 'Message before midday and the nearest crew on route can clear your junk the same afternoon where slots allow. Urgent single items or a full apartment, fixed price from a photo.'
    },
    h1: 'Same-day junk removal in Dubai when it has to go today',
    intro: 'Landlord inspection at five. New sofa arriving at three. Handover tomorrow morning. Same-day pickup works by matching your message to a crew already on route in your part of Dubai. This page explains how that happens, what makes it possible, and what to send so we can say yes quickly.',
    body: [
      {
        heading: 'How same-day pickup works',
        paragraphs: [
          'Crews run [daily routes across the city](/areas). When you message in the morning with a photo and your area, we check which crew will be nearest that afternoon and whether their route has room for your load.',
          'If it does, you get a fixed price and an arrival window in the same conversation.'
        ]
      },
      {
        heading: 'What makes a same-day slot possible',
        paragraphs: [
          'Messaging early in the day, a clear photo, your floor and whether there is a service lift, and the time you need the space clear by. Those four things let us confirm without a call-back — the [full prep list](/how-it-works) is short.',
          'Building permissions still apply, so if your tower needs a lift booking or NOC, [say so straight away](/services/residential-junk-removal).'
        ]
      },
      {
        heading: 'Working back from your deadline',
        paragraphs: [
          'Tell us the time the space must be clear, not the time you would like us to arrive. We plan the slot backwards from the deadline, including the carry and the sweep, so the crew is finished when you need them to be. A [new sofa arriving](/services/sofa-removal) is the classic case.'
        ]
      },
      {
        heading: 'When it cannot be today',
        paragraphs: [
          'Same-day depends on slots and your area. If the nearest crew is full, we tell you immediately and offer the next available slot rather than promising an afternoon we cannot keep.',
          'Booking the evening before for a next-morning pickup is the surest option.'
        ]
      }
    ],
    typical: 'Urgent single items or a full apartment',
    crew: 'Nearest available crew on route',
    time: 'Same afternoon where slots allow',
    faqs: [
      { q: 'What is the latest I can message for a same-day pickup?', a: 'Before midday gives the best chance; the earlier the better.' },
      { q: 'Is same-day available in every area?', a: 'It depends on where the crews are that day. Send your area with the photo and we will tell you straight away whether today is possible.' },
      { q: 'Can you clear a full apartment the same day?', a: 'Where a crew has the slot, yes; a full apartment is a normal same-day request. Larger properties are planned for the next available day.' }
    ],
    relatedServices: ['junk-removal', 'sofa-removal', 'house-clearance', 'residential-junk-removal'],
    popularAreas: ['downtown-dubai', 'dubai-marina', 'jvc'],
    cta: ['Send the photo now, with your area', 'and the time it must be clear by.'],
    image: null
  },
  {
    slug: 'residential-junk-removal',
    num: '11',
    name: 'Residential Junk Removal',
    blurb: 'Apartments and homes, with building permissions handled for you.',
    seo: {
      title: 'Residential Junk Removal in Dubai — Building Permissions Handled',
      description: 'Junk removal for apartments and homes with building permissions, service-lift bookings and move-out timings handled for you. Floors and lifts protected, fixed price from a photo.'
    },
    h1: 'Residential junk removal for Dubai apartments and homes',
    intro: 'In a Dubai tower the hard part is often not the sofa; it is the building. Service-lift bookings, move-out windows, NOC forms, security at the gate. Residential junk removal is our standard pickup plus all of that handled in advance, so the crew arrives with permission to work and leaves nothing for the building manager to complain about. Business premises are covered under [commercial junk removal](/services/commercial-junk-removal).',
    body: [
      {
        heading: 'Building permissions and service lifts',
        paragraphs: [
          'Many towers require a service-lift booking and a move-out permission before anything bulky leaves a unit. We handle the lift booking where the tower requires it and ask for the building’s rules and NOC requirements before the day, so the crew is expected at reception rather than turned away.'
        ]
      },
      {
        heading: 'Apartments, homes and communities',
        paragraphs: [
          'Studio apartments, family homes, townhouses in gated communities. Each has a different gatekeeper: reception, security, a community office.',
          'Tell us where you are and we adapt: lobby timings for towers, gate access for communities, and [daily routes](/areas) that already cover most of the city. Emptying the whole unit is a [house clearance](/services/house-clearance).'
        ]
      },
      {
        heading: 'Protecting the building on the way out',
        paragraphs: [
          'Lift interiors, corridor floors and doorframes are protected while the crew carries. Items that will not fit are dismantled inside the unit rather than forced through a doorway. The unit and the lift lobby are left swept.'
        ]
      },
      {
        heading: 'What to send us for a tower pickup',
        paragraphs: [
          'A wide photo of the room, a close-up of the largest item, your floor number, whether a service lift is available, and any building rule on timings. With those we can quote and book the lift in one go. The [how-it-works page](/how-it-works) has the same list.'
        ]
      }
    ],
    typical: 'Single items to a full apartment, in towers and communities',
    crew: '2 to 3 crew',
    time: 'Under an hour to half a day depending on the load',
    faqs: [
      { q: 'Do you book the service lift with my building?', a: 'Where the tower requires it, yes. Give us your building and floor and we arrange the booking for the pickup slot.' },
      { q: 'What is an NOC and do I need one to remove furniture?', a: 'Some buildings ask tenants for a no-objection form before bulky items leave. The building issues it to you; tell us what they require and we will fit the pickup to it.' },
      { q: 'Can the crew come during the building’s allowed move-out hours only?', a: 'Yes. Tell us the building’s timing rules and we schedule inside them.' },
      { q: 'Will the building manager have anything to complain about?', a: 'Lifts, floors and doorframes are protected and the area is swept before the crew leaves.' }
    ],
    relatedServices: ['house-clearance', 'junk-removal', 'sofa-removal', 'same-day-junk-removal'],
    popularAreas: ['dubai-marina', 'palm-jumeirah', 'dubai-hills'],
    cta: ['Tell us the building and the floor.', 'We will handle the rest of the paperwork.'],
    image: null
  },
  {
    slug: 'commercial-junk-removal',
    num: '12',
    name: 'Commercial Junk Removal',
    blurb: 'Offices, shops and warehouses, out of hours when you need it.',
    audience: 'business',
    seo: {
      title: 'Commercial Junk Removal in Dubai — Offices, Shops and Warehouses',
      description: 'Office strip-outs, shop clear-outs and warehouse loads cleared out of hours or on a recurring schedule. Desks, partitions, IT waste and stock loaded by crew, fixed price from photos.'
    },
    h1: 'Commercial junk removal for Dubai offices, shops and warehouses',
    intro: 'Business clear-outs have two extra constraints: they cannot disrupt trading, and they usually involve furniture and equipment in quantity. We work out of hours where you need it, size the crew to the volume and the access, and take desks, partitions, IT waste and old stock in the same load. Homes and apartments are covered under [residential junk removal](/services/residential-junk-removal).',
    body: [
      {
        heading: 'Offices, shops and warehouses',
        paragraphs: [
          'An office floor being vacated, a shop being stripped before a new fit-out, a warehouse corner full of dead stock and packaging. Each is quoted as a load from your photos, with the crew sized to the volume and the access — loading bay, goods lift or shopfront.'
        ]
      },
      {
        heading: 'Out of hours and on a schedule',
        paragraphs: [
          'Strip-outs can run out of hours so trading and staff are not disrupted. Where waste builds up continuously — [packaging, site waste](/services/waste-removal), [regular office clear-outs](/services/garbage-removal) — a recurring pickup replaces ad-hoc messages.'
        ]
      },
      {
        heading: 'Desks, partitions and IT waste',
        paragraphs: [
          'Workstations are dismantled on site, partitions and cabinets carried out, and IT equipment travels with the load as [e-waste to licensed handlers](/services/appliance-disposal) rather than general waste.'
        ]
      },
      {
        heading: 'One contact, one fixed price',
        paragraphs: [
          'Send photos of the space and tell us the hours you can give us. You get [one fixed quote](/how-it-works) covering labour, loading and disposal, one crew lead on site, and the space swept when they leave.'
        ]
      }
    ],
    typical: 'Office furniture, partitions, IT waste, shop fit-outs, warehouse stock',
    crew: 'Sized to the volume and access',
    time: 'Out of hours available; recurring schedule where needed',
    faqs: [
      { q: 'Can you clear the office at night or over the weekend?', a: 'Yes. Out-of-hours strip-outs are how most office jobs run; tell us the hours the building allows.' },
      { q: 'Do you take old computers and monitors?', a: 'Yes. IT equipment is loaded with the rest and handed to licensed handlers as e-waste.' },
      { q: 'Can we set up regular pickups for packaging and site waste?', a: 'Yes. Recurring schedules are available for premises that produce waste continuously.' }
    ],
    relatedServices: ['waste-removal', 'appliance-disposal', 'garbage-removal', 'junk-removal'],
    popularAreas: ['business-bay', 'deira', 'dubai-silicon-oasis', 'al-barsha'],
    cta: ['Send photos of the floor', 'and the hours we can have it.'],
    image: null
  }
];
