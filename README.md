# Astrolabe — Luxury Café Landing Page

A dark, cinematic, liquid-glass single-page landing site for the Astrolabe café brand.

**Stack:** Vite · React 18 · TypeScript · Tailwind CSS 3 · lucide-react

## Palette

| Role | Hex |
| --- | --- |
| Deep teal | `#173134` |
| Champagne beige | `#CFBD8D` |
| Warm gold | `#CF9E58` |
| Burgundy | `#793635` |

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Generated assets

The hero background video was produced with the **Sora 2 Pro** API, seeded by a
**gpt-image-2** reference frame that carries the real Astrolabe emblem on the cup
sleeve. Scripts (require `OPENAI_API_KEY` in `.env`):

```bash
# Reference still (gpt-image-2 / chatgpt-image-latest)
node scripts/gen-image.mjs --prompt "..." --images public/brand/logo-mark.png --output ref.png

# Hero video (sora-2-pro, 1792x1024, 8s, seeded with the reference frame)
node scripts/gen-video-sora.mjs --prompt "..." --reference ref.png --output public/hero/coffee-splash.mp4

# Cheap draft first (~10x cheaper: sora-2 @ 1280x720, 4s), then final pro render
node scripts/gen-video-sora.mjs --draft --prompt "..." --output draft.mp4
```

**Cost tips:** Sora bills per *video second x resolution x model* - prompt length
is irrelevant. Iterate with `--draft` (sora-2, 720p, 4s) until the motion is right,
then do one final `sora-2-pro` render. A pro 8s/1792x1024 render costs ~10x a draft.
Note: `--reference` images must match the render size (720p drafts need a 1280x720
reference).

`scripts/shot.mjs` takes a Playwright screenshot pass of the running dev server
for visual review (`node scripts/shot.mjs`).

## Structure

- `src/components/Navbar.tsx` — fixed liquid-glass navbar, logo, links, responsive mobile menu
- `src/components/Hero.tsx` — full-screen looping video hero with overlay + CTAs
- `src/components/Features.tsx` — Specialty Coffee · Fresh Pastries · Cozy Atmosphere
- `src/components/Story.tsx` — brand quote strip
- `src/components/Gallery.tsx` — on-brand imagery
- `src/components/Footer.tsx` — visit band + social icons
- `src/index.css` — palette, fonts, `.liquid-glass`, keyframe animations
