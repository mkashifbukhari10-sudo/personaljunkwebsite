# Image Backlog — Junk Services Dubai

**Status:** Live tracking file. One row per article awaiting a cover image.
**Purpose:** A missing cover image must never stall article writing. Articles are written, QA'd and held; the image requirement is tracked here and resolved in parallel.

| File | Role |
|---|---|
| [`image.md`](./image.md) | **The rules** — sourcing, licensing, provenance, honesty, alt text, QA |
| **`image-backlog.md`** (this file) | **The queue** — which articles need what, and where each stands |
| [`article-registry.md`](./article-registry.md) | Article state; D-2 in §7.4 points here |

**Authority:** Subordinate to `image.md`. This file schedules work; it never relaxes a rule.

> ### Active sourcing route: **C — properly licensed stock**
>
> Confirmed 2026-09-20. Until own photography (Route A) exists, article covers are sourced as **properly licensed stock**, under the conditions `image.md` §6 already sets:
>
> - the licence must cover **commercial web use**, and proof is retained
> - the image must **not imply it depicts this business** — not our crew, our customer, our vehicle, our property, or a job we completed
> - **the AI-generated library in `public/images/` is not a source for article covers** (Route D, closed)
> - **final alt text is written only after the selected image has been inspected**, and describes what is visibly there
>
> **A missing cover never stops the next article being written.** Articles are written, QA’d and held at `DRAFTING`; covers are resolved in parallel through this backlog.

---

## Standing rules

Restated only as operating constraints — the reasoning lives in `image.md`.

1. **A missing image blocks publication, not writing.** An article with no cover is complete and held, not unfinished.
2. **Never invent provenance.** If where an image came from cannot be established, it is not used.
3. **Never use competitor images**, search-result images of unknown licence, or anything with an unclear licence.
4. **Final alt text is written only after the actual image is selected and visually inspected.** It describes what is visibly there, and must not imply company crew, a real customer, a completed job or a named location unless provenance supports that claim.
5. **Subject dictates sourcing.** An image that reads as *"this is our crew / our truck / our job"* may only be the business's own photography (`image.md` §7). Where the subject does not imply the business, licensed or Creative Commons sourcing is open.
6. **Every third-party image gets a credits-register entry** and its attribution in the Media `caption` field — EXIF credits are destroyed on upload.
7. **Set the focal point** on every cover. The same file is cropped twice: the page band and the 1200×630 social card.

## Technical spec — all covers

| Property | Requirement |
|---|---|
| Orientation | **Landscape.** Portrait and square are unusable in this slot. |
| Source size | **≥1600px wide; ~2400px on the long edge is ideal** (the pipeline caps at 2400px). |
| Aspect ratio | 16:9 or wider. The page band renders at `clamp(220px, 34vw, 520px)` tall, cover-cropped. |
| Safe area | Subject **horizontally central**; nothing critical near the top or bottom edge. Must survive a 1200×630 crop to the focal point. |
| Text in image | None. |
| File | JPEG or PNG, not pre-crushed. Descriptive filename. |

## Sourcing routes

| Route | When it may be used | Extra requirement |
|---|---|---|
| **A · Own photography** | Always. **Required** where the subject implies this business. | Consent for identifiable people or customer property (`image.md` §12) |
| **B · Creative Commons / public domain** | Where the subject does not imply this business | Licence verified on the source page · attribution in `caption` · credits-register entry. **CC-NC and CC-ND are unusable** — the pipeline re-encodes and crops. |
| **C · Licensed stock** | Where the subject does not imply this business | Licence covering commercial web use · proof retained |
| **D · Approved existing inventory** | ⛔ **CLOSED** — see below | — |

> **Route D is closed. I-1 was resolved on 2026-09-20: the existing library is AI-generated**, confirmed by signed C2PA Content Credentials (OpenAI Media Service API · `gpt-image` v2.0 · `trainedAlgorithmicMedia`). Under `image.md` §7 those images may not depict this business, its crew, its vehicles or its work — which is exactly what an article cover does. **Route D does not reopen unless §7 is deliberately amended, which is a business decision and has not been taken.**
>
> **The Wikimedia Commons area photography is unaffected** and remains genuine licensed material — but it depicts communities, not clearance work, so it does not fit these four briefs.

---

## Completed assets — sourced, verified, uploaded

**Route C (free licensed stock, Unsplash License — commercial use permitted, modification permitted, attribution not required).** Every image below was **visually inspected before use** and its alt text written from what is actually visible. Provenance recorded here because WebP conversion strips embedded metadata.

| Media ID | File | Source | Photo ID | Licence | Used as | Alt text |
|---|---|---|---|---|---|---|
| 69 | `empty-room-before-handover.webp` | Unsplash | `photo-1757742690834-aa581b9f53b2` | Unsplash License | #6 cover + OG | An empty room with a wooden floor and tall windows, cleared except for a small bracket left on the wall. |
| 70 | `cut-palm-fronds-on-the-ground.webp` | Unsplash | `photo-1728011279859-c4b3bc096035` | Unsplash License | #13 cover + OG | A dense pile of cut palm fronds, green fading to yellow at the cut ends. |
| 71 | `palm-tree-being-pruned.webp` | Unsplash | `photo-1781297770538-605dccdc52a7` | Unsplash License | #13 body | A tree worker roped to a palm trunk cutting fronds, with a chainsaw hanging on a rope below him. |
| 72 | `pickup-truck-loaded-with-waste-final.webp` | Unsplash | `photo-1781425009053-2baffa997d8c` | Unsplash License | #11 cover + OG | A white pickup truck at a kerb, its open bed piled high with tied black rubbish bags. |
| 73 | `laundry-room-cover-final.webp` | Unsplash | `photo-1646592474094-342fbc28736c` | Unsplash License | #20 cover + OG | A washer and dryer side by side in a plain utility room, with a sink beside them and hose connections on the wall behind. |

**Processing applied:** covers cropped to 2400×1350 (entropy crop where the original was portrait), body image kept at intrinsic ratio, all converted to **WebP q82**, 150–537KB each. **Media 72 had a legible third-party number plate blurred out** before upload, per `image.md` §12.

**Cover doubles as OG** on all four — the 2400×1350 source crops cleanly to 1200×630, so no duplicate asset was created.

### Generated editorial imagery — 2026-09-21

Created with OpenAI's built-in image-generation tool under `image.md` §7. These are generic, unbranded editorial illustrations; they do not depict Junk Services Dubai, its crew, vehicles, customers or completed work. Every file was visually inspected before upload. Covers were cropped to 1920×1080 WebP; body images retain their generated 1536×1024 ratio.

| File | Used as | Alt text |
|---|---|---|
| `sofa-doorway-cover.webp` | #7 cover + OG | A large beige corner sofa positioned across a narrow apartment doorway. |
| `sofa-route-measurement.webp` | #7 body | A top-down illustration of a sofa and doorway route with measuring tapes and turning arrows. |
| `service-lift-cover.webp` | #8 cover + OG | An open padded goods lift in a modern building with an empty flatbed trolley outside. |
| `service-lift-protection.webp` | #8 body | A goods lift interior protected with blue wall pads and an empty trolley. |
| `villa-handover-cover.webp` | #27 cover + OG | A mostly empty villa living room with a small group of household items ready to be removed. |
| `villa-clearance-groups.webp` | #27 body | Household items grouped beside a clear route through a villa to an open patio. |
| `mattress-disposal-cover.webp` | #9 cover + OG | A used mattress standing upright beside an open bedroom doorway in a bright apartment. |
| `mattress-route-preparation.webp` | #9 body | A covered mattress beside a measured doorway and a clear apartment corridor. |
| `bulky-item-tower-cover.webp` | #14 cover + OG | A large wrapped cabinet on a trolley beside an open padded service lift in an apartment tower corridor. |
| `tower-route-measurement.webp` | #14 body | A top-down apartment route with a cabinet, doorways, corridor turns and lift opening marked by measuring tapes. |
| `old-sofa-delivery-cover.webp` | #17 cover + OG | An old beige sofa prepared for removal beside an open apartment doorway and a cleared living-room space. |
| `sofa-delivery-route.webp` | #17 body | A top-down apartment plan showing a sofa route through a measured doorway and corridor to a lift. |
| `wardrobe-removal-cover.webp` | #21 cover + OG | A large wooden wardrobe protected with padded corners and wrap beside a clear bedroom doorway. |
| `wardrobe-dismantling-plan.webp` | #21 body | Wardrobe doors, shelves, rails, panels and hardware arranged in organised groups on a clean floor. |
| `before-crew-arrives-cover.webp` | #28 cover + OG | Boxes, an old chair, a small appliance and a rolled rug grouped beside a clear path to an open apartment door. |
| `crew-arrival-route-plan.webp` | #28 body | A top-down apartment plan with removal items grouped away from a clear route through open doors to the lift. |
| `skip-hire-comparison-cover.webp` | #29 cover + OG | An empty skip beside a driveway, separated from a grouped sofa, shelving, mattress, rug and bags ready for collection. |
| `skip-direct-load-comparison.webp` | #29 body | A split top-down property plan comparing repeated loading into a skip with direct loading into a collection vehicle. |
| `office-stripout-cover.webp` | #31 cover + OG | A bright office floor with furniture and loose fixtures organised beside a clear central route. |
| `office-stripout-phasing-plan.webp` | #31 body | A top-down office plan with three organised work zones and clear routes to a protected service lift and loading point. |
| `warehouse-clearance-cover.webp` | #33 cover + OG | An organised warehouse with retained stock, a separate clearance zone and an unobstructed route to the loading shutter. |
| `warehouse-clearance-zone-plan.webp` | #33 body | A top-down warehouse plan showing protected stock, an organised clearance staging zone and a broad route to the loading door. |
| `gated-community-clearance-cover.webp` | #37 cover + OG | A modern villa with an open gate, clear driveway and grouped household items inside the property boundary. |
| `gated-community-access-plan.webp` | #37 body | A top-down villa and community access plan showing a clear route from grouped household items through the gate to a collection vehicle. |
| `estate-clearance-cover.webp` | #41 cover + OG | A calm villa living room with household possessions organised in separate boxes beside a blank inventory notebook. |
| `estate-clearance-sorting-plan.webp` | #41 body | A top-down home plan with possessions organised into separate decision groups, a secure document box and a clear exit route. |
| `flatpack-furniture-cover.webp` | #42 cover + OG | Flat-pack wardrobe panels and hardware arranged safely on a bedroom floor beside an intact cabinet and clear doorway. |
| `flatpack-condition-comparison.webp` | #42 body | An intact cabinet, reusable flat-pack panels and damaged swollen panels arranged in separate condition groups with organised hardware. |
| `choosing-provider-cover.webp` | #45 cover + OG | Three blank provider folders and a checklist beside a photographed household load and generic removal vehicles. |
| `provider-quote-comparison.webp` | #45 body | Three equally weighted quote sheets beside a photo inventory and route sketch with matching service icons. |
| `old-furniture-disposal-cover.webp` | #1 cover + OG | A sofa, chair, cabinet and dismantled shelving grouped safely beside a clear apartment doorway. |
| `old-furniture-route-options.webp` | #1 body | An old armchair at the centre of four equal visual routes representing reuse, recipient collection, official bulky-waste service and paid collection. |
| `fridge-disposal-cover.webp` | #2 cover + OG | An empty refrigerator prepared for collection beside a clear kitchen doorway in a Dubai apartment. |
| `fridge-removal-route-plan.webp` | #2 body | A top-down apartment plan showing an empty refrigerator following a protected route through measured doorways to a service lift. |
| `municipality-bulky-waste-cover.webp` | #4 cover + OG | Household furniture, an appliance and electronics grouped safely inside a villa driveway with a clear vehicle approach. |
| `municipality-bulky-waste-process.webp` | #4 body | A four-stage top-down preparation sequence showing household bulky items inside a property and a scheduled collection route. |

### Reused existing media — 2026-10-01

No new images were generated or sourced for #5, #30 and #10. Each slot reuses an existing Media document from the table above (`image.md`: reuse before uploading; an accurate repeated image breaks nothing). Every image was re-inspected against its new article, and the existing alt text still describes what is visibly there.

| File | Media seedKey reused | Used as |
|---|---|---|
| `municipality-bulky-waste-cover.webp` | `article-dubai-municipality-bulky-waste-cover` | #5 cover + OG |
| `provider-quote-comparison.webp` | `article-choosing-junk-removal-dubai-body` | #5 body |
| `before-crew-arrives-cover.webp` | `article-before-the-crew-arrives-dubai-cover` | #30 cover + OG |
| `old-furniture-route-options.webp` | `article-dispose-old-furniture-dubai-body` | #30 body |
| `gated-community-clearance-cover.webp` | `article-gated-community-clearance-dubai-cover` | #10 cover + OG |
| `municipality-bulky-waste-process.webp` | `article-dubai-municipality-bulky-waste-body` | #10 body |

### Reused existing media — 2026-10-02

No new images were generated or sourced for #38, #44 and #19. Each slot reuses an existing Media document, re-inspected against its new article; the existing alt text still describes what is visibly there. No air-conditioner image exists in the library, so #19 uses the refrigerator cover — another refrigerant-containing appliance — rather than a misleading substitute or the AI service-page library.

| File | Media reused | Used as |
|---|---|---|
| `municipality-bulky-waste-cover.webp` | 108 · `article-dubai-municipality-bulky-waste-cover` | #38 cover + OG |
| `estate-clearance-sorting-plan.webp` | 99 · `article-estate-clearance-dubai-body` | #38 body |
| `pickup-truck-loaded-with-waste-final.webp` (Unsplash) | 72 · no seedKey | #44 cover + OG |
| `municipality-bulky-waste-process.webp` | 109 · `article-dubai-municipality-bulky-waste-body` | #44 body |
| `fridge-disposal-cover.webp` | 106 · `article-dispose-fridge-dubai-cover` | #19 cover + OG |
| `service-lift-protection.webp` | 77 · `article-service-lift-booking-dubai-body` | #19 body |

### Generated editorial imagery — 2026-10-03

Created with the AI image generator under `image.md` §7. These are generic, unbranded editorial illustrations and photographs for Batch D tenancy and building clearance articles; they do not depict Junk Services Dubai, its crew, vehicles, customers or completed work. Every file was visually inspected before upload. Covers are 1920×1080 WebP; body diagrams are 1536×1024 WebP.

| File | Used as | Alt text |
|---|---|---|
| `noc-moving-furniture-cover.webp` | #15 cover + OG | A modern Dubai apartment building reception desk with a move-out clearance checklist on a clipboard in the foreground and a clear corridor leading to service lifts. |
| `noc-clearance-process.webp` | #15 body | A clean top-down architectural process diagram showing four sequential steps for moving out of an apartment building: Landlord Clearance, Building Move-Out Permit (NOC), Service Lift Reservation, and Loading Bay Access. |
| `deposit-deductions-cover.webp` | #24 cover + OG | A bright, vacant modern Dubai apartment living room during a move-out handover inspection with an inspection clipboard on a counter in the foreground. |
| `handover-inspection-comparison.webp` | #24 body | A side-by-side comparison diagram showing a fully cleared apartment achieving a full deposit refund versus an apartment with abandoned furniture incurring landlord contractor deductions and dispute delays. |
| `leaving-dubai-checklist-cover.webp` | #43 cover + OG | An organized moving scene inside a bright Dubai apartment with a checklist notebook on a counter in the foreground and neatly stacked moving boxes in the background. |
| `leaving-dubai-timeline-plan.webp` | #43 body | A horizontal process timeline diagram illustrating the four-week clearance countdown for leaving Dubai, showing sorting, utility disconnection and NOC, junk removal, and handover inspection. |

### Generated editorial imagery — 2026-10-04

Created with the AI image generator under `image.md` §7. These are generic, unbranded editorial illustrations and photographs for Month 1 cost, volume, and acceptance guides (#18, #25, #3); they do not depict Junk Services Dubai, its crew, vehicles, customers or completed work. Every file was visually inspected before upload. Covers are 1920×1080 WebP; body diagrams are 1536×1024 / 1526×1024 WebP.

| File | Used as | Alt text |
|---|---|---|
| `what-we-take-cover.webp` | #18 cover + OG | A bright, modern Dubai apartment living room with an organized collection of a fabric sofa, stacked moving boxes, and an appliance staged safely beside an open interior doorway. |
| `accepted-versus-excluded-guide.webp` | #18 body | A clean architectural comparison diagram showing generic line-art items of accepted household furniture and appliances on the left against excluded hazardous chemicals and gas cylinders on the right. |
| `truck-load-cover.webp` | #25 cover + OG | A contemporary editorial photograph of a pristine, unbranded white commercial 3-ton covered box truck parked in a clean paved driveway of a modern Dubai residential villa. |
| `truck-load-capacity-guide.webp` | #25 body | An architectural isometric cutaway diagram of a standard 3-ton clearance truck showing modular volume sections packed with household furniture, appliances, and stacked cartons. |
| `junk-removal-cost-cover.webp` | #3 cover + OG | A bright, elegant Dubai apartment living room counter with an inventory clipboard and smartphone resting in the foreground with neatly grouped furniture in the background. |
| `cost-factors-breakdown.webp` | #3 body | A clean architectural infographic diagram illustrating the key variables of a clearance quote including vehicle volume, access distance, elevator availability, furniture dismantling, crew labor, and municipal disposal. |

### Reused existing media — 2026-10-05

No new images were generated or sourced for #34, #36 and #40. Each slot reuses an existing Media document, re-inspected against its new article; the existing alt text still describes what is visibly there. No soil or sand image exists in the library, so #40 uses the villa image showing plant pots and a green garden bag of branches rather than the palm-frond photograph, which shows only fronds.

| File | Media reused | Used as |
|---|---|---|
| `office-stripout-cover.webp` | 92 · `article-office-strip-out-dubai-cover` | #34 cover + OG |
| `warehouse-clearance-zone-plan.webp` | 95 · `article-warehouse-clearance-dubai-body` | #34 body |
| `truck-load-cover.webp` | 118 · `article-how-much-fits-in-one-load-dubai-cover` | #36 cover + OG |
| `gated-community-access-plan.webp` | 97 · `article-gated-community-clearance-dubai-body` | #36 body |
| `villa-clearance-groups.webp` | 79 · `article-villa-handover-clearance-dubai-body` | #40 cover + OG |
| `skip-direct-load-comparison.webp` | 91 · `article-skip-hire-vs-junk-removal-dubai-body` | #40 body |

### Reused existing media — 2026-10-06

No new images were generated or sourced for #12, #16 and #26. Each slot reuses an existing Media document, re-inspected against its new article; the existing alt text still describes what is visibly there. #12 reuses the furniture disposal cover and route options diagram; #16 reuses the acceptance cover and sorting diagram; #26 reuses the cut palm fronds photograph and villa clearance grouping diagram.

| File | Media reused | Used as |
|---|---|---|
| `dispose-old-furniture-cover.webp` | 104 · `article-dispose-old-furniture-dubai-cover` | #12 cover + OG |
| `old-furniture-route-options.webp` | 105 · `article-dispose-old-furniture-dubai-body` | #12 body |
| `what-we-take-cover.webp` | 116 · `article-what-we-take-dubai-cover` | #16 cover + OG |
| `accepted-versus-excluded-guide.webp` | 117 · `article-what-we-take-dubai-body` | #16 body |
| `cut-palm-fronds-on-the-ground.webp` (Unsplash) | 70 · no seedKey | #26 cover + OG |
| `villa-clearance-groups.webp` | 79 · `article-villa-handover-clearance-dubai-body` | #26 body |

### Reused existing media — 2026-10-09

No new images were generated or sourced for N-3, N-4 and N-5. Each slot reuses an existing Media document, re-inspected against its new article; the existing alt text still describes what is visibly there.

| File | Media reused | Used as |
|---|---|---|
| `what-we-take-cover.webp` | 116 · `article-what-we-take-dubai-cover` | N-3 cover + OG |
| `crew-arrival-route-plan.webp` | 89 · `article-before-the-crew-arrives-dubai-body` | N-3 body |
| `estate-clearance-cover.webp` | 98 · `article-estate-clearance-dubai-cover` | N-4 cover + OG |
| `estate-clearance-sorting-plan.webp` | 99 · `article-estate-clearance-dubai-body` | N-4 body |
| `villa-handover-cover.webp` | 78 · `article-villa-handover-clearance-dubai-cover` | N-5 cover + OG |
| `old-furniture-route-options.webp` | 105 · `article-dispose-old-furniture-dubai-body` | N-5 body |

---

## Rejected on inspection — not used

Four candidates were downloaded and inspected, then rejected rather than used weakly:

| Candidate | Intended | Why rejected |
|---|---|---|
| Man carrying a striped mattress along a path | #7 cover | Wrong item (mattress, not sofa) and **German street signage** — visibly not Dubai, and the article is about doorways, not outdoor carrying |
| Styled laundry corner with a washing machine | #20 body | **Visible third-party “PlanetCare” branding**, and a styled product shot rather than the tight recess the article describes |
| Lift car interior, stainless doors | #8 cover | **Legible Washington DC regulatory notice and phone number** — a location contradiction and a legible document under §12 |
| Discarded sofa outside a brick building | #7 body | Held — usable, but without a matching cover it would leave the article with a body image and no cover |

---

### Generated and uploaded editorial imagery — 2026-10-10

The six original, unbranded editorial images below were generated for N-6, N-7 and N-8, visually inspected, saved under `public/images/articles/`, and uploaded to the CMS. Six Media records (134–139) were verified after publication.

| File | Intended slot | Alt text | Media ID |
|---|---|---|---|
| `storage-room-clearance-dubai-cover.png` | N-6 cover + OG | Shelves, boxes, a rolled rug and a worn table in a sunlit storage room. | 134 |
| `storage-room-clearance-dubai-body.png` | N-6 body | Four sorting zones for belongings from a storage room | 135 |
| `garage-clearance-dubai-cover.png` | N-7 cover + OG | Bicycles, shelves, cartons and worn chairs gathered in a sunlit garage. | 136 |
| `garage-clearance-dubai-body.png` | N-7 body | Separate groups of garage belongings and materials needing special handling | 137 |
| `garden-furniture-disposal-dubai-cover.png` | N-8 cover + OG | Weathered outdoor chairs and a table beside stacked cushions and empty pots on a patio. | 138 |
| `garden-furniture-disposal-dubai-body.png` | N-8 body | Outdoor furniture, branches, pots and cushions kept in separate groups | 139 |

### Generated and uploaded editorial imagery — 2026-10-08

The six original, unbranded editorial images below were generated for #35, #N-1 and #N-2, visually inspected, saved under `public/images/articles/`, and uploaded to the CMS. Six Media records were verified after publication.

| File | Intended slot | Alt text |
|---|---|---|
| `it-equipment-disposal-cover.webp` | #35 cover + OG | Neatly grouped decommissioned office computers, monitors and server equipment staged along a clear hallway in a modern Dubai commercial office. |
| `it-equipment-sorting-workflow.webp` | #35 body | An isometric diagram separating office IT equipment into data-cleared hardware, recyclable components, and isolated battery and power units beside a loading bay route. |
| `weekend-junk-removal-cover.webp` | #N-1 cover + OG | A residential Dubai apartment corridor and open doorway with household items staged neatly for a scheduled weekend clearance. |
| `weekend-access-schedule-plan.webp` | #N-1 body | A weekend clearance planning diagram showing Saturday and Sunday security office hours, service lift booking windows, and loading bay access checkpoints. |
| `landlord-inspection-clearance-cover.webp` | #N-2 cover + OG | A spotless, completely cleared Dubai rental apartment living room prepared for the final landlord handover walkthrough and key return. |
| `inspection-handover-checklist-plan.webp` | #N-2 body | A side-by-side comparison diagram showing a fully cleared property passing inspection without deductions versus common overlooked spots like balcony storage and curtain fixtures. |

### Generated and uploaded editorial imagery — 2026-10-07

The six original, unbranded editorial images below were generated for #22, #32 and #39, visually inspected, saved under `public/images/articles/`, and uploaded to the CMS. Six Media records were verified after publication.

| File | Intended slot | Alt text |
|---|---|---|
| `tv-disposal-cover.webp` | #22 cover + OG | An older flat-screen television on a console in a bright, generic apartment living room. |
| `tv-disposal-routes.webp` | #22 body | An illustration comparing a working TV for reuse, a broken TV for e-waste collection, and a damaged screen protected for handling. |
| `office-furniture-cover.webp` | #32 cover + OG | Groups of unbranded desks, task chairs and cabinets in a bright generic office floor with a clear corridor. |
| `office-furniture-sorting.webp` | #32 body | An isometric office plan separating reusable furniture, metal and wood components, and damaged items beside a clear lift route. |
| `renovation-waste-cover.webp` | #39 cover + OG | Contained bags of tile debris and stacked offcuts beside a protected route in a generic apartment renovation. |
| `renovation-waste-sorting.webp` | #39 body | An isometric apartment plan separating bagged rubble, wood and metal offcuts, and isolated paint and gas containers. |


| Article | Slot | Status |
|---|---|---|
| #7 sofa-wont-fit-through-door | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-21 |
| #8 service-lift-booking | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-21 |
| #27 villa-handover-clearance | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-21 |
| #9 mattress-disposal | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-22 |
| #14 bulky-items-tower | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-22 |
| #17 old-sofa-before-new-delivery | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-22 |
| #21 wardrobe-removal | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-23 |
| #28 before-the-crew-arrives | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-23 |
| #29 skip-hire-vs-junk-removal | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-23 |
| #31 office-strip-out | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-28 |
| #33 warehouse-clearance | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-28 |
| #37 gated-community-clearance | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-28 |
| #41 estate-clearance | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-29 |
| #42 flatpack-furniture-disposal | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-29 |
| #45 choosing-junk-removal | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-29 |
| #1 dispose-old-furniture | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-30 |
| #2 dispose-fridge | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-30 |
| #4 dubai-municipality-bulky-waste | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-09-30 |
| #5 municipality-vs-paid-junk-removal | cover, OG, body | `COMPLETE` — existing media reused 2026-10-01 |
| #30 free-junk-removal-dubai-truth | cover, OG, body | `COMPLETE` — existing media reused 2026-10-01 |
| #10 illegal-dumping-fines | cover, OG, body | `COMPLETE` — existing media reused 2026-10-01 |
| #38 e-waste-disposal | cover, OG, body | `COMPLETE` — existing media reused 2026-10-02 |
| #44 what-dubai-bins-wont-take | cover, OG, body | `COMPLETE` — existing media reused 2026-10-02 |
| #19 old-ac-unit-disposal | cover, OG, body | `COMPLETE` — existing media reused 2026-10-02 · a dedicated AC image would make a better future cover |
| #15 noc-moving-furniture | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-10-03 |
| #24 deposit-deductions-left-furniture | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-10-03 |
| #43 leaving-dubai-clearance-checklist | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-10-03 |
| #18 what-we-take | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-10-04 |
| #25 how-much-fits-in-one-load | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-10-04 |
| #3 junk-removal-cost | cover, OG, body | `COMPLETE` — generated editorial imagery uploaded 2026-10-04 |
| #34 out-of-hours-clearance | cover, OG, body | `COMPLETE` — existing media reused 2026-10-05 |
| #36 how-long-villa-clearance | cover, OG, body | `COMPLETE` — existing media reused 2026-10-05 |
| #40 soil-sand-pots-disposal | cover, OG, body | `COMPLETE` — existing media reused 2026-10-05 · a dedicated soil/pots image would make a better future cover |
| #12 donate-furniture-dubai | cover, OG, body | `COMPLETE` — existing media reused 2026-10-06 |
| #16 what-happens-to-your-junk-dubai | cover, OG, body | `COMPLETE` — existing media reused 2026-10-06 |
| #26 garden-waste-bins-dubai | cover, OG, body | `COMPLETE` — existing media reused 2026-10-06 |
| #22 tv-disposal-dubai | cover, OG, body | `COMPLETE` — original editorial images uploaded 2026-10-07 |
| #32 office-furniture-removal-dubai | cover, OG, body | `COMPLETE` — original editorial images uploaded 2026-10-07 |
| #39 renovation-waste-removal-dubai | cover, OG, body | `COMPLETE` — original editorial images uploaded 2026-10-07 |
| #35 it-equipment-disposal-dubai | cover, OG, body | `COMPLETE` — original editorial images uploaded 2026-10-08 |
| #N-1 weekend-junk-removal-dubai | cover, OG, body | `COMPLETE` — original editorial images uploaded 2026-10-08 |
| #N-2 landlord-inspection-clearance-dubai | cover, OG, body | `COMPLETE` — original editorial images uploaded 2026-10-08 |
| #N-3 decluttering-small-dubai-apartment | cover, OG, body | `COMPLETE` — existing media reused 2026-10-09 |
| #N-4 seasonal-clear-out-dubai | cover, OG, body | `COMPLETE` — existing media reused 2026-10-09 |
| #N-5 pre-ramadan-clear-out-dubai | cover, OG, body | `COMPLETE` — existing media reused 2026-10-09 · a majlis/hosting image would make a better future cover |
| #N-6 storage-room-clearance-dubai | cover, OG, body | `COMPLETE` — original editorial images uploaded 2026-10-10 (Media 134, 135) |
| #N-7 garage-clearance-dubai | cover, OG, body | `COMPLETE` — original editorial images uploaded 2026-10-10 (Media 136, 137) |
| #N-8 garden-furniture-disposal-dubai | cover, OG, body | `COMPLETE` — original editorial images uploaded 2026-10-10 (Media 138, 139) |
| #6 end-of-tenancy | body | `NEEDED` |
| #11 junk-gone-today | body | `NEEDED` |
| #20 washing-machine-removal | body | `NEEDED` |

**These are the slots where generated editorial imagery is now the better route** (`image.md`, *Editorial imagery for articles*) — a sofa wedged in a doorway and a protected goods lift are both specific enough that generic stock keeps failing the relevance test.

---

## Deferred work

### IB-AUDIT-1 · Audit and correct existing website images and alt text

**Status:** `DEFERRED` — logged 2026-09-20, **not to be actioned now.**

**Scope.** The AI-generated library is already published on the homepage, About page and service pages, where it reads as documentary photography of this business, and some alt text asserts company ownership of the people shown.

**What the audit needs to cover:**

| # | Item |
|---|---|
| 1 | **Misleading alt text.** `scripts/seed-images.ts` line 67 states *“Two uniformed **Junk Services Dubai crew** carrying a wrapped sofa…”* — a claim now known to be false. **Highest priority in this item**; it is a false statement in live page content and is correctable independently of any decision about the images themselves. |
| 2 | **Generic “crew” alt text.** Seven further alts describe *“crew”*, *“three crew”*, *“two crew in green uniforms” etc. On the company’s own site these still read as its crew. Decide whether to reword or replace. |
| 3 | **Published AI imagery.** Homepage, About and the twelve service pages. Options: replace with licensed or own photography, retain with honest framing, or accept knowingly — a business decision, not a documentation one. |
| 4 | **`Logo.png`.** Also carries the OpenAI C2PA credentials. A generated brand mark is a different case from generated documentary photography and is likely acceptable, but should be noted deliberately rather than by omission. |
| 5 | **Seed-script descriptions.** `scripts/seed-images.ts` and `public/images/areas/CREDITS.md` both describe the library as *“the site’s own crew photography”*. Correct once the decision on item 3 is taken. |

**Not in scope of this item:** the 25 Wikimedia Commons area photographs, which are genuine licensed material with verified attribution and are unaffected.

**Dependencies:** requires a business decision on item 3 before items 3 and 5 can complete. Items 1 and 2 can proceed independently. Any change here is a **code change** to `scripts/seed-images.ts` plus a re-run, or direct edits in `/admin`.

**Why deferred:** it does not block article production. Article covers take Route C and are unaffected by the published library.

---

## Change log

| Date | Change |
|---|---|
| 2026-10-10 | Uploaded six original editorial images to CMS Media (Media 134–139) for published articles N-6, N-7 and N-8 with inspected alt text and confirmed database records. |
| 2026-10-09 | Generated and visually inspected six original, unbranded editorial images for draft articles N-6, N-7 and N-8: `public/images/articles/{storage-room-clearance-dubai,garage-clearance-dubai,garden-furniture-disposal-dubai}-{cover,body}.png`. These are generic illustrative scenes, not business photography. Cover alt text is in `next-three-article-briefs.md`; body alt text is in the article Markdown. CMS Media upload remains pending; no post is published. |
| 2026-10-09 | Assigned existing Media documents to N-3, N-4 and N-5 (six slots, no new uploads). Recorded above under *Reused existing media — 2026-10-09*. |
| 2026-10-08 | Generated, inspected and uploaded six original editorial WebP images for #35, #N-1 and #N-2; confirmed all six CMS Media records. |
| 2026-10-07 | Generated, inspected and uploaded six original editorial WebP images for #22, #32 and #39; confirmed all six CMS Media records. |
| 2026-10-06 | Assigned existing Media documents to #12, #16 and #26 (six slots, no new uploads). Recorded above under *Reused existing media — 2026-10-06*. |
| 2026-10-05 | Assigned existing Media documents to #34, #36 and #40 (six slots, no new uploads). Recorded above under *Reused existing media — 2026-10-05*. |
| 2026-10-04 | Generated, inspected and uploaded cover + body editorial imagery for #18, #25 and #3 (six WebP files, generic and unbranded under the approved editorial generation policy). Recorded above under *Generated editorial imagery — 2026-10-04*. |
| 2026-10-03 | Generated, inspected and uploaded cover + body editorial imagery for #15, #24 and #43 (six WebP files, generic and unbranded under the approved editorial generation policy). Recorded above under *Generated editorial imagery — 2026-10-03*. |
| 2026-10-02 | Assigned existing Media documents to #38, #44 and #19 (six slots, no new uploads). Recorded above under *Reused existing media — 2026-10-02*. |
| 2026-10-01 | Assigned existing Media documents to #5, #30 and #10 (six slots, no new uploads). Recorded above under *Reused existing media*. |
| 2026-09-30 | Generated, inspected and uploaded cover + body editorial imagery for #1, #2 and #4. Six WebP files recorded above; all generic and unbranded. |
| 2026-09-29 | Generated, inspected and uploaded cover + body editorial imagery for #41, #42 and #45. Six WebP files recorded above; all generic and unbranded under the approved article-only generation policy. |
| 2026-09-28 | Generated, inspected and uploaded cover + body editorial imagery for #31, #33 and #37. Six WebP files recorded above; all generic and unbranded under the approved article-only generation policy. |
| 2026-09-23 | Generated, inspected and uploaded cover + body editorial imagery for #21, #28 and #29. Six WebP files recorded above; all generic and unbranded under the approved article-only generation policy. |
| 2026-09-22 | Generated, inspected and uploaded cover + body editorial imagery for #9, #14 and #17. Six WebP files recorded above; all generic and unbranded under the approved article-only generation policy. |
| 2026-09-21 | Generated, inspected and uploaded cover + body editorial imagery for #7, #8 and #27. Six WebP files recorded above; all generic and unbranded under the approved article-only generation policy. |
| 2026-09-20 | Backlog created. IB-1 to IB-4 registered at `NEEDED`. Route D recorded as blocked pending I-1. |
| 2026-09-20 | **I-1 resolved — existing library is AI-generated (C2PA-confirmed). Route D closed permanently unless §7 is amended.** Route C recommended for all four briefs. |
| 2026-09-20 | **Route C confirmed as the active sourcing route** for article covers. IB-AUDIT-1 logged as deferred work: audit of published images and misleading crew alt text. |
| 2026-09-20 | IB-5, IB-6, IB-7 added for articles #27, #8, #20. Backlog now 7 covers outstanding. |
| 2026-09-20 | **Sourcing attempted across five routes; all closed** (Commons DNS-blocked, Openverse 401, stock needs API keys, no generation tool). No unverified asset used. Blocker detail recorded above. |
| 2026-09-20 | Restructured to **cover + OG + body per article** (21 slots). Generated editorial imagery permitted by `image.md`. **Blocker recorded: no image-generation tool and no licensed-stock access in this environment** — all 21 slots remain `NEEDED`. |
