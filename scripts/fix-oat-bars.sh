#!/bin/sh
# The oat bar sources are illustrated scene mockups (box art blends into the
# backdrop), so rembg can't segment them. Instead: 2-image AI edit that lifts
# the box onto the exact shared studio backdrop.
cd "$(dirname "$0")/.." || exit 1
mkdir -p .assets/shop/unified

for flavor in coffee chocolate orange; do
  slug="$flavor-oat-bar"
  echo "=== $slug ==="
  node scripts/gen-image.mjs \
    --model chatgpt-image-latest \
    --images ".assets/shop/$slug.webp" ".assets/shop/backdrop.png" \
    --size 1024x1024 \
    --output ".assets/shop/unified/$slug-fixed.png" \
    --prompt "Take ONLY the tall 'Handmade Oat Bar' box from the first image and place it standing upright, perfectly centered, on the dark polished marble surface of the empty teal studio backdrop from the second image. Keep the second image's backdrop exactly as it is (deep teal wall, warm golden glow halo, dark marble surface). Reproduce the box with total fidelity: identical proportions, identical illustration artwork, and every piece of text exactly as printed — 'ASTROLABE', 'Handmade Oat Bar', the flavor name, '40 GRAMS' and the Arabic text. The box occupies roughly 55 percent of the image height with its base at about 83 percent from the top, resting on the marble with a soft contact shadow and a very faint mirror reflection. Do not include any leaves, plants, pedestal or scenery from the first image." || echo "FAILED $slug"
done
echo "OAT BARS DONE"
