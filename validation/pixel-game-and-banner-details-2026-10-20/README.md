# Idea Hop and banner details — 2026-10-20

The studio panel header and footer are retained. Only the middle artwork is
replaced by Idea Hop, a small black-and-white pixel platformer. Collect five sparks
and reach the flag using arrows/A/D and Space, or the touch controls. Escape and
the toolbar pause; restart and Play Again reset the level. Falling retains sparks.

320×240 native canvas uses authored pixel geometry, fixed-step physics and one-way
platform landings. No external assets, audio, storage or network calls. The loop
runs only during play and stops on pause, win, off-screen, visibility loss or blur.
Keyboard handling is scoped to the canvas. Native buttons and polite status text
provide controls/status outside the canvas. A noscript notice preserves browsing.

The owner's corrected YouTube/itch banners informed sparse CSS registration
crosses, a small dot grid, diagonal hatching and a panel corner mark. There are no
new heavy textures, raster edits, looping decoration animations or overlay links.

Playwright completes the entire level using normal keyboard timing: 2/5, 3/5,
4/5, then win. No game state injection. Start/Pause/Resume/Escape/Restart and
leaving the viewport pass at 1440, 960, 390 and 320px. Canvas retains 4:3 ratio
and panel stays within viewport. Touch-enabled mobile Play and Jump taps pass;
before/jump captures differ. Screenshots were inspected and remain in workspace
output/playwright/wobumii. No physical touch-hardware/performance claim. No game
projects, saves, binaries, or storefront edits are part of this website commit.
