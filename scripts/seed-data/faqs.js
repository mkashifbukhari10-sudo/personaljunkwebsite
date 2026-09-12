/**
 * Seed data — the site-wide FAQ pool as it was written before the Payload
 * migration (plan.md Phase 9). Read ONLY by scripts/seed.ts; the homepage
 * reads these from Payload through lib/content/faqs.js.
 */

export const faqs = [
  { q: 'How much does junk removal cost?', a: 'Price depends on volume, access and the type of items. Send a photo on WhatsApp and you get a fixed quote before we book anything, including labour and disposal.', more: { href: '/how-it-works', label: 'See how pricing works' } },
  { q: 'Do you offer same-day pickup?', a: 'Often yes. Message us early in the day and we will confirm the next available slot, usually the same afternoon depending on your area.' },
  { q: 'What items do you remove?', a: 'Furniture, sofas, beds, mattresses, appliances, garden waste, boxes, general household junk, office furniture and bulky items. We cannot take hazardous chemicals or medical waste.', more: { href: '/services', label: 'See all services' } },
  { q: 'Do you remove furniture?', a: 'Yes. Sofas, beds, wardrobes and dining sets are our most common jobs. We dismantle items that will not fit through the door or lift.' },
  { q: 'Do you remove appliances?', a: 'Yes. Fridges, freezers, washing machines, ovens, TVs and AC units are removed and sent to licensed disposal or recycling handlers.' },
  { q: 'Do you clear villas?', a: 'Yes. Full villa clearances are handled by a larger crew, including garden, storage and maid room, and can be scheduled over more than one day.', more: { href: '/services/villa-clearance', label: 'Villa clearance' } },
  { q: 'Do you serve my area?', a: 'We cover Dubai city-wide, from Dubai Marina and Palm Jumeirah through Downtown, Business Bay, JVC, Jumeirah, Arabian Ranches, Dubai Hills and Mirdif. Ask and we will confirm.', more: { href: '/areas', label: 'See all areas' } },
  { q: 'How quickly can I get a quote?', a: 'Usually within minutes of your WhatsApp message during working hours. A photo speeds it up considerably.' }
];
