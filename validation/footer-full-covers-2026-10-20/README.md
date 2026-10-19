# Website follow-up — 2026-10-20

All four page footers now use the Wobumii wordmark, separator dot and a YouTube
icon linking to @Wobumii; old social links are removed. Header/footer wordmark
sizes match: 168px desktop/tablet, 155px mobile. About Me now says: “Using AI
doesn’t automatically make something low quality. The result depends on how the
person uses the tool.”

Project Pencil and QUINTARC cards use full original 63:50 artwork, with equal
cover heights. QUINTARC's shortened wide source is replaced with its full cover.
Guide covers retain native proportions and open their full source images. Hover
and keyboard focus reveal source colors. Mob/item cards reveal all child artwork
on hover. Linked stores reveal brand colors; unavailable stores remain monochrome.

The 70 QUINTARC corner symbols are now alphabetical native disclosure tiles with
uniform icon/title/count headers and full spell details beneath. All 126 spell
entries are preserved exactly once. A separate symbol/spell/effect filter supplies
count, no-results and Clear states. Shared guide/mob card heading, portrait and
paragraph spacing is normalized. Existing spellbook filtering remains functional.

Playwright verified four pages at 1440/960/390px, equal cover frames, full cover
ratios, footer URL/order, matched logos, consistent symbol header heights
(110/110/104px), expand/collapse, symbol search/empty/Clear and spell filtering.
Read-only screenshot pixel checks verify gray/default and colored hover/focus
states and unchanged disabled-store appearance. Captures remain in workspace
output/playwright/wobumii; results.json records the checks. The initial color
assertion was adjusted to tolerate below-0.1% antialiasing fringes rather than
mistaking those pixels for an active color reveal. No game sources/builds changed.
