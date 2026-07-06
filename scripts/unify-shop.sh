#!/bin/sh
# Unify all shop product images onto the Astrolabe deep-teal studio backdrop.
# Usage: sh scripts/unify-shop.sh   (skips slugs that already have output)
cd "$(dirname "$0")/.." || exit 1
mkdir -p .assets/shop/unified

PROMPT='Recreate this exact product photo on a new unified premium studio background: a seamless deep teal (#173134) studio backdrop with a soft warm golden rim light and a faint champagne-gold glow halo behind the product, the product standing on a dark polished stone surface with a subtle mirror reflection beneath it. Keep the product itself absolutely identical to the input image — exact same shape, proportions, colors, materials, packaging design, labels, logos and every piece of text reproduced precisely as shown. Center the product with generous even margin on all sides. Elegant, cinematic, luxury e-commerce product shot.'

for f in .assets/shop/*.webp; do
  slug=$(basename "$f" .webp)
  out=".assets/shop/unified/$slug.png"
  if [ -f "$out" ]; then
    echo "skip $slug (exists)"
    continue
  fi
  echo "=== $slug ==="
  node scripts/gen-image.mjs \
    --model chatgpt-image-latest \
    --images "$f" \
    --size 1024x1024 \
    --output "$out" \
    --prompt "$PROMPT" || echo "FAILED $slug"
done
echo "BATCH DONE"
