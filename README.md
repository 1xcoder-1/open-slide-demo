# open-slide-demo

A from-scratch mini reimplementation of
[open-slide](https://github.com/open-slide/open-slide) — "the slide framework
built for agents" — built to show **how it works**. Fully standalone from the
Postly app above it.

## Run

```bash
npm install
npm run dev        # http://localhost:5199
npm run build      # type-check + static build in dist/
```

## How open-slide works, and where each piece lives here

| open-slide concept | what it does | this demo |
|---|---|---|
| **Slides are plain React components** | no proprietary markup; content/rendering are separated | `src/slides/*.tsx` |
| **Fixed 1920×1080 canvas** | every slide renders onto the same grid, then scales to fit any window | `src/core/DeckCanvas.tsx` (ResizeObserver + CSS transform scale) |
| **Deck runtime** | navigation state, transitions, keyboard control | `src/core/useDeckState.ts`, `src/core/Deck.tsx` |
| **Presenter mode** | speaker notes, next-slide preview, timer for the presenter while the audience sees the slide | `src/core/PresenterBar.tsx` (toggle with `P`) |
| **Inspector** | click any element in the live preview, attach a text note; feedback flows back as data an agent can act on | `src/core/inspector.tsx` (toggle with the "inspect" button; panel with `I`) |
| **defineDeck / slide registry** | declarative deck: metadata + component per slide | `src/core/types.ts`, `src/slides/deck.ts` |
| **packages/cli (`init`)** | scaffolds a workspace with pre-built agent commands | not reimplemented — this folder *is* the scaffold |
| **Static export** | `build` produces a plain static folder for any CDN/host | `npm run build` → `dist/` |
| **The agent loop** | prompt → agent writes React → live preview → inspector notes → agent applies edits → export | the demo deck itself explains it (slide 4) |

## Keyboard map

| key | action |
|---|---|
| `→` / `Space` / `PageDown` | next slide |
| `←` / `PageUp` | previous slide |
| `Home` / `End` | first / last slide |
| `P` | presenter mode (notes + timer + next preview) |
| `I` | feedback panel |
| click left/right screen edge | navigate (arrows appear on hover) |
| **inspect** button, then click an element | attach a feedback note (persisted to `localStorage` under `osd-annotations`) |

## Design

“Ink & ember” editorial theme: fixed 1920×1080 canvas that auto-scales to any
window, staggered content entrance animations, shimmering gradient headline,
animated progress bar, per-slide numbers, and hover-lift cards. All styling is
plain CSS in `src/styles.css` — no UI framework.

## Differences from the real repo (intentional, for clarity)

- Single Vite app instead of a pnpm + Turborepo monorepo (core/ and slides/
  mirror `packages/core` and `apps/demo`).
- Real open-slide archives inspector feedback as **inline markers in the
  source files** so the next agent pass edits exactly those spots; this demo
  keeps notes in `localStorage` + a copyable list instead.
- No Biome/Vitest/PPT export; transitions are a single CSS slide-in.

## Try the agent loop for real

1. `npm run dev`, hit `I`, press **inspect**, click a headline, type e.g.
   *"make this gradient teal"*.
2. Open the feedback panel — you'll see the selector + snippet.
3. Hand that note to any coding agent (or edit yourself) — the slide is just
   React, so the change is a one-line edit.
