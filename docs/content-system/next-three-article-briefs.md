# Next three article briefs — article date 2026-10-25

**Status 2026-10-29:** N-45, N-46 and N-47 below are published. The next publishable plan items were C25 and H24 (published 2026-10-29). G22 remains blocked on owner confirmation, so it was not written.

These are **repository posts**. Each is a Markdown body in `docs/content-system/articles/` plus an entry in `content/file-posts.js`, with no admin or database step (see *Repository publishing* in `article-presentation.md`). Each promotes an existing mapped SUPPORT row in `keywords.md` to a deliberately narrow article URL. The three service pages keep the broad transactional booking terms.

| ID | Primary keyword | Title / H1 | Slug | Excerpt | Primary service | Cover | Body image |
|---|---|---|---|---|---|---|---|
| N-45 | bulky item pickup dubai (A18) | Bulky-Item Pickup: Show the Object and the Whole Route | `bulky-item-pickup-dubai` | Name every large item, show its condition, measure the largest rigid part, photograph each route restriction, and confirm the building loading window. | `junk-removal` | `old-furniture-disposal-cover` | `old-furniture-disposal-cover` |
| N-46 | next day junk removal dubai (B9) | Next-Day Junk Removal: Use Tonight to Make Tomorrow Work | `next-day-junk-removal-dubai` | Confirm the date and deadline, freeze the load, secure building access, prepare awkward items, and give collection a clear window before tomorrow arrives. | `same-day-junk-removal` | `before-crew-arrives-cover` | `before-crew-arrives-cover` |
| N-47 | old appliance removal dubai (E10) | Old Appliance Removal: Release Every Unit Before Collection | `old-appliance-removal-dubai` | List every appliance, confirm ownership, assign disconnection, empty and drain each unit, then coordinate one clear route with replacement deliveries. | `appliance-disposal` | `fridge-disposal-cover` | `fridge-disposal-cover` |

## Mapping and cannibalization boundary

- A18 owns the information needed to assess a specific bulky object: complete item identification, condition, useful photographs, the largest rigid component and the complete route. General acceptance and booking stay with `/services/junk-removal`; tower logistics and individual furniture guides keep their detail.
- B9 owns the overnight preparation window after same-day is unavailable: fixed date and deadline, frozen load, access confirmation, dependencies and a fallback. `/services/same-day-junk-removal` keeps urgent booking intent, and the existing same-day article keeps the question of whether collection today is possible.
- E10 owns coordination of several unlike old appliances in one collection: ownership, a unit-by-unit release register, draining, route order and replacement-delivery sequencing. Individual appliance guides keep item-specific preparation; `/services/appliance-disposal` keeps the broad transaction.
- All three are qualitative editorial tests without Search Console or Keyword Planner demand evidence. Review at Day 30 and Day 60 and consolidate if an article competes with its money page.

## Images

All slots reuse existing Vercel Blob assets by key, with no upload, generation or download. Alt text is the stored alt text in `fileImages`. See `image-backlog.md`.

## Inbound links

- before-the-crew guide → bulky-item pickup
- same-day reality guide → next-day junk removal
- fridge-disposal guide → multi-appliance removal

All three are dated 2026-10-25 in Dubai time.
