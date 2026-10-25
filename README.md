# Wobumii

**Indie games by Anthony, a game developer from the Philippines.**

[Visit the portfolio](https://wobumii.github.io/) · [Project Pencil guide](https://wobumii.github.io/games/project-pencil/) · [QUINTARC guide](https://wobumii.github.io/games/quintarc/)

I’m Anthony, the creator behind Wobumii. With experience in Web Design and UI/UX Design and a current role as a Product Manager, I’m turning a lifelong love of games into playable worlds.

- **Project Pencil:** a first-person drawing adventure where sketches become tools, weapons, and new ways forward.
- **QUINTARC:** elemental spellcasting with five elements, 126 spells, a narrative campaign, and arena modes.

Both games are in development. This repository hosts their portfolio and player guides, including a searchable spell grimoire.

A lightweight static website for GitHub Pages. No build step or dependencies are required.

## Preview

Run `python3 -m http.server 8080` in this directory, then open http://localhost:8080.

## Pages

- `index.html`: introduction, three-column game collection, and background.
- `games/project-pencil/index.html`: overview, drawing mechanics, equipment, story, modes, controls, and FAQ.
- `games/quintarc/index.html`: mechanics, modes, arenas, campaign, controls, and 126 searchable spell entries.

## Publishing

GitHub Pages is configured to serve `main` at the repository root. Push the reviewed files to `main` to deploy. `.nojekyll` enables plain static delivery.

## Editing

Edit HTML directly; shared styles and behavior live in `style.css` and `site.js`. To add a game, replace the third placeholder card with a link and create its dedicated page. All content and navigation work without JavaScript; JavaScript adds spell filtering.

## Content and artwork

Game copy was checked against Project Pencil README and QUINTARC README, STORY_CAMPAIGN, SPELL_CATALOG, and generated spell descriptions on 2026-09-29. Development details may change. Store links lead to itch.io; native platform and hardware validation claims remain limited to recorded release checks.

The existing Project Pencil cover and QUINTARC seal are reused from the owner’s game projects. The seal incorporates the previously licensed open-book silhouette from Game-icons.net; see `assets/ATTRIBUTION.md`. The W emblem and wordmark are supplied Wobumii studio artwork.

## Studio branding

Header/footer wordmarks use the supplied black-and-white `assets/wobumii-wordmark.png`. Every page uses the supplied `assets/wobumii-icon.png` as its favicon. Both originals are copied unchanged. The theme uses black and white, heavy borders, square panels, oversized type, offset shadows and monochrome artwork. Game card covers share an 63:50 frame with contained images; flexible text sections keep their footers aligned. Keep this shared sizing for future games.

The About Me section contains Anthony’s revised biography and his perspective on AI as a creative tool. Email links use wobumii.games@gmail.com. Canonical URLs, sitemap and structured data use https://wobumii.github.io/. The footer pairs the studio wordmark with separator dots plus YouTube (@Wobumii) and itch.io icons linking to the studio profiles. Game art is monochrome by default and reveals its original colors on hover or keyboard focus; guide covers display the full original image.

## Search and social metadata

Each page has a unique title and description, an absolute canonical URL, Open Graph and Twitter card metadata, and JSON-LD describing the studio, developer, website, or game. The game guides include breadcrumb data. No ratings, release dates, or download offers are invented.

`robots.txt` permits crawling and points to `sitemap.xml`. After adding a page, add its entry in `tools/update_seo.py` and run `python3 tools/update_seo.py` to regenerate metadata and the sitemap. Image dimensions must match the original PNGs.

Repository topics help discovery on GitHub. Indexing and rankings are determined by search engines; these changes do not establish indexing. Google Search Console ownership verification and sitemap submission have not been performed.

References: [Google structured data guidance](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data), [Google sitemap guidance](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Game reference content

Project Pencil includes all 30 drawing recipes plus the permanent Pencil, seven base mobs, and its named guardians. QUINTARC includes 20 normal mobs, five elemental bosses with separate Story and Survival encounter rules, and all 126 matching skill icons. `validation/guide-content-sources.json` records source paths, names, and copied icon hashes. Icon attribution is on the Credits page and in `assets/skill-icons/LICENSE.txt`.

Item and mob portraits are 512px Godot captures from isolated copies of the source geometry and licensed models, with Hole rendered from its actual recipe strokes. Original game projects were not edited.

## Updating the QUINTARC guide

Run `python3 tools/sync_quintarc.py --source /path/to/quintarc` after verifying the game changes. This synchronizes all 126 descriptions, recipes, icons and the game favicon from the runtime registry. Review and browser-check the generated page before pushing main.

## Clean URLs and feedback

Pages live at `/games/project-pencil/`, `/games/quintarc/`, and `/credits/`. The former `.html` paths redirect, preserving query strings and anchors with JavaScript. Edit the directory `index.html` pages. Feedback uses the displayed email address; no sending service is configured.

Refresh the skill guide with `python3 tools/sync_quintarc.py --source /path/to/quintarc`, then run `python3 tools/update_seo.py`.

## Player guide presentation

Keep release notes and version-change announcements on the dedicated itch.io pages. The website is an evergreen player guide. Spell cards use equal grid-row heights and a bottom-aligned mana/cooldown and key footer; keep filtering compatible with their flex layout. Verified at 1440, 960 and 390px in `validation/menu-cards/`.

## Skill detail layout — 2026-10-01

QUINTARC spell cards mirror the in-game grimoire: the runtime summary sits above
 two columns of labeled base stats, followed by the aligned key footer. The sync
script uses Godot (`godot` on PATH) to export `QuintarcSkills.details()` directly
so labels, special-case values, and column ordering stay consistent with the game.
Search includes summaries, full descriptions, and the displayed stats.
Verified all 126 cards and search/clear/empty states at 1440, 960, and 390px;
screenshots and results are in `validation/skill-details/`. The current verification is in `validation/skill-layout-current/`: all 126 cards
match the runtime summaries and two-column details at 1440, 960 and 390px.
Card order is icon/name, element combination, description, effects, then keys.
Personal shields use hold/release; invisibility hides both teams and damaging
hits reveal a transparent silhouette without friendly damage.

## Guide layout and color interactions

Header and footer wordmarks share the same sizes: 168px on desktop/tablet, 155px on mobile. Both game covers retain their full 63:50 original proportions. Game-guide hero covers are noninteractive artwork. Cards, guide covers, mob portraits and item artwork reveal their source colors on hover; spell cards also support keyboard focus. Store-brand colors apply only to linked store buttons, with disabled stores remaining monochrome.

The QUINTARC symbol guide uses 84 alphabetically ordered native details tiles, preserving all 126 spell interactions. Search by symbol, spell name or effect; expanding a tile reveals its complete list. Closed tiles share consistent header heights. Mob/guide headings, portraits and paragraph spacing use the shared card styles.

## Homepage mini game

`idea-hop.js` powers the studio panel's Idea Hop platformer. The middle panel is a 320×240 pixel canvas with keyboard and touch controls; surrounding studio labels remain. Collect five sparks, then reach the flag. It starts only on Play and pauses when off-screen or inactive. The SEO generator adds this script only to the homepage with a content hash. Decorative crosses, dots and diagonal accents follow the owner's corrected Wobumii banners.

## Guide portraits and spacing — 2026-10-20

QUINTARC displays all five boss portraits alongside their spells and ultimates.
Its 20 mob and five boss portraits use the spell icons’ dark background (#14121e),
with the existing grayscale and hover color reveal. Both game guides leave 60px
between the final collection button and the feedback panel. Hero cover images
are noninteractive, retaining their full proportions and hover color treatment.
Browser checks at 1440, 960 and 390px are recorded in
`validation/boss-portraits-spacing-2026-10-20/`.

Project Pencil’s seven mob portraits share QUINTARC’s full-width 180px-high
rectangular frame. Their background extends the original artwork’s #141c30
backdrop across the frame, removing the square-on-white appearance.

## Game development disclosure

Both game guides include a creative ownership and AI disclosure in their overview: story and mechanics by Anthony, assets from credited creators, AI used only as a coding assistant, and no AI-generated artwork.

## Player guide and credits refresh — 2026-10-26

Guides match deployed Project Pencil 0.6.36 and QUINTARC 0.1.15. Both have five native scene screenshots, staged for feature illustration. Current item/enemy portraits use the game’s active asset renderers. Pencil now documents the stone titan, skeletons, five slots, surface-specific drawing and multiplayer souls; QUINTARC documents four spell slots, Survival, current Mage customization, creature models, dome shields and all 126 current spells and symbol descriptions. Credits copy all current source notices while preserving historical licenses. The obsolete GitMastery inspiration credit has been removed at the owner’s request. See validation/store-guide-refresh-2026-10-26.json for checks and source references.
