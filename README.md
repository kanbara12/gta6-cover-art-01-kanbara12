# Crimson Palms Cover Press

[![make.fun — gta6-cover-art-01](https://make.fun/badge/gta6-cover-art-01.svg)](https://make.fun/bounty/gta6-cover-art-01)
[![rank](https://make.fun/badge/gta6-cover-art-01/kanbara12/gta6-cover-art-01-kanbara12/rank.svg)](https://make.fun/bounty/gta6-cover-art-01)
[![reward](https://make.fun/badge/gta6-cover-art-01/kanbara12/gta6-cover-art-01-kanbara12/reward.svg)](https://make.fun/bounty/gta6-cover-art-01)

A cover art maker that turns your photos into GTA 6-style poster art. It runs
offline in a desktop browser: open `app/index.html`, load a photo, pick a
layout and a grade, and export a PNG.

## What it does

The app lays your photos out as a multi-panel comic poster, the way GTA
posters do it: a big hero panel with smaller panels around it, white gutters,
a black frame, and a giant gradient title with a neon script subtitle
overlapping it. Seven layouts are built in, from a 6-panel hero layout to a
9-panel grid and a slanted key-art layout. Six colour grades cover the two
looks the posters are known for: a sunset grade in orange, pink and purple,
and a neon night grade in pink and teal, plus golden hour, comic ink, noir
heat and a palm duotone.

The panels sit in the top 74% of the cover and the title band sits below
them, so no panel is ever covered by the title — every panel in every layout
stays fully visible, including the bottom row.

The grading is posterize and halftone, and it is skin-safe by default. With
skin-safe on, the posterize step keeps more levels (at least 8) and caps the
saturation boost, so faces stay readable. You can turn it off if you want the
heavier comic look.

Every panel carries its own story: a place, a time and a hook, like "LANTERN
PIER - 10:26 PM - TIDE COMING IN". You can edit each one, crop and reposition
each photo with zoom and shift sliders, or fill every panel from one photo and
spread several photos across the panels with one click. A "Surprise me"
button shuffles layout, grade and photos when you want a fast starting point.

The printed look comes from a five-star pill with a quote, a starburst seal
that reads "ORIGINAL COVER ART", a barcode with a catalogue number
(`CP-0626-06`), a tagline strip along the foot, and palm silhouettes under
the title. Three of the panels can be drawn graphics instead of photos — a
vector sunset, a skyline and palms — so a cover never has to repeat the same
face twice.

## From photo to PNG

1. Add photos. Two sample photos ship with the app; your own photos stay on
   your machine and are never uploaded.
2. Pick a layout and a grade, then edit the title, subtitle and tagline.
3. Export PNG in 1080 x 1080, 1080 x 1350 or 1920 x 1080, one size at a time
   or all three at once.

## Running it

Serve `app/` with any static server and open `index.html` in desktop Chrome,
or run `node serve.ts` from the repository root and open
http://localhost:8080. No build step, no network request: every script,
style and image the page loads is a file under `app/`. Lettering uses
system fonts installed on the machine (Arial Black, Brush Script MT,
system-ui); no font files ship with the app and no font is downloaded.

## Files

- `app/index.html` - the editor page
- `app/style.css` - the dark editor styling
- `app/src/main.js` - wires the controls, photo loading and PNG export
- `app/src/cover.js` - draws the cover: layouts, grades, lettering, seals,
  barcode, halftone and grain
- `app/src/shots.js` - fixed scenes used for the screenshots
- `app/samples/` - two sample photos made with an image model for make.fun,
  free to use
- `main.ts` - copies `app/` and `screenshots/` to the output folder and
  writes `dossier.json`

All art and lettering in this entry are original. Lettering uses system
fonts (Arial Black, Brush Script MT, system-ui) — none of them is shipped
as a file and none is claimed as original. No Rockstar Games logo, artwork
or font is used anywhere.
