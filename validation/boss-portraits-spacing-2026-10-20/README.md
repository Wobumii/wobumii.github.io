# Guide portraits, spacing and hero covers — 2026-10-20

Added the five existing QUINTARC boss portraits to the boss ability cards.
All 20 normal mobs and five bosses now have the same dark #14121e background
as the spell artwork, retaining grayscale by default and color on hover.
The existing portrait geometry and source artwork are unchanged.

Both game guides now leave 60px below the final Back to the collection button
before the feedback panel. Both hero covers are noninteractive div elements;
image sources, aspect ratios, alt text and color reveal are retained.
Shared CSS content hashes were refreshed across all four site pages.

Playwright verified both guides at 1440, 960 and 390px: the gap measures 60px,
hero covers have no links or tabindex, all 25 QUINTARC portraits are present,
and all 126 spells remain. Screenshots were inspected; local captures and the
CLI check transcript are in output/playwright/boss-portraits-spacing/.
A tall section screenshot includes the sticky header overlay from browser
capture; it does not indicate a content change. git diff --check passes.

Checks were completed locally before publication. The user subsequently authorized
committing and pushing these changes to the GitHub Pages main branch.
Game source projects were not modified.
