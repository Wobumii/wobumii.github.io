# Card artwork side-strip correction — 2026-10-20

The 3px separator border reduced the usable height inside the ratio-constrained
image frame. Contain sizing then narrowed the drawn artwork and exposed side
strips. The separator now belongs to the text section, outside the image frame;
images use their natural height at full frame width. Both full 63:50 originals
remain visible without crop, and cover frames stay equal.

Playwright checked 1440, 1365, 1280, 960 and 390px viewports. Both artwork boxes
meet both side edges with zero gap, retain their native aspect ratio, and meet
the text separator without a gap. Heights agree within CSS subpixel rounding.
Desktop captures were visually reviewed; sampled right-edge pixels match the
artwork background rather than the former contrasting interior strips. Captures
are in workspace output/playwright/wobumii; results.json records geometry.
