# Next three article briefs — article date 2026-10-16

These are the first **repository posts**. Each is a Markdown body in `articles/` plus an entry in `content/file-posts.js`, with no admin or database step (see *Repository publishing* in `article-presentation.md`). They go live on the next successful deployment. Each promotes a mapped SUPPORT row in `keywords.md` to an article URL; the service pages keep the transactional terms.

| ID | Primary keyword | Title / H1 | Slug | Excerpt | Primary service | Cover | Body image |
|---|---|---|---|---|---|---|---|
| N-18 | dryer disposal dubai (E13) | Getting Rid of a Tumble Dryer: Unplug, Empty, Unstack, Collect | `dryer-disposal-dubai` | Check the dryer is yours to remove, empty any water, deal with the vent hose or stacking kit, then send photos of the machine and the route out of the laundry space. | `appliance-disposal` | laundry room (Media 73 asset) | accepted vs excluded (117) |
| N-19 | dining table removal dubai (C20) | Glass, Stone or Wood? How a Dining Table Leaves the Apartment | `dining-table-removal-dubai` | The top decides the job: wood can be unbolted, glass lifts off a frame and stone needs careful support. Count the chairs, measure the longest piece and pick a route. | `furniture-removal` | old furniture by a doorway (104) | tower route measurement (83) |
| N-20 | armchair removal dubai (D12) | Wingback, Recliner or Swivel? Getting an Old Armchair Out | `armchair-removal-dubai` | An armchair's arms, back and any recliner mechanism decide how it leaves. Close and unplug it, measure its widest point and choose a route before you book a collection. | `furniture-removal` | worn armchair beside boxes (88) | armchair route options (105) |

## Images

All six slots reuse existing Vercel Blob assets by URL, with no upload, generation or download. Alt text is the stored alt text of the original Media documents. See `image-backlog.md`.

## Inbound links

- **Live with the deployment:** dining table ↔ armchair, since both are repository posts.
- **Pending CMS sync (added to the Markdown only):**
  - washing-machine-removal → dryer
  - dispose-old-furniture → dining table and armchair

## Open items

- The build still reads services, areas and settings from Neon. The first deployment of these posts needs the database reachable again: either the network-transfer allowance resets or the project moves to a new database.
- Push the transfer fix (`43e45af`) with or before these posts.
