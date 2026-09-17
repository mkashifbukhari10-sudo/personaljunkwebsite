# Service pages — approved content strategy (`/services/[slug]`)

Companion to `plan.md` Phase 3. Defines the unique content for all 12 service landing pages before implementation. Nothing here has been implemented; `plan.md` phase status is unchanged.

Every fact used below already exists in the codebase (`lib/services.js`, `lib/data.js`, `lib/areas.js`, page copy in `app/**` and `components/**`). Where a useful statement would need information that is not in the project, it is marked **`NEEDS BUSINESS INPUT`** with the exact question.

---

## Shared content rules

### Tone
- Plain, direct, second person ("you", "we"). Short sentences. No hype, no superlatives ("best", "cheapest", "#1"), no invented numbers.
- Brand voice is already set by the site: confident, practical, slightly dry ("You point. We lift. It's gone."). Slogans stay as display text, never as the H1.
- Dubai-specific where the codebase supports it: service lifts, NOC paperwork, move-out timings, tower access, gate access, villas with majlis / maid room / garden. Do not add area claims that are not already in `lib/areas.js` notes.

### Minimum useful content depth
- Each page: intro (40–80 words) + 3–4 body sections (each 60–140 words) + facts block + 3–5 FAQs + related services + popular areas + CTA. Roughly 450–750 words of unique prose per page.
- Depth comes from the *angle* (logistics, timing, item type, property type), not from repeating the general process. The generic five-step process lives on `/how-it-works`; service pages link to it rather than restating it in full.

### Heading rules
- One `<h1>`: descriptive, includes the service and "Dubai" naturally (e.g. "Sofa removal in Dubai apartments and villas"). Rendered in the eyebrow slot per Phase 2 convention; display slogan is a `<p>`.
- Body sections are `<h2>`. FAQ questions are `<h3>` inside the accordion. Facts block label is an `<h2>` ("Typical job").
- No two service pages share an `<h2>` string. Shared block labels ("Typical job", "Related services", "Popular areas", "Questions") are allowed because they are navigational, not content.

### FAQ rules
- 2–5 per page, all specific to that service. No FAQ may duplicate a homepage FAQ (`lib/data.js`) or another service page's FAQ in either question or answer.
- Answers must be supported by existing copy; if the honest answer is "ask us", say that ("Send a photo and we will confirm") rather than inventing a policy.
- Rendered accessibly (existing `Faq` pattern: `<h3><button aria-expanded>`), answers always in the DOM. `FAQPage` JSON-LD only when ≥ 2 FAQs.

### Internal-link rules
- Every service page links to: `/services` (breadcrumb), ≥ 2 related services, ≥ 2 popular areas (via `areaHref()`), `/how-it-works` (process), `/contact` (CTA). Link text describes the destination ("villa clearance", "how pricing works"), never "click here".
- Hub `/services` links to every service page; footer already does. Homepage explorer groups link to the first service of the group.
- Cross-page overlap pairs (sofa↔furniture, garbage↔waste, house↔villa, residential↔commercial, same-day↔junk) must link to each other with a one-line "if you need X instead" pointer so the overlap is disambiguated for users and crawlers.

### Duplicate-content rules
- No shared intro sentences, paragraphs or FAQs across service pages. The differentiation matrix below is the check.
- Facts that legitimately apply to every service (fixed quote from a photo, labour + loading + disposal included, 7 days a week, uniformed crew, sweep before leaving, hazardous items not accepted) may be referenced, but in **at most one sentence per page**, phrased differently each time, and never as a standalone section — they already have a home on `/how-it-works`, `/about` and `/services`.
- The "What we take" list and "not accepted" note live on `/services`; service pages mention only the subset relevant to them.

### Shared vs unique
| May be shared (as components/data, not prose) | Must be unique per page |
|---|---|
| Breadcrumbs, `CtaBand`, facts-block layout, related/popular blocks, `Service` schema template, OG text template | H1, title, meta description, intro, every H2 and its paragraphs, FAQs, the choice of related services and popular areas, CTA wording |

---

## Fact base (what the codebase already states)

Reusable across pages, subject to the one-sentence rule:

- Operating since 2020; pickups 7 days a week; WhatsApp and calls; phone `+971 55 103 1255`.
- Quote from a photo, usually within minutes during working hours; no site visit needed; fixed price covering labour, loading and disposal; "nothing changes on the day unless the load does".
- Same-day: message before midday / early in the day → crew can reach you the same afternoon where slots allow, depending on area.
- Crew: uniformed, briefed, equipped; named crew lead who confirms the inventory before loading; heavy lifting, dismantling and stair carries included; floors, lifts and doorframes protected; site swept before leaving. Before arrival you get crew lead name, arrival window and fixed price.
- Building logistics: building permissions and service-lift bookings handled where the tower requires them; move-out timings and NOC paperwork are asked for in advance.
- Preparation that helps: wide photo of the room + close-up of the largest item; floor number and service-lift availability; building rules; the time you need the space clear by.
- Disposal chain: collect → sort by material at our yard → usable items passed on → metal, wood and e-waste to licensed handlers → remainder to approved municipal facilities.
- Not accepted: hazardous chemicals, paint solvents, gas cylinders, medical waste (we point you to a licensed handler).
- Job ladder: single item or one room — 2 crew, under an hour; apartment clearance — 3 crew, half day; villa clearance — 4+ crew, one to two days; office/commercial strip-out — out of hours available.
- Most work comes from move-outs, handovers and renovations. Most common jobs: sofas, beds, wardrobes, dining sets.
- Group facts (typical / crew / time) per `serviceGroups` in `lib/services.js`.
- Area notes in `lib/areas.js` (the only permitted area-specific claims).

Claims present in the codebase but flagged for confirmation before reuse on new pages: "insured on site" (About page H2). Not used in the drafts below. **`NEEDS BUSINESS INPUT`: Is the crew/work insured, and can we state it? What kind of cover?**

---

## Service differentiation matrix

| Slug | Primary intent | Unique angle | Main entities / items | Primary related | Overlap risk |
|---|---|---|---|---|---|
| `junk-removal` | General "get rid of stuff" — mixed, unsorted | The umbrella page: what counts as junk, single item to full load, covered truck | bulky items, general junk, boxes, mixed loads | same-day, residential, house-clearance | Medium with `waste-removal` and `residential` — resolved by scoping this to mixed household items, not debris or building logistics |
| `garbage-removal` | Accumulated bags/refuse, often repeat | Frequency and volume: one-off vs recurring collection when waste piles up | household bags, office waste, renovation debris | waste-removal, commercial | High with `waste-removal` — garbage = bagged/regular refuse; waste = mixed loads from works |
| `furniture-removal` | Specific large furniture pieces | Dismantling and hand-carrying; reuse-first sorting | beds, wardrobes, dining sets, mattresses | sofa-removal, house-clearance | High with `sofa-removal` — sofas get their own page; this page excludes them by name |
| `sofa-removal` | One awkward item | Access problem-solving: tight doors, service lifts, corner units | two-seaters, corner units, L-shapes | furniture-removal, same-day | High with `furniture-removal` — this page is only sofas and their access issues |
| `appliance-disposal` | White goods + electronics end-of-life | What happens to appliances after pickup; e-waste routing | fridges, freezers, washers, dryers, ovens, cookers, AC units, TVs | commercial (IT/e-waste), junk-removal | Low |
| `waste-removal` | Post-renovation / site / clear-out loads | Mixed material loads and sorting at the yard | renovation debris, fit-out waste, clear-out loads, site waste | garbage-removal, commercial | High with `garbage-removal` — see above |
| `garden-waste-removal` | Outdoor green + outdoor items | Open-truck quick jobs; villas and gardens | branches, trimmings, soil bags, pots, outdoor sets | villa-clearance, junk-removal | Low |
| `house-clearance` | Whole home/apartment before handover | Move-outs, handovers, inspections; room-by-room option | apartments (studio–4BR), homes, storage rooms | villa-clearance, residential, furniture | High with `villa-clearance` — this page is apartments/houses; villas get their own |
| `villa-clearance` | Large detached property, multi-day | Scale: 4+ crew, multiple loads, garden/storage/maid room/majlis | villas, gardens, storage, maid room, majlis | house-clearance, garden-waste | High with `house-clearance` — see above |
| `same-day-junk-removal` | Urgency | Timing mechanics and what makes same-day possible | deadlines: move-out, inspection, delivery arriving | junk-removal, sofa-removal | Medium with `junk-removal` — this page is about *when*, not *what* |
| `residential-junk-removal` | Home/tower logistics | Building permissions, NOC, service lifts, protection | apartments, homes, towers, building management | house-clearance, junk-removal | Medium with `junk-removal` and `house-clearance` — scoped to building rules and access, not item lists |
| `commercial-junk-removal` | Business premises | Out-of-hours, scheduled/recurring, IT waste, strip-outs | offices, shops, warehouses, desks, partitions, IT waste | waste-removal, appliance-disposal, garbage | Low |

---

## 1. Junk Removal

- **Service name:** Junk Removal
- **Permanent slug:** `junk-removal`
- **Primary search intent:** "junk removal Dubai" — someone with a mix of unwanted items who wants it all gone in one visit and does not want to sort or categorise first.
- **Suggested SEO title:** Junk Removal in Dubai — One Photo, One Visit
- **Suggested meta description:** Mixed household junk, bulky items or a full load carried out and taken away in one visit. Send a photo on WhatsApp for a fixed price, crews across Dubai 7 days a week.
- **Suggested H1:** Junk removal in Dubai for anything you no longer need
- **Short intro:** If you have a pile of things that do not fit one neat category — a broken chair, boxes from the last move, an old rug, a fan that stopped working — this is the service. You do not need to sort it, bag it or bring it downstairs. Send a photo, get a price, and a crew carries it out in one visit.
- **Unique angle:** The umbrella page. Owns the "I just want it gone" intent and the mixed-load use case. It explains what counts as junk and hands off specific item types (sofas, appliances, garden) and property-scale jobs (house, villa) to their own pages.
- **Recommended H2 structure:**
  1. What counts as junk
  2. A single piece or a full truckload
  3. Carried out, not just collected
  4. What we cannot take
- **Draft body content:**
  - *What counts as junk* — Almost anything that no longer earns its space: bulky items, general household junk, boxes, small furniture, broken or outdated things you have stopped using. It does not have to be sorted. If it is a sofa, an appliance or garden waste, we still take it, but those have their own pages with more detail. If it is whatever is left after the obvious stuff, it belongs here.
  - *A single piece or a full truckload* — A junk pickup is usually two to three crew with a covered truck. The same booking covers one awkward item or everything in a storage room. The photo you send decides the crew size and the time we block out: a small pile is under an hour, a full load can be half a day. Either way the quote is fixed before we arrive.
  - *Carried out, not just collected* — We do not ask you to leave things at the door or by the bins. The crew comes to where the items are, carries them out, protects floors and lifts on the way, and sweeps the spot before leaving. Stairs, tower lifts and dismantling are part of the job, not extras.
  - *What we cannot take* — Hazardous chemicals, paint solvents, gas cylinders and medical waste are not accepted. If your pile includes one of these, tell us and we will point you to a licensed handler for that item and take the rest.
- **Existing factual points reusable:** group 01 facts; job ladder "single item or one room — 2 crew, under an hour"; "Everything you no longer need, carried out and taken away in one visit"; hazardous list; floor/lift protection; sweep.
- **Typical / crew / time:** Typical: "Bulky items, general junk, single pieces or a full load" · Crew: "2 to 3 crew with a covered truck" · Time: "45 minutes to half a day".
- **FAQs (unique):**
  1. *Do I need to sort or bag anything before you arrive?* — No. Leave it where it is. The photo tells us what is coming and the crew handles carrying and loading.
  2. *Can you take just one item?* — Yes. Single pieces are a normal booking; a two-person crew usually clears one item in under an hour.
  3. *Is there a limit to how much you take in one visit?* — A full covered truck is one load. If your photo shows more than that, we plan multiple loads or a larger crew and quote for the whole job.
  4. *What if some of my junk is hazardous?* — We take everything except hazardous chemicals, paint solvents, gas cylinders and medical waste, and we will tell you where those can go.
- **Suggested related services:** `same-day-junk-removal`, `residential-junk-removal`, `house-clearance`, `furniture-removal`
- **Suggested popular areas (supported by area notes):** JVC (small and full loads), Mirdif (household junk), Dubai Silicon Oasis (bulky items)
- **Internal-link opportunities:** intro → `/how-it-works`; "What counts as junk" → `sofa-removal`, `appliance-disposal`, `garden-waste-removal`; "single piece or full truckload" → `house-clearance`; hazardous section → `/services` (full list); homepage FAQ "What items do you remove?" already links to `/services` — retarget to this page.
- **CTA angle:** "Send a photo of the pile. We will send the price." → WhatsApp + `/contact`.
- **Structured data available:** `Service` (name, description, `serviceType: "Junk removal"`, provider `@id`, areaServed Dubai, url, `availableChannel` WhatsApp URL), `BreadcrumbList`, `FAQPage` (4).
- **Missing facts that would improve this page:** `NEEDS BUSINESS INPUT` — (a) truck capacity in m³ or an everyday equivalent ("about one apartment's worth")? (b) Is there a minimum charge or a starting price you are happy to publish? (c) Do you take mattresses and rugs (implied by "mattresses" in furniture lists, but confirm for hygiene-related items)?

---

## 2. Garbage Removal

- **Service name:** Garbage Removal
- **Permanent slug:** `garbage-removal`
- **Primary search intent:** "garbage removal Dubai" / "rubbish collection service" — accumulated bags or refuse that regular building collection is not handling, often needing a repeat pickup.
- **Suggested SEO title:** Garbage Removal in Dubai — One-Off or Recurring Collection
- **Suggested meta description:** Household and office garbage collected fast when it piles up. One-off pickups or a recurring schedule, crews sized to the volume, fixed price from a photo.
- **Suggested H1:** Garbage removal in Dubai when the bins are not enough
- **Short intro:** Garbage removal is for the bagged and boxed waste that has outgrown the building's bins: after a party, a clean-out, a renovation, or simply a busy office week. Tell us how much there is and how often it happens, and we send the right size of crew, once or on a schedule.
- **Unique angle:** Frequency and volume. This is the only page that talks about recurring collection and sizing the crew to the pile. Waste from building works is handed to `waste-removal`.
- **Recommended H2 structure:**
  1. When garbage removal makes sense
  2. One-off pickup or a recurring schedule
  3. Homes, offices and sites
  4. Garbage we cannot collect
- **Draft body content:**
  - *When garbage removal makes sense* — The building's bins take everyday waste. They do not take forty bags after a clear-out, the boxes from a bulk delivery, or the debris a contractor left behind. When the pile is bigger than the bin, a crew comes to where the bags are, carries them down and takes them away in one trip.
  - *One-off pickup or a recurring schedule* — Most garbage jobs are a single visit. If waste builds up regularly — an office that fills its bins every few days, a site that produces debris weekly — we can set a recurring pickup instead of you messaging each time. The crew size follows the volume: two people for a household clear-out, up to four for a heavy office or site load.
  - *Homes, offices and sites* — Household bags, office waste and renovation debris are the usual loads. For towers we handle the service-lift booking; for offices we can work around your hours. Bags do not need to be carried to the lobby first.
  - *Garbage we cannot collect* — Hazardous chemicals, paint solvents, gas cylinders and medical waste stay out of the truck. If a bag might contain one of these, tell us when you send the photo.
- **Existing factual points reusable:** group 04 facts ("Household bags, office waste, renovation debris"; "2 to 4 crew depending on volume"; "Same-day or recurring schedule"); Deira note "recurring pickups"; service-lift booking; hazardous list.
- **Typical / crew / time:** Typical: "Household bags, office waste, renovation debris" · Crew: "2 to 4 crew depending on volume" · Time: "Same-day or recurring schedule".
- **FAQs (unique):**
  1. *Can you collect garbage on a regular schedule?* — Yes. Recurring pickups are available for homes, offices and sites; tell us the volume and how often it builds up and we will propose a schedule.
  2. *Do the bags need to be at the door or downstairs?* — No. The crew collects from where the waste is, including upper floors with a service lift.
  3. *Is renovation debris counted as garbage?* — Small bagged debris, yes. Loose mixed loads from a fit-out or demolition are handled as waste removal, which is quoted the same way.
  4. *How do you decide the crew size?* — From your photo. Two crew for a normal household load, up to four for a large office or site pickup.
- **Suggested related services:** `waste-removal`, `commercial-junk-removal`, `junk-removal`
- **Suggested popular areas:** Deira (commercial waste and recurring pickups), Business Bay (commercial loads), Al Barsha (offices and shop clear-outs)
- **Internal-link opportunities:** "recurring schedule" ↔ `commercial-junk-removal`; "renovation debris" → `waste-removal` (explicit disambiguation line); FAQ 3 → `waste-removal`; intro → `/contact`.
- **CTA angle:** "Send a photo of the pile and tell us if it will happen again." → WhatsApp.
- **Structured data available:** `Service` (serviceType "Garbage removal"), `BreadcrumbList`, `FAQPage` (4).
- **Missing facts:** `NEEDS BUSINESS INPUT` — (a) Which recurring frequencies do you actually offer (daily / weekly / fortnightly / on-call)? (b) Do you supply bags or bins for recurring customers? (c) Any minimum volume for a garbage pickup?

---

## 3. Furniture Removal

- **Service name:** Furniture Removal
- **Permanent slug:** `furniture-removal`
- **Primary search intent:** "furniture removal Dubai" / "old furniture disposal" — one or several large pieces (bed, wardrobe, dining set) that need dismantling and carrying out.
- **Suggested SEO title:** Furniture Removal in Dubai — Dismantled, Carried, Gone
- **Suggested meta description:** Beds, wardrobes, dining sets and mattresses dismantled where needed and loaded by hand. Two crew, tools included, most items cleared in under an hour.
- **Suggested H1:** Furniture removal in Dubai, dismantling and heavy lifting included
- **Short intro:** Furniture is our most common job: beds, wardrobes and dining sets that were assembled in the room and will not leave it in one piece. The crew arrives with tools, takes apart what needs taking apart, carries it down and loads it by hand. Usable pieces are passed on rather than dumped.
- **Unique angle:** Dismantling and hand-carrying of case furniture, plus reuse-first sorting. Sofas are explicitly handed off to `sofa-removal`.
- **Recommended H2 structure:**
  1. Beds, wardrobes and dining sets
  2. Taken apart where it will not fit
  3. Usable furniture is passed on
  4. Sofas have their own page
- **Draft body content:**
  - *Beds, wardrobes and dining sets* — These are the pieces we move most. A bed frame and mattress, a wardrobe that was built inside the bedroom, a six-seat dining set, a chest of drawers. One piece or the contents of a whole room, priced from your photo before we come.
  - *Taken apart where it will not fit* — Most large furniture went in flat-packed and has to come out the same way. The crew brings the tools, dismantles on site, and protects doorframes and lift interiors while carrying. You do not need to unscrew anything or clear a path beyond what is reasonable.
  - *Usable furniture is passed on* — Loads are sorted at our yard before anything reaches a landfill. Furniture that is still usable is passed on; wood goes to licensed handlers; only what is left goes to approved municipal facilities. If a piece is in good condition, mention it in your message.
  - *Sofas have their own page* — Sofas and corner units come with their own access problems, so they are covered separately. If your job is mostly a sofa, start there; if it is a sofa plus a bedroom's worth of furniture, book here and tell us both.
- **Existing factual points reusable:** service 03 blurb; group 02 facts (typical/crew/time); homepage FAQ "Do you remove furniture?" (most common jobs, dismantling); disposal stages (Reuse, Recycle wood); doorframe/lift protection.
- **Typical / crew / time:** Typical: "Sofas, beds, mattresses, wardrobes, dining sets" (from group 02 — on this page present as "Beds, mattresses, wardrobes, dining sets" and leave sofas to their page) · Crew: "2 crew, tools for dismantling" · Time: "Under an hour for most items".
- **FAQs (unique):**
  1. *Do I have to dismantle the wardrobe or bed myself?* — No. Dismantling is included; the crew brings the tools and takes it apart on site.
  2. *What happens to furniture that is still in good condition?* — Loads are sorted at our yard and usable pieces are passed on rather than dumped. Tell us in your message if something is still good.
  3. *Can you take a mattress on its own?* — Yes. Mattresses are a standard single-item job.
  4. *Will you scratch the floor or the lift?* — Floors, lift interiors and doorframes are protected while the crew carries, and the area is swept before they leave.
- **Suggested related services:** `sofa-removal`, `house-clearance`, `junk-removal`, `residential-junk-removal`
- **Suggested popular areas:** Dubai Hills (move-outs and handovers), Downtown Dubai (high-rise clear-outs), Dubai Marina (tower pickups with service-lift booking)
- **Internal-link opportunities:** H2 4 → `sofa-removal`; "contents of a whole room" → `house-clearance`; "passed on" → `/about#disposal`; intro → `/how-it-works`.
- **CTA angle:** "Photograph the piece and the doorway. We will quote and bring the tools."
- **Structured data available:** `Service` (serviceType "Furniture removal"), `BreadcrumbList`, `FAQPage` (4).
- **Missing facts:** `NEEDS BUSINESS INPUT` — (a) Where are usable items passed on to (charity, resale, named partner)? Only publish if you can name it. (b) Do you ever buy furniture or offer credit for resalable pieces? (c) Do you reassemble anything (e.g. moving a bed within the home) or is it removal only?

---

## 4. Sofa Removal

- **Service name:** Sofa Removal
- **Permanent slug:** `sofa-removal`
- **Primary search intent:** "sofa removal Dubai" / "how to get rid of old sofa" — one bulky, awkward item, usually in an apartment, often with a new one arriving.
- **Suggested SEO title:** Sofa Removal in Dubai — Through Tight Doors and Service Lifts
- **Suggested meta description:** Two-seaters to corner units carried out of apartments and villas, dismantled if the door or lift is too small. Fixed price from a photo, same-day slots where available.
- **Suggested H1:** Sofa removal in Dubai apartments and villas
- **Short intro:** The sofa went in when the flat was empty and the doors were off. Now it has to come out past a hallway, a lift and a lobby. That access problem is the whole job. Send a photo of the sofa and the tightest point on the way out, and we will tell you how we will get it through.
- **Unique angle:** Access problem-solving for one item: doorways, service lifts, corner units, timing around a new delivery. No item lists, no property-scale talk.
- **Recommended H2 structure:**
  1. Getting a sofa out of an apartment
  2. Two-seaters, L-shapes and corner units
  3. Timed around your new sofa
  4. Need the rest of the room cleared too?
- **Draft body content:**
  - *Getting a sofa out of an apartment* — The crew measures the route, books the service lift where the tower requires it, protects the lift interior and doorframes, and carries or dismantles depending on what fits. Stair carries are included where there is no lift. You send the photo; we plan the route.
  - *Two-seaters, L-shapes and corner units* — A two-seater is usually a straightforward carry. Corner units and L-shapes often have to be split into sections or have legs and backs removed to clear the door. The crew brings the tools for that and puts nothing back together you did not ask for.
  - *Timed around your new sofa* — A common reason to book: the new sofa is arriving and the old one is in the way. Tell us the delivery window and we will aim for a slot before it, often the same afternoon if you message in the morning and a crew is on route nearby.
  - *Need the rest of the room cleared too?* — If the sofa is part of a bigger clear-out, book furniture removal or a house clearance instead and mention the sofa; it is quoted as part of the load rather than as a separate visit.
- **Existing factual points reusable:** service 04 blurb ("Two-seaters to corner units, through tight doors and service lifts"); group 02 crew/time; SameDay copy ("new sofa arriving"); process step 03 (service-lift bookings); stair carries; hero example (sofa, 12th floor — illustrative, do not cite times).
- **Typical / crew / time:** Typical: "Two-seaters, L-shapes and corner units" (derived from service blurb) · Crew: "2 crew, tools for dismantling" (group 02) · Time: "Under an hour for most items" (group 02).
- **FAQs (unique):**
  1. *My sofa will not fit through the door. Can you still take it?* — Yes. Corner units and large sofas are split or partly dismantled on site so they clear the doorway and lift.
  2. *Can you remove the old sofa before the new one is delivered?* — Tell us the delivery window when you message. Morning requests can often be cleared the same afternoon where slots allow.
  3. *Do I need to book the building's service lift myself?* — No. Where the tower requires a service-lift booking we arrange it; just tell us your floor and building.
  4. *Is a sofa removal priced per item?* — It is priced from your photo as a fixed quote covering labour, loading and disposal; a single sofa is normally a two-crew job under an hour.
- **Suggested related services:** `furniture-removal`, `same-day-junk-removal`, `residential-junk-removal`
- **Suggested popular areas:** Dubai Marina (tower pickups, service-lift booking), Downtown Dubai (high-rise clear-outs, same-day slots), JVC (frequent routes)
- **Internal-link opportunities:** H2 3 → `same-day-junk-removal`; H2 4 → `furniture-removal`, `house-clearance`; "books the service lift" → `residential-junk-removal`; intro → `/how-it-works` (what to photograph).
- **CTA angle:** "Send two photos: the sofa and the doorway."
- **Structured data available:** `Service` (serviceType "Sofa removal"), `BreadcrumbList`, `FAQPage` (4).
- **Missing facts:** `NEEDS BUSINESS INPUT` — (a) Do you take sofa beds and recliners with mechanisms (heavier, sometimes treated differently)? (b) Is there a same-day cut-off time you would commit to in writing (currently "before midday" on the homepage)?

---

## 5. Appliance Disposal

- **Service name:** Appliance Disposal
- **Permanent slug:** `appliance-disposal`
- **Primary search intent:** "fridge disposal Dubai" / "washing machine removal" / "old AC unit disposal" — end-of-life white goods and electronics, with a concern about where they go.
- **Suggested SEO title:** Appliance Disposal in Dubai — Fridges, Washers, Ovens and AC Units
- **Suggested meta description:** Old fridges, freezers, washers, dryers, ovens, TVs and AC units collected with straps and trolley and passed to licensed handlers. Same visit, 30 to 60 minutes.
- **Suggested H1:** Appliance disposal in Dubai through licensed handlers
- **Short intro:** Appliances are heavy, awkward and should not end up in general landfill. We collect them from the kitchen, laundry or balcony, strap and trolley them out, and route metal and e-waste to licensed handlers. A single appliance is usually a two-person, same-visit job.
- **Unique angle:** The only page focused on *where things go after pickup* (metal and e-waste routing) and on heavy-item handling equipment. No furniture, no property talk.
- **Recommended H2 structure:**
  1. Appliances we collect
  2. Strapped, trolleyed, out in one visit
  3. Where old appliances go
  4. Small electronics and e-waste
- **Draft body content:**
  - *Appliances we collect* — Fridges and freezers, washers and dryers, ovens and cookers, split and window AC units, TVs and other e-waste. One unit or a kitchen's worth during a renovation or handover. Send a photo of each appliance; the model does not matter, the size and the route out do.
  - *Strapped, trolleyed, out in one visit* — Two crew arrive with straps and a trolley. Fridges are moved upright, floors and lift interiors are protected, and the unit is loaded in the same visit — usually 30 to 60 minutes on site. If the appliance is on an upper floor without a lift, stair carries are included.
  - *Where old appliances go* — Nothing is dumped as-is. Loads are sorted by material at our yard; metal and e-waste are handed to licensed handlers, and only the non-recoverable remainder goes to approved municipal facilities.
  - *Small electronics and e-waste* — TVs, monitors and similar electronics travel with the appliances. If your e-waste is from an office, the commercial page covers larger IT clear-outs on a schedule.
- **Existing factual points reusable:** service 05 blurb; group 03 facts; TAKES "Appliances" list; homepage FAQ "Do you remove appliances?" (licensed disposal or recycling handlers); disposal stage 04 (metal and e-waste to licensed handlers); DSO note (e-waste).
- **Typical / crew / time:** Typical: "Fridges, washers, ovens, TVs, AC units, e-waste" · Crew: "2 crew, straps and trolley" · Time: "Same visit, 30 to 60 minutes".
- **FAQs (unique):**
  1. *Do you disconnect the appliance?* — `NEEDS BUSINESS INPUT` (see below). Draft until answered: "Tell us when you send the photo whether the unit is still connected and we will confirm what the crew can do."
  2. *Can you take a fridge from a high floor?* — Yes. The crew uses straps and a trolley, books the service lift where the building requires it, and carries by stairs where there is none.
  3. *Is an old AC unit e-waste?* — We collect split and window units along with other appliances and route them with metal and e-waste to licensed handlers.
  4. *Do you collect a single TV?* — Yes. Small electronics are a normal single-item pickup and can be added to any other job.
- **Suggested related services:** `commercial-junk-removal` (IT/e-waste), `junk-removal`, `house-clearance`
- **Suggested popular areas:** Mirdif (household junk and appliance disposal), Dubai Silicon Oasis (e-waste), Al Barsha (apartments and offices)
- **Internal-link opportunities:** H2 3 → `/about#disposal`; H2 4 → `commercial-junk-removal`; "kitchen's worth during a renovation or handover" → `house-clearance`, `waste-removal`.
- **CTA angle:** "Photograph the appliance and the door it has to pass. We will confirm the slot."
- **Structured data available:** `Service` (serviceType "Appliance disposal"), `BreadcrumbList`, `FAQPage` (3–4 once FAQ 1 is confirmed).
- **Missing facts:** `NEEDS BUSINESS INPUT` — (a) Does the crew disconnect appliances (water, electrical, gas cookers, AC refrigerant lines), or must they be disconnected beforehand? This decides FAQ 1 and one sentence in H2 2. (b) Can you name the licensed e-waste handler(s), or provide a certificate of disposal on request? (c) Any appliances you refuse (e.g. gas-containing units)?

---

## 6. Waste Removal

- **Service name:** Waste Removal
- **Permanent slug:** `waste-removal`
- **Primary search intent:** "waste removal Dubai" / "renovation waste collection" / "fit-out debris removal" — loose, mixed material left after building work, a clear-out or site activity.
- **Suggested SEO title:** Waste Removal in Dubai — Renovation, Clear-Out and Site Loads
- **Suggested meta description:** Mixed loads from renovations, fit-outs, clear-outs and site work loaded by crew and sorted by material at our yard. Fixed price from a photo, one-off or on a schedule.
- **Suggested H1:** Waste removal in Dubai for renovation, clear-out and site loads
- **Short intro:** After the contractors leave, what stays behind is rarely one kind of thing: offcuts, broken tiles, packaging, old fittings, bags of everything. Waste removal is for those mixed loads. We load them, take them to our yard, separate by material and send each stream where it should go.
- **Unique angle:** Mixed-material loads from works and the sorting step. Explicitly *not* bagged everyday refuse (that is `garbage-removal`) and not furniture.
- **Recommended H2 structure:**
  1. Renovation and fit-out waste
  2. Clear-out loads and site work
  3. Sorted by material, not tipped
  4. Materials we do not carry
- **Draft body content:**
  - *Renovation and fit-out waste* — Debris after a kitchen or bathroom refit, offcuts and packaging from a fit-out, old fixtures pulled out before the new ones went in. The crew loads it from where it sits; you do not need to bag or stack it first. Photos of the pile and the access route give us the crew size.
  - *Clear-out loads and site work* — Storage rooms, shop fit-outs being stripped, small site clean-ups. These are quoted as a load, not per item, and can be a one-off visit or a repeat pickup while the work continues.
  - *Sorted by material, not tipped* — Every load goes to our yard first. Metal, wood and e-waste are separated for licensed handlers; anything reusable is set aside; the remainder goes to approved municipal facilities. Mixed loads are welcome precisely because the sorting happens on our side.
  - *Materials we do not carry* — Hazardous chemicals, paint solvents, gas cylinders and medical waste are not accepted. If a renovation left any of these behind, tell us and we will point you to a licensed handler while we clear everything else.
- **Existing factual points reusable:** service 06 blurb; group 04 facts (renovation debris; 2–4 crew; same-day or recurring); disposal stages; hazardous list; "Most of our work comes from move-outs, handovers and renovations".
- **Typical / crew / time:** Typical: "Renovation debris, fit-out waste, clear-out loads, site waste" (derived from service blurb + group 04) · Crew: "2 to 4 crew depending on volume" · Time: "Same-day or recurring schedule".
- **FAQs (unique):**
  1. *What is the difference between waste removal and garbage removal?* — Garbage is bagged everyday refuse that has piled up. Waste removal is loose, mixed material from renovation, fit-out, clear-out or site work. Both are quoted from a photo.
  2. *Do you take broken tiles and rubble?* — `NEEDS BUSINESS INPUT` (weight-based materials — see below). Draft: "Send a photo of the pile; we will confirm what the crew can load and quote accordingly."
  3. *Can you collect while the renovation is still running?* — Yes. Repeat pickups can be scheduled while the work continues rather than waiting for one big load at the end.
  4. *Does the waste need to be bagged?* — No. Loose loads are fine; sorting happens at our yard.
- **Suggested related services:** `garbage-removal`, `commercial-junk-removal`, `house-clearance`, `appliance-disposal`
- **Suggested popular areas:** Business Bay (office furniture and commercial loads), Deira (commercial waste), Al Barsha (shop clear-outs)
- **Internal-link opportunities:** FAQ 1 ↔ `garbage-removal`; "shop fit-outs being stripped" → `commercial-junk-removal`; H2 3 → `/about#disposal`; "old fixtures" / appliances → `appliance-disposal`.
- **CTA angle:** "Send a photo of the pile after the work. We will quote the load."
- **Structured data available:** `Service` (serviceType "Waste removal"), `BreadcrumbList`, `FAQPage` (3–4).
- **Missing facts:** `NEEDS BUSINESS INPUT` — (a) Do you accept heavy inert materials (rubble, concrete, tiles, soil in volume) and is there a weight limit per load? (b) Do you offer skips/bins as an alternative, or only crew-loaded pickups? (c) Is there anything specific to construction-site access (permits, timing) you routinely handle?

---

## 7. Garden Waste Removal

- **Service name:** Garden Waste Removal
- **Permanent slug:** `garden-waste-removal`
- **Primary search intent:** "garden waste removal Dubai" / "green waste collection villa" — cut branches, trimmings, soil, pots and tired outdoor furniture, mostly from villas.
- **Suggested SEO title:** Garden Waste Removal in Dubai — Branches, Soil, Pots and Outdoor Sets
- **Suggested meta description:** Branches, trimmings, soil bags, pots and old outdoor furniture cleared from villas and gardens with an open truck. Two crew, one to three hours.
- **Suggested H1:** Garden waste removal for Dubai villas and outdoor spaces
- **Short intro:** Garden waste is bulky, dirty and does not fit the household bins. After a landscaper's visit, a seasonal cut-back or a balcony refresh, we clear the branches, trimmings and soil bags, and take the cracked pots and faded outdoor set at the same time. Two crew, an open truck, usually a couple of hours.
- **Unique angle:** Outdoor-only loads and the open truck; the only page that pairs green waste with outdoor furniture. Villa-adjacent without being a full clearance.
- **Recommended H2 structure:**
  1. Green waste we collect
  2. Old outdoor furniture goes too
  3. Open truck, quick turnaround
  4. Part of a bigger villa job?
- **Draft body content:**
  - *Green waste we collect* — Branches and palm fronds, hedge trimmings, bagged soil and leaves, dead plants, broken pots and planters. Leave it where the gardener left it; the crew loads from the garden, side access or gate, whichever the villa allows.
  - *Old outdoor furniture goes too* — Rusted loungers, a cracked plastic table, a sun-bleached rattan set. Outdoor furniture is loaded with the green waste in the same visit and sorted with the rest at our yard, so usable pieces can be passed on.
  - *Open truck, quick turnaround* — Garden loads travel in an open truck rather than a covered one, which suits loose branches and soil. Two crew normally clear a villa garden's worth in one to three hours, and the quote is fixed from your photos before they come.
  - *Part of a bigger villa job?* — If the garden is one part of a full move-out, book a villa clearance instead: it covers garden, storage, maid room and majlis with a larger crew and can run over more than one day.
- **Existing factual points reusable:** service 07 blurb; group 05 facts ("Trimmings, branches, soil, pots, outdoor sets"; "2 crew with open truck"; "One to three hours"); Jumeirah note (villa clearances and garden waste); Arabian Ranches note (garden and storage); villa clearance scope; disposal Reuse stage.
- **Typical / crew / time:** Typical: "Trimmings, branches, soil, pots, outdoor sets" · Crew: "2 crew with open truck" · Time: "One to three hours".
- **FAQs (unique):**
  1. *Do you take soil and sand?* — Bagged soil is part of a normal garden load. For large loose volumes, send a photo and we will confirm the crew and truck needed.
  2. *Can you clear the garden while I am not home?* — `NEEDS BUSINESS INPUT` (unattended access policy). Draft: "Tell us the access arrangement (gate, side entrance, security) when you book and we will confirm."
  3. *Do you remove the old outdoor set as well as the green waste?* — Yes. Outdoor furniture is loaded in the same visit and sorted with the load.
  4. *Do you cut or trim plants?* — No. We remove what has already been cut; a landscaper does the cutting.
- **Suggested related services:** `villa-clearance`, `junk-removal`, `furniture-removal`
- **Suggested popular areas:** Jumeirah (villa clearances and garden waste), Arabian Ranches (garden and storage), Palm Jumeirah (villas, gate access arranged)
- **Internal-link opportunities:** H2 4 → `villa-clearance`; "usable pieces passed on" → `/about#disposal`; "outdoor set" → `furniture-removal`.
- **CTA angle:** "Photograph the pile from the gate. We will quote the load."
- **Structured data available:** `Service` (serviceType "Garden waste removal"), `BreadcrumbList`, `FAQPage` (3–4).
- **Missing facts:** `NEEDS BUSINESS INPUT` — (a) Can jobs run unattended with gate/side access, and what do you need from the owner or security? (b) Is green waste composted or handled differently from general waste (only publish if true)? (c) Any limit on branch length/trunk size or loose-soil volume?

---

## 8. House Clearance

- **Service name:** House Clearance
- **Permanent slug:** `house-clearance`
- **Primary search intent:** "house clearance Dubai" / "apartment clearance before handover" / "move-out clear-out" — an entire apartment or house emptied, usually against a handover, inspection or lease-end date.
- **Suggested SEO title:** House Clearance in Dubai — Ready for Handover
- **Suggested meta description:** Apartments from studio to four bedrooms and family homes cleared room by room or all at once, swept and ready for inspection. Crew sized to the property, fixed price from photos.
- **Suggested H1:** House and apartment clearance in Dubai before you hand over
- **Short intro:** Most house clearances have a date attached: the lease ends, the landlord inspects, the buyer takes the keys. We plan backwards from that date, send a crew sized to the property, confirm the inventory with you before loading, and leave the place swept and empty.
- **Unique angle:** Deadline-driven whole-property jobs for apartments and houses: inventory confirmation, room-by-room option, handover readiness. Villas (bigger, multi-day) are a separate page.
- **Recommended H2 structure:**
  1. Move-outs, handovers and inspections
  2. Room by room or the whole home at once
  3. Confirmed before anything is loaded
  4. Larger than a house?
- **Draft body content:**
  - *Move-outs, handovers and inspections* — Tell us the time you need the space clear by and we work back from it. Building rules on move-out timings and NOC paperwork are asked for upfront so the crew is not turned away at the gate. Tower access and service-lift bookings are handled where required.
  - *Room by room or the whole home at once* — A studio to four-bedroom apartment is usually a three-crew, half-day job. If you are still living there, we can clear one room or the storage first and come back for the rest; if it is already empty, one visit takes everything from furniture to the last bag.
  - *Confirmed before anything is loaded* — A named crew lead walks the property with you and confirms the inventory before the first item moves. Anything you want kept stays. Floors, lifts and doorframes are protected during the carry, and the rooms are swept before the crew leaves.
  - *Larger than a house?* — Villas with garden, storage, maid room and majlis need a bigger crew and often more than one day. They have their own page.
- **Existing factual points reusable:** service 08 blurb ("Room by room or the whole house, ready for handover"); job ladder "apartment clearance — 3 crew, half day"; Clearance card "Studio to four bedrooms, tower access included"; PREP list (NOC, move-out timings, time needed by); crew lead inventory confirmation; process step 05 (swept, ready to use, sell or hand over); Dubai Hills note.
- **Typical / crew / time:** Typical: "Full properties, move-outs, handovers, storage rooms" (group 06) · Crew: "3 crew, half day" for apartments (job ladder) — present as "3 crew for a typical apartment; more for larger homes" · Time: "Half a day for a typical apartment" (job ladder).
- **FAQs (unique):**
  1. *Can you clear the apartment while I still live there?* — Yes. We can clear one room or the storage first and return for the rest, or do everything in one visit once you have moved out.
  2. *How do you make sure you do not take something I want to keep?* — The crew lead confirms the inventory with you before loading. Mark or separate anything staying and it stays.
  3. *Do you handle the building's move-out paperwork?* — We ask for the building's move-out rules and any NOC requirements in advance and handle service-lift bookings where the tower requires them. The NOC itself is issued to you by the building; tell us what they need.
  4. *Will the place be ready for the landlord inspection?* — The crew sweeps the rooms before leaving so the property is empty and clean of debris. Deep cleaning is not part of the service.
- **Suggested related services:** `villa-clearance`, `residential-junk-removal`, `furniture-removal`, `appliance-disposal`
- **Suggested popular areas:** Dubai Hills (move-outs and handover clearances), Downtown Dubai (high-rise clear-outs), Dubai Marina (tower pickups)
- **Internal-link opportunities:** H2 4 → `villa-clearance`; H2 1 → `residential-junk-removal` (building permissions detail) and `/how-it-works#prep` (what to send); "last bag" → `garbage-removal`; appliances in kitchens → `appliance-disposal`.
- **CTA angle:** "Send a photo of each room and your handover date."
- **Structured data available:** `Service` (serviceType "House clearance"), `BreadcrumbList`, `FAQPage` (4).
- **Missing facts:** `NEEDS BUSINESS INPUT` — (a) Do you offer any cleaning beyond sweeping (FAQ 4 assumes not)? (b) Can you provide a completion note/photos for landlords or agents? (c) Do you handle keys/handover on the owner's behalf when they are abroad?

---

## 9. Villa Clearance

- **Service name:** Villa Clearance
- **Permanent slug:** `villa-clearance`
- **Primary search intent:** "villa clearance Dubai" / "clear a whole villa" — a large detached property with outbuildings, garden and storage, often multi-day.
- **Suggested SEO title:** Villa Clearance in Dubai — Garden, Storage, Maid Room and Majlis
- **Suggested meta description:** Full villa clearances with crews of four or more and multiple loads, covering garden, storage, maid room and majlis. Scheduled over one to two days, fixed price from photos.
- **Suggested H1:** Full villa clearance across Dubai, scheduled over one or two days
- **Short intro:** A villa is not an apartment with more rooms. It has a garden, a storage room, a maid's room, a majlis, and years of things in each of them. Clearing it takes a larger crew, more than one truckload, and sometimes more than one day. This page explains how we plan that.
- **Unique angle:** Scale and scheduling: 4+ crew, multiple loads, multi-day planning, gate access, sorting reusable items from a large mixed load. The only page discussing villa-specific spaces.
- **Recommended H2 structure:**
  1. Every part of the villa
  2. Crew size, loads and days
  3. Sorting what is still useful
  4. Gate access and community rules
- **Draft body content:**
  - *Every part of the villa* — Living rooms and bedrooms are the easy part. The clearance also covers the majlis, the maid's room, the storage room under the stairs, the garage, the garden and whatever is on the roof terrace. Send photos of each space so the quote covers the whole property, not just the furniture you can see from the door.
  - *Crew size, loads and days* — Villa jobs run with four or more crew and multiple truckloads. Depending on the volume, we schedule one long day or split it over two, and the quote stays fixed unless the load turns out to be different from the photos.
  - *Sorting what is still useful* — Large clearances produce a lot that is still usable. Loads are sorted at our yard: furniture in good condition is passed on, metal, wood and e-waste go to licensed handlers, garden waste and the remainder are handled separately. Point out anything valuable and the crew lead will confirm it with you before loading.
  - *Gate access and community rules* — Gated communities have their own rules for contractor access and timings. Tell us the community when you book and we will arrange gate access and plan the crew's arrival around it.
- **Existing factual points reusable:** service 09 blurb; group 06 facts; job ladder "villa clearance — 4+ crew, one to two days"; homepage FAQ "Do you clear villas?" (garden, storage, maid room, more than one day); Clearance card "Whole-property clearances, garden and storage included"; group 06 blurb ("storage, majlis and garden"); Palm note (gate access arranged); Arabian Ranches note (large villa crews).
- **Typical / crew / time:** Typical: "Full villas, move-outs, handovers, garden and storage" · Crew: "4 or more crew, multiple loads" · Time: "Half a day to two days" (group 06) / "one to two days" (job ladder) — use "One to two days depending on volume".
- **FAQs (unique):**
  1. *How many days does a villa clearance take?* — Usually one to two, depending on volume. We tell you the plan with the quote so you know which day each part of the villa is cleared.
  2. *Do you clear the garden and outbuildings as part of it?* — Yes. Garden, storage, maid room, majlis and garage are all included when you send photos of them.
  3. *Can you work in a gated community?* — Yes. Tell us the community and we arrange gate access and follow its contractor timings.
  4. *What happens to the good furniture in a full villa?* — It is separated at our yard and passed on rather than dumped. Flag valuable pieces in advance and the crew lead confirms them with you on site.
- **Suggested related services:** `house-clearance`, `garden-waste-removal`, `furniture-removal`, `appliance-disposal`
- **Suggested popular areas:** Arabian Ranches (large villa crews, garden and storage), Jumeirah (villa clearances), Palm Jumeirah (villas, gate access arranged)
- **Internal-link opportunities:** intro/H2 1 ↔ `house-clearance` (disambiguation); garden → `garden-waste-removal`; H2 3 → `/about#disposal`; "quote stays fixed" → `/how-it-works`.
- **CTA angle:** "Photograph every space, including the garden and storage. We will plan the days."
- **Structured data available:** `Service` (serviceType "Villa clearance"), `BreadcrumbList`, `FAQPage` (4).
- **Missing facts:** `NEEDS BUSINESS INPUT` — (a) Do you handle community permits/NOCs for contractors in named developments, or does the owner? (b) Is there a largest job you would cite as an example (number of loads) — only if real? (c) Do you offer storage or holding of items during a villa move (currently no such service in the code)?

---

## 10. Same-Day Junk Removal

- **Service name:** Same-Day Junk Removal
- **Permanent slug:** `same-day-junk-removal`
- **Primary search intent:** "same day junk removal Dubai" / "junk removal today" — urgency: a deadline today or tomorrow.
- **Suggested SEO title:** Same-Day Junk Removal in Dubai — Message Before Midday
- **Suggested meta description:** Message before midday and the nearest crew on route can clear your junk the same afternoon where slots allow. Urgent single items or a full apartment, fixed price from a photo.
- **Suggested H1:** Same-day junk removal in Dubai when it has to go today
- **Short intro:** Landlord inspection at five. New sofa arriving at three. Handover tomorrow morning. Same-day pickup works by matching your message to a crew already on route in your part of Dubai. This page explains how that happens, what makes it possible, and what to send so we can say yes quickly.
- **Unique angle:** Timing mechanics. This is the only page about *when*: the morning cut-off, routing, slot availability, deadline-driven planning. It does not list items or property types.
- **Recommended H2 structure:**
  1. How same-day pickup works
  2. What makes a same-day slot possible
  3. Working back from your deadline
  4. When it cannot be today
- **Draft body content:**
  - *How same-day pickup works* — Crews run daily routes across the city. When you message in the morning with a photo and your area, we check which crew will be nearest that afternoon and whether their route has room for your load. If it does, you get a fixed price and an arrival window in the same conversation.
  - *What makes a same-day slot possible* — Messaging early in the day, a clear photo, your floor and whether there is a service lift, and the time you need the space clear by. Those four things let us confirm without a call-back. Building permissions still apply, so if your tower needs a lift booking or NOC, say so straight away.
  - *Working back from your deadline* — Tell us the time the space must be clear, not the time you would like us to arrive. We plan the slot backwards from the deadline, including the carry and the sweep, so the crew is finished when you need them to be.
  - *When it cannot be today* — Same-day depends on slots and your area. If the nearest crew is full, we tell you immediately and offer the next available slot rather than promising an afternoon we cannot keep. Booking the evening before for a next-morning pickup is the surest option.
- **Existing factual points reusable:** service 10 blurb; group 07 facts ("Urgent single items or a full apartment"; "Nearest available crew on route"; "Same afternoon where slots allow"); ActionStrip ("Message before midday and a crew can reach you the same afternoon"); SameDay copy (move-out deadline, new sofa arriving, landlord inspection; "work back from it"); homepage FAQ "Do you offer same-day pickup?" (early in the day, depending on area); DubaiMap ("Crews run daily routes across the city"); PREP list; Downtown note (same-day slots).
- **Typical / crew / time:** Typical: "Urgent single items or a full apartment" · Crew: "Nearest available crew on route" · Time: "Same afternoon where slots allow".
- **FAQs (unique):**
  1. *What is the latest I can message for a same-day pickup?* — Before midday gives the best chance; the earlier the better. `NEEDS BUSINESS INPUT` if you want a firm cut-off time published.
  2. *Is same-day available in every area?* — It depends on where the crews are that day. Send your area with the photo and we will tell you straight away whether today is possible.
  3. *Does a same-day pickup cost more?* — `NEEDS BUSINESS INPUT`. Draft: "Same-day jobs are quoted the same way as any other — a fixed price from your photo covering labour, loading and disposal."
  4. *Can you clear a full apartment the same day?* — Where a crew has the slot, yes; a full apartment is a normal same-day request. Larger properties are planned for the next available day.
- **Suggested related services:** `junk-removal`, `sofa-removal`, `house-clearance`, `residential-junk-removal`
- **Suggested popular areas:** Downtown Dubai (same-day slots), Dubai Marina (tower pickups), JVC (frequent routes)
- **Internal-link opportunities:** H2 2 → `/how-it-works` (prep list) and `residential-junk-removal` (permissions); H2 1 → `/areas` (daily routes); FAQ 4 → `house-clearance`; "new sofa arriving" → `sofa-removal`.
- **CTA angle:** "Send the photo now, with your area and the time it must be clear by."
- **Structured data available:** `Service` (serviceType "Same-day junk removal"), `BreadcrumbList`, `FAQPage` (3–4 once inputs answered).
- **Missing facts:** `NEEDS BUSINESS INPUT` — (a) A firm same-day cut-off time you will stand behind (e.g. "message by 12:00")? (b) Is there any surcharge for same-day, or is it identical pricing? (c) Are there days/times (e.g. Friday mornings) when same-day is not offered?

---

## 11. Residential Junk Removal

- **Service name:** Residential Junk Removal
- **Permanent slug:** `residential-junk-removal`
- **Primary search intent:** "junk removal apartment Dubai" / "building NOC for moving furniture out" — home owners and tenants in towers and communities who are worried about building rules, lifts and access more than about the items.
- **Suggested SEO title:** Residential Junk Removal in Dubai — Building Permissions Handled
- **Suggested meta description:** Junk removal for apartments and homes with building permissions, service-lift bookings and move-out timings handled for you. Floors and lifts protected, fixed price from a photo.
- **Suggested H1:** Residential junk removal for Dubai apartments and homes
- **Short intro:** In a Dubai tower the hard part is often not the sofa; it is the building. Service-lift bookings, move-out windows, NOC forms, security at the gate. Residential junk removal is our standard pickup plus all of that handled in advance, so the crew arrives with permission to work and leaves nothing for the building manager to complain about.
- **Unique angle:** Building logistics and property protection. The page that talks to tenants and owners about rules, permissions, timings and lift bookings. Items are secondary; junk-removal and house-clearance cover those.
- **Recommended H2 structure:**
  1. Building permissions and service lifts
  2. Apartments, homes and communities
  3. Protecting the building on the way out
  4. What to send us for a tower pickup
- **Draft body content:**
  - *Building permissions and service lifts* — Many towers require a service-lift booking and a move-out permission before anything bulky leaves a unit. We handle the lift booking where the tower requires it and ask for the building's rules and NOC requirements before the day, so the crew is expected at reception rather than turned away.
  - *Apartments, homes and communities* — Studio apartments, family homes, townhouses in gated communities. Each has a different gatekeeper: reception, security, a community office. Tell us where you are and we adapt: lobby timings for towers, gate access for communities, and daily routes that already cover most of the city.
  - *Protecting the building on the way out* — Lift interiors, corridor floors and doorframes are protected while the crew carries. Items that will not fit are dismantled inside the unit rather than forced through a doorway. The unit and the lift lobby are left swept.
  - *What to send us for a tower pickup* — A wide photo of the room, a close-up of the largest item, your floor number, whether a service lift is available, and any building rule on timings. With those we can quote and book the lift in one go.
- **Existing factual points reusable:** service 11 blurb ("Apartments and homes, with building permissions handled for you"); process step 03; PREP list; Clearance card "tower access included"; Marina note (service-lift booking handled); Palm note (gate access arranged); crew protection facts; sweep.
- **Typical / crew / time:** Typical: "Single items to a full apartment, in towers and communities" (derived) · Crew: "2 to 3 crew" (group 01 baseline) · Time: "Under an hour to half a day depending on the load" (job ladder). Mark crew/time as *inherited from junk-removal* in the data so they are not presented as a separate promise.
- **FAQs (unique):**
  1. *Do you book the service lift with my building?* — Where the tower requires it, yes. Give us your building and floor and we arrange the booking for the pickup slot.
  2. *What is an NOC and do I need one to remove furniture?* — Some buildings ask tenants for a no-objection form before bulky items leave. The building issues it to you; tell us what they require and we will fit the pickup to it.
  3. *Can the crew come during the building's allowed move-out hours only?* — Yes. Tell us the building's timing rules and we schedule inside them.
  4. *Will the building manager have anything to complain about?* — Lifts, floors and doorframes are protected and the area is swept before the crew leaves.
- **Suggested related services:** `house-clearance`, `junk-removal`, `sofa-removal`, `same-day-junk-removal`
- **Suggested popular areas:** Dubai Marina (tower pickups, service-lift booking), Palm Jumeirah (villas and apartments, gate access), Dubai Hills (move-outs and handovers)
- **Internal-link opportunities:** H2 4 → `/how-it-works`; H2 2 → `/areas`; "full apartment" → `house-clearance`; "commercial premises" pointer → `commercial-junk-removal` (one-line disambiguation).
- **CTA angle:** "Tell us the building and the floor. We will handle the rest of the paperwork."
- **Structured data available:** `Service` (serviceType "Residential junk removal"), `BreadcrumbList`, `FAQPage` (4).
- **Missing facts:** `NEEDS BUSINESS INPUT` — (a) Do you ever obtain the NOC on the tenant's behalf, or only work within one the tenant obtained? (b) Are there buildings/communities you regularly work in that could be named as examples (only if you want them public)? (c) Does the crew carry ID/trade licence for reception check-in?

---

## 12. Commercial Junk Removal

- **Service name:** Commercial Junk Removal
- **Permanent slug:** `commercial-junk-removal`
- **Primary search intent:** "office clearance Dubai" / "commercial junk removal" / "shop fit-out clear-out" — businesses clearing offices, shops or warehouses, often outside trading hours and sometimes on a schedule.
- **Suggested SEO title:** Commercial Junk Removal in Dubai — Offices, Shops and Warehouses
- **Suggested meta description:** Office strip-outs, shop clear-outs and warehouse loads cleared out of hours or on a recurring schedule. Desks, partitions, IT waste and stock loaded by crew, fixed price from photos.
- **Suggested H1:** Commercial junk removal for Dubai offices, shops and warehouses
- **Short intro:** Business clear-outs have two extra constraints: they cannot disrupt trading, and they usually involve furniture and equipment in quantity. We work out of hours where you need it, size the crew to the floor plate, and take desks, partitions, IT waste and old stock in the same load.
- **Unique angle:** Business premises, out-of-hours work, recurring schedules, and IT/e-waste in volume. The only page addressing a company rather than a household.
- **Recommended H2 structure:**
  1. Offices, shops and warehouses
  2. Out of hours and on a schedule
  3. Desks, partitions and IT waste
  4. One contact, one fixed price
- **Draft body content:**
  - *Offices, shops and warehouses* — An office floor being vacated, a shop being stripped before a new fit-out, a warehouse corner full of dead stock and packaging. Each is quoted as a load from your photos, with the crew sized to the volume and the access — loading bay, goods lift or shopfront.
  - *Out of hours and on a schedule* — Strip-outs can run out of hours so trading and staff are not disrupted. Where waste builds up continuously — packaging, site waste, regular office clear-outs — a recurring pickup replaces ad-hoc messages.
  - *Desks, partitions and IT waste* — Workstations are dismantled on site, partitions and cabinets carried out, and IT equipment travels with the load as e-waste to licensed handlers rather than general waste.
  - *One contact, one fixed price* — Send photos of the space and tell us the hours you can give us. You get one fixed quote covering labour, loading and disposal, one crew lead on site, and the space swept when they leave.
- **Existing factual points reusable:** service 12 blurb ("Offices, shops and warehouses, out of hours when you need it"); Clearance cards "Desks, partitions and IT waste, out of hours if needed" and "Shops, warehouses and site waste on a schedule"; job ladder "office or commercial strip-out — out of hours available"; group 04 "Same-day or recurring schedule"; Business Bay, Deira, Al Barsha, DSO notes; disposal stage 04 (e-waste).
- **Typical / crew / time:** Typical: "Office furniture, partitions, IT waste, shop fit-outs, warehouse stock" (derived from existing card copy) · Crew: `NEEDS BUSINESS INPUT` (no commercial crew size in code; job ladder only says "out of hours available") — interim: "Sized to the floor plate" · Time: "Out of hours available; recurring schedule where needed".
- **FAQs (unique):**
  1. *Can you clear the office at night or over the weekend?* — Yes. Out-of-hours strip-outs are how most office jobs run; tell us the hours the building allows.
  2. *Do you take old computers and monitors?* — Yes. IT equipment is loaded with the rest and handed to licensed handlers as e-waste.
  3. *Can we set up regular pickups for packaging and site waste?* — Yes. Recurring schedules are available for premises that produce waste continuously.
  4. *Do you provide an invoice and VAT documentation?* — `NEEDS BUSINESS INPUT`. Not drafted until confirmed.
- **Suggested related services:** `waste-removal`, `appliance-disposal`, `garbage-removal`, `junk-removal`
- **Suggested popular areas:** Business Bay (office furniture and commercial loads), Deira (commercial waste and recurring pickups), Dubai Silicon Oasis (offices, e-waste), Al Barsha (offices and shop clear-outs)
- **Internal-link opportunities:** H2 3 → `appliance-disposal`; "packaging, site waste" → `waste-removal`, `garbage-removal`; "residential" pointer → `residential-junk-removal`; H2 4 → `/how-it-works`.
- **CTA angle:** "Send photos of the floor and the hours we can have it."
- **Structured data available:** `Service` (serviceType "Commercial junk removal", `audience: BusinessAudience`), `BreadcrumbList`, `FAQPage` (3, or 4 once invoicing is confirmed).
- **Missing facts:** `NEEDS BUSINESS INPUT` — (a) Typical crew size and duration for an office floor / shop strip-out (nothing in the code). (b) Do you issue VAT invoices, work on purchase orders, or sign recurring contracts? (c) Do you provide e-waste disposal certificates for corporate compliance? (d) Any facility-management or landlord requirements you routinely meet (insurance certificate, trade licence copy)?

---

## Content readiness summary

| # | Slug | Status | What is still needed |
|---|---|---|---|
| 1 | `junk-removal` | **READY** | Optional: truck capacity, minimum charge |
| 2 | `garbage-removal` | **READY WITH MINOR INPUT** | Which recurring frequencies are offered (one sentence + FAQ 1 wording) |
| 3 | `furniture-removal` | **READY** | Optional: where usable items are passed on |
| 4 | `sofa-removal` | **READY** | Optional: sofa beds/recliners, firm same-day cut-off |
| 5 | `appliance-disposal` | **READY WITH MINOR INPUT** | Disconnection policy (FAQ 1 + one sentence in H2 2) |
| 6 | `waste-removal` | **READY WITH MINOR INPUT** | Heavy/inert materials and weight limit (FAQ 2) |
| 7 | `garden-waste-removal` | **READY** | Optional: unattended access policy (FAQ 2 can be dropped) |
| 8 | `house-clearance` | **READY** | Optional: cleaning scope confirmation (FAQ 4 assumes sweep only) |
| 9 | `villa-clearance` | **READY** | Optional: who handles community permits |
| 10 | `same-day-junk-removal` | **READY WITH MINOR INPUT** | Same-day pricing parity (FAQ 3) and firm cut-off (FAQ 1) — page ships with the two FAQs dropped if unanswered |
| 11 | `residential-junk-removal` | **READY** | Optional: NOC handling detail |
| 12 | `commercial-junk-removal` | **READY WITH MINOR INPUT** | Crew/time facts for the facts block; invoicing/VAT (FAQ 4) |

**READY: 8 · READY WITH MINOR INPUT: 4 · BLOCKED: 0.**

"Ready with minor input" pages can be implemented in Phase 3 with the flagged FAQ/sentence omitted; none needs to ship `noIndex`. All 12 pages meet the minimum depth rule using existing facts only.

### Consolidated business questions (answer to unlock the flagged items)

1. **Insurance** — Is the crew/work insured and can it be stated? (Currently claimed on `/about`; not reused on service pages until confirmed.)
2. **Garbage recurring frequencies** — daily / weekly / fortnightly / on-call? Bags or bins supplied?
3. **Appliance disconnection** — does the crew disconnect water/electrical/gas/AC units, or must they be disconnected first? Any appliances refused? Disposal certificates available?
4. **Heavy waste** — do you take rubble, concrete, tiles, loose soil in volume? Weight limit per load? Skips offered?
5. **Same-day** — a firm cut-off time you will publish; any surcharge; any days/times excluded.
6. **Commercial** — typical crew size and time for an office/shop strip-out; VAT invoices / POs / contracts; e-waste certificates; insurance or licence documents for landlords.
7. **Reuse destination** — can the charity/resale destination for usable furniture be named?
8. **Unattended jobs** — will crews work with gate/side access when the owner is absent, and what is required?
9. **NOC** — do you ever obtain building NOCs on the customer's behalf?
10. **Pricing** — is any minimum charge or starting price acceptable to publish? (Nothing price-related is drafted; all pages rely on "fixed quote from a photo".)
