# -*- coding: utf-8 -*-
"""
Composite all shop products onto the shared studio backdrop.

- Products whose source webp already has an alpha channel are used as-is
  (pixel-perfect fidelity); opaque studio shots are cut out with rembg.
- Each cutout gets a soft contact shadow + faint mirror reflection, then is
  placed on .assets/shop/backdrop.png and exported to public/shop/<slug>.webp.

Usage:  python scripts/compose-shop.py
"""
import io
import os
import sys
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
SRC = os.path.join(ROOT, ".assets", "shop")
OUT = os.path.join(ROOT, "public", "shop")
BACKDROP = os.path.join(SRC, "backdrop.png")

CANVAS = 1024          # working size (backdrop is 1024x1024)
FLOOR_Y = 852          # where product bases sit on the marble
MAX_W, MAX_H = 600, 570
REFLECT_STRENGTH = 0.22
REFLECT_HEIGHT = 0.30  # fraction of product height
EXPORT = 800           # final webp size

session = None  # lazy rembg session


def cutout(path: str) -> Image.Image:
    img = Image.open(path).convert("RGBA")
    alpha = img.getchannel("A")
    lo, hi = alpha.getextrema()
    if lo < 250:  # already transparent
        return img
    global session
    if session is None:
        from rembg import new_session
        session = new_session("u2net")
    from rembg import remove
    return remove(img, session=session, post_process_mask=True).convert("RGBA")


def trim(img: Image.Image) -> Image.Image:
    bbox = img.getchannel("A").point(lambda a: 255 if a > 8 else 0).getbbox()
    return img.crop(bbox) if bbox else img


def compose(slug: str, backdrop: Image.Image) -> None:
    src = os.path.join(SRC, slug + ".webp")
    canvas = backdrop.copy()

    product = trim(cutout(src))
    scale = min(MAX_W / product.width, MAX_H / product.height)
    w, h = round(product.width * scale), round(product.height * scale)
    product = product.resize((w, h), Image.LANCZOS)
    x = (CANVAS - w) // 2
    y = FLOOR_Y - h

    # Contact shadow (soft ellipse under the base)
    shadow = Image.new("RGBA", (CANVAS, CANVAS), (0, 0, 0, 0))
    d = ImageDraw.Draw(shadow)
    sw, sh = int(w * 0.86), max(14, int(w * 0.10))
    d.ellipse(
        (CANVAS // 2 - sw // 2, FLOOR_Y - sh // 2,
         CANVAS // 2 + sw // 2, FLOOR_Y + sh // 2),
        fill=(0, 0, 0, 130),
    )
    shadow = shadow.filter(ImageFilter.GaussianBlur(16))
    canvas.alpha_composite(shadow)

    # Faint mirror reflection on the marble
    rh = max(1, int(h * REFLECT_HEIGHT))
    reflection = product.transpose(Image.FLIP_TOP_BOTTOM).crop((0, 0, w, rh))
    grad = Image.linear_gradient("L").resize((w, rh))  # 0 (top) -> 255 (bottom)
    grad = grad.point(lambda v: int((255 - v) * REFLECT_STRENGTH))
    r, g, b, a = reflection.split()
    from PIL import ImageChops
    reflection.putalpha(ImageChops.multiply(a, grad))
    reflection = reflection.filter(ImageFilter.GaussianBlur(1.2))
    canvas.alpha_composite(reflection, (x, FLOOR_Y + 2))

    # Product itself (original pixels, untouched)
    canvas.alpha_composite(product, (x, y))

    out_img = canvas.convert("RGB").resize((EXPORT, EXPORT), Image.LANCZOS)
    out_path = os.path.join(OUT, slug + ".webp")
    out_img.save(out_path, "WEBP", quality=85, method=6)
    print("ok", slug)


def main() -> None:
    os.makedirs(OUT, exist_ok=True)
    backdrop = Image.open(BACKDROP).convert("RGBA").resize((CANVAS, CANVAS))
    slugs = sorted(
        os.path.splitext(f)[0]
        for f in os.listdir(SRC)
        if f.endswith(".webp")
    )
    only = sys.argv[1:]
    for slug in slugs:
        if only and slug not in only:
            continue
        try:
            compose(slug, backdrop)
        except Exception as e:  # noqa: BLE001
            print("FAILED", slug, e)


if __name__ == "__main__":
    main()
