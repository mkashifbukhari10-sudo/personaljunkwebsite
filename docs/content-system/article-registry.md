# Article Registry — Junk Services Dubai

**Status:** The **live state record** of every article. This is the only file in the content system that changes on every article, and it must be updated as part of publishing — not afterwards.
**Position in the system:**

| File | Answers | Changes |
|---|---|---|
| [`keywords.md`](./keywords.md) | **What** to target, and **where** it lives | Rarely, and under control |
| [`content-rules.md`](./content-rules.md) | **How** content must be written | Rarely |
| [`content-structure.md`](./content-structure.md) | **What shape** an article takes | Rarely |
| [`image.md`](./image.md) | **Which images** may be used | Rarely |
| **`article-registry.md`** (this file) | **What actually exists**, what it owns, and what state it is in | **Every article** |

**Authority:** Subordinate to all four. The registry records decisions; it does not make them. If the registry and `keywords.md` disagree about ownership, `keywords.md` is right and the registry is out of date — **fix the registry.**

**Current state as at 2026-09-20:** **0 published articles · 7 in progress (`DRAFTING`).** `/blog` shows its empty state, verified against the live site. §4 is a queue, not a record — **45 mapped IDs, 44 independently commissionable.**

---

## §0 · What this file is for

Four other files tell you how to make an article. **This one tells you what already exists** — which is the question that actually prevents the two failures that kill content programmes at scale.

| Job | Why it needs a ledger |
|---|---|
| **1. Cannibalization guard** | By article 40, nobody remembers what article 12 claimed. The **Claimed Keyword Index (§5)** is the single place to check before commissioning anything. |
| **2. Orphan prevention** | `content-rules.md` §13 requires every article to have an inbound link. The **Reverse-Link Ledger (§6)** is where that gets recorded, and where missing ones become visible. |
| **3. Status tracking** | 19 of the 45 mapped opportunities are blocked. **§7** tracks what unblocks each one, so work can be batched instead of rediscovered per article. |
| **4. Audit trail** | When a ranking moves, or two URLs start competing, the registry is what lets you reconstruct what changed and when. |

**It is a ledger, not a rulebook.** Nothing here overrides the other four files, and no editorial or SEO policy is restated.

### When to touch it

| Moment | Action |
|---|---|
| **Before commissioning** | Check §5 for a conflicting claim. Check §4 for the entry and its status. |
| **At commissioning** | Create the article’s record in §3 with state `DRAFTING`, and mark its §4 queue row as commissioned. **A §3 record does not imply anything is live.** |
| **At publish** | Set the §3 record to `PUBLISHED` and fill its **Published** date, add the primary keyword to §5.2, record the inbound link in §6.1. |
| **When a block clears** | Update §7 and the article's status. Note it in §12. |
| **On any later change** | Update the affected rows and log it in §12. |

> **An article is not "done" until its registry rows exist.** Publishing without registering is how the index silently stops being true — and an untrue index is worse than none, because it gets trusted.

---

## §1 · Registry schema

Field definitions for the Article records table (§3). Keep the column order stable.

| Field | Meaning |
|---|---|
| **ID** | The `keywords.md` Article Opportunity Map number where one exists, or `N-{n}` for an article admitted later via the expansion process. Never reused. |
| **Slug** | The published URL segment. `/blog/{slug}`. |
| **Title** | The live H1. Update if it changes. |
| **Primary keyword** | The one keyword this URL owns. **Must match the claim in §5 exactly.** |
| **Cluster** | SC1–SC6, from `keywords.md`. |
| **Archetype** | A–H, from `content-structure.md` §10. |
| **Money page** | The single primary, as set in `relatedServices`. |
| **Related areas** | From `relatedAreas`. Usually empty. |
| **State** | See §2. A record exists from `DRAFTING` onward — **it does not mean the article is live.** Only `PUBLISHED` and `UPDATED` correspond to a public URL. |
| **Published** | Date of first publish. **Empty until the article actually publishes** — it stays empty through `DRAFTING` and `REVIEW`. |
| **Last reviewed** | Date of the last substantive check — content, facts or links. Empty until first publish. |
| **Facts** | `none` · `sourced` · `business` — whether the article rests on external facts, and whether they were verified. Drives the re-check schedule (§9). |
| **Inbound** | The page providing the required inbound link (§6). Must be filled **by publish**; may be empty while `DRAFTING`. |
| **Notes** | Anything a future reader needs — a merge, a redirect, a pending correction. |

---

## §2 · Article lifecycle

```
  QUEUED ──────► CLEARED ──────► DRAFTING ──────► REVIEW ──────► PUBLISHED
    │               │                                               │
    │               │                                               ├──► UPDATED
    │               │                                               │    (re-reviewed, still live)
    │               │                                               │
    │               │                                               ├──► MERGED
    │               │                                               │    (folded into another URL, redirected)
    │               │                                               │
    │               │                                               └──► RETIRED
    │               │                                                    (removed, redirected)
    │               │
    └──► BLOCKED ───┘                        └──► DROPPED
         (waiting on facts,                       (failed a gate; reason recorded)
          business input or
          capability confirmation)
```

| State | Meaning | Exit condition |
|---|---|---|
| **QUEUED** | Mapped in `keywords.md`, not started. | Status clears and a slot opens. |
| **BLOCKED** | Waiting on source verification, business input or capability confirmation (§7). | The input genuinely arrives. **Never cleared by rewriting around the gap** — `content-rules.md` §8. |
| **CLEARED** | All eight gates in `content-rules.md` §23 pass. Ready to draft. | Drafting starts. |
| **DRAFTING** | Being written. | Draft complete. |
| **REVIEW** | Draft preview checked against the QA lists in `content-rules.md` §24, `content-structure.md` §16 and `image.md` §15. | All three pass. |
| **PUBLISHED** | Live. Registered in §3, §5 and §6. | — |
| **UPDATED** | Live and substantively revised since publish. | — |
| **MERGED** | Folded into another URL; old slug redirects. | — |
| **RETIRED** | Removed; slug redirects. | — |
| **DROPPED** | Never published. **Record why** — a dropped topic that nobody remembers rejecting gets proposed again. | — |

---

## §3 · Active article records

**One record per article, from the moment drafting begins until it is retired.** A record here does **not** mean the article is live — the **State** column says whether it is.

| State in this table | Publicly live? | Published date |
|---|---|---|
| `DRAFTING` · `REVIEW` | **No** — draft only, not indexed | Empty |
| `PUBLISHED` · `UPDATED` | **Yes** — must resolve at `/blog/{slug}` | Set |
| `MERGED` · `RETIRED` | **No** — the old slug must redirect (§8) | Kept, as history |

**7 records, all `DRAFTING`. 0 published.** `/blog` still renders its empty state — correctly, since no record has reached `PUBLISHED`.

| ID | Slug | Title | Primary keyword | Cluster | Archetype | Money page | Areas | State | Published | Last reviewed | Facts | Inbound | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 7 | `sofa-wont-fit-through-door-dubai` | Your Sofa Won’t Fit Through the Door. Here’s What Actually Happens Next | sofa won’t fit through door dubai | SC1 | G | `sofa-removal` | — | `DRAFTING` | — | — | none | `/services/sofa-removal` (planned) | Cover: IB-1 |
| 6 | `end-of-tenancy-clearance-dubai` | End of Tenancy in Dubai: What Has to Be Gone Before Handover | end of tenancy clearance dubai | SC3 | F | `house-clearance` | — | `DRAFTING` | — | — | none | `/services/house-clearance` (planned) | Absorbs #23. Cover: IB-2 |
| 13 | `palm-frond-disposal-dubai` | What to Do With Palm Fronds in Dubai | palm frond removal dubai | SC1 | A | `garden-waste-removal` | — | `DRAFTING` | — | — | none | `/services/garden-waste-removal` (planned) | Cover: IB-3 |
| 11 | `junk-gone-today-dubai` | Need It Gone Today? What’s Actually Possible in Dubai, and By When | need junk gone today dubai | SC3 | E | `same-day-junk-removal` | — | `DRAFTING` | — | — | none | `/services/same-day-junk-removal` (planned) | C-2 watch. Cover: IB-4 |
| 27 | `villa-handover-clearance-dubai` | Villa Handover: What Has to Be Gone Before Inspection | villa handover clearance dubai | SC3 | F | `villa-clearance` | — | `DRAFTING` | — | — | none | `/services/villa-clearance` (planned) | C-8 boundary held. Cover: IB-5 |
| 8 | `service-lift-booking-dubai` | Service Lift Booking in Dubai Buildings: How It Actually Works | junk removal service lift dubai | SC4 | G | `residential-junk-removal` | — | `DRAFTING` | — | — | none | `/services/residential-junk-removal` (planned) | Reserved territory from #7. Cover: IB-6 |
| 20 | `washing-machine-removal-dubai` | Washing Machine Removal in Dubai: What the Crew Needs to Know First | washing machine removal dubai | SC1 | A | `appliance-disposal` | — | `DRAFTING` | — | — | none | `/services/appliance-disposal` (planned) | Disposal-chain claims omitted (#16 capability-blocked). Cover: IB-7 |

*All seven exist in Payload as **drafts** (`_status: draft`, 0 published). **Content, claim audit, internal links, SEO fields and Payload relationships are complete.** Drafts are excluded from `lib/content/posts.js` (`publishedOnly: true`) and from `generateStaticParams`, so none is publicly reachable.*

**Per-article completion against the seven-stage workflow** (`content-rules.md`):

| Stage | State |
|---|---|
| 1 Content | ✅ all seven |
| 2 Claim audit | ✅ all seven — #6, #7, #11, #13 audited 2026-09-20 (13 fixes); #8, #20, #27 audited earlier |
| 3 SEO | ✅ all seven — title, description, canonical on the production domain, `noIndex: false`, OG title, OG description. **OG image outstanding.** |
| 4 Internal links | ✅ in-article. **Reverse inbound links identified but deliberately not applied** — see below |
| 5 Images | ⛔ **0 of 21 slots** — see [`image-backlog.md`](./image-backlog.md) |
| 6 Payload draft | ✅ all seven |
| 7 QA + tracking | ✅ content QA passed; image QA cannot pass |

> **Why reverse links are not applied yet.** The planned inbound links in §6.1 point from **live service pages** to article URLs that are still drafts. An unpublished post 404s, so applying them now would put broken links on live pages. **They are applied at publish, not before** — which is also when the orphan check in §6.3 becomes meaningful.

**Status stays `DRAFTING`, not `READY FOR PUBLISHING`**, because the image requirement is genuinely unmet. Nothing is marked complete that is not.

---

## §4 · Commissioning queue

The 45 mapped opportunities from the `keywords.md` Article Opportunity Map, with live status. **This is state, not a re-plan** — the topics, money pages and priorities belong to `keywords.md` and are not changed here.

**Status counts as at 2026-09-20**, across the **44 commissionable** opportunities: 19 READY · 6 READY · BUS. INPUT · 15 BLOCKED · SOURCE · 4 BLOCKED · CAPABILITY. **Plus 1 consolidated (#23 → #6), which produces no article.**

**Two articles have no slug assigned in `keywords.md`** (#22, #35). Per `content-structure.md` §4 the slug is set deliberately at commissioning — **do not auto-generate it from the title.** Record it here once chosen.

**One opportunity is consolidated, not commissionable** (#23 → #6). See §4.1. **45 mapped IDs · 44 independently commissionable.**

**Commissioned and now tracked in §3:** #6 · #7 · #8 · #11 · #13 · #20 · #27. Their Status below stays exactly as `keywords.md` records it (parity is checked in §11); **§3 holds their live state.**


### §4.1 · #23 consolidated into #6 · RESOLVED 2026-09-20

**Decision approved and applied to `keywords.md`. #23 produces no article and no URL.**

`keywords.md` previously said two different things: cluster row **H9** mapped `move out clearance dubai` as a **SUPPORT** keyword on `/blog/end-of-tenancy-clearance-dubai`, while the Article Opportunity Map listed #23 as a separate article claiming that keyword as its primary. **The approved resolution follows H9** — one intent, one URL.

| | Final state |
|---|---|
| **Canonical URL** | `/blog/end-of-tenancy-clearance-dubai` — owned by **#6** |
| **Primary keyword** | `end of tenancy clearance dubai` (#6) |
| **Secondary keyword** | `move out clearance dubai`, plus #23's former secondaries — *moving out rubbish removal*, *clearance before moving* |
| **#6 scope** | Absorbs the move-out timeline as a **section**, and #23's area opportunities (Al Furjan · Creek Harbour) |
| **#23** | **CONSOLIDATED → #6.** ID retained for audit. No slug, no URL, no article, not independently commissionable. |

**Why it is not `MERGED`.** `MERGED` (§2) describes a **published** article later folded into another, which leaves a live URL needing a redirect. **#23 was never published and no URL ever existed**, so there is nothing to redirect and §8 gets no entry. `CONSOLIDATED → #6` is a **pre-publication queue status**, distinct from the article-record lifecycle, and it is deliberately not part of §2's state machine — no real article record ever enters it.

**Guards now in force:**

- #23's slug cell reads *none — consolidated*, so no slug can be inherited or auto-generated.
- Its Month and Priority are `—`, so it cannot be picked up by month-based planning.
- It is excluded from the commissionable count (**45 mapped IDs · 44 commissionable**).
- `move out clearance dubai` may **never** be claimed in §5.2 — it is a secondary of #6's URL, and §5.4 step 2 already stops any keyword listed as a secondary from becoming an article.
- §11 carries explicit checks that #23 cannot enter `DRAFTING` or claim a keyword.

**If #6 is later retired or merged**, its secondary keywords — including `move out clearance dubai` — are released with it and return to the queue as unmapped. They do **not** revert to #23.

#### Month 1 emphasis

| # | Primary keyword | Proposed slug | Money page | Cluster | Mo. | Status |
|---|---|---|---|---|---|---|
| 1 | how to dispose of old furniture in dubai | `dispose-old-furniture-dubai` | `/services/furniture-removal` | SC1 | M1 | BLOCKED · SOURCE |
| 2 | how to dispose of a fridge in dubai | `dispose-fridge-dubai` | `/services/appliance-disposal` | SC2 | M1 | BLOCKED · SOURCE |
| 3 | junk removal cost dubai | `junk-removal-cost-dubai` | `/how-it-works` | SC5 | M1 | READY · BUS. INPUT |
| 4 | dubai municipality bulky waste collection | `dubai-municipality-bulky-waste` | `/services/junk-removal` | SC2 | M1 | BLOCKED · SOURCE |
| 5 | junk removal vs municipality collection dubai | `municipality-vs-paid-junk-removal-dubai` | `/services/junk-removal` | SC2 | M1 | BLOCKED · SOURCE |
| 6 | end of tenancy clearance dubai | `end-of-tenancy-clearance-dubai` | `/services/house-clearance` | SC3 | M1 | READY |
| 7 | sofa won't fit through door dubai | `sofa-wont-fit-through-door-dubai` | `/services/sofa-removal` | SC1 | M1 | READY |
| 8 | junk removal service lift dubai | `service-lift-booking-dubai` | `/services/residential-junk-removal` | SC4 | M1 | READY |
| 9 | mattress removal dubai | `mattress-disposal-dubai` | `/services/furniture-removal` | SC1 | M1 | READY |
| 10 | fine for dumping furniture dubai | `illegal-dumping-fines-dubai` | `/services/junk-removal` | SC2 | M1 | BLOCKED · SOURCE |
| 11 | need junk gone today dubai | `junk-gone-today-dubai` | `/services/same-day-junk-removal` | SC3 | M1 | READY |
| 12 | where to donate furniture in dubai | `donate-furniture-dubai` | `/services/furniture-removal` | SC1 | M1 | BLOCKED · SOURCE |
| 13 | palm frond removal dubai | `palm-frond-disposal-dubai` | `/services/garden-waste-removal` | SC1 | M1 | READY |
| 14 | getting bulky items out of a tower dubai | `bulky-items-tower-dubai` | `/services/residential-junk-removal` | SC4 | M1 | READY |
| 15 | NOC to move furniture dubai | `noc-moving-furniture-dubai` | `/services/residential-junk-removal` | SC4 | M1 | BLOCKED · SOURCE |
| 16 | where does junk go after removal dubai | `what-happens-to-your-junk-dubai` | `/` | SC2 | M1 | BLOCKED · CAPABILITY |
| 17 | remove old sofa before new delivery dubai | `old-sofa-before-new-delivery-dubai` | `/services/sofa-removal` | SC1 | M1 | READY |
| 18 | what junk removal companies take dubai | `what-we-take-dubai` | `/services/junk-removal` | SC5 | M1 | READY · BUS. INPUT |
| 19 | AC unit removal dubai | `old-ac-unit-disposal-dubai` | `/services/appliance-disposal` | SC1 | M1 | BLOCKED · SOURCE |
| 20 | washing machine removal dubai | `washing-machine-removal-dubai` | `/services/appliance-disposal` | SC1 | M1 | READY |
| 21 | wardrobe removal dubai | `wardrobe-removal-dubai` | `/services/furniture-removal` | SC1 | M1 | READY |
| 22 | TV disposal dubai | *to assign* | `/services/appliance-disposal` | SC1 | M1 | BLOCKED · SOURCE |
| 23 | move out clearance dubai | *none — consolidated* | `/services/house-clearance` | SC3 | — | **CONSOLIDATED → #6** |
| 24 | will landlord deduct deposit for furniture left dubai | `deposit-deductions-left-furniture-dubai` | `/services/house-clearance` | SC3 | M1 | BLOCKED · SOURCE |
| 25 | how much junk fits in one truck dubai | `how-much-fits-in-one-load-dubai` | `/how-it-works` | SC5 | M1 | READY · BUS. INPUT |
| 26 | garden waste dubai bins | `garden-waste-bins-dubai` | `/services/garden-waste-removal` | SC1 | M1 | BLOCKED · SOURCE |
| 27 | villa handover clearance dubai | `villa-handover-clearance-dubai` | `/services/villa-clearance` | SC3 | M1 | READY |
| 28 | what to do before junk removal arrives dubai | `before-the-crew-arrives-dubai` | `/how-it-works` | SC5 | M1 | READY |
| 29 | skip hire alternative dubai | `skip-hire-vs-junk-removal-dubai` | `/services/waste-removal` | SC5 | M1 | READY |
| 30 | free junk removal dubai | `free-junk-removal-dubai-truth` | `/services/junk-removal` | SC2 | M1 | BLOCKED · SOURCE |

#### Month 2 emphasis

| # | Primary keyword | Proposed slug | Money page | Cluster | Mo. | Status |
|---|---|---|---|---|---|---|
| 31 | office strip out clearance dubai | `office-strip-out-dubai` | `/services/commercial-junk-removal` | SC6 | M2 | READY |
| 32 | office furniture removal dubai | `office-furniture-removal-dubai` | `/services/commercial-junk-removal` | SC6 | M2 | BLOCKED · CAPABILITY |
| 33 | warehouse clearance dubai | `warehouse-clearance-dubai` | `/services/commercial-junk-removal` | SC6 | M2 | READY |
| 34 | out of hours clearance dubai | `out-of-hours-clearance-dubai` | `/services/commercial-junk-removal` | SC6 | M2 | READY · BUS. INPUT |
| 35 | IT equipment disposal dubai | *to assign* | `/services/commercial-junk-removal` | SC6 | M2 | BLOCKED · CAPABILITY |
| 36 | how long does a villa clearance take dubai | `how-long-villa-clearance-dubai` | `/services/villa-clearance` | SC3 | M2 | READY · BUS. INPUT |
| 37 | gated community clearance access dubai | `gated-community-clearance-dubai` | `/services/villa-clearance` | SC4 | M2 | READY |
| 38 | e waste disposal dubai | `e-waste-disposal-dubai` | `/services/appliance-disposal` | SC2 | M2 | BLOCKED · SOURCE |
| 39 | renovation waste removal dubai | `renovation-waste-removal-dubai` | `/services/waste-removal` | SC6 | M2 | BLOCKED · CAPABILITY |
| 40 | soil removal dubai | `soil-sand-pots-disposal-dubai` | `/services/garden-waste-removal` | SC1 | M2 | READY · BUS. INPUT |
| 41 | estate clearance dubai | `estate-clearance-dubai` | `/services/villa-clearance` | SC3 | M2 | READY |
| 42 | IKEA furniture disposal dubai | `flatpack-furniture-disposal-dubai` | `/services/furniture-removal` | SC1 | M2 | READY |
| 43 | moving out of dubai checklist | `leaving-dubai-clearance-checklist` | `/services/house-clearance` | SC3 | M2 | BLOCKED · SOURCE |
| 44 | what can't you throw in dubai bins | `what-dubai-bins-wont-take` | `/services/junk-removal` | SC2 | M2 | BLOCKED · SOURCE |
| 45 | junk removal companies in dubai | `choosing-junk-removal-dubai` | `/` | SC5 | M2 | READY |

---

## §5 · Claimed keyword index

**The cannibalization guard.** Before commissioning anything, check here. One keyword, one URL — always.

The rule from `keywords.md` restated only as a lookup instruction: **if a proposed primary keyword already appears below, the article does not get created.** Either the existing owner is improved, or the proposal is dropped.

### 5.1 · Claimed by money pages — permanent, never available to an article

These are owned by service, area and static pages. **An article may never claim one of these as its primary keyword.** Source of truth: the *Service Keyword Clusters* and *Existing Page Keyword Ownership* tables in `keywords.md`.

| URL | Primary keyword claimed |
|---|---|
| `/` | junk removal dubai |
| `/services/junk-removal` | junk removal service dubai |
| `/services/garbage-removal` | garbage removal dubai |
| `/services/furniture-removal` | furniture removal dubai |
| `/services/sofa-removal` | sofa removal dubai |
| `/services/appliance-disposal` | appliance disposal dubai · fridge disposal dubai |
| `/services/waste-removal` | waste removal dubai |
| `/services/garden-waste-removal` | garden waste removal dubai |
| `/services/house-clearance` | house clearance dubai |
| `/services/villa-clearance` | villa clearance dubai |
| `/services/same-day-junk-removal` | same day junk removal dubai |
| `/services/residential-junk-removal` | residential junk removal dubai |
| `/services/commercial-junk-removal` | commercial junk removal dubai |
| `/areas/{slug}` × 30 | junk removal {area} — one per area page |
| `/services` · `/areas` | Hubs. No commercial claim. |
| `/how-it-works` | how junk removal works dubai |
| `/contact` | book junk removal dubai · junk removal quote dubai |

**Also unavailable:** every term listed in a money page's `Secondary` column in `keywords.md`. Those live on the owning page, never on a new URL. That is roughly 170 of the 283 mapped keywords — **the largest bucket by design, and the main reason this system does not cannibalize itself.**

### 5.2 · Claimed by published articles

**Currently empty.** Each published article adds exactly one row.

| Keyword | Owning URL | ID | Claimed on |
|---|---|---|---|
| — | *No claims yet* | — | — |

### 5.3 · Reserved by the queue

The 45 queued primaries in §4 are **reserved but not claimed**. A reservation blocks a duplicate proposal; it does not block the topic being dropped or reassigned. A reservation becomes a claim only at publish.

### 5.4 · The check, in order

1. Is the proposed primary in **5.1**? → Stop. A money page owns it.
2. Is it in a money page's **Secondary** column in `keywords.md`? → Stop. Strengthen that page instead.
3. Is it in **5.2**? → Stop. An article owns it. Improve that article (`content-rules.md` §25).
4. Is it in **5.3**? → It is already queued. Use the existing entry; do not create a second.
5. Is it mapped in `keywords.md` at all? → If not, it goes through the admission process in *Data-Driven Keyword Expansion* **before** anything is written.
6. Clear on all five? → Proceed, and add the claim at publish.

---

## §6 · Reverse-link ledger

`content-rules.md` §13 requires every published article to carry **at least one meaningful inbound internal link**, and the blog index does not count. This is where that gets recorded, so a missing one is visible rather than assumed.

### 6.1 · Inbound links to articles

**Currently empty.**

| Article | Inbound from | Type | Anchor used | Applied |
|---|---|---|---|---|
| #7 `sofa-wont-fit-through-door-dubai` | `/services/sofa-removal` § “Getting a sofa out of an apartment” | service | “what we measure and why” | ☐ planned |
| #6 `end-of-tenancy-clearance-dubai` | `/services/house-clearance` § “Move-outs, handovers and inspections” | service | “what has to be gone before handover” | ☐ planned |
| #13 `palm-frond-disposal-dubai` | `/services/garden-waste-removal` § “Green waste we collect” | service | “what to do with cut palm fronds” | ☐ planned |
| #11 `junk-gone-today-dubai` | `/services/same-day-junk-removal` § “What makes a same-day slot possible” | service | “what decides whether today works” | ☐ planned |
| #27 `villa-handover-clearance-dubai` | `/services/villa-clearance` § “Every part of the villa” | service | “the spaces that get missed” | ☐ planned |
| #8 `service-lift-booking-dubai` | `/services/residential-junk-removal` § “Building permissions and service lifts” | service | “how a lift booking actually works” | ☐ planned |
| #20 `washing-machine-removal-dubai` | `/services/appliance-disposal` § “Strapped, trolleyed, out in one visit” | service | “what to check before the crew arrives” | ☐ planned |

*Type:* `service` · `area` · `article` · `pillar`.
*Anchor used* is recorded so that `content-rules.md` §14's anchor-diversity rule can actually be checked across the corpus — the only way to notice the same exact-match anchor appearing six times is to have written them all down.

### 6.2 · Planned reverse-link slots

`keywords.md` contains a *Reverse-link opportunities from existing content* table mapping each service page's existing sections to the articles that should link down from them. **Those are the intended slots.** As each article publishes, record the applied link in 6.1 and tick it here.

| Money page | Existing section | Planned link down | Applied |
|---|---|---|---|
| `/services/junk-removal` | "What we cannot take" | what-dubai-bins-wont-take · illegal-dumping-fines-dubai | ☐ |
| `/services/furniture-removal` | "Usable furniture is passed on" | donate-furniture-dubai · dispose-old-furniture-dubai | ☐ |
| `/services/sofa-removal` | "Getting a sofa out of an apartment" | sofa-wont-fit-through-door-dubai · service-lift-booking-dubai | ☐ |
| `/services/appliance-disposal` | "Where old appliances go" | dispose-fridge-dubai · e-waste-disposal-dubai | ☐ |
| `/services/house-clearance` | "Move-outs, handovers and inspections" | end-of-tenancy-clearance-dubai | ☐ |
| `/services/villa-clearance` | "Gate access and community rules" | gated-community-clearance-dubai · villa-handover-clearance-dubai | ☐ |
| `/services/garden-waste-removal` | "Green waste we collect" | palm-frond-disposal-dubai | ☐ |
| `/services/residential-junk-removal` | "Building permissions and service lifts" | service-lift-booking-dubai · noc-moving-furniture-dubai | ☐ |
| `/services/same-day-junk-removal` | "What makes a same-day slot possible" | junk-gone-today-dubai | ☐ |
| `/services/commercial-junk-removal` | "Out of hours and on a schedule" | out-of-hours-clearance-dubai · office-strip-out-dubai | ☐ |
| `/how-it-works` | process steps | junk-removal-cost-dubai · how-much-fits-in-one-load-dubai | ☐ |

**A reverse link is applied by editing the existing page's copy at that point** — not by appending a link list. If the sentence does not want the link, the link is wrong (`content-rules.md` §12, R5).

### 6.3 · Orphan watch

Any article in §3 with an empty **Inbound** column is an orphan and **must not have been published.** If one appears here, it is a process failure: fix the link immediately and log it in §12.

| Article | Days without inbound | Action |
|---|---|---|
| — | *None* | — |

---

## §7 · Verification and unblocking ledger

**19 of 45 queued articles are blocked; a further 6 need business input.** Grouped by what unblocks them, because these resolve in batches — one session with the official Municipality sources clears most of the first group.

### 7.1 · BLOCKED — source verification required (15)

Unblocked by verifying against a **primary official source** and citing it. Competitor blogs are not acceptable (`content-rules.md` §7).

| # | Primary keyword | Money page |
|---|---|---|
| 1 | how to dispose of old furniture in dubai | `/services/furniture-removal` |
| 2 | how to dispose of a fridge in dubai | `/services/appliance-disposal` |
| 4 | dubai municipality bulky waste collection | `/services/junk-removal` |
| 5 | junk removal vs municipality collection dubai | `/services/junk-removal` |
| 10 | fine for dumping furniture dubai | `/services/junk-removal` |
| 12 | where to donate furniture in dubai | `/services/furniture-removal` |
| 15 | NOC to move furniture dubai | `/services/residential-junk-removal` |
| 19 | AC unit removal dubai | `/services/appliance-disposal` |
| 22 | TV disposal dubai | `/services/appliance-disposal` |
| 24 | will landlord deduct deposit for furniture left dubai | `/services/house-clearance` |
| 26 | garden waste dubai bins | `/services/garden-waste-removal` |
| 30 | free junk removal dubai | `/services/junk-removal` |
| 38 | e waste disposal dubai | `/services/appliance-disposal` |
| 43 | moving out of dubai checklist | `/services/house-clearance` |
| 44 | what can't you throw in dubai bins | `/services/junk-removal` |

**Verification batches** — resolving these four clears most of the group:

| Batch | Covers | Unblocks |
|---|---|---|
| **A · Municipality bulky waste** | The service, its channels, eligibility, any ground-level/carry-down limit, any area exclusions | 1, 2, 4, 5, 12, 30 |
| **B · Waste rules and penalties** | What may not go in bins, dumping prohibitions, any fines | 10, 26, 44 |
| **C · E-waste and appliances** | Classification of fridges, ACs, TVs; refrigerant handling requirements | 2, 19, 22, 38 |
| **D · Tenancy and building rules** | Deposit/handover norms, NOC requirements | 15, 24, 43 |

**Record each verification below as it completes** — so the next article on the same fact reuses the source instead of re-researching it.

| Fact verified | Source (URL) | Date checked | Checked by | Re-check due |
|---|---|---|---|---|
| — | *None yet* | — | — | — |

### 7.2 · BLOCKED — service capability confirmation required (4)

Unblocked by the business confirming — and being able to evidence — the capability. **If it cannot, the claim is removed or the article dropped.**

| # | Primary keyword | Capability to confirm |
|---|---|---|
| 16 | where does junk go after removal dubai | The actual disposal chain and any licensed-handler relationships |
| 32 | office furniture removal dubai | What genuinely happens to collected office furniture |
| 35 | IT equipment disposal dubai | Data-secure handling, if claimed |
| 39 | renovation waste removal dubai | Construction/renovation waste capability and any licensing |

### 7.3 · READY — business input required (6)

Unblocked by the business supplying real figures. **None may be invented, estimated or taken from a competitor** (`content-rules.md` §18).

| # | Primary keyword | Input needed |
|---|---|---|
| 3 | junk removal cost dubai | Real price bands the business will honour |
| 18 | what junk removal companies take dubai | The genuine acceptance and exclusion list |
| 25 | how much junk fits in one truck dubai | Actual truck capacities |
| 34 | out of hours clearance dubai | Whether out-of-hours work is genuinely offered |
| 36 | how long does a villa clearance take dubai | Real durations from completed jobs |
| 40 | soil removal dubai | Weight limits for soil, sand and pots |

### 7.4 · Cross-file dependencies that block publishing entirely

These block **every** article, not individual ones.

| # | Dependency | Source | Status |
|---|---|---|---|
| **D-1** | **A real author record** — required relationship; `content-rules.md` §6 forbids inventing one | `content-rules.md` B-1 | ☐ Open |
| **D-2** | **Cover image supply** — required to publish; depends on D-3. **Tracked per article in [`image-backlog.md`](./image-backlog.md)** (IB-1 to IB-4, all `NEEDED`). | `image.md` I-2 | ☐ Open |
| **D-3** | ~~Provenance of the existing photographs~~ — **RESOLVED 2026-09-20: AI-generated**, C2PA-confirmed. Library unusable for article covers under `image.md` §7; Route D closed. **Does not unblock D-2** — it redirects it to licensed stock or own photography. | `image.md` I-1 | ☑ **Closed** |
| **D-4** | **`BLOB_READ_WRITE_TOKEN` set** — otherwise uploads are invisible to the live site | `image.md` I-4 | ☐ Open |
| **D-5** | **Analytics and Search Console** — nothing is measurable until configured | `keywords.md` Measurement Plan | ☐ Open |
| **D-6** | **C-1 / C-2 pre-publish SEO review** — sign off before publishing at volume | `keywords.md` Cannibalization Map | ☐ Open |
| **D-7** | ~~#6 / #23 slug collision~~ — **RESOLVED 2026-09-20.** Approved decision: #23 consolidated into #6; `move out clearance dubai` is a secondary keyword of `/blog/end-of-tenancy-clearance-dubai`. `keywords.md` corrected to match cluster row H9. | §4.1 | ☑ **Closed** |

> **D-1 and D-2 are the binding ones.** Until an author exists and a cover image can be supplied, **no article can publish regardless of how many are written.** Clearing them is worth more than clearing any verification batch.

---

## §8 · Retired, merged and redirected

Changing a published slug writes a 301 automatically, but the decision still needs recording — a redirect nobody remembers creating is a redirect nobody dares remove.

**Currently empty.**

| Old slug | New destination | Reason | Date | Logged by |
|---|---|---|---|---|
| — | *None* | — | — | — |

**When to merge rather than add** (`content-rules.md` §25): if two articles compete, fold the weaker into the stronger, redirect it, release its keyword claim in §5.2, and log it in §12. **Two half-ranking pages are worth less than one that ranks.**

---

## §9 · Maintenance schedule

Driven by the **Facts** column in §3.

| Facts value | Meaning | Re-check |
|---|---|---|
| **`none`** | Rests only on operational knowledge | On material service change |
| **`sourced`** | Rests on external facts — Municipality, legal, charity, regulatory | **Every 6 months, and whenever the source changes.** Rules and channels change without notice; a stale regulatory article is worse than none |
| **`business`** | Contains business-supplied figures — prices, capacities, durations, availability | **Whenever the underlying figure changes.** A wrong price produces a bad enquiry and a bad first impression |

### Standing checks

| Cadence | Check |
|---|---|
| **Per publish** | §3, §5.2 and §6.1 rows added |
| **Weekly** | Orphan watch (§6.3); any new reverse-link slots now available |
| **Fortnightly** | `sourced` articles whose sources may have moved; external links still resolve |
| **Monthly** | Full registry integrity check (§11); reconcile §5 against `keywords.md` |
| **On Search Console signals** | Two URLs alternating on one query → cannibalization. Check §5, resolve per `keywords.md`, log in §12 |

---

## §10 · Adding an entry — worked example

The shape of a complete registration. **Illustrative only — this article is blocked and not written.**

```
AT COMMISSIONING
  §4  Row 13 status → CLEARED, marked commissioned
  §3  New record, state DRAFTING (not live, Published date empty):
      ID 13 · slug palm-frond-disposal-dubai · archetype A · cluster SC1
      primary keyword "palm frond removal dubai"
      money page /services/garden-waste-removal
      areas jumeirah, arabian-ranches, the-springs

AT PUBLISH
  §3  state → PUBLISHED · Published date set 2026-XX-XX · last reviewed same
      (now, and only now, the URL must resolve publicly)
      facts: none  (operational knowledge only — no Municipality claim)
      inbound: /services/garden-waste-removal
  §5.2 New claim:
      "palm frond removal dubai" → /blog/palm-frond-disposal-dubai · ID 13
  §6.1 New inbound row:
      from /services/garden-waste-removal, section "Green waste we collect"
      type service · anchor "what to do with cut palm fronds"
  §6.2 Tick the garden-waste row
  §12  Log the publish

IF A BLOCK HAD CLEARED FIRST
  §7.1 Record the fact, its source URL, the date and the re-check due date
       — so the next article resting on it reuses the source
```

---

## §11 · Registry integrity checks

Run monthly. **The registry's only value is being true.**

**Checks are state-aware** — a draft is not a broken published article.

**Live state**
- [ ] Every article live at `/blog` has a `PUBLISHED` or `UPDATED` record in §3
- [ ] Every `PUBLISHED` / `UPDATED` record resolves at its `/blog/{slug}` and has a **Published** date
- [ ] Every `PUBLISHED` / `UPDATED` record has its primary keyword in §5.2, exactly once
- [ ] Every `PUBLISHED` / `UPDATED` record has a non-empty **Inbound** value (§6.3)

**In-progress state**
- [ ] Every `DRAFTING` / `REVIEW` record is a valid record — **but is not expected to be live**, has no Published date, and holds no §5.2 claim yet
- [ ] No `DRAFTING` / `REVIEW` record has been sitting unchanged long enough to be abandoned rather than in progress

**Ended state**
- [ ] Every `MERGED` / `RETIRED` record has a matching §8 row, and its old slug still redirects
- [ ] Any keyword released by a merge or retirement has been removed from §5.2

**Uniqueness and ownership**
- [ ] **No two active records (`DRAFTING` → `UPDATED`) hold the same slug**
- [ ] **No consolidated opportunity has become an article** — #23 remains `CONSOLIDATED → #6` with no slug, no record in §3 and no claim in §5.2 (§4.1)
- [ ] **No opportunity marked consolidated has entered `DRAFTING`** — consolidation is a queue status; it never enters the §2 lifecycle
- [ ] No §5.2 claim duplicates a §5.1 money-page claim or a `keywords.md` secondary
- [ ] Every §5.2 keyword is mapped in `keywords.md`

**Content discipline**
- [ ] Every article reaching `REVIEW` has a completed claim audit (`content-rules.md` §7)

**Reconciliation**
- [ ] §4 statuses match the Article Opportunity Map in `keywords.md`
- [ ] §7 ledgers reconcile with §4 statuses
- [ ] Every `sourced` published article has a verification row in §7.1 with a live source
- [ ] No published article is past its re-check date (§9)
- [ ] §12 has an entry for every change since the last check

**If a check fails, fix the registry before writing anything else.** A ledger that is 90% true is trusted and wrong, which is worse than one that is obviously empty.

---

## §12 · Change log

Every change to the registry, newest first. **One line per change.** This is what makes the audit trail real.

Format: `YYYY-MM-DD · what changed · why · who`

| Date | Change | Reason |
|---|---|---|
| 2026-09-20 | **Batch completed through stage 4 of the production workflow.** Claim audit run on #6, #7, #11, #13 (13 corrections). Full SEO written for all seven — title, description, canonical, noIndex, OG title/description. Drafts updated in Payload. **Images remain the sole blocker (0 of 21 slots); reverse links held until publish to avoid live 404s.** | Applying the seven-stage workflow to the existing batch. |
| 2026-09-20 | **All seven drafts imported into Payload** via `scripts/import-drafts.ts`; author record `Junk Services Dubai Team` created. All at `_status: draft`, 0 published, no cover images. **#6, #7, #11 and #13 predate the claim-audit rule and still need that pass before `REVIEW`.** | Articles moved from documents into the CMS. |
| 2026-09-20 | Three further articles commissioned and registered at `DRAFTING` (#27, #8, #20). Reverse links recorded; covers IB-5/6/7 opened. **Route C confirmed as the active cover-sourcing route**; IB-AUDIT-1 logged as deferred. | Content workflow continued; covers resolved in parallel. |
| 2026-09-20 | **D-3 resolved** — existing image library determined AI-generated via signed C2PA credentials. Recorded in `image.md` §7 and §16; Route D closed in the backlog. D-2 remains open and now points at licensed stock or own photography. | Forensic inspection of file provenance. |
| 2026-09-20 | Four articles commissioned and registered in §3 at `DRAFTING` (#6, #7, #11, #13). Planned reverse links recorded in §6.1. [`image-backlog.md`](./image-backlog.md) created and linked from D-2. §4 Status values deliberately left unchanged to preserve the §11 parity check. | Articles written and QA’d; held pending cover images. |
| 2026-09-20 | **D-7 resolved.** Approved decision applied: #23 consolidated into #6. `keywords.md` corrected (Article Map rows 6 and 23, cluster row H9, consolidation and accounting note). Registry updated: queue row 23 → `CONSOLIDATED → #6` with no slug, §4.1 rewritten as resolved, D-7 closed, counts restated as 45 IDs / 44 commissionable, §11 checks updated. | Resolves the `keywords.md` contradiction between H9 (consolidated) and Article Map row 23 (separate). |
| 2026-09-20 | §3 renamed *Published articles* → *Active article records*; lifecycle corrected so a record exists from `DRAFTING` onward and only `PUBLISHED`/`UPDATED` imply a live URL (§0, §1, §3, §10, §11 aligned). §4.1 added recording the unresolved #6/#23 slug collision; #23 set to HELD with no slug. D-7 added. §11 rewritten as state-aware checks. | v1 lock review. |
| 2026-09-20 | Registry created. Queue seeded with the 45 mapped opportunities from `keywords.md`; §5.1 populated from the money-page ownership tables; §7 ledgers built from the article statuses; §3, §5.2, §6.1 and §8 initialised empty. | Baseline. 0 published articles, verified against `/blog`. |

---

*End of `article-registry.md`. The state layer for [`keywords.md`](./keywords.md), [`content-rules.md`](./content-rules.md), [`content-structure.md`](./content-structure.md) and [`image.md`](./image.md). Those four decide; this one records.*
