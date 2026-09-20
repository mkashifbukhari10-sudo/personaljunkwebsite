# Dubai Junk Removal SEO Keyword Strategy

**Site:** https://junkservicesdubai.com — *Junk Services Dubai*
**Owner document status:** MASTER keyword source. All downstream content-system files (`content-rules.md`, briefs, articles) must derive from this file and must not introduce keyword targets that are not mapped here.
**Created:** 2026-09-20
**Campaign window:** Month 1 = Mon 2026-09-21 → Sun 2026-10-18 · Month 2 = Mon 2026-10-19 → Sun 2026-11-15
**Review checkpoints:** Day 0 (2026-09-21) · Day 30 (2026-10-19) · Day 60 (2026-11-16)

> **Honesty clause.** This document contains **no invented search volumes, CPCs, keyword-difficulty scores, competition indices or traffic forecasts.** No keyword tool was available during this research pass. Every demand judgement below is a **qualitative** assessment derived from site architecture, live SERP inspection, competitor page inventories and market-structure evidence. Quantitative fields are left blank on purpose, to be filled from Google Keyword Planner / Search Console / a paid tool before budget decisions are made. See **Open Questions / Missing Data**.
>
> **No ranking or lead promises.** Nothing here guarantees positions, traffic or lead counts inside any timeframe. The plan is built to maximise the probability of qualified organic enquiries and to make progress measurable.

---

## Evidence Labels

Every claim in this document carries one of four evidence levels. **No claim about commercial performance, search demand or ranking difficulty is presented as established fact unless it is marked `VERIFIED FACT`.** Downstream files must preserve these labels when quoting this document.

| Label | Meaning | What would upgrade it |
|---|---|---|
| **`VERIFIED FACT`** | Directly observed and checkable — site architecture, live page titles and H1s, CMS fields, code state, competitor domains seen in a live SERP, calendar dates. | Nothing; already confirmed. Re-verify if the site changes. |
| **`QUALITATIVE SEO ASSESSMENT`** | A reasoned professional judgement about intent, SERP shape, competitive density or content gaps, based on observed evidence but not measured. | Dubai-geolocated SERP inspection, a rank tracker, competitor backlink analysis. |
| **`COMMERCIAL HYPOTHESIS`** | An expectation about lead quality, conversion rate, revenue per lead or customer value. **None of these are measured. The business has no conversion or revenue data attached to this site yet.** | Real analytics: WhatsApp/call/form events, Leads records, booked jobs and job values by source. |
| **`UNVERIFIED SEARCH-DEMAND ASSUMPTION`** | A judgement about how much a keyword is searched, or its relative demand versus another keyword. | Google Keyword Planner (geo: Dubai), Search Console query data, a paid keyword tool. |

**Default reading rule:** where a statement in this document is not explicitly labelled, treat relative demand claims as `UNVERIFIED SEARCH-DEMAND ASSUMPTION` and lead-value claims as `COMMERCIAL HYPOTHESIS`.

**The honest summary of what is actually known today:** the site architecture and page inventory are verified; the competitor set is verified; the search demand, the competitive difficulty and every commercial outcome are not. The prioritisation below is a defensible starting hypothesis, not a measured ranking of opportunity.

---

## Business & Market Scope

### What the business does

Junk removal and property clearance, **Dubai only**. The customer sends a photo (WhatsApp preferred), receives a fixed price, and a uniformed crew attends, carries items out, loads and disposes of them.

**Twelve services, each with a live landing page:**

| # | Service | URL |
|---|---------|-----|
| 01 | Junk Removal | `/services/junk-removal` |
| 02 | Garbage Removal | `/services/garbage-removal` |
| 03 | Furniture Removal | `/services/furniture-removal` |
| 04 | Sofa Removal | `/services/sofa-removal` |
| 05 | Appliance Disposal | `/services/appliance-disposal` |
| 06 | Waste Removal | `/services/waste-removal` |
| 07 | Garden Waste Removal | `/services/garden-waste-removal` |
| 08 | House Clearance | `/services/house-clearance` |
| 09 | Villa Clearance | `/services/villa-clearance` |
| 10 | Same-Day Junk Removal | `/services/same-day-junk-removal` |
| 11 | Residential Junk Removal | `/services/residential-junk-removal` |
| 12 | Commercial Junk Removal | `/services/commercial-junk-removal` |

**Thirty area pages** live at `/areas/{slug}`: `dubai-marina`, `palm-jumeirah`, `downtown-dubai`, `business-bay`, `jvc`, `jumeirah`, `arabian-ranches`, `dubai-hills`, `mirdif`, `al-barsha`, `deira`, `dubai-silicon-oasis`, `jlt`, `jbr`, `al-quoz`, `motor-city`, `sports-city`, `dip`, `discovery-gardens`, `international-city`, `al-nahda`, `bur-dubai`, `karama`, `al-furjan`, `damac-hills`, `jumeirah-golf-estates`, `the-springs`, `dubai-creek-harbour`, `al-warqa`, `town-square`.

**Supporting pages:** `/` · `/services` · `/areas` · `/how-it-works` · `/about` · `/contact` · `/blog`

**Conversion paths:** WhatsApp (`wa.me/971551031255`), phone (`+971 55 103 1255`), and the `/contact` form, which writes to the Payload **Leads** collection capturing name, phone, **area**, preferred time and a free-text description of the items.

### Market structure (observed 2026-09-20)

Live SERP inspection surfaced a large, crowded field of Dubai junk-removal operators — `takemyjunkuae.com`, `getmyjunkuae.com`, `junkserviceindubai.com`, `dubaijunkremovals.com`, `movemyjunkdubai.com`, `removejunkservicedubai.com`, `800junkremovalsdubai.com`, `freejunkdubai.com`, `junksexpert.com`, `quickjunkremovalindubai.com`, `superjunkremovaldubai.com`, `dubaijunkcleaner.ae`, `grabmyjunkuae.com`, `nearmejunkservices.com` and many more, plus aggregator/directory shells (`houseclearancesnearme.com`, `householdclearancenearme.com`, `houseclearancecompanies.com`).

Four structural facts shape this strategy:

1. **The niche is dominated by a "free junk removal / take my junk" positioning.** Many competitors advertise free collection, monetising through resale and scrap. This business charges a fixed price. That is a **positioning gap, not a weakness** — but it means high-volume "free" queries are poor-fit traffic and must be handled with honest comparison content rather than targeted as money terms.
2. **Content quality across the field is low.** Most competitor service pages are thin, template-spun and near-duplicated across dozens of near-identical domains. The existing service and area pages on this site are substantially better written and more specific (real access detail, service-lift booking, gate rules, crew sizes). **This is the single biggest competitive asset and the strategy leans on it.**
3. **Dubai Municipality operates a free bulky-waste collection service.** Public reporting indicates it is requested via 800900 / DM apps, generally requires items to be **at ground level** (crews typically do not carry items down from apartments), and reportedly excludes certain development and free zones. `UNVERIFIED — must be confirmed against the official Dubai Municipality source before any article states it.` `QUALITATIVE SEO ASSESSMENT` — this looks like the most valuable informational territory in the niche, because the gap it leaves (carry-down, speed, scheduling, tower access) is exactly what the paid service sells.
4. **Brand-name collision risk.** A competitor, `junkserviceindubai.com`, presents itself in search results under the title *"Junk Services Dubai"* — effectively this site's brand. Brand-term defence is therefore a real, separate workstream, not an afterthought.

### Current organic position (Day 0 reality check)

`junkservicesdubai.com` is live and serving correctly. It did **not** appear in any of the SERP samples taken on 2026-09-20 for core commercial terms or for its own brand phrase. Treat the starting position as **effectively zero organic visibility**.

The blog is **empty** — zero published posts. This is strategically excellent: there is no legacy content to audit, prune, consolidate or de-cannibalise. Every article can be placed deliberately.

---

## Research Methodology

**What was actually done.** Stating this plainly so the limits of the output are visible.

1. **Full codebase and content architecture audit.** Route map, `lib/hrefs.js`, `lib/seo.js`, `lib/site.js`, the Payload collections (`Services`, `Areas`, `Posts`, `Leads`, `Faqs`, `Redirects`), and the complete seed content for all 12 services and 30 areas — including every existing `<title>`, meta description, H1, body heading and on-page FAQ. This is what makes the cannibalization map real rather than theoretical.
2. **Existing keyword-ownership extraction.** Every page's current de-facto keyword target was read off its live title/H1 rather than assumed.
3. **Live SERP sampling (2026-09-20)** across six core themes: same-day junk removal, furniture/sofa disposal and cost, villa/house clearance and move-out, Dubai Municipality bulky waste and fridge disposal, garden/green waste, and the brand term. Used to identify the real competitor set, the vocabulary the market actually uses, and the content gaps.
4. **Query-vocabulary harvesting** from competitor page titles, URL slugs and service taxonomies — this is where variants like *rubbish removal*, *take my junk*, *bulk waste*, *estate cleanout*, *green waste*, *strip-out* came from. These are observed market phrasings, not invented synonyms.
5. **Intent classification and clustering** by hand, one keyword at a time, against the actual page inventory.

**What was NOT done, and must be before spending money:**

- No keyword-tool data. **No volume, KD, CPC or clicks figures exist in this document.**
- No Google Search Console export (property may not yet be verified — see Open Questions).
- SERP sampling ran through a **US-geolocated** search tool. Dubai-local SERPs — especially the local map pack, which matters enormously for this business — were **not** directly observed. Competitor identification is reliable; ranking-position inference is not.
- No backlink-profile analysis of competitors.

---

## Keyword Selection Rules

These rules are binding on every downstream file.

1. **Dubai only.** No Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, Al Ain or "UAE-wide" targeting. Area modifiers must be Dubai communities.
2. **Removal / clearance intent only.** The searcher must want something *taken away*. If the primary intent is to *sell, buy, value or trade* an item, it is excluded — no exceptions, regardless of volume.
3. **One intent, one page.** If two phrasings would produce materially the same SERP and the same page, they are the **same target**. The lesser phrasing becomes a secondary keyword, never a second page.
4. **Money terms belong to service and area pages.** Blog articles exist to *feed* those pages. An article may never be optimised to outrank its own service page.
5. **Every keyword has exactly one destination URL.** If a keyword has no defensible destination, it is marked DO NOT TARGET.
6. **Commercial intent outranks volume.** A term that produces enquiries beats a term that produces sessions.
7. **No fabricated metrics, ever.** Blank beats invented. Unverified is labelled.
8. **No doorway pages.** An area page must contain genuinely area-specific operational detail — building access, community rules, typical property type, route logistics — or it should not exist. The 30 existing area pages meet this bar; new ones must too.
9. **Honest claims only.** No fake review counts, no invented certifications, no "No.1 in Dubai", no guaranteed timings the operation cannot meet. Municipality facts must be cited to source and verified before publication.
10. **Anchor-text diversity.** No mechanical exact-match anchor repetition. See Internal Linking Map.

---

## Excluded Search Intent

**Category-level exclusions — DO NOT TARGET under any circumstances.**

| Excluded cluster | Representative queries | Why excluded |
|---|---|---|
| **Selling furniture** | sell my furniture dubai · sell used furniture dubai · where to sell old furniture dubai · sell my sofa dubai | Primary intent is *monetising* an item. Not a removal customer. Explicit client exclusion. |
| **Buying / used-goods demand** | used furniture dubai · second hand furniture dubai · buy used sofa dubai · used appliances dubai · furniture for sale dubai | Buyer intent. Attracts zero-value traffic and would drag the site's topical signal toward a marketplace. |
| **Furniture buyers / traders** | used furniture buyers dubai · furniture buyer near me dubai · who buys used furniture in dubai | Searcher wants a buyer, not a remover. |
| **Scrap trade** | scrap buyers dubai · scrap metal dealers dubai · sell scrap dubai · scrap price dubai | Trading intent, wrong business model. |
| **Marketplaces** | dubizzle furniture · facebook marketplace dubai furniture · olx dubai furniture | Navigational to a third party. Unwinnable and pointless. |
| **Valuation** | how much is my old furniture worth dubai · used furniture price dubai | Selling intent. |
| **Moving / relocation services** | movers and packers dubai · house shifting dubai · villa movers dubai · international relocation dubai | **Different service.** The business removes; it does not relocate belongings. Targeting this generates unfulfillable enquiries and wastes crew time. Adjacent only — may be *mentioned* in move-out articles, never targeted. |
| **Truck / equipment rental** | 3 ton pickup truck rental dubai · truck rental for junk dubai · skip hire dubai | Customer wants equipment, not a crew. Different product. (Note: *"skip hire alternative"* IS targetable — see cluster F.) |
| **Cleaning services** | deep cleaning dubai · end of tenancy cleaning dubai · maid service dubai | Different service. May be referenced as a complementary step in move-out content, never targeted. |
| **Outside Dubai** | junk removal abu dhabi · junk removal sharjah · rubbish removal ajman · junk removal uae (when geo-ambiguous) | Out of service area. Generates leads that cannot be served. |
| **Employment** | junk removal jobs dubai · driver jobs dubai · helper jobs dubai | Job seekers, not customers. |
| **Franchise / B2B supply** | junk removal franchise dubai · buy junk removal business | Wrong audience. |

### Conditional / handle-with-care

| Query family | Ruling |
|---|---|
| **free junk removal dubai** · take my junk dubai free · free furniture removal dubai | **NOT a money target. Informational support only.** These are genuine *removal* intent (permitted), but the searcher expects free collection and this business charges. Targeting them on a service page produces high bounce and unqualified enquiries. Correct play: one honest comparison article explaining what is genuinely free in Dubai (Municipality bulky waste, charity collections such as Dar Al Ber / Beit Al Khair / Red Crescent — *all to be verified before publication*), what those free routes will and will not do (notably: ground-level only, scheduling delays), and when a paid crew is the right answer. This converts the minority who need carry-down, speed or a full clearance, and it is truthful. Never imply this service is free. |
| **take my junk dubai** | **Medium-value, targetable as a secondary.** Intent is removal. However it is heavily brand-associated with an established competitor, so it is a weak primary target. Assign as a secondary phrase on `/services/junk-removal` only. |
| **junk removal near me** | Targetable but **not** as an on-page string. "Near me" is resolved by Google through proximity and Business Profile signals, not page copy. Owned by the **Google Business Profile + area-page layer**, not by a keyword-stuffed page. Do not write "junk removal near me" into copy. |
| **cheap / cheapest junk removal dubai** | **Low priority, low lead quality.** Price-led searchers convert poorly for a fixed-price, carry-out service. Handle within cost content; do not build a landing page around "cheap". |

---

## Existing Page Keyword Ownership

This table is the **cannibalization baseline**. Before any new content is created, this is who owns what today, read directly from live titles and H1s. Downstream files must respect these assignments.

### Service pages

| URL | Current `<title>` | Current H1 | **Owns (primary)** | Owns (secondary) | Must NOT target |
|---|---|---|---|---|---|
| `/services/junk-removal` | Junk Removal in Dubai — One Photo, One Visit | Junk removal in Dubai for anything you no longer need | junk removal service dubai | junk collection dubai · junk disposal dubai · rubbish removal dubai · take my junk dubai · bulky junk removal dubai | same-day terms · clearance terms |
| `/services/garbage-removal` | Garbage Removal in Dubai — One-Off or Recurring Collection | Garbage removal in Dubai when the bins are not enough | garbage removal dubai | garbage collection dubai · household garbage removal dubai · recurring garbage pickup dubai | construction/renovation waste (belongs to `/waste-removal`) |
| `/services/furniture-removal` | Furniture Removal in Dubai — Dismantled, Carried, Gone | Furniture removal in Dubai, dismantling and heavy lifting included | **furniture removal dubai** | furniture disposal dubai · old furniture removal dubai · wardrobe/bed/mattress removal dubai · furniture pickup dubai | sofa/couch terms (belong to `/sofa-removal`) |
| `/services/sofa-removal` | Sofa Removal in Dubai — Through Tight Doors and Service Lifts | Sofa removal in Dubai apartments and villas | **sofa removal dubai** | couch removal dubai · old sofa disposal dubai · L-shape/corner sofa removal dubai | generic furniture terms |
| `/services/appliance-disposal` | Appliance Disposal in Dubai — Fridges, Washers, Ovens and AC Units | Appliance disposal in Dubai through licensed handlers | appliance disposal dubai · **fridge disposal dubai** | washing machine / oven / TV / AC / e-waste disposal dubai | commercial IT-asset disposal at scale (→ `/commercial-junk-removal`) |
| `/services/waste-removal` | Waste Removal in Dubai — Renovation, Clear-Out and Site Loads | Waste removal in Dubai for renovation, clear-out and site loads | waste removal dubai · construction waste removal dubai | renovation waste · debris/rubble removal · site clearance dubai | household bin/garbage terms (→ `/garbage-removal`) |
| `/services/garden-waste-removal` | Garden Waste Removal in Dubai — Branches, Soil, Pots and Outdoor Sets | Garden waste removal for Dubai villas and outdoor spaces | **garden waste removal dubai** | green waste collection dubai · palm frond removal dubai · garden clearance dubai · outdoor furniture removal dubai | full villa clearance (→ `/villa-clearance`) |
| `/services/house-clearance` | House Clearance in Dubai — Ready for Handover | House and apartment clearance in Dubai before you hand over | **house clearance dubai** | apartment clearance dubai · end of tenancy clearance dubai · move-out clearance dubai · property clearance dubai | villa-specific terms (→ `/villa-clearance`) |
| `/services/villa-clearance` | Villa Clearance in Dubai — Garden, Storage, Maid Room and Majlis | Full villa clearance across Dubai, scheduled over one or two days | **villa clearance dubai** | villa junk removal dubai · full villa cleanout dubai · maid room / majlis / garage clearance dubai | apartment terms (→ `/house-clearance`) |
| `/services/same-day-junk-removal` | Same-Day Junk Removal in Dubai — Message Before Midday | Same-day junk removal in Dubai when it has to go today | **same day junk removal dubai** | urgent junk removal dubai · emergency junk removal dubai · junk removal today dubai · same day rubbish removal dubai | generic junk removal head term |
| `/services/residential-junk-removal` | Residential Junk Removal in Dubai — Building Permissions Handled | Residential junk removal for Dubai apartments and homes | residential junk removal dubai | apartment junk removal dubai · tower/high-rise junk removal dubai · service lift junk removal dubai | house clearance terms (→ `/house-clearance`) |
| `/services/commercial-junk-removal` | Commercial Junk Removal in Dubai — Offices, Shops and Warehouses | Commercial junk removal for Dubai offices, shops and warehouses | **commercial junk removal dubai** · office clearance dubai | office furniture removal dubai · shop clearance dubai · warehouse clearance dubai · strip-out clearance dubai | residential terms |

### Area pages

All 30 area pages follow the pattern `Junk Removal in {Area} — {differentiator}` with area-specific H1s (e.g. Dubai Marina: *"Junk removal in Dubai Marina with the service lift booked for you"*).

- **Own:** `junk removal {area}` and its close variants (`junk removal in {area}`, `rubbish removal {area}`, `junk collection {area}`).
- **May own, where the page already speaks to it:** one or two *service+area* combinations genuinely relevant to that community — e.g. `villa clearance arabian ranches`, `office clearance business bay`, `warehouse clearance al quoz`, `garden waste removal jumeirah`.
- **Must NOT own:** un-modified service head terms. An area page must never compete for `furniture removal dubai`.

### Non-service pages

| URL | Owns | Notes |
|---|---|---|
| `/` (homepage) | **junk removal dubai** (head term) · brand terms (`junk services dubai`) | Current title: *Junk Services Dubai — Junk Removal, Furniture Pickup & Villa Clearance*; H1: *Same-day junk removal across Dubai*. See **Cannibalization Map C-1 and C-2** — the H1 creates a same-day overlap that needs resolving. |
| `/services` | junk removal services dubai · what junk removal companies take | Category hub. Passes authority down; not a primary money target itself. |
| `/areas` | junk removal areas dubai · junk removal dubai coverage | Geo hub. Critical internal-link distributor to all 30 area pages. |
| `/how-it-works` | how junk removal works dubai · junk removal process dubai | Strong mid-funnel asset. Good conversion-support target for cost/process queries. |
| `/contact` | book junk removal dubai · junk removal quote dubai · junk removal whatsapp dubai | Conversion page. Thin on ranking value, high on conversion value. |
| `/about` | brand/trust terms | Supports E-E-A-T and brand defence. Not a commercial target. |
| `/blog` | (hub only) | Owns no commercial keyword. Distributes to articles. |


---

## 2-MONTH PRIMARY FOCUS — TOP 10

> **Status of this prioritisation.** The ten targets below are **campaign targets, not guaranteed ranking outcomes**, and their ordering is a `QUALITATIVE SEO ASSESSMENT` made without Dubai-specific search-volume or Search Console data. Relative demand between them is an `UNVERIFIED SEARCH-DEMAND ASSUMPTION`; every lead-value statement is a `COMMERCIAL HYPOTHESIS`. **Once Keyword Planner and Search Console data arrive, the prioritisation within this set may need revisiting — but the set itself stays fixed for the campaign** (see *Measurement Plan* and *Data-Driven Keyword Expansion*), because changing the measurement set mid-campaign destroys the ability to measure anything.

**Selection logic.** These ten spread risk across three time horizons, on the assessment that a site at effectively zero visibility is unlikely to move head terms inside 60 days:

- **Anchor terms (slow, highest ceiling):** #1, #3, #6 — inside this window these will show as *impression growth and position drift*, not page-one rankings. They are here because they must be owned and measured from Day 0.
- **Mid-tail service terms (realistic movement in the window):** #2, #4, #5, #7, #9.
- **Early-opportunity terms (assessed as most likely to move first):** #8, #10.

Deliberately **not** given a slot, with reasons: `garbage removal dubai` and `waste removal dubai` (heavy mutual overlap and overlap with junk removal — Month 2 secondary targets, see C-5); `residential junk removal dubai` (largely a synonym cluster of house clearance + apartment junk removal, see C-6); `rubbish removal dubai` (a phrasing variant of #1, not a separate intent, see C-3); `take my junk dubai` (competitor-brand-dominated).

No two slots below are wording variants of one another. Each resolves to a distinct page.

---

### FOCUS 1 — `junk removal dubai`

| Field | Value |
|---|---|
| **Primary keyword** | junk removal dubai |
| **Close variants** | dubai junk removal · junk removal in dubai · junk removal service dubai · junk removal company dubai · junk removal services in dubai |
| **Search intent** | Commercial / transactional. Top-of-funnel category term; the searcher wants a company and expects price signals, coverage and an immediate way to make contact. |
| **Recommended target URL** | `/` (homepage) |
| **Existing or new** | **Existing.** Title already leads with the term. No new page. |
| **Why it generates leads** | `COMMERCIAL HYPOTHESIS` — expected to carry the broadest commercial intent in the category, because every downstream service is a subset of it, and to feed the local pack. **Neither the demand nor the conversion behaviour has been measured for this site.** Requires Keyword Planner and conversion data to validate. |
| **Supporting cluster** | junk removal services dubai · junk removal company dubai · junk pickup dubai · junk collection dubai · junk disposal dubai · junk hauling dubai · take my junk dubai · bulky waste removal dubai · junk removal cost dubai · best junk removal dubai · clutter removal dubai |
| **Related service pages** | `/services/junk-removal` (primary child) · `/services` hub · all twelve services |
| **Related area pages** | `/areas` hub, which distributes to all 30 |
| **Supporting articles** | *How much does junk removal cost in Dubai?* · *What happens to your junk after we take it* · *Free junk removal in Dubai: what's actually free* · *What junk removal companies in Dubai will and won't take* |
| **Internal-link strategy** | Homepage is the hub and already links to service groups and featured areas. Inbound: `/services` and `/areas` link up; articles reference the brand naturally. Do **not** build exact-match "junk removal dubai" anchors pointing home — use brand or natural-language anchors. |
| **Cannibalization risks** | **High.** `/` vs `/services/junk-removal` vs `/services` all read as "junk removal Dubai". Resolved in **C-1** — homepage takes the head term, `/services/junk-removal` takes qualified variants. |
| **Priority** | **P1 — anchor** |
| **Month emphasis** | **Both.** Month 1: baseline, fix C-1/C-2, build cost/process articles. Month 2: authority consolidation. Expect impression growth, not position wins, inside 60 days. |

---

### FOCUS 2 — `same day junk removal dubai`

| Field | Value |
|---|---|
| **Primary keyword** | same day junk removal dubai |
| **Close variants** | same day rubbish removal dubai · urgent junk removal dubai · emergency junk removal dubai · junk removal today dubai · same day junk pickup dubai |
| **Search intent** | Transactional, **urgent**. The searcher has a deadline today — a handover, an inspection, a delivery, a landlord. Lowest deliberation, shortest path to contact. |
| **Recommended target URL** | `/services/same-day-junk-removal` |
| **Existing or new** | **Existing**, and strong — it already frames "message before midday" and explains what makes a slot possible. |
| **Why it generates leads** | `COMMERCIAL HYPOTHESIS` — expected to convert at a higher rate per session than the non-urgent terms, on the reasoning that a deadline collapses comparison shopping. It is also the brand’s stated differentiator, so the page can be specific rather than generic. **No conversion data exists to support the expectation; it must be validated against WhatsApp/call/form events before it drives further investment.** |
| **Supporting cluster** | urgent junk removal dubai · emergency junk removal dubai · junk removal today dubai · last minute junk removal dubai · weekend junk removal dubai · next day junk removal dubai · short notice junk removal dubai · 24 hour junk removal dubai · fast junk removal dubai |
| **Related service pages** | `/services/junk-removal` · `/services/sofa-removal` · `/services/house-clearance` · `/services/residential-junk-removal` |
| **Related area pages** | Route-dense areas where same-day is most deliverable: `/areas/dubai-marina` · `/areas/jlt` · `/areas/business-bay` · `/areas/downtown-dubai` · `/areas/jvc` · `/areas/discovery-gardens` |
| **Supporting articles** | *Need junk gone today in Dubai? What's actually possible and by when* · *Moving out this week: a realistic clearance timeline* · *Landlord inspection tomorrow — what to clear first* |
| **Internal-link strategy** | Every urgency-flavoured article links here with deadline-framed anchors ("clear it the same afternoon", "a same-day slot"). Reverse links from the homepage hero and the six route-dense area pages. |
| **Cannibalization risks** | **Medium-high** against the homepage H1, currently *"Same-day junk removal across Dubai"*. See **C-2**. |
| **Priority** | **P1** |
| **Month emphasis** | **Month 1 — flagship.** `QUALITATIVE SEO ASSESSMENT` — prioritised on the expectation of earlier movement than the head terms and, per the hypothesis above, stronger lead quality. Both expectations are unmeasured. |

---

### FOCUS 3 — `furniture removal dubai`

| Field | Value |
|---|---|
| **Primary keyword** | furniture removal dubai |
| **Close variants** | furniture disposal dubai · old furniture removal dubai · furniture pickup dubai · furniture collection dubai · unwanted furniture removal dubai |
| **Search intent** | Commercial, mixed maturity. Some want a price now; many are mid-research and are simultaneously weighing donation and Municipality collection. |
| **Recommended target URL** | `/services/furniture-removal` |
| **Existing or new** | **Existing.** Page already leads on dismantling and heavy lifting — the two things the free routes do not do. |
| **Why it generates leads** | Furniture is the most common single trigger for a junk-removal enquiry, and the items are heavy and awkward, which is exactly when people stop trying to DIY it. The dismantling angle is a genuine differentiator. |
| **Supporting cluster** | old furniture disposal dubai · wardrobe removal dubai · bed removal dubai · bed frame disposal dubai · mattress removal dubai · mattress disposal dubai · dining table removal dubai · broken furniture disposal dubai · furniture dismantling dubai · IKEA furniture disposal dubai · bedroom furniture removal dubai |
| **Related service pages** | `/services/sofa-removal` (sibling — strict boundary) · `/services/house-clearance` · `/services/junk-removal` · `/services/residential-junk-removal` |
| **Related area pages** | High furniture-turnover communities: `/areas/dubai-marina` · `/areas/jvc` · `/areas/jlt` · `/areas/business-bay` · `/areas/al-nahda` · `/areas/international-city` |
| **Supporting articles** | *How to dispose of old furniture in Dubai (every option, honestly compared)* · *How to get rid of a mattress in Dubai* · *Wardrobe won't fit through the door? Here's what happens* · *Where to donate furniture in Dubai* |
| **Internal-link strategy** | The "dispose of old furniture" guide is treated as the **highest-priority supporting article** in the plan (`QUALITATIVE SEO ASSESSMENT` — based on the observed listicle-dominated SERP, not on measured traffic) — it targets the research-stage query and routes to this page. Anchors descriptive ("have it carried out and taken away", "a crew that dismantles it first"), never exact-match repetition. |
| **Cannibalization risks** | **Medium** vs `/services/sofa-removal` and `/services/house-clearance`. Resolved in **C-4**: item-type boundary — sofas/couches to the sofa page, everything else here, whole-property to clearance. |
| **Priority** | **P1 — anchor** |
| **Month emphasis** | **Both.** Month 1 builds the disposal-guide cluster; Month 2 adds item-level depth. |

---

### FOCUS 4 — `sofa removal dubai`

| Field | Value |
|---|---|
| **Primary keyword** | sofa removal dubai |
| **Close variants** | sofa disposal dubai · old sofa removal dubai · couch removal dubai · couch disposal dubai · sofa pickup dubai |
| **Search intent** | Transactional, item-specific. Very often triggered by a **new sofa being delivered** — a hard date, which makes it urgent. |
| **Recommended target URL** | `/services/sofa-removal` |
| **Existing or new** | **Existing**, and unusually well-targeted — it already addresses "won't fit through the door", service lifts, and timing around a new delivery. |
| **Why it generates leads** | Narrower and less contested than `furniture removal dubai` with equal or better commercial intent — a realistic **Month 1–2 movement candidate**. "Old sofa out before the new one arrives" is a deadline, and deadlines convert. |
| **Supporting cluster** | old sofa disposal dubai · L-shaped sofa removal dubai · corner sofa removal dubai · sofa bed removal dubai · armchair removal dubai · sofa removal apartment dubai · sofa won't fit through door dubai · 3 seater sofa disposal dubai |
| **Related service pages** | `/services/furniture-removal` (parent) · `/services/same-day-junk-removal` · `/services/residential-junk-removal` |
| **Related area pages** | Apartment-dense, tight-access towers: `/areas/dubai-marina` · `/areas/jlt` · `/areas/jbr` · `/areas/downtown-dubai` · `/areas/discovery-gardens` · `/areas/karama` |
| **Supporting articles** | *Getting a sofa out of a Dubai apartment when it won't fit through the door* · *Timing old-sofa removal around a new delivery* · *What it costs to remove a sofa in Dubai* |
| **Internal-link strategy** | Link up to `/services/furniture-removal` as the broader service, sideways to `/services/same-day-junk-removal` for delivery-day urgency, down to tower area pages for access detail. |
| **Cannibalization risks** | **Medium** vs `/services/furniture-removal`. Resolved in **C-4**. The sofa page must never target unqualified "furniture removal dubai". |
| **Priority** | **P1** |
| **Month emphasis** | **Month 1.** One of the two most realistic mid-tail wins in the window. |

---

### FOCUS 5 — `fridge disposal dubai`

| Field | Value |
|---|---|
| **Primary keyword** | fridge disposal dubai |
| **Close variants** | fridge removal dubai · old fridge disposal dubai · refrigerator disposal dubai · fridge pickup dubai · freezer disposal dubai |
| **Search intent** | Transactional with a strong **regulatory-anxiety** overlay. Fridges contain refrigerants and fall under e-waste rules; searchers are often checking whether they are *allowed* to dispose of it a given way, then hiring someone. |
| **Recommended target URL** | `/services/appliance-disposal` |
| **Existing or new** | **Existing** — the title already names fridges first and the page explains licensed-handler routing. **Recommended enhancement (Month 1; a code change, out of scope for this file):** a dedicated H2 *"Fridge and freezer removal in Dubai"* plus a fridge-specific FAQ, so the topical match to the query is explicit. |
| **Why it generates leads** | Item-level, high-anxiety, high-intent, and the compliance angle lets this site win on substance where competitors publish filler. Fridges are also heavy and usually upstairs — the exact job the free Municipality route will not do. |
| **Supporting cluster** | fridge removal dubai · refrigerator disposal dubai · freezer disposal dubai · washing machine disposal dubai · washing machine removal dubai · oven removal dubai · dishwasher removal dubai · AC unit removal dubai · air conditioner disposal dubai · TV disposal dubai · e-waste disposal dubai · electronics disposal dubai · water heater removal dubai |
| **Related service pages** | `/services/junk-removal` · `/services/house-clearance` · `/services/commercial-junk-removal` (bulk IT/appliance) |
| **Related area pages** | `/areas/mirdif` · `/areas/international-city` · `/areas/al-nahda` · `/areas/bur-dubai` · `/areas/dubai-silicon-oasis` (e-waste) |
| **Supporting articles** | *How to dispose of a fridge in Dubai (and why you can't just put it outside)* · *Is an old AC unit e-waste in Dubai?* · *Where old appliances actually go after collection* · *Washing machine removal: what the crew needs to know before arriving* |
| **Internal-link strategy** | The fridge guide is the entry point; it links to `/services/appliance-disposal` with anxiety-resolving anchors ("collected by a licensed handler"), and sideways to the Municipality bulky-waste guide. |
| **Cannibalization risks** | **Medium.** A dedicated `/services/fridge-removal` page would cannibalise `/services/appliance-disposal`. **Decision: do not create one in Month 1.** See **C-7** for the Month 2 conditional review. |
| **Priority** | **P1** |
| **Month emphasis** | **Month 1.** |

---

### FOCUS 6 — `villa clearance dubai`

| Field | Value |
|---|---|
| **Primary keyword** | villa clearance dubai |
| **Close variants** | villa junk removal dubai · villa cleanout dubai · full villa clearance dubai · villa clearance services dubai |
| **Search intent** | Commercial, **high-consideration, high-value**. Usually a move-out, an estate, a sale or a handover. The searcher compares operators on capacity and trust, not price alone. |
| **Recommended target URL** | `/services/villa-clearance` |
| **Existing or new** | **Existing**, and genuinely differentiated — it already covers garden, storage, maid room, majlis, gate access and multi-day scheduling. |
| **Why it generates leads** | `COMMERCIAL HYPOTHESIS` — expected to carry the highest revenue per lead in the set, on the reasoning that a full villa clearance is a multi-crew, multi-load, multi-day job while most other targets are single-item pickups. **The business has supplied no job values, so this is an assumption about its own economics, not a measured figure.** If it holds, a small number of enquiries would justify the investment — which is why it is weighted highly. Confirm against real job values before increasing spend here. |
| **Supporting cluster** | villa junk removal dubai · full villa cleanout dubai · maid room clearance dubai · majlis clearance dubai · garage clearance dubai · villa storage clearance dubai · large villa clearance dubai · estate clearance dubai · villa handover clearance dubai |
| **Related service pages** | `/services/house-clearance` (sibling) · `/services/garden-waste-removal` · `/services/furniture-removal` · `/services/appliance-disposal` |
| **Related area pages** | Villa communities, and these are the *right* ones: `/areas/arabian-ranches` · `/areas/jumeirah` · `/areas/dubai-hills` · `/areas/damac-hills` · `/areas/jumeirah-golf-estates` · `/areas/the-springs` · `/areas/al-warqa` · `/areas/palm-jumeirah` · `/areas/al-furjan` · `/areas/town-square` |
| **Supporting articles** | *What a full villa clearance in Dubai actually involves* · *Villa handover: what has to be gone before inspection* · *Clearing a villa after a tenancy ends* · *How long does a villa clearance take?* · *Gated communities: access, permits and timing* |
| **Internal-link strategy** | The hub of the cluster hypothesised to carry the highest job value. All ten villa-community area pages link here as their lead service; villa articles link both here and to `/services/garden-waste-removal` (villas almost always have green waste — a genuine cross-sell, not a forced link). |
| **Cannibalization risks** | **High** vs `/services/house-clearance`. Resolved in **C-8**: strict property-type boundary — villa/townhouse here, apartment/flat there. |
| **Priority** | **P1 — anchor.** Value ranking is a `COMMERCIAL HYPOTHESIS`, pending real job values. |
| **Month emphasis** | **Both.** Month 1 establishes the cluster; Month 2 deepens with community-specific and process content. |

---

### FOCUS 7 — `house clearance dubai`

| Field | Value |
|---|---|
| **Primary keyword** | house clearance dubai |
| **Close variants** | apartment clearance dubai · home clearance dubai · flat clearance dubai · property clearance dubai · house clearance services dubai |
| **Search intent** | Commercial, deadline-driven. Dominated by **end-of-tenancy and handover** scenarios, which in Dubai carry a hard inspection date and a deposit at stake. |
| **Recommended target URL** | `/services/house-clearance` |
| **Existing or new** | **Existing.** Already framed around handover and landlord inspection — exactly the right frame. |
| **Why it generates leads** | The deposit is the motivator. A tenant facing an inspection has a fixed deadline and a financial reason to pay for certainty. Whole-property jobs also carry high ticket values. |
| **Supporting cluster** | apartment clearance dubai · end of tenancy clearance dubai · move out clearance dubai · move out junk removal dubai · house cleanout dubai · handover clearance dubai · landlord inspection clearance dubai · storage room clearance dubai · estate clearance dubai · hoarder clearance dubai |
| **Related service pages** | `/services/villa-clearance` (sibling) · `/services/furniture-removal` · `/services/appliance-disposal` · `/services/residential-junk-removal` · `/services/same-day-junk-removal` |
| **Related area pages** | Apartment-dense, high-turnover: `/areas/dubai-marina` · `/areas/jlt` · `/areas/jvc` · `/areas/downtown-dubai` · `/areas/business-bay` · `/areas/dubai-creek-harbour` · `/areas/al-furjan` · `/areas/discovery-gardens` |
| **Supporting articles** | *End of tenancy in Dubai: what has to be cleared before handover* · *Move-out clearance timeline: working back from your inspection date* · *Will the landlord deduct from my deposit for leaving furniture?* · *Clearing a studio vs a 3-bed: what changes* |
| **Internal-link strategy** | The tenancy cluster is expected to be a strong mid-funnel feeder (`COMMERCIAL HYPOTHESIS`). Every move-out article links here as the primary action, and to `/services/same-day-junk-removal` where the deadline is tight. |
| **Cannibalization risks** | **High** on two fronts — vs `/services/villa-clearance` (**C-8**) and vs `/services/residential-junk-removal` (**C-6**). |
| **Priority** | **P1** |
| **Month emphasis** | **Month 1.** |

---

### FOCUS 8 — `garden waste removal dubai`

| Field | Value |
|---|---|
| **Primary keyword** | garden waste removal dubai |
| **Close variants** | green waste removal dubai · garden waste collection dubai · garden waste disposal dubai · green waste collection dubai · garden clearance dubai |
| **Search intent** | Commercial, practical, often recurring. Villa owners and landscapers with a physical pile the normal bins cannot take. |
| **Recommended target URL** | `/services/garden-waste-removal` |
| **Existing or new** | **Existing.** Already specific about branches, trimmings, soil, pots and outdoor furniture. |
| **Why it generates leads** | `QUALITATIVE SEO ASSESSMENT` — of the six themes sampled on 2026-09-20, the garden-waste SERP showed the thinnest and weakest competitor pages, so this is the theme most likely to move early. **This is an impression from a small, US-geolocated sample, not a difficulty measurement.** `COMMERCIAL HYPOTHESIS` — green waste recurs, so a won customer may carry higher lifetime value than a one-off pickup; unmeasured. |
| **Supporting cluster** | green waste disposal dubai · palm frond removal dubai · palm tree waste removal dubai · tree branch removal dubai · grass clippings disposal dubai · garden clearance dubai · soil removal dubai · sand bag removal dubai · outdoor furniture removal dubai · garden furniture disposal dubai · landscaping waste removal dubai · plant pot disposal dubai · villa garden waste removal dubai |
| **Related service pages** | `/services/villa-clearance` (natural parent) · `/services/junk-removal` · `/services/furniture-removal` (outdoor sets) |
| **Related area pages** | Villa/garden communities only: `/areas/jumeirah` · `/areas/arabian-ranches` · `/areas/dubai-hills` · `/areas/the-springs` · `/areas/jumeirah-golf-estates` · `/areas/damac-hills` · `/areas/al-warqa` · `/areas/town-square` |
| **Supporting articles** | *What to do with palm fronds in Dubai* · *Garden waste in Dubai: what the bins won't take* · *Clearing a villa garden before handover* · *Soil, sand and pots: the waste people forget to plan for* |
| **Internal-link strategy** | Two-way with `/services/villa-clearance` — a garden clear-out is frequently the first contact that becomes a full villa job. Link from the eight garden-community area pages. Do **not** link this from apartment-tower area pages; that would be a forced, irrelevant link. |
| **Cannibalization risks** | **Low.** Only `garden clearance` vs `villa clearance` (**C-9**), easily separated: green waste only here, whole-property there. |
| **Priority** | **P1 — early-opportunity candidate** (`QUALITATIVE SEO ASSESSMENT`) |
| **Month emphasis** | **Month 1.** Assessed as the most likely service page to show early ranking movement — a hypothesis to test at Day 30, not a forecast. |

---

### FOCUS 9 — `commercial junk removal dubai`

| Field | Value |
|---|---|
| **Primary keyword** | commercial junk removal dubai |
| **Close variants** | office clearance dubai · office junk removal dubai · business junk removal dubai · commercial clearance dubai |
| **Search intent** | B2B, commercial. Office managers, fit-out contractors, facilities teams, retail operators. Longer decision cycle, larger and often **repeating** contracts. |
| **Recommended target URL** | `/services/commercial-junk-removal` |
| **Existing or new** | **Existing.** Already covers out-of-hours work, strip-outs, desks/partitions/IT waste and recurring schedules. |
| **Why it generates leads** | `COMMERCIAL HYPOTHESIS` — B2B enquiries are expected to be fewer but higher in value, and to recur, on the reasoning that an office or warehouse contract covers repeated collections. **Unmeasured; no B2B job values supplied.** `QUALITATIVE SEO ASSESSMENT` — the competitor set observed on 2026-09-20 is overwhelmingly consumer-facing, suggesting weaker competition on B2B terms. |
| **Supporting cluster** | office clearance dubai · office furniture removal dubai · office furniture disposal dubai · office strip out clearance dubai · shop clearance dubai · retail fit out waste removal dubai · warehouse clearance dubai · warehouse junk removal dubai · commercial waste collection dubai · restaurant equipment removal dubai · office relocation junk removal dubai · IT equipment disposal dubai · recurring waste collection dubai |
| **Related service pages** | `/services/waste-removal` · `/services/appliance-disposal` (IT/e-waste) · `/services/garbage-removal` (recurring) |
| **Related area pages** | Commercial districts only: `/areas/business-bay` · `/areas/al-quoz` · `/areas/deira` · `/areas/dubai-silicon-oasis` · `/areas/jlt` · `/areas/dip` · `/areas/bur-dubai` · `/areas/karama` (shop stock) |
| **Supporting articles** | *Office strip-out in Dubai: clearing a floor without disrupting the building* · *What happens to old office furniture in Dubai* · *Out-of-hours clearance: why offices book nights and weekends* · *Warehouse clear-outs: planning around stock and access* · *Disposing of old office IT equipment responsibly* |
| **Internal-link strategy** | Commercial articles link only to commercial pages and commercial-district area pages. Keep this cluster hygienically separate from the residential clusters — mixing them muddies both. |
| **Cannibalization risks** | **Low-medium** vs `/services/waste-removal` for fit-out/construction loads. Resolved in **C-10**: who the customer is (business premises vs a site/renovation load) decides the page. |
| **Priority** | **P1.** Value ranking is a `COMMERCIAL HYPOTHESIS`, pending real job values. |
| **Month emphasis** | **Month 2 weighted.** Month 1 lays two foundation articles; Month 2 builds out the B2B cluster once consumer clusters are established. |

---

### FOCUS 10 — `junk removal dubai marina`

| Field | Value |
|---|---|
| **Primary keyword** | junk removal dubai marina |
| **Close variants** | junk removal in dubai marina · rubbish removal dubai marina · junk collection dubai marina · marina junk removal |
| **Search intent** | Transactional, **hyper-local**. The searcher has decided they need the service and is filtering for who covers their building. |
| **Recommended target URL** | `/areas/dubai-marina` |
| **Existing or new** | **Existing.** Genuinely area-specific — service-lift booking, tower access, timing around building rules. Not a doorway page. |
| **Why it generates leads** | `QUALITATIVE SEO ASSESSMENT` — expected to be the shortest realistic path to a ranking, because geo-modified long-tail is generally less contested than head terms and the intent sits near bottom-of-funnel. **Relative demand for this term is an `UNVERIFIED SEARCH-DEMAND ASSUMPTION`.** Dubai Marina is the **representative and lead target for the whole 30-page area layer**: one of the densest apartment populations in Dubai, high tenant turnover, and towers that create exactly the access problems this service solves. |
| **Supporting cluster** | *(the area-layer pattern — each resolves to its own area page)* junk removal jlt · junk removal jvc · junk removal business bay · junk removal downtown dubai · junk removal palm jumeirah · junk removal al barsha · junk removal deira · junk removal mirdif · junk removal international city · junk removal discovery gardens · junk removal jbr · junk removal al quoz · junk removal arabian ranches · junk removal dubai hills · junk removal jumeirah · furniture removal dubai marina · sofa removal dubai marina · apartment clearance dubai marina |
| **Related service pages** | `/services/residential-junk-removal` · `/services/sofa-removal` · `/services/furniture-removal` · `/services/house-clearance` · `/services/same-day-junk-removal` |
| **Related area pages** | Neighbours, via the existing `nearbyAreas` field: `/areas/jlt` · `/areas/jbr` · `/areas/al-barsha` |
| **Supporting articles** | *Getting bulky items out of a Dubai Marina tower* · *Service lift booking in Dubai buildings: how it actually works* · *Moving out of a Marina apartment: clearance checklist* |
| **Internal-link strategy** | `/areas` hub → area page; area page → its `popularServices`; tower-access articles → this page and its neighbours. This is the template to replicate across all 30 areas — **but only where the article has something genuinely area-specific to say.** |
| **Cannibalization risks** | **Low**, provided area pages never target un-modified service head terms (**C-11**). The real risk is *between* area pages if articles get duplicated per area — see **C-12**, the doorway-content prohibition. |
| **Priority** | **P1 — earliest-opportunity candidate** (`QUALITATIVE SEO ASSESSMENT`) |
| **Month emphasis** | **Month 1.** Assessed as among the more likely targets to produce an enquiry inside the window — a hypothesis to test, not a forecast. |

---

## Month 1 Strategy

**Window:** Mon 2026-09-21 → Sun 2026-10-18 (4 weeks)
**Theme:** *Fix the foundations, own the research-stage queries, win the fast lane.*

### Strategic priorities, in order

1. **Instrument before publishing.** The site currently has **no working analytics** — the Plausible component exists but `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is unset, so nothing is being recorded, and there is no evidence in the repo of a verified Search Console property. **Nothing else in this plan is measurable until that is fixed.** Week 1, Day 1 work. See **Measurement Plan**.
2. **Resolve the cannibalization conflicts (C-1, C-2) before adding content.** Stacking 80 articles on top of an unresolved homepage/service-page overlap multiplies the problem.
3. **Attack the research-stage informational gap.** Competitors own "how to dispose of X in Dubai" with thin listicles (observed 2026-09-20). `QUALITATIVE SEO ASSESSMENT` — this is where a new site is most likely to gain ground early, on the reasoning that such queries are won on usefulness more than on domain authority, and they feed straight into the money pages. **Note that much of this cluster is currently source-blocked** — see the Article Opportunity Map.
4. **Activate the area layer.** Thirty well-written area pages are already live and are currently the site's most under-exploited asset. Internal links plus a handful of genuinely area-specific articles can move them.
5. **Build the tenancy/move-out cluster.** Deadline-driven, deposit-motivated, high-conversion.

### Month 1 cluster priority

| Rank | Cluster | Money page | Why Month 1 |
|---|---|---|---|
| 1 | Furniture & item disposal guides | `/services/furniture-removal`, `/services/sofa-removal` | Assessed as the largest research-stage query pool; competitor content observed to be thin |
| 2 | Appliance & e-waste / fridge | `/services/appliance-disposal` | High anxiety, high intent, strong compliance angle |
| 3 | Move-out / end of tenancy | `/services/house-clearance` | Hard deadlines, deposit at stake; conversion hypothesised, unmeasured |
| 4 | Same-day / urgent | `/services/same-day-junk-removal` | Hypothesised strong conversion; brand differentiator |
| 5 | Municipality / rules / cost transparency | `/`, `/how-it-works` | Trust-building; captures the "is this free?" audience honestly |
| 6 | Tower access & area-specific | `/areas/*`, `/services/residential-junk-removal` | Assessed as the earliest ranking opportunity |
| 7 | Garden waste | `/services/garden-waste-removal` | Assessed as the least contested service theme (small SERP sample) |
| 8 | Villa clearance foundations | `/services/villa-clearance` | Hypothesised highest job value; start early, matures in Month 2 |

### Month 1 publishing shape

**Publishing rule: up to 3 high-quality articles per day.** Three is a ceiling the business would like to reach, **never a quota to fill**. Publishing one or two strong articles on a given day is better than forcing a third weak one. **Never create content solely to hit the daily number.**

Every proposed article must clear all six gates before it is commissioned:

1. **Distinct search intent** — not a rewording of an intent already covered.
2. **A clear primary keyword** — drawn from the mapped database in this file.
3. **A unique purpose** — it answers something no existing page answers.
4. **A defined money page it supports** — declared in `relatedServices`.
5. **Enough useful information to justify its own URL** — if the answer is three sentences, it belongs as a section or FAQ on an existing page, not as an article.
6. **No material cannibalization** with any existing service page, area page or published article.

An article that fails any gate is not published, not reworded into eligibility, and not replaced with a filler topic.

On that basis the clusters above support roughly **70–85 articles** in Month 1 without duplication. **That is a capacity estimate, not a target** — the weekly figures below are indicative ranges for planning, and falling short of them because topics did not clear the gates is a correct outcome, not a failure.

| Week | Dates | Focus | Articles |
|---|---|---|---|
| **W1** | Sep 21–27 | Instrumentation + pillar guides that are unblocked + item-level starts. **Note: several planned pillars are source-blocked or need business input — see the Article Opportunity Map. Start with what is READY.** | up to ~18 |
| **W2** | Sep 28–Oct 4 | Item-level disposal depth (mattress, sofa, wardrobe, AC, TV, washing machine) + same-day/urgent | up to ~21 |
| **W3** | Oct 5–11 | Move-out / end-of-tenancy cluster + tower access + first area-specific pieces | up to ~21 |
| **W4** | Oct 12–18 | Garden waste + villa clearance foundations + first commercial pieces + internal-link consolidation pass | up to ~21 |

**Non-content work that matters more than article #79:**

- **Google Business Profile** claimed, categorised and populated. For a local service business this frequently outweighs on-page SEO for "near me" and head-term visibility. **Not optional.**
- Search Console + Bing Webmaster verified; sitemap submitted.
- Plausible configured, including outbound-link/tagged-event tracking so WhatsApp and phone clicks are measurable.
- `LocalBusiness` schema reviewed; `Service` and `FAQPage` schema confirmed on service pages; `BlogPosting` on articles.
- Internal-link audit: confirm no article is orphaned.

---

## Month 2 Strategy

**Window:** Mon 2026-10-19 → Sun 2026-11-15 (4 weeks)
**Theme:** *Depth over breadth — topical authority, B2B expansion, consolidation around the same ten money pages.*

**The money pages do not change.** Month 2 adds no new focus keywords. Everything published deepens the same ten clusters. This is deliberate: switching targets at Day 30 destroys the ability to measure anything.

### Strategic priorities

1. **Read the Day 30 data and reallocate.** The first genuine data arrives at Day 30, and **Month 2 priorities are expected to change in response to it** — nothing in the Month 2 plan is fixed except the Top 10 measurement set. Clusters showing impression growth get more depth; clusters flat after 30 days get diagnosed before receiving more content.

   **Reallocate on these signals:** Search Console impressions · the actual queries the site ranks for (often not the ones predicted) · landing-page visibility, and whether the *intended* URL is the one ranking · indexing coverage and speed · CTR on pages that already have impressions · any cannibalization symptoms (URLs swapping on a query) · conversions and leads where measurable.

   **What reallocation may change:** which clusters receive supporting content, article priorities, planned months, and newly admitted keywords. **What it must not change:** the fixed Top 10 measurement set — see *Data-Driven Keyword Expansion*. A keyword performing unexpectedly well earns more supporting content, not a slot in the measurement set.
2. **Expand the B2B/commercial cluster.** Deliberately held back — it needs the domain to have some footing first, and it is hypothesised to be high-value-per-lead territory (unmeasured).
3. **Complete the area layer selectively.** Area-specific articles **only** where there is something real to say. Explicitly: Palm Jumeirah and Discovery Gardens are reported to sit outside the free Municipality bulky-waste service — *if verified*, that is a genuinely unique, high-value area article. Producing 30 near-identical "junk removal in X" articles is **forbidden** (**C-12**).
4. **Long-tail and problem-based coverage.** "Sofa won't fit through the door", "landlord deducting deposit for leaving furniture", "fined for dumping furniture" — high specificity, low competition, strong intent.
5. **Consolidation over accumulation.** Weeks 7–8 shift from publishing to strengthening: internal links, refreshed pillar guides, merging near-duplicates, upgrading pages that show impressions but poor CTR.

### Month 2 publishing shape

**Same rule: up to 3 high-quality articles per day, never a quota.** Month 2 volume is deliberately left open, because **the Day 30 data decides where capacity goes** — see *Data-Driven Keyword Expansion*. Capacity estimate for planning: roughly **50–70 articles**, tapering as Weeks 7–8 shift toward consolidation.

> **Explicit flag, restated.** Three articles a day for 60 consecutive days implies ~180 articles. In this niche that number **cannot be filled with genuinely distinct, useful content.** The defensible ceiling across both months is roughly **120–150**, and it drops further once the source-blocked topics are removed from the queue. Past that ceiling, topics overlap, near-duplicates appear, and the work actively harms the site through cannibalization and quality dilution. **The ceiling is a consequence of the six gates above, not a separate budget — if fewer topics clear the gates, fewer articles publish.**
>
> **Recommendation:** publish only what clears the six gates — in practice roughly 70–85 in Month 1 and 50–70 in Month 2 — and spend the recovered capacity on updating pillar pages, internal linking, schema, page speed, Google Business Profile content and conversion-rate work. `COMMERCIAL HYPOTHESIS`: that is expected to produce more enquiries than the same effort spent on additional thin articles; unmeasured, but it is the lower-risk allocation. If more volume is genuinely required, the honest way to create it is to expand the *service* footprint (new, real services) rather than to slice existing topics thinner.

| Week | Dates | Focus | Articles |
|---|---|---|---|
| **W5** | Oct 19–25 | Day 30 review + reallocation; villa clearance depth; garden waste depth | up to ~18 |
| **W6** | Oct 26–Nov 1 | Commercial/B2B build-out; warehouse, retail, strip-out | up to ~18 |
| **W7** | Nov 2–8 | Area-specific (only where justified); problem-based long-tail; recycling & disposal-destination content | up to ~18 |
| **W8** | Nov 9–15 | Consolidation: internal-link pass, pillar refreshes, CTR/title rewrites, Day 60 preparation | few — optimisation-weighted |

---

## Master Keyword Database — 200+

**How to read this table.**

- **Lead intent** — `HIGH` = the searcher needs removal now or imminently · `MED` = relevant but researching, comparing or lower-value · `INFO` = informational support that can be routed to a service · `EXCL` = do not target.
- **Dest.** — `SERVICE` · `AREA` · `BLOG` · `SUPPORT` (a secondary keyword on an existing page, no page of its own) · `DNT` (do not target).
- **Pri.** — P1 = Month 1 · P2 = Month 2 · P3 = backlog / opportunistic.
- **Volume / KD / CPC columns are deliberately absent.** No tool data was available. Every demand judgement here is `UNVERIFIED` qualitative reasoning. Add a `Vol` column only when populating from a real source, and record the source and date in the same commit.

**Count: 283 researched, relevant and mapped Dubai keyword opportunities across 13 clusters (A–M)** — the count is verified by row count; the *demand* behind each keyword is not.

> **What this dataset is, stated precisely.** These are **283 researched, relevant and mapped Dubai keyword opportunities**. They are **not** 283 verified high-volume keywords, not a ranked list of highest-demand terms, and not a validated opportunity list. Each one has been checked for relevance to the business, assigned an intent, classified for lead potential, and mapped to exactly one destination URL. **Search demand for every keyword here is an `UNVERIFIED SEARCH-DEMAND ASSUMPTION`** wherever Dubai-specific keyword-tool data is unavailable — which, at the time of writing, is everywhere. The value of this dataset is its coverage, intent classification and cannibalization-safe mapping, not its demand ranking.

> **No fabricated metrics.** No search volume, CPC, keyword difficulty, competition score or traffic forecast appears anywhere in this document, and none may be added by inference. Missing quantitative fields stay empty until a real source fills them, with that source and its date recorded alongside.

Separately, **12 hard-exclusion categories covering 40 example queries**, plus 4 handle-with-care families, are listed in *Excluded Search Intent*.

| Cluster | Theme | Keywords |
|---|---|---|
| A | Core junk removal (head + company variants) | 32 |
| B | Same-day / urgent | 14 |
| C | Furniture | 24 |
| D | Sofa / couch | 15 |
| E | Appliances, fridge & e-waste | 29 |
| F | Garbage & waste | 18 |
| G | Garden / green waste | 21 |
| H | House / apartment clearance | 20 |
| I | Villa clearance | 14 |
| J | Residential / tower access | 12 |
| K | Commercial / B2B | 19 |
| L | Area-modified (geo) | 40 |
| M | Informational support | 25 |
| | **Total** | **283** |

---

### Cluster A — Core junk removal (head + company variants)

Owner: `/` (head) and `/services/junk-removal` (qualified variants).

| # | Keyword | Intent | Lead | Dest. | Target URL | Pri. | Notes |
|---|---|---|---|---|---|---|---|
| A1 | junk removal dubai | Commercial | HIGH | SERVICE | `/` | P1 | **FOCUS 1.** Head term. |
| A2 | dubai junk removal | Commercial | HIGH | SUPPORT | `/` | P1 | Same intent as A1. Word-order variant — **never a separate page.** |
| A3 | junk removal in dubai | Commercial | HIGH | SUPPORT | `/` | P1 | Same intent as A1. |
| A4 | junk removal services dubai | Commercial | HIGH | SERVICE | `/services/junk-removal` | P1 | Plural "services" skews to comparing providers; hub page suits it. |
| A5 | junk removal service dubai | Commercial | HIGH | SERVICE | `/services/junk-removal` | P1 | Primary for the service page. |
| A6 | junk removal company dubai | Commercial | HIGH | SERVICE | `/services/junk-removal` | P1 | Provider-selection intent. Supports trust content. |
| A7 | junk removal companies in dubai | Commercial | MED | BLOG | `/blog/choosing-junk-removal-dubai` | P2 | Comparison intent — a list-shaped SERP. Honest comparison piece, not self-promotion. |
| A8 | junk collection dubai | Commercial | HIGH | SUPPORT | `/services/junk-removal` | P1 | Common UAE phrasing. |
| A9 | junk disposal dubai | Commercial | HIGH | SUPPORT | `/services/junk-removal` | P1 | "Disposal" skews slightly more to where-it-goes. |
| A10 | junk pickup dubai | Commercial | HIGH | SUPPORT | `/services/junk-removal` | P1 | |
| A11 | junk hauling dubai | Commercial | MED | SUPPORT | `/services/junk-removal` | P3 | US phrasing; low UAE usage. `UNVERIFIED`. |
| A12 | rubbish removal dubai | Commercial | HIGH | SUPPORT | `/services/junk-removal` | P1 | **British-English variant, heavily used in the UAE expat market.** See C-3 — secondary, not a page. |
| A13 | rubbish collection dubai | Commercial | MED | SUPPORT | `/services/garbage-removal` | P2 | Leans municipal/bin-collection. |
| A14 | trash removal dubai | Commercial | MED | SUPPORT | `/services/garbage-removal` | P3 | US phrasing. |
| A15 | take my junk dubai | Commercial | MED | SUPPORT | `/services/junk-removal` | P2 | Removal intent, but dominated by an established competitor brand. Secondary only. |
| A16 | bulky waste removal dubai | Commercial | HIGH | SUPPORT | `/services/junk-removal` | P1 | Bridges to the Municipality cluster (M). Strong. |
| A17 | bulk waste disposal dubai | Commercial | HIGH | BLOG | `/blog/bulky-waste-dubai` | P1 | Municipality-adjacent; high informational-to-commercial conversion. |
| A18 | bulky item pickup dubai | Commercial | HIGH | SUPPORT | `/services/junk-removal` | P2 | |
| A19 | junk removal cost dubai | Commercial | HIGH | BLOG | `/blog/junk-removal-cost-dubai` | P1 | **Pillar.** Price research immediately precedes an enquiry. |
| A20 | junk removal price dubai | Commercial | HIGH | SUPPORT | `/blog/junk-removal-cost-dubai` | P1 | Same intent as A19. |
| A21 | junk removal price list dubai | Commercial | MED | SUPPORT | `/blog/junk-removal-cost-dubai` | P2 | Only publish real, honoured prices. |
| A22 | how much does junk removal cost in dubai | Informational | HIGH | SUPPORT | `/blog/junk-removal-cost-dubai` | P1 | Question form of A19. |
| A23 | cheap junk removal dubai | Commercial | MED | SUPPORT | `/blog/junk-removal-cost-dubai` | P3 | Poor lead quality for a fixed-price carry-out service. Do not build a page around "cheap". |
| A24 | affordable junk removal dubai | Commercial | MED | SUPPORT | `/blog/junk-removal-cost-dubai` | P3 | As A23. |
| A25 | best junk removal dubai | Commercial | MED | SUPPORT | `/` | P2 | Provider-comparison SERP. Won through reviews and GBP, not copy. Never self-declare "best". |
| A26 | junk removal near me | Commercial | HIGH | SUPPORT | GBP + `/areas` | P1 | **Do not write into page copy.** Won by proximity + Google Business Profile. |
| A27 | clutter removal dubai | Commercial | MED | SUPPORT | `/services/junk-removal` | P2 | |
| A28 | debris removal dubai | Commercial | MED | SUPPORT | `/services/waste-removal` | P2 | Skews construction. |
| A29 | junk removal dubai whatsapp | Navigational/Comm. | HIGH | SUPPORT | `/contact` | P2 | Matches the actual booking flow. |
| A30 | book junk removal dubai | Transactional | HIGH | SUPPORT | `/contact` | P1 | Bottom of funnel. |
| A31 | junk removal quote dubai | Transactional | HIGH | SUPPORT | `/contact` | P1 | |
| A32 | what junk removal companies take dubai | Informational | MED | BLOG | `/blog/what-we-take-dubai` | P2 | Pre-qualifies leads; reduces wasted enquiries. |

---

### Cluster B — Same-day / urgent

Owner: `/services/same-day-junk-removal`.

| # | Keyword | Intent | Lead | Dest. | Target URL | Pri. | Notes |
|---|---|---|---|---|---|---|---|
| B1 | same day junk removal dubai | Transactional | HIGH | SERVICE | `/services/same-day-junk-removal` | P1 | **FOCUS 2.** |
| B2 | same day rubbish removal dubai | Transactional | HIGH | SUPPORT | `/services/same-day-junk-removal` | P1 | UK-English variant of B1. |
| B3 | same day junk pickup dubai | Transactional | HIGH | SUPPORT | `/services/same-day-junk-removal` | P1 | |
| B4 | urgent junk removal dubai | Transactional | HIGH | SUPPORT | `/services/same-day-junk-removal` | P1 | |
| B5 | emergency junk removal dubai | Transactional | HIGH | SUPPORT | `/services/same-day-junk-removal` | P2 | |
| B6 | junk removal today dubai | Transactional | HIGH | SUPPORT | `/services/same-day-junk-removal` | P1 | |
| B7 | last minute junk removal dubai | Transactional | HIGH | SUPPORT | `/services/same-day-junk-removal` | P2 | |
| B8 | short notice junk removal dubai | Transactional | HIGH | SUPPORT | `/services/same-day-junk-removal` | P3 | |
| B9 | next day junk removal dubai | Transactional | HIGH | SUPPORT | `/services/same-day-junk-removal` | P2 | Fallback when same-day slots are gone. |
| B10 | weekend junk removal dubai | Transactional | HIGH | BLOG | `/blog/weekend-junk-removal-dubai` | P2 | Only publish if weekend crews are genuinely available. |
| B11 | 24 hour junk removal dubai | Transactional | MED | SUPPORT | `/services/same-day-junk-removal` | P3 | **Only if true.** Do not imply 24h operation otherwise. |
| B12 | fast junk removal dubai | Commercial | HIGH | SUPPORT | `/services/same-day-junk-removal` | P2 | |
| B13 | junk removal within hours dubai | Transactional | HIGH | SUPPORT | `/services/same-day-junk-removal` | P3 | |
| B14 | need junk gone today dubai | Transactional | HIGH | BLOG | `/blog/junk-gone-today-dubai` | P1 | Natural-language urgency query. Excellent conversion. |

---

### Cluster C — Furniture

Owner: `/services/furniture-removal`.

| # | Keyword | Intent | Lead | Dest. | Target URL | Pri. | Notes |
|---|---|---|---|---|---|---|---|
| C1 | furniture removal dubai | Commercial | HIGH | SERVICE | `/services/furniture-removal` | P1 | **FOCUS 3.** |
| C2 | furniture disposal dubai | Commercial | HIGH | SUPPORT | `/services/furniture-removal` | P1 | SERP is listicle-heavy — feed via the pillar guide (C4). |
| C3 | old furniture removal dubai | Commercial | HIGH | SUPPORT | `/services/furniture-removal` | P1 | See C-13: same intent as C1, not a separate page. |
| C4 | how to dispose of old furniture in dubai | Informational | HIGH | BLOG | `/blog/dispose-old-furniture-dubai` | P1 | Highest-priority supporting article in the plan. Observed: competitors own this SERP with thin listicles. |
| C5 | old furniture disposal dubai | Commercial | HIGH | SUPPORT | `/services/furniture-removal` | P1 | |
| C6 | furniture pickup dubai | Commercial | HIGH | SUPPORT | `/services/furniture-removal` | P1 | |
| C7 | furniture collection dubai | Commercial | HIGH | SUPPORT | `/services/furniture-removal` | P2 | |
| C8 | unwanted furniture removal dubai | Commercial | HIGH | SUPPORT | `/services/furniture-removal` | P2 | |
| C9 | broken furniture disposal dubai | Commercial | HIGH | SUPPORT | `/services/furniture-removal` | P2 | Useful: excludes donation, so intent is clearly paid removal. |
| C10 | furniture dismantling dubai | Commercial | HIGH | SUPPORT | `/services/furniture-removal` | P2 | Core differentiator vs free routes. |
| C11 | bedroom furniture removal dubai | Commercial | HIGH | SUPPORT | `/services/furniture-removal` | P3 | |
| C12 | wardrobe removal dubai | Commercial | HIGH | BLOG | `/blog/wardrobe-removal-dubai` | P2 | "Won't fit through the door" angle. |
| C13 | wardrobe disposal dubai | Commercial | HIGH | SUPPORT | `/services/furniture-removal` | P2 | |
| C14 | bed removal dubai | Commercial | HIGH | SUPPORT | `/services/furniture-removal` | P2 | |
| C15 | bed frame disposal dubai | Commercial | HIGH | SUPPORT | `/services/furniture-removal` | P3 | |
| C16 | mattress removal dubai | Commercial | HIGH | BLOG | `/blog/mattress-disposal-dubai` | P1 | Strong standalone item query; hygiene rules out donation. |
| C17 | mattress disposal dubai | Commercial | HIGH | SUPPORT | `/blog/mattress-disposal-dubai` | P1 | |
| C18 | how to get rid of a mattress in dubai | Informational | HIGH | SUPPORT | `/blog/mattress-disposal-dubai` | P1 | |
| C19 | old mattress pickup dubai | Commercial | HIGH | SUPPORT | `/services/furniture-removal` | P2 | |
| C20 | dining table removal dubai | Commercial | MED | SUPPORT | `/services/furniture-removal` | P3 | |
| C21 | IKEA furniture disposal dubai | Commercial | MED | BLOG | `/blog/flatpack-furniture-disposal-dubai` | P2 | Flat-pack rarely survives a second assembly — strong "can't donate it" angle. |
| C22 | furniture removal apartment dubai | Commercial | HIGH | SUPPORT | `/services/residential-junk-removal` | P2 | |
| C23 | carpet disposal dubai | Commercial | MED | SUPPORT | `/services/furniture-removal` | P3 | |
| C24 | where to donate furniture in dubai | Informational | MED | BLOG | `/blog/donate-furniture-dubai` | P1 | Genuinely useful; captures research stage and converts the non-donatable subset. **All charity details must be verified.** |

---

### Cluster D — Sofa / couch

Owner: `/services/sofa-removal`.

| # | Keyword | Intent | Lead | Dest. | Target URL | Pri. | Notes |
|---|---|---|---|---|---|---|---|
| D1 | sofa removal dubai | Commercial | HIGH | SERVICE | `/services/sofa-removal` | P1 | **FOCUS 4.** |
| D2 | sofa disposal dubai | Commercial | HIGH | SUPPORT | `/services/sofa-removal` | P1 | |
| D3 | old sofa removal dubai | Commercial | HIGH | SUPPORT | `/services/sofa-removal` | P1 | |
| D4 | old sofa disposal dubai | Commercial | HIGH | SUPPORT | `/services/sofa-removal` | P1 | |
| D5 | couch removal dubai | Commercial | HIGH | SUPPORT | `/services/sofa-removal` | P2 | US phrasing; same intent. |
| D6 | couch disposal dubai | Commercial | HIGH | SUPPORT | `/services/sofa-removal` | P2 | |
| D7 | sofa pickup dubai | Commercial | HIGH | SUPPORT | `/services/sofa-removal` | P2 | |
| D8 | L shaped sofa removal dubai | Commercial | HIGH | SUPPORT | `/services/sofa-removal` | P2 | Access-problem intent — high conversion. |
| D9 | corner sofa removal dubai | Commercial | HIGH | SUPPORT | `/services/sofa-removal` | P2 | |
| D10 | sofa bed removal dubai | Commercial | MED | SUPPORT | `/services/sofa-removal` | P3 | |
| D11 | 3 seater sofa disposal dubai | Commercial | MED | SUPPORT | `/services/sofa-removal` | P3 | |
| D12 | armchair removal dubai | Commercial | MED | SUPPORT | `/services/furniture-removal` | P3 | |
| D13 | sofa removal apartment dubai | Commercial | HIGH | SUPPORT | `/services/sofa-removal` | P2 | |
| D14 | sofa won't fit through door dubai | Problem | HIGH | BLOG | `/blog/sofa-wont-fit-through-door-dubai` | P1 | **Excellent long-tail.** Panic-stage query with only one realistic answer. |
| D15 | remove old sofa before new delivery dubai | Problem | HIGH | BLOG | `/blog/old-sofa-before-new-delivery-dubai` | P1 | Hard-deadline scenario; links to same-day. |

---

### Cluster E — Appliances, fridge & e-waste

Owner: `/services/appliance-disposal`.

| # | Keyword | Intent | Lead | Dest. | Target URL | Pri. | Notes |
|---|---|---|---|---|---|---|---|
| E1 | fridge disposal dubai | Commercial | HIGH | SERVICE | `/services/appliance-disposal` | P1 | **FOCUS 5.** |
| E2 | fridge removal dubai | Commercial | HIGH | SUPPORT | `/services/appliance-disposal` | P1 | Same intent as E1 — see C-7. |
| E3 | old fridge disposal dubai | Commercial | HIGH | SUPPORT | `/services/appliance-disposal` | P1 | |
| E4 | refrigerator disposal dubai | Commercial | HIGH | SUPPORT | `/services/appliance-disposal` | P2 | Formal variant. |
| E5 | old fridge pickup dubai | Commercial | HIGH | SUPPORT | `/services/appliance-disposal` | P2 | |
| E6 | how to dispose of a fridge in dubai | Informational | HIGH | BLOG | `/blog/dispose-fridge-dubai` | P1 | **Pillar.** Refrigerant/e-waste rules make this high-anxiety and high-conversion. |
| E7 | freezer disposal dubai | Commercial | MED | SUPPORT | `/services/appliance-disposal` | P3 | |
| E8 | appliance removal dubai | Commercial | HIGH | SUPPORT | `/services/appliance-disposal` | P1 | |
| E9 | appliance disposal dubai | Commercial | HIGH | SERVICE | `/services/appliance-disposal` | P1 | Page's own primary. |
| E10 | old appliance removal dubai | Commercial | HIGH | SUPPORT | `/services/appliance-disposal` | P2 | |
| E11 | washing machine removal dubai | Commercial | HIGH | BLOG | `/blog/washing-machine-removal-dubai` | P2 | |
| E12 | washing machine disposal dubai | Commercial | HIGH | SUPPORT | `/blog/washing-machine-removal-dubai` | P2 | |
| E13 | dryer disposal dubai | Commercial | MED | SUPPORT | `/services/appliance-disposal` | P3 | |
| E14 | oven removal dubai | Commercial | MED | SUPPORT | `/services/appliance-disposal` | P3 | |
| E15 | cooker disposal dubai | Commercial | MED | SUPPORT | `/services/appliance-disposal` | P3 | |
| E16 | dishwasher removal dubai | Commercial | MED | SUPPORT | `/services/appliance-disposal` | P3 | |
| E17 | microwave disposal dubai | Commercial | LOW-MED | SUPPORT | `/services/appliance-disposal` | P3 | Small item; usually part of a larger load. |
| E18 | water heater removal dubai | Commercial | MED | SUPPORT | `/services/appliance-disposal` | P3 | |
| E19 | TV disposal dubai | Commercial | HIGH | SUPPORT | `/services/appliance-disposal` | P2 | |
| E20 | old TV removal dubai | Commercial | HIGH | SUPPORT | `/services/appliance-disposal` | P2 | |
| E21 | AC unit removal dubai | Commercial | HIGH | BLOG | `/blog/old-ac-unit-disposal-dubai` | P2 | Split units need safe handling — genuine expertise angle. |
| E22 | air conditioner disposal dubai | Commercial | HIGH | SUPPORT | `/blog/old-ac-unit-disposal-dubai` | P2 | |
| E23 | is an old AC unit e-waste dubai | Informational | MED | SUPPORT | `/blog/old-ac-unit-disposal-dubai` | P2 | Mirrors an existing on-page FAQ. |
| E24 | e waste disposal dubai | Commercial | HIGH | BLOG | `/blog/e-waste-disposal-dubai` | P2 | Bridges consumer and commercial clusters. |
| E25 | e waste collection dubai | Commercial | HIGH | SUPPORT | `/blog/e-waste-disposal-dubai` | P2 | |
| E26 | e waste recycling dubai | Informational | MED | SUPPORT | `/blog/e-waste-disposal-dubai` | P2 | |
| E27 | electronics disposal dubai | Commercial | MED | SUPPORT | `/services/appliance-disposal` | P2 | |
| E28 | computer disposal dubai | Commercial | MED | SUPPORT | `/services/commercial-junk-removal` | P2 | Consumer volume low; B2B value high. |
| E29 | where do old appliances go dubai | Informational | MED | BLOG | `/blog/where-appliances-go-dubai` | P2 | Trust/responsibility content. |

---

### Cluster F — Garbage & waste

Owners: `/services/garbage-removal` (household/recurring) and `/services/waste-removal` (renovation/site). Boundary defined in **C-5**.

| # | Keyword | Intent | Lead | Dest. | Target URL | Pri. | Notes |
|---|---|---|---|---|---|---|---|
| F1 | garbage removal dubai | Commercial | HIGH | SERVICE | `/services/garbage-removal` | P2 | Page primary. Not a focus slot — see C-5. |
| F2 | garbage collection dubai | Commercial | MED | SUPPORT | `/services/garbage-removal` | P2 | Competes with municipal-service results. |
| F3 | household garbage removal dubai | Commercial | HIGH | SUPPORT | `/services/garbage-removal` | P2 | |
| F4 | recurring garbage pickup dubai | Commercial | HIGH | SUPPORT | `/services/garbage-removal` | P2 | Recurring revenue — high lifetime value. |
| F5 | waste removal dubai | Commercial | HIGH | SERVICE | `/services/waste-removal` | P2 | Page primary. |
| F6 | waste collection dubai | Commercial | MED | SUPPORT | `/services/waste-removal` | P3 | Municipal-skewed SERP. |
| F7 | waste disposal dubai | Commercial | MED | SUPPORT | `/services/waste-removal` | P3 | |
| F8 | waste removal company dubai | Commercial | HIGH | SUPPORT | `/services/waste-removal` | P2 | |
| F9 | renovation waste removal dubai | Commercial | HIGH | BLOG | `/blog/renovation-waste-removal-dubai` | P2 | Strong intent; clear timing trigger. |
| F10 | construction waste removal dubai | Commercial | HIGH | SUPPORT | `/services/waste-removal` | P2 | Confirm licensing before targeting hard. |
| F11 | construction debris removal dubai | Commercial | HIGH | SUPPORT | `/services/waste-removal` | P2 | |
| F12 | demolition waste removal dubai | Commercial | MED | SUPPORT | `/services/waste-removal` | P3 | Verify capability first. |
| F13 | rubble removal dubai | Commercial | MED | SUPPORT | `/services/waste-removal` | P3 | Weight limits may apply. |
| F14 | site waste clearance dubai | Commercial | MED | SUPPORT | `/services/waste-removal` | P3 | |
| F15 | fit out waste removal dubai | Commercial | HIGH | SUPPORT | `/services/commercial-junk-removal` | P2 | B2B; higher value. |
| F16 | skip hire alternative dubai | Commercial | HIGH | BLOG | `/blog/skip-hire-vs-junk-removal-dubai` | P2 | **Strong comparison play** — a crew that loads beats a skip you fill yourself. (Skip *hire* itself is excluded.) |
| F17 | junk removal truck dubai | Commercial | MED | SUPPORT | `/services/junk-removal` | P3 | Check intent — if it is truck *rental*, it is excluded. |
| F18 | office waste collection dubai | Commercial | HIGH | SUPPORT | `/services/commercial-junk-removal` | P2 | |

---

### Cluster G — Garden / green waste

Owner: `/services/garden-waste-removal`.

| # | Keyword | Intent | Lead | Dest. | Target URL | Pri. | Notes |
|---|---|---|---|---|---|---|---|
| G1 | garden waste removal dubai | Commercial | HIGH | SERVICE | `/services/garden-waste-removal` | P1 | **FOCUS 8.** |
| G2 | garden waste collection dubai | Commercial | HIGH | SUPPORT | `/services/garden-waste-removal` | P1 | |
| G3 | garden waste disposal dubai | Commercial | HIGH | SUPPORT | `/services/garden-waste-removal` | P1 | |
| G4 | green waste removal dubai | Commercial | HIGH | SUPPORT | `/services/garden-waste-removal` | P1 | Industry-standard UAE phrasing. |
| G5 | green waste collection dubai | Commercial | HIGH | SUPPORT | `/services/garden-waste-removal` | P2 | |
| G6 | green waste disposal dubai | Commercial | MED | SUPPORT | `/services/garden-waste-removal` | P2 | |
| G7 | garden clearance dubai | Commercial | HIGH | SUPPORT | `/services/garden-waste-removal` | P1 | See C-9 boundary vs villa clearance. |
| G8 | palm frond removal dubai | Commercial | HIGH | BLOG | `/blog/palm-frond-disposal-dubai` | P1 | **Highly Dubai-specific, low competition, genuine expertise angle.** |
| G9 | palm tree waste removal dubai | Commercial | HIGH | SUPPORT | `/blog/palm-frond-disposal-dubai` | P2 | |
| G10 | tree branch removal dubai | Commercial | MED | SUPPORT | `/services/garden-waste-removal` | P2 | Removal of cut branches, **not** tree surgery. |
| G11 | tree trimming waste removal dubai | Commercial | MED | SUPPORT | `/services/garden-waste-removal` | P2 | Clarify: we remove, we do not trim. |
| G12 | grass clippings disposal dubai | Commercial | MED | SUPPORT | `/services/garden-waste-removal` | P3 | |
| G13 | hedge trimming waste removal dubai | Commercial | MED | SUPPORT | `/services/garden-waste-removal` | P3 | |
| G14 | soil removal dubai | Commercial | MED | BLOG | `/blog/soil-sand-pots-disposal-dubai` | P2 | Weight-limited — set expectations on-page. |
| G15 | sand bags removal dubai | Commercial | MED | SUPPORT | `/blog/soil-sand-pots-disposal-dubai` | P3 | |
| G16 | plant pot disposal dubai | Commercial | LOW-MED | SUPPORT | `/blog/soil-sand-pots-disposal-dubai` | P3 | |
| G17 | outdoor furniture removal dubai | Commercial | HIGH | SUPPORT | `/services/garden-waste-removal` | P2 | Sun-damaged outdoor sets are rarely donatable. |
| G18 | garden furniture disposal dubai | Commercial | HIGH | SUPPORT | `/services/garden-waste-removal` | P2 | |
| G19 | landscaping waste removal dubai | Commercial | HIGH | SUPPORT | `/services/garden-waste-removal` | P2 | **B2B angle** — landscapers are repeat buyers. |
| G20 | villa garden waste removal dubai | Commercial | HIGH | SUPPORT | `/services/garden-waste-removal` | P1 | Bridges to villa clearance. |
| G21 | garden waste dubai bins | Informational | MED | BLOG | `/blog/garden-waste-bins-dubai` | P2 | "What the bins won't take" — clean problem→service path. |

---

### Cluster H — House / apartment clearance

Owner: `/services/house-clearance`.

| # | Keyword | Intent | Lead | Dest. | Target URL | Pri. | Notes |
|---|---|---|---|---|---|---|---|
| H1 | house clearance dubai | Commercial | HIGH | SERVICE | `/services/house-clearance` | P1 | **FOCUS 7.** |
| H2 | house clearance services dubai | Commercial | HIGH | SUPPORT | `/services/house-clearance` | P1 | |
| H3 | apartment clearance dubai | Commercial | HIGH | SUPPORT | `/services/house-clearance` | P1 | |
| H4 | flat clearance dubai | Commercial | MED | SUPPORT | `/services/house-clearance` | P3 | UK phrasing. |
| H5 | home clearance dubai | Commercial | HIGH | SUPPORT | `/services/house-clearance` | P2 | |
| H6 | property clearance dubai | Commercial | HIGH | SUPPORT | `/services/house-clearance` | P2 | Also used by agents/landlords. |
| H7 | house cleanout dubai | Commercial | MED | SUPPORT | `/services/house-clearance` | P2 | US phrasing. |
| H8 | end of tenancy clearance dubai | Commercial | HIGH | BLOG | `/blog/end-of-tenancy-clearance-dubai` | P1 | **Pillar.** Hard deadline + deposit at stake. |
| H9 | move out clearance dubai | Commercial | HIGH | SUPPORT | `/blog/end-of-tenancy-clearance-dubai` | P1 | Secondary keyword on article **#6**. Opportunity #23 is consolidated into #6 — **no separate URL.** |
| H10 | move out junk removal dubai | Commercial | HIGH | SUPPORT | `/services/house-clearance` | P1 | |
| H11 | moving out rubbish removal dubai | Commercial | HIGH | SUPPORT | `/services/house-clearance` | P2 | |
| H12 | handover clearance dubai | Commercial | HIGH | SUPPORT | `/services/house-clearance` | P1 | |
| H13 | landlord inspection clearance dubai | Commercial | HIGH | BLOG | `/blog/landlord-inspection-clearance-dubai` | P2 | |
| H14 | will landlord deduct deposit for furniture left dubai | Problem | HIGH | BLOG | `/blog/deposit-deductions-left-furniture-dubai` | P2 | **High-anxiety long-tail with a clear commercial answer.** |
| H15 | storage room clearance dubai | Commercial | MED | SUPPORT | `/services/house-clearance` | P2 | |
| H16 | estate clearance dubai | Commercial | HIGH | SUPPORT | `/services/villa-clearance` | P2 | Skews to larger properties. |
| H17 | deceased estate clearance dubai | Commercial | HIGH | BLOG | `/blog/estate-clearance-dubai` | P3 | **Handle with sensitivity.** Real need; tone matters more than keywords. |
| H18 | hoarder house clearance dubai | Commercial | MED | BLOG | `/blog/heavy-clutter-clearance-dubai` | P3 | Non-stigmatising language required. Verify capability first. |
| H19 | studio apartment clearance dubai | Commercial | MED | SUPPORT | `/services/house-clearance` | P3 | |
| H20 | clearance before moving dubai | Commercial | HIGH | SUPPORT | `/blog/end-of-tenancy-clearance-dubai` | P2 | |

---

### Cluster I — Villa clearance

Owner: `/services/villa-clearance`.

| # | Keyword | Intent | Lead | Dest. | Target URL | Pri. | Notes |
|---|---|---|---|---|---|---|---|
| I1 | villa clearance dubai | Commercial | HIGH | SERVICE | `/services/villa-clearance` | P1 | **FOCUS 6.** |
| I2 | villa junk removal dubai | Commercial | HIGH | SUPPORT | `/services/villa-clearance` | P1 | Same intent as I1 — see C-14. Not a separate page. |
| I3 | villa cleanout dubai | Commercial | HIGH | SUPPORT | `/services/villa-clearance` | P2 | |
| I4 | full villa clearance dubai | Commercial | HIGH | SUPPORT | `/services/villa-clearance` | P1 | |
| I5 | villa clearance services dubai | Commercial | HIGH | SUPPORT | `/services/villa-clearance` | P2 | |
| I6 | large villa clearance dubai | Commercial | HIGH | SUPPORT | `/services/villa-clearance` | P2 | Hypothesised highest ticket values; unmeasured. |
| I7 | villa handover clearance dubai | Commercial | HIGH | BLOG | `/blog/villa-handover-clearance-dubai` | P1 | |
| I8 | maid room clearance dubai | Commercial | MED | SUPPORT | `/services/villa-clearance` | P2 | Distinctly UAE. |
| I9 | majlis clearance dubai | Commercial | MED | SUPPORT | `/services/villa-clearance` | P3 | Distinctly UAE; low volume, high relevance. `UNVERIFIED`. |
| I10 | garage clearance dubai | Commercial | MED | SUPPORT | `/services/villa-clearance` | P2 | |
| I11 | villa storage clearance dubai | Commercial | MED | SUPPORT | `/services/villa-clearance` | P3 | |
| I12 | townhouse clearance dubai | Commercial | MED | SUPPORT | `/services/villa-clearance` | P2 | Property type sits with villa, not apartment. |
| I13 | how long does a villa clearance take dubai | Informational | HIGH | BLOG | `/blog/how-long-villa-clearance-dubai` | P2 | Planning-stage, pre-enquiry. |
| I14 | gated community clearance access dubai | Informational | MED | BLOG | `/blog/gated-community-clearance-dubai` | P2 | Real operational differentiator. |

---

### Cluster J — Residential / tower access

Owner: `/services/residential-junk-removal`.

| # | Keyword | Intent | Lead | Dest. | Target URL | Pri. | Notes |
|---|---|---|---|---|---|---|---|
| J1 | residential junk removal dubai | Commercial | HIGH | SERVICE | `/services/residential-junk-removal` | P2 | Page primary. Not a focus slot — see C-6. |
| J2 | home junk removal dubai | Commercial | HIGH | SUPPORT | `/services/residential-junk-removal` | P2 | |
| J3 | apartment junk removal dubai | Commercial | HIGH | SUPPORT | `/services/residential-junk-removal` | P1 | |
| J4 | household junk removal dubai | Commercial | HIGH | SUPPORT | `/services/residential-junk-removal` | P2 | |
| J5 | tower junk removal dubai | Commercial | MED | SUPPORT | `/services/residential-junk-removal` | P2 | |
| J6 | high rise junk removal dubai | Commercial | MED | SUPPORT | `/services/residential-junk-removal` | P2 | |
| J7 | junk removal service lift dubai | Problem | HIGH | BLOG | `/blog/service-lift-booking-dubai` | P1 | **Excellent differentiator article** — the site already books lifts. |
| J8 | how to book service lift dubai building | Informational | HIGH | SUPPORT | `/blog/service-lift-booking-dubai` | P1 | |
| J9 | NOC to move furniture dubai | Informational | HIGH | BLOG | `/blog/noc-moving-furniture-dubai` | P1 | Mirrors an existing on-page FAQ. High-anxiety, high-intent. |
| J10 | building permission junk removal dubai | Informational | MED | SUPPORT | `/blog/noc-moving-furniture-dubai` | P2 | |
| J11 | move out hours dubai building | Informational | MED | SUPPORT | `/blog/service-lift-booking-dubai` | P2 | |
| J12 | getting bulky items out of a tower dubai | Problem | HIGH | BLOG | `/blog/bulky-items-tower-dubai` | P1 | Feeds every tower area page. |

---

### Cluster K — Commercial / B2B

Owner: `/services/commercial-junk-removal`.

| # | Keyword | Intent | Lead | Dest. | Target URL | Pri. | Notes |
|---|---|---|---|---|---|---|---|
| K1 | commercial junk removal dubai | Commercial | HIGH | SERVICE | `/services/commercial-junk-removal` | P1 | **FOCUS 9.** |
| K2 | office clearance dubai | Commercial | HIGH | SUPPORT | `/services/commercial-junk-removal` | P1 | Assessed as the most natural B2B phrasing; demand unverified. |
| K3 | office junk removal dubai | Commercial | HIGH | SUPPORT | `/services/commercial-junk-removal` | P2 | |
| K4 | office furniture removal dubai | Commercial | HIGH | BLOG | `/blog/office-furniture-removal-dubai` | P2 | |
| K5 | office furniture disposal dubai | Commercial | HIGH | SUPPORT | `/blog/office-furniture-removal-dubai` | P2 | |
| K6 | office desk removal dubai | Commercial | MED | SUPPORT | `/services/commercial-junk-removal` | P3 | |
| K7 | office strip out clearance dubai | Commercial | HIGH | BLOG | `/blog/office-strip-out-dubai` | P2 | High-value contractor audience. |
| K8 | office relocation junk removal dubai | Commercial | HIGH | SUPPORT | `/services/commercial-junk-removal` | P2 | Removal only — **not** relocation (excluded). |
| K9 | shop clearance dubai | Commercial | HIGH | SUPPORT | `/services/commercial-junk-removal` | P2 | |
| K10 | retail fit out waste removal dubai | Commercial | HIGH | SUPPORT | `/services/commercial-junk-removal` | P3 | |
| K11 | warehouse clearance dubai | Commercial | HIGH | BLOG | `/blog/warehouse-clearance-dubai` | P2 | Strong in Al Quoz / DIP. |
| K12 | warehouse junk removal dubai | Commercial | HIGH | SUPPORT | `/services/commercial-junk-removal` | P2 | |
| K13 | restaurant equipment removal dubai | Commercial | MED | SUPPORT | `/services/commercial-junk-removal` | P3 | High-churn sector. |
| K14 | commercial waste collection dubai | Commercial | HIGH | SUPPORT | `/services/commercial-junk-removal` | P2 | Check licensing claims. |
| K15 | business junk removal dubai | Commercial | MED | SUPPORT | `/services/commercial-junk-removal` | P3 | |
| K16 | recurring waste collection dubai | Commercial | HIGH | SUPPORT | `/services/garbage-removal` | P2 | Recurring contracts. |
| K17 | IT equipment disposal dubai | Commercial | HIGH | SUPPORT | `/services/commercial-junk-removal` | P2 | Data-security angle is a real differentiator. |
| K18 | out of hours clearance dubai | Commercial | MED | BLOG | `/blog/out-of-hours-clearance-dubai` | P2 | Matches existing page copy. |
| K19 | school office clearance dubai | Commercial | LOW-MED | SUPPORT | `/services/commercial-junk-removal` | P3 | Seasonal (end of academic year). |

---

### Cluster L — Area-modified (geo)

Owner: the matching `/areas/{slug}` page. Pattern: `junk removal {area}` + at most one or two genuinely relevant service+area combinations per area. **All 30 area pages exist.**

| # | Keyword | Intent | Lead | Dest. | Target URL | Pri. | Notes |
|---|---|---|---|---|---|---|---|
| L1 | junk removal dubai marina | Commercial | HIGH | AREA | `/areas/dubai-marina` | P1 | **FOCUS 10.** Lead target for the area layer. |
| L2 | junk removal jlt | Commercial | HIGH | AREA | `/areas/jlt` | P1 | |
| L3 | junk removal jvc | Commercial | HIGH | AREA | `/areas/jvc` | P1 | |
| L4 | junk removal business bay | Commercial | HIGH | AREA | `/areas/business-bay` | P1 | Also the lead commercial-district page. |
| L5 | junk removal downtown dubai | Commercial | HIGH | AREA | `/areas/downtown-dubai` | P1 | |
| L6 | junk removal palm jumeirah | Commercial | HIGH | AREA | `/areas/palm-jumeirah` | P1 | Municipality-exclusion angle if verified. |
| L7 | junk removal jbr | Commercial | HIGH | AREA | `/areas/jbr` | P2 | |
| L8 | junk removal al barsha | Commercial | HIGH | AREA | `/areas/al-barsha` | P2 | |
| L9 | junk removal deira | Commercial | HIGH | AREA | `/areas/deira` | P2 | Commercial skew. |
| L10 | junk removal mirdif | Commercial | HIGH | AREA | `/areas/mirdif` | P2 | |
| L11 | junk removal arabian ranches | Commercial | HIGH | AREA | `/areas/arabian-ranches` | P1 | Lead villa-community page. |
| L12 | junk removal dubai hills | Commercial | HIGH | AREA | `/areas/dubai-hills` | P2 | |
| L13 | junk removal jumeirah | Commercial | HIGH | AREA | `/areas/jumeirah` | P2 | |
| L14 | junk removal international city | Commercial | HIGH | AREA | `/areas/international-city` | P2 | |
| L15 | junk removal discovery gardens | Commercial | HIGH | AREA | `/areas/discovery-gardens` | P2 | Municipality-exclusion angle if verified. |
| L16 | junk removal al quoz | Commercial | HIGH | AREA | `/areas/al-quoz` | P2 | Warehouse skew. |
| L17 | junk removal dubai silicon oasis | Commercial | MED | AREA | `/areas/dubai-silicon-oasis` | P2 | |
| L18 | junk removal motor city | Commercial | MED | AREA | `/areas/motor-city` | P3 | |
| L19 | junk removal sports city | Commercial | MED | AREA | `/areas/sports-city` | P3 | |
| L20 | junk removal dip | Commercial | MED | AREA | `/areas/dip` | P3 | |
| L21 | junk removal al nahda | Commercial | MED | AREA | `/areas/al-nahda` | P3 | |
| L22 | junk removal bur dubai | Commercial | HIGH | AREA | `/areas/bur-dubai` | P2 | |
| L23 | junk removal karama | Commercial | MED | AREA | `/areas/karama` | P3 | Walk-up buildings — carry-down angle. |
| L24 | junk removal al furjan | Commercial | MED | AREA | `/areas/al-furjan` | P3 | |
| L25 | junk removal damac hills | Commercial | MED | AREA | `/areas/damac-hills` | P3 | |
| L26 | junk removal jumeirah golf estates | Commercial | MED | AREA | `/areas/jumeirah-golf-estates` | P3 | |
| L27 | junk removal the springs | Commercial | MED | AREA | `/areas/the-springs` | P3 | |
| L28 | junk removal dubai creek harbour | Commercial | MED | AREA | `/areas/dubai-creek-harbour` | P3 | New handovers. |
| L29 | junk removal al warqa | Commercial | MED | AREA | `/areas/al-warqa` | P3 | |
| L30 | junk removal town square | Commercial | MED | AREA | `/areas/town-square` | P3 | |
| L31 | furniture removal dubai marina | Commercial | HIGH | AREA | `/areas/dubai-marina` | P2 | Service+area on the area page, **not** on the service page. |
| L32 | sofa removal dubai marina | Commercial | HIGH | AREA | `/areas/dubai-marina` | P2 | |
| L33 | apartment clearance dubai marina | Commercial | HIGH | AREA | `/areas/dubai-marina` | P2 | |
| L34 | villa clearance arabian ranches | Commercial | HIGH | AREA | `/areas/arabian-ranches` | P1 | High value + low competition. |
| L35 | villa clearance jumeirah | Commercial | HIGH | AREA | `/areas/jumeirah` | P2 | |
| L36 | garden waste removal jumeirah | Commercial | HIGH | AREA | `/areas/jumeirah` | P2 | |
| L37 | garden waste removal arabian ranches | Commercial | HIGH | AREA | `/areas/arabian-ranches` | P2 | |
| L38 | office clearance business bay | Commercial | HIGH | AREA | `/areas/business-bay` | P1 | Assessed as the most promising B2B geo term; demand unverified. |
| L39 | warehouse clearance al quoz | Commercial | HIGH | AREA | `/areas/al-quoz` | P2 | |
| L40 | shop clearance deira | Commercial | MED | AREA | `/areas/deira` | P3 | |

---

### Cluster M — Informational support (rules, cost, destination, donation)

These are the **traffic-and-trust engine**. Each must route to a money page.

| # | Keyword | Intent | Lead | Dest. | Target URL | Pri. | Notes |
|---|---|---|---|---|---|---|---|
| M1 | dubai municipality bulky waste collection | Informational | HIGH | BLOG | `/blog/dubai-municipality-bulky-waste` | P1 | Assessed as the highest-value informational target. **BLOCKED until facts are verified against the official source.** |
| M2 | how to schedule bulk waste pickup dubai | Informational | HIGH | SUPPORT | `/blog/dubai-municipality-bulky-waste` | P1 | |
| M3 | free junk removal dubai | Commercial | MED | BLOG | `/blog/free-junk-removal-dubai-truth` | P2 | **Never a service-page target.** Honest comparison only — see *Excluded Search Intent*. |
| M4 | free furniture removal dubai | Commercial | MED | SUPPORT | `/blog/free-junk-removal-dubai-truth` | P2 | As M3. |
| M5 | is bulky waste collection free in dubai | Informational | MED | SUPPORT | `/blog/dubai-municipality-bulky-waste` | P1 | |
| M6 | fine for dumping furniture dubai | Informational | HIGH | BLOG | `/blog/illegal-dumping-fines-dubai` | P1 | **Strong fear-driven query with a direct commercial answer.** Verify penalties before publishing. |
| M7 | can I leave furniture outside my building dubai | Problem | HIGH | SUPPORT | `/blog/illegal-dumping-fines-dubai` | P1 | |
| M8 | what can't you throw in dubai bins | Informational | MED | BLOG | `/blog/what-dubai-bins-wont-take` | P2 | |
| M9 | where does junk go after removal dubai | Informational | MED | BLOG | `/blog/what-happens-to-your-junk-dubai` | P1 | Trust and sustainability. Supports the homepage. |
| M10 | dubai recycling centre drop off | Informational | LOW-MED | SUPPORT | `/blog/what-happens-to-your-junk-dubai` | P3 | DIY intent — low lead value but builds topical depth. |
| M11 | how junk removal works dubai | Informational | HIGH | SUPPORT | `/how-it-works` | P1 | Existing page already owns this. |
| M12 | junk removal process dubai | Informational | HIGH | SUPPORT | `/how-it-works` | P2 | |
| M13 | what to do before junk removal arrives dubai | Informational | HIGH | BLOG | `/blog/before-the-crew-arrives-dubai` | P2 | Pre-booking reassurance; reduces no-shows. |
| M14 | do I need to sort junk before pickup dubai | Informational | HIGH | SUPPORT | `/blog/before-the-crew-arrives-dubai` | P2 | Mirrors an existing FAQ. |
| M15 | moving out of dubai checklist | Informational | MED | BLOG | `/blog/leaving-dubai-clearance-checklist` | P2 | Broad but genuinely adjacent; expat churn is constant. Clearance is one section, not the whole piece. |
| M16 | end of tenancy checklist dubai | Informational | HIGH | SUPPORT | `/blog/end-of-tenancy-clearance-dubai` | P1 | |
| M17 | decluttering tips dubai apartment | Informational | LOW-MED | BLOG | `/blog/decluttering-small-dubai-apartment` | P3 | Top of funnel. Low lead intent — keep the allocation small. |
| M18 | spring cleaning clearance dubai | Informational | MED | BLOG | `/blog/seasonal-clear-out-dubai` | P3 | Seasonal. |
| M19 | ramadan home clear out dubai | Informational | MED | BLOG | `/blog/pre-ramadan-clear-out-dubai` | P3 | **Culturally relevant and genuine.** Plan around the actual calendar. |
| M20 | what happens to donated furniture dubai | Informational | MED | SUPPORT | `/blog/donate-furniture-dubai` | P2 | |
| M21 | junk removal vs municipality collection dubai | Comparison | HIGH | BLOG | `/blog/municipality-vs-paid-junk-removal-dubai` | P1 | **The single clearest commercial-decision article available.** Honest side-by-side. |
| M22 | how much junk fits in one truck dubai | Informational | HIGH | BLOG | `/blog/how-much-fits-in-one-load-dubai` | P2 | Directly supports quoting. |
| M23 | how to prepare for a house clearance dubai | Informational | HIGH | SUPPORT | `/blog/end-of-tenancy-clearance-dubai` | P2 | |
| M24 | who removes old furniture in dubai | Informational | HIGH | SUPPORT | `/blog/dispose-old-furniture-dubai` | P1 | Natural-language head query. |
| M25 | junk removal dubai reviews | Navigational | MED | SUPPORT | GBP + `/about` | P2 | Won with real reviews, never fabricated ones. |

---

## Service Keyword Clusters

One cluster per money page. **This is the authority list for "which page owns what".** A downstream file may not assign a keyword to a page other than the one named here.

| Cluster | Money page | Primary | Secondary (on-page, no separate URL) | Never targets |
|---|---|---|---|---|
| **Junk removal (head)** | `/` | junk removal dubai | dubai junk removal · junk removal in dubai · brand terms | service-specific or clearance terms |
| **Junk removal (service)** | `/services/junk-removal` | junk removal service dubai | junk removal services dubai · junk removal company dubai · junk collection dubai · junk disposal dubai · rubbish removal dubai · take my junk dubai · bulky waste removal dubai · junk pickup dubai | same-day · clearance · any item-specific term |
| **Same-day / urgent** | `/services/same-day-junk-removal` | same day junk removal dubai | urgent · emergency · today · last minute · next day · short notice · weekend junk removal dubai | the unqualified head term |
| **Furniture** | `/services/furniture-removal` | furniture removal dubai | furniture disposal · old furniture removal · furniture pickup/collection · wardrobe · bed · mattress · dining table · dismantling | sofa/couch terms · whole-property clearance |
| **Sofa** | `/services/sofa-removal` | sofa removal dubai | sofa disposal · old sofa · couch removal/disposal · L-shaped · corner · sofa bed · armchair | generic furniture terms |
| **Appliances / e-waste** | `/services/appliance-disposal` | appliance disposal dubai · fridge disposal dubai | fridge/refrigerator/freezer · washing machine · dryer · oven · dishwasher · TV · AC unit · e-waste · electronics · water heater | bulk commercial IT disposal |
| **Garbage (household/recurring)** | `/services/garbage-removal` | garbage removal dubai | garbage collection · household garbage · recurring pickup · rubbish collection | renovation/construction waste |
| **Waste (site/renovation)** | `/services/waste-removal` | waste removal dubai | construction waste · renovation waste · debris · rubble · site clearance · skip-hire alternative | household bin/garbage terms |
| **Garden / green waste** | `/services/garden-waste-removal` | garden waste removal dubai | green waste · garden clearance · palm fronds · branches · grass · soil/sand/pots · outdoor furniture · landscaping waste | whole-property villa clearance |
| **House / apartment clearance** | `/services/house-clearance` | house clearance dubai | apartment/flat/home/property clearance · end of tenancy · move-out · handover · landlord inspection · storage room | villa/townhouse terms |
| **Villa clearance** | `/services/villa-clearance` | villa clearance dubai | villa junk removal · villa cleanout · maid room · majlis · garage · townhouse · estate clearance · large villa | apartment terms |
| **Residential / tower access** | `/services/residential-junk-removal` | residential junk removal dubai | apartment junk removal · household junk removal · tower/high-rise · service lift · building permission/NOC | whole-property clearance terms |
| **Commercial / B2B** | `/services/commercial-junk-removal` | commercial junk removal dubai | office clearance · office furniture · strip-out · shop clearance · warehouse · retail fit-out · IT equipment · commercial waste · out of hours | any residential term |
| **Area layer (×30)** | `/areas/{slug}` | junk removal {area} | junk removal in {area} · rubbish removal {area} · **at most 1–2** genuinely relevant service+area combinations | any un-modified service head term |

---

## Supporting Content Clusters

Six blog clusters. Every article belongs to exactly one, and every cluster points at named money pages.

| Cluster | Core question the reader has | Feeds | Funnel role | Month |
|---|---|---|---|---|
| **SC1 · Item disposal guides** | "How do I get rid of this specific thing in Dubai?" | `/services/furniture-removal` · `/services/sofa-removal` · `/services/appliance-disposal` | Research → consideration. Largest query pool; weakest competitor content. | M1 heavy, M2 depth |
| **SC2 · Rules, Municipality & compliance** | "Am I allowed to do this, and what happens if I don’t?" | `/services/appliance-disposal` · `/services/junk-removal` · `/` | Trust + concern resolution. Assessed as the strongest differentiation opportunity. **Most of this cluster is source-blocked — see Article Opportunity Map.** | M1 heavy |
| **SC3 · Move-out & tenancy** | "What has to be gone before handover, and by when?" | `/services/house-clearance` · `/services/villa-clearance` · `/services/same-day-junk-removal` | Deadline-driven, deposit-motivated. Hypothesised strong conversion; unmeasured. | M1 heavy |
| **SC4 · Access, buildings & logistics** | "Can you even get it out of my building?" | `/services/residential-junk-removal` · `/areas/*` · `/services/sofa-removal` | Objection handling. Feeds the entire area layer. | M1 → M2 |
| **SC5 · Cost, process & what-we-take** | "What will this cost and how does it work?" | `/how-it-works` · `/contact` · `/` | Bottom of funnel. Pre-qualifies and reduces wasted enquiries. | M1 |
| **SC6 · Commercial & B2B** | "How do we clear a floor/shop/warehouse without disruption?" | `/services/commercial-junk-removal` · `/services/waste-removal` | Long cycle, hypothesised high value per lead. | M2 heavy |

---

## Keyword-to-Page Map

Summary of the 283-keyword database by destination.

| Classification | Count (approx.) | Rule |
|---|---|---|
| **SERVICE PAGE** | 14 primaries + secondaries | Owns a commercial head or mid-tail term. Never created new for a wording variant. |
| **AREA PAGE** | 40 | `junk removal {area}` for all 30, plus 10 genuinely relevant service+area terms. |
| **BLOG ARTICLE** | ~55 distinct article targets | Informational or problem-based. **Must link to its money page.** |
| **SUPPORTING KEYWORD** | ~170 | Lives as a secondary on an existing page. **No new URL, ever.** This is the largest bucket by design — it is what prevents cannibalization. |
| **DO NOT TARGET** | 24 (listed in *Excluded Search Intent*) | Selling/buying/scrap/marketplace/moving/rental/cleaning/out-of-Dubai/jobs. |

**Hard rules:**

1. Existing money-page keywords stay with their service or area page. No blog article may target a service page's primary keyword.
2. If a proposed article's primary keyword appears in the **Secondary** column of a service cluster above, the article is redundant — fold it into the service page instead.
3. Every blog article declares one money page in the Payload `relatedServices` field and, where genuinely relevant, one or more `relatedAreas`. An article with neither is an orphan and must not publish.

---

## Internal Linking Map

The CMS already supports this natively: the `Posts` collection has **`relatedServices`** and **`relatedAreas`** relationship fields, and area pages carry **`popularServices`** and **`nearbyAreas`**. Use those fields — do not rely on body links alone.

### Architecture

```
                          /  (homepage — head term, hub)
                         /|\
            /services ---+ | +--- /areas
                |          |         |
        12 service pages   |    30 area pages
                |  \       |        /   |
                |   \      |       /    |
                |    +--- BLOG ARTICLES +
                |          (SC1–SC6)
                |               |
                +---------> /contact  (WhatsApp · call · form)
```

### Linking rules

| Rule | Detail |
|---|---|
> **Link counts are contextual, not quota-driven.** There is no required number of links in an article. **The number of links depends on the article's depth and on what is genuinely useful to the reader** — a short, single-item piece may warrant two or three links; a long pillar guide may warrant a dozen. **Never insert a link to satisfy a count.** An irrelevant link is worse than a missing one: it wastes the reader's attention, dilutes the signal the link is meant to send, and at scale it looks manipulative. If a link would not help a reader who has never heard of SEO, it does not go in.

| Rule | Detail |
|---|---|
| **R1 — One primary money-page relationship** | Every article has exactly **one** clearly defined primary money page, declared in the Payload `relatedServices` field, and links to it contextually in the body where it is genuinely useful — usually early, at the point the reader's problem meets the service. Never as a footer link block. |
| **R2 — Supporting service links where useful** | Link related service pages when the article genuinely touches that service. As many or as few as the content warrants. No minimum, no maximum. |
| **R3 — Related-article links where useful** | Link genuinely related existing articles — ones that answer the reader's obvious next question. Judged by usefulness, not by count. An article with one well-placed sibling link is better than one with four forced ones. |
| **R4 — Area links only when genuinely relevant** | Link an area page **only** when the article actually discusses that community's access conditions, property type or logistics. **Never** append an area-link list for volume or coverage. Many articles will correctly link to no area page at all. |
| **R5 — Reverse links** | Service pages link *down* to their most relevant supporting articles once those exist, at the points in the existing copy where they genuinely help (see the reverse-link table below). Without this, articles receive no authority and pass none back. **This is the step most content programmes skip.** How many depends on how many genuinely relevant articles exist — not on a target. |
| **R6 — Anchor diversity** | Never repeat the same exact-match anchor sitewide. Rotate: descriptive ("have a crew carry it out"), partial-match ("sofa removal in the Marina"), branded, and natural-phrase anchors. Exact-match anchors should be rare and never mechanical. |
| **R7 — No orphans** | Before publishing, confirm the article receives **at least one meaningful inbound internal link** from another page — its cluster pillar, its money page, or a genuinely related sibling. An article with no inbound link must not publish. |
| **R8 — Sensible crawl depth** | Every article must be reachable from the homepage within a sensible number of clicks — in this architecture, three — via `/blog` or its money page. |

### Cluster → link targets

*These are **candidate** link targets — the pool to choose from where each is genuinely useful, not a checklist to complete. An article may legitimately use one entry from a column and none from another.*

| Cluster | Primary money page (R1) | Supporting services, where useful (R2) | Area links, only if genuinely discussed (R4) | Related articles, where useful (R3) | Anchor themes |
|---|---|---|---|---|---|
| **SC1 Item disposal** | The matching item service page | `/services/junk-removal` · `/services/house-clearance` | Apartment-dense areas, only in access-related pieces | Other item guides | "carried out and taken away", "dismantled first", "collected the same week" |
| **SC2 Rules/Municipality** | `/services/appliance-disposal` or `/services/junk-removal` | `/` · `/how-it-works` | Palm Jumeirah, Discovery Gardens (*if the exclusion is verified*) | Other rules pieces | "licensed handler", "collected properly", "what the free route won't do" |
| **SC3 Move-out/tenancy** | `/services/house-clearance` | `/services/villa-clearance` · `/services/same-day-junk-removal` · `/services/furniture-removal` | High-turnover: Marina, JLT, JVC, Downtown, Al Furjan, Creek Harbour | Other tenancy pieces | "cleared before the inspection", "ready for handover", "a same-day slot" |
| **SC4 Access/logistics** | `/services/residential-junk-removal` | `/services/sofa-removal` · `/services/furniture-removal` | **The natural home for area links** — tower communities | Other access pieces | "the service lift booked for you", "out of a high floor", "through a tight door" |
| **SC5 Cost/process** | `/how-it-works` | `/contact` · `/` | None (forced links here would be irrelevant) | Cost + what-we-take pieces | "send a photo for a fixed price", "how a pickup works" |
| **SC6 Commercial** | `/services/commercial-junk-removal` | `/services/waste-removal` · `/services/appliance-disposal` | Commercial districts only: Business Bay, Al Quoz, Deira, DSO, DIP | Other B2B pieces | "cleared out of hours", "a floor stripped without disrupting the building" |

### Reverse-link opportunities from existing content (R5)

The service pages already contain contextual inline links (e.g. `/services/junk-removal` links out to the sofa, appliance, garden-waste and house-clearance pages). **These are the natural insertion points for links down to new articles** — no redesign needed, just an edit once the article exists:

| Existing page | Existing section to extend | Link down to |
|---|---|---|
| `/services/junk-removal` | "What we cannot take" | `/blog/what-dubai-bins-wont-take` · `/blog/illegal-dumping-fines-dubai` |
| `/services/furniture-removal` | "Usable furniture is passed on" | `/blog/donate-furniture-dubai` · `/blog/dispose-old-furniture-dubai` |
| `/services/sofa-removal` | "Getting a sofa out of an apartment" | `/blog/sofa-wont-fit-through-door-dubai` · `/blog/service-lift-booking-dubai` |
| `/services/appliance-disposal` | "Where old appliances go" | `/blog/dispose-fridge-dubai` · `/blog/e-waste-disposal-dubai` |
| `/services/house-clearance` | "Move-outs, handovers and inspections" | `/blog/end-of-tenancy-clearance-dubai` |
| `/services/villa-clearance` | "Gate access and community rules" | `/blog/gated-community-clearance-dubai` · `/blog/villa-handover-clearance-dubai` |
| `/services/garden-waste-removal` | "Green waste we collect" | `/blog/palm-frond-disposal-dubai` |
| `/services/residential-junk-removal` | "Building permissions and service lifts" | `/blog/service-lift-booking-dubai` · `/blog/noc-moving-furniture-dubai` |
| `/services/same-day-junk-removal` | "What makes a same-day slot possible" | `/blog/junk-gone-today-dubai` |
| `/services/commercial-junk-removal` | "Out of hours and on a schedule" | `/blog/out-of-hours-clearance-dubai` · `/blog/office-strip-out-dubai` |
| `/how-it-works` | process steps | `/blog/junk-removal-cost-dubai` · `/blog/how-much-fits-in-one-load-dubai` |
| Area pages (all 30) | `popularServices` | the matching service pages (already wired) |

---

## Cannibalization Map

Fourteen identified overlaps and the ruling on each. **These rulings are binding.**

### C-1 · `/` vs `/services/junk-removal` vs `/services` — "junk removal dubai"

> ### ⚠ PRE-PUBLISH SEO REVIEW
> **C-1 must be reviewed and signed off BEFORE large-scale supporting-content publication begins.** Supporting articles pass authority to whichever page their links and anchors point at. If the head-term ownership between `/`, `/services` and `/services/junk-removal` is still ambiguous when 70+ articles start linking inward, the ambiguity is amplified rather than resolved, and unpicking it later means rewriting links across the whole corpus.
>
> **The review is a verification step, not a code change, and no website code is modified in this task.** It confirms that title, H1 and internal-link signals across the three URLs clearly and consistently reinforce the ownership ruling below. Any resulting code change is a separate, explicitly approved task.

**Severity: HIGH.** Three pages legitimately describe themselves as junk removal in Dubai.
**Ruling: separate by qualifier.**
- `/` owns the bare head term `junk removal dubai` — it has the strongest link equity, the brand, and head local terms usually resolve to homepages.
- `/services/junk-removal` owns **qualified** variants: `junk removal service dubai`, `junk collection dubai`, `junk disposal dubai`, `rubbish removal dubai`, `bulky waste removal dubai`.
- `/services` is a **navigational hub**, not a ranking target. It should not be optimised for any commercial term.
**Pre-publish review checklist (documentation only — no code changes in this task):**
1. Confirm `/` is the only one of the three whose title/H1 carries the bare head term.
2. Confirm `/services/junk-removal` keeps its current, more specific title and that "junk removal Dubai" is **not** added as an H1/title string.
3. Confirm `/services` is not optimised for any commercial term and reads as a hub.
4. Confirm navigation and in-body links to these three URLs use distinct, non-competing anchors.
5. Record the Day 0 GSC position for `junk removal dubai` per URL, so later URL-swapping is detectable.

**Ongoing signal:** monitor GSC for the URLs swapping on the same query — that is the cannibalization symptom.

### C-2 · `/` vs `/services/same-day-junk-removal` — "same day junk removal dubai"

> ### ⚠ PRE-PUBLISH SEO REVIEW
> **C-2 must be reviewed and signed off BEFORE large-scale supporting-content publication begins**, for the same reason as C-1: the same-day cluster is a Month 1 flagship, and its articles will push authority at whichever URL their anchors name. **Verification only — no website code is modified in this task.**

**Severity: MEDIUM-HIGH.** The homepage H1 is currently *"Same-day junk removal across Dubai"* — a near-exact match for another page's primary keyword.
**Ruling: the service page owns it.**

**Pre-publish review checklist (documentation only — no code changes in this task):**
1. Decide, explicitly, whether the homepage H1 keeps the exact phrase. **This is a business decision, not an SEO one** — the current H1 may well be the better converting headline, and that can outweigh the overlap.
2. If the decision is to resolve the overlap, the documented option is to retune the homepage H1 toward the brand proposition and coverage rather than the exact phrase — e.g. *"Junk removal across Dubai, booked from one photo"* — keeping same-day as supporting copy with a link to `/services/same-day-junk-removal`. **Recording this option here is not authorisation to implement it.**
3. If the decision is to keep the H1 as-is, record that the overlap is accepted knowingly, and watch GSC for URL flapping on same-day queries.
4. Either way, confirm that same-day anchors in supporting articles point at `/services/same-day-junk-removal`, not at `/`.
5. Record the Day 0 GSC position for `same day junk removal dubai` per URL.

### C-3 · "junk removal dubai" vs "rubbish removal dubai" vs "dubai junk removal"
**Severity: LOW (but a common mistake).**
**Ruling: same intent, one page.** "Rubbish" is a British-English synonym, not a distinct need; word order is irrelevant to Google. **Never build separate pages.** `rubbish removal dubai` is a secondary on `/services/junk-removal`; `dubai junk removal` is a secondary on `/`.

### C-4 · `/services/furniture-removal` vs `/services/sofa-removal`
**Severity: MEDIUM.**
**Ruling: item-type boundary.** Sofas, couches, corner units, sofa beds → sofa page. Beds, wardrobes, mattresses, dining sets, everything else → furniture page. The furniture page already closes with a "Sofas have their own page" section — keep and strengthen that. The sofa page must never target unqualified `furniture removal dubai`.

### C-5 · `/services/garbage-removal` vs `/services/waste-removal`
**Severity: MEDIUM-HIGH.** These are the site's most confusable pair, and both are also close to `/services/junk-removal`.
**Ruling: separate by waste origin, not by wording.**
- **Garbage** = ongoing household/office refuse that outgrew the bins; bagged; one-off or recurring.
- **Waste** = a load generated by an event — renovation, fit-out, strip-out, site work; mixed materials.
- **Junk** = unwanted possessions and bulky items.
The waste page already carries an FAQ ("What is the difference between waste removal and garbage removal?") — **that FAQ is the disambiguation asset; keep it and mirror it on the garbage page.** Neither gets a focus slot in this campaign precisely because the overlap needs watching before investment.

### C-6 · `/services/residential-junk-removal` vs `/services/house-clearance` vs `/services/junk-removal`
**Severity: HIGH.** This is the weakest boundary on the site — all three describe removing household items from a home.
**Ruling: separate by job shape.**
- `residential-junk-removal` = **items** removed from an occupied home; the distinguishing content is *building access* (service lift, NOC, permissions, floor protection). Its unique territory is Cluster J, not generic household junk.
- `house-clearance` = **the whole property** emptied, usually tied to a handover date.
- `junk-removal` = the generic catch-all, service-level.
**Action:** keep `residential-junk-removal` firmly anchored on the access/permissions angle — that is what makes it non-duplicative. It is deliberately **not** a focus keyword; if Day 30 GSC shows it competing with `/services/house-clearance` on the same queries, consider consolidating it into `/services/junk-removal` with a redirect in a later phase.

### C-7 · `/services/appliance-disposal` vs a potential `/services/fridge-removal`
**Severity: MEDIUM (pre-emptive).**
**Ruling: do NOT create a fridge page in Month 1.** The appliance page's title already leads with fridges. A new page would split relevance and internal links across two near-identical URLs.
**Month 2 conditional review:** if Day 30 GSC shows `/services/appliance-disposal` earning meaningful impressions on fridge queries but sitting at a poor average position **while a specific-page competitor outranks it**, then a dedicated `/services/fridge-removal` becomes justifiable — because fridge queries are genuinely product-level, not wording variants. Decide on data, not on instinct. If created, the appliance page must drop fridge from its title and link down.

### C-8 · `/services/house-clearance` vs `/services/villa-clearance`
**Severity: HIGH.** Both are "empty a property in Dubai".
**Ruling: property type decides, strictly.** Apartment, flat, studio, tower unit → house clearance. Villa, townhouse, compound, large family home with garden/maid room/majlis → villa clearance. Both pages already reference each other ("Larger than a house?" / "Every part of the villa") — that cross-reference is the control mechanism. Generic `property clearance dubai` sits with house clearance as a secondary.

### C-9 · "garden clearance" vs "villa clearance"
**Severity: LOW.**
**Ruling: scope decides.** Green waste and outdoor items only → garden waste page. Whole property including the garden → villa clearance. The garden page's existing "Part of a bigger villa job?" section handles the handoff.

### C-10 · `/services/commercial-junk-removal` vs `/services/waste-removal`
**Severity: LOW-MEDIUM.** Fit-out and strip-out loads could sit in either.
**Ruling: the customer decides.** A business clearing its own premises → commercial. A contractor disposing of a site/renovation load → waste removal. `fit out waste removal dubai` goes to commercial (the buyer is a business); `construction waste removal dubai` goes to waste removal.

### C-11 · Area pages vs service pages
**Severity: MEDIUM if unmanaged.**
**Ruling: area pages may only target geo-modified terms.** `/areas/dubai-marina` targets `junk removal dubai marina`, never `junk removal dubai`. Conversely, service pages must not list every area in their copy in an attempt to rank locally.

### C-12 · Area page vs a per-area article (doorway risk)
**Severity: HIGH if the content plan is executed carelessly.**
**Ruling: no article may duplicate an area page's purpose.** Writing "Junk removal in Al Barsha", "Junk removal in Mirdif", "Junk removal in JVC" as 30 blog articles would create doorway pages that compete with the area pages and risk a manual action. An area-specific **article** is permitted only when it covers something the area page does not — e.g. *"Living outside the free bulky-waste zone: Palm Jumeirah and Discovery Gardens"* (if verified) or *"Getting bulky items out of a Dubai Marina tower"* (an access how-to, not a service pitch). **Default: no per-area articles.** Strengthen the area page instead.

### C-13 · "furniture removal" vs "old furniture removal" vs "furniture disposal"
**Severity: LOW.**
**Ruling: one page.** All three are the same job. "Disposal" skews marginally toward where-it-goes, which is handled by a *section* on the page and by the SC2 articles — not by a second URL.

### C-14 · "villa clearance" vs "villa junk removal"
**Severity: LOW.**
**Ruling: one page** — `/services/villa-clearance`. Both describe emptying a villa. `villa junk removal dubai` is a secondary. Creating a second page would be the textbook error this map exists to prevent.

---

## Article Opportunity Map

**Do not write these yet.** This is the commissioning queue. Every row carries its money page and link targets, so no article can be written in isolation.

### Content status system

**Every article opportunity carries a status. An article may only be commissioned when its status is `READY`.** Statuses are cleared by getting the underlying information, never by softening the article to avoid needing it.

| Status | Meaning | How it clears |
|---|---|---|
| **`READY`** | Can be written now from operational knowledge the business already has. No external facts, prices or capability claims are load-bearing. | — |
| **`READY — BUSINESS INPUT REQUIRED`** | The structure is sound but the business must supply real figures or specifics — prices, durations, truck capacities, acceptance lists, availability. | Business supplies the detail. **No figure may be invented, estimated or copied from a competitor.** |
| **`BLOCKED — SOURCE VERIFICATION REQUIRED`** | Depends on external facts: Dubai Municipality rules and channels, legal or regulatory requirements, disposal rules, penalties and fines, tenancy-law claims, charity collection details. | Facts verified against the **official primary source** and cited in the article. Secondary blogs and competitor pages are **not** acceptable sources. |
| **`BLOCKED — SERVICE CAPABILITY CONFIRMATION REQUIRED`** | Depends on a claim about what this business actually does: licensed handling, specific disposal chains, construction/demolition waste, 24-hour or weekend availability, recurring contracts, data-secure IT disposal. | Business confirms the capability **and** can evidence it. If it cannot, the claim is removed or the article is dropped. |
| **`DO NOT TARGET`** | Excluded intent, or a topic that would cannibalize a money page. | Never. |

**Standing rules that override any individual status:**

- **Pricing content must never invent price ranges.** If real pricing is not supplied, the article does not publish — it is not written with vague hedging instead.
- **Regulatory, Municipality, legal, penalty and charity-collection topics remain `BLOCKED — SOURCE VERIFICATION REQUIRED`** until reliable official sources are checked. This applies even where a competitor has already published the same claim; competitors are frequently wrong and copying them inherits both the error and the liability.
- **Service-specific claims** — 24-hour service, weekend availability, licensed handling, construction/demolition waste capability, recurring commercial contracts, specific disposal methods — **must not be published unless the business actually supports them.**
- A blocked article's **keyword stays mapped** in the database. Blocking affects publication, not keyword ownership.

**Consolidation.** An opportunity may be **consolidated into another** when the keyword database assigns its keyword as a secondary of an existing article. It keeps its ID for audit, produces **no article, no slug and no URL**, and is **not independently commissionable**.

> **#23 → #6 (consolidated 2026-09-20).** `move out clearance dubai` is a secondary keyword of article **#6** (`end of tenancy clearance dubai` → `/blog/end-of-tenancy-clearance-dubai`), exactly as cluster row **H9** maps it. The move-out timeline is a section inside #6, not a second article. This resolves a contradiction in which the keyword database consolidated the two while this map listed them separately.

**Opportunity accounting:** **45 mapped IDs · 44 independently commissionable** (#23 is consolidated, not deleted). Status counts below describe the 44 commissionable opportunities.

**Status counts:** 19 `READY` · 6 `READY — BUSINESS INPUT REQUIRED` · 15 `BLOCKED — SOURCE VERIFICATION REQUIRED` · 4 `BLOCKED — SERVICE CAPABILITY CONFIRMATION REQUIRED`.

**Legend:** *Role* — TOFU (attract) · MOFU (qualify) · BOFU (convert). *Mo.* — planned month. *Status* — per the table above. *Consolidated* opportunities carry no Role, Priority or Month.

### Month 1 — priority articles

| # | Primary keyword | Intent | Proposed title | Cluster | Money page | Area opportunities | Secondary keywords | Internal links | Role | Pri. | Mo. | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | how to dispose of old furniture in dubai | Informational | How to Dispose of Old Furniture in Dubai: Every Option, Honestly Compared | SC1 | `/services/furniture-removal` | — | furniture disposal dubai · who removes old furniture dubai | furniture-removal · donate-furniture · municipality-bulky-waste · sofa-removal | TOFU→MOFU | **P1** | M1 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 2 | how to dispose of a fridge in dubai | Informational | How to Dispose of a Fridge in Dubai (And Why You Can't Just Put It Outside) | SC2 | `/services/appliance-disposal` | Mirdif · International City | fridge disposal dubai · refrigerator disposal | appliance-disposal · illegal-dumping-fines · e-waste | TOFU→BOFU | **P1** | M1 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 3 | junk removal cost dubai | Commercial | What Junk Removal Actually Costs in Dubai | SC5 | `/how-it-works` | — | junk removal price dubai · how much does junk removal cost | how-it-works · contact · how-much-fits-in-one-load | MOFU→BOFU | **P1** | M1 | **READY — BUSINESS INPUT REQUIRED** |
| 4 | dubai municipality bulky waste collection | Informational | Dubai Municipality Bulky Waste Collection: How It Works and What It Won't Do | SC2 | `/services/junk-removal` | Palm Jumeirah · Discovery Gardens | bulk waste disposal dubai · is bulky waste free | junk-removal · municipality-vs-paid · dispose-old-furniture | TOFU→MOFU | **P1** | M1 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 5 | junk removal vs municipality collection dubai | Comparison | Free Municipality Collection or a Paid Crew? A Straight Comparison | SC2 | `/services/junk-removal` | Palm Jumeirah · Discovery Gardens | free junk removal dubai | junk-removal · municipality-bulky-waste · same-day | MOFU→BOFU | **P1** | M1 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 6 | end of tenancy clearance dubai | Commercial | End of Tenancy in Dubai: What Has to Be Gone Before Handover | SC3 | `/services/house-clearance` | Marina · JLT · JVC · Downtown · Al Furjan · Creek Harbour | move out clearance dubai · handover clearance · end of tenancy checklist · moving out rubbish removal · clearance before moving **(absorbs #23)** | house-clearance · same-day · furniture-removal · deposit-deductions | MOFU→BOFU | **P1** | M1 | **READY** |
| 7 | sofa won't fit through door dubai | Problem | Your Sofa Won't Fit Through the Door. Here's What Actually Happens Next | SC1 | `/services/sofa-removal` | Marina · JLT · Karama | L shaped sofa removal · corner sofa removal | sofa-removal · service-lift-booking · furniture-removal | MOFU→BOFU | **P1** | M1 | **READY** |
| 8 | junk removal service lift dubai | Problem | Service Lift Booking in Dubai Buildings: How It Actually Works | SC4 | `/services/residential-junk-removal` | Marina · JLT · JBR · Downtown · Business Bay | how to book service lift dubai · move out hours | residential-junk-removal · bulky-items-tower · noc-moving-furniture | MOFU | **P1** | M1 | **READY** |
| 9 | mattress removal dubai | Commercial | How to Get Rid of a Mattress in Dubai | SC1 | `/services/furniture-removal` | Al Nahda · International City | mattress disposal dubai · old mattress pickup | furniture-removal · dispose-old-furniture · junk-removal | TOFU→BOFU | **P1** | M1 | **READY** |
| 10 | fine for dumping furniture dubai | Informational | What Happens If You Leave Furniture Outside Your Building in Dubai | SC2 | `/services/junk-removal` | Karama · Bur Dubai · Deira | can I leave furniture outside building dubai | junk-removal · municipality-bulky-waste · same-day | TOFU→BOFU | **P1** | M1 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 11 | need junk gone today dubai | Transactional | Need It Gone Today? What's Actually Possible in Dubai, and By When | SC3 | `/services/same-day-junk-removal` | Marina · JLT · Business Bay · JVC | urgent junk removal · junk removal today | same-day · house-clearance · contact | BOFU | **P1** | M1 | **READY** |
| 12 | where to donate furniture in dubai | Informational | Where to Donate Furniture in Dubai (And When Donation Isn't an Option) | SC1 | `/services/furniture-removal` | — | what happens to donated furniture dubai | furniture-removal · dispose-old-furniture · what-happens-to-your-junk | TOFU | **P1** | M1 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 13 | palm frond removal dubai | Commercial | What to Do With Palm Fronds in Dubai | SC1 | `/services/garden-waste-removal` | Jumeirah · Arabian Ranches · The Springs | palm tree waste removal · tree branch removal | garden-waste-removal · villa-clearance · garden-waste-bins | TOFU→BOFU | **P1** | M1 | **READY** |
| 14 | getting bulky items out of a tower dubai | Problem | Getting Bulky Items Out of a Dubai Tower | SC4 | `/services/residential-junk-removal` | Marina · JLT · JBR · Downtown · Discovery Gardens | tower junk removal · high rise junk removal | residential-junk-removal · service-lift-booking · sofa-removal | MOFU | **P1** | M1 | **READY** |
| 15 | NOC to move furniture dubai | Informational | Do You Need an NOC to Move Furniture Out in Dubai? | SC4 | `/services/residential-junk-removal` | Marina · Business Bay · Downtown | building permission junk removal | residential-junk-removal · service-lift-booking · house-clearance | MOFU | **P1** | M1 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 16 | where does junk go after removal dubai | Informational | What Actually Happens to Your Junk After We Take It | SC2 | `/` | — | dubai recycling centre · e waste recycling | home · about · what-dubai-bins-wont-take | TOFU | **P1** | M1 | **BLOCKED — SERVICE CAPABILITY CONFIRMATION REQUIRED** |
| 17 | remove old sofa before new delivery dubai | Problem | Timing Old-Sofa Removal Around a New Delivery | SC1 | `/services/sofa-removal` | Marina · JVC · Dubai Hills | sofa pickup dubai | sofa-removal · same-day · furniture-removal | BOFU | **P1** | M1 | **READY** |
| 18 | what junk removal companies take dubai | Informational | What We Take, What We Don't, and Why | SC5 | `/services/junk-removal` | — | what can't you throw in dubai bins | junk-removal · services hub · contact | MOFU | **P1** | M1 | **READY — BUSINESS INPUT REQUIRED** |
| 19 | AC unit removal dubai | Commercial | Getting Rid of an Old AC Unit in Dubai | SC1 | `/services/appliance-disposal` | Mirdif · Al Warqa · Al Nahda | air conditioner disposal · is an old AC unit e-waste | appliance-disposal · e-waste · dispose-fridge | MOFU→BOFU | P1 | M1 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 20 | washing machine removal dubai | Commercial | Washing Machine Removal in Dubai: What the Crew Needs to Know First | SC1 | `/services/appliance-disposal` | International City · Al Nahda | washing machine disposal dubai | appliance-disposal · dispose-fridge · residential-junk-removal | MOFU | P1 | M1 | **READY** |
| 21 | wardrobe removal dubai | Commercial | Wardrobe Won't Come Apart? What Removal Day Looks Like | SC1 | `/services/furniture-removal` | Marina · JVC | wardrobe disposal dubai · furniture dismantling | furniture-removal · sofa-wont-fit · dispose-old-furniture | MOFU | P1 | M1 | **READY** |
| 22 | TV disposal dubai | Commercial | Old TV Disposal in Dubai: Where Screens Actually Go | SC1 | `/services/appliance-disposal` | DSO · International City | old TV removal · electronics disposal | appliance-disposal · e-waste · what-happens-to-your-junk | MOFU | P2 | M1 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 23 | move out clearance dubai | Commercial | **CONSOLIDATED INTO #6** — the move-out timeline is a section inside *End of Tenancy in Dubai*, not a separate article. **No slug, no URL, not independently commissionable.** | SC3 | `/services/house-clearance` | *(covered by #6)* | *(now secondary keywords of #6)* | *(see #6)* | — | — | — | **CONSOLIDATED → #6** |
| 24 | will landlord deduct deposit for furniture left dubai | Problem | Can a Landlord Deduct Your Deposit for Furniture You Left Behind? | SC3 | `/services/house-clearance` | Marina · JVC · Discovery Gardens | landlord inspection clearance | house-clearance · end-of-tenancy · same-day | BOFU | **P1** | M1 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 25 | how much junk fits in one truck dubai | Informational | How Much Actually Fits in One Load? | SC5 | `/how-it-works` | — | junk removal truck dubai | how-it-works · junk-removal-cost · contact | MOFU | P1 | M1 | **READY — BUSINESS INPUT REQUIRED** |
| 26 | garden waste dubai bins | Informational | Garden Waste in Dubai: What the Bins Won't Take | SC1 | `/services/garden-waste-removal` | Jumeirah · Arabian Ranches · Al Warqa | green waste collection dubai | garden-waste-removal · palm-frond-disposal · villa-clearance | TOFU→MOFU | P1 | M1 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 27 | villa handover clearance dubai | Commercial | Villa Handover: What Has to Be Gone Before Inspection | SC3 | `/services/villa-clearance` | Arabian Ranches · Dubai Hills · The Springs · DAMAC Hills | full villa clearance · villa junk removal | villa-clearance · garden-waste-removal · house-clearance | BOFU | **P1** | M1 | **READY** |
| 28 | what to do before junk removal arrives dubai | Informational | Before the Crew Arrives: What to Do (and What Not to Bother With) | SC5 | `/how-it-works` | — | do I need to sort junk before pickup | how-it-works · contact · junk-removal | MOFU | P2 | M1 | **READY** |
| 29 | skip hire alternative dubai | Comparison | Skip or Crew? What Works Better for a Dubai Clear-Out | SC5 | `/services/waste-removal` | Al Quoz · DIP | renovation waste removal dubai | waste-removal · junk-removal-cost · commercial-junk-removal | MOFU | P2 | M1 | **READY** |
| 30 | free junk removal dubai | Commercial | "Free Junk Removal" in Dubai: What's Genuinely Free and What Isn't | SC2 | `/services/junk-removal` | Palm Jumeirah · Discovery Gardens | free furniture removal dubai · take my junk dubai | junk-removal · municipality-vs-paid · donate-furniture | TOFU→MOFU | P2 | M1 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |

*Remaining Month 1 articles are generated from clusters SC1, SC3 and SC4 using the item-level and access-level keywords in the database (Clusters C, D, E, G, H, J) — **as many as clear the gates, and no more.** Each must pass the six quality gates, the C-12 doorway test and the R7 orphan test before commissioning, and each must be assigned a status from the content status system above. **Commission `READY` items first — the blocked pillars above cannot lead Week 1 as originally sequenced until their sources are verified.***

### Month 2 — priority articles

| # | Primary keyword | Intent | Proposed title | Cluster | Money page | Area opportunities | Secondary keywords | Internal links | Role | Pri. | Mo. | Status |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 31 | office strip out clearance dubai | Commercial | Office Strip-Out in Dubai: Clearing a Floor Without Disrupting the Building | SC6 | `/services/commercial-junk-removal` | Business Bay · DSO · JLT | fit out waste removal dubai | commercial-junk-removal · waste-removal · out-of-hours | MOFU→BOFU | **P1** | M2 | **READY** |
| 32 | office furniture removal dubai | Commercial | What Happens to Old Office Furniture in Dubai | SC6 | `/services/commercial-junk-removal` | Business Bay · Deira · Bur Dubai | office furniture disposal · office desk removal | commercial-junk-removal · donate-furniture · what-happens-to-your-junk | MOFU | **P1** | M2 | **BLOCKED — SERVICE CAPABILITY CONFIRMATION REQUIRED** |
| 33 | warehouse clearance dubai | Commercial | Warehouse Clear-Outs: Planning Around Stock and Access | SC6 | `/services/commercial-junk-removal` | Al Quoz · DIP | warehouse junk removal dubai | commercial-junk-removal · waste-removal · area/al-quoz | MOFU | **P1** | M2 | **READY** |
| 34 | out of hours clearance dubai | Commercial | Why Offices Book Clearances for Nights and Weekends | SC6 | `/services/commercial-junk-removal` | Business Bay · JLT · Deira | commercial waste collection dubai | commercial-junk-removal · office-strip-out | MOFU | P1 | M2 | **READY — BUSINESS INPUT REQUIRED** |
| 35 | IT equipment disposal dubai | Commercial | Disposing of Old Office IT Equipment Responsibly | SC6 | `/services/commercial-junk-removal` | DSO · Business Bay | computer disposal dubai · e waste disposal | commercial-junk-removal · e-waste · appliance-disposal | MOFU | P2 | M2 | **BLOCKED — SERVICE CAPABILITY CONFIRMATION REQUIRED** |
| 36 | how long does a villa clearance take dubai | Informational | How Long Does a Villa Clearance Actually Take? | SC3 | `/services/villa-clearance` | Arabian Ranches · JGE · DAMAC Hills | large villa clearance dubai | villa-clearance · villa-handover · garden-waste-removal | MOFU | **P1** | M2 | **READY — BUSINESS INPUT REQUIRED** |
| 37 | gated community clearance access dubai | Informational | Gated Communities: Access, Permits and Timing for a Clearance | SC4 | `/services/villa-clearance` | Arabian Ranches · JGE · DAMAC Hills · The Springs · Town Square | villa clearance services dubai | villa-clearance · how-long-villa-clearance · area pages | MOFU | P1 | M2 | **READY** |
| 38 | e waste disposal dubai | Commercial | E-Waste Disposal in Dubai: The Rules and the Routes | SC2 | `/services/appliance-disposal` | DSO · Business Bay | e waste collection · e waste recycling dubai | appliance-disposal · dispose-fridge · commercial-junk-removal | TOFU→MOFU | P1 | M2 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 39 | renovation waste removal dubai | Commercial | Renovation Waste in Dubai: Clearing As You Go | SC6 | `/services/waste-removal` | Al Quoz · Jumeirah · Al Barsha | construction debris removal dubai | waste-removal · commercial-junk-removal · skip-hire-alternative | MOFU | P1 | M2 | **BLOCKED — SERVICE CAPABILITY CONFIRMATION REQUIRED** |
| 40 | soil removal dubai | Commercial | Soil, Sand and Pots: The Garden Waste People Forget to Plan For | SC1 | `/services/garden-waste-removal` | Jumeirah · Arabian Ranches · Al Warqa | sand bags removal · plant pot disposal | garden-waste-removal · palm-frond-disposal | MOFU | P2 | M2 | **READY — BUSINESS INPUT REQUIRED** |
| 41 | estate clearance dubai | Commercial | Clearing a Home After a Bereavement: How We Work | SC3 | `/services/villa-clearance` | — | deceased estate clearance dubai | villa-clearance · house-clearance · contact | MOFU | P2 | M2 | **READY** |
| 42 | IKEA furniture disposal dubai | Commercial | Flat-Pack Furniture: Why It Rarely Survives a Second Move | SC1 | `/services/furniture-removal` | JVC · Discovery Gardens · International City | broken furniture disposal dubai | furniture-removal · dispose-old-furniture · donate-furniture | MOFU | P2 | M2 | **READY** |
| 43 | moving out of dubai checklist | Informational | Leaving Dubai: The Clearance Part of the Checklist | SC3 | `/services/house-clearance` | Marina · JLT · Al Furjan | end of tenancy checklist dubai | house-clearance · end-of-tenancy · same-day | TOFU | P2 | M2 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 44 | what can't you throw in dubai bins | Informational | What You Can't Put in a Dubai Bin | SC2 | `/services/junk-removal` | — | dubai recycling centre drop off | junk-removal · illegal-dumping-fines · what-happens-to-your-junk | TOFU | P2 | M2 | **BLOCKED — SOURCE VERIFICATION REQUIRED** |
| 45 | junk removal companies in dubai | Comparison | How to Choose a Junk Removal Company in Dubai | SC5 | `/` | — | best junk removal dubai · junk removal reviews | home · how-it-works · about | MOFU | P2 | M2 | **READY** |

*Remaining Month 2 articles come from clusters SC1, SC4 and SC6 long-tail, plus the **conditional** area-specific pieces (only where C-12 is satisfied) and refreshes of Month 1 pillars. **Volume is deliberately unspecified** — Day 30 data decides the allocation, and the same six gates, statuses and orphan rules apply.*

---

## Backlink Support Opportunities

**No links are to be built yet.** This section identifies where external support *could* naturally help, for review alongside the four other sites the business controls.

### Principles (binding)

1. **Editorial relevance only.** A link must make sense to a reader who has never heard of SEO. If it would not be there without the SEO benefit, it does not go in.
2. **No sitewide links, no footer links, no blogroll links** across the four owned sites. Sitewide cross-linking between commonly-owned sites in the same niche is a recognisable footprint.
3. **No exact-match anchor manipulation.** Anchors should read as natural references — brand names, URLs, or descriptive phrases. Not "junk removal dubai" repeated across four domains.
4. **Volume discipline.** A handful of genuinely useful links across two months, not dozens. Four owned sites all pointing at the same ten money pages in the same window is a pattern, not a signal.
5. **Disclose where appropriate**, and never simulate third-party endorsement.
6. **Own-site links are a supplement, never the strategy.** The primary off-site work for a local service business is Google Business Profile, genuine reviews, and legitimate local citations.

### Where external support would be most natural

| Focus target | Natural editorial context | Suggested anchor style |
|---|---|---|
| **F6 villa clearance** · **F7 house clearance** | A property, community or relocation site covering move-out and handover would naturally reference a clearance provider at the point where the reader has to empty the property. | Brand name, or descriptive ("a Dubai clearance crew") |
| **F5 fridge disposal** · appliance/e-waste | A home-appliance or sustainability context discussing what happens to old appliances — the genuinely useful reference point. | Descriptive ("licensed appliance disposal in Dubai") |
| **F8 garden waste** | Gardening, landscaping or villa-maintenance content where green-waste disposal is a real reader problem. | Descriptive / brand |
| **F9 commercial** | Office fit-out, facilities or business-relocation content where strip-out waste is a genuine step. | Brand / descriptive |
| **F2 same-day** | Any "moving out this week" or urgent-logistics context. | Brand |
| **SC2 Municipality pillar** | Assessed as the strongest potential link magnet. A genuinely accurate, well-sourced guide to Dubai bulky-waste rules may earn links on merit from forums, community groups and property blogs. **Only once source verification is complete.** | Earned — no control over anchors, which is ideal |

### Non-link off-site priorities (higher impact than any of the above)

- **Google Business Profile** — categories, service list, service areas, photos, posts, and a genuine review-generation process. For a local service business this typically outweighs backlinks for commercial visibility.
- **Legitimate local citations** — consistent NAP (name, address, phone) across reputable UAE directories.
- **Brand-SERP defence** — a competitor presents in search as "Junk Services Dubai". Owning the brand SERP (GBP, profiles, consistent naming) is a real, urgent workstream.

### To review before any linking decision

For each of the four owned sites, capture: domain, topical relevance to junk removal/clearance, current Search Console impressions and top queries, whether it has genuine editorial content, whether it already links here, and whether the audiences plausibly overlap. **If a site is not topically relevant, it should not link here at all** — irrelevant links from owned properties carry risk and little benefit.

---

## Data-Driven Keyword Expansion

**This file is a living document, but it changes under control.** The initial research pass is complete and is not to be repeated. **Do not continuously generate hundreds of speculative new keywords** — that produces an unmappable list, invites cannibalization, and buries the keywords that are actually earning impressions.

From here, **Google Search Console becomes the primary source of new keyword opportunities**, because it reports the wording real Dubai searchers actually used to reach this site. That is evidence. Speculative brainstorming is not.

### The permanent expansion loop

```
   Initial master research  (COMPLETE — the 283 mapped opportunities in this file)
                │
                ▼
   Publish approved content  (only what clears the six quality gates)
                │
                ▼
   Collect Search Console query data  (weekly; meaningful from ~Day 30)
                │
                ▼
   Identify real impressions and real search wording
                │
                ▼
   Add genuinely new opportunities to keywords.md
                │
                ▼
   Map each new keyword to an existing URL — or a justified new one
                │
                ▼
   Check cannibalization against the Cannibalization Map
                │
                ▼
   Reprioritise supporting content
                │
                └──────────► back to Publish
```

### Admission rules for a new keyword

A query found in Search Console is added to this file only if **all** of these hold:

| # | Test | Fails if… |
|---|---|---|
| 1 | **Genuinely new** | It is already in the 283 as a primary or a secondary, or is a wording variant of one. Variants are recorded against the existing entry, not added as new rows. |
| 2 | **Dubai and in-scope** | It is outside Dubai, or its intent is buying, selling, scrap, marketplace, moving, rental, cleaning or employment — see *Excluded Search Intent*. |
| 3 | **Removal/clearance intent** | The searcher's primary intent is not to have something taken away. |
| 4 | **Has one destination** | No existing page can justifiably own it **and** no new page is genuinely warranted. If it has no defensible home, it is marked DO NOT TARGET rather than forced onto a page. |
| 5 | **Cannibalization-clear** | Assigning it would put two URLs in competition. Resolve via the Cannibalization Map first — the default resolution is *secondary keyword on the existing owner*, not a new URL. |
| 6 | **New URL genuinely justified** | A new page is proposed only because the wording differs. **Wording difference is never sufficient.** A new URL requires genuinely distinct intent and enough unique substance to stand alone. |

### What changes and what does not

| May change on data | Must NOT change mid-campaign |
|---|---|
| Supporting-content allocation between clusters | **The fixed Top 10 measurement set** |
| Article priorities and planned months | The Dubai-only scope |
| Which clusters get Month 2 depth | The exclusion rules |
| New secondary keywords on existing pages | Established page ownership, unless the Cannibalization Map is formally revised |
| Newly admitted keywords and their mappings | The evidence-labelling discipline |

> **The Top 10 do not move because another keyword gets early impressions.** If an unexpected query performs well, that is a signal to **allocate supporting content toward it**, not to swap it into the measurement set. Changing the measurement set mid-campaign destroys the Day 0 → Day 30 → Day 60 comparison, which is the only way to tell whether any of this is working. Reconsider the Top 10 **after** Day 60, with two months of real data.

### Maintenance discipline

- **When a quantitative source becomes available**, record the figure, its source and its date next to the keyword. Never backfill a number from memory or inference.
- **Upgrade the evidence labels as data arrives** — an `UNVERIFIED SEARCH-DEMAND ASSUMPTION` becomes a measured figure; a `COMMERCIAL HYPOTHESIS` becomes a `VERIFIED FACT` only when real conversion data supports it.
- **Log every change** — what was added, what it was mapped to, what evidence justified it, and the date. A master file without a change history stops being trustworthy.

---

## Measurement Plan

**The objective is qualified Dubai junk-removal enquiries — not rankings, not sessions, and never article count.** Article volume is an input, never a success metric. A month that publishes 40 articles and produces no enquiries has failed; a month that publishes 15 and produces enquiries has succeeded.

### The funnel being measured

Track each stage where technically possible. The value of naming the whole chain is that it shows **where** a failure sits: high impressions with no clicks is a different problem from good clicks that never reach a service page, which is different again from service-page traffic that never contacts anyone.

| # | Stage | Measured by | Currently measurable? |
|---|---|---|---|
| 1 | **Google visibility** | GSC impressions; distinct ranking queries | ⚠ Once Search Console is verified |
| 2 | **Organic clicks** | GSC clicks, CTR | ⚠ Once Search Console is verified |
| 3 | **Correct landing page** | GSC page-level report — is the *intended* URL ranking for the query? | ⚠ Once Search Console is verified |
| 4 | **Service/content engagement** | Plausible: article → service-page click-through, pages per session | ✗ Plausible not configured |
| 5 | **WhatsApp / call / contact action** | Plausible events on direct CTAs; `/api/quote` submissions | ⚠ Partial — form path recorded in Leads; direct `wa.me` and `tel:` clicks untracked |
| 6 | **Qualified lead** | Payload **Leads** records, filtered to genuinely serviceable jobs | ✓ Available now |
| 7 | **Booked job** | Business records, matched back to Leads where possible | ✗ Depends on the business's own job tracking |

**Stages 4 and 5 are the weakest links and the highest-value fixes.** Without them the chain breaks exactly where SEO turns into revenue, which is the one place the business needs the evidence.

### Prerequisite — fix instrumentation in Week 1 (blocking)

| Item | Current state | Action |
|---|---|---|
| Google Search Console | Not evidenced in the repo | Verify `junkservicesdubai.com`; submit the sitemap. **Without this nothing below is measurable.** |
| Plausible analytics | `components/Analytics.jsx` exists but `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is **unset** — no script loads, nothing is recorded | Set the env var and redeploy |
| WhatsApp / call click tracking | **Partly tracked, partly invisible.** `/contact` submits to `/api/quote`, which stores the lead in Payload *and* hands the same details to WhatsApp — so every enquiry through the form leaves a server-side record even though it continues into WhatsApp. But the direct `wa.me` and `tel:` CTAs in the nav, hero, footer and every CTA band carry **no events at all**. | Enable Plausible outbound-link or tagged-event tracking on the direct CTAs so they become countable. **This is the most important measurement gap:** the form path is recoverable from Leads, the direct-click path is currently invisible. |
| Form enquiries | Captured in the Payload **Leads** collection (name, phone, area, preferred time, items, status) | Usable immediately — and stronger than it first appears, since the form path also covers the WhatsApp hand-off. Add a source/first-touch field if attribution to organic is wanted. |
| Bing Webmaster Tools | Not evidenced | Verify — low effort, some UAE share |
| Google Business Profile | Unknown | Claim/verify; GBP Insights becomes a core metric |

> **Attribution caveat, stated plainly:** with WhatsApp and phone as the main conversion paths, **a meaningful share of leads will never be attributable to a specific keyword.** Enquiries that start at a direct `wa.me` or `tel:` CTA leave the site entirely and arrive in a phone inbox with no referrer. The Leads collection's `area` field and asking "how did you find us?" at intake will do more for attribution than any analytics configuration. Plan for directional measurement, not precision.

### Day 0 baseline — capture on 2026-09-21, before publishing

Record and store; without a baseline, later numbers mean nothing.

| Metric | Source | Expected Day 0 state |
|---|---|---|
| Total organic impressions (28d) | GSC | Near zero |
| Total organic clicks (28d) | GSC | Near zero |
| Average CTR | GSC | n/a |
| Indexed page count | GSC Pages report | Should approach 12 services + 30 areas + ~7 static |
| Position for each of the 10 focus keywords | GSC (query filter) | Likely unranked/not reported |
| Impressions per focus landing page | GSC (page filter) | Baseline per URL |
| Organic sessions | Plausible | Zero until configured |
| WhatsApp clicks / phone clicks | Plausible events | Zero until tracking added |
| Form enquiries (28d) | Payload Leads | Count and record area distribution |
| Qualified leads (jobs actually bookable) | Manual, from Leads status | Count |
| GBP views / calls / direction requests | GBP Insights | Baseline |
| Brand SERP position for "junk services dubai" | Manual check | **Known issue — a competitor occupies this** |

### The ten focus keywords — fixed tracking set

Positions and impressions for these ten are reviewed at every checkpoint. **They do not change between Day 0 and Day 60** — that is what makes the campaign measurable.

| # | Keyword | Landing page |
|---|---|---|
| 1 | junk removal dubai | `/` |
| 2 | same day junk removal dubai | `/services/same-day-junk-removal` |
| 3 | furniture removal dubai | `/services/furniture-removal` |
| 4 | sofa removal dubai | `/services/sofa-removal` |
| 5 | fridge disposal dubai | `/services/appliance-disposal` |
| 6 | villa clearance dubai | `/services/villa-clearance` |
| 7 | house clearance dubai | `/services/house-clearance` |
| 8 | garden waste removal dubai | `/services/garden-waste-removal` |
| 9 | commercial junk removal dubai | `/services/commercial-junk-removal` |
| 10 | junk removal dubai marina | `/areas/dubai-marina` |

### Day 30 review — 2026-10-19

**Leading indicators (what should move first).** Early SEO shows up as impressions and indexation long before clicks or rankings.

| Question | Metric | Reading |
|---|---|---|
| Is Google finding the content? | Indexed pages; % of published articles indexed | Slow indexation of new articles is the **first** thing to diagnose |
| Is anything surfacing? | Total impressions vs Day 0; **number of distinct ranking queries** | Query-count growth is the most honest early signal |
| Are the right pages surfacing? | Impressions per focus landing page | Wrong page ranking for a focus term = a cannibalization problem to fix now |
| Any cannibalization? | Focus queries where the ranking URL **changes between weeks** | Check C-1, C-2, C-5, C-6, C-8 specifically |
| Any early clicks? | Clicks, CTR | Likely small. **Do not treat low clicks at Day 30 as failure** |
| Any enquiries? | Leads count; WhatsApp/call events | Any organic-attributable enquiry at Day 30 is a genuinely good outcome |

**Decisions at Day 30:** reallocate Month 2 capacity toward clusters showing impression growth; diagnose flat clusters (intent mismatch / wrong page / technical / too competitive) *before* adding content; fix any cannibalization observed; rewrite titles on pages with impressions but poor CTR.

### Day 60 review — 2026-11-16

| Layer | Metric | What good looks like |
|---|---|---|
| **Visibility** | Impressions; distinct ranking queries; focus-keyword average positions | Sustained upward trend; the ten focus terms reported and trending, even if not yet page one |
| **Relevance** | CTR; impressions on the correct landing pages | Right URL ranking for the right query |
| **Traffic** | Organic sessions; landing-page distribution | Money and pillar pages receiving traffic, not just the blog index |
| **Engagement** | Pages per session; article → service-page click-through | Proves the internal-link strategy is working |
| **Conversion** | WhatsApp clicks · call clicks · form submissions, all from organic | **The real scoreboard** |
| **Business** | Qualified leads; jobs booked; revenue where attributable | The only metric that decides whether this continues |

**Honest expectation setting.** For a site starting at effectively zero visibility in a crowded local niche, 60 days is realistically enough to establish indexation, topical coverage and early long-tail rankings — most plausibly on the early-opportunity targets (#8 garden waste, #10 area layer) and item-level mid-tail (#4 sofa, #5 fridge). Head terms (#1, #3, #6) are a longer horizon. **All of this is expectation, not forecast.** **Judge Day 60 on impression growth, query-count growth, and whether any qualified enquiries arrived — not on head-term positions.**

### Ongoing cadence

- **Weekly:** GSC query and page reports; indexation of the week's articles; any cannibalization flapping.
- **Fortnightly:** internal-link audit (no orphans); Leads review with area distribution.
- **Monthly:** full focus-keyword position review; content reallocation decision.

---

## Open Questions / Missing Data

Ranked by how much each blocks the strategy.

### Blocking

1. **No keyword volume, difficulty or CPC data anywhere in this document.** No tool was available. Every demand statement is qualitative and labelled `UNVERIFIED`. **Before committing budget, populate volumes from Google Keyword Planner (geo: Dubai) or Ahrefs/Semrush and record the source and date.** Expect some re-ranking of priorities — in particular the relative weight of `rubbish removal` vs `junk removal`, and whether `fridge removal` justifies its own page (C-7).
2. **Is Search Console verified, and is there historical data?** If the property exists, its query export would replace a large part of the guesswork here — and would change the Day 0 baseline from "assume zero" to a real number.
3. **Analytics is not running.** `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is unset, so nothing is being recorded today, and WhatsApp/phone clicks are untracked. **The campaign cannot be evaluated until this is fixed.**
4. **Google Business Profile status is unknown.** For this business type it plausibly outweighs everything in this document for commercial visibility. Needs confirming immediately.

### High priority

5. **Dubai Municipality facts need verification before any article publishes.** `BLOCKED — SOURCE VERIFICATION REQUIRED` — 15 of the 45 mapped article opportunities are blocked on this. The free bulky-waste service, the 800900 channel, the ground-level requirement, the reported free-zone exclusions (Palm Jumeirah, Discovery Gardens) and any dumping penalties were gathered from secondary sources. **Verify against the official Dubai Municipality source and cite it.** Several Month 1 articles depend on these facts, and publishing them wrong would damage trust and rankings.
6. **Charity collection details need verification.** Dar Al Ber, Beit Al Khair, Red Crescent and any stated phone numbers or timescales must be confirmed before appearing in the donation article.
7. **Service capability confirmations** — several keywords are targetable only if the operation genuinely delivers: weekend crews (B10), 24-hour service (B11), construction and demolition waste including any licensing (F10, F12), hoarding/heavy-clutter clearance (H18), recurring commercial contracts (K16), licensed-handler disposal chains and data-secure IT disposal. `BLOCKED — SERVICE CAPABILITY CONFIRMATION REQUIRED` — 4 mapped articles are blocked on this. **Do not target, and do not publish, what cannot be delivered.**
8. **Real pricing and real operational figures.** `READY — BUSINESS INPUT REQUIRED` — 6 mapped articles are waiting on business input: price bands (#3), the acceptance list (#18), truck capacities (#25), out-of-hours availability (#34), villa clearance durations (#36), garden-waste weight limits (#40). **None may be invented, estimated or copied from a competitor.** The cost article in particular is a Month 1 priority and a high-intent target, but it cannot be written until pricing is supplied.
9. **The four owned websites.** Domains, topical relevance, current impressions and top queries — needed before any linking decision, per the user's own instruction to review separately.

### Medium priority

10. **Dubai-local SERP verification.** All SERP sampling ran through a US-geolocated tool. The local pack — likely the dominant click destination for these queries — was not observed. Re-check the key terms from a Dubai IP or with a geo-targeted rank tracker.
11. **Arabic-language opportunity not assessed.** The site is English-only (`locale: en_AE`). Whether Arabic queries represent meaningful demand for this service is unknown and out of scope for this pass.
12. **Competitor backlink profiles not analysed.** Would inform how realistic the head terms are.
13. **Homepage H1 decision (C-2)** needs an owner's call: SEO-optimal wording vs conversion-optimal wording.
14. **`/services/residential-junk-removal` long-term viability (C-6).** May warrant consolidation if Day 30 shows it competing with `/services/house-clearance`.
15. **Seasonality unmeasured.** Dubai's expat move-out cycle, school-year end and Ramadan timing plausibly drive demand peaks, but no data was available to confirm the shape. Revisit once GSC has history.

---

*End of `keywords.md`. This is the master keyword source — downstream content-system files derive from it and must not introduce unmapped targets.*
